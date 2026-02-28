"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useAuthStore } from "@/stores/authStore";

export default function NavBar() {
  const { isLoading, isAuthenticated } = useAuthStore();
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return "light";
    const savedTheme = localStorage.getItem("hireme-theme");
    if (savedTheme === "dark" || savedTheme === "light") return savedTheme;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("hireme-theme", theme);
  }, [theme]);

  function toggleTheme() {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
  }

  return (
    <nav className="border-b" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-4 py-4 md:px-6">
        <Link href="/" className="ui-title text-lg">
          HireMe
        </Link>
        <div className="flex items-center gap-3 text-sm">
          <button
            type="button"
            onClick={toggleTheme}
            className="ui-btn-ghost inline-flex items-center gap-2"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            {theme === "dark" ? "Light" : "Dark"}
          </button>
          {isLoading ? (
            <div className="ui-muted">Loading...</div>
          ) : isAuthenticated ? (
            <>
              <Link href="/dashboard" className="ui-muted font-medium">
                Dashboard
              </Link>
              <Link href="/requirements" className="ui-muted font-medium">
                Requirements
              </Link>
              <Link href="/chat" className="ui-muted font-medium">
                Chat
              </Link>
              <Link
                href="/requirements#post"
                className="ui-btn"
              >
                Post Requirement
              </Link>
              <button
                onClick={() => useAuthStore.getState().logout()}
                className="ui-muted font-medium"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/signup" className="ui-muted font-medium">
                Signup
              </Link>
              <Link href="/login" className="ui-muted font-medium">
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
