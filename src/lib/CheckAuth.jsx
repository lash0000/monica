import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../pages/user/stores/store";

export default function CheckAuth({ children }) {
  const { user, loading } = useAuth();
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      const timer = setTimeout(() => setRedirect(true), 3000);
      return () => clearTimeout(timer);
    }
  }, [loading, user]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-primary border-opacity-70 mb-4"></div>
        <p className="text-gray-700 dark:text-gray-300 font-medium">Checking session...</p>
      </div>
    );
  }

  if (!user && redirect) return <Navigate to="/login" replace />;

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 transition-all duration-500">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 max-w-sm text-center">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">
            Unauthorized
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-5">
            Please log in first to continue.
          </p>
          <div className="flex justify-center">
            <div className="animate-pulse text-primary font-medium text-sm">
              Redirecting to login...
            </div>
          </div>
        </div>
      </div>
    );
  }

  return children;
}
