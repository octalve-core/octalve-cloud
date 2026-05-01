"use client";

import {
  Gauge,
  Mail,
  Rocket,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { useState } from "react";

type OverviewItem = {
  title: string;
  description: string;
  icon: LucideIcon;
  accent: "purple" | "blue" | "green" | "orange";
};

const overviewItems: OverviewItem[] = [
  {
    title: "99.99% Uptime",
    description:
      "Reliable cloud infrastructure that keeps your website online and performing smoothly.",
    icon: Gauge,
    accent: "green",
  },
  {
    title: "Launch in Minutes",
    description:
      "Register your domain, connect hosting, and get your business live without delay.",
    icon: Rocket,
    accent: "blue",
  },
  {
    title: "Secure by Default",
    description:
      "Free SSL, dependable security layers, and safer hosting for modern businesses.",
    icon: ShieldCheck,
    accent: "purple",
  },
  {
    title: "Email & Support",
    description:
      "Professional email, migration help, and guided support as your business grows.",
    icon: Mail,
    accent: "orange",
  },
];

/**
 * HOW TO ADD MORE CARDS:
 *
 * 1. Duplicate one object inside overviewItems.
 * 2. Change title, description, icon, and accent.
 * 3. Desktop will automatically fit the cards in rows.
 * 4. Mobile will automatically add a new dot for the new card.
 */

const accentMap = {
  purple: {
    topBorder: "border-t-[#8B5CF6]",
    iconWrap: "bg-[#8B5CF6]/15 text-[#A78BFA]",
    glow: "shadow-[0_0_0_1px_rgba(139,92,246,0.15),0_24px_60px_rgba(0,0,0,0.22)]",
  },
  blue: {
    topBorder: "border-t-[#0064E0]",
    iconWrap: "bg-[#0064E0]/16 text-[#60A5FA]",
    glow: "shadow-[0_0_0_1px_rgba(0,100,224,0.18),0_24px_60px_rgba(0,0,0,0.22)]",
  },
  green: {
    topBorder: "border-t-[#29BE3E]",
    iconWrap: "bg-[#29BE3E]/15 text-[#4ADE80]",
    glow: "shadow-[0_0_0_1px_rgba(41,190,62,0.15),0_24px_60px_rgba(0,0,0,0.22)]",
  },
  orange: {
    topBorder: "border-t-[#FC7E24]",
    iconWrap: "bg-[#FC7E24]/15 text-[#FDBA74]",
    glow: "shadow-[0_0_0_1px_rgba(252,126,36,0.15),0_24px_60px_rgba(0,0,0,0.22)]",
  },
};

function OverviewCard({ item }: { item: OverviewItem }) {
  const Icon = item.icon;
  const style = accentMap[item.accent];

  return (
    <article
      className={[
        "relative overflow-hidden rounded-[24px] border border-white/10 border-t-2 bg-white/[0.045] p-6 backdrop-blur-sm transition duration-300",
        "hover:-translate-y-1 hover:border-white/15 hover:bg-white/[0.06]",
        style.topBorder,
        style.glow,
      ].join(" ")}
    >
      <div
        className="pointer-events-none absolute -right-16 -top-16 h-36 w-36 rounded-full bg-white/[0.035] blur-2xl"
        aria-hidden="true"
      />

      <div className="relative">
        <div
          className={[
            "inline-flex h-12 w-12 items-center justify-center rounded-2xl",
            style.iconWrap,
          ].join(" ")}
        >
          <Icon className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
        </div>

        <h3 className="mt-5 text-[1.55rem] font-semibold leading-tight tracking-[-0.03em] text-white">
          {item.title}
        </h3>

        <p className="mt-4 text-sm leading-7 text-slate-400">
          {item.description}
        </p>
      </div>
    </article>
  );
}

export function Overview() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeItem = overviewItems[activeIndex];

  return (
    <section className="relative overflow-hidden bg-black px-4 py-16 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute left-1/2 top-0 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-cloud-blue/10 blur-3xl" />
        <div className="absolute bottom-[-180px] right-[-120px] h-[340px] w-[340px] rounded-full bg-[#29BE3E]/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cloud-blue">
            Overview
          </p>

          <h2 className="mt-4 text-3xl font-medium tracking-[-0.04em] text-white sm:text-4xl">
            Why businesses choose Octalve Cloud
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg">
            Everything you need to launch, protect, and grow your website with
            confidence.
          </p>
        </div>

        {/* Mobile: premium dot switcher */}
        <div className="mx-auto mt-10 max-w-sm md:hidden">
          <OverviewCard item={activeItem} />

          <div className="mt-6 flex items-center justify-center gap-2">
            {overviewItems.map((item, index) => {
              const isActive = index === activeIndex;

              return (
                <button
                  key={item.title}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Show ${item.title}`}
                  aria-current={isActive ? "true" : undefined}
                  className={[
                    "h-2.5 rounded-full transition-all duration-300",
                    isActive
                      ? "w-8 bg-cloud-blue shadow-[0_0_18px_rgba(0,100,224,0.55)]"
                      : "w-2.5 bg-white/25 hover:bg-white/45",
                  ].join(" ")}
                />
              );
            })}
          </div>
        </div>

        {/* Desktop: all cards in row */}
        <div className="mt-12 hidden gap-5 md:grid md:grid-cols-2 xl:grid-cols-4">
          {overviewItems.map((item) => (
            <OverviewCard key={item.title} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
