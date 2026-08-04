"use client";

import Link from "next/link";
import type { KeyboardEvent, PointerEvent } from "react";
import { ChevronDown } from "lucide-react";
import { desktopNavigation, megaMenus } from "@/features/cloud/data/cloud-navigation";
import type { MegaMenuId } from "@/features/cloud/types/navigation";
import { cn, isRouteActive } from "./cn";

function isMegaMenuRouteActive(pathname: string, menuId: MegaMenuId) {
  return megaMenus[menuId].categories.some((category) =>
    category.links.some((item) => isRouteActive(pathname, item.href)),
  );
}

export function DesktopNavigation({
  pathname,
  activeMenu,
  onScheduleOpen,
  onScheduleClose,
  onOpenNow,
  onToggleMenu,
  onNavigate,
}: {
  pathname: string;
  activeMenu: MegaMenuId | null;
  onScheduleOpen: (menuId: MegaMenuId) => void;
  onScheduleClose: () => void;
  onOpenNow: (menuId: MegaMenuId) => void;
  onToggleMenu: (menuId: MegaMenuId) => void;
  onNavigate: () => void;
}) {
  return (
    <nav
      className="hidden flex-1 items-center justify-center gap-1 xl:flex"
      aria-label="Primary navigation"
    >
      {desktopNavigation.map((item) => {
        if (item.kind === "link") {
          const active = isRouteActive(pathname, item.href);

          return (
            <Link
              key={item.id}
              href={item.href}
              onClick={onNavigate}
              aria-current={active ? "page" : undefined}
              className={cn(
                "relative inline-flex h-11 items-center rounded-xl px-3.5 text-[14px] font-semibold text-cloud-navy transition hover:bg-cloud-mist hover:text-cloud-blue focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-100",
                active && "bg-cloud-mist text-cloud-blue",
              )}
            >
              {item.label}
              <span
                className={cn(
                  "absolute bottom-1.5 left-3.5 right-3.5 h-0.5 origin-center rounded-full bg-cloud-blue transition-transform",
                  active ? "scale-x-100" : "scale-x-0",
                )}
                aria-hidden="true"
              />
            </Link>
          );
        }

        const open = activeMenu === item.id;
        const active = isMegaMenuRouteActive(pathname, item.id);

        return (
          <button
            key={item.id}
            id={`cloud-menu-trigger-${item.id}`}
            type="button"
            onPointerEnter={(event: PointerEvent<HTMLButtonElement>) => {
              if (event.pointerType === "mouse") {
                onScheduleOpen(item.id);
              }
            }}
            onPointerLeave={(event: PointerEvent<HTMLButtonElement>) => {
              if (event.pointerType === "mouse") {
                onScheduleClose();
              }
            }}
            onClick={() => onToggleMenu(item.id)}
            onKeyDown={(event: KeyboardEvent<HTMLButtonElement>) => {
              if (event.key === "ArrowDown") {
                event.preventDefault();
                onOpenNow(item.id);
              }
            }}
            aria-expanded={open}
            aria-controls={`cloud-mega-menu-${item.id}`}
            aria-haspopup="true"
            className={cn(
              "relative inline-flex h-11 items-center gap-1.5 rounded-xl px-3.5 text-[14px] font-semibold text-cloud-navy transition hover:bg-cloud-mist hover:text-cloud-blue focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-100",
              (active || open) && "bg-cloud-mist text-cloud-blue",
            )}
          >
            {item.label}
            <ChevronDown
              className={cn(
                "h-4 w-4 transition-transform motion-reduce:transition-none",
                open && "rotate-180",
              )}
              aria-hidden="true"
            />
            <span
              className={cn(
                "absolute bottom-1.5 left-3.5 right-3.5 h-0.5 origin-center rounded-full bg-cloud-blue transition-transform",
                active || open ? "scale-x-100" : "scale-x-0",
              )}
              aria-hidden="true"
            />
          </button>
        );
      })}
    </nav>
  );
}
