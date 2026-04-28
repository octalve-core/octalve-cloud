import { Globe2, HardDrive, Mail, ShieldCheck, Server, ArrowRightLeft } from "lucide-react";

export const cloudServices = [
  {
    title: "Domain Registration",
    description: "Secure the right name for your business, brand, school, NGO or startup.",
    href: "/domains",
    icon: Globe2
  },
  {
    title: "Web Hosting",
    description: "Fast, secure and affordable hosting for websites, landing pages and business platforms.",
    href: "/hosting",
    icon: HardDrive
  },
  {
    title: "Business Email",
    description: "Create professional email addresses that match your domain and brand.",
    href: "/email",
    icon: Mail
  },
  {
    title: "SSL & Security",
    description: "Protect your website, build trust and keep visitors safe with HTTPS and security support.",
    href: "/ssl-security",
    icon: ShieldCheck
  },
  {
    title: "Cloud Servers",
    description: "Infrastructure for growing apps, portals, dashboards and digital products.",
    href: "/servers",
    icon: Server
  },
  {
    title: "Website Migration",
    description: "Move your website, emails and hosting setup to Octalve Cloud with less stress.",
    href: "/migration",
    icon: ArrowRightLeft
  }
] as const;
