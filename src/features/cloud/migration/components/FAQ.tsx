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
    question: "What is website migration?",
    answer:
      "Website migration is the process of moving a website from one hosting provider, server, domain, platform, or control panel to another. It can include moving website files, databases, emails, DNS records, SSL certificates, redirects, and server configurations.",
  },
  {
    question: "Why would I need website migration?",
    answer:
      "You may need migration when your current hosting is slow, unreliable, expensive, difficult to manage, or no longer suitable for your business. Migration is also useful when moving to better hosting, upgrading to VPS, changing domains, redesigning a website, or consolidating multiple websites under one provider.",
  },
  {
    question: "Can Octalve Cloud migrate my existing website?",
    answer:
      "Yes. Octalve Cloud can help move your website from your current host to a new hosting environment. Depending on your setup, this may include files, databases, emails, DNS records, SSL setup, control panel settings, and post-migration testing.",
  },
  {
    question: "Will my website go offline during migration?",
    answer:
      "Migration can be planned to reduce downtime as much as possible. In many cases, the website can be copied to the new server first, tested privately, and then switched over through DNS when everything is ready. Some short downtime may still happen depending on the old host, website size, DNS behavior, and migration complexity.",
  },
  {
    question: "How long does website migration take?",
    answer:
      "The time depends on your website size, database size, email volume, hosting access, control panel type, DNS setup, and whether extra fixes are needed. A simple website may be moved quickly, while large websites, e-commerce stores, portals, and email-heavy accounts may require more careful planning.",
  },
  {
    question: "What do I need to provide for migration?",
    answer:
      "You may need to provide access to your current hosting account, control panel, domain DNS, website admin dashboard, database, FTP or SSH details, email settings, and backup files where available. Octalve Cloud will guide you on the exact access needed based on your current provider.",
  },
  {
    question: "Can you migrate my WordPress website?",
    answer:
      "Yes. WordPress migration can include moving the WordPress files, themes, plugins, uploads, database, users, posts, pages, settings, and domain configuration. After migration, the website should be tested to confirm that pages, forms, links, images, and plugins are working properly.",
  },
  {
    question: "Can you migrate a cPanel website?",
    answer:
      "Yes. If your current hosting uses cPanel, migration may be easier because full account backups or cPanel transfer tools can help move files, databases, emails, DNS zones, and related account settings. The exact process depends on the access available from your old host.",
  },
  {
    question: "Can you migrate from a non-cPanel host?",
    answer:
      "Yes. A website can still be migrated from non-cPanel hosting, but the process may be more manual. It may involve downloading files, exporting databases, recreating email accounts, updating DNS records, installing SSL, and testing everything on the new server.",
  },
  {
    question: "Will my emails be migrated too?",
    answer:
      "Email migration depends on your current email setup and the type of access available. In some cases, existing mailboxes and messages can be moved. In other cases, new mailboxes may need to be created and DNS records updated. Octalve Cloud can review your current setup before advising the safest route.",
  },
  {
    question: "Will migration affect my domain name?",
    answer:
      "Migration does not always require changing your domain name. In many cases, your domain remains the same while only the hosting server changes. The domain DNS records are updated so visitors are directed to the new hosting environment.",
  },
  {
    question: "What is DNS propagation during migration?",
    answer:
      "DNS propagation is the period it takes for updated domain records to reflect across different networks around the world. Some visitors may see the new server quickly, while others may still reach the old server for some time. Full propagation can sometimes take 24–48 hours.",
  },
  {
    question: "Will migration affect my SEO?",
    answer:
      "A hosting-only migration with the same domain and same URLs usually has lower SEO risk when handled properly. However, if URLs, domains, or page structures change, redirects must be planned carefully to reduce broken links, ranking loss, and search visibility issues.",
  },
  {
    question: "What are redirects in website migration?",
    answer:
      "Redirects send visitors and search engines from an old URL to a new URL. They are important when changing domains, redesigning a website, or restructuring page links. Without proper redirects, users may see broken pages and search engines may struggle to understand where old pages moved.",
  },
  {
    question: "Do I need a backup before migration?",
    answer:
      "Yes. A backup is very important before any migration. It helps protect your website files, databases, emails, and configuration in case something goes wrong. For business websites, migration should not begin without a reliable copy of important data.",
  },
  {
    question: "What is a staging test during migration?",
    answer:
      "A staging test allows the migrated website to be checked before the final switch. This helps confirm that pages, images, forms, databases, links, SSL, plugins, and core functions are working correctly before visitors are sent to the new server.",
  },
  {
    question: "Will my SSL certificate move with the website?",
    answer:
      "SSL may need to be reinstalled or reissued on the new hosting environment. After migration, HTTPS should be tested properly to confirm that the certificate is valid, the domain matches, and there are no browser warnings or mixed content issues.",
  },
  {
    question: "What is mixed content after migration?",
    answer:
      "Mixed content happens when a secure HTTPS website still loads some files through insecure HTTP links. This can happen after migration or SSL changes. It may affect browser trust and should be corrected so the full website loads securely.",
  },
  {
    question: "Can migration break website forms or plugins?",
    answer:
      "Yes, some forms, plugins, scripts, or integrations can break if paths, permissions, PHP versions, database settings, mail settings, or API keys change. That is why post-migration testing is important before considering the migration complete.",
  },
  {
    question: "Can you migrate an e-commerce website?",
    answer:
      "Yes. E-commerce migration requires extra care because products, orders, customers, payments, checkout pages, emails, inventory, and security settings may be involved. It is best to plan the migration during low-traffic periods and test checkout before going live.",
  },
  {
    question: "Can you migrate my website to VPS or cloud server?",
    answer:
      "Yes. Octalve Cloud can help migrate websites from shared hosting to VPS or cloud server hosting when the website needs more power, control, storage, or custom configuration. This may include server setup, control panel installation, security configuration, and website transfer.",
  },
  {
    question: "What happens to my old hosting after migration?",
    answer:
      "Your old hosting should not be cancelled immediately after migration. It is safer to keep it active for a short period while the new hosting is tested, DNS propagation completes, email delivery is confirmed, and any missing files or settings are checked.",
  },
  {
    question: "Can migration help improve website speed?",
    answer:
      "Migration can improve speed if the new hosting environment is faster, better configured, and more suitable for your website. However, speed also depends on your website code, image sizes, caching, plugins, database health, and frontend optimization.",
  },
  {
    question: "What if my current host refuses to help?",
    answer:
      "If your current host does not provide migration support, Octalve Cloud can still review the access you have and suggest the best available method. This may involve using control panel backups, FTP, database export, WordPress admin tools, or manual file transfer.",
  },
  {
    question: "What should be checked after migration?",
    answer:
      "After migration, key checks should include homepage loading, internal pages, images, contact forms, login pages, admin dashboard, database connections, SSL, redirects, DNS records, emails, backups, website speed, and error logs.",
  },
  {
    question: "Can Octalve Cloud manage the migration for me?",
    answer:
      "Yes. Octalve Cloud can guide or manage the migration process depending on your plan and access level. The goal is to help you move with less confusion, reduce downtime, protect your data, and make sure your website works properly on the new hosting environment.",
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
            Website Migration Questions, Answered Clearly
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
            Clear answers about moving your website, email, domain, DNS,
            database, SSL, redirects, backups, WordPress, cPanel, VPS, cloud
            servers, and how Octalve Cloud helps you migrate with less stress.
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
