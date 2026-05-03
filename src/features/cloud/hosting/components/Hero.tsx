"use client";

import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Shield } from "lucide-react";
import { cloudLinks } from "@/features/cloud/data/cloud-links";
import hostingHeroVisual from "@/assets/sections/hosting-hero-visual.png";

const heroPoints = [
  "99.99% uptime guaranteed",
  "Fully managed web hosting",
  "24/7 customer support",
];

export function Hero() {
  return (
    <section className="overflow-hidden bg-[#F8FAFC] px-4 py-14 sm:px-6 lg:px-8 lg:py-20 xl:py-24">
      <div className="mx-auto grid w-full max-w-[1540px] items-center gap-12 lg:grid-cols-[0.98fr_1.02fr] lg:gap-10 xl:gap-14">
        <div className="mx-auto w-full max-w-[680px] lg:mx-0">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cloud-blue">
            Web Hosting
          </p>

          <h1 className="mt-6 max-w-[680px] text-[3.15rem] font-medium leading-[0.98] tracking-[-0.06em] text-slate-950 sm:text-[4rem] lg:text-[4.65rem] xl:text-[5.15rem]">
            Everything your website needs to grow
            <span className="mx-3 hidden h-[3px] w-20 translate-y-[-0.35em] bg-slate-950 align-middle lg:inline-block" />
            fast, secure, and affordable.
          </h1>

          <p className="mt-7 max-w-[620px] text-base leading-8 text-slate-500 sm:text-lg">
            Launch with dependable hosting infrastructure built for performance,
            security, and smooth growth. Get the speed and support you need to
            stay online with confidence.
          </p>

          <ul className="mt-8 space-y-4">
            {heroPoints.map((point) => (
              <li
                key={point}
                className="flex items-center gap-3 text-base leading-7 text-slate-700 sm:text-lg"
              >
                <span className="inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                  <Check className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
                <span>{point}</span>
              </li>
            ))}
          </ul>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href={cloudLinks.console}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full bg-cloud-blue px-8 text-sm font-semibold text-white shadow-[0_18px_40px_rgba(0,100,224,0.24)] transition hover:-translate-y-0.5 hover:bg-blue-600"
            >
              Get Started
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>

            <Link
              href="/contact"
              className="inline-flex min-h-13 items-center justify-center rounded-full border border-slate-200 bg-white px-8 text-sm font-semibold text-cloud-blue shadow-sm transition hover:-translate-y-0.5 hover:border-cloud-blue/30 hover:bg-slate-50"
            >
              Contact Sales
            </Link>
          </div>

          <div className="mt-7 flex items-center gap-3 text-sm text-slate-500 sm:text-base">
            <Shield className="h-4 w-4 text-slate-500" aria-hidden="true" />
            <span>30-day money-back guarantee</span>
          </div>
        </div>

        <div className="relative flex min-h-[420px] items-center justify-center lg:min-h-[560px]">
          <div
            className="relative mx-auto w-full max-w-[900px] select-none lg:-mr-12 xl:-mr-20"
            onContextMenu={(event) => event.preventDefault()}
            onDragStart={(event) => event.preventDefault()}
            onCopy={(event) => event.preventDefault()}
            onCut={(event) => event.preventDefault()}
            style={{ userSelect: "none" }}
          >
            <div
              className="pointer-events-none absolute left-1/2 top-1/2 h-[72%] w-[82%] -translate-x-1/2 -translate-y-1/2 rounded-[3rem] bg-cloud-blue/10 blur-3xl"
              aria-hidden="true"
            />

            <Image
              src={hostingHeroVisual}
              alt="Octalve Cloud hosting hero visual"
              priority
              draggable={false}
              sizes="(min-width: 1280px) 820px, (min-width: 1024px) 55vw, 100vw"
              className="pointer-events-none relative z-10 h-auto w-full scale-[1.08] select-none object-contain lg:scale-[1.14] xl:scale-[1.2]"
              style={
                {
                  WebkitTouchCallout: "none",
                  userSelect: "none",
                } as CSSProperties
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
