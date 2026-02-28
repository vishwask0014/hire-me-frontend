"use client";

import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-lg font-bold text-slate-900">
          HireMe
        </Link>
        <div className="flex items-center gap-4 text-sm">
          <Link
            href="/requirements/new"
            className="rounded bg-slate-900 px-3 py-2 font-medium text-white"
          >
            Post Requirement
          </Link>
          <Link href="/signup" className="text-slate-700 hover:text-slate-950">
            Signup
          </Link>
          <Link href="/login" className="text-slate-700 hover:text-slate-950">
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}
