package response

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type Response struct {
	Success bool        `json:"success"`
	Data    interface{} `json:"data,omitempty"`
	Error   *ErrorInfo  `json:"error,omitempty"`
	Meta    *Meta       `json:"meta,omitempty"`
}

type ErrorInfo struct {
	Code    string            `json:"code"`
	Message string            `json:"message"`
	Details map[string]string `json:"details,omitempty"`
}

type Meta struct {
	RequestID string `json:"requestId,omitempty"`
	Version   string `json:"version,omitempty"`
}

func OK(c *gin.Context, data interface{}) {
	c.JSON(http.StatusOK, Response{
		Success: true,
		Data:    data,
		Meta:    getMeta(c),
	})
}

func Created(c *gin.Context, data interface{}) {
	c.JSON(http.StatusCreated, Response{
		Success: true,
		Data:    data,
		Meta:    getMeta(c),
	})
}

func NoContent(c *gin.Context) {
	c.Status(http.StatusNoContent)
}

func BadRequest(c *gin.Context, message string, details map[string]string) {
	c.JSON(http.StatusBadRequest, Response{
		Success: false,
		Error: &ErrorInfo{
			Code:    "BAD_REQUEST",
			Message: message,
			Details: details,
		},
		Meta: getMeta(c),
	})
}

func ValidationError(c *gin.Context, details map[string]string) {
	c.JSON(http.StatusBadRequest, Response{
		Success: false,
		Error: &ErrorInfo{
			Code:    "VALIDATION_ERROR",
			Message: "Request validation failed",
			Details: details,
		},
		Meta: getMeta(c),
	})
}

func NotFound(c *gin.Context, resource string) {
	c.JSON(http.StatusNotFound, Response{
		Success: false,
		Error: &ErrorInfo{
			Code:    "NOT_FOUND",
			Message: resource + " not found",
		},
		Meta: getMeta(c),
	})
}

func Conflict(c *gin.Context, message string) {
	c.JSON(http.StatusConflict, Response{
		Success: false,
		Error: &ErrorInfo{
			Code:    "CONFLICT",
			Message: message,
		},
		Meta: getMeta(c),
	})
}

func Unauthorized(c *gin.Context, message string) {
	c.JSON(http.StatusUnauthorized, Response{
		Success: false,
		Error: &ErrorInfo{
			Code:    "UNAUTHORIZED",
			Message: message,
		},
		Meta: getMeta(c),
	})
}

func Forbidden(c *gin.Context, message string) {
	c.JSON(http.StatusForbidden, Response{
		Success: false,
		Error: &ErrorInfo{
			Code:    "FORBIDDEN",
			Message: message,
		},
		Meta: getMeta(c),
	})
}

func TooManyRequests(c *gin.Context) {
	c.JSON(http.StatusTooManyRequests, Response{
		Success: false,
		Error: &ErrorInfo{
			Code:    "RATE_LIMIT_EXCEEDED",
			Message: "Too many requests, please try again later",
		},
		Meta: getMeta(c),
	})
}

func InternalError(c *gin.Context) {
	c.JSON(http.StatusInternalServerError, Response{
		Success: false,
		Error: &ErrorInfo{
			Code:    "INTERNAL_ERROR",
			Message: "An internal error occurred",
		},
		Meta: getMeta(c),
	})
}

func getMeta(c *gin.Context) *Meta {
	requestID, _ := c.Get("request_id")
	rid, _ := requestID.(string)
	return &Meta{
		RequestID: rid,
		Version:   "1.0.0",
	}
}
