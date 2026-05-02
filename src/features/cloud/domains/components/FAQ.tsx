"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

type FAQItem = {
  question: string;
  answer: string;
};

const FAQ_COLORS = {
  bg: "#000A16",
};

const INITIAL_VISIBLE_FAQS = 5;

const faqs: FAQItem[] = [
  {
    question: "What is a domain name?",
    answer:
      "A domain name is the address people type into a browser to find your website online. Examples include octalve.cloud, google.com, and facebook.com. Ideally, your domain should match your business, brand, product, or project name so customers can remember and trust it easily.",
  },
  {
    question: "Why do I need to buy a domain name?",
    answer:
      "A domain name gives your business a professional online identity. Instead of depending only on social media links, your business can have a proper website address, branded email, better credibility, and a stronger foundation for search, marketing, and customer trust.",
  },
  {
    question: "What is a subdomain, and how does it work?",
    answer:
      "A subdomain is an extension of your main domain. For example, if your main domain is yourbusiness.com, you can create subdomains like shop.yourbusiness.com, blog.yourbusiness.com, or app.yourbusiness.com. Subdomains are useful for separating different parts of your online presence.",
  },
  {
    question: "How do I pick the right website name?",
    answer:
      "Choose a name that is short, clear, memorable, easy to spell, and close to your brand name. Avoid unnecessary symbols, confusing spellings, or names that are too long. If possible, secure popular extensions like .com, .com.ng, .ng, or another extension that fits your audience.",
  },
  {
    question: "Once I register a domain, can I change it later?",
    answer:
      "You cannot directly rename an already registered domain. If you want a different name, you will need to register a new domain and then redirect or move your website, email, and brand assets to the new domain. Octalve Cloud can guide you through that process when needed.",
  },
  {
    question: "How long does a domain name registration last?",
    answer:
      "Most domain names are registered for a minimum of one year. Some extensions allow multi-year registration. Before the domain expires, you need to renew it so you do not lose access to the name.",
  },
  {
    question: "What are the requirements to buy a domain name?",
    answer:
      "Most domains only require your correct registration details, contact information, and payment. Some country-specific domains may require extra information depending on registry rules. Octalve Cloud will guide you if a particular extension needs additional requirements.",
  },
  {
    question:
      "I already purchased a domain name. Can I transfer it to Octalve Cloud?",
    answer:
      "Yes. If your current registrar allows transfer, you can move your domain to Octalve Cloud. Some domains may need to be unlocked first, and you may need an authorization or EPP code from your current provider.",
  },
  {
    question: "What are TLDs, ccTLDs, and gTLDs?",
    answer:
      "A TLD is the domain extension at the end of a domain name, such as .com, .net, or .org. A ccTLD is country-based, such as .ng for Nigeria. A gTLD is a generic extension, such as .com, .cloud, .shop, or .online.",
  },
  {
    question: "How long does it take to register a domain name?",
    answer:
      "Many domains become active shortly after registration, but DNS propagation can take some time. In many cases, it works within minutes or a few hours, but full global propagation can take up to 24–48 hours depending on DNS and registry behavior.",
  },
  {
    question: "How do I get a free domain?",
    answer:
      "Some hosting or launch packages may include a free or discounted domain for a period of time. When Octalve Cloud offers this, the condition will be clearly stated on the package, including the domain extension, duration, and renewal terms.",
  },
  {
    question: "Can I sell my domain name?",
    answer:
      "Yes. A domain name can be sold if you own it and the registry rules allow transfer. Premium, short, memorable, or keyword-rich domains can sometimes have higher resale value.",
  },
  {
    question: "What if the website name is unavailable on the domain checker?",
    answer:
      "If your preferred domain is already taken, you can try another extension, adjust the name slightly, add a relevant word, or use a different brand variation. Octalve Cloud can also suggest alternatives that still fit your business direction.",
  },
  {
    question: "What is domain privacy protection?",
    answer:
      "Domain privacy protection helps hide some of your personal registration details from public WHOIS lookup where supported by the extension. It helps reduce spam and protects your contact information from being too exposed online.",
  },
  {
    question: "What is the difference between .com, .net, .org, and .info?",
    answer:
      ".com is commonly used for businesses and brands. .net is often used for networks, tech, or internet-related services. .org is commonly used by organizations, communities, and nonprofits. .info is usually used for informational websites. Your choice should match your brand and audience.",
  },
  {
    question:
      "What else can I do with a domain name besides building a website?",
    answer:
      "You can use a domain for business email, landing pages, online stores, customer portals, brand redirects, campaign pages, app links, and professional digital identity. A domain is more than a website address; it is a foundation for your online presence.",
  },
  {
    question: "What is the difference between a domain name and web hosting?",
    answer:
      "A domain name is your website address, while web hosting is the server space where your website files, database, email, and related assets live. You need both for a complete website: the domain points people to the hosting where your website is stored.",
  },
  {
    question: "What are premium domain names and why are they more expensive?",
    answer:
      "Premium domains are names considered more valuable because they may be short, memorable, keyword-rich, brandable, or already owned by someone else. Their price is usually higher than normal domain registration because of demand, rarity, or resale value.",
  },
  {
    question:
      "Can Octalve Cloud help me connect my domain to hosting and email?",
    answer:
      "Yes. Octalve Cloud is built to help you connect your domain, hosting, SSL, DNS, and business email in a more guided way, so your website can go live with less technical confusion.",
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
    <section
      className="relative overflow-hidden px-4 py-16 text-white sm:px-6 lg:px-8 lg:py-24"
      style={{ backgroundColor: FAQ_COLORS.bg }}
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute left-[-140px] top-[-140px] h-[380px] w-[380px] rounded-full bg-cloud-blue/20 blur-3xl" />
        <div className="absolute bottom-[-170px] right-[-150px] h-[430px] w-[430px] rounded-full bg-[#29BE3E]/10 blur-3xl" />
        <div className="absolute left-1/2 top-1/2 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.035] blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-200">
            FAQ
          </p>

          <h2 className="mt-4 text-3xl font-medium tracking-[-0.045em] text-white sm:text-4xl lg:text-5xl">
            Frequently Asked Questions
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
            Clear answers about domain names, domain registration, extensions,
            privacy protection, hosting, email, and how Octalve Cloud helps you
            build a stronger online presence.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-4xl space-y-4">
          {visibleFaqs.map((item, index) => {
            const isOpen = activeIndex === index;

            return (
              <div
                key={item.question}
                className={[
                  "overflow-hidden rounded-2xl border bg-white text-slate-950 shadow-[0_20px_60px_rgba(0,0,0,0.22)] transition",
                  isOpen
                    ? "border-cloud-blue/30"
                    : "border-white/10 hover:border-cloud-blue/25",
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
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/15 bg-white px-6 py-3 text-sm font-semibold text-cloud-blue shadow-[0_16px_45px_rgba(0,0,0,0.22)] transition hover:-translate-y-0.5 hover:bg-blue-50"
            >
              {showAll ? "Show less questions" : "Show more questions"}
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
}
