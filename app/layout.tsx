import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";

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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geist.variable} antialiased bg-[#0a0a0a] text-[#f0ede8]`}>
        <Nav />
        <main className="pt-16">{children}</main>
      </body>
    </html>
  );
}
