import Link from "next/link";

export function Migration() {
  return (
    <section className="bg-[#F8FAFC] px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_18px_70px_rgba(15,23,42,0.05)] lg:grid-cols-[1fr_0.8fr] lg:p-10">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cloud-blue">Migration</p>
          <h2 className="mt-4 text-3xl font-medium tracking-[-0.04em] text-slate-950 sm:text-4xl">Already hosted somewhere else?</h2>
          <p className="mt-5 max-w-2xl text-base leading-8 text-slate-500">
            This page includes a migration section so visitors know Octalve Cloud can help them move domains, websites, email and DNS safely.
          </p>
        </div>
        <div className="flex items-center lg:justify-end">
          <Link href="/migration" className="inline-flex min-h-12 items-center justify-center rounded-full bg-cloud-blue px-7 text-sm font-semibold text-white transition hover:bg-blue-600">
            Request Migration Review
          </Link>
        </div>
      </div>
    </section>
  );
}
