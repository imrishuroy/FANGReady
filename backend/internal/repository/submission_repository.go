package repository

import (
	"context"
	"fmt"
	"strings"
	"time"

	"github.com/google/uuid"
	"github.com/imrishuroy/faangready-backend/internal/models"
	"github.com/jackc/pgx/v5"
)

type SubmissionRepository struct {
	db *Database
}

func NewSubmissionRepository(db *Database) *SubmissionRepository {
	return &SubmissionRepository{db: db}
}

func (r *SubmissionRepository) Create(ctx context.Context, sub *models.Submission) error {
	sub.ID = uuid.New()
	sub.CreatedAt = time.Now()

	_, err := r.db.Pool.Exec(ctx, `
		INSERT INTO submissions (id, user_id, problem_id, language_id, code, status, test_cases_total, judge0_tokens, created_at)
		VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
	`, sub.ID, sub.UserID, sub.ProblemID, sub.LanguageID, sub.Code, sub.Status,
		sub.TestCasesTotal, sub.Judge0Tokens, sub.CreatedAt)
	if err != nil {
		return fmt.Errorf("failed to insert submission: %w", err)
	}
	return nil
}

func (r *SubmissionRepository) GetByID(ctx context.Context, id uuid.UUID) (*models.Submission, error) {
	sub := &models.Submission{}
	err := r.db.Pool.QueryRow(ctx, `
		SELECT id, user_id, problem_id, language_id, code, status, runtime_ms, memory_kb,
		       test_cases_passed, test_cases_total, error_message, judge0_tokens, created_at
		FROM submissions WHERE id = $1
	`, id).Scan(&sub.ID, &sub.UserID, &sub.ProblemID, &sub.LanguageID, &sub.Code, &sub.Status,
		&sub.RuntimeMs, &sub.MemoryKb, &sub.TestCasesPassed, &sub.TestCasesTotal,
		&sub.ErrorMessage, &sub.Judge0Tokens, &sub.CreatedAt)
	if err != nil {
		if err == pgx.ErrNoRows {
			return nil, ErrNotFound
		}
		return nil, fmt.Errorf("failed to get submission: %w", err)
	}
	return sub, nil
}

func (r *SubmissionRepository) Update(ctx context.Context, sub *models.Submission) error {
	result, err := r.db.Pool.Exec(ctx, `
		UPDATE submissions SET
			status = $2,
			runtime_ms = $3,
			memory_kb = $4,
			test_cases_passed = $5,
			error_message = $6
		WHERE id = $1
	`, sub.ID, sub.Status, sub.RuntimeMs, sub.MemoryKb, sub.TestCasesPassed, sub.ErrorMessage)
	if err != nil {
		return fmt.Errorf("failed to update submission: %w", err)
	}
	if result.RowsAffected() == 0 {
		return ErrNotFound
	}
	return nil
}

func (r *SubmissionRepository) ListByUser(ctx context.Context, userID uuid.UUID, req *models.SubmissionListRequest) ([]models.SubmissionWithDetails, int, error) {
	var conditions []string
	var args []interface{}
	argNum := 1

	conditions = append(conditions, fmt.Sprintf("s.user_id = $%d", argNum))
	args = append(args, userID)
	argNum++

	if req.ProblemID != uuid.Nil {
		conditions = append(conditions, fmt.Sprintf("s.problem_id = $%d", argNum))
		args = append(args, req.ProblemID)
		argNum++
	}
	if req.Status != "" {
		conditions = append(conditions, fmt.Sprintf("s.status = $%d", argNum))
		args = append(args, req.Status)
		argNum++
	}

	whereClause := "WHERE " + strings.Join(conditions, " AND ")

	var total int
	countQuery := fmt.Sprintf("SELECT COUNT(*) FROM submissions s %s", whereClause)
	err := r.db.Pool.QueryRow(ctx, countQuery, args...).Scan(&total)
	if err != nil {
		return nil, 0, fmt.Errorf("failed to count submissions: %w", err)
	}

	if req.Page <= 0 {
		req.Page = 1
	}
	if req.Limit <= 0 {
		req.Limit = 20
	}
	offset := (req.Page - 1) * req.Limit

	query := fmt.Sprintf(`
		SELECT s.id, s.user_id, s.problem_id, s.language_id, s.code, s.status,
		       s.runtime_ms, s.memory_kb, s.test_cases_passed, s.test_cases_total,
		       s.error_message, s.created_at,
		       p.title as problem_title, p.slug as problem_slug, l.name as language_name
		FROM submissions s
		JOIN problems p ON s.problem_id = p.id
		JOIN languages l ON s.language_id = l.id
		%s ORDER BY s.created_at DESC LIMIT $%d OFFSET $%d
	`, whereClause, argNum, argNum+1)
	args = append(args, req.Limit, offset)

	rows, err := r.db.Pool.Query(ctx, query, args...)
	if err != nil {
		return nil, 0, fmt.Errorf("failed to list submissions: %w", err)
	}
	defer rows.Close()

	var submissions []models.SubmissionWithDetails
	for rows.Next() {
		var s models.SubmissionWithDetails
		if err := rows.Scan(&s.ID, &s.UserID, &s.ProblemID, &s.LanguageID, &s.Code, &s.Status,
			&s.RuntimeMs, &s.MemoryKb, &s.TestCasesPassed, &s.TestCasesTotal,
			&s.ErrorMessage, &s.CreatedAt,
			&s.ProblemTitle, &s.ProblemSlug, &s.LanguageName); err != nil {
			return nil, 0, err
		}
		submissions = append(submissions, s)
	}

	return submissions, total, nil
}

func (r *SubmissionRepository) ListByProblem(ctx context.Context, userID, problemID uuid.UUID, limit int) ([]models.Submission, error) {
	if limit <= 0 {
		limit = 10
	}

	rows, err := r.db.Pool.Query(ctx, `
		SELECT id, user_id, problem_id, language_id, code, status, runtime_ms, memory_kb,
		       test_cases_passed, test_cases_total, error_message, created_at
		FROM submissions WHERE user_id = $1 AND problem_id = $2
		ORDER BY created_at DESC LIMIT $3
	`, userID, problemID, limit)
	if err != nil {
		return nil, fmt.Errorf("failed to list submissions by problem: %w", err)
	}
	defer rows.Close()

	var submissions []models.Submission
	for rows.Next() {
		var s models.Submission
		if err := rows.Scan(&s.ID, &s.UserID, &s.ProblemID, &s.LanguageID, &s.Code, &s.Status,
			&s.RuntimeMs, &s.MemoryKb, &s.TestCasesPassed, &s.TestCasesTotal,
			&s.ErrorMessage, &s.CreatedAt); err != nil {
			return nil, err
		}
		submissions = append(submissions, s)
	}
	return submissions, nil
}

func (r *SubmissionRepository) HasAcceptedSubmission(ctx context.Context, userID, problemID uuid.UUID) (bool, error) {
	var exists bool
	err := r.db.Pool.QueryRow(ctx, `
		SELECT EXISTS(SELECT 1 FROM submissions WHERE user_id = $1 AND problem_id = $2 AND status = 'accepted')
	`, userID, problemID).Scan(&exists)
	if err != nil {
		return false, fmt.Errorf("failed to check accepted submission: %w", err)
	}
	return exists, nil
}

func (r *SubmissionRepository) CountByProblem(ctx context.Context, userID, problemID uuid.UUID) (int, error) {
	var count int
	err := r.db.Pool.QueryRow(ctx, `
		SELECT COUNT(*) FROM submissions WHERE user_id = $1 AND problem_id = $2
	`, userID, problemID).Scan(&count)
	if err != nil {
		return 0, fmt.Errorf("failed to count submissions: %w", err)
	}
	return count, nil
}

// Submission Results

func (r *SubmissionRepository) CreateResult(ctx context.Context, result *models.SubmissionResult) error {
	result.ID = uuid.New()
	result.CreatedAt = time.Now()

	_, err := r.db.Pool.Exec(ctx, `
		INSERT INTO submission_results (id, submission_id, test_case_id, status, actual_output, runtime_ms, memory_kb, error_output, created_at)
		VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
	`, result.ID, result.SubmissionID, result.TestCaseID, result.Status,
		result.ActualOutput, result.RuntimeMs, result.MemoryKb, result.ErrorOutput, result.CreatedAt)
	if err != nil {
		return fmt.Errorf("failed to insert submission result: %w", err)
	}
	return nil
}

func (r *SubmissionRepository) GetResults(ctx context.Context, submissionID uuid.UUID) ([]models.SubmissionResultDetail, error) {
	rows, err := r.db.Pool.Query(ctx, `
		SELECT sr.id, sr.submission_id, sr.test_case_id, sr.status, sr.actual_output,
		       sr.runtime_ms, sr.memory_kb, sr.error_output, sr.created_at,
		       tc.input, tc.expected_output, tc.is_sample
		FROM submission_results sr
		JOIN test_cases tc ON sr.test_case_id = tc.id
		WHERE sr.submission_id = $1
		ORDER BY tc.order_index
	`, submissionID)
	if err != nil {
		return nil, fmt.Errorf("failed to get submission results: %w", err)
	}
	defer rows.Close()

	var results []models.SubmissionResultDetail
	for rows.Next() {
		var r models.SubmissionResultDetail
		if err := rows.Scan(&r.ID, &r.SubmissionID, &r.TestCaseID, &r.Status, &r.ActualOutput,
			&r.RuntimeMs, &r.MemoryKb, &r.ErrorOutput, &r.CreatedAt,
			&r.Input, &r.ExpectedOutput, &r.IsSample); err != nil {
			return nil, err
		}
		results = append(results, r)
	}
	return results, nil
}

func (r *SubmissionRepository) GetPendingSubmissions(ctx context.Context, limit int) ([]models.Submission, error) {
	if limit <= 0 {
		limit = 10
	}

	rows, err := r.db.Pool.Query(ctx, `
		SELECT id, user_id, problem_id, language_id, code, status, runtime_ms, memory_kb,
		       test_cases_passed, test_cases_total, error_message, judge0_tokens, created_at
		FROM submissions WHERE status IN ('pending', 'processing')
		ORDER BY created_at ASC LIMIT $1
	`, limit)
	if err != nil {
		return nil, fmt.Errorf("failed to get pending submissions: %w", err)
	}
	defer rows.Close()

	var submissions []models.Submission
	for rows.Next() {
		var s models.Submission
		if err := rows.Scan(&s.ID, &s.UserID, &s.ProblemID, &s.LanguageID, &s.Code, &s.Status,
			&s.RuntimeMs, &s.MemoryKb, &s.TestCasesPassed, &s.TestCasesTotal,
			&s.ErrorMessage, &s.Judge0Tokens, &s.CreatedAt); err != nil {
			return nil, err
		}
		submissions = append(submissions, s)
	}
	return submissions, nil
}
