I applied the Octalve Cloud Tools drop-in update.

Please inspect and verify:

1. The deployment files were not changed:
   - next.config.ts
   - .github/workflows/deploy.yml
   - package.json
   - pnpm-lock.yaml

2. The public tool routes were added:
   - /tools
   - /tools/ai-domain-name-generator
   - /tools/privacy-policy-generator
   - /tools/terms-of-service-generator
   - /tools/domain-name-search
   - /tools/whois-lookup
   - /tools/compare-domain-sellers
   - /tools/malware-scan

3. The CloudHeader now includes a Tools dropdown.

4. Each tool follows the page-folder pattern:
   src/features/cloud/tools/<tool-name>/components/Hero.tsx
   src/features/cloud/tools/<tool-name>/components/ToolPanel.tsx
   src/features/cloud/tools/<tool-name>/components/FAQ.tsx
   src/features/cloud/tools/<tool-name>/page.tsx

5. Do not add `src/app/api` routes in this static-export frontend. The API contract is documented in TOOLS_API_CONTRACT.md and should be implemented in the future console backend.

Run:

pnpm build

Fix only frontend TypeScript/component errors if any appear. Do not modify the GitHub Actions deployment workflow or next.config.ts.
