package repository

import (
	"context"
	"fmt"
	"strings"
	"time"

	"github.com/google/uuid"
	"github.com/imrishuroy/algopatterns/internal/models"
	"github.com/jackc/pgx/v5"
)

type ProblemRepository struct {
	db *Database
}

func NewProblemRepository(db *Database) *ProblemRepository {
	return &ProblemRepository{db: db}
}

func (r *ProblemRepository) Create(ctx context.Context, problem *models.Problem) error {
	now := time.Now()
	problem.ID = uuid.New()
	problem.CreatedAt = now
	problem.UpdatedAt = now

	_, err := r.db.Pool.Exec(ctx, `
		INSERT INTO problems (id, pattern_id, title, slug, difficulty, description, constraints, examples, hints, created_at, updated_at)
		VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
	`, problem.ID, problem.PatternID, problem.Title, problem.Slug, problem.Difficulty,
		problem.Description, problem.Constraints, problem.Examples, problem.Hints,
		problem.CreatedAt, problem.UpdatedAt)
	if err != nil {
		if strings.Contains(err.Error(), "duplicate key") {
			return ErrDuplicate
		}
		return fmt.Errorf("failed to insert problem: %w", err)
	}

	return nil
}

func (r *ProblemRepository) GetByID(ctx context.Context, id uuid.UUID) (*models.Problem, error) {
	problem := &models.Problem{}
	err := r.db.Pool.QueryRow(ctx, `
		SELECT id, pattern_id, title, slug, difficulty, description, constraints, examples, hints, created_at, updated_at
		FROM problems WHERE id = $1
	`, id).Scan(&problem.ID, &problem.PatternID, &problem.Title, &problem.Slug, &problem.Difficulty,
		&problem.Description, &problem.Constraints, &problem.Examples, &problem.Hints,
		&problem.CreatedAt, &problem.UpdatedAt)
	if err != nil {
		if err == pgx.ErrNoRows {
			return nil, ErrNotFound
		}
		return nil, fmt.Errorf("failed to get problem: %w", err)
	}
	return problem, nil
}

func (r *ProblemRepository) GetBySlug(ctx context.Context, slug string) (*models.Problem, error) {
	problem := &models.Problem{}
	err := r.db.Pool.QueryRow(ctx, `
		SELECT id, pattern_id, title, slug, difficulty, description, constraints, examples, hints, created_at, updated_at
		FROM problems WHERE slug = $1
	`, slug).Scan(&problem.ID, &problem.PatternID, &problem.Title, &problem.Slug, &problem.Difficulty,
		&problem.Description, &problem.Constraints, &problem.Examples, &problem.Hints,
		&problem.CreatedAt, &problem.UpdatedAt)
	if err != nil {
		if err == pgx.ErrNoRows {
			return nil, ErrNotFound
		}
		return nil, fmt.Errorf("failed to get problem by slug: %w", err)
	}
	return problem, nil
}

func (r *ProblemRepository) List(ctx context.Context, req *models.ProblemListRequest) ([]models.Problem, int, error) {
	var conditions []string
	var args []interface{}
	argNum := 1

	if req.Search != "" {
		conditions = append(conditions, fmt.Sprintf("(title ILIKE $%d OR description ILIKE $%d)", argNum, argNum+1))
		args = append(args, "%"+req.Search+"%", "%"+req.Search+"%")
		argNum += 2
	}
	if req.Difficulty != "" {
		conditions = append(conditions, fmt.Sprintf("difficulty = $%d", argNum))
		args = append(args, req.Difficulty)
		argNum++
	}
	if req.PatternID != "" {
		conditions = append(conditions, fmt.Sprintf("pattern_id = $%d", argNum))
		args = append(args, req.PatternID)
		argNum++
	}

	whereClause := ""
	if len(conditions) > 0 {
		whereClause = "WHERE " + strings.Join(conditions, " AND ")
	}

	var total int
	countQuery := fmt.Sprintf("SELECT COUNT(*) FROM problems %s", whereClause)
	err := r.db.Pool.QueryRow(ctx, countQuery, args...).Scan(&total)
	if err != nil {
		return nil, 0, fmt.Errorf("failed to count problems: %w", err)
	}

	if req.Page <= 0 {
		req.Page = 1
	}
	if req.Limit <= 0 {
		req.Limit = 20
	}
	offset := (req.Page - 1) * req.Limit

	query := fmt.Sprintf(`
		SELECT id, pattern_id, title, slug, difficulty, description, constraints, examples, hints, created_at, updated_at
		FROM problems %s ORDER BY created_at DESC LIMIT $%d OFFSET $%d
	`, whereClause, argNum, argNum+1)
	args = append(args, req.Limit, offset)

	rows, err := r.db.Pool.Query(ctx, query, args...)
	if err != nil {
		return nil, 0, fmt.Errorf("failed to list problems: %w", err)
	}
	defer rows.Close()

	var problems []models.Problem
	for rows.Next() {
		var p models.Problem
		if err := rows.Scan(&p.ID, &p.PatternID, &p.Title, &p.Slug, &p.Difficulty,
			&p.Description, &p.Constraints, &p.Examples, &p.Hints,
			&p.CreatedAt, &p.UpdatedAt); err != nil {
			return nil, 0, err
		}
		problems = append(problems, p)
	}

	return problems, total, nil
}

func (r *ProblemRepository) Update(ctx context.Context, id uuid.UUID, req *models.UpdateProblemRequest) error {
	result, err := r.db.Pool.Exec(ctx, `
		UPDATE problems SET
			pattern_id = COALESCE($2, pattern_id),
			title = COALESCE(NULLIF($3, ''), title),
			difficulty = COALESCE(NULLIF($4, ''), difficulty),
			description = COALESCE(NULLIF($5, ''), description),
			constraints = $6,
			examples = $7,
			hints = $8,
			updated_at = $9
		WHERE id = $1
	`, id, req.PatternID, req.Title, req.Difficulty, req.Description,
		req.Constraints, req.Examples, req.Hints, time.Now())
	if err != nil {
		return fmt.Errorf("failed to update problem: %w", err)
	}
	if result.RowsAffected() == 0 {
		return ErrNotFound
	}
	return nil
}

func (r *ProblemRepository) Delete(ctx context.Context, id uuid.UUID) error {
	result, err := r.db.Pool.Exec(ctx, "DELETE FROM problems WHERE id = $1", id)
	if err != nil {
		return fmt.Errorf("failed to delete problem: %w", err)
	}
	if result.RowsAffected() == 0 {
		return ErrNotFound
	}
	return nil
}

// Test Cases

func (r *ProblemRepository) CreateTestCase(ctx context.Context, problemID uuid.UUID, tc *models.TestCase) error {
	tc.ID = uuid.New()
	tc.ProblemID = problemID
	tc.CreatedAt = time.Now()

	_, err := r.db.Pool.Exec(ctx, `
		INSERT INTO test_cases (id, problem_id, input, expected_output, is_sample, order_index, explanation, created_at)
		VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
	`, tc.ID, tc.ProblemID, tc.Input, tc.ExpectedOutput, tc.IsSample, tc.OrderIndex, tc.Explanation, tc.CreatedAt)
	if err != nil {
		return fmt.Errorf("failed to insert test case: %w", err)
	}
	return nil
}

func (r *ProblemRepository) GetTestCases(ctx context.Context, problemID uuid.UUID, sampleOnly bool) ([]models.TestCase, error) {
	query := `
		SELECT id, problem_id, input, expected_output, is_sample, order_index, explanation, created_at
		FROM test_cases WHERE problem_id = $1
	`
	if sampleOnly {
		query += " AND is_sample = true"
	}
	query += " ORDER BY order_index"

	rows, err := r.db.Pool.Query(ctx, query, problemID)
	if err != nil {
		return nil, fmt.Errorf("failed to get test cases: %w", err)
	}
	defer rows.Close()

	var testCases []models.TestCase
	for rows.Next() {
		var tc models.TestCase
		if err := rows.Scan(&tc.ID, &tc.ProblemID, &tc.Input, &tc.ExpectedOutput,
			&tc.IsSample, &tc.OrderIndex, &tc.Explanation, &tc.CreatedAt); err != nil {
			return nil, err
		}
		testCases = append(testCases, tc)
	}
	return testCases, nil
}

func (r *ProblemRepository) DeleteTestCase(ctx context.Context, id uuid.UUID) error {
	result, err := r.db.Pool.Exec(ctx, "DELETE FROM test_cases WHERE id = $1", id)
	if err != nil {
		return fmt.Errorf("failed to delete test case: %w", err)
	}
	if result.RowsAffected() == 0 {
		return ErrNotFound
	}
	return nil
}

// Templates

func (r *ProblemRepository) CreateTemplate(ctx context.Context, problemID uuid.UUID, tmpl *models.ProblemTemplate) error {
	tmpl.ID = uuid.New()
	tmpl.ProblemID = problemID
	tmpl.CreatedAt = time.Now()

	_, err := r.db.Pool.Exec(ctx, `
		INSERT INTO problem_templates (id, problem_id, language_id, template_code, wrapper_code, created_at)
		VALUES ($1, $2, $3, $4, $5, $6)
		ON CONFLICT (problem_id, language_id) DO UPDATE SET
			template_code = EXCLUDED.template_code,
			wrapper_code = EXCLUDED.wrapper_code
	`, tmpl.ID, tmpl.ProblemID, tmpl.LanguageID, tmpl.TemplateCode, tmpl.WrapperCode, tmpl.CreatedAt)
	if err != nil {
		return fmt.Errorf("failed to insert template: %w", err)
	}
	return nil
}

func (r *ProblemRepository) GetTemplates(ctx context.Context, problemID uuid.UUID) ([]models.ProblemTemplateWithLanguage, error) {
	rows, err := r.db.Pool.Query(ctx, `
		SELECT pt.id, pt.problem_id, pt.language_id, pt.template_code, pt.wrapper_code, pt.created_at,
		       l.name as language_name, l.slug as language_slug
		FROM problem_templates pt
		JOIN languages l ON pt.language_id = l.id
		WHERE pt.problem_id = $1 AND l.is_active = true
		ORDER BY l.name
	`, problemID)
	if err != nil {
		return nil, fmt.Errorf("failed to get templates: %w", err)
	}
	defer rows.Close()

	var templates []models.ProblemTemplateWithLanguage
	for rows.Next() {
		var t models.ProblemTemplateWithLanguage
		if err := rows.Scan(&t.ID, &t.ProblemID, &t.LanguageID, &t.TemplateCode, &t.WrapperCode,
			&t.CreatedAt, &t.LanguageName, &t.LanguageSlug); err != nil {
			return nil, err
		}
		templates = append(templates, t)
	}
	return templates, nil
}

func (r *ProblemRepository) GetTemplate(ctx context.Context, problemID uuid.UUID, languageID int) (*models.ProblemTemplate, error) {
	tmpl := &models.ProblemTemplate{}
	err := r.db.Pool.QueryRow(ctx, `
		SELECT id, problem_id, language_id, template_code, wrapper_code, created_at
		FROM problem_templates WHERE problem_id = $1 AND language_id = $2
	`, problemID, languageID).Scan(&tmpl.ID, &tmpl.ProblemID, &tmpl.LanguageID,
		&tmpl.TemplateCode, &tmpl.WrapperCode, &tmpl.CreatedAt)
	if err != nil {
		if err == pgx.ErrNoRows {
			return nil, ErrNotFound
		}
		return nil, fmt.Errorf("failed to get template: %w", err)
	}
	return tmpl, nil
}

// Languages

func (r *ProblemRepository) GetLanguages(ctx context.Context) ([]models.Language, error) {
	rows, err := r.db.Pool.Query(ctx, `
		SELECT id, name, slug, version, is_active FROM languages WHERE is_active = true ORDER BY name
	`)
	if err != nil {
		return nil, fmt.Errorf("failed to get languages: %w", err)
	}
	defer rows.Close()

	var languages []models.Language
	for rows.Next() {
		var l models.Language
		if err := rows.Scan(&l.ID, &l.Name, &l.Slug, &l.Version, &l.IsActive); err != nil {
			return nil, err
		}
		languages = append(languages, l)
	}
	return languages, nil
}

func (r *ProblemRepository) GetLanguageByID(ctx context.Context, id int) (*models.Language, error) {
	lang := &models.Language{}
	err := r.db.Pool.QueryRow(ctx, `
		SELECT id, name, slug, version, is_active FROM languages WHERE id = $1
	`, id).Scan(&lang.ID, &lang.Name, &lang.Slug, &lang.Version, &lang.IsActive)
	if err != nil {
		if err == pgx.ErrNoRows {
			return nil, ErrNotFound
		}
		return nil, fmt.Errorf("failed to get language: %w", err)
	}
	return lang, nil
}
