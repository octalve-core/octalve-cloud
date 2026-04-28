import { CloudFooter } from "@/features/cloud/components/CloudFooter";
import { CloudHeader } from "@/features/cloud/components/CloudHeader";

export function CloudShell({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-screen bg-white text-cloud-navy">
      <CloudHeader />
      <main>{children}</main>
      <CloudFooter />
    </div>
  );
}
