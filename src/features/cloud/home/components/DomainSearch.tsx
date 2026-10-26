"use client";

import {
  ArrowRight,
  ChevronDown,
  Loader2,
  Search,
  Sparkles,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { cloudLinks } from "@/features/cloud/data/cloud-links";
import {
  getDomainSuggestions,
  type DomainSuggestion,
} from "@/lib/domain-pricing-adapter";

const BRAND = {
  bg: "#000000",
};

const TLD_MARQUEE = [
  ".com",
  ".net",
  ".cloud",
  ".ai",
  ".shop",
  ".org",
  ".co",
  ".africa",
  ".com.ng",
  ".ng",
  ".com",
  ".net",
  ".cloud",
  ".ai",
  ".shop",
  ".org",
  ".co",
  ".africa",
  ".com.ng",
  ".ng",
];

type PricingTab = "popular" | "business" | "new";

type TldCard = {
  tld: string;
  price: string;
  note: string;
};

const DOMAIN_PRICE_GROUPS: Record<PricingTab, TldCard[]> = {popular:[],business:[],new:[]};

/**
 * LIVE BACKEND / ADAPTER INSTRUCTION
 * ----------------------------------
 * For now, DOMAIN_PRICE_GROUPS is local fallback pricing.
 *
 * When the Octalve Cloud backend adapter is ready, keep this UI and connect
 * pricing/suggestions through:
 *
 * src/lib/domain-pricing-adapter.ts
 *
 * Expected bridge flow:
 *
 * Frontend DomainSearch.tsx
 * → src/lib/domain-pricing-adapter.ts
 * → console.octalve.cloud/api/domains/search
 * → Registrar / WHOIS / pricing adapter
 * → Return live domain suggestions, availability, and prices.
 *
 * This keeps the public website static-export safe and lets the backend carry
 * live domain pricing, availability checks, and order routing.
 */

function normalizeDomain(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .replace(/\/.*$/, "")
    .replace(/\s+/g, "")
    .replace(/[^a-z0-9.-]/g, "");
}

function buildConsoleDomainUrl(domain: string) {
  const separator = cloudLinks.console.includes("?") ? "&" : "?";

  return `${cloudLinks.console}${separator}domain=${encodeURIComponent(
    domain,
  )}`;
}

function buildOrderDomainUrl(domain: string) {
  return `/tools/domain-name-search/?domain=${encodeURIComponent(domain)}`;
}

export function DomainSearch() {
  const [domain, setDomain] = useState("");
  const [liveGroups,setLiveGroups] = useState(DOMAIN_PRICE_GROUPS);
  useEffect(()=>{let active=true;fetch("https://api.cloud.octalve.com/api/storefront/domains/prices/",{credentials:"omit",cache:"no-store"})
    .then(r=>{if(!r.ok)throw Error("prices");return r.json()})
    .then((data:{tlds?:{tld:string;registration_price:string}[]})=>{if(!active)return;
      const list=(data.tlds||[]).filter(t=>Number(t.registration_price)>0).map(t=>({tld:t.tld,price:new Intl.NumberFormat("en-NG",{style:"currency",currency:"NGN",maximumFractionDigits:0}).format(Number(t.registration_price)),note:"/year"}));
      setLiveGroups({popular:list.slice(0,5),business:list.slice(5,10),new:list.slice(10,15)});
    }).catch(()=>{});return()=>{active=false};},[]);
  const [activeTab, setActiveTab] = useState<PricingTab>("popular");
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [suggestionsOpen, setSuggestionsOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<DomainSuggestion[]>([]);

  const activePrices = useMemo(
    () => liveGroups[activeTab],
    [activeTab,liveGroups],
  );

  async function handleSearch() {
    const clean = normalizeDomain(domain);

    if (!clean) {
      window.location.assign(cloudLinks.console);
      return;
    }

    setIsSearching(true);
    setHasSearched(true);
    setSuggestionsOpen(true);

    try {
      const results = await getDomainSuggestions({
        query: clean,
        tlds: activePrices.map((item) => item.tld),
      });

      setSuggestions(results ?? []);
    } catch (error) {
      console.error("Domain suggestions error:", error);
      setSuggestions([]);
    } finally {
      setIsSearching(false);
    }
  }

  function openConsoleWithDomain(value: string) {
    window.location.assign("/support");
  }

  return (
    <section
      className="relative overflow-hidden px-4 py-16 sm:px-6 lg:px-8 lg:py-20"
      style={{ backgroundColor: BRAND.bg }}
    >
      {/* Larger, clearer marquee strip */}
      <div className="pointer-events-none absolute inset-x-0 top-8 overflow-hidden">
        <div className="domain-marquee flex w-max items-center gap-10 whitespace-nowrap text-[1.35rem] font-semibold uppercase tracking-[0.32em] text-white/14 sm:text-[1.75rem] lg:text-[2rem]">
          {TLD_MARQUEE.map((item, index) => (
            <span key={`${item}-${index}`}>{item}</span>
          ))}
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-10 overflow-hidden">
        <div className="domain-marquee-reverse flex w-max items-center gap-10 whitespace-nowrap text-[1.35rem] font-semibold uppercase tracking-[0.32em] text-white/12 sm:text-[1.75rem] lg:text-[2rem]">
          {TLD_MARQUEE.map((item, index) => (
            <span key={`${item}-bottom-${index}`}>{item}</span>
          ))}
        </div>
      </div>

      <div className="relative mx-auto max-w-6xl">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-white/70">
            Domain Search
          </p>

          <h2 className="mx-auto mt-4 max-w-4xl text-3xl font-medium tracking-[-0.05em] text-white sm:text-4xl lg:text-5xl">
            Find the right domain name before someone else takes it.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-white/60 sm:text-base">
            Search fast, preview useful domain ideas, and explore pricing across
            popular, business, and new TLDs.
          </p>
        </div>

        <div className="mt-10 rounded-[2rem] bg-white p-4 shadow-[0_24px_80px_rgba(0,0,0,0.28)] ring-1 ring-white/10 sm:p-5 lg:p-6">
          {/* Search box */}
          <div className="rounded-[1.6rem] border border-slate-200 bg-white p-3 shadow-[0_14px_40px_rgba(15,23,42,0.07)]">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
              <div className="flex min-w-0 flex-1 items-center gap-3 rounded-2xl bg-white px-4">
                <Search className="h-5 w-5 flex-shrink-0 text-slate-400" />

                <input
                  value={domain}
                  onChange={(event) => setDomain(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      event.preventDefault();
                      handleSearch();
                    }
                  }}
                  placeholder="Enter your domain idea e.g. octalvecloud"
                  className="h-14 w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400 sm:text-base"
                />
              </div>

              <button
                type="button"
                onClick={handleSearch}
                disabled={isSearching}
                className="inline-flex h-14 items-center justify-center gap-2 rounded-2xl bg-cloud-blue px-6 text-sm font-semibold text-white transition hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSearching ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Searching
                  </>
                ) : (
                  <>
                    Search Domain
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Pricing tabs */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            {(["popular", "business", "new"] as PricingTab[]).map((tab) => {
              const active = activeTab === tab;

              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={[
                    "inline-flex min-h-10 items-center justify-center rounded-full px-4 text-sm font-medium transition",
                    active
                      ? "bg-cloud-blue text-white shadow-[0_10px_24px_rgba(0,100,224,0.18)]"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200",
                  ].join(" ")}
                >
                  {tab === "popular"
                    ? "Popular"
                    : tab === "business"
                      ? "Business"
                      : "New TLDs"}
                </button>
              );
            })}
          </div>

          {/* Compact pricing cards */}
          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {activePrices.map((item) => (
              <button
                key={`${activeTab}-${item.tld}`}
                type="button"
                onClick={() => {
                  const clean = normalizeDomain(domain);
                  setDomain(
                    clean ? `${clean}${item.tld}` : `yourbrand${item.tld}`,
                  );
                }}
                className="rounded-[1.15rem] border border-slate-200 bg-white px-4 py-3 text-left shadow-[0_10px_28px_rgba(15,23,42,0.05)] transition hover:-translate-y-0.5 hover:border-cloud-blue/30"
              >
                <div className="text-[1.1rem] font-semibold tracking-[-0.03em] text-cloud-blue">
                  {item.tld}
                </div>

                <div className="mt-1 text-sm font-semibold text-slate-900">
                  {item.price}
                  <span className="ml-1 font-normal text-slate-500">
                    {item.note}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* AI suggestions - hidden until search */}
          {hasSearched ? (
            <div className="mt-6 rounded-[1.5rem] border border-slate-200 bg-white shadow-[0_14px_40px_rgba(15,23,42,0.05)]">
              <button
                type="button"
                onClick={() => setSuggestionsOpen((prev) => !prev)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-cloud-blue/10 text-cloud-blue">
                    <Sparkles className="h-5 w-5" />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-slate-950">
                      AI Suggestions
                    </p>
                    <p className="text-xs text-slate-500">
                      Smart alternatives based on your search
                    </p>
                  </div>
                </div>

                <ChevronDown
                  className={[
                    "h-5 w-5 text-slate-400 transition",
                    suggestionsOpen ? "rotate-180" : "",
                  ].join(" ")}
                />
              </button>

              {suggestionsOpen ? (
                <div className="border-t border-slate-200 px-5 py-4">
                  {isSearching ? (
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Generating suggestions...
                    </div>
                  ) : suggestions.length > 0 ? (
                    <div className="space-y-3">
                      {suggestions.slice(0, 6).map((item, index) => {
                        const suggestedDomain = item.domain;

                        return (
                          <button
                            key={`${suggestedDomain}-${index}`}
                            type="button"
                            onClick={() =>
                              item.available
                                ? window.location.assign(
                                    item.orderUrl ||
                                      buildOrderDomainUrl(suggestedDomain),
                                  )
                                : openConsoleWithDomain(suggestedDomain)
                            }
                            className="flex w-full flex-col gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-left transition hover:border-cloud-blue/30 hover:bg-white sm:flex-row sm:items-center sm:justify-between"
                          >
                            <div>
                              <p className="text-sm font-semibold text-slate-950 sm:text-base">
                                {suggestedDomain}
                              </p>

                              <p className="mt-1 text-xs text-slate-500">
                                {item.priceLabel}
                                {item.renewalLabel
                                  ? ` · ${item.renewalLabel}`
                                  : ""}
                              </p>
                            </div>

                            <span
                              className={[
                                "inline-flex w-fit rounded-full px-3 py-1 text-xs font-semibold",
                                item.available === false
                                  ? "bg-red-50 text-red-600"
                                  : item.available === null ? "bg-amber-50 text-amber-700" : "bg-emerald-50 text-emerald-600",
                              ].join(" ")}
                            >
                              {item.available === false ? "Registered" : item.available === null ? "Verification required" : "Available"}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="rounded-2xl bg-slate-50 px-4 py-4 text-sm text-slate-500">
                      No AI suggestions returned yet for this search.
                    </div>
                  )}
                </div>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>

      <style jsx global>{`
        @keyframes domainMarqueeLeft {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        @keyframes domainMarqueeRight {
          from {
            transform: translateX(-50%);
          }
          to {
            transform: translateX(0);
          }
        }

        .domain-marquee {
          animation: domainMarqueeLeft 28s linear infinite;
        }

        .domain-marquee-reverse {
          animation: domainMarqueeRight 32s linear infinite;
        }
      `}</style>
    </section>
  );
}
