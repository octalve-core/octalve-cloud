import test from "node:test";
import assert from "node:assert/strict";
import {normalizeLookup,registryEndpoints,summarizeRegistry} from "../src/lib/registry-rdap.ts";
test("validates domains without silently rewriting invalid inputs",()=>{assert.equal(normalizeLookup("Example.COM."),"example.com");for(const v of ["foo","bad name.com","x@y.com","example.com/path","-bad.com"])assert.equal(normalizeLookup(v),null)});
test("registry discovery prefers longest suffix and HTTPS",()=>{const data={services:[[["ng"],["https://registry.example/"]],[["com.ng"],["http://insecure.example/","https://specific.example/rdap/"]]]};assert.deepEqual(registryEndpoints(data,"brand.com.ng"),["https://specific.example/rdap/domain/brand.com.ng"])});
test("rejects mismatched or non-domain records; preserves unknown fields",()=>{assert.equal(summarizeRegistry({objectClassName:"domain",ldhName:"other.com"},"example.com","registry"),null);const r=summarizeRegistry({objectClassName:"domain",ldhName:"example.com"},"example.com","registry");assert.equal(r.registrar,null);assert.equal(r.dnssec,null)});
