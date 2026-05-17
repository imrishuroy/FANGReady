-- Drop highlights table and indexes
DROP INDEX IF EXISTS idx_highlights_unique_selection;
DROP INDEX IF EXISTS idx_highlights_user_created;
DROP INDEX IF EXISTS idx_highlights_user_content;
DROP TABLE IF EXISTS highlights;
