import type { Metadata } from "next";
import { CloudComingSoonPage } from "@/features/cloud/pages/CloudComingSoonPage";

export const metadata: Metadata = {
  title: "Website Migration",
  description: "Move your website, email and hosting setup to Octalve Cloud."
};

export default function MigrationPage() {
  return (
    <CloudComingSoonPage
      eyebrow="Website migration"
      title="Move your website to Octalve Cloud without stress."
      description="This page is prepared for migration process, requirements, support options and request form in the next phase."
    />
  );
}
