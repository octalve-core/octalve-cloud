import { GetStarted } from "@/features/cloud/components/GetStarted";
import { cloudLinks } from "@/features/cloud/data/cloud-links";

export function CTA() {
  return (
    <GetStarted
      eyebrow="Your next move"
      title="Build online. Grow your business."
      description="Domains, hosting and business email. One place to get started."
      primaryLabel="Get started"
      primaryHref={cloudLinks.console}
      secondaryLabel="Talk to sales"
      secondaryHref="/contact"
    />
  );
}
