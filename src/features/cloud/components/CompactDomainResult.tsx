"use client";
import {useShopping} from "@/features/cloud/commerce/ShoppingProvider";
import Link from "next/link";
import {DomainResultCard} from "../commerce/DomainCommerce";
import {ArrowRight, ShoppingCart} from "lucide-react";
import {buildDomainBundleHref,buildDomainRegistrationHref} from "@/lib/console-commerce-links";
import type {DomainSuggestion} from "@/lib/domain-pricing-adapter";
export function CompactDomainResult({item}:{item:DomainSuggestion}){
 const shopping=useShopping();
 const inCart=shopping?.view.lines.some(line=>line.kind==="domain"&&line.name===item.domain)===true;
 const href=buildDomainRegistrationHref(item.domain);
 const canBuy=item.available===true&&item.checkoutEnabled===true&&!!href;
 const draft=item.available===true&&!!item.registrationAmount&&!!item.currency?buildDomainBundleHref([item.domain]):null;
 return <DomainResultCard name={item.domain} availability={item.available} price={item.priceLabel} renewal={item.renewalLabel} action={<>{inCart&&shopping?.available?<button type="button" onClick={shopping.open} className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-white/20 px-3 text-sm text-white">In your cart <ArrowRight size={15}/></button>:draft&&shopping?.available?<button type="button" disabled={shopping.view.busy} onClick={()=>shopping.add({kind:"domain",domain:item.domain})} className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-cloud-blue px-3 text-sm font-medium text-white disabled:opacity-50"><ShoppingCart size={16} aria-hidden="true"/>Add to cart</button>:draft||canBuy?<a href={draft||href!} className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-cloud-blue px-3 text-sm font-medium text-white hover:bg-cloud-blueDark"><ShoppingCart size={16} aria-hidden="true"/>Continue in Console<ArrowRight size={15} aria-hidden="true"/></a>:<Link href={"/tools/whois-lookup/?q="+encodeURIComponent(item.domain)} className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-white/10 px-3 text-sm text-zinc-200">{item.available===true?"Research domain":"WHOIS lookup"}<ArrowRight size={15}/></Link>}</>} notice={item.available===false?"Choose another name or check transfer eligibility.":draft&&!canBuy?"Draft cart":undefined}/>;
}
