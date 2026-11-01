export interface FaqItem {
  question: string;
  answer: string;
}

const FAQ_HEADING = /^## Frequently asked questions\s*$/im;

// Markdown to plain text for structured data: drop link targets and emphasis.
function toPlainText(markdown: string): string {
  return markdown
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/(\*\*|__|\*|_|`)/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

// Reads the "## Frequently asked questions" section of an article, where each
// question is a "### " heading followed by its answer. The rendered section and
// the FAQPage JSON-LD both come from this one source, so they can't drift.
export function extractFaq(content: string): FaqItem[] {
  const start = content.search(FAQ_HEADING);
  if (start === -1) return [];

  const afterHeading = content.slice(start).replace(FAQ_HEADING, "");
  const nextSection = afterHeading.search(/^## /m);
  const section = nextSection === -1 ? afterHeading : afterHeading.slice(0, nextSection);

  return section
    .split(/^### /m)
    .slice(1)
    .map((chunk) => {
      const newline = chunk.indexOf("\n");
      return {
        question: chunk.slice(0, newline === -1 ? undefined : newline).trim(),
        answer: newline === -1 ? "" : toPlainText(chunk.slice(newline + 1)),
      };
    })
    .filter((item) => item.question && item.answer);
}
