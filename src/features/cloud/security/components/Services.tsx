import { LockKeyhole, ArrowRightLeft, ShieldCheck, DatabaseBackup, Bug, Globe2, Shield } from "lucide-react";
import { ServiceFeatures } from "@/features/cloud/components/ServiceFeatures";

const services = [
 { icon: LockKeyhole, title: "SSL Setup", description: "Get guidance enabling encrypted connections for your website." },
 { icon: ArrowRightLeft, title: "HTTPS Redirects", description: "Help visitors reach the secure version of your website consistently." },
 { icon: ShieldCheck, title: "Security Review", description: "Identify common security gaps and plan practical improvements." },
 { icon: DatabaseBackup, title: "Backup Guidance", description: "Plan backups and recovery options to protect important website data." },
 { icon: Bug, title: "Malware Awareness", description: "Recognize common threats and learn how to reduce exposure to malicious files." },
 { icon: Globe2, title: "DNS Protection", description: "Get guidance on secure DNS settings and protecting domain access." },
];
export function Services(){return <ServiceFeatures id="security-services-title" label="SSL & security services" heading="Protect what you build." description="Give your customers a safer experience with practical security guidance, encrypted connections and a stronger website foundation." href="#security-plans" icon={Shield} services={services}/>;}
