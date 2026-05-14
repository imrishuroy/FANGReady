package middleware

import (
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/imrishuroy/algopatterns/internal/services"
	"github.com/imrishuroy/algopatterns/pkg/response"
)

const (
	ContextUserID    = "user_id"
	ContextUserEmail = "user_email"
)

type AuthMiddleware struct {
	authService *services.AuthService
}

func NewAuthMiddleware(authService *services.AuthService) *AuthMiddleware {
	return &AuthMiddleware{authService: authService}
}

func (m *AuthMiddleware) RequireAuth() gin.HandlerFunc {
	return func(c *gin.Context) {
		authHeader := c.GetHeader("Authorization")
		if authHeader == "" {
			response.Unauthorized(c, "Authorization header required")
			c.Abort()
			return
		}

		parts := strings.SplitN(authHeader, " ", 2)
		if len(parts) != 2 || strings.ToLower(parts[0]) != "bearer" {
			response.Unauthorized(c, "Invalid authorization header format")
			c.Abort()
			return
		}

		tokenString := parts[1]
		claims, err := m.authService.ValidateAccessToken(tokenString)
		if err != nil {
			switch err {
			case services.ErrTokenExpired:
				response.Unauthorized(c, "Token expired")
			case services.ErrTokenInvalid:
				response.Unauthorized(c, "Invalid token")
			default:
				response.Unauthorized(c, "Authentication failed")
			}
			c.Abort()
			return
		}

		userID, err := uuid.Parse(claims.UserID)
		if err != nil {
			response.Unauthorized(c, "Invalid user ID in token")
			c.Abort()
			return
		}

		c.Set(ContextUserID, userID)
		c.Set(ContextUserEmail, claims.Email)
		c.Next()
	}
}

func (m *AuthMiddleware) OptionalAuth() gin.HandlerFunc {
	return func(c *gin.Context) {
		authHeader := c.GetHeader("Authorization")
		if authHeader == "" {
			c.Next()
			return
		}

		parts := strings.SplitN(authHeader, " ", 2)
		if len(parts) != 2 || strings.ToLower(parts[0]) != "bearer" {
			c.Next()
			return
		}

		tokenString := parts[1]
		claims, err := m.authService.ValidateAccessToken(tokenString)
		if err != nil {
			c.Next()
			return
		}

		userID, err := uuid.Parse(claims.UserID)
		if err != nil {
			c.Next()
			return
		}

		c.Set(ContextUserID, userID)
		c.Set(ContextUserEmail, claims.Email)
		c.Next()
	}
}

func GetUserID(c *gin.Context) (uuid.UUID, bool) {
	userID, exists := c.Get(ContextUserID)
	if !exists {
		return uuid.Nil, false
	}
	return userID.(uuid.UUID), true
}

func GetUserEmail(c *gin.Context) (string, bool) {
	email, exists := c.Get(ContextUserEmail)
	if !exists {
		return "", false
	}
	return email.(string), true
}
