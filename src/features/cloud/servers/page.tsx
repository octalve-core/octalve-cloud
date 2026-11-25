import { CloudShell } from "@/features/cloud/components/CloudShell";
import { Hero } from "./components/Hero";
import { Overview } from "./components/Overview";
// import { Services } from "./components/Services";
import { Packages } from "./components/Packages";
import { ServiceDomainSearch } from "@/features/cloud/components/ServiceDomainSearch";
import { WhyOctalveCloud } from "./components/WhyOctalveCloud";
import { Migration } from "./components/Migration";
import { FAQ } from "./components/FAQ";
import { CTA } from "@/features/cloud/home/components/CTA";

export function CloudServersPage() {
  return (
    <CloudShell>
      <Hero />
      <Overview />
      {/* <Services /> */}
      <div id="server-plans" className="scroll-mt-32"><Packages /></div>
      <WhyOctalveCloud />
      <ServiceDomainSearch />
      <Migration />
      <FAQ />
      <CTA />
    </CloudShell>
  );
}
