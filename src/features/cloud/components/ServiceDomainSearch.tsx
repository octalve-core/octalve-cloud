"use client";

import { useId, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Search } from "lucide-react";
import { prepareHeroDomainQuery } from "@/lib/hero-domain-query";

const extensions = [".com", ".com.ng", ".ng", ".net", ".org", ".ai", ".shop", ".cloud"];

export function ServiceDomainSearch() {
  const id = useId();
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [extension, setExtension] = useState("");
  const [error, setError] = useState("");
  function submit() {
    const request = prepareHeroDomainQuery(query, extension ? [extension] : extensions);
    if (!request) {
      setError("Enter a valid domain or business name without spaces.");
      return;
    }
    const params = new URLSearchParams({ q: request.query });
    if (request.tlds.length === 1) params.set("tld", request.tlds[0]);
    router.push("/domains/?" + params.toString());
  }
  return (
    <section aria-labelledby={id + "-title"} className="bg-black px-4 py-16 text-white sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-5xl">
        <div className="mx-auto max-w-3xl text-center">
          <h2 id={id + "-title"} className="text-[clamp(2rem,4vw,3.25rem)] font-normal leading-tight tracking-[-0.045em]">Your brand starts with the right name.</h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-zinc-400">Find your domain, explore extensions and secure your place online.</p>
        </div>
        <form onSubmit={e => { e.preventDefault(); submit(); }} className="mx-auto mt-9 max-w-3xl rounded-2xl border border-white/15 bg-[#181818] p-3 focus-within:border-violet-400">
          <label htmlFor={id + "-query"} className="sr-only">Domain or business name</label>
          <div className="flex items-center gap-3 px-3">
            <Search size={20} className="shrink-0 text-zinc-400" aria-hidden="true" />
            <input id={id + "-query"} value={query} onChange={e => { setQuery(e.target.value); setError(""); }} placeholder="Start typing your domain…" autoCapitalize="none" autoCorrect="off" spellCheck={false} maxLength={253} aria-invalid={!!error} aria-describedby={error ? id + "-error" : undefined} className="h-14 min-w-0 flex-1 border-0 bg-transparent text-lg text-white outline-none placeholder:text-zinc-400 focus:ring-0" />
          </div>
          <div className="flex justify-end">
            <button type="submit" className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-[#8543B7] px-5 text-sm font-medium text-white hover:bg-[#7536A5] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-300 sm:w-auto">Search Domain <ArrowRight size={17} aria-hidden="true" /></button>
          </div>
        </form>
        <fieldset className="mx-auto mt-5 max-w-3xl">
          <legend className="sr-only">Suggested domain extensions</legend>
          <div className="flex flex-wrap justify-center gap-2">
            {["", ...extensions].map(tld => (
              <label key={tld || "popular"} className={`cursor-pointer rounded-lg border px-3 py-3 text-sm focus-within:ring-2 focus-within:ring-violet-400 ${extension === tld ? "border-violet-400 bg-violet-400/15 text-violet-200" : "border-white/10 bg-[#121212] text-zinc-300 hover:border-violet-400"}`}>
                <input type="radio" name={id + "-extension"} className="sr-only" checked={extension === tld} onChange={() => { setExtension(tld); setError(""); }} />
                {tld || "Popular"}
              </label>
            ))}
          </div>
        </fieldset>
        {error && <p id={id + "-error"} role="alert" className="mt-4 text-center text-sm text-amber-200">{error}</p>}
        <p className="mt-5 text-center text-xs leading-5 text-zinc-400">Enter a full domain to search its exact extension, or a name to explore selected extensions.</p>
      </div>
    </section>
  );
}
