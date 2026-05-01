import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cloudLinks } from "@/features/cloud/data/cloud-links";

export function Hero() {
  return (
    <section className="bg-[#F8FAFC] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cloud-blue">Domain Registration</p>
          <h1 className="mt-5 text-4xl font-medium tracking-[-0.055em] text-slate-950 sm:text-5xl lg:text-7xl">
            Secure your business name and control your online identity.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-500 sm:text-lg">
            A focused Octalve Cloud page for searching, registering, transferring and managing domains. This demo section is ready for final copy and product details.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href={cloudLinks.console} target="_blank" rel="noreferrer" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-cloud-blue px-7 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(0,100,224,0.22)] transition hover:-translate-y-0.5 hover:bg-blue-600">
              Get Started <ArrowRight className="h-4 w-4" />
            </a>
            <Link href="/contact" className="inline-flex min-h-12 items-center justify-center rounded-full border border-slate-200 bg-white px-7 text-sm font-semibold text-cloud-blue shadow-sm transition hover:-translate-y-0.5 hover:border-cloud-blue/30 hover:bg-slate-50">
              Contact Sales
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
