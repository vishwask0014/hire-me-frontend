"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown, Menu, Moon, Sun, User, X } from "lucide-react";
import { useAuthStore } from "@/stores/authStore";

export default function NavBar() {
  const pathname = usePathname();
  const { isLoading, isAuthenticated, user } = useAuthStore();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return "light";
    const savedTheme = localStorage.getItem("hireme-theme");
    if (savedTheme === "dark" || savedTheme === "light") return savedTheme;
    return "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("hireme-theme", theme);
  }, [theme]);

  useEffect(() => {
    function onDocClick(event) {
      if (!profileRef.current) return;
      if (!profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    }

    function onEscape(event) {
      if (event.key === "Escape") setProfileOpen(false);
    }

    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onEscape);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onEscape);
    };
  }, []);

  function toggleTheme() {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
  }

  function closeMobileMenu() {
    setMobileOpen(false);
  }

  function toggleProfileMenu() {
    setProfileOpen((prev) => !prev);
  }

  function navLinkClass(isActive) {
    return isActive
      ? "ui-nav-link-active rounded-lg px-3 py-2 font-semibold"
      : "ui-nav-link rounded-lg px-3 py-2 font-medium";
  }

  const isDashboardActive = pathname === "/dashboard";
  const isRequirementsActive = pathname === "/requirements" || pathname.startsWith("/requirements/");
  const isChatActive = pathname === "/chat";
  const isProfileActive = pathname === "/profile";
  const isPortfolioActive = pathname === "/portfolio";
  const isSignupActive = pathname === "/signup";
  const isLoginActive = pathname === "/login";

  const initials = useMemo(() => {
    const text = (user?.name || user?.email || "U").trim();
    const parts = text.split(/\s+/).filter(Boolean);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  }, [user?.name, user?.email]);

  const authLinks = isAuthenticated
    ? [
      // { href: "/dashboard", label: "Dashboard", active: isDashboardActive },
      // { href: "/requirements", label: "Requirements", active: isRequirementsActive },
      { href: "/chat", label: "Chat", active: isChatActive },
      // ...(user?.userType === "freelancer"
      //   ? [{ href: "/portfolio", label: "Portfolio", active: isPortfolioActive }]
      //   : []),
      // { href: "/profile", label: "Profile", active: isProfileActive },
    ]
    : [
      { href: "/signup", label: "Signup", active: isSignupActive },
      { href: "/login", label: "Login", active: isLoginActive },
    ];

  return (
    <nav className="sticky top-0 z-50 border-b backdrop-blur-sm" style={{ borderColor: "color-mix(in srgb, var(--border) 20%, transparent)", background: "color-mix(in srgb, var(--background) 92%, transparent)" }}>
      <div className="mx-auto flex w-full max-w-[1240px] items-center justify-between px-4 py-4 md:px-6">
        <Link href="/" className="text-2xl font-semibold tracking-tight">
          HireMe
        </Link>
        <div className="hidden items-center gap-2 text-xs md:flex md:gap-3 md:text-sm">
          {authLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={navLinkClass(item.active)}
              aria-current={item.active ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}

          {isAuthenticated ? (
            <Link href="/dashboard" className="ui-btn !rounded-xl !px-3 !py-2 !text-xs md:!px-4 md:!text-sm">
              Dashboard
            </Link>
          ) : null}

          {isAuthenticated ? (
            <Link href="/requirements#post" className="ui-btn !rounded-xl !px-3 !py-2 !text-xs md:!px-4 md:!text-sm">
              Post Requirement
            </Link>
          ) : null}

          <button
            type="button"
            onClick={toggleTheme}
            className="ui-btn-ghost inline-flex items-center gap-2 !rounded-xl !px-3 !py-2 !text-sm"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            {theme === "dark" ? "Light" : "Dark"}
          </button>

          {/* ----- Profile Dropdown ----- */}
          {isLoading ? (
            <div className="ui-muted">Loading...</div>
          ) : isAuthenticated ? (
            <div className="relative" ref={profileRef}>
              <button
                type="button"
                onClick={toggleProfileMenu}
                className="ui-btn-ghost inline-flex items-center gap-2 !rounded-xl !px-2 !py-1.5"
                aria-label="Toggle profile menu"
                aria-expanded={profileOpen}
              >
                <span
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold"
                  style={{ background: "var(--accent)", color: "#000" }}
                >
                  {initials}
                </span>
                <span className="max-w-[110px] truncate text-sm font-medium">
                  {user?.name || "Account"}
                </span>
                <ChevronDown className={`h-4 w-4 transition-transform ${profileOpen ? "rotate-180" : ""}`} />
              </button>

              {/* ----- Profile Dropdown Menu ------ */}
              {profileOpen ? (
                <div
                  className="ui-fade-slide-in absolute right-0 mt-2 w-80 overflow-hidden rounded-2xl border shadow-xl"
                  style={{ borderColor: "color-mix(in srgb, var(--border) 28%, transparent)", background: "var(--surface)" }}
                >
                  <div className="border-b px-4 py-3" style={{ borderColor: "color-mix(in srgb, var(--border) 24%, transparent)", background: "color-mix(in srgb, var(--surface) 75%, var(--surface-2) 25%)" }}>
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] ui-muted">Account</p>
                  </div>

                  <div className="p-4">
                    <div className="rounded-xl border p-3" style={{ borderColor: "color-mix(in srgb, var(--border) 24%, transparent)" }}>

                      <div className="flex items-center gap-3">
                        <span
                          className="inline-flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold"
                          style={{ background: "var(--accent)", color: "#000" }}
                        >
                          {initials}
                        </span>
                        <div className="min-w-0">
                          <div className="flex items-center gap-1 mb-0.5">
                            <p className="truncate ui-title text-sm">{user?.name || "User"}</p>
                            <span className="rounded-md px-2 py-0.5 font-semibold capitalize text-xs" style={{ background: "var(--accent)", color: "#000" }}>
                              {user?.userType || "member"}
                            </span>
                          </div>
                          <p className="truncate ui-muted text-xs">{user?.email || "No email"} </p>
                        </div>
                      </div>

                      {/* <div className="mt-3 px-2 text-xs border-t pt-2" style={{ borderColor: "color-mix(in srgb, var(--border) 8%, transparent)" }}>

                        <div className="flex items-center justify-between">
                          <span className="ui-muted">Role</span>
                        
                        </div>
                        {user?.phone ? (
                          <div className="mt-2 flex items-center justify-between">
                            <span className="ui-muted">Phone</span>
                            <span className="ui-title">{user.phone}</span>
                          </div>
                        ) : null}
                      </div> */}
                    </div>

                    <Link
                      href="/profile"
                      onClick={() => setProfileOpen(false)}
                      className={`mt-3 block rounded-lg px-3 py-2 text-xs font-medium md:text-sm ${isProfileActive ? "ui-nav-link-active" : "ui-nav-link"}`}
                    >
                      Edit Profile
                    </Link>

                    {user?.userType === "freelancer" ? (
                      <Link
                        href="/portfolio"
                        onClick={() => setProfileOpen(false)}
                        className={`block rounded-lg px-3 py-2 text-xs font-medium md:text-sm ${isPortfolioActive ? "ui-nav-link-active" : "ui-nav-link"}`}
                      >
                        Edit Portfolio
                      </Link>
                    ) : null}

                    <button
                      onClick={() => {
                        setProfileOpen(false);
                        useAuthStore.getState().logout();
                      }}
                      className="ui-nav-link mt-3 block w-full rounded-lg border px-3 py-2 text-left text-xs font-medium md:text-sm hover:bg-red-500 hover:text-white! hover:font-bold transition-all ease-in-out duration-500"
                      style={{ borderColor: "color-mix(in srgb, var(--border) 24%, transparent)" }}
                    >
                      Logout
                    </button>
                  </div>
                </div>
              ) : null}
            </div>
          ) : null}
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <button
            type="button"
            onClick={toggleTheme}
            className="ui-btn-ghost inline-flex items-center gap-2 !rounded-xl !px-3 !py-2 !text-xs"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          {isAuthenticated ? (
            <div
              className="inline-flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold"
              style={{ background: "var(--accent)", color: "#000" }}
              aria-hidden
            >
              {initials}
            </div>
          ) : (
            <User className="h-5 w-5 ui-muted" />
          )}
          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="ui-btn-ghost inline-flex items-center !rounded-xl !px-3 !py-2"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen ? (
        <div className="ui-fade-slide-in border-t px-4 pb-4 pt-3 md:hidden" style={{ borderColor: "color-mix(in srgb, var(--border) 20%, transparent)" }}>
          <div className="flex flex-col gap-2 text-sm">
            {isAuthenticated ? (
              <div className="mb-2 rounded-xl border p-3" style={{ borderColor: "color-mix(in srgb, var(--border) 22%, transparent)" }}>
                <p className="ui-title text-sm">{user?.name || "User"}</p>
                <p className="ui-muted mt-1 text-xs">{user?.email || "No email"}</p>
                <p className="ui-muted mt-1 text-xs capitalize">Role: {user?.userType || "member"}</p>
              </div>
            ) : null}
            {authLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={navLinkClass(item.active)}
                aria-current={item.active ? "page" : undefined}
                onClick={closeMobileMenu}
              >
                {item.label}
              </Link>
            ))}
            {isAuthenticated ? (
              <>
                <Link href="/dashboard" className="ui-btn text-center text-xs" onClick={closeMobileMenu}>
                  Dashboard
                </Link>
                <Link href="/requirements#post" className="ui-btn text-center" onClick={closeMobileMenu}>
                  Post Requirement
                </Link>
                <button
                  onClick={() => {
                    closeMobileMenu();
                    useAuthStore.getState().logout();
                  }}
                  className="ui-nav-link rounded-lg px-3 py-2 text-left font-medium"
                >
                  Logout
                </button>
              </>
            ) : null}
          </div>
        </div>
      ) : null}
    </nav>
  );
}
