// SignupForm.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import AuthInput from "./AuthInput";
import PrimaryButton from "./PrimaryButton";
import SecondaryButton from "./SecondaryButton";
import Toast from "./Toast";
import { User, Mail, Lock, Sparkles } from "lucide-react"; // adjust icon source if different

const API_URL = "http://localhost:4000/auth/signup";

export default function SignupForm({ onSwitchToLogin, onGuestLogin }) {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // toast: { message: string, type: 'success' | 'danger' }
  const [toast, setToast] = useState(null);

  const validateForm = () => {
    const newErrors = {};
    if (!name) newErrors.name = "Name is required";
    if (!email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Invalid email format";
    if (!password) newErrors.password = "Password is required";
    else if (password.length < 8) newErrors.password = "Password must be at least 8 characters";
    return newErrors;
  };

  // Simple navigation helper. Replace with react-router useNavigate if you want.
  const navigateToStudio = () => {
    navigate("/studio")
 };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setLoading(true);
    setToast(null);

    try {
        console.log("Inside try")
      const resp = await axios.post(
        API_URL,
        { name, email, password },
        { timeout: 10000 }
      );

      // Expect 201: { token, user: { id, email, name } }
      if ((resp.status === 201 || resp.status === 200) && resp.data?.token) {
        const { token, user } = resp.data;

        try {
          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(user));
        } catch (err) {
          // ignore localStorage errors
        }

        setToast({ message: "Account created. Signing you in…", type: "success" });

        // show toast briefly then navigate
        setTimeout(() => {
          navigateToStudio();
        }, 700);
        return;
      }

      // Unexpected successful response without token
      setToast({ message: "Unexpected server response", type: "danger" });
    } catch (err) {
      // axios error handling
      if (err.response) {
        const status = err.response.status;
        const data = err.response.data || {};

        if (status === 400) {
          // Expected backend shape:
          // { error: { code: 'VALIDATION_ERROR', message: 'Invalid input', details: [...] } }
          // or { error: { code: 'USER_EXISTS', message: 'User already exists' } }
          const errCode = data?.error?.code;
          const errMsg = data?.error?.message || "Invalid input";
          const details = data?.error?.details || data?.error?.errors || null;

          if (errCode === "USER_EXISTS") {
            setToast({ message: errMsg || "User already exists", type: "danger" });
            setErrors({ email: "User already exists with this email" });
          } else if (Array.isArray(details) && details.length > 0) {
            // parse validation details (zod-like)
            const fieldErrors = {};
            details.forEach((d) => {
              let field = null;
              if (Array.isArray(d.path) && d.path.length > 0) field = d.path[0];
              else if (typeof d.path === "string") field = d.path;
              else if (d?.field) field = d.field;

              const message = d.message || d.msg || JSON.stringify(d);
              if (field) fieldErrors[field] = message;
            });

            setErrors((prev) => ({ ...prev, ...fieldErrors }));
            const firstMsg = details[0]?.message || details[0]?.msg || errMsg;
            setToast({ message: firstMsg, type: "danger" });
          } else {
            setToast({ message: errMsg, type: "danger" });
          }
        } else {
          const message = data?.error?.message || `Server error (${status})`;
          setToast({ message, type: "danger" });
        }
      } else if (err.request) {
        setToast({ message: "No response from server. Please try again later.", type: "danger" });
      } else {
        setToast({ message: `Request failed: ${err.message}`, type: "danger" });
      }
    } finally {
      setLoading(false);
    }
  };

  const isFormValid =
  name.trim().length > 0 &&
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
          <Sparkles className="w-12 h-12 text-indigo-400 dark:text-white" />
        </motion.div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Create Account 🚀
        </h1>
        <p className="text-gray-600 dark:text-white">Join Image Studio today</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
        <AuthInput
          icon={User}
          label="Full Name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={errors.name}
          required
        />

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

        <PrimaryButton type="submit" loading={loading} disabled={!isFormValid || loading}>
          {loading ? "Creating…" : "Create Account"}
        </PrimaryButton>

        <SecondaryButton onClick={onGuestLogin} icon={Sparkles} disabled={loading}>
          <span className="dark:text-white">Continue as Guest</span>
        </SecondaryButton>

        <div className="text-center">
          <span className="text-gray-600 dark:text-white">Already have an account?{" "}</span>
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="text-indigo-500 dark:text-white font-semibold hover:underline"
            disabled={loading}
          >
            Sign In
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
}
