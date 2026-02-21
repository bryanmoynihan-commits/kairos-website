import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kairos Performance — AI-Native Operating Systems for Growth",
  description:
    "We partner with leadership teams to embed AI-native systems into core operations, unlocking growth through better execution, not bigger teams.",
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
