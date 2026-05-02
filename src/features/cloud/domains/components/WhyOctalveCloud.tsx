import type { StaticImageData } from "next/image";
import Image from "next/image";
import Link from "next/link";

import domainGuideCard01 from "@/assets/sections/domain-guide-card-01.png";
import domainGuideCard02 from "@/assets/sections/domain-guide-card-02.png";
import domainGuideCard03 from "@/assets/sections/domain-guide-card-03.png";

type ReasonCard = {
  image: StaticImageData;
  title: string;
  description: string;
  linkLabel?: string;
  href?: string;
};

const cards: ReasonCard[] = [
  {
    image: domainGuideCard01,
    title: "Choose a name people can remember",
    description:
      "Your domain should be simple, clear, and close to your business name. Octalve Cloud helps you search better options, compare useful extensions, and secure a name that fits your brand.",
    linkLabel: "Search domain names",
    href: "/domains",
  },
  {
    image: domainGuideCard02,
    title: "Move your domain with less confusion",
    description:
      "If your domain is already with another provider, we can guide the transfer process and help you understand what to do with DNS, email records, hosting links, and renewal settings.",
    linkLabel: "Request migration support",
    href: "/migration",
  },
  {
    image: domainGuideCard03,
    title: "Connect your domain to everything you need",
    description:
      "A domain works best when it is properly connected to hosting, SSL, email, and DNS. Octalve Cloud gives you one guided path to bring these pieces together and get your business online.",
    linkLabel: "View hosting plans",
    href: "/hosting",
  },
];

export function WhyOctalveCloud() {
  return (
    <section className="relative overflow-hidden bg-[#000A16] px-4 py-16 text-white sm:px-6 lg:px-8 lg:py-24">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute left-[-160px] top-[-160px] h-[380px] w-[380px] rounded-full bg-cloud-blue/20 blur-3xl" />
        <div className="absolute bottom-[-180px] right-[-160px] h-[420px] w-[420px] rounded-full bg-cloud-blue/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cloud-blue">
            Why Octalve Cloud
          </p>

          <h2 className="mt-4 text-3xl font-medium tracking-[-0.05em] text-white sm:text-4xl lg:text-5xl">
            Your domain is the first step to a{" "}
            <span className="text-cloud-blue">stronger online presence</span>.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
            Octalve Cloud helps you choose the right domain, connect it to
            hosting, and manage the technical setup with clear guidance from
            start to launch.
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {cards.map((card) => (
            <article key={card.title} className="group h-full">
              <div className="flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.04] shadow-[0_18px_50px_rgba(0,0,0,0.25)] transition duration-300 hover:-translate-y-1 hover:border-cloud-blue/40 hover:shadow-[0_28px_70px_rgba(0,100,224,0.16)]">
                <div className="overflow-hidden">
                  <Image
                    src={card.image}
                    alt={card.title}
                    className="h-auto w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                    priority={false}
                  />
                </div>

                <div className="flex flex-1 flex-col px-6 pb-7 pt-6 sm:px-7">
                  <h3 className="text-[1.55rem] font-medium tracking-[-0.03em] text-white">
                    {card.title}
                  </h3>

                  <p className="mt-4 flex-1 text-base leading-8 text-slate-300">
                    {card.description}
                  </p>

                  {card.linkLabel && card.href ? (
                    <div className="mt-6">
                      <Link
                        href={card.href}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-cloud-blue transition hover:text-blue-300"
                      >
                        <span>{card.linkLabel}</span>
                        <span aria-hidden="true">↗</span>
                      </Link>
                    </div>
                  ) : null}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
