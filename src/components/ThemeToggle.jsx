import React, { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

  useEffect(() => {
    document.body.className = theme; 
    localStorage.setItem("theme", theme); 
  }, [theme]);

  const toggleTheme = () =>
    setTheme(theme === "dark" ? "light" : "dark");

  return (
    <button
      onClick={toggleTheme}
      style={{
        padding: "5px 5px",
        borderRadius: "8px",
        background: theme === "light" ? "#212529" : "#e2e2b6",
        color: theme === "dark" ? "#e2e2b6" : "#212529",
        border: "none",
        cursor: "pointer",
        transition: "0.3s",
        position: "sticky"
      }}
    >
      {theme === "light" ? "🌙" : "☀️ "}
    </button>
  );
}
