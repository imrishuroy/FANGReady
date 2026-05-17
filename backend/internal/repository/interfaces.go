package repository

import (
	"context"
	"time"

	"github.com/google/uuid"
	"github.com/imrishuroy/algopatterns/internal/models"
)

type HighlightRepositoryInterface interface {
	Create(ctx context.Context, h *models.Highlight) error
	GetByID(ctx context.Context, id, userID uuid.UUID) (*models.Highlight, error)
	GetByContent(ctx context.Context, userID uuid.UUID, contentType, contentID string) ([]models.Highlight, error)
	GetAllByUser(ctx context.Context, userID uuid.UUID, limit int, cursor *time.Time, contentType *string) ([]models.Highlight, int, error)
	Update(ctx context.Context, h *models.Highlight, expectedVersion int) error
	Delete(ctx context.Context, id, userID uuid.UUID) error
	GetChangesSince(ctx context.Context, userID uuid.UUID, since time.Time) ([]models.Highlight, error)
}
