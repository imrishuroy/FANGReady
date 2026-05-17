package services

import (
	"context"
	"testing"
	"time"

	"github.com/google/uuid"
	"github.com/imrishuroy/algopatterns/internal/models"
	"github.com/imrishuroy/algopatterns/internal/repository"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"
)

type MockHighlightRepository struct {
	mock.Mock
}

func (m *MockHighlightRepository) Create(ctx context.Context, h *models.Highlight) error {
	args := m.Called(ctx, h)
	return args.Error(0)
}

func (m *MockHighlightRepository) GetByID(ctx context.Context, id, userID uuid.UUID) (*models.Highlight, error) {
	args := m.Called(ctx, id, userID)
	if args.Get(0) == nil {
		return nil, args.Error(1)
	}
	return args.Get(0).(*models.Highlight), args.Error(1)
}

func (m *MockHighlightRepository) GetByContent(ctx context.Context, userID uuid.UUID, contentType, contentID string) ([]models.Highlight, error) {
	args := m.Called(ctx, userID, contentType, contentID)
	return args.Get(0).([]models.Highlight), args.Error(1)
}

func (m *MockHighlightRepository) GetAllByUser(ctx context.Context, userID uuid.UUID, limit int, cursor *time.Time, contentType *string) ([]models.Highlight, int, error) {
	args := m.Called(ctx, userID, limit, cursor, contentType)
	return args.Get(0).([]models.Highlight), args.Int(1), args.Error(2)
}

func (m *MockHighlightRepository) Update(ctx context.Context, h *models.Highlight, expectedVersion int) error {
	args := m.Called(ctx, h, expectedVersion)
	return args.Error(0)
}

func (m *MockHighlightRepository) Delete(ctx context.Context, id, userID uuid.UUID) error {
	args := m.Called(ctx, id, userID)
	return args.Error(0)
}

func (m *MockHighlightRepository) GetChangesSince(ctx context.Context, userID uuid.UUID, since time.Time) ([]models.Highlight, error) {
	args := m.Called(ctx, userID, since)
	return args.Get(0).([]models.Highlight), args.Error(1)
}

func newTestService() (*HighlightService, *MockHighlightRepository) {
	mockRepo := new(MockHighlightRepository)
	service := NewHighlightService(mockRepo)
	return service, mockRepo
}

func TestCreate_Success(t *testing.T) {
	service, mockRepo := newTestService()
	ctx := context.Background()
	userID := uuid.New()

	req := &models.CreateHighlightRequest{
		ContentType:  "pattern_code",
		ContentID:    "sliding-window:python",
		StartOffset:  10,
		EndOffset:    50,
		SelectedText: "for i in range(n):",
		Color:        "yellow",
	}

	mockRepo.On("Create", ctx, mock.AnythingOfType("*models.Highlight")).Return(nil)

	highlight, err := service.Create(ctx, userID, req)

	assert.NoError(t, err)
	assert.NotNil(t, highlight)
	assert.Equal(t, userID, highlight.UserID)
	assert.Equal(t, req.ContentType, highlight.ContentType)
	assert.Equal(t, req.ContentID, highlight.ContentID)
	assert.Equal(t, req.Color, highlight.Color)
	mockRepo.AssertExpectations(t)
}

func TestCreate_InvalidColor(t *testing.T) {
	service, _ := newTestService()
	ctx := context.Background()
	userID := uuid.New()

	req := &models.CreateHighlightRequest{
		ContentType:  "pattern_code",
		ContentID:    "sliding-window:python",
		StartOffset:  10,
		EndOffset:    50,
		SelectedText: "for i in range(n):",
		Color:        "red",
	}

	highlight, err := service.Create(ctx, userID, req)

	assert.ErrorIs(t, err, ErrInvalidColor)
	assert.Nil(t, highlight)
}

func TestCreate_AlreadyExists(t *testing.T) {
	service, mockRepo := newTestService()
	ctx := context.Background()
	userID := uuid.New()

	req := &models.CreateHighlightRequest{
		ContentType:  "pattern_code",
		ContentID:    "sliding-window:python",
		StartOffset:  10,
		EndOffset:    50,
		SelectedText: "for i in range(n):",
		Color:        "yellow",
	}

	mockRepo.On("Create", ctx, mock.AnythingOfType("*models.Highlight")).Return(repository.ErrHighlightExists)

	highlight, err := service.Create(ctx, userID, req)

	assert.ErrorIs(t, err, ErrHighlightExists)
	assert.Nil(t, highlight)
	mockRepo.AssertExpectations(t)
}

func TestGetByID_Success(t *testing.T) {
	service, mockRepo := newTestService()
	ctx := context.Background()
	userID := uuid.New()
	highlightID := uuid.New()

	expected := &models.Highlight{
		ID:          highlightID,
		UserID:      userID,
		ContentType: "pattern_code",
		Color:       "blue",
	}

	mockRepo.On("GetByID", ctx, highlightID, userID).Return(expected, nil)

	highlight, err := service.GetByID(ctx, highlightID, userID)

	assert.NoError(t, err)
	assert.Equal(t, expected, highlight)
	mockRepo.AssertExpectations(t)
}

func TestGetByID_NotFound(t *testing.T) {
	service, mockRepo := newTestService()
	ctx := context.Background()
	userID := uuid.New()
	highlightID := uuid.New()

	mockRepo.On("GetByID", ctx, highlightID, userID).Return(nil, repository.ErrHighlightNotFound)

	highlight, err := service.GetByID(ctx, highlightID, userID)

	assert.ErrorIs(t, err, ErrHighlightNotFound)
	assert.Nil(t, highlight)
	mockRepo.AssertExpectations(t)
}

func TestGetByContent_Success(t *testing.T) {
	service, mockRepo := newTestService()
	ctx := context.Background()
	userID := uuid.New()

	expected := []models.Highlight{
		{ID: uuid.New(), UserID: userID, ContentType: "pattern_code", Color: "yellow"},
		{ID: uuid.New(), UserID: userID, ContentType: "pattern_code", Color: "blue"},
	}

	mockRepo.On("GetByContent", ctx, userID, "pattern_code", "sliding-window:python").Return(expected, nil)

	highlights, err := service.GetByContent(ctx, userID, "pattern_code", "sliding-window:python")

	assert.NoError(t, err)
	assert.Len(t, highlights, 2)
	mockRepo.AssertExpectations(t)
}

func TestGetAllByUser_Success(t *testing.T) {
	service, mockRepo := newTestService()
	ctx := context.Background()
	userID := uuid.New()
	now := time.Now()

	highlights := []models.Highlight{
		{ID: uuid.New(), UserID: userID, CreatedAt: now},
		{ID: uuid.New(), UserID: userID, CreatedAt: now.Add(-time.Hour)},
	}

	mockRepo.On("GetAllByUser", ctx, userID, 20, (*time.Time)(nil), (*string)(nil)).Return(highlights, 2, nil)

	result, err := service.GetAllByUser(ctx, userID, 20, nil, nil)

	assert.NoError(t, err)
	assert.Len(t, result.Highlights, 2)
	assert.Equal(t, 2, result.TotalCount)
	mockRepo.AssertExpectations(t)
}

func TestGetAllByUser_LimitValidation(t *testing.T) {
	service, mockRepo := newTestService()
	ctx := context.Background()
	userID := uuid.New()

	mockRepo.On("GetAllByUser", ctx, userID, 20, (*time.Time)(nil), (*string)(nil)).Return([]models.Highlight{}, 0, nil)

	_, err := service.GetAllByUser(ctx, userID, -5, nil, nil)
	assert.NoError(t, err)

	_, err = service.GetAllByUser(ctx, userID, 0, nil, nil)
	assert.NoError(t, err)

	mockRepo.On("GetAllByUser", ctx, userID, 20, (*time.Time)(nil), (*string)(nil)).Return([]models.Highlight{}, 0, nil)
	_, err = service.GetAllByUser(ctx, userID, 200, nil, nil)
	assert.NoError(t, err)
}

func TestGetAllByUser_WithCursor(t *testing.T) {
	service, mockRepo := newTestService()
	ctx := context.Background()
	userID := uuid.New()
	cursor := time.Now()

	mockRepo.On("GetAllByUser", ctx, userID, 10, &cursor, (*string)(nil)).Return([]models.Highlight{}, 5, nil)

	result, err := service.GetAllByUser(ctx, userID, 10, &cursor, nil)

	assert.NoError(t, err)
	assert.Nil(t, result.NextCursor)
	mockRepo.AssertExpectations(t)
}

func TestGetAllByUser_NextCursor(t *testing.T) {
	service, mockRepo := newTestService()
	ctx := context.Background()
	userID := uuid.New()
	now := time.Now()

	highlights := make([]models.Highlight, 20)
	for i := 0; i < 20; i++ {
		highlights[i] = models.Highlight{
			ID:        uuid.New(),
			UserID:    userID,
			CreatedAt: now.Add(-time.Duration(i) * time.Hour),
		}
	}

	mockRepo.On("GetAllByUser", ctx, userID, 20, (*time.Time)(nil), (*string)(nil)).Return(highlights, 50, nil)

	result, err := service.GetAllByUser(ctx, userID, 20, nil, nil)

	assert.NoError(t, err)
	assert.NotNil(t, result.NextCursor)
	mockRepo.AssertExpectations(t)
}

func TestUpdate_Success(t *testing.T) {
	service, mockRepo := newTestService()
	ctx := context.Background()
	userID := uuid.New()
	highlightID := uuid.New()
	newColor := "green"
	note := "important note"

	existing := &models.Highlight{
		ID:      highlightID,
		UserID:  userID,
		Color:   "yellow",
		Version: 1,
	}

	mockRepo.On("GetByID", ctx, highlightID, userID).Return(existing, nil)
	mockRepo.On("Update", ctx, mock.AnythingOfType("*models.Highlight"), 1).Return(nil)

	req := &models.UpdateHighlightRequest{
		Color:   &newColor,
		Note:    &note,
		Version: 1,
	}

	highlight, err := service.Update(ctx, highlightID, userID, req)

	assert.NoError(t, err)
	assert.Equal(t, "green", highlight.Color)
	assert.Equal(t, &note, highlight.Note)
	mockRepo.AssertExpectations(t)
}

func TestUpdate_InvalidColor(t *testing.T) {
	service, mockRepo := newTestService()
	ctx := context.Background()
	userID := uuid.New()
	highlightID := uuid.New()
	invalidColor := "red"

	existing := &models.Highlight{
		ID:      highlightID,
		UserID:  userID,
		Color:   "yellow",
		Version: 1,
	}

	mockRepo.On("GetByID", ctx, highlightID, userID).Return(existing, nil)

	req := &models.UpdateHighlightRequest{
		Color:   &invalidColor,
		Version: 1,
	}

	highlight, err := service.Update(ctx, highlightID, userID, req)

	assert.ErrorIs(t, err, ErrInvalidColor)
	assert.Nil(t, highlight)
}

func TestUpdate_NotFound(t *testing.T) {
	service, mockRepo := newTestService()
	ctx := context.Background()
	userID := uuid.New()
	highlightID := uuid.New()
	color := "green"

	mockRepo.On("GetByID", ctx, highlightID, userID).Return(nil, repository.ErrHighlightNotFound)

	req := &models.UpdateHighlightRequest{
		Color:   &color,
		Version: 1,
	}

	highlight, err := service.Update(ctx, highlightID, userID, req)

	assert.ErrorIs(t, err, ErrHighlightNotFound)
	assert.Nil(t, highlight)
	mockRepo.AssertExpectations(t)
}

func TestUpdate_VersionConflict(t *testing.T) {
	service, mockRepo := newTestService()
	ctx := context.Background()
	userID := uuid.New()
	highlightID := uuid.New()
	color := "green"

	existing := &models.Highlight{
		ID:      highlightID,
		UserID:  userID,
		Color:   "yellow",
		Version: 2,
	}

	mockRepo.On("GetByID", ctx, highlightID, userID).Return(existing, nil)
	mockRepo.On("Update", ctx, mock.AnythingOfType("*models.Highlight"), 1).Return(repository.ErrVersionConflict)

	req := &models.UpdateHighlightRequest{
		Color:   &color,
		Version: 1,
	}

	highlight, err := service.Update(ctx, highlightID, userID, req)

	assert.ErrorIs(t, err, ErrVersionConflict)
	assert.Nil(t, highlight)
	mockRepo.AssertExpectations(t)
}

func TestDelete_Success(t *testing.T) {
	service, mockRepo := newTestService()
	ctx := context.Background()
	userID := uuid.New()
	highlightID := uuid.New()

	mockRepo.On("Delete", ctx, highlightID, userID).Return(nil)

	err := service.Delete(ctx, highlightID, userID)

	assert.NoError(t, err)
	mockRepo.AssertExpectations(t)
}

func TestDelete_NotFound(t *testing.T) {
	service, mockRepo := newTestService()
	ctx := context.Background()
	userID := uuid.New()
	highlightID := uuid.New()

	mockRepo.On("Delete", ctx, highlightID, userID).Return(repository.ErrHighlightNotFound)

	err := service.Delete(ctx, highlightID, userID)

	assert.ErrorIs(t, err, ErrHighlightNotFound)
	mockRepo.AssertExpectations(t)
}

func TestBatchSync_CreateOperation(t *testing.T) {
	service, mockRepo := newTestService()
	ctx := context.Background()
	userID := uuid.New()

	req := &models.BatchSyncRequest{
		Operations: []models.SyncOperation{
			{
				Op:       models.SyncOpCreate,
				ClientID: "client-123",
				Data: &models.CreateHighlightRequest{
					ContentType:  "pattern_code",
					ContentID:    "sliding-window:python",
					StartOffset:  10,
					EndOffset:    50,
					SelectedText: "test code",
					Color:        "yellow",
				},
			},
		},
	}

	mockRepo.On("Create", ctx, mock.AnythingOfType("*models.Highlight")).Return(nil)

	result, err := service.BatchSync(ctx, userID, req)

	assert.NoError(t, err)
	assert.Len(t, result.Results, 1)
	assert.True(t, result.Results[0].Success)
	assert.Equal(t, "client-123", result.Results[0].ClientID)
	assert.NotNil(t, result.Results[0].Highlight)
	mockRepo.AssertExpectations(t)
}

func TestBatchSync_UpdateOperation(t *testing.T) {
	service, mockRepo := newTestService()
	ctx := context.Background()
	userID := uuid.New()
	highlightID := uuid.New()
	color := "green"

	existing := &models.Highlight{
		ID:      highlightID,
		UserID:  userID,
		Color:   "yellow",
		Version: 1,
	}

	req := &models.BatchSyncRequest{
		Operations: []models.SyncOperation{
			{
				Op: models.SyncOpUpdate,
				ID: &highlightID,
				Update: &models.UpdateHighlightRequest{
					Color:   &color,
					Version: 1,
				},
			},
		},
	}

	mockRepo.On("GetByID", ctx, highlightID, userID).Return(existing, nil)
	mockRepo.On("Update", ctx, mock.AnythingOfType("*models.Highlight"), 1).Return(nil)

	result, err := service.BatchSync(ctx, userID, req)

	assert.NoError(t, err)
	assert.Len(t, result.Results, 1)
	assert.True(t, result.Results[0].Success)
	mockRepo.AssertExpectations(t)
}

func TestBatchSync_DeleteOperation(t *testing.T) {
	service, mockRepo := newTestService()
	ctx := context.Background()
	userID := uuid.New()
	highlightID := uuid.New()

	req := &models.BatchSyncRequest{
		Operations: []models.SyncOperation{
			{
				Op: models.SyncOpDelete,
				ID: &highlightID,
			},
		},
	}

	mockRepo.On("Delete", ctx, highlightID, userID).Return(nil)

	result, err := service.BatchSync(ctx, userID, req)

	assert.NoError(t, err)
	assert.Len(t, result.Results, 1)
	assert.True(t, result.Results[0].Success)
	mockRepo.AssertExpectations(t)
}

func TestBatchSync_MixedOperations(t *testing.T) {
	service, mockRepo := newTestService()
	ctx := context.Background()
	userID := uuid.New()
	updateID := uuid.New()
	deleteID := uuid.New()
	color := "blue"

	existing := &models.Highlight{
		ID:      updateID,
		UserID:  userID,
		Color:   "yellow",
		Version: 1,
	}

	req := &models.BatchSyncRequest{
		Operations: []models.SyncOperation{
			{
				Op:       models.SyncOpCreate,
				ClientID: "new-highlight",
				Data: &models.CreateHighlightRequest{
					ContentType:  "pattern_code",
					ContentID:    "two-pointers:python",
					StartOffset:  0,
					EndOffset:    20,
					SelectedText: "def solve():",
					Color:        "green",
				},
			},
			{
				Op: models.SyncOpUpdate,
				ID: &updateID,
				Update: &models.UpdateHighlightRequest{
					Color:   &color,
					Version: 1,
				},
			},
			{
				Op: models.SyncOpDelete,
				ID: &deleteID,
			},
		},
	}

	mockRepo.On("Create", ctx, mock.AnythingOfType("*models.Highlight")).Return(nil)
	mockRepo.On("GetByID", ctx, updateID, userID).Return(existing, nil)
	mockRepo.On("Update", ctx, mock.AnythingOfType("*models.Highlight"), 1).Return(nil)
	mockRepo.On("Delete", ctx, deleteID, userID).Return(nil)

	result, err := service.BatchSync(ctx, userID, req)

	assert.NoError(t, err)
	assert.Len(t, result.Results, 3)
	assert.True(t, result.Results[0].Success)
	assert.True(t, result.Results[1].Success)
	assert.True(t, result.Results[2].Success)
	mockRepo.AssertExpectations(t)
}

func TestBatchSync_PartialFailure(t *testing.T) {
	service, mockRepo := newTestService()
	ctx := context.Background()
	userID := uuid.New()
	missingID := uuid.New()

	req := &models.BatchSyncRequest{
		Operations: []models.SyncOperation{
			{
				Op:       models.SyncOpCreate,
				ClientID: "good-create",
				Data: &models.CreateHighlightRequest{
					ContentType:  "pattern_code",
					ContentID:    "sliding-window:python",
					StartOffset:  10,
					EndOffset:    50,
					SelectedText: "test",
					Color:        "yellow",
				},
			},
			{
				Op: models.SyncOpDelete,
				ID: &missingID,
			},
		},
	}

	mockRepo.On("Create", ctx, mock.AnythingOfType("*models.Highlight")).Return(nil)
	mockRepo.On("Delete", ctx, missingID, userID).Return(repository.ErrHighlightNotFound)

	result, err := service.BatchSync(ctx, userID, req)

	assert.NoError(t, err)
	assert.Len(t, result.Results, 2)
	assert.True(t, result.Results[0].Success)
	assert.False(t, result.Results[1].Success)
	assert.Contains(t, result.Results[1].Error, "not found")
	mockRepo.AssertExpectations(t)
}

func TestBatchSync_MissingData(t *testing.T) {
	service, _ := newTestService()
	ctx := context.Background()
	userID := uuid.New()

	req := &models.BatchSyncRequest{
		Operations: []models.SyncOperation{
			{
				Op:       models.SyncOpCreate,
				ClientID: "missing-data",
			},
		},
	}

	result, err := service.BatchSync(ctx, userID, req)

	assert.NoError(t, err)
	assert.Len(t, result.Results, 1)
	assert.False(t, result.Results[0].Success)
	assert.Equal(t, "missing data for create operation", result.Results[0].Error)
}

func TestBatchSync_MissingUpdateID(t *testing.T) {
	service, _ := newTestService()
	ctx := context.Background()
	userID := uuid.New()
	color := "green"

	req := &models.BatchSyncRequest{
		Operations: []models.SyncOperation{
			{
				Op: models.SyncOpUpdate,
				Update: &models.UpdateHighlightRequest{
					Color:   &color,
					Version: 1,
				},
			},
		},
	}

	result, err := service.BatchSync(ctx, userID, req)

	assert.NoError(t, err)
	assert.Len(t, result.Results, 1)
	assert.False(t, result.Results[0].Success)
	assert.Equal(t, "missing id or update data for update operation", result.Results[0].Error)
}

func TestBatchSync_MissingDeleteID(t *testing.T) {
	service, _ := newTestService()
	ctx := context.Background()
	userID := uuid.New()

	req := &models.BatchSyncRequest{
		Operations: []models.SyncOperation{
			{
				Op: models.SyncOpDelete,
			},
		},
	}

	result, err := service.BatchSync(ctx, userID, req)

	assert.NoError(t, err)
	assert.Len(t, result.Results, 1)
	assert.False(t, result.Results[0].Success)
	assert.Equal(t, "missing id for delete operation", result.Results[0].Error)
}

func TestBatchSync_WithLastSyncAt(t *testing.T) {
	service, mockRepo := newTestService()
	ctx := context.Background()
	userID := uuid.New()
	lastSync := time.Now().Add(-time.Hour)

	serverChanges := []models.Highlight{
		{ID: uuid.New(), UserID: userID, Color: "pink"},
	}

	req := &models.BatchSyncRequest{
		Operations: []models.SyncOperation{},
		LastSyncAt: &lastSync,
	}

	mockRepo.On("GetChangesSince", ctx, userID, lastSync).Return(serverChanges, nil)

	result, err := service.BatchSync(ctx, userID, req)

	assert.NoError(t, err)
	assert.Len(t, result.ServerChanges, 1)
	mockRepo.AssertExpectations(t)
}
