"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { apiUrl, requestOptions } from "@/lib/api-client";
import HomePageMain from "@/components/HomePageMain";

const services = [
  {
    title: "Requirement Discovery",
    description: "Convert business goals into clear technical scopes so freelancers can respond faster.",
  },
  {
    title: "Freelancer Matching",
    description: "Filter by skills, budget, and location to connect with the right talent quickly.",
  },
  {
    title: "Live Collaboration",
    description: "Built-in chat keeps requirement discussions and updates in one place.",
  },
  {
    title: "Acceptance Workflow",
    description: "Track active and accepted requirements with role-specific dashboards.",
  },
];

const processSteps = [
  "Create account as hirer or freelancer",
  "Post or browse requirements",
  "Open chat to discuss details",
  "Accept and track work from dashboard",
];

const testimonials = [
  {
    name: "Rohan Mehta",
    role: "Startup Founder",
    text: "We moved from endless calls to clear requirement threads and accepted faster in a week.",
  },
  {
    name: "Aisha Khan",
    role: "Freelance Developer",
    text: "The active and accepted views make pipeline management easy and reduce missed opportunities.",
  },
];

export default function Home() {
  const [requirements, setRequirements] = useState([]);
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const meRes = await fetch(apiUrl("/api/auth/me"), requestOptions);
        const meData = await meRes.json();
        const meUser = meData.user ?? null;
        setUser(meUser);

        if (!meUser) {
          setRequirements([]);
          return;
        }

        const requirementsRes = await fetch(apiUrl("/api/requirements"), requestOptions);
        const requirementsData = await requirementsRes.json();
        if (!requirementsRes.ok) {
          setError(requirementsData.error ?? "Failed to load requirements.");
          return;
        }
        setRequirements(requirementsData.requirements ?? []);
      } catch {
        setError("Failed to load data. Please refresh.");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  async function logout() {
    await fetch(apiUrl("/api/auth/logout"), { ...requestOptions, method: "POST" });
    window.location.reload();
  }

  if (loading) {
    return <p className="ui-muted text-sm">Loading...</p>;
  }

  if (!user) {
    return (
      <HomePageMain />
    );
  }

  return (
    <section className="space-y-6">
      <div className="ui-card-strong flex flex-wrap items-center justify-between gap-3 px-6 py-5">
        <div>
          <h1 className="ui-title text-2xl">HireMe Requirements Board</h1>
          <p className="ui-muted mt-1 text-sm">Signup as hirer/freelancer, then post or browse requirements.</p>
        </div>
        <div className="flex gap-2">
          <span className="ui-chip">
            {user.name} ({user.userType})
          </span>
          <button type="button" onClick={logout} className="ui-btn-ghost">
            Logout
          </button>
        </div>
      </div>

      {error ? <p className="ui-alert-error text-sm">{error}</p> : null}

      <div className="grid gap-4">
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
                <Link href={`/requirements/${item.id}`} className="ui-link inline-block text-sm">
                  View Details
                </Link>
                <Link href={`/chat?requirementId=${item.id}`} className="ui-link inline-block text-sm">
                  Chat
                </Link>
              </div>
            </article>
          ))
        )}
      </div>
    </section>
  );
}
