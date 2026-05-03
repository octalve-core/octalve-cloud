"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Shield } from "lucide-react";
import { cloudLinks } from "@/features/cloud/data/cloud-links";
import vpsHeroVisual from "@/assets/sections/vps-hero-visual.png";

const heroPoints = [
  "Blazing-fast infrastructure",
  "Advanced customization",
  // "Seamless scalability",
  // "Strong security",
  "Free weekly backups",
];

export function Hero() {
  return (
    <section className="overflow-hidden bg-[#021A34] px-4 py-16 text-white sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.84fr_1.16fr] lg:items-center lg:gap-14 xl:gap-20">
        <div className="max-w-[590px]">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-200">
            Cloud Servers
          </p>

          <h1 className="mt-5 text-[2.1rem] font-medium tracking-[-0.045em] text-white sm:text-[2.45rem] lg:text-[2.9rem] lg:leading-[1.06] xl:text-[3.15rem]">
            Boost Your Online Presence with High-Performance Cloud Servers
          </h1>

          <p className="mt-6 max-w-xl text-base leading-8 text-slate-300 sm:text-lg">
            Scalable, reliable VPS infrastructure built for modern businesses
            that demand speed, uptime, and full control.
          </p>

          <ul className="mt-8 space-y-4">
            {heroPoints.map((point) => (
              <li
                key={point}
                className="flex items-start gap-3 text-base leading-7 text-slate-200 sm:text-[1.05rem]"
              >
                <span className="mt-1 inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400">
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
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-cloud-blue px-7 text-sm font-semibold text-white shadow-[0_14px_30px_rgba(0,100,224,0.28)] transition hover:-translate-y-0.5 hover:bg-blue-600"
            >
              Get Started
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>

            <Link
              href="/contact"
              className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/15 bg-white/5 px-7 text-sm font-semibold text-white backdrop-blur-sm transition hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/10"
            >
              Contact Sales
            </Link>
          </div>

          <div className="mt-6 flex items-center gap-3 text-sm text-slate-300 sm:text-base">
            <Shield className="h-4 w-4 text-slate-300" aria-hidden="true" />
            <span>Built for performance, uptime, and control</span>
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
              className="pointer-events-none absolute inset-0 rounded-[2rem] bg-cloud-blue/10 blur-3xl"
              aria-hidden="true"
            />

            <Image
              src={vpsHeroVisual}
              alt="Octalve Cloud VPS hero visual"
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
