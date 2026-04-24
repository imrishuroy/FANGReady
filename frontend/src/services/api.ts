import { ApiResponse, Pattern, PatternsListResponse, CategoriesResponse } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://fangready-production.up.railway.app';

class ApiService {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async fetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    const data: ApiResponse<T> = await response.json();

    if (!data.success) {
      throw new Error(data.error?.message || 'API request failed');
    }

    return data.data;
  }

  async getPatterns(params?: {
    page?: number;
    pageSize?: number;
    difficulty?: string;
    category?: string;
    search?: string;
  }): Promise<PatternsListResponse> {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.set('page', params.page.toString());
    if (params?.pageSize) searchParams.set('page_size', params.pageSize.toString());
    if (params?.difficulty) searchParams.set('difficulty', params.difficulty);
    if (params?.category) searchParams.set('category', params.category);
    if (params?.search) searchParams.set('search', params.search);

    const query = searchParams.toString();
    return this.fetch<PatternsListResponse>(`/api/v1/patterns${query ? `?${query}` : ''}`);
  }

  async getPatternById(id: string): Promise<Pattern> {
    return this.fetch<Pattern>(`/api/v1/patterns/${id}`);
  }

  async getCategories(): Promise<CategoriesResponse> {
    return this.fetch<CategoriesResponse>('/api/v1/patterns/categories');
  }

  async searchPatterns(query: string): Promise<{ patterns: Pattern[] }> {
    return this.fetch<{ patterns: Pattern[] }>(`/api/v1/patterns/search?q=${encodeURIComponent(query)}`);
  }

  async getHealth(): Promise<{ status: string; checks: Record<string, string> }> {
    return this.fetch('/health');
  }
}

export const api = new ApiService(API_BASE_URL);
export default api;
