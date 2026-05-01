import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type ToolCardProps = {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
};

export function ToolCard({ title, description, href, icon: Icon }: ToolCardProps) {
  return (
    <Link
      href={href}
      className="group rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-[0_16px_45px_rgba(15,23,42,0.045)] transition hover:-translate-y-1 hover:border-cloud-blue/30 hover:shadow-[0_24px_70px_rgba(0,100,224,0.10)]"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cloud-blue/10 text-cloud-blue transition group-hover:bg-cloud-blue group-hover:text-white">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </div>

      <h2 className="mt-6 text-xl font-semibold tracking-[-0.025em] text-slate-950">
        {title}
      </h2>

      <p className="mt-3 text-sm leading-7 text-slate-500 sm:text-[15px]">
        {description}
      </p>

      <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-cloud-blue">
        Open tool
        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
      </div>
    </Link>
  );
}
