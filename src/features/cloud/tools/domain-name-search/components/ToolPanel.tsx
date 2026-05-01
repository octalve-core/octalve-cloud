"use client";

import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";
import { useState } from "react";
import { cloudLinks } from "@/features/cloud/data/cloud-links";

function normalizeDomain(value: string) {
  return value.trim().toLowerCase().replace(/^https?:\/\//, "").replace(/^www\./, "").replace(/\/.*$/, "").replace(/\s+/g, "");
}

export function ToolPanel() {
  const [domain, setDomain] = useState("octalvecloud.com");
  const cleanDomain = normalizeDomain(domain);
  const orderHref = `${cloudLinks.console}/order/domain-search?domain=${encodeURIComponent(cleanDomain)}`;

  return (
    <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_20px_70px_rgba(15,23,42,0.06)] sm:p-8">
        <label className="block">
          <span className="text-sm font-semibold uppercase tracking-[0.16em] text-cloud-blue">Domain</span>
          <div className="mt-3 flex flex-col gap-3 rounded-[1.5rem] border border-slate-200 bg-[#F8FAFC] p-3 sm:flex-row sm:items-center">
            <div className="flex min-h-12 flex-1 items-center gap-3 rounded-2xl bg-white px-4 ring-1 ring-slate-100">
              <Search className="h-5 w-5 text-slate-400" />
              <input
                value={domain}
                onChange={(event) => setDomain(event.target.value)}
                className="w-full bg-transparent text-base outline-none placeholder:text-slate-400"
                placeholder="example.com"
              />
            </div>
            <Link
              href={orderHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-cloud-blue px-6 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(0,100,224,0.18)]"
            >
              Search domain
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </label>

        <div className="mt-6 rounded-2xl bg-blue-50 p-5 text-sm leading-7 text-slate-600 ring-1 ring-blue-100">
          <strong className="text-slate-950">Prepared search:</strong> {cleanDomain || "Enter a domain"}. Real availability checking will be handled by the Octalve Cloud console backend/registrar integration.
        </div>
      </div>
    </section>
  );
}
