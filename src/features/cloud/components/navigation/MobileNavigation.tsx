"use client";

import { ChevronDown, ChevronRight, Search } from "lucide-react";
import { useState } from "react";
import {
  accountAccessLinks,
  desktopNavigation,
  megaMenus,
} from "@/features/cloud/data/cloud-navigation";
import { cloudLinks } from "@/features/cloud/data/cloud-links";
import type { MegaMenuId } from "@/features/cloud/types/navigation";
import { HeaderBadge } from "./HeaderBadge";
import { SmartLink } from "./SmartLink";
import { cn } from "./cn";

export function MobileNavigation({
  open,
  onNavigate,
}: {
  open: boolean;
  onNavigate: () => void;
}) {
  const [expandedSection, setExpandedSection] =
    useState<MegaMenuId | null>("products");

  if (!open) {
    return null;
  }

  return (
    <div
      id="cloud-mobile-navigation"
      className="max-h-[calc(100dvh-76px)] overflow-y-auto border-t border-slate-200 bg-white xl:hidden"
    >
      <div className="mx-auto w-full max-w-3xl px-4 py-5 sm:px-6">
        <form
          action="/tools/domain-name-search"
          className="relative mb-5"
        >
          <Search
            className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500"
            aria-hidden="true"
          />
          <label htmlFor="mobile-cloud-search" className="sr-only">
            Search Octalve Cloud
          </label>
          <input
            id="mobile-cloud-search"
            name="q"
            type="search"
            placeholder="Search domains and cloud tools"
            className="h-14 w-full rounded-2xl border border-slate-300 bg-white pl-12 pr-4 text-base font-medium text-cloud-navy outline-none transition placeholder:text-slate-400 focus:border-cloud-blue focus:ring-4 focus:ring-blue-100"
          />
        </form>

        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white">
          {desktopNavigation.map((item) => {
            if (item.kind === "link") {
              return (
                <SmartLink
                  key={item.id}
                  href={item.href}
                  onNavigate={onNavigate}
                  className="flex items-center justify-between border-b border-slate-200 px-5 py-5 text-[17px] font-semibold text-cloud-navy transition last:border-b-0 hover:bg-cloud-mist hover:text-cloud-blue focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-blue-100"
                >
                  {item.label}
                  <ChevronRight
                    className="h-5 w-5 text-slate-400"
                    aria-hidden="true"
                  />
                </SmartLink>
              );
            }

            const definition = megaMenus[item.id];
            const expanded = expandedSection === item.id;

            return (
              <div
                key={item.id}
                className="border-b border-slate-200 last:border-b-0"
              >
                <button
                  type="button"
                  onClick={() =>
                    setExpandedSection((current) =>
                      current === item.id ? null : item.id,
                    )
                  }
                  className={cn(
                    "flex w-full items-center justify-between px-5 py-5 text-left text-[17px] font-semibold transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-blue-100",
                    expanded
                      ? "bg-cloud-mist text-cloud-blue"
                      : "bg-white text-cloud-navy hover:bg-cloud-mist hover:text-cloud-blue",
                  )}
                  aria-expanded={expanded}
                >
                  {item.label}
                  <ChevronDown
                    className={cn(
                      "h-5 w-5 transition-transform motion-reduce:transition-none",
                      expanded && "rotate-180",
                    )}
                    aria-hidden="true"
                  />
                </button>

                {expanded ? (
                  <div className="space-y-5 bg-[#F8FAFC] px-4 py-5">
                    {definition.categories.map((category) => {
                      const CategoryIcon = category.icon;

                      return (
                        <section
                          key={category.id}
                          aria-labelledby={`mobile-category-${item.id}-${category.id}`}
                          className="rounded-2xl border border-slate-200 bg-white p-3"
                        >
                          <div className="flex items-start gap-3 px-2 pb-3 pt-1">
                            <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#EAF2FF] text-cloud-blue">
                              <CategoryIcon
                                className="h-[18px] w-[18px]"
                                aria-hidden="true"
                              />
                            </span>
                            <span>
                              <h3
                                id={`mobile-category-${item.id}-${category.id}`}
                                className="text-sm font-semibold text-cloud-navy"
                              >
                                {category.label}
                              </h3>
                              <p className="mt-1 text-xs leading-5 text-slate-500">
                                {category.description}
                              </p>
                            </span>
                          </div>

                          <div className="space-y-1">
                            {category.links.map((link) => {
                              const Icon = link.icon;

                              return (
                                <SmartLink
                                  key={link.id}
                                  href={link.href}
                                  external={link.external}
                                  onNavigate={onNavigate}
                                  className="flex items-start gap-3 rounded-xl px-2 py-3 transition hover:bg-cloud-mist focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-100"
                                >
                                  <Icon
                                    className="mt-0.5 h-[18px] w-[18px] shrink-0 text-cloud-blue"
                                    aria-hidden="true"
                                  />
                                  <span>
                                    <span className="flex flex-wrap items-center gap-2 text-sm font-semibold text-cloud-navy">
                                      {link.label}
                                      {link.badge ? (
                                        <HeaderBadge
                                          badge={link.badge}
                                          compact
                                        />
                                      ) : null}
                                    </span>
                                    <span className="mt-1 block text-xs leading-5 text-slate-500">
                                      {link.description}
                                    </span>
                                  </span>
                                </SmartLink>
                              );
                            })}
                          </div>
                        </section>
                      );
                    })}
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {accountAccessLinks.map((item) => {
            const Icon = item.icon;

            return (
              <SmartLink
                key={item.id}
                href={item.href}
                external
                newTab={item.href === cloudLinks.console ? false : undefined}
                onNavigate={onNavigate}
                className="rounded-2xl border border-slate-200 bg-white px-5 py-4 transition hover:border-cloud-blue hover:bg-cloud-mist focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-100"
              >
                <span className="flex items-center gap-2 text-sm font-semibold text-cloud-navy">
                  <Icon className="h-4 w-4 text-cloud-blue" aria-hidden="true" />
                  {item.label}
                </span>
                <span className="mt-1 block text-xs font-medium leading-5 text-slate-500">
                  {item.description}
                </span>
              </SmartLink>
            );
          })}
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <SmartLink
            href="/contact"
            onNavigate={onNavigate}
            className="inline-flex min-h-[52px] items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 text-sm font-semibold text-cloud-navy transition hover:border-cloud-blue hover:text-cloud-blue focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-100"
          >
            Contact Sales
          </SmartLink>

          <SmartLink
            href={cloudLinks.console}
              newTab={false}
            external
            onNavigate={onNavigate}
            className="inline-flex min-h-[52px] items-center justify-center rounded-2xl bg-cloud-blue px-5 text-sm font-semibold text-white shadow-[0_14px_30px_rgba(0,100,224,0.22)] transition hover:-translate-y-0.5 hover:bg-cloud-navy focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-200 motion-reduce:transform-none"
          >
            Get Started
          </SmartLink>
        </div>
      </div>
    </div>
  );
}
