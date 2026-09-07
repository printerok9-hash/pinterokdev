import { Shell } from "@/components/site";
import Intro from "@/components/intro";
import ServiceExplorer from "@/components/service-explorer";
import { ServiceGrid, Notice, FAQ } from "@/components/home";
export const metadata = {
  title: "Printer Repair & Maintenance Services UK",
  description:
    "Independent printer repair, cartridge refilling, toner refills and scanner repairs for UK homes and businesses.",
};
export default function Services() {
  return (
    <Shell>
      <Intro
        label="Our services"
        title="Every printer. Expert attention."
        description="Complete printer repair, maintenance and installation services. Practical solutions, clear advice and care that comes to you."
      />
      <section className="section container">
        <ServiceGrid />
      </section>
      <ServiceExplorer />
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
