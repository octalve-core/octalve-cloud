"use client";
import {useShopping} from "@/features/cloud/commerce/ShoppingProvider";
import Link from "next/link";
import {ArrowRight, ShoppingCart} from "lucide-react";
import {buildDomainBundleHref,buildDomainRegistrationHref} from "@/lib/console-commerce-links";
import type {DomainSuggestion} from "@/lib/domain-pricing-adapter";
export function CompactDomainResult({item}:{item:DomainSuggestion}){
 const shopping=useShopping();
 const href=buildDomainRegistrationHref(item.domain);
 const canBuy=item.available===true&&item.checkoutEnabled===true&&!!href;
 const draft=item.available===true&&!!item.registrationAmount&&!!item.currency?buildDomainBundleHref([item.domain]):null;
 return <article className="flex min-w-0 flex-col gap-3 rounded-xl border border-white/10 bg-[#141414] p-4">
  <div className="flex flex-wrap items-start justify-between gap-2"><h3 className="min-w-0 break-all text-base font-medium">{item.domain}</h3><span className={`text-xs ${item.available===true?"text-green-300":item.available===false?"text-red-300":"text-amber-200"}`}>{item.available===true?"Available":item.available===false?"Unavailable":"Unverified"}</span></div>
  <div><p className="text-lg font-medium tabular-nums">{item.priceLabel}</p>{item.renewalLabel&&<p className="mt-1 text-xs text-zinc-400">{item.renewalLabel}</p>}</div>
  <div className="mt-auto flex flex-wrap items-center justify-between gap-2">{draft&&shopping?.available?<button type="button" disabled={shopping.view.busy} onClick={()=>shopping.add({kind:"domain",domain:item.domain})} className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-cloud-blue px-3 text-sm font-medium text-white disabled:opacity-50"><ShoppingCart size={16} aria-hidden="true"/>Add to cart</button>:draft||canBuy?<a href={draft||href!} className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-cloud-blue px-3 text-sm font-medium text-white hover:bg-cloud-blueDark"><ShoppingCart size={16} aria-hidden="true"/>Continue in Console<ArrowRight size={15} aria-hidden="true"/></a>:<Link href={"/tools/whois-lookup/?q="+encodeURIComponent(item.domain)} className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-white/10 px-3 text-sm text-zinc-200">{item.available===true?"Research domain":"WHOIS lookup"}<ArrowRight size={15}/></Link>}{draft&&!canBuy&&<span className="text-xs text-zinc-400">Draft cart</span>}</div>
 </article>
}
