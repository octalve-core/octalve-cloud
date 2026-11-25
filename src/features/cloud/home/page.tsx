import { CloudShell } from "@/features/cloud/components/CloudShell";
import { Hero } from "./components/Hero";
import { WhyOctalveCloudBenefits } from "./components/WhyOctalveCloudBenefits";
// import { Services } from "./components/Services";
import { Packages } from "./components/Packages";
// import { DomainSearch } from "./components/DomainSearch";
// import { WhyOctalveCloud } from "./components/WhyOctalveCloud";
import { Migration } from "./components/Migration";
import { FAQ } from "./components/FAQ";
import { CTA } from "./components/CTA";

export function CloudHomePage() {
  return (
    <CloudShell>
      <Hero />
      {/* <Services /> */}
      <Packages />
      <WhyOctalveCloudBenefits />
      {/* <DomainSearch /> */}
      {/* <WhyOctalveCloud /> */}
      <Migration />
      <FAQ />
      <CTA />
    </CloudShell>
  );
}
