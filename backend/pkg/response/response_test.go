package response

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/gin-gonic/gin"
	"github.com/stretchr/testify/assert"
)

func init() {
	gin.SetMode(gin.TestMode)
}

func setupTestContext() (*gin.Context, *httptest.ResponseRecorder) {
	w := httptest.NewRecorder()
	c, _ := gin.CreateTestContext(w)
	c.Set("request_id", "test-request-id")
	return c, w
}

func TestOK(t *testing.T) {
	c, w := setupTestContext()

	data := map[string]string{"message": "hello"}
	OK(c, data)

	assert.Equal(t, http.StatusOK, w.Code)

	var resp Response
	json.Unmarshal(w.Body.Bytes(), &resp)
	assert.True(t, resp.Success)
	assert.NotNil(t, resp.Data)
	assert.Nil(t, resp.Error)
	assert.Equal(t, "test-request-id", resp.Meta.RequestID)
}

func TestCreated(t *testing.T) {
	c, w := setupTestContext()

	data := map[string]string{"id": "123"}
	Created(c, data)

	assert.Equal(t, http.StatusCreated, w.Code)

	var resp Response
	json.Unmarshal(w.Body.Bytes(), &resp)
	assert.True(t, resp.Success)
	assert.NotNil(t, resp.Data)
}

func TestNoContent(t *testing.T) {
	gin.SetMode(gin.TestMode)
	router := gin.New()
	router.GET("/test", func(c *gin.Context) {
		NoContent(c)
	})

	req, _ := http.NewRequest("GET", "/test", nil)
	w := httptest.NewRecorder()
	router.ServeHTTP(w, req)

	assert.Equal(t, http.StatusNoContent, w.Code)
	assert.Empty(t, w.Body.String())
}

func TestBadRequest(t *testing.T) {
	c, w := setupTestContext()

	details := map[string]string{"field": "invalid value"}
	BadRequest(c, "Invalid request", details)

	assert.Equal(t, http.StatusBadRequest, w.Code)

	var resp Response
	json.Unmarshal(w.Body.Bytes(), &resp)
	assert.False(t, resp.Success)
	assert.Equal(t, "BAD_REQUEST", resp.Error.Code)
	assert.Equal(t, "Invalid request", resp.Error.Message)
	assert.Equal(t, "invalid value", resp.Error.Details["field"])
}

func TestBadRequest_NoDetails(t *testing.T) {
	c, w := setupTestContext()

	BadRequest(c, "Something went wrong", nil)

	assert.Equal(t, http.StatusBadRequest, w.Code)

	var resp Response
	json.Unmarshal(w.Body.Bytes(), &resp)
	assert.Nil(t, resp.Error.Details)
}

func TestValidationError(t *testing.T) {
	c, w := setupTestContext()

	details := map[string]string{
		"email":    "Email is required",
		"password": "Password must be at least 8 characters",
	}
	ValidationError(c, details)

	assert.Equal(t, http.StatusBadRequest, w.Code)

	var resp Response
	json.Unmarshal(w.Body.Bytes(), &resp)
	assert.False(t, resp.Success)
	assert.Equal(t, "VALIDATION_ERROR", resp.Error.Code)
	assert.Equal(t, "Request validation failed", resp.Error.Message)
	assert.Len(t, resp.Error.Details, 2)
}

func TestNotFound(t *testing.T) {
	c, w := setupTestContext()

	NotFound(c, "User")

	assert.Equal(t, http.StatusNotFound, w.Code)

	var resp Response
	json.Unmarshal(w.Body.Bytes(), &resp)
	assert.False(t, resp.Success)
	assert.Equal(t, "NOT_FOUND", resp.Error.Code)
	assert.Equal(t, "User not found", resp.Error.Message)
}

func TestConflict(t *testing.T) {
	c, w := setupTestContext()

	Conflict(c, "Resource already exists")

	assert.Equal(t, http.StatusConflict, w.Code)

	var resp Response
	json.Unmarshal(w.Body.Bytes(), &resp)
	assert.False(t, resp.Success)
	assert.Equal(t, "CONFLICT", resp.Error.Code)
	assert.Equal(t, "Resource already exists", resp.Error.Message)
}

func TestVersionConflict(t *testing.T) {
	c, w := setupTestContext()

	currentData := map[string]interface{}{
		"id":      "123",
		"version": 5,
	}
	VersionConflict(c, "Resource was modified", currentData)

	assert.Equal(t, http.StatusConflict, w.Code)

	var resp Response
	json.Unmarshal(w.Body.Bytes(), &resp)
	assert.False(t, resp.Success)
	assert.Equal(t, "VERSION_CONFLICT", resp.Error.Code)
	assert.Equal(t, "Resource was modified", resp.Error.Message)
	assert.NotNil(t, resp.Data)
}

func TestUnauthorized(t *testing.T) {
	c, w := setupTestContext()

	Unauthorized(c, "Invalid token")

	assert.Equal(t, http.StatusUnauthorized, w.Code)

	var resp Response
	json.Unmarshal(w.Body.Bytes(), &resp)
	assert.False(t, resp.Success)
	assert.Equal(t, "UNAUTHORIZED", resp.Error.Code)
	assert.Equal(t, "Invalid token", resp.Error.Message)
}

func TestForbidden(t *testing.T) {
	c, w := setupTestContext()

	Forbidden(c, "Access denied")

	assert.Equal(t, http.StatusForbidden, w.Code)

	var resp Response
	json.Unmarshal(w.Body.Bytes(), &resp)
	assert.False(t, resp.Success)
	assert.Equal(t, "FORBIDDEN", resp.Error.Code)
	assert.Equal(t, "Access denied", resp.Error.Message)
}

func TestTooManyRequests(t *testing.T) {
	c, w := setupTestContext()

	TooManyRequests(c)

	assert.Equal(t, http.StatusTooManyRequests, w.Code)

	var resp Response
	json.Unmarshal(w.Body.Bytes(), &resp)
	assert.False(t, resp.Success)
	assert.Equal(t, "RATE_LIMIT_EXCEEDED", resp.Error.Code)
	assert.Equal(t, "Too many requests, please try again later", resp.Error.Message)
}

func TestInternalError(t *testing.T) {
	c, w := setupTestContext()

	InternalError(c)

	assert.Equal(t, http.StatusInternalServerError, w.Code)

	var resp Response
	json.Unmarshal(w.Body.Bytes(), &resp)
	assert.False(t, resp.Success)
	assert.Equal(t, "INTERNAL_ERROR", resp.Error.Code)
	assert.Equal(t, "An internal error occurred", resp.Error.Message)
}

func TestGetMeta_WithRequestID(t *testing.T) {
	c, _ := setupTestContext()

	meta := getMeta(c)

	assert.Equal(t, "test-request-id", meta.RequestID)
	assert.Equal(t, "1.0.0", meta.Version)
}

func TestGetMeta_WithoutRequestID(t *testing.T) {
	w := httptest.NewRecorder()
	c, _ := gin.CreateTestContext(w)

	meta := getMeta(c)

	assert.Empty(t, meta.RequestID)
	assert.Equal(t, "1.0.0", meta.Version)
}

func TestResponse_JSONStructure(t *testing.T) {
	c, w := setupTestContext()

	OK(c, gin.H{"key": "value"})

	var rawResp map[string]interface{}
	json.Unmarshal(w.Body.Bytes(), &rawResp)

	assert.Contains(t, rawResp, "success")
	assert.Contains(t, rawResp, "data")
	assert.Contains(t, rawResp, "meta")
	assert.NotContains(t, rawResp, "error")
}

func TestErrorResponse_JSONStructure(t *testing.T) {
	c, w := setupTestContext()

	InternalError(c)

	var rawResp map[string]interface{}
	json.Unmarshal(w.Body.Bytes(), &rawResp)

	assert.Contains(t, rawResp, "success")
	assert.Contains(t, rawResp, "error")
	assert.Contains(t, rawResp, "meta")
	assert.NotContains(t, rawResp, "data")
}
