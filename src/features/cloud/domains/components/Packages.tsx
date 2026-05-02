"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, ChevronDown, Loader2 } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  buildDomainAvailabilityHref,
  DEFAULT_DOMAIN_PRICE_CATEGORY,
  domainPriceCategories,
  fallbackDomainPackages,
  formatNaira,
  type DomainAccent,
  type DomainPackage,
  type DomainPriceCategoryKey,
} from "@/features/cloud/data/domain-price";
import { getLiveDomainPackages } from "@/lib/domain-pricing-adapter";

const AUTO_SLIDE_INTERVAL = 4500;

function getAccentClasses(accent: DomainAccent) {
  switch (accent) {
    case "green":
      return {
        chip: "bg-emerald-50 text-emerald-700",
        dot: "bg-emerald-500",
      };

    case "orange":
      return {
        chip: "bg-orange-50 text-orange-700",
        dot: "bg-orange-500",
      };

    case "purple":
      return {
        chip: "bg-violet-50 text-violet-700",
        dot: "bg-violet-500",
      };

    case "blue":
    default:
      return {
        chip: "bg-blue-50 text-cloud-blue",
        dot: "bg-cloud-blue",
      };
  }
}

function DomainPriceCard({ item }: { item: DomainPackage }) {
  const accent = getAccentClasses(item.accent);
  const ctaHref = buildDomainAvailabilityHref(item);
  const isExternal = ctaHref.startsWith("http");

  return (
    <article className="group flex h-full min-h-[385px] flex-col rounded-[1.85rem] border border-slate-200 bg-white p-6 shadow-[0_20px_55px_rgba(15,23,42,0.075)] transition duration-300 hover:-translate-y-1 hover:border-cloud-blue/25 hover:shadow-[0_28px_75px_rgba(15,23,42,0.11)] sm:p-7">
      <div className="flex items-center justify-between gap-4">
        <div
          className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold ${accent.chip}`}
        >
          {item.tld}
        </div>

        <div className={`h-2.5 w-2.5 rounded-full ${accent.dot}`} />
      </div>

      <h3 className="mt-6 text-[2.15rem] font-medium tracking-[-0.055em] text-slate-950">
        {item.tld}
      </h3>

      <p className="mt-3 text-[1.22rem] font-medium leading-8 text-slate-950">
        {item.title}
      </p>

      <p className="mt-4 flex-1 text-sm leading-7 text-slate-500 sm:text-[15px]">
        {item.description}
      </p>

      <div className="mt-7">
        <div className="flex min-h-7 items-center gap-3">
          {item.oldPrice ? (
            <p className="text-base text-slate-400 line-through">
              {formatNaira(item.oldPrice)}
            </p>
          ) : null}

          {item.badge ? (
            <span className="rounded-full bg-cloud-blue/10 px-3 py-1 text-xs font-semibold text-cloud-blue">
              {item.badge}
            </span>
          ) : null}
        </div>

        <div className="mt-1 flex items-end gap-1.5">
          <span className="text-[2.35rem] font-medium tracking-[-0.06em] text-slate-950">
            {formatNaira(item.currentPrice)}
          </span>

          <span className="pb-1 text-base text-slate-500">
            {item.billingLabel}
          </span>
        </div>

        {item.renewalPrice ? (
          <p className="mt-2 text-sm leading-6 text-slate-400">
            Renews at {formatNaira(item.renewalPrice)}/yr.
          </p>
        ) : null}
      </div>

      <Link
        href={ctaHref}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noreferrer" : undefined}
        className="mt-7 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-cloud-blue px-5 py-3 text-sm font-semibold text-white shadow-[0_14px_34px_rgba(0,100,224,0.20)] transition hover:-translate-y-0.5 hover:bg-blue-600"
      >
        {item.ctaLabel ?? "Check availability"}
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Link>
    </article>
  );
}

export function Packages() {
  const sliderRef = useRef<HTMLDivElement | null>(null);

  const [activeCategory, setActiveCategory] = useState<DomainPriceCategoryKey>(
    DEFAULT_DOMAIN_PRICE_CATEGORY,
  );

  const [domainPackages, setDomainPackages] = useState<DomainPackage[]>(
    fallbackDomainPackages,
  );

  const [isLoadingLivePrices, setIsLoadingLivePrices] = useState(true);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    let isMounted = true;

    async function loadDomainPrices() {
      try {
        const prices = await getLiveDomainPackages(fallbackDomainPackages);

        if (isMounted) {
          setDomainPackages(prices);
        }
      } finally {
        if (isMounted) {
          setIsLoadingLivePrices(false);
        }
      }
    }

    loadDomainPrices();

    return () => {
      isMounted = false;
    };
  }, []);

  const activeCategoryData =
    domainPriceCategories.find((item) => item.key === activeCategory) ??
    domainPriceCategories[0];

  const visiblePackages = useMemo(() => {
    if (activeCategory === "all") {
      return domainPackages;
    }

    return domainPackages.filter((item) => item.category === activeCategory);
  }, [activeCategory, domainPackages]);

  const maxSlideIndex = Math.max(visiblePackages.length - 1, 0);

  function scrollToSlide(index: number) {
    const slider = sliderRef.current;

    if (!slider) return;

    const safeIndex =
      index < 0 ? maxSlideIndex : index > maxSlideIndex ? 0 : index;

    const slide = slider.children.item(safeIndex) as HTMLElement | null;

    if (!slide) return;

    slider.scrollTo({
      left: slide.offsetLeft,
      behavior: "smooth",
    });

    setActiveSlide(safeIndex);
  }

  function nextSlide() {
    scrollToSlide(activeSlide + 1);
  }

  function previousSlide() {
    scrollToSlide(activeSlide - 1);
  }

  useEffect(() => {
    setActiveSlide(0);

    const slider = sliderRef.current;

    if (slider) {
      slider.scrollTo({ left: 0, behavior: "instant" });
    }
  }, [activeCategory]);

  useEffect(() => {
    if (visiblePackages.length <= 1) return;

    const interval = window.setInterval(() => {
      setActiveSlide((current) => {
        const next = current + 1 > maxSlideIndex ? 0 : current + 1;

        const slider = sliderRef.current;
        const slide = slider?.children.item(next) as HTMLElement | null;

        if (slider && slide) {
          slider.scrollTo({
            left: slide.offsetLeft,
            behavior: "smooth",
          });
        }

        return next;
      });
    }, AUTO_SLIDE_INTERVAL);

    return () => window.clearInterval(interval);
  }, [maxSlideIndex, visiblePackages.length]);

  return (
    <section className="overflow-hidden bg-white px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <div className="flex flex-wrap items-center gap-3">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cloud-blue">
              Domain Packages
            </p>

            <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500">
              {isLoadingLivePrices ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  Checking prices
                </>
              ) : (
                "Live-ready pricing"
              )}
            </span>
          </div>

          <h2 className="mt-4 text-3xl font-medium tracking-[-0.045em] text-slate-950 sm:text-4xl lg:text-5xl">
            Choose domain options built for{" "}
            <span className="text-cloud-blue">
              brands, businesses, and growth
            </span>
          </h2>

          <p className="mt-5 max-w-2xl text-base leading-8 text-slate-500 sm:text-lg">
            Explore domain extensions for global brands, Nigerian businesses,
            ecommerce stores, organisations, and modern digital platforms.
          </p>
        </div>

        <div className="mt-9 grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700 lg:hidden">
              Choose domain category
            </label>

            <div className="relative lg:hidden">
              <select
                value={activeCategory}
                onChange={(event) =>
                  setActiveCategory(
                    event.target.value as DomainPriceCategoryKey,
                  )
                }
                className="h-12 w-full appearance-none rounded-2xl border border-slate-200 bg-white px-4 pr-10 text-sm font-semibold text-slate-900 outline-none shadow-[0_12px_34px_rgba(15,23,42,0.04)] transition focus:border-cloud-blue focus:ring-4 focus:ring-cloud-blue/10"
              >
                {domainPriceCategories.map((category) => (
                  <option key={category.key} value={category.key}>
                    {category.label}
                  </option>
                ))}
              </select>

              <ChevronDown
                className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500"
                aria-hidden="true"
              />
            </div>

            <div className="hidden w-fit rounded-2xl border border-slate-200 bg-white p-1 shadow-[0_12px_34px_rgba(15,23,42,0.04)] lg:flex">
              {domainPriceCategories.map((category) => {
                const isActive = activeCategory === category.key;

                return (
                  <button
                    key={category.key}
                    type="button"
                    onClick={() => setActiveCategory(category.key)}
                    className={[
                      "min-h-11 rounded-xl px-5 text-sm font-semibold transition",
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

          <div className="hidden items-center gap-3 lg:flex">
            <button
              type="button"
              onClick={previousSlide}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-[0_12px_30px_rgba(15,23,42,0.06)] transition hover:-translate-y-0.5 hover:border-cloud-blue/30 hover:text-cloud-blue"
              aria-label="Previous domain package"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={nextSlide}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-cloud-blue text-white shadow-[0_14px_34px_rgba(0,100,224,0.22)] transition hover:-translate-y-0.5 hover:bg-blue-600"
              aria-label="Next domain package"
            >
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="mt-7 rounded-[1.75rem] border border-slate-200 bg-[#F8FAFC] px-5 py-5 shadow-[0_16px_45px_rgba(15,23,42,0.04)] sm:px-7">
          <p className="text-sm font-semibold text-cloud-blue">
            {activeCategoryData.title}
          </p>

          <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-500">
            {activeCategoryData.description}
          </p>
        </div>

        <div className="relative mt-10">
          <div
            ref={sliderRef}
            className="-mx-4 flex snap-x snap-mandatory gap-5 overflow-x-hidden scroll-smooth px-4 pb-5 sm:gap-6 lg:mx-0 lg:px-0"
          >
            {visiblePackages.map((item) => (
              <div
                key={item.id}
                className="min-w-[295px] max-w-[295px] snap-start sm:min-w-[330px] sm:max-w-[330px] lg:min-w-[350px] lg:max-w-[350px] xl:min-w-[360px] xl:max-w-[360px]"
              >
                <DomainPriceCard item={item} />
              </div>
            ))}
          </div>

          <div className="mt-4 flex items-center justify-between gap-4 lg:hidden">
            <button
              type="button"
              onClick={previousSlide}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-[0_12px_30px_rgba(15,23,42,0.06)] transition active:scale-95"
              aria-label="Previous domain package"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            </button>

            <div className="flex items-center justify-center gap-2">
              {visiblePackages.map((item, index) => (
                <button
                  key={`${item.id}-dot`}
                  type="button"
                  onClick={() => scrollToSlide(index)}
                  aria-label={`Go to ${item.tld}`}
                  className={[
                    "h-2.5 rounded-full transition-all",
                    activeSlide === index
                      ? "w-8 bg-cloud-blue shadow-[0_0_18px_rgba(0,100,224,0.45)]"
                      : "w-2.5 bg-slate-300 hover:bg-slate-400",
                  ].join(" ")}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={nextSlide}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-cloud-blue text-white shadow-[0_14px_34px_rgba(0,100,224,0.22)] transition active:scale-95"
              aria-label="Next domain package"
            >
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          <div className="mt-5 hidden items-center justify-center gap-2 lg:flex">
            {visiblePackages.map((item, index) => (
              <button
                key={`${item.id}-desktop-dot`}
                type="button"
                onClick={() => scrollToSlide(index)}
                aria-label={`Go to ${item.tld}`}
                className={[
                  "h-2.5 rounded-full transition-all",
                  activeSlide === index
                    ? "w-8 bg-cloud-blue shadow-[0_0_18px_rgba(0,100,224,0.45)]"
                    : "w-2.5 bg-slate-300 hover:bg-slate-400",
                ].join(" ")}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
