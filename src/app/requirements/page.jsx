"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { apiUrl, requestOptions } from "@/lib/api-client";

export default function RequirementsPage() {
  const [requirements, setRequirements] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("");
  const [skills, setSkills] = useState("");
  const [location, setLocation] = useState("");
  const [posting, setPosting] = useState(false);
  const [postError, setPostError] = useState("");
  const [postMessage, setPostMessage] = useState("");

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError("");
      try {
        const meRes = await fetch(apiUrl("/api/auth/me"), requestOptions);
        const meData = await meRes.json();
        const meUser = meData.user ?? null;
        setUser(meUser);

        if (!meUser) {
          setRequirements([]);
          return;
        }

        const reqRes = await fetch(apiUrl("/api/requirements"), requestOptions);
        const reqData = await reqRes.json();
        if (!reqRes.ok) {
          setError(reqData.error ?? "Failed to load requirements.");
          return;
        }
        setRequirements(reqData.requirements ?? []);
      } catch {
        setError("Failed to load requirements.");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  async function onPostRequirement(event) {
    event.preventDefault();
    setPosting(true);
    setPostError("");
    setPostMessage("");

    try {
      const response = await fetch(apiUrl("/api/requirements"), {
        ...requestOptions,
        method: "POST",
        body: JSON.stringify({ title, description, budget, skills, location }),
      });
      const data = await response.json();

      if (!response.ok) {
        setPostError(data.error ?? "Failed to post requirement.");
        return;
      }

      const posted = {
        ...data.requirement,
        hirerName: user?.name || "You",
      };
      setRequirements((prev) => [posted, ...prev]);
      setTitle("");
      setDescription("");
      setBudget("");
      setSkills("");
      setLocation("");
      setPostMessage("Requirement posted successfully.");
    } catch {
      setPostError("Network error. Please try again.");
    } finally {
      setPosting(false);
    }
  }

  if (loading) {
    return <p className="ui-muted text-sm">Loading requirements...</p>;
  }

  if (!user) {
    return (
      <section className="ui-card p-6">
        <h1 className="ui-title text-xl">Login Required</h1>
        <p className="ui-muted mt-2 text-sm">Please login to view and work with requirements.</p>
        <Link href="/login" className="ui-link mt-4 inline-block text-sm">
          Go to Login
        </Link>
      </section>
    );
  }

  return (
    <section className="space-y-6">
      <div className="ui-card-strong p-6">
        <p className="ui-link text-xs uppercase tracking-[0.18em]">Requirements</p>
        <h1 className="ui-title mt-2 text-3xl">All Requirements</h1>
        <p className="ui-muted mt-2 text-sm">
          This page is shared for both hirer and freelancer users. Browse all requirements and collaborate.
        </p>
      </div>

      {error ? <p className="ui-alert-error text-sm">{error}</p> : null}

      <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-4">
          {requirements.length === 0 ? (
            <p className="ui-card ui-muted p-5 text-sm">No requirements posted yet.</p>
          ) : (
            requirements.map((item) => (
              <article key={item.id} className="ui-card p-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h2 className="ui-title text-lg">{item.title}</h2>
                  <span className="ui-chip">Budget: {item.budget}</span>
                </div>
                <p className="ui-muted mt-2 line-clamp-2 text-sm">{item.description}</p>
                <p className="ui-muted mt-2 text-xs">
                  Skills: {item.skills.join(", ")} | Location: {item.location} | By: {item.hirerName}
                </p>
                <div className="mt-3 flex items-center gap-3">
                  <Link href={`/requirements/${item.id}`} className="ui-link text-sm">
                    View Details
                  </Link>
                  <Link href={`/chat?requirementId=${item.id}`} className="ui-link text-sm">
                    Chat
                  </Link>
                </div>
              </article>
            ))
          )}
        </div>

        <aside className="ui-card p-5" id="post">
          {user.userType === "hirer" ? (
            <>
              <h2 className="ui-title text-lg">Post Requirement</h2>
              <p className="ui-muted mt-2 text-sm">Create a new requirement from this page.</p>
              <form onSubmit={onPostRequirement} className="mt-4 space-y-3">
                <input
                  className="ui-input"
                  placeholder="Requirement title"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  required
                />
                <textarea
                  className="ui-textarea min-h-32"
                  placeholder="Requirement details"
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  required
                />
                <input
                  className="ui-input"
                  placeholder="Budget"
                  value={budget}
                  onChange={(event) => setBudget(event.target.value)}
                  required
                />
                <input
                  className="ui-input"
                  placeholder="Skills (comma separated)"
                  value={skills}
                  onChange={(event) => setSkills(event.target.value)}
                  required
                />
                <input
                  className="ui-input"
                  placeholder="Location"
                  value={location}
                  onChange={(event) => setLocation(event.target.value)}
                  required
                />
                <button type="submit" disabled={posting} className="ui-btn w-full">
                  {posting ? "Posting..." : "Post Requirement"}
                </button>
              </form>
              {postMessage ? <p className="ui-alert-success mt-3 text-sm">{postMessage}</p> : null}
              {postError ? <p className="ui-alert-error mt-3 text-sm">{postError}</p> : null}
            </>
          ) : (
            <>
              <h2 className="ui-title text-lg">Posting Access</h2>
              <p className="ui-muted mt-2 text-sm">
                You are logged in as freelancer. You can browse, chat, and accept requirements from Dashboard.
              </p>
              <Link href="/dashboard" className="ui-link mt-4 inline-block text-sm">
                Go to Dashboard
              </Link>
            </>
          )}
        </aside>
      </div>
    </section>
  );
}

