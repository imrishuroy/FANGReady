package models

type RegisterRequest struct {
	Email    string  `json:"email" binding:"required,email"`
	Password string  `json:"password" binding:"required,min=8"`
	Name     *string `json:"name,omitempty"`
}

type LoginRequest struct {
	Email    string `json:"email" binding:"required,email"`
	Password string `json:"password" binding:"required"`
}

type AuthResponse struct {
	User        UserResponse `json:"user"`
	AccessToken string       `json:"accessToken"`
	ExpiresIn   int64        `json:"expiresIn"`
}

type UserResponse struct {
	ID            string  `json:"id"`
	Email         string  `json:"email"`
	Name          *string `json:"name,omitempty"`
	EmailVerified bool    `json:"emailVerified"`
}

type RefreshResponse struct {
	AccessToken string `json:"accessToken"`
	ExpiresIn   int64  `json:"expiresIn"`
}

type ProgressSyncRequest struct {
	QuestionIDs []string `json:"questionIds" binding:"required"`
}

type ProgressResponse struct {
	QuestionIDs []string `json:"questionIds"`
}

type ToggleProgressRequest struct {
	QuestionID string `json:"questionId" binding:"required"`
	Completed  bool   `json:"completed"`
}

type ForgotPasswordRequest struct {
	Email string `json:"email" binding:"required,email"`
}

type ResetPasswordRequest struct {
	Token       string `json:"token" binding:"required"`
	NewPassword string `json:"newPassword" binding:"required,min=8"`
}

type ChangePasswordRequest struct {
	CurrentPassword string `json:"currentPassword" binding:"required"`
	NewPassword     string `json:"newPassword" binding:"required,min=8"`
}

type UpdateProfileRequest struct {
	Name *string `json:"name,omitempty"`
}
