import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Globe2, Mail, Server } from "lucide-react";
import migrationVisual from "@/assets/sections/cloud-migration-visual.png";

export function SharedMigration({dark=false,detail=false}:{dark?:boolean;detail?:boolean}){
 return <section className={`px-4 py-16 sm:px-6 lg:px-8 lg:py-24 ${dark?"bg-black text-white":"bg-white text-slate-950"}`} aria-label="Website migration">
  <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
   <div className="min-w-0 max-w-xl">
    <p className={`inline-flex rounded-md px-2.5 py-1 text-sm ${dark?"bg-emerald-400/10 text-emerald-300":"bg-emerald-50 text-emerald-800"}`}>Website migration</p>
    <h2 className="mt-5 text-[clamp(2rem,3.6vw,3rem)] font-normal leading-[1.16] tracking-[-0.045em]">A better home for your website.</h2>
    <p className={`mt-5 text-base leading-7 ${dark?"text-zinc-300":"text-slate-700"}`}>Ready to switch hosting providers? Let our team help you plan the move of your website, domain and business email, so you can focus on running your business.</p>
    <Link href={detail?"/contact/":"/migration/"} className={`mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border px-7 text-sm font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cloud-blue ${dark?"border-blue-400 text-blue-300 hover:bg-blue-400/10":"border-cloud-blue text-cloud-blue hover:bg-blue-50"}`}>{detail?"Request migration":"Explore migration"}<ArrowRight size={16} aria-hidden="true"/></Link>
    <p className={`mt-3 text-xs leading-5 ${dark?"text-zinc-400":"text-slate-600"}`}>Migration scope and costs are confirmed before work begins.</p>
    <div className="mt-6 flex flex-wrap items-center gap-3 text-xs">
     <span className={dark?"text-zinc-400":"text-slate-600"}>Get help with:</span>
     {[{icon:Globe2,label:"Domains"},{icon:Server,label:"Websites"},{icon:Mail,label:"Email"}].map(({icon:Icon,label})=><span key={label} className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-2 ${dark?"bg-white/10 text-zinc-200":"bg-slate-100 text-slate-700"}`}><Icon size={16} className={dark?"text-blue-300":"text-cloud-blue"} aria-hidden="true"/>{label}</span>)}
    </div>
   </div>
   <div className="min-w-0 overflow-hidden rounded-2xl bg-[#000A16] p-4 sm:p-6">
    <Image src={migrationVisual} alt="Octalve Cloud guided website migration illustration" sizes="(min-width: 1024px) 50vw, 100vw" className="h-auto w-full object-contain"/>
   </div>
  </div>
 </section>;
}
