import test from "node:test";import assert from "node:assert/strict";import {localIdeas,validateIdeas} from "../src/lib/domain-name-ideas.ts";
test("100 unique valid ideas with compound extension",()=>{const a=localIdeas("Ojuolape",".com.ng");assert.equal(a.length,100);assert.equal(new Set(a).size,100);assert.ok(a.every(v=>v.endsWith(".com.ng")))});
test("reject invalid model names and wrong extensions",()=>{assert.deepEqual(validateIdeas(["good.com","bad name.com","evil.net","good.com",{name:"nice.com"}],".com"),["good.com","nice.com"])});
