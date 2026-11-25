import Link from "next/link";
import { Server, Boxes, Layers3, Headset, ArrowRight } from "lucide-react";

const features = [
  { icon: Boxes, title: "Build and deploy", description: "Run websites, applications, APIs and business platforms on VPS infrastructure." },
  { icon: Server, title: "Resources that fit", description: "Choose compute, memory and storage suited to your workload." },
  { icon: Layers3, title: "Room to grow", description: "Explore upgrade options as your traffic and business needs expand." },
  { icon: Headset, title: "Guidance when needed", description: "Get help choosing server options and planning your setup." },
];

export function Overview() {
  return (
    <section aria-labelledby="server-overview-title" className="bg-white px-4 py-16 text-slate-950 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="flex items-center justify-center gap-2 text-xs font-medium uppercase tracking-[.16em] text-slate-700"><Server size={16} className="text-cloud-blue" aria-hidden="true" /> Cloud servers</p>
          <h2 id="server-overview-title" className="mt-5 text-[clamp(2rem,3.6vw,3rem)] font-normal leading-tight tracking-[-0.045em]">More control. More room to grow.</h2>
          <p className="mt-5 text-base leading-7 text-slate-600">Power your next project with server resources that fit your business today and support your plans for tomorrow.</p>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-[24px] border border-slate-200 bg-slate-200 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(({icon: Icon,title,description})=><article key={title} className="flex min-w-0 flex-col bg-white p-6 sm:p-7 lg:min-h-[250px]">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-cloud-blue text-white"><Icon size={20} strokeWidth={1.6} aria-hidden="true"/></span>
            <div className="mt-8 lg:mt-auto"><h3 className="text-lg font-medium tracking-tight">{title}</h3><p className="mt-3 text-base leading-6 text-slate-600">{description}</p></div>
          </article>)}
        </div>
        <div className="mt-6 text-center"><Link href="#server-plans" className="inline-flex min-h-11 items-center gap-2 rounded-md text-sm font-medium text-cloud-blue hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cloud-blue">Explore server plans <ArrowRight size={16} aria-hidden="true"/></Link></div>
      </div>
    </section>
  );
}
