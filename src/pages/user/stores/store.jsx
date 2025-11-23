import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useLocation } from "react-router-dom";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [sessionId, setSessionId] = useState(null);
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const apiBaseUrl = import.meta.env.VITE_SOCKET_URL;

  useEffect(() => {
    const savedToken = localStorage.getItem("access_token");
    const savedSession = localStorage.getItem("session_id");
    const savedUserId = localStorage.getItem("user_id");

    if (savedToken && savedSession && savedUserId) {
      setAccessToken(savedToken);
      setSessionId(savedSession);
      setUser({ user_id: savedUserId });
    }

    setLoading(false);
    // run once on mount
  }, []);

  const login = async (email, password) => {
    try {
      const res = await fetch(`${apiBaseUrl}/api/v1/data/user-creds/login`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const payload = await res.json();
      if (!res.ok) throw new Error(payload.message || "Login failed");

      const { user_id, session_id, access_token } = payload.data || {};

      // persist
      localStorage.setItem("access_token", access_token);
      localStorage.setItem("session_id", session_id);
      localStorage.setItem("user_id", user_id);

      Cookies.set("date_login", new Date().toISOString(), {
        secure: true,
        sameSite: "strict",
        path: "/",
      });

      setAccessToken(access_token);
      setSessionId(session_id);
      setUser({ user_id });

      // socket init removed by design

      return { success: true };
    } catch (err) {
      console.error("login error:", err);
      return { success: false, message: err.message };
    }
  };

  const refreshAccessToken = async () => {
    try {
      const res = await fetch(`${apiBaseUrl}/api/v1/data/user-creds/refresh`, {
        method: "POST",
        credentials: "include",
        headers: { Accept: "application/json" },
      });

      const payload = await res.json();

      if (!res.ok) {
        await logout();
        return false;
      }

      const newToken = payload.data?.access_token;
      if (!newToken) {
        await logout();
        return false;
      }

      localStorage.setItem("access_token", newToken);
      setAccessToken(newToken);

      // socket refresh removed by design

      return true;
    } catch (err) {
      console.error("token refresh failed:", err);
      await logout();
      return false;
    }
  };

  const fetchWithAuth = async (url, options = {}) => {
    try {
      const headers = {
        ...(options.headers || {}),
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
      };

      const res = await fetch(url, {
        ...options,
        headers,
      });

      if (res.status === 401) {
        // try refresh
        const refreshed = await refreshAccessToken();
        if (refreshed) {
          const newToken = localStorage.getItem("access_token");
          const retryRes = await fetch(url, {
            ...options,
            headers: {
              ...(options.headers || {}),
              Authorization: `Bearer ${newToken}`,
              Accept: "application/json",
            },
          });
          return retryRes;
        }
        throw new Error("Session expired. Please login again.");
      }

      return res;
    } catch (err) {
      console.error("fetchWithAuth error:", err);
      throw err;
    }
  };

  const logout = async () => {
    const storedSessionId = localStorage.getItem("session_id");
    const storedUserId = localStorage.getItem("user_id");

    try {
      await fetch(`${apiBaseUrl}/api/v1/data/user-creds/logout`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          sessionid: storedSessionId,
          user_id: storedUserId,
        }),
      });
    } catch (err) {
      console.error("logout error:", err);
    } finally {
      localStorage.removeItem("access_token");
      localStorage.removeItem("session_id");
      localStorage.removeItem("user_id");

      Cookies.remove("date_login", { path: "/" });

      setUser(null);
      setAccessToken(null);
      setSessionId(null);

      // socket disconnect removed by design
    }
  };

  useEffect(() => {
    if (!accessToken) return;
    void refreshAccessToken();
  }, [location.pathname]);

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        sessionId,
        login,
        logout,
        fetchWithAuth,
        refreshAccessToken,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
