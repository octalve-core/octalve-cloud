import type { Metadata } from "next";
import { CloudComingSoonPage } from "@/features/cloud/pages/CloudComingSoonPage";

export const metadata: Metadata = {
  title: "Web Hosting",
  description: "Fast and secure web hosting for websites, startups and businesses."
};

export default function HostingPage() {
  return (
    <CloudComingSoonPage
      eyebrow="Web hosting"
      title="Fast, secure hosting for your website and business platform."
      description="This page is prepared for hosting plans, package comparison, features and ordering links in the next phase."
    />
  );
}
