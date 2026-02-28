"use client";

import Link from "next/link";
import { useState } from "react";
import { Plus, Minus, Mail, MapPin, Phone, Menu, X } from "lucide-react";

const LIME = "#A7FF20";

const navLinks = [
  { href: "#features", label: "Features" },
  { href: "#pricing", label: "Pricing" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#contact", label: "Contact" },
  { href: "#about", label: "About Us" },
];

const brands = ["Metafor", "Zenith", "Fusion", "Ryders", "EMD"];

const services = [
  { title: "SEO Optimization", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", variant: "white" },
  { title: "Brand Identity", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", variant: "lime" },
  { title: "Web Design", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", variant: "dark" },
  { title: "Content Creation", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", variant: "dark" },
  { title: "Social Media", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", variant: "lime" },
  { title: "Email Marketing", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", variant: "dark" },
];

const pricingPlans = [
  { name: "Starter", features: ["Feature one", "Feature two", "Feature three"], price: "$99", highlighted: false },
  { name: "Professional", features: ["Feature one", "Feature two", "Feature three", "Feature four"], price: "$199", highlighted: true },
  { name: "Enterprise", features: ["Feature one", "Feature two", "Feature three", "Feature four", "Feature five"], price: "$399", highlighted: false },
];

const howItWorksSteps = [
  { id: 1, title: "Discovery", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
  { id: 2, title: "Strategy Development", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
  { id: 3, title: "Implementation", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
  { id: 4, title: "Optimization", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
  { id: 5, title: "Reporting", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
  { id: 6, title: "Support", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
];

const teamMembers = [
  { name: "John Doe", role: "Founder & CEO", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
  { name: "Jane Smith", role: "Creative Director", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
  { name: "Mike Johnson", role: "Lead Developer", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
  { name: "Sarah Williams", role: "Marketing Head", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
  { name: "David Brown", role: "Design Lead", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
  { name: "Emily Davis", role: "Client Success", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
];

const quickLinks = [
  { href: "#about", label: "About Us" },
  { href: "#features", label: "Services" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#pricing", label: "Pricing" },
  { href: "#contact", label: "Contact" },
];

function PlaceholderImage({ className = "", label = "Image" }) {
  return (
    <div
      className={`flex items-center justify-center bg-neutral-700/50 text-neutral-500 text-sm ${className}`}
      aria-label={label}
    >
      {label}
    </div>
  );
}

export default function HomePageMain() {
  const [expandedStep, setExpandedStep] = useState(1);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className="min-h-screen w-full bg-[#0f0f0f] text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0f0f0f]/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6 lg:px-8">
          <Link href="/" className="text-xl font-bold tracking-tight">
            HireMe
          </Link>
          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <a key={link.label} href={link.href} className="text-sm font-medium text-white/90 hover:text-[#A7FF20] transition-colors">
                {link.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="hidden rounded-lg border border-white/20 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors md:inline-block"
            >
              Login
            </Link>
            <button
              type="button"
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
              className="rounded-lg p-2 text-white hover:bg-white/10 md:hidden"
              aria-label="Toggle menu"
            >
              {mobileNavOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
        {mobileNavOpen && (
          <div className="border-t border-white/10 px-4 py-4 md:hidden">
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileNavOpen(false)}
                  className="text-sm font-medium text-white/90 hover:text-[#A7FF20] transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <Link
                href="/login"
                onClick={() => setMobileNavOpen(false)}
                className="rounded-lg border border-white/20 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
              >
                Login
              </Link>
            </nav>
          </div>
        )}
      </header>

      {/* Hero */}
      <section className="relative">
        <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-20 lg:px-8 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 lg:items-center">
            <div>
              <h1 className="text-3xl font-bold leading-tight md:text-4xl lg:text-5xl xl:text-6xl">
                Navigating the digital landscape for success
              </h1>
              <p className="mt-4 max-w-xl text-base text-white/80 md:text-lg">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <Link
                href="/signup"
                className="mt-8 inline-block rounded-lg bg-[#1a1a1a] px-8 py-4 text-base font-semibold text-white hover:bg-[#252525] transition-colors"
              >
                GET STARTED
              </Link>
            </div>
            <div className="relative aspect-square max-w-lg lg:max-w-none">
              <PlaceholderImage className="h-full w-full rounded-2xl" label="Hero illustration" />
            </div>
          </div>
        </div>
      </section>

      {/* Brands */}
      <section className="border-y border-white/10 py-8">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-8 px-4 md:px-6 lg:px-8">
          {brands.map((brand) => (
            <span key={brand} className="text-lg font-medium text-white/60">
              {brand}
            </span>
          ))}
        </div>
      </section>

      {/* Our Services */}
      <section id="features" className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wider" style={{ color: LIME }}>
            Our Services
          </p>
          <p className="mt-2 max-w-2xl text-white/80">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((item) => (
              <article
                key={item.title}
                className={`rounded-2xl p-6 ${
                  item.variant === "lime"
                    ? "bg-[#A7FF20] text-[#0f0f0f]"
                    : item.variant === "white"
                    ? "bg-white text-[#0f0f0f]"
                    : "bg-[#1a1a1a] text-white"
                }`}
              >
                <h3 className="text-lg font-bold">{item.title}</h3>
                {item.variant !== "lime" && (
                  <div className="mt-2 h-1 w-12 rounded-full bg-[#A7FF20]" />
                )}
                <p className="mt-4 text-sm opacity-80">{item.desc}</p>
                <div className="mt-6">
                  <PlaceholderImage className="h-12 w-12 rounded-lg" label="Icon" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Mid CTA */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <div className="grid gap-10 rounded-2xl bg-[#1a1a1a] p-8 md:grid-cols-2 md:gap-16 md:p-12 lg:items-center">
            <div>
              <h2 className="text-2xl font-bold md:text-3xl">
                Ready to ignite your brand&apos;s growth?
              </h2>
              <p className="mt-4 text-white/80">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <Link
                href="/signup"
                className="mt-6 inline-block rounded-lg bg-[#0f0f0f] px-8 py-4 text-base font-semibold text-white hover:bg-[#252525] transition-colors"
              >
                Start Today
              </Link>
            </div>
            <div className="relative aspect-video">
              <PlaceholderImage className="h-full w-full rounded-xl" label="CTA graphic" />
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wider" style={{ color: LIME }}>
            Pricing Plans
          </p>
          <p className="mt-2 max-w-2xl text-white/80">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {pricingPlans.map((plan) => (
              <article
                key={plan.name}
                className={`rounded-2xl p-6 ${
                  plan.highlighted
                    ? "relative z-10 border-2 bg-[#1a1a1a] shadow-xl"
                    : "bg-[#1a1a1a]/80"
                }`}
                style={plan.highlighted ? { borderColor: LIME } : {}}
              >
                <h3 className="text-xl font-bold">{plan.name}</h3>
                <ul className="mt-6 space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-white/80">
                      <span className="text-[#A7FF20]">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-2xl font-bold">{plan.price}</p>
                <Link
                  href="/signup"
                  className="mt-4 block w-full rounded-lg bg-[#0f0f0f] py-3 text-center text-sm font-semibold text-white hover:bg-[#252525] transition-colors"
                >
                  Choose Plan
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wider" style={{ color: LIME }}>
            How it Works
          </p>
          <p className="mt-2 max-w-2xl text-white/80">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
          <div className="mt-10 space-y-2">
            {howItWorksSteps.map((step) => {
              const isExpanded = expandedStep === step.id;
              return (
                <div
                  key={step.id}
                  className={`rounded-xl transition-colors ${
                    isExpanded ? "bg-[#A7FF20] text-[#0f0f0f]" : "bg-white/5 text-white"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setExpandedStep(isExpanded ? 0 : step.id)}
                    className="flex w-full items-center justify-between px-6 py-4 text-left"
                  >
                    <span className="font-semibold">
                      {String(step.id).padStart(2, "0")}. {step.title}
                    </span>
                    {isExpanded ? (
                      <Minus className="h-5 w-5 shrink-0" />
                    ) : (
                      <Plus className="h-5 w-5 shrink-0" />
                    )}
                  </button>
                  {isExpanded && (
                    <div className="border-t border-[#0f0f0f]/20 px-6 py-4">
                      <p className="text-sm opacity-90">{step.desc}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Meet Our Team */}
      <section id="about" className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wider" style={{ color: LIME }}>
            Meet Our Team
          </p>
          <p className="mt-2 max-w-2xl text-white/80">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {teamMembers.map((member) => (
              <article key={member.name} className="rounded-2xl bg-[#1a1a1a] p-6">
                <PlaceholderImage className="mx-auto h-24 w-24 rounded-full" label="Avatar" />
                <h3 className="mt-4 text-lg font-bold">{member.name}</h3>
                <p className="text-sm" style={{ color: LIME }}>
                  {member.role}
                </p>
                <p className="mt-2 text-sm text-white/70">{member.desc}</p>
                <div className="mt-4 flex gap-3">
                  {[1, 2, 3].map((i) => (
                    <PlaceholderImage key={i} className="h-8 w-8 rounded" label="Social" />
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wider" style={{ color: LIME }}>
            Testimonials
          </p>
          <p className="mt-2 max-w-2xl text-white/80">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
          <div className="mt-10 rounded-2xl bg-[#1a1a1a] p-8 md:p-12">
            <blockquote className="text-xl font-medium md:text-2xl">
              &ldquo;Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.&rdquo;
            </blockquote>
            <div className="mt-8 flex items-center gap-4">
              <PlaceholderImage className="h-14 w-14 rounded-full" label="Client" />
              <div>
                <p className="font-semibold">Jane Smith</p>
                <p className="text-sm text-white/70">CEO, Company Name</p>
              </div>
            </div>
            <div className="mt-6 flex gap-2">
              {[1, 2, 3].map((i) => (
                <span
                  key={i}
                  className={`h-2 w-2 rounded-full ${i === 1 ? "bg-[#A7FF20]" : "bg-white/30"}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wider" style={{ color: LIME }}>
            Contact Us
          </p>
          <p className="mt-2 max-w-2xl text-white/80">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
          <div className="mt-10 rounded-2xl bg-white p-6 text-[#0f0f0f] md:p-10">
            <div className="grid gap-6 lg:grid-cols-[1fr_auto]">
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full rounded-lg border border-neutral-200 px-4 py-3 text-[#0f0f0f] placeholder:text-neutral-500 focus:border-[#A7FF20] focus:outline-none focus:ring-2 focus:ring-[#A7FF20]/30"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full rounded-lg border border-neutral-200 px-4 py-3 text-[#0f0f0f] placeholder:text-neutral-500 focus:border-[#A7FF20] focus:outline-none focus:ring-2 focus:ring-[#A7FF20]/30"
                />
                <input
                  type="text"
                  placeholder="Subject"
                  className="w-full rounded-lg border border-neutral-200 px-4 py-3 text-[#0f0f0f] placeholder:text-neutral-500 focus:border-[#A7FF20] focus:outline-none focus:ring-2 focus:ring-[#A7FF20]/30"
                />
                <textarea
                  placeholder="Message"
                  rows={5}
                  className="w-full rounded-lg border border-neutral-200 px-4 py-3 text-[#0f0f0f] placeholder:text-neutral-500 focus:border-[#A7FF20] focus:outline-none focus:ring-2 focus:ring-[#A7FF20]/30 resize-none"
                />
                <button
                  type="submit"
                  className="w-full rounded-lg bg-[#0f0f0f] py-3.5 font-semibold text-white hover:bg-[#252525] transition-colors md:w-auto md:px-8"
                >
                  Send Message
                </button>
              </form>
              <div className="hidden lg:block">
                <PlaceholderImage className="h-64 w-48 rounded-xl" label="Contact graphic" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <Link href="/" className="text-xl font-bold">
                HireMe
              </Link>
              <p className="mt-4 text-sm text-white/60">
                © {new Date().getFullYear()} HireMe. All rights reserved.
              </p>
              <div className="mt-4 space-y-2 text-sm text-white/70">
                <p className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 shrink-0" />
                  123 Street, City, Country
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="h-4 w-4 shrink-0" />
                  +1 234 567 890
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="h-4 w-4 shrink-0" />
                  contact@hireme.com
                </p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold">Quick Links</h4>
              <ul className="mt-4 space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-sm text-white/70 hover:text-[#A7FF20] transition-colors">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-2">
              <h4 className="font-semibold">Newsletter</h4>
              <p className="mt-2 text-sm text-white/70">
                Subscribe for updates and news.
              </p>
              <div className="mt-4 flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 rounded-lg border border-white/20 bg-white/5 px-4 py-3 text-white placeholder:text-white/50 focus:border-[#A7FF20] focus:outline-none focus:ring-2 focus:ring-[#A7FF20]/30"
                />
                <button
                  type="button"
                  className="rounded-lg px-6 py-3 font-semibold text-[#0f0f0f] transition-opacity hover:opacity-90"
                  style={{ background: LIME }}
                >
                  Subscribe
                </button>
              </div>
              <div className="mt-4 flex gap-3">
                {[1, 2, 3, 4].map((i) => (
                  <PlaceholderImage key={i} className="h-10 w-10 rounded-lg" label="Social" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
