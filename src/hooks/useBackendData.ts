import { useAppStore } from '@/stores/useAppStore';
import { useCallback } from 'react';

// Custom hook for managing backend data with Zustand
export const useBackendData = () => {
  const store = useAppStore();

  // Helper function to fetch and store data
  const fetchAndStore = useCallback(async (
    key: string,
    fetchFunction: () => Promise<any>,
    options?: { showLoading?: boolean }
  ) => {
    const { showLoading = true } = options || {};
    
    try {
      if (showLoading) store.setLoading(key, true);
      store.setError(key, null);
      
      const data = await fetchFunction();
      store.setDynamicData(key, data);
      
      return data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'An error occurred';
      store.setError(key, errorMessage);
      throw error;
    } finally {
      if (showLoading) store.setLoading(key, false);
    }
  }, [store]);

  // Helper function to update specific data
  const updateData = useCallback((key: string, updates: Record<string, any>) => {
    store.updateDynamicData(key, updates);
  }, [store]);

  // Helper function to get data with loading and error state
  const getData = useCallback((key: string) => {
    return {
      data: store.dynamicData[key],
      loading: store.loading[key] || false,
      error: store.errors[key] || null,
    };
  }, [store.dynamicData, store.loading, store.errors]);

  return {
    // Data operations
    fetchAndStore,
    updateData,
    getData,
    setData: store.setDynamicData,
    clearData: store.clearDynamicData,
    
    // User data operations
    setUserData: store.setUserData,
    updateUserData: store.updateUserData,
    clearUserData: store.clearUserData,
    getUserData: () => store.userData,
    
    // State management
    setLoading: store.setLoading,
    setError: store.setError,
    clearErrors: store.clearErrors,
    
    // Global operations
    resetStore: store.resetStore,
  };
};

// Example usage hook for specific data types
export const useUserProfile = () => {
  const { getData, fetchAndStore, updateData } = useBackendData();
  
  return {
    ...getData('userProfile'),
    fetchProfile: (fetchFunction: () => Promise<any>) => 
      fetchAndStore('userProfile', fetchFunction),
    updateProfile: (updates: Record<string, any>) => 
      updateData('userProfile', updates),
  };
};