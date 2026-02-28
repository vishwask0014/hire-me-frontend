"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { apiUrl, requestOptions } from "@/lib/api-client";

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [dashboard, setDashboard] = useState(null);
  const [error, setError] = useState("");
  const [acceptingId, setAcceptingId] = useState("");
  const [releasingId, setReleasingId] = useState("");
  const [tab, setTab] = useState("all");

  async function loadDashboard() {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(apiUrl("/api/dashboard"), requestOptions);
      const data = await response.json();
      if (!response.ok) {
        setError(data.error ?? "Unable to load dashboard.");
        setDashboard(null);
        return;
      }
      setDashboard(data);
    } catch {
      setError("Unable to load dashboard.");
      setDashboard(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadDashboard();
  }, []);

  async function acceptRequirement(requirementId) {
    setAcceptingId(requirementId);
    setError("");
    try {
      const response = await fetch(apiUrl(`/api/requirements/${requirementId}/accept`), {
        ...requestOptions,
        method: "POST",
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error ?? "Unable to accept requirement.");
        return;
      }
      await loadDashboard();
    } catch {
      setError("Unable to accept requirement.");
    } finally {
      setAcceptingId("");
    }
  }

  async function unacceptRequirement(requirementId) {
    setReleasingId(requirementId);
    setError("");
    try {
      const response = await fetch(apiUrl(`/api/requirements/${requirementId}/unaccept`), {
        ...requestOptions,
        method: "POST",
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error ?? "Unable to unaccept requirement.");
        return;
      }
      await loadDashboard();
    } catch {
      setError("Unable to unaccept requirement.");
    } finally {
      setReleasingId("");
    }
  }

  if (loading) {
    return <p className="ui-muted text-sm">Loading dashboard...</p>;
  }

  if (!dashboard && error.toLowerCase().includes("login")) {
    return (
      <section className="ui-card p-6">
        <h1 className="ui-title text-xl">Login Required</h1>
        <p className="ui-muted mt-2 text-sm">Please login to access the dashboard.</p>
        <Link href="/login" className="ui-link mt-4 inline-block text-sm">
          Go to Login
        </Link>
      </section>
    );
  }

  if (!dashboard) {
    return <p className="ui-alert-error text-sm">{error || "Unable to load dashboard."}</p>;
  }

  const isFreelancer = dashboard.role === "freelancer";
  const showActive = tab === "all" || tab === "active";
  const showAccepted = tab === "all" || tab === "accepted";

  return (
    <section className="space-y-6 md:space-y-8">
      <div className="ui-card-strong p-6 md:p-8">
        <p className="rounded-md px-2 py-1 text-xs font-semibold !text-black uppercase tracking-[0.18em]" style={{ background: "var(--accent)", color: "#000", width: "fit-content" }}>Dashboard</p>
        <h1 className="ui-title mt-3 text-3xl md:text-4xl">
          {isFreelancer ? "Freelancer Dashboard" : "ssss"}
        </h1>
        <p className="ui-muted mt-2 text-sm md:text-base">
          Welcome {dashboard.user?.name || "User"}.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 md:gap-6">
        <article className="ui-card p-5 md:p-6">
          <p className="ui-muted text-xs uppercase tracking-[0.14em]">Active</p>
          <p className="ui-title mt-2 text-3xl md:text-4xl">{dashboard.stats?.active ?? 0}</p>
        </article>
        <article className="ui-card p-5 md:p-6">
          <p className="ui-muted text-xs uppercase tracking-[0.14em]">Accepted</p>
          <p className="ui-title mt-2 text-3xl md:text-4xl">{dashboard.stats?.accepted ?? 0}</p>
        </article>
      </div>

      <div className="flex flex-wrap gap-2">
        {[
          { key: "all", label: "All" },
          { key: "active", label: "Active" },
          { key: "accepted", label: "Accepted" },
        ].map((item) => (
          <button
            key={item.key}
            type="button"
            onClick={() => setTab(item.key)}
            className={tab === item.key ? "ui-btn" : "ui-btn-ghost"}
          >
            {item.label}
          </button>
        ))}
      </div>

      {error ? <p className="ui-alert-error text-sm">{error}</p> : null}

      <div className="grid gap-4 lg:grid-cols-2 lg:gap-6">
        {showActive ? (
          <section className="ui-card p-5 md:p-6">
            <h2 className="ui-title text-xl">Active Requirements</h2>
            <div className="mt-4 space-y-3">
              {(dashboard.activeRequirements || []).length === 0 ? (
                <p className="ui-muted text-sm">No active requirements.</p>
              ) : (
                dashboard.activeRequirements.map((item) => (
                  <article key={item.id} className="rounded-2xl border p-4" style={{ borderColor: "color-mix(in srgb, var(--border) 35%, transparent)", background: "color-mix(in srgb, var(--surface) 70%, var(--surface-2) 30%)" }}>
                    <h3 className="ui-title text-base">{item.title}</h3>
                    <p className="ui-muted mt-1 text-xs">
                      Budget: {item.budget} | Location: {item.location}
                    </p>
                    <p className="ui-muted mt-2 text-sm line-clamp-2">{item.description}</p>
                    <div className="mt-3 flex items-center gap-2">
                      <Link href={`/requirements/${item.id}`} className="ui-link text-sm">
                        View
                      </Link>
                      {isFreelancer || item.acceptedFreelancerId ? (
                        <Link href={`/chat?requirementId=${item.id}`} className="ui-link text-sm">
                          Chat
                        </Link>
                      ) : (
                        <span className="ui-muted text-xs">Chat after acceptance</span>
                      )}
                      {isFreelancer ? (
                        <button
                          type="button"
                          disabled={acceptingId === item.id}
                          onClick={() => acceptRequirement(item.id)}
                          className="ui-btn text-xs"
                        >
                          {acceptingId === item.id ? "Accepting..." : "Accept"}
                        </button>
                      ) : null}
                    </div>
                  </article>
                ))
              )}
            </div>
          </section>
        ) : null}

        {showAccepted ? (
          <section className="ui-card p-5 md:p-6">
            <h2 className="ui-title text-xl">Accepted Requirements</h2>
            <div className="mt-4 space-y-3">
              {(dashboard.acceptedRequirements || []).length === 0 ? (
                <p className="ui-muted text-sm">No accepted requirements.</p>
              ) : (
                dashboard.acceptedRequirements.map((item) => (
                  <article key={item.id} className="rounded-2xl border p-4" style={{ borderColor: "color-mix(in srgb, var(--border) 35%, transparent)", background: "color-mix(in srgb, var(--surface) 70%, var(--surface-2) 30%)" }}>
                    <h3 className="ui-title text-base">{item.title}</h3>
                    <p className="ui-muted mt-1 text-xs">
                      {isFreelancer
                        ? `Hirer: ${item.hirerName}`
                        : `Accepted By: ${item.acceptedFreelancerName || "Freelancer"}`}
                    </p>
                    <p className="ui-muted mt-2 text-sm line-clamp-2">{item.description}</p>
                    <div className="mt-3 flex items-center gap-2">
                      <Link href={`/requirements/${item.id}`} className="ui-link text-sm">
                        View
                      </Link>
                      <Link href={`/chat?requirementId=${item.id}`} className="ui-link text-sm">
                        Chat
                      </Link>
                      <button
                        type="button"
                        disabled={releasingId === item.id}
                        onClick={() => unacceptRequirement(item.id)}
                        className="ui-btn-ghost text-xs"
                      >
                        {releasingId === item.id ? "Updating..." : isFreelancer ? "Unaccept" : "Reject"}
                      </button>
                    </div>
                  </article>
                ))
              )}
            </div>
          </section>
        ) : null}
      </div>
    </section>
  );
}
