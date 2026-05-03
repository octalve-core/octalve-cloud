"use client";

import Image, { type StaticImageData } from "next/image";
import vpsHardwareVisual from "@/assets/sections/vps-hardware-visual.png";
import vpsSpeedVisual from "@/assets/sections/vps-speed-visual.png";
import vpsApiVisual from "@/assets/sections/vps-api-visual.png";
import vpsBackupsVisual from "@/assets/sections/vps-backups-visual.png";

type FeatureCard = {
  title: string;
  description: string;
  image: StaticImageData;
  imageAlt: string;
  size: "large" | "small" | "wide";
};

const features: FeatureCard[] = [
  {
    title: "High-performance VPS hardware",
    description:
      "Run serious projects on fast compute, NVMe SSD storage, and infrastructure prepared for traffic-heavy websites, apps, portals, and business systems.",
    image: vpsHardwareVisual,
    imageAlt: "Octalve Cloud VPS high-performance hardware visual",
    size: "large",
  },
  {
    title: "Fast network performance",
    description:
      "Give your users a smoother experience with speed-focused VPS hosting built for low latency, stable delivery, and reliable online access.",
    image: vpsSpeedVisual,
    imageAlt: "Octalve Cloud VPS speed visual",
    size: "small",
  },
  {
    title: "API-ready infrastructure",
    description:
      "Prepare your hosting foundation for future automation, provisioning, billing, deployment workflows, and backend integration.",
    image: vpsApiVisual,
    imageAlt: "Octalve Cloud VPS API visual",
    size: "small",
  },
  {
    title: "Weekly backups and snapshots",
    description:
      "Protect your VPS projects with backup-ready infrastructure, restore planning, and safer recovery options when something needs to be rolled back.",
    image: vpsBackupsVisual,
    imageAlt: "Octalve Cloud VPS weekly backup visual",
    size: "wide",
  },
];

function ProtectedImage({
  src,
  alt,
  className,
}: {
  src: StaticImageData;
  alt: string;
  className?: string;
}) {
  return (
    <div
      className="relative select-none"
      onContextMenu={(event) => event.preventDefault()}
      onDragStart={(event) => event.preventDefault()}
      onCopy={(event) => event.preventDefault()}
      onCut={(event) => event.preventDefault()}
      style={{ userSelect: "none" }}
    >
      <Image
        src={src}
        alt={alt}
        draggable={false}
        className={[
          "pointer-events-none h-auto w-full select-none object-contain",
          className ?? "",
        ].join(" ")}
        style={
          {
            WebkitTouchCallout: "none",
            userSelect: "none",
          } as React.CSSProperties
        }
      />

      <div
        className="absolute inset-0 z-20"
        aria-hidden="true"
        onContextMenu={(event) => event.preventDefault()}
        onDragStart={(event) => event.preventDefault()}
        onCopy={(event) => event.preventDefault()}
      />
    </div>
  );
}

export function WhyOctalveCloud() {
  return (
    <section className="overflow-hidden bg-white px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cloud-blue">
            Why Octalve Cloud VPS
          </p>

          <h2 className="mt-4 text-3xl font-medium tracking-[-0.05em] text-slate-950 sm:text-4xl lg:text-5xl">
            Secure, speedy, reliable VPS hosting.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-500 sm:text-lg">
            Built for founders, businesses, developers, and growing systems that
            need more control, stronger performance, and dependable cloud server
            infrastructure.
          </p>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-[1.1fr_0.9fr_0.9fr] lg:auto-rows-[minmax(280px,auto)]">
          {features.map((feature) => {
            const isLarge = feature.size === "large";
            const isWide = feature.size === "wide";

            return (
              <article
                key={feature.title}
                className={[
                  "group relative overflow-hidden rounded-[2rem] border border-slate-200 bg-[#F8FAFC] shadow-[0_20px_65px_rgba(15,23,42,0.06)] transition duration-300 hover:-translate-y-1 hover:border-cloud-blue/25 hover:shadow-[0_28px_85px_rgba(15,23,42,0.10)]",
                  isLarge ? "lg:row-span-2" : "",
                  isWide ? "lg:col-span-2" : "",
                ].join(" ")}
              >
                <div
                  className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,100,224,0.12),transparent_42%)]"
                  aria-hidden="true"
                />

                <div className="relative z-10 flex h-full flex-col">
                  <div
                    className={[
                      "flex items-center justify-center px-6 pt-6",
                      isLarge ? "min-h-[390px] lg:min-h-[520px]" : "",
                      isWide ? "min-h-[260px] sm:min-h-[300px]" : "",
                      feature.size === "small"
                        ? "min-h-[260px] sm:min-h-[300px]"
                        : "",
                    ].join(" ")}
                  >
                    <ProtectedImage
                      src={feature.image}
                      alt={feature.imageAlt}
                      className={[
                        isLarge ? "max-h-[500px]" : "",
                        isWide ? "max-h-[300px]" : "",
                        feature.size === "small" ? "max-h-[285px]" : "",
                        "transition duration-500 group-hover:scale-[1.025]",
                      ].join(" ")}
                    />
                  </div>

                  <div className="mt-auto border-t border-slate-200/80 bg-white/80 px-6 py-6 backdrop-blur-sm sm:px-7">
                    <h3 className="text-xl font-semibold tracking-[-0.035em] text-slate-950 sm:text-2xl">
                      {feature.title}
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-slate-500 sm:text-base">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
