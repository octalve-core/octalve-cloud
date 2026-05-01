import Link from "next/link";
import { cloudLinks } from "@/features/cloud/data/cloud-links";
import { CloudLogo } from "@/features/cloud/components/CloudLogo";

const footerLinks = [
  { label: "Domains", href: "/domains" },
  { label: "Hosting", href: "/hosting" },
  { label: "Business Email", href: "/email" },
  { label: "SSL / Security", href: "/ssl-security" },
  { label: "Servers", href: "/servers" },
  { label: "Migration", href: "/migration" },
];

export function CloudFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.1fr_0.9fr_0.8fr] lg:px-8">
        <div>
          <CloudLogo />
          <p className="mt-5 max-w-md text-sm leading-7 text-slate-500">
            Octalve Cloud helps businesses register domains, host websites,
            secure infrastructure, launch business email and move online with
            guided support.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-slate-950">Cloud Services</h3>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {footerLinks.map((item) => (
              <Link key={item.href} href={item.href} className="text-sm text-slate-500 hover:text-cloud-blue">
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-slate-950">Access</h3>
          <div className="mt-4 space-y-3 text-sm">
            <a href={cloudLinks.console} target="_blank" rel="noreferrer" className="block text-slate-500 hover:text-cloud-blue">
              Client Console
            </a>
            <a href={cloudLinks.opanel} target="_blank" rel="noreferrer" className="block text-slate-500 hover:text-cloud-blue">
              Hosting Panel
            </a>
            <Link href="/support" className="block text-slate-500 hover:text-cloud-blue">
              Support
            </Link>
            <Link href="/contact" className="block text-slate-500 hover:text-cloud-blue">
              Contact Sales
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-200 py-5">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} Octalve Cloud. All rights reserved.</p>
          <p>Quick response: {cloudLinks.supportPhone} · {cloudLinks.supportEmail}</p>
        </div>
      </div>
    </footer>
  );
}
