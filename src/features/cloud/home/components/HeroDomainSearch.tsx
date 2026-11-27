"use client";

import Link from "next/link";
import { Search, Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { getDomainSuggestions, type DomainSuggestion } from "@/lib/domain-pricing-adapter";
import { prepareHeroDomainQuery } from "@/lib/hero-domain-query";
import { DomainResultCard } from "./DomainResultCard";

const examples = ["growyourbusinessonline.com", "youridea.ai", "growmybrand.shop"];
const defaultTlds = [".com", ".com.ng", ".ng", ".ai", ".shop", ".cloud"];

export function HeroDomainSearch() {
  const [query, setQuery] = useState("");
  const [placeholder, setPlaceholder] = useState(examples[0]);
  const [focused, setFocused] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [results, setResults] = useState<DomainSuggestion[]>([]);
  const pending = useRef<AbortController | null>(null);
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let timer: number | undefined;
    let word = 0, count = examples[0].length, deleting = true;
    function tick() {
      const example = examples[word];
      if (deleting) {
        count = Math.max(0, count - 1);
        setPlaceholder(example.slice(0, count));
        if (count === 0) {
          word = (word + 1) % examples.length;
          deleting = false;
        }
        timer = window.setTimeout(tick, count === 0 ? 250 : 45);
      } else {
        count += 1;
        setPlaceholder(example.slice(0, count));
        if (count === example.length) deleting = true;
        timer = window.setTimeout(tick, deleting ? 1400 : 85);
      }
    }
    function sync() {
      window.clearTimeout(timer);
      if (!media.matches && !document.hidden && !focused && !query) {
        timer = window.setTimeout(tick, 1400);
      }
    }
    sync();
    media.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    return () => {
      window.clearTimeout(timer);
      media.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", sync);
    };
  }, [query, focused]);
  useEffect(() => () => pending.current?.abort(), []);

  async function search() {
    if (pending.current) return;
    const request = prepareHeroDomainQuery(query, defaultTlds);
    setResults([]);
    if (!request) {
      setStatus("error");
      setMessage("Enter a valid domain or business name using letters, numbers and hyphens.");
      input.current?.focus();
      return;
    }
    const controller = new AbortController();
    pending.current = controller;
    setStatus("loading");
    setMessage("Checking domain availability and published pricing…");
    const timeout = window.setTimeout(() => controller.abort(), 12000);
    try {
      const found = await getDomainSuggestions({ ...request, signal: controller.signal });
      if (controller.signal.aborted) throw new Error("timeout");
      setResults(found);
      setStatus(found.length ? "success" : "error");
      setMessage(found.length ? `${found.length} domain results returned` : "No domain information returned. Please try again.");
    } catch {
      setStatus("error");
      setMessage("Domain lookup could not be completed. Please try again.");
    } finally {
      window.clearTimeout(timeout);
      if (pending.current === controller) pending.current = null;
    }
  }

  return (
    <div className="mx-auto mt-8 max-w-5xl sm:mt-10">
      <form onSubmit={event => { event.preventDefault(); void search(); }}
        className="flex flex-col gap-3 rounded-[28px] bg-[#18191B] p-4 ring-1 ring-white/10 sm:flex-row sm:items-center sm:gap-4 sm:p-7 lg:p-8">
        <div className="flex min-w-0 flex-1 items-center gap-2 rounded-full bg-[#111214] px-3 py-1.5 ring-1 ring-white/5 focus-within:ring-2 focus-within:ring-blue-400 sm:px-4">
          <label htmlFor="hero-domain" className="sr-only">Domain name or business name</label>
          <span aria-hidden="true" className="flex shrink-0 items-center gap-2 rounded-full bg-white/5 px-3 py-2 text-sm text-zinc-400">
            <Search size={17} />www.
          </span>
          <input ref={input} id="hero-domain" type="text" value={query} onChange={event => { setQuery(event.target.value); }}
            onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
            placeholder={focused ? "Enter your domain name" : placeholder} maxLength={253} autoCapitalize="none" autoCorrect="off" spellCheck={false} inputMode="url"
            className="h-11 min-w-0 flex-1 border-0 bg-transparent p-0 text-base font-normal text-white placeholder:text-zinc-400 focus:outline-none focus:ring-0" />
        </div>
        <button type="submit" disabled={status === "loading"}
          className="flex min-h-12 w-full shrink-0 items-center justify-center gap-2 rounded-full bg-[#2269DE] px-8 text-base font-medium text-white hover:bg-cloud-blueDark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-400 disabled:opacity-70 sm:w-auto sm:min-w-36 sm:min-h-14">
          {status === "loading" ? <><Loader2 size={18} className="motion-safe:animate-spin" aria-hidden="true" />Searching</> : "Search"}
        </button>
      </form>
      <p className="mt-4 text-center text-sm text-zinc-400">Search popular extensions or <Link href="/domains" className="underline underline-offset-4 hover:text-white">explore domain pricing</Link>.</p>
      <p role="status" className={status === "idle" ? "sr-only" : "mt-4 text-center text-sm text-zinc-300"}>{message}</p>
      {results.length > 0 && <section aria-label="Domain search results" className="mx-auto mt-6 max-w-2xl">
        <div className="mb-4">
          <h2 className="text-xl font-medium text-white">Domain results</h2>
          <p className="mt-1 text-sm text-zinc-400">Published registration and renewal prices.</p>
        </div>
        <ul className="space-y-3">
          {results.map(item => <li key={item.domain}><DomainResultCard item={item} /></li>)}
        </ul>
      </section>}
    </div>
  );
}
