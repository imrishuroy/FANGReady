package services

import (
	"context"
	"errors"

	"github.com/imrishuroy/faangready-backend/internal/models"
	"github.com/imrishuroy/faangready-backend/internal/repository"
)

type PatternService struct {
	repo *repository.PatternRepository
}

func NewPatternService(repo *repository.PatternRepository) *PatternService {
	return &PatternService{repo: repo}
}

func (s *PatternService) Create(ctx context.Context, req *models.CreatePatternRequest) (*models.Pattern, error) {
	pattern := &models.Pattern{
		ID:              req.ID,
		Category:        req.Category,
		Icon:            req.Icon,
		Difficulty:      req.Difficulty,
		Description:     req.Description,
		WhenToUse:       req.WhenToUse,
		CodeTemplates:   req.CodeTemplates,
		KeyInsights:     req.KeyInsights,
		CommonMistakes:  req.CommonMistakes,
		Variations:      req.Variations,
		CommonProblems:  req.CommonProblems,
		TimeComplexity:  req.TimeComplexity,
		SpaceComplexity: req.SpaceComplexity,
	}

	if err := s.repo.Create(ctx, pattern); err != nil {
		return nil, err
	}

	return pattern, nil
}

func (s *PatternService) GetByID(ctx context.Context, id string) (*models.Pattern, error) {
	return s.repo.GetByID(ctx, id)
}

func (s *PatternService) List(ctx context.Context, req *models.PatternListRequest) (*models.PatternListResponse, error) {
	req.SetDefaults()

	patterns, total, err := s.repo.List(ctx, req)
	if err != nil {
		return nil, err
	}

	totalPages := int(total) / req.PageSize
	if int(total)%req.PageSize > 0 {
		totalPages++
	}

	return &models.PatternListResponse{
		Patterns: patterns,
		Pagination: models.Pagination{
			Page:       req.Page,
			PageSize:   req.PageSize,
			TotalItems: total,
			TotalPages: totalPages,
		},
	}, nil
}

func (s *PatternService) Update(ctx context.Context, id string, req *models.UpdatePatternRequest) (*models.Pattern, error) {
	existing, err := s.repo.GetByID(ctx, id)
	if err != nil {
		return nil, err
	}

	updates := make(map[string]interface{})
	if req.Category != nil {
		updates["category"] = *req.Category
		existing.Category = *req.Category
	}
	if req.Icon != nil {
		updates["icon"] = *req.Icon
		existing.Icon = *req.Icon
	}
	if req.Difficulty != nil {
		updates["difficulty"] = *req.Difficulty
		existing.Difficulty = *req.Difficulty
	}
	if req.Description != nil {
		updates["description"] = *req.Description
		existing.Description = *req.Description
	}
	if req.TimeComplexity != nil {
		updates["time_complexity"] = *req.TimeComplexity
		existing.TimeComplexity = *req.TimeComplexity
	}
	if req.SpaceComplexity != nil {
		updates["space_complexity"] = *req.SpaceComplexity
		existing.SpaceComplexity = *req.SpaceComplexity
	}

	if len(updates) > 0 {
		if err := s.repo.Update(ctx, id, updates); err != nil {
			return nil, err
		}
	}

	return existing, nil
}

func (s *PatternService) Delete(ctx context.Context, id string) error {
	return s.repo.Delete(ctx, id)
}

func (s *PatternService) GetCategories(ctx context.Context) ([]string, error) {
	return s.repo.GetCategories(ctx)
}

func (s *PatternService) BulkImport(ctx context.Context, req *models.BulkImportRequest) (*models.BulkImportResponse, error) {
	patterns := make([]models.Pattern, len(req.Patterns))
	for i, p := range req.Patterns {
		patterns[i] = models.Pattern{
			ID:              p.ID,
			Category:        p.Category,
			Icon:            p.Icon,
			Difficulty:      p.Difficulty,
			Description:     p.Description,
			WhenToUse:       p.WhenToUse,
			CodeTemplates:   p.CodeTemplates,
			KeyInsights:     p.KeyInsights,
			CommonMistakes:  p.CommonMistakes,
			Variations:      p.Variations,
			CommonProblems:  p.CommonProblems,
			TimeComplexity:  p.TimeComplexity,
			SpaceComplexity: p.SpaceComplexity,
		}
	}

	imported, errs, err := s.repo.BulkCreate(ctx, patterns)
	if err != nil {
		return nil, err
	}

	return &models.BulkImportResponse{
		Imported: imported,
		Failed:   len(errs),
		Errors:   errs,
	}, nil
}

func (s *PatternService) Export(ctx context.Context) ([]byte, error) {
	return s.repo.ExportAll(ctx)
}

func (s *PatternService) Search(ctx context.Context, query string) ([]models.Pattern, error) {
	req := &models.PatternListRequest{
		Search:   query,
		Page:     1,
		PageSize: 100,
	}
	req.SetDefaults()

	patterns, _, err := s.repo.List(ctx, req)
	return patterns, err
}

func IsNotFound(err error) bool {
	return errors.Is(err, repository.ErrNotFound)
}

func IsDuplicate(err error) bool {
	return errors.Is(err, repository.ErrDuplicate)
}
