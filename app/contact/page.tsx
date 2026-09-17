import { Shell, whatsapp } from "@/components/site";
import Intro from "@/components/intro";
import ContactForm from "@/components/contact-form";
import { FiPhone, FiMail, FiArrowUpRight } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
export const metadata = {
  title: "Contact Pinterok | Business Printer Repair UK",
  description:
    "Call +44 7441448082, WhatsApp or email printerok9@gmail.com to arrange independent printer repair.",
};
export default function Contact() {
  return (
    <Shell>
      <Intro
        label="Contact"
        title="Printer trouble? Let’s talk."
        description="Printer repair exclusively for businesses and organisations. Share your organisation, printer model and business postcode to check service availability."
      />
      <section className="section container contact-grid">
        <div>
          <span className="eyebrow">GET IN TOUCH WITH US</span>
          <h2>
            Real help.
            <br />A conversation away.
          </h2>
          <p>
            Contact our team for repair enquiries and appointments. Share your
            postcode and printer model to help us check availability.
          </p>
          <a className="contact-method" href="tel:+447441448082">
            <FiPhone />
            <span>
              <small>PHONE</small>+44 7441448082
            </span>
            <FiArrowUpRight />
          </a>
          <a className="contact-method" href="mailto:printerok9@gmail.com">
            <FiMail />
            <span>
              <small>EMAIL</small>printerok9@gmail.com
            </span>
            <FiArrowUpRight />
          </a>
          <a className="contact-method" href={whatsapp}>
            <FaWhatsapp />
            <span>
              <small>WHATSAPP</small>Message our team
            </span>
            <FiArrowUpRight />
          </a>
        </div>
        <ContactForm />
      </section>
    </Shell>
  );
}
