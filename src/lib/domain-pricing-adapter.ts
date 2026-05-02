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

type DomainAdapterResponse = {
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

/**
 * OCTALVE CLOUD DOMAIN ADAPTER BRIDGE
 *
 * This frontend is exported statically to DirectAdmin.
 * So do not create frontend /api routes here.
 *
 * When the Octalve Cloud backend is ready, expose:
 *
 * POST https://console.octalve.cloud/api/domains/search
 *
 * Request:
 * {
 *   "query": "mybusiness",
 *   "tlds": [".com", ".com.ng", ".cloud"]
 * }
 *
 * Response:
 * {
 *   "suggestions": [
 *     {
 *       "domain": "mybusiness.com",
 *       "tld": ".com",
 *       "available": true,
 *       "price": { "amount": 15000, "currency": "NGN", "period": "year" },
 *       "renewalPrice": { "amount": 18000, "currency": "NGN", "period": "year" },
 *       "orderUrl": "https://console.octalve.cloud/order/domain?domain=mybusiness.com"
 *     }
 *   ]
 * }
 *
 * Later, only update DOMAIN_ADAPTER_ENDPOINT below.
 */
const DOMAIN_ADAPTER_ENDPOINT = "";

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
    const base = query.endsWith(tld) ? query.replace(tld, "") : query;
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

  if (!DOMAIN_ADAPTER_ENDPOINT) {
    return fallbackSuggestions({ ...request, query: cleanQuery });
  }

  try {
    const response = await fetch(DOMAIN_ADAPTER_ENDPOINT, {
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

    const data = (await response.json()) as DomainAdapterResponse;

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
