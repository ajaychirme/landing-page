import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, Sun, Moon, Sparkles, ArrowRight, Eye, EyeOff } from 'lucide-react';

// Mock navigation function
const navigateToStudio = () => {
  console.log('Navigating to /studio...');
  setTimeout(() => {
    alert('Successfully authenticated! This would navigate to /studio in a real app.');
  }, 1500);
};

// Floating particles component
const FloatingParticles = () => {
  const particles = Array.from({ length: 20 });
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-gradient-to-br from-indigo-400 to-cyan-400 rounded-full shadow-lg shadow-indigo-500/50"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          animate={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            scale: [1, 2, 1],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}
    </div>
  );
};

// Input field component
const AuthInput = ({ 
  icon: Icon, 
  label, 
  type = "text", 
  value, 
  onChange, 
  error,
  required = false 
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const inputType = type === "password" && showPassword ? "text" : type;

  return (
    <div className="relative">
      <motion.div
        className={`relative rounded-xl border-2 transition-all duration-300 ${
          isFocused
            ? 'border-transparent bg-gradient-to-r from-indigo-400 to-cyan-400 p-[2px]'
            : error
            ? 'border-red-400/50 bg-white/5 dark:bg-gray-800/30'
            : 'border-white/10 bg-white/5 dark:bg-gray-800/30'
        }`}
        animate={error ? { x: [0, -10, 10, -10, 10, 0] } : {}}
        transition={{ duration: 0.5 }}
      >
        <div className={isFocused ? 'bg-white dark:bg-gray-900 rounded-[10px]' : ''}>
          <div className="relative">
            <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-300" />
            <input
              type={inputType}
              value={value}
              onChange={onChange}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              required={required}
              className="w-full pl-12 pr-12 py-4 bg-transparent text-gray-900 dark:text-white placeholder-transparent focus:outline-none peer"
              placeholder={label}
            />
            <label
              className={`absolute left-12 transition-all duration-200 pointer-events-none ${
                value || isFocused
                  ? '-top-6 text-xs text-indigo-500 dark:text-cyan-300 font-medium'
                  : 'top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-300'
              }`}
            >
              {label}
            </label>
            {type === "password" && (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-300 hover:text-gray-600 dark:hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            )}
          </div>
        </div>
      </motion.div>
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-red-400 dark:text-red-300 text-sm mt-2 ml-1 font-medium"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

// Primary button with shimmer effect
const PrimaryButton = ({ children, onClick, loading = false, type = "button" }) => {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={loading}
      className="relative w-full py-4 rounded-xl font-semibold text-white overflow-hidden group"
      whileHover={{ scale: loading ? 1 : 1.02 }}
      whileTap={{ scale: loading ? 1 : 0.98 }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 bg-[length:200%_100%] animate-shimmer" />
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        animate={{
          x: ['-100%', '100%']
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      <span className="relative flex items-center justify-center gap-2">
        {loading ? (
          <>
            <motion.div
              className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            Authenticating...
          </>
        ) : (
          <>
            {children}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </>
        )}
      </span>
    </motion.button>
  );
};

// Secondary button
const SecondaryButton = ({ children, onClick, icon: Icon }) => {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      className="w-full py-4 rounded-xl font-medium text-gray-700 dark:text-gray-100 border-2 border-white/20 bg-white/5 dark:bg-gray-800/20 backdrop-blur-sm hover:bg-white/10 dark:hover:bg-gray-700/40 hover:border-white/30 transition-all"
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
    >
      <span className="flex items-center justify-center gap-2">
        {Icon && <Icon className="w-5 h-5" />}
        {children}
      </span>
    </motion.button>
  );
};

// Login Form
const LoginForm = ({ onSwitchToSignup, onGuestLogin, isDark }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Invalid email format';
    if (!password) newErrors.password = 'Password is required';
    else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setLoading(true);
    
    setTimeout(() => {
      navigateToStudio();
      setLoading(false);
    }, 1500);
  };

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
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Welcome Back 👋
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Sign in to continue to Image Studio
        </p>
      </div>

      <div className="space-y-6">
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
          >
            Forgot password?
          </button>
        </div>

        <PrimaryButton type="submit" loading={loading}>
          Sign In
        </PrimaryButton>

        <SecondaryButton onClick={onGuestLogin} icon={Sparkles}>
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
      </div>
    </motion.div>
  );
};

// Signup Form
const SignupForm = ({ onSwitchToLogin, onGuestLogin, isDark }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!name) newErrors.name = 'Name is required';
    if (!email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Invalid email format';
    if (!password) newErrors.password = 'Password is required';
    else if (password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setLoading(true);
    
    setTimeout(() => {
      navigateToStudio();
      setLoading(false);
    }, 1500);
  };

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
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Create Account 🚀
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Join Image Studio today
        </p>
      </div>

      <div className="space-y-6">
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

        <PrimaryButton type="submit" loading={loading}>
          Create Account
        </PrimaryButton>

        <SecondaryButton onClick={onGuestLogin} icon={Sparkles}>
          Continue as Guest
        </SecondaryButton>

        <div className="text-center">
          <span className="text-gray-600 dark:text-gray-300">Already have an account? </span>
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="text-indigo-500 dark:text-cyan-300 font-semibold hover:underline"
          >
            Sign In
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export {SignupForm, LoginForm, PrimaryButton, SecondaryButton, AuthInput, FloatingParticles, navigateToStudio}