import { cloudLinks } from "@/features/cloud/data/cloud-links";

export type DomainPriceCategoryKey = "popular" | "nigeria" | "business" | "new";

export type DomainAccent = "blue" | "green" | "orange" | "purple";

export type DomainPriceCategory = {
  key: DomainPriceCategoryKey;
  label: string;
  title: string;
  description: string;
};

export type DomainPackage = {
  id: string;
  tld: string;
  title: string;
  description: string;
  category: DomainPriceCategoryKey;
  oldPrice?: number;
  currentPrice: number;
  renewalPrice?: number;
  billingLabel: string;
  badge?: string;
  ctaLabel?: string;
  ctaHref?: string;
  accent: DomainAccent;
};

export const domainPriceCategories: DomainPriceCategory[] = [
  {
    key: "popular",
    label: "Popular",
    title: "Popular domain choices for growing brands",
    description:
      "Start with trusted extensions that customers already recognize and remember.",
  },
  {
    key: "nigeria",
    label: "Nigeria",
    title: "Local domain options for Nigerian businesses",
    description:
      "Build trust with domain extensions that speak directly to the Nigerian market.",
  },
  {
    key: "business",
    label: "Business",
    title: "Domain extensions for selling and business growth",
    description:
      "Choose extensions that fit online stores, company websites, communities, and professional brands.",
  },
  {
    key: "new",
    label: "New TLDs",
    title: "Modern extensions for digital-first brands",
    description:
      "Use newer extensions when you want a sharper, more flexible online identity.",
  },
];

/**
 * Fallback domain prices.
 *
 * These are shown immediately while the live backend adapter is not connected.
 * Later, the UI will receive updated prices from:
 *
 * src/lib/domain-price-adapter.ts
 */
export const fallbackDomainPackages: DomainPackage[] = [
  {
    id: "com-domain",
    tld: ".com",
    title: "Global Brand Standard",
    description:
      "A strong domain choice for businesses, startups, personal brands, and professional websites.",
    category: "popular",
    oldPrice: 30900,
    currentPrice: 15900,
    renewalPrice: 18000,
    billingLabel: "/1st yr",
    badge: "Popular",
    ctaLabel: "Check availability",
    accent: "blue",
  },
  {
    id: "com-ng-domain",
    tld: ".com.ng",
    title: "Nigeria Business Identity",
    description:
      "A practical local domain for Nigerian SMEs, service providers, and growing companies.",
    category: "nigeria",
    oldPrice: 39000,
    currentPrice: 0,
    renewalPrice: 7500,
    billingLabel: "/1st yr",
    badge: "Local",
    ctaLabel: "Check availability",
    accent: "green",
  },
  {
    id: "ng-domain",
    tld: ".ng",
    title: "Premium Local Presence",
    description:
      "A shorter Nigerian domain for ambitious brands that want a clean local identity.",
    category: "nigeria",
    oldPrice: 22900,
    currentPrice: 16500,
    renewalPrice: 19000,
    billingLabel: "/1st yr",
    badge: "Nigeria",
    ctaLabel: "Check availability",
    accent: "blue",
  },
  {
    id: "org-domain",
    tld: ".org",
    title: "Trust for Missions & Communities",
    description:
      "Ideal for NGOs, churches, foundations, communities, and purpose-driven organisations.",
    category: "business",
    oldPrice: 34900,
    currentPrice: 28900,
    renewalPrice: 31000,
    billingLabel: "/1st yr",
    ctaLabel: "Check availability",
    accent: "orange",
  },
  {
    id: "net-domain",
    tld: ".net",
    title: "Reliable Alternative for Growth",
    description:
      "A professional option when your preferred .com is unavailable but you still want credibility.",
    category: "popular",
    oldPrice: 36900,
    currentPrice: 30986,
    renewalPrice: 34000,
    billingLabel: "/1st yr",
    ctaLabel: "Check availability",
    accent: "purple",
  },
  {
    id: "shop-domain",
    tld: ".shop",
    title: "Built for Selling Online",
    description:
      "Perfect for ecommerce stores, catalogs, product brands, and online retail businesses.",
    category: "business",
    oldPrice: 53000,
    currentPrice: 1900,
    renewalPrice: 19800,
    billingLabel: "/1st yr",
    badge: "Deal",
    ctaLabel: "Check availability",
    accent: "orange",
  },
  {
    id: "cloud-domain",
    tld: ".cloud",
    title: "Modern Cloud Identity",
    description:
      "A strong fit for hosting brands, SaaS products, tech companies, and digital platforms.",
    category: "new",
    oldPrice: 32000,
    currentPrice: 22500,
    renewalPrice: 26000,
    billingLabel: "/1st yr",
    ctaLabel: "Check availability",
    accent: "blue",
  },
  {
    id: "ai-domain",
    tld: ".ai",
    title: "AI-Ready Brand Positioning",
    description:
      "A premium extension for AI products, automation platforms, data tools, and tech startups.",
    category: "new",
    oldPrice: 145000,
    currentPrice: 95000,
    renewalPrice: 120000,
    billingLabel: "/1st yr",
    badge: "Premium",
    ctaLabel: "Check availability",
    accent: "purple",
  },
  {
    id: "africa-domain",
    tld: ".africa",
    title: "Africa-Focused Reach",
    description:
      "For businesses, communities, and organisations that want a wider African digital identity.",
    category: "new",
    oldPrice: 72000,
    currentPrice: 60170,
    renewalPrice: 68000,
    billingLabel: "/1st yr",
    ctaLabel: "Check availability",
    accent: "green",
  },
];

export function formatNaira(value: number) {
  if (value === 0) {
    return "₦0";
  }

  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(value);
}

export function buildDomainAvailabilityHref(domainPackage: DomainPackage) {
  if (domainPackage.ctaHref) {
    return domainPackage.ctaHref;
  }

  const separator = cloudLinks.console.includes("?") ? "&" : "?";

  return `${cloudLinks.console}${separator}tld=${encodeURIComponent(
    domainPackage.tld,
  )}`;
}
