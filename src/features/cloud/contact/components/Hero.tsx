import Link from "next/link";

export function Hero() {
  return (
    <section className="bg-[#F8FAFC] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cloud-blue">Contact Octalve Cloud</p>
        <h1 className="mx-auto mt-5 max-w-4xl text-4xl font-medium tracking-[-0.055em] text-slate-950 sm:text-5xl lg:text-7xl">
          Talk to us about domains, hosting, email, servers or migration.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-500 sm:text-lg">
          Use this contact page as the public sales and support entry point for Octalve Cloud visitors.
        </p>
        <div className="mt-8 flex justify-center">
          <Link href="/support" className="rounded-full bg-cloud-blue px-7 py-3 text-sm font-semibold text-white transition hover:bg-blue-600">Go to Support</Link>
        </div>
      </div>
    </section>
  );
}
