const points = [
  "Add HTTPS trust to your website",
  "Reduce browser security warnings",
  "Support safer online transactions and forms"
];

export function Overview() {
  return (
    <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cloud-blue">Overview</p>
          <h2 className="mt-4 text-3xl font-medium tracking-[-0.04em] text-slate-950 sm:text-4xl">What this SSL / Security page explains.</h2>
        </div>
        <div className="grid gap-4">
          {points.map((point, index) => (
            <div key={point} className="rounded-[1.5rem] border border-slate-200 bg-[#F8FAFC] p-6">
              <span className="text-sm font-semibold text-cloud-blue">0{index + 1}</span>
              <p className="mt-3 text-lg font-medium text-slate-900">{point}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
