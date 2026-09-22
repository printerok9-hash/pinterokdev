"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { GOOGLE_ADS_BOOKING_CONVERSION, reportConversion } from "@/lib/gtag";
export default function Calendly() {
  const router = useRouter();
  useEffect(() => {
    function handleCalendlyEvent(event: MessageEvent) {
      if (
        event.origin === "https://calendly.com" &&
        (event.data as { event?: string } | undefined)?.event ===
          "calendly.event_scheduled"
      ) {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({ event: "calendly_booking_completed" });
        reportConversion(GOOGLE_ADS_BOOKING_CONVERSION);
        router.push("/thank-you");
      }
    }
    window.addEventListener("message", handleCalendlyEvent);
    return () => window.removeEventListener("message", handleCalendlyEvent);
  }, [router]);
  const raw = process.env.NEXT_PUBLIC_CALENDLY_URL;
  let url: URL | undefined;
  try {
    if (raw) {
      const parsed = new URL(raw);
      if (parsed.protocol === "https:" && parsed.hostname === "calendly.com")
        url = parsed;
    }
  } catch {}
  if (!url)
    return (
      <div className="booking-options">
        <h3>Arrange your appointment</h3>
        <p>
          Online booking is currently unavailable. Call us to arrange a
          convenient time.
        </p>
        <a className="button" href="tel:+447441448082">
          Call +44 7441448082
        </a>
      </div>
    );
  url.searchParams.set("hide_gdpr_banner", "0");
  url.searchParams.set("primary_color", "2563eb");
  return (
    <div className="booking-options">
      <h3>Request a business appointment online</h3>
      <p>
        For business and organisational customers only. Choose a preferred time
        with Calendly. Our team will confirm service coverage and appointment
        availability before a visit is booked.
      </p>
      <iframe
        title="Book a Pinterok appointment with Calendly"
        src={url.toString()}
        className="calendly-frame"
      />
    </div>
  );
}
