-- Code execution system tables for FANGReady
-- CockroachDB/PostgreSQL compatible

-- Coding problems table
CREATE TABLE IF NOT EXISTS problems (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    pattern_id VARCHAR(100) REFERENCES patterns(id) ON DELETE SET NULL,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    difficulty VARCHAR(20) NOT NULL CHECK (difficulty IN ('Easy', 'Medium', 'Hard')),
    description TEXT NOT NULL,
    constraints TEXT,
    examples TEXT,
    hints TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_problems_slug ON problems(slug);
CREATE INDEX IF NOT EXISTS idx_problems_pattern_id ON problems(pattern_id);
CREATE INDEX IF NOT EXISTS idx_problems_difficulty ON problems(difficulty);

-- Test cases for each problem
CREATE TABLE IF NOT EXISTS test_cases (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    problem_id UUID NOT NULL REFERENCES problems(id) ON DELETE CASCADE,
    input TEXT NOT NULL,
    expected_output TEXT NOT NULL,
    is_sample BOOLEAN DEFAULT FALSE,
    order_index INT DEFAULT 0,
    explanation TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_test_cases_problem_id ON test_cases(problem_id);
CREATE INDEX IF NOT EXISTS idx_test_cases_is_sample ON test_cases(is_sample);

-- Supported languages and their Judge0 IDs
CREATE TABLE IF NOT EXISTS languages (
    id INT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    slug VARCHAR(50) NOT NULL UNIQUE,
    version VARCHAR(50),
    is_active BOOLEAN DEFAULT TRUE
);

-- Insert supported languages with Judge0 IDs
INSERT INTO languages (id, name, slug, version, is_active) VALUES
    (71, 'Python', 'python', '3.8.1', TRUE),
    (63, 'JavaScript', 'javascript', 'Node.js 12.14.0', TRUE),
    (62, 'Java', 'java', 'OpenJDK 13.0.1', TRUE),
    (54, 'C++', 'cpp', 'GCC 9.2.0', TRUE),
    (60, 'Go', 'go', '1.13.5', TRUE),
    (72, 'Ruby', 'ruby', '2.7.0', TRUE),
    (78, 'Kotlin', 'kotlin', '1.3.70', TRUE),
    (73, 'Rust', 'rust', '1.40.0', TRUE),
    (51, 'C#', 'csharp', 'Mono 6.6.0.161', TRUE),
    (68, 'PHP', 'php', '7.4.1', TRUE)
ON CONFLICT (id) DO NOTHING;

-- Code templates for each problem/language combination
CREATE TABLE IF NOT EXISTS problem_templates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    problem_id UUID NOT NULL REFERENCES problems(id) ON DELETE CASCADE,
    language_id INT NOT NULL REFERENCES languages(id) ON DELETE CASCADE,
    template_code TEXT NOT NULL,
    wrapper_code TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(problem_id, language_id)
);

CREATE INDEX IF NOT EXISTS idx_problem_templates_problem_id ON problem_templates(problem_id);

-- User code submissions
CREATE TABLE IF NOT EXISTS submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    problem_id UUID NOT NULL REFERENCES problems(id) ON DELETE CASCADE,
    language_id INT NOT NULL REFERENCES languages(id),
    code TEXT NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'pending' CHECK (
        status IN ('pending', 'processing', 'accepted', 'wrong_answer',
                   'runtime_error', 'compilation_error', 'time_limit_exceeded',
                   'memory_limit_exceeded', 'internal_error')
    ),
    runtime_ms INT,
    memory_kb INT,
    test_cases_passed INT DEFAULT 0,
    test_cases_total INT DEFAULT 0,
    error_message TEXT,
    judge0_tokens TEXT[],
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_submissions_user_id ON submissions(user_id);
CREATE INDEX IF NOT EXISTS idx_submissions_problem_id ON submissions(problem_id);
CREATE INDEX IF NOT EXISTS idx_submissions_status ON submissions(status);
CREATE INDEX IF NOT EXISTS idx_submissions_user_problem ON submissions(user_id, problem_id);
CREATE INDEX IF NOT EXISTS idx_submissions_created_at ON submissions(created_at DESC);

-- Submission test results (individual test case results)
CREATE TABLE IF NOT EXISTS submission_results (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    submission_id UUID NOT NULL REFERENCES submissions(id) ON DELETE CASCADE,
    test_case_id UUID NOT NULL REFERENCES test_cases(id) ON DELETE CASCADE,
    status VARCHAR(50) NOT NULL,
    actual_output TEXT,
    runtime_ms INT,
    memory_kb INT,
    error_output TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_submission_results_submission_id ON submission_results(submission_id);
