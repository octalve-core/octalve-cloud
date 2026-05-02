"use client";

import Link from "next/link";
import {
  BadgeCheck,
  Check,
  ChevronDown,
  Headphones,
  RefreshCcw,
  ShieldCheck,
} from "lucide-react";
import { useMemo, useState } from "react";
import {
  billingCycles,
  buildPlanCtaHref,
  calculatePlanPricing,
  DEFAULT_BILLING_CYCLE,
  homePriceCategories,
  homePricePlans,
  type BillingCycleKey,
  type PackageCategoryKey,
} from "@/features/cloud/data/home-price";

const INITIAL_VISIBLE_FEATURES = 7;

const benefitItems = [
  {
    label: "30-day money-back guarantee",
    icon: ShieldCheck,
  },
  {
    label: "24/7 support",
    icon: Headphones,
  },
  {
    label: "Upgrade anytime",
    icon: RefreshCcw,
  },
];

export function Packages() {
  const [activeCategory, setActiveCategory] =
    useState<PackageCategoryKey>("hosting");

  const [billingCycle, setBillingCycle] = useState<BillingCycleKey>(
    DEFAULT_BILLING_CYCLE,
  );

  const [expandedPlans, setExpandedPlans] = useState<Record<string, boolean>>(
    {},
  );

  const activeCategoryData =
    homePriceCategories.find((item) => item.key === activeCategory) ??
    homePriceCategories[0];

  const visiblePlans = useMemo(() => {
    return homePricePlans.filter((plan) => plan.category === activeCategory);
  }, [activeCategory]);

  function togglePlan(planId: string) {
    setExpandedPlans((current) => ({
      ...current,
      [planId]: !current[planId],
    }));
  }

  return (
    <section className="bg-[#F8FAFC] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cloud-blue">
            Packages
          </p>

          <h2 className="mt-4 text-3xl font-medium tracking-[-0.05em] text-slate-950 sm:text-4xl lg:text-5xl">
            Buy a domain and everything else you need.
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-500 sm:text-lg">
            Choose domains, hosting, email, WordPress, security, and VPS
            services from one clean Octalve Cloud experience.
          </p>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-5 text-sm font-medium text-slate-600">
            {benefitItems.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.label}
                  className="inline-flex items-center gap-2"
                >
                  <Icon className="h-4 w-4 text-slate-400" aria-hidden="true" />
                  <span>{item.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mx-auto mt-10 max-w-5xl">
          <div className="grid gap-4 lg:grid-cols-[1fr_0.55fr] lg:items-end">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700 lg:hidden">
                Choose package type
              </label>

              <select
                value={activeCategory}
                onChange={(event) =>
                  setActiveCategory(event.target.value as PackageCategoryKey)
                }
                className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-900 outline-none transition focus:border-cloud-blue focus:ring-4 focus:ring-cloud-blue/10 lg:hidden"
              >
                {homePriceCategories.map((category) => (
                  <option key={category.key} value={category.key}>
                    {category.label}
                  </option>
                ))}
              </select>

              <div className="hidden rounded-2xl border border-slate-200 bg-white p-1 shadow-[0_12px_34px_rgba(15,23,42,0.04)] lg:flex">
                {homePriceCategories.map((category) => {
                  const isActive = activeCategory === category.key;

                  return (
                    <button
                      key={category.key}
                      type="button"
                      onClick={() => setActiveCategory(category.key)}
                      className={[
                        "min-h-11 flex-1 rounded-xl px-4 text-sm font-semibold transition",
                        isActive
                          ? "bg-cloud-blue text-white shadow-[0_10px_26px_rgba(0,100,224,0.18)]"
                          : "text-slate-600 hover:bg-slate-50 hover:text-cloud-blue",
                      ].join(" ")}
                    >
                      {category.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Length of subscription
              </label>

              <div className="relative">
                <select
                  value={billingCycle}
                  onChange={(event) =>
                    setBillingCycle(event.target.value as BillingCycleKey)
                  }
                  className="h-12 w-full appearance-none rounded-2xl border border-slate-200 bg-white px-4 pr-10 text-sm font-semibold text-slate-900 outline-none shadow-[0_12px_34px_rgba(15,23,42,0.04)] transition focus:border-cloud-blue focus:ring-4 focus:ring-cloud-blue/10"
                >
                  {billingCycles.map((cycle) => (
                    <option key={cycle.key} value={cycle.key}>
                      {cycle.label}
                      {cycle.badge ? ` — ${cycle.badge}` : ""}
                    </option>
                  ))}
                </select>

                <ChevronDown
                  className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500"
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>

          <div className="mt-7 rounded-[1.75rem] border border-slate-200 bg-white px-5 py-5 text-center shadow-[0_16px_45px_rgba(15,23,42,0.045)] sm:px-7">
            <p className="text-sm font-semibold text-cloud-blue">
              {activeCategoryData.label}
            </p>
            <p className="mx-auto mt-2 max-w-2xl text-sm leading-7 text-slate-500">
              {activeCategoryData.description}
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {visiblePlans.map((plan) => {
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
                  "relative flex h-full flex-col overflow-hidden rounded-[2rem] border bg-white p-7 transition duration-300",
                  plan.popular
                    ? "border-cloud-blue/40 shadow-[0_28px_80px_rgba(0,100,224,0.16)]"
                    : "border-slate-200 shadow-[0_18px_50px_rgba(15,23,42,0.045)] hover:-translate-y-1 hover:border-cloud-blue/25 hover:shadow-[0_28px_75px_rgba(15,23,42,0.08)]",
                ].join(" ")}
              >
                {plan.popular ? (
                  <div className="absolute inset-x-0 top-0 bg-cloud-blue px-5 py-3 text-center text-xs font-semibold uppercase tracking-[0.14em] text-white">
                    Most Popular
                  </div>
                ) : null}

                <div className={plan.popular ? "pt-9" : ""}>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      {plan.eyebrow ? (
                        <p className="text-sm font-medium text-slate-500">
                          {plan.eyebrow}
                        </p>
                      ) : null}

                      <h3 className="mt-2 text-2xl font-medium tracking-[-0.04em] text-slate-950">
                        {plan.name}
                      </h3>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      {plan.badge ? (
                        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                          {plan.badge}
                        </span>
                      ) : null}

                      {displayPrice.discountPercent ? (
                        <span className="rounded-full bg-cloud-blue/10 px-3 py-1 text-xs font-semibold text-cloud-blue">
                          {displayPrice.discountPercent}% off
                        </span>
                      ) : null}
                    </div>
                  </div>

                  <p className="mt-4 min-h-[56px] text-base leading-7 text-slate-500">
                    {plan.description}
                  </p>

                  <div className="mt-6">
                    {displayPrice.regularPriceLabel ? (
                      <p className="text-sm font-medium text-slate-400 line-through">
                        {displayPrice.regularPriceLabel}
                      </p>
                    ) : null}

                    <div className="mt-1 flex items-end gap-1">
                      <span className="text-4xl font-medium tracking-[-0.055em] text-slate-950 sm:text-5xl">
                        {displayPrice.priceLabel}
                      </span>

                      <span className="pb-1 text-base font-normal text-slate-500">
                        {displayPrice.suffix}
                      </span>
                    </div>

                    {displayPrice.totalLabel ? (
                      <p className="mt-3 text-sm leading-6 text-slate-500">
                        {displayPrice.totalLabel}
                      </p>
                    ) : null}

                    {displayPrice.renewsLabel ? (
                      <p className="mt-1 text-sm leading-6 text-slate-400">
                        {displayPrice.renewsLabel}
                      </p>
                    ) : null}
                  </div>

                  <Link
                    href={ctaHref}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noreferrer" : undefined}
                    className={[
                      "mt-7 inline-flex min-h-12 w-full items-center justify-center rounded-2xl px-6 py-3 text-sm font-semibold transition",
                      plan.popular
                        ? "bg-cloud-blue text-white shadow-[0_16px_35px_rgba(0,100,224,0.24)] hover:-translate-y-0.5 hover:bg-blue-600"
                        : "border border-cloud-blue/35 bg-white text-cloud-blue hover:-translate-y-0.5 hover:bg-cloud-blue hover:text-white",
                    ].join(" ")}
                  >
                    {plan.ctaLabel ?? "Choose plan"}
                  </Link>

                  {plan.finePrint ? (
                    <p className="mt-4 text-xs leading-6 text-slate-400">
                      {plan.finePrint}
                    </p>
                  ) : null}
                </div>

                <div className="mt-7 border-t border-slate-200 pt-7">
                  <ul className="space-y-4">
                    {visibleFeatures.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-3 text-sm leading-6 text-slate-700"
                      >
                        <span className="mt-0.5 inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                          <Check className="h-3.5 w-3.5" aria-hidden="true" />
                        </span>

                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {plan.features.length > INITIAL_VISIBLE_FEATURES ? (
                    <button
                      type="button"
                      onClick={() => togglePlan(plan.id)}
                      className="mx-auto mt-7 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-cloud-blue"
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

                {plan.popular ? (
                  <div
                    className="pointer-events-none absolute -right-20 -top-20 h-44 w-44 rounded-full bg-cloud-blue/10 blur-3xl"
                    aria-hidden="true"
                  />
                ) : null}

                <div
                  className="pointer-events-none absolute bottom-5 right-5 text-cloud-blue/5"
                  aria-hidden="true"
                >
                  <BadgeCheck className="h-24 w-24" />
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
