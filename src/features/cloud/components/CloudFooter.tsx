"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowUpRight, Mail, MessageCircle, Phone } from "lucide-react";
import { cloudLinks } from "@/features/cloud/data/cloud-links";
import { CloudLogo } from "@/features/cloud/components/CloudLogo";

type FooterLink = {
  label: string;
  href: string;
  external?: boolean;
};

const serviceLinks: FooterLink[] = [
  { label: "Domain Registration", href: "/domains" },
  { label: "Shared Web Hosting", href: "/hosting" },
  { label: "Business Email", href: "/email" },
  { label: "SSL / Security", href: "/ssl-security" },
  { label: "VPS & Cloud Servers", href: "/servers" },
  { label: "Website Migration", href: "/migration" },
];

const octalveLinks: FooterLink[] = [
  { label: "Octalve Home", href: "https://octalve.com", external: true },
  {
    label: "Who We Are",
    href: "https://octalve.com/who-we-are",
    external: true,
  },
  {
    label: "Octalve Suite",
    href: "https://octalve.com/models/suite",
    external: true,
  },
  {
    label: "Octalve Consult",
    href: "https://octalve.com/models/consult",
    external: true,
  },
  {
    label: "Octalve Lab",
    href: "https://octalve.com/models/lab",
    external: true,
  },
  {
    label: "Octalve Leap",
    href: "https://octalve.com/models/leap",
    external: true,
  },
];

const toolLinks: FooterLink[] = [
  {
    label: "AI Domain Name Generator",
    href: "/tools/ai-domain-name-generator",
  },
  {
    label: "Privacy Policy Generator",
    href: "/tools/privacy-policy-generator",
  },
  {
    label: "Terms of Service Generator",
    href: "/tools/terms-of-service-generator",
  },
  { label: "Domain Name Search", href: "/tools/domain-name-search" },
  { label: "WHOIS Lookup", href: "/tools/whois-lookup" },
  { label: "Compare Domain Sellers", href: "/tools/compare-domain-sellers" },
  { label: "Malware & Hack Checker", href: "/tools/malware-scan" },
];

const accessLinks: FooterLink[] = [
  { label: "Client Console", href: cloudLinks.console, external: true },
  { label: "Hosting Panel", href: cloudLinks.opanel, external: true },
  { label: "Support Center", href: "/support" },
  { label: "Contact Sales", href: "/contact" },
];

const socialLinks = [
  { label: "Facebook", short: "f", href: "https://facebook.com/octalve" },
  {
    label: "LinkedIn",
    short: "in",
    href: "https://linkedin.com/company/octalve",
  },
  { label: "Instagram", short: "ig", href: "https://instagram.com/octalve" },
  { label: "X", short: "x", href: "https://x.com/octalve" },
];

function getGreeting() {
  const hour = new Date().getHours();

  if (hour < 12) return "good morning";
  if (hour < 17) return "good afternoon";
  return "good evening";
}

function FooterNavLink({ item }: { item: FooterLink }) {
  const className =
    "group inline-flex items-center gap-2 text-[15px] leading-6 text-slate-300 transition hover:text-white";

  if (item.external) {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noreferrer"
        className={className}
      >
        <ArrowUpRight
          className="h-3.5 w-3.5 text-cloud-blue transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          aria-hidden="true"
        />
        {item.label}
      </a>
    );
  }

  return (
    <Link href={item.href} className={className}>
      <ArrowUpRight
        className="h-3.5 w-3.5 text-cloud-blue transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        aria-hidden="true"
      />
      {item.label}
    </Link>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: FooterLink[];
}) {
  return (
    <div>
      <h3 className="text-base font-semibold text-white">{title}</h3>

      <div className="mt-6 grid gap-4">
        {links.map((item) => (
          <FooterNavLink key={`${title}-${item.label}`} item={item} />
        ))}
      </div>
    </div>
  );
}

export function CloudFooter() {
  const [greeting, setGreeting] = useState("welcome");

  useEffect(() => {
    setGreeting(getGreeting());
  }, []);

  return (
    <footer className="relative overflow-hidden bg-[#020A17] text-white">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -left-40 top-10 h-96 w-96 rounded-full bg-cloud-blue/10 blur-3xl" />
        <div className="absolute -right-40 bottom-0 h-[420px] w-[420px] rounded-full bg-cloud-blue/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h2 className="max-w-5xl text-4xl font-medium tracking-[-0.055em] text-white sm:text-5xl lg:text-6xl">
              Octalve Cloud, <span className="text-cloud-blue">{greeting}</span>
            </h2>

            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
              Register domains, host websites, create business email, secure
              your platform, and move your business online with guided cloud
              support.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            {socialLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                aria-label={item.label}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-cloud-blue text-xs font-semibold uppercase text-white shadow-[0_16px_40px_rgba(0,100,224,0.24)] transition hover:-translate-y-0.5 hover:bg-blue-600 sm:h-14 sm:w-14 sm:text-sm"
              >
                {item.short}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-14 grid gap-12 border-t border-white/10 pt-14 sm:grid-cols-2 lg:grid-cols-[1.15fr_0.85fr_0.85fr_1fr_0.9fr]">
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="inline-flex">
              <CloudLogo />
            </div>

            <p className="mt-8 max-w-sm text-[15px] leading-8 text-slate-300">
              Octalve Cloud helps SMEs, founders, creators, schools, NGOs, and
              growing businesses launch and manage reliable digital
              infrastructure.
            </p>

            <div className="mt-8 grid gap-4 text-[15px] text-slate-300">
              <a
                href={`mailto:${cloudLinks.supportEmail}`}
                className="flex items-center gap-3 transition hover:text-white"
              >
                <Mail className="h-4 w-4 text-cloud-blue" aria-hidden="true" />
                {cloudLinks.supportEmail}
              </a>

              <a
                href={`tel:${cloudLinks.supportPhone.replace(/\s+/g, "")}`}
                className="flex items-center gap-3 transition hover:text-white"
              >
                <Phone className="h-4 w-4 text-cloud-blue" aria-hidden="true" />
                {cloudLinks.supportPhone}
              </a>

              <a
                href={cloudLinks.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 transition hover:text-white"
              >
                <MessageCircle
                  className="h-4 w-4 text-cloud-blue"
                  aria-hidden="true"
                />
                WhatsApp Support
              </a>
            </div>
          </div>

          <FooterColumn title="Services" links={serviceLinks} />
          <FooterColumn title="Octalve" links={octalveLinks} />
          <FooterColumn title="Tools" links={toolLinks} />
          <FooterColumn title="Access & Help" links={accessLinks} />
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Octalve Cloud. All rights reserved.
          </p>

          <p>
            Quick response:{" "}
            <span className="text-slate-200">{cloudLinks.supportPhone}</span> ·{" "}
            <span className="text-slate-200">{cloudLinks.supportEmail}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
