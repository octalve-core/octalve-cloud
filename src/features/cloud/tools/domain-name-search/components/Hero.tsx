import { Search } from "lucide-react";
import { ToolHero } from "@/features/cloud/tools/components/ToolHero";

export function Hero() {
  return (
    <ToolHero
      eyebrow="Domain Name Search"
      title="Search your preferred domain name."
      description="Prepare a domain search and continue into the future Octalve Cloud order flow. Registrar availability will connect through the console backend."
      icon={Search}
    />
  );
}
