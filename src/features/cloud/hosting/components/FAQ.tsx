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
      "Web hosting is the service that keeps your website files, images, database, emails, and other resources on a server so people can access your website online. Your domain is the address, while hosting is the space where the website actually lives.",
  },
  {
    question: "Why does my business need hosting?",
    answer:
      "Your website needs hosting to stay online, load properly, store content, handle visitors, and support important services like SSL, email, databases, backups, and website management. Without hosting, your domain will not have a website to show visitors.",
  },
  {
    question: "What type of hosting is right for me?",
    answer:
      "For small business websites, portfolios, blogs, and landing pages, a managed web hosting plan is usually enough. For heavier websites, online platforms, large traffic, or custom applications, VPS, cloud, or dedicated hosting may be better. Octalve Cloud helps you choose based on your website size, traffic, and growth plan.",
  },
  {
    question: "Can I host a WordPress website?",
    answer:
      "Yes. Octalve Cloud hosting is suitable for WordPress websites, business websites, blogs, landing pages, and CMS-based projects. You can install WordPress, manage your content, connect your domain, and run your website with guided hosting support.",
  },
  {
    question: "What is the difference between hosting and a domain name?",
    answer:
      "A domain name is your website address, such as yourbusiness.com. Hosting is the server space where your website files and data are stored. You need both for a complete website because the domain points people to the hosting server.",
  },
  {
    question: "Will my hosting come with SSL?",
    answer:
      "SSL helps your website use HTTPS, which makes your website more secure and trustworthy. Octalve Cloud hosting is structured to support SSL setup so visitors can access your website with better confidence and fewer browser security warnings.",
  },
  {
    question: "Can Octalve Cloud move my existing website?",
    answer:
      "Yes. If your website is already hosted somewhere else, Octalve Cloud can help with website migration. This may include moving website files, databases, DNS records, email settings, and SSL configuration depending on your current setup.",
  },
  {
    question: "How long does hosting setup take?",
    answer:
      "Hosting setup can usually begin shortly after payment and account activation. If your domain or DNS settings need to be updated, the website may start working within minutes or a few hours, but full DNS propagation can sometimes take 24–48 hours.",
  },
  {
    question: "What does uptime mean?",
    answer:
      "Uptime means the amount of time your website stays online and accessible to visitors. Strong uptime is important because downtime can affect sales, customer trust, search visibility, and the overall experience people have with your business online.",
  },
  {
    question: "Will my website load fast?",
    answer:
      "Octalve Cloud hosting is built to support fast and stable website delivery. Website speed also depends on your website design, image sizes, plugins, caching, code quality, and hosting plan. We help you choose the right setup for better performance.",
  },
  {
    question: "Does hosting include business email?",
    answer:
      "Some hosting packages can support professional email addresses like info@yourbusiness.com or support@yourbusiness.com. Availability depends on the selected plan and setup. Octalve Cloud can help you configure business email when it is included or connected externally.",
  },
  {
    question: "What is bandwidth in hosting?",
    answer:
      "Bandwidth is the amount of data transferred between your website and visitors. When people open pages, view images, download files, or submit forms, bandwidth is used. Websites with more traffic or heavier media usually need more bandwidth.",
  },
  {
    question: "What is storage in hosting?",
    answer:
      "Storage is the server space available for your website files, images, videos, emails, databases, backups, and other assets. A simple website may need less storage, while an online store or media-heavy platform may require more.",
  },
  {
    question: "Can I upgrade my hosting later?",
    answer:
      "Yes. As your website grows, you can move to a higher hosting package with more resources, storage, bandwidth, email capacity, or server power. Octalve Cloud is designed to help you start properly and scale when your business needs more.",
  },
  {
    question: "Do I need technical knowledge to use Octalve Cloud hosting?",
    answer:
      "No. Octalve Cloud is built for business owners, founders, creators, and teams who want reliable hosting without unnecessary technical stress. We help with domain connection, SSL, hosting setup, email configuration, and basic website launch support.",
  },
  {
    question: "Are backups included?",
    answer:
      "Backups help protect your website by keeping copies of important files and data. Backup availability, frequency, and restoration options may depend on your hosting package. For business websites, we recommend choosing a plan or add-on with reliable backup support.",
  },
  {
    question: "Can I host more than one website?",
    answer:
      "This depends on the hosting package you choose. Some plans are made for one website, while higher plans may support multiple websites, domains, subdomains, databases, and email accounts.",
  },
  {
    question: "What happens if my hosting expires?",
    answer:
      "If your hosting expires and is not renewed, your website, email, and related services may stop working. To avoid downtime or possible data issues, it is best to renew before the expiry date.",
  },
  {
    question: "Can Octalve Cloud help me connect my domain to hosting?",
    answer:
      "Yes. If you already have a domain, Octalve Cloud can help point it to your hosting account by configuring nameservers or DNS records correctly. This makes your domain load the website hosted on Octalve Cloud.",
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
            Clear answers about hosting, website speed, uptime, SSL, migration,
            backups, WordPress, business email, DNS, and how Octalve Cloud helps
            your website stay fast, secure, and online.
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
