import type { Metadata } from "next";
import { CloudComingSoonPage } from "@/features/cloud/pages/CloudComingSoonPage";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Octalve Cloud for hosting, domain and infrastructure support."
};

export default function ContactPage() {
  return (
    <CloudComingSoonPage
      eyebrow="Contact"
      title="Speak with Octalve Cloud support."
      description="This page is prepared for contact options, WhatsApp support and project inquiry flow in the next phase."
    />
  );
}
