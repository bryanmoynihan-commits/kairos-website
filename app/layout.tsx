// v2
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import Script from "next/script";
import "./globals.css";
import Nav from "@/components/Nav";
import ScrollToTop from "@/components/ScrollToTop";
import NoOrphans from "@/components/NoOrphans";
import UTMCapture from "@/components/UTMCapture";
import ScrollDepthTracker from "@/components/ScrollDepthTracker";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kairosperformance.ai"),
  title: {
    default: "Kairos Performance | AI-Native Revenue Operating Systems",
    template: "%s | Kairos Performance",
  },
  description:
    "Kairos Performance builds the AI-native revenue operating system underneath your growth plan, so your team scales on clean data instead of bigger headcount.",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Kairos Performance",
    title: "Kairos Performance | AI-Native Revenue Operating Systems",
    description:
      "Kairos Performance builds the AI-native revenue operating system underneath your growth plan, so your team scales on clean data instead of bigger headcount.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kairos Performance | AI-Native Revenue Operating Systems",
    description:
      "Kairos Performance builds the AI-native revenue operating system underneath your growth plan, so your team scales on clean data instead of bigger headcount.",
  },
  robots: { index: true, follow: true },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION || "vh0k1ntAdApuetTrqMTWh9164Zopnt_QoVWot8hnGyA",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geist.variable} antialiased bg-[#0e0d0d] text-[#f0f0eb]`}>
        <ScrollToTop />
        <NoOrphans />
        <Nav />
        <main className="pt-20">{children}</main>

        {/* Analytics */}
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-32GC385N7L"} />
        <Script
          id="microsoft-clarity"
          strategy="afterInteractive"
        >{`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${process.env.NEXT_PUBLIC_CLARITY_ID || "vwg2kh9s7g"}");`}</Script>
        <UTMCapture />
        <ScrollDepthTracker />
      </body>
    </html>
  );
}
