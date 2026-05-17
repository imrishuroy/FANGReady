package models

import (
	"testing"
	"time"

	"github.com/google/uuid"
	"github.com/stretchr/testify/assert"
)

func TestUser_Structure(t *testing.T) {
	name := "Test User"
	now := time.Now()

	user := User{
		ID:            uuid.New(),
		Email:         "test@example.com",
		PasswordHash:  "hashed_password",
		Name:          &name,
		EmailVerified: true,
		CreatedAt:     now,
		UpdatedAt:     now,
	}

	assert.NotEqual(t, uuid.Nil, user.ID)
	assert.Equal(t, "test@example.com", user.Email)
	assert.Equal(t, "hashed_password", user.PasswordHash)
	assert.NotNil(t, user.Name)
	assert.Equal(t, "Test User", *user.Name)
	assert.True(t, user.EmailVerified)
	assert.Equal(t, now, user.CreatedAt)
	assert.Equal(t, now, user.UpdatedAt)
}

func TestRefreshToken_Structure(t *testing.T) {
	userID := uuid.New()
	now := time.Now()

	token := RefreshToken{
		ID:        uuid.New(),
		UserID:    userID,
		TokenHash: "token_hash_value",
		ExpiresAt: now.Add(7 * 24 * time.Hour),
		CreatedAt: now,
		RevokedAt: nil,
	}

	assert.NotEqual(t, uuid.Nil, token.ID)
	assert.Equal(t, userID, token.UserID)
	assert.NotEmpty(t, token.TokenHash)
	assert.True(t, token.ExpiresAt.After(now))
	assert.Nil(t, token.RevokedAt)
}

func TestRefreshToken_Revoked(t *testing.T) {
	now := time.Now()
	revokedAt := now

	token := RefreshToken{
		ID:        uuid.New(),
		UserID:    uuid.New(),
		TokenHash: "token_hash",
		ExpiresAt: now.Add(time.Hour),
		CreatedAt: now.Add(-time.Hour),
		RevokedAt: &revokedAt,
	}

	assert.NotEmpty(t, token.TokenHash)
	assert.NotNil(t, token.RevokedAt)
	assert.Equal(t, revokedAt, *token.RevokedAt)
}

func TestUserProgress_Structure(t *testing.T) {
	userID := uuid.New()
	now := time.Now()

	progress := UserProgress{
		ID:          uuid.New(),
		UserID:      userID,
		QuestionID:  "two-sum",
		CompletedAt: now,
	}

	assert.NotEqual(t, uuid.Nil, progress.ID)
	assert.Equal(t, userID, progress.UserID)
	assert.Equal(t, "two-sum", progress.QuestionID)
	assert.Equal(t, now, progress.CompletedAt)
}
