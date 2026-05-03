"use client";

import Image from "next/image";
import { Check } from "lucide-react";
import hostingPerformanceVisual from "@/assets/sections/hosting-performance-visual.png";

const performancePoints = [
  {
    title: "99.99% uptime guaranteed",
    description:
      "so your website stays available, dependable, and ready for visitors around the clock.",
  },
  {
    title: "Built for speed",
    description:
      "with performance-focused hosting infrastructure designed to help pages load faster and feel smoother.",
  },
  {
    title: "Reliable resource delivery",
    description:
      "to support traffic, content, and business growth without making your setup feel heavy or complicated.",
  },
  {
    title: "Growth-ready hosting support",
    description:
      "with guided assistance and dependable hosting built for brands, business websites, and online platforms.",
  },
];

export function Performance() {
  return (
    <section className="overflow-hidden bg-[#0064E0] px-4 py-16 text-white sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <div className="relative order-2 lg:order-1">
          <div
            className="relative mx-auto max-w-[760px] select-none"
            onContextMenu={(event) => event.preventDefault()}
            onDragStart={(event) => event.preventDefault()}
          >
            <div
              className="pointer-events-none absolute inset-0 rounded-[2rem] bg-white/10 blur-3xl"
              aria-hidden="true"
            />

            <Image
              src={hostingPerformanceVisual}
              alt="Octalve Cloud hosting performance dashboard visual"
              priority={false}
              draggable={false}
              className="pointer-events-none relative z-10 h-auto w-full select-none object-contain drop-shadow-[0_28px_70px_rgba(0,0,0,0.18)]"
            />

            <div
              className="absolute inset-0 z-20"
              aria-hidden="true"
              onContextMenu={(event) => event.preventDefault()}
            />
          </div>
        </div>

        <div className="order-1 max-w-2xl lg:order-2">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/75">
            Performance
          </p>

          <h2 className="mt-5 text-4xl font-medium tracking-[-0.055em] text-white sm:text-5xl lg:text-[4rem] lg:leading-[0.98]">
            High-performance hosting built for modern business websites.
          </h2>

          <p className="mt-5 max-w-xl text-base leading-8 text-white/80 sm:text-lg">
            Octalve Cloud gives your website the speed, uptime, and dependable
            hosting foundation it needs to perform better and grow with
            confidence.
          </p>

          <ul className="mt-8 space-y-5">
            {performancePoints.map((point) => (
              <li
                key={point.title}
                className="flex items-start gap-3 text-base leading-7 text-white/90 sm:text-lg"
              >
                <span className="mt-1 inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-white/15 text-white">
                  <Check className="h-3.5 w-3.5" aria-hidden="true" />
                </span>

                <span>
                  <strong className="font-semibold text-white">
                    {point.title}
                  </strong>{" "}
                  {point.description}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
