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
    question: "What is SSL?",
    answer:
      "SSL is the common name people use for the security technology that helps protect communication between a website and its visitors. Today, the modern version is called TLS, but many customers still call it SSL. It allows your website to use HTTPS instead of ordinary HTTP.",
  },
  {
    question: "Why does my website need SSL?",
    answer:
      "SSL helps secure your website, protect visitor data, and show customers that your website is more trustworthy. Without SSL, browsers may mark your website as not secure, which can reduce confidence and affect how people interact with your business online.",
  },
  {
    question: "What is HTTPS?",
    answer:
      "HTTPS is the secure version of HTTP. It encrypts information sent between a visitor’s browser and your website, making it safer for forms, logins, payments, account pages, emails, and other sensitive interactions.",
  },
  {
    question: "What is the difference between SSL and TLS?",
    answer:
      "SSL is the older term, while TLS is the modern security protocol used today. In everyday hosting language, many people still say SSL certificate even when the website is actually using TLS. Octalve Cloud uses the familiar term SSL so customers can understand it easily.",
  },
  {
    question: "What is an SSL certificate?",
    answer:
      "An SSL certificate is a digital certificate installed on a website server. It helps prove that the website is connected to the correct domain and allows encrypted HTTPS communication between the visitor and the website.",
  },
  {
    question: "Will SSL make my website show the padlock icon?",
    answer:
      "Yes, once SSL is properly installed and your website loads through HTTPS, browsers can show a secure connection indicator. However, the full website must be configured correctly, because mixed content, expired certificates, or wrong DNS settings can still create browser warnings.",
  },
  {
    question: "What is mixed content?",
    answer:
      "Mixed content happens when a secure HTTPS page still loads some images, scripts, styles, or files through insecure HTTP links. This can cause browser warnings and reduce trust. Octalve Cloud can help correct mixed content issues after SSL installation.",
  },
  {
    question: "Does SSL protect online payments?",
    answer:
      "SSL helps encrypt data moving between the visitor and your website, which is important for safer online transactions. However, payment security also depends on using trusted payment gateways, secure checkout pages, strong server configuration, and proper compliance practices.",
  },
  {
    question: "Is SSL only for e-commerce websites?",
    answer:
      "No. Every serious website should use SSL, including business websites, blogs, portals, school websites, nonprofit websites, landing pages, and personal brand websites. Even if you do not collect payments, SSL helps protect forms, logins, and visitor trust.",
  },
  {
    question: "Can Octalve Cloud install SSL for my website?",
    answer:
      "Yes. Octalve Cloud can help install and configure SSL for your website, connect it to the correct domain, force HTTPS where needed, and check that your website is not showing avoidable browser security warnings.",
  },
  {
    question: "How long does SSL setup take?",
    answer:
      "SSL setup can often be completed quickly once the domain, DNS, and hosting account are ready. Some certificates activate within minutes, while DNS validation or certificate verification can take longer depending on the setup and certificate type.",
  },
  {
    question: "What happens when an SSL certificate expires?",
    answer:
      "When an SSL certificate expires, browsers may show security warnings and visitors may become afraid to continue to your website. To avoid this, SSL certificates should be renewed before expiry or configured with reliable auto-renewal where supported.",
  },
  {
    question: "What is SSL auto-renewal?",
    answer:
      "SSL auto-renewal helps renew a certificate automatically before it expires. This reduces the risk of sudden browser warnings, broken HTTPS, or customer trust issues caused by an expired SSL certificate.",
  },
  {
    question: "What is a wildcard SSL certificate?",
    answer:
      "A wildcard SSL certificate can secure a main domain and its subdomains. For example, one wildcard certificate may cover yourbusiness.com, shop.yourbusiness.com, app.yourbusiness.com, and support.yourbusiness.com depending on how it is issued and configured.",
  },
  {
    question: "What is a multi-domain SSL certificate?",
    answer:
      "A multi-domain SSL certificate can secure more than one domain under a single certificate. It is useful for businesses managing multiple websites, brands, product pages, or related domains that need HTTPS protection.",
  },
  {
    question: "What is the difference between free SSL and paid SSL?",
    answer:
      "Free SSL can be enough for many basic websites when properly installed and renewed. Paid SSL may offer stronger validation options, warranty coverage, business identity verification, or support depending on the certificate provider. The best option depends on your website type, risk level, and trust needs.",
  },
  {
    question: "Does SSL improve SEO?",
    answer:
      "HTTPS is not a replacement for strong content, good website structure, and proper SEO work. However, secure HTTPS websites are preferred over insecure HTTP websites, and Google has used HTTPS as a lightweight ranking signal.",
  },
  {
    question: "What is website security beyond SSL?",
    answer:
      "SSL protects data in transit, but complete website security also includes strong passwords, malware protection, backups, firewall rules, secure hosting, software updates, spam protection, access control, and proper monitoring.",
  },
  {
    question: "Can SSL stop hackers completely?",
    answer:
      "No. SSL is important, but it does not stop every attack. It encrypts communication between the browser and server, but your website still needs secure passwords, updated software, safe plugins, server protection, backups, and proper access control.",
  },
  {
    question: "What is malware scanning?",
    answer:
      "Malware scanning checks your website files for suspicious code, infected scripts, hidden redirects, phishing files, or other harmful activity. It is useful for detecting security issues early before they damage your website or reputation.",
  },
  {
    question: "What is a web application firewall?",
    answer:
      "A web application firewall helps filter harmful traffic before it reaches your website. It can reduce exposure to common attacks, suspicious requests, bad bots, and some automated threats when configured properly.",
  },
  {
    question: "Why are website backups part of security?",
    answer:
      "Backups are important because security is not only about prevention. If a website breaks, gets infected, or loses important data, a clean backup can help restore the website faster and reduce business disruption.",
  },
  {
    question: "Can Octalve Cloud help fix SSL browser warnings?",
    answer:
      "Yes. Octalve Cloud can help review common causes of SSL warnings, including expired certificates, wrong certificate installation, domain mismatch, mixed content, incomplete HTTPS redirects, or incorrect DNS configuration.",
  },
  {
    question: "Do I need security if my website is small?",
    answer:
      "Yes. Small websites can still be targeted by spam bots, malware, weak passwords, outdated plugins, and automated attacks. Basic security and SSL protection are important for every website, not only large businesses.",
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
            Security & SSL Questions, Answered Clearly
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
            Clear answers about SSL certificates, HTTPS, website security,
            encryption, browser warnings, malware protection, backups,
            firewalls, domain validation, and how Octalve Cloud helps protect
            your website.
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
