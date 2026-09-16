import Link from "next/link";
import { FiMapPin, FiArrowUpRight } from "react-icons/fi";
import { Shell } from "@/components/site";
import Intro from "@/components/intro";
import { Notice } from "@/components/home";
import { locations } from "@/lib/locations";

export const metadata = {
  title: "Printer Repair Near Me: Areas We Cover Across the UK",
  description:
    "Independent printer repair near you. Onsite visits arranged in London, Manchester, Birmingham, Leeds, Liverpool, Glasgow, Bristol, Sheffield, Nottingham and beyond.",
};

export default function LocationsIndex() {
  return (
    <Shell>
      <Intro
        label="Areas we cover"
        title="Printer repair near you, across the UK"
        description="Pinterok is a UK-wide independent printer repair and support service. We arrange onsite engineer visits around these cities and the surrounding areas, alongside remote support available immediately from anywhere."
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
