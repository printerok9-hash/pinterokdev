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
    default: "Pinterok | Business Printer Repair Services UK",
    template: "%s | Pinterok",
  },
  description:
    "Business printer repair services UK. Commercial printer maintenance and on-site printer engineers exclusively for offices, businesses and organisations.",
  keywords: [
    "business printer repair UK",
    "commercial printer repair",
    "office printer maintenance",
    "business printer servicing",
    "printer engineer for business",
    "office printer repair",
    "business printer repair",
    "commercial printer servicing",
  ],
  openGraph: {
    title: "Pinterok — Back to printing. Back to business.",
    description:
      "Professional printer repair for businesses and organisations across the UK.",
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
