import {
  BookOpen,
  Bug,
  Cloud,
  DatabaseBackup,
  FileText,
  Globe2,
  HardDrive,
  Headphones,
  LayoutTemplate,
  LifeBuoy,
  Mail,
  MessageCircle,
  RefreshCw,
  Scale,
  Search,
  Server,
  Settings2,
  ShieldCheck,
  Sparkles,
  User,
} from "lucide-react";
import { cloudLinks } from "@/features/cloud/data/cloud-links";
import type {
  AccountAccessLink,
  HeaderNavigationItem,
  MegaMenuDefinition,
  MegaMenuId,
} from "@/features/cloud/types/navigation";

const productsMenu: MegaMenuDefinition = {
  id: "products",
  label: "Products",
  eyebrow: "Octalve Cloud products",
  description:
    "Choose the infrastructure, identity, communication, and support your business needs to launch and grow online.",
  categories: [
    {
      id: "website-hosting",
      label: "Website & Hosting",
      description: "Launch, manage, and scale modern websites.",
      icon: HardDrive,
      links: [
        {
          id: "shared-hosting",
          label: "Shared Web Hosting",
          href: "/hosting",
          description:
            "Reliable hosting for business websites, portfolios, blogs, and landing pages.",
          icon: HardDrive,
          badge: { label: "Popular", tone: "popular" },
        },
        {
          id: "wordpress-hosting",
          label: "WordPress Hosting",
          href: "/hosting",
          description:
            "WordPress-ready hosting for company websites, blogs, and online stores.",
          icon: LayoutTemplate,
        },
        {
          id: "vps-cloud-servers",
          label: "VPS & Cloud Servers",
          href: "/servers",
          description:
            "More control, dedicated resources, and room for serious applications.",
          icon: Server,
        },
        {
          id: "backup-reliability",
          label: "Backups & Reliability",
          href: "/support",
          description:
            "Get guidance on backup planning, recovery, and dependable hosting operations.",
          icon: DatabaseBackup,
        },
      ],
    },
    {
      id: "domains-identity",
      label: "Domains & Identity",
      description: "Build a professional and memorable online identity.",
      icon: Globe2,
      links: [
        {
          id: "domain-registration",
          label: "Domain Registration",
          href: "/domains",
          description:
            "Search, register, transfer, and manage the domain behind your brand.",
          icon: Globe2,
        },
        {
          id: "domain-name-search",
          label: "Domain Name Search",
          href: "/tools/domain-name-search",
          description:
            "Check domain availability and continue to registration when ready.",
          icon: Search,
        },
        {
          id: "whois-lookup",
          label: "WHOIS Lookup",
          href: "/tools/whois-lookup",
          description:
            "Review public registration details and domain record information.",
          icon: BookOpen,
        },
        {
          id: "compare-domain-sellers",
          label: "Compare Domain Sellers",
          href: "/tools/compare-domain-sellers",
          description:
            "Compare provider options before choosing where to register.",
          icon: Scale,
        },
      ],
    },
    {
      id: "email-collaboration",
      label: "Email & Collaboration",
      description: "Communicate professionally using your own domain.",
      icon: Mail,
      links: [
        {
          id: "business-email",
          label: "Business Email",
          href: "/email",
          description:
            "Create professional mailboxes such as hello@yourbusiness.com.",
          icon: Mail,
          badge: { label: "New", tone: "new" },
        },
        {
          id: "email-setup-support",
          label: "Email Setup Support",
          href: "/support",
          description:
            "Get help with mailbox creation, DNS records, and email-app setup.",
          icon: Settings2,
        },
        {
          id: "email-migration",
          label: "Email Migration",
          href: "/migration",
          description:
            "Plan a safer move from your existing email provider with guided support.",
          icon: RefreshCw,
        },
        {
          id: "guided-cloud-support",
          label: "Guided Cloud Support",
          href: "/support",
          description:
            "Get clear human support when your team needs help choosing or configuring services.",
          icon: Headphones,
        },
      ],
    },
    {
      id: "cloud-security",
      label: "Cloud & Security",
      description: "Protect websites and deploy stronger infrastructure.",
      icon: ShieldCheck,
      links: [
        {
          id: "cloud-servers",
          label: "Cloud Servers",
          href: "/servers",
          description:
            "Deploy websites, APIs, dashboards, and applications on scalable VPS infrastructure.",
          icon: Cloud,
        },
        {
          id: "ssl-website-security",
          label: "SSL & Website Security",
          href: "/ssl-security",
          description:
            "Protect visitor connections, improve browser trust, and use HTTPS.",
          icon: ShieldCheck,
          badge: { label: "Secure", tone: "secure" },
        },
        {
          id: "malware-hack-check",
          label: "Malware & Hack Checker",
          href: "/tools/malware-scan",
          description:
            "Prepare a website-security check for suspicious redirects and malware signals.",
          icon: Bug,
        },
        {
          id: "security-guidance",
          label: "Security Guidance",
          href: "/support",
          description:
            "Get practical direction for safer DNS, SSL, access, and hosting configuration.",
          icon: LifeBuoy,
        },
      ],
    },
    {
      id: "transfer-support",
      label: "Transfer & Support",
      description: "Move existing services and get help at every stage.",
      icon: RefreshCw,
      links: [
        {
          id: "website-migration",
          label: "Website Migration",
          href: "/migration",
          description:
            "Plan and move website files, databases, DNS, SSL, and related services.",
          icon: RefreshCw,
        },
        {
          id: "support-center",
          label: "Help Center",
          href: "/support",
          description:
            "Find the right support path for domains, hosting, email, and servers.",
          icon: BookOpen,
        },
        {
          id: "contact-sales",
          label: "Contact Sales",
          href: "/contact",
          description:
            "Talk to Octalve Cloud before choosing a package or migration path.",
          icon: MessageCircle,
        },
        {
          id: "client-console-support",
          label: "Client Console",
          href: cloudLinks.console,
          description:
            "Access billing, orders, services, and customer support.",
          icon: User,
          external: true,
        },
      ],
    },
  ],
  featured: {
    eyebrow: "Move with confidence",
    title: "Bring your website to Octalve Cloud.",
    description:
      "Start with a migration review so we can understand your website, email, domain, DNS, and current hosting setup.",
    href: "/migration",
    ctaLabel: "Start migration",
    icon: RefreshCw,
  },
};

const resourcesMenu: MegaMenuDefinition = {
  id: "resources",
  label: "Resources",
  eyebrow: "Tools, access, and support",
  description:
    "Use practical tools, reach the right support channel, or continue inside your Octalve Cloud account.",
  categories: [
    {
      id: "help-access",
      label: "Help & Support",
      description: "Reach Octalve Cloud through the right channel.",
      icon: LifeBuoy,
      links: [
        {
          id: "help-center",
          label: "Help Center",
          href: "/support",
          description:
            "Get direction for domains, hosting, email, security, and servers.",
          icon: BookOpen,
        },
        {
          id: "sales-contact",
          label: "Contact Sales",
          href: "/contact",
          description:
            "Discuss a new order, package, migration, or cloud requirement.",
          icon: MessageCircle,
        },
        {
          id: "whatsapp-support",
          label: "WhatsApp Support",
          href: cloudLinks.whatsapp,
          description:
            "Continue a support or sales conversation through WhatsApp.",
          icon: MessageCircle,
          external: true,
        },
        {
          id: "email-support",
          label: "Email Support",
          href: `mailto:${cloudLinks.supportEmail}`,
          description:
            "Send a detailed enquiry to the Octalve Cloud support team.",
          icon: Mail,
          external: true,
        },
      ],
    },
    {
      id: "domain-tools",
      label: "Domain Tools",
      description: "Research, generate, and compare domain options.",
      icon: Globe2,
      links: [
        {
          id: "ai-domain-generator",
          label: "AI Domain Name Generator",
          href: "/tools/ai-domain-name-generator",
          description:
            "Generate brandable domain ideas for a company, product, or campaign.",
          icon: Sparkles,
          badge: { label: "AI", tone: "ai" },
        },
        {
          id: "resource-domain-search",
          label: "Domain Name Search",
          href: "/tools/domain-name-search",
          description:
            "Check domain availability and proceed toward registration.",
          icon: Search,
        },
        {
          id: "resource-whois",
          label: "WHOIS Lookup",
          href: "/tools/whois-lookup",
          description:
            "Review public domain-registration and record information.",
          icon: BookOpen,
        },
        {
          id: "resource-compare",
          label: "Compare Domain Sellers",
          href: "/tools/compare-domain-sellers",
          description:
            "Compare provider options and understand important differences.",
          icon: Scale,
        },
      ],
    },
    {
      id: "business-tools",
      label: "Business Tools",
      description: "Prepare essential website and business materials.",
      icon: FileText,
      links: [
        {
          id: "privacy-generator",
          label: "Privacy Policy Generator",
          href: "/tools/privacy-policy-generator",
          description:
            "Prepare a basic privacy-policy draft for your website.",
          icon: FileText,
          badge: { label: "Free", tone: "free" },
        },
        {
          id: "terms-generator",
          label: "Terms of Service Generator",
          href: "/tools/terms-of-service-generator",
          description:
            "Prepare basic terms for website accounts, orders, and usage.",
          icon: FileText,
        },
        {
          id: "resource-malware",
          label: "Malware & Hack Checker",
          href: "/tools/malware-scan",
          description:
            "Prepare a security check for malware and suspicious website behaviour.",
          icon: Bug,
        },
        {
          id: "all-tools",
          label: "View All Tools",
          href: "/tools",
          description:
            "Browse every public Octalve Cloud tool in one place.",
          icon: Sparkles,
        },
      ],
    },
    {
      id: "account-access",
      label: "Account Access",
      description: "Open the right platform for account or hosting work.",
      icon: User,
      links: [
        {
          id: "resource-console",
          label: "Client Console",
          href: cloudLinks.console,
          description:
            "Manage billing, orders, services, and support activity.",
          icon: User,
          external: true,
        },
        {
          id: "resource-opanel",
          label: "Hosting Panel",
          href: cloudLinks.opanel,
          description:
            "Manage files, email, SSL, databases, and hosting tools.",
          icon: HardDrive,
          external: true,
        },
        {
          id: "resource-contact",
          label: "Account Support",
          href: "/support",
          description:
            "Get help when you cannot access or manage a service.",
          icon: Headphones,
        },
        {
          id: "resource-settings-help",
          label: "Setup Guidance",
          href: "/support",
          description:
            "Get guided help connecting domains, DNS, email, SSL, and hosting.",
          icon: Settings2,
        },
      ],
    },
  ],
  featured: {
    eyebrow: "Start with clarity",
    title: "Not sure which service you need?",
    description:
      "Tell us what you are building and we will guide you toward the right domain, hosting, email, security, or server path.",
    href: "/contact",
    ctaLabel: "Talk to sales",
    icon: Headphones,
  },
};

export const megaMenus = {
  products: productsMenu,
  resources: resourcesMenu,
} as const satisfies Record<MegaMenuId, MegaMenuDefinition>;

export const desktopNavigation = [
  {
    kind: "mega",
    id: "products",
    label: "Products",
  },
  {
    kind: "link",
    id: "domains",
    label: "Domains",
    href: "/domains",
  },
  {
    kind: "link",
    id: "hosting",
    label: "Hosting",
    href: "/hosting",
  },
  {
    kind: "link",
    id: "business-email",
    label: "Business Email",
    href: "/email",
  },
  {
    kind: "link",
    id: "pricing",
    label: "Pricing",
    href: "/hosting",
  },
  {
    kind: "mega",
    id: "resources",
    label: "Resources",
  },
] as const satisfies readonly HeaderNavigationItem[];

export const accountAccessLinks: readonly AccountAccessLink[] = [
  {
    id: "client-console",
    label: "Client Console",
    description: "Billing, orders, services, and support.",
    href: cloudLinks.console,
    icon: User,
  },
  {
    id: "hosting-panel",
    label: "Hosting Panel",
    description: "Files, email, SSL, databases, and hosting tools.",
    href: cloudLinks.opanel,
    icon: HardDrive,
  },
];
