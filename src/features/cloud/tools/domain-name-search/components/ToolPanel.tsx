"use client";

import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Globe2,
  Loader2,
  Search,
  ShieldCheck,
  Sparkles,
  XCircle,
} from "lucide-react";
import { useEffect, useState } from "react";
import { cloudLinks } from "@/features/cloud/data/cloud-links";
import {buildDomainRegistrationHref} from "@/lib/console-commerce-links";
import {
  getDomainSuggestions,
  type DomainSuggestion,
} from "@/lib/domain-pricing-adapter";

const PLACEHOLDER_EXAMPLES = [
  "yourbusinessonline.com",
  "youridea.ai",
  "growmybrand.shop",
  "mycompany.com.ng",
  "startwithcloud.ng",
];

const QUICK_TLDS = [".com", ".com.ng", ".ng", ".ai", ".shop", ".cloud"];

const TRUST_POINTS = [
  {
    icon: Globe2,
    title: "Domain guidance",
    text: "Choose a name that fits your brand, audience, and growth plan.",
  },
  {
    icon: ShieldCheck,
    title: "Secure setup",
    text: "Connect your domain with DNS, SSL, hosting, and business email support.",
  },
  {
    icon: Sparkles,
    title: "Launch-ready",
    text: "Move from domain search to website, email, and hosting setup faster.",
  },
];

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

function removeKnownTld(value: string) {
  return value.replace(
    /\.(com\.ng|com|net|org|ng|ai|shop|cloud|africa|co)$/i,
    "",
  );
}

function buildConsoleDomainUrl(domain: string) {
  return buildDomainRegistrationHref(normalizeDomain(domain)) ||
    `${cloudLinks.console}/client/domains/register`;
}

export function ToolPanel() {
  const [domain, setDomain] = useState("");
  const [placeholder, setPlaceholder] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [letterIndex, setLetterIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [suggestions, setSuggestions] = useState<DomainSuggestion[]>([]);

  const cleanDomain = normalizeDomain(domain);

  useEffect(() => {
    const currentWord = PLACEHOLDER_EXAMPLES[wordIndex];

    const timeout = window.setTimeout(
      () => {
        if (!isDeleting) {
          const nextValue = currentWord.slice(0, letterIndex + 1);
          setPlaceholder(nextValue);
          setLetterIndex((current) => current + 1);

          if (nextValue === currentWord) {
            window.setTimeout(() => setIsDeleting(true), 900);
          }

          return;
        }

        const nextValue = currentWord.slice(0, Math.max(letterIndex - 1, 0));
        setPlaceholder(nextValue);
        setLetterIndex((current) => Math.max(current - 1, 0));

        if (nextValue.length === 0) {
          setIsDeleting(false);
          setWordIndex(
            (current) => (current + 1) % PLACEHOLDER_EXAMPLES.length,
          );
        }
      },
      isDeleting ? 45 : 80,
    );

    return () => window.clearTimeout(timeout);
  }, [wordIndex, letterIndex, isDeleting]);

  async function submit() {
    const clean = normalizeDomain(domain);

    if (!clean) {
      setHasSearched(false);
      setSuggestions([]);
      return;
    }

    setIsSearching(true);
    setHasSearched(true);

    try {
      const baseDomain = removeKnownTld(clean) || clean;

      const results = await getDomainSuggestions({
        query: baseDomain,
        tlds: QUICK_TLDS,
      });

      setSuggestions(results);
    } catch (error) {
      console.error("Domain search error:", error);
      setSuggestions([]);
    } finally {
      setIsSearching(false);
    }
  }

  return (
    <section className="relative overflow-hidden bg-white px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute left-[-160px] top-[-160px] h-[360px] w-[360px] rounded-full bg-cloud-blue/10 blur-3xl" />
        <div className="absolute bottom-[-170px] right-[-170px] h-[420px] w-[420px] rounded-full bg-blue-100 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-cloud-blue/10 bg-blue-50 px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] text-cloud-blue">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            Domain name search
          </div>

          <h2 className="mt-5 text-3xl font-medium tracking-[-0.05em] text-[#000A16] sm:text-4xl lg:text-5xl">
            Find the right domain name before someone else takes it.
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
            Search domain ideas, compare useful extensions, and move smoothly
            from name discovery to registration, hosting, SSL, and business
            email setup.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-5xl">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-3 shadow-[0_24px_80px_rgba(15,23,42,0.08)] sm:p-4">
            <div className="rounded-[1.7rem] border border-slate-200 bg-[#F8FAFC] p-3">
              <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
                <div className="flex min-w-0 flex-1 items-center gap-3 rounded-[1.35rem] bg-white px-4 ring-1 ring-slate-200 transition focus-within:ring-4 focus-within:ring-cloud-blue/10">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-cloud-blue text-white shadow-[0_10px_24px_rgba(0,100,224,0.22)]">
                    <Search className="h-4 w-4" aria-hidden="true" />
                  </div>

                  <div className="flex min-w-0 flex-1 items-center">
                    <span className="hidden pr-1 text-sm font-medium text-slate-400 sm:inline">
                      www.
                    </span>

                    <input
                      value={domain}
                      onChange={(event) => setDomain(event.target.value)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter") {
                          event.preventDefault();
                          submit();
                        }
                      }}
                      placeholder={placeholder || "yourbusinessonline.com"}
                      autoCapitalize="none"
                      autoCorrect="off"
                      spellCheck={false}
                      inputMode="url"
                      className="h-14 w-full min-w-0 bg-transparent text-sm font-medium text-slate-950 outline-none placeholder:text-slate-400 sm:text-base"
                      aria-label="Search domain name"
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={submit}
                  disabled={isSearching}
                  className="inline-flex h-14 items-center justify-center gap-2 rounded-[1.35rem] bg-cloud-blue px-7 text-sm font-medium text-white shadow-[0_16px_38px_rgba(0,100,224,0.24)] transition hover:-translate-y-0.5 hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-70 sm:text-base"
                >
                  {isSearching ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Searching
                    </>
                  ) : (
                    <>
                      Search Domain
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-xs font-medium text-slate-500 sm:text-sm">
            {QUICK_TLDS.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => {
                  const clean = removeKnownTld(normalizeDomain(domain));
                  setDomain(`${clean || "yourbrand"}${item}`);
                }}
                className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-slate-600 shadow-sm transition hover:border-cloud-blue/40 hover:bg-blue-50 hover:text-cloud-blue"
              >
                {item}
              </button>
            ))}
          </div>

          {hasSearched ? (
            <div className="mt-7 rounded-[1.75rem] border border-slate-200 bg-white p-4 shadow-[0_24px_70px_rgba(15,23,42,0.08)] sm:p-5">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-medium uppercase tracking-[0.16em] text-cloud-blue">
                    Search results
                  </p>
                  <h3 className="mt-1 text-xl font-medium tracking-[-0.03em] text-slate-950">
                    Domain options for {cleanDomain || "your search"}
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    Availability and pricing are prepared through the Octalve
                    Cloud domain adapter bridge.
                  </p>
                </div>

                {isSearching ? (
                  <Loader2 className="h-5 w-5 animate-spin text-cloud-blue" />
                ) : null}
              </div>

              <div className="mt-5 grid gap-3">
                {suggestions.length > 0 ? (
                  suggestions.map((item) => (
                    <div
                      key={item.domain}
                      className="group flex flex-col gap-3 rounded-2xl border border-slate-200 bg-[#F8FAFC] p-4 transition hover:border-cloud-blue/40 hover:bg-white hover:shadow-[0_16px_45px_rgba(15,23,42,0.08)] sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          {item.available === true ? (
                            <CheckCircle2
                              className="h-4 w-4 text-emerald-500"
                              aria-hidden="true"
                            />
                          ) : (
                            <XCircle
                              className="h-4 w-4 text-slate-400"
                              aria-hidden="true"
                            />
                          )}

                          <p className="truncate text-sm font-medium text-slate-950 sm:text-base">
                            {item.domain}
                          </p>
                        </div>

                        <p className="mt-1 text-xs leading-5 text-slate-500">
                          {item.available === true ? "Registrar-verified available" : item.available === false ? "Registered" : "Availability awaiting registrar verification"}{" "}
                          · {item.renewalLabel ?? "Registration pricing"}
                        </p>
                      </div>

                      <div className="flex items-center justify-between gap-3 sm:justify-end">
                        <p className="text-sm font-medium text-slate-950">
                          {item.priceLabel}
                        </p>

                        <a
                          href={item.orderUrl || buildConsoleDomainUrl(item.domain)}
                          target="_blank"
                          rel="noreferrer"
                          className={[
                            "inline-flex h-10 items-center justify-center rounded-full px-4 text-xs font-medium transition",
                            item.available === true
                              ? "bg-cloud-blue text-white hover:bg-blue-600"
                              : "border border-slate-200 bg-white text-slate-500 hover:border-slate-300",
                          ].join(" ")}
                        >
                          {item.available === true ? "Continue" : "Review domain"}
                        </a>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="rounded-2xl border border-dashed border-slate-200 bg-[#F8FAFC] p-5 text-sm leading-7 text-slate-500">
                    No result returned yet. Try another domain idea or choose a
                    popular extension above.
                  </div>
                )}
              </div>
            </div>
          ) : null}

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {TRUST_POINTS.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-[0_16px_45px_rgba(15,23,42,0.05)] transition hover:border-cloud-blue/30 hover:shadow-[0_20px_55px_rgba(15,23,42,0.08)]"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-cloud-blue">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>

                  <h3 className="mt-4 text-base font-medium text-slate-950">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm leading-7 text-slate-600">
                    {item.text}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mt-8 rounded-[1.75rem] border border-cloud-blue/15 bg-blue-50 p-6 sm:flex sm:items-center sm:justify-between sm:gap-6">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.16em] text-cloud-blue">
                Need help choosing?
              </p>
              <h3 className="mt-2 text-2xl font-medium tracking-[-0.04em] text-slate-950">
                Let Octalve Cloud help you secure and launch the right domain.
              </h3>
              <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-600">
                We can help with domain registration, DNS setup, SSL,
                professional email, hosting, and website migration.
              </p>
            </div>

            <Link
              href={cloudLinks.console}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-cloud-blue px-6 text-sm font-medium text-white shadow-[0_14px_34px_rgba(0,100,224,0.22)] transition hover:-translate-y-0.5 hover:bg-blue-600 sm:mt-0"
            >
              Open Console
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
