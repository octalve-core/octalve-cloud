import type { Metadata } from "next";
import { CloudComingSoonPage } from "@/features/cloud/pages/CloudComingSoonPage";

export const metadata: Metadata = {
  title: "Domain Registration",
  description: "Register, search and manage domain names with Octalve Cloud."
};

export default function DomainsPage() {
  return (
    <CloudComingSoonPage
      eyebrow="Domain registration"
      title="Find and secure the right name for your business."
      description="This page is prepared for the next build phase. For now, users can continue to the console to search or register a domain."
    />
  );
}
