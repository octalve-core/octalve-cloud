import type { ReactNode } from "react";
import { CloudFooter } from "@/features/cloud/components/CloudFooter";
import { CloudHeader } from "@/features/cloud/components/CloudHeader";

type CloudShellProps = {
  children: ReactNode;
};

export function CloudShell({ children }: CloudShellProps) {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-950">
      <CloudHeader />
      <main>{children}</main>
      <CloudFooter />
    </div>
  );
}
