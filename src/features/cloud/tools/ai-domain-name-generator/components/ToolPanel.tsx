"use client";

import Link from "next/link";
import { ArrowRight, WandSparkles } from "lucide-react";
import { useMemo, useState } from "react";
import { cloudLinks } from "@/features/cloud/data/cloud-links";

type DomainIdea = {
  name: string;
  reason: string;
};

function slugify(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "")
    .replace(/-+/g, "");
}

function generateIdeas(business: string, industry: string, extension: string): DomainIdea[] {
  const base = slugify(business) || "mybrand";
  const niche = slugify(industry) || "cloud";

  const prefixes = ["get", "try", "use", "go", "my"];
  const suffixes = ["hub", "base", "stack", "hq", "online", "cloud", "works"];

  return [
    { name: `${base}${extension}`, reason: "Clean, direct and easy to remember." },
    { name: `${base}online${extension}`, reason: "Good for a business that wants a clear online presence." },
    { name: `${base}${niche}${extension}`, reason: "Connects the brand name to the business category." },
    ...prefixes.slice(0, 3).map((prefix) => ({
      name: `${prefix}${base}${extension}`,
      reason: "Short action-style name suitable for a modern startup.",
    })),
    ...suffixes.slice(0, 4).map((suffix) => ({
      name: `${base}${suffix}${extension}`,
      reason: "Brandable variation with room for future growth.",
    })),
  ];
}

export function ToolPanel() {
  const [business, setBusiness] = useState("Octalve Foods");
  const [industry, setIndustry] = useState("food delivery");
  const [extension, setExtension] = useState(".com");

  const ideas = useMemo(
    () => generateIdeas(business, industry, extension),
    [business, industry, extension],
  );

  return (
    <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div className="rounded-[2rem] border border-slate-200 bg-[#F8FAFC] p-6 shadow-sm">
          <h2 className="text-2xl font-medium tracking-[-0.03em] text-slate-950">
            Describe your idea
          </h2>
          <p className="mt-3 text-sm leading-7 text-slate-500">
            Edit the inputs below. Later, this panel can call the live Octalve Console AI endpoint.
          </p>

          <div className="mt-6 space-y-4">
            <label className="block">
              <span className="text-sm font-medium text-slate-700">Business or idea name</span>
              <input
                value={business}
                onChange={(event) => setBusiness(event.target.value)}
                className="mt-2 h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm outline-none transition focus:border-cloud-blue"
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-slate-700">Industry</span>
              <input
                value={industry}
                onChange={(event) => setIndustry(event.target.value)}
                className="mt-2 h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm outline-none transition focus:border-cloud-blue"
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-slate-700">Preferred extension</span>
              <select
                value={extension}
                onChange={(event) => setExtension(event.target.value)}
                className="mt-2 h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm outline-none transition focus:border-cloud-blue"
              >
                <option value=".com">.com</option>
                <option value=".com.ng">.com.ng</option>
                <option value=".ng">.ng</option>
                <option value=".org">.org</option>
                <option value=".net">.net</option>
              </select>
            </label>
          </div>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_20px_70px_rgba(15,23,42,0.06)]">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cloud-blue/10 text-cloud-blue">
              <WandSparkles className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-slate-950">Suggested names</h2>
              <p className="text-sm text-slate-500">Click search to continue to domain registration later.</p>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            {ideas.map((idea) => (
              <div key={idea.name} className="rounded-2xl border border-slate-200 bg-[#F8FAFC] p-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-base font-semibold text-slate-950">{idea.name}</p>
                    <p className="mt-1 text-sm leading-6 text-slate-500">{idea.reason}</p>
                  </div>
                  <Link
                    href={`${cloudLinks.console}/order/domain-search?domain=${encodeURIComponent(idea.name)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-cloud-blue px-4 py-2 text-sm font-semibold text-white"
                  >
                    Search
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
