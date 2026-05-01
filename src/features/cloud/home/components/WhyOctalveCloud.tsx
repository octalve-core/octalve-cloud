import Link from "next/link";
import { ArrowRight, Check, Minus, X } from "lucide-react";
import { cloudLinks } from "@/features/cloud/data/cloud-links";

type ComparisonValue = "yes" | "no" | "partial" | string;

type ComparisonRow = {
  feature: string;
  octalve: ComparisonValue;
  namecheap: ComparisonValue;
  hostinger: ComparisonValue;
};

const comparisonRows: ComparisonRow[] = [
  {
    feature: "Business-owner friendly setup",
    octalve: "yes",
    namecheap: "partial",
    hostinger: "partial",
  },
  {
    feature: "Local Nigerian payment support",
    octalve: "yes",
    namecheap: "partial",
    hostinger: "partial",
  },
  {
    feature: "Guided website launch support",
    octalve: "yes",
    namecheap: "partial",
    hostinger: "partial",
  },
  {
    feature: "Domain, hosting, email & SSL guidance",
    octalve: "yes",
    namecheap: "yes",
    hostinger: "yes",
  },
  {
    feature: "Direct human support for SMEs",
    octalve: "yes",
    namecheap: "partial",
    hostinger: "partial",
  },
  {
    feature: "Migration assistance",
    octalve: "yes",
    namecheap: "partial",
    hostinger: "partial",
  },
  {
    feature: "Built around Nigerian SMEs & founders",
    octalve: "yes",
    namecheap: "no",
    hostinger: "no",
  },
  {
    feature: "Simple explanation before purchase",
    octalve: "yes",
    namecheap: "partial",
    hostinger: "partial",
  },
  {
    feature: "Future client portal built for Octalve users",
    octalve: "yes",
    namecheap: "no",
    hostinger: "no",
  },
];

function ComparisonCell({ value }: { value: ComparisonValue }) {
  if (value === "yes") {
    return (
      <span className="inline-flex items-center justify-center text-emerald-600">
        <Check className="h-5 w-5" aria-hidden="true" />
      </span>
    );
  }

  if (value === "no") {
    return (
      <span className="inline-flex items-center justify-center text-red-500">
        <X className="h-5 w-5" aria-hidden="true" />
      </span>
    );
  }

  if (value === "partial") {
    return (
      <span className="inline-flex items-center justify-center text-slate-400">
        <Minus className="h-5 w-5" aria-hidden="true" />
      </span>
    );
  }

  return <span className="text-sm font-medium text-slate-600">{value}</span>;
}

export function WhyOctalveCloud() {
  return (
    <section className="bg-[#F8FAFC] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cloud-blue">
            Why Octalve Cloud
          </p>

          <h2 className="mt-4 text-3xl font-medium tracking-[-0.045em] text-slate-950 sm:text-4xl lg:text-5xl">
            Why Octalve Cloud vs.{" "}
            <span className="text-cloud-blue">The Alternatives</span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-500 sm:text-lg">
            Namecheap and Hostinger are strong global platforms. Octalve Cloud
            is built to give Nigerian SMEs, founders, and businesses a more
            guided, local, and business-friendly hosting experience.
          </p>
        </div>

        <div className="mt-12 overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-[0_18px_60px_rgba(15,23,42,0.04)]">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px] border-collapse text-left">
              <thead>
                <tr className="border-b border-slate-200 bg-white">
                  <th className="w-[34%] px-6 py-5 text-sm font-medium text-slate-500">
                    Feature
                  </th>

                  <th className="w-[22%] px-6 py-5 text-center">
                    <span className="inline-flex rounded-full bg-cloud-blue px-5 py-2 text-sm font-semibold text-white shadow-sm">
                      Octalve Cloud
                    </span>
                  </th>

                  <th className="w-[22%] px-6 py-5 text-center text-sm font-medium text-slate-500">
                    Namecheap
                  </th>

                  <th className="w-[22%] px-6 py-5 text-center text-sm font-medium text-slate-500">
                    Hostinger
                  </th>
                </tr>
              </thead>

              <tbody>
                {comparisonRows.map((row) => (
                  <tr
                    key={row.feature}
                    className="border-b border-slate-100 last:border-b-0"
                  >
                    <td className="px-6 py-5 text-sm font-medium text-slate-950 sm:text-base">
                      {row.feature}
                    </td>

                    <td className="border-l border-slate-100 px-6 py-5 text-center">
                      <ComparisonCell value={row.octalve} />
                    </td>

                    <td className="border-l border-slate-100 px-6 py-5 text-center">
                      <ComparisonCell value={row.namecheap} />
                    </td>

                    <td className="border-l border-slate-100 px-6 py-5 text-center">
                      <ComparisonCell value={row.hostinger} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mx-auto mt-10 flex max-w-3xl flex-col items-center text-center">
          <Link
            href={cloudLinks.console}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-cloud-blue px-7 py-3 text-sm font-semibold text-white shadow-[0_14px_35px_rgba(0,100,224,0.22)] transition hover:-translate-y-0.5 hover:bg-blue-600"
          >
            Start with Octalve Cloud
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>

          <p className="mt-4 text-sm leading-6 text-slate-500">
            Designed for businesses that want clarity, setup guidance, and
            reliable cloud infrastructure without technical confusion.
          </p>
        </div>
      </div>
    </section>
  );
}
