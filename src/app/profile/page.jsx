"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Loader2, UserCircle2 } from "lucide-react";
import { apiUrl, requestOptions } from "@/lib/api-client";
import { useAuthStore } from "@/stores/authStore";

export default function ProfilePage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function loadProfile() {
      setLoading(true);
      setError("");
      try {
        const response = await fetch(apiUrl("/api/auth/me"), requestOptions);
        const data = await response.json();
        if (!response.ok || !data.user) {
          setUser(null);
          return;
        }
        setUser(data.user);
        setName(data.user.name || "");
        setPhone(data.user.phone || "");
      } catch {
        setError("Unable to load profile.");
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, []);

  async function onSubmit(event) {
    event.preventDefault();
    setSaving(true);
    setError("");
    setMessage("");

    try {
      const response = await fetch(apiUrl("/api/auth/profile"), {
        ...requestOptions,
        method: "PUT",
        body: JSON.stringify({ name, phone }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error || "Unable to update profile.");
        return;
      }
      setUser(data.user);
      setMessage("Profile updated successfully.");
      await useAuthStore.getState().checkAuth();
    } catch {
      setError("Unable to update profile.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <p className="ui-muted text-sm">Loading profile...</p>;
  }

  if (!user) {
    return (
      <section className="ui-card p-6">
        <h1 className="ui-title text-xl">Login Required</h1>
        <p className="ui-muted mt-2 text-sm">Please login to access profile settings.</p>
        <Link href="/login" className="ui-link mt-4 inline-block text-sm">
          Go to Login
        </Link>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-3xl space-y-6">
      <div className="ui-card-strong p-6 md:p-8">
        <div className="mb-5 flex items-center gap-3">
          <span
            className="inline-flex h-12 w-12 items-center justify-center rounded-full"
            style={{ background: "var(--accent)", color: "var(--foreground)" }}
          >
            <UserCircle2 className="h-6 w-6" />
          </span>
          <div>
            <h1 className="ui-title text-2xl md:text-3xl">Profile Settings</h1>
            <p className="ui-muted mt-1 text-sm">Update your account information.</p>
          </div>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="ui-title mb-2 block text-sm">Full name</label>
            <input
              className="ui-input"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Your full name"
              required
            />
          </div>

          <div>
            <label className="ui-title mb-2 block text-sm">Phone</label>
            <input
              className="ui-input"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              placeholder="Your phone number"
              required
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="ui-title mb-2 block text-sm">Email</label>
              <input className="ui-input ui-muted" value={user.email || ""} disabled />
            </div>
            <div>
              <label className="ui-title mb-2 block text-sm">Role</label>
              <input className="ui-input ui-muted capitalize" value={user.userType || ""} disabled />
            </div>
          </div>

          <button type="submit" disabled={saving} className="ui-btn inline-flex items-center gap-2">
            {saving ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </button>
        </form>

        {message ? <p className="ui-alert-success mt-4 text-sm">{message}</p> : null}
        {error ? <p className="ui-alert-error mt-4 text-sm">{error}</p> : null}
      </div>
    </section>
  );
}

