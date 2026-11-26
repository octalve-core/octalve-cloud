"use client";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Globe2 } from "lucide-react";
import {useShopping} from "@/features/cloud/commerce/ShoppingProvider";
import {PublishedPackageCard} from "./PublishedPackageCard";
import {buildHostingCheckoutHref} from "@/lib/console-commerce-links";

type Cycle = { key: string; months: number; label: string; total_price: string; regular_price: string | null; setup_fee: string; is_default: boolean };
type Plan = { id: number; name: string; slug: string; product_slug: string; published_revision: number; description: string; product_name: string; product_type: string;
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
  if (!Number.isFinite(amount) || amount < 0 || !/^[A-Z]{3}$/.test(currency)) return "Price unavailable";
  return new Intl.NumberFormat(currency==="NGN"?"en-NG":"en-US",{
    style:"currency",currency,
    maximumFractionDigits:2
  }).format(amount);
}

export function PublishedPlanCards({ category = "all" }: { category?: PlanCategory }) {
  const shopping=useShopping();
  const [plans,setPlans]=useState<Plan[]>([]);
  const [loading,setLoading]=useState(true),[error,setError]=useState("");
  const [selectedCategory,setSelectedCategory]=useState<PlanCategory>(category);
  const [cycles,setCycles]=useState<Record<number,string>>({});
  useEffect(()=>{
    const abort=new AbortController();
    fetch(API,{signal:AbortSignal.any([abort.signal,AbortSignal.timeout(15000)]),credentials:"omit",cache:"no-store"})
      .then(async r=>{if(!r.ok)throw Error("catalog unavailable");return await r.json() as ResponseShape})
      .then(data=>{if(!abort.signal.aborted)setPlans(Array.isArray(data.plans)?data.plans.filter(p=>p&&typeof p.name==="string"&&Array.isArray(p.billing_cycles)&&Array.isArray(p.features)):[])})
      .catch(()=>{if(!abort.signal.aborted)setError("Plans are temporarily unavailable. Refresh or contact our team.")})
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
        <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">Compare plans and billing periods.</p>
      </div>
      {category==="all"&&<div className="mt-8 flex flex-wrap justify-center gap-2" role="group" aria-label="Service categories">
        {tabs.map(tab=><button key={tab} onClick={()=>setSelectedCategory(tab)} type="button" aria-pressed={selectedCategory===tab}
          className={`rounded-xl px-4 py-2.5 text-sm font-semibold capitalize transition ${selectedCategory===tab?"bg-[#0064E0] text-white":"bg-[#F1F5F9] text-slate-600 hover:bg-blue-50"}`}>{tab==="all"?"All packages":tab}</button>)}
      </div>}
      {loading&&<div role="status" className="mt-8 rounded-2xl border border-slate-200 bg-[#F8FAFC] p-8 text-center text-sm text-slate-600">Loading current published packages…</div>}
      {error&&<div role="alert" className="mt-8 rounded-2xl border border-rose-100 bg-rose-50 p-8 text-center text-sm text-rose-700">{error}</div>}
      {!loading&&!error&&shown.length===0&&<div className="mx-auto mt-10 max-w-2xl rounded-2xl border border-slate-200 bg-[#F8FAFC] p-8 text-center">
        <Globe2 className="mx-auto h-9 w-9 text-[#0064E0]" />
        <h3 className="mt-3 text-lg font-semibold text-[#10233A]">Packages coming soon.</h3>
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
          const purchaseUrl = buildHostingCheckoutHref({
            productSlug:plan.product_slug,planSlug:plan.slug,
            cycle:selected.key,revision:plan.published_revision
          });
          const canCheckout = ["shared_hosting", "wordpress_hosting", "vps"].includes(plan.product_type) && Boolean(purchaseUrl);
          const url = canCheckout && purchaseUrl
            ? purchaseUrl
            : `${CONSOLE}/client/support/new?product=${encodeURIComponent(String(plan.id))}`;
          return <PublishedPackageCard key={plan.id} name={plan.name} description={plan.description}
            price={money(selected.total_price,plan.currency)} period={periodLabel[selected.key]||selected.label}
            features={plan.features}
            badge={plan.is_popular?<span className="rounded-full bg-blue-50 px-2 py-1 text-xs text-blue-700">Popular</span>:undefined}
            action={<>
              {discount>0&&<p className="mb-2 text-xs text-slate-600"><span className="line-through">{money(selected.regular_price!,plan.currency)}</span> · Save {discount}%</p>}
              {Number(selected.setup_fee)>0&&<p className="mb-2 text-xs text-slate-600">Setup {money(selected.setup_fee,plan.currency)}</p>}
              <label className="block text-xs font-medium text-slate-700">Billing period
                <select aria-label={`Billing period for ${plan.name}`} value={selected.key}
                  onChange={event=>setCycles(v=>({...v,[plan.id]:event.target.value}))}
                  className="mt-1 min-h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700">
                  {plan.billing_cycles.map(c=><option key={c.key} value={c.key}>{periodLabel[c.key]||c.label}</option>)}
                </select>
              </label>
              {canCheckout&&shopping?.available?<button type="button" disabled={shopping.view.busy}
                onClick={()=>shopping.add({kind:"service",plan:String(plan.id),cycle:selected.key,revision:plan.published_revision})}
                className="mt-3 flex min-h-11 w-full items-center justify-center rounded-full bg-[#0064E0] px-4 text-sm font-medium text-white disabled:opacity-50">Add to cart</button>:
                <Link href={url} className="mt-3 flex min-h-11 items-center justify-center rounded-full bg-[#0064E0] px-4 text-sm font-medium text-white">{canCheckout ? "Choose this plan" : "Ask about this plan"}</Link>}
            </>}/>;
        })}
      </div>}
    </div>
  </section>;
}
