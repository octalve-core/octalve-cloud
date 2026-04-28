import type { Metadata } from "next";
import { CloudComingSoonPage } from "@/features/cloud/pages/CloudComingSoonPage";

export const metadata: Metadata = {
  title: "Cloud Servers",
  description: "Cloud server and VPS infrastructure for apps, portals and growing products."
};

export default function ServersPage() {
  return (
    <CloudComingSoonPage
      eyebrow="Cloud servers"
      title="Server infrastructure for growing digital products."
      description="This page is prepared for VPS, cloud server use cases, managed support and request-a-quote flow in the next phase."
    />
  );
}
