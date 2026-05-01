import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cloudLinks } from "@/features/cloud/data/cloud-links";

export function ToolCTA() {
  return (
    <section className="bg-white px-4 pb-16 sm:px-6 lg:px-8 lg:pb-24">
      <div className="mx-auto max-w-5xl overflow-hidden rounded-[2rem] bg-cloud-blue p-8 text-white shadow-[0_24px_80px_rgba(0,100,224,0.18)] sm:p-10 lg:p-12">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-100">
              Ready to launch?
            </p>
            <h2 className="mt-4 text-3xl font-medium tracking-[-0.04em] sm:text-4xl">
              Move from search to setup with Octalve Cloud.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-8 text-blue-100">
              Use the tools to plan your domain, policies, hosting and security, then continue inside the Octalve Cloud console when you are ready.
            </p>
          </div>

          <Link
            href={cloudLinks.console}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-semibold text-cloud-blue shadow-sm transition hover:-translate-y-0.5 hover:bg-blue-50"
          >
            Open Console
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
