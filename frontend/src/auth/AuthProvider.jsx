import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

// Backend API base URL
const API_BASE = import.meta.env.VITE_API_BASE || "http://127.0.0.1:8000";

// LocalStorage keys
const ACCESS_KEY = "accessToken";
const REFRESH_KEY = "refreshToken";

// AuthContext to manage authentication state across the app
const AuthContext = createContext(null);

// Helper functions to manage tokens in localStorage
const getAccess = () => localStorage.getItem(ACCESS_KEY);
const getRefresh = () => localStorage.getItem(REFRESH_KEY);
const setTokens = ({ access, refresh }) => {
  if (access) localStorage.setItem(ACCESS_KEY, access);
  if (refresh) localStorage.setItem(REFRESH_KEY, refresh);
};
const clearTokens = () => {
  localStorage.removeItem(ACCESS_KEY);
  localStorage.removeItem(REFRESH_KEY);
};

/* Function to refresh access token using the refresh token */
async function refreshAccess() {
  const refresh = getRefresh();
  if (!refresh) throw new Error("No refresh token");

  const res = await fetch(`${API_BASE}/api/token/refresh/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh }),
  });

  if (!res.ok) {
    clearTokens();
    throw new Error("Refresh failed");
  }

  const data = await res.json();
  if (!data.access) throw new Error("No access token returned");

  localStorage.setItem(ACCESS_KEY, data.access);
  return data.access;
}

/* apiFetch: inject bearer token and try refresh once on 401 */
async function apiFetch(path, options = {}) {
  const url = path.startsWith("http") ? path : `${API_BASE}${path}`;
  const headers = new Headers(options.headers || {});
  headers.set("Content-Type", headers.get("Content-Type") || "application/json");

  let access = getAccess();
  if (access) headers.set("Authorization", `Bearer ${access}`);

  let res = await fetch(url, { ...options, headers });

  if (res.status === 401) {
    // Attempt to refresh the access token
    try {
      const newAccess = await refreshAccess();
      headers.set("Authorization", `Bearer ${newAccess}`);
      res = await fetch(url, { ...options, headers });
    } catch (err) {
      clearTokens();
      throw err;
    }
  }

  return res;
}

/* AuthProvider Component to provide the auth state */
export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load the user from the API if authenticated
  const loadUser = useCallback(async () => {
    setLoading(true);
    try {
      const res = await apiFetch("/api/me/", { method: "GET" });
      if (!res.ok) {
        clearTokens();
        setUser(null);
      } else {
        const data = await res.json();
        setUser(data);
      }
    } catch (err) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Attempt to restore session on mount
    loadUser();
  }, [loadUser]);

  // Login function
  const login = useCallback(async (username, password) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/token/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => null);
        throw new Error((err && (err.detail || err.message)) || "Invalid credentials");
      }

      const tokens = await res.json(); // { access, refresh }
      setTokens(tokens);

      // Load user info into context
      await loadUser();
      setLoading(false);
      return { success: true };
    } catch (err) {
      clearTokens();
      setUser(null);
      setLoading(false);
      throw err;
    }
  }, [loadUser]);

  // Logout function to clear tokens and blacklist refresh token
  const logout = useCallback(async () => {
    try {
      const refreshToken = getRefresh();
      if (refreshToken) {
        // Call the backend to blacklist the refresh token
        await fetch(`${API_BASE}/api/logout/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ refresh: refreshToken }), // Send the refresh token to blacklist it
        });
      }
      clearTokens();
      setUser(null);
      navigate("/admin/login", { replace: true });
    } catch (err) {
      clearTokens();
      setUser(null);
      navigate("/admin/login", { replace: true });
    }
  }, [navigate]);

  // Provide context value for components to use
  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    login,
    logout,
    apiFetch,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Custom hook to access the auth context
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
