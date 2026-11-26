"use client";
import {useShopping} from "@/features/cloud/commerce/ShoppingProvider";
import {useEffect,useState} from "react";
import {ShieldCheck,ShoppingCart,ArrowRight} from "lucide-react";
import {buildDomainBundleHref} from "@/lib/console-commerce-links";
import type {DomainSuggestion} from "@/lib/domain-pricing-adapter";
export function BrandProtectionBundle({items}:{items:DomainSuggestion[]}){
 const shopping=useShopping();
 const eligible=items.filter(i=>i.available===true&&i.registrationAmount&&i.currency==="NGN");
 const [excluded,setExcluded]=useState<string[]>([]);
 const signature=eligible.map(i=>i.domain).join(",");
 useEffect(()=>setExcluded([]),[signature]);
 const selected=eligible.filter(i=>!excluded.includes(i.domain));
 const total=selected.reduce((sum,i)=>sum+Math.round(Number(i.registrationAmount)*100),0)/100;
 const href=buildDomainBundleHref(selected.map(i=>i.domain));
 if(items.length<2)return null;
 return <section aria-label="Brand protection bundle" className="mt-6 rounded-2xl border border-white/10 bg-[#141414] p-5 sm:p-6">
 <div className="flex items-center gap-3"><ShieldCheck className="shrink-0 text-green-300" size={24}/><div><h2 className="text-xl font-medium">Protect your brand</h2><p className="text-sm text-zinc-400">Secure related extensions in one cart.</p></div></div>
 <div className="mt-4 divide-y divide-white/10">{items.map(i=>{const enabled=eligible.some(e=>e.domain===i.domain);return <label key={i.domain} className="flex flex-wrap items-center gap-3 py-3 text-sm"><input type="checkbox" className="h-4 w-4 accent-blue-500" disabled={!enabled} checked={enabled&&!excluded.includes(i.domain)} onChange={e=>setExcluded(old=>e.target.checked?old.filter(n=>n!==i.domain):[...old,i.domain])}/><span className="min-w-0 flex-1 break-all">{i.domain}<span className={`ml-2 text-xs ${i.available===true?"text-green-300":i.available===false?"text-red-300":"text-amber-200"}`}>{i.available===true?(enabled?"Available":"Price unavailable"):i.available===false?"Unavailable":"Unverified"}</span></span><span className="tabular-nums">{i.priceLabel}</span></label>})}</div>
 <div className="mt-4 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-4"><div><p className="text-xs text-zinc-400">{selected.length} selected · published registration prices</p><p className="mt-1 text-xl font-medium tabular-nums">{new Intl.NumberFormat("en-NG",{style:"currency",currency:"NGN"}).format(total)}</p></div>{href&&shopping?.available?<button type="button" disabled={shopping.view.busy}
  onClick={()=>shopping.addBundle(selected.map(item=>item.domain))}
  className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-cloud-blue px-4 text-sm font-medium text-white disabled:opacity-50"><ShoppingCart size={16}/> Add {selected.length} to cart <ArrowRight size={16}/></button>:href&&<a href={href} className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-cloud-blue px-4 text-sm font-medium text-white"><ShoppingCart size={16}/> Add {selected.length} to cart <ArrowRight size={16}/></a>}</div>
 <p className="mt-3 text-xs leading-5 text-zinc-400">Prices and availability are rechecked in the Console; adding to a draft cart does not reserve a name or enable live payment.</p>
 </section>
}
