"use client";

import Link from "next/link";
import { useState } from "react";
import { apiUrl, requestOptions } from "@/lib/api-client";
import { Briefcase, Loader2, Users } from "lucide-react";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("hirer");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const roleOptions = [
    {
      key: "hirer",
      title: "Hirer",
      desc: "Post requirements, review freelancers, and manage accepted work.",
      points: ["Create requirements", "Review freelancer responses", "Track active projects"],
    },
    {
      key: "freelancer",
      title: "Freelancer",
      desc: "Browse requirements, chat with hirers, and accept relevant work.",
      points: ["Find matching requirements", "Discuss project details", "Accept and deliver work"],
    },
  ];

  async function onSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    try {
      const response = await fetch(apiUrl("/api/auth/signup"), {
        ...requestOptions,
        method: "POST",
        body: JSON.stringify({ name, email, phone, password, userType }),
      });
      const data = await response.json();

      if (!response.ok) {
        setError(data.error ?? "Signup failed.");
        return;
      }

      setMessage("Signup successful. Redirecting to homepage...");
      setTimeout(() => {
        window.location.href = "/";
      }, 800);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="mx-auto max-w-[760px]">
      <div className="ui-card-strong p-6 md:p-8">
        <div className="mb-6 text-center">
          <div
            className="mx-auto mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl border"
            style={{ borderColor: "var(--border)", background: "var(--accent)", color: "var(--foreground)" }}
          >
            <Briefcase className="h-8 w-8" />
          </div>
          <h1 className="ui-title text-3xl md:text-4xl">Create Account</h1>
          <p className="ui-muted mt-2 text-sm md:text-base">Register as hirer or freelancer and start collaborating.</p>
        </div>
        <form onSubmit={onSubmit} className="grid gap-4 md:grid-cols-2">
          <input
            className="ui-input"
            placeholder="Full name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
          <input
            type="email"
            className="ui-input"
            placeholder="Email address"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
          <input
            className="ui-input"
            placeholder="Phone number"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            required
          />
          <input
            type="password"
            className="ui-input"
            placeholder="Password (min 6 chars)"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            minLength={6}
            required
          />
          <div className="space-y-3 md:col-span-2">
            <p className="ui-title text-sm">Choose account type</p>
            <div className="space-y-2">
              {roleOptions.map((role) => {
                const active = userType === role.key;
                return (
                  <button
                    key={role.key}
                    type="button"
                    onClick={() => setUserType(role.key)}
                    className="w-full rounded-2xl border p-4 text-left transition-colors"
                    style={{
                      borderColor: active ? "var(--accent)" : "color-mix(in srgb, var(--border) 26%, transparent)",
                      background: active
                        ? "color-mix(in srgb, var(--surface) 72%, var(--surface-2) 28%)"
                        : "var(--surface)",
                    }}
                    aria-pressed={active}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        {role.key === "hirer" ? (
                          <Briefcase className="h-4 w-4" />
                        ) : (
                          <Users className="h-4 w-4" />
                        )}
                        <span className="ui-title text-sm">{role.title}</span>
                      </div>
                    </div>

                    <p className="ui-muted mt-2 text-xs">{role.desc}</p>

                    {active ? (
                      <ul className="mt-3 space-y-1 text-xs">
                        {role.points.map((point) => (
                          <li key={point} className="flex items-center gap-2">
                            <span
                              className="inline-flex h-2 w-2 rounded-full"
                              style={{ background: "var(--accent)" }}
                            />
                            <span className="ui-muted">{point}</span>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </button>
                );
              })}
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="ui-btn flex w-full items-center justify-center gap-2 md:col-span-2"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Creating account...
              </>
            ) : (
              "Create Account"
            )}
          </button>
        </form>
        {message ? <p className="ui-alert-success mt-4 text-sm">{message}</p> : null}
        {error ? <p className="ui-alert-error mt-4 text-sm">{error}</p> : null}
        <p className="ui-muted mt-5 text-center text-sm">
          Already registered? <Link href="/login" className="ui-link">Login</Link>
        </p>
      </div>
    </section>
  );
}
