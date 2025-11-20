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

  // axios.interceptors.response.use((response) => {
  //   return response;
  // }, (err) => {
  //   console.error(1, "error from response interceptor", err);
  //   if(err?.response?.status === 401){
  //     // Show error modal
  //   }

  //   return Promise.reject(err);
  // })

  useEffect(() => {
    // Only ProtectedRoute listens for unauthorized events
    const handler = () => setShowLoginDialog(true);

    window.addEventListener("unauthorized", handler);
    return () => window.removeEventListener("unauthorized", handler);
  }, []);

  // console.log("Console log from protected route", Date.now());
  // useEffect(() => {
  //   console.log("Console log from protected route useEffect 2", Date.now());
  //   const interceptor = axios.interceptors.response.use(
  //     (response) => response,
  //     (err) => {
  //       console.error("Error from response interceptor", err);
  //       if (err?.response?.status === 401) {
  //         // Show error modal, logout, etc.
  //         setShowLoginDialog(true);
  //       }
  //       return Promise.reject(err);
  //     }
  //   );

  //   // Cleanup interceptor on unmount
  //   return () => {
  //     axios.interceptors.response.eject(interceptor);
  //   };
  // }, []);

  //   useEffect(() => {
  //   // Listen for storage changes across tabs
  //   const handleStorageChange = (event) => {
  //     if (event.key === "token" && event.newValue === null) {
  //       // Token removed from another tab → logout here too
  //       window.location.replace("/login");
  //     }
  //   };

  //   window.addEventListener("storage", handleStorageChange);

  //   return () => {
  //     window.removeEventListener("storage", handleStorageChange);
  //   };
  // }, []);

  // useEffect(() => {
  //   window.addEventListener("focus", () => {
  //     if(!token){
  //       window.location.replace("/login");
  //       setTimeout(() => { window.location.reload(); }, 10000);
  //     }
  //   });

  //   return () => {
  //     window.removeEventListener("focus", () => {});
  //   }
  // }, []);

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