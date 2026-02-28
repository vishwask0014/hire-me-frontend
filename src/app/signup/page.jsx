"use client";

import Link from "next/link";
import { useState } from "react";
import { apiUrl, requestOptions } from "@/lib/api-client";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("hirer");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
    <section className="mx-auto max-w-lg">
      <div className="ui-card-strong p-6 md:p-8">
        <h1 className="ui-title text-2xl">Create Account</h1>
        <p className="ui-muted mt-1 text-sm">
        Register as a hirer or freelancer.
        </p>
        <form onSubmit={onSubmit} className="mt-5 space-y-4">
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
            placeholder="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
          <input
            className="ui-input"
            placeholder="Phone"
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
          <select
            className="ui-select"
            value={userType}
            onChange={(event) => setUserType(event.target.value)}
          >
            <option value="hirer">Hirer</option>
            <option value="freelancer">Freelancer</option>
          </select>
          <button
            type="submit"
            disabled={loading}
            className="ui-btn w-full"
          >
            {loading ? "Creating..." : "Signup"}
          </button>
        </form>
        {message ? <p className="ui-alert-success mt-4 text-sm">{message}</p> : null}
        {error ? <p className="ui-alert-error mt-4 text-sm">{error}</p> : null}
        <p className="ui-muted mt-4 text-sm">
          Already registered? <Link href="/login" className="ui-link">Login</Link>
        </p>
      </div>
    </section>
  );
}
