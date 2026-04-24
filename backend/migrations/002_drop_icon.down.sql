-- Add icon column back to patterns table
ALTER TABLE patterns ADD COLUMN IF NOT EXISTS icon VARCHAR(10) DEFAULT '';
