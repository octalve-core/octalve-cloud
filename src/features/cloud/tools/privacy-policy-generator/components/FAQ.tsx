const faqs = [
  { question: "Is this legal advice?", answer: "No. It is a starter template for convenience and should be reviewed before publishing." },
  { question: "Can this connect to a backend later?", answer: "Yes. The page can later call the Octalve Cloud console API to save generated policies to a client account." },
];

export function FAQ() {
  return (
    <section className="bg-[#F8FAFC] px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-center text-3xl font-medium tracking-[-0.04em] text-slate-950 sm:text-4xl">Privacy policy FAQ</h2>
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
