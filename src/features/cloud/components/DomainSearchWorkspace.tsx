"use client";
import Link from "next/link";
import { ArrowUp, Search, Loader2, Globe2, Sparkles, ShieldCheck } from "lucide-react";
import {useEffect,useRef,useState} from "react";
import {prepareHeroDomainQuery} from "@/lib/hero-domain-query";
import {getDomainSuggestions,type DomainSuggestion} from "@/lib/domain-pricing-adapter";
import {buildDomainRegistrationHref} from "@/lib/console-commerce-links";
import {cloudLinks} from "@/features/cloud/data/cloud-links";
const tlds=[".com",".com.ng",".ng",".net",".org",".ai",".shop",".cloud"];
export function DomainSearchWorkspace({catalogue=false}:{catalogue?:boolean}){
 const [query,setQuery]=useState("");const [extension,setExtension]=useState("");const [searched,setSearched]=useState("");const [results,setResults]=useState<DomainSuggestion[]>([]);const [busy,setBusy]=useState(false);const [message,setMessage]=useState("");const [filter,setFilter]=useState("all");
 const active=useRef<AbortController|null>(null);
 async function run(value:string,selected=""){
  const request=prepareHeroDomainQuery(value,selected?[selected]:tlds);
  if(!request){setMessage("Enter a valid domain or brand name.");return}
  active.current?.abort();const controller=new AbortController();active.current=controller;
  setSearched(request.query);setResults([]);setBusy(true);setFilter("all");setMessage("Checking availability and published pricing…");
  const timeout=window.setTimeout(()=>controller.abort(),15000);
  try{
   const items=await getDomainSuggestions({...request,signal:controller.signal});
   if(active.current!==controller)return;
   if(controller.signal.aborted){setMessage("Search timed out. Please retry.");return}
   setResults(items);setMessage(items.length?items.length+" results returned.":"No verified response returned. Please retry.");
  }catch{if(active.current===controller)setMessage("Search unavailable. Please retry.")}
  finally{window.clearTimeout(timeout);if(active.current===controller){setBusy(false);active.current=null}}
 }
 useEffect(()=>{
  const params=new URLSearchParams(window.location.search);
  const q=params.get("q")??"";const t=params.get("tld")??"";
  const valid=/^\.[a-z][a-z0-9-]{1,62}(\.[a-z][a-z0-9-]{1,62})*$/.test(t)?t:"";
  setExtension(valid);if(q){setQuery(q);void run(q,valid)}
  return ()=>{active.current?.abort();active.current=null};
 },[]);
 const visible=results.filter(item=>filter==="all"||(filter==="available"?item.available===true:filter==="registered"?item.available===false:item.available===null));
 return <section id="domain-search" className="-mt-4 scroll-mt-28 bg-black px-4 pb-16 pt-20 text-white sm:px-6 lg:pt-24">
 <div className="mx-auto max-w-6xl">
 <div className="mx-auto max-w-3xl text-center"><h1 className="text-[clamp(2.4rem,5vw,4.5rem)] font-normal leading-tight tracking-[-0.045em]">{catalogue?"Find the right name before someone else takes it.":"Find the right domain name before someone else takes it."}</h1><p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-zinc-400">{catalogue?"Search your next domain, preview available options, and start building your online presence with Octalve Cloud.":"Search domain ideas, compare useful extensions, and move smoothly from name discovery to registration, hosting, SSL, and business email setup."}</p></div>
 <form onSubmit={e=>{e.preventDefault();void run(query,extension)}} className="mx-auto mt-10 max-w-3xl rounded-2xl border border-white/15 bg-[#181818] p-3 focus-within:border-orange-400">
 <label htmlFor="domain-workspace-query" className="sr-only">Domain or brand name</label><input id="domain-workspace-query" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Start typing here…" autoCapitalize="none" spellCheck={false} maxLength={253} className="h-14 w-full border-0 bg-transparent px-3 text-lg text-white outline-none placeholder:text-zinc-400 focus:ring-0"/>
 <div className="flex flex-wrap items-center justify-between gap-2"><nav aria-label="Domain tools" className="flex flex-wrap gap-1 rounded-lg bg-black p-1 text-sm"><span aria-current="page" className="rounded-md bg-[#A05ACC] px-3 py-2 font-medium text-white"><Search size={15} className="mr-1 inline"/> Search</span><Link href="/domains" className="rounded-md px-3 py-2 text-green-300 hover:bg-white/10">Extensions</Link><Link href="/tools/ai-domain-name-generator" className="rounded-md px-3 py-2 text-orange-300 hover:bg-white/10">Generator</Link><Link href="/tools/whois-lookup" className="rounded-md px-3 py-2 text-teal-300 hover:bg-white/10">WHOIS</Link></nav><button type="submit" disabled={busy} aria-label="Search domains" className="grid h-11 w-11 place-items-center rounded-lg bg-[#A05ACC] text-white disabled:opacity-60">{busy?<Loader2 size={20} className="motion-safe:animate-spin"/>:<ArrowUp size={20}/>}</button></div>
 </form>
 <div className="mx-auto mt-5 flex max-w-3xl flex-wrap justify-center gap-2">{["",...new Set([...tlds,...(extension?[extension]:[])])].map(t=><button key={t||"all"} type="button" aria-pressed={extension===t} onClick={()=>setExtension(t)} className={`rounded-lg border px-3 py-2 text-sm ${extension===t?"border-violet-400 bg-violet-400/15 text-violet-200":"border-white/10 bg-[#121212] text-zinc-300 hover:border-violet-400"}`}>{t||"Popular"}</button>)}</div>
 <p role="status" className="mt-5 text-center text-sm text-zinc-400">{message}</p>
 {searched&&<section aria-label="Domain search results" className="mt-10"><h2 className="break-all text-3xl font-medium tracking-tight">{searched}</h2><div className="mt-5 flex flex-wrap gap-2 border-b border-white/10 pb-4">{["all","available","registered","unknown"].map(v=><button key={v} type="button" aria-pressed={filter===v} onClick={()=>setFilter(v)} className={`rounded-md px-3 py-2 text-sm capitalize ${filter===v?"bg-white/15 text-white":"text-zinc-400 hover:bg-white/10"}`}>{v} ({v==="all"?results.length:results.filter(i=>v==="available"?i.available===true:v==="registered"?i.available===false:i.available===null).length})</button>)}</div>
 <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">{visible.map(item=>{const href=buildDomainRegistrationHref(item.domain);const canBuy=item.available===true&&item.checkoutEnabled===true&&!!href;return <article key={item.domain} className="flex min-w-0 flex-col gap-3 rounded-xl border border-white/10 bg-[#121212] p-5"><p className={`text-xs font-medium ${item.available===true?"text-green-300":item.available===false?"text-red-300":"text-amber-200"}`}>{item.available===true?"Available":item.available===false?"Registered or unavailable":"Unverified"}</p><h3 className="break-all text-lg font-medium">{item.domain}</h3><p className="text-sm text-white">{item.priceLabel}</p><p className="text-xs text-zinc-400">{item.renewalLabel??"Renewal pricing not returned"}</p>{canBuy&&href?<a href={href} className="mt-auto rounded-lg bg-cloud-blue px-4 py-3 text-center text-sm font-medium text-white">Continue to cart</a>:<Link href={"/tools/whois-lookup/?q="+encodeURIComponent(item.domain)} className="mt-auto rounded-lg bg-white/10 px-4 py-3 text-center text-sm text-zinc-200">WHOIS research</Link>}</article>})}</div>{!busy&&!visible.length&&<p className="mt-4 text-sm text-zinc-400">No matching results.</p>}</section>}
 {!catalogue&&<><div className="mt-14 grid gap-4 md:grid-cols-3">{[{icon:Globe2,title:"Domain guidance",text:"Choose a name that fits your brand, audience, and growth plan."},{icon:ShieldCheck,title:"Secure setup",text:"Connect your domain with DNS, SSL, hosting, and business email support."},{icon:Sparkles,title:"Launch-ready",text:"Move from domain search to website, email, and hosting setup faster."}].map(({icon:Icon,title,text})=><article key={title} className="rounded-xl border border-white/10 bg-[#121212] p-6"><Icon className="text-violet-300"/><h3 className="mt-4 font-medium">{title}</h3><p className="mt-2 text-sm leading-7 text-zinc-400">{text}</p></article>)}</div><div className="mt-8 flex flex-wrap items-center justify-between gap-5 rounded-xl border border-white/10 bg-[#151515] p-6"><div><h2 className="text-2xl font-medium">Let Octalve Cloud help you secure and launch the right domain.</h2><p className="mt-2 text-sm text-zinc-400">We can help with domain registration, DNS setup, SSL, professional email, hosting, and website migration.</p></div><a href={cloudLinks.console} className="rounded-lg bg-cloud-blue px-5 py-3 text-sm font-medium">Open Console</a></div></>}
 </div></section>;
}
