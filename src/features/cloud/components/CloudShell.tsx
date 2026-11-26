import { FloatingDomainSearch } from "./FloatingDomainSearch";
import type { ReactNode } from "react";
import { CloudFooter } from "@/features/cloud/components/CloudFooter";
import { CloudHeader } from "@/features/cloud/components/CloudHeader";

type CloudShellProps = {
  children: ReactNode;
};

export function CloudShell({ children }: CloudShellProps) {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-950">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-white focus:p-3 focus:text-black">Skip to content</a>
      <CloudHeader />
      <main id="main-content">{children}</main>
      <CloudFooter />
      <FloatingDomainSearch />
    </div>
  );
}
