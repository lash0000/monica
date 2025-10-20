import { createContext, useContext, useState, useEffect } from "react"

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [accessToken, setAccessToken] = useState(null)
  const [sessionId, setSessionId] = useState(null)
  const [loading, setLoading] = useState(true)

  const MONICA_URL = import.meta.env.VITE_MONICA_URL

  useEffect(() => {
    const savedUser = localStorage.getItem("auth_user")
    const savedAccess = localStorage.getItem("auth_token")
    const savedSession = localStorage.getItem("auth_session")

    if (savedUser && savedAccess && savedSession) {
      setUser(JSON.parse(savedUser))
      setAccessToken(savedAccess)
      setSessionId(savedSession)
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    try {
      const res = await fetch(`${MONICA_URL}/api/v1/data/user-creds/login`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({ email, password }),
        mode: "cors",
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.message || "Login failed")

      setUser(data.user)
      setAccessToken(data.accessToken)
      setSessionId(data.sessionId)

      localStorage.setItem("auth_user", JSON.stringify(data.user))
      localStorage.setItem("auth_token", data.accessToken)
      localStorage.setItem("auth_session", data.sessionId)

      return { success: true }
    } catch (err) {
      console.error("Login error:", err)
      return { success: false, message: err.message }
    }
  }

  const refreshAccessToken = async () => {
    try {
      const res = await fetch(`${MONICA_URL}/api/v1/data/user-creds/refresh`, {
        method: "POST",
        credentials: "include",
        headers: { "Accept": "application/json" },
        mode: "cors",
      })

      const data = await res.json()
      if (!res.ok) throw new Error("Failed to refresh token")

      setAccessToken(data.accessToken)
      localStorage.setItem("auth_token", data.accessToken)
    } catch (err) {
      console.error("Token refresh failed:", err)
      logout()
    }
  }

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
          "Accept": "application/json",
        },
        body: JSON.stringify({ sessionId: storedSessionId }),
        mode: "cors",
      });

      if (!res.ok) {
        const msg = await res.text();
        console.error("Logout failed:", msg);
      } else {
        console.log("Logout request successful");
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


  useEffect(() => {
    const interval = setInterval(() => {
      if (user) refreshAccessToken()
    }, 14 * 60 * 1000)
    return () => clearInterval(interval)
  }, [user])

  return (
    <AuthContext.Provider value={{ user, accessToken, sessionId, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
