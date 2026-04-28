"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { cloudLinks } from "@/features/cloud/data/cloud-links";
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

const quickLinks = [
  { label: "Web Hosting", href: "/hosting" },
  { label: "Domains", href: "/domains" },
  { label: "Business Email", href: "/email" },
  { label: "SSL / Security", href: "/ssl-security" },
  { label: "Migration", href: "/migration" },
];

export function CloudHero() {
  const [domainQuery, setDomainQuery] = useState("");
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

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

  const normalizeDomain = (value: string) =>
    value
      .trim()
      .toLowerCase()
      .replace(/^https?:\/\//, "")
      .replace(/^www\./, "")
      .replace(/\/.*$/, "")
      .replace(/\s+/g, "");

  const handleDomainSearch = () => {
    const cleanDomain = normalizeDomain(domainQuery);

    if (!cleanDomain) {
      window.location.assign(cloudLinks.console);
      return;
    }

    const target = cloudLinks.console;
    const separator = target.includes("?") ? "&" : "?";

    window.location.assign(
      `${target}${separator}domain=${encodeURIComponent(cleanDomain)}`,
    );
  };

  return (
    <section
      className="relative overflow-hidden px-4 py-14 sm:px-6 md:py-20 lg:py-24"
      style={{ backgroundColor: BRAND.pageBg }}
    >
      {/* soft background glow */}
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
          {/* logo mark */}
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

          {/* headline */}
          <h1
            className="mx-auto font-medium tracking-[-0.055em] text-slate-950"
            style={{
              fontSize: "clamp(2.45rem, 5.2vw, 5.35rem)",
              lineHeight: 0.98,
            }}
          >
            <span className="block md:whitespace-nowrap">
              <span
                key={currentWord.text}
                className="inline-block min-w-[4.8ch] text-center transition-all duration-500"
                style={{ color: currentWord.color }}
                aria-live="polite"
              >
                {currentWord.text}
              </span>{" "}
              Your Business Online
            </span>

            <span className="mt-1 block md:whitespace-nowrap">
              faster, smarter, for less.
            </span>
          </h1>

          {/* subtext */}
          <p className="mx-auto mt-6 max-w-3xl text-base font-normal leading-8 text-slate-500 sm:text-lg">
            Register domains, host websites, create business emails, secure your
            platform, and launch faster with reliable cloud infrastructure built
            for growing businesses.
          </p>

          {/* ctas */}
          <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4">
            <Link
              href={cloudLinks.console}
              target="_blank"
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

        {/* domain search */}
        <div className="mx-auto mt-10 max-w-[980px]">
          <div className="search-ring relative rounded-[28px] p-[2px]">
            <div className="relative rounded-[28px] bg-white p-4 shadow-[0_16px_50px_rgba(15,23,42,0.07)] ring-1 ring-slate-200">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="flex min-w-0 flex-1 items-center gap-3 rounded-2xl bg-white px-1">
                  <div className="rounded-xl bg-slate-50 px-3 py-2 text-sm font-medium text-slate-500">
                    www
                  </div>

                  <div className="flex min-w-0 flex-1 items-center gap-3">
                    <Search
                      className="hidden h-5 w-5 flex-shrink-0 text-slate-400 sm:block"
                      aria-hidden="true"
                    />

                    <input
                      type="text"
                      value={domainQuery}
                      onChange={(event) => setDomainQuery(event.target.value)}
                      placeholder="Search your perfect domain name e.g. octalve.com"
                      autoCapitalize="none"
                      autoCorrect="off"
                      spellCheck={false}
                      inputMode="url"
                      className="min-w-0 flex-1 bg-transparent text-sm font-normal text-slate-800 outline-none placeholder:text-slate-400 sm:text-base"
                      onKeyDown={(event) => {
                        if (event.key === "Enter") {
                          event.preventDefault();
                          handleDomainSearch();
                        }
                      }}
                    />
                  </div>
                </div>

                <button
                  type="button"
                  aria-label="Search domain"
                  onClick={handleDomainSearch}
                  className="inline-flex h-12 w-full flex-shrink-0 items-center justify-center rounded-full bg-cloud-blue px-7 text-sm font-semibold text-white shadow-[0_12px_28px_rgba(0,100,224,0.2)] transition hover:-translate-y-0.5 hover:bg-blue-600 sm:w-auto"
                >
                  Search
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
        </div>

        {/* quick links */}
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

        {/* trust strip */}
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
            className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-cloud-blue text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-blue-600"
            aria-label="Get started"
          >
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        {/* login links */}
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
          border-radius: 28px;
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
