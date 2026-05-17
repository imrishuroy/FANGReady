package repository

import (
	"context"

	"github.com/google/uuid"
	"github.com/imrishuroy/algopatterns/internal/models"
)

type UserRepositoryInterface interface {
	Create(ctx context.Context, user *models.User) error
	GetByID(ctx context.Context, id uuid.UUID) (*models.User, error)
	GetByEmail(ctx context.Context, email string) (*models.User, error)
	Update(ctx context.Context, user *models.User) error
	UpdatePassword(ctx context.Context, userID uuid.UUID, passwordHash string) error
	Delete(ctx context.Context, id uuid.UUID) error
	CreateRefreshToken(ctx context.Context, token *models.RefreshToken) error
	GetRefreshToken(ctx context.Context, tokenHash string) (*models.RefreshToken, error)
	RevokeRefreshToken(ctx context.Context, tokenHash string) error
	RevokeAllUserTokens(ctx context.Context, userID uuid.UUID) error
}

type PatternRepositoryInterface interface {
	Create(ctx context.Context, pattern *models.Pattern) error
	GetByID(ctx context.Context, id string) (*models.Pattern, error)
	List(ctx context.Context, req *models.PatternListRequest) ([]models.Pattern, int64, error)
	Update(ctx context.Context, id string, updates map[string]interface{}) error
	Delete(ctx context.Context, id string) error
	GetCategories(ctx context.Context) ([]string, error)
	BulkCreate(ctx context.Context, patterns []models.Pattern) (int, []string, error)
	ExportAll(ctx context.Context) ([]byte, error)
}
