"use client";

import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import { useState } from "react";
import { cloudLinks, cloudNavLinks } from "@/features/cloud/data/cloud-links";
import { CloudLogo } from "@/features/cloud/components/CloudLogo";
import { CloudButton } from "@/features/cloud/components/CloudButton";

export function CloudHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/90 backdrop-blur-xl">
      <div className="octalve-cloud-container flex h-[76px] items-center justify-between gap-6">
        <CloudLogo />

        <nav
          className="hidden items-center gap-1 lg:flex"
          aria-label="Main navigation"
        >
          {cloudNavLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="octalve-cloud-focus rounded-full px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-cloud-soft hover:text-cloud-blue"
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
              className="octalve-cloud-focus inline-flex items-center gap-2 rounded-full border border-cloud-border bg-white px-4 py-3 text-sm font-bold text-cloud-navy transition hover:border-cloud-blue hover:text-cloud-blue"
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
                  <span className="block font-bold text-cloud-navy">
                    Client Console
                  </span>
                  <span className="text-xs text-slate-500">
                    Billing, services and support
                  </span>
                </a>

                <a
                  href={cloudLinks.opanel}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-1 block rounded-2xl px-4 py-3 text-sm transition hover:bg-cloud-mist"
                >
                  <span className="block font-bold text-cloud-navy">
                    Hosting Panel
                  </span>
                  <span className="text-xs text-slate-500">
                    Files, email, SSL and databases
                  </span>
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
          {isOpen ? (
            <X className="h-5 w-5" aria-hidden="true" />
          ) : (
            <Menu className="h-5 w-5" aria-hidden="true" />
          )}
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
                className="block rounded-2xl px-4 py-3 text-sm font-bold text-cloud-ash hover:bg-cloud-mist hover:text-cloud-blue"
              >
                {item.label}
              </Link>
            ))}

            <div className="grid gap-2 pt-3 sm:grid-cols-2">
              <a
                href={cloudLinks.console}
                target="_blank"
                rel="noreferrer"
                className="rounded-2xl border border-cloud-border px-4 py-3 text-sm font-bold text-cloud-navy transition hover:border-cloud-blue hover:text-cloud-blue"
              >
                Client Console
              </a>

              <a
                href={cloudLinks.opanel}
                target="_blank"
                rel="noreferrer"
                className="rounded-2xl border border-cloud-border px-4 py-3 text-sm font-bold text-cloud-navy transition hover:border-cloud-blue hover:text-cloud-blue"
              >
                Hosting Panel
              </a>
            </div>

            <a
              href={cloudLinks.console}
              target="_blank"
              rel="noreferrer"
              className="block rounded-2xl bg-cloud-blue px-4 py-3 text-center text-sm font-black text-white shadow-sm transition hover:bg-blue-600"
            >
              Get Started
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
}
