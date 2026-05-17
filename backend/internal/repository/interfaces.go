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

type QuizRepositoryInterface interface {
	// Questions
	GetQuestionsByPattern(ctx context.Context, patternID string, sectionSlug *string) ([]models.QuizQuestion, error)
	GetQuestionByID(ctx context.Context, id uuid.UUID) (*models.QuizQuestion, error)

	// Attempts
	CreateAttempt(ctx context.Context, a *models.QuizAttempt) error
	GetAttemptByID(ctx context.Context, id uuid.UUID) (*models.QuizAttempt, error)
	UpdateAttempt(ctx context.Context, a *models.QuizAttempt) error
	GetAttemptsByUser(ctx context.Context, userID uuid.UUID, patternID *string, sectionSlug *string, limit int, cursor *time.Time) ([]models.QuizAttempt, int, error)
	GetBestScore(ctx context.Context, userID uuid.UUID, patternID string, sectionSlug *string) (*float64, error)

	// Responses
	CreateResponse(ctx context.Context, resp *models.QuizResponse) error
	GetResponsesByAttempt(ctx context.Context, attemptID uuid.UUID) ([]models.QuizResponse, error)
	CountCorrectResponses(ctx context.Context, attemptID uuid.UUID) (int, error)
}
