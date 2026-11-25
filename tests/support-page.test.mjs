import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync,existsSync} from "node:fs";
const read=path=>readFileSync(new URL(path,import.meta.url),"utf8");
test("support page has four dedicated sections in reference order",()=>{
 const page=read("../src/features/cloud/support/page.tsx");
 assert.match(page,/<Hero \/>[\s\S]*<HelpOptions \/>[\s\S]*<MediaAndNews \/>[\s\S]*<OfficeLocations \/>/);
 assert.doesNotMatch(page,/<Packages \/>|<DomainSearch \/>/);
});
test("support channels and office details are real configured destinations",()=>{
 const links=read("../src/features/cloud/data/cloud-links.ts");
 assert.match(links,/supportEmail: "info@cloud.octalve.com"/);
 const office=read("../src/features/cloud/support/components/OfficeLocations.tsx");
 assert.match(office,/Anafaraa Plaza, Behind MIB, 1st Avenue, Gwarimpa, Abuja\./);
 assert.match(office,/encodeURIComponent\(address/);
 const help=read("../src/features/cloud/support/components/HelpOptions.tsx");
 for(const route of ["knowledge-base","tools","contact"]) {
  assert.ok(help.includes('href: "/'+route+'"'));
  assert.ok(existsSync(new URL("../src/app/"+route+"/page.tsx",import.meta.url)));
 }
 assert.doesNotMatch(read("../src/features/cloud/support/components/Hero.tsx"),/demo section|Hostinger Agent/);
});
