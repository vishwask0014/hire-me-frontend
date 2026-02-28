import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { apiUrl, requestOptions } from '@/lib/api-client';

export const useAuthStore = create()(
  persist(
    (set, get) => ({
      user: null,
      isLoading: false,
      isAuthenticated: false,

      login: async (email, password) => {
        set({ isLoading: true });
        try {
          const response = await fetch(apiUrl('/api/auth/login'), {
            ...requestOptions,
            method: 'POST',
            body: JSON.stringify({ email, password }),
          });

          if (response.ok) {
            await get().checkAuth();
          } else {
            throw new Error('Login failed');
          }
        } catch (error) {
          console.error('Login error:', error);
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },

      logout: async () => {
        set({ isLoading: true });
        try {
          await fetch(apiUrl('/api/auth/logout'), {
            ...requestOptions,
            method: 'POST',
          });
          set({ user: null, isAuthenticated: false });
        } catch (error) {
          console.error('Logout error:', error);
        } finally {
          set({ isLoading: false });
        }
      },

      checkAuth: async () => {
        set({ isLoading: true });
        try {
          const response = await fetch(apiUrl('/api/auth/me'), {
            ...requestOptions,
            method: 'GET',
          });

          if (response.ok) {
            const userData = await response.json();
            set({ user: userData, isAuthenticated: true });
          } else {
            set({ user: null, isAuthenticated: false });
          }
        } catch (error) {
          console.error('Auth check error:', error);
          set({ user: null, isAuthenticated: false });
        } finally {
          set({ isLoading: false });
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
    }
  )
);
