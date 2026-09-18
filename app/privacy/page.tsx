import { Shell } from "@/components/site";
import Intro from "@/components/intro";
export const metadata = {
  title: "Privacy Policy",
  description:
    "How Pinterok collects, uses, stores and protects the information you share when you enquire about a printer repair, book an appointment or use our chat assistant.",
};
export default function Privacy() {
  return (
    <Shell>
      <Intro
        label="Privacy"
        title="Your details, handled with care."
        description="How Pinterok uses the information you share when you enquire about a repair, book an appointment, or use our chat assistant."
      />
      <section className="section container">
        <article className="article">
          <p style={{ color: "var(--muted)", fontSize: 12 }}>
            Last updated: 16 September 2026
          </p>
          <section>
            <h2>Who is responsible for your information</h2>
            <p>
              Pinterok is the data controller for the information you share
              with us through this website, our chat assistant, phone or
              WhatsApp. That means we decide how and why your information is
              used, and we are responsible for keeping it safe. You can
              contact us at any time using the details at the bottom of this
              page.
            </p>
          </section>
          <section>
            <h2>Information you provide</h2>
            <p>
              When you request a repair or appointment, we collect your name,
              phone number, email, postcode, printer brand, problem
              description and preferred date. If you use our website chat
              assistant instead, we collect your name, phone number, address
              and a description of your problem. We use these details to
              respond to you, assess service availability, and manage your
              enquiry or appointment. We do not ask for or store payment card
              details through this website.
            </p>
          </section>
          <section>
            <h2>Why we process your information</h2>
            <p>
              We use your information because it is necessary to respond to
              your enquiry and, where you go ahead, to provide the service you
              have requested (a contractual basis), and because it is in our
              legitimate business interest to run and improve our repair and
              support service efficiently. Where the law requires your
              consent, such as the consent checkbox on our enquiry forms, we
              rely on that consent and you may withdraw it at any time by
              contacting us.
            </p>
          </section>
          <section>
            <h2>Service providers and storage</h2>
            <p>
              Enquiries, appointments and chat assistant messages are stored
              in our service database. Appointment and enquiry notifications
              may be sent to printerok9@gmail.com through our email provider.
              Calendly loads automatically on booking and service pages. If
              you book with Calendly or contact us through WhatsApp, those
              services process information under their own privacy policies,
              which we encourage you to review. Some of our service providers
              may store or process data on servers located outside the UK;
              where this happens, we only use providers that offer an
              appropriate level of protection for your information.
            </p>
          </section>
          <section>
            <h2>How we keep your information secure</h2>
            <p>
              We use industry-standard measures to protect your information,
              including encrypted (HTTPS) connections, hashed and salted
              passwords for staff accounts, and access to enquiry and
              appointment records restricted to authorised staff only. No
              method of transmission or storage is completely secure, but we
              work to protect your information using appropriate technical
              and organisational safeguards.
            </p>
          </section>
          <section>
            <h2>How long we keep your information</h2>
            <p>
              We keep enquiry, appointment and chat assistant records for as
              long as reasonably necessary to provide our service, respond to
              any related follow-up, and meet legal, accounting or dispute
              record-keeping obligations. After that, information is deleted
              or anonymised. You can ask us to delete your information sooner;
              see “Your rights” below.
            </p>
          </section>
          <section>
            <h2>Cookies</h2>
            <p>
              The public website uses the Google tag for Google Ads measurement
              and may set advertising cookies. The admin area sets a single essential session cookie
              (<code>pinterok_session</code>) to keep authorised staff signed
              in; it is HTTP-only, restricted to the admin area, marked secure
              in production, and expires automatically after 8 hours or
              immediately when staff sign out. This cookie is strictly
              necessary for the admin area to function, so it does not require
              separate consent. Calendly may set its own cookies when its
              embedded calendar loads, under its own privacy policy.
            </p>
          </section>
          <section>
            <h2>Children’s privacy</h2>
            <p>
              Our services are intended for adults arranging printer repair or
              support for themselves or their business. We do not knowingly
              collect personal information from children, and we ask that
              enquiries are submitted by an adult.
            </p>
          </section>
          <section>
            <h2>Your rights</h2>
            <p>
              Under UK data protection law, you have the right to ask us for
              a copy of the information we hold about you, to correct
              inaccurate information, to ask us to delete or restrict it, to
              object to certain processing, and to ask for information you
              provided to be given back to you in a portable format. We do
              not sell your details or add you to marketing lists. To
              exercise any of these rights, contact printerok9@gmail.com. If
              you are unhappy with how we have handled your information, you
              also have the right to complain to the UK Information
              Commissioner’s Office (ICO) at ico.org.uk.
            </p>
          </section>
          <section>
            <h2>Changes to this policy</h2>
            <p>
              We may update this privacy policy from time to time to reflect
              changes to our services or legal requirements. The current
              version, with its last-updated date, will always be available on
              this page.
            </p>
          </section>
          <section>
            <h2>Contact</h2>
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
