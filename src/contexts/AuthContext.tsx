import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authService, LoginCredentials, SignupData } from '@/services/authService';
import { toast } from '@/hooks/use-toast';
// import { useAppStore } from '@/stores/useAppStore';
import useUserStore from '@/stores/useUserStore';
import useAuthStore from '@/stores/useAuthStore';
import { useNavigate } from 'react-router-dom';

interface User {
  id: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  signup: (signupData: SignupData) => Promise<void>;
  logout: () => Promise<void>;
  clearUserData: () => void;
  showLoginDialog: boolean;
  setShowLoginDialog: (show: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  // const resetStore = useAppStore((state) => state.resetStore);
  const resetStore = () => {};
  const { token, setToken } = useAuthStore();
  const { user: userData, setUser: setUserData } = useUserStore();

  // Check for existing token on app start
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
      }
    }
    setIsLoading(false);
  }, []);

  // Listen for token expiration events
  useEffect(() => {
    const handleTokenExpired = () => {
      setUser(null);
      resetStore(); // Clear Zustand store
      setShowLoginDialog(true);
      toast({
        title: "Session Expired",
        description: "Your session has expired. Please log in again.",
        variant: "destructive",
      });
    };

    window.addEventListener('tokenExpired', handleTokenExpired);
    return () => window.removeEventListener('tokenExpired', handleTokenExpired);
  }, [resetStore]);

  const login = async (credentials: LoginCredentials) => {
    try {
      setIsLoading(true);
      const res: any = await authService.login(credentials);
      console.log("login res", res);
      // Store token and user data
      localStorage.setItem('token', res.token);
      localStorage.setItem('userData', JSON.stringify(res?.data?.user));
      
      setToken(res?.token);
      setUserData(res?.data?.user);
      setUser(res.user);
      setShowLoginDialog(false);
      navigate('/expenses', { replace: true }); // Redirect to home after successful login
      toast({
        title: "Login Successful",
        description: "Welcome back!",
      });
    } catch (error: any) {
      toast({
        title: "Login Failed",
        description: error.response?.data?.message || "Invalid credentials",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (signupData: SignupData) => {
    try {
      setIsLoading(true);
      const response = await authService.signup(signupData);
      
      // Store token and user data
      localStorage.setItem('authToken', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      
      setUser(response.user);
      
      toast({
        title: "Account Created",
        description: "Your account has been created successfully!",
      });
    } catch (error: any) {
      toast({
        title: "Signup Failed",
        description: error.response?.data?.message || "Failed to create account",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      // await authService.logout();
      setUserData(null);
      setUser(null);
      setToken(null);
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear local storage and Zustand store
      setUser(null);
      resetStore(); // Clear Zustand store
      
      toast({
        title: "Logged Out",
        description: "You have been logged out successfully.",
      });
    }
  };

  const clearUserData = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    setUser(null);
    resetStore(); // Clear Zustand store
  };

  const value = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    signup,
    logout,
    clearUserData,
    showLoginDialog,
    setShowLoginDialog,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};