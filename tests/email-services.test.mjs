import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
const read=p=>readFileSync(new URL("../src/features/cloud/email/"+p,import.meta.url),"utf8");
test("email services preserve six offerings and responsive reference layout",()=>{
 const s=read("components/Services.tsx");
 for(const title of ["Mailbox Setup","Email DNS Records","Team Accounts","Webmail Access","Migration Support","Deliverability Guidance"])assert.ok(s.includes('title: "'+title+'"'));
 assert.equal((s.match(/title: "/g)||[]).length,6);
 assert.match(s,/sm:grid-cols-2/);assert.match(s,/lg:grid-cols-\[2fr_3fr\]/);
 assert.match(s,/bg-\[#F6F7F8\]/);assert.match(s,/bg-gradient-to-r/);
 assert.doesNotMatch(s,/Demo content|font-semibold|hover:-translate/);
 assert.match(s,/href="#email-plans"/);assert.match(read("page.tsx"),/id="email-plans"/);
});
