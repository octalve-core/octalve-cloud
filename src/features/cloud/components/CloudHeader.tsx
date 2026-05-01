"use client";

import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import { useState } from "react";
import { cloudLinks, cloudNavLinks } from "@/features/cloud/data/cloud-links";
import { CloudButton } from "@/features/cloud/components/CloudButton";
import { CloudLogo } from "@/features/cloud/components/CloudLogo";

const toolsLinks = [
  { label: "AI Domain Name Generator", href: "/tools/ai-domain-name-generator" },
  { label: "Privacy Policy Generator", href: "/tools/privacy-policy-generator" },
  { label: "Terms of Service Generator", href: "/tools/terms-of-service-generator" },
  { label: "Domain Name Search", href: "/tools/domain-name-search" },
  { label: "WHOIS Lookup", href: "/tools/whois-lookup" },
  { label: "Compare Domain Sellers", href: "/tools/compare-domain-sellers" },
  { label: "Malware & Hack Check", href: "/tools/malware-scan" },
];

export function CloudHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/90 backdrop-blur-xl">
      <div className="octalve-cloud-container flex h-[76px] items-center justify-between gap-6">
        <CloudLogo />

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
          {cloudNavLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="octalve-cloud-focus rounded-full px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-cloud-soft hover:text-cloud-blue"
            >
              {item.label}
            </Link>
          ))}

          <div className="relative">
            <button
              type="button"
              onClick={() => setToolsOpen((value) => !value)}
              className="octalve-cloud-focus inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-cloud-soft hover:text-cloud-blue"
              aria-expanded={toolsOpen}
            >
              Tools
              <ChevronDown className="h-4 w-4" aria-hidden="true" />
            </button>

            {toolsOpen ? (
              <div className="absolute left-0 mt-3 w-[320px] rounded-3xl border border-slate-200 bg-white p-3 shadow-[0_20px_70px_rgba(15,23,42,0.12)]">
                <Link
                  href="/tools"
                  onClick={() => setToolsOpen(false)}
                  className="block rounded-2xl px-4 py-3 text-sm font-semibold text-cloud-blue transition hover:bg-cloud-mist"
                >
                  View all tools
                </Link>
                <div className="my-2 h-px bg-slate-100" />
                {toolsLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setToolsOpen(false)}
                    className="block rounded-2xl px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-cloud-mist hover:text-cloud-blue"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            ) : null}
          </div>
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <div className="relative">
            <button
              type="button"
              onClick={() => setLoginOpen((value) => !value)}
              className="octalve-cloud-focus inline-flex items-center gap-2 rounded-full border border-cloud-border bg-white px-4 py-3 text-sm font-medium text-cloud-navy transition hover:border-cloud-blue hover:text-cloud-blue"
              aria-expanded={loginOpen}
            >
              Login
              <ChevronDown className="h-4 w-4" aria-hidden="true" />
            </button>

            {loginOpen ? (
              <div className="absolute right-0 mt-3 w-64 rounded-3xl border border-cloud-border bg-white p-3 shadow-cloud">
                <a
                  href={cloudLinks.console}
                  target="_blank"
                  rel="noreferrer"
                  className="block rounded-2xl px-4 py-3 text-sm transition hover:bg-cloud-mist"
                >
                  <span className="block font-medium text-cloud-navy">Client Console</span>
                  <span className="text-xs text-slate-500">Billing, services and support</span>
                </a>
                <a
                  href={cloudLinks.opanel}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-1 block rounded-2xl px-4 py-3 text-sm transition hover:bg-cloud-mist"
                >
                  <span className="block font-medium text-cloud-navy">Hosting Panel</span>
                  <span className="text-xs text-slate-500">Files, email, SSL and databases</span>
                </a>
              </div>
            ) : null}
          </div>

          <CloudButton href={cloudLinks.console} external>
            Get Started
          </CloudButton>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen((value) => !value)}
          className="octalve-cloud-focus inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-cloud-border bg-white text-cloud-navy lg:hidden"
          aria-label="Toggle navigation"
          aria-expanded={isOpen}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {isOpen ? (
        <div className="border-t border-cloud-border bg-white lg:hidden">
          <div className="octalve-cloud-container space-y-2 py-4">
            {cloudNavLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="block rounded-2xl px-4 py-3 text-sm font-medium text-cloud-ash hover:bg-cloud-mist hover:text-cloud-blue"
              >
                {item.label}
              </Link>
            ))}

            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-2">
              <Link
                href="/tools"
                onClick={() => setIsOpen(false)}
                className="block rounded-2xl px-4 py-3 text-sm font-semibold text-cloud-blue"
              >
                Tools
              </Link>
              {toolsLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="block rounded-2xl px-4 py-3 text-sm font-medium text-slate-700 hover:bg-white hover:text-cloud-blue"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="grid gap-2 pt-3 sm:grid-cols-2">
              <a
                href={cloudLinks.console}
                target="_blank"
                rel="noreferrer"
                className="rounded-2xl border border-cloud-border px-4 py-3 text-sm font-medium text-cloud-navy transition hover:border-cloud-blue hover:text-cloud-blue"
              >
                Client Console
              </a>
              <a
                href={cloudLinks.opanel}
                target="_blank"
                rel="noreferrer"
                className="rounded-2xl border border-cloud-border px-4 py-3 text-sm font-medium text-cloud-navy transition hover:border-cloud-blue hover:text-cloud-blue"
              >
                Hosting Panel
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
