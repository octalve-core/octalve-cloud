"use client";

import Image from "next/image";
import Link from "next/link";
import { useSyncExternalStore } from "react";
import type { ReactNode } from "react";
import octalveCloudIcon from "@/assets/logo/Octalve Cloud Icon.png";
import { cloudLinks } from "@/features/cloud/data/cloud-links";

const FOOTER_COLORS = {
  bg: "#000A16",
  accent: "#0064E0",
  text: "#F8FAFC",
  muted: "#C7D2E1",
  soft: "#8FA2BF",
  divider: "rgba(0, 100, 224, 0.24)",
  iconBg: "#0064E0",
  iconText: "#FFFFFF",
};

type FooterLabelTone = "new" | "free" | "ai" | "secure" | "popular" | "support";

type FooterLabel = {
  text: string;
  tone: FooterLabelTone;
};

type FooterLinkItem = {
  label: string;
  href: string;
  labels?: FooterLabel[];
};

const footerLabelClasses: Record<FooterLabelTone, string> = {
  new: "bg-[#F04D23] text-white",
  free: "bg-[#2369B3] text-white",
  ai: "bg-[#651FFF] text-white",
  secure: "bg-[#16A34A] text-white",
  popular: "bg-[#FC7E24] text-white",
  support: "bg-[#0064E0] text-white",
};

const services: FooterLinkItem[] = [
  {
    label: "Domain Registration",
    href: "/domains",
    labels: [{ text: "NEW", tone: "new" }],
  },
  {
    label: "Shared Web Hosting",
    href: "/hosting",
    labels: [{ text: "POPULAR", tone: "popular" }],
  },
  {
    label: "Business Email",
    href: "/email",
    labels: [{ text: "NEW", tone: "new" }],
  },
  {
    label: "SSL / Security",
    href: "/ssl-security",
    labels: [{ text: "SECURE", tone: "secure" }],
  },
  {
    label: "VPS & Cloud Servers",
    href: "/servers",
    labels: [{ text: "POWER", tone: "support" }],
  },
  {
    label: "Website Migration",
    href: "/migration",
  },
  {
    label: "Support Center",
    href: "/support",
    labels: [{ text: "HELP", tone: "support" }],
  },
];

const octalve: FooterLinkItem[] = [
  { label: "Octalve Home", href: "https://octalve.com" },
  { label: "Who We Are", href: "https://octalve.com/who-we-are" },
  {
    label: "Octalve Suite",
    href: "https://octalve.com/models/suite",
    labels: [{ text: "GROWTH", tone: "support" }],
  },
  { label: "Octalve Consult", href: "https://octalve.com/models/consult" },
  { label: "Octalve Lab", href: "https://octalve.com/models/lab" },
  { label: "Octalve Leap", href: "https://octalve.com/models/leap" },
];

const tools: FooterLinkItem[] = [
  {
    label: "AI Domain Name Generator",
    href: "/tools/ai-domain-name-generator",
    labels: [{ text: "AI", tone: "ai" }],
  },
  {
    label: "Privacy Policy Generator",
    href: "/tools/privacy-policy-generator",
    labels: [{ text: "FREE", tone: "free" }],
  },
  {
    label: "Terms of Service Generator",
    href: "/tools/terms-of-service-generator",
    labels: [{ text: "FREE", tone: "free" }],
  },
  {
    label: "Domain Name Search",
    href: "/tools/domain-name-search",
  },
  {
    label: "WHOIS Lookup",
    href: "/tools/whois-lookup",
  },
  {
    label: "Compare Domain Sellers",
    href: "/tools/compare-domain-sellers",
  },
  {
    label: "Malware & Hack Checker",
    href: "/tools/malware-scan",
    labels: [
      { text: "NEW", tone: "new" },
      { text: "AI", tone: "ai" },
    ],
  },
];

const accessHelp: FooterLinkItem[] = [
  {
    label: "Client Console",
    href: cloudLinks.console,
    labels: [{ text: "ACCOUNT", tone: "support" }],
  },
  {
    label: "Hosting Panel",
    href: cloudLinks.opanel,
    labels: [{ text: "PANEL", tone: "secure" }],
  },
  { label: "Contact Sales", href: "/contact" },
  {
    label: "Support Center",
    href: "/support",
    labels: [{ text: "HELP", tone: "support" }],
  },
  {
    label: "WhatsApp Support",
    href: cloudLinks.whatsapp,
    labels: [{ text: "FAST", tone: "secure" }],
  },
  { label: "Email Support", href: `mailto:${cloudLinks.supportEmail}` },
];

const feedback: FooterLinkItem[] = [
  { label: "Give feedback", href: "/contact" },
  {
    label: cloudLinks.supportPhone,
    href: `tel:${cloudLinks.supportPhone.replace(/\s+/g, "")}`,
  },
  { label: cloudLinks.supportEmail, href: `mailto:${cloudLinks.supportEmail}` },
  {
    label: "Client Console",
    href: cloudLinks.console,
    labels: [{ text: "LOGIN", tone: "support" }],
  },
  {
    label: "Hosting Panel",
    href: cloudLinks.opanel,
    labels: [{ text: "PANEL", tone: "secure" }],
  },
];

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function isExternalLink(href: string) {
  return (
    href.startsWith("http") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:")
  );
}

function FooterMiniLabel({ label }: { label: FooterLabel }) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center rounded-md px-1.5 py-1 text-[9px] font-bold uppercase leading-none tracking-[0.03em]",
        footerLabelClasses[label.tone],
      )}
    >
      {label.text}
    </span>
  );
}

function ArrowUpRightIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M7 17L17 7M17 7H9M17 7V15"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M14 8H16V5H13.5C10.9 5 9 6.8 9 9.8V12H7V15H9V20H12.5V15H15.2L15.7 12H12.5V10.2C12.5 8.9 13 8 14 8Z"
        fill="currentColor"
      />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M6.5 8.5C7.6 8.5 8.5 7.6 8.5 6.5C8.5 5.4 7.6 4.5 6.5 4.5C5.4 4.5 4.5 5.4 4.5 6.5C4.5 7.6 5.4 8.5 6.5 8.5Z"
        fill="currentColor"
      />
      <path d="M5 10H8V19H5V10Z" fill="currentColor" />
      <path
        d="M10.5 10H13.3V11.3C13.8 10.5 14.9 9.8 16.4 9.8C19.2 9.8 20 11.6 20 14.2V19H17V14.9C17 13.5 16.5 12.6 15.2 12.6C13.9 12.6 13.3 13.5 13.3 14.9V19H10.5V10Z"
        fill="currentColor"
      />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <rect
        x="4"
        y="4"
        width="16"
        height="16"
        rx="4"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M5 5L19 19M19 5L5 19"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
      />
    </svg>
  );
}

function FooterItem({ item }: { item: FooterLinkItem }) {
  const content = (
    <>
      <span
        className="mt-[5px] shrink-0 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        style={{ color: FOOTER_COLORS.accent }}
      >
        <ArrowUpRightIcon />
      </span>

      <span className="min-w-0">
        <span className="inline-flex flex-wrap items-center gap-2">
          <span className="group-hover:text-white">{item.label}</span>

          {item.labels?.map((label) => (
            <FooterMiniLabel
              key={`${item.label}-${label.text}-${label.tone}`}
              label={label}
            />
          ))}
        </span>
      </span>
    </>
  );

  const className =
    "group inline-flex items-start gap-2 text-sm leading-7 transition";

  if (isExternalLink(item.href)) {
    return (
      <a
        href={item.href}
        target={item.href.startsWith("http") ? "_blank" : undefined}
        rel={item.href.startsWith("http") ? "noreferrer" : undefined}
        className={className}
        style={{ color: FOOTER_COLORS.muted }}
      >
        {content}
      </a>
    );
  }

  return (
    <Link
      href={item.href}
      className={className}
      style={{ color: FOOTER_COLORS.muted }}
    >
      {content}
    </Link>
  );
}

function FooterSection({
  title,
  items,
}: {
  title: string;
  items: FooterLinkItem[];
}) {
  return (
    <div>
      <h3
        className="text-[15px] font-semibold tracking-[-0.02em]"
        style={{ color: FOOTER_COLORS.text }}
      >
        {title}
      </h3>

      <ul className="mt-6 space-y-4">
        {items.map((item) => (
          <li key={`${title}-${item.label}`}>
            <FooterItem item={item} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="inline-flex h-12 w-12 items-center justify-center rounded-full transition hover:scale-105 sm:h-14 sm:w-14"
      style={{
        backgroundColor: FOOTER_COLORS.iconBg,
        color: FOOTER_COLORS.iconText,
      }}
    >
      {children}
    </a>
  );
}

function getGreetingByHour(hour: number) {
  if (hour < 12) {
    return { text: "morning", emoji: "☀️" };
  }

  if (hour < 18) {
    return { text: "afternoon", emoji: "🌤️" };
  }

  return { text: "evening", emoji: "🌙" };
}

function subscribeToClock(onStoreChange: () => void) {
  const intervalId = window.setInterval(onStoreChange, 60_000);

  return () => {
    window.clearInterval(intervalId);
  };
}

function getClientHour(): number | null {
  return new Date().getHours();
}

function getServerHour(): number | null {
  return null;
}

export function CloudFooter() {
  const hour = useSyncExternalStore(
    subscribeToClock,
    getClientHour,
    getServerHour,
  );

  const greeting = getGreetingByHour(hour ?? 18);

  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="px-4 pb-8 pt-14 sm:px-6 md:px-8 md:pt-20"
      style={{ backgroundColor: FOOTER_COLORS.bg }}
    >
      <div className="mx-auto max-w-[1360px]">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-3xl">
            <h2
              className="text-4xl font-semibold leading-tight tracking-[-0.05em] sm:text-5xl md:text-6xl"
              style={{ color: FOOTER_COLORS.text }}
            >
              Octalve Cloud,{" "}
              <span style={{ color: FOOTER_COLORS.accent }}>
                good {greeting.text}
              </span>{" "}
              <span>{greeting.emoji}</span>
            </h2>
          </div>

          <div className="flex flex-wrap gap-4 md:justify-end">
            <SocialLink
              href="https://web.facebook.com/octalve"
              label="Facebook"
            >
              <FacebookIcon />
            </SocialLink>

            <SocialLink
              href="https://ng.linkedin.com/company/octalve"
              label="LinkedIn"
            >
              <LinkedInIcon />
            </SocialLink>

            <SocialLink
              href="https://www.instagram.com/octalve_/"
              label="Instagram"
            >
              <InstagramIcon />
            </SocialLink>

            <SocialLink href="https://x.com/octalve" label="X">
              <XIcon />
            </SocialLink>
          </div>
        </div>

        <div className="mt-12 grid gap-12 md:grid-cols-2 xl:grid-cols-[1.2fr_1fr_1fr_1fr_1fr]">
          <div className="md:col-span-2 xl:col-span-1">
            <Link href="/" className="inline-flex items-center gap-3">
              <Image
                src={octalveCloudIcon}
                alt="Octalve Cloud icon"
                width={170}
                height={170}
                className="h-auto w-[130px] object-contain sm:w-[150px] md:w-[170px]"
                priority={false}
              />
            </Link>

            <p
              className="mt-6 max-w-md text-base leading-8"
              style={{ color: FOOTER_COLORS.muted }}
            >
              Octalve Cloud helps businesses register domains, host websites,
              create business email, secure websites, deploy cloud servers, and
              move online with guided support.
            </p>
          </div>

          <FooterSection title="Services" items={services} />
          <FooterSection title="Octalve" items={octalve} />
          <FooterSection title="Tools" items={tools} />
          <FooterSection title="Access & Help" items={accessHelp} />
        </div>

        <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <FooterSection title="Feedback" items={feedback} />

          <div
            className="rounded-[28px] border p-6 sm:p-7"
            style={{ borderColor: FOOTER_COLORS.divider }}
          >
            <div className="flex flex-wrap items-center gap-2">
              <h3
                className="text-[15px] font-semibold tracking-[-0.02em]"
                style={{ color: FOOTER_COLORS.text }}
              >
                Social Media Links
              </h3>

              <FooterMiniLabel label={{ text: "OFFICIAL", tone: "support" }} />
            </div>

            <div className="mt-6 flex flex-wrap gap-4">
              <SocialLink
                href="https://web.facebook.com/octalve"
                label="Facebook"
              >
                <FacebookIcon />
              </SocialLink>

              <SocialLink
                href="https://ng.linkedin.com/company/octalve"
                label="LinkedIn"
              >
                <LinkedInIcon />
              </SocialLink>

              <SocialLink
                href="https://www.instagram.com/octalve_/"
                label="Instagram"
              >
                <InstagramIcon />
              </SocialLink>

              <SocialLink href="https://x.com/octalve" label="X">
                <XIcon />
              </SocialLink>
            </div>

            <p
              className="mt-6 text-sm leading-7"
              style={{ color: FOOTER_COLORS.soft }}
            >
              Stay connected with Octalve Cloud and the wider Octalve ecosystem
              across our official social channels.
            </p>
          </div>
        </div>

        <div
          className="mt-14 border-t pt-6"
          style={{ borderColor: FOOTER_COLORS.divider }}
        >
          <div className="flex flex-col gap-3 text-sm md:flex-row md:items-center md:justify-between">
            <p style={{ color: FOOTER_COLORS.muted }}>
              © {currentYear} Octalve Cloud. All Rights Reserved.
            </p>

            <nav aria-label="Legal" className="flex flex-wrap gap-x-5 gap-y-2">
              <Link className="hover:underline" style={{color:FOOTER_COLORS.muted}} href="/privacy-policy">Privacy Policy</Link>
              <Link className="hover:underline" style={{color:FOOTER_COLORS.muted}} href="/terms-of-service">Terms of Service</Link>
            </nav>
            <p style={{ color: FOOTER_COLORS.soft }}>
              Powered by{" "}
              <span style={{ color: FOOTER_COLORS.accent }}>Octalve Cloud</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
