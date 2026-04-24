export interface CodeTemplates {
  javascript: string;
  java?: string;
  python?: string;
  cpp?: string;
  go?: string;
}

export interface VariationTemplate {
  javascript?: string;
  java?: string;
}

export interface PatternVariation {
  id: string;
  name: string;
  desc: string;
  when?: string;
  template?: VariationTemplate;
  problems?: string[];
}

export interface Pattern {
  id: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Easy-Medium' | 'Medium-Hard';
  description: string;
  whenToUse: string[];
  codeTemplates: CodeTemplates;
  keyInsights: string[];
  commonMistakes?: string[];
  variations: PatternVariation[];
  commonProblems: string[];
  timeComplexity: string;
  spaceComplexity: string;
  createdAt: string;
  updatedAt: string;
}

export interface Question {
  id: string;
  name: string;
  url: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  pattern: string;
  companies: string[];
  frequency: string;
  category: string;
}

export interface Pagination {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: {
    code: string;
    message: string;
    details?: Record<string, string>;
  };
  meta?: {
    requestId: string;
    version: string;
  };
}

export interface PatternsListResponse {
  patterns: Pattern[];
  pagination: Pagination;
}

export interface CategoriesResponse {
  categories: string[];
}
