# Octalve Cloud browser-only acceptance walkthrough

The one continuous Playwright journey begins at the site homepage and then
follows only visible links and buttons. No direct navigation to internal routes,
database setup, programmatic API requests, network interception, or faked service
responses are allowed as acceptance evidence.

## Customer route
1. Visit public home page in desktop viewport.
2. Click visible **Domains** navigation.
3. Type a domain name into the public search box and click **Search Domain**.
4. Confirm the interface *does not claim* availability without a registrar API.
5. Click visible **Hosting** navigation.
6. Click visible **Choose plan**, confirm the route goes to a public enquiry rather
   than a nonfunctional or unsafe checkout.
7. Resize to mobile and use the visible mobile menu to inspect navigation.
8. Save full-page screenshots and the Playwright trace for approval.

## How it runs
GitHub Actions builds the actual Next.js static-export output `out/`, serves
it over HTTP locally, then drives an actual Chromium browser using Playwright.
This is not a visual mock-up or API test, but a browser journey through real
rendered pages. Screenshots and trace are uploaded as CI artifacts.

## Unfinished continuity
Console registration, authenticated user journeys, real order and invoice
checkout, OPanel and service lifecycle are not in the public static site.
The continuous cross-application journey cannot pass until Console and Django
preview deployments exist and link to one another. Do not invent progress.
The next review phase extends the same browser-first methodology from the
Cloud homepage into the Console sign-in/sign-up flows by clicking actual links.
