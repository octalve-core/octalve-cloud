import {
  Gauge,
  Mail,
  Rocket,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

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
    title: "Business Email & Support",
    description:
      "Professional email, migration help, and guided support as your business grows.",
    icon: Mail,
    accent: "orange",
  },
];

/**
 * To add more cards later:
 * 1. Duplicate one item in overviewItems
 * 2. Change the title, description, icon, and accent
 * 3. The mobile slider will automatically include it
 * 4. On desktop, cards will continue to align neatly
 */

const accentMap = {
  purple: {
    border: "border-t-[#8B5CF6]",
    iconWrap: "bg-[#8B5CF6]/12 text-[#8B5CF6]",
    glow: "shadow-[0_0_0_1px_rgba(139,92,246,0.14)]",
  },
  blue: {
    border: "border-t-[#3B82F6]",
    iconWrap: "bg-[#3B82F6]/12 text-[#3B82F6]",
    glow: "shadow-[0_0_0_1px_rgba(59,130,246,0.14)]",
  },
  green: {
    border: "border-t-[#10B981]",
    iconWrap: "bg-[#10B981]/12 text-[#10B981]",
    glow: "shadow-[0_0_0_1px_rgba(16,185,129,0.14)]",
  },
  orange: {
    border: "border-t-[#F59E0B]",
    iconWrap: "bg-[#F59E0B]/12 text-[#F59E0B]",
    glow: "shadow-[0_0_0_1px_rgba(245,158,11,0.14)]",
  },
};

export function Overview() {
  return (
    <section className="bg-[#000000] px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
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

        {/* Mobile: horizontal slider | Desktop: 4 cards in a row */}
        <div className="mt-10 md:mt-12">
          <div className="flex gap-4 overflow-x-auto pb-3 snap-x snap-mandatory md:grid md:grid-cols-4 md:overflow-visible md:pb-0">
            {overviewItems.map((item) => {
              const Icon = item.icon;
              const style = accentMap[item.accent];

              return (
                <article
                  key={item.title}
                  className={[
                    "snap-start min-w-[280px] rounded-[24px] border border-white/10 border-t-2 bg-[linear-gradient(180deg,rgba(255,255,255,0.05)_0%,rgba(255,255,255,0.03)_100%)] p-6",
                    "transition duration-300 hover:-translate-y-1 hover:border-white/15",
                    "md:min-w-0",
                    style.border,
                    style.glow,
                  ].join(" ")}
                >
                  <div
                    className={[
                      "inline-flex h-12 w-12 items-center justify-center rounded-2xl",
                      style.iconWrap,
                    ].join(" ")}
                  >
                    <Icon className="h-5 w-5" strokeWidth={2} />
                  </div>

                  <h3 className="mt-5 text-[1.9rem] font-semibold leading-[1.25] tracking-[-0.03em] text-white">
                    {item.title}
                  </h3>

                  <p className="mt-4 text-base leading-8 text-slate-400">
                    {item.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
