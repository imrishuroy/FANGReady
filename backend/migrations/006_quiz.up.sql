-- Quiz questions bank
CREATE TABLE IF NOT EXISTS quiz_questions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    -- Content association
    pattern_id VARCHAR(50) NOT NULL,
    section_slug VARCHAR(100),

    -- Question content
    question_type VARCHAR(20) NOT NULL
        CHECK (question_type IN ('multiple-choice', 'true-false', 'code-output',
                                  'fill-blank', 'identify-bug', 'code-trace', 'ordering')),
    difficulty VARCHAR(10) NOT NULL
        CHECK (difficulty IN ('easy', 'medium', 'hard')),
    question_text TEXT NOT NULL,
    code_snippet TEXT,

    -- Answer data (JSONB for flexibility across question types)
    options JSONB,
    correct_answer JSONB NOT NULL,
    acceptable_answers JSONB,

    -- Feedback
    explanation TEXT NOT NULL,

    -- Ordering and metadata
    display_order INT NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT true,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index for fetching questions by pattern/section
CREATE INDEX idx_quiz_questions_pattern
    ON quiz_questions(pattern_id, section_slug, is_active, display_order);

-- Quiz attempts (one per quiz session)
CREATE TABLE IF NOT EXISTS quiz_attempts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,

    -- Quiz identification
    pattern_id VARCHAR(50) NOT NULL,
    section_slug VARCHAR(100),

    -- Attempt metadata
    total_questions INT NOT NULL,
    correct_count INT NOT NULL DEFAULT 0,
    score_percentage DECIMAL(5, 2),

    -- Timing
    started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    completed_at TIMESTAMPTZ,
    time_taken_seconds INT,

    -- Status
    status VARCHAR(20) NOT NULL DEFAULT 'in_progress'
        CHECK (status IN ('in_progress', 'completed', 'abandoned')),

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index for user's quiz history
CREATE INDEX idx_quiz_attempts_user
    ON quiz_attempts(user_id, pattern_id, created_at DESC);

-- Index for fetching in-progress attempts
CREATE INDEX idx_quiz_attempts_status
    ON quiz_attempts(user_id, status) WHERE status = 'in_progress';

-- Individual question responses
CREATE TABLE IF NOT EXISTS quiz_responses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    attempt_id UUID NOT NULL REFERENCES quiz_attempts(id) ON DELETE CASCADE,
    question_id UUID NOT NULL REFERENCES quiz_questions(id) ON DELETE CASCADE,

    -- Response data
    selected_answer JSONB NOT NULL,
    is_correct BOOLEAN NOT NULL,

    -- Timing
    time_taken_ms INT,

    -- Metadata
    answered_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    UNIQUE(attempt_id, question_id)
);

-- Index for analyzing question difficulty
CREATE INDEX idx_quiz_responses_question
    ON quiz_responses(question_id, is_correct);

-- Index for fetching responses by attempt
CREATE INDEX idx_quiz_responses_attempt
    ON quiz_responses(attempt_id);
