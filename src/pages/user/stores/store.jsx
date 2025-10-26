import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [sessionId, setSessionId] = useState(null);
  const [loading, setLoading] = useState(true);

  const MONICA_URL = import.meta.env.VITE_MONICA_URL;

  // Load from localStorage on startup
  useEffect(() => {
    const savedUser = localStorage.getItem("auth_user");
    const savedAccess = localStorage.getItem("auth_token");
    const savedSession = localStorage.getItem("auth_session");

    if (savedUser && savedAccess && savedSession) {
      setUser(JSON.parse(savedUser));
      setAccessToken(savedAccess);
      setSessionId(savedSession);
    }
    setLoading(false);
  }, []);

  // ---------------------------
  // LOGIN
  // ---------------------------
  const login = async (email, password) => {
    try {
      const res = await fetch(`${MONICA_URL}/api/v1/data/user-creds/login`, {
        method: "POST",
        credentials: "include", // ensures refreshToken cookie is saved
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");

      setUser(data.user);
      setAccessToken(data.accessToken);
      setSessionId(data.sessionId);

      localStorage.setItem("auth_user", JSON.stringify(data.user));
      localStorage.setItem("auth_token", data.accessToken);
      localStorage.setItem("auth_session", data.sessionId);

      return { success: true };
    } catch (err) {
      console.error("Login error:", err);
      return { success: false, message: err.message };
    }
  };

  // ---------------------------
  // REFRESH TOKEN
  // ---------------------------
  const refreshAccessToken = async () => {
    try {
      const res = await fetch(`${MONICA_URL}/api/v1/data/user-creds/refresh`, {
        method: "POST",
        credentials: "include", // <-- send the refreshToken cookie
        headers: { Accept: "application/json" },
      });

      const data = await res.json();

      if (!res.ok) {
        console.warn("Failed to refresh access token:", data.message);
        logout();
        return false;
      }

      setAccessToken(data.accessToken);
      localStorage.setItem("auth_token", data.accessToken);
      console.info("✅ Access token refreshed successfully");
      return true;
    } catch (err) {
      console.error("Token refresh failed:", err);
      logout();
      return false;
    }
  };

  // ---------------------------
  // FETCH WITH AUTO REFRESH
  // ---------------------------
  const fetchWithAuth = async (url, options = {}) => {
    try {
      const res = await fetch(url, {
        ...options,
        headers: {
          ...(options.headers || {}),
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/json",
        },
      });

      if (res.status === 401) {
        console.warn("Access token expired, refreshing...");
        const refreshed = await refreshAccessToken();

        if (refreshed) {
          // Retry the request with the new token
          const retryRes = await fetch(url, {
            ...options,
            headers: {
              ...(options.headers || {}),
              Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
              Accept: "application/json",
            },
          });
          return retryRes;
        } else {
          throw new Error("Session expired, please login again.");
        }
      }

      return res;
    } catch (err) {
      console.error("FetchWithAuth error:", err);
      throw err;
    }
  };

  // ---------------------------
  // LOGOUT
  // ---------------------------
  const logout = async () => {
    try {
      const storedSessionId = sessionId || localStorage.getItem("auth_session");

      if (!storedSessionId) {
        console.warn("No session ID found — skipping logout request");
        return;
      }

      const res = await fetch(`${MONICA_URL}/api/v1/data/user-creds/logout`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ sessionId: storedSessionId }),
      });

      if (!res.ok) {
        const msg = await res.text();
        console.error("Logout failed:", msg);
      } else {
        console.info("✅ Logout successful");
      }
    } catch (err) {
      console.error("Logout request failed:", err);
    } finally {
      setUser(null);
      setAccessToken(null);
      setSessionId(null);
      localStorage.removeItem("auth_user");
      localStorage.removeItem("auth_token");
      localStorage.removeItem("auth_session");
    }
  };

  // ---------------------------
  // AUTO REFRESH INTERVAL
  // ---------------------------
  useEffect(() => {
    if (!user) return;

    // Try refresh immediately after login / reload
    refreshAccessToken();

    // Schedule periodic refresh (every 14 minutes)
    const interval = setInterval(() => {
      refreshAccessToken();
    }, 14 * 60 * 1000);

    return () => clearInterval(interval);
  }, [user]);

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
