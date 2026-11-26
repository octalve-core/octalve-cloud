# Commerce UI handoff — design-first release

Preview: /commerce-preview/ (noindex; not linked from production navigation). No live cart, order, payment or authentication changes. Sample fixture state is intentionally memory-only, with no prices or payment success. Do not use preview fixtures in production.

Components: src/features/cloud/commerce/CommerceUI.tsx and types.ts. CartTrigger, CartDrawer, CartItem, CartReview, CommerceProductCard, CheckoutStepper, CheckoutSummary, CheckoutAccount, CheckoutPayment and OrderConfirmation are presentation components with injected data/actions. CommercePreview.tsx is a design harness only. Reuse or adapt existing PublishedPackageCard and domain result components; do not create competing production cards.

Console integration: inspect existing commerce services and PR #137 before designing one authoritative cart. Supply CartView and CartActions from actual backend snapshots; no fake counts or success, no local storage for account credentials. On successful add open global CartDrawer, mount provider above route transitions, retain current footer. Existing single-item and bundle handoffs remain unchanged until the new end-to-end path is qualified. Use a versioned shared source mechanism or documented synchronized components across repos, not two business logic implementations.

Security: scope credentials, exact origin and route validation, CSRF and ownership, atomic login merge, logout invalidation, price and availability revalidation, idempotency, preserve current payment and provisioning gates. No account form in public preview. No domain reservation claims. All checkout totals and payment state come from server. See Console docs/PUBLIC_WEBSITE_INTEGRATION_PHASE_2.md for existing tools.

Visual QA: mobile and desktop, empty cart, add/remove, close/reopen, focus and Escape, configuration, account, review, disabled payment. Browser testing and real backend integration remain separate qualification gates.
