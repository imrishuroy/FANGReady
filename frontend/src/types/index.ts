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

// Problem types
export interface Problem {
  id: string;
  patternId?: string;
  title: string;
  slug: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  description: string;
  constraints?: string;
  examples?: string;
  hints?: string;
  createdAt: string;
  updatedAt: string;
}

export interface TestCase {
  id: string;
  problemId: string;
  input: string;
  expectedOutput: string;
  isSample: boolean;
  orderIndex: number;
  explanation?: string;
}

export interface Language {
  id: number;
  name: string;
  slug: string;
  version?: string;
  isActive: boolean;
}

export interface ProblemTemplate {
  id: string;
  problemId: string;
  languageId: number;
  templateCode: string;
  wrapperCode: string;
  languageName: string;
  languageSlug: string;
}

export interface ProblemDetailResponse {
  problem: Problem;
  sampleTestCases: TestCase[];
  templates: ProblemTemplate[];
  languages: Language[];
  userSolved: boolean;
  userSubmissions: number;
}

export interface ProblemListResponse {
  problems: Problem[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Submission types
export type SubmissionStatus =
  | 'pending'
  | 'running'
  | 'accepted'
  | 'wrong_answer'
  | 'time_limit_exceeded'
  | 'memory_limit_exceeded'
  | 'runtime_error'
  | 'compilation_error'
  | 'internal_error';

export interface SubmissionResult {
  id: string;
  submissionId: string;
  testCaseId: string;
  status: SubmissionStatus;
  actualOutput?: string;
  runtimeMs?: number;
  memoryKb?: number;
  errorMessage?: string;
  input: string;
  expectedOutput: string;
  isSample: boolean;
}

export interface Submission {
  id: string;
  userId: string;
  problemId: string;
  languageId: number;
  code: string;
  status: SubmissionStatus;
  runtimeMs?: number;
  memoryKb?: number;
  testCasesPassed: number;
  testCasesTotal: number;
  createdAt: string;
  results?: SubmissionResult[];
}

export interface SubmitCodeRequest {
  problemId: string;
  languageId: number;
  code: string;
}

export interface RunCodeRequest {
  problemId: string;
  languageId: number;
  code: string;
  customInput?: string;
}

export interface RunCodeResult {
  testCaseIndex: number;
  input: string;
  expectedOutput: string;
  actualOutput: string;
  status: SubmissionStatus;
  runtimeMs?: number;
  memoryKb?: number;
  errorMessage?: string;
  stdout?: string;
  stderr?: string;
  isCustom?: boolean;
}

export interface RunCodeResponse {
  results: RunCodeResult[];
  totalPassed: number;
  totalTests: number;
}
