"use client";

import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Loader2,
  Search,
  Sparkles,
  XCircle,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import {
  getDomainSuggestions,
  type DomainSuggestion,
} from "@/lib/domain-pricing-adapter";
import { cloudLinks } from "@/features/cloud/data/cloud-links";

type TldGroup = "popular" | "business" | "new";

type TldOption = {
  label: string;
  value: string;
  price: string;
  accent: string;
};

const TLD_GROUPS: Record<TldGroup, TldOption[]> = {
  popular: [
    { label: ".com", value: ".com", price: "₦15,000/Year", accent: "#38BDF8" },
    { label: ".net", value: ".net", price: "₦30,986/Year", accent: "#E61525" },
    { label: ".org", value: ".org", price: "₦28,934/Year", accent: "#FC7E24" },
    {
      label: ".com.ng",
      value: ".com.ng",
      price: "₦Free/1 Year",
      accent: "#29BE3E",
    },
    { label: ".ng", value: ".ng", price: "₦16,500/Year", accent: "#0064E0" },
  ],
  business: [
    { label: ".co", value: ".co", price: "₦34,500/Year", accent: "#29BE3E" },
    {
      label: ".shop",
      value: ".shop",
      price: "₦19,800/Year",
      accent: "#FC7E24",
    },
    {
      label: ".cloud",
      value: ".cloud",
      price: "₦22,500/Year",
      accent: "#0064E0",
    },
    {
      label: ".africa",
      value: ".africa",
      price: "₦60,170/Year",
      accent: "#A855F7",
    },
    { label: ".ai", value: ".ai", price: "₦95,000/Year", accent: "#7C3AED" },
  ],
  new: [
    {
      label: ".cloud",
      value: ".cloud",
      price: "₦22,500/Year",
      accent: "#0064E0",
    },
    { label: ".ai", value: ".ai", price: "₦95,000/Year", accent: "#7C3AED" },
    {
      label: ".shop",
      value: ".shop",
      price: "₦19,800/Year",
      accent: "#FC7E24",
    },
    {
      label: ".africa",
      value: ".africa",
      price: "₦60,170/Year",
      accent: "#A855F7",
    },
    { label: ".co", value: ".co", price: "₦34,500/Year", accent: "#29BE3E" },
  ],
};

const GROUP_LABELS: Record<TldGroup, string> = {
  popular: "Popular",
  business: "Business",
  new: "New TLDs",
};

const MARQUEE_TLDS = [
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
  ".online",
  ".store",
];

function normalizeDomainInput(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .replace(/\/.*$/, "")
    .replace(/\s+/g, "")
    .replace(/[^a-z0-9.-]/g, "");
}

function hasKnownTld(value: string) {
  const allTlds = Object.values(TLD_GROUPS)
    .flat()
    .map((item) => item.value)
    .sort((a, b) => b.length - a.length);

  return allTlds.some((tld) => value.endsWith(tld));
}

export function DomainSearch() {
  const [domain, setDomain] = useState("");
  const [activeGroup, setActiveGroup] = useState<TldGroup>("popular");
  const [selectedTld, setSelectedTld] = useState(".com");
  const [suggestions, setSuggestions] = useState<DomainSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const activeTlds = useMemo(() => TLD_GROUPS[activeGroup], [activeGroup]);

  useEffect(() => {
    if (!activeTlds.some((item) => item.value === selectedTld)) {
      setSelectedTld(activeTlds[0].value);
    }
  }, [activeGroup, activeTlds, selectedTld]);

  useEffect(() => {
    const tlds = activeTlds.map((item) => item.value);
    const clean = normalizeDomainInput(domain || "yourbrand");

    const timeout = window.setTimeout(async () => {
      setIsLoading(true);

      try {
        const result = await getDomainSuggestions({
          query: clean,
          tlds,
        });

        setSuggestions(result);
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => window.clearTimeout(timeout);
  }, [domain, activeTlds]);

  function submit() {
    const clean = normalizeDomainInput(domain);

    if (!clean) {
      window.location.assign(cloudLinks.console);
      return;
    }

    const finalDomain = hasKnownTld(clean) ? clean : `${clean}${selectedTld}`;
    const target = `${cloudLinks.console}/order/domain?domain=${encodeURIComponent(finalDomain)}`;

    window.location.assign(target);
  }

  return (
    <section className="relative overflow-hidden bg-black px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute left-[-140px] top-[-140px] h-[360px] w-[360px] rounded-full bg-cloud-blue/20 blur-3xl" />
        <div className="absolute right-[-120px] top-[18%] h-[320px] w-[320px] rounded-full bg-[#29BE3E]/10 blur-3xl" />
        <div className="absolute bottom-[-140px] left-[35%] h-[300px] w-[300px] rounded-full bg-[#FC7E24]/10 blur-3xl" />
      </div>

      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <div className="domain-marquee absolute left-0 top-10 flex whitespace-nowrap text-[44px] font-semibold tracking-[-0.05em] text-white/[0.045]">
          {[...MARQUEE_TLDS, ...MARQUEE_TLDS].map((tld, index) => (
            <span key={`${tld}-${index}`} className="mx-8">
              {tld}
            </span>
          ))}
        </div>

        <div className="domain-marquee-reverse absolute bottom-12 left-0 flex whitespace-nowrap text-[40px] font-semibold tracking-[-0.05em] text-white/[0.04]">
          {[...MARQUEE_TLDS, ...MARQUEE_TLDS].map((tld, index) => (
            <span key={`${tld}-reverse-${index}`} className="mx-8">
              {tld}
            </span>
          ))}
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl">
        <div className="animated-domain-shell rounded-[2.25rem] p-[1px]">
          <div className="rounded-[2.2rem] border border-white/10 bg-white/[0.045] px-5 py-8 shadow-[0_30px_110px_rgba(0,0,0,0.55)] backdrop-blur-xl sm:px-8 sm:py-10 lg:px-10 lg:py-12">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-blue-100">
                <Sparkles
                  className="h-4 w-4 text-cloud-blue"
                  aria-hidden="true"
                />
                Domain Search
              </div>

              <h2 className="mt-5 text-3xl font-medium tracking-[-0.05em] text-white sm:text-4xl lg:text-5xl">
                Your online presence starts with the right name.
              </h2>

              <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
                Search domains, compare useful extensions, and move straight
                into your Octalve Cloud order flow when the perfect name is
                available.
              </p>
            </div>

            <div className="mx-auto mt-8 max-w-4xl">
              <div className="rounded-[1.75rem] border border-white/10 bg-black/35 p-3 shadow-[0_16px_70px_rgba(0,0,0,0.35)]">
                <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
                  <div className="flex min-w-0 flex-1 items-center gap-3 rounded-[1.25rem] border border-white/10 bg-white px-4 text-slate-900">
                    <Search className="h-5 w-5 flex-shrink-0 text-slate-400" />

                    <input
                      value={domain}
                      onChange={(event) => setDomain(event.target.value)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter") {
                          event.preventDefault();
                          submit();
                        }
                      }}
                      placeholder="yourbusiness"
                      className="h-14 w-full bg-transparent text-sm font-medium outline-none placeholder:text-slate-400 sm:text-base"
                    />
                  </div>

                  <div className="grid gap-3 sm:grid-cols-[140px_1fr] lg:flex">
                    <div className="relative">
                      <select
                        value={selectedTld}
                        onChange={(event) => setSelectedTld(event.target.value)}
                        className="h-14 w-full appearance-none rounded-[1.15rem] border border-white/10 bg-white px-4 pr-10 text-sm font-semibold text-slate-900 outline-none"
                      >
                        {activeTlds.map((item) => (
                          <option key={item.value} value={item.value}>
                            {item.label}
                          </option>
                        ))}
                      </select>

                      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                    </div>

                    <button
                      type="button"
                      onClick={submit}
                      className="inline-flex h-14 items-center justify-center rounded-[1.15rem] bg-cloud-blue px-8 text-sm font-semibold text-white shadow-[0_14px_34px_rgba(0,100,224,0.30)] transition hover:-translate-y-0.5 hover:bg-blue-600"
                    >
                      Search
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap justify-center gap-2">
                {(Object.keys(GROUP_LABELS) as TldGroup[]).map((group) => {
                  const isActive = group === activeGroup;

                  return (
                    <button
                      key={group}
                      type="button"
                      onClick={() => setActiveGroup(group)}
                      className={[
                        "rounded-full border px-4 py-2 text-sm font-semibold transition",
                        isActive
                          ? "border-cloud-blue bg-cloud-blue text-white shadow-[0_12px_30px_rgba(0,100,224,0.26)]"
                          : "border-white/10 bg-white/[0.06] text-slate-300 hover:border-cloud-blue/40 hover:text-white",
                      ].join(" ")}
                    >
                      {GROUP_LABELS[group]}
                    </button>
                  );
                })}
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
                {activeTlds.map((item) => {
                  const isSelected = item.value === selectedTld;

                  return (
                    <button
                      key={item.value}
                      type="button"
                      onClick={() => setSelectedTld(item.value)}
                      className={[
                        "rounded-[1.1rem] border p-4 text-center transition hover:-translate-y-0.5",
                        isSelected
                          ? "border-white/20 bg-white text-slate-950 shadow-[0_14px_35px_rgba(255,255,255,0.12)]"
                          : "border-white/10 bg-white/[0.07] text-white shadow-[0_12px_35px_rgba(0,0,0,0.22)] hover:bg-white/[0.1]",
                      ].join(" ")}
                    >
                      <p
                        className="text-2xl font-semibold tracking-[-0.04em]"
                        style={{ color: item.accent }}
                      >
                        {item.label}
                      </p>
                      <p
                        className={[
                          "mt-2 text-xs sm:text-sm",
                          isSelected ? "text-slate-500" : "text-slate-300",
                        ].join(" ")}
                      >
                        {item.price}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mx-auto mt-10 max-w-4xl">
              <div className="rounded-[1.75rem] border border-white/10 bg-black/30 p-4 sm:p-5">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-white">
                      Suggested domains
                    </p>
                    <p className="mt-1 text-xs text-slate-400">
                      Live pricing will connect through the Octalve Cloud domain
                      adapter.
                    </p>
                  </div>

                  {isLoading ? (
                    <Loader2 className="h-5 w-5 animate-spin text-cloud-blue" />
                  ) : null}
                </div>

                <div className="mt-4 grid gap-3">
                  {suggestions.slice(0, 5).map((item) => (
                    <div
                      key={item.domain}
                      className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/[0.06] p-4 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          {item.available ? (
                            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                          ) : (
                            <XCircle className="h-4 w-4 text-red-400" />
                          )}

                          <p className="truncate text-sm font-semibold text-white sm:text-base">
                            {item.domain}
                          </p>
                        </div>

                        <p className="mt-1 text-xs text-slate-400">
                          {item.available
                            ? "Available now"
                            : "Currently unavailable"}{" "}
                          · {item.renewalLabel ?? "Registration pricing"}
                        </p>
                      </div>

                      <div className="flex items-center justify-between gap-3 sm:justify-end">
                        <p className="text-sm font-semibold text-white">
                          {item.priceLabel}
                        </p>

                        {item.available ? (
                          <Link
                            href={item.orderUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-cloud-blue px-4 text-xs font-semibold text-white transition hover:bg-blue-600"
                          >
                            Order
                            <ArrowRight className="h-3.5 w-3.5" />
                          </Link>
                        ) : (
                          <span className="rounded-full border border-white/10 px-4 py-2 text-xs font-semibold text-slate-400">
                            Taken
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <p className="mx-auto mt-6 max-w-2xl text-center text-xs leading-6 text-slate-500 sm:text-sm">
              Prices shown can be replaced automatically by the live registrar
              adapter once the Octalve Cloud backend is connected.
            </p>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @property --domain-angle {
          syntax: "<angle>";
          initial-value: 0deg;
          inherits: false;
        }

        @keyframes domain-spin {
          to {
            --domain-angle: 360deg;
          }
        }

        .animated-domain-shell {
          background: conic-gradient(
            from var(--domain-angle),
            rgba(0, 100, 224, 0.9),
            rgba(41, 190, 62, 0.45),
            rgba(252, 126, 36, 0.55),
            rgba(230, 21, 37, 0.55),
            rgba(0, 100, 224, 0.9)
          );
          animation: domain-spin 8s linear infinite;
        }

        @keyframes domain-marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        @keyframes domain-marquee-reverse {
          from {
            transform: translateX(-50%);
          }
          to {
            transform: translateX(0);
          }
        }

        .domain-marquee {
          animation: domain-marquee 28s linear infinite;
        }

        .domain-marquee-reverse {
          animation: domain-marquee-reverse 34s linear infinite;
        }
      `}</style>
    </section>
  );
}
