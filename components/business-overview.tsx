import Link from "next/link";
import { FiCheckCircle } from "react-icons/fi";

const businessServices = [
  ["Business Printer Repair", "/services/printer-repair"],
  ["Office Printer Maintenance", "/services/copier-maintenance"],
  ["Commercial Printer Servicing", "/services/printer-servicing"],
  ["Multifunction Printer Repair", "/services/printer-repair"],
  ["Copier & Document Equipment Maintenance", "/services/copier-maintenance"],
  ["Managed Printer Support for Organisations", "/services/toner-contracts"],
];

const customers = [
  "Offices",
  "SMEs",
  "Schools",
  "Healthcare organisations",
  "Retail businesses",
  "Hotels",
  "Warehouses",
  "Professional services companies",
];

export default function BusinessOverview() {
  return (
    <section className="section container booking-grid">
      <div>
        <span className="eyebrow">COMMERCIAL PRINTER MAINTENANCE</span>
        <h2>Printer Repair Services</h2>
        <p>
          On-site Printer Engineers for Businesses. Discuss repair, servicing
          and maintenance plans for the printers your team relies on.
        </p>
        <ul className="checklist">
          {businessServices.map(([title, href]) => (
            <li key={title}>
              <FiCheckCircle aria-hidden="true" />
              <Link href={href}>{title}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <span className="eyebrow">BUSINESSES & ORGANISATIONS ONLY</span>
        <h2>Who We Support</h2>
        <p>
          Printer Support for Offices and Organisations. Services are provided
          exclusively to business and organisational customers, with coverage
          confirmed before booking.
        </p>
        <ul className="checklist">
          {customers.map((customer) => (
            <li key={customer}>
              <FiCheckCircle aria-hidden="true" />
              <span>{customer}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
