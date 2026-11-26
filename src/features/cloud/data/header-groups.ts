import { cloudLinks } from "./cloud-links";

export type HeaderGroup = {
  id: string;
  label: string;
  links: readonly { label: string; href: string }[];
};

// Canonical public routes only; account destinations are existing public URLs.
export const headerGroups: readonly HeaderGroup[] = [
  { id: "hosting", label: "Hosting", links: [
    { label: "Web & WordPress Hosting", href: "/hosting" },
    { label: "Website Migration", href: "/migration" },
    { label: "SSL & Website Security", href: "/ssl-security" },
  ] },
  { id: "domains", label: "Domain", links: [
    { label: "Domain Registration & Transfer", href: "/domains" },
    { label: "Domain Name Search", href: "/tools/domain-name-search" },
    { label: "WHOIS Lookup", href: "/tools/whois-lookup" },
    { label: "Domain Pricing", href: "/domains/pricing/" },
  ] },
  { id: "servers", label: "Servers", links: [
    { label: "VPS & Cloud Servers", href: "/servers" },
  ] },
  { id: "email", label: "Emails", links: [
    { label: "Business Email", href: "/email" },
  ] },
  { id: "resources", label: "Resources", links: [
    { label: "Free Cloud Tools", href: "/tools" },
    { label: "Knowledge Base", href: "/knowledge-base" },
    { label: "Cloud Guides", href: "/guides/" },
    { label: "Find a Cloud Solution", href: "/assistant/" },
    { label: "About Octalve Cloud", href: "/about/" },
    { label: "Trust & Security", href: "/trust/" },
    { label: "Service Status", href: "/status/" },
    { label: "Help & Support", href: "/support" },
    { label: "Contact Sales", href: "/contact" },
    { label: "Hosting Panel", href: cloudLinks.opanel },
  ] },
];
