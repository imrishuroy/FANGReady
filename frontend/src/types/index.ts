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
  guide?: string;
}

export interface TutorialSection {
  title: string;
  content: string;
  code?: {
    java?: string;
    javascript?: string;
  };
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
  tutorial?: TutorialSection[];
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

// Auth types
export interface User {
  id: string;
  email: string;
  name?: string;
  emailVerified: boolean;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
  expiresIn: number;
}

export interface RefreshResponse {
  accessToken: string;
  expiresIn: number;
}

export interface ProgressResponse {
  questionIds: string[];
}

export interface RegisterRequest {
  email: string;
  password: string;
  name?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}
