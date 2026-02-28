"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { apiUrl, requestOptions } from "@/lib/api-client";

type User = {
  name: string;
  userType: "hirer" | "freelancer";
};

export default function NewRequirementPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("");
  const [skills, setSkills] = useState("");
  const [location, setLocation] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadUser() {
      const response = await fetch(apiUrl("/api/auth/me"), requestOptions);
      const data = await response.json();
      setUser(data.user ?? null);
    }
    loadUser();
  }, []);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await fetch(apiUrl("/api/requirements"), {
        ...requestOptions,
        method: "POST",
        body: JSON.stringify({ title, description, budget, skills, location }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error ?? "Failed to create requirement.");
        return;
      }

      setMessage("Requirement created successfully.");
      setTimeout(() => {
        window.location.href = `/requirements/${data.requirement.id}`;
      }, 800);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (!user) {
    return (
      <section className="rounded border border-amber-300 bg-amber-50 p-5">
        <h1 className="text-xl font-semibold text-amber-950">Login Required</h1>
        <p className="mt-2 text-sm text-amber-900">
          Please login as a hirer user to post requirement details.
        </p>
        <Link href="/login" className="mt-3 inline-block text-sm font-medium text-blue-700">
          Go to Login
        </Link>
      </section>
    );
  }

  if (user.userType !== "hirer") {
    return (
      <section className="rounded border border-rose-300 bg-rose-50 p-5">
        <h1 className="text-xl font-semibold text-rose-950">Not Allowed</h1>
        <p className="mt-2 text-sm text-rose-900">
          You are logged in as freelancer. Only hirer users can post requirements.
        </p>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-2xl rounded border border-slate-200 bg-white p-6">
      <h1 className="text-2xl font-bold text-slate-900">Post Requirement</h1>
      <p className="mt-1 text-sm text-slate-600">
        Add a clear title and full details so freelancers can apply.
      </p>
      <form onSubmit={onSubmit} className="mt-5 space-y-4">
        <input
          className="w-full rounded border border-slate-300 px-3 py-2"
          placeholder="Requirement title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          required
        />
        <textarea
          className="min-h-36 w-full rounded border border-slate-300 px-3 py-2"
          placeholder="Detailed requirement description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          required
        />
        <input
          className="w-full rounded border border-slate-300 px-3 py-2"
          placeholder="Budget (example: USD 1500 fixed)"
          value={budget}
          onChange={(event) => setBudget(event.target.value)}
          required
        />
        <input
          className="w-full rounded border border-slate-300 px-3 py-2"
          placeholder="Skills (comma separated)"
          value={skills}
          onChange={(event) => setSkills(event.target.value)}
          required
        />
        <input
          className="w-full rounded border border-slate-300 px-3 py-2"
          placeholder="Location"
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded bg-slate-900 px-3 py-2 font-medium text-white disabled:opacity-60"
        >
          {loading ? "Posting..." : "Post Requirement"}
        </button>
      </form>
      {message ? <p className="mt-3 text-sm text-green-700">{message}</p> : null}
      {error ? <p className="mt-3 text-sm text-red-600">{error}</p> : null}
    </section>
  );
}
