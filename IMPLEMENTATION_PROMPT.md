# Octalve Cloud Remodel Drop-in Update

This zip remodels `octalve-cloud` to follow the same page/component pattern used in `octalve-holding` model pages.

It does **not** include or modify:

- `next.config.ts`
- `.github/workflows/deploy.yml`
- `.gitignore`
- `package.json`
- deployment secrets
- DirectAdmin/VPS deployment configuration

## Goal

Each public page now owns its own components and content:

```txt
Home
├── Hero
├── Overview
├── Services
├── Packages
├── DomainSearch
├── WhyOctalveCloud
├── Migration
├── FAQ
└── CTA
```

The same pattern is applied to:

- `/`
- `/domains`
- `/hosting`
- `/email`
- `/ssl-security`
- `/servers`
- `/migration`
- `/support`
- `/contact`

## Shared Components

Only global layout and repeated UI stay shared:

```txt
src/features/cloud/components/
├── CloudHeader.tsx
├── CloudFooter.tsx
├── CloudLogo.tsx
├── CloudButton.tsx
├── CloudShell.tsx
└── GetStarted.tsx
```

## Page Content Rule

No central content data file is used for page sections. Each page component owns its own demo content inside the component file.

The only shared config is:

```txt
src/features/cloud/data/cloud-links.ts
```

because console/opanel/contact URLs are system-level links.

## How to apply

1. Extract the zip into the root of `octalve-cloud`.
2. Allow files to overwrite when asked.
3. Do not delete `next.config.ts` or `.github/workflows/deploy.yml`.
4. Run:

```bash
pnpm build
```

5. If build succeeds:

```bash
git add .
git commit -m "Remodel Octalve Cloud public website architecture"
git push origin main
```

GitHub Actions will deploy using the existing SSH workflow.
