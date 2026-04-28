import Link from "next/link";
import { CloudLogo } from "@/features/cloud/components/CloudLogo";
import { cloudLinks, cloudNavLinks } from "@/features/cloud/data/cloud-links";

export function CloudFooter() {
  return (
    <footer className="border-t border-cloud-border bg-cloud-navy text-white">
      <div className="octalve-cloud-container grid gap-10 py-12 lg:grid-cols-[1.2fr_0.8fr_0.8fr]">
        <div>
          <div className="inline-flex rounded-3xl bg-white p-2">
            <CloudLogo />
          </div>
          <p className="mt-5 max-w-md text-sm font-medium leading-7 text-slate-300">
            Octalve Cloud helps businesses, founders and organizations grow online with domains, hosting, email, SSL, servers and migration support.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-black uppercase tracking-[0.2em] text-blue-200">Explore</h3>
          <div className="mt-5 grid gap-3">
            {cloudNavLinks.slice(0, 6).map((link) => (
              <Link key={link.href} href={link.href} className="text-sm font-semibold text-slate-300 hover:text-white">
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-black uppercase tracking-[0.2em] text-blue-200">Access</h3>
          <div className="mt-5 grid gap-3">
            <a href={cloudLinks.console} target="_blank" rel="noreferrer" className="text-sm font-semibold text-slate-300 hover:text-white">
              Client Console
            </a>
            <a href={cloudLinks.opanel} target="_blank" rel="noreferrer" className="text-sm font-semibold text-slate-300 hover:text-white">
              Hosting Panel
            </a>
            <a href={cloudLinks.whatsapp} target="_blank" rel="noreferrer" className="text-sm font-semibold text-slate-300 hover:text-white">
              WhatsApp Support
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="octalve-cloud-container flex flex-col gap-3 py-5 text-xs font-semibold text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Octalve Cloud. All rights reserved.</p>
          <p>Domains • Hosting • Email • Security • Servers</p>
        </div>
      </div>
    </footer>
  );
}
