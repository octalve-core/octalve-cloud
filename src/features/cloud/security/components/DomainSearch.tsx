"use client";

import { Search } from "lucide-react";
import { useState } from "react";
import { cloudLinks } from "@/features/cloud/data/cloud-links";

export function DomainSearch() {
  const [domain, setDomain] = useState("");

  function submit() {
    const clean = domain
      .trim()
      .toLowerCase()
      .replace(/^https?:\/\//, "")
      .replace(/^www\./, "")
      .replace(/\/.*$/, "")
      .replace(/\s+/g, "");
    const target = clean
      ? `${cloudLinks.console}?domain=${encodeURIComponent(clean)}`
      : cloudLinks.console;
    window.location.assign(target);
  }

  return (
    <section className="bg-[#F8FAFC] px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_18px_70px_rgba(15,23,42,0.06)] sm:p-8">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cloud-blue">
            Domain Search
          </p>
          <h2 className="mt-4 text-3xl font-medium tracking-[-0.04em] text-slate-950 sm:text-4xl">
            Find the right name before someone else takes it.
          </h2>
        </div>
        <div className="mt-8 flex flex-col gap-3 rounded-[1.5rem] border border-slate-200 bg-[#F8FAFC] p-3 sm:flex-row">
          <div className="flex flex-1 items-center gap-3 rounded-2xl bg-white px-4">
            <Search className="h-5 w-5 text-slate-400" />
            <input
              value={domain}
              onChange={(event) => setDomain(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  submit();
                }
              }}
              placeholder="yourbusiness.com"
              className="h-12 w-full bg-transparent text-sm outline-none placeholder:text-slate-400 sm:text-base"
            />
          </div>
          <button
            onClick={submit}
            className="h-12 rounded-full bg-cloud-blue px-7 text-sm font-semibold text-white transition hover:bg-blue-600"
          >
            Search
          </button>
        </div>
      </div>
    </section>
  );
}
