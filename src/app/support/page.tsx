import type { Metadata } from "next";
import { CloudSupportPage } from "@/features/cloud/support/page";

export const metadata: Metadata = {
  title: "Support | Octalve Cloud",
  description: "Get help with domains, hosting, business email, account recovery and security. Contact Octalve Cloud in Abuja, Nigeria.",
};

export default function Page() {
  return <CloudSupportPage />;
}
