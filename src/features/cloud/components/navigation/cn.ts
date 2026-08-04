import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isRouteActive(pathname: string, href: string) {
  if (!href.startsWith("/")) {
    return false;
  }

  const hrefPath = href.split(/[?#]/, 1)[0] || "/";

  if (hrefPath === "/") {
    return pathname === "/";
  }

  return pathname === hrefPath || pathname.startsWith(`${hrefPath}/`);
}
