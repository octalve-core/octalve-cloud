import Link from "next/link";
import {
  ArrowRight,
  CloudCog,
  DatabaseBackup,
  Globe2,
  LifeBuoy,
  Mail,
  ServerCog,
  ShieldCheck,
  UploadCloud,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type ServiceItem = {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  tag: string;
};

/**
 * HOW TO EDIT / ADD MORE SERVICES:
 *
 * 1. To edit a service:
 *    Change the title, description, href, tag, or icon below.
 *
 * 2. To add a new service:
 *    Copy one object, paste it below the last one, then update the content.
 *
 * 3. To change where a card links to:
 *    Edit the href value.
 *
 * Example:
 * {
 *   title: "New Service",
 *   description: "Short explanation of the service.",
 *   href: "/new-service",
 *   icon: CloudCog,
 *   tag: "New",
 * }
 */
const services: ServiceItem[] = [
  {
    title: "Domain Registration",
    description:
      "Search, register, and secure the perfect domain name for your business, brand, school, NGO, or startup.",
    href: "/domains",
    icon: Globe2,
    tag: "Domains",
  },
  {
    title: "Shared Web Hosting",
    description:
      "Host your website on reliable shared hosting built for business websites, portfolios, landing pages, and blogs.",
    href: "/hosting",
    icon: CloudCog,
    tag: "Hosting",
  },
  {
    title: "Business Email",
    description:
      "Create professional email accounts with your domain, such as info@yourbusiness.com, and communicate with trust.",
    href: "/email",
    icon: Mail,
    tag: "Email",
  },
  {
    title: "SSL & Website Security",
    description:
      "Protect your website with SSL support, safer browsing, and security guidance that helps your visitors trust your site.",
    href: "/ssl-security",
    icon: ShieldCheck,
    tag: "Security",
  },
  {
    title: "VPS & Cloud Servers",
    description:
      "Get more power, control, and scalability for growing websites, apps, portals, and business platforms.",
    href: "/servers",
    icon: ServerCog,
    tag: "Servers",
  },
  {
    title: "Website Migration",
    description:
      "Move your website, domain, email, and DNS setup from another provider to Octalve Cloud with guided support.",
    href: "/migration",
    icon: UploadCloud,
    tag: "Migration",
  },
  {
    title: "Backups & Reliability",
    description:
      "Prepare your website for safer growth with backup guidance, recovery planning, and better hosting reliability.",
    href: "/support",
    icon: DatabaseBackup,
    tag: "Backup",
  },
  {
    title: "Guided Cloud Support",
    description:
      "Get human-friendly support for choosing the right package, setting up hosting, connecting domains, and going live.",
    href: "/support",
    icon: LifeBuoy,
    tag: "Support",
  },
];

export function Services() {
  return (
    <section className="bg-[#F8FAFC] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cloud-blue">
            Cloud Services
          </p>

          <h2 className="mt-4 text-3xl font-medium tracking-[-0.045em] text-slate-950 sm:text-4xl lg:text-5xl">
            One platform for the{" "}
            <span className="text-cloud-blue">
              online tools your business needs.
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-500 sm:text-lg">
            From domain registration to hosting, email, SSL, servers, and
            migration support — Octalve Cloud gives your business the foundation
            to launch and grow online.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <Link
                key={service.title}
                href={service.href}
                className={[
                  "group relative flex min-h-[230px] flex-col overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-[0_16px_45px_rgba(15,23,42,0.045)] transition duration-300",
                  "hover:-translate-y-1 hover:border-cloud-blue/30 hover:shadow-[0_24px_70px_rgba(0,100,224,0.10)]",
                  index === 0 ? "lg:col-span-1" : "",
                ].join(" ")}
              >
                <div
                  className="pointer-events-none absolute -right-16 -top-16 h-36 w-36 rounded-full bg-cloud-blue/5 transition duration-300 group-hover:bg-cloud-blue/10"
                  aria-hidden="true"
                />

                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cloud-blue/10 text-cloud-blue ring-1 ring-cloud-blue/10 transition group-hover:bg-cloud-blue group-hover:text-white">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>

                  <span className="rounded-full bg-slate-50 px-3 py-1 text-xs font-medium text-slate-500 ring-1 ring-slate-200">
                    {service.tag}
                  </span>
                </div>

                <div className="mt-7 flex flex-1 flex-col">
                  <h3 className="text-xl font-semibold tracking-[-0.025em] text-slate-950">
                    {service.title}
                  </h3>

                  <p className="mt-3 flex-1 text-sm leading-7 text-slate-500 sm:text-[15px]">
                    {service.description}
                  </p>

                  <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-cloud-blue">
                    Learn more
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
