import Link from "next/link";
import { BookOpen, LifeBuoy, Server } from "lucide-react";

const options=[
 {title:"Knowledge base",detail:"Step-by-step guides for domains, DNS and hosting, published by the Octalve Cloud team.",href:"/knowledge-base",label:"Explore guides",icon:BookOpen},
 {title:"Customer support",detail:"Already have an Octalve account? Send a private ticket and follow responses from your Console.",href:"https://console.cloud.octalve.com/client/support",label:"Open support",icon:LifeBuoy},
 {title:"Hosting and setup",detail:"View our published hosting plans and choose an option for your business. Availability is confirmed before activation.",href:"/hosting",label:"View hosting",icon:Server},
];
export function Packages(){
 return <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
   <div className="mx-auto max-w-7xl">
     <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#0064E0]">Support options</p>
     <h2 className="mt-3 max-w-3xl text-3xl font-bold tracking-tight text-[#001426] sm:text-4xl">Find help that fits your question.</h2>
     <div className="mt-9 grid gap-5 md:grid-cols-3">{options.map(item=>{
       const Icon=item.icon;
       return <article key={item.title} className="flex flex-col rounded-[24px] border border-slate-200 bg-[#F8FAFC] p-6 shadow-sm">
         <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EAF3FF] text-[#0064E0]"><Icon className="h-6 w-6"/></span>
         <h3 className="mt-5 text-xl font-bold text-slate-950">{item.title}</h3>
         <p className="mt-3 flex-1 text-sm leading-7 text-slate-600">{item.detail}</p>
         <Link href={item.href} className="mt-6 inline-flex items-center justify-center rounded-xl bg-[#0064E0] px-5 py-3 text-sm font-bold text-white hover:bg-[#0052B8]">{item.label}</Link>
       </article>
     })}</div>
   </div>
 </section>;
}
