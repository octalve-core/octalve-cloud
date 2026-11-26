import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import octalveCloudMark from "@/assets/logo/octalve-cloud.png";

type GetStartedProps = {
  dark?: boolean;
  eyebrow?: string;
  title: string;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
};

export function GetStarted({
  dark = false,
  eyebrow = "Ready to move faster?",
  title,
  description,
  primaryLabel = "Get started",
  primaryHref = "https://console.cloud.octalve.com",
  secondaryLabel = "Contact sales",
  secondaryHref = "/contact",
}: GetStartedProps) {
  return (
    <section className={dark ? "bg-black px-4 py-16 sm:px-6 lg:px-8" : "bg-white px-4 py-16 sm:px-6 lg:px-8"}>
      <div className={`mx-auto max-w-7xl overflow-hidden rounded-[2rem] ring-1 ${dark ? "bg-[#151515] ring-white/10" : "bg-[#EAF2FF] ring-slate-200/70"}`}>
        <div className="grid items-center gap-8 px-6 py-10 sm:px-10 lg:grid-cols-[0.95fr_1.05fr] lg:px-16 lg:py-16">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cloud-blue">{eyebrow}</p>
            <h2 className={`mt-4 max-w-xl text-3xl font-medium tracking-[-0.045em] sm:text-4xl lg:text-5xl ${dark ? "text-white" : "text-slate-950"}`}>
              {title}
            </h2>
            {description ? (
              <p className={`mt-5 max-w-xl text-base leading-8 ${dark ? "text-zinc-300" : "text-slate-600"}`}>{description}</p>
            ) : null}
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                href={primaryHref}
                rel="noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-cloud-blue px-7 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(0,100,224,0.22)] transition hover:-translate-y-0.5 hover:bg-blue-600"
              >
                {primaryLabel}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href={secondaryHref}
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-slate-300 bg-white px-7 text-sm font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:border-cloud-blue/30 hover:text-cloud-blue"
              >
                {secondaryLabel}
              </Link>
            </div>
          </div>

          <div className="relative flex min-h-[240px] items-center justify-center lg:min-h-[360px]">
            <div className={`absolute right-[-25%] top-1/2 h-[380px] w-[380px] -translate-y-1/2 rounded-full blur-3xl ${dark ? "bg-blue-500/10" : "bg-white/45"}`} />
            <Image
              src={octalveCloudMark}
              alt="Octalve Cloud"
              width={520}
              height={520}
              className="relative w-[280px] max-w-full object-contain sm:w-[360px] lg:w-[480px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
