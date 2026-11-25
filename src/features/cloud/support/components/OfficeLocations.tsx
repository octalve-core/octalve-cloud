import { MapPin, ArrowUpRight, Building2, Mail } from "lucide-react";
import { cloudLinks } from "@/features/cloud/data/cloud-links";

const address = "Anafaraa Plaza, Behind MIB, 1st Avenue, Gwarimpa, Abuja.";
const directions = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(address + " Nigeria");

export function OfficeLocations() {
  return (
    <section aria-labelledby="office-title" className="bg-white px-4 py-16 text-cloud-navy sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <h2 id="office-title" className="text-center text-3xl font-normal tracking-[-0.04em] sm:text-4xl lg:text-5xl">Our office location</h2>
        <article className="mx-auto mt-10 max-w-3xl overflow-hidden rounded-2xl border border-slate-200 sm:grid sm:grid-cols-2">
          <div className="relative isolate flex min-h-52 flex-col items-center justify-center gap-4 overflow-hidden bg-[#EAF2FF] p-8 text-cloud-blue" aria-hidden="true">
            <div className="absolute inset-0 -z-10 opacity-30" style={{backgroundImage:"linear-gradient(35deg, transparent 46%, #93BFF5 47%, #93BFF5 51%, transparent 52%), linear-gradient(125deg, transparent 46%, #93BFF5 47%, #93BFF5 51%, transparent 52%)",backgroundSize:"66px 66px"}}/>
            <div className="grid h-20 w-20 place-items-center rounded-3xl bg-white shadow-lg"><Building2 size={38} strokeWidth={1.4}/></div>
            <span className="rounded-full bg-white px-4 py-2 text-sm font-medium">Abuja, Nigeria</span>
          </div>
          <div className="flex flex-col justify-center p-7 sm:p-8">
            <h3 className="text-xl font-medium">Abuja, Nigeria</h3>
            <address className="mt-4 flex gap-3 text-sm not-italic leading-6 text-slate-600"><MapPin size={19} className="mt-0.5 shrink-0 text-cloud-blue" aria-hidden="true"/>{address}</address>
            <a href={`mailto:${cloudLinks.supportEmail}`} className="mt-4 flex items-center gap-2 break-all text-sm text-cloud-blue hover:underline"><Mail size={17} className="shrink-0" aria-hidden="true"/>{cloudLinks.supportEmail}</a>
            <a href={directions} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex w-fit items-center gap-2 text-sm font-medium text-cloud-blue hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cloud-blue">Get directions <ArrowUpRight size={16} aria-hidden="true"/></a>
          </div>
        </article>
      </div>
    </section>
  );
}
