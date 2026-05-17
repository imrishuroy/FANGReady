package handlers

import (
	"bytes"
	"context"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/gin-gonic/gin"
	"github.com/imrishuroy/algopatterns/internal/models"
	"github.com/imrishuroy/algopatterns/internal/repository"
	"github.com/stretchr/testify/assert"
)

type stubPatternService struct {
	createResult    *models.Pattern
	createErr       error
	getByIDResult   *models.Pattern
	getByIDErr      error
	listResult      *models.PatternListResponse
	listErr         error
	updateResult    *models.Pattern
	updateErr       error
	deleteErr       error
	categoriesResult []string
	categoriesErr   error
	bulkImportResult *models.BulkImportResponse
	bulkImportErr   error
	exportResult    []byte
	exportErr       error
	searchResult    []models.Pattern
	searchErr       error
}

func (s *stubPatternService) Create(ctx context.Context, req *models.CreatePatternRequest) (*models.Pattern, error) {
	return s.createResult, s.createErr
}

func (s *stubPatternService) GetByID(ctx context.Context, id string) (*models.Pattern, error) {
	return s.getByIDResult, s.getByIDErr
}

func (s *stubPatternService) List(ctx context.Context, req *models.PatternListRequest) (*models.PatternListResponse, error) {
	return s.listResult, s.listErr
}

func (s *stubPatternService) Update(ctx context.Context, id string, req *models.UpdatePatternRequest) (*models.Pattern, error) {
	return s.updateResult, s.updateErr
}

func (s *stubPatternService) Delete(ctx context.Context, id string) error {
	return s.deleteErr
}

func (s *stubPatternService) GetCategories(ctx context.Context) ([]string, error) {
	return s.categoriesResult, s.categoriesErr
}

func (s *stubPatternService) BulkImport(ctx context.Context, req *models.BulkImportRequest) (*models.BulkImportResponse, error) {
	return s.bulkImportResult, s.bulkImportErr
}

func (s *stubPatternService) Export(ctx context.Context) ([]byte, error) {
	return s.exportResult, s.exportErr
}

func (s *stubPatternService) Search(ctx context.Context, query string) ([]models.Pattern, error) {
	return s.searchResult, s.searchErr
}

func setupPatternRouter(stub *stubPatternService) *gin.Engine {
	gin.SetMode(gin.TestMode)
	router := gin.New()

	handler := &PatternHandler{service: stub}

	patterns := router.Group("/api/v1/patterns")
	{
		patterns.GET("", handler.List)
		patterns.POST("", handler.Create)
		patterns.GET("/categories", handler.GetCategories)
		patterns.GET("/export", handler.Export)
		patterns.POST("/bulk", handler.BulkImport)
		patterns.GET("/search", handler.Search)
		patterns.GET("/:id", handler.GetByID)
		patterns.PUT("/:id", handler.Update)
		patterns.DELETE("/:id", handler.Delete)
	}

	return router
}

func TestPatternHandler_List_Success(t *testing.T) {
	stub := &stubPatternService{
		listResult: &models.PatternListResponse{
			Patterns: []models.Pattern{
				{ID: "sliding-window", Category: "arrays"},
			},
			Pagination: models.Pagination{TotalItems: 1},
		},
	}
	router := setupPatternRouter(stub)

	req, _ := http.NewRequest("GET", "/api/v1/patterns", nil)
	w := httptest.NewRecorder()
	router.ServeHTTP(w, req)

	assert.Equal(t, http.StatusOK, w.Code)
}

func TestPatternHandler_GetByID_Success(t *testing.T) {
	stub := &stubPatternService{
		getByIDResult: &models.Pattern{
			ID:          "sliding-window",
			Category:    "arrays",
			Description: "Sliding window technique",
		},
	}
	router := setupPatternRouter(stub)

	req, _ := http.NewRequest("GET", "/api/v1/patterns/sliding-window", nil)
	w := httptest.NewRecorder()
	router.ServeHTTP(w, req)

	assert.Equal(t, http.StatusOK, w.Code)
}

func TestPatternHandler_GetByID_NotFound(t *testing.T) {
	stub := &stubPatternService{
		getByIDErr: repository.ErrNotFound,
	}
	router := setupPatternRouter(stub)

	req, _ := http.NewRequest("GET", "/api/v1/patterns/nonexistent", nil)
	w := httptest.NewRecorder()
	router.ServeHTTP(w, req)

	assert.Equal(t, http.StatusNotFound, w.Code)
}

func TestPatternHandler_Create_Success(t *testing.T) {
	stub := &stubPatternService{
		createResult: &models.Pattern{
			ID:          "two-pointers",
			Category:    "arrays",
			Difficulty:  models.DifficultyMedium,
			Description: "Two pointer technique",
		},
	}
	router := setupPatternRouter(stub)

	body := `{
		"id":"two-pointers",
		"category":"arrays",
		"difficulty":"Medium",
		"description":"Two pointer technique",
		"whenToUse":["When you need to find pairs"],
		"codeTemplates":{"javascript":"// code here"},
		"keyInsights":["Use two pointers"],
		"commonProblems":["Two Sum"],
		"timeComplexity":"O(n)",
		"spaceComplexity":"O(1)"
	}`
	req, _ := http.NewRequest("POST", "/api/v1/patterns", bytes.NewBufferString(body))
	req.Header.Set("Content-Type", "application/json")

	w := httptest.NewRecorder()
	router.ServeHTTP(w, req)

	assert.Equal(t, http.StatusCreated, w.Code)
}

func TestPatternHandler_Create_Duplicate(t *testing.T) {
	stub := &stubPatternService{
		createErr: repository.ErrDuplicate,
	}
	router := setupPatternRouter(stub)

	body := `{
		"id":"existing",
		"category":"arrays",
		"difficulty":"Easy",
		"description":"test",
		"whenToUse":["test"],
		"codeTemplates":{"javascript":"// code"},
		"keyInsights":["insight"],
		"commonProblems":["problem"],
		"timeComplexity":"O(n)",
		"spaceComplexity":"O(1)"
	}`
	req, _ := http.NewRequest("POST", "/api/v1/patterns", bytes.NewBufferString(body))
	req.Header.Set("Content-Type", "application/json")

	w := httptest.NewRecorder()
	router.ServeHTTP(w, req)

	assert.Equal(t, http.StatusConflict, w.Code)
}

func TestPatternHandler_Update_Success(t *testing.T) {
	stub := &stubPatternService{
		updateResult: &models.Pattern{
			ID:         "sliding-window",
			Category:   "advanced",
			Difficulty: models.DifficultyHard,
		},
	}
	router := setupPatternRouter(stub)

	body := `{"category":"advanced","difficulty":"Hard"}`
	req, _ := http.NewRequest("PUT", "/api/v1/patterns/sliding-window", bytes.NewBufferString(body))
	req.Header.Set("Content-Type", "application/json")

	w := httptest.NewRecorder()
	router.ServeHTTP(w, req)

	assert.Equal(t, http.StatusOK, w.Code)
}

func TestPatternHandler_Update_NotFound(t *testing.T) {
	stub := &stubPatternService{
		updateErr: repository.ErrNotFound,
	}
	router := setupPatternRouter(stub)

	body := `{"category":"advanced"}`
	req, _ := http.NewRequest("PUT", "/api/v1/patterns/nonexistent", bytes.NewBufferString(body))
	req.Header.Set("Content-Type", "application/json")

	w := httptest.NewRecorder()
	router.ServeHTTP(w, req)

	assert.Equal(t, http.StatusNotFound, w.Code)
}

func TestPatternHandler_Delete_Success(t *testing.T) {
	stub := &stubPatternService{}
	router := setupPatternRouter(stub)

	req, _ := http.NewRequest("DELETE", "/api/v1/patterns/sliding-window", nil)

	w := httptest.NewRecorder()
	router.ServeHTTP(w, req)

	assert.Equal(t, http.StatusNoContent, w.Code)
}

func TestPatternHandler_Delete_NotFound(t *testing.T) {
	stub := &stubPatternService{
		deleteErr: repository.ErrNotFound,
	}
	router := setupPatternRouter(stub)

	req, _ := http.NewRequest("DELETE", "/api/v1/patterns/nonexistent", nil)

	w := httptest.NewRecorder()
	router.ServeHTTP(w, req)

	assert.Equal(t, http.StatusNotFound, w.Code)
}

func TestPatternHandler_GetCategories_Success(t *testing.T) {
	stub := &stubPatternService{
		categoriesResult: []string{"arrays", "trees", "graphs"},
	}
	router := setupPatternRouter(stub)

	req, _ := http.NewRequest("GET", "/api/v1/patterns/categories", nil)
	w := httptest.NewRecorder()
	router.ServeHTTP(w, req)

	assert.Equal(t, http.StatusOK, w.Code)

	var resp map[string]interface{}
	json.Unmarshal(w.Body.Bytes(), &resp)
	data := resp["data"].(map[string]interface{})
	assert.Len(t, data["categories"], 3)
}

func TestPatternHandler_Export_Success(t *testing.T) {
	stub := &stubPatternService{
		exportResult: []byte(`[{"id":"pattern-1"}]`),
	}
	router := setupPatternRouter(stub)

	req, _ := http.NewRequest("GET", "/api/v1/patterns/export", nil)
	w := httptest.NewRecorder()
	router.ServeHTTP(w, req)

	assert.Equal(t, http.StatusOK, w.Code)
	assert.Equal(t, "application/json", w.Header().Get("Content-Type"))
	assert.Contains(t, w.Header().Get("Content-Disposition"), "attachment")
}

func TestPatternHandler_BulkImport_Success(t *testing.T) {
	stub := &stubPatternService{
		bulkImportResult: &models.BulkImportResponse{
			Imported: 2,
			Failed:   0,
		},
	}
	router := setupPatternRouter(stub)

	body := `{"patterns":[
		{"id":"p1","category":"arrays","difficulty":"Easy","description":"test","whenToUse":["use"],"codeTemplates":{"javascript":"//"},"keyInsights":["insight"],"commonProblems":["prob"],"timeComplexity":"O(n)","spaceComplexity":"O(1)"},
		{"id":"p2","category":"trees","difficulty":"Medium","description":"test2","whenToUse":["use"],"codeTemplates":{"javascript":"//"},"keyInsights":["insight"],"commonProblems":["prob"],"timeComplexity":"O(n)","spaceComplexity":"O(1)"}
	]}`
	req, _ := http.NewRequest("POST", "/api/v1/patterns/bulk", bytes.NewBufferString(body))
	req.Header.Set("Content-Type", "application/json")

	w := httptest.NewRecorder()
	router.ServeHTTP(w, req)

	assert.Equal(t, http.StatusOK, w.Code)
}

func TestPatternHandler_Search_Success(t *testing.T) {
	stub := &stubPatternService{
		searchResult: []models.Pattern{
			{ID: "sliding-window", Description: "Sliding window"},
		},
	}
	router := setupPatternRouter(stub)

	req, _ := http.NewRequest("GET", "/api/v1/patterns/search?q=sliding", nil)
	w := httptest.NewRecorder()
	router.ServeHTTP(w, req)

	assert.Equal(t, http.StatusOK, w.Code)
}

func TestPatternHandler_Search_MissingQuery(t *testing.T) {
	stub := &stubPatternService{}
	router := setupPatternRouter(stub)

	req, _ := http.NewRequest("GET", "/api/v1/patterns/search", nil)
	w := httptest.NewRecorder()
	router.ServeHTTP(w, req)

	assert.Equal(t, http.StatusBadRequest, w.Code)
}

func TestParseValidationErrors(t *testing.T) {
	errors := parseValidationErrors(assert.AnError)
	assert.Equal(t, "Invalid request body", errors["body"])
}
