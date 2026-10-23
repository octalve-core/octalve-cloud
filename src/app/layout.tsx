import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const cloudPublicUrl = process.env.NEXT_PUBLIC_CLOUD_PUBLIC_URL?.trim() || "https://cloud.octalve.com";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL(cloudPublicUrl),
  title: {
    default: "Octalve Cloud — Domains, Hosting, Email & Digital Infrastructure",
    template: "%s | Octalve Cloud"
  },
  description:
    "Octalve Cloud helps businesses, founders and organizations get online with domains, hosting, business email, SSL, servers and migration support.",
  openGraph: {
    title: "Octalve Cloud — Grow your business online",
    description:
      "Domains, hosting, business email, SSL, servers and migration support for modern businesses.",
    url: cloudPublicUrl,
    siteName: "Octalve Cloud",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Octalve Cloud — Grow your business online",
    description:
      "Domains, hosting, business email, SSL, servers and migration support for modern businesses."
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
