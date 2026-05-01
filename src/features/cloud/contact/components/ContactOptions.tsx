import { cloudLinks } from "@/features/cloud/data/cloud-links";

const options = [
  { title: "Email", value: cloudLinks.supportEmail },
  { title: "Phone", value: cloudLinks.supportPhone },
  { title: "Client Console", value: "console.octalve.cloud" },
];

export function ContactOptions() {
  return (
    <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-3xl font-medium tracking-[-0.04em] text-slate-950 sm:text-4xl">Choose the right contact channel.</h2>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {options.map((option) => (
            <div key={option.title} className="rounded-[1.5rem] border border-slate-200 bg-[#F8FAFC] p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cloud-blue">{option.title}</p>
              <p className="mt-4 text-lg font-semibold text-slate-950">{option.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
