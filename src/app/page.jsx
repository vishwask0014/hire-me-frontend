"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { apiUrl, requestOptions } from "@/lib/api-client";

export default function Home() {
  const [requirements, setRequirements] = useState([]);
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const [requirementsRes, meRes] = await Promise.all([
          fetch(apiUrl("/api/requirements"), requestOptions),
          fetch(apiUrl("/api/auth/me"), requestOptions),
        ]);
        const requirementsData = await requirementsRes.json();
        const meData = await meRes.json();
        setRequirements(requirementsData.requirements ?? []);
        setUser(meData.user ?? null);
      } catch {
        setError("Failed to load data. Please refresh.");
      }
    }

    load();
  }, []);

  async function logout() {
    await fetch(apiUrl("/api/auth/logout"), { ...requestOptions, method: "POST" });
    window.location.reload();
  }

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg bg-slate-900 px-5 py-4 text-white">
        <div>
          <h1 className="text-2xl font-bold">HireMe Requirements Board</h1>
          <p className="text-sm text-slate-200">
            Signup as hirer/freelancer, then post or browse requirements.
          </p>
        </div>
        <div className="flex gap-2">
          {user ? (
            <>
              <span className="rounded bg-slate-700 px-3 py-2 text-sm">
                {user.name} ({user.userType})
              </span>
              <button
                type="button"
                onClick={logout}
                className="rounded bg-white px-3 py-2 text-sm font-medium text-slate-900"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="rounded bg-white px-3 py-2 text-sm font-medium text-slate-900">
                Login
              </Link>
              <Link href="/signup" className="rounded border border-white px-3 py-2 text-sm font-medium">
                Signup
              </Link>
            </>
          )}
        </div>
      </div>

      {error ? <p className="text-sm text-red-600">{error}</p> : null}

      <div className="grid gap-4">
        {requirements.length === 0 ? (
          <p className="rounded border border-slate-200 bg-white p-4 text-slate-600">
            No requirements posted yet.
          </p>
        ) : (
          requirements.map((item) => (
            <article key={item.id} className="rounded border border-slate-200 bg-white p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="text-lg font-semibold text-slate-900">{item.title}</h2>
                <span className="text-sm text-slate-500">Budget: {item.budget}</span>
              </div>
              <p className="mt-2 line-clamp-2 text-sm text-slate-700">{item.description}</p>
              <p className="mt-2 text-xs text-slate-500">
                Skills: {item.skills.join(", ")} | Location: {item.location} | By: {item.hirerName}
              </p>
              <Link
                href={`/requirements/${item.id}`}
                className="mt-3 inline-block text-sm font-medium text-blue-700"
              >
                View Details
              </Link>
            </article>
          ))
        )}
      </div>
    </section>
  );
}
