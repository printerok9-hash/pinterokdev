declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    gtag_report_conversion?: (url?: string, sendTo?: string) => boolean;
  }
}

export const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
export const GOOGLE_ADS_BOOKING_CONVERSION =
  process.env.NEXT_PUBLIC_GOOGLE_ADS_BOOKING_CONVERSION;
export const GOOGLE_ADS_ENQUIRY_CONVERSION =
  process.env.NEXT_PUBLIC_GOOGLE_ADS_ENQUIRY_CONVERSION;

export function reportConversion(sendTo: string | undefined) {
  if (!sendTo) return;
  if (typeof window.gtag === "function") {
    window.gtag("event", "conversion", { send_to: sendTo });
  }
}

export function reportClickConversion(sendTo: string | undefined) {
  if (!sendTo || typeof window === "undefined") return;
  window.gtag_report_conversion?.(undefined, sendTo);
}
