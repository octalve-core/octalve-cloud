# Octalve Cloud

This is the first deployable phase of the Octalve Cloud public website.

## What is included

- Next.js App Router setup
- TypeScript
- TailwindCSS
- Octalve Cloud color tokens
- Responsive header
- Hero landing page
- Domain search UI placeholder
- Services preview section
- Footer
- Basic route placeholders for future pages
- External links prepared for:
  - `https://console.octalve.cloud`
  - `https://opanel.octalve.cloud`

## Run locally

```bash
pnpm install
pnpm dev
```

Open:

```bash
http://localhost:3000
```

## Build

```bash
pnpm build
```

## Push to GitHub

```bash
git init
git add .
git commit -m "Initial Octalve Cloud frontend phase 1"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/octalve-cloud-frontend.git
git push -u origin main
```

## Suggested next phase

1. Replace placeholder pages with complete pages.
2. Add hosting pricing cards.
3. Connect domain search to the actual Paymenter domain search route.
4. Add WhatsApp/contact flow.
5. Add SEO images and structured data.
