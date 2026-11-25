import { Zap, Gauge, Server, TrendingUp, Headset } from "lucide-react";

const features = [
  { icon: Gauge, title: "Built for speed", description: "Performance-focused hosting helps your pages load smoothly and gives visitors a better experience." },
  { icon: Server, title: "Dependable hosting", description: "Choose a hosting foundation with resources suited to your website and its everyday traffic." },
  { icon: TrendingUp, title: "Room to grow", description: "Explore hosting plans that can grow with your content, customers and business needs." },
  { icon: Headset, title: "Support when you need it", description: "Get guidance choosing and managing the right hosting solution for your business." },
];

export function Performance() {
  return (
    <section aria-labelledby="hosting-performance-title" className="bg-white px-4 py-16 text-slate-950 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="flex items-center justify-center gap-2 text-xs font-medium uppercase tracking-[.16em] text-slate-700"><Zap size={16} className="text-cloud-blue" aria-hidden="true" /> Performance</p>
          <h2 id="hosting-performance-title" className="mt-5 text-[clamp(2rem,3.6vw,3rem)] font-normal leading-tight tracking-[-0.045em]">Fast websites. Better experiences.</h2>
          <p className="mt-5 text-base leading-7 text-slate-600">Give your customers a smoother online experience while you focus on growing your business.</p>
        </div>
        <div className="mt-10 grid grid-cols-1 overflow-hidden rounded-[24px] border border-slate-200 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(({icon: Icon,title,description},i)=><article key={title} className={`flex min-w-0 flex-col p-6 sm:p-7 lg:min-h-[270px] ${i>0?"border-t border-slate-200":""} ${i%2===1?"sm:border-l sm:border-t-0":""} ${i===2?"sm:border-t":""} ${i>0?"lg:border-l lg:border-t-0":""}`}>
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-cloud-blue text-white"><Icon size={20} strokeWidth={1.6} aria-hidden="true"/></span>
            <div className="mt-8 lg:mt-auto"><h3 className="text-lg font-medium tracking-tight">{title}</h3><p className="mt-3 text-base leading-6 text-slate-600">{description}</p></div>
          </article>)}
        </div>
      </div>
    </section>
  );
}
