import { useTheme } from "../../hooks/useTheme";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      title={theme === "dark" ? "Light mode" : "Dark mode"}
      className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-800 shadow-sm hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
    >
      {theme === "dark" ? (
        // Sun icon (light)
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="shrink-0">
          <path d="M12 4V2M12 22v-2M4 12H2M22 12h-2M5 5l-1.4-1.4M20.4 20.4L19 19M5 19l-1.4 1.4M20.4 3.6L19 5"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2"/>
        </svg>
      ) : (
        // Moon icon (dark)
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="shrink-0">
          <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"
                stroke="currentColor" strokeWidth="2" fill="none"/>
        </svg>
      )}
      <span className="text-sm">{theme === "dark" ? "Light" : "Dark"}</span>
    </button>
  );
}
