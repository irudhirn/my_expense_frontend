import { useToast } from '@/hooks/use-toast';
import { authService } from '@/services/authService';
import useAuthStore from '@/stores/useAuthStore';
import useUserStore from '@/stores/useUserStore';
import { Eye, EyeOff, LogIn, Wallet } from 'lucide-react';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  // const { login, isLoading } = useAuth();
  const { setToken } = useAuthStore();
  const { setUser: setUserData } = useUserStore();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    userId: "",
    password: "",
    // rememberMe: false,
  });

  const [isLoading, setIsLoading] = useState(false);

  const adminLogin = async (credentials: any) => {
    try {
      setIsLoading(true);
      const res: any = await authService.adminLogin(credentials);
      console.log("login res", res);
      // Store token and user data
      // localStorage.setItem('token', res.token);
      localStorage.setItem('accessToken', JSON.stringify(res.token));
      localStorage.setItem('userData', JSON.stringify(res?.data?.user));
      
      setToken(null, res?.token);
      setUserData(res?.data?.user);
      // setUser(res.user);
      // setShowLoginDialog(false);
      navigate('/admin/expenses', { replace: true }); // Redirect to home after successful login
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await adminLogin(formData);
    } catch (error) {
      // Error is handled in AuthContext
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="card w-full max-w-md bg-card shadow-elevated">
        <div className="card-body">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
              <Wallet className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">Welcome Back</h1>
            <p className="text-muted-foreground mt-2">Sign in to <span className={`text-primary font-semibold`}>Super Admin</span> account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email or Username</span>
              </label>
              <input
                type="text"
                name="userId"
                value={formData.userId}
                onChange={handleChange}
                className="input input-bordered w-full"
                placeholder="Enter your email or username"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="input input-bordered w-full pr-12"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5 text-muted-foreground" />
                  ) : (
                    <Eye className="w-5 h-5 text-muted-foreground" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              {/* <label className="flex items-center">
                <input 
                  type="checkbox" 
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="checkbox checkbox-sm" 
                />
                <span className="label-text ml-2">Remember me</span>
              </label> */}
              <Link to="/forgot-password" className="link link-primary text-sm">
                Forgot password?
              </Link>
            </div>

            <button 
              type="submit" 
              className="btn btn-primary w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  Sign In
                </>
              )}
            </button>
          </form>

        </div>
      </div>
    </div>
  )
}

export default AdminLogin