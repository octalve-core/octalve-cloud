import Image from "next/image";
import Link from "next/link";
import { LockKeyhole, ShieldCheck, Fingerprint, KeyRound, ArrowRight } from "lucide-react";
import sslSecurityVisual from "@/assets/sections/ssl-security-visual.png";

const features = [
  {icon:LockKeyhole,title:"Safer connections",description:"Explore SSL options to encrypt information shared between your website and its visitors.",accent:"bg-[#0064E0]"},
  {icon:ShieldCheck,title:"Malware awareness",description:"Get guidance on detecting suspicious files and reducing common website security risks.",accent:"bg-[#FC7E24]"},
  {icon:Fingerprint,title:"Domain privacy",description:"Reduce public exposure of registration details where your domain extension supports privacy.",accent:"bg-[#29BE3E]"},
  {icon:KeyRound,title:"Stronger access",description:"Protect your website with safer account access, DNS configuration and security practices.",accent:"bg-[#E61525]"},
];

export function SSL(){
 return <section aria-labelledby="hosting-security-title" className="bg-white px-4 py-16 text-slate-950 sm:px-6 lg:px-8 lg:py-24">
  <div className="mx-auto max-w-7xl">
   <div className="mx-auto max-w-3xl text-center">
    <p className="text-xs font-medium uppercase tracking-[.16em] text-cloud-blue">SSL &amp; Security</p>
    <h2 id="hosting-security-title" className="mt-5 text-[clamp(2rem,3.6vw,3rem)] font-normal leading-tight tracking-[-0.045em]">Build trust into every visit.</h2>
    <p className="mt-5 text-base leading-7 text-slate-600">Help keep your website, customers and business information protected with the right security tools.</p>
   </div>
   <div className="mt-10 overflow-hidden rounded-[24px] border border-slate-200">
    <div className="overflow-hidden bg-[#F46D35]">
     <Image src={sslSecurityVisual} alt="Octalve Cloud SSL and website security illustration" sizes="(min-width: 1344px) 1280px, (min-width: 1024px) calc(100vw - 64px), (min-width: 640px) calc(100vw - 48px), calc(100vw - 32px)" className="block h-auto w-full object-cover"/>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
     {features.map(({icon:Icon,title,description,accent},i)=><article key={title} className={`relative flex min-w-0 flex-col p-6 pb-8 sm:p-7 sm:pb-8 ${i>0?"border-t border-slate-200":""} ${i%2===1?"sm:border-l sm:border-t-0":""} ${i===2?"sm:border-t":""} ${i>0?"lg:border-l lg:border-t-0":""}`}>
       <Icon size={25} strokeWidth={1.5} className="text-cloud-blue" aria-hidden="true"/>
       <h3 className="mt-8 text-lg font-medium tracking-tight">{title}</h3><p className="mt-3 text-base leading-6 text-slate-600">{description}</p><span aria-hidden="true" className={`absolute inset-x-0 bottom-0 h-1 opacity-65 ${accent}`}/>
     </article>)}
    </div>
   </div>
   <div className="mt-7 text-center"><Link href="/ssl-security/" className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-cloud-blue px-5 text-sm font-medium text-cloud-blue hover:bg-blue-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cloud-blue">Explore SSL &amp; security <ArrowRight size={16} aria-hidden="true"/></Link></div>
  </div>
 </section>;
}
