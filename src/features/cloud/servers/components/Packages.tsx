"use client";

import Link from "next/link";
import {
  Check,
  ChevronDown,
  Cpu,
  Database,
  HardDrive,
  Headphones,
  Network,
  RefreshCcw,
  ShieldCheck,
} from "lucide-react";
import { useMemo, useState } from "react";
import {
  billingCycles,
  buildPlanCtaHref,
  calculatePlanPricing,
  DEFAULT_BILLING_CYCLE,
  homePricePlans,
  type BillingCycleKey,
  type PackageCategoryKey,
} from "@/features/cloud/data/home-price";

const VPS_CATEGORY_KEY = "vps" as PackageCategoryKey;
const INITIAL_VISIBLE_FEATURES = 4;

const sharedFeatures = [
  "AMD EPYC-ready performance",
  "NVMe SSD storage",
  "Global-ready server foundation",
  "Free weekly backups",
  "Firewall management guidance",
  "Fast network performance",
  "API-ready infrastructure",
  "AI-managed support direction",
  "Free domain for 1 year on eligible plans",
];

const benefitItems = [
  {
    label: "Scalable VPS infrastructure",
    icon: RefreshCcw,
  },
  {
    label: "Strong security foundation",
    icon: ShieldCheck,
  },
  {
    label: "Guided server support",
    icon: Headphones,
  },
];

const planIcons = [Cpu, Database, HardDrive, Network];

export function Packages() {
  const [billingCycle, setBillingCycle] = useState<BillingCycleKey>(
    DEFAULT_BILLING_CYCLE,
  );

  const [expandedPlans, setExpandedPlans] = useState<Record<string, boolean>>(
    {},
  );

  const visiblePlans = useMemo(() => {
    return homePricePlans.filter((plan) => plan.category === VPS_CATEGORY_KEY);
  }, []);

  function togglePlan(planId: string) {
    setExpandedPlans((current) => ({
      ...current,
      [planId]: !current[planId],
    }));
  }

  return (
    <section className="overflow-hidden bg-[#000A16] px-4 py-16 text-white sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-200">
            VPS Packages
          </p>

          <h2 className="mt-4 text-3xl font-medium tracking-[-0.05em] text-white sm:text-4xl lg:text-5xl">
            Choose your <span className="text-cloud-blue">Cloud VPS</span>{" "}
            hosting plan.
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
            Pick the VPS plan that gives your website, app, portal, or business
            system more speed, control, security, and room to scale.
          </p>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-5 text-sm font-medium text-slate-300">
            {benefitItems.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.label}
                  className="inline-flex items-center gap-2"
                >
                  <Icon
                    className="h-4 w-4 text-cloud-blue"
                    aria-hidden="true"
                  />
                  <span>{item.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mx-auto mt-10 max-w-md">
          <label className="mb-2 block text-sm font-medium text-slate-300">
            Length of subscription
          </label>

          <div className="relative">
            <select
              value={billingCycle}
              onChange={(event) =>
                setBillingCycle(event.target.value as BillingCycleKey)
              }
              className="h-12 w-full appearance-none rounded-2xl border border-white/10 bg-white/10 px-4 pr-10 text-sm font-semibold text-white outline-none shadow-[0_18px_45px_rgba(0,0,0,0.22)] backdrop-blur transition focus:border-cloud-blue focus:ring-4 focus:ring-cloud-blue/20"
            >
              {billingCycles.map((cycle) => (
                <option
                  key={cycle.key}
                  value={cycle.key}
                  className="text-slate-950"
                >
                  {cycle.label}
                  {cycle.badge ? ` — ${cycle.badge}` : ""}
                </option>
              ))}
            </select>

            <ChevronDown
              className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-300"
              aria-hidden="true"
            />
          </div>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-4">
          {visiblePlans.map((plan, planIndex) => {
            const displayPrice = calculatePlanPricing(plan, billingCycle);
            const ctaHref = buildPlanCtaHref(plan, billingCycle);
            const isExpanded = Boolean(expandedPlans[plan.id]);

            const visibleFeatures = isExpanded
              ? plan.features
              : plan.features.slice(0, INITIAL_VISIBLE_FEATURES);

            const isExternal = ctaHref.startsWith("http");

            return (
              <article
                key={plan.id}
                className={[
                  "relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border p-5 transition duration-300",
                  "bg-white/[0.075] shadow-[0_24px_70px_rgba(0,0,0,0.28)] backdrop-blur",
                  plan.popular
                    ? "border-cloud-blue shadow-[0_28px_90px_rgba(0,100,224,0.24)]"
                    : "border-white/10 hover:-translate-y-1 hover:border-cloud-blue/45",
                ].join(" ")}
              >
                {plan.popular ? (
                  <div className="absolute inset-x-0 top-0 bg-cloud-blue px-5 py-3 text-center text-xs font-semibold uppercase tracking-[0.14em] text-white">
                    Most Popular
                  </div>
                ) : null}

                <div className={plan.popular ? "pt-10" : ""}>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-medium uppercase tracking-[0.14em] text-slate-400">
                        {plan.eyebrow ?? "Cloud Server"}
                      </p>

                      <h3 className="mt-3 text-xl font-semibold tracking-[-0.035em] text-white">
                        {plan.name}
                      </h3>
                    </div>

                    {displayPrice.discountPercent ? (
                      <span className="rounded-full bg-cloud-blue/20 px-3 py-1 text-xs font-semibold text-blue-200">
                        {displayPrice.discountPercent}% off
                      </span>
                    ) : null}
                  </div>

                  <div className="mt-6">
                    {displayPrice.regularPriceLabel ? (
                      <p className="text-sm font-medium text-slate-500 line-through">
                        {displayPrice.regularPriceLabel}
                      </p>
                    ) : null}

                    <div className="mt-1 flex items-end gap-1">
                      <span className="text-3xl font-semibold tracking-[-0.055em] text-white sm:text-4xl">
                        {displayPrice.priceLabel}
                      </span>

                      <span className="pb-1 text-sm font-normal text-slate-300">
                        {displayPrice.suffix}
                      </span>
                    </div>

                    {displayPrice.renewsLabel ? (
                      <p className="mt-3 min-h-[40px] text-xs leading-6 text-slate-400">
                        {displayPrice.renewsLabel} Cancel anytime.
                      </p>
                    ) : null}
                  </div>

                  <Link
                    href={ctaHref}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noreferrer" : undefined}
                    className={[
                      "mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold transition",
                      plan.popular
                        ? "bg-white text-slate-950 hover:-translate-y-0.5 hover:bg-blue-50"
                        : "border border-white/35 bg-transparent text-white hover:-translate-y-0.5 hover:border-cloud-blue hover:bg-cloud-blue",
                    ].join(" ")}
                  >
                    {plan.ctaLabel ?? "Choose plan"}
                  </Link>
                </div>

                <div className="mt-7 border-t border-white/10 pt-6">
                  <ul className="space-y-4">
                    {visibleFeatures.map((feature, featureIndex) => {
                      const Icon = planIcons[featureIndex] ?? Check;

                      return (
                        <li
                          key={feature}
                          className="flex items-start gap-3 text-sm leading-6 text-slate-200"
                        >
                          <span className="mt-0.5 inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full text-slate-400">
                            <Icon className="h-4 w-4" aria-hidden="true" />
                          </span>

                          <span>{feature}</span>
                        </li>
                      );
                    })}
                  </ul>

                  {plan.features.length > INITIAL_VISIBLE_FEATURES ? (
                    <button
                      type="button"
                      onClick={() => togglePlan(plan.id)}
                      className="mx-auto mt-7 inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition hover:text-white"
                      aria-expanded={isExpanded}
                    >
                      {isExpanded ? "Show less" : "Show more"}

                      <ChevronDown
                        className={[
                          "h-4 w-4 transition-transform",
                          isExpanded ? "rotate-180" : "",
                        ].join(" ")}
                        aria-hidden="true"
                      />
                    </button>
                  ) : null}
                </div>

                <div
                  className={[
                    "pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full blur-3xl",
                    planIndex === 1 ? "bg-cloud-blue/20" : "bg-white/5",
                  ].join(" ")}
                  aria-hidden="true"
                />
              </article>
            );
          })}
        </div>

        <div className="mt-6 rounded-[1.75rem] border border-white/10 bg-white/[0.075] p-6 shadow-[0_24px_70px_rgba(0,0,0,0.22)] backdrop-blur sm:p-8">
          <h3 className="text-center text-2xl font-semibold tracking-[-0.04em] text-white">
            Every plan has{" "}
            <span className="text-cloud-blue">everything you need</span> and
            more
          </h3>

          <div className="mx-auto mt-8 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sharedFeatures.map((feature) => (
              <div
                key={feature}
                className="flex items-start gap-3 text-sm leading-6 text-slate-200"
              >
                <span className="mt-1 inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400">
                  <Check className="h-3.5 w-3.5" aria-hidden="true" />
                </span>

                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {!visiblePlans.length ? (
          <div className="mt-10 rounded-[1.75rem] border border-orange-300/20 bg-orange-400/10 p-6 text-center">
            <p className="text-sm font-semibold text-orange-200">
              No VPS plans found.
            </p>
            <p className="mt-2 text-sm leading-7 text-orange-100/80">
              Add VPS plans inside{" "}
              <code className="rounded bg-white/10 px-1.5 py-0.5">
                src/features/cloud/data/home-price.ts
              </code>{" "}
              using category{" "}
              <code className="rounded bg-white/10 px-1.5 py-0.5">vps</code>.
            </p>
          </div>
        ) : null}
      </div>
    </section>
  );
}
