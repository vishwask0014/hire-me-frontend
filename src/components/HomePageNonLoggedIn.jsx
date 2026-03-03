"use client";

import Link from "next/link";

const services = [
  {
    title: "Photographer Onboarding",
    description: "Newbie and professional photographers can create profiles in minutes with availability and pricing.",
  },
  {
    title: "Client Matching",
    description: "Hirers can filter by style, budget, and location to discover the right photographer quickly.",
  },
  {
    title: "Live Collaboration",
    description: "Built-in chat keeps shoot requirements, timelines, and updates in one place.",
  },
  {
    title: "Portfolio + Resume",
    description: "Professionals can showcase work samples, while newbies can share resume links to start getting clients.",
  },
];

const processSteps = [
  "Create account as hirer or photographer",
  "Photographer sets availability and portfolio/resume",
  "Hirer posts shoot requirement and starts chat",
  "Confirm booking and track active work from dashboard",
];

const testimonials = [
  {
    name: "Rohan Mehta",
    role: "Startup Founder",
    text: "We hired a photographer for our launch event in one day because availability and portfolio were clear.",
  },
  {
    name: "Aisha Khan",
    role: "Newbie Photographer",
    text: "I shared my resume and sample shots, got my first client, and now I manage bookings from one dashboard.",
  },
];

export default function HomePageNonLoggedIn() {
  return (
    <section className="space-y-8">
      <div className="ui-card-strong p-6 md:p-10">
        <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-center">
          <div>
            <p className="ui-link text-xs uppercase tracking-[0.2em]">HireMe</p>
            <h1 className="ui-title mt-3 text-3xl leading-tight md:text-5xl">
              A modern workspace for hirers and photographers
            </h1>
            <p className="ui-muted mt-4 max-w-xl text-sm md:text-base">
              Hire photographers based on availability and style. Photographers can share work samples or resume and get discovered faster.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/signup" className="ui-btn">
                Get Started
              </Link>
              <Link href="/login" className="ui-btn-ghost">
                Login
              </Link>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-1">
            <article className="ui-card p-4">
              <p className="ui-muted text-xs uppercase tracking-[0.14em]">Role Based</p>
              <p className="ui-title mt-1 text-lg">Hirer + Photographer</p>
            </article>
            <article className="ui-card p-4">
              <p className="ui-muted text-xs uppercase tracking-[0.14em]">Communication</p>
              <p className="ui-title mt-1 text-lg">Shoot-first Chat</p>
            </article>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <p className="ui-link text-xs uppercase tracking-[0.18em]">Services</p>
        <div className="grid gap-4 sm:grid-cols-2">
          {services.map((item) => (
            <article key={item.title} className="ui-card p-5">
              <h2 className="ui-title text-lg">{item.title}</h2>
              <p className="ui-muted mt-2 text-sm">{item.description}</p>
            </article>
          ))}
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="ui-card p-6">
          <p className="ui-link text-xs uppercase tracking-[0.18em]">Working Process</p>
          <ol className="mt-4 space-y-3">
            {processSteps.map((step, idx) => (
              <li key={step} className="flex items-start gap-3">
                <span className="ui-chip mt-0.5">{String(idx + 1).padStart(2, "0")}</span>
                <p className="ui-muted text-sm">{step}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className="ui-card p-6">
          <p className="ui-link text-xs uppercase tracking-[0.18em]">Testimonials</p>
          <div className="mt-4 space-y-3">
            {testimonials.map((item) => (
              <article key={item.name} className="ui-card p-4">
                <p className="ui-muted text-sm">&ldquo;{item.text}&rdquo;</p>
                <p className="ui-title mt-3 text-sm">{item.name}</p>
                <p className="ui-muted text-xs">{item.role}</p>
              </article>
            ))}
          </div>
        </div>
      </div>

      <div className="ui-card-strong p-6 md:p-8">
        <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <h2 className="ui-title text-2xl">Need help with your next project?</h2>
            <p className="ui-muted mt-2 text-sm">Sign up and start booking photographers or getting your first photography clients today.</p>
          </div>
          <Link href="/signup" className="ui-btn w-fit">
            Create Account
          </Link>
        </div>
      </div>
    </section>
  );
}
