import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { cloudLinks } from "@/features/cloud/data/cloud-links";
import cloudMark from "@/assets/logo/octalve-cloud.png";

export function MediaAndNews() {
  return (
    <section aria-labelledby="media-title" className="bg-white px-4 py-8 text-cloud-navy sm:px-6 lg:px-8 lg:py-12">
      <div className="mx-auto grid max-w-7xl overflow-hidden rounded-2xl bg-[#F0F5FC] lg:grid-cols-2">
        <div className="flex flex-col justify-center p-8 sm:p-12 lg:p-14">
          <h2 id="media-title" className="text-3xl font-normal tracking-[-0.04em] sm:text-4xl">Media and news</h2>
          <p className="mt-5 text-base leading-7 text-slate-600">For press enquiries, company information and collaboration opportunities, get in touch.</p>
          <a href={`mailto:${cloudLinks.supportEmail}?subject=Media%20enquiry`} className="mt-7 inline-flex w-fit items-center gap-2 text-sm font-medium text-cloud-blue underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cloud-blue">Email our team <ArrowUpRight size={16} aria-hidden="true"/></a>
        </div>
        <div className="relative isolate flex min-h-64 items-center justify-center overflow-hidden bg-[#000A16] p-10 text-white sm:min-h-80" aria-hidden="true">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,#164A88,transparent_70%)]"/>
          <div className="absolute -bottom-36 -right-24 -z-10 h-80 w-80 rounded-full border border-blue-300/20"/>
          <div className="absolute -bottom-24 -right-16 -z-10 h-64 w-64 rounded-full border border-blue-300/20"/>
          <div className="text-center"><Image src={cloudMark} alt="" className="mx-auto h-20 w-auto object-contain" width={96} height={96}/><p className="mt-6 text-3xl font-normal tracking-tight">Octalve Cloud</p><p className="mt-2 text-sm text-blue-200">Infrastructure for growing businesses.</p></div>
        </div>
      </div>
    </section>
  );
}
