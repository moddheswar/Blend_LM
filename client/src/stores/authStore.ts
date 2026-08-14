import { create } from 'zustand';
import { User } from '../types/auth';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setAuth: (user: User, token?: string) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false, // Initially true while we check session with backend
  setAuth: (user, token) => {
    if (token) localStorage.setItem('blend_lm_token', token);
    set({ user, isAuthenticated: true, isLoading: false });
  },
  clearAuth: () => {
    localStorage.removeItem('blend_lm_token');
    set({ user: null, isAuthenticated: false, isLoading: false });
  }
}));

// Listen for global 401s from the API client
window.addEventListener('auth:unauthorized', () => {
  useAuthStore.getState().clearAuth();
});