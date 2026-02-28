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
    <div className="mx-auto w-full max-w-md">
      <div className="text-center">
        <div
          className="mx-auto mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl"
          style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}
        >
          <Briefcase className="h-8 w-8" />
        </div>
        <h1 className="ui-title text-3xl">Welcome back</h1>
        <p className="ui-muted mt-2 text-sm">Sign in to your HireMe account</p>
      </div>

      <div className="ui-card-strong mt-6 p-6 md:p-8">
        <form onSubmit={onSubmit} className="space-y-5">
          <div>
            <label className="ui-title mb-2 block text-sm">Email Address</label>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-3 top-3.5 h-5 w-5 ui-muted" />
              <input
                type="email"
                className="ui-input pl-10 pr-3"
                placeholder="john@example.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <label className="ui-title mb-2 block text-sm">Password</label>
            <div className="relative">
              <Lock className="pointer-events-none absolute left-3 top-3.5 h-5 w-5 ui-muted" />
              <input
                type={showPassword ? "text" : "password"}
                className="ui-input pl-10 pr-12"
                placeholder="Enter your password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
              <button
                type="button"
                aria-label={showPassword ? "Hide password" : "Show password"}
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-3.5 ui-muted"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="ui-btn flex w-full items-center justify-center gap-2 py-3"
          >
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

        <div className="mt-6 text-center">
          <p className="ui-muted text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="ui-link">
              Sign up
            </Link>
          </p>
        </div>
      </div>

      <div className="mt-6 text-center">
        <p className="ui-muted text-xs">
          By signing in, you agree to our{" "}
          <Link href="#" className="ui-link">
            Terms
          </Link>{" "}
          and{" "}
          <Link href="#" className="ui-link">
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  );
}
