import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("theme-dark");
    if (saved !== null) return JSON.parse(saved);

    // If not saved, follow system preference
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  const toggleTheme = () => setIsDark((prev) => !prev);

  useEffect(() => {
    localStorage.setItem("theme-dark", JSON.stringify(isDark));

    if (isDark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [isDark]);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook for ease
export const useTheme = () => useContext(ThemeContext);
