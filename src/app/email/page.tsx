import type { Metadata } from "next";
import { CloudComingSoonPage } from "@/features/cloud/pages/CloudComingSoonPage";

export const metadata: Metadata = {
  title: "Business Email",
  description: "Professional domain-based email hosting for businesses and teams."
};

export default function EmailPage() {
  return (
    <CloudComingSoonPage
      eyebrow="Business email"
      title="Professional email that carries your business name."
      description="This page is prepared for business email benefits, plans, setup guidance and support flow in the next phase."
    />
  );
}
