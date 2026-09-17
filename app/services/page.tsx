import { Shell } from "@/components/site";
import Intro from "@/components/intro";
import ServiceExplorer from "@/components/service-explorer";
import Calendly from "@/components/calendly";
import { ServiceGrid, Notice, FAQ } from "@/components/home";
export const metadata = {
  title: "Business Printer Repair & Maintenance UK",
  description:
    "Independent office printer repair, commercial maintenance, cartridge services and scanner repairs exclusively for UK businesses and organisations.",
  keywords: [
    "printer repair service",
    "onsite printer repair",
    "office printer repair",
    "commercial printer repair",
    "laser printer repair",
    "inkjet printer repair",
    "multifunction printer repair",
    "HP printer repair",
    "Canon printer repair",
    "Epson printer repair",
    "Brother printer repair",
  ],
};
export default function Services() {
  return (
    <Shell>
      <Intro
        label="Our services"
        title="Office Printer Maintenance & Repair"
        description="Printer repair and maintenance exclusively for businesses and organisations. On-site diagnosis, servicing and maintenance plans, with coverage confirmed before booking."
      />
      <section className="section container">
        <ServiceGrid />
      </section>
      <ServiceExplorer />
      <section className="section container booking-grid">
        <div>
          <span className="eyebrow">BOOK A CONSULTATION</span>
          <h2>Find a time that suits you.</h2>
          <p>
            Choose an available time in Calendly to discuss your printer and the
            service you need.
          </p>
        </div>
        <Calendly />
      </section>
      <section className="container notice-wrap">
        <Notice />
      </section>
      <section className="section pale">
        <div className="container faq-grid">
          <div>
            <span className="eyebrow">GOOD TO KNOW</span>
            <h2>
              Expert help.
              <br />
              Straight answers.
            </h2>
          </div>
          <FAQ />
        </div>
      </section>
    </Shell>
  );
}
