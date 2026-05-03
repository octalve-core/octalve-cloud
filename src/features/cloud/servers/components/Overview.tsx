import Link from "next/link";
import {
  ArrowRight,
  Boxes,
  Database,
  Globe,
  Layers3,
  ServerCog,
  ShieldCheck,
  Sparkles,
  Workflow,
} from "lucide-react";
import { cloudLinks } from "@/features/cloud/data/cloud-links";

const points = [
  {
    title: "Deploy applications and business platforms",
    description:
      "Launch business websites, portals, internal tools, and custom applications on dependable VPS infrastructure.",
  },
  {
    title: "Choose server resources that match your stage",
    description:
      "Start with the right compute, memory, and storage for your current needs, then scale as your traffic and workload grow.",
  },
  {
    title: "Get guided setup and management direction",
    description:
      "From initial setup to ongoing server direction, Octalve Cloud helps you move with more clarity and less friction.",
  },
];

const catalogItems = [
  { label: "Apps", icon: Boxes },
  { label: "Databases", icon: Database },
  { label: "APIs", icon: Workflow },
  { label: "Web Projects", icon: Globe },
  { label: "Server Tools", icon: ServerCog },
  { label: "Security", icon: ShieldCheck },
  { label: "Stacks", icon: Layers3 },
  { label: "Automation", icon: Sparkles },
];

export function Overview() {
  return (
    <section className="bg-white px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_24px_70px_rgba(15,23,42,0.06)]">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
            <div className="px-6 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cloud-blue">
                Overview
              </p>

              <h2 className="mt-4 text-3xl font-medium tracking-[-0.045em] text-slate-950 sm:text-4xl lg:text-[2.8rem] lg:leading-[1.05]">
                Deploy, manage, and grow faster with VPS infrastructure built
                for real business needs.
              </h2>

              <p className="mt-5 max-w-2xl text-base leading-8 text-slate-500 sm:text-lg">
                Octalve Cloud helps you run applications, websites, business
                systems, and modern platforms on scalable server infrastructure
                with a cleaner setup path and better growth flexibility.
              </p>

              <div className="mt-8 grid gap-4">
                {points.map((point, index) => (
                  <div
                    key={point.title}
                    className="rounded-[1.4rem] border border-slate-200 bg-[#F8FAFC] p-5 transition hover:border-cloud-blue/20 hover:shadow-[0_14px_35px_rgba(15,23,42,0.05)] sm:p-6"
                  >
                    <div className="flex items-start gap-4">
                      <span className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-2xl bg-cloud-blue/10 text-sm font-semibold text-cloud-blue">
                        0{index + 1}
                      </span>

                      <div>
                        <h3 className="text-lg font-medium tracking-[-0.02em] text-slate-950">
                          {point.title}
                        </h3>
                        <p className="mt-2 text-sm leading-7 text-slate-500 sm:text-base">
                          {point.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <a
                  href={cloudLinks.console}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-cloud-blue px-6 py-3 text-sm font-semibold text-white shadow-[0_14px_34px_rgba(0,100,224,0.20)] transition hover:-translate-y-0.5 hover:bg-blue-600"
                >
                  Explore server options
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </div>

            <div className="relative border-t border-slate-200 bg-white px-6 py-8 sm:px-8 sm:py-10 lg:border-l lg:border-t-0 lg:px-10 lg:py-12">
              <div
                className="pointer-events-none absolute inset-0"
                aria-hidden="true"
              >
                <div className="absolute left-10 top-10 h-40 w-40 rounded-full bg-cloud-blue/10 blur-3xl" />
                <div className="absolute bottom-10 right-10 h-44 w-44 rounded-full bg-blue-100 blur-3xl" />
              </div>

              <div className="relative">
                <div className="rounded-[1.75rem] border border-slate-200 bg-[#F8FAFC] p-4 shadow-[0_16px_40px_rgba(15,23,42,0.04)] sm:p-5">
                  <div className="flex items-center justify-between gap-3 border-b border-slate-200 pb-4">
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-[0.14em] text-cloud-blue">
                        Server toolkit
                      </p>
                      <p className="mt-1 text-sm leading-6 text-slate-500">
                        Common deployment paths for modern VPS usage
                      </p>
                    </div>

                    <span className="inline-flex rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-600 ring-1 ring-slate-200">
                      VPS Ready
                    </span>
                  </div>

                  <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {catalogItems.map((item) => {
                      const Icon = item.icon;

                      return (
                        <div
                          key={item.label}
                          className="group rounded-[1.25rem] border border-slate-200 bg-white p-4 text-center transition hover:-translate-y-0.5 hover:border-cloud-blue/25 hover:shadow-[0_12px_30px_rgba(15,23,42,0.05)]"
                        >
                          <div className="mx-auto inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-cloud-blue/10 text-cloud-blue">
                            <Icon className="h-5 w-5" aria-hidden="true" />
                          </div>

                          <p className="mt-3 text-sm font-medium text-slate-700">
                            {item.label}
                          </p>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-5 rounded-[1.25rem] border border-slate-200 bg-white p-5">
                    <p className="text-sm font-semibold text-slate-950">
                      Built for flexible deployment
                    </p>
                    <p className="mt-2 text-sm leading-7 text-slate-500">
                      Run websites, apps, business tools, APIs, and backend
                      services with the performance, control, and upgrade path
                      serious projects need.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
