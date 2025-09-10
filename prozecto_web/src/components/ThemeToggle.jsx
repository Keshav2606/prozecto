import { useEffect, useState } from "react";

const ThemeToggle = () => {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    const root = document.documentElement; // <html>
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme); // persist user preference
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <button
      onClick={toggleTheme}
      className="px-4 py-2 bg-background text-foreground border border-border rounded-lg hover:bg-accent transition-colors"
    >
      {theme === "light" ? "🌙" : "☀️"} {theme === "light" ? "Dark" : "Light"}
    </button>
  );
};

export default ThemeToggle;
