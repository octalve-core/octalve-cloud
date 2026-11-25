"use client";
import { useEffect,useRef,useState } from "react";
import Link from "next/link";
import { ArrowUp, Search, History, Loader2, ShoppingCart } from "lucide-react";
import { lookupRegistry,normalizeLookup,type RegistryResult } from "@/lib/registry-rdap";
import { getDomainSuggestions,type DomainSuggestion } from "@/lib/domain-pricing-adapter";
import { buildDomainRegistrationHref } from "@/lib/console-commerce-links";
import { RegistryDetails } from "./RegistryDetails";
type Result={domain:string;registry:RegistryResult;offer:DomainSuggestion|null};
export function ToolPanel(){
 const [input,setInput]=useState("");const [result,setResult]=useState<Result|null>(null);const [busy,setBusy]=useState(false);const [message,setMessage]=useState("");const [history,setHistory]=useState<string[]>([]);
 const active=useRef<AbortController|null>(null);
 useEffect(()=>()=>active.current?.abort(),[]);
 async function lookup(value:string){
  const domain=normalizeLookup(value);
  if(!domain){setMessage("Enter a full domain name, such as example.com.");return}
  active.current?.abort();const controller=new AbortController();active.current=controller;
  setInput(domain);setBusy(true);setMessage("Checking registry records and Octalve pricing…");setResult(null);
  const timer=window.setTimeout(()=>controller.abort(),18000);
  try{
   const [registry,offers]=await Promise.all([lookupRegistry(domain,controller.signal),getDomainSuggestions({query:domain,tlds:["."+domain.split(".").slice(1).join(".")],signal:controller.signal})]);
   if(active.current!==controller)return;
   if(controller.signal.aborted){setMessage("Lookup timed out. Please try again.");return}
   setResult({domain,registry,offer:offers.find(o=>o.domain===domain)??null});setHistory(old=>[domain,...old.filter(d=>d!==domain)].slice(0,8));setMessage("Lookup complete.");
  }catch{if(active.current===controller)setMessage("Lookup failed. Please try again.")}
  finally{window.clearTimeout(timer);if(active.current===controller){active.current=null;setBusy(false)}}
 }
 const href=result?buildDomainRegistrationHref(result.domain):null;
 const canBuy=!!(href&&result?.offer?.available===true&&result.offer.checkoutEnabled===true&&result.registry.state!=="registered");
 return <section className="bg-black px-4 pb-20 text-white sm:px-6 lg:px-10">
 <div className="mx-auto max-w-7xl">
 <form onSubmit={e=>{e.preventDefault();void lookup(input)}} className="mx-auto flex max-w-3xl items-center gap-3 rounded-2xl border border-white/15 bg-[#181818] p-3 focus-within:border-orange-400">
 <label htmlFor="whois-domain" className="sr-only">Full domain name</label><Search size={20} className="ml-2 shrink-0 text-zinc-400" aria-hidden="true"/>
 <input id="whois-domain" value={input} onChange={e=>setInput(e.target.value)} placeholder="Enter a domain name…" autoCapitalize="none" spellCheck={false} maxLength={253} className="min-w-0 flex-1 border-0 bg-transparent p-2 text-base text-white outline-none focus:ring-0"/>
 <button type="submit" disabled={busy} aria-label="Look up domain" className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-orange-500 text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-400 disabled:opacity-60">{busy?<Loader2 size={20} className="motion-safe:animate-spin"/>:<ArrowUp size={20}/>}</button>
 </form>
 <nav aria-label="Domain tools" className="mx-auto mt-4 flex max-w-3xl flex-wrap justify-center gap-2 text-sm"><Link href="/tools/domain-name-search" className="rounded-lg px-3 py-2 text-blue-300 hover:bg-white/10">Search</Link><Link href="/domains" className="rounded-lg px-3 py-2 text-green-300 hover:bg-white/10">Extensions & pricing</Link><Link href="/tools/ai-domain-name-generator" className="rounded-lg px-3 py-2 text-violet-300 hover:bg-white/10">Generator</Link><span aria-current="page" className="rounded-lg bg-orange-500/15 px-3 py-2 text-orange-300">WHOIS research</span></nav>
 <p role="status" className="mx-auto mt-5 max-w-3xl text-center text-sm text-zinc-400">{message}</p>
 {result&&<div className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,1fr)_220px]">
 <div className="min-w-0 space-y-6"><div className="flex flex-wrap items-start justify-between gap-4"><div><h2 className="break-all text-3xl font-medium tracking-tight sm:text-4xl">{result.domain}</h2><p className={canBuy?"mt-2 text-sm text-green-300":result.registry.state==="registered"?"mt-2 text-sm text-red-300":"mt-2 text-sm text-amber-200"}>{result.registry.state==="registered"?"Registered":canBuy?"Available for registration":"Purchase availability not confirmed"}</p></div>{canBuy&&href&&<a href={href} className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-cloud-blue px-5 text-sm font-medium text-white"><ShoppingCart size={17}/> Buy now</a>}</div>
 <RegistryDetails result={result.registry}/>
 <section className="rounded-2xl border border-white/10 bg-[#121212] p-5"><h3 className="font-medium">Octalve Cloud registration</h3><p className="mt-3 text-sm text-zinc-300">{result.offer?.priceLabel??"Pricing unavailable"}</p>{result.offer?.renewalLabel&&<p className="mt-2 text-sm text-zinc-400">{result.offer.renewalLabel}</p>}<p className="mt-3 text-sm text-zinc-400">Final price and eligibility are verified in the Client Console. Registry absence alone is not proof of availability.</p><Link href="/tools/domain-name-search" className="mt-4 inline-block text-sm text-blue-300 underline">Explore alternative domains</Link></section>
 </div><aside className="h-fit rounded-xl border border-white/10 p-4"><h3 className="flex items-center gap-2 text-sm font-medium"><History size={16}/> Domains checked</h3><ul className="mt-4 space-y-2">{history.map(domain=><li key={domain}><button type="button" onClick={()=>void lookup(domain)} className="w-full break-all rounded-lg px-2 py-2 text-left text-sm text-zinc-300 hover:bg-white/10">{domain}</button></li>)}</ul><p className="mt-3 text-xs text-zinc-500">This session only.</p></aside></div>}
 </div></section>;
}
