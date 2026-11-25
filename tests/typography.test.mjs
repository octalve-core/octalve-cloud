import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
const source = path => readFileSync(new URL(path, import.meta.url), "utf8");
test("Inter variable is wired into the public Tailwind sans stack", () => {
  assert.match(source("../tailwind.config.ts"), /sans:\s*\["var\(--font-inter\)"/);
  const layout = source("../src/app/layout.tsx");
  assert.match(layout, /variable:\s*"--font-inter"/);
  assert.match(layout, /weight:\s*"100 900"/);
  assert.match(layout, /className="font-sans font-normal"/);
});
test("hero uses regular weight and artificial weight synthesis is disabled", () => {
  assert.match(source("../src/features/cloud/home/components/Hero.tsx"), /<h1\s+className="[^"]*font-normal/);
  assert.match(source("../src/app/globals.css"), /font-synthesis-weight:\s*none/);
});
