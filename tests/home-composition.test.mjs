import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
const read = path => readFileSync(new URL(path,import.meta.url),"utf8");
test("homepage retains disabled sections and puts benefits after packages",()=>{
 const page=read("../src/features/cloud/home/page.tsx");
 assert.match(page,/<Hero \/>[\s\S]*?<Packages \/>[\s\S]*?<WhyOctalveCloudBenefits \/>/);
 assert.match(page,/\{\/\* <DomainSearch \/> \*\/\}/);
 assert.match(page,/\{\/\* <WhyOctalveCloud \/> \*\/\}/);
 assert.ok(read("../src/features/cloud/home/components/DomainSearch.tsx"));
 assert.ok(read("../src/features/cloud/home/components/WhyOctalveCloud.tsx"));
});
test("announcement stripe stays inside sticky header and respects reduced motion",()=>{
 assert.match(read("../src/features/cloud/components/navigation/CloudHeaderShell.tsx"),/<AnnouncementStripe \/>/);
 assert.match(read("../src/features/cloud/components/navigation/AnnouncementStripe.tsx"),/prefers-reduced-motion: reduce/);
 assert.doesNotMatch(read("../src/features/cloud/home/components/Hero.tsx"),/Pause animations/);
});

test("hero fills remaining viewport and loops without visible pause buttons",()=>{
 const hero=read("../src/features/cloud/home/components/Hero.tsx");
 const search=read("../src/features/cloud/home/components/HeroDomainSearch.tsx");
 const stripe=read("../src/features/cloud/components/navigation/AnnouncementStripe.tsx");
 assert.match(hero,/100svh-86px/);
 assert.match(hero,/setInterval\(\(\) => setGrow\(value => !value\)/);
 assert.match(search,/!focused && !query/);
 assert.match(search,/onFocus=\{\(\) => setFocused\(true\)\}/);
 assert.match(stripe,/announcement-window:hover/);
 assert.match(stripe,/focus-within/);
 assert.doesNotMatch(stripe,/<button/);
});
