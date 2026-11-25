import { Mail, Settings2, Users, Globe2, ArrowLeftRight, ShieldCheck, MailCheck } from "lucide-react";
import { ServiceFeatures } from "@/features/cloud/components/ServiceFeatures";
const services = [
  { icon: Mail, title: "Mailbox Setup", description: "Create professional email addresses at your own domain and get your business ready to communicate." },
  { icon: Settings2, title: "Email DNS Records", description: "Get guidance connecting your domain to your email service and configuring the records it needs." },
  { icon: Users, title: "Team Accounts", description: "Give your team recognizable business email addresses with mailbox options that fit your needs." },
  { icon: Globe2, title: "Webmail Access", description: "Access your business inbox through a web browser where supported by your selected email plan." },
  { icon: ArrowLeftRight, title: "Migration Support", description: "Plan the move from your current email provider with guidance on transferring your business mail." },
  { icon: ShieldCheck, title: "Deliverability Guidance", description: "Get help with email authentication and good sending practices to support reliable delivery." },
];


export function Services(){return <ServiceFeatures id="email-services-title" label="Email services" heading="Business email, made simple." description="Build a professional identity and keep your team connected, with guidance from setup to everyday email management." href="#email-plans" icon={MailCheck} services={services}/>;}
