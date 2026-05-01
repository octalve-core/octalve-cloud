"use client";

import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import { useState } from "react";
import { cloudLinks } from "@/features/cloud/data/cloud-links";
import { CloudButton } from "@/features/cloud/components/CloudButton";
import { CloudLogo } from "@/features/cloud/components/CloudLogo";

const navLinks = [
  { label: "Domains", href: "/domains" },
  { label: "Hosting", href: "/hosting" },
  { label: "Email", href: "/email" },
  { label: "Security", href: "/ssl-security" },
  { label: "Servers", href: "/servers" },
  { label: "Migration", href: "/migration" },
  { label: "Support", href: "/support" },
];

export function CloudHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        <CloudLogo />

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-cloud-blue"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <div className="relative">
            <button
              type="button"
              onClick={() => setLoginOpen((value) => !value)}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-900 transition hover:border-cloud-blue/30 hover:text-cloud-blue"
              aria-expanded={loginOpen}
            >
              Login
              <ChevronDown className="h-4 w-4" aria-hidden="true" />
            </button>

            {loginOpen ? (
              <div className="absolute right-0 mt-3 w-72 rounded-[1.5rem] border border-slate-200 bg-white p-3 shadow-[0_18px_60px_rgba(15,23,42,0.1)]">
                <a
                  href={cloudLinks.console}
                  target="_blank"
                  rel="noreferrer"
                  className="block rounded-2xl px-4 py-3 text-sm transition hover:bg-slate-50"
                >
                  <span className="block font-semibold text-slate-950">Client Console</span>
                  <span className="text-xs text-slate-500">Billing, orders, invoices and support</span>
                </a>
                <a
                  href={cloudLinks.opanel}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-1 block rounded-2xl px-4 py-3 text-sm transition hover:bg-slate-50"
                >
                  <span className="block font-semibold text-slate-950">Hosting Panel</span>
                  <span className="text-xs text-slate-500">Files, email, SSL, DNS and databases</span>
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
          className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-950 lg:hidden"
          aria-label="Toggle navigation"
          aria-expanded={isOpen}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {isOpen ? (
        <div className="border-t border-slate-200 bg-white lg:hidden">
          <div className="mx-auto max-w-7xl space-y-2 px-4 py-4 sm:px-6 lg:px-8">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="block rounded-2xl px-4 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-cloud-blue"
              >
                {item.label}
              </Link>
            ))}
            <div className="grid gap-2 pt-3 sm:grid-cols-2">
              <a
                href={cloudLinks.console}
                target="_blank"
                rel="noreferrer"
                className="rounded-2xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-950 transition hover:border-cloud-blue/30 hover:text-cloud-blue"
              >
                Client Console
              </a>
              <a
                href={cloudLinks.opanel}
                target="_blank"
                rel="noreferrer"
                className="rounded-2xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-950 transition hover:border-cloud-blue/30 hover:text-cloud-blue"
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
