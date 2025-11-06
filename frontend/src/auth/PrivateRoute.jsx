import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthProvider";

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
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    // you can return a spinner or skeleton here
    return null;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
