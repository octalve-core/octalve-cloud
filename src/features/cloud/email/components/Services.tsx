import Link from "next/link";
import { ArrowRight, Mail, Settings2, Users, Globe2, ArrowLeftRight, ShieldCheck, MailCheck } from "lucide-react";

const services = [
  { icon: Mail, title: "Mailbox Setup", description: "Create professional email addresses at your own domain and get your business ready to communicate.", accent: "from-[#D5F1FF] to-[#55C7F7]" },
  { icon: Settings2, title: "Email DNS Records", description: "Get guidance connecting your domain to your email service and configuring the records it needs.", accent: "from-[#FFF3CD] to-[#FFB52E]" },
  { icon: Users, title: "Team Accounts", description: "Give your team recognizable business email addresses with mailbox options that fit your needs.", accent: "from-[#DBFFAA] to-[#29BE3E]" },
  { icon: Globe2, title: "Webmail Access", description: "Access your business inbox through a web browser where supported by your selected email plan.", accent: "from-[#FCE0F3] to-[#F29ADC]" },
  { icon: ArrowLeftRight, title: "Migration Support", description: "Plan the move from your current email provider with guidance on transferring your business mail.", accent: "from-[#DCE8FF] to-[#0064E0]" },
  { icon: ShieldCheck, title: "Deliverability Guidance", description: "Get help with email authentication and good sending practices to support reliable delivery.", accent: "from-[#FFE0D8] to-[#FC7E24]" },
];

export function Services() {
  return (
    <section aria-labelledby="email-services-title" className="bg-white px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto grid max-w-7xl gap-4 rounded-[24px] bg-[#F6F7F8] p-3 sm:p-4 lg:grid-cols-[2fr_3fr]">
        <div className="flex min-w-0 flex-col p-5 sm:p-8 lg:p-9">
          <p className="flex items-center gap-2 text-xs font-normal uppercase tracking-[0.12em] text-slate-700"><MailCheck size={16} strokeWidth={1.6} className="text-cloud-blue" aria-hidden="true" /> Email services</p>
          <h2 id="email-services-title" className="mt-5 max-w-md text-[clamp(2rem,3.5vw,3rem)] font-normal leading-[1.2] tracking-[-0.045em] text-slate-950">Business email, made simple.</h2>
          <p className="mt-5 max-w-md text-base leading-7 text-slate-600">Build a professional identity and keep your team connected, with guidance from setup to everyday email management.</p>
          <div className="mt-8 lg:mt-auto lg:pt-12"><Link href="#email-plans" className="inline-flex min-h-11 items-center gap-2 rounded-md text-sm font-medium text-cloud-blue hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cloud-blue">Get Started <ArrowRight size={17} aria-hidden="true" /></Link></div>
        </div>
        <div className="grid min-w-0 grid-cols-1 gap-2 sm:grid-cols-2">
          {services.map(({ icon: Icon, title, description, accent }) => (
            <article key={title} className="relative flex min-w-0 flex-col overflow-hidden rounded-2xl bg-white p-5 pb-7 sm:p-6 sm:pb-8 lg:min-h-[230px]">
              <Icon size={26} strokeWidth={1.5} className="shrink-0 text-cloud-blue" aria-hidden="true" />
              <div className="mt-8 lg:mt-auto lg:pt-8">
                <h3 className="text-lg font-medium tracking-tight text-slate-950">{title}</h3>
                <p className="mt-3 text-base leading-6 text-slate-600">{description}</p>
              </div>
              <span aria-hidden="true" className={`absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r ${accent}`} />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
