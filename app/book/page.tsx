import { Shell, whatsapp } from "@/components/site";
import Intro from "@/components/intro";
import Calendly from "@/components/calendly";
import { FiPhone, FiCheckCircle } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
export const metadata = {
  title: "Book Your Printer Repair Appointment",
  description:
    "Request a convenient printer repair appointment with Pinterok. Doorstep printer service for UK homes and offices.",
};
export default function Book() {
  return (
    <Shell>
      <Intro
        label="Book a repair"
        title="Your next good print starts here."
        description="Choose an available time in Calendly to discuss your printer repair."
      />
      <section className="section container booking-grid">
        <div>
          <span className="eyebrow">A SIMPLE FIRST STEP</span>
          <h2>
            Less hassle.
            <br />
            More getting things done.
          </h2>
          <p>
            Choose an available time in Calendly and share your repair details.
            Calendly will send your booking confirmation and appointment
            details.
          </p>
          <ul className="checklist">
            {[
              "Home and office appointments",
              "Clear pricing before repair",
              "All major printer brands supported",
            ].map((t) => (
              <li key={t}>
                <FiCheckCircle />
                {t}
              </li>
            ))}
          </ul>
          <div className="booking-options">
            <h3>Prefer to talk it through?</h3>
            <a className="text-link" href="tel:+447441448082">
              <FiPhone />
              +44 7441448082
            </a>
            <a className="text-link" href={whatsapp}>
              <FaWhatsapp />
              Book through WhatsApp
            </a>
          </div>
        </div>
        <Calendly />
      </section>
    </Shell>
  );
}
