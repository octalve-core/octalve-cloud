"use client";

import Link from "next/link";
import { Check, ChevronDown } from "lucide-react";
import { useState } from "react";
import { cloudLinks } from "@/features/cloud/data/cloud-links";

type PackageCategory = "Shared Hosting" | "VPS";

type BillingCycle = "1mo" | "3mo" | "6mo" | "1yr" | "2yr" | "5yr" | "10yr";

type BillingOption = {
  key: BillingCycle;
  label: string;
  price: number;
  billingLabel: string;
  ctaHref: string;
};

type HostingPlan = {
  name: string;
  slug: string;
  category: PackageCategory;
  description: string;
  popular?: boolean;
  ctaLabel: string;
  billingOptions: BillingOption[];
  features: string[];
};

const INITIAL_VISIBLE_FEATURES = 7;

/**
 * Internal Octalve Cloud order route.
 *
 * This is for our own infrastructure, not Paymenter.
 * Future backend route idea:
 * console.octalve.cloud/order/:category/:package?cycle=:cycle
 */
function buildOrderLink(
  category: "shared-hosting" | "vps",
  packageSlug: string,
  cycle: BillingCycle,
) {
  return `${cloudLinks.console}/order/${category}/${packageSlug}?cycle=${cycle}`;
}

/**
 * Edit package names, prices, billing duration, and order links here.
 * Each package has independent pricing and independent CTA links per duration.
 */
const packages: HostingPlan[] = [
  {
    name: "Launch",
    slug: "launch",
    category: "Shared Hosting",
    description:
      "For simple portfolio, landing page, and small business websites.",
    ctaLabel: "Get Started",
    billingOptions: [
      {
        key: "1mo",
        label: "1 mo",
        price: 4500,
        billingLabel: "/1 month",
        ctaHref: buildOrderLink("shared-hosting", "launch", "1mo"),
      },
      {
        key: "3mo",
        label: "3 mo",
        price: 12500,
        billingLabel: "/3 months",
        ctaHref: buildOrderLink("shared-hosting", "launch", "3mo"),
      },
      {
        key: "6mo",
        label: "6 mo",
        price: 24000,
        billingLabel: "/6 months",
        ctaHref: buildOrderLink("shared-hosting", "launch", "6mo"),
      },
      {
        key: "1yr",
        label: "1 yr",
        price: 45000,
        billingLabel: "/year",
        ctaHref: buildOrderLink("shared-hosting", "launch", "1yr"),
      },
      {
        key: "2yr",
        label: "2 yr",
        price: 85000,
        billingLabel: "/2 years",
        ctaHref: buildOrderLink("shared-hosting", "launch", "2yr"),
      },
      {
        key: "5yr",
        label: "5 yr",
        price: 200000,
        billingLabel: "/5 years",
        ctaHref: buildOrderLink("shared-hosting", "launch", "5yr"),
      },
      {
        key: "10yr",
        label: "10 yr",
        price: 380000,
        billingLabel: "/10 years",
        ctaHref: buildOrderLink("shared-hosting", "launch", "10yr"),
      },
    ],
    features: [
      "1 Website",
      "1 GB SSD Storage",
      "10 GB Bandwidth",
      "2 Email Accounts",
      "2 Subdomains",
      "1 MySQL Database",
      "1 FTP Account",
      "Free SSL Certificate",
      "PHP Access",
      "CGI Access",
      "DNS Control",
      "Cron Jobs",
      "Spam Protection",
      "Login Keys",
      "System Info Access",
      "Suspend at Limit Protection",
    ],
  },
  {
    name: "Starter",
    slug: "starter",
    category: "Shared Hosting",
    description:
      "Best for business websites, growing brands, and multi-page projects.",
    popular: true,
    ctaLabel: "Get Started",
    billingOptions: [
      {
        key: "1mo",
        label: "1 mo",
        price: 9500,
        billingLabel: "/1 month",
        ctaHref: buildOrderLink("shared-hosting", "starter", "1mo"),
      },
      {
        key: "3mo",
        label: "3 mo",
        price: 27000,
        billingLabel: "/3 months",
        ctaHref: buildOrderLink("shared-hosting", "starter", "3mo"),
      },
      {
        key: "6mo",
        label: "6 mo",
        price: 52000,
        billingLabel: "/6 months",
        ctaHref: buildOrderLink("shared-hosting", "starter", "6mo"),
      },
      {
        key: "1yr",
        label: "1 yr",
        price: 95000,
        billingLabel: "/year",
        ctaHref: buildOrderLink("shared-hosting", "starter", "1yr"),
      },
      {
        key: "2yr",
        label: "2 yr",
        price: 180000,
        billingLabel: "/2 years",
        ctaHref: buildOrderLink("shared-hosting", "starter", "2yr"),
      },
      {
        key: "5yr",
        label: "5 yr",
        price: 430000,
        billingLabel: "/5 years",
        ctaHref: buildOrderLink("shared-hosting", "starter", "5yr"),
      },
      {
        key: "10yr",
        label: "10 yr",
        price: 800000,
        billingLabel: "/10 years",
        ctaHref: buildOrderLink("shared-hosting", "starter", "10yr"),
      },
    ],
    features: [
      "Up to 3 Websites",
      "10 GB SSD Storage",
      "Unlimited Bandwidth",
      "Unlimited Email Accounts",
      "Unlimited Subdomains",
      "10 MySQL Databases",
      "3 FTP Accounts",
      "3 Domain Pointers",
      "Free SSL Certificate",
      "PHP Access",
      "CGI Access",
      "DNS Control",
      "Cron Jobs",
      "Spam Protection",
      "Unlimited Autoresponders",
      "Unlimited Email Forwarders",
      "Priority Setup Guidance",
    ],
  },
  {
    name: "VPS 1",
    slug: "vps-1",
    category: "VPS",
    description:
      "For projects that need more control, stronger performance, and scalability.",
    ctaLabel: "Get Started",
    billingOptions: [
      {
        key: "1mo",
        label: "1 mo",
        price: 35000,
        billingLabel: "/1 month",
        ctaHref: buildOrderLink("vps", "vps-1", "1mo"),
      },
      {
        key: "3mo",
        label: "3 mo",
        price: 100000,
        billingLabel: "/3 months",
        ctaHref: buildOrderLink("vps", "vps-1", "3mo"),
      },
      {
        key: "6mo",
        label: "6 mo",
        price: 195000,
        billingLabel: "/6 months",
        ctaHref: buildOrderLink("vps", "vps-1", "6mo"),
      },
      {
        key: "1yr",
        label: "1 yr",
        price: 380000,
        billingLabel: "/year",
        ctaHref: buildOrderLink("vps", "vps-1", "1yr"),
      },
      {
        key: "2yr",
        label: "2 yr",
        price: 740000,
        billingLabel: "/2 years",
        ctaHref: buildOrderLink("vps", "vps-1", "2yr"),
      },
      {
        key: "5yr",
        label: "5 yr",
        price: 1750000,
        billingLabel: "/5 years",
        ctaHref: buildOrderLink("vps", "vps-1", "5yr"),
      },
      {
        key: "10yr",
        label: "10 yr",
        price: 3300000,
        billingLabel: "/10 years",
        ctaHref: buildOrderLink("vps", "vps-1", "10yr"),
      },
    ],
    features: [
      "Dedicated VPS Environment",
      "Better Performance Isolation",
      "Custom Server Setup",
      "Host Multiple Projects",
      "Free SSL Support",
      "Server-Level Flexibility",
      "Migration Assistance",
      "Business-Ready Infrastructure",
      "Scalable Upgrade Path",
      "Technical Setup Guidance",
      "Suitable for Apps & Portals",
      "Improved Resource Control",
      "Managed Support Option",
    ],
  },
];

function formatNaira(value: number) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(value);
}

export function Packages() {
  const [expandedPlans, setExpandedPlans] = useState<Record<string, boolean>>(
    {},
  );

  const [selectedBilling, setSelectedBilling] = useState<
    Record<string, BillingCycle>
  >({});

  function togglePlan(planSlug: string) {
    setExpandedPlans((current) => ({
      ...current,
      [planSlug]: !current[planSlug],
    }));
  }

  function updateBilling(planSlug: string, billingKey: BillingCycle) {
    setSelectedBilling((current) => ({
      ...current,
      [planSlug]: billingKey,
    }));
  }

  return (
    <section className="bg-white px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cloud-blue">
            Hosting Packages
          </p>

          <h2 className="mt-4 text-3xl font-medium tracking-[-0.045em] text-slate-950 sm:text-4xl lg:text-5xl">
            Simple, <span className="text-cloud-blue">Transparent Pricing</span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-500 sm:text-lg">
            Pick the plan that fits your website, business, or application.
            Choose a billing duration and see the price update instantly.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {packages.map((plan) => {
            const selectedBillingKey =
              selectedBilling[plan.slug] ?? plan.billingOptions[0].key;

            const selectedOption =
              plan.billingOptions.find(
                (option) => option.key === selectedBillingKey,
              ) ?? plan.billingOptions[0];

            const isExpanded = Boolean(expandedPlans[plan.slug]);

            const visibleFeatures = isExpanded
              ? plan.features
              : plan.features.slice(0, INITIAL_VISIBLE_FEATURES);

            return (
              <article
                key={plan.slug}
                className={[
                  "relative flex h-full flex-col rounded-[2rem] border bg-white p-7 transition duration-300",
                  plan.popular
                    ? "border-cloud-blue/30 shadow-[0_24px_70px_rgba(0,100,224,0.13)]"
                    : "border-slate-200 shadow-sm hover:border-cloud-blue/20 hover:shadow-[0_20px_50px_rgba(15,23,42,0.06)]",
                ].join(" ")}
              >
                {plan.popular ? (
                  <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
                    <span className="inline-flex rounded-full bg-cloud-blue px-4 py-1.5 text-xs font-semibold text-white shadow-sm">
                      Most Popular
                    </span>
                  </div>
                ) : null}

                <div>
                  <p className="text-sm font-medium text-slate-500">
                    {plan.category}
                  </p>

                  <h3 className="mt-3 text-2xl font-medium tracking-[-0.03em] text-slate-950">
                    {plan.name}
                  </h3>

                  <div className="mt-5 flex items-end gap-1">
                    <span className="text-4xl font-medium tracking-[-0.055em] text-slate-950 sm:text-5xl">
                      {formatNaira(selectedOption.price)}
                    </span>

                    <span className="pb-1 text-base font-normal text-slate-500">
                      {selectedOption.billingLabel}
                    </span>
                  </div>

                  <p className="mt-3 text-sm font-semibold text-cloud-blue">
                    Reliable setup for your business
                  </p>

                  <p className="mt-3 text-base leading-7 text-slate-500">
                    {plan.description}
                  </p>
                </div>

                <div className="mt-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                    Billing duration
                  </p>

                  <div className="mt-3 grid grid-cols-3 gap-2">
                    {plan.billingOptions.map((option) => {
                      const isSelected = option.key === selectedOption.key;

                      return (
                        <button
                          key={option.key}
                          type="button"
                          onClick={() => updateBilling(plan.slug, option.key)}
                          className={[
                            "rounded-full border px-3 py-2 text-xs font-semibold transition",
                            isSelected
                              ? "border-cloud-blue bg-cloud-blue text-white shadow-sm"
                              : "border-slate-200 bg-white text-slate-600 hover:border-cloud-blue/40 hover:text-cloud-blue",
                          ].join(" ")}
                        >
                          {option.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <ul className="mt-8 flex-1 space-y-4">
                  {visibleFeatures.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3 text-sm leading-6 text-slate-700 sm:text-base"
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
                    onClick={() => togglePlan(plan.slug)}
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

                <div className="mt-8">
                  <Link
                    href={selectedOption.ctaHref}
                    target="_blank"
                    rel="noreferrer"
                    className={[
                      "inline-flex min-h-12 w-full items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition",
                      plan.popular
                        ? "bg-cloud-blue text-white shadow-[0_14px_35px_rgba(0,100,224,0.25)] hover:-translate-y-0.5 hover:bg-blue-600"
                        : "border border-slate-200 bg-white text-slate-950 hover:-translate-y-0.5 hover:border-cloud-blue/30 hover:bg-slate-50 hover:text-cloud-blue",
                    ].join(" ")}
                  >
                    {plan.ctaLabel}
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
