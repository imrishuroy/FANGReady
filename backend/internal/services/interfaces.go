package services

import (
	"context"
	"time"

	"github.com/google/uuid"
	"github.com/imrishuroy/algopatterns/internal/models"
)

type HighlightServiceInterface interface {
	Create(ctx context.Context, userID uuid.UUID, req *models.CreateHighlightRequest) (*models.Highlight, error)
	GetByID(ctx context.Context, id, userID uuid.UUID) (*models.Highlight, error)
	GetByContent(ctx context.Context, userID uuid.UUID, contentType, contentID string) ([]models.Highlight, error)
	GetAllByUser(ctx context.Context, userID uuid.UUID, limit int, cursor *time.Time, contentType *string) (*models.HighlightListResponse, error)
	Update(ctx context.Context, id, userID uuid.UUID, req *models.UpdateHighlightRequest) (*models.Highlight, error)
	Delete(ctx context.Context, id, userID uuid.UUID) error
	BatchSync(ctx context.Context, userID uuid.UUID, req *models.BatchSyncRequest) (*models.BatchSyncResponse, error)
}

type PatternServiceInterface interface {
	Create(ctx context.Context, req *models.CreatePatternRequest) (*models.Pattern, error)
	GetByID(ctx context.Context, id string) (*models.Pattern, error)
	List(ctx context.Context, req *models.PatternListRequest) (*models.PatternListResponse, error)
	Update(ctx context.Context, id string, req *models.UpdatePatternRequest) (*models.Pattern, error)
	Delete(ctx context.Context, id string) error
	GetCategories(ctx context.Context) ([]string, error)
	BulkImport(ctx context.Context, req *models.BulkImportRequest) (*models.BulkImportResponse, error)
	Export(ctx context.Context) ([]byte, error)
	Search(ctx context.Context, query string) ([]models.Pattern, error)
}

type QuizServiceInterface interface {
	GetQuestions(ctx context.Context, patternID string, sectionSlug *string) (*models.GetQuestionsResponse, error)
	StartAttempt(ctx context.Context, userID *uuid.UUID, req *models.StartAttemptRequest) (*models.StartAttemptResponse, error)
	SubmitResponse(ctx context.Context, attemptID uuid.UUID, userID *uuid.UUID, req *models.SubmitResponseRequest) (*models.SubmitResponseResponse, error)
	CompleteAttempt(ctx context.Context, attemptID uuid.UUID, userID *uuid.UUID, req *models.CompleteAttemptRequest) (*models.CompleteAttemptResponse, error)
	GetAttemptHistory(ctx context.Context, userID uuid.UUID, req *models.AttemptHistoryRequest) (*models.AttemptHistoryResponse, error)
	GetAttemptByID(ctx context.Context, attemptID uuid.UUID, userID *uuid.UUID) (*models.QuizAttempt, error)
}
