"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import octalveCloudMark from "@/assets/logo/octalve-cloud.png";
import { HeroDomainSearch } from "./HeroDomainSearch";

export function Hero() {
  const [grow, setGrow] = useState(false);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let timer: number | undefined;
    function sync() {
      window.clearInterval(timer);
      if (!media.matches && !paused) timer = window.setInterval(() => setGrow(value => !value), 2600);
    }
    sync();
    media.addEventListener("change", sync);
    return () => { window.clearInterval(timer); media.removeEventListener("change", sync); };
  }, [paused]);

  return (
    <section className="relative isolate -mt-4 overflow-hidden bg-black px-4 pb-16 pt-20 text-white sm:px-6 md:pb-24 md:pt-28 lg:pt-32">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10" style={{
        background: "radial-gradient(ellipse at 3% 5%, rgba(230,21,37,.075), transparent 33%), radial-gradient(ellipse at 97% 8%, rgba(0,100,224,.11), transparent 36%), radial-gradient(ellipse at 0% 100%, rgba(41,190,62,.045), transparent 30%), radial-gradient(ellipse at 100% 100%, rgba(252,126,36,.045), transparent 30%)"
      }} />
      <div className="mx-auto max-w-[1120px]">
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
        <HeroDomainSearch paused={paused} />
        <div className="mt-4 text-center">
          <button type="button" onClick={() => setPaused(value => !value)} aria-pressed={paused}
            className="rounded text-xs text-zinc-400 underline-offset-4 hover:text-white hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-400">
            {paused ? "Resume animations" : "Pause animations"}
          </button>
        </div>
      </div>
    </section>
  );
}
