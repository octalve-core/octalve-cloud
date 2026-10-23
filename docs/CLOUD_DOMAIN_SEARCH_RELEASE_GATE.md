# Octalve Cloud — domain search and checkout truthfulness gate
Date: 2026-10-23. Review change only.

## Current state
The static-export site had fake domain availability generated from a suggestion's list index. `DOMAIN_SEARCH_ENDPOINT` and `DOMAIN_PRICES_ENDPOINT` were empty. It also linked to Console checkout routes not verified to work. Do not represent these results as actual registrar availability.

## Review changes
- Domain suggestions are now **empty rather than invented** until a verified domain-search adapter is configured.
- Empty-results copy tells visitors live verification is not connected, rather than calling unverified domains available/taken.
- Optional public environment values: `NEXT_PUBLIC_DOMAIN_SEARCH_API_URL` and `NEXT_PUBLIC_DOMAIN_PRICES_API_URL`. Publishing URLs is not sufficient: contract and CORS verification remain required.
- Unless `NEXT_PUBLIC_CLOUD_CHECKOUT_ENABLED=true` is explicitly configured **after full acceptance**, product CTAs route to a contact enquiry, not a nonfunctional order/payment endpoint.
- Historical local plan/package prices may still be presented as indicative marketing material; do not claim any price is guaranteed without an authoritative checkout backend.

## API contract before enabling
1. Hosted Django service validates domain label/TLD, rate-limits by IP/account, handles IDN/punycode safely and prevents registrar API abuse.
2. Authenticated server-side registrar adapter checks availability in real time through an authorized registrar API (not WHOIS heuristics).
3. API returns `suggestions[]` including domain, TLD, verified availability, prices (amount, currency, period), optional renewal price and a real authorized order URL.
4. Browser calls only the approved public search URL, with exact CORS origins; registrar credential stays on the Django backend.
5. Reconfirm domain availability and final amount at checkout before payment or reservation.
6. Run tests: registered domain, available domain, unsupported TLD, IDN, registrar timeout, stale quote, price mismatch, blocked abuse, duplicate registration. Review actual API response schema against frontend adapter.
7. Do not turn checkout flag on until order, invoice, sandbox settlement and provisioning gates pass.

This branch does not claim live registrar API integration.
