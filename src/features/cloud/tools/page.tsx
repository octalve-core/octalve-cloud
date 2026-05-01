import {
  FileCheck2,
  FileText,
  Globe2,
  Search,
  ShieldCheck,
  Sparkles,
  Scale,
} from "lucide-react";
import { CloudShell } from "@/features/cloud/components/CloudShell";
import { ToolCard } from "@/features/cloud/tools/components/ToolCard";
import { ToolCTA } from "@/features/cloud/tools/components/ToolCTA";

const tools = [
  {
    title: "AI Domain Name Generator",
    description: "Generate clean domain name ideas for a business, brand, product, school, NGO or startup.",
    href: "/tools/ai-domain-name-generator",
    icon: Sparkles,
  },
  {
    title: "Privacy Policy Generator",
    description: "Create a starter privacy policy template for your website before your legal review.",
    href: "/tools/privacy-policy-generator",
    icon: FileCheck2,
  },
  {
    title: "Terms of Service Generator",
    description: "Create simple starter terms for your website, product or online service.",
    href: "/tools/terms-of-service-generator",
    icon: FileText,
  },
  {
    title: "Domain Name Search",
    description: "Prepare a domain search and connect it to the Octalve Cloud order flow.",
    href: "/tools/domain-name-search",
    icon: Search,
  },
  {
    title: "WHOIS Lookup",
    description: "Check public registration information and ownership signals for a domain.",
    href: "/tools/whois-lookup",
    icon: Globe2,
  },
  {
    title: "Compare Domain Sellers",
    description: "Compare popular domain sellers against Octalve Cloud’s guided local support advantage.",
    href: "/tools/compare-domain-sellers",
    icon: Scale,
  },
  {
    title: "Malware & Hack Check",
    description: "Prepare a website security scan request for malware, suspicious redirects and hacked-site signals.",
    href: "/tools/malware-scan",
    icon: ShieldCheck,
  },
];

export function CloudToolsPage() {
  return (
    <CloudShell>
      <section className="bg-[#F8FAFC] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cloud-blue">
              Octalve Cloud Tools
            </p>
            <h1 className="mt-4 text-4xl font-medium tracking-[-0.055em] text-slate-950 sm:text-5xl lg:text-6xl">
              Free tools to plan, secure and launch your business online.
            </h1>
            <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-slate-500 sm:text-lg">
              Start with domain ideas, policy templates, WHOIS checks, seller comparisons and security checks — then continue inside the Octalve Cloud console when ready.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {tools.map((tool) => (
              <ToolCard key={tool.href} {...tool} />
            ))}
          </div>
        </div>
      </section>
      <ToolCTA />
    </CloudShell>
  );
}
