const packages = [
  { name: "Starter Mail", price: "From ₦—", features: ["Clean setup", "Guided support", "Upgrade-ready"] },
  { name: "Business Mail", price: "From ₦—", features: ["Clean setup", "Guided support", "Upgrade-ready"] },
  { name: "Team Mail", price: "From ₦—", features: ["Clean setup", "Guided support", "Upgrade-ready"] }
];

export function Packages() {
  return (
    <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cloud-blue">Packages</p>
          <h2 className="mt-4 text-3xl font-medium tracking-[-0.04em] text-slate-950 sm:text-4xl">Demo packages ready for real pricing.</h2>
        </div>
        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {packages.map((plan) => (
            <div key={plan.name} className="rounded-[1.75rem] border border-slate-200 bg-[#F8FAFC] p-6">
              <h3 className="text-xl font-semibold text-slate-950">{plan.name}</h3>
              <p className="mt-3 text-3xl font-medium tracking-[-0.04em] text-cloud-blue">{plan.price}</p>
              <ul className="mt-6 space-y-3 text-sm text-slate-600">
                {plan.features.map((feature) => <li key={feature}>✓ {feature}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
