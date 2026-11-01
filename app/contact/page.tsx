import { Suspense } from "react";
import ContactForm from "@/components/ContactForm";
import ContactFormPrefill from "@/components/ContactFormPrefill";
import ContactFooter from "@/components/ContactFooter";
import FadeIn from "@/components/FadeIn";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Book a 30-minute Intro Call with Kairos Performance. Tell us where your revenue operations are breaking down and leave with an outline of the fix.",
};

export default function ContactPage() {
  return (
    <>
      <section className="border-b border-[#1f1f1f] py-14">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left: intro + what to expect */}
          <div className="flex flex-col gap-10">
            <FadeIn delay={0}>
              <div>
                <p className="text-sm uppercase tracking-widest text-[#999] mb-4">
                  Contact
                </p>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-[#f0f0eb] leading-tight mb-4">
                  Book your Intro Call.
                </h1>
                <p className="text-[#c0bdb8] text-base leading-relaxed">
                  A focused, 30-minute conversation about where your revenue
                  operations are breaking down. You leave with an outline of the
                  fix, whether or not we work together.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.15}>
              <div>
                <p className="text-sm uppercase tracking-widest text-[#999] mb-4">
                  What to expect
                </p>
                <ul className="space-y-4 text-[#c0bdb8] text-sm leading-relaxed">
                  <li className="flex items-baseline gap-3">
                    <span className="text-[#2dd4bf] font-mono text-xs shrink-0">01</span>
                    <span>We&apos;ll reply within one business day to schedule your 30-minute Intro Call.</span>
                  </li>
                  <li className="flex items-baseline gap-3">
                    <span className="text-[#2dd4bf] font-mono text-xs shrink-0">02</span>
                    <span>On the call, we learn how your business runs and where growth is creating friction. If you&apos;ve taken the AI Readiness Scorecard, we start from your results.</span>
                  </li>
                  <li className="flex items-baseline gap-3">
                    <span className="text-[#2dd4bf] font-mono text-xs shrink-0">03</span>
                    <span>You leave with an outline of the fix and the right way in. If there&apos;s a fit, we build the plan together from there.</span>
                  </li>
                </ul>
              </div>
            </FadeIn>
          </div>

          {/* Right: form */}
          <FadeIn delay={0.1}>
            {/* Server-renders the plain form; swaps in a Scorecard prefill on the client. */}
            <Suspense fallback={<ContactForm />}>
              <ContactFormPrefill />
            </Suspense>
          </FadeIn>

        </div>
      </section>

      <ContactFooter />
    </>
  );
}
