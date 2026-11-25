import { CloudShell } from "@/features/cloud/components/CloudShell";
import { Hero } from "./components/Hero";
import { HelpOptions } from "./components/HelpOptions";
import { MediaAndNews } from "./components/MediaAndNews";
import { OfficeLocations } from "./components/OfficeLocations";

export function CloudSupportPage() {
  return (
    <CloudShell>
      <Hero />
      <HelpOptions />
      <MediaAndNews />
      <OfficeLocations />
    </CloudShell>
  );
}
