import Link from "next/link";
import { notFound } from "next/navigation";
import { Shell } from "@/components/site";
import Intro from "@/components/intro";
import { Notice } from "@/components/home";
import { locations, getLocation } from "@/lib/locations";
import { FiArrowUpRight, FiPhone, FiMapPin } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

export async function generateStaticParams() {
  return locations.map((l) => ({ city: l.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const l = getLocation((await params).city);
  if (!l) return { title: "Location not found" };
  return {
    title: l.seoTitle,
    description: l.metaDescription,
    openGraph: { title: l.seoTitle, description: l.metaDescription },
  };
}

const brands = [
  "HP",
  "Canon",
  "Epson",
  "Brother",
  "Xerox",
  "Ricoh",
  "Lexmark",
  "Samsung",
  "Kyocera",
];

export default async function LocationPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const l = getLocation((await params).city);
  if (!l) notFound();
  const faqs = [
    {
      q: `Do you have a printer repair engineer near me in ${l.city}?`,
      a: `We arrange onsite printer repair visits across ${l.city} and the surrounding ${l.region} area by appointment, alongside remote support for issues that don't need a visit. Contact us with your postcode and we'll confirm availability.`,
    },
    {
      q: `Can you fix my printer the same day in ${l.city}?`,
      a: "We aim to offer same-day appointments where technician availability, your location and parts allow. We'll always confirm realistic timing with you before booking rather than promise a slot we can't keep.",
    },
    {
      q: `Do you repair HP, Canon and Epson printers in ${l.city}?`,
      a: "Yes. We work with HP, Canon, Epson, Brother and most other major printer brands, subject to model and parts availability. We are an independent provider and not affiliated with any manufacturer.",
    },
    {
      q: `Do you offer remote printer support if I'm in ${l.city}?`,
      a: "Yes, many connectivity, driver and software issues can be diagnosed and fixed remotely with your permission, without waiting for an onsite visit.",
    },
    {
      q: `Which areas around ${l.city} do you cover?`,
      a: `Alongside ${l.city} itself, we arrange appointments in the surrounding area, including ${l.nearbyAreas.slice(0, 4).join(", ")} and nearby towns. Contact us with your postcode to confirm.`,
    },
  ];
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        serviceType: "Printer repair and maintenance",
        name: `Printer repair in ${l.city}`,
        description: l.metaDescription,
        areaServed: {
          "@type": "City",
          name: l.city,
          containedInPlace: { "@type": "AdministrativeArea", name: l.region },
        },
        provider: {
          "@type": "ProfessionalService",
          name: "Pinterok",
          telephone: "+447441448082",
          email: "printerok9@gmail.com",
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };
  return (
    <Shell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema).replaceAll(
            "<",
            String.fromCharCode(92) + "u003c",
          ),
        }}
      />
      <Intro label={`Printer repair · ${l.city}`} title={l.h1} description={l.intro} />
      <section className="section container">
        <article className="article">
          <div className="quick-answer">
            <span className="eyebrow">
              <FiMapPin aria-hidden="true" /> Coverage
            </span>
            <p>
              Pinterok is a UK-wide independent printer repair and support
              service. We don’t run a fixed local branch in {l.city}, but we
              regularly arrange onsite printer engineer visits across{" "}
              {l.city} and {l.region} by appointment, alongside remote support
              you can access immediately from anywhere.
            </p>
          </div>
          <section>
            <h2>Printer engineers covering {l.city}</h2>
            <p>{l.localContext}</p>
            <p>
              We also arrange appointments around {l.city} in areas including{" "}
              {l.nearbyAreas.join(", ")}. If you’re just outside these areas,
              get in touch anyway — coverage depends on your postcode and
              current technician availability, not a fixed boundary.
            </p>
          </section>
          <section>
            <h2>What printer problems can we help with in {l.city}?</h2>
            <p>
              Whether your printer has gone offline, won’t connect to Wi-Fi,
              has stopped printing, is producing poor-quality pages, keeps
              jamming, or won’t recognise a new cartridge, we can help
              remotely or arrange a visit. Our{" "}
              <Link href="/guides">printer troubleshooting guides</Link>{" "}
              cover the most common issues step by step if you’d like to try
              a fix yourself first, including{" "}
              <Link href="/guides/printer-offline">printer offline errors</Link>{" "}
              and{" "}
              <Link href="/guides/printer-not-connecting-to-wifi">
                Wi-Fi connection problems
              </Link>
              .
            </p>
          </section>
          <section>
            <h2>Printer brands we support in {l.city}</h2>
            <p>
              We work with {brands.slice(0, -1).join(", ")} and{" "}
              {brands[brands.length - 1]} printers, among others, subject to
              model and parts availability. Pinterok is an independent
              third-party provider and is not authorised, affiliated,
              endorsed or sponsored by any printer manufacturer.
            </p>
          </section>
          <section>
            <h2>Business and office printer support in {l.city}</h2>
            <p>
              For offices and shared printers in {l.city}, we also offer
              ongoing maintenance and toner supply plans, so faults are
              caught early rather than causing repeat downtime. Read our{" "}
              <Link href="/guides/business-printer-support-uk">
                business printer support guide
              </Link>{" "}
              or explore{" "}
              <Link href="/services/copier-maintenance">
                copier and office maintenance
              </Link>
              .
            </p>
          </section>
          <section>
            <h2>Frequently asked questions</h2>
            <div className="faq-list">
              {faqs.map((f) => (
                <details key={f.q}>
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </section>
          <section>
            <h2>Book printer repair in {l.city}</h2>
            <p>
              Tell us your printer model, postcode and the problem, and we’ll
              confirm the next available appointment or start with remote
              troubleshooting.
            </p>
            <div className="guide-cta-actions">
              <Link className="button" href="/book">
                Book a repair <FiArrowUpRight />
              </Link>
              <a className="text-link" href="tel:+447441448082">
                <FiPhone /> +44 7441448082
              </a>
              <a
                className="text-link"
                href="https://wa.me/447441448082?text=Hello%20Pinterok%2C%20I%20need%20help%20with%20my%20printer."
              >
                <FaWhatsapp /> Message on WhatsApp
              </a>
            </div>
          </section>
          <section>
            <h2>Other areas we cover</h2>
            <ul className="guide-related-list">
              {locations
                .filter((item) => item.slug !== l.slug)
                .slice(0, 4)
                .map((item) => (
                  <li key={item.slug}>
                    <Link href={`/locations/${item.slug}`}>
                      Printer repair in {item.city}{" "}
                      <FiArrowUpRight aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              <li>
                <Link href="/locations">
                  See all areas we cover <FiArrowUpRight aria-hidden="true" />
                </Link>
              </li>
            </ul>
          </section>
        </article>
      </section>
      <div className="container notice-wrap">
        <Notice />
      </div>
    </Shell>
  );
}
