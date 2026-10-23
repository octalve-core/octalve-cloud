import Link from "next/link";
import type { ReactNode } from "react";

function shouldOpenInNewTab(href: string) {
  return href.startsWith("http://") || href.startsWith("https://");
}

export function SmartLink({
  href,
  external = false,
  className,
  onNavigate,
  children,
  ariaLabel,
  newTab,
}: {
  href: string;
  external?: boolean;
  className?: string;
  onNavigate?: () => void;
  children: ReactNode;
  ariaLabel?: string;
  newTab?: boolean;
}) {
  if (external || !href.startsWith("/")) {
    const openNewTab = newTab ?? shouldOpenInNewTab(href);

    return (
      <a
        href={href}
        target={openNewTab ? "_blank" : undefined}
        rel={openNewTab ? "noopener noreferrer" : undefined}
        className={className}
        onClick={onNavigate}
        aria-label={ariaLabel}
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className={className}
      onClick={onNavigate}
      aria-label={ariaLabel}
    >
      {children}
    </Link>
  );
}
