"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Loader2,
  Search,
  XCircle,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { cloudLinks } from "@/features/cloud/data/cloud-links";
import {
  getDomainSuggestions,
  type DomainSuggestion,
} from "@/lib/domain-pricing-adapter";
import octalveCloudMark from "@/assets/logo/octalve-cloud.png";

const BRAND = {
  red: "#E61525",
  blue: "#0064E0",
  green: "#29BE3E",
  orange: "#FC7E24",
  purple: "#5300D9",
  pageBg: "#F8FAFC",
  border: "#E5E7EB",
};

const rotatingWords = [
  { text: "Launch", color: BRAND.blue },
  { text: "Host", color: BRAND.green },
  { text: "Grow", color: BRAND.orange },
];

const typingExamples = [
  "yourbusinessonline.com",
  "youridea.ai",
  "growmybrand.shop",
];

const quickTlds = [".com", ".com.ng", ".ng", ".ai", ".shop", ".cloud"];

const quickLinks = [
  { label: "Web Hosting", href: "/hosting" },
  { label: "Domains", href: "/domains" },
  { label: "Business Email", href: "/email" },
  { label: "SSL / Security", href: "/ssl-security" },
  { label: "Migration", href: "/migration" },
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
  const separator = cloudLinks.console.includes("?") ? "&" : "?";

  return `${cloudLinks.console}${separator}domain=${encodeURIComponent(
    domain,
  )}`;
}

export function Hero() {
  const [domainQuery, setDomainQuery] = useState("");
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  const [placeholder, setPlaceholder] = useState("");
  const [typingWordIndex, setTypingWordIndex] = useState(0);
  const [typingLetterIndex, setTypingLetterIndex] = useState(0);
  const [isDeletingPlaceholder, setIsDeletingPlaceholder] = useState(false);

  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [suggestions, setSuggestions] = useState<DomainSuggestion[]>([]);

  const currentWord = useMemo(
    () => rotatingWords[currentWordIndex],
    [currentWordIndex],
  );

  useEffect(() => {
    const interval = window.setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 2200);

    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    const currentTypingWord = typingExamples[typingWordIndex];
    const hasCompletedWord =
      !isDeletingPlaceholder && typingLetterIndex === currentTypingWord.length;

    const delay = hasCompletedWord ? 1100 : isDeletingPlaceholder ? 45 : 80;

    const timeout = window.setTimeout(() => {
      if (hasCompletedWord) {
        setIsDeletingPlaceholder(true);
        return;
      }

      if (!isDeletingPlaceholder) {
        const nextLetterIndex = typingLetterIndex + 1;
        setPlaceholder(currentTypingWord.slice(0, nextLetterIndex));
        setTypingLetterIndex(nextLetterIndex);
        return;
      }

      if (typingLetterIndex <= 0) {
        setIsDeletingPlaceholder(false);
        setTypingWordIndex((current) => (current + 1) % typingExamples.length);
        return;
      }

      const nextLetterIndex = typingLetterIndex - 1;
      setPlaceholder(currentTypingWord.slice(0, nextLetterIndex));
      setTypingLetterIndex(nextLetterIndex);
    }, delay);

    return () => window.clearTimeout(timeout);
  }, [typingWordIndex, typingLetterIndex, isDeletingPlaceholder]);

  async function handleDomainSearch() {
    const cleanDomain = normalizeDomain(domainQuery);

    if (!cleanDomain) {
      window.location.assign(cloudLinks.console);
      return;
    }

    setIsSearching(true);
    setHasSearched(true);

    try {
      const baseDomain = removeKnownTld(cleanDomain) || cleanDomain;

      const results = await getDomainSuggestions({
        query: baseDomain,
        tlds: quickTlds,
      });

      setSuggestions(results);
    } catch (error) {
      console.error("Hero domain search error:", error);
      setSuggestions([]);
    } finally {
      setIsSearching(false);
    }
  }

  return (
    <section
      className="relative overflow-hidden px-4 py-14 sm:px-6 md:py-20 lg:py-24"
      style={{ backgroundColor: BRAND.pageBg }}
    >
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <div
          className="absolute rounded-full"
          style={{
            width: "520px",
            height: "520px",
            top: "-210px",
            left: "-180px",
            background: `radial-gradient(circle, ${BRAND.red}10 0%, transparent 70%)`,
          }}
        />

        <div
          className="absolute rounded-full"
          style={{
            width: "620px",
            height: "620px",
            top: "-240px",
            right: "-210px",
            background: `radial-gradient(circle, ${BRAND.blue}12 0%, transparent 72%)`,
          }}
        />

        <div
          className="absolute rounded-full"
          style={{
            width: "520px",
            height: "520px",
            bottom: "-210px",
            left: "-190px",
            background: `radial-gradient(circle, ${BRAND.green}09 0%, transparent 72%)`,
          }}
        />

        <div
          className="absolute rounded-full"
          style={{
            width: "560px",
            height: "560px",
            bottom: "-220px",
            right: "-190px",
            background: `radial-gradient(circle, ${BRAND.orange}10 0%, transparent 72%)`,
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-[1120px]">
        <div className="mx-auto max-w-[1040px] text-center">
          <div className="mb-5 flex justify-center sm:mb-6">
            <Image
              src={octalveCloudMark}
              alt="Octalve Cloud"
              width={92}
              height={92}
              priority
              className="h-12 w-auto object-contain sm:h-14 md:h-16"
            />
          </div>

          <h1
            className="mx-auto max-w-[980px] font-medium tracking-[-0.055em] text-slate-950"
            style={{
              fontSize: "clamp(2.45rem, 5.2vw, 5.35rem)",
              lineHeight: 0.98,
            }}
          >
            <span
              key={currentWord.text}
              className="inline align-baseline transition-all duration-500"
              style={{ color: currentWord.color }}
              aria-live="polite"
            >
              {currentWord.text}
            </span>{" "}
            Your Business Online faster, smarter, for less.
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-base font-normal leading-8 text-slate-500 sm:text-lg">
            Register domains, host websites, create business emails, secure your
            platform, and launch faster with reliable cloud infrastructure built
            for growing businesses.
          </p>

          <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4">
            <Link
              href={cloudLinks.console}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-cloud-blue px-7 py-3 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(0,100,224,0.22)] transition hover:-translate-y-0.5 hover:bg-blue-600"
            >
              Start Now
            </Link>

            <Link
              href="/contact"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-slate-200 bg-white px-7 py-3 text-sm font-semibold text-cloud-blue shadow-sm transition hover:-translate-y-0.5 hover:border-cloud-blue/30 hover:bg-slate-50"
            >
              Contact Sales
            </Link>
          </div>
        </div>

        <div className="mx-auto mt-10 max-w-[980px]">
          <div className="search-ring relative rounded-[30px] p-[2px]">
            <div className="relative rounded-[30px] bg-white p-3 shadow-[0_20px_70px_rgba(15,23,42,0.10)] ring-1 ring-slate-200/80 sm:p-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="flex min-w-0 flex-1 items-center gap-3 rounded-[1.35rem] bg-[#F8FAFC] px-3 py-2 ring-1 ring-slate-200/80 transition focus-within:ring-4 focus-within:ring-cloud-blue/10 sm:px-4">
                  <div className="rounded-xl bg-white px-3 py-2 text-sm font-medium text-slate-500 shadow-sm ring-1 ring-slate-100">
                    www
                  </div>

                  <Search
                    className="hidden h-5 w-5 flex-shrink-0 text-slate-400 sm:block"
                    aria-hidden="true"
                  />

                  <input
                    type="text"
                    value={domainQuery}
                    onChange={(event) => setDomainQuery(event.target.value)}
                    placeholder={placeholder || "yourbusinessonline.com"}
                    autoCapitalize="none"
                    autoCorrect="off"
                    spellCheck={false}
                    inputMode="url"
                    className="h-11 min-w-0 flex-1 bg-transparent text-sm font-medium text-slate-800 outline-none placeholder:text-slate-400 sm:text-base"
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        event.preventDefault();
                        handleDomainSearch();
                      }
                    }}
                  />
                </div>

                <button
                  type="button"
                  aria-label="Search domain"
                  onClick={handleDomainSearch}
                  disabled={isSearching}
                  className="inline-flex h-14 w-full flex-shrink-0 items-center justify-center gap-2 rounded-[1.35rem] bg-cloud-blue px-7 text-sm font-semibold text-white shadow-[0_14px_34px_rgba(0,100,224,0.24)] transition hover:-translate-y-0.5 hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
                >
                  {isSearching ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Searching
                    </>
                  ) : (
                    "Search"
                  )}
                </button>
              </div>
            </div>
          </div>

          <p className="mt-3 text-center text-xs font-normal text-slate-400 sm:text-sm">
            Search across{" "}
            <span className="underline decoration-dotted underline-offset-4">
              500+ domain extensions
            </span>
            .
          </p>

          {hasSearched ? (
            <div className="mt-5 rounded-[1.5rem] border border-slate-200 bg-white p-4 shadow-[0_18px_55px_rgba(15,23,42,0.08)] sm:p-5">
              <div className="flex items-center justify-between gap-4">
                <div className="text-left">
                  <p className="text-sm font-semibold text-slate-950">
                    Domain results
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Availability and pricing are powered through the Octalve
                    Cloud domain adapter.
                  </p>
                </div>

                {isSearching ? (
                  <Loader2 className="h-5 w-5 animate-spin text-cloud-blue" />
                ) : null}
              </div>

              <div className="mt-4 grid gap-3">
                {suggestions.length > 0 ? (
                  suggestions.slice(0, 4).map((item) => (
                    <div
                      key={item.domain}
                      className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-[#F8FAFC] p-4 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="min-w-0 text-left">
                        <div className="flex items-center gap-2">
                          {item.available ? (
                            <CheckCircle2
                              className="h-4 w-4 flex-shrink-0 text-emerald-500"
                              aria-hidden="true"
                            />
                          ) : (
                            <XCircle
                              className="h-4 w-4 flex-shrink-0 text-red-500"
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
                              : "border border-slate-200 bg-white text-slate-500 hover:text-cloud-blue",
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

        <div className="mx-auto mt-6 grid max-w-5xl grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {quickLinks.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-cloud-blue px-4 py-3 text-center text-sm font-semibold text-white shadow-[0_10px_25px_rgba(0,100,224,0.16)] transition hover:-translate-y-0.5 hover:bg-blue-600"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="mx-auto mt-8 flex max-w-3xl flex-col items-center gap-3 rounded-2xl bg-white px-4 py-3 text-center shadow-sm ring-1 ring-slate-200 sm:flex-row sm:justify-between sm:rounded-full sm:px-5">
          <p className="text-sm font-normal text-slate-600">
            <strong className="font-semibold text-slate-950">
              Fast setup guidance
            </strong>{" "}
            for domains, hosting, business email, SSL, and website migration.
          </p>

          <Link
            href={cloudLinks.console}
            target="_blank"
            rel="noreferrer"
            className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-cloud-blue text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-blue-600"
            aria-label="Get started"
          >
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-6 flex flex-col items-center justify-center gap-3 text-sm font-medium text-slate-500 sm:flex-row">
          <a
            href={cloudLinks.console}
            target="_blank"
            rel="noreferrer"
            className="transition hover:text-cloud-blue"
          >
            Login to Client Console
          </a>

          <span className="hidden h-1 w-1 rounded-full bg-slate-300 sm:block" />

          <a
            href={cloudLinks.opanel}
            target="_blank"
            rel="noreferrer"
            className="transition hover:text-cloud-blue"
          >
            Open Hosting Panel
          </a>
        </div>
      </div>

      <style jsx global>{`
        @property --angle {
          syntax: "<angle>";
          initial-value: 0deg;
          inherits: false;
        }

        @keyframes spin-border {
          to {
            --angle: 360deg;
          }
        }

        .search-ring::before {
          content: "";
          position: absolute;
          inset: -2px;
          border-radius: 30px;
          padding: 2px;
          background: conic-gradient(
            from var(--angle),
            ${BRAND.red},
            ${BRAND.orange},
            ${BRAND.green},
            ${BRAND.blue},
            ${BRAND.red}
          );
          -webkit-mask:
            linear-gradient(#fff 0 0) content-box,
            linear-gradient(#fff 0 0);
          mask:
            linear-gradient(#fff 0 0) content-box,
            linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          animation: spin-border 7s linear infinite;
          opacity: 0.22;
        }
      `}</style>
    </section>
  );
}
