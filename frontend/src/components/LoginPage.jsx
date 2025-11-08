import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebaseConfig";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

  const saveAdminData = (data, token) => {
    localStorage.setItem("token", token);
    localStorage.setItem("admin", JSON.stringify(data));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${BACKEND_URL}/api/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: username.trim(), password: password.trim() }),
      });

      const data = await res.json();

      if (res.ok) {
        saveAdminData({ username }, data.token);
        navigate("/admin/dashboard");
      } else {
        setError(data.message || "Login failed ❌");
      }
    } catch (err) {
      console.error(err);
      setError("Login request failed ❌");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError("");

    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const firebaseToken = await user.getIdToken();

      const res = await fetch(`${BACKEND_URL}/api/admin/google-login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: firebaseToken }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        saveAdminData(
          {
            username: data.admin.username,
            name: data.admin.name,
            photoURL: user.photoURL,
          },
          data.token
        );
        navigate("/admin/dashboard");
      } else {
        setError(data.message || "Google login failed ❌");
      }
    } catch (err) {
      console.error("Google login error:", err);
      setError("Google login failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-green-50 px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8"
      >
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-6">Admin Login</h2>
        <p className="text-gray-600 text-center mb-8">
          Login to access the <span className="text-emerald-600 font-semibold">Admin Dashboard</span>
        </p>

        <form onSubmit={handleLogin} className="space-y-6">
          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin@example.com"
                required
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400 focus:outline-none"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-emerald-700 transition-colors duration-200 disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-8">
          <div className="flex-grow h-px bg-gray-200"></div>
          <span className="px-3 text-gray-500 text-sm">OR</span>
          <div className="flex-grow h-px bg-gray-200"></div>
        </div>

        {/* Google Login */}
        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full flex items-center justify-center border border-gray-300 rounded-lg py-3 text-gray-700 font-medium hover:bg-gray-50 transition"
        >
          <svg className="h-6 w-6 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
            <path fill="#EA4335" d="M24 9.5c3.54 0 6.68 1.22 9.18 3.6l6.84-6.84C35.9 2.42 30.47 0 24 0 14.64 0 6.4 5.56 2.48 13.68l7.98 6.2C12.54 13.26 17.9 9.5 24 9.5z"/>
            <path fill="#4285F4" d="M46.5 24.5c0-1.62-.15-3.18-.42-4.68H24v9.04h12.68c-.55 2.96-2.2 5.46-4.7 7.16l7.34 5.7c4.28-3.96 7.18-9.8 7.18-17.22z"/>
            <path fill="#FBBC05" d="M10.46 28.88c-.5-1.46-.78-3.02-.78-4.63s.28-3.17.78-4.63l-7.98-6.2C1.04 16.9 0 20.33 0 24s1.04 7.1 2.48 10.58l7.98-6.2z"/>
            <path fill="#34A853" d="M24 48c6.47 0 11.9-2.13 15.87-5.8l-7.34-5.7c-2.03 1.38-4.65 2.2-8.53 2.2-6.1 0-11.46-3.76-13.54-9.1l-7.98 6.2C6.4 42.44 14.64 48 24 48z"/>
          </svg>
          Continue with Google
        </button>

        <p className="text-center text-gray-600 mt-6">
          Forgot your password?{" "}
          <a href="/admin/forgot-password" className="text-emerald-600 font-semibold hover:underline">
            Reset Password
          </a>
        </p>
      </motion.div>
    </div>
  );
};

export default LoginPage;
