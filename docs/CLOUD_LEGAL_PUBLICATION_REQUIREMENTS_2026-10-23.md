# Octalve Cloud — Terms and Privacy publication brief
**Status: required for owner and legal review; NOT approved legal wording.**
**Date:** 2026-10-23. No public-policy routes are created or advertised by this document.

## Source verification
The public Octalve Cloud repository contains `/tools/privacy-policy-generator` and `/tools/terms-of-service-generator`; those pages help visitors generate *their own* documents. They are NOT Octalve's legal Terms of Service or Privacy Notice. The `/privacy-policy` and `/terms-of-service` company routes are not implemented in the current review source.

The Console signup form points to these exact intended URLs:
- https://cloud.octalve.com/privacy-policy
- https://cloud.octalve.com/terms-of-service

Do not represent those URLs as published until actual HTTP/browser acceptance verifies them. No external/pilot customer should be asked to agree to undisclosed contractual terms.

## Facts to obtain and verify BEFORE writing final legal wording
### Operator identity and contact
- Correct registered operating entity, registration number, physical contact address, support channels, privacy enquiries contact and legal jurisdiction.
- Clarify whether Octalve Cloud is a separate business entity, brand, or an Octalve Limited product.

### Privacy notice
- Real categories of customer/account/technical data collected in each workflow, purposes, lawful grounds, required vs optional fields, log contents and retention.
- Actual infrastructure/processors and regions (e.g., Vercel deployment, Neon US East database), transfers across national borders and applicable Nigerian data protection requirements.
- Cookies and session/JWT technology, third-party payment providers (once enabled), analytics consent, user rights and request process, breach/contact escalation.
- Pilot test accounts and whether test data will be deleted or migrated into commercial production; no promises without implemented deletion/retention workflows.
- Data hosting/processor terms and security responsibilities: do not promise encryption/MFA/uptime/backup practices not yet implemented or verified.

### Terms of Service
- Product scope distinction: company website, developer review, Console test pilot, eventual paid hosting, future OPanel and Mail.
- Eligibility and account authority, acceptable usage, liability, security responsibilities, service limits, data ownership and termination/deletion controls.
- Whether test/pilot services are free, without live payment processing or real hosting provisioning; do NOT describe disabled workflows as available.
- Refunds, billing, cancellation, SLA/uptime and domain-registration ownership once each is actually enabled; do not invent prices, guarantees, policy periods or penalty schedules.
- Governing law, dispute resolution, acceptable use and abuse reporting must be approved by a qualified reviewer.

## Approval checklist
- [ ] Owner confirms operator entity and verifiable contact details.
- [ ] Technical team maps **actual** data flows and vendors from source and deployments.
- [ ] Legal/privacy reviewer approves final wording under applicable rules.
- [ ] Add accessible `/privacy-policy` and `/terms-of-service` routes and link them from website footer and Console signup.
- [ ] Verify actual HTTP/browser responses, readable content, mobile display and no unapproved legal assertions.
- [ ] Persist policy version/date and record consent in authenticated backend for real accounts (not just a client-side checkbox), per reviewed requirements.
- [ ] Do not invite external pilot users before these gates pass.
