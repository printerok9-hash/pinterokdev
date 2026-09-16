import Link from "next/link";
import { Shell } from "@/components/site";
import Intro from "@/components/intro";

export const metadata = {
  title: "Terms & Conditions",
  description:
    "The terms that apply when you use the Pinterok website or book independent printer repair, maintenance or remote support services.",
};

export default function Terms() {
  return (
    <Shell>
      <Intro
        label="Terms"
        title="Terms & conditions"
        description="The terms that apply when you use this website or book a service with Pinterok. Please read them alongside our privacy policy."
      />
      <section className="section container">
        <article className="article">
          <p style={{ color: "var(--muted)", fontSize: 12 }}>
            Last updated: 16 September 2026
          </p>
          <section>
            <h2>1. Agreement to these terms</h2>
            <p>
              Welcome to Pinterok. By using this website, submitting an
              enquiry or appointment request, or booking a service with us,
              you agree to these Terms & Conditions. If you do not agree with
              any part of them, please do not use our website or services.
            </p>
          </section>
          <section>
            <h2>2. Our services</h2>
            <p>
              Pinterok provides independent printer repair, servicing,
              diagnostics, WiFi and network setup, driver and software
              troubleshooting, cartridge and toner refilling, scanner repair,
              plotter repair, copier maintenance and remote technical support
              for a range of printer brands and models, for homes and
              businesses in the UK. The exact service available for your
              printer depends on the model, fault and parts availability,
              which we will confirm with you before work begins.
            </p>
          </section>
          <section>
            <h2>3. Independent service provider</h2>
            <p>
              Pinterok is an independent third-party printer repair and
              support provider. We are not authorised, affiliated, endorsed
              or sponsored by HP®, Canon®, Epson®, Brother®, Xerox®, Ricoh®,
              Lexmark®, Samsung®, Kyocera® or any other printer manufacturer.
              All trademarks and brand names belong to their respective
              owners and are used only to describe the printers we can help
              with.
            </p>
          </section>
          <section>
            <h2>4. Enquiries, bookings and appointments</h2>
            <p>
              You can request an appointment or send an enquiry through our
              website, Calendly booking page, phone or WhatsApp. Submitting a
              request does not automatically confirm an appointment: we will
              contact you to confirm availability, discuss the fault and
              agree a suitable time before any visit is booked. A preferred
              date submitted through our website is a request only, subject
              to technician and parts availability in your area.
            </p>
          </section>
          <section>
            <h2>5. Remote support</h2>
            <p>
              Where remote support is offered, any remote access to your
              device is explained and agreed with you first, and you may end
              a remote support session at any time. We recommend backing up
              important data before a remote session. Some issues cannot be
              fully resolved remotely and may require an onsite visit,
              replacement parts, or manufacturer servicing.
            </p>
          </section>
          <section>
            <h2>6. Your responsibilities</h2>
            <p>
              When you contact us, please provide accurate information about
              your printer, its model and the fault you are experiencing.
              Please follow any reasonable safety or troubleshooting
              instructions we give you, and let us know about any relevant
              access, health and safety, or property considerations ahead of
              an onsite visit.
            </p>
          </section>
          <section>
            <h2>7. Pricing and payment</h2>
            <p>
              We aim to give clear, upfront pricing. Where a fault needs
              inspection to quote accurately, we will discuss and agree an
              estimate or the diagnosis fee with you before further chargeable
              work begins. Payment is due on completion of the agreed service
              unless we have agreed otherwise with you in writing. If a repair
              turns out to need parts or work beyond what was originally
              agreed, we will contact you to agree the change before
              proceeding.
            </p>
          </section>
          <section>
            <h2>8. Cancellations and rescheduling</h2>
            <p>
              We understand plans change. Please let us know as early as you
              can if you need to cancel or reschedule a confirmed appointment,
              so we can offer the slot to another customer. Repeated
              late cancellations or unattended appointments may affect our
              ability to offer future priority bookings.
            </p>
          </section>
          <section>
            <h2>9. Limitation of liability</h2>
            <p>
              We use reasonable skill and care when providing our services,
              but we cannot guarantee that every printer fault can be
              repaired, or that every issue can be resolved remotely. To the
              fullest extent permitted by law, Pinterok is not responsible for
              data loss, pre-existing hardware faults, software issues outside
              our control, or indirect or consequential losses arising from
              our services. Nothing in these terms limits or excludes your
              statutory rights as a consumer under the Consumer Rights Act
              2015 or other applicable UK law.
            </p>
          </section>
          <section>
            <h2>10. Website use</h2>
            <p>
              This website and its content are provided for you to learn
              about our services and get in touch with us. Please do not
              misuse the website, attempt to access parts of it you are not
              authorised to use, or submit false information through our
              forms.
            </p>
          </section>
          <section>
            <h2>11. Privacy</h2>
            <p>
              Information you share with us is handled in line with our{" "}
              <Link href="/privacy">Privacy Policy</Link>, which explains what
              we collect, why, and the choices available to you.
            </p>
          </section>
          <section>
            <h2>12. Changes to these terms</h2>
            <p>
              We may update these Terms & Conditions from time to time to
              reflect changes to our services or for legal reasons. The
              current version, with its last-updated date, will always be
              available on this page.
            </p>
          </section>
          <section>
            <h2>13. Governing law</h2>
            <p>
              These Terms & Conditions are governed by the laws of England
              and Wales, without prejudice to any mandatory consumer
              protections that apply in your place of residence.
            </p>
          </section>
          <section>
            <h2>14. Contact us</h2>
            <p>
              Pinterok
              <br />
              Email: printerok9@gmail.com
              <br />
              Phone: <a href="tel:+447441448082">+44 7441448082</a>
            </p>
          </section>
        </article>
      </section>
    </Shell>
  );
}
