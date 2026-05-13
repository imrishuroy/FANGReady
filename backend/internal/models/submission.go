package models

import (
	"time"

	"github.com/google/uuid"
)

type SubmissionStatus string

const (
	StatusPending             SubmissionStatus = "pending"
	StatusProcessing          SubmissionStatus = "processing"
	StatusAccepted            SubmissionStatus = "accepted"
	StatusWrongAnswer         SubmissionStatus = "wrong_answer"
	StatusRuntimeError        SubmissionStatus = "runtime_error"
	StatusCompilationError    SubmissionStatus = "compilation_error"
	StatusTimeLimitExceeded   SubmissionStatus = "time_limit_exceeded"
	StatusMemoryLimitExceeded SubmissionStatus = "memory_limit_exceeded"
	StatusInternalError       SubmissionStatus = "internal_error"
)

type Submission struct {
	ID              uuid.UUID        `json:"id" db:"id"`
	UserID          uuid.UUID        `json:"userId" db:"user_id"`
	ProblemID       uuid.UUID        `json:"problemId" db:"problem_id"`
	LanguageID      int              `json:"languageId" db:"language_id"`
	Code            string           `json:"code" db:"code"`
	Status          SubmissionStatus `json:"status" db:"status"`
	RuntimeMs       *int             `json:"runtimeMs,omitempty" db:"runtime_ms"`
	MemoryKb        *int             `json:"memoryKb,omitempty" db:"memory_kb"`
	TestCasesPassed int              `json:"testCasesPassed" db:"test_cases_passed"`
	TestCasesTotal  int              `json:"testCasesTotal" db:"test_cases_total"`
	ErrorMessage    *string          `json:"errorMessage,omitempty" db:"error_message"`
	Judge0Tokens    []string         `json:"-" db:"judge0_tokens"`
	CreatedAt       time.Time        `json:"createdAt" db:"created_at"`
}

type SubmissionWithDetails struct {
	Submission
	ProblemTitle string `json:"problemTitle" db:"problem_title"`
	ProblemSlug  string `json:"problemSlug" db:"problem_slug"`
	LanguageName string `json:"languageName" db:"language_name"`
}

type SubmissionResult struct {
	ID           uuid.UUID        `json:"id" db:"id"`
	SubmissionID uuid.UUID        `json:"submissionId" db:"submission_id"`
	TestCaseID   uuid.UUID        `json:"testCaseId" db:"test_case_id"`
	Status       SubmissionStatus `json:"status" db:"status"`
	ActualOutput *string          `json:"actualOutput,omitempty" db:"actual_output"`
	RuntimeMs    *int             `json:"runtimeMs,omitempty" db:"runtime_ms"`
	MemoryKb     *int             `json:"memoryKb,omitempty" db:"memory_kb"`
	ErrorOutput  *string          `json:"errorOutput,omitempty" db:"error_output"`
	CreatedAt    time.Time        `json:"createdAt" db:"created_at"`
}

type SubmissionResultDetail struct {
	SubmissionResult
	Input          string `json:"input" db:"input"`
	ExpectedOutput string `json:"expectedOutput" db:"expected_output"`
	IsSample       bool   `json:"isSample" db:"is_sample"`
}

// Request/Response DTOs

type SubmitCodeRequest struct {
	ProblemID  uuid.UUID `json:"problemId" binding:"required"`
	LanguageID int       `json:"languageId" binding:"required"`
	Code       string    `json:"code" binding:"required"`
}

type RunCodeRequest struct {
	ProblemID   uuid.UUID `json:"problemId" binding:"required"`
	LanguageID  int       `json:"languageId" binding:"required"`
	Code        string    `json:"code" binding:"required"`
	CustomInput *string   `json:"customInput,omitempty"`
}

type SubmissionResponse struct {
	Submission
	Results []SubmissionResultDetail `json:"results,omitempty"`
}

type SubmissionListRequest struct {
	Page      int       `form:"page" binding:"omitempty,min=1"`
	Limit     int       `form:"limit" binding:"omitempty,min=1,max=100"`
	ProblemID uuid.UUID `form:"problemId"`
	Status    string    `form:"status"`
}

type SubmissionListResponse struct {
	Submissions []SubmissionWithDetails `json:"submissions"`
	Total       int                     `json:"total"`
	Page        int                     `json:"page"`
	Limit       int                     `json:"limit"`
	TotalPages  int                     `json:"totalPages"`
}

type RunCodeResult struct {
	TestCaseIndex  int              `json:"testCaseIndex"`
	Input          string           `json:"input"`
	ExpectedOutput string           `json:"expectedOutput"`
	ActualOutput   string           `json:"actualOutput"`
	Status         SubmissionStatus `json:"status"`
	RuntimeMs      int              `json:"runtimeMs,omitempty"`
	MemoryKb       int              `json:"memoryKb,omitempty"`
	ErrorMessage   string           `json:"errorMessage,omitempty"`
	Stdout         string           `json:"stdout,omitempty"`
	Stderr         string           `json:"stderr,omitempty"`
	IsCustom       bool             `json:"isCustom,omitempty"`
}

type RunCodeResponse struct {
	Results     []RunCodeResult `json:"results"`
	TotalPassed int             `json:"totalPassed"`
	TotalTests  int             `json:"totalTests"`
}
