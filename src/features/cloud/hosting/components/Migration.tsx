import Image from "next/image";
import Link from "next/link";
import { Check, Shield } from "lucide-react";
import migrationVisual from "@/assets/sections/cloud-migration-visual.png";

const migrationPoints = [
  "Migrate an unlimited number of websites for free",
  "AI automates your site migration without hassle or downtime",
  "24/7 customer support",
];

export function Migration() {
  return (
    <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          {/* Left content */}
          <div className="max-w-xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cloud-blue">
              Migration
            </p>

            <h2 className="mt-4 text-4xl font-medium leading-tight tracking-[-0.05em] text-slate-950 sm:text-5xl">
              Move your website without the usual stress.
            </h2>

            <p className="mt-5 text-base leading-8 text-slate-500 sm:text-lg">
              Switch your website, email, and hosting with guided support,
              minimal downtime, and a smoother transition from start to finish.
            </p>

            <ul className="mt-8 space-y-4">
              {migrationPoints.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                    <Check className="h-4 w-4" />
                  </span>
                  <span className="text-base leading-7 text-slate-800">
                    {point}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col items-start gap-4">
              <Link
                href="/migration"
                className="inline-flex min-h-12 items-center justify-center rounded-[14px] bg-cloud-blue px-8 text-base font-semibold text-white shadow-[0_14px_30px_rgba(0,100,224,0.22)] transition hover:-translate-y-0.5 hover:bg-blue-600"
              >
                Migrate for free
              </Link>

              <div className="inline-flex items-center gap-2 text-sm font-medium text-slate-700">
                <Shield className="h-4 w-4 text-slate-700" />
                <span>30-day money-back guarantee</span>
              </div>
            </div>
          </div>

          {/* Right visual */}
          <div className="relative">
            <div className="overflow-hidden rounded-[2rem]">
              <Image
                src={migrationVisual}
                alt="Website migration illustration"
                className="h-auto w-full object-cover"
                priority={false}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
