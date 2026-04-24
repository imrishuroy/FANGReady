package services

import (
	"context"

	"github.com/google/uuid"
	"github.com/imrishuroy/faangready-backend/internal/repository"
)

type ProgressService struct {
	userRepo *repository.UserRepository
}

func NewProgressService(userRepo *repository.UserRepository) *ProgressService {
	return &ProgressService{userRepo: userRepo}
}

func (s *ProgressService) GetProgress(ctx context.Context, userID uuid.UUID) ([]string, error) {
	return s.userRepo.GetProgress(ctx, userID)
}

func (s *ProgressService) ToggleProgress(ctx context.Context, userID uuid.UUID, questionID string, completed bool) error {
	return s.userRepo.SetProgress(ctx, userID, questionID, completed)
}

func (s *ProgressService) SyncProgress(ctx context.Context, userID uuid.UUID, questionIDs []string) ([]string, error) {
	if err := s.userRepo.SyncProgress(ctx, userID, questionIDs); err != nil {
		return nil, err
	}
	return s.userRepo.GetProgress(ctx, userID)
}
