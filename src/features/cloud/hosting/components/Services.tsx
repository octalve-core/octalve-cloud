const services = [
  { title: "Shared Hosting", description: "Demo content for shared hosting under Octalve Cloud. Replace with final sales copy." },
  { title: "WordPress Hosting", description: "Demo content for wordpress hosting under Octalve Cloud. Replace with final sales copy." },
  { title: "Website Setup", description: "Demo content for website setup under Octalve Cloud. Replace with final sales copy." },
  { title: "SSL Setup", description: "Demo content for ssl setup under Octalve Cloud. Replace with final sales copy." },
  { title: "Backup Guidance", description: "Demo content for backup guidance under Octalve Cloud. Replace with final sales copy." },
  { title: "Technical Support", description: "Demo content for technical support under Octalve Cloud. Replace with final sales copy." }
];

export function Services() {
  return (
    <section className="bg-[#F8FAFC] px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cloud-blue">Services</p>
          <h2 className="mt-4 text-3xl font-medium tracking-[-0.04em] text-slate-950 sm:text-4xl">Services this page can sell clearly.</h2>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div key={service.title} className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-[0_12px_40px_rgba(15,23,42,0.04)] transition hover:-translate-y-1 hover:border-cloud-blue/30">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cloud-blue/10 text-cloud-blue">•</div>
              <h3 className="mt-6 text-lg font-semibold text-slate-950">{service.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-500">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
