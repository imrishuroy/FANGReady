import type {
  ApiResponse,
  AuthResponse,
  RefreshResponse,
  ProgressResponse,
  RegisterRequest,
  LoginRequest,
  User,
} from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

class ApiClient {
  private accessToken: string | null = null;
  private refreshPromise: Promise<string | null> | null = null;

  setAccessToken(token: string | null) {
    this.accessToken = token;
  }

  getAccessToken(): string | null {
    return this.accessToken;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${API_BASE_URL}${endpoint}`;
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (this.accessToken) {
      (headers as Record<string, string>)['Authorization'] = `Bearer ${this.accessToken}`;
    }

    const response = await fetch(url, {
      ...options,
      headers,
      credentials: 'include',
    });

    const data: ApiResponse<T> = await response.json();

    if (!response.ok && response.status === 401 && this.accessToken) {
      const newToken = await this.refreshToken();
      if (newToken) {
        (headers as Record<string, string>)['Authorization'] = `Bearer ${newToken}`;
        const retryResponse = await fetch(url, {
          ...options,
          headers,
          credentials: 'include',
        });
        return retryResponse.json();
      }
    }

    return data;
  }

  async refreshToken(): Promise<string | null> {
    if (this.refreshPromise) {
      return this.refreshPromise;
    }

    this.refreshPromise = (async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/v1/auth/refresh`, {
          method: 'POST',
          credentials: 'include',
        });

        if (!response.ok) {
          this.accessToken = null;
          return null;
        }

        const data: ApiResponse<RefreshResponse> = await response.json();
        if (data.success && data.data.accessToken) {
          this.accessToken = data.data.accessToken;
          return data.data.accessToken;
        }
        return null;
      } catch {
        this.accessToken = null;
        return null;
      } finally {
        this.refreshPromise = null;
      }
    })();

    return this.refreshPromise;
  }

  // Auth endpoints
  async register(req: RegisterRequest): Promise<ApiResponse<AuthResponse>> {
    const response = await this.request<AuthResponse>('/api/v1/auth/register', {
      method: 'POST',
      body: JSON.stringify(req),
    });
    if (response.success && response.data.accessToken) {
      this.accessToken = response.data.accessToken;
    }
    return response;
  }

  async login(req: LoginRequest): Promise<ApiResponse<AuthResponse>> {
    const response = await this.request<AuthResponse>('/api/v1/auth/login', {
      method: 'POST',
      body: JSON.stringify(req),
    });
    if (response.success && response.data.accessToken) {
      this.accessToken = response.data.accessToken;
    }
    return response;
  }

  async logout(): Promise<ApiResponse<{ message: string }>> {
    const response = await this.request<{ message: string }>('/api/v1/auth/logout', {
      method: 'POST',
    });
    this.accessToken = null;
    return response;
  }

  async getMe(): Promise<ApiResponse<User>> {
    return this.request<User>('/api/v1/user/me');
  }

  // Progress endpoints
  async getProgress(): Promise<ApiResponse<ProgressResponse>> {
    return this.request<ProgressResponse>('/api/v1/progress');
  }

  async toggleProgress(questionId: string, completed: boolean): Promise<ApiResponse<ProgressResponse>> {
    return this.request<ProgressResponse>('/api/v1/progress/toggle', {
      method: 'POST',
      body: JSON.stringify({ questionId, completed }),
    });
  }

  async syncProgress(questionIds: string[]): Promise<ApiResponse<ProgressResponse>> {
    return this.request<ProgressResponse>('/api/v1/progress/sync', {
      method: 'POST',
      body: JSON.stringify({ questionIds }),
    });
  }
}

export const apiClient = new ApiClient();
