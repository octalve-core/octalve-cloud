import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cloudLinks } from "@/features/cloud/data/cloud-links";

const email = (subject: string) => `mailto:${cloudLinks.supportEmail}?subject=${encodeURIComponent(subject)}`;
const options = [
  { title: "Account recovery", description: "Can't access your account? Contact our team for help restoring access securely.", href: email("Account recovery") },
  { title: "Security and abuse", description: "Report suspected phishing, spam, malware or unauthorized activity.", href: email("Security or abuse report") },
  { title: "Knowledge Base", description: "Find guidance on domains, DNS, hosting, billing and account management.", href: "/knowledge-base" },
  { title: "Client Console", description: "Sign in to manage services, invoices and support requests.", href: cloudLinks.console },
  { title: "Tools and tutorials", description: "Explore domain search, WHOIS and other website tools.", href: "/tools" },
  { title: "Sales and migration", description: "Find the right service or get guidance moving your existing website.", href: "/contact" },
];

export function HelpOptions() {
  return (
    <section aria-labelledby="help-options-title" className="bg-white px-4 py-16 text-cloud-navy sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 id="help-options-title" className="text-3xl font-normal tracking-[-0.04em] sm:text-4xl lg:text-5xl">How can we help?</h2>
          <p className="mt-4 text-base leading-7 text-slate-600">Find the right support channel, whether you're already a customer or just getting started.</p>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {options.map(option => {
            const content = <><div className="flex items-start justify-between gap-3"><h3 className="text-lg font-medium">{option.title}</h3><ArrowUpRight size={18} className="shrink-0 text-cloud-blue" aria-hidden="true"/></div><p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base">{option.description}</p></>;
            const classes = "block min-h-36 rounded-2xl bg-[#F3F4F6] p-6 transition-colors hover:bg-[#EAF2FF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cloud-blue";
            return option.href.startsWith("/") ? <Link key={option.title} href={option.href} className={classes}>{content}</Link> : <a key={option.title} href={option.href} className={classes}>{content}</a>;
          })}
        </div>
      </div>
    </section>
  );
}
