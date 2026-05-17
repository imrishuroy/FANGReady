package services

import (
	"context"
	"errors"
	"time"

	"github.com/google/uuid"
	"github.com/imrishuroy/algopatterns/internal/models"
	"github.com/imrishuroy/algopatterns/internal/repository"
)

var (
	ErrHighlightExists   = errors.New("highlight already exists at this position")
	ErrHighlightNotFound = errors.New("highlight not found")
	ErrVersionConflict   = errors.New("highlight was modified by another request")
	ErrInvalidColor      = errors.New("invalid highlight color")
)

type HighlightService struct {
	repo repository.HighlightRepositoryInterface
}

func NewHighlightService(repo repository.HighlightRepositoryInterface) *HighlightService {
	return &HighlightService{repo: repo}
}

func (s *HighlightService) Create(ctx context.Context, userID uuid.UUID, req *models.CreateHighlightRequest) (*models.Highlight, error) {
	if !models.HighlightColor(req.Color).IsValid() {
		return nil, ErrInvalidColor
	}

	h := &models.Highlight{
		UserID:       userID,
		ContentType:  req.ContentType,
		ContentID:    req.ContentID,
		StartOffset:  req.StartOffset,
		EndOffset:    req.EndOffset,
		StartLine:    req.StartLine,
		EndLine:      req.EndLine,
		SelectedText: req.SelectedText,
		ContentHash:  req.ContentHash,
		Color:        req.Color,
		Note:         req.Note,
	}

	if err := s.repo.Create(ctx, h); err != nil {
		if errors.Is(err, repository.ErrHighlightExists) {
			return nil, ErrHighlightExists
		}
		return nil, err
	}

	return h, nil
}

func (s *HighlightService) GetByID(ctx context.Context, id, userID uuid.UUID) (*models.Highlight, error) {
	h, err := s.repo.GetByID(ctx, id, userID)
	if err != nil {
		if errors.Is(err, repository.ErrHighlightNotFound) {
			return nil, ErrHighlightNotFound
		}
		return nil, err
	}
	return h, nil
}

func (s *HighlightService) GetByContent(ctx context.Context, userID uuid.UUID, contentType, contentID string) ([]models.Highlight, error) {
	return s.repo.GetByContent(ctx, userID, contentType, contentID)
}

func (s *HighlightService) GetAllByUser(ctx context.Context, userID uuid.UUID, limit int, cursor *time.Time, contentType *string) (*models.HighlightListResponse, error) {
	if limit <= 0 || limit > 100 {
		limit = 20
	}

	highlights, totalCount, err := s.repo.GetAllByUser(ctx, userID, limit, cursor, contentType)
	if err != nil {
		return nil, err
	}

	response := &models.HighlightListResponse{
		Highlights: highlights,
		TotalCount: totalCount,
	}

	if len(highlights) == limit {
		lastCreatedAt := highlights[len(highlights)-1].CreatedAt.Format(time.RFC3339Nano)
		response.NextCursor = &lastCreatedAt
	}

	return response, nil
}

func (s *HighlightService) Update(ctx context.Context, id, userID uuid.UUID, req *models.UpdateHighlightRequest) (*models.Highlight, error) {
	h, err := s.repo.GetByID(ctx, id, userID)
	if err != nil {
		if errors.Is(err, repository.ErrHighlightNotFound) {
			return nil, ErrHighlightNotFound
		}
		return nil, err
	}

	if req.Color != nil {
		if !models.HighlightColor(*req.Color).IsValid() {
			return nil, ErrInvalidColor
		}
		h.Color = *req.Color
	}

	if req.Note != nil {
		h.Note = req.Note
	}

	if err := s.repo.Update(ctx, h, req.Version); err != nil {
		if errors.Is(err, repository.ErrVersionConflict) {
			return nil, ErrVersionConflict
		}
		if errors.Is(err, repository.ErrHighlightNotFound) {
			return nil, ErrHighlightNotFound
		}
		return nil, err
	}

	return h, nil
}

func (s *HighlightService) Delete(ctx context.Context, id, userID uuid.UUID) error {
	err := s.repo.Delete(ctx, id, userID)
	if err != nil {
		if errors.Is(err, repository.ErrHighlightNotFound) {
			return ErrHighlightNotFound
		}
		return err
	}
	return nil
}

func (s *HighlightService) BatchSync(ctx context.Context, userID uuid.UUID, req *models.BatchSyncRequest) (*models.BatchSyncResponse, error) {
	response := &models.BatchSyncResponse{
		Results: make([]models.SyncOperationResult, 0, len(req.Operations)),
	}

	for _, op := range req.Operations {
		result := models.SyncOperationResult{
			Op:       op.Op,
			ClientID: op.ClientID,
			ID:       op.ID,
		}

		switch op.Op {
		case models.SyncOpCreate:
			if op.Data == nil {
				result.Success = false
				result.Error = "missing data for create operation"
			} else {
				highlight, err := s.Create(ctx, userID, op.Data)
				if err != nil {
					result.Success = false
					result.Error = err.Error()
				} else {
					result.Success = true
					result.Highlight = highlight
				}
			}

		case models.SyncOpUpdate:
			if op.ID == nil || op.Update == nil {
				result.Success = false
				result.Error = "missing id or update data for update operation"
			} else {
				highlight, err := s.Update(ctx, *op.ID, userID, op.Update)
				if err != nil {
					result.Success = false
					result.Error = err.Error()
				} else {
					result.Success = true
					result.Highlight = highlight
				}
			}

		case models.SyncOpDelete:
			if op.ID == nil {
				result.Success = false
				result.Error = "missing id for delete operation"
			} else {
				err := s.Delete(ctx, *op.ID, userID)
				if err != nil {
					result.Success = false
					result.Error = err.Error()
				} else {
					result.Success = true
				}
			}
		}

		response.Results = append(response.Results, result)
	}

	// If lastSyncAt is provided, fetch changes since then
	if req.LastSyncAt != nil {
		changes, err := s.repo.GetChangesSince(ctx, userID, *req.LastSyncAt)
		if err != nil {
			// Log error but don't fail the entire sync
			// The individual operations already succeeded
		} else {
			response.ServerChanges = changes
		}
	}

	return response, nil
}
