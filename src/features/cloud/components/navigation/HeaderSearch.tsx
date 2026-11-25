"use client";

import Link from "next/link";
import { Search } from "lucide-react";
import { useRef, useState } from "react";
import { headerGroups } from "@/features/cloud/data/header-groups";

const searchable = [
  ...headerGroups.flatMap(group => group.links.filter(link => link.href.startsWith("/"))),
  { label: "AI Domain Name Generator", href: "/tools/ai-domain-name-generator" },
  { label: "Compare Domain Sellers", href: "/tools/compare-domain-sellers" },
  { label: "Malware & Hack Checker", href: "/tools/malware-scan" },
  { label: "Privacy Policy Generator", href: "/tools/privacy-policy-generator" },
  { label: "Terms of Service Generator", href: "/tools/terms-of-service-generator" },
];

export function HeaderSearch({ mode, open, onOpenChange, onNavigate }: {
  mode: "desktop" | "mobile";
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onNavigate: () => void;
}) {
  const [query, setQuery] = useState("");
  const input = useRef<HTMLInputElement>(null);
  const id = `header-search-${mode}`;
  const words = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  const results = words.length ? searchable.filter(item => words.every(word => (item.label + " " + item.href).toLowerCase().includes(word))).slice(0, 7) : searchable.slice(0, 5);

  return (
    <div className="relative" role="search" aria-label="Search public website"
      onBlurCapture={event => {
        if (event.relatedTarget && !event.currentTarget.contains(event.relatedTarget as Node)) onOpenChange(false);
      }}
      onKeyDown={event => {
        if (event.key === "Escape" && open) {
          event.preventDefault();
          input.current?.focus();
          onOpenChange(false);
        }
      }}>
      <label htmlFor={id} className="sr-only">Search services and tools</label>
      <div className="flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#E1E4EA] px-3 focus-within:ring-2 focus-within:ring-cloud-blue">
        <Search size={18} strokeWidth={1.7} className="shrink-0 text-slate-600" aria-hidden="true" />
        <input ref={input} id={id} type="search" value={query} placeholder="Search" autoComplete="off"
          aria-controls={id + "-results"}
          onFocus={() => onOpenChange(true)}
          onClick={() => onOpenChange(true)}
          onChange={event => { setQuery(event.target.value); onOpenChange(true); }}
          className="w-full min-w-0 border-0 bg-transparent p-0 text-sm font-normal text-cloud-navy placeholder:text-slate-600 focus:ring-0 focus:outline-none" />
      </div>
      <div id={id + "-results"} hidden={!open}
        className={mode === "desktop" ? "absolute left-0 top-full z-50 mt-2 w-full min-w-[240px] rounded-xl border border-slate-200 bg-white p-2 shadow-soft" : "mt-2 rounded-xl border border-slate-200 bg-white p-2"}>
        <p className="px-3 py-2 text-xs text-slate-500" aria-live="polite">{words.length ? `${results.length} matching pages` : "Explore services"}</p>
        <ul>
          {results.map(item => <li key={item.href}><Link href={item.href} onClick={() => { setQuery(""); onNavigate(); }} className="block rounded-lg px-3 py-2.5 text-sm text-cloud-navy hover:bg-cloud-mist focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cloud-blue">{item.label}</Link></li>)}
        </ul>
        {!results.length && <p className="px-3 pb-2 text-sm text-slate-600">No matching pages. Try hosting, domains or email.</p>}
      </div>
    </div>
  );
}
