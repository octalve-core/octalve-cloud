export function FAQ() {
  return (
    <section className="bg-[#F8FAFC] px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl rounded-2xl border border-slate-200 bg-white p-6 text-sm leading-7 text-slate-500 shadow-sm">
        WHOIS/RDAP data must come from a backend provider because browser-only WHOIS checks are limited by CORS, rate limits and registry access rules.
      </div>
    </section>
  );
}
