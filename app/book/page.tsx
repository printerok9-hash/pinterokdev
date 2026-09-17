import { Shell, whatsapp } from "@/components/site";
import Intro from "@/components/intro";
import Calendly from "@/components/calendly";
import { FiPhone, FiCheckCircle } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
export const metadata = {
  title: "Book a Business Printer Repair Visit",
  description:
    "Request a business printer repair appointment with Pinterok. On-site business printer service for UK businesses and organisations.",
};
export default function Book() {
  return (
    <Shell>
      <Intro
        label="Book a repair"
        title="Your next good print starts here."
        description="Request printer repair for your business or organisation. We confirm postcode coverage, service suitability and availability before booking a visit."
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
            Choose a consultation time in Calendly and share your organisation,
            business postcode and printer details. A consultation confirmation
            does not confirm an engineer visit; we arrange that with you after
            checking coverage and availability.
          </p>
          <ul className="checklist">
            {[
              "Business premises appointments",
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
