-- Highlights table for persistent text highlighting
CREATE TABLE IF NOT EXISTS highlights (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,

    -- Content identification
    content_type VARCHAR(50) NOT NULL,
    content_id VARCHAR(100) NOT NULL,

    -- Position data (character offsets)
    start_offset INT NOT NULL CHECK (start_offset >= 0),
    end_offset INT NOT NULL CHECK (end_offset > start_offset),

    -- Line numbers (for code content)
    start_line INT CHECK (start_line IS NULL OR start_line >= 1),
    end_line INT CHECK (end_line IS NULL OR end_line >= start_line),

    -- Content snapshot
    selected_text TEXT NOT NULL CHECK (char_length(selected_text) <= 5000),
    content_hash VARCHAR(64),

    -- User customization
    color VARCHAR(20) NOT NULL DEFAULT 'yellow'
        CHECK (color IN ('yellow', 'green', 'blue', 'pink', 'purple')),
    note TEXT CHECK (note IS NULL OR char_length(note) <= 1000),

    -- Timestamps
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    -- Optimistic locking
    version INT NOT NULL DEFAULT 1
);

-- Primary query pattern: get highlights for specific content
CREATE INDEX idx_highlights_user_content
    ON highlights(user_id, content_type, content_id);

-- List all user highlights (paginated)
CREATE INDEX idx_highlights_user_created
    ON highlights(user_id, created_at DESC);

-- Prevent exact duplicate highlights
CREATE UNIQUE INDEX idx_highlights_unique_selection
    ON highlights(user_id, content_type, content_id, start_offset, end_offset);
