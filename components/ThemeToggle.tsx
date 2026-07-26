"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

/**
 * Light is the default and stays the default — the OS `prefers-color-scheme`
 * setting is deliberately NOT consulted, so a reader on system dark still gets
 * the light page unless they ask for dark here. The choice persists in
 * localStorage and is applied pre-paint by the inline script in the layout.
 */
export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = document.documentElement.dataset.theme;
    setTheme(stored === "dark" ? "dark" : "light");
    setReady(true);
  }, []);

  function toggle() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);

    if (next === "dark") {
      document.documentElement.dataset.theme = "dark";
    } else {
      delete document.documentElement.dataset.theme;
    }

    try {
      localStorage.setItem("theme", next);
    } catch {
      /* private mode — the toggle still works for this page view */
    }
  }

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggle}
      aria-pressed={ready ? theme === "dark" : undefined}
      title="Switch between light and dark"
    >
      {theme === "dark" ? "light" : "dark"}
    </button>
  );
}

/**
 * Runs before first paint so a stored dark choice doesn't flash light.
 * Absence of a stored value means light — no OS sniffing.
 */
export const themeScript = `
try {
  if (localStorage.getItem('theme') === 'dark') {
    document.documentElement.dataset.theme = 'dark';
  }
} catch (e) {}
`.trim();
