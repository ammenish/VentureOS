import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VentureOS — Build Smarter. Grow Faster.",
  description:
    "The intelligent workspace that helps you build your startup, manage your business, discover opportunities, and prepare for growth. Your startup deserves more than a collection of tools.",
  keywords: [
    "startup",
    "business management",
    "AI assistant",
    "venture",
    "funding",
    "government schemes",
    "startup operating system",
  ],
  openGraph: {
    title: "VentureOS — Build Smarter. Grow Faster.",
    description:
      "The intelligent workspace that helps you build your startup, manage your business, discover opportunities, and prepare for growth.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-screen bg-[#F8FAFC] text-[#0F172A] antialiased">
        {children}
      </body>
    </html>
  );
}
