import { CloudShell } from "@/features/cloud/components/CloudShell";
import { Hero } from "./components/Hero";
import { Overview } from "./components/Overview";
import { ContactOptions } from "./components/ContactOptions";
import { FAQ } from "./components/FAQ";
import { CTA } from "./components/CTA";

export function CloudContactPage() {
  return (
    <CloudShell>
      <Hero />
      <Overview />
      <ContactOptions />
      <FAQ />
      <CTA />
    </CloudShell>
  );
}
