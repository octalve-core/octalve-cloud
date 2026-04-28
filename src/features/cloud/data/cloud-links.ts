export const cloudLinks = {
  home: "/",
  console: "https://console.octalve.cloud",
  opanel: "https://opanel.octalve.cloud",
  whatsapp: "https://wa.me/2348135750956?text=Hello%20Octalve%20Cloud%2C%20I%20need%20help%20getting%20my%20business%20online.",
  support: "https://console.octalve.cloud",
  domainSearch: "https://console.octalve.cloud"
} as const;

export const cloudNavLinks = [
  { label: "Domains", href: "/domains" },
  { label: "Hosting", href: "/hosting" },
  { label: "Email", href: "/email" },
  { label: "Security", href: "/ssl-security" },
  { label: "Servers", href: "/servers" },
  { label: "Migration", href: "/migration" },
  { label: "Support", href: "/support" }
] as const;
