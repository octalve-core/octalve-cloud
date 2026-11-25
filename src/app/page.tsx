import {pageMetadata} from "@/lib/public-seo";
export const metadata=pageMetadata("/");
import { CloudHomePage } from "@/features/cloud/home/page";

export default function Page() {
  return <CloudHomePage />;
}
