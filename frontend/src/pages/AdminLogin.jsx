// src/pages/AdminLogin.jsx
import React, { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/auth/AuthProvider";

/**
 * AdminLogin
 * - Uses centralized AuthProvider
 * - Redirects to dashboard if already authenticated
 * - Shows inline error + toast on failure
 */

const AdminLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { login, isAuthenticated, loading: authLoading } = useAuth();

  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false); // local loading for form submit
  const [error, setError] = useState(null);
  const userRef = useRef(null);

  // redirect to intended page after login (if provided in query ?next=/path)
  const params = new URLSearchParams(location.search);
  const nextPath = params.get("next") || "/admin/dashboard";

  // if already authenticated, redirect immediately
  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      navigate(nextPath, { replace: true });
    }
  }, [authLoading, isAuthenticated, navigate, nextPath]);

  // focus username input for faster UX
  useEffect(() => {
    userRef.current?.focus();
  }, []);

  // cleanup error on unmount
  useEffect(() => {
    return () => setError(null);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const username = credentials.username.trim();
    const password = credentials.password;

    if (!username || !password) {
      setError("Please enter both username and password.");
      setLoading(false);
      return;
    }

    try {
      await login(username, password);
      toast({ title: "Login Successful! 🎉", description: `Welcome back, ${username}.` });
      navigate(nextPath, { replace: true });
    } catch (err) {
      const msg = err?.message || "Invalid username or password.";
      setError(msg);
      toast({ title: "Login Failed", description: msg, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Admin Login - Great Baladis Limited</title>
        <meta
          name="description"
          content="Admin login portal for Great Baladis Limited website management."
        />
      </Helmet>

      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-md w-full bg-white rounded-xl shadow-2xl p-8"
          role="region"
          aria-labelledby="admin-login-heading"
        >
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
              <Lock className="w-8 h-8 text-red-600" />
            </div>
            <h1 id="admin-login-heading" className="text-3xl font-bold text-black mb-2">Admin Login</h1>
            <p className="text-gray-600">Access the admin dashboard</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4" aria-describedby="login-error">
            <div>
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                ref={userRef}
                value={credentials.username}
                onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                placeholder="Enter username"
                required
                className="mt-2"
                disabled={loading || authLoading}
                aria-required="true"
              />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                placeholder="Enter password"
                required
                className="mt-2"
                disabled={loading || authLoading}
                aria-required="true"
              />
            </div>

            {/* inline error message */}
            {error && (
              <div id="login-error" role="alert" className="text-sm text-red-700 bg-red-50 p-2 rounded">
                {error}
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white"
              disabled={loading || authLoading}
              aria-busy={loading || authLoading}
            >
              {loading || authLoading ? "Signing in..." : "Login"}
            </Button>
          </form>

          <p className="text-sm text-gray-500 text-center mt-6">
            Demo credentials: <strong>admin</strong> / <strong>admin123</strong>
          </p>
        </motion.div>
      </div>
    </>
  );
};

export default AdminLogin;
