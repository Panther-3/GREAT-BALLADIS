import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "./AuthProvider";  // Import the AuthProvider hook

/**
 * PrivateRoute (v6 pattern)
 * - If loading: optionally render a loading state (null / spinner)
 * - If authenticated: render nested routes via <Outlet />
 * - Otherwise redirect to /login (preserves attempted URL in state)
 *
 * Usage:
 * <Route element={<PrivateRoute />}>
 *   <Route path="/admin/dashboard" element={<Dashboard />} />
 * </Route>
 */
export default function PrivateRoute() {
  const { isAuthenticated, loading, apiFetch } = useAuth();
  const location = useLocation();
  const [sessionValid, setSessionValid] = useState(true);  // Tracks session validity

  // Check if the session is still valid
  useEffect(() => {
    const verifySession = async () => {
      if (isAuthenticated) {
        try {
          const res = await apiFetch("/api/me/", { method: "GET" }); // Endpoint to verify session
          if (!res.ok) {
            setSessionValid(false);  // Invalid session, need to redirect to login
          }
        } catch (error) {
          setSessionValid(false);  // If an error occurs, treat it as session invalid
        }
      }
    };

    if (isAuthenticated) {
      verifySession();
    }
  }, [isAuthenticated, apiFetch]);

  // If loading, optionally return a spinner or skeleton component
  if (loading) {
    return <div>Loading...</div>;  // You can replace this with a spinner or skeleton
  }

  // If not authenticated or session is invalid, redirect to /login and preserve the attempted URL
  if (!isAuthenticated || !sessionValid) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  // If authenticated and session is valid, render the nested routes
  return <Outlet />;
}
