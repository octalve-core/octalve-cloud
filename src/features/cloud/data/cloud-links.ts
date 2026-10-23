export const cloudLinks = {
  console: process.env.NEXT_PUBLIC_CLOUD_CONSOLE_URL?.trim() || "https://console.cloud.octalve.com",
  opanel: process.env.NEXT_PUBLIC_CLOUD_OPANEL_URL?.trim() || "https://opanel.cloud.octalve.com",
  domainSearch: "/domains",
  supportEmail: "info@octalve.cloud",
  supportPhone: "+234 807 345 9090",
  whatsapp: "https://wa.me/2348073459090",
};

export const cloudNavLinks = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Domains",
    href: "/domains",
  },
  {
    label: "Hosting",
    href: "/hosting",
  },
  {
    label: "Email",
    href: "/email",
  },
  {
    label: "Security",
    href: "/ssl-security",
  },
  {
    label: "Servers",
    href: "/servers",
  },
  {
    label: "Migration",
    href: "/migration",
  },
  {
    label: "Support",
    href: "/support",
  },
];
