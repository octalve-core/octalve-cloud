import Link from "next/link";
import type { ReactNode } from "react";

type CloudButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  external?: boolean;
  className?: string;
};

const variants = {
  primary:
    "bg-cloud-blue text-white shadow-[0_12px_30px_rgba(0,100,224,0.22)] hover:bg-blue-600",
  secondary:
    "border border-slate-200 bg-white text-cloud-blue shadow-sm hover:border-cloud-blue/30 hover:bg-slate-50",
  ghost: "text-slate-600 hover:bg-slate-100 hover:text-cloud-blue",
};

export function CloudButton({
  href,
  children,
  variant = "primary",
  external = false,
  className = "",
}: CloudButtonProps) {
  const commonClass = `inline-flex min-h-12 items-center justify-center rounded-full px-7 py-3 text-sm font-semibold transition hover:-translate-y-0.5 ${variants[variant]} ${className}`;

  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={commonClass}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={commonClass}>
      {children}
    </Link>
  );
}
