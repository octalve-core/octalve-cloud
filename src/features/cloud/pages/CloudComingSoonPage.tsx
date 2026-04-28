import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { CloudShell } from "@/features/cloud/components/CloudShell";
import { cloudLinks } from "@/features/cloud/data/cloud-links";

type CloudComingSoonPageProps = {
  title: string;
  eyebrow: string;
  description: string;
};

export function CloudComingSoonPage({ title, eyebrow, description }: CloudComingSoonPageProps) {
  return (
    <CloudShell>
      <section className="bg-cloud-radial py-20 sm:py-28">
        <div className="octalve-cloud-container max-w-3xl text-center">
          <p className="text-sm font-black uppercase tracking-[0.25em] text-cloud-blue">{eyebrow}</p>
          <h1 className="mt-5 text-4xl font-black tracking-[-0.05em] text-cloud-navy sm:text-6xl">{title}</h1>
          <p className="mx-auto mt-6 max-w-2xl text-base font-medium leading-8 text-cloud-ash sm:text-lg">{description}</p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-cloud-border bg-white px-5 py-3 text-sm font-black text-cloud-navy transition hover:border-cloud-blue hover:text-cloud-blue"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
            <a
              href={cloudLinks.console}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-cloud-blue px-5 py-3 text-sm font-black text-white transition hover:bg-cloud-blueDark"
            >
              Continue to Console
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>
    </CloudShell>
  );
}
