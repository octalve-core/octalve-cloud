"use client";
import {useEffect,useMemo,useState} from "react";
import Link from "next/link";
import {ArrowLeft,ArrowRight,BookOpen,FileText,LifeBuoy,Search} from "lucide-react";
type Summary={slug:string;title:string;summary:string;category:string;updated_at:string};
type FullArticle=Summary&{body_markdown:string};
const API="https://api.cloud.octalve.com/api/storefront/articles/";
function SafeArticle({markdown}:{markdown:string}){
  return <div className="space-y-3 text-sm leading-7 text-slate-700">{markdown.split("\n").map((line,i)=>{
    if(line.startsWith("### "))return <h4 key={i} className="mt-6 text-lg font-bold text-slate-950">{line.slice(4)}</h4>;
    if(line.startsWith("## "))return <h3 key={i} className="mt-8 text-xl font-bold text-slate-950">{line.slice(3)}</h3>;
    if(line.startsWith("# "))return <h2 key={i} className="mt-8 text-2xl font-bold text-slate-950">{line.slice(2)}</h2>;
    if(/^\s*[-*] /.test(line))return <p key={i} className="flex gap-3 pl-3"><span className="text-[#0064E0]">•</span>{line.replace(/^\s*[-*] /,"")}</p>;
    if(!line.trim())return <div key={i} className="h-2"/>;
    return <p key={i}>{line}</p>;
  })}</div>;
}
export function PublicHelpCentre(){
  const [articles,setArticles]=useState<Summary[]>([]);
  const [active,setActive]=useState<FullArticle|null>(null);
  const [query,setQuery]=useState("");
  const [category,setCategory]=useState("All guides");
  const [loading,setLoading]=useState(true),[error,setError]=useState("");
  useEffect(()=>{
    const abort=new AbortController();
    const requested=new URLSearchParams(window.location.search).get("article");
    const list=fetch(API,{signal:abort.signal,credentials:"omit",cache:"no-store"})
      .then(async r=>{if(!r.ok)throw Error("Help content unavailable");return r.json() as Promise<{articles:Summary[]}>})
      .then(d=>{if(!abort.signal.aborted)setArticles(Array.isArray(d.articles)?d.articles:[])});
    const full=requested&&/^[a-z0-9-]{1,220}$/.test(requested)
      ?fetch(`${API}${encodeURIComponent(requested)}/`,{signal:abort.signal,credentials:"omit",cache:"no-store"})
        .then(async r=>{if(!r.ok)throw Error("Article not published");return r.json() as Promise<FullArticle>})
        .then(d=>{if(!abort.signal.aborted)setActive(d)})
      :Promise.resolve();
    Promise.all([list,full]).catch(()=>{if(!abort.signal.aborted)setError("We couldn't open the latest guides. Please try again.")})
      .finally(()=>{if(!abort.signal.aborted)setLoading(false)});
    return()=>abort.abort();
  },[]);
  const categories=useMemo(()=>["All guides",...new Set(articles.map(x=>x.category))],[articles]);
  const shown=useMemo(()=>articles.filter(a=>(category==="All guides"||a.category===category)&&
    (!query.trim()||[a.title,a.summary,a.category].join(" ").toLowerCase().includes(query.toLowerCase().trim()))),[articles,category,query]);
  function selectArticle(slug:string){
    window.history.pushState(null,"",`/knowledge-base/?article=${encodeURIComponent(slug)}`);
    setLoading(true);setError("");
    fetch(`${API}${encodeURIComponent(slug)}/`,{credentials:"omit",cache:"no-store"})
      .then(async r=>{if(!r.ok)throw Error("Article not available");return await r.json() as FullArticle})
      .then(setActive).catch(()=>setError("This article is currently unavailable."))
      .finally(()=>setLoading(false));
  }
  function goBack(){window.history.pushState(null,"","/knowledge-base/");setActive(null);setError("");}
  return <section className="min-h-[70vh] bg-[#F8FAFC] px-4 py-12 sm:px-6 lg:px-8">
    <div className="mx-auto max-w-6xl">
      <div className="rounded-[28px] bg-[linear-gradient(110deg,#001426,#07386C)] p-7 text-white shadow-lg sm:p-11">
        <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-blue-200"><BookOpen className="h-4 w-4"/> OCTALVE CLOUD HELP CENTRE</span>
        <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">{active?active.title:"Answers to keep you moving."}</h1>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-blue-100">{active?active.summary:"Explore our latest published articles on hosting, domains, DNS and billing. All guides are maintained by Octalve Cloud."}</p>
        {!active&&<label className="mt-7 flex min-h-14 max-w-2xl items-center gap-3 rounded-xl bg-white px-4 text-slate-500">
          <Search className="h-5 w-5"/><span className="sr-only">Search knowledge base</span>
          <input type="search" value={query} onChange={e=>setQuery(e.target.value)}
            placeholder="What do you need help with?" className="w-full min-w-0 bg-transparent py-4 text-sm text-slate-900 outline-none"/>
        </label>}
      </div>
      {active&&<div className="mt-5"><button onClick={goBack} type="button" className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-[#0064E0]"><ArrowLeft className="h-4 w-4"/> All guides</button></div>}
      {loading&&<div role="status" className="mt-7 rounded-2xl border border-slate-200 bg-white p-7 text-sm text-slate-600">Opening our help centre…</div>}
      {error&&<div role="alert" className="mt-7 rounded-2xl border border-rose-200 bg-rose-50 p-7 text-sm text-rose-700">{error}</div>}
      {!loading&&!error&&active&&<article className="mt-6 max-w-4xl rounded-2xl border border-slate-200 bg-white p-7 shadow-sm sm:p-10">
        <span className="text-xs font-bold uppercase tracking-widest text-[#0064E0]">{active.category}</span>
        <SafeArticle markdown={active.body_markdown}/></article>}
      {!active&&!loading&&!error&&<>
        <div className="mt-7 flex flex-wrap gap-2" aria-label="Help categories">{categories.map(c=><button type="button" key={c}
          onClick={()=>setCategory(c)} aria-pressed={category===c}
          className={`rounded-xl px-4 py-3 text-xs font-bold ${c===category?"bg-[#0064E0] text-white":"bg-white text-slate-600 border border-slate-200"}`}>{c}</button>)}</div>
        {shown.length===0&&<div className="mt-5 rounded-2xl border border-slate-200 bg-white px-8 py-12 text-center">
          <BookOpen className="mx-auto h-10 w-10 text-[#0064E0]"/>
          <h2 className="mt-3 text-xl font-bold text-slate-950">We're preparing our help articles.</h2>
          <p className="mt-2 text-sm text-slate-600">Published guides will appear here automatically. Contact support for assistance.</p>
        </div>}
        <div className="mt-7 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{shown.map(a=><button type="button" key={a.slug}
          onClick={()=>selectArticle(a.slug)}
          className="group flex min-h-52 flex-col rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-sm transition hover:border-blue-200 hover:shadow-lg">
          <span className="flex items-center gap-2 text-xs font-bold uppercase text-[#0064E0]"><FileText className="h-4 w-4"/>{a.category}</span>
          <h3 className="mt-4 text-lg font-bold text-slate-950">{a.title}</h3>
          <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">{a.summary}</p>
          <span className="mt-auto flex items-center gap-2 pt-5 text-sm font-bold text-[#0064E0]">Read article <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1"/></span>
        </button>)}</div>
      </>}
      <div className="mt-9 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-7">
        <div className="flex items-start gap-3"><span className="rounded-xl bg-blue-50 p-3 text-[#0064E0]"><LifeBuoy className="h-5 w-5"/></span>
          <div><h2 className="font-bold text-slate-950">Need personal assistance?</h2><p className="mt-1 text-sm text-slate-600">Our team can help with your specific question.</p></div></div>
        <Link href="/support" className="rounded-xl bg-[#0064E0] px-5 py-3 text-sm font-bold text-white">Contact support</Link>
      </div>
    </div>
  </section>;
}
