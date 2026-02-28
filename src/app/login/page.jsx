"use client";

import Link from "next/link";
import { useState } from "react";
import { apiUrl, requestOptions } from "@/lib/api-client";

export default function LoginPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
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
      const response = await fetch(apiUrl("/api/auth/login"), {
        ...requestOptions,
        method: "POST",
        body: JSON.stringify({ name, email, phone, userType }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error ?? "Login failed.");
        return;
      }

      setMessage("Login successful. Redirecting to homepage...");
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
    <section className="mx-auto max-w-lg rounded border border-slate-200 bg-white p-6">
      <h1 className="text-2xl font-bold text-slate-900">Login</h1>
      <p className="mt-1 text-sm text-slate-600">
        Use the same details you used during signup.
      </p>
      <form onSubmit={onSubmit} className="mt-5 space-y-4">
        <input
          className="w-full rounded border border-slate-300 px-3 py-2"
          placeholder="Full name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        />
        <input
          type="email"
          className="w-full rounded border border-slate-300 px-3 py-2"
          placeholder="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
        <input
          className="w-full rounded border border-slate-300 px-3 py-2"
          placeholder="Phone"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          required
        />
        <select
          className="w-full rounded border border-slate-300 px-3 py-2"
          value={userType}
          onChange={(event) => setUserType(event.target.value)}
        >
          <option value="hirer">Hirer</option>
          <option value="freelancer">Freelancer</option>
        </select>
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded bg-slate-900 px-3 py-2 font-medium text-white disabled:opacity-60"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
      {message ? <p className="mt-3 text-sm text-green-700">{message}</p> : null}
      {error ? <p className="mt-3 text-sm text-red-600">{error}</p> : null}
      <p className="mt-4 text-sm text-slate-600">
        No account? <Link href="/signup" className="text-blue-700">Signup</Link>
      </p>
    </section>
  );
}
