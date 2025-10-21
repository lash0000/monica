import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useRegisterAuth } from "../pages/user/stores/register-store";

export default function CheckRegisterAuth({ children }) {
  const { email } = useRegisterAuth();
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (!email) {
      const timer = setTimeout(() => setRedirect(true), 3000);
      return () => clearTimeout(timer);
    }
  }, [email]);

  if (!email && redirect) return <Navigate to="/signup" replace />;

  if (!email) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 text-center">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">
            Unauthorized
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
            You must register first before verifying your OTP.
          </p>
          <div className="animate-pulse text-primary font-medium text-sm">
            Redirecting to Sign Up...
          </div>
        </div>
      </div>
    );
  }

  return children;
}
