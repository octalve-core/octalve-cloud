# Commerce UI handoff — design-first release

Preview: /commerce-preview/ (noindex; not linked from production navigation). No live cart, order, payment or authentication changes. Sample fixture state is intentionally memory-only, with no prices or payment success. Do not use preview fixtures in production.

Components: src/features/cloud/commerce/CommerceUI.tsx and types.ts. CartTrigger, CartDrawer, CartItem, CartReview, CommerceProductCard, CheckoutStepper, CheckoutSummary, CheckoutAccount, CheckoutPayment and OrderConfirmation are presentation components with injected data/actions. CommercePreview.tsx is a design harness only. Reuse or adapt existing PublishedPackageCard and domain result components; do not create competing production cards.

Console integration: inspect existing commerce services and PR #137 before designing one authoritative cart. Supply CartView and CartActions from actual backend snapshots; no fake counts or success, no local storage for account credentials. On successful add open global CartDrawer, mount provider above route transitions, retain current footer. Existing single-item and bundle handoffs remain unchanged until the new end-to-end path is qualified. Use a versioned shared source mechanism or documented synchronized components across repos, not two business logic implementations.

Security: scope credentials, exact origin and route validation, CSRF and ownership, atomic login merge, logout invalidation, price and availability revalidation, idempotency, preserve current payment and provisioning gates. No account form in public preview. No domain reservation claims. All checkout totals and payment state come from server. See Console docs/PUBLIC_WEBSITE_INTEGRATION_PHASE_2.md for existing tools.

Visual QA: mobile and desktop, empty cart, add/remove, close/reopen, focus and Escape, configuration, account, review, disabled payment. Browser testing and real backend integration remain separate qualification gates.

## Domain configuration picker
- `src/features/cloud/commerce/DomainPicker.tsx` replaces the native domain dropdown. Existing cart domains are listed; an injected search adapter powers a compact black domain search interface in the same modal. Desktop centered dialog; mobile bottom sheet, safe-area padding, scrollable results, native focus handling and Escape.
- `CartActions.domainPicker` is optional for compatibility. Supply `search(query, extension, signal)` and `addAndConfigure(lineId, domain)`. The latter is an identifier-only asynchronous operation: atomically add the permitted domain and configure the selected service, then refresh the authoritative cart snapshot. Reject on failure; the picker stays open. Existing selection uses `configure` and may also return a promise.
- Use the existing domain lookup/quote service and cart service. Do not infer production add eligibility solely from availability; set `selectable` only from the qualified cart policy. Unknown/unavailable results cannot be added. Verify ownership, compatibility, publication, prices and registrar eligibility server-side. Avoid duplicate domain lines and preserve existing configuration on rejection.
- Preview adapter `preview-domain-adapter.ts` uses read-only public lookup and memory-only selection. It is not a live cart mutation. The preview retains no payment or account access.

### Compact domain search refinement
The picker now has a single “Find your domain…” search field, without extension chips or introductory helper text. The search adapter still receives an empty extension string for default popular extensions, and exact full domains remain exact. The existing non-reservation notice is displayed only with results. Preserve the same backend contract and mobile sheet.
