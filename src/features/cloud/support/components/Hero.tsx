import Link from "next/link";
import { ArrowUpRight, Headset, Mail, MessageCircle, Globe2, ShieldCheck } from "lucide-react";
import { cloudLinks } from "@/features/cloud/data/cloud-links";

export function Hero() {
  return (
    <section aria-labelledby="support-title" className="-mt-4 bg-[#F0F5FC] px-4 pb-16 pt-20 text-cloud-navy sm:px-6 lg:px-8 lg:pb-24 lg:pt-28">
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-20">
        <div>
          <h1 id="support-title" className="max-w-xl text-[clamp(2.25rem,4vw,3.5rem)] font-normal leading-[1.14] tracking-[-0.045em]">Expert help, whenever you need it.</h1>
          <p className="mt-7 max-w-xl text-base leading-7 text-slate-700">Need help with domains, DNS, hosting or business email? Get guidance from our team, manage your support requests in the Client Console, or explore our help centre.</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a href={cloudLinks.whatsapp} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-cloud-blue px-6 text-sm font-medium text-white hover:bg-cloud-blueDark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cloud-blue"><MessageCircle size={18} aria-hidden="true"/> Chat with our team</a>
            <a href={cloudLinks.console} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 text-sm font-medium text-cloud-navy hover:border-cloud-blue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cloud-blue">Client Console <ArrowUpRight size={16} aria-hidden="true"/></a>
          </div>
          <a href={`mailto:${cloudLinks.supportEmail}`} className="mt-5 inline-flex items-center gap-2 break-all text-sm text-cloud-blue underline-offset-4 hover:underline"><Mail size={16} aria-hidden="true"/>{cloudLinks.supportEmail}</a>
        </div>
        <div className="relative isolate overflow-hidden rounded-[28px] bg-gradient-to-br from-[#D7EDFF] via-[#A9D5FC] to-[#75B6EE] p-5 sm:p-10" aria-label="Support resources">
          <div aria-hidden="true" className="absolute -right-20 -top-20 -z-10 h-64 w-64 rounded-full border-[36px] border-white/25"/>
          <div className="relative mx-auto max-w-md rounded-3xl border border-white/70 bg-white/90 p-5 shadow-[0_20px_60px_rgba(0,43,95,.12)] sm:p-7">
            <div className="flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-cloud-blue text-white"><Headset size={25} aria-hidden="true"/></span>
              <div><p className="text-lg font-medium">Octalve Cloud Support</p><p className="text-sm text-slate-600">Choose a way to get help</p></div>
            </div>
            <div className="mt-7 space-y-3">
              <Link href="/knowledge-base" className="flex items-center gap-3 rounded-xl bg-[#F0F5FC] p-4 text-sm font-medium hover:bg-blue-100 focus-visible:outline focus-visible:outline-cloud-blue"><Globe2 size={19} className="shrink-0 text-cloud-blue" aria-hidden="true"/> Find domain and DNS guidance <ArrowUpRight size={15} className="ml-auto shrink-0" aria-hidden="true"/></Link>
              <a href={cloudLinks.console} className="flex items-center gap-3 rounded-xl bg-[#F0F5FC] p-4 text-sm font-medium hover:bg-blue-100 focus-visible:outline focus-visible:outline-cloud-blue"><ShieldCheck size={19} className="shrink-0 text-cloud-blue" aria-hidden="true"/> Manage account and service requests <ArrowUpRight size={15} className="ml-auto shrink-0" aria-hidden="true"/></a>
            </div>
            <div className="mt-6 rounded-2xl bg-cloud-navy p-4 text-white"><p className="text-sm font-medium">Let's get you moving.</p><p className="mt-1 text-sm text-slate-300">A little guidance makes the next step easier.</p></div>
          </div>
        </div>
      </div>
    </section>
  );
}
