import { CalendarDays, Globe2, ShieldCheck, Building2, Server, Clock } from "lucide-react";
import type { RegistryResult } from "@/lib/registry-rdap";
export function RegistryDetails({result}:{result:RegistryResult}){
 if(result.state!=="registered")return <div className="rounded-xl border border-amber-400/25 bg-[#151515] p-5 text-sm leading-6 text-amber-200">{result.message} <a className="underline" href="https://lookup.icann.org/en" target="_blank" rel="noopener noreferrer">Open ICANN Lookup</a></div>;
 const r=result.record;
 const date=(v:string|null)=>v?new Intl.DateTimeFormat("en-GB",{dateStyle:"medium",timeZone:"UTC"}).format(new Date(v)):"Not published";
 const facts=[{icon:Building2,label:"Registrar",value:r.registrar??"Not published"},{icon:CalendarDays,label:"Registered on",value:date(r.created)},{icon:Clock,label:"Expires on",value:date(r.expires)},{icon:Globe2,label:"Registry source",value:r.source},{icon:ShieldCheck,label:"DNSSEC",value:r.dnssec===null?"Not published":r.dnssec?"Signed":"Unsigned"},{icon:CalendarDays,label:"Last changed",value:date(r.updated)}];
 return <div className="space-y-6">
 <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{facts.map(({icon:Icon,label,value})=><div key={label} className="flex gap-3 rounded-2xl border border-white/10 bg-[#121212] p-5"><Icon size={19} className="mt-1 shrink-0 text-orange-400" aria-hidden="true"/><div className="min-w-0"><p className="break-words text-sm font-medium text-white">{value}</p><p className="mt-1 text-xs text-zinc-400">{label}</p></div></div>)}</div>
 <section className="rounded-2xl border border-white/10 p-5"><h3 className="flex items-center gap-2 font-medium"><Server size={17} className="text-orange-400"/> Nameservers</h3><div className="mt-4 flex flex-wrap gap-2">{r.nameservers.length?r.nameservers.map(n=><code key={n} className="break-all rounded-lg bg-[#181818] px-3 py-2 text-sm text-zinc-200">{n}</code>):<p className="text-sm text-zinc-400">Not published</p>}</div></section>
 <section className="rounded-2xl border border-white/10 p-5"><h3 className="font-medium">Registration status and dates</h3><p className="mt-3 text-sm text-zinc-300">{r.statuses.join(" · ")||"Not published"}</p><p className="mt-3 text-sm text-zinc-400">Current record only. Earlier ownership, deletion and availability history are not supplied by RDAP.</p></section>
 <details className="rounded-2xl border border-white/10 bg-[#121212] p-5"><summary className="cursor-pointer font-medium">Public registry record (normalized)</summary><pre className="mt-4 max-h-80 overflow-auto whitespace-pre-wrap break-all text-xs text-zinc-300">{JSON.stringify(r,null,2)}</pre></details>
 <p className="text-xs text-zinc-400">Source: {r.source} · Retrieved {new Date(r.checkedAt).toLocaleString()} · Contact data may be redacted. Personal contact information is not collected by this tool.</p>
 </div>;
}
