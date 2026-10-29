"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

// When a text block's last line holds only one or two words, bind the last
// three words together so they wrap as a unit. CSS text-wrap: pretty only
// guards against a single orphaned word.
const SELECTOR = "main p, main li, main h1, main h2, main h3, footer p";
const WORDS_TO_KEEP = 3;

function rectOf(node: Text, offset: number) {
  const range = document.createRange();
  range.setStart(node, offset);
  range.setEnd(node, offset + 1);
  return range.getBoundingClientRect();
}

function topOf(node: Text, offset: number) {
  return rectOf(node, offset).top;
}

function bindLastWords(el: Element) {
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  let last: Text | null = null;
  while (walker.nextNode()) {
    const node = walker.currentNode as Text;
    if (node.data.trim()) last = node;
  }
  if (!last) return;

  const text = last.data.trimEnd();
  const words = text.split(/ +/);
  if (words.length < WORDS_TO_KEEP + 1) return;

  // Already fine if the third-to-last word sits on the same line as the last.
  const tailStart = text.length - words.slice(-WORDS_TO_KEEP).join(" ").length;
  if (Math.abs(topOf(last, tailStart) - topOf(last, text.length - 1)) < 2) return;

  const original = last.data;
  const trailing = last.data.slice(text.length);
  const height = el.getBoundingClientRect().height;

  const box = el.getBoundingClientRect();

  // Prefer binding three words, then two. Undo a binding that adds a line,
  // leaves the line above it less than half full (a ragged break is worse
  // than the orphan), or overflows the container (large type, narrow screen).
  for (let keep = WORDS_TO_KEEP; keep >= 2; keep--) {
    const head = words.slice(0, -keep).join(" ");
    const tail = words.slice(-keep).join(" ");
    last.data = `${head} ${tail}${trailing}`;
    const grew = el.getBoundingClientRect().height > height + 1;
    const overflows = el.scrollWidth > el.clientWidth + 1;
    const lineAbove = rectOf(last, head.length - 1).right - box.left;
    const ragged = lineAbove < el.clientWidth / 2;
    if (!grew && !overflows && !ragged) return;
  }
  last.data = original;
}

export default function NoOrphans() {
  const pathname = usePathname();

  useEffect(() => {
    document.querySelectorAll(SELECTOR).forEach(bindLastWords);
  }, [pathname]);

  return null;
}
