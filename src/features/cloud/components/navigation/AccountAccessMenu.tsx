"use client";

import { ChevronDown, ExternalLink, User } from "lucide-react";
import { accountAccessLinks } from "@/features/cloud/data/cloud-navigation";
import { SmartLink } from "./SmartLink";
import { cn } from "./cn";

export function AccountAccessMenu({
  open,
  onToggle,
  onNavigate,
}: {
  open: boolean;
  onToggle: () => void;
  onNavigate: () => void;
}) {
  return (
    <div className="relative">
      <button
        id="cloud-account-trigger"
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls="cloud-account-access-menu"
        className={cn(
          "inline-flex h-11 items-center gap-2 rounded-xl border px-4 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-100",
          open
            ? "border-cloud-blue bg-cloud-mist text-cloud-blue"
            : "border-slate-200 bg-white text-cloud-navy hover:border-cloud-blue hover:text-cloud-blue",
        )}
      >
        <User className="h-4 w-4" aria-hidden="true" />
        Sign in
        <ChevronDown
          className={cn(
            "h-4 w-4 transition-transform motion-reduce:transition-none",
            open && "rotate-180",
          )}
          aria-hidden="true"
        />
      </button>

      {open ? (
        <div
          id="cloud-account-access-menu"
          className="absolute right-0 top-full z-[80] mt-3 w-[330px] overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-[0_24px_70px_rgba(0,10,22,0.20)]"
        >
          <div className="px-3 pb-2 pt-2">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-cloud-blue">
              Account access
            </p>
            <p className="mt-1 text-xs leading-5 text-slate-500">
              Choose the platform that matches what you need to manage.
            </p>
          </div>

          {accountAccessLinks.map((item) => {
            const Icon = item.icon;

            return (
              <SmartLink
                key={item.id}
                href={item.href}
                external
                onNavigate={onNavigate}
                className="group mt-1 flex items-start gap-3 rounded-xl px-3 py-3.5 transition hover:bg-cloud-mist focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-100"
              >
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EAF2FF] text-cloud-blue">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>

                <span>
                  <span className="flex items-center gap-2 text-sm font-semibold text-cloud-navy group-hover:text-cloud-blue">
                    {item.label}
                    <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                  <span className="mt-1 block text-xs leading-5 text-slate-500">
                    {item.description}
                  </span>
                </span>
              </SmartLink>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
