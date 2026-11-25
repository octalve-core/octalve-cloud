import Link from "next/link";
import { ArrowRight, type LucideIcon } from "lucide-react";

type Service = { icon: LucideIcon; title: string; description: string };
type Props = { id: string; label: string; heading: string; description: string; href: string; icon: LucideIcon; services: readonly Service[] };
const accents = ["from-[#D5F1FF] to-[#55C7F7]", "from-[#FFF3CD] to-[#FFB52E]", "from-[#DBFFAA] to-[#29BE3E]", "from-[#FCE0F3] to-[#F29ADC]", "from-[#DCE8FF] to-[#0064E0]", "from-[#FFE0D8] to-[#FC7E24]"];

export function ServiceFeatures({id,label,heading,description,href,icon:SectionIcon,services}:Props) {
 return <section aria-labelledby={id} className="bg-white px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
  <div className="mx-auto grid max-w-7xl gap-3 rounded-[24px] bg-[#F6F7F8] p-3 sm:p-4 lg:grid-cols-[1fr_3fr]">
   <div className="flex min-w-0 flex-col p-5 sm:p-6 lg:p-7">
    <p className="flex items-center gap-2 text-xs font-normal uppercase tracking-[0.12em] text-slate-700"><SectionIcon size={16} strokeWidth={1.6} className="shrink-0 text-cloud-blue" aria-hidden="true"/>{label}</p>
    <h2 id={id} className="mt-5 text-[clamp(1.85rem,2.7vw,2.6rem)] font-normal leading-[1.15] tracking-[-0.045em] text-slate-950">{heading}</h2>
    <p className="mt-4 text-sm leading-6 text-slate-600">{description}</p>
    <div className="mt-6 lg:mt-auto lg:pt-8"><Link href={href} className="inline-flex min-h-11 items-center gap-2 rounded-md text-sm font-medium text-cloud-blue hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cloud-blue">Get Started <ArrowRight size={17} aria-hidden="true"/></Link></div>
   </div>
   <div className="grid min-w-0 grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
    {services.map(({icon:Icon,title,description},i)=><article key={title} className="relative flex min-w-0 flex-col overflow-hidden rounded-2xl bg-white p-5 pb-6 lg:min-h-[180px]">
      <Icon size={23} strokeWidth={1.5} className="shrink-0 text-cloud-blue" aria-hidden="true"/>
      <div className="mt-5 lg:mt-auto lg:pt-5"><h3 className="break-words text-base font-medium tracking-tight text-slate-950">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{description}</p></div>
      <span aria-hidden="true" className={`absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r ${accents[i%accents.length]}`}/>
    </article>)}
   </div>
  </div>
 </section>;
}
