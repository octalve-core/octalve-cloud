"use client";
import Link from "next/link";
import { ArrowLeftRight, Globe2, Sparkles, ShieldCheck } from "lucide-react";
import {useEffect,useRef,useState} from "react";
import {prepareHeroDomainQuery} from "@/lib/hero-domain-query";
import {getDomainSuggestions,getLiveDomainPackages,type DomainSuggestion} from "@/lib/domain-pricing-adapter";
import {DomainDiscoveryPanel,DomainSearchField,DomainAvailabilityBanner,PublishedExtensionGrid,type PublishedExtension} from "../commerce/DomainCommerce";
import {CompactDomainResult,DomainCartAction} from "./CompactDomainResult";
import {BrandProtectionBundle} from "./BrandProtectionBundle";
import {cloudLinks} from "@/features/cloud/data/cloud-links";
const tlds=[".com",".com.ng",".ng",".net",".org",".ai",".shop",".cloud"];
export function DomainSearchWorkspace({catalogue=false,embedded=false}:{catalogue?:boolean;embedded?:boolean}){
 const [query,setQuery]=useState("");const [extension,setExtension]=useState("");const [searched,setSearched]=useState("");const [results,setResults]=useState<DomainSuggestion[]>([]);const [busy,setBusy]=useState(false);const [message,setMessage]=useState("");const [filter,setFilter]=useState("all");
 const [bundle,setBundle]=useState<DomainSuggestion[]>([]);
 const [prices,setPrices]=useState<PublishedExtension[]|null>(null);
 const inputArea=useRef<HTMLDivElement>(null);
 useEffect(()=>{let active=true;void getLiveDomainPackages().then(items=>{if(active)setPrices(items.map(p=>({tld:p.tld,price:new Intl.NumberFormat("en-NG",{style:"currency",currency:"NGN"}).format(p.currentPrice),renewal:p.renewalPrice&&p.renewalPrice>0?new Intl.NumberFormat("en-NG",{style:"currency",currency:"NGN"}).format(p.renewalPrice):undefined}))) });return()=>{active=false}},[]);
 const active=useRef<AbortController|null>(null);
 async function run(value:string,selected=""){
  const request=prepareHeroDomainQuery(value,selected?[selected]:tlds);
  if(!request){setMessage("Enter a valid domain or brand name.");return}
  active.current?.abort();const controller=new AbortController();active.current=controller;
  setSearched(request.query);setResults([]);setBundle([]);setBusy(true);setFilter("all");setMessage("Checking availability and published pricing…");
  const timeout=window.setTimeout(()=>controller.abort(),15000);
  try{
   const items=await getDomainSuggestions({...request,signal:controller.signal});
   if(active.current!==controller)return;
   if(controller.signal.aborted){setMessage("Search timed out. Please retry.");return}
   setResults(items);setMessage(items.length?items.length+" results returned.":"No verified response returned. Please retry.");
   const root=request.query.split(".")[0];
   if(root&&(!request.query.includes(".")||request.tlds.some(t=>request.query===root+t))){
    const targets=[".com",".ng",".cloud",".ai"];
    const missing=targets.filter(t=>!items.some(i=>i.domain===root+t));
    const extras=missing.length?await getDomainSuggestions({query:root,tlds:missing,signal:controller.signal}):[];
    if(active.current!==controller||controller.signal.aborted)return;
    setBundle(targets.map(t=>[...items,...extras].find(i=>i.domain===root+t)??{domain:root+t,tld:t,available:null,priceLabel:"Pricing unavailable",orderUrl:""}));
   }
  }catch{if(active.current===controller)setMessage("Search unavailable. Please retry.")}
  finally{window.clearTimeout(timeout);if(active.current===controller){setBusy(false);active.current=null}}
 }
 useEffect(()=>{
  if(embedded)return ()=>{active.current?.abort();active.current=null};
  const params=new URLSearchParams(window.location.search);
  const q=params.get("q")??"";const t=params.get("tld")??"";
  const valid=/^\.[a-z][a-z0-9-]{1,62}(\.[a-z][a-z0-9-]{1,62})*$/.test(t)?t:"";
  setExtension(valid);if(q){setQuery(q);void run(q,valid)}
  return ()=>{active.current?.abort();active.current=null};
 },[]);
 const visible=results.filter(item=>filter==="all"||(filter==="available"?item.available===true:filter==="registered"?item.available===false:item.available===null));
 function selectTld(tld:string){setExtension(tld);const base=query.trim().toLowerCase().replace(/^https?:\/\//,"").split(".")[0];if(base){const name=base+tld;setQuery(name);void run(name,tld)}else{inputArea.current?.querySelector("input")?.focus()}}
 const verified=results.find(item=>item.available===true&&item.registrationAmount&&item.currency);
 return <section id="domain-search" className={embedded?"min-w-0":"scroll-mt-28 bg-slate-50 px-4 py-8 sm:px-6 lg:py-12"}>
 <div className="mx-auto max-w-5xl space-y-5">
 <div ref={inputArea}><DomainDiscoveryPanel controls={<><span className="rounded-xl border border-white/20 bg-white/5 px-3 py-2">{extension||".com"}</span><Link href="/domains/" className="text-slate-300 underline underline-offset-4">All extensions</Link><a href="https://console.cloud.octalve.com/client/domains/transfer" className="inline-flex min-h-11 items-center gap-1.5 text-slate-300 underline underline-offset-4"><ArrowLeftRight size={14}/>Transfer a domain</a></>} result={<>{message&&<p role="status" className="text-xs text-slate-400">{message}</p>}{verified&&<DomainAvailabilityBanner name={verified.domain} price={verified.priceLabel} renewal={verified.renewalLabel} action={<DomainCartAction item={verified}/>}/>}</>}>
 <DomainSearchField value={query} onChange={v=>{active.current?.abort();active.current=null;setBusy(false);setQuery(v);setResults([]);setBundle([]);setSearched("");setMessage("")}} busy={busy} onSubmit={e=>{e.preventDefault();void run(query,extension)}} placeholder={"Find your domain (e.g. yourbrand"+(extension||".com")+")"}/>
 </DomainDiscoveryPanel></div>
 {prices===null?<p role="status" className="text-sm text-slate-500">Loading published extensions...</p>:prices.length?<PublishedExtensionGrid prices={prices} selected={extension||".com"} onSelect={selectTld} renderAction={tld=>{const item=results.find(v=>v.domain.endsWith(tld)&&("."+(v.tld||"").replace(/^\./,""))===tld&&v.available===true&&v.registrationAmount&&v.currency);return item?<div className="mt-2"><DomainCartAction item={item}/></div>:null}}/>:<p role="status" className="text-sm text-slate-500">Published extensions are unavailable.</p>}
 {searched&&<section aria-label="Domain search results" className="mt-6 rounded-2xl bg-[#080808] p-4 text-white sm:p-6"><h2 className="break-all text-xl font-medium tracking-tight">{searched}</h2><div className="mt-5 flex flex-wrap gap-2 border-b border-white/10 pb-4">{["all","available","registered","unknown"].map(v=><button key={v} type="button" aria-pressed={filter===v} onClick={()=>setFilter(v)} className={`rounded-md px-3 py-2 text-sm capitalize ${filter===v?"bg-white/15 text-white":"text-zinc-400 hover:bg-white/10"}`}>{v} ({v==="all"?results.length:results.filter(i=>v==="available"?i.available===true:v==="registered"?i.available===false:i.available===null).length})</button>)}</div>
 {!busy&&results.some(item=>item.available===false)&&<div className="mt-5 rounded-xl border border-white/10 bg-[#151515] p-4"><h3 className="font-medium">Try related names</h3><p className="mt-1 text-sm text-zinc-400">Name ideas only — choose one to check its availability.</p><div className="mt-3 flex flex-wrap gap-2">{[searched.split(".")[0]+"hq.com","get"+searched.split(".")[0]+".com",searched.split(".")[0]+"online.com"].filter(name=>name.length<=67).map(name=><button type="button" key={name} className="min-h-11 break-all rounded-lg border border-white/20 px-3 py-2 text-sm text-white hover:bg-white/10" onClick={()=>{setQuery(name);setExtension(".com");void run(name,".com")}}>{name}</button>)}</div></div>}
 <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">{visible.map(item=><CompactDomainResult key={item.domain} item={item}/>)}</div><BrandProtectionBundle items={bundle}/><p className="mt-3 text-xs text-zinc-400">Published registration and renewal prices.</p>{!busy&&!visible.length&&<p className="mt-4 text-sm text-zinc-400">No matching results.</p>}</section>}
 {!catalogue&&!embedded&&<><div className="mt-6 grid gap-4 text-white md:grid-cols-3">{[{icon:Globe2,title:"Domain guidance",text:"Choose a name that fits your brand, audience, and growth plan."},{icon:ShieldCheck,title:"Secure setup",text:"Connect your domain with DNS, SSL, hosting, and business email support."},{icon:Sparkles,title:"Launch-ready",text:"Move from domain search to website, email, and hosting setup faster."}].map(({icon:Icon,title,text})=><article key={title} className="rounded-xl border border-white/10 bg-[#121212] p-6"><Icon className="text-violet-300"/><h3 className="mt-4 font-medium">{title}</h3><p className="mt-2 text-sm leading-7 text-zinc-400">{text}</p></article>)}</div><div className="mt-8 flex flex-wrap text-white items-center justify-between gap-5 rounded-xl border border-white/10 bg-[#151515] p-6"><div><h2 className="text-2xl font-medium">Let Octalve Cloud help you secure and launch the right domain.</h2><p className="mt-2 text-sm text-zinc-400">We can help with domain registration, DNS setup, SSL, professional email, hosting, and website migration.</p></div><a href={cloudLinks.console} className="rounded-lg bg-cloud-blue px-5 py-3 text-sm font-medium">Open Console</a></div></>}
 </div></section>;
}
