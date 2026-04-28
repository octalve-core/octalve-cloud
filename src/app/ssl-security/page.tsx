import type { Metadata } from "next";
import { CloudComingSoonPage } from "@/features/cloud/pages/CloudComingSoonPage";

export const metadata: Metadata = {
  title: "SSL & Security",
  description: "SSL and website security support for safer online presence."
};

export default function SecurityPage() {
  return (
    <CloudComingSoonPage
      eyebrow="SSL & security"
      title="Secure your website and build visitor trust."
      description="This page is prepared for SSL, HTTPS, website trust and security support details in the next build phase."
    />
  );
}
