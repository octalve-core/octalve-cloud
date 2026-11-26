"use client";
import Link from "next/link";
import {ArrowUp,ArrowRight,Loader2,Sparkles} from "lucide-react";
import {useEffect,useRef,useState} from "react";
import {extensions,localIdeas,validateIdeas} from "@/lib/domain-name-ideas";
import {getDomainSuggestions,type DomainSuggestion} from "@/lib/domain-pricing-adapter";
import {buildDomainRegistrationHref} from "@/lib/console-commerce-links";
type Row={name:string;offer?:DomainSuggestion;checked?:boolean};
import {endpoints} from "@/lib/storefront-tools";
const api=endpoints.ideas;
export function ToolPanel(){
 const [query,setQuery]=useState("");const [tld,setTld]=useState(".com");const [rows,setRows]=useState<Row[]>([]);const [busy,setBusy]=useState(false);const [message,setMessage]=useState("");const [source,setSource]=useState("");const [filter,setFilter]=useState("all");const [limit,setLimit]=useState(30);
 const active=useRef<AbortController|null>(null);const locked=useRef(false);
 useEffect(()=>()=>{active.current?.abort();active.current=null},[]);
 async function generate(){
  if(locked.current)return;
  if(!query.trim()||query.length>160){setMessage("Enter a business name or idea.");return}
  const local=localIdeas(query,tld);if(!local.length){setMessage("Enter an idea containing letters or numbers.");return}
  locked.current=true;setBusy(true);setRows([]);setLimit(30);setFilter("all");setMessage("Generating names…");setSource("");
  const controller=new AbortController();active.current=controller;
  let names=local;let label="Local naming suggestions";
  try{
   if(api){try{
    const resp=await fetch(api,{method:"POST",headers:{"Content-Type":"application/json"},credentials:"omit",signal:AbortSignal.any([controller.signal,AbortSignal.timeout(12000)]),body:JSON.stringify({business:query.trim(),extension:tld,count:30})});
    if(resp.ok){const data=await resp.json();const ideas=validateIdeas(data.ideas,tld);if(ideas.length){names=[...new Set([...ideas,...local])].slice(0,100);label=ideas.length>=100?"AI suggestions":"AI and local suggestions";}}
   }catch{/* Explicit local fallback */}}
   if(controller.signal.aborted)return;
   setRows(names.map(name=>({name})));setSource(label);setMessage("Suggestions ready. Checking the first 10 domains…");
   await check(names.slice(0,10),tld,controller);
   if(!controller.signal.aborted)setMessage("Check more names in batches of 10 to confirm availability.");
  }finally{if(active.current===controller){active.current=null;locked.current=false;setBusy(false)}}
 }
 async function check(names:string[],extension:string,controller:AbortController){
  for(let i=0;i<names.length&&!controller.signal.aborted;i+=2){
   const batch=names.slice(i,i+2);
   await Promise.all(batch.map(async name=>{
    const offers=await getDomainSuggestions({query:name,tlds:[extension],signal:AbortSignal.any([controller.signal,AbortSignal.timeout(8000)])});
    if(active.current!==controller||controller.signal.aborted)return;
    const offer=offers.find(o=>o.domain===name);
    setRows(old=>old.map(row=>row.name===name?{...row,offer,checked:true}:row));
   }));
   if(i+2<names.length)await new Promise(resolve=>window.setTimeout(resolve,400));
  }
 }
 async function more(){
  if(locked.current)return;const pending=rows.filter(r=>!r.checked).slice(0,10);if(!pending.length)return;
  locked.current=true;setBusy(true);setMessage("Checking more domains…");const controller=new AbortController();active.current=controller;
  try{await check(pending.map(r=>r.name),"."+pending[0].name.split(".").slice(1).join("."),controller);if(!controller.signal.aborted)setMessage("Availability checks completed for this batch.")}
  finally{if(active.current===controller){active.current=null;locked.current=false;setBusy(false)}}
 }
 const status=(row:Row)=>row.offer?.available===true?"available":row.offer?.available===false?"unavailable":row.checked?"unverified":"unchecked";
 const visible=rows.filter(r=>filter==="all"||status(r)===filter);
 return <section className="bg-black px-4 pb-24 text-white sm:px-6 lg:px-10"><div className="mx-auto max-w-[1500px]">
 <form onSubmit={e=>{e.preventDefault();void generate()}} className="mx-auto max-w-3xl rounded-2xl border border-orange-400/60 bg-[#181818] p-3 focus-within:border-orange-400">
 <label htmlFor="generator-idea" className="sr-only">Business name or idea</label><input id="generator-idea" value={query} onChange={e=>setQuery(e.target.value)} maxLength={160} placeholder="Start typing your business idea…" className="h-14 w-full border-0 bg-transparent px-3 text-lg text-white outline-none placeholder:text-zinc-400 focus:ring-0"/>
 <div className="flex flex-wrap items-center justify-between gap-2"><nav aria-label="Domain tools" className="flex flex-wrap gap-1 rounded-lg bg-black p-1 text-sm"><Link href="/tools/domain-name-search/" className="rounded-md px-3 py-2 text-violet-300">Search</Link><Link href="/domains/" className="rounded-md px-3 py-2 text-green-300">Extensions</Link><span aria-current="page" className="rounded-md bg-orange-500 px-3 py-2 font-medium text-black"><Sparkles size={15} className="mr-1 inline"/>Generator</span><Link href="/tools/whois-lookup/" className="rounded-md px-3 py-2 text-teal-300">WHOIS</Link></nav>
 <div className="flex items-center gap-2"><label className="sr-only" htmlFor="generator-extension">Extension</label><select id="generator-extension" value={tld} onChange={e=>setTld(e.target.value)} className="h-11 rounded-lg border border-white/10 bg-black px-3 text-sm text-white">{extensions.map(v=><option key={v}>{v}</option>)}</select><button disabled={busy} type="submit" aria-label="Generate names" className="grid h-11 w-11 place-items-center rounded-lg bg-orange-500 text-black disabled:opacity-60">{busy?<Loader2 size={20} className="motion-safe:animate-spin"/>:<ArrowUp size={20}/>}</button></div></div></form>
 <p role="status" className="mt-5 text-center text-sm text-zinc-400">{message}</p>
 {rows.length>0&&<section className="mt-12"><h2 className="break-all text-3xl font-medium">Domain ideas</h2><p className="mt-2 text-sm text-zinc-400">{source} · {rows.length} names · availability checked separately</p><div className="mt-5 flex flex-wrap gap-2 border-b border-white/10 pb-4">{["all","available","unavailable","unverified","unchecked"].map(v=><button key={v} type="button" aria-pressed={filter===v} onClick={()=>{setFilter(v);setLimit(30)}} className={`rounded-lg px-3 py-2 text-sm capitalize ${filter===v?"bg-white/15":"text-zinc-400 hover:bg-white/10"}`}>{v} ({v==="all"?rows.length:rows.filter(r=>status(r)===v).length})</button>)}</div>
 <div className="mt-5 grid gap-x-8 gap-y-2 md:grid-cols-2 xl:grid-cols-3">{visible.slice(0,limit).map(row=>{const s=status(row);const href=buildDomainRegistrationHref(row.name);const buy=s==="available"&&row.offer?.checkoutEnabled===true&&!!href;return <article key={row.name} className="flex min-w-0 items-center gap-3 border-b border-white/10 py-3"><span aria-hidden="true" className={`h-2 w-2 shrink-0 rounded-full ${s==="available"?"bg-green-400":s==="unavailable"?"bg-red-500":s==="unverified"?"bg-amber-400":"bg-zinc-500"}`}/><div className="min-w-0 flex-1"><p className="break-all text-sm font-medium">{row.name}</p><p className="mt-1 text-xs text-zinc-400">{s} {row.offer?.priceLabel&&" · "+row.offer.priceLabel}</p></div><a href={buy?href!:(s==="unavailable"?"/tools/whois-lookup/?q=":"/domains/?q=")+encodeURIComponent(row.name)} aria-label={`${buy?"Buy":s==="unavailable"?"Research":"Check"} ${row.name}`} className={`grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-[#202020] ${buy?"text-green-300":s==="unavailable"?"text-red-300":"text-zinc-300"} hover:bg-white/15 focus-visible:outline focus-visible:outline-orange-400`}><ArrowRight size={18}/></a></article>})}</div>
 <div className="mt-8 flex flex-wrap justify-center gap-3">{visible.length>limit&&<button onClick={()=>setLimit(v=>v+30)} className="rounded-lg bg-[#262626] px-5 py-3 text-sm">Load more</button>}{rows.some(r=>!r.checked)&&<button disabled={busy} onClick={()=>void more()} className="rounded-lg bg-[#262626] px-5 py-3 text-sm disabled:opacity-50">Check next 10</button>}</div></section>}
 <div className="mx-auto mt-20 max-w-4xl border-t border-white/10 pt-10"><h2 className="text-2xl font-normal">Find a name that fits your business</h2><p className="mt-4 leading-7 text-zinc-400">Generate ideas, compare extensions and verify your favourites before registration. Availability and prices may change; final eligibility is confirmed in the Client Console.</p></div>
 </div></section>
}
