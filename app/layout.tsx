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
    default: "Kairos Performance — AI-Native Operating Systems for Growth",
    template: "%s | Kairos Performance",
  },
  description:
    "We partner with leadership teams to embed AI-native systems into core operations, unlocking growth through better execution, not bigger teams.",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Kairos Performance",
    title: "Kairos Performance — AI-Native Operating Systems for Growth",
    description:
      "We partner with leadership teams to embed AI-native systems into core operations, unlocking growth through better execution, not bigger teams.",
  },
  twitter: {
    card: "summary",
    title: "Kairos Performance — AI-Native Operating Systems for Growth",
    description:
      "We partner with leadership teams to embed AI-native systems into core operations, unlocking growth through better execution, not bigger teams.",
  },
  robots: { index: true, follow: true },
  ...(process.env.GOOGLE_SITE_VERIFICATION && {
    verification: {
      google: process.env.GOOGLE_SITE_VERIFICATION,
    },
  }),
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
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
        )}
        {process.env.NEXT_PUBLIC_CLARITY_ID && (
          <Script
            id="microsoft-clarity"
            strategy="afterInteractive"
          >{`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${process.env.NEXT_PUBLIC_CLARITY_ID}");`}</Script>
        )}
        <UTMCapture />
        <ScrollDepthTracker />
      </body>
    </html>
  );
}
