// History1.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "./context/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import {
  History,
  ChevronLeft,
  Sun,
  Moon,
  LogOut,
  Clock,
  RefreshCw,
} from "lucide-react";
import Toast from "./Toast";

const API_BASE = "http://localhost:4000";
const GET_HISTORY_URL = `${API_BASE}/generations`;

export default function History1({ onLogout, goToStudio, history = [] }) {
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useTheme();

  const [items, setItems] = useState(Array.isArray(history) ? history : []);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  function goToImageStudio() {
    navigate("/studio");
  }

  const handleUnauthorized = (message) => {
    setToast({ message: message || "Session expired. Please login again.", type: "danger" });
    try {
      onLogout?.();
    } catch (_) {}
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/studio-login");
  };

  // Convert backend relative URL -> absolute URL
  const toAbsoluteUrl = (path) => {
    if (!path) return "";
    if (path.startsWith("http")) return path;
    return `${API_BASE}${path}`;
  };

  const fetchHistory = async (opts = { limit: 5 }) => {
    const token = localStorage.getItem("token") || "";
    setLoading(true);
    setToast(null);

    try {
      const resp = await axios.get(`${GET_HISTORY_URL}?limit=${opts.limit}`, {
        headers: { Authorization: token ? `Bearer ${token}` : "" },
        timeout: 10000,
      });

      if (Array.isArray(resp.data)) {
        const mapped = resp.data.map((r) => ({
          id: r.id,
          url: toAbsoluteUrl(r.imageUrl || r.image_url || r.result_image_path || r.input_image_path),
          prompt: r.prompt || "",
          style: r.style || "",
          timestamp: r.createdAt || r.created_at || "",
          status: r.status || "",
        }));
        setItems(mapped);
      } else {
        setToast({ message: "Unexpected response format from server", type: "danger" });
      }
    } catch (err) {
      if (err.response) {
        const status = err.response.status;
        const data = err.response.data || {};

        if (status === 400) {
          setToast({ message: data?.error?.message || "Invalid request", type: "danger" });
        } else if (status === 401) {
          handleUnauthorized(data?.error?.message || "Unauthorized");
          return;
        } else {
          setToast({
            message: data?.error?.message || `Server error (${status})`,
            type: "danger",
          });
        }
      } else if (err.request) {
        setToast({
          message: "No response from server. Check your network.",
          type: "danger",
        });
      } else {
        setToast({ message: `Request failed: ${err.message}`, type: "danger" });
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchHistory({ limit: 5 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchHistory({ limit: 5 });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <motion.button
                onClick={goToImageStudio}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronLeft className="w-6 h-6 text-gray-700 dark:text-gray-200" />
              </motion.button>

              <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-2">
                <History className="w-6 h-6 text-indigo-500 dark:text-cyan-400" />
                <span className="text-xl font-bold text-gray-900 dark:text-white">History</span>
              </motion.div>
            </div>

            <div className="flex items-center gap-3">
              <motion.button
                onClick={handleRefresh}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                title="Refresh"
              >
                <RefreshCw className={`w-5 h-5 ${refreshing ? "animate-spin" : ""}`} />
              </motion.button>

              <motion.button
                onClick={toggleTheme}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                whileHover={{ scale: 1.1, rotate: 180 }}
                whileTap={{ scale: 0.9 }}
              >
                {isDark ? <Sun className="w-5 h-5 text-yellow-300" /> : <Moon className="w-5 h-5 text-gray-700" />}
              </motion.button>

              <motion.button
                onClick={() => {
                  onLogout?.();
                  localStorage.removeItem("token");
                  localStorage.removeItem("user");
                  navigate("/studio-login");
                }}
                className="px-4 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <LogOut className="w-5 h-5" />
                <span className="hidden sm:inline">Logout</span>
              </motion.button>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block p-8 bg-white dark:bg-gray-800 rounded-3xl shadow-xl">
              <RefreshCw className="w-12 h-12 text-gray-400 dark:text-gray-500 animate-spin mx-auto mb-4" />
              <h2 className="text-2xl font-bold dark:text-white">Loading history…</h2>
              <p className="text-gray-600 dark:text-gray-400">Fetching your recent generations</p>
            </div>
          </div>
        ) : items?.length === 0 ? (
          <motion.div className="text-center py-20" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="inline-block p-8 bg-white dark:bg-gray-800 rounded-3xl shadow-xl">
              <History className="w-20 h-20 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">No History Yet</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">Start generating images to see them here</p>
              <motion.button
                onClick={goToImageStudio}
                className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl font-semibold"
                whileHover={{ scale: 1.05 }}
              >
                Go to Studio
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item, idx) => (
              <motion.div
                key={item.id || idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.06 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border overflow-hidden"
              >
                <div className="relative overflow-hidden">
                  <motion.img src={item.url} alt="Generated" className="w-full h-64 object-cover" whileHover={{ scale: 1.1 }} />
                </div>

                <div className="p-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">{item.prompt}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 gap-2">
                      <Clock className="w-3 h-3" />
                      {item.timestamp}
                    </div>

                    <span className="px-2 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full text-xs">
                      {item.style}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Toast */}
      <AnimatePresence>
        {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      </AnimatePresence>
    </div>
  );
}
