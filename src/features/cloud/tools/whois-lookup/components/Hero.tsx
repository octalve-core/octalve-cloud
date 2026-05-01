import { Globe2 } from "lucide-react";
import { ToolHero } from "@/features/cloud/tools/components/ToolHero";

export function Hero() {
  return (
    <ToolHero
      eyebrow="WHOIS Lookup"
      title="Look up public domain registration information."
      description="Prepare WHOIS/RDAP lookup requests for a domain. Live registry data will be connected through the Octalve Cloud backend."
      icon={Globe2}
    />
  );
}
