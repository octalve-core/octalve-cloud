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
    question: "What is business email?",
    answer:
      "Business email is a professional email address that uses your own domain name, such as info@yourbusiness.com or support@yourbusiness.com. It helps your brand look more credible, organized, and trustworthy than using a personal Gmail, Yahoo, or Outlook address for business communication.",
  },
  {
    question: "Why does my business need professional email?",
    answer:
      "Professional email gives your business a stronger identity, improves customer trust, and makes communication look more official. It also helps you create clear addresses for different roles, such as sales@, support@, billing@, or hello@, instead of mixing all business messages into one personal inbox.",
  },
  {
    question: "What is the difference between business email and normal email?",
    answer:
      "Normal email usually uses a public provider domain, such as yourname@gmail.com. Business email uses your own domain, such as yourname@yourbusiness.com. The second option looks more professional and gives your business more control over users, branding, security, and account management.",
  },
  {
    question: "Do I need a domain name before creating business email?",
    answer:
      "Yes. To create a branded email address, you need a domain name first. The domain is the part after the @ symbol. For example, in hello@yourbusiness.com, yourbusiness.com is the domain. Octalve Cloud can help you connect your domain to email properly.",
  },
  {
    question: "Can Octalve Cloud help me set up email for my domain?",
    answer:
      "Yes. Octalve Cloud can help you configure professional email for your domain, create the right mail accounts, connect DNS records, and guide you on how to access your mailbox from webmail or supported email apps.",
  },
  {
    question: "What are MX records in email setup?",
    answer:
      "MX records are DNS records that tell the internet where emails for your domain should be delivered. If MX records are not configured correctly, people may not be able to send emails to your business address.",
  },
  {
    question: "What are SPF, DKIM, and DMARC?",
    answer:
      "SPF, DKIM, and DMARC are email authentication records that help prove that messages sent from your domain are legitimate. They reduce the chance of attackers pretending to send emails from your domain and can help improve email trust and deliverability.",
  },
  {
    question: "Will professional email stop my messages from going to spam?",
    answer:
      "Professional email improves your chances of looking legitimate, especially when DNS authentication records are configured correctly. However, deliverability also depends on your email content, sending habits, domain reputation, recipient engagement, and whether your messages follow proper email practices.",
  },
  {
    question: "Can I use my business email on Gmail or Outlook apps?",
    answer:
      "In many cases, yes. Depending on the email service and plan, you may be able to connect your business email to Gmail, Outlook, Apple Mail, or other mail apps using IMAP, POP, or SMTP settings. Octalve Cloud can guide you through the correct configuration.",
  },
  {
    question: "What is webmail?",
    answer:
      "Webmail allows you to access your business email through a browser without installing an app. It is useful when you want to check, send, and manage emails from any device with internet access.",
  },
  {
    question: "Can I create emails like info@, support@, or sales@?",
    answer:
      "Yes. You can create role-based business email accounts such as info@yourbusiness.com, support@yourbusiness.com, sales@yourbusiness.com, billing@yourbusiness.com, or hello@yourbusiness.com depending on your package and mailbox limits.",
  },
  {
    question: "What is an email alias?",
    answer:
      "An email alias is an extra email address that forwards messages to an existing mailbox. For example, hello@yourbusiness.com can forward to your main inbox without needing a separate mailbox. It is useful for managing different public-facing addresses more easily.",
  },
  {
    question: "What is email forwarding?",
    answer:
      "Email forwarding automatically sends messages from one email address to another. For example, messages sent to contact@yourbusiness.com can be forwarded to the business owner or support team. This helps you manage communication without checking too many inboxes.",
  },
  {
    question: "How much email storage do I need?",
    answer:
      "The right storage depends on how many emails you receive, whether you keep large attachments, and how long you want to retain messages. A small business may need less storage at the beginning, while teams that receive many documents, invoices, images, or support requests may need a larger plan.",
  },
  {
    question: "Can I add more email accounts later?",
    answer:
      "Yes. As your team grows, you can create more email accounts for staff, departments, or branches depending on your selected package. Octalve Cloud can help you scale from one mailbox to a more organized team email structure.",
  },
  {
    question: "Is business email secure?",
    answer:
      "Business email can be secure when it is configured properly with strong passwords, secure access settings, SSL/TLS where supported, and correct authentication records. For better protection, users should avoid weak passwords and should not share mailbox login details carelessly.",
  },
  {
    question: "Can I move my existing business email to Octalve Cloud?",
    answer:
      "Yes. If your email is currently hosted elsewhere, Octalve Cloud can help you plan the migration. This may involve creating the new mailboxes, updating DNS records, moving important messages where possible, and reducing disruption during the switch.",
  },
  {
    question: "Will changing email hosting affect my website?",
    answer:
      "Changing email hosting does not have to affect your website if DNS is handled correctly. Your website records and email records can be managed separately. Octalve Cloud can help update only the necessary email records while keeping your website online.",
  },
  {
    question: "How long does email setup take?",
    answer:
      "Email account creation can be done quickly after the domain and hosting details are ready. However, DNS changes such as MX, SPF, DKIM, and DMARC updates may take some time to reflect globally. In many cases it works within minutes or a few hours, but full propagation can take up to 24–48 hours.",
  },
  {
    question: "What happens if my email hosting expires?",
    answer:
      "If your email hosting expires and is not renewed, your business mailboxes may stop sending or receiving messages. To avoid communication disruption, it is best to renew before expiry and keep your domain and email services active.",
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
            Business Email Questions, Answered Clearly
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
            Clear answers about professional email, custom domain addresses,
            mailboxes, MX records, SPF, DKIM, DMARC, forwarding, aliases,
            storage, migration, and how Octalve Cloud helps your business
            communicate with more trust.
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
