package models

type CreatePatternRequest struct {
	ID              string             `json:"id" binding:"required,min=1,max=50"`
	Category        string             `json:"category" binding:"required,min=1,max=100"`
	Icon            string             `json:"icon" binding:"max=10"`
	Difficulty      Difficulty         `json:"difficulty" binding:"required,oneof=Easy Medium Hard Easy-Medium Medium-Hard"`
	Description     string             `json:"description" binding:"required,min=1"`
	WhenToUse       []string           `json:"whenToUse" binding:"required,min=1,dive,min=1"`
	CodeTemplates   CodeTemplates      `json:"codeTemplates" binding:"required"`
	KeyInsights     []string           `json:"keyInsights" binding:"required,min=1,dive,min=1"`
	CommonMistakes  []string           `json:"commonMistakes,omitempty"`
	Variations      []PatternVariation `json:"variations"`
	CommonProblems  []string           `json:"commonProblems" binding:"required,min=1,dive,min=1"`
	TimeComplexity  string             `json:"timeComplexity" binding:"required"`
	SpaceComplexity string             `json:"spaceComplexity" binding:"required"`
}

type UpdatePatternRequest struct {
	Category        *string            `json:"category,omitempty" binding:"omitempty,min=1,max=100"`
	Icon            *string            `json:"icon,omitempty" binding:"omitempty,max=10"`
	Difficulty      *Difficulty        `json:"difficulty,omitempty" binding:"omitempty,oneof=Easy Medium Hard Easy-Medium Medium-Hard"`
	Description     *string            `json:"description,omitempty" binding:"omitempty,min=1"`
	WhenToUse       []string           `json:"whenToUse,omitempty" binding:"omitempty,min=1,dive,min=1"`
	CodeTemplates   *CodeTemplates     `json:"codeTemplates,omitempty"`
	KeyInsights     []string           `json:"keyInsights,omitempty" binding:"omitempty,min=1,dive,min=1"`
	CommonMistakes  []string           `json:"commonMistakes,omitempty"`
	Variations      []PatternVariation `json:"variations,omitempty"`
	CommonProblems  []string           `json:"commonProblems,omitempty" binding:"omitempty,min=1,dive,min=1"`
	TimeComplexity  *string            `json:"timeComplexity,omitempty"`
	SpaceComplexity *string            `json:"spaceComplexity,omitempty"`
}

type PatternListRequest struct {
	Page       int    `form:"page" binding:"min=0"`
	PageSize   int    `form:"page_size" binding:"min=0,max=100"`
	Search     string `form:"search"`
	Difficulty string `form:"difficulty"`
	Category   string `form:"category"`
	SortBy     string `form:"sort_by" binding:"omitempty,oneof=category difficulty created_at"`
	SortOrder  string `form:"sort_order" binding:"omitempty,oneof=asc desc"`
}

func (r *PatternListRequest) SetDefaults() {
	if r.Page == 0 {
		r.Page = 1
	}
	if r.PageSize == 0 {
		r.PageSize = 20
	}
	if r.SortBy == "" {
		r.SortBy = "category"
	}
	if r.SortOrder == "" {
		r.SortOrder = "asc"
	}
}

type PatternListResponse struct {
	Patterns   []Pattern  `json:"patterns"`
	Pagination Pagination `json:"pagination"`
}

type Pagination struct {
	Page       int   `json:"page"`
	PageSize   int   `json:"pageSize"`
	TotalItems int64 `json:"totalItems"`
	TotalPages int   `json:"totalPages"`
}

type BulkImportRequest struct {
	Patterns []CreatePatternRequest `json:"patterns" binding:"required,min=1,dive"`
}

type BulkImportResponse struct {
	Imported int      `json:"imported"`
	Failed   int      `json:"failed"`
	Errors   []string `json:"errors,omitempty"`
}

type CategoriesResponse struct {
	Categories []string `json:"categories"`
}
