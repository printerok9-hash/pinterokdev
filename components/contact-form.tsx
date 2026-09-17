"use client";
import { useState } from "react";
import {
  FiArrowUpRight,
  FiShield,
  FiCheckCircle,
  FiMessageSquare,
} from "react-icons/fi";
import Link from "next/link";
import PhoneText from "./phone-text";
export default function ContactForm({
  booking = false,
}: {
  booking?: boolean;
}) {
  const [state, setState] = useState<"idle" | "sending" | "success" | "error">(
    "idle",
  );
  const [message, setMessage] = useState("");
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    try {
      const r = await fetch(`/api/${booking ? "appointments" : "enquiries"}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await r.json();
      if (!r.ok) throw new Error(result.error || "Please try again.");
      setState("success");
      setMessage(result.message);
      form.reset();
    } catch {
      setState("error");
      setMessage(
        "Your request could not be sent. Please try again, call +44 7441448082 or contact us on WhatsApp.",
      );
    }
  }
  return (
    <form className="contact-form" onSubmit={submit}>
      <div className="contact-form-heading">
        <div className="form-heading-top">
          <span className="form-heading-icon" aria-hidden="true">
            <FiMessageSquare />
          </span>
          <span className="form-private-badge">
            <FiShield aria-hidden="true" /> Private & secure
          </span>
        </div>
        {/* <span className="eyebrow">
          {booking ? "YOUR REPAIR STARTS HERE" : "A LITTLE HELP STARTS HERE"}
        </span> */}
        <h3>
          {booking
            ? "Request an appointment"
            : "Let’s get your printer sorted."}
        </h3>
      </div>
      {state === "success" ? (
        <div className="form-success" role="status">
          <FiCheckCircle />
          <h3>Request received.</h3>
          <p>{message}</p>
          <button
            className="button"
            type="button"
            onClick={() => setState("idle")}
          >
            Send another request
          </button>
        </div>
      ) : (
        <>
          <div className="form-grid">
            <label>
              Your name
              <input
                name="name"
                placeholder="Full name"
                autoComplete="name"
                minLength={2}
                maxLength={100}
                required
              />
            </label>
            <label>
              Phone number
              <input
                type="tel"
                name="phone"
                placeholder="Your contact number"
                autoComplete="tel"
                pattern="[+0-9 ()-]{7,25}"
                required
              />
            </label>
            <label>
              Email address
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                autoComplete="email"
                maxLength={254}
                required
              />
            </label>
            <label>
              Printer brand
              <select name="brand" required defaultValue="">
                <option value="" disabled>
                  Select brand
                </option>
                {[
                  "HP",
                  "Canon",
                  "Epson",
                  "Brother",
                  "Samsung",
                  "Ricoh",
                  "Xerox",
                  "Kyocera",
                  "Lexmark",
                  "Zebronics",
                  "Other / Not sure",
                ].map((b) => (
                  <option key={b}>{b}</option>
                ))}
              </select>
            </label>
            <label>
              Postcode
              <input
                name="postcode"
                placeholder="e.g. SW1A 1AA"
                autoComplete="postal-code"
                autoCapitalize="characters"
                minLength={2}
                maxLength={12}
                required
              />
            </label>
            <label>
              Preferred date
              <input
                type="date"
                name="preferredDate"
                min={new Date().toLocaleDateString("en-CA")}
                required={booking}
              />
            </label>
            <label className="full">
              What’s happening with your printer?
              <textarea
                name="problem"
                placeholder="Tell us the model and the problem you’re experiencing…"
                minLength={10}
                maxLength={3000}
                rows={2}
                required
              />
            </label>
          </div>
          <label className="honeypot" aria-hidden="true">
            Leave empty
            <input name="website" tabIndex={-1} autoComplete="off" />
          </label>
          <label className="consent">
            <input type="checkbox" name="consent" value="true" required />
            <span>
              I am enquiring on behalf of a business or organisation and agree
              to be contacted about this request. Read our{" "}
              <Link href="/privacy">privacy policy</Link>.
            </span>
          </label>
          {state === "error" && (
            <p className="form-error" role="alert">
              <PhoneText>{message}</PhoneText>
            </p>
          )}
          <button className="button form-submit" disabled={state === "sending"}>
            {state === "sending"
              ? "Sending your request…"
              : booking
                ? "Request appointment"
                : "Send repair enquiry"}
            <FiArrowUpRight />
          </button>
          <p className="form-note">
            <FiShield /> Your details stay private. No spam, ever.
          </p>
          {booking && (
            <p className="form-note">
              Your preferred date is a request. We’ll contact you to confirm
              availability.
            </p>
          )}
        </>
      )}
    </form>
  );
}
