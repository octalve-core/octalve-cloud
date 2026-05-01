import { Sparkles } from "lucide-react";
import { ToolHero } from "@/features/cloud/tools/components/ToolHero";

export function Hero() {
  return (
    <ToolHero
      eyebrow="AI Domain Name Generator"
      title="Generate brandable domain names in seconds."
      description="Enter your business idea, industry and preferred extension. The frontend generates instant ideas now, while the backend API contract is ready for the future console infrastructure."
      icon={Sparkles}
    />
  );
}
