import { ReactNode, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
// import { useAuth } from '@/contexts/AuthContext';
import useAuthStore from '@/stores/useAuthStore';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { token } = useAuthStore();
  const location = useLocation();

    useEffect(() => {
    // Listen for storage changes across tabs
    const handleStorageChange = (event) => {
      if (event.key === "token" && event.newValue === null) {
        // Token removed from another tab → logout here too
        window.location.replace("/login");
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

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

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;