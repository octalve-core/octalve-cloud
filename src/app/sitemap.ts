import type {MetadataRoute} from "next";
import {routes,siteUrl} from "@/lib/public-seo";
export const dynamic="force-static";
export default function sitemap():MetadataRoute.Sitemap{return routes.filter(r=>r[0]!=="/help/").map(r=>({url:siteUrl+r[0]}));}
