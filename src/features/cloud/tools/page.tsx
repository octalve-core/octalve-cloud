import {FileCheck2,FileText,Globe2,Search,ShieldCheck,Sparkles,Scale} from "lucide-react";
import {CloudShell} from "@/features/cloud/components/CloudShell";
import {ToolCard} from "./components/ToolCard";
// import {ToolCTA} from "./components/ToolCTA";

const groups=[
 {title:"Domain tools",description:"Find the right name and research before you register.",tools:[
 {title:"Domain Name Search",description:"Check domain availability and explore registration prices across supported extensions.",href:"/tools/domain-name-search/",icon:Search,accent:"violet"},
 {title:"AI Domain Name Generator",description:"Discover ideas for your business and check available domain names.",href:"/tools/ai-domain-name-generator/",icon:Sparkles,accent:"orange"},
 {title:"WHOIS Lookup",description:"Explore public registration records, registrar details and nameservers.",href:"/tools/whois-lookup/",icon:Globe2,accent:"teal"},
 {title:"Compare Domain Sellers",description:"Compare domain seller services before choosing where to register.",href:"/tools/compare-domain-sellers/",icon:Scale,accent:"blue"},
 ]},
 {title:"Website essentials",description:"Prepare policies and explore security checks for your website.",tools:[
 {title:"Privacy Policy Generator",description:"Create a starter privacy policy draft for review before publishing.",href:"/tools/privacy-policy-generator/",icon:FileCheck2,accent:"green"},
 {title:"Terms of Service Generator",description:"Prepare a starter terms of service draft for your website or business.",href:"/tools/terms-of-service-generator/",icon:FileText,accent:"orange"},
 {title:"Malware & Hack Check",description:"Prepare a website security scan request and learn about suspicious website activity.",href:"/tools/malware-scan/",icon:ShieldCheck,accent:"red"},
 ]},
] as const;
export function CloudToolsPage(){return <CloudShell>
 <div className="-mt-4 min-h-[70vh] bg-black px-4 pb-20 pt-24 text-white sm:px-6 lg:px-8 lg:pb-28 lg:pt-32">
 <div className="mx-auto max-w-7xl">
 <header className="mx-auto max-w-3xl text-center"><p className="text-xs font-medium uppercase tracking-[.18em] text-violet-300">Octalve Cloud Tools</p><h1 className="mt-5 text-[clamp(2.5rem,5vw,4.5rem)] font-normal leading-[1.1] tracking-[-.045em]">Your next move starts here.</h1><p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-zinc-300">Find a domain, prepare website policies and explore security tools. Everything you need to take the next step online.</p></header>
 <div className="mt-14 space-y-12 lg:mt-16">{groups.map(group=><section key={group.title} aria-label={group.title}><h2 className="text-2xl font-normal tracking-tight">{group.title}</h2><p className="mt-2 text-sm leading-6 text-zinc-400">{group.description}</p><div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">{group.tools.map(tool=><ToolCard key={tool.href} {...tool}/>)}</div></section>)}</div>
 </div></div>
 {/* <ToolCTA /> */}
 </CloudShell>}
