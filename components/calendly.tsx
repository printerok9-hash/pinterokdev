"use client";
export default function Calendly() {
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
      <h3>Choose a time online</h3>
      <p>
        Choose an available time and book with Calendly right here in this
        section.
      </p>
      <iframe
        title="Book a Pinterok appointment with Calendly"
        src={url.toString()}
        className="calendly-frame"
      />
    </div>
  );
}
