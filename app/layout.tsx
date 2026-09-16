import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
const roboto = localFont({
  src: [
    { path: "../public/roboto.ttf", weight: "100 900", style: "normal" },
    { path: "../public/roboto-italic.ttf", weight: "100 900", style: "italic" },
  ],
  variable: "--font-roboto",
  display: "swap",
  weight: "100 900",
});
export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  ),
  title: {
    default: "Pinterok | Professional Printer Repair UK",
    template: "%s | Pinterok",
  },
  description:
    "Independent printer repair near you: onsite and remote printer engineer support, diagnostics, WiFi setup, maintenance and cartridge services across the UK. Call +44 7441448082.",
  keywords: [
    "printer repair near me",
    "printer repairs near me",
    "printer repair UK",
    "printer repair service",
    "local printer repair",
    "printer engineer near me",
    "printer technician near me",
    "office printer repair",
    "business printer repair",
    "same day printer repair",
  ],
  openGraph: {
    title: "Pinterok — Back to printing. Back to business.",
    description:
      "Professional printer repair for homes and offices across the UK.",
    locale: "en_GB",
    type: "website",
    images: ["/printer.jpg"],
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en-GB"
      data-scroll-behavior="smooth"
      className={roboto.variable}
    >
      <body>{children}</body>
    </html>
  );
}
