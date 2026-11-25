import {pageMetadata} from "@/lib/public-seo";
import { CloudSupportPage } from "@/features/cloud/support/page";

export const metadata=pageMetadata("/support/");

export default function Page() {
  return <CloudSupportPage />;
}
