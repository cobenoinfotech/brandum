import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: {
    default: "Brandum INC | Premier Market Research & Field Operations Agency",
    template: "%s | Brandum INC Market Research",
  },
  description:
    "Brandum INC delivers high-integrity quantitative and qualitative market intelligence, physical & mystery audits, sensory tests, and pan-India field operations across 28 states.",
  keywords: [
    "Market Research India",
    "Field Operations",
    "Face-to-Face Connect",
    "Central Location Test",
    "Mystery Audit",
    "Physical Audit",
    "Focus Group Discussion",
    "Depth Interview",
    "CATI Data Collection",
    "Consumer Panel",
    "Brandum INC",
  ],
  authors: [{ name: "Brandum INC Market Research" }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://branduminc.com",
    siteName: "Brandum INC Market Research",
    title: "Brandum INC | 10+ Years of Field Research Excellence",
    description:
      "Empowering strategic brand and policy decisions with rigorous statistical field intelligence across India.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "Brandum INC Market Research",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className="flex min-h-screen flex-col bg-slate-50 text-slate-900 antialiased selection:bg-blue-600 selection:text-white"
      >
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
