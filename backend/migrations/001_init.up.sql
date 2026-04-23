-- FANGReady Database Schema
-- CockroachDB/PostgreSQL compatible

-- Enable UUID extension (CockroachDB has this built-in)
-- CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Main patterns table
CREATE TABLE IF NOT EXISTS patterns (
    id VARCHAR(50) PRIMARY KEY,
    category VARCHAR(100) NOT NULL,
    icon VARCHAR(10) DEFAULT '',
    difficulty VARCHAR(20) NOT NULL CHECK (difficulty IN ('Easy', 'Medium', 'Hard', 'Easy-Medium', 'Medium-Hard')),
    description TEXT NOT NULL,
    time_complexity VARCHAR(100) NOT NULL,
    space_complexity VARCHAR(100) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for common queries
CREATE INDEX IF NOT EXISTS idx_patterns_category ON patterns(category);
CREATE INDEX IF NOT EXISTS idx_patterns_difficulty ON patterns(difficulty);
CREATE INDEX IF NOT EXISTS idx_patterns_created_at ON patterns(created_at DESC);

-- When to use cases for each pattern
CREATE TABLE IF NOT EXISTS pattern_when_to_use (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    pattern_id VARCHAR(50) NOT NULL REFERENCES patterns(id) ON DELETE CASCADE,
    use_case TEXT NOT NULL,
    order_index INT NOT NULL DEFAULT 0
);

CREATE INDEX IF NOT EXISTS idx_pattern_when_to_use_pattern_id ON pattern_when_to_use(pattern_id);

-- Code templates for patterns (supports multiple languages)
CREATE TABLE IF NOT EXISTS pattern_code_templates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    pattern_id VARCHAR(50) NOT NULL REFERENCES patterns(id) ON DELETE CASCADE,
    language VARCHAR(20) NOT NULL,
    code TEXT NOT NULL,
    UNIQUE(pattern_id, language)
);

CREATE INDEX IF NOT EXISTS idx_pattern_code_templates_pattern_id ON pattern_code_templates(pattern_id);

-- Key insights for each pattern
CREATE TABLE IF NOT EXISTS pattern_insights (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    pattern_id VARCHAR(50) NOT NULL REFERENCES patterns(id) ON DELETE CASCADE,
    insight TEXT NOT NULL,
    order_index INT NOT NULL DEFAULT 0
);

CREATE INDEX IF NOT EXISTS idx_pattern_insights_pattern_id ON pattern_insights(pattern_id);

-- Common mistakes for each pattern
CREATE TABLE IF NOT EXISTS pattern_mistakes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    pattern_id VARCHAR(50) NOT NULL REFERENCES patterns(id) ON DELETE CASCADE,
    mistake TEXT NOT NULL,
    order_index INT NOT NULL DEFAULT 0
);

CREATE INDEX IF NOT EXISTS idx_pattern_mistakes_pattern_id ON pattern_mistakes(pattern_id);

-- Pattern variations
CREATE TABLE IF NOT EXISTS pattern_variations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    pattern_id VARCHAR(50) NOT NULL REFERENCES patterns(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    when_to_use TEXT,
    order_index INT NOT NULL DEFAULT 0
);

CREATE INDEX IF NOT EXISTS idx_pattern_variations_pattern_id ON pattern_variations(pattern_id);

-- Code templates for variations
CREATE TABLE IF NOT EXISTS variation_code_templates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    variation_id UUID NOT NULL REFERENCES pattern_variations(id) ON DELETE CASCADE,
    language VARCHAR(20) NOT NULL,
    code TEXT NOT NULL,
    UNIQUE(variation_id, language)
);

CREATE INDEX IF NOT EXISTS idx_variation_code_templates_variation_id ON variation_code_templates(variation_id);

-- Problems associated with variations
CREATE TABLE IF NOT EXISTS variation_problems (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    variation_id UUID NOT NULL REFERENCES pattern_variations(id) ON DELETE CASCADE,
    problem_name VARCHAR(200) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_variation_problems_variation_id ON variation_problems(variation_id);

-- Common problems for each pattern
CREATE TABLE IF NOT EXISTS pattern_problems (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    pattern_id VARCHAR(50) NOT NULL REFERENCES patterns(id) ON DELETE CASCADE,
    problem_name VARCHAR(200) NOT NULL,
    leetcode_url VARCHAR(500)
);

CREATE INDEX IF NOT EXISTS idx_pattern_problems_pattern_id ON pattern_problems(pattern_id);
