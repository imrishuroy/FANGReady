# About

This document describes the design of the user highlight feature for AlgoPatterns. It covers the motivation, architecture, data model, and implementation considerations for allowing users to persistently highlight and annotate content across the platform. This is a living document and may be updated as the implementation evolves.

# Overview

AlgoPatterns is an educational platform for learning algorithm patterns through code templates, insights, and tutorials. The primary design goals for the highlight feature are **persistence**, **performance**, and **seamless user experience**. Users should be able to mark important sections of content, attach personal notes, and have these highlights available across sessions and devices without perceiving any latency or synchronization issues.

The entry point for highlights is the frontend UI. When a user selects text within a highlightable region (code blocks, insight cards, tutorial content), a toolbar appears allowing them to create a highlight with an optional note and color. The highlight is immediately rendered on the client (optimistic update) while being persisted to CockroachDB via the Go backend. This approach ensures that the UI feels instantaneous while maintaining strong consistency guarantees.

Highlights are stored as a **single table** in CockroachDB with composite indexes optimized for the two primary access patterns: fetching all highlights for a specific piece of content (when viewing a pattern) and fetching all highlights for a user (for the highlights management view). Each highlight stores character offsets relative to the content, along with a cached copy of the selected text for display purposes and staleness detection.

AlgoPatterns achieves persistence across sessions:
- Highlights are stored server-side in CockroachDB with user association
- An IndexedDB cache on the client provides offline support and reduces API calls
- Background synchronization reconciles local and server state when connectivity is restored

AlgoPatterns achieves performance:
- Optimistic updates make highlight creation feel instantaneous
- Content-specific queries use covering indexes to avoid table scans
- Highlights are loaded lazily as content becomes visible
- The frontend caches highlights in React context to avoid redundant fetches

AlgoPatterns achieves seamless UX:
- Text selection triggers a contextual toolbar positioned near the selection
- Existing highlights are rendered as colored overlays on the content
- Stale highlights (where content has changed) are visually indicated
- Conflicts from concurrent edits are resolved using optimistic locking with version numbers

# Architecture

AlgoPatterns implements a layered architecture for the highlight feature. The highest level of abstraction is the React component layer, which handles user interactions and rendering. It depends on the HighlightContext for state management, which in turn communicates with the HighlightService for API calls. The backend follows the standard handler-service-repository pattern used throughout the AlgoPatterns codebase.

```
┌───────────────────────────────────────────────────────────────────┐
│                       Frontend (Next.js 16)                       │
│                                                                   │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐        │
│  │ Highlightable│    │  Highlight   │    │  Highlight   │        │
│  │  Component   │───▶│   Context    │───▶│   Service    │        │
│  └──────────────┘    └──────────────┘    └──────────────┘        │
│         │                   │                   │                 │
│         ▼                   ▼                   │                 │
│  ┌──────────────┐    ┌──────────────┐          │                 │
│  │useTextSelect │    │  IndexedDB   │          │                 │
│  │    Hook      │    │    Cache     │          │                 │
│  └──────────────┘    └──────────────┘          │                 │
│                                                 │                 │
└─────────────────────────────────────────────────┼─────────────────┘
                                                  │
                                                  │ HTTPS
                                                  ▼
┌───────────────────────────────────────────────────────────────────┐
│                          Backend (Go)                             │
│                                                                   │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐        │
│  │  Highlight   │    │  Highlight   │    │  Highlight   │        │
│  │   Handler    │───▶│   Service    │───▶│  Repository  │        │
│  └──────────────┘    └──────────────┘    └──────────────┘        │
│         │                                       │                 │
│         ▼                                       │                 │
│  ┌──────────────┐                               │                 │
│  │     Auth     │                               │                 │
│  │  Middleware  │                               │                 │
│  └──────────────┘                               │                 │
│                                                 │                 │
└─────────────────────────────────────────────────┼─────────────────┘
                                                  │
                                                  │ SQL
                                                  ▼
                                        ┌──────────────────┐
                                        │   CockroachDB    │
                                        │ (user_highlights)│
                                        └──────────────────┘
```

The Highlightable component wraps any content that should support highlighting. It handles mouse/touch selection events via the useTextSelection hook, renders highlight overlays on top of the content, and displays the selection toolbar when the user makes a selection. The component receives a `contentType` and `contentId` prop that uniquely identify the content being highlighted, allowing the same component to be reused across code blocks, insights, and tutorials.

The HighlightContext maintains an in-memory map of highlights keyed by `${contentType}:${contentId}`. When a component mounts and requests highlights for a piece of content, the context first checks its cache, then IndexedDB, and finally makes an API call if needed. This three-tier caching strategy minimizes network requests while ensuring data is eventually consistent with the server.

# Content Identification

Highlights must be anchored to specific content within the application. Since AlgoPatterns content is structured hierarchically (patterns contain code templates, insights, mistakes, and variations), we use a two-part identification scheme: `content_type` and `content_id`.

Content types map to the logical content units in the application:

| Content Type | Description | Content ID Format |
|-------------|-------------|-------------------|
| `pattern_code` | Code template for a pattern | `{pattern_id}:{language}` |
| `pattern_insight` | Key insight for a pattern | `{pattern_id}:insight:{index}` |
| `pattern_mistake` | Common mistake for a pattern | `{pattern_id}:mistake:{index}` |
| `variation_code` | Code template for a variation | `{variation_uuid}:{language}` |
| `tutorial_section` | Section within a tutorial | `{tutorial_slug}:{section_index}` |

The content ID format includes enough information to uniquely identify the content and, importantly, to detect when content has changed. For indexed content (insights, mistakes), the index refers to the order in which the item appears, not a database ID. This means that if an insight is reordered or deleted, highlights anchored to it may become stale.

To detect staleness, each highlight stores a `content_hash` computed from the content at the time of creation. When rendering highlights, the frontend computes the current content hash and compares it to the stored hash. Mismatches indicate that the content has changed since the highlight was created, and the highlight is rendered with a visual indicator (dashed border, warning icon) prompting the user to review or delete it.

# Position Encoding

Highlights are anchored to content using character offsets. The `start_offset` and `end_offset` fields specify the range of characters selected, where offset 0 is the first character of the content. For code content, we additionally store `start_line` and `end_line` to enable line-based rendering optimizations.

Character offsets were chosen over DOM-based anchoring (XPath, CSS selectors) for several reasons:

1. **Determinism**: Character offsets are independent of how the content is rendered, making them stable across different clients and rendering libraries.

2. **Simplicity**: The frontend can compute offsets directly from the Selection API without traversing the DOM.

3. **Portability**: Offsets work identically for code (rendered via react-syntax-highlighter) and prose (rendered via react-markdown).

The tradeoff is that offsets are sensitive to content changes. If content is inserted before a highlight, the highlight's offsets become incorrect. We mitigate this by storing the `selected_text` and detecting staleness via content hashing, but we do not attempt automatic offset adjustment. Users must manually recreate highlights if content changes significantly.

For code blocks, the line numbers are derived from the character offsets by counting newlines. This allows the rendering layer to apply background colors to entire lines rather than attempting character-level highlighting within syntax-highlighted code, which would be complex and fragile.

# Data Model

The highlight data model is intentionally simple. A single `user_highlights` table stores all highlights for all users. The schema prioritizes query performance for the two primary access patterns while maintaining referential integrity with the users table.

```sql
CREATE TABLE IF NOT EXISTS user_highlights (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    
    content_type VARCHAR(50) NOT NULL,
    content_id VARCHAR(100) NOT NULL,
    
    start_offset INT NOT NULL CHECK (start_offset >= 0),
    end_offset INT NOT NULL CHECK (end_offset > start_offset),
    start_line INT CHECK (start_line IS NULL OR start_line >= 1),
    end_line INT CHECK (end_line IS NULL OR end_line >= start_line),
    
    selected_text TEXT NOT NULL CHECK (char_length(selected_text) <= 5000),
    content_hash VARCHAR(64),
    
    color VARCHAR(20) NOT NULL DEFAULT 'yellow'
        CHECK (color IN ('yellow', 'green', 'blue', 'pink', 'purple')),
    note TEXT CHECK (note IS NULL OR char_length(note) <= 1000),
    
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    version INT NOT NULL DEFAULT 1
);

CREATE INDEX idx_highlights_user_content 
    ON user_highlights(user_id, content_type, content_id);
CREATE INDEX idx_highlights_user_created 
    ON user_highlights(user_id, created_at DESC);
CREATE UNIQUE INDEX idx_highlights_unique_selection
    ON user_highlights(user_id, content_type, content_id, start_offset, end_offset);
```

The `idx_highlights_user_content` index is a covering index for the most common query: fetching all highlights for a specific piece of content when rendering a page. The query `SELECT * FROM user_highlights WHERE user_id = $1 AND content_type = $2 AND content_id = $3` will use this index efficiently.

The `idx_highlights_user_created` index supports the highlights management page, where users can view all their highlights sorted by creation date. Cursor-based pagination uses `created_at` as the cursor, providing stable pagination even as new highlights are added.

The unique index on `(user_id, content_type, content_id, start_offset, end_offset)` prevents duplicate highlights. If a user attempts to create a highlight with identical boundaries to an existing one, the insert will fail with a constraint violation, which the application interprets as "highlight already exists."

The `version` field supports optimistic locking. When updating a highlight (changing color or note), the client must provide the current version. If the version in the database doesn't match, the update fails, indicating a concurrent modification. The client can then refetch and retry.

# API Design

The highlight API follows REST conventions and is consistent with the existing AlgoPatterns API style. All endpoints require authentication via JWT bearer token, and all responses use JSON encoding.

**Create Highlight**

```
POST /api/v1/highlights
Content-Type: application/json
Authorization: Bearer <token>

{
    "content_type": "pattern_code",
    "content_id": "two-pointers:java",
    "start_offset": 150,
    "end_offset": 280,
    "start_line": 5,
    "end_line": 8,
    "selected_text": "while (left < right) {\n    // process\n}",
    "content_hash": "a1b2c3d4...",
    "color": "yellow",
    "note": "Key loop pattern"
}
```

The response includes the server-generated `id`, timestamps, and initial `version`. On conflict (duplicate selection), the API returns 409 with error code `highlight_exists`.

**Get Highlights for Content**

```
GET /api/v1/highlights/content/{content_type}/{content_id}
Authorization: Bearer <token>
```

Returns an array of highlights for the specified content, along with a `content_hash` field that the client can use to detect if any highlights are stale.

**List User Highlights**

```
GET /api/v1/highlights?limit=20&cursor=<cursor>&content_type=pattern_code
Authorization: Bearer <token>
```

Returns a paginated list of highlights for the authenticated user. The optional `content_type` parameter filters by type. Pagination uses cursor-based navigation with `created_at` as the cursor field.

**Update Highlight**

```
PATCH /api/v1/highlights/{id}
Content-Type: application/json
Authorization: Bearer <token>

{
    "color": "green",
    "note": "Updated note",
    "version": 1
}
```

Only `color` and `note` can be updated; position fields are immutable. The `version` field is required and must match the current version in the database.

**Delete Highlight**

```
DELETE /api/v1/highlights/{id}
Authorization: Bearer <token>
```

Returns 204 on success. The highlight is hard-deleted, not soft-deleted.

**Batch Sync**

```
POST /api/v1/highlights/sync
Content-Type: application/json
Authorization: Bearer <token>

{
    "operations": [
        {"op": "create", "client_id": "local-1", "data": {...}},
        {"op": "update", "id": "server-uuid", "data": {...}},
        {"op": "delete", "id": "server-uuid-2"}
    ],
    "last_sync_at": "2026-05-15T09:00:00Z"
}
```

The batch sync endpoint is used for offline support. It accepts an array of operations that were queued while offline and returns the results of each operation, along with any server-side changes that occurred since `last_sync_at`.

# Frontend Implementation

The frontend implementation centers on three key pieces: the `useTextSelection` hook for capturing user selections, the `Highlightable` component for rendering highlights, and the `HighlightContext` for state management.

**useTextSelection Hook**

The hook attaches event listeners for `mouseup` and `touchend` events on a container element. When a selection is detected, it computes the character offsets relative to the container's text content, filters out selections that are too short (less than 3 characters) or too long (more than 5000 characters), and returns the selection data along with a bounding rect for positioning the toolbar.

```typescript
function useTextSelection(containerRef: RefObject<HTMLElement>) {
    const [selection, setSelection] = useState<SelectionInfo | null>(null);
    
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;
        
        const handleSelectionChange = () => {
            const sel = window.getSelection();
            if (!sel || sel.isCollapsed) {
                setSelection(null);
                return;
            }
            
            // Verify selection is within container
            if (!container.contains(sel.anchorNode) || 
                !container.contains(sel.focusNode)) {
                setSelection(null);
                return;
            }
            
            const range = sel.getRangeAt(0);
            const text = sel.toString();
            
            if (text.length < 3 || text.length > 5000) {
                setSelection(null);
                return;
            }
            
            // Compute offsets relative to container
            const preRange = document.createRange();
            preRange.setStart(container, 0);
            preRange.setEnd(range.startContainer, range.startOffset);
            const startOffset = preRange.toString().length;
            const endOffset = startOffset + text.length;
            
            setSelection({
                text,
                startOffset,
                endOffset,
                rect: range.getBoundingClientRect()
            });
        };
        
        document.addEventListener('selectionchange', handleSelectionChange);
        return () => {
            document.removeEventListener('selectionchange', handleSelectionChange);
        };
    }, [containerRef]);
    
    return selection;
}
```

**Highlightable Component**

The Highlightable component wraps content and renders highlight overlays using absolutely positioned `<div>` elements. This overlay approach was chosen over DOM manipulation to avoid conflicts with React's virtual DOM reconciliation.

Key implementation details:
- The component uses `position: relative` on the container and `position: absolute` on highlight overlays
- Text node traversal finds the exact DOM positions for character offsets
- `getBoundingClientRect()` calculates pixel positions for highlight rectangles
- Adjacent rectangles (within 2px) are merged to eliminate visual breaks around punctuation
- A `ResizeObserver` watches the container and recalculates highlight positions when dimensions change
- Stale highlights (content hash mismatch) render with a dashed yellow border and warning message

The component also renders a floating toolbar when there's an active selection or when an existing highlight is clicked. The toolbar supports multiple modes: color picker, note input, highlight menu (edit/delete), and edit note mode.

**HighlightContext**

The context maintains global highlight state and provides methods for CRUD operations. It implements a write-through cache: writes go to both the local state and the server, while reads check local state first.

```typescript
const HighlightContext = createContext<HighlightContextValue | null>(null);

function HighlightProvider({ children }: { children: ReactNode }) {
    const [highlights, setHighlights] = useState<Map<string, Highlight[]>>(new Map());
    const [pendingOps, setPendingOps] = useState<PendingOperation[]>([]);
    
    const createHighlight = async (data: CreateHighlightInput) => {
        const key = `${data.contentType}:${data.contentId}`;
        const tempId = crypto.randomUUID();
        
        // Optimistic update
        const tempHighlight: Highlight = {
            id: tempId,
            ...data,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            version: 1,
            isPending: true
        };
        
        setHighlights(prev => {
            const existing = prev.get(key) || [];
            return new Map(prev).set(key, [...existing, tempHighlight]);
        });
        
        try {
            const serverHighlight = await highlightService.create(data);
            
            // Replace temp with server response
            setHighlights(prev => {
                const existing = prev.get(key) || [];
                return new Map(prev).set(
                    key,
                    existing.map(h => h.id === tempId ? serverHighlight : h)
                );
            });
            
            return serverHighlight;
        } catch (error) {
            // Queue for retry if offline
            if (!navigator.onLine) {
                setPendingOps(prev => [...prev, {
                    op: 'create',
                    clientId: tempId,
                    data
                }]);
            } else {
                // Remove optimistic update on error
                setHighlights(prev => {
                    const existing = prev.get(key) || [];
                    return new Map(prev).set(
                        key,
                        existing.filter(h => h.id !== tempId)
                    );
                });
                throw error;
            }
        }
    };
    
    // ... other methods
}
```

# Offline Support

Offline support is implemented using IndexedDB for persistence and a queue-based synchronization strategy. When the application detects that it's offline (via `navigator.onLine` or failed requests), it queues operations locally and applies them optimistically to the UI. When connectivity is restored, the queued operations are sent to the server via the batch sync endpoint.

The IndexedDB schema mirrors the server schema, with an additional `syncStatus` field indicating whether each highlight has been synced:

```typescript
interface HighlightRecord {
    id: string;           // Server ID or client-generated UUID
    data: Highlight;
    syncStatus: 'synced' | 'pending_create' | 'pending_update' | 'pending_delete';
    lastModified: number; // Timestamp for conflict resolution
}
```

The synchronization algorithm is:

1. On application load, fetch all highlights from IndexedDB into React state.
2. For each content viewed, check if we have cached highlights. If not, or if cache is stale (based on a TTL), fetch from server and update IndexedDB.
3. When creating/updating/deleting, apply immediately to IndexedDB and React state.
4. If online, send to server. On success, update IndexedDB sync status.
5. If offline, mark as pending in IndexedDB.
6. On connectivity restore, batch sync all pending operations.
7. Handle conflicts: server wins for concurrent modifications (user is notified).

# Conflict Resolution

Conflicts can occur in two scenarios: concurrent edits from multiple devices, and offline edits that conflict with server state when syncing.

For concurrent edits, we use optimistic locking via the `version` field. Each update request must include the current version. If the version doesn't match, the server returns 409 Conflict. The client then refetches the highlight and presents the user with options:
- Keep server version
- Overwrite with local version
- Cancel

For offline sync conflicts, we use a last-write-wins strategy with user notification. If a sync operation fails due to conflict, the user is shown a toast notification explaining that some highlights couldn't sync, with an option to view and resolve conflicts manually.

In practice, conflicts should be rare. Highlights are user-specific (no shared editing), and the typical use case involves a single device at a time. The conflict handling is primarily defensive, ensuring data isn't silently lost in edge cases.

# Security Considerations

**Authorization**: All highlight endpoints require authentication. The repository layer enforces that queries always filter by `user_id = $authenticated_user_id`, preventing users from accessing or modifying other users' highlights. This is enforced at the SQL level, not just the handler level, as defense in depth.

**Input Validation**: All input is validated on the server:
- `content_type` must be one of the allowed values
- `content_id` length is capped at 100 characters
- `selected_text` is capped at 5000 characters
- `note` is capped at 1000 characters
- `start_offset` must be non-negative
- `end_offset` must be greater than `start_offset`
- `color` must be one of the allowed values

**XSS Prevention**: User-provided content (`selected_text`, `note`) is stored as-is but always rendered using React's automatic escaping. We never use `dangerouslySetInnerHTML` for user content.

**Rate Limiting**: Write operations are rate-limited to 60 requests per minute per user. This prevents abuse while allowing legitimate heavy usage (e.g., a user creating many highlights in a study session).

**Data Limits**: Users are limited to 1000 total highlights and 100 highlights per content item. These limits prevent unbounded storage growth and ensure query performance remains consistent.

# Performance Considerations

**Database**: The primary query (fetching highlights for content) uses the covering index `idx_highlights_user_content` and should complete in under 5ms for typical highlight counts. We use cursor-based pagination for the user highlights list to ensure consistent performance regardless of offset.

**Frontend**: Highlights are loaded lazily as content becomes visible, using Intersection Observer. This prevents loading highlights for content the user may never scroll to. The React context memoizes highlight arrays to prevent unnecessary re-renders.

**Caching**: The three-tier caching strategy (React state → IndexedDB → Server) minimizes network requests. Cache invalidation uses a TTL approach: cached data is considered fresh for 5 minutes, after which a background refetch is triggered.

**Rendering**: For code blocks, we use line-based highlighting rather than character-based, which is much simpler to render. The entire line gets a background color, which works well visually and avoids the complexity of highlighting within syntax-highlighted tokens.

# Monitoring and Observability

The highlight feature will emit the following metrics:

- `algopatterns_highlights_created_total`: Counter of highlights created, labeled by content_type
- `algopatterns_highlights_deleted_total`: Counter of highlights deleted
- `algopatterns_highlight_api_latency_seconds`: Histogram of API latency by endpoint
- `algopatterns_highlight_sync_operations_total`: Counter of sync operations, labeled by result (success/conflict/error)
- `algopatterns_highlights_per_user`: Gauge of highlight count distribution

Alerts will be configured for:
- API error rate > 5% over 5 minutes
- API p99 latency > 500ms over 5 minutes
- Sync conflict rate > 10% over 1 hour (may indicate a bug)

Structured logging will include user_id (hashed), content_type, operation, and latency for all API calls, enabling debugging and usage analysis.

# Future Considerations

Several features were considered but deferred to keep the initial implementation focused:

**Highlight Sharing**: Users may want to share highlights with others or export them. This would require public highlight URLs and export formats (PDF, Markdown).

**Search**: Users may want to search their highlights by text or note content. This would require full-text indexing.

**AI Integration**: Highlights could inform personalized recommendations ("you've highlighted these patterns, you might also like...").

**Collaborative Highlighting**: Multiple users could share and annotate the same content. This would require significant changes to the data model and conflict resolution.

These features will be considered based on user feedback and usage patterns after the initial launch.

# Implementation Status

As of May 2026, the following features are implemented:

**Completed:**
- Core highlight CRUD operations with optimistic updates
- Character offset-based position encoding
- Content hashing for staleness detection (SHA-256)
- Stale highlight visual indicator (dashed yellow border with warning)
- Stale highlight shows original text and "Relocate" button for text-based recovery
- Instant highlight creation (click color to highlight, add notes later from menu)
- IndexedDB caching with 5-minute TTL
- Offline support with pending operation queue
- Automatic sync on connectivity restore (online event listener)
- Optimistic locking with version-based conflict detection
- Automatic retry on version conflict (up to 2 retries)
- Conflict resolution UI dialog when auto-retry fails
- Overlay-based highlight rendering using `getBoundingClientRect()`
- ResizeObserver for responsive highlight positioning across screen sizes
- Batch sync endpoint (`POST /api/v1/highlights/sync`) for efficient offline sync
- Line-based code highlighting using `wrapLines` with react-syntax-highlighter
- Unit and integration tests (80 tests total: 35 frontend + 45 backend)

**Implementation Details:**

The Highlightable component uses an overlay approach rather than DOM manipulation:
- Highlights are rendered as absolutely positioned `<div>` elements
- Position is calculated using `getBoundingClientRect()` relative to the container
- Text nodes are traversed to find exact character offsets
- Adjacent rectangles are merged to eliminate visual breaks (e.g., around punctuation)
- ResizeObserver recalculates positions when container size changes

Highlight colors are semi-transparent for dark backgrounds:
- Yellow: `rgba(249, 115, 22, 0.4)` (orange tint)
- Green: `rgba(20, 184, 166, 0.4)` (teal)
- Blue: `rgba(99, 102, 241, 0.45)` (indigo)
- Pink: `rgba(244, 63, 94, 0.4)` (rose)
- Purple: `rgba(6, 182, 212, 0.4)` (cyan)

The toolbar supports multiple modes:
- Color picker mode: 5 color options, clicking a color creates the highlight instantly
- Highlight menu mode: edit color, add/edit note, relocate stale highlight, delete
- Edit note mode: modify existing note

Stale highlight handling:
- Stale highlights show the original highlighted text (truncated to 150 chars)
- If the original text still exists in the content, a "Relocate highlight" button appears
- Relocate works by deleting the old highlight and creating a new one with updated offsets

IndexedDB stores:
- `highlights` store: cached highlight records with sync status
- `meta` store: cache timestamps for TTL tracking

Batch sync implementation:
- Frontend collects all pending operations (create/update/delete) from IndexedDB
- Single `POST /api/v1/highlights/sync` request with up to 50 operations
- Server processes each operation and returns individual results
- Frontend updates IndexedDB based on success/failure of each operation
- Supports `lastSyncAt` parameter to fetch server-side changes since last sync

Line-based code highlighting:
- `HighlightableCode` component uses `wrapLines={true}` on SyntaxHighlighter
- `lineProps` function applies background colors to highlighted lines
- `useTextSelection` hook calculates `startLine`/`endLine` from newline counts
- Clicking a highlighted line opens the highlight menu for editing/deletion

Conflict resolution:
- Backend returns `VERSION_CONFLICT` error code with current server state via `VersionConflict()` response helper
- Frontend auto-retries up to 2 times with server's latest version
- If auto-retry fails, a modal dialog shows both versions side-by-side
- User can choose: "Keep Server Version", "Use My Changes", or "Cancel"
- "Use My Changes" retries the update with the server's current version number

Files:
- `frontend/src/components/ui/Highlightable.tsx` - Main overlay-based highlight component for prose
- `frontend/src/components/ui/HighlightableCode.tsx` - Line-based highlight component for code blocks
- `frontend/src/components/ui/ConflictDialog.tsx` - Version conflict resolution modal dialog
- `frontend/src/contexts/HighlightContext.tsx` - State management with three-tier caching
- `frontend/src/lib/highlightDB.ts` - IndexedDB service for offline caching
- `frontend/src/lib/contentHash.ts` - Content hashing utilities (SHA-256)
- `frontend/src/lib/api.ts` - API client with batch sync and conflict handling
- `frontend/src/hooks/useTextSelection.ts` - Text selection hook with line number calculation
- `backend/internal/handlers/highlight_handler.go` - REST API handlers including batch sync
- `backend/internal/services/highlight_service.go` - Business logic with batch sync support
- `backend/internal/repository/highlight_repository.go` - Database operations
- `backend/pkg/response/response.go` - Response helpers including `VersionConflict()`

**Tests:**
- `frontend/src/__tests__/contentHash.test.ts` - Unit tests for content hashing (9 tests)
- `frontend/src/__tests__/highlightDB.test.ts` - Unit tests for IndexedDB layer (17 tests)
- `frontend/src/__tests__/HighlightContext.test.tsx` - Integration tests for context (9 tests)
- `backend/internal/models/highlight_test.go` - Unit tests for models (2 tests, 11 cases)
- `backend/internal/services/highlight_service_test.go` - Unit tests for service layer with mocks (25 tests)
- `backend/internal/handlers/highlight_handler_test.go` - HTTP handler tests (18 tests)


# References

- [Web Selection API](https://developer.mozilla.org/en-US/docs/Web/API/Selection) - For understanding how text selection works in browsers
- [IndexedDB API](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API) - For the offline storage implementation
- [Optimistic Locking](https://en.wikipedia.org/wiki/Optimistic_concurrency_control) - For the conflict resolution strategy
- [CockroachDB Performance Best Practices](https://www.cockroachlabs.com/docs/stable/performance-best-practices-overview.html) - For database schema design
