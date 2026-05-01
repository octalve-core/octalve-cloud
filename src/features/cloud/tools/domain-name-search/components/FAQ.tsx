const faqs = [
  { question: "Does this register the domain immediately?", answer: "No. It prepares the search and sends the client to the future Octalve Cloud order flow." },
  { question: "Can it check availability live?", answer: "Yes, when the registrar/domain API is connected inside the Octalve Cloud backend." },
];

export function FAQ() {
  return (
    <section className="bg-[#F8FAFC] px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl space-y-3">
        {faqs.map((item) => (
          <details key={item.question} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <summary className="cursor-pointer list-none text-base font-semibold text-slate-950">{item.question}</summary>
            <p className="mt-3 text-sm leading-7 text-slate-500">{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
