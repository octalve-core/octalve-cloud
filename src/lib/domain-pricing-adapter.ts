import type { DomainPackage } from "@/features/cloud/data/domain-price";

export type DomainPricingRequest = {
  query: string;
  tlds: string[];
};

export type DomainSuggestion = {
  domain: string;
  tld: string;
  available: boolean;
  priceLabel: string;
  renewalLabel?: string;
  orderUrl: string;
};

type DomainSearchAdapterResponse = {
  suggestions?: {
    domain: string;
    tld: string;
    available: boolean;
    price?: {
      amount: number;
      currency: "NGN" | "USD";
      period?: string;
    };
    renewalPrice?: {
      amount: number;
      currency: "NGN" | "USD";
      period?: string;
    };
    orderUrl?: string;
  }[];
};

type LiveDomainPriceItem = {
  id?: string;
  tld: string;
  title?: string;
  description?: string;
  category?: DomainPackage["category"];
  oldPrice?: number;
  currentPrice?: number;
  registrationPrice?: number;
  renewalPrice?: number;
  billingLabel?: string;
  badge?: string;
  ctaLabel?: string;
  ctaHref?: string;
  accent?: DomainPackage["accent"];
};

type LiveDomainPricesResponse = {
  packages?: LiveDomainPriceItem[];
};

/**
 * OCTALVE CLOUD DOMAIN ADAPTER BRIDGE
 * -----------------------------------
 *
 * This public frontend is exported statically to DirectAdmin.
 * Do not create frontend /api routes here.
 *
 * This single adapter file serves:
 *
 * 1. Domain search suggestions:
 *    POST https://console.octalve.cloud/api/domains/search
 *
 * 2. Domain package pricing:
 *    GET https://console.octalve.cloud/api/domains/prices
 *
 * Later, when the backend is ready, update only these two constants.
 */

const DOMAIN_SEARCH_ENDPOINT = "";

const DOMAIN_PRICES_ENDPOINT = "";

const FALLBACK_PRICES: Record<string, string> = {
  ".com": "₦15,000/Year",
  ".net": "₦30,986/Year",
  ".cloud": "₦22,500/Year",
  ".ai": "₦95,000/Year",
  ".shop": "₦19,800/Year",
  ".org": "₦28,934/Year",
  ".co": "₦34,500/Year",
  ".africa": "₦60,170/Year",
  ".com.ng": "₦Free/1 Year",
  ".ng": "₦16,500/Year",
};

function formatMoney(amount: number, currency: "NGN" | "USD", period = "year") {
  const formatted = new Intl.NumberFormat(
    currency === "NGN" ? "en-NG" : "en-US",
    {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    },
  ).format(amount);

  return `${formatted}/${period}`;
}

function buildFallbackOrderUrl(domain: string) {
  return `https://console.octalve.cloud/order/domain?domain=${encodeURIComponent(
    domain,
  )}`;
}

function normalizeQuery(query: string) {
  return query
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .replace(/\/.*$/, "")
    .replace(/\s+/g, "")
    .replace(/[^a-z0-9.-]/g, "");
}

function fallbackSuggestions(
  request: DomainPricingRequest,
): DomainSuggestion[] {
  const query = normalizeQuery(request.query || "yourbrand");

  return request.tlds.map((tld, index) => {
    const base = query.endsWith(tld)
      ? query.slice(0, query.length - tld.length)
      : query;

    const domain = `${base}${tld}`;

    return {
      domain,
      tld,
      available: index !== 2,
      priceLabel: FALLBACK_PRICES[tld] ?? "Check price",
      renewalLabel: "Live pricing soon",
      orderUrl: buildFallbackOrderUrl(domain),
    };
  });
}

export async function getDomainSuggestions(
  request: DomainPricingRequest,
): Promise<DomainSuggestion[]> {
  const cleanQuery = normalizeQuery(request.query);

  if (!cleanQuery) {
    return fallbackSuggestions({ ...request, query: "yourbrand" });
  }

  if (!DOMAIN_SEARCH_ENDPOINT) {
    return fallbackSuggestions({ ...request, query: cleanQuery });
  }

  try {
    const response = await fetch(DOMAIN_SEARCH_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: cleanQuery,
        tlds: request.tlds,
      }),
    });

    if (!response.ok) {
      return fallbackSuggestions({ ...request, query: cleanQuery });
    }

    const data = (await response.json()) as DomainSearchAdapterResponse;

    if (!data.suggestions?.length) {
      return fallbackSuggestions({ ...request, query: cleanQuery });
    }

    return data.suggestions.map((item) => {
      const priceLabel = item.price
        ? formatMoney(item.price.amount, item.price.currency, item.price.period)
        : (FALLBACK_PRICES[item.tld] ?? "Check price");

      const renewalLabel = item.renewalPrice
        ? `Renews ${formatMoney(
            item.renewalPrice.amount,
            item.renewalPrice.currency,
            item.renewalPrice.period,
          )}`
        : undefined;

      return {
        domain: item.domain,
        tld: item.tld,
        available: item.available,
        priceLabel,
        renewalLabel,
        orderUrl: item.orderUrl ?? buildFallbackOrderUrl(item.domain),
      };
    });
  } catch {
    return fallbackSuggestions({ ...request, query: cleanQuery });
  }
}

function mergeLiveDomainPrices(
  fallbackPackages: DomainPackage[],
  liveItems: LiveDomainPriceItem[],
): DomainPackage[] {
  const liveByTld = new Map(liveItems.map((item) => [item.tld, item]));

  return fallbackPackages.map((fallback) => {
    const live = liveByTld.get(fallback.tld);

    if (!live) {
      return fallback;
    }

    return {
      ...fallback,
      ...live,
      id: live.id ?? fallback.id,
      title: live.title ?? fallback.title,
      description: live.description ?? fallback.description,
      category: live.category ?? fallback.category,
      currentPrice:
        live.currentPrice ?? live.registrationPrice ?? fallback.currentPrice,
      oldPrice: live.oldPrice ?? fallback.oldPrice,
      renewalPrice: live.renewalPrice ?? fallback.renewalPrice,
      billingLabel: live.billingLabel ?? fallback.billingLabel,
      badge: live.badge ?? fallback.badge,
      ctaLabel: live.ctaLabel ?? fallback.ctaLabel,
      ctaHref: live.ctaHref ?? fallback.ctaHref,
      accent: live.accent ?? fallback.accent,
    };
  });
}

export async function getLiveDomainPackages(
  fallbackPackages: DomainPackage[],
): Promise<DomainPackage[]> {
  if (!DOMAIN_PRICES_ENDPOINT) {
    return fallbackPackages;
  }

  try {
    const response = await fetch(DOMAIN_PRICES_ENDPOINT, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      return fallbackPackages;
    }

    const data = (await response.json()) as LiveDomainPricesResponse;

    if (!data.packages?.length) {
      return fallbackPackages;
    }

    return mergeLiveDomainPrices(fallbackPackages, data.packages);
  } catch {
    return fallbackPackages;
  }
}
