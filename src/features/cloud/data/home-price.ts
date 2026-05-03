import { cloudLinks } from "@/features/cloud/data/cloud-links";

export type BillingCycleKey = "1mo" | "12mo" | "24mo" | "48mo";

export type PackageCategoryKey =
  | "promos"
  | "domains"
  | "email"
  | "wordpress"
  | "hosting"
  | "security"
  | "vps";

export type HomePriceCategory = {
  key: PackageCategoryKey;
  label: string;
  description: string;
};

export type BillingCycle = {
  key: BillingCycleKey;
  label: string;
  months: number;
  discountPercent: number;
  badge?: string;
};

export type FixedPricing = {
  kind: "fixed";
  price: number;
  suffix: string;
  regularPrice?: number;
};

export type CyclePricing = {
  kind: "cycle";
  baseMonthlyPrice: number;
  regularMonthlyPrice?: number;
  billingAdjustments?: Partial<Record<BillingCycleKey, number>>;
};

export type HomePricePlan = {
  id: string;
  name: string;
  category: PackageCategoryKey;
  badge?: string;
  popular?: boolean;
  eyebrow?: string;
  description: string;
  pricing: FixedPricing | CyclePricing;
  orderPath?: string;
  ctaHref?: string;
  ctaLabel?: string;
  finePrint?: string;
  features: string[];
};

export type PlanPricingDisplay = {
  priceLabel: string;
  suffix: string;
  regularPriceLabel?: string;
  totalLabel?: string;
  renewsLabel?: string;
  discountPercent?: number;
};

export const DEFAULT_BILLING_CYCLE: BillingCycleKey = "12mo";

export const billingCycles: BillingCycle[] = [
  {
    key: "1mo",
    label: "1 month",
    months: 1,
    discountPercent: 0,
  },
  {
    key: "12mo",
    label: "12 months",
    months: 12,
    discountPercent: 10,
    badge: "Popular",
  },
  {
    key: "24mo",
    label: "24 months",
    months: 24,
    discountPercent: 15,
  },
  {
    key: "48mo",
    label: "48 months",
    months: 48,
    discountPercent: 20,
    badge: "Best value",
  },
];

/**
 * Edit these categories to change the top tabs.
 * The desktop view uses tabs.
 * The mobile view automatically becomes a dropdown.
 */
export const homePriceCategories: HomePriceCategory[] = [
  {
    key: "promos",
    label: "Promos",
    description: "Starter offers and entry products for new online businesses.",
  },
  {
    key: "domains",
    label: "Domains",
    description: "Register domain names and secure your online identity.",
  },
  {
    key: "email",
    label: "Email",
    description: "Professional business email for teams and brands.",
  },
  {
    key: "wordpress",
    label: "WordPress",
    description: "WordPress-ready hosting for websites, blogs, and stores.",
  },
  {
    key: "hosting",
    label: "Hosting",
    description: "Shared hosting packages for websites and business pages.",
  },
  {
    key: "security",
    label: "Security",
    description: "SSL, backup, malware support, and website protection.",
  },
  {
    key: "vps",
    label: "VPS",
    description: "Cloud server packages for more control and performance.",
  },
];

/**
 * Pricing note:
 * - Cycle plans use baseMonthlyPrice.
 * - Billing discounts are controlled from billingCycles above.
 * - You can override the discount per plan using billingAdjustments.
 * - Fixed plans are not affected by the billing duration selector.
 */
export const homePricePlans: HomePricePlan[] = [
  {
    id: "business-starter-kit",
    name: "Business Starter Kit",
    category: "promos",
    badge: "Free",
    eyebrow: "Launch bundle",
    description:
      "A starter path for new businesses that need domain guidance, hosting direction, email setup, and online launch support.",
    pricing: {
      kind: "fixed",
      price: 0,
      suffix: "starter review",
    },
    orderPath: "/order/promos/business-starter-kit",
    ctaLabel: "Start free",
    features: [
      "Domain name guidance",
      "Shared hosting recommendation",
      "Business email setup direction",
      "SSL setup guidance",
      "Basic website launch checklist",
      "Support before going live",
    ],
  },
  {
    id: "free-migration-review",
    name: "Migration Review",
    category: "promos",
    badge: "Free",
    eyebrow: "Website move",
    description:
      "Let us review your current hosting setup and guide your migration path before you move to Octalve Cloud.",
    pricing: {
      kind: "fixed",
      price: 0,
      suffix: "review",
    },
    orderPath: "/order/promos/migration-review",
    ctaLabel: "Request review",
    features: [
      "Website hosting review",
      "Domain and DNS check",
      "Email migration direction",
      "SSL and backup review",
      "Recommended migration plan",
      "Guided next step",
    ],
  },
  {
    id: "first-month-hosting-trial",
    name: "Shared Hosting Trial",
    category: "promos",
    badge: "Trial",
    eyebrow: "Try hosting",
    description:
      "A simple way to test shared hosting before moving fully into a longer billing duration.",
    pricing: {
      kind: "fixed",
      price: 0,
      suffix: "first month",
      regularPrice: 4500,
    },
    orderPath: "/order/promos/shared-hosting-trial",
    ctaLabel: "Start trial",
    features: [
      "1 website trial setup",
      "Free SSL support",
      "Basic email setup",
      "DNS guidance",
      "Upgrade-ready path",
      "Support included",
    ],
  },

  {
    id: "domain-com",
    name: ".com Domain",
    category: "domains",
    eyebrow: "Global domain",
    description:
      "Best for businesses, startups, personal brands, product websites, and international visibility.",
    pricing: {
      kind: "fixed",
      price: 15000,
      suffix: "/year",
    },
    orderPath: "/order/domain/com",
    ctaLabel: "Register .com",
    features: [
      "Global brand-friendly domain",
      "DNS management support",
      "Works with hosting and email",
      "Good for company websites",
      "Easy upgrade into hosting",
      "Guided setup available",
    ],
  },
  {
    id: "domain-com-ng",
    name: ".com.ng Domain",
    category: "domains",
    badge: "Nigeria",
    eyebrow: "Local business",
    description:
      "A strong option for Nigerian SMEs, local companies, service providers, and trusted local presence.",
    pricing: {
      kind: "fixed",
      price: 0,
      suffix: "/1 year",
    },
    orderPath: "/order/domain/com-ng",
    ctaLabel: "Register .com.ng",
    features: [
      "Nigerian business identity",
      "Great for local trust",
      "DNS setup support",
      "Works with business email",
      "Connect to Octalve hosting",
      "Good for SMEs and founders",
    ],
  },
  {
    id: "domain-ng",
    name: ".ng Domain",
    category: "domains",
    eyebrow: "Premium local",
    description:
      "Shorter Nigerian domain extension for businesses that want a clean, local, and memorable name.",
    pricing: {
      kind: "fixed",
      price: 16500,
      suffix: "/year",
    },
    orderPath: "/order/domain/ng",
    ctaLabel: "Register .ng",
    features: [
      "Short Nigerian extension",
      "Good for brand recall",
      "Local business positioning",
      "DNS support",
      "Hosting-ready setup",
      "Email-ready setup",
    ],
  },

  {
    id: "private-email",
    name: "Private Email",
    category: "email",
    eyebrow: "Professional email",
    description:
      "Create a professional inbox with your domain for better brand trust and communication.",
    pricing: {
      kind: "cycle",
      baseMonthlyPrice: 2500,
      regularMonthlyPrice: 3500,
    },
    orderPath: "/order/email/private-email",
    ctaLabel: "Choose email",
    features: [
      "Professional domain email",
      "Mailbox setup support",
      "Works with your domain",
      "Better business trust",
      "Spam protection guidance",
      "Webmail access",
      "Upgrade-ready for teams",
    ],
  },
  {
    id: "business-email",
    name: "Business Email",
    category: "email",
    popular: true,
    eyebrow: "For growing teams",
    description:
      "A better email setup for companies that need multiple professional addresses and stronger structure.",
    pricing: {
      kind: "cycle",
      baseMonthlyPrice: 6000,
      regularMonthlyPrice: 8500,
    },
    orderPath: "/order/email/business-email",
    ctaLabel: "Choose email",
    features: [
      "Multiple business mailboxes",
      "Domain-based email",
      "Support for teams",
      "Email forwarding guidance",
      "Autoresponder guidance",
      "Spam protection",
      "Professional communication setup",
      "Support included",
    ],
  },
  {
    id: "team-email-suite",
    name: "Team Email Suite",
    category: "email",
    eyebrow: "For departments",
    description:
      "A structured email package for businesses with departments, support addresses, and team communication needs.",
    pricing: {
      kind: "cycle",
      baseMonthlyPrice: 12000,
      regularMonthlyPrice: 16000,
    },
    orderPath: "/order/email/team-email-suite",
    ctaLabel: "Choose suite",
    features: [
      "Team mailbox planning",
      "Support and info emails",
      "Forwarders and routing support",
      "Email setup guidance",
      "Business communication structure",
      "DNS email records guidance",
      "Upgrade-ready for more users",
    ],
  },

  {
    id: "wordpress-launch",
    name: "WordPress Launch",
    category: "wordpress",
    eyebrow: "Starter WordPress",
    description:
      "A WordPress-ready plan for simple business websites, blogs, and landing pages.",
    pricing: {
      kind: "cycle",
      baseMonthlyPrice: 6500,
      regularMonthlyPrice: 9000,
    },
    orderPath: "/order/wordpress/launch",
    ctaLabel: "Choose WordPress",
    features: [
      "WordPress-ready hosting",
      "Free SSL support",
      "1 website",
      "Business email support",
      "Basic setup guidance",
      "Good for blogs and company pages",
      "Upgrade-ready hosting",
    ],
  },
  {
    id: "wordpress-business",
    name: "WordPress Business",
    category: "wordpress",
    popular: true,
    eyebrow: "Business website",
    description:
      "For growing business websites that need stronger hosting resources and guided support.",
    pricing: {
      kind: "cycle",
      baseMonthlyPrice: 12000,
      regularMonthlyPrice: 16000,
    },
    orderPath: "/order/wordpress/business",
    ctaLabel: "Choose WordPress",
    features: [
      "WordPress-ready hosting",
      "Up to 3 websites",
      "Free SSL support",
      "Business email support",
      "Migration support",
      "DNS guidance",
      "Better performance path",
      "Support included",
    ],
  },
  {
    id: "managed-wordpress",
    name: "Managed WordPress",
    category: "wordpress",
    eyebrow: "Managed support",
    description:
      "For businesses that want WordPress hosting with more setup guidance, support, and care.",
    pricing: {
      kind: "cycle",
      baseMonthlyPrice: 25000,
      regularMonthlyPrice: 32000,
    },
    orderPath: "/order/wordpress/managed",
    ctaLabel: "Choose managed",
    features: [
      "Managed WordPress direction",
      "Migration assistance",
      "SSL support",
      "Backup guidance",
      "Performance guidance",
      "Business email support",
      "Support included",
      "Suitable for serious business sites",
    ],
  },

  {
    id: "launch-shared-hosting",
    name: "Launch",
    category: "hosting",
    eyebrow: "Shared Hosting",
    description:
      "For simple portfolio, landing page, and small business websites that need a clean online start.",
    pricing: {
      kind: "cycle",
      baseMonthlyPrice: 4500,
      regularMonthlyPrice: 6500,
    },
    orderPath: "/order/shared-hosting/launch",
    ctaLabel: "Choose plan",
    features: [
      "1 Website",
      "1 GB SSD Storage",
      "10 GB Bandwidth",
      "2 Email Accounts",
      "2 Subdomains",
      "1 MySQL Database",
      "1 FTP Account",
      "Free SSL Certificate",
      "PHP Access",
      "CGI Access",
      "DNS Control",
      "Cron Jobs",
      "Spam Protection",
      "Login Keys",
      "System Info Access",
      "Suspend at Limit Protection",
    ],
  },
  {
    id: "starter-shared-hosting",
    name: "Starter",
    category: "hosting",
    popular: true,
    eyebrow: "Shared Hosting",
    description:
      "Best for business websites, growing brands, and multi-page projects that need more room.",
    pricing: {
      kind: "cycle",
      baseMonthlyPrice: 9500,
      regularMonthlyPrice: 12000,
    },
    orderPath: "/order/shared-hosting/starter",
    ctaLabel: "Choose plan",
    features: [
      "Up to 3 Websites",
      "10 GB SSD Storage",
      "Unlimited Bandwidth",
      "Unlimited Email Accounts",
      "Unlimited Subdomains",
      "10 MySQL Databases",
      "3 FTP Accounts",
      "3 Domain Pointers",
      "Free SSL Certificate",
      "PHP Access",
      "CGI Access",
      "DNS Control",
      "Cron Jobs",
      "Spam Protection",
      "Unlimited Autoresponders",
      "Unlimited Email Forwarders",
      "Priority Setup Guidance",
    ],
  },
  {
    id: "pro-shared-hosting",
    name: "Pro",
    category: "hosting",
    eyebrow: "Shared Hosting",
    description:
      "For stronger business websites that need more storage, more domains, and more database room.",
    pricing: {
      kind: "cycle",
      baseMonthlyPrice: 18000,
      regularMonthlyPrice: 25000,
    },
    orderPath: "/order/shared-hosting/pro",
    ctaLabel: "Choose plan",
    features: [
      "Up to 10 Websites",
      "50 GB SSD Storage",
      "Unlimited Bandwidth",
      "Unlimited Email Accounts",
      "25 MySQL Databases",
      "10 FTP Accounts",
      "10 Domain Pointers",
      "Free SSL Certificate",
      "Cron Jobs",
      "DNS Control",
      "Spam Protection",
      "Priority setup guidance",
      "Business-ready hosting",
    ],
  },
  {
    id: "unlimited-shared-hosting",
    name: "Unlimited",
    category: "hosting",
    eyebrow: "Shared Hosting",
    description:
      "For businesses that need fewer limits, stronger flexibility, and more hosting capacity.",
    pricing: {
      kind: "cycle",
      baseMonthlyPrice: 35000,
      regularMonthlyPrice: 45000,
    },
    orderPath: "/order/shared-hosting/unlimited",
    ctaLabel: "Choose plan",
    features: [
      "Unlimited Websites",
      "Unlimited Disk Space",
      "Unlimited Bandwidth",
      "Unlimited Email Accounts",
      "Unlimited MySQL Databases",
      "Unlimited FTP Accounts",
      "Free SSL Certificate",
      "SSH Access",
      "DNS Control",
      "Cron Jobs",
      "Spam Protection",
      "Best for larger hosting needs",
    ],
  },

  {
    id: "askssl-starter",
    name: "AskSSL Starter",
    category: "security",
    eyebrow: "Basic SSL",
    popular: true,
    description:
      "An entry-level SSL certificate for websites that need quick HTTPS protection, browser trust, and a clean security start.",
    pricing: {
      kind: "fixed",
      price: 7500,
      suffix: "/year",
    },
    orderPath: "/order/security/askssl-starter",
    ctaLabel: "Choose certificate",
    finePrint:
      "Best for simple websites, landing pages, and starter business platforms.",
    features: [
      "Domain Validated Certificate",
      "Warranty up to $10,000",
      "Secures 1 domain",
      "Issuance in about 3 minutes",
      "HTTPS and browser trust",
      "Guided SSL installation support",
    ],
  },
  {
    id: "rapidssl-certificate",
    name: "RapidSSL Certificate",
    category: "security",
    eyebrow: "Fast SSL",
    description:
      "A fast domain-validated SSL option for businesses that need trusted encryption and a quick security setup.",
    pricing: {
      kind: "fixed",
      price: 10240,
      suffix: "/year",
    },
    orderPath: "/order/security/rapidssl-certificate",
    ctaLabel: "Choose certificate",
    finePrint:
      "Suitable for company websites, landing pages, and online business presence.",
    features: [
      "Type: Domain Validated",
      "Secures 1 domain",
      "Issuance in about 3 minutes",
      "Strong browser compatibility",
      "HTTPS encryption and trust",
      "Guided setup support",
    ],
  },
  {
    id: "askssl-wildcard",
    name: "AskSSL Wildcard SSL",
    category: "security",
    eyebrow: "Wildcard SSL",
    description:
      "Protect your main domain and subdomains with one wildcard certificate built for broader website coverage.",
    pricing: {
      kind: "fixed",
      price: 84000,
      suffix: "/year",
    },
    orderPath: "/order/security/askssl-wildcard",
    ctaLabel: "Choose wildcard",
    finePrint:
      "Best for businesses running subdomains, portals, and multi-section web platforms.",
    features: [
      "Domain Validated Warranty up to $10,000",
      "Wildcard SSL for subdomains",
      "Covers main domain and subdomains",
      "Issuance in 3–5 days",
      "Better flexibility for growing platforms",
      "Guided installation support",
    ],
  },
  {
    id: "thawte-server-ssl",
    name: "Thawte Server SSL",
    category: "security",
    eyebrow: "Business SSL",
    description:
      "A stronger business SSL option for websites that need dependable encryption, trust, and broader protection support.",
    pricing: {
      kind: "fixed",
      price: 69428,
      suffix: "/year",
    },
    orderPath: "/order/security/thawte-server-ssl",
    ctaLabel: "Choose certificate",
    finePrint:
      "Good for professional websites, business platforms, and higher-trust online presence.",
    features: [
      "Domain Validated Warranty up to $10,000",
      "Secures 1 primary domain",
      "Secure subdomain support",
      "Business-grade SSL trust",
      "HTTPS encryption and browser trust",
      "Guided setup support",
    ],
  },
  {
    id: "vps-1",
    name: "VPS 1",
    category: "vps",
    eyebrow: "Cloud Server",
    description:
      "Entry VPS power for small applications, business websites, lightweight portals, and projects that need more control than shared hosting.",
    pricing: {
      kind: "cycle",
      baseMonthlyPrice: 10900,
      regularMonthlyPrice: 28900,
      billingAdjustments: {
        "1mo": 0,
        "12mo": 45,
        "24mo": 62,
        "48mo": 65,
      },
    },
    orderPath: "/order/vps/vps-1",
    ctaLabel: "Choose plan",
    features: [
      "1 vCPU core",
      "4 GB RAM",
      "50 GB NVMe disk space",
      "4 TB bandwidth",
      "Dedicated VPS environment",
      "Root/server-level control",
      "Free SSL support",
      "Migration assistance",
      "Weekly backup-ready setup",
      "Firewall setup guidance",
      "Suitable for small apps and websites",
    ],
  },
  {
    id: "vps-2",
    name: "VPS 2",
    category: "vps",
    eyebrow: "Cloud Server",
    popular: true,
    description:
      "Balanced VPS performance for growing websites, business portals, automations, dashboards, and medium-scale applications.",
    pricing: {
      kind: "cycle",
      baseMonthlyPrice: 13900,
      regularMonthlyPrice: 35900,
      billingAdjustments: {
        "1mo": 0,
        "12mo": 42,
        "24mo": 61,
        "48mo": 64,
      },
    },
    orderPath: "/order/vps/vps-2",
    ctaLabel: "Choose plan",
    features: [
      "2 vCPU cores",
      "8 GB RAM",
      "100 GB NVMe disk space",
      "8 TB bandwidth",
      "Dedicated VPS environment",
      "Better performance isolation",
      "Free SSL support",
      "Migration assistance",
      "Weekly backup-ready setup",
      "Firewall setup guidance",
      "Suitable for portals and automations",
      "Recommended for growing businesses",
    ],
  },
  {
    id: "vps-4",
    name: "VPS 4",
    category: "vps",
    eyebrow: "Cloud Server",
    description:
      "Higher-performance VPS capacity for serious business systems, ecommerce workloads, SaaS dashboards, and heavier applications.",
    pricing: {
      kind: "cycle",
      baseMonthlyPrice: 18900,
      regularMonthlyPrice: 59900,
      billingAdjustments: {
        "1mo": 0,
        "12mo": 55,
        "24mo": 68,
        "48mo": 70,
      },
    },
    orderPath: "/order/vps/vps-4",
    ctaLabel: "Choose plan",
    features: [
      "4 vCPU cores",
      "16 GB RAM",
      "200 GB NVMe disk space",
      "16 TB bandwidth",
      "Dedicated VPS environment",
      "High-performance resource control",
      "Free SSL support",
      "Migration assistance",
      "Weekly backup-ready setup",
      "Firewall setup guidance",
      "Suitable for SaaS and ecommerce",
      "Built for heavier workloads",
    ],
  },
  {
    id: "vps-8",
    name: "VPS 8",
    category: "vps",
    eyebrow: "Cloud Server",
    description:
      "Advanced VPS capacity for larger systems, high-traffic platforms, multi-project hosting, and infrastructure-heavy deployments.",
    pricing: {
      kind: "cycle",
      baseMonthlyPrice: 37900,
      regularMonthlyPrice: 105900,
      billingAdjustments: {
        "1mo": 0,
        "12mo": 52,
        "24mo": 64,
        "48mo": 67,
      },
    },
    orderPath: "/order/vps/vps-8",
    ctaLabel: "Choose plan",
    features: [
      "8 vCPU cores",
      "32 GB RAM",
      "400 GB NVMe disk space",
      "32 TB bandwidth",
      "Dedicated VPS environment",
      "Advanced performance capacity",
      "Free SSL support",
      "Migration assistance",
      "Weekly backup-ready setup",
      "Firewall setup guidance",
      "Suitable for larger platforms",
      "Built for high-traffic systems",
    ],
  },
];

export function formatNaira(value: number) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(value);
}

function roundPrice(value: number) {
  return Math.round(value / 100) * 100;
}

export function getBillingCycle(key: BillingCycleKey) {
  return billingCycles.find((cycle) => cycle.key === key) ?? billingCycles[0];
}

export function calculatePlanPricing(
  plan: HomePricePlan,
  billingCycleKey: BillingCycleKey,
): PlanPricingDisplay {
  if (plan.pricing.kind === "fixed") {
    const discountPercent =
      plan.pricing.regularPrice &&
      plan.pricing.regularPrice > plan.pricing.price
        ? Math.round(
            ((plan.pricing.regularPrice - plan.pricing.price) /
              plan.pricing.regularPrice) *
              100,
          )
        : undefined;

    return {
      priceLabel:
        plan.pricing.price === 0 ? "₦0" : formatNaira(plan.pricing.price),
      suffix: plan.pricing.suffix,
      regularPriceLabel: plan.pricing.regularPrice
        ? formatNaira(plan.pricing.regularPrice)
        : undefined,
      discountPercent,
    };
  }

  const cycle = getBillingCycle(billingCycleKey);
  const discountPercent =
    plan.pricing.billingAdjustments?.[cycle.key] ?? cycle.discountPercent;

  const regularMonthly =
    plan.pricing.regularMonthlyPrice ?? plan.pricing.baseMonthlyPrice;

  const regularTotal = regularMonthly * cycle.months;
  const total = roundPrice(
    plan.pricing.baseMonthlyPrice *
      cycle.months *
      ((100 - discountPercent) / 100),
  );

  const monthlyEquivalent = Math.max(0, roundPrice(total / cycle.months));
  const regularMonthlyEquivalent = roundPrice(regularTotal / cycle.months);

  return {
    priceLabel: formatNaira(monthlyEquivalent),
    suffix: "/mo",
    regularPriceLabel:
      regularMonthlyEquivalent > monthlyEquivalent
        ? formatNaira(regularMonthlyEquivalent)
        : undefined,
    totalLabel:
      cycle.months === 1
        ? `Pay ${formatNaira(total)} today.`
        : `Get ${cycle.label} for ${formatNaira(total)}.`,
    renewsLabel: `Renews at ${formatNaira(regularMonthly)}/mo.`,
    discountPercent: discountPercent > 0 ? discountPercent : undefined,
  };
}

export function buildPlanCtaHref(
  plan: HomePricePlan,
  billingCycleKey: BillingCycleKey,
) {
  const base = plan.ctaHref ?? `${cloudLinks.console}${plan.orderPath ?? ""}`;

  if (plan.pricing.kind !== "cycle") {
    return base;
  }

  const separator = base.includes("?") ? "&" : "?";

  return `${base}${separator}cycle=${billingCycleKey}`;
}
