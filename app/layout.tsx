import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import { GOOGLE_ADS_ID, GOOGLE_ADS_ENQUIRY_CONVERSION } from "@/lib/gtag";
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
    "office copier repair",
    "printer engineer UK",
  ],
  openGraph: {
    title: "Pinterok — Back to printing. Back to business.",
    description:
      "Pinterok coordinates business printer repair services for UK organisations with local service support. Coverage confirmed by postcode.",
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
      <head>
        <Script
          id="google-tag"
          src="https://www.googletagmanager.com/gtag/js?id=G-QQ01JPEPGL"
          strategy="beforeInteractive"
        />
        <Script id="google-tag-config" strategy="beforeInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-QQ01JPEPGL');
${GOOGLE_ADS_ID ? `gtag('config', ${JSON.stringify(GOOGLE_ADS_ID).replace(/</g, "\\u003c")});` : ""}`}
        </Script>
        <Script id="google-click-conversion" strategy="beforeInteractive">
          {`window.gtag_report_conversion = function(url, sendTo) {
  var destination = sendTo || ${JSON.stringify(GOOGLE_ADS_ENQUIRY_CONVERSION || "").replace(/</g, "\\u003c")};
  if (!destination || typeof window.gtag !== 'function') return false;
  window.gtag('event', 'conversion', {
    send_to: destination,
    event_callback: function() {
      if (url) window.location.assign(url);
    }
  });
  return false;
};`}
        </Script>
      </head>
      <body>{children}</body>
    </html>
  );
}
