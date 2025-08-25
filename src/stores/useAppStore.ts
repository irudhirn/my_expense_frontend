import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

// Define the shape of your app state
interface AppState {
  // User-related data from backend
  userData: Record<string, any>;
  
  // Dynamic data that comes from backend
  dynamicData: Record<string, any>;
  
  // Loading states for different data types
  loading: {
    userData: boolean;
    dynamicData: boolean;
    [key: string]: boolean;
  };
  
  // Error states
  errors: {
    [key: string]: string | null;
  };
  
  // Actions
  setUserData: (data: Record<string, any>) => void;
  updateUserData: (key: string, value: any) => void;
  clearUserData: () => void;
  
  setDynamicData: (key: string, data: any) => void;
  updateDynamicData: (key: string, updates: Record<string, any>) => void;
  clearDynamicData: (key?: string) => void;
  
  setLoading: (key: string, isLoading: boolean) => void;
  setError: (key: string, error: string | null) => void;
  clearErrors: () => void;
  
  // Reset entire store
  resetStore: () => void;
}

const initialState = {
  userData: {},
  dynamicData: {},
  loading: {
    userData: false,
    dynamicData: false,
  },
  errors: {},
};

export const useAppStore = create<AppState>()(
  devtools(
    persist(
      (set, get) => ({
        ...initialState,
        
        // User data actions
        setUserData: (data) => 
          set((state) => ({ 
            userData: { ...state.userData, ...data } 
          }), false, 'setUserData'),
          
        updateUserData: (key, value) =>
          set((state) => ({
            userData: { ...state.userData, [key]: value }
          }), false, 'updateUserData'),
          
        clearUserData: () =>
          set({ userData: {} }, false, 'clearUserData'),
        
        // Dynamic data actions
        setDynamicData: (key, data) =>
          set((state) => ({
            dynamicData: { ...state.dynamicData, [key]: data }
          }), false, 'setDynamicData'),
          
        updateDynamicData: (key, updates) =>
          set((state) => ({
            dynamicData: {
              ...state.dynamicData,
              [key]: { ...state.dynamicData[key], ...updates }
            }
          }), false, 'updateDynamicData'),
          
        clearDynamicData: (key) =>
          set((state) => {
            if (key) {
              const newDynamicData = { ...state.dynamicData };
              delete newDynamicData[key];
              return { dynamicData: newDynamicData };
            }
            return { dynamicData: {} };
          }, false, 'clearDynamicData'),
        
        // Loading actions
        setLoading: (key, isLoading) =>
          set((state) => ({
            loading: { ...state.loading, [key]: isLoading }
          }), false, 'setLoading'),
        
        // Error actions
        setError: (key, error) =>
          set((state) => ({
            errors: { ...state.errors, [key]: error }
          }), false, 'setError'),
          
        clearErrors: () =>
          set({ errors: {} }, false, 'clearErrors'),
        
        // Reset store
        resetStore: () =>
          set(initialState, false, 'resetStore'),
      }),
      {
        name: 'app-store',
        // Only persist userData and dynamicData, not loading states or errors
        partialize: (state) => ({
          userData: state.userData,
          dynamicData: state.dynamicData,
        }),
      }
    ),
    { name: 'AppStore' }
  )
);

// Selector hooks for specific data
export const useUserData = () => useAppStore((state) => state.userData);
export const useDynamicData = (key?: string) => 
  useAppStore((state) => key ? state.dynamicData[key] : state.dynamicData);
export const useLoading = (key?: string) => 
  useAppStore((state) => key ? state.loading[key] : state.loading);
export const useErrors = (key?: string) => 
  useAppStore((state) => key ? state.errors[key] : state.errors);