# Octalve Cloud — canonical domain and browser-only release gate
**Decision:** 2026-10-23. **Review-only; do not modify live DNS, certificates or route traffic until signed off.**

## Domain registry
| Surface | Canonical URL | Legacy alias (HTTP navigation redirect when safe) |
|---|---|---|
| Cloud public | https://cloud.octalve.com | https://octalve.cloud |
| Console | https://console.cloud.octalve.com | https://console.octalve.cloud |
| OPanel | https://opanel.cloud.octalve.com | https://opanel.octalve.cloud |
| Django API | https://api.cloud.octalve.com/api | Not a required legacy redirect |

Canonical names are *intended*. The user reports the public cloud.octalve.com website is live; Console/OPanel/API are not yet established or verified by CI. Do not advertise their uptime.

## Release conditions before enabling redirects
- Verify each canonical destination loads over HTTPS, owns valid certificates, and passes a normal browser user journey.
- Only then redirect existing *browser navigation* from old .cloud aliases to new .com names while preserving path and query string. Use a permanent 301/308 only after verifying no cycles, forms, callback URLs or POST actions will break. Do not blindly redirect API/webhook HTTP POST traffic across origins.
- Configure registrar or DNS-provider subdomain records to the **specific project hostnames provided by the deployment provider**, not guessed IPs or blanket wildcards. Preserve MX, TXT, SPF, DKIM, DMARC, and existing Octalve website records.
- Do not transfer the apex octalve.com nameservers merely to add cloud subdomains.
- Maintain canonical SEO metadata on the public site; add URL-specific canonical links when the routes are tested. Preserve existing paths through redirects.
- Old .cloud and new .com names are distinct browser sites. They must not share cookies. Host-only secure, HttpOnly, SameSite cookies; don't use `Domain=.octalve.com` or `Domain=.octalve.cloud`.
- Console → OPanel authentication must use explicitly validated short-lived single-use grants with server authorization checks. Never pass JWTs or credentials as query parameters.
- Exact Django `ALLOWED_HOSTS` should cover *only backend hosts*. CORS/CSRF origins must list exact protected frontend origins, not wildcard subdomains.
- Preview `*.vercel.app` and Render hostnames can remain protected independent of public canonical DNS until reviewed.

## Public site compile-time configuration (optional)
- `NEXT_PUBLIC_CLOUD_PUBLIC_URL=https://cloud.octalve.com`
- `NEXT_PUBLIC_CLOUD_CONSOLE_URL=https://console.cloud.octalve.com`
- `NEXT_PUBLIC_CLOUD_OPANEL_URL=https://opanel.cloud.octalve.com`
- `NEXT_PUBLIC_CLOUD_CHECKOUT_ENABLED=false`
- Registrar query endpoints remain unset until a real verified adapter exists. Published endpoint values are visible to browsers and must contain no secrets.

## Real browser-only acceptance contract
- Existing review test runs on a local HTTP serving of the **built public website**, always starts via `page.goto("/")` and follows visible navigation, controls and links.
- A second **continuous** browser test follows homepage → **Get Started** link → Console **Create account** view → **Login** link → fills known isolated review credentials → submits via the visible **Login** button → workspace.
- Second test requires `OCTALVE_CLOUD_CONSOLE_E2E=true`, `OCTALVE_CLOUD_TEST_EMAIL`, and `OCTALVE_CLOUD_TEST_PASSWORD`. It is explicitly *skipped* until the protected backend + Console are actually deployed and accessible. Credentials are stored only in CI secrets; do not write them in git/chat.
- No Playwright `request`, network request mocking, database editing, token injection, or `goto()` directly to a deep app route.
- Captured screenshots/trace are review evidence; a skipped browser test is never a pass for online integrated service.
- Extend the **same customer journey** across navigation-accessible Console and OPanel workflows only as those applications exist; never fabricate completions.

## Deployment blockers
- Connected Vercel team `Octalve Vault` is on Hobby plan, and its project-creation API returned 403. The linked Cloud/Console projects have not been established via this connection.
- No usable isolated development PostgreSQL instance or deployable host credentials are connected in this chat; do not invent URLs or test results.
- `octalve-core/octalve-opanel` repository did not exist when checked. Create a **private empty repository** first, then scaffold only on review branch once Console→OPanel contract passes.
