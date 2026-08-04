import { CloudShell } from "@/features/cloud/components/CloudShell";
import { Hero } from "./components/Hero";
// import { Overview } from "./components/Overview";
// import { Services } from "./components/Services";
import { Packages } from "./components/Packages";
import { DomainSearch } from "./components/DomainSearch";

import { Migration } from "./components/Migration";
import { FAQ } from "./components/FAQ";
import { CTA } from "./components/CTA";
import { SSL } from "./components/ssl";
import { Performance } from "./components/performance";

export function CloudHostingPage() {
  return (
    <CloudShell>
      <Hero />
      {/* <Overview /> */}
      {/* <Services /> */}
      <Packages />
      <DomainSearch />
      <SSL />
      <Performance />
      {/* <WhyOctalveCloud /> */}
      <Migration />
      <FAQ />
      <CTA />
    </CloudShell>
  );
}
