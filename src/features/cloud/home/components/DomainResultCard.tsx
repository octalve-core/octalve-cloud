import Link from "next/link";
import { CheckCircle2, CircleHelp, ShoppingCart, XCircle } from "lucide-react";
import { buildDomainRegistrationHref } from "@/lib/console-commerce-links";
import type { DomainSuggestion } from "@/lib/domain-pricing-adapter";

export function DomainResultCard({ item }: { item: DomainSuggestion }) {
  const href = buildDomainRegistrationHref(item.domain);
  const available = item.available === true;
  const taken = item.available === false;
  const canOrder = available && item.checkoutEnabled === true && !!href;
  const Icon = available ? CheckCircle2 : taken ? XCircle : CircleHelp;
  return (
    <article className="rounded-2xl border border-white/10 bg-[#151618] p-5 text-left sm:p-6">
      <div className="flex flex-col items-start gap-2">
        <span className={`inline-flex items-center gap-1.5 text-xs font-medium ${available ? "text-emerald-300" : taken ? "text-red-300" : "text-amber-200"}`}>
          <Icon size={15} aria-hidden="true" />{available ? "Available" : taken ? "Registered or unavailable" : "Availability unverified"}
        </span>
        <h3 className="max-w-full break-all text-xl font-medium text-white">{item.domain}</h3>
      </div>
      <div className="my-4 border-t border-white/10 pt-4">
        <p className="text-xs text-zinc-400">Registration estimate</p>
        <p className="mt-1 text-2xl font-medium tracking-tight text-white">{item.priceLabel}</p>
        {item.renewalLabel && <p className="mt-2 text-sm text-zinc-400">{item.renewalLabel}</p>}
      </div>
      {canOrder ? <a href={href} className="flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#2269DE] px-4 text-sm font-medium text-white hover:bg-cloud-blueDark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-400">
        <ShoppingCart size={17} aria-hidden="true" /> Continue to cart
      </a> : <div className="space-y-2">
        <p className="text-sm text-zinc-300">{taken ? "Try another domain name." : available ? "Online checkout is not enabled for this domain." : "Registrar verification is required before purchase."}</p>
        <Link href="/contact" className="inline-block text-sm text-blue-300 underline underline-offset-4">Contact sales</Link>
      </div>}
    </article>
  );
}
