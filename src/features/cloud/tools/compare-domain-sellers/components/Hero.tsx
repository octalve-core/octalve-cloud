import { Scale } from "lucide-react";
import { ToolHero } from "@/features/cloud/tools/components/ToolHero";

export function Hero() {
  return (
    <ToolHero
      eyebrow="Compare Domain Sellers"
      title="Compare sellers before you buy a domain."
      description="See how Octalve Cloud compares with global domain sellers when local guidance, payment support and setup help matter."
      icon={Scale}
    />
  );
}
