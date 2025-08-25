import api from '@/lib/axios';

export interface LoginCredentials {
  emailOrUsername: string;
  password: string;
  rememberMe?: boolean;
}

export interface SignupData {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    username: string;
    firstName: string;
    lastName: string;
  };
  message: string;
}

export const authService = {
  // Login API call
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },

  // Signup API call
  signup: async (signupData: SignupData): Promise<AuthResponse> => {
    const response = await api.post('/auth/register', signupData);
    return response.data;
  },

  // Logout API call
  logout: async (): Promise<void> => {
    await api.post('/auth/logout');
  },

  // Refresh token API call
  refreshToken: async (): Promise<AuthResponse> => {
    const response = await api.post('/auth/refresh');
    return response.data;
  },

  // Get current user profile
  getProfile: async (): Promise<any> => {
    const response = await api.get('/auth/profile');
    return response.data;
  },
};