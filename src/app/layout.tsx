import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: "variable"
});

export const metadata: Metadata = {
  metadataBase: new URL("https://cloud.octalve.com"),
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
    url: "https://cloud.octalve.com",
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
      <body className="font-sans font-normal"><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify({"@context":"https://schema.org","@type":"Organization","@id":"https://cloud.octalve.com/#organization",name:"Octalve Cloud",url:"https://cloud.octalve.com",email:"info@cloud.octalve.com",telephone:"+2348073459090",address:{"@type":"PostalAddress",streetAddress:"Anafaraa Plaza, Behind MIB, 1st Avenue, Gwarimpa",addressLocality:"Abuja",addressCountry:"NG"}}).replace(/</g,"\\u003c")}}/>{children}</body>
    </html>
  );
}
