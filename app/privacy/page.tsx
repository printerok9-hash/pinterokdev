import { Shell } from "@/components/site";
import Intro from "@/components/intro";
export const metadata = { title: "Privacy Policy" };
export default function Privacy() {
  return (
    <Shell>
      <Intro
        label="Privacy"
        title="Your details, handled with care."
        description="How Pinterok uses the information you share when you enquire about a repair."
      />
      <section className="section container">
        <article className="article">
          <section>
            <h2>Information you provide</h2>
            <p>
              When you request a repair, we collect your name, phone number,
              email, postcode, printer details, problem description and
              preferred date. We use these details to respond, assess service
              availability and manage your requested appointment.
            </p>
          </section>
          <section>
            <h2>Service providers and storage</h2>
            <p>
              Enquiries are stored in our service database. Appointment and
              enquiry notifications may be sent to printerok9@gmail.com through
              our email provider. Calendly loads automatically on booking and
              service pages. If you book with Calendly or contact us through
              WhatsApp, those services handle information under their own
              privacy policies.
            </p>
          </section>
          <section>
            <h2>Cookies</h2>
            <p>
              The public website does not use advertising or analytics cookies.
              The admin area uses an essential session cookie to keep authorised
              staff signed in. Calendly may use its own cookies when its
              embedded calendar loads.
            </p>
          </section>
          <section>
            <h2>Your choices</h2>
            <p>
              We do not sell your details or add you to marketing lists. To ask
              about your information, request a correction or request deletion,
              contact printerok9@gmail.com. We retain request information only
              as needed to manage the service and applicable record keeping
              obligations.
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
