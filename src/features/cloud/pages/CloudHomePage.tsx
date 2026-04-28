import { CloudShell } from "@/features/cloud/components/CloudShell";
import { CloudHero } from "@/features/cloud/sections/CloudHero";
import { ServicesPreview } from "@/features/cloud/sections/ServicesPreview";

export function CloudHomePage() {
  return (
    <CloudShell>
      <CloudHero />
      <ServicesPreview />
    </CloudShell>
  );
}
