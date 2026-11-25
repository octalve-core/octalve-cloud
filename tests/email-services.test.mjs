import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
const read=p=>readFileSync(new URL("../src/features/cloud/"+p,import.meta.url),"utf8");
test("email and security retain six offerings in shared three-column desktop layout",()=>{
 const shared=read("components/ServiceFeatures.tsx");
 assert.match(shared,/lg:grid-cols-3/);assert.match(shared,/sm:grid-cols-2/);assert.match(shared,/bg-\[#F6F7F8\]/);assert.match(shared,/bg-gradient-to-r/);assert.match(shared,/text-sm leading-6/);
 for(const [folder,titles] of [["email",["Mailbox Setup","Email DNS Records","Team Accounts","Webmail Access","Migration Support","Deliverability Guidance"]],["security",["SSL Setup","HTTPS Redirects","Security Review","Backup Guidance","Malware Awareness","DNS Protection"]]]){
 const s=read(folder+"/components/Services.tsx");assert.match(s,/components\/ServiceFeatures/);assert.equal((s.match(/title: "/g)||[]).length,6);for(const title of titles)assert.ok(s.includes('title: "'+title+'"'));assert.doesNotMatch(s,/Demo content/);const anchor=folder+"-plans";assert.ok(s.includes('href="#'+anchor+'"'));assert.ok(read(folder+"/page.tsx").includes('id="'+anchor+'"'));}
});
test("specified sections are commented out and source files remain",()=>{for(const [folder,names] of [["email",["Overview","WhyOctalveCloud"]],["security",["Overview","WhyOctalveCloud"]],["migration",["Migration"]]]){const s=read(folder+"/page.tsx");for(const n of names){assert.ok(s.includes("{/* <"+n+" /> */}"));assert.ok(s.includes("// import { "+n+" }"));assert.ok(read(folder+"/components/"+n+".tsx").length>0);}}});
