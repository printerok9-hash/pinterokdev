import Link from "next/link";
import { FiMapPin, FiArrowUpRight } from "react-icons/fi";
import { Shell } from "@/components/site";
import Intro from "@/components/intro";
import { Notice } from "@/components/home";
import { locations } from "@/lib/locations";

export const metadata = {
  title: "Business Printer Repair: Check UK Service Areas",
  description:
    "Business printer repair enquiries in UK service areas. Share your business postcode to confirm local engineer availability before booking.",
};

export default function LocationsIndex() {
  return (
    <Shell>
      <Intro
        label="Areas we cover"
        title="Business printer repair: check your area"
        description="Independent printer repair exclusively for businesses and organisations. Enquire about the areas below with your business postcode; we confirm coverage, engineer availability and timing before booking."
      />
      <section className="section container blog-grid">
        {locations.map((l, i) => (
          <Link
            href={`/locations/${l.slug}`}
            className="blog-card"
            key={l.slug}
          >
            <div className={`blog-visual blog-visual-${i % 3}`}>
              <FiMapPin />
              <span>{l.city.toUpperCase()}</span>
            </div>
            <div className="blog-copy">
              <span className="eyebrow">{l.region.toUpperCase()}</span>
              <h3>Printer repair in {l.city}</h3>
              <p>{l.intro}</p>
              <span className="text-link">
                View coverage <FiArrowUpRight />
              </span>
            </div>
          </Link>
        ))}
      </section>
      <section className="section container">
        <article className="article">
          <section>
            <h2>Don’t see your city listed?</h2>
            <p>
              These are the areas we’re asked about most often, but coverage
              isn’t limited to this list. Tell us your postcode and printer
              problem, and we’ll confirm whether an onsite visit or remote
              support is the best fit, wherever in the UK you’re based.
            </p>
            <Link className="button" href="/contact">
              Check coverage for your area <FiArrowUpRight />
            </Link>
          </section>
        </article>
      </section>
      <div className="container notice-wrap">
        <Notice />
      </div>
    </Shell>
  );
}
