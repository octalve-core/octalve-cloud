"use client";

import Image from "next/image";
import { Check } from "lucide-react";
import sslSecurityVisual from "@/assets/sections/ssl-security-visual.png";

const securityPoints = [
  {
    title: "Free SSL certificates",
    description:
      "installed automatically to help protect visitors, payments, forms, and sensitive website activity.",
  },
  {
    title: "Malware protection",
    description:
      "to help detect suspicious files early and keep your website environment cleaner and safer.",
  },
  {
    title: "Domain privacy protection",
    description:
      "to reduce public exposure of personal registration details where supported.",
  },
  {
    title: "Stronger access control",
    description:
      "with security-first hosting guidance, safer DNS setup, and protection-focused website management.",
  },
];

export function SSL() {
  return (
    <section className="overflow-hidden bg-white px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cloud-blue">
            SSL & Security
          </p>

          <h2 className="mt-5 text-4xl font-medium tracking-[-0.055em] text-slate-950 sm:text-5xl lg:text-[4rem] lg:leading-[0.98]">
            Security is our top priority.
          </h2>

          <p className="mt-5 max-w-xl text-base leading-8 text-slate-500 sm:text-lg">
            Octalve Cloud helps you keep your website safer with SSL,
            privacy-first domain protection, malware-aware hosting guidance, and
            security features built for growing businesses.
          </p>

          <ul className="mt-8 space-y-5">
            {securityPoints.map((point) => (
              <li
                key={point.title}
                className="flex items-start gap-3 text-base leading-7 text-slate-700 sm:text-lg"
              >
                <span className="mt-1 inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                  <Check className="h-3.5 w-3.5" aria-hidden="true" />
                </span>

                <span>
                  <strong className="font-semibold text-slate-950">
                    {point.title}
                  </strong>{" "}
                  {point.description}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative">
          <div
            className="relative mx-auto max-w-[780px] select-none"
            onContextMenu={(event) => event.preventDefault()}
            onDragStart={(event) => event.preventDefault()}
          >
            <div
              className="pointer-events-none absolute inset-0 rounded-[2rem] bg-cloud-blue/10 blur-3xl"
              aria-hidden="true"
            />

            <Image
              src={sslSecurityVisual}
              alt="Octalve Cloud SSL and domain privacy protection"
              priority={false}
              draggable={false}
              className="pointer-events-none relative z-10 h-auto w-full select-none object-contain drop-shadow-[0_28px_70px_rgba(15,23,42,0.10)]"
            />

            <div
              className="absolute inset-0 z-20"
              aria-hidden="true"
              onContextMenu={(event) => event.preventDefault()}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
