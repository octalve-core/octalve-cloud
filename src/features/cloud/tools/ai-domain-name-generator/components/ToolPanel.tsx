"use client";

import Link from "next/link";
import {
  ArrowRight,
  BrainCircuit,
  Copy,
  Globe2,
  Lightbulb,
  RefreshCcw,
  Search,
  Sparkles,
  WandSparkles,
} from "lucide-react";
import { useMemo, useState } from "react";
import { cloudLinks } from "@/features/cloud/data/cloud-links";

type DomainIdea = {
  name: string;
  reason: string;
  angle: string;
};

const EXTENSIONS = [
  ".com",
  ".com.ng",
  ".ng",
  ".org",
  ".net",
  ".cloud",
  ".shop",
];

const STYLE_OPTIONS = [
  "Professional",
  "Modern",
  "Premium",
  "Friendly",
  "Tech",
  "Simple",
];

const EXAMPLES = [
  {
    business: "Octalve Foods",
    industry: "food delivery",
  },
  {
    business: "Grin Naturals",
    industry: "natural skincare",
  },
  {
    business: "Smart School Hub",
    industry: "school management software",
  },
];

function slugify(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "")
    .replace(/-+/g, "")
    .slice(0, 32);
}

function getStyleSuffixes(style: string) {
  if (style === "Modern") {
    return ["flow", "rise", "loop", "nova", "spark"];
  }

  if (style === "Premium") {
    return ["prime", "crest", "elite", "vault", "select"];
  }

  if (style === "Friendly") {
    return ["hub", "care", "mate", "easy", "plus"];
  }

  if (style === "Tech") {
    return ["cloud", "stack", "node", "labs", "grid"];
  }

  if (style === "Simple") {
    return ["online", "home", "base", "now", "go"];
  }

  return ["hq", "group", "works", "base", "suite"];
}

function generateIdeas(
  business: string,
  industry: string,
  extension: string,
  style: string,
): DomainIdea[] {
  const base = slugify(business) || "mybrand";
  const niche = slugify(industry) || "business";
  const suffixes = getStyleSuffixes(style);

  const rawIdeas: DomainIdea[] = [
    {
      name: `${base}${extension}`,
      angle: "Direct name",
      reason: "Clean, simple, and easy for customers to remember.",
    },
    {
      name: `${base}online${extension}`,
      angle: "Online presence",
      reason:
        "Good for a business that wants to look active and accessible online.",
    },
    {
      name: `${base}${niche}${extension}`,
      angle: "Industry match",
      reason: "Connects the brand name directly to the business category.",
    },
    {
      name: `get${base}${extension}`,
      angle: "Action-led",
      reason:
        "Useful for startups, service brands, apps, and conversion-focused businesses.",
    },
    {
      name: `try${base}${extension}`,
      angle: "Startup style",
      reason:
        "Short, modern, and suitable for product-led or SaaS-style brands.",
    },
    {
      name: `my${base}${extension}`,
      angle: "Customer-friendly",
      reason: "Feels personal and easy for users to connect with.",
    },
    ...suffixes.slice(0, 5).map((suffix) => ({
      name: `${base}${suffix}${extension}`,
      angle: "Brandable variation",
      reason: "A flexible name with room for future business expansion.",
    })),
  ];

  return Array.from(
    new Map(rawIdeas.map((idea) => [idea.name, idea])).values(),
  );
}

function buildDomainSearchUrl(domain: string) {
  const baseUrl = cloudLinks.console.replace(/\/$/, "");

  return `${baseUrl}/order/domain-search?domain=${encodeURIComponent(domain)}`;
}

export function ToolPanel() {
  const [business, setBusiness] = useState("Octalve Foods");
  const [industry, setIndustry] = useState("food delivery");
  const [extension, setExtension] = useState(".com");
  const [style, setStyle] = useState("Professional");
  const [copiedDomain, setCopiedDomain] = useState("");

  const ideas = useMemo(
    () => generateIdeas(business, industry, extension, style),
    [business, industry, extension, style],
  );

  async function copyDomain(domain: string) {
    try {
      await navigator.clipboard.writeText(domain);
      setCopiedDomain(domain);

      window.setTimeout(() => {
        setCopiedDomain("");
      }, 1500);
    } catch (error) {
      console.error("Copy domain error:", error);
    }
  }

  return (
    <section className="relative overflow-hidden bg-white px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute left-[-160px] top-[-160px] h-[360px] w-[360px] rounded-full bg-cloud-blue/10 blur-3xl" />
        <div className="absolute bottom-[-170px] right-[-170px] h-[420px] w-[420px] rounded-full bg-blue-100 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-cloud-blue/10 bg-blue-50 px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] text-cloud-blue">
            <BrainCircuit className="h-4 w-4" aria-hidden="true" />
            AI domain generator
          </div>

          <h2 className="mt-5 text-3xl font-medium tracking-[-0.05em] text-[#000A16] sm:text-4xl lg:text-5xl">
            Generate smart domain ideas for your business.
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
            Enter your business name, choose your category and style, then get
            clean domain ideas you can search and register through Octalve
            Cloud.
          </p>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-3 shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
            <div className="rounded-[1.7rem] border border-slate-200 bg-[#F8FAFC] p-5 sm:p-6">
              <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl bg-cloud-blue text-white shadow-[0_12px_28px_rgba(0,100,224,0.22)]">
                  <WandSparkles className="h-5 w-5" aria-hidden="true" />
                </div>

                <div>
                  <h3 className="text-2xl font-medium tracking-[-0.04em] text-slate-950">
                    Describe your idea
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-slate-500">
                    This panel currently generates smart local suggestions. It
                    can later connect to the live Octalve Console AI endpoint.
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <label className="block">
                  <span className="text-sm font-medium text-slate-700">
                    Business or idea name
                  </span>

                  <div className="mt-2 flex h-12 items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 transition focus-within:border-cloud-blue focus-within:ring-4 focus-within:ring-cloud-blue/10">
                    <Search
                      className="h-4 w-4 text-slate-400"
                      aria-hidden="true"
                    />
                    <input
                      value={business}
                      onChange={(event) => setBusiness(event.target.value)}
                      placeholder="Example: Octalve Foods"
                      className="h-full w-full bg-transparent text-sm font-medium text-slate-950 outline-none placeholder:text-slate-400"
                    />
                  </div>
                </label>

                <label className="block">
                  <span className="text-sm font-medium text-slate-700">
                    Industry or business category
                  </span>

                  <input
                    value={industry}
                    onChange={(event) => setIndustry(event.target.value)}
                    placeholder="Example: food delivery"
                    className="mt-2 h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-cloud-blue focus:ring-4 focus:ring-cloud-blue/10"
                  />
                </label>

                <label className="block">
                  <span className="text-sm font-medium text-slate-700">
                    Preferred extension
                  </span>

                  <select
                    value={extension}
                    onChange={(event) => setExtension(event.target.value)}
                    className="mt-2 h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-800 outline-none transition focus:border-cloud-blue focus:ring-4 focus:ring-cloud-blue/10"
                  >
                    {EXTENSIONS.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </label>

                <div>
                  <p className="text-sm font-medium text-slate-700">
                    Naming style
                  </p>

                  <div className="mt-2 flex flex-wrap gap-2">
                    {STYLE_OPTIONS.map((item) => {
                      const active = style === item;

                      return (
                        <button
                          key={item}
                          type="button"
                          onClick={() => setStyle(item)}
                          className={[
                            "rounded-full border px-4 py-2 text-xs font-medium transition",
                            active
                              ? "border-cloud-blue bg-blue-50 text-cloud-blue"
                              : "border-slate-200 bg-white text-slate-600 hover:border-cloud-blue/40 hover:bg-blue-50 hover:text-cloud-blue",
                          ].join(" ")}
                        >
                          {item}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4">
                  <div className="flex items-start gap-3">
                    <Lightbulb
                      className="mt-0.5 h-4 w-4 flex-shrink-0 text-cloud-blue"
                      aria-hidden="true"
                    />
                    <p className="text-sm leading-7 text-slate-600">
                      For better suggestions, use a clear business name and a
                      simple category like “skincare”, “real estate”,
                      “consulting”, “logistics”, or “online store”.
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {EXAMPLES.map((item) => (
                    <button
                      key={`${item.business}-${item.industry}`}
                      type="button"
                      onClick={() => {
                        setBusiness(item.business);
                        setIndustry(item.industry);
                      }}
                      className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-500 transition hover:border-cloud-blue/40 hover:bg-blue-50 hover:text-cloud-blue"
                    >
                      Try {item.business}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-[0_24px_80px_rgba(15,23,42,0.08)] sm:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl bg-cloud-blue/10 text-cloud-blue">
                  <Sparkles className="h-5 w-5" aria-hidden="true" />
                </div>

                <div>
                  <p className="text-sm font-medium uppercase tracking-[0.16em] text-cloud-blue">
                    Suggested names
                  </p>
                  <h3 className="mt-1 text-2xl font-medium tracking-[-0.04em] text-slate-950">
                    Domain ideas for your brand
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-slate-500">
                    Copy a name or continue to the console to search and
                    register it.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setBusiness((current) => current.trim() || "My Brand");
                  setIndustry((current) => current.trim() || "business");
                }}
                className="inline-flex h-10 items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-4 text-xs font-medium text-slate-600 transition hover:border-cloud-blue/40 hover:bg-blue-50 hover:text-cloud-blue"
              >
                <RefreshCcw className="h-4 w-4" aria-hidden="true" />
                Refresh
              </button>
            </div>

            <div className="mt-6 space-y-3">
              {ideas.map((idea) => (
                <div
                  key={idea.name}
                  className="group rounded-2xl border border-slate-200 bg-[#F8FAFC] p-4 transition hover:border-cloud-blue/40 hover:bg-white hover:shadow-[0_16px_45px_rgba(15,23,42,0.08)]"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <Globe2
                          className="h-4 w-4 text-cloud-blue"
                          aria-hidden="true"
                        />

                        <p className="break-all text-base font-medium text-slate-950 sm:text-lg">
                          {idea.name}
                        </p>

                        <span className="rounded-full bg-white px-2.5 py-1 text-[11px] font-medium text-slate-500 ring-1 ring-slate-200">
                          {idea.angle}
                        </span>
                      </div>

                      <p className="mt-2 text-sm leading-6 text-slate-500">
                        {idea.reason}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 sm:justify-end">
                      <button
                        type="button"
                        onClick={() => copyDomain(idea.name)}
                        className="inline-flex h-10 items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-4 text-xs font-medium text-slate-600 transition hover:border-cloud-blue/40 hover:text-cloud-blue"
                      >
                        <Copy className="h-4 w-4" aria-hidden="true" />
                        {copiedDomain === idea.name ? "Copied" : "Copy"}
                      </button>

                      <Link
                        href={buildDomainSearchUrl(idea.name)}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-cloud-blue px-4 text-xs font-medium text-white shadow-[0_12px_28px_rgba(0,100,224,0.18)] transition hover:-translate-y-0.5 hover:bg-blue-600"
                      >
                        Search
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-[1.5rem] border border-cloud-blue/15 bg-blue-50 p-5">
              <p className="text-sm font-medium text-slate-950">
                Want a stronger brand name?
              </p>
              <p className="mt-2 text-sm leading-7 text-slate-600">
                Octalve Cloud can help you choose the right domain, register it,
                connect DNS, set up SSL, create business email, and launch your
                website.
              </p>

              <Link
                href={cloudLinks.console}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex h-11 items-center justify-center gap-2 rounded-full bg-cloud-blue px-5 text-sm font-medium text-white shadow-[0_14px_34px_rgba(0,100,224,0.22)] transition hover:-translate-y-0.5 hover:bg-blue-600"
              >
                Open Console
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
