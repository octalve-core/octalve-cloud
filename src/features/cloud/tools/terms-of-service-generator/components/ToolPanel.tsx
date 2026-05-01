"use client";

import { useMemo, useState } from "react";
import { CopyButton } from "@/features/cloud/tools/components/CopyButton";

function generateTerms(businessName: string, website: string, email: string) {
  return `Terms of Service for ${businessName || "Your Business"}

Last updated: ${new Date().toLocaleDateString()}

By using ${website || "our website"}, you agree to these terms.

Use of Service
You agree to use our website and services lawfully and responsibly.

Accounts and Orders
If you create an account or place an order, you are responsible for providing accurate information and keeping access details secure.

Payments and Renewals
Service access may depend on successful payment, renewal, and compliance with package limits.

Acceptable Use
You must not use our services for spam, fraud, malware, illegal content, or activities that harm other users or infrastructure.

Limitations
We aim to provide reliable services, but we do not guarantee uninterrupted access at all times.

Contact
For questions, contact ${email || "your@email.com"}.

Note: This is a starter template and not legal advice. Review before publishing.`;
}

export function ToolPanel() {
  const [businessName, setBusinessName] = useState("Octalve Cloud Client");
  const [website, setWebsite] = useState("https://example.com");
  const [email, setEmail] = useState("info@example.com");

  const terms = useMemo(
    () => generateTerms(businessName, website, email),
    [businessName, website, email],
  );

  return (
    <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="rounded-[2rem] border border-slate-200 bg-[#F8FAFC] p-6 shadow-sm">
          <h2 className="text-2xl font-medium tracking-[-0.03em] text-slate-950">Terms details</h2>
          <div className="mt-6 space-y-4">
            {[
              { label: "Business name", value: businessName, onChange: setBusinessName },
              { label: "Website URL", value: website, onChange: setWebsite },
              { label: "Contact email", value: email, onChange: setEmail },
            ].map((field) => (
              <label key={field.label} className="block">
                <span className="text-sm font-medium text-slate-700">{field.label}</span>
                <input
                  value={field.value}
                  onChange={(event) => field.onChange(event.target.value)}
                  className="mt-2 h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm outline-none transition focus:border-cloud-blue"
                />
              </label>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_20px_70px_rgba(15,23,42,0.06)]">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-xl font-semibold text-slate-950">Generated terms</h2>
            <CopyButton value={terms} />
          </div>
          <pre className="mt-6 max-h-[560px] overflow-auto whitespace-pre-wrap rounded-2xl bg-[#F8FAFC] p-5 text-sm leading-7 text-slate-700 ring-1 ring-slate-200">
            {terms}
          </pre>
        </div>
      </div>
    </section>
  );
}
