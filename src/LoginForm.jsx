// LoginForm.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import AuthInput from "./AuthInput"
import PrimaryButton from "./PrimaryButton";
import SecondaryButton from "./SecondaryButton";
import Toast from "./Toast";
import { Mail, Lock, Sparkles } from "lucide-react"; // or your icon source

const API_URL = "http://localhost:4000/auth/login";

const LoginForm = ({ onSwitchToSignup, onGuestLogin, isDark, setIsDark }) => {
const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // toast: { message: string, type: 'success' | 'danger' }
  const [toast, setToast] = useState(null);

  const validateForm = () => {
    const newErrors = {};
    if (!email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Invalid email format";
    if (!password) newErrors.password = "Password is required";
    else if (password.length < 8) newErrors.password = "Password must be at least 8 characters";
    return newErrors;
  };

  // Simple navigation helper. Replace with react-router useNavigate if you want.
  const navigateToStudio = () => {
    // If you use react-router, replace this with navigate('/studio') or similar.
    navigate("/studio");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setLoading(true);
    setToast(null);

    try {
      const resp = await axios.post(API_URL, { email, password }, { timeout: 10000 });

      // Expecting success: { token, user: { id, email, name } }
      if (resp.status === 200 && resp.data && resp.data.token) {
        const { token, user } = resp.data;

        // Save token + user info locally (you can change storage or handling as needed)
        try {
          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(user));
        } catch (err) {
          // localStorage might fail in some environments; ignore.
        }

        setToast({ message: "Signed in successfully", type: "success" });

        // small delay to show toast briefly, then navigate
        setTimeout(() => {
          navigateToStudio();
        }, 700);
        return;
      }

      // If we get here but no token, treat as unexpected
      setToast({ message: "Unexpected server response", type: "danger" });
    } catch (err) {
      // axios error handling
      if (err.response) {
        // Server responded with a status outside 2xx
        const status = err.response.status;
        const data = err.response.data || {};

        if (status === 400) {
          // Expected format based on your backend:
          // { error: { code: 'VALIDATION_ERROR', message: 'Invalid input', details: [ ... ] } }
          const details = data?.error?.details || data?.error?.errors || null;

          // If Zod-like errors: an array of { path, message } or { message }
          if (Array.isArray(details) && details.length > 0) {
            // Build field-specific errors and a single toast for first error
            const fieldErrors = {};
            details.forEach((d) => {
              // d.path might be like ['email'] or 'email'
              let field = null;
              if (Array.isArray(d.path) && d.path.length > 0) field = d.path[0];
              else if (typeof d.path === "string") field = d.path;
              else if (d?.field) field = d.field;

              const message = d.message || d.msg || JSON.stringify(d);
              if (field) fieldErrors[field] = message;
            });

            setErrors((prev) => ({ ...prev, ...fieldErrors }));
            // Show toast for first error
            const firstMsg =
              details[0]?.message || details[0]?.msg || "Validation failed";
            setToast({ message: firstMsg, type: "danger" });
          } else if (data?.error?.message) {
            setToast({ message: data.error.message, type: "danger" });
          } else {
            setToast({ message: "Invalid input", type: "danger" });
          }
        } else if (status === 401) {
          setToast({ message: data?.error?.message || "Invalid email or password", type: "danger" });
        } else {
          // other server errors
          const message = data?.error?.message || `Server error (${status})`;
          setToast({ message, type: "danger" });
        }
      } else if (err.request) {
        // Request made but no response
        setToast({ message: "No response from server. Please try again later.", type: "danger" });
      } else {
        // Something else happened
        setToast({ message: `Request failed: ${err.message}`, type: "danger" });
      }
    } finally {
      setLoading(false);
    }
  };

  const isFormValid =
  /\S+@\S+\.\S+/.test(email) &&
  password.length >= 8;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="w-full"
    >
      <div className="text-center mb-8">
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="inline-block mb-4"
        >
          <Sparkles className="w-12 h-12 text-indigo-400 dark:text-cyan-400" />
        </motion.div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Welcome Back 👋</h1>
        <p className="text-gray-600 dark:text-gray-300">Sign in to continue to Image Studio</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
        <AuthInput
          icon={Mail}
          label="Email Address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
          required
        />

        <AuthInput
          icon={Lock}
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
          required
        />

        <div className="flex justify-end">
          <button
            type="button"
            className="text-sm text-indigo-500 dark:text-cyan-300 hover:underline font-medium"
            // TODO: wire forgot password flow
          >
            Forgot password?
          </button>
        </div>

        <PrimaryButton type="submit" loading={loading} disabled={!isFormValid || loading}>
          {loading ? "Signing in..." : "Sign In"}
        </PrimaryButton>

        <SecondaryButton onClick={onGuestLogin} icon={Sparkles} disabled={loading}>
          Continue as Guest
        </SecondaryButton>

        <div className="text-center">
          <span className="text-gray-600 dark:text-gray-300">Don't have an account? </span>
          <button
            type="button"
            onClick={onSwitchToSignup}
            className="text-indigo-500 dark:text-cyan-300 font-semibold hover:underline"
          >
            Sign Up
          </button>
        </div>
      </form>

      {/* Toast area */}
      <AnimatePresence>
        {toast && (
          <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default LoginForm;
