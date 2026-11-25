import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
const read=p=>readFileSync(new URL(p,import.meta.url),"utf8");
test("both domain routes share workspace and preserve catalogue sections",()=>{
 assert.match(read("../src/features/cloud/domains/components/DomainSearch.tsx"),/<DomainSearchWorkspace catalogue/);
 assert.match(read("../src/features/cloud/tools/domain-name-search/components/ToolPanel.tsx"),/<DomainSearchWorkspace/);
 assert.match(read("../src/features/cloud/domains/page.tsx"),/<DomainSearch \/>[\s\S]*<Packages \/>[\s\S]*<WhyOctalveCloud \/>[\s\S]*<Migration \/>[\s\S]*<FAQ \/>[\s\S]*<CTA \/>/);
});
test("floating handoff preserves domain and purchase action requires checkout eligibility",()=>{
 const s=read("../src/features/cloud/components/DomainSearchWorkspace.tsx");
 assert.match(s,/item.available===true&&item.checkoutEnabled===true&&!!href/);
 assert.match(s,/params.get\("q"\)/);
 assert.match(read("../src/features/cloud/components/FloatingDomainSearch.tsx"),/encodeURIComponent\(request.query\)/);
});
