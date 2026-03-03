"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { BriefcaseBusiness, CircleHelp, Loader2, Plus, Trash2 } from "lucide-react";
import { apiUrl, requestOptions } from "@/lib/api-client";

function createEmptyProject() {
  return {
    title: "",
    summary: "",
    link: "",
  };
}

function mapPortfolioToForm(portfolio) {
  return {
    headline: portfolio?.headline || "Freelance Photographer",
    bio: portfolio?.bio || "",
    experienceLevel: portfolio?.experienceLevel === "professional" ? "professional" : "newbie",
    skills: Array.isArray(portfolio?.skills) ? portfolio.skills.join(", ") : "",
    hourlyRateInr: portfolio?.hourlyRateInr || "",
    experienceYears: portfolio?.experienceYears || "",
    location: portfolio?.location || "",
    availability: portfolio?.availability || "Flexible",
    languages: Array.isArray(portfolio?.languages) ? portfolio.languages.join(", ") : "",
    resumeLink: portfolio?.resumeLink || "",
    projects: Array.isArray(portfolio?.projects) && portfolio.projects.length
      ? portfolio.projects.map((project) => ({
        title: project?.title || "",
        summary: project?.summary || "",
        link: project?.link || "",
      }))
      : [createEmptyProject()],
  };
}

function mapFormToPayload(form) {
  return {
    headline: form.headline.trim(),
    bio: form.bio.trim(),
    experienceLevel: form.experienceLevel,
    skills: form.skills
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean),
    hourlyRateInr: form.hourlyRateInr.trim(),
    experienceYears: form.experienceYears.trim(),
    location: form.location.trim(),
    availability: form.availability.trim(),
    languages: form.languages
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean),
    resumeLink: form.resumeLink.trim(),
    projects: form.projects
      .map((project) => ({
        title: project.title.trim(),
        summary: project.summary.trim(),
        link: project.link.trim(),
      }))
      .filter((project) => project.title || project.summary || project.link),
  };
}

export default function PortfolioPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [updatedAt, setUpdatedAt] = useState("");
  const [form, setForm] = useState(() =>
    mapPortfolioToForm({
      availability: "Flexible",
      experienceLevel: "newbie",
      projects: [createEmptyProject()],
    }),
  );

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      setError("");
      try {
        const meResponse = await fetch(apiUrl("/api/auth/me"), requestOptions);
        const meData = await meResponse.json();
        const currentUser = meData.user || null;
        setUser(currentUser);

        if (!currentUser || currentUser.userType !== "freelancer") {
          return;
        }

        const portfolioResponse = await fetch(apiUrl("/api/portfolio"), requestOptions);
        const portfolioData = await portfolioResponse.json();
        if (!portfolioResponse.ok) {
          setError(portfolioData.error || "Unable to load portfolio.");
          return;
        }

        setForm(mapPortfolioToForm(portfolioData.portfolio || {}));
        setUpdatedAt(portfolioData.portfolio?.updatedAt || "");
      } catch {
        setError("Unable to load portfolio.");
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  function setField(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function setProjectField(index, key, value) {
    setForm((prev) => ({
      ...prev,
      projects: prev.projects.map((project, projectIndex) =>
        projectIndex === index ? { ...project, [key]: value } : project,
      ),
    }));
  }

  function addProject() {
    setForm((prev) => ({
      ...prev,
      projects: [...prev.projects, createEmptyProject()],
    }));
  }

  function removeProject(index) {
    setForm((prev) => {
      const nextProjects = prev.projects.filter((_, projectIndex) => projectIndex !== index);
      return {
        ...prev,
        projects: nextProjects.length ? nextProjects : [createEmptyProject()],
      };
    });
  }

  async function onSubmit(event) {
    event.preventDefault();
    setSaving(true);
    setError("");
    setMessage("");

    try {
      const payload = mapFormToPayload(form);
      const response = await fetch(apiUrl("/api/portfolio"), {
        ...requestOptions,
        method: "PUT",
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error || "Unable to save portfolio.");
        return;
      }

      setForm(mapPortfolioToForm(data.portfolio || {}));
      setUpdatedAt(data.portfolio?.updatedAt || "");
      setMessage("Portfolio saved successfully.");
    } catch {
      setError("Unable to save portfolio.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <p className="ui-muted text-sm">Loading portfolio...</p>;
  }

  if (!user) {
    return (
      <section className="ui-card p-6">
        <h1 className="ui-title text-xl">Login Required</h1>
        <p className="ui-muted mt-2 text-sm">Please login to create your photographer portfolio.</p>
        <Link href="/login" className="ui-link mt-4 inline-block text-sm">
          Go to Login
        </Link>
      </section>
    );
  }

  if (user.userType !== "freelancer") {
    return (
      <section className="ui-card p-6">
        <h1 className="ui-title text-xl">Not Allowed</h1>
        <p className="ui-muted mt-2 text-sm">Only photographer users can create and manage portfolios.</p>
        <Link href="/dashboard" className="ui-link mt-4 inline-block text-sm">
          Back to Dashboard
        </Link>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-5xl space-y-6">
      <div className="ui-card-strong p-6 md:p-8">
        <div className="flex items-start gap-3">
          <span
            className="inline-flex h-12 w-12 items-center justify-center rounded-full"
            style={{ background: "var(--accent)", color: "var(--foreground)" }}
          >
            <BriefcaseBusiness className="h-6 w-6" />
          </span>
          <div>
            <p className="rounded-md px-2 py-1 text-xs font-semibold text-black uppercase tracking-[0.18em]" style={{ background: "var(--accent)", color: "var(--foreground)", width: "fit-content" }}>
              Photographer Portfolio
            </p>
            <h1 className="ui-title mt-3 text-2xl md:text-4xl">Showcase your profile</h1>
            <p className="ui-muted mt-2 text-sm md:text-base">
              Share your photography style, availability, and past work. Newbies can add resume link, while professionals can showcase shoots.
            </p>
            {updatedAt ? (
              <p className="ui-muted mt-2 text-xs">Last updated: {new Date(updatedAt).toLocaleString()}</p>
            ) : null}
          </div>
        </div>
      </div>

      <form onSubmit={onSubmit} className="ui-card p-5 md:p-7 space-y-5">
        <div>
          <label className="ui-title mb-2 block text-sm">Photographer Headline</label>
          <input
            className="ui-input"
            value={form.headline}
            onChange={(event) => setField("headline", event.target.value)}
            placeholder="Example: Wedding & Portrait Photographer | Jaipur"
            required
          />
        </div>

        <div>
          <label className="ui-title mb-2 block text-sm">About Your Photography</label>
          <textarea
            className="ui-textarea min-h-40"
            value={form.bio}
            onChange={(event) => setField("bio", event.target.value)}
            placeholder="Mention your niche, shooting approach, turnaround time, and what clients can expect."
            required
          />
        </div>

        <div>
          <label className="ui-title mb-2 block text-sm">Experience Level</label>
          <select
            className="ui-select"
            value={form.experienceLevel}
            onChange={(event) => setField("experienceLevel", event.target.value)}
          >
            <option value="newbie">Newbie Photographer</option>
            <option value="professional">Professional Photographer</option>
          </select>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="ui-title mb-2 block text-sm">Photography Skills (comma separated)</label>
            <input
              className="ui-input"
              value={form.skills}
              onChange={(event) => setField("skills", event.target.value)}
              placeholder="Wedding, Portrait, Product, Lightroom, Retouching"
              required
            />
          </div>

          <div>
            <label className="ui-title mb-2 block text-sm">Languages (comma separated)</label>
            <input
              className="ui-input"
              value={form.languages}
              onChange={(event) => setField("languages", event.target.value)}
              placeholder="English, Hindi, Marathi"
            />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <label className="ui-title mb-2 flex items-center gap-2 text-sm">
              <span>Starting Rate (INR)</span>
              <span className="group relative inline-flex">
                <CircleHelp className="h-4 w-4 ui-muted" aria-hidden="true" />
                <span
                  role="tooltip"
                  className="pointer-events-none absolute left-1/2 top-full z-10 mt-2 w-64 -translate-x-1/2 rounded-lg border px-3 py-2 text-xs opacity-0 shadow-lg transition-opacity group-hover:opacity-100"
                  style={{ background: "var(--background)", borderColor: "var(--border)", color: "var(--foreground)" }}
                >
                  This is your minimum rate clients will see on your portfolio. Enter a starting price per hour (or your base
                  quote) in INR.
                </span>
              </span>
            </label>
            <input
              className="ui-input"
              value={form.hourlyRateInr}
              onChange={(event) => setField("hourlyRateInr", event.target.value)}
              placeholder="2000"
            />
          </div>

          <div>
            <label className="ui-title mb-2 block text-sm">Experience (Years)</label>
            <input
              className="ui-input"
              value={form.experienceYears}
              onChange={(event) => setField("experienceYears", event.target.value)}
              placeholder="4"
            />
          </div>

          <div>
            <label className="ui-title mb-2 block text-sm">Availability</label>
            <select
              className="ui-select"
              value={form.availability}
              onChange={(event) => setField("availability", event.target.value)}
            >
              <option value="Flexible">Flexible</option>
              <option value="Weekdays">Weekdays</option>
              <option value="Weekends">Weekends</option>
              <option value="Full Week">Full Week</option>
              <option value="By Booking">By Booking</option>
            </select>
          </div>
        </div>

        <div>
          <label className="ui-title mb-2 block text-sm">Service Area</label>
          <input
            className="ui-input"
            value={form.location}
            onChange={(event) => setField("location", event.target.value)}
            placeholder="City / State / Travel Availability"
          />
        </div>

        {form.experienceLevel === "newbie" ? (
          <div>
            <label className="ui-title mb-2 block text-sm">Resume Link (Required for Newbies)</label>
            <input
              className="ui-input"
              value={form.resumeLink}
              onChange={(event) => setField("resumeLink", event.target.value)}
              placeholder="https://drive.google.com/your-resume-link"
              required
            />
            <p className="ui-muted mt-2 text-xs">
              Upload your resume to Google Drive/Dropbox and paste a shareable link.
            </p>
          </div>
        ) : (
          <div>
            <label className="ui-title mb-2 block text-sm">Resume Link (Optional)</label>
            <input
              className="ui-input"
              value={form.resumeLink}
              onChange={(event) => setField("resumeLink", event.target.value)}
              placeholder="https://drive.google.com/your-resume-link"
            />
          </div>
        )}

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="ui-title text-lg">Work Showcase</h2>
            <button type="button" className="ui-btn-ghost inline-flex items-center gap-1 text-sm" onClick={addProject}>
              <Plus className="h-4 w-4" />
              Add Shoot
            </button>
          </div>

          <p className="ui-muted text-xs">
            {form.experienceLevel === "professional"
              ? "Professionals: add at least one completed shoot/work sample."
              : "Newbies: this is optional. You can start by sharing your resume above."}
          </p>

          {form.projects.map((project, index) => (
            <div key={`project-${index}`} className="rounded-2xl border p-4 space-y-3" style={{ borderColor: "color-mix(in srgb, var(--border) 24%, transparent)" }}>
              <div className="flex items-center justify-between gap-2">
                <p className="ui-title text-sm">Work Sample {index + 1}</p>
                <button
                  type="button"
                  className="ui-btn-ghost inline-flex items-center gap-1 text-xs"
                  onClick={() => removeProject(index)}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  Remove
                </button>
              </div>

              <input
                className="ui-input"
                value={project.title}
                onChange={(event) => setProjectField(index, "title", event.target.value)}
                placeholder="Shoot title (Example: Pre-wedding session in Jaipur)"
              />
              <textarea
                className="ui-textarea min-h-28"
                value={project.summary}
                onChange={(event) => setProjectField(index, "summary", event.target.value)}
                placeholder="What you delivered, client type, and highlights"
              />
              <input
                className="ui-input"
                value={project.link}
                onChange={(event) => setProjectField(index, "link", event.target.value)}
                placeholder="https://instagram.com/... or portfolio link"
              />
            </div>
          ))}
        </div>

        <button type="submit" disabled={saving} className="ui-btn inline-flex items-center gap-2">
          {saving ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            "Save Portfolio"
          )}
        </button>

        {message ? <p className="ui-alert-success text-sm">{message}</p> : null}
        {error ? <p className="ui-alert-error text-sm">{error}</p> : null}
      </form>
    </section>
  );
}
