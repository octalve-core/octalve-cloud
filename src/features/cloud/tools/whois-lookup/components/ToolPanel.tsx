"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { runToolApi } from "@/features/cloud/tools/api/tools-api";

type WhoisResult = {
  domain: string;
  status: string;
  registrar: string;
  note: string;
};

function normalizeDomain(value: string) {
  return value.trim().toLowerCase().replace(/^https?:\/\//, "").replace(/^www\./, "").replace(/\/.*$/, "");
}

export function ToolPanel() {
  const [domain, setDomain] = useState("example.com");
  const [result, setResult] = useState<WhoisResult | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function lookup() {
    const clean = normalizeDomain(domain);
    setLoading(true);
    const response = await runToolApi<{ domain: string }, WhoisResult>(
      "/whois-lookup",
      { domain: clean },
      {
        domain: clean,
        status: "Backend pending",
        registrar: "Connect RDAP/WHOIS provider",
        note: "The frontend is ready. Connect console.octalve.cloud/api/tools/whois-lookup to return live registry data.",
      },
    );
    setResult(response.data);
    setMessage(response.message ?? null);
    setLoading(false);
  }

  return (
    <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_20px_70px_rgba(15,23,42,0.06)] sm:p-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="flex min-h-12 flex-1 items-center gap-3 rounded-2xl bg-[#F8FAFC] px-4 ring-1 ring-slate-200">
            <Search className="h-5 w-5 text-slate-400" />
            <input value={domain} onChange={(event) => setDomain(event.target.value)} className="w-full bg-transparent outline-none" />
          </div>
          <button type="button" onClick={lookup} className="min-h-12 rounded-full bg-cloud-blue px-6 text-sm font-semibold text-white">
            {loading ? "Checking..." : "Lookup WHOIS"}
          </button>
        </div>

        {message ? <p className="mt-4 text-sm text-amber-600">{message}</p> : null}

        {result ? (
          <div className="mt-6 grid gap-4 rounded-2xl bg-[#F8FAFC] p-5 ring-1 ring-slate-200 sm:grid-cols-2">
            <div><p className="text-xs uppercase tracking-[0.16em] text-slate-400">Domain</p><p className="mt-1 font-semibold text-slate-950">{result.domain}</p></div>
            <div><p className="text-xs uppercase tracking-[0.16em] text-slate-400">Status</p><p className="mt-1 font-semibold text-slate-950">{result.status}</p></div>
            <div><p className="text-xs uppercase tracking-[0.16em] text-slate-400">Registrar</p><p className="mt-1 font-semibold text-slate-950">{result.registrar}</p></div>
            <div><p className="text-xs uppercase tracking-[0.16em] text-slate-400">Note</p><p className="mt-1 text-sm leading-6 text-slate-600">{result.note}</p></div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
