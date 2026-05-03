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
    question: "What is a VPS?",
    answer:
      "A VPS, or Virtual Private Server, is a private server environment created using virtualization technology. It gives you dedicated server resources such as CPU, RAM, storage, bandwidth, and an operating system, while still running on powerful physical infrastructure managed by a hosting provider.",
  },
  {
    question: "What is a cloud server?",
    answer:
      "A cloud server is a virtual server that runs inside cloud infrastructure. It works like a physical server, but it is created, managed, and scaled through cloud technology instead of being tied to one traditional machine in your office.",
  },
  {
    question: "What is the difference between VPS and shared hosting?",
    answer:
      "Shared hosting puts many websites on the same server environment with limited control. A VPS gives you a more private server space with allocated resources, better control, stronger isolation, and more room to run websites, applications, databases, APIs, and custom software.",
  },
  {
    question: "Who should use a VPS?",
    answer:
      "A VPS is suitable for businesses, developers, agencies, startups, and growing websites that need more power and control than shared hosting. It is useful when your website is getting more traffic, your application needs custom configuration, or you want a stable environment for serious online operations.",
  },
  {
    question: "Can I host websites on a VPS?",
    answer:
      "Yes. You can host business websites, WordPress websites, landing pages, e-commerce stores, web applications, client projects, and portals on a VPS. With the right setup, one VPS can host one or multiple websites depending on the server resources and configuration.",
  },
  {
    question: "Can I run applications and APIs on a VPS?",
    answer:
      "Yes. A VPS can run backend applications, APIs, dashboards, CRMs, billing systems, automation tools, databases, and other software. It is a strong option when you need more flexibility than normal website hosting can provide.",
  },
  {
    question: "What is the difference between managed and unmanaged VPS?",
    answer:
      "With managed VPS, the hosting provider helps with server setup, updates, monitoring, security configuration, and technical maintenance depending on the plan. With unmanaged VPS, you get more control, but you are responsible for installing, securing, updating, and maintaining the server yourself.",
  },
  {
    question: "Do I need technical knowledge to use a VPS?",
    answer:
      "Basic VPS use requires some technical knowledge, especially for SSH, server updates, security, DNS, firewall rules, and software installation. If you do not want to manage these yourself, Octalve Cloud can guide you toward a managed setup or control panel-based environment.",
  },
  {
    question: "What is root access?",
    answer:
      "Root access means you have full administrative control over the server. It allows you to install software, configure services, manage users, update the operating system, and customize the environment. Root access is powerful, but it must be handled carefully to avoid security or configuration mistakes.",
  },
  {
    question: "Can I install a control panel on my VPS?",
    answer:
      "Yes. You can install a hosting control panel such as DirectAdmin, cPanel, or another supported panel depending on your plan and license. A control panel makes it easier to manage websites, domains, emails, databases, SSL, backups, and hosting accounts from a visual dashboard.",
  },
  {
    question: "What operating systems can I use on a VPS?",
    answer:
      "Most VPS plans support Linux-based operating systems such as Ubuntu, Debian, AlmaLinux, Rocky Linux, or CentOS-based options where available. The best choice depends on the software you want to run, your control panel, and your technical preference.",
  },
  {
    question: "How much RAM and CPU do I need?",
    answer:
      "The right RAM and CPU depend on what you want to host. A small website or lightweight app may need fewer resources, while busy websites, e-commerce stores, databases, APIs, and multiple client websites need more CPU, RAM, and storage. Octalve Cloud can recommend a plan based on your workload.",
  },
  {
    question: "What is VPS storage?",
    answer:
      "VPS storage is the disk space available for your websites, application files, databases, emails, backups, logs, and server software. SSD or NVMe-based storage usually gives better performance than older storage types, especially for database-heavy websites and applications.",
  },
  {
    question: "What is bandwidth on a VPS?",
    answer:
      "Bandwidth is the amount of data transferred between your VPS and users. Website visits, image loading, file downloads, API calls, backups, and application traffic all consume bandwidth. Higher-traffic websites and applications usually need more bandwidth.",
  },
  {
    question: "Can I upgrade my VPS later?",
    answer:
      "Yes. One major advantage of VPS and cloud server hosting is scalability. As your website, application, or customer base grows, you can move to a larger server plan with more CPU, RAM, storage, and bandwidth instead of starting from scratch.",
  },
  {
    question: "Is a VPS more secure than shared hosting?",
    answer:
      "A VPS gives better isolation and control than shared hosting, but security still depends on proper setup. Strong passwords, SSH protection, firewall rules, regular updates, malware scanning, SSL, backups, and careful access management are still important.",
  },
  {
    question: "Do I need a firewall on my VPS?",
    answer:
      "Yes. A firewall helps control which traffic is allowed to reach your server. It can reduce exposure to unwanted access attempts and protect important services such as SSH, web applications, databases, and control panels when configured properly.",
  },
  {
    question: "Does VPS hosting include DDoS protection?",
    answer:
      "DDoS protection depends on the hosting provider, data center, and selected plan. Some VPS plans include basic protection, while advanced protection may require an extra layer or specialized service. Octalve Cloud can help guide you toward the right protection level for your use case.",
  },
  {
    question: "Can I get a dedicated IP address with a VPS?",
    answer:
      "Yes. VPS plans usually come with at least one dedicated IP address. A dedicated IP is useful for hosting websites, setting up DNS records, configuring SSL, running control panels, managing email reputation, and connecting server services.",
  },
  {
    question: "Can I use a VPS for business email?",
    answer:
      "Yes, but email hosting on a VPS must be configured carefully. You need proper mail server setup, DNS records, SPF, DKIM, DMARC, reverse DNS, spam protection, and monitoring. For many businesses, using a dedicated business email service may be simpler unless server email is properly managed.",
  },
  {
    question: "Can Octalve Cloud migrate my website or app to a VPS?",
    answer:
      "Yes. Octalve Cloud can help plan and support migration from shared hosting, another VPS provider, or a previous cloud environment. This may involve moving website files, databases, DNS records, SSL settings, email records, and application configuration.",
  },
  {
    question: "How long does VPS setup take?",
    answer:
      "A VPS can usually be provisioned quickly after payment and order verification. However, full setup time depends on the operating system, control panel installation, security hardening, software installation, DNS updates, and whether migration is involved.",
  },
  {
    question: "What happens if my VPS expires?",
    answer:
      "If your VPS expires and is not renewed, your websites, applications, databases, emails, and server services may stop working. To avoid downtime or data loss, it is best to renew before expiry and keep regular backups of important data.",
  },
  {
    question: "Are backups included with VPS hosting?",
    answer:
      "Backup availability depends on the selected VPS package. For serious business use, you should always keep reliable backups of website files, databases, application code, configuration files, and emails. Backups are important because they help you recover faster after mistakes, attacks, or server issues.",
  },
  {
    question: "What is the difference between VPS and a dedicated server?",
    answer:
      "A VPS gives you a virtual private environment on shared physical infrastructure, while a dedicated server gives you an entire physical machine. VPS is usually more affordable and easier to scale, while dedicated servers are better for workloads that need maximum isolation, high resources, or specialized server control.",
  },
  {
    question: "Is VPS good for agencies and developers?",
    answer:
      "Yes. VPS hosting is useful for agencies and developers who manage multiple websites, client projects, staging environments, APIs, dashboards, or custom applications. It gives more control than shared hosting and can be structured for professional project delivery.",
  },
  {
    question: "Can Octalve Cloud help me choose the right VPS plan?",
    answer:
      "Yes. Octalve Cloud can help you choose based on your project type, expected traffic, storage needs, software stack, budget, technical skill level, and whether you need managed support, a control panel, backups, or stronger security protection.",
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
            Cloud Server & VPS Questions, Answered Clearly
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
            Clear answers about VPS hosting, cloud servers, root access, managed
            support, control panels, CPU, RAM, storage, bandwidth, security,
            backups, migration, and how Octalve Cloud helps you run stronger
            websites and applications.
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
