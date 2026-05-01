import { CloudShell } from "@/features/cloud/components/CloudShell";
import { ToolCTA } from "@/features/cloud/tools/components/ToolCTA";
import { Hero } from "./components/Hero";
import { ToolPanel } from "./components/ToolPanel";
import { FAQ } from "./components/FAQ";

export function DomainNameSearchPage() {
  return (
    <CloudShell>
      <Hero />
      <ToolPanel />
      <FAQ />
      <ToolCTA />
    </CloudShell>
  );
}
