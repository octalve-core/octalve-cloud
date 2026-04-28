import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type CloudButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  external?: boolean;
  className?: string;
  showIcon?: boolean;
};

export function CloudButton({
  href,
  children,
  variant = "primary",
  external = false,
  className,
  showIcon = true
}: CloudButtonProps) {
  const classes = cn(
    "octalve-cloud-focus inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-bold transition-all duration-200",
    variant === "primary" && "bg-cloud-blue text-white shadow-soft hover:-translate-y-0.5 hover:bg-cloud-blueDark",
    variant === "secondary" && "border border-cloud-border bg-white text-cloud-navy hover:-translate-y-0.5 hover:border-cloud-blue hover:text-cloud-blue hover:shadow-soft",
    variant === "ghost" && "text-cloud-navy hover:bg-cloud-soft/70",
    className
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={classes}>
        {children}
        {showIcon ? <ArrowRight className="h-4 w-4" aria-hidden="true" /> : null}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
      {showIcon ? <ArrowRight className="h-4 w-4" aria-hidden="true" /> : null}
    </Link>
  );
}
