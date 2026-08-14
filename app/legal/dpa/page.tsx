import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getLegalDoc } from "@/lib/legal";
import FadeIn from "@/components/FadeIn";
import Footer from "@/components/Footer";

const PDF_HREF = "/legal/kairos-data-processing-addendum.pdf";
const CANONICAL = "https://kairosperformance.ai/legal/dpa";

const doc = getLegalDoc("dpa");

export const metadata: Metadata = {
  title: doc?.title ?? "Data Processing Addendum",
  description: doc?.description,
  alternates: {
    canonical: CANONICAL,
  },
  openGraph: {
    title: `${doc?.title ?? "Data Processing Addendum"} | Kairos Performance`,
    description: doc?.description,
    url: CANONICAL,
    type: "article",
  },
};

function formatDate(iso: string): string {
  return new Date(iso + "T00:00:00").toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function DpaPage() {
  if (!doc) notFound();

  return (
    <>
      <article className="pt-32 pb-24">
        <div className="max-w-6xl mx-auto px-6">
          {/* Header */}
          <header className="max-w-prose mb-12">
            <FadeIn>
              <span className="text-xs uppercase tracking-widest text-[#2dd4bf] mb-4 block">
                Legal
              </span>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-[#f0f0eb] mb-6">
                {doc.title}
              </h1>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div className="flex flex-wrap items-center gap-4">
                <p className="text-sm text-[#999]">
                  Last updated {formatDate(doc.lastUpdated)}
                </p>
                <a
                  href={PDF_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  className="group inline-flex items-center gap-2 text-sm font-medium text-[#f0f0eb] border border-[#2d2a2b] hover:border-[#2dd4bf]/40 hover:text-[#2dd4bf] rounded-sm px-4 py-2 transition-colors duration-200"
                >
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  Download PDF
                </a>
              </div>
            </FadeIn>
          </header>

          {/* DPA body */}
          <FadeIn delay={0.2}>
            <div className="prose-kairos max-w-prose">
              <Markdown
                remarkPlugins={[[remarkGfm, { singleTilde: false }]]}
                components={{
                  a: ({ children, href, ...props }) => (
                    <a
                      href={href}
                      target={href?.startsWith("http") ? "_blank" : undefined}
                      rel={
                        href?.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                      {...props}
                    >
                      {children}
                    </a>
                  ),
                }}
              >
                {doc.content}
              </Markdown>
            </div>
          </FadeIn>
        </div>
      </article>

      <Footer />
    </>
  );
}
