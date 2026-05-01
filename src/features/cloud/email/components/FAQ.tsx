const faqs = [
  {
    question: "Can this page have its own FAQ content?",
    answer: "Yes. Every page folder owns its own FAQ.tsx, so you can edit the questions without touching other pages.",
  },
  {
    question: "Will this affect the GitHub deployment workflow?",
    answer: "No. This refactor only changes frontend files and route imports. It does not touch next.config.ts or .github/workflows/deploy.yml.",
  },
  {
    question: "Can we replace this demo copy later?",
    answer: "Yes. The current text is a clean demo foundation. Each component is ready for final service-specific copy.",
  },
];

export function FAQ() {
  return (
    <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cloud-blue">FAQ</p>
          <h2 className="mt-4 text-3xl font-medium tracking-[-0.04em] text-slate-950 sm:text-4xl">Questions this page answers.</h2>
        </div>
        <div className="mt-10 space-y-3">
          {faqs.map((item) => (
            <details key={item.question} className="group rounded-2xl border border-slate-200 bg-[#F8FAFC] p-5">
              <summary className="cursor-pointer list-none text-base font-semibold text-slate-950">{item.question}</summary>
              <p className="mt-3 text-sm leading-7 text-slate-500">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
