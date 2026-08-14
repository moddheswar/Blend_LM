import { apiClient } from './client';
import { AuthResponse } from '../../types/auth';

export const authApi = {
  login: (credentials: Record<string, string>) => 
    apiClient.post<AuthResponse>('/auth/login', credentials),
    
  register: (data: Record<string, string>) => 
    apiClient.post<AuthResponse>('/auth/register', data),
    
  logout: () => 
    apiClient.post<void>('/auth/logout', {}),
    
  getProfile: () => 
    apiClient.get<AuthResponse>('/auth/me')
};