import { FileText } from "lucide-react";
import { ToolHero } from "@/features/cloud/tools/components/ToolHero";

export function Hero() {
  return (
    <ToolHero
      eyebrow="Terms of Service Generator"
      title="Generate starter terms for your website or service."
      description="Create a clean editable terms template for a website, online service or digital business. Review before publishing."
      icon={FileText}
    />
  );
}
