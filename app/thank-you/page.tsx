import Link from "next/link";
import { FiCheckCircle, FiHome, FiPhone } from "react-icons/fi";
import { Shell } from "@/components/site";

export const metadata = {
  title: "Thank You | Pinterok",
  description: "Your request has been received by Pinterok.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ThankYou() {
  return (
    <Shell>
      <section className="section container center-heading">
        <FiCheckCircle aria-hidden="true" className="thank-you-icon" />
        <span className="eyebrow">REQUEST RECEIVED</span>
        <h1>Thank you for getting in touch.</h1>
        <p>
          We have received your request. Our team will review the details and
          contact you shortly to confirm the next step.
        </p>
        <div className="thank-you-actions">
          <Link href="/" className="button">
            <FiHome />
            Back to home
          </Link>
          <a className="text-link" href="tel:+447441448082">
            <FiPhone />
            Call +44 7441448082
          </a>
        </div>
      </section>
    </Shell>
  );
}