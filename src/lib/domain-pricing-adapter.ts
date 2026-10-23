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

const DOMAIN_SEARCH_ENDPOINT = process.env.NEXT_PUBLIC_DOMAIN_SEARCH_API_URL?.trim() ?? "";

const DOMAIN_PRICES_ENDPOINT = process.env.NEXT_PUBLIC_DOMAIN_PRICES_API_URL?.trim() ?? "";

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

export async function getDomainSuggestions(
  request: DomainPricingRequest,
): Promise<DomainSuggestion[]> {
  const cleanQuery = normalizeQuery(request.query);

  if (!cleanQuery) {
    return [];
  }

  if (!DOMAIN_SEARCH_ENDPOINT) {
    return [];
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
      return [];
    }

    const data = (await response.json()) as DomainSearchAdapterResponse;

    if (!data.suggestions?.length) {
      return [];
    }

    return data.suggestions.map((item) => {
      const priceLabel = item.price
        ? formatMoney(item.price.amount, item.price.currency, item.price.period)
        : ("Price unconfirmed");

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
    return [];
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
