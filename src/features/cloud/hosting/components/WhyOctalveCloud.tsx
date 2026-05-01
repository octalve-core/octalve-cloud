const reasons = [
  "Simple hosting plans",
  "Business-friendly support",
  "Built for websites and brands"
];

export function WhyOctalveCloud() {
  return (
    <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cloud-blue">Why Octalve Cloud</p>
          <h2 className="mt-4 text-3xl font-medium tracking-[-0.04em] text-slate-950 sm:text-4xl">Cloud services explained for business owners, not just technicians.</h2>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {reasons.map((reason) => (
            <div key={reason} className="rounded-[1.5rem] bg-[#F8FAFC] p-6 ring-1 ring-slate-200">
              <p className="text-lg font-semibold text-slate-950">{reason}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
