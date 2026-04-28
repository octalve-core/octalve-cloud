import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cloudServices } from "@/features/cloud/data/cloud-services";

export function ServicesPreview() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="octalve-cloud-container">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-black uppercase tracking-[0.25em] text-cloud-blue">Cloud services</p>
          <h2 className="mt-4 text-3xl font-black tracking-[-0.04em] text-cloud-navy sm:text-4xl">
            Everything your business needs to come online with confidence.
          </h2>
          <p className="mt-4 text-base font-medium leading-8 text-cloud-ash">
            Start with a domain, launch with hosting, secure your site, set up email and get support when you need it.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cloudServices.map((service) => {
            const Icon = service.icon;
            return (
              <Link
                key={service.href}
                href={service.href}
                className="group rounded-[1.75rem] border border-cloud-border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-cloud-blue hover:shadow-soft"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cloud-soft text-cloud-blue transition group-hover:bg-cloud-blue group-hover:text-white">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="mt-5 text-lg font-black text-cloud-navy">{service.title}</h3>
                <p className="mt-3 text-sm font-medium leading-7 text-cloud-ash">{service.description}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-cloud-blue">
                  Learn more
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
