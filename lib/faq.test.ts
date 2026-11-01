// Run: npx tsx --test lib/faq.test.ts
import { test } from "node:test";
import assert from "node:assert/strict";
import { extractFaq } from "./faq";

const md = `Intro paragraph.

## Some section

Body.

## Frequently asked questions

### Do you charge hourly?

No. Every engagement is a **fixed fee** or a [monthly retainer](/pricing).

### What's the minimum engagement?

A Discovery Sprint.

Second paragraph.

## Next steps

- Book a call
`;

test("extracts questions and plain-text answers from the FAQ section", () => {
  assert.deepEqual(extractFaq(md), [
    {
      question: "Do you charge hourly?",
      answer: "No. Every engagement is a fixed fee or a monthly retainer.",
    },
    { question: "What's the minimum engagement?", answer: "A Discovery Sprint. Second paragraph." },
  ]);
});

test("returns an empty list when there is no FAQ section", () => {
  assert.deepEqual(extractFaq("## Just a heading\n\nText."), []);
});
