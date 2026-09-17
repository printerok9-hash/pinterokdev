import Link from "next/link";
import { Shell } from "@/components/site";
import Intro from "@/components/intro";

export const metadata = {
  title: "UK Printer Repair Service Network",
  description:
    "How Pinterok coordinates business printer repair with local UK service support. Check onsite availability by business postcode before booking.",
};

export default function ServiceNetwork() {
  return (
    <Shell>
      <Intro
        label="Service network"
        title="Local support. Coordinated around your business."
        // description="Pinterok coordinates printer repair services for UK businesses through its service network, with local service support and customer visits subject to availability."
        description=""
      />
      <section className="section container">
        <article className="article">
          {/* <section>
            <h2>How we arrange your repair</h2>
            <p>Our UK service operation includes onsite customer visits. Start
              by sharing your organisation name, business postcode, printer
              model and a description of the fault.</p>
            <ol>
              <li>We review your enquiry and check the support your equipment needs.</li>
              <li>We check local visit availability, travel requirements and any likely parts needs.</li>
              <li>We confirm the service options, timing and proposed costs with you before booking.</li>
            </ol>
            <p>For suitable connectivity or setup issues, remote assistance may
              be an option with permission from your authorised business contact.</p>
          </section> */}
          <section>
            <h2>UK business printer repair coverage</h2>
            <p>We welcome enquiries from any location in England, Scotland,
              Wales and Northern Ireland. Onsite availability depends on your
              postcode, technician availability, equipment and parts. A listed
              location does not guarantee an engineer or a same-day appointment.</p>
            <Link className="text-link" href="/locations">Check your service area</Link>
          </section>
          <section>
            <h2>Repair and maintenance for business equipment</h2>
            <p>Ask us about office printer repair, commercial printer repair,
              office copier repair and printer maintenance. We confirm support
              for your make and model when reviewing your enquiry.</p>
            <p>If you are comparing a printer maintenance company or a managed
              print service, tell us whether you need a one-off repair or ongoing
              support. We will confirm what Pinterok can offer before you commit.</p>
          </section>
          <section>
            <h2>UK service support</h2>
            <p>Call <a href="tel:+447441448082">+44 7441448082</a> or email{" "}
              <a href="mailto:printerok9@gmail.com">printerok9@gmail.com</a> with
              your business postcode and printer details. Appointment times are
              agreed in UK local time.</p>
            <Link className="button" href="/contact">Discuss your repair</Link>
          </section>
        </article>
      </section>
    </Shell>
  );
}
