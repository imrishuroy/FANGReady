package services

import (
	"context"
	"crypto/rand"
	"crypto/sha256"
	"encoding/base64"
	"errors"
	"fmt"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"github.com/google/uuid"
	"github.com/imrishuroy/algopatterns/internal/config"
	"github.com/imrishuroy/algopatterns/internal/models"
	"github.com/imrishuroy/algopatterns/internal/repository"
	"golang.org/x/crypto/bcrypt"
)

var (
	ErrInvalidCredentials = errors.New("invalid credentials")
	ErrUserNotFound       = errors.New("user not found")
	ErrTokenExpired       = errors.New("token expired")
	ErrTokenRevoked       = errors.New("token revoked")
	ErrTokenInvalid       = errors.New("invalid token")
	ErrEmailExists        = errors.New("email already exists")
)

type AuthService struct {
	userRepo repository.UserRepositoryInterface
	config   *config.AuthConfig
}

type JWTClaims struct {
	UserID string `json:"userId"`
	Email  string `json:"email"`
	jwt.RegisteredClaims
}

func NewAuthService(userRepo repository.UserRepositoryInterface, cfg *config.AuthConfig) *AuthService {
	return &AuthService{
		userRepo: userRepo,
		config:   cfg,
	}
}

func (s *AuthService) Register(ctx context.Context, req *models.RegisterRequest) (*models.User, error) {
	passwordHash, err := bcrypt.GenerateFromPassword([]byte(req.Password), s.config.BCryptCost)
	if err != nil {
		return nil, fmt.Errorf("failed to hash password: %w", err)
	}

	user := &models.User{
		ID:           uuid.New(),
		Email:        req.Email,
		PasswordHash: string(passwordHash),
		Name:         req.Name,
	}

	if err := s.userRepo.Create(ctx, user); err != nil {
		if errors.Is(err, repository.ErrEmailExists) {
			return nil, ErrEmailExists
		}
		return nil, err
	}

	return user, nil
}

func (s *AuthService) Login(ctx context.Context, req *models.LoginRequest) (*models.User, error) {
	user, err := s.userRepo.GetByEmail(ctx, req.Email)
	if err != nil {
		if errors.Is(err, repository.ErrNotFound) {
			return nil, ErrInvalidCredentials
		}
		return nil, err
	}

	if err := bcrypt.CompareHashAndPassword([]byte(user.PasswordHash), []byte(req.Password)); err != nil {
		return nil, ErrInvalidCredentials
	}

	return user, nil
}

func (s *AuthService) GenerateAccessToken(user *models.User) (string, int64, error) {
	expiresAt := time.Now().Add(s.config.AccessTokenDuration)
	claims := JWTClaims{
		UserID: user.ID.String(),
		Email:  user.Email,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(expiresAt),
			IssuedAt:  jwt.NewNumericDate(time.Now()),
			Subject:   user.ID.String(),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := token.SignedString([]byte(s.config.JWTSecret))
	if err != nil {
		return "", 0, fmt.Errorf("failed to sign token: %w", err)
	}

	return tokenString, int64(s.config.AccessTokenDuration.Seconds()), nil
}

func (s *AuthService) GenerateRefreshToken(ctx context.Context, userID uuid.UUID) (string, error) {
	tokenBytes := make([]byte, 32)
	if _, err := rand.Read(tokenBytes); err != nil {
		return "", fmt.Errorf("failed to generate random token: %w", err)
	}
	rawToken := base64.URLEncoding.EncodeToString(tokenBytes)

	hash := sha256.Sum256([]byte(rawToken))
	tokenHash := base64.URLEncoding.EncodeToString(hash[:])

	refreshToken := &models.RefreshToken{
		UserID:    userID,
		TokenHash: tokenHash,
		ExpiresAt: time.Now().Add(s.config.RefreshTokenDuration),
	}

	if err := s.userRepo.CreateRefreshToken(ctx, refreshToken); err != nil {
		return "", err
	}

	return rawToken, nil
}

func (s *AuthService) ValidateAccessToken(tokenString string) (*JWTClaims, error) {
	token, err := jwt.ParseWithClaims(tokenString, &JWTClaims{}, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}
		return []byte(s.config.JWTSecret), nil
	})
	if err != nil {
		if errors.Is(err, jwt.ErrTokenExpired) {
			return nil, ErrTokenExpired
		}
		return nil, ErrTokenInvalid
	}

	claims, ok := token.Claims.(*JWTClaims)
	if !ok || !token.Valid {
		return nil, ErrTokenInvalid
	}

	return claims, nil
}

func (s *AuthService) RefreshAccessToken(ctx context.Context, rawRefreshToken string) (*models.User, string, int64, error) {
	hash := sha256.Sum256([]byte(rawRefreshToken))
	tokenHash := base64.URLEncoding.EncodeToString(hash[:])

	refreshToken, err := s.userRepo.GetRefreshToken(ctx, tokenHash)
	if err != nil {
		if errors.Is(err, repository.ErrNotFound) {
			return nil, "", 0, ErrTokenInvalid
		}
		return nil, "", 0, err
	}

	if refreshToken.RevokedAt != nil {
		return nil, "", 0, ErrTokenRevoked
	}

	if time.Now().After(refreshToken.ExpiresAt) {
		return nil, "", 0, ErrTokenExpired
	}

	user, err := s.userRepo.GetByID(ctx, refreshToken.UserID)
	if err != nil {
		return nil, "", 0, err
	}

	accessToken, expiresIn, err := s.GenerateAccessToken(user)
	if err != nil {
		return nil, "", 0, err
	}

	return user, accessToken, expiresIn, nil
}

func (s *AuthService) Logout(ctx context.Context, rawRefreshToken string) error {
	hash := sha256.Sum256([]byte(rawRefreshToken))
	tokenHash := base64.URLEncoding.EncodeToString(hash[:])
	return s.userRepo.RevokeRefreshToken(ctx, tokenHash)
}

func (s *AuthService) LogoutAll(ctx context.Context, userID uuid.UUID) error {
	return s.userRepo.RevokeAllUserTokens(ctx, userID)
}

func (s *AuthService) GetUser(ctx context.Context, userID uuid.UUID) (*models.User, error) {
	user, err := s.userRepo.GetByID(ctx, userID)
	if err != nil {
		if errors.Is(err, repository.ErrNotFound) {
			return nil, ErrUserNotFound
		}
		return nil, err
	}
	return user, nil
}

func (s *AuthService) ChangePassword(ctx context.Context, userID uuid.UUID, currentPassword, newPassword string) error {
	user, err := s.userRepo.GetByID(ctx, userID)
	if err != nil {
		return err
	}

	if err := bcrypt.CompareHashAndPassword([]byte(user.PasswordHash), []byte(currentPassword)); err != nil {
		return ErrInvalidCredentials
	}

	newHash, err := bcrypt.GenerateFromPassword([]byte(newPassword), s.config.BCryptCost)
	if err != nil {
		return fmt.Errorf("failed to hash password: %w", err)
	}

	if err := s.userRepo.UpdatePassword(ctx, userID, string(newHash)); err != nil {
		return err
	}

	return s.userRepo.RevokeAllUserTokens(ctx, userID)
}

func (s *AuthService) UpdateProfile(ctx context.Context, userID uuid.UUID, req *models.UpdateProfileRequest) (*models.User, error) {
	user, err := s.userRepo.GetByID(ctx, userID)
	if err != nil {
		return nil, err
	}

	if req.Name != nil {
		user.Name = req.Name
	}

	if err := s.userRepo.Update(ctx, user); err != nil {
		return nil, err
	}

	return user, nil
}

func (s *AuthService) DeleteAccount(ctx context.Context, userID uuid.UUID) error {
	return s.userRepo.Delete(ctx, userID)
}

func UserToResponse(user *models.User) models.UserResponse {
	return models.UserResponse{
		ID:            user.ID.String(),
		Email:         user.Email,
		Name:          user.Name,
		EmailVerified: user.EmailVerified,
	}
}
