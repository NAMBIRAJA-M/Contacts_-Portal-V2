import { useEffect, useState } from "react";

type Theme = "light" | "dark";

export function useTheme() {
  // Initialize from saved preference if present; otherwise default to light
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem("theme") as Theme | null;
    return saved ?? "light";
  });

  useEffect(() => {
    document.documentElement.classList.toggle("theme-dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const next = prevTheme === "dark" ? "light" : "dark";
      document.documentElement.classList.toggle("theme-dark", next === "dark");
      try {
        localStorage.setItem("theme", next);
      } catch {}
      return next as Theme;
    });
  };

  return { theme, toggleTheme };
}