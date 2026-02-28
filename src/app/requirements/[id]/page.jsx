"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { apiUrl, requestOptions } from "@/lib/api-client";

export default function RequirementDetailPage() {
  const params = useParams();
  const [requirement, setRequirement] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const response = await fetch(apiUrl(`/api/requirements/${params.id}`), requestOptions);
        const data = await response.json();
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
      <section className="rounded border border-rose-300 bg-rose-50 p-5">
        <p className="text-sm text-rose-900">{error}</p>
      </section>
    );
  }

  if (!requirement) {
    return <p className="text-sm text-slate-600">Loading requirement details...</p>;
  }

  return (
    <section className="space-y-4 rounded border border-slate-200 bg-white p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <h1 className="text-2xl font-bold text-slate-900">{requirement.title}</h1>
        <span className="rounded bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">
          Budget: {requirement.budget}
        </span>
      </div>
      <p className="text-sm text-slate-700">{requirement.description}</p>
      <p className="text-sm text-slate-600">
        Skills required: {requirement.skills.join(", ")}
      </p>
      <p className="text-sm text-slate-600">Location: {requirement.location}</p>
      <p className="text-sm text-slate-600">Posted by: {requirement.hirerName}</p>
      <p className="text-sm text-slate-500">
        Posted at: {new Date(requirement.createdAt).toLocaleString()}
      </p>
      <Link href="/" className="inline-block text-sm font-medium text-blue-700">
        Back to Home
      </Link>
    </section>
  );
}
