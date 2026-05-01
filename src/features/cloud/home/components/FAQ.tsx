"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

type FAQItem = {
  question: string;
  answer: string;
};

const INITIAL_VISIBLE_FAQS = 5;

const faqs: FAQItem[] = [
  {
    question: "What is Octalve Cloud?",
    answer:
      "Octalve Cloud is the hosting and cloud infrastructure arm of Octalve. It helps businesses register domains, host websites, create business emails, secure websites with SSL, and manage their online presence with guided support.",
  },
  {
    question: "Who is Octalve Cloud built for?",
    answer:
      "Octalve Cloud is built for SMEs, founders, creators, schools, NGOs, agencies, and growing businesses that want a simple, guided, and reliable way to launch and manage their digital infrastructure.",
  },
  {
    question: "Can I host my business website on Octalve Cloud?",
    answer:
      "Yes. You can host portfolio websites, company websites, landing pages, WordPress websites, business portals, blogs, and other digital platforms depending on the hosting package you choose.",
  },
  {
    question: "Do your hosting packages include free SSL?",
    answer:
      "Yes. Our hosting packages are designed to support SSL so your website can run securely over HTTPS. This helps improve trust, security, and browser compatibility.",
  },
  {
    question: "Can I create business email with my domain?",
    answer:
      "Yes. Depending on your package, you can create professional email accounts using your domain, such as info@yourbusiness.com or support@yourbusiness.com.",
  },
  {
    question: "Can I move my existing website to Octalve Cloud?",
    answer:
      "Yes. Octalve Cloud supports website migration. We can guide you through moving your website, domain, DNS, email, and hosting setup from another provider to Octalve Cloud.",
  },
  {
    question: "Is Octalve Cloud different from Namecheap or Hostinger?",
    answer:
      "Yes. Namecheap and Hostinger are strong global platforms, but Octalve Cloud is focused on giving Nigerian SMEs and founders a more guided, business-friendly, and locally understandable hosting experience.",
  },
  {
    question: "Can I upgrade my hosting package later?",
    answer:
      "Yes. The packages are designed to be upgrade-ready. As your website, traffic, email needs, or business operations grow, you can move to a higher package or request a more suitable setup.",
  },
  {
    question: "Will I manage my services from the client console?",
    answer:
      "Yes. The planned Octalve Cloud console will allow clients to manage orders, invoices, services, support, and hosting-related actions from one place.",
  },
  {
    question: "Does this frontend affect GitHub or deployment settings?",
    answer:
      "No. This FAQ component only affects the website interface. It does not touch next.config.ts, GitHub Actions, YAML deployment, DNS records, or server deployment settings.",
  },
];

export function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const [showAll, setShowAll] = useState(false);

  const visibleFaqs = showAll ? faqs : faqs.slice(0, INITIAL_VISIBLE_FAQS);

  function toggleFaq(index: number) {
    setActiveIndex((current) => (current === index ? null : index));
  }

  return (
    <section className="relative overflow-hidden bg-cloud-blue px-4 py-16 text-white sm:px-6 lg:px-8 lg:py-24">
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        aria-hidden="true"
      >
        <div className="absolute left-[-120px] top-[-120px] h-[360px] w-[360px] rounded-full bg-white/10 blur-3xl" />
        <div className="absolute bottom-[-160px] right-[-140px] h-[420px] w-[420px] rounded-full bg-white/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-100">
            FAQ
          </p>

          <h2 className="mt-4 text-3xl font-medium tracking-[-0.045em] text-white sm:text-4xl lg:text-5xl">
            Frequently Asked Questions
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-blue-100/90 sm:text-lg">
            Clear answers about Octalve Cloud hosting, domains, email, SSL,
            migration, and how the public website connects to the client
            console.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-4xl space-y-4">
          {visibleFaqs.map((item, index) => {
            const isOpen = activeIndex === index;

            return (
              <div
                key={item.question}
                className={[
                  "overflow-hidden rounded-2xl border bg-white text-slate-950 shadow-[0_18px_55px_rgba(0,0,0,0.14)] transition",
                  isOpen
                    ? "border-white"
                    : "border-white/80 hover:border-blue-100",
                ].join(" ")}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="flex w-full items-center justify-between gap-5 px-5 py-5 text-left sm:px-6"
                  aria-expanded={isOpen}
                >
                  <span className="text-base font-semibold leading-7 text-slate-950">
                    {item.question}
                  </span>

                  <span
                    className={[
                      "flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-500 transition",
                      isOpen ? "rotate-180 text-cloud-blue" : "",
                    ].join(" ")}
                  >
                    <ChevronDown className="h-4 w-4" aria-hidden="true" />
                  </span>
                </button>

                <div
                  className={[
                    "grid transition-all duration-300 ease-in-out",
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0",
                  ].join(" ")}
                >
                  <div className="overflow-hidden">
                    <p className="border-t border-slate-100 px-5 pb-6 pt-4 text-sm leading-7 text-slate-500 sm:px-6 sm:text-base">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {faqs.length > INITIAL_VISIBLE_FAQS ? (
          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={() => {
                setShowAll((current) => !current);
                setActiveIndex(0);
              }}
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/20 bg-white px-6 py-3 text-sm font-semibold text-cloud-blue shadow-[0_16px_40px_rgba(0,0,0,0.16)] transition hover:-translate-y-0.5 hover:bg-blue-50"
            >
              {showAll ? "Show less questions" : "Show more questions"}
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
}
