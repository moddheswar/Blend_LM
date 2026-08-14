import { ApiResponse, ApiError } from '../../types/api';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api/v1';

async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const url = `${BASE_URL}${endpoint}`;
  
  // Prepare headers (add auth token if using Bearer auth, otherwise rely on cookies)
  const headers = new Headers(options.headers);
  headers.set('Content-Type', 'application/json');
  
  const token = localStorage.getItem('blend_lm_token'); // Temporary UI state
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const config: RequestInit = {
    ...options,
    headers,
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json().catch(() => null);

    if (!response.ok) {
      // Handle 401 globally if needed (e.g., emit event to clear auth store)
      if (response.status === 401) {
        window.dispatchEvent(new Event('auth:unauthorized'));
      }

      return {
        success: false,
        data: null,
        error: {
          code: data?.error?.code || 'REQUEST_FAILED',
          message: data?.error?.message || 'An unexpected error occurred.',
          status: response.status
        }
      };
    }

    return {
      success: true,
      data: data.data, // Unwrapping the successful response envelope
      error: null
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      error: {
        code: 'NETWORK_ERROR',
        message: 'Unable to connect to the server. Please check your connection.',
        status: 0
      }
    };
  }
}

export const apiClient = {
  get: <T>(endpoint: string) => request<T>(endpoint, { method: 'GET' }),
  post: <T>(endpoint: string, body: any) => request<T>(endpoint, { method: 'POST', body: JSON.stringify(body) }),
  put: <T>(endpoint: string, body: any) => request<T>(endpoint, { method: 'PUT', body: JSON.stringify(body) }),
  delete: <T>(endpoint: string) => request<T>(endpoint, { method: 'DELETE' }),
};