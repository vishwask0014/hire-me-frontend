"use client";

import Link from "next/link";
import { useState } from "react";
import { apiUrl, requestOptions } from "@/lib/api-client";
import { Mail, Briefcase, Loader2, Eye, EyeOff, Lock } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    try {
      const response = await fetch(apiUrl("/api/auth/login"), {
        ...requestOptions,
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error ?? "Login failed.");
        return;
      }

      setMessage("Login successful! Redirecting...");
      setTimeout(() => {
        window.location.href = "/";
      }, 1500);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="mx-auto w-full max-w-[720px] space-y-6">
      <div className="ui-card-strong p-6 md:p-8">
        <div className="mb-6 text-center md:mb-8">
          <div
            className="mx-auto mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl border"
            style={{ borderColor: "var(--border)", background: "var(--accent)", color: "var(--foreground)" }}
          >
            <Briefcase className="h-8 w-8" />
          </div>
          <h1 className="ui-title text-3xl md:text-4xl">Welcome back</h1>
          <p className="ui-muted mt-2 text-sm md:text-base">Login with your email and password to continue.</p>
        </div>

        <form onSubmit={onSubmit} className="space-y-5">
          <div>
            <label className="ui-title mb-2 block text-sm">Email address</label>
            <div className="relative">
              <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                <Mail className="h-5 w-5 ui-muted" />
              </span>
              <input
                type="email"
                className="ui-input !h-12"
                style={{ paddingLeft: "42px" }}
                placeholder="you@company.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <label className="ui-title mb-2 block text-sm">Password</label>
            <div className="relative">
              <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                <Lock className="h-5 w-5 ui-muted" />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                className="ui-input !h-12 pr-12"
                style={{ paddingLeft: "42px" }}
                placeholder="Enter your password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
              <button
                type="button"
                aria-label={showPassword ? "Hide password" : "Show password"}
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0 right-0 inline-flex items-center justify-center pr-3.5 ui-muted"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          <button type="submit" disabled={loading} className="ui-btn flex w-full items-center justify-center gap-2 py-3">
            {loading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        {message ? <p className="ui-alert-success mt-4 text-sm">{message}</p> : null}
        {error ? <p className="ui-alert-error mt-4 text-sm">{error}</p> : null}

        <p className="ui-muted mt-6 text-center text-sm">
          Don&apos;t have an account? <Link href="/signup" className="ui-link">Create one</Link>
        </p>
      </div>
    </section>
  );
}
