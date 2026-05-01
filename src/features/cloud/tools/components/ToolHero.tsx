import type { LucideIcon } from "lucide-react";

type ToolHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

export function ToolHero({ eyebrow, title, description, icon: Icon }: ToolHeroProps) {
  return (
    <section className="relative overflow-hidden bg-[#F8FAFC] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-cloud-blue/10 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-[#29BE3E]/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-cloud-blue text-white shadow-[0_18px_45px_rgba(0,100,224,0.24)]">
          <Icon className="h-7 w-7" aria-hidden="true" />
        </div>

        <p className="mt-6 text-sm font-semibold uppercase tracking-[0.18em] text-cloud-blue">
          {eyebrow}
        </p>

        <h1 className="mx-auto mt-4 max-w-4xl text-4xl font-medium tracking-[-0.055em] text-slate-950 sm:text-5xl lg:text-6xl">
          {title}
        </h1>

        <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-slate-500 sm:text-lg">
          {description}
        </p>
      </div>
    </section>
  );
}
