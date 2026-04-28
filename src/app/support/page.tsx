import type { Metadata } from "next";
import { CloudComingSoonPage } from "@/features/cloud/pages/CloudComingSoonPage";

export const metadata: Metadata = {
  title: "Support",
  description: "Get help with domains, hosting, email, SSL and cloud infrastructure."
};

export default function SupportPage() {
  return (
    <CloudComingSoonPage
      eyebrow="Support"
      title="Get guided support for your cloud services."
      description="This page is prepared for support cards, ticket links, WhatsApp support and client console guidance in the next phase."
    />
  );
}
