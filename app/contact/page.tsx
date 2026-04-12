import ContactForm from "@/components/ContactForm";
import ContactFooter from "@/components/ContactFooter";
import FadeIn from "@/components/FadeIn";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — Kairos Performance",
  description: "Schedule your discovery call with Kairos Performance. Tell us where your revenue operation is breaking down and we'll follow up within one business day.",
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
                <p className="text-xs uppercase tracking-widest text-[#999] mb-4">
                  Contact
                </p>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-[#f0ede8] leading-tight mb-4">
                  Schedule your discovery call.
                </h1>
                <p className="text-[#c0bdb8] text-base leading-relaxed">
                  Tell us where you are and what you&apos;re trying to solve.
                  We&apos;ll follow up within one business day to set up a
                  focused conversation.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.15}>
              <div>
                <p className="text-xs uppercase tracking-widest text-[#999] mb-4">
                  What to expect
                </p>
                <ul className="space-y-4 text-[#c0bdb8] text-sm leading-relaxed">
                  <li className="flex gap-3">
                    <span className="text-[#2dd4bf] font-mono text-xs mt-0.5 shrink-0">01</span>
                    <span>We&apos;ll review your message and reach out within one business day to schedule a discovery call.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[#2dd4bf] font-mono text-xs mt-0.5 shrink-0">02</span>
                    <span>The discovery call is focused — we&apos;ll learn how your business operates and where growth is creating friction.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[#2dd4bf] font-mono text-xs mt-0.5 shrink-0">03</span>
                    <span>If there&apos;s a fit, we&apos;ll define a clear plan and move into hands-on work together.</span>
                  </li>
                </ul>
              </div>
            </FadeIn>
          </div>

          {/* Right: form */}
          <FadeIn delay={0.1}>
            <ContactForm />
          </FadeIn>

        </div>
      </section>

      <ContactFooter />
    </>
  );
}
