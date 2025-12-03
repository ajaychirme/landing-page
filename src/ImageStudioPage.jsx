// ImageStudioPage.jsx
import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "./context/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import Modal from "./Modal";
import Toast from "./Toast";
import {
  Sparkles,
  Upload,
  Image as ImageIcon,
  Wand2,
  History,
  LogOut,
  X,
  Clock,
  Sun,
  Moon,
} from "lucide-react";

const API_BASE = "http://localhost:4000";
const GET_HISTORY_URL = `${API_BASE}/generations`;
const POST_GENERATE_URL = `${API_BASE}/generations`;

// normalize URL
const toAbsoluteUrl = (path) => {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  return `${API_BASE}${path}`;
};

const ALLOWED_STYLES = ["cartoon", "3d-render", "oil-painting", "editorial"];

const ImageStudioPage = ({ onLogout, onNavigateToHistory }) => {
  const [uploadedFile, setUploadedFile] = useState(null); // actual File to send
  const [uploadedImage, setUploadedImage] = useState(null); // preview URL
  const [isResizing, setIsResizing] = useState(false);
  const [resizeProgress, setResizeProgress] = useState(0);
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState(ALLOWED_STYLES[0]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [history, setHistory] = useState([]);
  const [toast, setToast] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useTheme();

  const styles = ALLOWED_STYLES.map((s) => ({ value: s, label: s }));

  // logout helper
  const handleLogout = () => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    } catch (e) {}
    if (typeof onLogout === "function") onLogout();
    navigate("/studio-login");
  };

  // resizeImage returns { file: File, url: previewUrl }
  const resizeImage = useCallback((file) => {
    return new Promise((resolve, reject) => {
      if (!file) return reject(new Error("No file"));
      setIsResizing(true);
      setResizeProgress(0);

      const reader = new FileReader();
      reader.onerror = () => {
        setIsResizing(false);
        reject(new Error("Failed to read file"));
      };
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          try {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");

            let width = img.width;
            let height = img.height;
            if (width > 1920) {
              height = Math.round((height * 1920) / width);
              width = 1920;
            }

            canvas.width = width;
            canvas.height = height;

            let progress = 0;
            const interval = setInterval(() => {
              progress += 10;
              setResizeProgress(Math.min(progress, 100));
              if (progress >= 100) clearInterval(interval);
            }, 50);

            setTimeout(() => {
              ctx.drawImage(img, 0, 0, width, height);
              canvas.toBlob(
                (blob) => {
                  if (!blob) {
                    setIsResizing(false);
                    return reject(new Error("Canvas toBlob failed"));
                  }
                  const resizedFile = new File([blob], file.name, { type: file.type || "image/png" });
                  const previewUrl = URL.createObjectURL(resizedFile);
                  setIsResizing(false);
                  setResizeProgress(0);
                  resolve({ file: resizedFile, url: previewUrl });
                },
                file.type || "image/png",
                0.92
              );
            }, 600);
          } catch (err) {
            setIsResizing(false);
            reject(err);
          }
        };
        img.onerror = () => {
          setIsResizing(false);
          reject(new Error("Image load error"));
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    });
  }, []);

  const handleFileUpload = useCallback(
    async (file) => {
      if (!file) return;
      if (!file.type?.startsWith("image/")) {
        setToast({ message: "Please upload an image file", type: "danger" });
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        setToast({ message: "File size must be less than 10MB", type: "danger" });
        return;
      }

      try {
        const { file: resizedFile, url } = await resizeImage(file);

        // revoke previous preview
        if (uploadedImage) URL.revokeObjectURL(uploadedImage);

        setUploadedFile(resizedFile);
        setUploadedImage(url);
        setToast({ message: "Image uploaded & resized", type: "success" });
      } catch (err) {
        console.error("Resize/upload failed", err);
        setToast({ message: "Failed to process image", type: "danger" });
        setIsResizing(false);
      }
    },
    [resizeImage, uploadedImage]
  );

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files && e.dataTransfer.files[0];
      handleFileUpload(file);
    },
    [handleFileUpload]
  );

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  // load history on mount (normalize url)
  useEffect(() => {
    let mounted = true;
    const token = localStorage.getItem("token");

    const loadHistory = async () => {
      if (!token) {
        setHistory([]);
        return;
      }
      try {
        const resp = await axios.get(`${GET_HISTORY_URL}?limit=5`, {
          headers: { Authorization: `Bearer ${token}` },
          timeout: 10000,
        });
        if (!mounted) return;
        if (Array.isArray(resp.data)) {
          const mapped = resp.data.map((r) => ({
            id: r.id,
            url: toAbsoluteUrl(r.imageUrl || r.image_url || r.result_image_path || r.input_image_path),
            prompt: r.prompt || "",
            style: r.style || "",
            timestamp: r.createdAt || r.created_at || "",
            status: r.status || "",
          }));
          setHistory(mapped);
        } else {
          setHistory([]);
        }
      } catch (err) {
        if (!mounted) return;
        if (err.response) {
          const status = err.response.status;
          if (status === 401) {
            setToast({ message: "Session expired. Please login again", type: "danger" });
            handleLogout();
          } else {
            setToast({ message: err.response.data?.error?.message || `Failed to load history (${status})`, type: "danger" });
          }
        } else {
          setToast({ message: "Failed to load history. Check network.", type: "danger" });
        }
      }
    };

    loadHistory();
    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const canGenerate = !!uploadedFile && !isResizing && !isGenerating;

  const handleGenerate = useCallback(async () => {
    if (!uploadedFile) {
      setToast({ message: "Please upload an image first", type: "danger" });
      return;
    }

    setToast(null);
    setIsGenerating(true);

    const token = localStorage.getItem("token") || "";

    const form = new FormData();
    form.append("prompt", prompt || "");
    form.append("style", style || "");
    form.append("image", uploadedFile, uploadedFile.name); // important: "image"

    try {
      const resp = await axios.post(POST_GENERATE_URL, form, {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
        timeout: 20000,
      });

      if (resp.status === 201 || resp.status === 200) {
        const data = resp.data;
        const rec = {
          id: data.id,
          url: toAbsoluteUrl(data.imageUrl || data.image_url || data.result_image_path),
          prompt: data.prompt || "",
          style: data.style || style,
          timestamp: data.createdAt || new Date().toLocaleString(),
          status: data.status || "completed",
        };

        setHistory((prev) => [rec, ...prev].slice(0, 5));
        setGeneratedImage(rec);
        setToast({ message: "Image generated successfully!", type: "success" });
        setRetryCount(0);
      } else {
        setToast({ message: "Unexpected server response", type: "danger" });
      }
    } catch (err) {
      if (err.response) {
        const status = err.response.status;
        const data = err.response.data || {};

        if (status === 400) {
          setToast({ message: data?.error?.message || "Invalid input", type: "danger" });
        } else if (status === 401) {
          setToast({ message: "Unauthorized. Please login again.", type: "danger" });
          handleLogout();
        } else if (status === 503) {
          // show retry modal
          setShowModal(true);
          setToast({ message: "Model overloaded. You can retry.", type: "danger" });
        } else {
          setToast({ message: data?.error?.message || `Server error (${status})`, type: "danger" });
        }
      } else if (err.request) {
        setToast({ message: "No response from server. Check your network.", type: "danger" });
      } else {
        setToast({ message: `Request error: ${err.message}`, type: "danger" });
      }
    } finally {
      setIsGenerating(false);
    }
  }, [uploadedFile, prompt, style, isResizing]);

  // Called from modal retry button
  const handleRetry = () => {
    setRetryCount((p) => p + 1);
    setShowModal(false);
    setTimeout(() => handleGenerate(), 250);
  };

  const handleAbort = () => {
    setIsGenerating(false);
    setToast({ message: "Generation cancelled", type: "danger" });
  };

  const handleSaveToHistory = () => {
    if (generatedImage) setToast({ message: "Saved to history!", type: "success" });
  };

  const handleHistoryClick = (item) => {
    setGeneratedImage(item);
    setPrompt(item.prompt || "");
    setStyle(item.style || ALLOWED_STYLES[0]);
  };

  const handleBrowseClick = () => fileInputRef.current?.click();

  // cleanup preview URL
  useEffect(() => {
    return () => {
      if (uploadedImage) URL.revokeObjectURL(uploadedImage);
    };
  }, [uploadedImage]);

  const goToHistory = () => navigate("/history");

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <motion.div className="flex items-center gap-2" whileHover={{ scale: 1.05 }}>
              <Sparkles className="w-6 h-6 text-indigo-500 dark:text-cyan-400" />
              <span className="text-xl font-bold text-gray-900 dark:text-white">Image Studio</span>
            </motion.div>

            <div className="flex items-center gap-3">
              <motion.button onClick={goToHistory} className="px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors flex items-center gap-2" whileHover={{ scale: 1.05 }}>
                <History className="w-5 h-5" />
                <span className="hidden sm:inline">History</span>
              </motion.button>

              <motion.button onClick={toggleTheme} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors" whileHover={{ scale: 1.1, rotate: 180 }}>
                {isDark ? <Sun className="w-5 h-5 text-yellow-300" /> : <Moon className="w-5 h-5 text-gray-700" />}
              </motion.button>

              <motion.button onClick={handleLogout} className="px-4 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors flex items-center gap-2" whileHover={{ scale: 1.05 }}>
                <LogOut className="w-5 h-5" />
                <span className="hidden sm:inline">Logout</span>
              </motion.button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left - Upload */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Upload className="w-5 h-5" />
                Upload Image
              </h2>

              <div onDrop={handleDrop} onDragOver={handleDragOver} onDragLeave={handleDragLeave} onClick={handleBrowseClick} className={`relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${isDragging ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20" : "border-gray-300 dark:border-gray-600 hover:border-indigo-400 dark:hover:border-cyan-400"}`}>
                <input ref={fileInputRef} type="file" accept="image/jpeg,image/png" onChange={(e) => handleFileUpload(e.target.files && e.target.files[0])} className="hidden" />

                {uploadedImage ? (
                  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="relative">
                    <img src={uploadedImage} alt="Uploaded" className="max-h-64 mx-auto rounded-lg shadow-lg" />
                    <motion.button onClick={(e) => { e.stopPropagation(); if (uploadedImage) URL.revokeObjectURL(uploadedImage); setUploadedImage(null); setUploadedFile(null); }} className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600" whileHover={{ scale: 1.1 }}>
                      <X className="w-4 h-4" />
                    </motion.button>
                  </motion.div>
                ) : (
                  <div>
                    <ImageIcon className="w-16 h-16 mx-auto text-gray-400 dark:text-gray-500 mb-4" />
                    <p className="text-gray-600 dark:text-gray-300 font-medium mb-2">Drop your image here or click to browse</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">JPEG or PNG, max 10MB</p>
                  </div>
                )}
              </div>

              {isResizing && (
                <div className="mt-4">
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300 mb-2">
                    <span>Resizing image...</span>
                    <span>{resizeProgress}%</span>
                  </div>
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <motion.div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500" initial={{ width: 0 }} animate={{ width: `${resizeProgress}%` }} transition={{ duration: 0.3 }} />
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Right - Controls */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Wand2 className="w-5 h-5" />
                Generate
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Prompt</label>
                  <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="Enter your creative prompt (optional)..." className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-cyan-400 focus:border-transparent resize-none" rows={3} />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Style</label>
                  <select value={style} onChange={(e) => setStyle(e.target.value)} className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-cyan-400 focus:border-transparent">
                    {styles.map((s) => (
                      <option key={s.value} value={s.value}>
                        {s.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex gap-3">
                  {!isGenerating ? (
                    <motion.button onClick={handleGenerate} disabled={!canGenerate} className={`flex-1 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-shadow ${canGenerate ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:shadow-lg" : "bg-gray-300 text-gray-600 cursor-not-allowed dark:bg-gray-700/60"}`} whileHover={canGenerate ? { scale: 1.02 } : {}}>
                      <Wand2 className="w-5 h-5" />
                      Generate Image
                    </motion.button>
                  ) : (
                    <>
                      <div className="flex-1 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl font-semibold flex items-center justify-center gap-2">
                        <motion.div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full" animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} />
                        Generating...
                      </div>
                      <motion.button onClick={handleAbort} className="px-6 py-3 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600 transition-colors" whileHover={{ scale: 1.05 }}>
                        Abort
                      </motion.button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* History Preview Bar */}
        {history.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-8 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Recent Generations</h3>
            <div className="flex gap-4 overflow-x-auto pb-2">
              {history.map((item, idx) => (
                <motion.div key={item.id || idx} onClick={() => handleHistoryClick(item)} className="flex-shrink-0 cursor-pointer" whileHover={{ scale: 1.1, y: -5 }}>
                  <img src={toAbsoluteUrl(item.url)} alt="" className="w-24 h-24 object-cover rounded-lg shadow-lg border-2 border-gray-200 dark:border-gray-600" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Modal */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} onRetry={handleRetry} retryCount={retryCount} />

      {/* Toast */}
      <AnimatePresence>
        {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      </AnimatePresence>
    </div>
  );
};

export default ImageStudioPage;
