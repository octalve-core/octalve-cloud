"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import octalveCloudMark from "@/assets/logo/octalve-cloud.png";
import { HeroDomainSearch } from "./HeroDomainSearch";

export function Hero() {
  const [grow, setGrow] = useState(false);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let timer: number | undefined;
    function sync() {
      window.clearInterval(timer);
      if (!media.matches && !document.hidden) timer = window.setInterval(() => setGrow(value => !value), 2600);
    }
    sync();
    media.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    return () => { window.clearInterval(timer); media.removeEventListener("change", sync); document.removeEventListener("visibilitychange", sync); };
  }, []);

  return (
    <section className="relative isolate -mt-4 flex min-h-[calc(100vh-86px)] min-h-[calc(100svh-86px)] flex-col justify-center overflow-hidden bg-black px-4 py-14 text-white sm:px-6 md:py-20">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10" style={{
        background: "radial-gradient(ellipse at 3% 5%, rgba(230,21,37,.075), transparent 33%), radial-gradient(ellipse at 97% 8%, rgba(0,100,224,.11), transparent 36%), radial-gradient(ellipse at 0% 100%, rgba(41,190,62,.045), transparent 30%), radial-gradient(ellipse at 100% 100%, rgba(252,126,36,.045), transparent 30%)"
      }} />
      <div className="mx-auto w-full max-w-[1120px]">
        <div className="mx-auto max-w-4xl text-center">
          <Image src={octalveCloudMark} alt="" width={92} height={92} priority className="mx-auto mb-5 h-12 w-auto object-contain sm:mb-6 sm:h-14 md:h-16" />
          <h1 className="font-normal tracking-[-0.045em] text-white text-[clamp(2rem,4.6vw,4.5rem)] leading-[1.12]">
            <span className="sr-only">Host and grow your business online. Faster, smarter, for less.</span>
            <span aria-hidden="true" className="block [text-wrap:balance]">
              <span className={grow ? "text-[#43D45B]" : "text-[#3188FF]"}>{grow ? "Grow" : "Host"}</span>{" "}Your Business Online
            </span>
            <span aria-hidden="true" className="mt-1 block text-[0.85em] [text-wrap:balance] sm:text-[0.95em]">faster, smarter, for less.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-zinc-300 sm:text-base md:text-lg">
            Register domains, host websites, create business emails and secure your platform with reliable cloud infrastructure built for growing businesses.
          </p>
        </div>
        <HeroDomainSearch />
      </div>
    </section>
  );
}
