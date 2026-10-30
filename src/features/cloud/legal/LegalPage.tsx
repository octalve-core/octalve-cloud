import Link from "next/link";
import type {ReactNode} from "react";
import {CloudShell} from "@/features/cloud/components/CloudShell";
import {cloudLinks} from "@/features/cloud/data/cloud-links";

export const LEGAL_VERSION="2026-10-30";

export function LegalSection({title,children}:{title:string;children:ReactNode}){
 return <section className="space-y-3 border-b border-slate-200 py-7 last:border-0">
  <h2 className="text-lg font-medium tracking-tight text-[#000A16] sm:text-xl">{title}</h2>
  <div className="space-y-3 text-sm leading-7 text-slate-600 sm:text-base">{children}</div>
 </section>;
}

export function LegalPage({title,description,children}:{title:string;description:string;children:ReactNode}){
 return <CloudShell>
  <article className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
   <nav aria-label="Breadcrumb" className="mb-5 flex items-center gap-2 text-sm text-slate-500">
    <Link className="text-[#0064E0] hover:underline" href="/">Home</Link><span aria-hidden="true">/</span><span>{title}</span>
   </nav>
   <header className="border-b border-slate-200 pb-8">
    <p className="text-xs font-medium uppercase tracking-[.16em] text-[#0064E0]">Octalve Cloud · Policies</p>
    <h1 className="mt-3 text-3xl font-medium tracking-tight text-[#000A16] sm:text-4xl">{title}</h1>
    <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">{description}</p>
    <p className="mt-4 text-xs text-slate-500">Policy version {LEGAL_VERSION} · Published 30 October 2026</p>
   </header>
   {children}
   <footer className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-6 text-sm leading-7 text-slate-600">
    <p className="font-medium text-[#000A16]">Questions about these policies?</p>
    <p>Contact <a className="text-[#0064E0] underline" href={`mailto:${cloudLinks.supportEmail}`}>{cloudLinks.supportEmail}</a> or visit our <Link className="text-[#0064E0] underline" href="/contact">contact page</Link>.</p>
   </footer>
  </article>
 </CloudShell>;
}
