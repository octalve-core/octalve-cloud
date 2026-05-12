"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronDown,
  ChevronRight,
  Menu,
  Search,
  ShoppingCart,
  User,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cloudLinks, cloudNavLinks } from "@/features/cloud/data/cloud-links";
import { CloudLogo } from "@/features/cloud/components/CloudLogo";

type BadgeTone = "new" | "free" | "ai" | "try" | "save" | "bundle";

type HeaderBadge = {
  label: string;
  tone: BadgeTone;
};

type HeaderMenuItem = {
  label: string;
  href: string;
  description?: string;
  badge?: HeaderBadge;
  children?: HeaderMenuItem[];
  variant?: "default" | "tools";
};

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function navHref(keyword: string, fallback: string) {
  return (
    cloudNavLinks.find((item) =>
      item.label.toLowerCase().includes(keyword.toLowerCase()),
    )?.href ?? fallback
  );
}

const badgeToneClasses: Record<BadgeTone, string> = {
  new: "bg-[#F04D23] text-white",
  free: "bg-[#2369B3] text-white",
  ai: "bg-[#651FFF] text-white",
  try: "bg-[#2369B3] text-white",
  save: "bg-[#2369B3] text-white",
  bundle: "bg-[#F04D23] text-white",
};

function Badge({
  badge,
  compact = false,
}: {
  badge: HeaderBadge;
  compact?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center rounded-md font-semibold uppercase leading-none tracking-[0.02em]",
        badgeToneClasses[badge.tone],
        compact ? "px-1.5 py-1 text-[10px]" : "px-2 py-1 text-[11px]",
      )}
    >
      {badge.label}
    </span>
  );
}

const toolsLinks: HeaderMenuItem[] = [
  {
    label: "AI Domain Name Generator",
    href: "/tools/ai-domain-name-generator",
    badge: { label: "AI", tone: "ai" },
    description: "Find smart brandable domain ideas.",
  },
  {
    label: "Domain Name Search",
    href: "/tools/domain-name-search",
    description: "Check domain availability quickly.",
  },
  {
    label: "WHOIS Lookup",
    href: "/tools/whois-lookup",
    description: "View domain ownership and records.",
  },
  {
    label: "Privacy Policy Generator",
    href: "/tools/privacy-policy-generator",
    badge: { label: "Free", tone: "free" },
    description: "Generate a simple website policy.",
  },
  {
    label: "Terms of Service Generator",
    href: "/tools/terms-of-service-generator",
    badge: { label: "Free", tone: "free" },
    description: "Create basic terms for your website.",
  },
  {
    label: "Compare Domain Sellers",
    href: "/tools/compare-domain-sellers",
    description: "Compare domain pricing and options.",
  },
  {
    label: "Malware & Hack Check",
    href: "/tools/malware-scan",
    badge: { label: "New", tone: "new" },
    description: "Run a quick website safety check.",
  },
];

const mainNavItems: HeaderMenuItem[] = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Domains",
    href: navHref("domain", "/domains"),
    badge: { label: "New", tone: "new" },
    children: [
      {
        label: "Domain Registration",
        href: navHref("domain", "/domains"),
        description: "Search, register and manage domains.",
      },
      {
        label: "Domain Name Search",
        href: "/tools/domain-name-search",
        description: "Find the right name for your brand.",
      },
      {
        label: "WHOIS Lookup",
        href: "/tools/whois-lookup",
        description: "Check public domain records.",
      },
    ],
  },
  {
    label: "Hosting",
    href: navHref("hosting", "/hosting"),
    children: [
      {
        label: "Shared Hosting",
        href: navHref("hosting", "/hosting"),
        description: "Fast, affordable hosting for business websites.",
      },
      {
        label: "Hosting for WordPress",
        href: navHref("wordpress", "/hosting"),
        description: "Optimized hosting for WordPress websites.",
      },
      {
        label: "VPS Hosting",
        href: navHref("server", "/servers"),
        description: "More control, power and flexibility.",
      },
      {
        label: "Dedicated Servers",
        href: navHref("server", "/servers"),
        description: "Reliable infrastructure for heavier workloads.",
      },
      {
        label: "Migrate to Octalve",
        href: navHref("migration", "/migration"),
        description: "Move your website without the stress.",
      },
    ],
  },
  {
    label: "WordPress",
    href: navHref("wordpress", "/hosting"),
  },
  {
    label: "Email",
    href: navHref("email", "/email"),
    badge: { label: "New", tone: "new" },
  },
  {
    label: "Marketing Tools",
    href: "/tools",
    badge: { label: "New", tone: "new" },
    variant: "tools",
    children: toolsLinks,
  },
  {
    label: "Security",
    href: navHref("ssl", "/ssl-security"),
    badge: { label: "New", tone: "new" },
    children: [
      {
        label: "SSL & Website Security",
        href: navHref("ssl", "/ssl-security"),
        description: "Protect your website and customer trust.",
      },
      {
        label: "Malware & Hack Check",
        href: "/tools/malware-scan",
        badge: { label: "AI", tone: "ai" },
        description: "Check your website for possible risks.",
      },
    ],
  },
  {
    label: "Transfer to Us",
    href: navHref("migration", "/migration"),
    badge: { label: "Try Me", tone: "try" },
  },
  {
    label: "Help Center",
    href: navHref("support", "/support"),
    badge: { label: "New", tone: "new" },
  },
];

function DesktopDropdown({
  item,
  onClose,
}: {
  item: HeaderMenuItem;
  onClose: () => void;
}) {
  const isTools = item.variant === "tools";

  return (
    <div
      className={cn(
        "absolute top-full z-50 pt-3",
        isTools ? "left-1/2 -translate-x-1/2" : "left-0",
      )}
    >
      <div
        className={cn(
          "overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.16)]",
          isTools ? "w-[720px]" : "w-[390px]",
        )}
      >
        {isTools ? (
          <div className="grid grid-cols-[0.9fr_1.1fr]">
            <div className="bg-slate-50 p-2">
              {[
                {
                  label: "Growth Tools",
                  badge: { label: "AI", tone: "ai" } as HeaderBadge,
                  description: "Tools to grow your online presence.",
                },
                {
                  label: "Design Tools",
                  badge: { label: "AI", tone: "ai" } as HeaderBadge,
                  description: "Create cleaner business assets.",
                },
                {
                  label: "Business Starter Kit",
                  badge: { label: "Free", tone: "free" } as HeaderBadge,
                  description: "Simple resources for new businesses.",
                },
              ].map((category) => (
                <div
                  key={category.label}
                  className="flex items-start justify-between gap-4 rounded-xl px-4 py-4 text-sm text-slate-700 transition hover:bg-white"
                >
                  <div>
                    <div className="flex items-center gap-2 font-semibold text-cloud-navy">
                      {category.label}
                      <Badge badge={category.badge} compact />
                    </div>
                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      {category.description}
                    </p>
                  </div>
                  <ChevronRight className="mt-1 h-4 w-4 text-slate-400" />
                </div>
              ))}
            </div>

            <div className="p-2">
              <Link
                href="/tools"
                onClick={onClose}
                className="mb-1 flex items-center justify-between rounded-xl px-4 py-4 text-sm font-semibold text-cloud-blue transition hover:bg-cloud-mist"
              >
                View all tools
                <ChevronRight className="h-4 w-4" />
              </Link>

              {item.children?.map((child) => (
                <Link
                  key={child.href}
                  href={child.href}
                  onClick={onClose}
                  className="block rounded-xl px-4 py-3 transition hover:bg-slate-50"
                >
                  <span className="flex items-center gap-2 text-sm font-semibold text-cloud-navy">
                    {child.label}
                    {child.badge ? <Badge badge={child.badge} compact /> : null}
                  </span>
                  {child.description ? (
                    <span className="mt-1 block text-xs leading-5 text-slate-500">
                      {child.description}
                    </span>
                  ) : null}
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <div className="p-2">
            {item.children?.map((child) => (
              <Link
                key={child.href}
                href={child.href}
                onClick={onClose}
                className="group flex items-center justify-between gap-4 rounded-xl px-4 py-4 transition hover:bg-slate-50"
              >
                <span>
                  <span className="flex items-center gap-2 text-sm font-semibold text-cloud-navy group-hover:text-cloud-blue">
                    {child.label}
                    {child.badge ? <Badge badge={child.badge} compact /> : null}
                  </span>
                  {child.description ? (
                    <span className="mt-1 block text-xs leading-5 text-slate-500">
                      {child.description}
                    </span>
                  ) : null}
                </span>

                <ChevronRight className="h-4 w-4 shrink-0 text-slate-400 group-hover:text-cloud-blue" />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export function CloudHeader() {
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement | null>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [loginOpen, setLoginOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<string | null>("Hosting");

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (!headerRef.current?.contains(event.target as Node)) {
        setActiveMenu(null);
        setLoginOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActiveMenu(null);
        setLoginOpen(false);
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const closeAllMenus = () => {
    setActiveMenu(null);
    setLoginOpen(false);
    setIsOpen(false);
  };

  const isActive = (href: string) => {
    if (!href || href === "#") return false;
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 border-b border-slate-200 bg-white"
    >
      <div className="border-b border-slate-200/80 bg-[#F4F6FF]">
        <div className="mx-auto flex h-11 w-full max-w-[1540px] items-center justify-between gap-4 px-4 text-sm font-medium text-slate-700 sm:px-6 lg:px-8">
          <div className="flex items-center gap-5">
            <Link
              href="/contact"
              className="transition hover:text-cloud-blue"
              onClick={closeAllMenus}
            >
              Contact us
            </Link>

            <a
              href={cloudLinks.console}
              target="_blank"
              rel="noreferrer"
              className="hidden transition hover:text-cloud-blue sm:inline"
            >
              Sign up
            </a>

            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setLoginOpen((value) => !value);
                  setActiveMenu(null);
                }}
                className="inline-flex items-center gap-2 rounded-xl bg-white/70 px-3 py-2 font-semibold text-cloud-navy shadow-sm ring-1 ring-slate-200 transition hover:bg-white hover:text-cloud-blue"
                aria-expanded={loginOpen}
              >
                <User className="h-4 w-4" />
                Sign in
              </button>

              {loginOpen ? (
                <div className="absolute left-0 top-full z-[70] mt-2 w-72 overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-[0_20px_60px_rgba(15,23,42,0.16)] sm:left-auto sm:right-0">
                  <a
                    href={cloudLinks.console}
                    target="_blank"
                    rel="noreferrer"
                    className="block rounded-xl px-4 py-3 transition hover:bg-cloud-mist"
                  >
                    <span className="block text-sm font-semibold text-cloud-navy">
                      Client Console
                    </span>
                    <span className="mt-1 block text-xs text-slate-500">
                      Billing, orders, services and support.
                    </span>
                  </a>

                  <a
                    href={cloudLinks.opanel}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-1 block rounded-xl px-4 py-3 transition hover:bg-cloud-mist"
                  >
                    <span className="block text-sm font-semibold text-cloud-navy">
                      Hosting Panel
                    </span>
                    <span className="mt-1 block text-xs text-slate-500">
                      Files, email, SSL, databases and hosting tools.
                    </span>
                  </a>
                </div>
              ) : null}
            </div>
          </div>

          <div className="flex items-center gap-4 text-cloud-navy">
            <a
              href={cloudLinks.console}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-9 w-9 items-center justify-center rounded-xl transition hover:bg-white hover:text-cloud-blue"
              aria-label="Open cart"
            >
              <ShoppingCart className="h-5 w-5" />
            </a>

            <span className="hidden font-semibold sm:inline">₦ NGN</span>
            <span className="font-semibold sm:hidden">₦</span>

            <Link
              href="/tools/domain-name-search"
              onClick={closeAllMenus}
              className="inline-flex h-9 w-9 items-center justify-center rounded-xl transition hover:bg-white hover:text-cloud-blue"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-white">
        <div className="mx-auto flex h-[80px] w-full max-w-[1540px] items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
          <div className="shrink-0">
            <CloudLogo />
          </div>

          <nav
            className="hidden flex-1 items-center justify-center gap-1.5 xl:flex"
            aria-label="Main navigation"
          >
            {mainNavItems.map((item) => {
              const hasChildren = Boolean(item.children?.length);
              const open = activeMenu === item.label;
              const active =
                isActive(item.href) ||
                Boolean(item.children?.some((child) => isActive(child.href)));

              if (!hasChildren) {
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={closeAllMenus}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative inline-flex h-11 items-center whitespace-nowrap rounded-xl px-3.5 text-[14.5px] font-semibold text-cloud-navy transition hover:bg-cloud-mist hover:text-cloud-blue",
                      active && "bg-cloud-mist text-cloud-blue",
                    )}
                  >
                    {item.badge ? (
                      <span className="absolute -top-2 left-3.5">
                        <Badge badge={item.badge} compact />
                      </span>
                    ) : null}
                    {item.label}
                  </Link>
                );
              }

              return (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setActiveMenu(item.label)}
                  onMouseLeave={() => setActiveMenu(null)}
                >
                  <button
                    type="button"
                    onClick={() => {
                      setActiveMenu((value) =>
                        value === item.label ? null : item.label,
                      );
                      setLoginOpen(false);
                    }}
                    className={cn(
                      "relative inline-flex h-11 items-center gap-1.5 whitespace-nowrap rounded-xl px-3.5 text-[14.5px] font-semibold text-cloud-navy transition hover:bg-cloud-mist hover:text-cloud-blue",
                      (active || open) && "bg-cloud-mist text-cloud-blue",
                    )}
                    aria-expanded={open}
                  >
                    {item.badge ? (
                      <span className="absolute -top-2 left-3.5">
                        <Badge badge={item.badge} compact />
                      </span>
                    ) : null}

                    {item.label}
                    <ChevronDown
                      className={cn("h-4 w-4 transition", open && "rotate-180")}
                    />
                  </button>

                  {open ? (
                    <DesktopDropdown item={item} onClose={closeAllMenus} />
                  ) : null}
                </div>
              );
            })}
          </nav>

          <div className="hidden shrink-0 items-center gap-3 xl:flex">
            <a
              href={cloudLinks.console}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-11 items-center justify-center whitespace-nowrap rounded-xl border border-cloud-border bg-white px-4 text-[14.5px] font-semibold text-cloud-navy transition hover:border-cloud-blue hover:text-cloud-blue"
            >
              Account
            </a>

            <a
              href={cloudLinks.console}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-11 items-center justify-center whitespace-nowrap rounded-xl bg-cloud-blue px-5 text-[14.5px] font-semibold text-white shadow-[0_14px_30px_rgba(0,100,224,0.22)] transition hover:-translate-y-0.5 hover:bg-cloud-navy"
            >
              Get Started
            </a>
          </div>

          <button
            type="button"
            onClick={() => {
              setIsOpen((value) => !value);
              setActiveMenu(null);
              setLoginOpen(false);
            }}
            className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-white text-cloud-navy shadow-sm transition hover:border-cloud-blue hover:text-cloud-blue xl:hidden"
            aria-label="Toggle navigation"
            aria-expanded={isOpen}
            aria-controls="cloud-mobile-menu"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {isOpen ? (
        <div
          id="cloud-mobile-menu"
          className="max-h-[calc(100vh-122px)] overflow-y-auto border-t border-slate-200 bg-white xl:hidden"
        >
          <div className="octalve-cloud-container py-5">
            <form action="/tools/domain-name-search" className="relative mb-5">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />
              <input
                name="q"
                type="search"
                placeholder="Search Octalve Cloud"
                className="h-14 w-full rounded-2xl border border-slate-300 bg-white pl-12 pr-4 text-base font-medium text-cloud-navy outline-none transition placeholder:text-slate-400 focus:border-cloud-blue focus:ring-4 focus:ring-blue-100"
              />
            </form>

            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white">
              {mainNavItems.map((item) => {
                const hasChildren = Boolean(item.children?.length);
                const expanded = mobileSection === item.label;

                if (!hasChildren) {
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={closeAllMenus}
                      className="flex items-center justify-between border-b border-slate-200 px-5 py-5 text-[17px] font-semibold text-cloud-navy transition last:border-b-0 hover:bg-cloud-mist hover:text-cloud-blue"
                    >
                      <span className="flex items-center gap-2">
                        {item.label}
                        {item.badge ? <Badge badge={item.badge} /> : null}
                      </span>
                      <ChevronRight className="h-5 w-5 text-slate-400" />
                    </Link>
                  );
                }

                return (
                  <div
                    key={item.label}
                    className="border-b border-slate-200 last:border-b-0"
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setMobileSection((value) =>
                          value === item.label ? null : item.label,
                        )
                      }
                      className={cn(
                        "flex w-full items-center justify-between px-5 py-5 text-left text-[17px] font-semibold transition",
                        expanded
                          ? "bg-white text-cloud-blue"
                          : "bg-white text-cloud-navy hover:bg-cloud-mist hover:text-cloud-blue",
                      )}
                      aria-expanded={expanded}
                    >
                      <span className="flex items-center gap-2">
                        {item.label}
                        {item.badge ? <Badge badge={item.badge} /> : null}
                      </span>

                      <ChevronDown
                        className={cn(
                          "h-5 w-5 transition",
                          expanded && "rotate-180",
                        )}
                      />
                    </button>

                    {expanded ? (
                      <div className="bg-slate-100">
                        {item.children?.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={closeAllMenus}
                            className="block border-t border-white/80 px-5 py-4 transition hover:bg-white"
                          >
                            <span className="flex items-center gap-2 text-base font-semibold text-cloud-navy">
                              {child.label}
                              {child.badge ? (
                                <Badge badge={child.badge} compact />
                              ) : null}
                            </span>

                            {child.description ? (
                              <span className="mt-1 block text-sm leading-6 text-slate-500">
                                {child.description}
                              </span>
                            ) : null}
                          </Link>
                        ))}
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <a
                href={cloudLinks.console}
                target="_blank"
                rel="noreferrer"
                className="rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm font-semibold text-cloud-navy transition hover:border-cloud-blue hover:text-cloud-blue"
              >
                Client Console
                <span className="mt-1 block text-xs font-medium text-slate-500">
                  Billing, orders and services
                </span>
              </a>

              <a
                href={cloudLinks.opanel}
                target="_blank"
                rel="noreferrer"
                className="rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm font-semibold text-cloud-navy transition hover:border-cloud-blue hover:text-cloud-blue"
              >
                Hosting Panel
                <span className="mt-1 block text-xs font-medium text-slate-500">
                  Files, SSL, email and databases
                </span>
              </a>
            </div>

            <a
              href={cloudLinks.console}
              target="_blank"
              rel="noreferrer"
              className="mt-4 flex h-14 items-center justify-center rounded-2xl bg-cloud-blue px-5 text-sm font-semibold text-white shadow-[0_14px_30px_rgba(0,100,224,0.22)] transition hover:bg-cloud-navy"
            >
              Get Started
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
}
