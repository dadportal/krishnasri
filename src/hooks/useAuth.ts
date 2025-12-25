import { useEffect } from 'react';
import { useAuthStore } from '@/stores/authStore';

export function useAuth() {
  const {
    user,
    isAuthenticated,
    isLoading,
    isInitialized,
    initialize,
    login,
    signup,
    logout,
    hasPermission,
  } = useAuthStore();

  useEffect(() => {
    if (!isInitialized) {
      initialize();
    }
  }, [isInitialized, initialize]);

  return {
    user,
    isAuthenticated,
    isLoading,
    isInitialized,
    login,
    signup,
    logout,
    hasPermission,
  };
}
