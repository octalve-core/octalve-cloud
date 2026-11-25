"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { headerGroups } from "@/features/cloud/data/header-groups";
import { cn, isRouteActive } from "./cn";

export function NavigationList({ mode, section, pathname, active, onToggle, onNavigate }: {
  mode: "desktop" | "mobile";
  section?: "primary" | "secondary";
  pathname: string;
  active: string | null;
  onToggle: (id: string | null) => void;
  onNavigate: () => void;
}) {
  const desktop = mode === "desktop";
  return (
    <ul className={desktop ? "flex items-center gap-0.5" : "divide-y divide-slate-200"}>
      {headerGroups.filter(group => !section || (section === "primary" ? ["hosting", "domains", "servers"].includes(group.id) : ["email", "resources"].includes(group.id))).map(group => {
        const open = active === group.id;
        const current = group.links.some(link => isRouteActive(pathname, link.href));
        const id = `cloud-${mode}-${group.id}`;
        return (
          <li key={group.id} className="relative">
            <button id={id + "-trigger"} type="button" aria-expanded={open} aria-controls={id + "-links"}
              onClick={() => onToggle(open ? null : group.id)}
              className={cn("flex min-h-11 items-center gap-1 rounded-lg font-normal text-cloud-navy hover:bg-cloud-mist hover:text-cloud-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cloud-blue", desktop ? "whitespace-nowrap px-1.5 text-[13px] xl:px-3 xl:text-sm" : "w-full justify-between px-3 py-3 text-base", (open || current) && "text-cloud-blue")}>
              {group.label}
              <ChevronRight size={13} aria-hidden="true" className={cn(open && "rotate-90")} />
            </button>
            <ul id={id + "-links"} hidden={!open}
              className={cn(desktop ? "absolute top-full z-50 mt-2 w-64 max-h-[calc(100dvh-84px)] overflow-y-auto rounded-xl border border-slate-200 bg-white p-2 shadow-soft" : "mb-2 rounded-lg bg-cloud-mist p-2", desktop && (group.id === "resources" ? "right-0" : "left-0"))}>
              {group.links.map(link => {
                const selected = isRouteActive(pathname, link.href);
                const style = cn("block rounded-md px-3 py-2.5 text-sm font-medium text-cloud-navy hover:bg-cloud-soft hover:text-cloud-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cloud-blue", selected && "text-cloud-blue");
                return (
                  <li key={link.href}>
                    {link.href.startsWith("/") ?
                      <Link href={link.href} aria-current={selected ? "page" : undefined} onClick={onNavigate} className={style}>{link.label}</Link> :
                      <a href={link.href} onClick={onNavigate} className={style}>{link.label}</a>}
                  </li>
                );
              })}
            </ul>
          </li>
        );
      })}
    </ul>
  );
}
