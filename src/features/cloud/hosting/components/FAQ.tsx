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
    question: "What is web hosting?",
    answer:
      "Web hosting is the service that stores your website files, database, images, emails, and other website resources on a server so people can access your website online. Your domain is the address people type, while hosting is the space where your website actually lives.",
  },
  {
    question: "Why do I need web hosting for my website?",
    answer:
      "You need web hosting because a website cannot stay online by itself. Hosting gives your website the server space, speed, security, storage, and technical environment it needs to load properly when visitors open your domain.",
  },
  {
    question: "What type of hosting is best for my business?",
    answer:
      "For most small businesses, blogs, landing pages, portfolios, and starter websites, shared or managed hosting is usually enough. For websites with higher traffic, custom applications, large databases, or heavier workloads, VPS, cloud, or dedicated hosting may be better. Octalve Cloud helps you choose based on your website size, traffic, budget, and growth plan.",
  },
  {
    question: "Can I host a WordPress website on Octalve Cloud?",
    answer:
      "Yes. Octalve Cloud hosting is suitable for WordPress websites, business websites, blogs, landing pages, and other CMS-based projects. You can use it to run WordPress smoothly, install themes and plugins, manage content, and keep your website online with reliable support.",
  },
  {
    question: "What is the difference between web hosting and a domain name?",
    answer:
      "A domain name is your website address, such as yourbusiness.com. Web hosting is the server space where your website files and data are stored. You need both for a complete website: the domain points visitors to the hosting server where your website is hosted.",
  },
  {
    question: "Do I get SSL with my hosting?",
    answer:
      "SSL helps secure your website by enabling HTTPS, which protects data shared between your visitors and your website. Octalve Cloud hosting is structured to support SSL setup so your website can look more trustworthy and avoid browser security warnings.",
  },
  {
    question: "Can Octalve Cloud migrate my existing website?",
    answer:
      "Yes. If your website is already hosted somewhere else, Octalve Cloud can help move your website files, database, email records, DNS settings, and SSL configuration where needed. Migration support helps reduce downtime and technical confusion during the switch.",
  },
  {
    question: "How long does it take for my hosting to become active?",
    answer:
      "Hosting setup can usually be completed quickly after payment and account activation. However, if a domain or DNS change is involved, it may take some time before the website reflects everywhere. In many cases it works within minutes or a few hours, but full DNS propagation can take up to 24–48 hours.",
  },
  {
    question: "What does uptime mean in web hosting?",
    answer:
      "Uptime means the amount of time your website stays online and accessible to visitors. Strong uptime is important because downtime can affect sales, trust, customer experience, and search visibility. Octalve Cloud hosting is built with reliability as a key priority.",
  },
  {
    question: "Will my website load fast on Octalve Cloud?",
    answer:
      "Octalve Cloud hosting is designed for fast, stable website delivery. Website speed can also depend on your website design, image sizes, plugins, code quality, caching, and traffic level. For best performance, Octalve Cloud can guide you on the right hosting plan and basic optimization practices.",
  },
  {
    question: "Does web hosting include business email?",
    answer:
      "Some hosting packages may support professional email accounts using your domain, such as info@yourbusiness.com or support@yourbusiness.com. Availability depends on the selected package and configuration. Octalve Cloud can help you set up email properly when included or when connected through an external email provider.",
  },
  {
    question: "What is bandwidth in web hosting?",
    answer:
      "Bandwidth refers to the amount of data transferred between your website and your visitors. When people open pages, view images, download files, or submit forms, bandwidth is used. A website with more visitors, larger images, or heavier files usually needs more bandwidth.",
  },
  {
    question: "What is storage in web hosting?",
    answer:
      "Storage is the amount of server space available for your website files, images, videos, emails, databases, backups, and other assets. A simple business website may need less storage, while an online store, media-heavy website, or large portal may need more.",
  },
  {
    question: "Can I upgrade my hosting plan later?",
    answer:
      "Yes. As your website grows, you may need more storage, bandwidth, processing power, email capacity, or advanced server resources. Octalve Cloud is structured to let you start with a suitable plan and upgrade when your business or traffic increases.",
  },
  {
    question: "Do I need technical knowledge to use Octalve Cloud hosting?",
    answer:
      "No. Octalve Cloud is built to make hosting easier for business owners, founders, and teams who do not want to struggle with technical server setup. You can get guided support for hosting, domain connection, SSL, email, and basic website launch needs.",
  },
  {
    question: "Are backups included with hosting?",
    answer:
      "Backups help protect your website by keeping copies of important files and data. Backup availability, frequency, and restoration options may depend on the hosting package. For important business websites, it is always advisable to use a plan or add-on that supports reliable backups.",
  },
  {
    question: "Can I host more than one website?",
    answer:
      "This depends on the hosting package you choose. Some plans are designed for one website, while higher plans may support multiple websites, extra domains, subdomains, databases, and email accounts. Octalve Cloud can recommend the right package based on how many projects you want to host.",
  },
  {
    question: "What happens if my hosting expires?",
    answer:
      "If your hosting expires and is not renewed, your website, email, and related services may stop working. To avoid downtime or data loss, it is important to renew before the expiry date. Octalve Cloud can help with reminders and renewal guidance.",
  },
  {
    question: "Can Octalve Cloud help me connect my domain to hosting?",
    answer:
      "Yes. If you already have a domain, Octalve Cloud can help point it to your hosting account by configuring nameservers or DNS records correctly. This makes your domain load the website hosted on Octalve Cloud.",
  },
  {
    question: "Is Octalve Cloud hosting good for small businesses?",
    answer:
      "Yes. Octalve Cloud is especially useful for small businesses, startups, personal brands, agencies, and organizations that need reliable hosting without unnecessary technical stress. It gives your website a stronger foundation for speed, trust, visibility, and growth.",
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
            Web Hosting Questions, Answered Clearly
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
            Everything you need to understand Octalve Cloud hosting, from
            website speed and uptime to SSL, migration, backups, WordPress,
            email, DNS, and choosing the right plan for your business.
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
