import { cloudLinks } from "@/features/cloud/data/cloud-links";

export type DomainPriceCategoryKey =
  | "all"
  | "popular"
  | "business"
  | "nigeria"
  | "new";

export type DomainListingCategoryKey = Exclude<DomainPriceCategoryKey, "all">;

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
  category: DomainListingCategoryKey;
  oldPrice?: number;
  currentPrice: number;
  renewalPrice?: number;
  billingLabel: string;
  badge?: string;
  ctaLabel?: string;
  ctaHref?: string;
  accent: DomainAccent;
};

export const DEFAULT_DOMAIN_PRICE_CATEGORY: DomainPriceCategoryKey = "all";

export const domainPriceCategories: DomainPriceCategory[] = [
  {
    key: "all",
    label: "All",
    title: "Explore all domain options for your business",
    description:
      "Compare popular, Nigerian, business, and modern domain extensions in one place before choosing the right name for your brand.",
  },
  {
    key: "popular",
    label: "Popular",
    title: "Popular domain choices for growing brands",
    description:
      "Start with trusted extensions that customers already recognize and remember.",
  },
  {
    key: "business",
    label: "Business",
    title: "Domain extensions for selling and business growth",
    description:
      "Choose extensions that fit online stores, company websites, communities, and professional brands.",
  },
  {
    key: "nigeria",
    label: "Nigeria",
    title: "Local domain options for Nigerian businesses",
    description:
      "Build trust with domain extensions that speak directly to the Nigerian market.",
  },
  {
    key: "new",
    label: "New",
    title: "Modern extensions for digital-first brands",
    description:
      "Use newer extensions when you want a sharper, more flexible online identity.",
  },
];

/**
 * Fallback domain prices.
 *
 * These show immediately while live backend pricing is not connected.
 * Later, live prices will merge through:
 *
 * src/lib/domain-pricing-adapter.ts
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
    id: "co-domain",
    tld: ".co",
    title: "Short Business Identity",
    description:
      "A clean and modern option for startups, agencies, founders, and brands that want a short domain.",
    category: "business",
    oldPrice: 42000,
    currentPrice: 34500,
    renewalPrice: 39000,
    billingLabel: "/1st yr",
    ctaLabel: "Check availability",
    accent: "green",
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
