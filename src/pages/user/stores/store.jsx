import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useLocation } from "react-router-dom";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [sessionId, setSessionId] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const apiBaseUrl = import.meta.env.VITE_SOCKET_URL;

  // Restore tokens on mount
  useEffect(() => {
    const savedToken = localStorage.getItem("access_token");
    const savedRefresh = localStorage.getItem("refresh_token");
    const savedSession = localStorage.getItem("session_id");
    const savedUserId = localStorage.getItem("user_id");

    if (savedToken && savedRefresh && savedSession && savedUserId) {
      setAccessToken(savedToken);
      setRefreshToken(savedRefresh);
      setSessionId(savedSession);
      setUser({ user_id: savedUserId });
    }

    setLoading(false);
  }, []);

  // LOGIN
  const login = async (email, password) => {
    try {
      const res = await fetch(`${apiBaseUrl}/api/v1/data/user-creds/login`, {
        method: "POST",
        credentials: "include", // important for HTTP-only refresh cookie
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const payload = await res.json();
      if (!res.ok) throw new Error(payload.message || "Login failed");

      const { user_id, session_id, access_token, refresh_token } = payload.data;

      // Persist both tokens
      localStorage.setItem("access_token", access_token);
      localStorage.setItem("refresh_token", refresh_token);
      localStorage.setItem("session_id", session_id);
      localStorage.setItem("user_id", user_id);

      Cookies.set("date_login", new Date().toISOString(), {
        secure: true,
        sameSite: "strict",
        path: "/",
      });

      setAccessToken(access_token);
      setRefreshToken(refresh_token);
      setSessionId(session_id);
      setUser({ user_id });

      return { success: true };
    } catch (err) {
      console.error("login error:", err);
      return { success: false, message: err.message };
    }
  };

  // REFRESH ACCESS TOKEN
  const refreshAccessToken = async () => {
    try {
      const storedRefresh = localStorage.getItem("refresh_token");

      const res = await fetch(`${apiBaseUrl}/api/v1/data/user-creds/refresh`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          refresh_token: storedRefresh, // backend expects this
        }),
      });

      const payload = await res.json();

      if (!res.ok || !payload.data?.access_token) {
        await logout();
        return false;
      }

      const newAccess = payload.data.access_token;
      localStorage.setItem("access_token", newAccess);
      setAccessToken(newAccess);

      return true;
    } catch (err) {
      console.error("refresh failed:", err);
      await logout();
      return false;
    }
  };

  // FETCH with automatic refresh
  const fetchWithAuth = async (url, options = {}) => {
    const headers = {
      ...(options.headers || {}),
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/json",
    };

    try {
      const res = await fetch(url, { ...options, headers });

      if (res.status === 401) {
        // try refreshing
        const refreshed = await refreshAccessToken();
        if (!refreshed) throw new Error("Session expired. Please login again.");

        const newAccess = localStorage.getItem("access_token");

        // retry request
        return await fetch(url, {
          ...options,
          headers: {
            ...(options.headers || {}),
            Authorization: `Bearer ${newAccess}`,
            Accept: "application/json",
          },
        });
      }

      return res;
    } catch (err) {
      console.error("fetchWithAuth error:", err);
      throw err;
    }
  };

  // LOGOUT
  const logout = async () => {
    const storedSessionId = localStorage.getItem("session_id");
    const storedUserId = localStorage.getItem("user_id");

    try {
      await fetch(`${apiBaseUrl}/api/v1/data/user-creds/logout`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          sessionid: storedSessionId,
          user_id: storedUserId,
        }),
      });
    } catch (err) {
      console.error("logout error:", err);
    } finally {
      // clear all auth data
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("session_id");
      localStorage.removeItem("user_id");

      Cookies.remove("date_login", { path: "/" });

      setUser(null);
      setAccessToken(null);
      setRefreshToken(null);
      setSessionId(null);
    }
  };

  // Auto-refresh when route changes
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
        refreshToken,
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
