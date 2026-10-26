"use client";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { CheckCircle2, Globe2, RefreshCcw, ShieldCheck } from "lucide-react";

type Cycle = { key: string; months: number; label: string; total_price: string; regular_price: string | null; setup_fee: string; is_default: boolean };
type Plan = { id: number; name: string; description: string; product_name: string; product_type: string;
  currency: string; features: string[]; is_popular: boolean; billing_cycles: Cycle[] };
type ResponseShape = { plans: Plan[] };
export type PlanCategory = "all" | "hosting" | "email" | "vps" | "security" | "migration";
const API = "https://api.cloud.octalve.com/api/storefront/plans/";
const CONSOLE = "https://console.cloud.octalve.com";
const KINDS: Record<PlanCategory, string[]> = {
  all: [], hosting: ["shared_hosting", "wordpress_hosting"], email: ["email"],
  vps: ["vps", "dedicated"], security: ["ssl", "backup"], migration: ["migration"]
};
const periodLabel: Record<string,string> = {"1mo":"Monthly","3mo":"Quarterly","6mo":"Every 6 months","12mo":"Annually","24mo":"Every 2 years","36mo":"Every 3 years","once":"One-time"};
function money(value: string | number, currency: string) {
  const amount = Number(value);
  if (!Number.isFinite(amount) || amount < 0) return "Price unavailable";
  return new Intl.NumberFormat(currency==="NGN"?"en-NG":"en-US",{
    style:"currency",currency:currency==="NGN"?"NGN":currency==="USD"?"USD":"NGN",
    maximumFractionDigits:2
  }).format(amount);
}

export function PublishedPlanCards({ category = "all" }: { category?: PlanCategory }) {
  const [plans,setPlans]=useState<Plan[]>([]);
  const [loading,setLoading]=useState(true),[error,setError]=useState("");
  const [selectedCategory,setSelectedCategory]=useState<PlanCategory>(category);
  const [cycles,setCycles]=useState<Record<number,string>>({});
  useEffect(()=>{
    const abort=new AbortController();
    fetch(API,{signal:abort.signal,credentials:"omit",cache:"no-store"})
      .then(async r=>{if(!r.ok)throw Error("catalog unavailable");return await r.json() as ResponseShape})
      .then(data=>{if(!abort.signal.aborted)setPlans(Array.isArray(data.plans)?data.plans:[])})
      .catch(()=>{if(!abort.signal.aborted)setError("Our latest plans are temporarily unavailable. No prices or orders have been changed.")})
      .finally(()=>{if(!abort.signal.aborted)setLoading(false)});
    return()=>abort.abort();
  },[]);
  const shown=useMemo(()=>plans.filter(p=>selectedCategory==="all"||KINDS[selectedCategory].includes(p.product_type)),[plans,selectedCategory]);
  const tabs = (["all","hosting","email","vps","security","migration"] as const);
  return <section className="bg-white px-4 py-16 sm:px-6 lg:px-8 lg:py-24" aria-label="Published Cloud plans">
    <div className="mx-auto max-w-7xl">
      <div className="mx-auto max-w-3xl text-center">
        <span className="text-xs font-bold uppercase tracking-[0.23em] text-[#0064E0]">Octalve Cloud packages</span>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#071A33] sm:text-4xl">Find the right plan for what comes next.</h2>
        <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">Transparent features and pricing, published by Octalve Cloud and kept consistent through checkout.</p>
      </div>
      {category==="all"&&<div className="mt-8 flex flex-wrap justify-center gap-2" role="group" aria-label="Service categories">
        {tabs.map(tab=><button key={tab} onClick={()=>setSelectedCategory(tab)} type="button" aria-pressed={selectedCategory===tab}
          className={`rounded-xl px-4 py-2.5 text-sm font-semibold capitalize transition ${selectedCategory===tab?"bg-[#0064E0] text-white":"bg-[#F1F5F9] text-slate-600 hover:bg-blue-50"}`}>{tab==="all"?"All packages":tab}</button>)}
      </div>}
      {loading&&<div role="status" className="mt-8 rounded-2xl border border-slate-200 bg-[#F8FAFC] p-8 text-center text-sm text-slate-600">Loading current published packages…</div>}
      {error&&<div role="alert" className="mt-8 rounded-2xl border border-rose-100 bg-rose-50 p-8 text-center text-sm text-rose-700">{error}</div>}
      {!loading&&!error&&shown.length===0&&<div className="mx-auto mt-10 max-w-2xl rounded-2xl border border-slate-200 bg-[#F8FAFC] p-8 text-center">
        <Globe2 className="mx-auto h-9 w-9 text-[#0064E0]" />
        <h3 className="mt-3 text-lg font-semibold text-[#10233A]">We're preparing these packages.</h3>
        <p className="mt-2 text-sm leading-6 text-slate-600">Only published, verified offers appear here. Contact our team for a package tailored to your needs.</p>
        <Link href="/support" className="mt-5 inline-flex rounded-xl bg-[#0064E0] px-5 py-3 text-sm font-semibold text-white">Talk to our team</Link>
      </div>}
      {!loading&&!error&&<div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {shown.map(plan=>{
          const selected=plan.billing_cycles.find(c=>c.key===cycles[plan.id])||
            plan.billing_cycles.find(c=>c.is_default)||plan.billing_cycles[0];
          if(!selected)return null;
          const discount=selected.regular_price&&Number(selected.regular_price)>Number(selected.total_price)
            ?Math.round((1-Number(selected.total_price)/Number(selected.regular_price))*100):0;
          const url=`${CONSOLE}/client/order?plan=${encodeURIComponent(String(plan.id))}&cycle=${encodeURIComponent(selected.key)}`;
          return <article key={plan.id} className={`relative flex flex-col overflow-hidden rounded-3xl border bg-white p-6 shadow-[0_16px_50px_rgba(4,29,59,.045)] ${plan.is_popular?"border-[#0064E0]":"border-slate-200"}`}>
            {plan.is_popular&&<div className="-mx-6 -mt-6 mb-5 bg-[#0064E0] px-5 py-3 text-center text-xs font-bold uppercase tracking-widest text-white">Popular choice</div>}
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#0064E0]">{plan.product_name}</span>
            <h3 className="mt-2 text-2xl font-bold tracking-tight text-[#071A33]">{plan.name}</h3>
            <p className="mt-3 min-h-16 text-sm leading-6 text-slate-500">{plan.description}</p>
            <div className="mt-4 border-t border-slate-100 pt-5">
              <p className="text-xs font-medium text-slate-500">{periodLabel[selected.key]||selected.label}</p>
              {discount>0&&<p className="mt-2 text-xs text-slate-400 line-through">{money(selected.regular_price!,plan.currency)}</p>}
              <p className="mt-1 text-3xl font-bold tracking-tight text-[#071A33]">{money(selected.total_price,plan.currency)}</p>
              {discount>0&&<p className="mt-1 text-xs font-semibold text-emerald-600">Save {discount}%</p>}
              {Number(selected.setup_fee)>0&&<p className="mt-1 text-xs text-slate-500">Setup {money(selected.setup_fee,plan.currency)}</p>}
              <label className="mt-4 block text-xs font-semibold text-slate-600">Billing period
                <select aria-label={`Billing period for ${plan.name}`} value={selected.key}
                  onChange={event=>setCycles(v=>({...v,[plan.id]:event.target.value}))}
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm font-medium text-slate-700 focus:border-[#0064E0] focus:outline-none">
                  {plan.billing_cycles.map(c=><option key={c.key} value={c.key}>{periodLabel[c.key]||c.label}</option>)}
                </select>
              </label>
            </div>
            <Link href={url} className="mt-5 inline-flex min-h-12 items-center justify-center rounded-xl bg-[#0064E0] px-4 py-3 text-sm font-bold text-white hover:bg-[#0052B8]">Choose this plan</Link>
            <div className="mt-5 border-t border-slate-100 pt-5">
              <p className="mb-3 text-xs font-bold text-slate-600">Included features</p>
              <ul className="space-y-3">{plan.features.map((feature,i)=><li key={i} className="flex items-start gap-2 text-sm leading-5 text-slate-600">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600"/>{feature}</li>)}</ul>
              {!plan.features.length&&<p className="text-xs text-slate-500">Contact us for full package specifications.</p>}
            </div>
          </article>;
        })}
      </div>}
      <div className="mt-8 flex items-center justify-center gap-2 text-xs text-slate-500"><ShieldCheck className="h-4 w-4 text-[#0064E0]"/> Plans are taken directly from Octalve's published catalog. <RefreshCcw className="h-3.5 w-3.5"/></div>
    </div>
  </section>;
}
