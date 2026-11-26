import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {prepareHeroDomainQuery} from "../src/lib/hero-domain-query.ts";
test("hero keeps exact explicit domain and compound extension",()=>{
 assert.deepEqual(prepareHeroDomainQuery(" https://www.Example.COM.NG/ ",[".com"]),{query:"example.com.ng",tlds:[".com.ng"]});
 assert.deepEqual(prepareHeroDomainQuery("brand",[".com",".ng"]),{query:"brand",tlds:[".com",".ng"]});
 for(const value of ["", "bad name", "a/b", "-abc", "foo..com", "x@y.com"]) assert.equal(prepareHeroDomainQuery(value,[".com"]),null);
});
test("hero purchase action fails closed when checkout or availability is unverified",()=>{
 const source=readFileSync(new URL("../src/features/cloud/components/CompactDomainResult.tsx",import.meta.url),"utf8");
 assert.match(source,/item.available===true/);
 assert.match(source,/item.available===true&&item.checkoutEnabled===true&&!!href/);
 assert.match(source,/buildDomainRegistrationHref\(item.domain\)/);
 assert.match(source,/<DomainResultCard/);
 assert.match(readFileSync(new URL("../src/features/cloud/commerce/DomainCommerce.tsx",import.meta.url),"utf8"),/Unverified/);
});
