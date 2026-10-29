"use client";

import {
  ArrowRight,
  CheckCircle2,
  Loader2,
  Search,
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

export function DomainSearch() {
  const [domain, setDomain] = useState("");
  const [placeholder, setPlaceholder] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [letterIndex, setLetterIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [suggestions, setSuggestions] = useState<DomainSuggestion[]>([]);

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
      window.location.assign(cloudLinks.console);
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
    <section className="relative overflow-hidden bg-[#000A16] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute left-[-140px] top-[-140px] h-[380px] w-[380px] rounded-full bg-cloud-blue/25 blur-3xl" />
        <div className="absolute bottom-[-170px] right-[-150px] h-[420px] w-[420px] rounded-full bg-cloud-blue/15 blur-3xl" />
        <div className="absolute left-1/2 top-1/2 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.04] blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-blue-100 shadow-[0_12px_35px_rgba(0,0,0,0.18)] backdrop-blur-md">
            <Sparkles className="h-4 w-4 text-cloud-blue" aria-hidden="true" />
            Search for your domain
          </div>

          <h2 className="mt-5 text-3xl font-medium tracking-[-0.05em] text-white sm:text-4xl lg:text-5xl">
            Find the right name before someone else takes it.
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
            Search your next domain, preview available options, and start
            building your online presence with Octalve Cloud.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-5xl">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-3 shadow-[0_28px_90px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:p-4">
            <div className="rounded-[1.7rem] border border-white/10 bg-white p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_18px_55px_rgba(0,0,0,0.16)]">
              <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
                <div className="flex min-w-0 flex-1 items-center gap-3 rounded-[1.35rem] bg-[#F8FAFC] px-4 ring-1 ring-slate-200/80 transition focus-within:ring-4 focus-within:ring-cloud-blue/10">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-cloud-blue text-white shadow-[0_10px_24px_rgba(0,100,224,0.25)]">
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
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={submit}
                  disabled={isSearching}
                  className="inline-flex h-14 items-center justify-center gap-2 rounded-[1.35rem] bg-cloud-blue px-7 text-sm font-semibold text-white shadow-[0_16px_38px_rgba(0,100,224,0.28)] transition hover:-translate-y-0.5 hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-70 sm:text-base"
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

          <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-xs font-medium text-slate-300 sm:text-sm">
            {QUICK_TLDS.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => {
                  const clean = removeKnownTld(normalizeDomain(domain));
                  setDomain(`${clean || "yourbrand"}${item}`);
                }}
                className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 text-slate-300 backdrop-blur-md transition hover:border-cloud-blue/40 hover:bg-white/[0.1] hover:text-white"
              >
                {item}
              </button>
            ))}
          </div>

          {hasSearched ? (
            <div className="mt-7 rounded-[1.75rem] border border-white/10 bg-white p-4 shadow-[0_24px_70px_rgba(0,0,0,0.28)] sm:p-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-slate-950">
                    Domain results
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Availability and pricing come from the domain adapter
                    bridge.
                  </p>
                </div>

                {isSearching ? (
                  <Loader2 className="h-5 w-5 animate-spin text-cloud-blue" />
                ) : null}
              </div>

              <div className="mt-4 grid gap-3">
                {suggestions.length > 0 ? (
                  suggestions.map((item) => (
                    <div
                      key={item.domain}
                      className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-[#F8FAFC] p-4 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          {item.available ? (
                            <CheckCircle2
                              className="h-4 w-4 text-emerald-500"
                              aria-hidden="true"
                            />
                          ) : (
                            <XCircle
                              className="h-4 w-4 text-red-500"
                              aria-hidden="true"
                            />
                          )}

                          <p className="truncate text-sm font-semibold text-slate-950 sm:text-base">
                            {item.domain}
                          </p>
                        </div>

                        <p className="mt-1 text-xs text-slate-500">
                          {item.available ? "Available now" : "Currently taken"}{" "}
                          · {item.renewalLabel ?? "Registration pricing"}
                        </p>
                      </div>

                      <div className="flex items-center justify-between gap-3 sm:justify-end">
                        <p className="text-sm font-semibold text-slate-950">
                          {item.priceLabel}
                        </p>

                        <a
                          href={
                            item.orderUrl || buildConsoleDomainUrl(item.domain)
                          }
                          target="_blank"
                          rel="noreferrer"
                          className={[
                            "inline-flex h-10 items-center justify-center rounded-full px-4 text-xs font-semibold transition",
                            item.available
                              ? "bg-cloud-blue text-white hover:bg-blue-600"
                              : "border border-slate-200 bg-white text-slate-500",
                          ].join(" ")}
                        >
                          {item.available ? "Order" : "View"}
                        </a>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="rounded-2xl bg-[#F8FAFC] p-4 text-sm text-slate-500">
                    No result returned yet. Try another domain idea.
                  </div>
                )}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
