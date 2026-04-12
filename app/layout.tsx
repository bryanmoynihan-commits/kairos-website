// v2
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import Script from "next/script";
import "./globals.css";
import Nav from "@/components/Nav";
import ScrollToTop from "@/components/ScrollToTop";
import UTMCapture from "@/components/UTMCapture";
import ScrollDepthTracker from "@/components/ScrollDepthTracker";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kairosperformance.ai"),
  title: {
    default: "Kairos Performance — AI-Native Revenue Operating Systems",
    template: "%s | Kairos Performance",
  },
  description:
    "Leadership teams use our AI-native revenue systems to drive growth through better execution — not bigger teams.",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Kairos Performance",
    title: "Kairos Performance — AI-Native Revenue Operating Systems",
    description:
      "Leadership teams use our AI-native revenue systems to drive growth through better execution — not bigger teams.",
  },
  twitter: {
    card: "summary",
    title: "Kairos Performance — AI-Native Revenue Operating Systems",
    description:
      "Leadership teams use our AI-native revenue systems to drive growth through better execution — not bigger teams.",
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
      <body className={`${geist.variable} antialiased bg-[#0a0a0a] text-[#f0ede8]`}>
        <ScrollToTop />
        <Nav />
        <main className="pt-16">{children}</main>

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
