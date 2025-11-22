import { ReactNode, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
// import { useAuth } from '@/contexts/AuthContext';
import useAuthStore from '@/stores/useAuthStore';
// import axios from 'axios';
import { axiosInstance as axios } from '@/utils/globalVars';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { showLoginDialog, setShowLoginDialog, clearUserData } = useAuth();
  const { accessToken, token } = useAuthStore();
  const location = useLocation();

  useEffect(() => {
    // Only ProtectedRoute listens for unauthorized events
    if(showLoginDialog) return;
    const handler = () => setShowLoginDialog(true);

    window.addEventListener("unauthorized", handler);
    return () => window.removeEventListener("unauthorized", handler);
  }, []);

  // if (isLoading) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center">
  //       <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
  //     </div>
  //   );
  // }

  if (!accessToken) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;