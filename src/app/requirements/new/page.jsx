"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { apiUrl, requestOptions } from "@/lib/api-client";

export default function NewRequirementPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("");
  const [skills, setSkills] = useState("");
  const [location, setLocation] = useState("");
  const [user, setUser] = useState(null);
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

  async function onSubmit(event) {
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
      <section className="ui-card p-6">
        <h1 className="ui-title text-xl">Login Required</h1>
        <p className="ui-muted mt-2 text-sm">
          Please login as a hirer user to post requirement details.
        </p>
        <Link href="/login" className="ui-link mt-4 inline-block text-sm">
          Go to Login
        </Link>
      </section>
    );
  }

  if (user.userType !== "hirer") {
    return (
      <section className="ui-card p-6">
        <h1 className="ui-title text-xl">Not Allowed</h1>
        <p className="ui-muted mt-2 text-sm">
          You are logged in as freelancer. Only hirer users can post requirements.
        </p>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-4xl">
      <div className="ui-card-strong p-6 md:p-8">
        <div className="mb-7">
          <p className="rounded-md px-2 py-1 text-xs font-semibold text-black uppercase tracking-[0.18em]" style={{ background: "var(--accent)", color: "var(--foreground)", width: "fit-content" }}>
            Hiring Desk
          </p>
          <h1 className="ui-title mt-3 text-3xl md:text-4xl">
            Post New Requirement
          </h1>
          <p className="ui-muted mt-2 text-sm md:text-base">
            Write clear scope, budget, and skills to attract better freelancer matches.
          </p>
        </div>

        <form onSubmit={onSubmit} className="space-y-5">
          <div>
            <label className="ui-title mb-2 block text-sm">
              Requirement Title
            </label>
            <input
              className="ui-input"
              placeholder="Example: Build inventory dashboard for Shopify store"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              required
            />
          </div>

          <div>
            <label className="ui-title mb-2 block text-sm">
              Description
            </label>
            <textarea
              className="ui-textarea min-h-40"
              placeholder="Explain project goals, expected deliverables, timeline, and success criteria."
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              required
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="ui-title mb-2 block text-sm">
                Budget
              </label>
              <input
                className="ui-input"
                placeholder="Example: USD 1500 fixed"
                value={budget}
                onChange={(event) => setBudget(event.target.value)}
                required
              />
            </div>
            <div>
              <label className="ui-title mb-2 block text-sm">
                Location
              </label>
              <input
                className="ui-input"
                placeholder="Remote / City / Timezone"
                value={location}
                onChange={(event) => setLocation(event.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <label className="ui-title mb-2 block text-sm">
              Skills
            </label>
            <input
              className="ui-input"
              placeholder="React, Node.js, PostgreSQL (comma separated)"
              value={skills}
              onChange={(event) => setSkills(event.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="ui-btn w-full"
          >
            {loading ? "Posting Requirement..." : "Post Requirement"}
          </button>
        </form>

        {message ? <p className="ui-alert-success mt-4 text-sm">{message}</p> : null}
        {error ? <p className="ui-alert-error mt-4 text-sm">{error}</p> : null}
      </div>
    </section>
  );
}
