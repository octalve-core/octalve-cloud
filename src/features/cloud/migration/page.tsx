import { CloudShell } from "@/features/cloud/components/CloudShell";
import { Hero } from "./components/Hero";
import { Overview } from "./components/Overview";
import { Services } from "./components/Services";
import { Packages } from "./components/Packages";
import { DomainSearch } from "./components/DomainSearch";
import { WhyOctalveCloud } from "./components/WhyOctalveCloud";
import { Migration } from "./components/Migration";
import { FAQ } from "./components/FAQ";
import { CTA } from "./components/CTA";

export function CloudMigrationPage() {
  return (
    <CloudShell>
      <Hero />
      <Overview />
      <Services />
      <Packages />
      <DomainSearch />
      <WhyOctalveCloud />
      <Migration />
      <FAQ />
      <CTA />
    </CloudShell>
  );
}
