import Image,{type StaticImageData} from "next/image";
import Link from "next/link";
import {ArrowRight,Headset,CheckCircle2} from "lucide-react";

const accents={
 blue:{text:"text-[#0064E0]",button:"bg-[#0064E0] hover:bg-[#0054BE] text-white",frame:"from-[#A9C9FA] to-[#E2EBF4]"},
 green:{text:"text-[#147B36]",button:"bg-[#147B36] hover:bg-[#10672D] text-white",frame:"from-[#A4D9B1] to-[#E6EFE4]"},
 orange:{text:"text-[#B84B08]",button:"bg-[#B84B08] hover:bg-[#983B06] text-white",frame:"from-[#F5B58F] to-[#F1E9D9]"},
 red:{text:"text-[#D31328]",button:"bg-[#D31328] hover:bg-[#B41022] text-white",frame:"from-[#F4A8A6] to-[#F1E3D8]"},
} as const;
type Props={service:string;headline:string;highlight:string;ending?:string;subtitle:string;description:string;accent:keyof typeof accents;image:StaticImageData;imageAlt:string;primaryLabel:string;primaryHref:string;supportLabel?:string;trust:string};
export function ServiceHero({service,headline,highlight,ending,subtitle,description,accent,image,imageAlt,primaryLabel,primaryHref,supportLabel="Talk to our team",trust}:Props){
 const a=accents[accent];
 const focus="focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cloud-blue";
 return <section aria-label={service} className="-mt-4 bg-[#F5F5F3] px-4 pb-14 pt-20 text-cloud-navy sm:px-6 lg:px-8 lg:pb-24 lg:pt-28">
  <div className="mx-auto grid max-w-[1280px] items-center gap-10 lg:grid-cols-[0.94fr_1.06fr] lg:gap-10 xl:gap-14">
   <div className="min-w-0 max-w-[620px]">
    <p className={`mb-4 text-sm font-medium ${a.text}`}>{service}</p>
    <h1 className="text-[clamp(2.4rem,4.2vw,4.25rem)] font-normal leading-[1.09] tracking-[-0.05em] [text-wrap:balance]">{headline} <span className={a.text}>{highlight}</span>{ending&&" "+ending}</h1>
    <p className="mt-6 text-xl font-normal leading-snug text-slate-700 sm:text-2xl">{subtitle}</p>
    <p className="mt-5 max-w-xl text-base leading-[1.9] text-slate-600 sm:text-lg">{description}</p>
    <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
     <Link href={primaryHref} className={`inline-flex min-h-14 items-center justify-center gap-3 rounded-full px-6 py-3 text-sm font-medium ${a.button} ${focus}`}>{primaryLabel}<ArrowRight size={17} aria-hidden="true"/></Link>
     <Link href="/contact" className={`inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-black px-6 py-3 text-sm font-medium text-white hover:bg-slate-800 ${focus}`}>{supportLabel}<span className="grid h-8 w-8 place-items-center rounded-full bg-white/10"><ArrowRight size={15} aria-hidden="true"/></span></Link>
    </div>
    <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-slate-700"><span className="inline-flex items-center gap-2"><CheckCircle2 size={17} className="shrink-0 text-green-700" aria-hidden="true"/>{trust}</span><Link href="/support" className={`inline-flex items-center gap-2 hover:underline ${focus}`}><Headset size={17} aria-hidden="true"/>Human support</Link></div>
   </div>
   <div className={`min-w-0 rounded-[28px] bg-gradient-to-br p-3 shadow-[0_25px_65px_rgba(15,23,42,0.08)] sm:rounded-[36px] sm:p-5 ${a.frame}`}>
    <div className="overflow-hidden rounded-[20px] border border-black/10 bg-[#F8FAFC] sm:rounded-[28px]">
     <div aria-hidden="true" className="flex h-10 items-center gap-2 border-b border-slate-200 bg-[#F0F1F3] px-4"><span className="h-2.5 w-2.5 rounded-full bg-red-400"/><span className="h-2.5 w-2.5 rounded-full bg-amber-400"/><span className="h-2.5 w-2.5 rounded-full bg-green-400"/><span className="ml-3 h-2.5 w-28 rounded-full bg-slate-200 sm:w-40"/></div>
     <div className="p-3 sm:p-5"><Image src={image} alt={imageAlt} priority sizes="(min-width: 1024px) 48vw, 100vw" className="h-auto w-full rounded-sm object-contain"/></div>
     <div aria-hidden="true" className="grid h-1.5 grid-cols-4"><span className="bg-[#FC7E24]"/><span className="bg-[#29BE3E]"/><span className="bg-[#E61525]"/><span className="bg-[#0064E0]"/></div>
    </div>
   </div>
  </div>
 </section>
}
