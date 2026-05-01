import { FileCheck2 } from "lucide-react";
import { ToolHero } from "@/features/cloud/tools/components/ToolHero";

export function Hero() {
  return (
    <ToolHero
      eyebrow="Privacy Policy Generator"
      title="Create a starter privacy policy for your website."
      description="Generate a clean editable privacy policy template for a business website. Review with a qualified professional before publishing."
      icon={FileCheck2}
    />
  );
}
