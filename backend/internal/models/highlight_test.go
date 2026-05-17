package models

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestHighlightColor_IsValid(t *testing.T) {
	tests := []struct {
		name     string
		color    HighlightColor
		expected bool
	}{
		{"yellow is valid", HighlightColorYellow, true},
		{"green is valid", HighlightColorGreen, true},
		{"blue is valid", HighlightColorBlue, true},
		{"pink is valid", HighlightColorPink, true},
		{"purple is valid", HighlightColorPurple, true},
		{"empty string is invalid", HighlightColor(""), false},
		{"random string is invalid", HighlightColor("red"), false},
		{"uppercase is invalid", HighlightColor("YELLOW"), false},
		{"mixed case is invalid", HighlightColor("Yellow"), false},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			assert.Equal(t, tt.expected, tt.color.IsValid())
		})
	}
}

func TestSyncOperationType_Constants(t *testing.T) {
	assert.Equal(t, SyncOperationType("create"), SyncOpCreate)
	assert.Equal(t, SyncOperationType("update"), SyncOpUpdate)
	assert.Equal(t, SyncOperationType("delete"), SyncOpDelete)
}
