import { GetStarted } from "@/features/cloud/components/GetStarted";

export function CTA() {
  return (
    <GetStarted
      eyebrow="Start with Octalve Cloud"
      title="Let’s start building your online presence today."
      description="From domain registration to hosting, SSL, business email, and migration support, Octalve Cloud gives your business the foundation to launch online and grow without technical confusion."
      primaryLabel="Get started"
      primaryHref="https://console.octalve.cloud"
      secondaryLabel="Contact sales"
      secondaryHref="/contact"
    />
  );
}
