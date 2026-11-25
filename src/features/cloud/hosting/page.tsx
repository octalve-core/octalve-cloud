import { CloudShell } from "@/features/cloud/components/CloudShell";
import { Hero } from "./components/Hero";
// import { Overview } from "./components/Overview";
// import { Services } from "./components/Services";
import { Packages } from "./components/Packages";
import { ServiceDomainSearch } from "@/features/cloud/components/ServiceDomainSearch";

import { Migration } from "./components/Migration";
import { FAQ } from "./components/FAQ";
import { CTA } from "@/features/cloud/home/components/CTA";
import { SSL } from "./components/ssl";
import { Performance } from "./components/performance";

export function CloudHostingPage() {
  return (
    <CloudShell>
      <Hero />
      {/* <Overview /> */}
      {/* <Services /> */}
      <div id="hosting-plans" className="scroll-mt-32"><Packages /></div>
      <ServiceDomainSearch />
      <SSL />
      <Performance />
      {/* <WhyOctalveCloud /> */}
      <Migration />
      <FAQ />
      <CTA />
    </CloudShell>
  );
}
