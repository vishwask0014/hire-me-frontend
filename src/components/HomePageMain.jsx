"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Linkedin, Mail, MapPin, Menu, Minus, Moon, Phone, Plus, Sun, X } from "lucide-react";
import { useAuthStore } from "@/stores/authStore";

const LIME = "#B9FF66";

const navLinks = [
  { href: "#about", label: "About us" },
  { href: "#services", label: "Services" },
  { href: "#cases", label: "Use Cases" },
  { href: "#pricing", label: "Pricing" },
  { href: "#blog", label: "Blog" },
];

const brands = ["amazon", "dribbble", "hubspot", "notion", "netflix", "zoom"];

const services = [
  { titleTop: "Search Engine", titleBottom: "Optimization", image: "/images/service-analytics.png", tone: "light" },
  { titleTop: "Pay-per-click", titleBottom: "Advertising", image: "/images/service-email.png", tone: "lime" },
  { titleTop: "Social Media", titleBottom: "Marketing", image: "/images/service-social.png", tone: "dark" },
  { titleTop: "Email", titleBottom: "Marketing", image: "/images/service-content.png", tone: "light" },
  { titleTop: "Content", titleBottom: "Creation", image: "/images/service-brand.png", tone: "lime" },
  { titleTop: "Analytics and", titleBottom: "Tracking", image: "/images/service-seo.png", tone: "dark" },
];

const pricingPlans = [
  { name: "Basic", price: "$49/mo", points: ["1 project", "Email support", "Basic analytics"], featured: false },
  { name: "Pro", price: "$99/mo", points: ["5 projects", "Priority support", "Advanced analytics"], featured: true },
  { name: "Enterprise", price: "$199/mo", points: ["Unlimited projects", "Dedicated success manager", "Custom workflows"], featured: false },
];

const processSteps = [
  { id: 1, title: "Consultation", desc: "During the initial consultation, we discuss your business goals, target audience, and current marketing efforts. This helps us understand your needs and tailor a strategy that aligns with your objectives." },
  { id: 2, title: "Research and Strategy Development", desc: "We analyze your market, audience behavior, and competitors, then build a practical strategy with channels, messaging, and measurable KPIs." },
  { id: 3, title: "Implementation", desc: "Our team executes the agreed plan across selected channels, ensuring consistent quality, timeline visibility, and alignment with your brand voice." },
  { id: 4, title: "Monitoring and Optimization", desc: "We continuously monitor campaign performance, identify bottlenecks, and optimize creatives, targeting, and budget allocation to improve outcomes." },
  { id: 5, title: "Reporting and Communication", desc: "You receive regular reports with clear metrics, progress summaries, and next steps, supported by open communication for fast decisions." },
  { id: 6, title: "Continual Improvement", desc: "Based on data and feedback, we refine strategy iteratively to maintain momentum and drive long-term, compounding growth." },
];

const team = [
  { name: "John Smith", role: "CEO and Founder", desc: "10+ years of experience in digital marketing. Expertise in SEO, PPC, and content strategy." },
  { name: "Jane Doe", role: "Director of Operations", desc: "7+ years of experience in project management and team leadership. Strong in process and delivery execution." },
  { name: "Michael Brown", role: "Senior SEO Specialist", desc: "5+ years of experience in SEO and content creation. Proven record in organic growth and rankings." },
  { name: "Emily Johnson", role: "PPC Manager", desc: "3+ years of experience in paid search advertising. Skilled in campaign optimization and ROI improvement." },
  { name: "Brian Williams", role: "Social Media Specialist", desc: "4+ years of experience in social media marketing. Strong at audience growth and engagement." },
  { name: "Sarah Kim", role: "Content Creator", desc: "2+ years of experience in writing and editing. Creates clear, high-performing brand content." },
];

const testimonials = [
  {
    quote:
      "We have been working with Positivus for the past year and have seen a significant increase in website traffic and inbound leads as a result of their strategic SEO and PPC efforts.",
    name: "John Smith",
    role: "Marketing Director at XYZ Corp",
  },
  {
    quote:
      "Their strategic approach transformed our pipeline. We now have predictable lead flow, better conversion quality, and clear visibility into campaign performance every month.",
    name: "Ava Martinez",
    role: "Head of Growth at Northstar Tech",
  },
  {
    quote:
      "The team is responsive, data-driven, and focused on outcomes. Reporting is clear and actionable, making collaboration simple for both leadership and execution teams.",
    name: "Liam Carter",
    role: "CMO at Brightline Commerce",
  },
  {
    quote:
      "From content planning to paid media optimization, every milestone was delivered on time. We improved acquisition efficiency without compromising lead quality.",
    name: "Nora Wilson",
    role: "Demand Gen Lead at Atlasware",
  },
  {
    quote:
      "What stood out most was communication. We always knew what was working, what needed adjustment, and what next step would create the biggest impact.",
    name: "Daniel Reed",
    role: "Founder at Elevate Studio",
  },
];

function SectionHeader({ title, desc }) {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-8">
      <div className="inline-flex w-fit rounded-md px-2 py-1" style={{ background: LIME }}>
        <h2 className="text-2xl font-medium leading-tight text-[#191A23] md:text-[40px]">{title}</h2>
      </div>
      <p className="max-w-xl text-base leading-6 ui-muted">{desc}</p>
    </div>
  );
}

export default function HomePageMain() {
  const { isAuthenticated } = useAuthStore();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expanded, setExpanded] = useState(1);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return "light";
    const savedTheme = localStorage.getItem("hireme-theme");
    if (savedTheme === "dark" || savedTheme === "light") return savedTheme;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("hireme-theme", theme);
  }, [theme]);

  const isDark = theme === "dark";
  const darkPanel = isDark ? "#1f2635" : "#191A23";
  const softPanel = isDark ? "var(--surface-2)" : "#F3F3F3";
  const textSoft = isDark ? "color-mix(in srgb, #ffffff 82%, transparent)" : "rgba(0,0,0,0.8)";
  const primaryCtaBg = isDark ? LIME : darkPanel;
  const primaryCtaText = isDark ? "#191A23" : "#ffffff";

  const outlineBtn = "rounded-[12px] border px-4 py-2 text-sm leading-6 transition-colors";
  const outlineBtnStyle = {
    borderColor: "var(--border)",
    color: "var(--foreground)",
    background: "var(--surface)",
  };

  const activeTestimonial = testimonials[testimonialIndex];

  function prevTestimonial() {
    setTestimonialIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }

  function nextTestimonial() {
    setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
  }

  function getWrappedIndex(base, offset) {
    return (base + offset + testimonials.length) % testimonials.length;
  }

  return (
    <div className="min-h-screen" style={{ fontFamily: "\"Space Grotesk\", \"Segoe UI\", Arial, sans-serif", background: "var(--background)", color: "var(--foreground)" }}>
      <header className="sticky top-0 z-50 border-b backdrop-blur-sm" style={{ borderColor: "color-mix(in srgb, var(--border) 16%, transparent)", background: "color-mix(in srgb, var(--background) 92%, transparent)" }}>
        <div className="mx-auto flex w-full max-w-[1240px] items-center justify-between px-4 py-4 md:px-6">
          <Link href="/" className="text-2xl font-semibold">HireMe</Link>
          <nav className="hidden items-center gap-4 md:flex">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="text-sm leading-6 md:text-base" style={{ color: "color-mix(in srgb, var(--foreground) 84%, transparent)" }}>
                {link.label}
              </a>
            ))}
            {isAuthenticated ? (
              <Link href="/dashboard" className={outlineBtn} style={outlineBtnStyle}>Dashboard</Link>
            ) : (
              <>
                <Link href="/login" className={outlineBtn} style={outlineBtnStyle}>Login</Link>
                <Link href="/signup" className={outlineBtn} style={outlineBtnStyle}>Signup</Link>
              </>
            )}
            <button type="button" onClick={() => setTheme((prev) => (prev === "dark" ? "light" : "dark"))} className="inline-flex items-center gap-1 rounded-[12px] border px-3 py-2 text-sm leading-6 transition-colors" style={outlineBtnStyle}>
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              {theme === "dark" ? "Light" : "Dark"}
            </button>
          </nav>
          <button type="button" className="rounded-lg p-2 md:hidden" onClick={() => setMobileOpen((v) => !v)} aria-label="Toggle menu">
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
        {mobileOpen ? (
          <div className="ui-fade-slide-in border-t px-4 py-4 md:hidden" style={{ borderColor: "color-mix(in srgb, var(--border) 16%, transparent)" }}>
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <a key={link.href} href={link.href} className="text-base" style={{ color: "color-mix(in srgb, var(--foreground) 84%, transparent)" }} onClick={() => setMobileOpen(false)}>
                  {link.label}
                </a>
              ))}
              {isAuthenticated ? <Link href="/dashboard" className="mt-2 rounded-xl border px-4 py-2 text-center" style={outlineBtnStyle}>Dashboard</Link> : null}
              {!isAuthenticated ? (
                <>
                  <Link href="/login" className="mt-2 rounded-xl border px-4 py-2 text-center" style={outlineBtnStyle}>
                    Login
                  </Link>
                  <Link href="/signup" className="mt-2 rounded-xl border px-4 py-2 text-center" style={outlineBtnStyle}>
                    Signup
                  </Link>
                </>
              ) : null}
              <button type="button" onClick={() => setTheme((prev) => (prev === "dark" ? "light" : "dark"))} className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl border px-4 py-2 text-center" style={outlineBtnStyle}>
                {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                {theme === "dark" ? "Light theme" : "Dark theme"}
              </button>
            </div>
          </div>
        ) : null}
      </header>

      <main className="mx-auto w-full max-w-[1240px] space-y-16 px-4 py-8 md:space-y-24 md:px-6 md:py-16">
        <section className="grid items-center gap-8 md:gap-10 lg:grid-cols-[1fr_0.95fr] lg:gap-4">
          <div>
            <h1 className="max-w-[530px] text-[36px] font-medium leading-[1.06] md:text-[52px] md:leading-[1.05] lg:text-[60px] lg:leading-[1.06]">Navigating the digital landscape for success</h1>
            <p className="mt-5 max-w-[498px] text-[17px] leading-7 md:mt-7 md:text-[20px] md:leading-7" style={{ color: textSoft }}>
              Our hiring workspace helps businesses find the right freelancers, discuss details faster, and move from requirement to accepted work with clarity.
            </p>
            <div className="mt-7 flex flex-wrap gap-3 md:mt-9">
              <Link href="/signup" className="rounded-[14px] px-6 py-4 text-[17px] leading-6 md:px-8 md:py-[19px] md:text-[20px] md:leading-7" style={{ background: primaryCtaBg, color: primaryCtaText }}>Book a consultation</Link>
              <Link href="/login" className="rounded-[14px] border px-6 py-4 text-[17px] leading-6 md:px-8 md:py-[19px] md:text-[20px] md:leading-7" style={outlineBtnStyle}>Login</Link>
            </div>
          </div>
          <div className="relative mx-auto aspect-[1.12] w-full max-w-[600px] lg:max-w-[610px]">
            <Image src="/images/hero-illustration.png" alt="Hero illustration" fill className="object-contain" priority />
          </div>
        </section>

        <section className="flex flex-wrap items-center justify-between gap-6 text-2xl font-semibold md:text-[38px]" style={{ color: isDark ? "color-mix(in srgb, #ffffff 45%, transparent)" : "rgba(0,0,0,0.45)" }}>
          {brands.map((b) => <span key={b}>{b}</span>)}
        </section>

        <section id="services" className="space-y-8 md:space-y-10">
          <SectionHeader title="Services" desc="At our digital platform, we provide focused workflows to help hirers and freelancers collaborate effectively." />
          <div className="grid gap-5 md:gap-10 md:grid-cols-2">
            {services.map((s) => {
              const dark = s.tone === "dark";
              const lime = s.tone === "lime";
              const chipBg = dark ? LIME : lime ? "#FFFFFF" : LIME;
              const chipColor = "#191A23";
              return (
                <article
                  key={`${s.titleTop}-${s.titleBottom}`}
                  className="flex min-h-[255px] items-center justify-between gap-4 rounded-[28px] border p-5 md:min-h-[310px] md:gap-7 md:rounded-[45px] md:p-[50px]"
                  style={{ background: dark ? darkPanel : lime ? LIME : softPanel, color: dark ? "#fff" : lime ? "#191A23" : "var(--foreground)", borderColor: "var(--border)", boxShadow: "var(--card-shadow)" }}
                >
                  <div className="max-w-[245px] space-y-6 md:max-w-[221px] md:space-y-8">
                    <h3 className="space-y-1 text-[24px] font-medium leading-[1.08] md:text-[30px] md:leading-[1.2]">
                      <span className="inline-block rounded-[7px] px-2 py-0.5" style={{ background: chipBg, color: chipColor }}>
                        {s.titleTop}
                      </span>
                      <br />
                      <span className="inline-block rounded-[7px] px-2 py-0.5" style={{ background: chipBg, color: chipColor }}>
                        {s.titleBottom}
                      </span>
                    </h3>
                    <span className="inline-flex items-center gap-3 text-[16px] font-medium md:text-[20px]">
                      <span className="inline-flex h-[41px] w-[41px] items-center justify-center">
                        <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                          <circle cx="20.5" cy="20.5" r="20.5" fill="#191A23" />
                          <path d="M11.25 24.701C10.5326 25.1152 10.2867 26.0326 10.701 26.75C11.1152 27.4674 12.0326 27.7133 12.75 27.299L11.25 24.701ZM30.7694 16.3882C30.9838 15.588 30.5089 14.7655 29.7087 14.5511L16.6687 11.0571C15.8685 10.8426 15.046 11.3175 14.8316 12.1177C14.6172 12.9179 15.0921 13.7404 15.8923 13.9548L27.4834 17.0607L24.3776 28.6518C24.1631 29.452 24.638 30.2745 25.4382 30.4889C26.2384 30.7033 27.0609 30.2284 27.2753 29.4282L30.7694 16.3882ZM12.75 27.299L30.0705 17.299L28.5705 14.701L11.25 24.701L12.75 27.299Z" fill="#B9FF66" />
                        </svg>
                      </span>
                      Learn more
                    </span>
                  </div>
                  <Image
                    src={s.image}
                    alt={`${s.titleTop} ${s.titleBottom}`}
                    width={210}
                    height={170}
                    className="h-auto w-[124px] object-contain sm:w-[145px] md:w-[210px]"
                  />
                </article>
              );
            })}
          </div>
        </section>

        <section id="pricing" className="space-y-8 md:space-y-10">
          <SectionHeader title="Pricing" desc="Flexible plans to match your hiring and collaboration needs." />
          <div className="grid gap-5 md:gap-6 md:grid-cols-3">
            {pricingPlans.map((plan) => (
              <article key={plan.name} className="rounded-[24px] border p-5 md:rounded-[30px] md:p-7" style={{ background: plan.featured ? LIME : softPanel, color: plan.featured ? "#191A23" : "var(--foreground)", borderColor: "var(--border)", boxShadow: "var(--card-shadow)" }}>
                <h3 className="text-[24px] font-medium md:text-[28px]">{plan.name}</h3>
                <p className="mt-2 text-[26px] font-semibold md:text-[30px]">{plan.price}</p>
                <ul className="mt-5 space-y-2 text-base" style={{ color: plan.featured ? "rgba(25,26,35,0.82)" : textSoft }}>
                  {plan.points.map((p) => (
                    <li key={p} className="flex items-center gap-2">
                      <span>{"\u2713"}</span>
                      {p}
                    </li>
                  ))}
                </ul>
                <button className="mt-6 w-full rounded-[12px] px-6 py-3.5 text-base md:rounded-[14px] md:py-4 md:text-lg" style={{ background: primaryCtaBg, color: primaryCtaText }}>Choose Plan</button>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-[28px] p-5 md:rounded-[45px] md:p-10" style={{ background: softPanel }}>
          <div className="grid items-center gap-8 md:grid-cols-[1fr_auto]">
            <div>
              <h3 className="text-[26px] font-medium md:text-[30px]">Let&apos;s make things happen</h3>
              <p className="mt-3 max-w-xl text-[16px] md:mt-4 md:text-[18px]" style={{ color: textSoft }}>
                Contact us today to learn more about how our digital marketing services can help your business grow and succeed online.
              </p>
              <Link href="/signup" className="mt-5 inline-block rounded-[12px] px-6 py-3.5 text-[16px] md:mt-6 md:rounded-[14px] md:px-8 md:py-5 md:text-[20px]" style={{ background: primaryCtaBg, color: primaryCtaText }}>
                Get your free proposal
              </Link>
            </div>
            <Image src="/images/cta-stars.png" alt="Decorative stars" width={494} height={395} className="mx-auto h-auto w-full max-w-[360px]" />
          </div>
        </section>

        <section id="cases" className="space-y-8 md:space-y-10">
          <SectionHeader title="Case Studies" desc="Explore real-life examples of our proven digital marketing success through our case studies." />
          <div className="rounded-[30px] px-6 py-8 text-white md:rounded-[45px] md:px-[60px] md:py-[88px]" style={{ background: darkPanel }}>
            <div className="grid gap-8 md:grid-cols-3 md:gap-0">
              {[
                "For a local restaurant, we implemented a targeted PPC campaign that resulted in a 50% increase in website traffic and a 25% increase in sales.",
                "For a B2B software company, we developed an SEO strategy that resulted in a first page ranking for key keywords and a 200% increase in organic traffic.",
                "For a national retail chain, we created a social media marketing campaign that increased followers by 25% and generated a 20% increase in online sales.",
              ].map((text) => (
                <article key={text} className="flex flex-col border-white/30  md:border-r md:px-8 md:first:pl-0 md:last:border-r-0 md:last:pr-0">
                  <p className="max-w-[286px] text-[16px] leading-[1.55] md:text-[18px] md:leading-[1.45]" style={{ color: "color-mix(in srgb, #ffffff 78%, transparent)" }}>
                    {text}
                  </p>
                  <a href="#contact" className="mt-6 inline-flex items-center gap-2 text-[18px] leading-7 md:text-[20px]" style={{ color: LIME }}>
                    Learn more <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0.75 13.6956C0.0325611 14.1098 -0.213252 15.0272 0.200962 15.7446C0.615175 16.4621 1.53256 16.7079 2.25 16.2937L0.75 13.6956ZM20.2694 5.38286C20.4838 4.58266 20.0089 3.76015 19.2087 3.54574L6.16874 0.051683C5.36854 -0.16273 4.54603 0.312144 4.33162 1.11234C4.11721 1.91254 4.59208 2.73505 5.39228 2.94946L16.9834 6.05529L13.8776 17.6464C13.6631 18.4466 14.138 19.2691 14.9382 19.4835C15.7384 19.6979 16.5609 19.2231 16.7753 18.4229L20.2694 5.38286ZM2.25 16.2937L19.5705 6.29367L18.0705 3.69559L0.75 13.6956L2.25 16.2937Z" fill="#B9FF66" />
                    </svg>

                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="process" className="space-y-8 md:space-y-10">
          <SectionHeader title="Our Working Process" desc="Step-by-step guide to achieving your business goals." />
          <div className="space-y-5">
            {processSteps.map((step) => {
              const isOpen = expanded === step.id;
              return (
                <article key={step.id} className="rounded-[22px] border md:rounded-[30px]" style={{ background: isOpen ? LIME : softPanel, color: isOpen ? "#191A23" : "var(--foreground)", borderColor: "var(--border)", boxShadow: "var(--card-shadow)" }}>
                  <button type="button" className="flex w-full items-center justify-between px-4 py-4 text-left md:px-[60px] md:py-[38px]" onClick={() => setExpanded(isOpen ? 0 : step.id)}>
                    <span className="inline-flex items-center gap-3 md:gap-6">
                      <span className="text-[30px] font-medium leading-none md:text-[60px]">{String(step.id).padStart(2, "0")}</span>
                      <span className="text-[18px] font-medium leading-7 md:text-[30px] md:leading-[1.2]">{step.title}</span>
                    </span>
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border md:h-[58px] md:w-[58px]" style={{ borderColor: "color-mix(in srgb, var(--border) 70%, transparent)", background: isOpen ? "#F3F3F3" : "var(--surface)" }}>
                      {isOpen ? <Minus className="h-5 w-5 md:h-6 md:w-6" /> : <Plus className="h-5 w-5 md:h-6 md:w-6" />}
                    </span>
                  </button>
                  {isOpen ? (
                    <div className="ui-expand-in border-t px-4 pb-5 pt-5 md:px-[60px] md:pb-10 md:pt-8" style={{ borderColor: "color-mix(in srgb, var(--border) 35%, transparent)" }}>
                      <p className="max-w-[1020px] text-[16px] leading-7 md:text-[18px] md:leading-[1.65]" style={{ color: "rgba(25,26,35,0.82)" }}>{step.desc}</p>
                    </div>
                  ) : null}
                </article>
              );
            })}
          </div>
        </section>

        <section id="about" className="space-y-8 md:space-y-10">
          <SectionHeader title="Team" desc="Meet the skilled and experienced team behind our successful digital marketing strategies." />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {team.map((m) => (
              <article key={m.name} className="rounded-[22px] border p-5 md:rounded-[30px] md:p-6" style={{ background: "var(--surface)", borderColor: "var(--border)", boxShadow: "var(--card-shadow)" }}>
                <div className="flex items-start justify-between gap-4">
                  <Image src="/images/team-avatar.png" alt={m.name} width={96} height={96} className="h-20 w-20 rounded-full object-cover" />
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full" style={{ background: "#191A23", color: "#ffffff" }}>
                    <Linkedin className="h-4 w-4" />
                  </span>
                </div>
                <div className="mt-3">
                  <div>
                    <h3 className="text-[18px] font-medium md:text-[20px]">{m.name}</h3>
                    <p className="text-[15px] md:text-[18px]" style={{ color: textSoft }}>{m.role}</p>
                  </div>
                </div>
                <p className="mt-4 border-t pt-4 text-[15px] md:text-[18px]" style={{ borderColor: "color-mix(in srgb, var(--border) 20%, transparent)", color: textSoft }}>{m.desc}</p>
              </article>
            ))}
          </div>
          <div className="flex justify-end">
            <button className="rounded-[12px] px-6 py-3.5 text-base md:rounded-[14px] md:px-8 md:py-4 md:text-lg" style={{ background: primaryCtaBg, color: primaryCtaText }}>See all team</button>
          </div>
        </section>

        <section id="testimonials" className="space-y-8 md:space-y-10">
          <SectionHeader title="Testimonials" desc="Hear from our satisfied clients: read our testimonials to learn more about our digital marketing services." />
          <div className="rounded-[30px] px-5 py-8 text-white md:rounded-[45px] md:px-[70px] md:py-[84px]" style={{ background: darkPanel }}>
            <div className="mx-auto w-full max-w-[1100px]">
              <p className="mb-6 text-sm uppercase tracking-[0.2em] md:mb-8" style={{ color: "color-mix(in srgb, #ffffff 62%, transparent)" }}>
                Client Success Stories
              </p>
              <div className="relative min-h-[290px] md:min-h-[360px]">
                <div className="md:hidden">
                  <blockquote
                    className="relative rounded-[28px] border px-6 py-7 text-[16px] leading-[1.7]"
                    style={{ borderColor: LIME, color: "color-mix(in srgb, #ffffff 88%, transparent)" }}
                  >
                    &ldquo;{activeTestimonial.quote}&rdquo;
                    <span
                      className="absolute -bottom-[13px] left-10 h-6 w-6 rotate-45 border-b border-r"
                      style={{ borderColor: LIME, background: darkPanel }}
                    />
                  </blockquote>
                </div>

                <div className="relative hidden h-full overflow-hidden md:block">
                  {[-1, 0, 1].map((offset) => {
                    const idx = getWrappedIndex(testimonialIndex, offset);
                    const item = testimonials[idx];
                    const isCenter = offset === 0;
                    const left =
                      offset === -1
                        ? "-7%"
                        : offset === 0
                          ? "50%"
                          : "107%";

                    return (
                      <blockquote
                        key={`${item.name}-${offset}`}
                        className="absolute top-2 w-[72%] rounded-[45px] border px-11 py-10 text-[18px] leading-[1.7] transition-all duration-300"
                        style={{
                          left,
                          transform: isCenter ? "translateX(-50%) scale(1)" : "translateX(-50%) scale(0.95)",
                          borderColor: isCenter ? LIME : "color-mix(in srgb, #ffffff 32%, transparent)",
                          color: isCenter
                            ? "color-mix(in srgb, #ffffff 88%, transparent)"
                            : "color-mix(in srgb, #ffffff 60%, transparent)",
                          opacity: isCenter ? 1 : 0.6,
                          zIndex: isCenter ? 2 : 1,
                        }}
                      >
                        &ldquo;{item.quote}&rdquo;
                        <span
                          className="absolute -bottom-[13px] left-14 h-6 w-6 rotate-45 border-b border-r"
                          style={{ borderColor: isCenter ? LIME : "color-mix(in srgb, #ffffff 32%, transparent)", background: darkPanel }}
                        />
                      </blockquote>
                    );
                  })}
                </div>
              </div>

              <div className="ml-8 mt-8 md:ml-16">
                <p className="text-[18px] font-medium md:text-[20px]" style={{ color: LIME }}>
                  {activeTestimonial.name}
                </p>
                <p className="mt-1 text-sm md:text-base" style={{ color: "color-mix(in srgb, #ffffff 75%, transparent)" }}>
                  {activeTestimonial.role}
                </p>
              </div>

              <div className="mt-10 flex items-center justify-center gap-8 md:mt-12 md:gap-12">
                <button
                  type="button"
                  onClick={prevTestimonial}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full transition-opacity hover:opacity-90"
                  style={{ color: "#ffffff" }}
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>

                <div className="flex items-center gap-3 md:gap-4">
                  {testimonials.map((item, idx) => (
                    <button
                      key={item.name}
                      type="button"
                      onClick={() => setTestimonialIndex(idx)}
                      className="inline-flex h-5 w-5 items-center justify-center transition-transform"
                      style={{ transform: idx === testimonialIndex ? "scale(1.08)" : "scale(1)" }}
                      aria-label={`Go to testimonial ${idx + 1}`}
                    >
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                        <path
                          d="M10 1.5L12.4 7.1L18.5 7.7L13.9 11.7L15.3 17.6L10 14.4L4.7 17.6L6.1 11.7L1.5 7.7L7.6 7.1L10 1.5Z"
                          fill={idx === testimonialIndex ? LIME : "transparent"}
                          stroke={idx === testimonialIndex ? LIME : "rgba(255,255,255,0.55)"}
                          strokeWidth="1.5"
                        />
                      </svg>
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={nextTestimonial}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full transition-opacity hover:opacity-90"
                  style={{ color: "#ffffff" }}
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="space-y-8 md:space-y-10">
          <SectionHeader title="Contact Us" desc="Connect with us: let's discuss your digital marketing needs." />
          <div className="rounded-[28px] p-5 md:rounded-[45px] md:p-10" style={{ background: softPanel }}>
            <div className="grid gap-8 lg:grid-cols-[1fr_auto]">
              <form className="space-y-4">
                <div className="flex items-center gap-6 pb-1">
                  <label className="inline-flex items-center gap-2 text-sm">
                    <input type="radio" name="contactType" defaultChecked className="h-4 w-4 accent-[#191A23]" />
                    Say Hi
                  </label>
                  <label className="inline-flex items-center gap-2 text-sm">
                    <input type="radio" name="contactType" className="h-4 w-4 accent-[#191A23]" />
                    Get a Quote
                  </label>
                </div>
                <input className="w-full rounded-[12px] border px-4 py-3 text-[16px] md:rounded-[14px] md:px-5 md:py-4 md:text-[18px]" style={outlineBtnStyle} placeholder="Name" />
                <input className="w-full rounded-[12px] border px-4 py-3 text-[16px] md:rounded-[14px] md:px-5 md:py-4 md:text-[18px]" style={outlineBtnStyle} placeholder="Email*" />
                <textarea className="h-40 w-full rounded-[12px] border px-4 py-3 text-[16px] md:h-44 md:rounded-[14px] md:px-5 md:py-4 md:text-[18px]" style={outlineBtnStyle} placeholder="Message*" />
                <button className="w-full rounded-[12px] px-8 py-4 text-[16px] md:rounded-[14px] md:py-5 md:text-[20px]" style={{ background: primaryCtaBg, color: primaryCtaText }}>Send Message</button>
              </form>
              <div className="hidden items-center lg:flex">
                <Image src="/images/contact-graphic.png" alt="Contact graphic" width={692} height={649} className="h-auto w-[280px]" />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer id="blog" className="rounded-t-[28px] text-white md:rounded-t-[45px]" style={{ background: darkPanel }}>
        <div className="mx-auto grid w-full max-w-[1240px] gap-10 px-4 py-10 md:grid-cols-2 md:px-6 md:py-12">
          <div>
            <h3 className="text-2xl font-semibold">HireMe</h3>
            <p className="mt-4 inline-block rounded-md px-2 py-1 text-sm font-medium text-[#191A23]" style={{ background: LIME }}>Contact us:</p>
            <p className="mt-4 text-sm" style={{ color: "color-mix(in srgb, #ffffff 70%, transparent)" }}>
              {"\u00A9"} {new Date().getFullYear()} HireMe. All Rights Reserved.
            </p>
            <div className="mt-4 space-y-2 text-sm" style={{ color: "color-mix(in srgb, #ffffff 80%, transparent)" }}>
              <p className="flex items-center gap-2">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full text-black" style={{ background: LIME }}>
                  <Mail className="h-3.5 w-3.5" />
                </span>
                info@hireme.com
              </p>
              <p className="flex items-center gap-2">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full text-black" style={{ background: LIME }}>
                  <Phone className="h-3.5 w-3.5" />
                </span>
                555-567-8901
              </p>
              <p className="flex items-center gap-2">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full text-black" style={{ background: LIME }}>
                  <MapPin className="h-3.5 w-3.5" />
                </span>
                1234 Main St, Moonstone City
              </p>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-medium">Quick Links</h4>
            <div className="mt-3 flex flex-wrap gap-3">
              {[
                { label: "About us", href: "#about" },
                { label: "Services", href: "#services" },
                { label: "Use Cases", href: "#cases" },
                { label: "Pricing", href: "#pricing" },
                { label: "Contact", href: "#contact" },
              ].map((item) => (
                <a key={item.label} href={item.href} className="text-sm underline">{item.label}</a>
              ))}
            </div>
            <div className="mt-6 flex gap-3">
              <input className="w-full rounded-xl border bg-transparent px-4 py-3 text-sm placeholder:text-white/60" style={{ borderColor: "color-mix(in srgb, #ffffff 30%, transparent)", color: "#ffffff" }} placeholder="Email" />
              <button className="rounded-xl px-5 py-3 text-sm font-medium" style={{ background: LIME, color: "#191A23" }}>Subscribe</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
