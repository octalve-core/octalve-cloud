import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {buildHostingCheckoutHref,buildDomainRegistrationHref} from "../src/lib/console-commerce-links.ts";
test("public hosting CTA retains exactly product slug, plan slug, billing cycle and revision",()=>{
 const href=buildHostingCheckoutHref({productSlug:"shared-web-hosting",planSlug:"octalve-business",cycle:"12mo",revision:3});
 assert.equal(href,"https://console.cloud.octalve.com/client/order?product=shared-web-hosting&plan=octalve-business&cycle=12mo&revision=3");
 assert.equal(href.includes("price="),false);
 for(const invalid of [{productSlug:"../admin",planSlug:"plan-a",cycle:"12mo",revision:1},
   {productSlug:"hosting",planSlug:"BAD",cycle:"12mo",revision:1},
   {productSlug:"hosting",planSlug:"basic",cycle:"once",revision:1},
   {productSlug:"hosting",planSlug:"basic",cycle:"1mo",revision:0},
   {productSlug:"hosting",planSlug:"basic",cycle:"1mo",revision:1.5}]){
  assert.equal(buildHostingCheckoutHref(invalid),null);
 }
});
test("public domain CTAs lead only to canonical guarded registration preflight",()=>{
 assert.equal(buildDomainRegistrationHref("School.COM.NG"),
 "https://console.cloud.octalve.com/client/domains/register?domain=school.com.ng");
 for(const invalid of ["hello world","https://evil.test","../admin",".com","a/b.test"]){
  assert.equal(buildDomainRegistrationHref(invalid),null);
 }
});

test("public purchase and domain actions remain wired to the canonical builders",()=>{
 const source=(path)=>readFileSync(new URL(path,import.meta.url),"utf8");
 const cards=source("../src/features/cloud/components/PublishedPlanCards.tsx");
 assert.match(cards,/buildHostingCheckoutHref/);
 assert.doesNotMatch(cards,/\/client\/order\?plan=/);
 for(const path of [
  "../src/features/cloud/domains/components/DomainSearch.tsx",
  "../src/features/cloud/tools/domain-name-search/components/ToolPanel.tsx",
  "../src/lib/domain-pricing-adapter.ts",
 ]){
  const implementation=source(path);
  assert.match(implementation,/buildDomainRegistrationHref/,path);
  assert.doesNotMatch(implementation,/\/order\/domain-search/,path);
  assert.doesNotMatch(implementation,/\/client\/domains\?domain=/,path);
 }
 const links=source("../src/lib/console-commerce-links.ts");
 assert.match(links,/\/client\/domains\/register\?domain=/);
});
