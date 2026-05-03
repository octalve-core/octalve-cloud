import Link from "next/link";
import {
  BadgeCheck,
  Check,
  GlobeLock,
  Headphones,
  LockKeyhole,
  RefreshCcw,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import {
  buildPlanCtaHref,
  calculatePlanPricing,
  DEFAULT_BILLING_CYCLE,
  homePricePlans,
} from "@/features/cloud/data/home-price";

const benefitItems = [
  {
    label: "Browser trust and HTTPS protection",
    icon: ShieldCheck,
  },
  {
    label: "Guided SSL setup support",
    icon: LockKeyhole,
  },
  {
    label: "Centralised pricing from one source",
    icon: Sparkles,
  },
];

const certificateIncludes = [
  {
    title: "HTTPS protection",
    description:
      "Every certificate helps your website load securely over HTTPS and improves visitor trust.",
    icon: GlobeLock,
  },
  {
    title: "Setup guidance",
    description:
      "Get direction for SSL activation, DNS alignment, hosting connection, and browser trust checks.",
    icon: Headphones,
  },
  {
    title: "Domain validation support",
    description:
      "We guide the validation process so the certificate can be issued and connected properly.",
    icon: ShieldCheck,
  },
  {
    title: "Renewal-ready structure",
    description:
      "Your SSL setup is prepared for future renewal, upgrade, or migration when your business grows.",
    icon: RefreshCcw,
  },
];

const securityPlans = homePricePlans.filter(
  (plan) => plan.category === "security",
);

export function Packages() {
  return (
    <section className="bg-white px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cloud-blue">
            SSL & Security Packages
          </p>

          <h2 className="mt-4 text-3xl font-medium tracking-[-0.05em] text-slate-950 sm:text-4xl lg:text-5xl">
            Protect your website with trusted SSL certificates built for
            security, confidence, and growth.
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-500 sm:text-lg">
            Choose the right SSL certificate for your business, from basic
            website encryption to wildcard protection for broader domain
            coverage.
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

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {securityPlans.map((plan) => {
            const displayPrice = calculatePlanPricing(
              plan,
              DEFAULT_BILLING_CYCLE,
            );

            const ctaHref = buildPlanCtaHref(plan, DEFAULT_BILLING_CYCLE);
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
                    Recommended
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

                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-cloud-blue/10 text-cloud-blue">
                        <ShieldCheck className="h-5 w-5" aria-hidden="true" />
                      </span>
                    </div>
                  </div>

                  <p className="mt-4 min-h-[84px] text-base leading-7 text-slate-500">
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
                    {plan.features.map((feature) => (
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

        <div className="mt-10 overflow-hidden rounded-[2rem] border border-slate-200 bg-[#000A16] p-6 text-white shadow-[0_28px_90px_rgba(15,23,42,0.16)] sm:p-8 lg:p-10">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-200">
              Included with SSL setup
            </p>

            <h3 className="mt-3 text-2xl font-medium tracking-[-0.045em] text-white sm:text-3xl lg:text-4xl">
              Every certificate includes{" "}
              <span className="text-cloud-blue">the protection essentials</span>{" "}
              your website needs.
            </h3>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
              Beyond the certificate itself, Octalve Cloud helps you connect,
              validate, and prepare your website for trusted secure browsing.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {certificateIncludes.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="rounded-[1.5rem] border border-white/10 bg-white/[0.07] p-5 shadow-[0_18px_50px_rgba(0,0,0,0.18)] backdrop-blur transition hover:-translate-y-1 hover:border-cloud-blue/40"
                >
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-cloud-blue/15 text-cloud-blue">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>

                  <h4 className="mt-5 text-lg font-semibold tracking-[-0.03em] text-white">
                    {item.title}
                  </h4>

                  <p className="mt-3 text-sm leading-7 text-slate-300">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {!securityPlans.length ? (
          <div className="mt-10 rounded-[1.75rem] border border-orange-200 bg-orange-50 p-6 text-center">
            <p className="text-sm font-semibold text-orange-700">
              No security plans found.
            </p>

            <p className="mt-2 text-sm leading-7 text-orange-700/80">
              Add SSL/Security plans inside{" "}
              <code className="rounded bg-white px-1.5 py-0.5">
                src/features/cloud/data/home-price.ts
              </code>{" "}
              using category{" "}
              <code className="rounded bg-white px-1.5 py-0.5">security</code>.
            </p>
          </div>
        ) : null}
      </div>
    </section>
  );
}
