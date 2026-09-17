import Link from "next/link";
import Image from "next/image";
import { Shell } from "@/components/site";
import Intro from "@/components/intro";
import { Notice } from "@/components/home";
import { FiCheckCircle } from "react-icons/fi";
import {
  FaUserGear,
  FaClock,
  FaMoneyBill,
  FaShield,
  FaHouse,
  FaPrint as FaPrinter,
} from "react-icons/fa6";
export const metadata = {
  title: "About Our Independent Printer Repair Service",
  description:
    "Pinterok coordinates business printer repair services for UK organisations with local service support. Coverage confirmed by postcode.",
};
export default function About() {
  return (
    <Shell>
      <Intro
        label="About Pinterok"
        title="Good technology deserves great care."
        description="We believe a printer problem should be a small interruption, not a whole day lost. That is why we make getting help straightforward."
      />
      <section className="section container about-grid">
        <div className="about-image">
          <Image
            src="/technician.png"
            alt="Illustrative photograph of a technician inspecting an office printer"
            fill
            sizes="(max-width:760px) 100vw, 50vw"
          />
        </div>
        <div className="about-copy">
          <span className="eyebrow">YOUR INDEPENDENT REPAIR PARTNER</span>
          <h2>
            People first.
            <br />
            Printers a close second.
          </h2>
          <p>
            Pinterok coordinates business printer repair services for UK
            organisations with local service support. Our UK service operation
            includes customer visits for diagnostics, repair, maintenance and
            setup, subject to postcode and appointment availability. We help
            you understand the problem and choose a practical next step.
          </p>
          <p>
            Services are provided exclusively to business and organisational
            customers: offices, SMEs, schools, healthcare organisations, retail
            businesses, hotels, warehouses and professional services companies.
            We do not accept residential repair bookings.
          </p>
          <p>
            From a shared office printer that will not connect to a copier with
            a persistent paper jam, our approach is the same: listen, explain
            and take care.
          </p>
          <ul className="checklist">
            {[
              "Transparent advice and pricing",
              "Onsite appointments subject to availability",
              "Repair options before replacement",
              "Support across major printer brands",
            ].map((t) => (
              <li key={t}>
                <FiCheckCircle />
                {t}
              </li>
            ))}
          </ul>
          <Link className="button" href="/book">
            Let’s get you printing ↗
          </Link>
        </div>
      </section>
      <section className="section container">
        <article className="article">
          <h2>Local service support for UK organisations</h2>
          <p>We check your business postcode, equipment and local availability
            before arranging a customer visit. The service options, appointment
            timing and proposed costs are confirmed before booking.</p>
          <Link className="text-link" href="/service-network">How our service network works</Link>
        </article>
      </section>
      <section className="section pale">
        <div className="container">
          <div className="center-heading">
            <span className="eyebrow">WHY PINTEROK</span>
            <h2>Thoughtful service. In every detail.</h2>
          </div>
          <div className="why-grid">
            {[
              [
                FaUserGear,
                "Experienced technicians",
                "Practical expertise to diagnose the problem and explain your options.",
              ],
              [
                FaClock,
                "Support around your day",
                "Convenient appointments, with same-day options subject to availability.",
              ],
              [
                FaMoneyBill,
                "Clear, fair pricing",
                "Understand the proposed work and agree the price before repairs begin.",
              ],
              [
                FaShield,
                "Independent advice",
                "Honest recommendations focused on your printer and your needs.",
              ],
              [
                FaHouse,
                "Service at your doorstep",
                "Professional printer support for your business premises.",
              ],
              [
                FaPrinter,
                "All major printer brands",
                "Support for inkjet, laser and multifunction models, subject to parts availability.",
              ],
            ].map(([Icon, title, description]) => {
              const I = Icon as typeof FaPrinter;
              return (
                <div className="service-card" key={String(title)}>
                  <span className="service-icon">
                    <I />
                  </span>
                  <h3>{String(title)}</h3>
                  <p>{String(description)}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <div className="container notice-wrap" style={{ paddingTop: 50 }}>
        <Notice />
      </div>
    </Shell>
  );
}
