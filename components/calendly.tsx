"use client";
import { useState } from "react";
export default function Calendly() {
  const [loaded, setLoaded] = useState(false);
  const raw = process.env.NEXT_PUBLIC_CALENDLY_URL;
  let url: URL | undefined;
  try {
    if (raw) {
      const parsed = new URL(raw);
      if (parsed.protocol === "https:" && parsed.hostname === "calendly.com")
        url = parsed;
    }
  } catch {}
  if (!url) return null;
  url.searchParams.set("hide_gdpr_banner", "0");
  url.searchParams.set("primary_color", "2563eb");
  return (
    <div className="booking-options">
      <h3>Choose a time online</h3>
      <p>
        Calendly is an external scheduling provider. Load the calendar to view
        available times and book directly.
      </p>
      {loaded ? (
        <iframe
          title="Book a Pinterok appointment with Calendly"
          src={url.toString()}
          className="calendly-frame"
        />
      ) : (
        <button className="button" onClick={() => setLoaded(true)}>
          Load appointment calendar ↗
        </button>
      )}
    </div>
  );
}
