"use client";

import { Search } from "lucide-react";
import { FormEvent, useState } from "react";
import { cloudLinks } from "@/features/cloud/data/cloud-links";

export function CloudDomainSearch() {
  const [domain, setDomain] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const cleanDomain = domain.trim().toLowerCase();
    const target = cleanDomain
      ? `${cloudLinks.domainSearch}?domain=${encodeURIComponent(cleanDomain)}`
      : cloudLinks.domainSearch;

    window.open(target, "_blank", "noopener,noreferrer");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto mt-8 flex w-full max-w-2xl flex-col gap-3 rounded-[2rem] border border-cloud-border bg-white p-2 shadow-soft sm:flex-row"
    >
      <label className="sr-only" htmlFor="domain-search">
        Search domain name
      </label>
      <div className="flex min-h-14 flex-1 items-center gap-3 rounded-[1.5rem] bg-cloud-mist px-4">
        <Search className="h-5 w-5 text-cloud-blue" aria-hidden="true" />
        <input
          id="domain-search"
          value={domain}
          onChange={(event) => setDomain(event.target.value)}
          placeholder="yourbusiness.com.ng"
          className="h-12 w-full border-none bg-transparent p-0 text-sm font-semibold text-cloud-navy placeholder:text-slate-400 focus:ring-0"
        />
      </div>
      <button
        type="submit"
        className="octalve-cloud-focus min-h-14 rounded-[1.5rem] bg-cloud-blue px-6 text-sm font-black text-white transition hover:bg-cloud-blueDark"
      >
        Search Domain
      </button>
    </form>
  );
}
