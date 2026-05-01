const faqs = [
  {
    question: "Does this check real domain availability?",
    answer: "The current frontend generates name ideas and prepares search links. Real availability checking will connect to the Octalve Cloud backend/registrar API.",
  },
  {
    question: "Can we change the AI logic later?",
    answer: "Yes. This page is structured so the frontend can later call a live AI/domain suggestion API from console.octalve.cloud.",
  },
];

export function FAQ() {
  return (
    <section className="bg-[#F8FAFC] px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-center text-3xl font-medium tracking-[-0.04em] text-slate-950 sm:text-4xl">Domain generator FAQ</h2>
        <div className="mt-8 space-y-3">
          {faqs.map((item) => (
            <details key={item.question} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <summary className="cursor-pointer list-none text-base font-semibold text-slate-950">{item.question}</summary>
              <p className="mt-3 text-sm leading-7 text-slate-500">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
