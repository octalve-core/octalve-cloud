import test from "node:test";
import assert from "node:assert/strict";
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
