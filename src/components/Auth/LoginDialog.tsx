import { LogIn } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginDialog = () => {
  const { showLoginDialog, setShowLoginDialog, clearUserData } = useAuth();
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    clearUserData();
    setShowLoginDialog(false);
    navigate('/login');
  };

  return (
    <Dialog open={showLoginDialog} onOpenChange={setShowLoginDialog}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">
            Session Expired
          </DialogTitle>
        </DialogHeader>

        <div className="text-center space-y-6 mt-4">
          <p className="text-muted-foreground text-lg">
            You have been logged out! Please login again.
          </p>
          
          <Button 
            onClick={handleLoginRedirect}
            className="w-full"
            size="lg"
          >
            <LogIn className="w-4 h-4 mr-2" />
            Go to Login
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginDialog;


/*

import { useState } from "react";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useAuth } from "@/contexts/AuthContext";

const LoginDialog = () => {
  const { showLoginDialog, setShowLoginDialog, login, isLoading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    emailOrUsername: "",
    password: "",
    rememberMe: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(formData);
    } catch (error) {
      // Error is handled in AuthContext
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  return (
    <Dialog open={showLoginDialog} onOpenChange={setShowLoginDialog}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">
            Session Expired
          </DialogTitle>
          <p className="text-center text-muted-foreground">
            Please log in again to continue
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Email or Username</span>
            </label>
            <input
              type="text"
              name="emailOrUsername"
              value={formData.emailOrUsername}
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

          <div className="flex items-center">
            <label className="flex items-center">
              <input 
                type="checkbox" 
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
                className="checkbox checkbox-sm" 
              />
              <span className="label-text ml-2">Remember me</span>
            </label>
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
      </DialogContent>
    </Dialog>
  );
};

export default LoginDialog;

*/