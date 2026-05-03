"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Shield } from "lucide-react";
import { cloudLinks } from "@/features/cloud/data/cloud-links";
import hostingHeroVisual from "@/assets/sections/hosting-hero-visual.png";

const heroPoints = [
  "Free website migration support",
  "99.99% uptime guaranteed",
  "Fully managed web hosting",
  "24/7 customer support",
];

export function Hero() {
  return (
    <section className="overflow-hidden bg-[#F8FAFC] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.84fr_1.16fr] lg:items-center lg:gap-14 xl:gap-20">
        <div className="max-w-[560px]">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cloud-blue">
            Web Hosting
          </p>

          <p className="mt-5 text-[1.75rem] font-medium tracking-[-0.04em] text-slate-950 sm:text-[2rem]">
            Up to <span className="text-cloud-blue">73% off</span> Web hosting
          </p>

          <h1 className="mt-4 text-[3rem] font-medium tracking-[-0.06em] text-slate-950 sm:text-[3.5rem] lg:text-[4.25rem] lg:leading-[0.95]">
            <span className="block">Secure. Speedy.</span>
            <span className="block">The way your</span>
            <span className="block">website should be.</span>
          </h1>

          <ul className="mt-8 space-y-4">
            {heroPoints.map((point) => (
              <li
                key={point}
                className="flex items-start gap-3 text-base leading-7 text-slate-700 sm:text-[1.05rem]"
              >
                <span className="mt-1 inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                  <Check className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
                <span>{point}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={cloudLinks.console}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-cloud-blue px-7 text-sm font-semibold text-white shadow-[0_14px_30px_rgba(0,100,224,0.22)] transition hover:-translate-y-0.5 hover:bg-blue-600"
            >
              Claim deal
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>

            <Link
              href="/contact"
              className="inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-200 bg-white px-7 text-sm font-semibold text-cloud-blue shadow-sm transition hover:-translate-y-0.5 hover:border-cloud-blue/30 hover:bg-slate-50"
            >
              Contact Sales
            </Link>
          </div>

          <div className="mt-6 flex items-center gap-3 text-sm text-slate-500 sm:text-base">
            <Shield className="h-4 w-4 text-slate-500" aria-hidden="true" />
            <span>30-day money-back guarantee</span>
          </div>
        </div>

        <div className="relative">
          <div
            className="relative mx-auto w-full max-w-[980px] select-none"
            onContextMenu={(event) => event.preventDefault()}
            onDragStart={(event) => event.preventDefault()}
            onCopy={(event) => event.preventDefault()}
            onCut={(event) => event.preventDefault()}
            style={{ userSelect: "none" }}
          >
            <div
              className="pointer-events-none absolute inset-0 rounded-[2rem] bg-cloud-blue/8 blur-3xl"
              aria-hidden="true"
            />

            <Image
              src={hostingHeroVisual}
              alt="Octalve Cloud hosting hero visual"
              priority
              draggable={false}
              className="pointer-events-none relative z-10 h-auto w-full select-none object-contain"
              style={
                {
                  WebkitTouchCallout: "none",
                  userSelect: "none",
                } as React.CSSProperties
              }
            />

            <div
              className="absolute inset-0 z-20"
              aria-hidden="true"
              onContextMenu={(event) => event.preventDefault()}
              onDragStart={(event) => event.preventDefault()}
              onCopy={(event) => event.preventDefault()}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
