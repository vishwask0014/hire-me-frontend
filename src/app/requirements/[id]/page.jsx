"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { apiUrl, requestOptions } from "@/lib/api-client";

export default function RequirementDetailPage() {
  const params = useParams();
  const [requirement, setRequirement] = useState(null);
  const [error, setError] = useState("");
  const [requiresLogin, setRequiresLogin] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const response = await fetch(apiUrl(`/api/requirements/${params.id}`), requestOptions);
        const data = await response.json();
        if (response.status === 401) {
          setRequiresLogin(true);
          return;
        }
        if (!response.ok) {
          setError(data.error ?? "Unable to load requirement.");
          return;
        }
        setRequirement(data.requirement);
      } catch {
        setError("Unable to load requirement.");
      }
    }
    load();
  }, [params.id]);

  if (error) {
    return (
      <section className="ui-alert-error">
        <p className="text-sm">{error}</p>
      </section>
    );
  }

  if (requiresLogin) {
    return (
      <section className="ui-card p-6">
        <h1 className="ui-title text-xl">Login Required</h1>
        <p className="ui-muted mt-2 text-sm">Please login to access requirement details.</p>
        <Link href="/login" className="ui-link mt-4 inline-block text-sm">
          Go to Login
        </Link>
      </section>
    );
  }

  if (!requirement) {
    return <p className="ui-muted text-sm">Loading requirement details...</p>;
  }

  return (
    <section className="space-y-6">
      <div className="ui-card-strong space-y-4 p-6 md:p-8">
        <p className="rounded-md px-2 py-1 text-xs font-semibold text-black uppercase tracking-[0.18em]" style={{ background: "var(--accent)", color: "var(--foreground)", width: "fit-content" }}>Requirement</p>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <h1 className="ui-title text-2xl md:text-4xl">{requirement.title}</h1>
          <span className="ui-chip">Budget: {requirement.budget}</span>
        </div>
        <p className="ui-muted text-sm md:text-base">{requirement.description}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <article className="ui-card p-5">
          <h2 className="ui-title text-lg">Project Info</h2>
          <p className="ui-muted mt-3 text-sm">Skills required: {requirement.skills.join(", ")}</p>
          <p className="ui-muted mt-2 text-sm">Location: {requirement.location}</p>
        </article>
        <article className="ui-card p-5">
          <h2 className="ui-title text-lg">Posted By</h2>
          <p className="ui-muted mt-3 text-sm">Hirer: {requirement.hirerName}</p>
          <p className="ui-muted mt-2 text-sm">Posted at: {new Date(requirement.createdAt).toLocaleString()}</p>
        </article>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Link href="/requirements" className="ui-btn-ghost inline-block text-sm">
          Back to Requirements
        </Link>
        <Link href={`/chat?requirementId=${requirement.id}`} className="ui-btn inline-block text-sm">
          Open Chat
        </Link>
      </div>
    </section>
  );
}
