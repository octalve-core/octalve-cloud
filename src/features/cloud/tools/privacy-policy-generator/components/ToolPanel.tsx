"use client";

import { useMemo, useState } from "react";
import { CopyButton } from "@/features/cloud/tools/components/CopyButton";

function generatePolicy(businessName: string, website: string, email: string) {
  return `Privacy Policy for ${businessName || "Your Business"}

Last updated: ${new Date().toLocaleDateString()}

${businessName || "Your Business"} respects your privacy. This policy explains how we collect, use, and protect information when you visit ${website || "our website"}.

Information We Collect
We may collect contact details, form submissions, order information, website usage information, and technical data needed to provide our services.

How We Use Information
We use information to respond to enquiries, process orders, provide support, improve our website, secure our services, and communicate important updates.

Cookies and Analytics
Our website may use cookies or analytics tools to understand usage and improve user experience.

Data Protection
We take reasonable steps to protect information from unauthorized access, misuse, or loss.

Contact
For privacy questions, contact us at ${email || "your@email.com"}.

Note: This is a starter template and not legal advice. Review before publishing.`;
}

export function ToolPanel() {
  const [businessName, setBusinessName] = useState("Octalve Cloud Client");
  const [website, setWebsite] = useState("https://example.com");
  const [email, setEmail] = useState("info@example.com");

  const policy = useMemo(
    () => generatePolicy(businessName, website, email),
    [businessName, website, email],
  );

  return (
    <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="rounded-[2rem] border border-slate-200 bg-[#F8FAFC] p-6 shadow-sm">
          <h2 className="text-2xl font-medium tracking-[-0.03em] text-slate-950">Policy details</h2>
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
            <h2 className="text-xl font-semibold text-slate-950">Generated policy</h2>
            <CopyButton value={policy} />
          </div>
          <pre className="mt-6 max-h-[560px] overflow-auto whitespace-pre-wrap rounded-2xl bg-[#F8FAFC] p-5 text-sm leading-7 text-slate-700 ring-1 ring-slate-200">
            {policy}
          </pre>
        </div>
      </div>
    </section>
  );
}
