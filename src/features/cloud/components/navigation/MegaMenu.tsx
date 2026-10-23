"use client";

import { ArrowRight, ChevronRight, X } from "lucide-react";
import { useMemo, useState } from "react";
import type {
  MegaMenuDefinition,
  NavigationLink,
} from "@/features/cloud/types/navigation";
import { HeaderBadge } from "./HeaderBadge";
import { SmartLink } from "./SmartLink";
import { cloudLinks } from "@/features/cloud/data/cloud-links";
import { cn } from "./cn";

function MegaMenuProductLink({
  item,
  onNavigate,
}: {
  item: NavigationLink;
  onNavigate: () => void;
}) {
  const Icon = item.icon;

  return (
    <SmartLink
      href={item.href}
      external={item.external}
      newTab={item.href === cloudLinks.console ? false : undefined}
      onNavigate={onNavigate}
      className="group flex min-h-[112px] items-start gap-4 rounded-2xl border border-transparent p-4 transition duration-200 hover:border-slate-200 hover:bg-white hover:shadow-[0_16px_42px_rgba(15,23,42,0.08)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-100 motion-reduce:transition-none"
    >
      <span className="mt-0.5 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#EAF2FF] text-cloud-blue transition group-hover:bg-cloud-blue group-hover:text-white motion-reduce:transition-none">
        <Icon className="h-5 w-5" strokeWidth={1.9} aria-hidden="true" />
      </span>

      <span className="min-w-0">
        <span className="flex flex-wrap items-center gap-2 text-[15px] font-semibold text-cloud-navy group-hover:text-cloud-blue">
          {item.label}
          {item.badge ? <HeaderBadge badge={item.badge} compact /> : null}
        </span>

        <span className="mt-1.5 block text-[13px] leading-5 text-slate-500">
          {item.description}
        </span>
      </span>

      <ChevronRight
        className="ml-auto mt-1 h-4 w-4 shrink-0 text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-cloud-blue motion-reduce:transition-none"
        aria-hidden="true"
      />
    </SmartLink>
  );
}

export function MegaMenu({
  definition,
  onNavigate,
  onRequestClose,
  onCancelClose,
  onScheduleClose,
}: {
  definition: MegaMenuDefinition;
  onNavigate: () => void;
  onRequestClose: () => void;
  onCancelClose: () => void;
  onScheduleClose: () => void;
}) {
  const [activeCategoryId, setActiveCategoryId] = useState(
    definition.categories[0].id,
  );

  const activeCategory = useMemo(
    () =>
      definition.categories.find(
        (category) => category.id === activeCategoryId,
      ) ?? definition.categories[0],
    [activeCategoryId, definition.categories],
  );

  const FeaturedIcon = definition.featured.icon;

  return (
    <div
      id={`cloud-mega-menu-${definition.id}`}
      aria-label={`${definition.label} navigation`}
      className="absolute left-0 right-0 top-full z-[70] hidden px-6 pb-7 pt-3 xl:block"
      onPointerEnter={onCancelClose}
      onPointerLeave={onScheduleClose}
      onFocusCapture={onCancelClose}
    >
      <div className="mx-auto max-w-[1440px] overflow-hidden rounded-[28px] border border-slate-200 bg-[#F8FAFC] shadow-[0_32px_100px_rgba(0,10,22,0.24)]">
        <div className="flex items-start justify-between border-b border-slate-200 bg-white px-7 py-5">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-cloud-blue">
              {definition.eyebrow}
            </p>
            <p className="mt-1 max-w-3xl text-sm leading-6 text-slate-500">
              {definition.description}
            </p>
          </div>

          <button
            type="button"
            onClick={onRequestClose}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition hover:border-cloud-blue hover:text-cloud-blue focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-100"
            aria-label={`Close ${definition.label} menu`}
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <div className="grid min-h-[440px] grid-cols-[270px_minmax(0,1fr)_320px]">
          <div className="bg-cloud-navy p-4">
            <p className="px-3 pb-3 pt-2 text-[10px] font-bold uppercase tracking-[0.2em] text-blue-200/70">
              Explore categories
            </p>

            <div className="space-y-1.5">
              {definition.categories.map((category) => {
                const Icon = category.icon;
                const active = category.id === activeCategory.id;

                return (
                  <button
                    key={category.id}
                    type="button"
                    onPointerEnter={() => setActiveCategoryId(category.id)}
                    onFocus={() => setActiveCategoryId(category.id)}
                    onClick={() => setActiveCategoryId(category.id)}
                    aria-pressed={active}
                    className={cn(
                      "group flex w-full items-start gap-3 rounded-2xl px-3 py-3.5 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 motion-reduce:transition-none",
                      active
                        ? "bg-cloud-blue text-white shadow-[0_14px_32px_rgba(0,100,224,0.28)]"
                        : "text-slate-300 hover:bg-white/[0.08] hover:text-white",
                    )}
                  >
                    <span
                      className={cn(
                        "mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition motion-reduce:transition-none",
                        active
                          ? "bg-white/[0.14] text-white"
                          : "bg-white/[0.07] text-blue-200 group-hover:bg-white/[0.12]",
                      )}
                    >
                      <Icon
                        className="h-[18px] w-[18px]"
                        strokeWidth={1.9}
                        aria-hidden="true"
                      />
                    </span>

                    <span>
                      <span className="block text-sm font-semibold">
                        {category.label}
                      </span>
                      <span
                        className={cn(
                          "mt-1 block text-[11px] leading-4",
                          active ? "text-blue-100" : "text-slate-500",
                        )}
                      >
                        {category.description}
                      </span>
                    </span>

                    <ChevronRight
                      className={cn(
                        "ml-auto mt-2 h-4 w-4 shrink-0",
                        active ? "text-white" : "text-slate-600",
                      )}
                      aria-hidden="true"
                    />
                  </button>
                );
              })}
            </div>
          </div>

          <div className="p-5">
            <div className="flex items-end justify-between gap-6 px-2 pb-3">
              <div>
                <p className="text-lg font-semibold tracking-[-0.02em] text-cloud-navy">
                  {activeCategory.label}
                </p>
                <p className="mt-1 text-xs leading-5 text-slate-500">
                  {activeCategory.description}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {activeCategory.links.map((item) => (
                <MegaMenuProductLink
                  key={item.id}
                  item={item}
                  onNavigate={onNavigate}
                />
              ))}
            </div>
          </div>

          <div className="border-l border-slate-200 bg-white p-5">
            <div className="relative flex h-full min-h-[390px] flex-col overflow-hidden rounded-[24px] bg-cloud-navy p-6 text-white">
              <div
                className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full bg-cloud-blue/45 blur-3xl"
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute -bottom-20 -left-16 h-52 w-52 rounded-full bg-[#2A006D]/50 blur-3xl"
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.08]"
                aria-hidden="true"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,.35) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.35) 1px, transparent 1px)",
                  backgroundSize: "28px 28px",
                }}
              />

              <div className="relative">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-blue-200 ring-1 ring-white/15">
                  <FeaturedIcon
                    className="h-6 w-6"
                    strokeWidth={1.8}
                    aria-hidden="true"
                  />
                </span>

                <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.2em] text-blue-200">
                  {definition.featured.eyebrow}
                </p>
                <h3 className="mt-3 text-2xl font-semibold leading-tight tracking-[-0.04em]">
                  {definition.featured.title}
                </h3>
                <p className="mt-4 text-sm leading-6 text-slate-300">
                  {definition.featured.description}
                </p>
              </div>

              <SmartLink
                href={definition.featured.href}
                external={definition.featured.external}
                onNavigate={onNavigate}
                className="relative mt-auto inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-white px-5 text-sm font-semibold text-cloud-navy transition hover:-translate-y-0.5 hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-300 motion-reduce:transform-none motion-reduce:transition-none"
              >
                {definition.featured.ctaLabel}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </SmartLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
