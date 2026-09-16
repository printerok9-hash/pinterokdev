import Link from "next/link";
import { notFound } from "next/navigation";
import { Shell } from "@/components/site";
import Intro from "@/components/intro";
import { Notice } from "@/components/home";
import { guides, getGuide } from "@/lib/guides";
import { FiArrowUpRight, FiPhone } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

export async function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const g = getGuide((await params).slug);
  if (!g) return { title: "Guide not found" };
  return {
    title: g.seoTitle,
    description: g.metaDescription,
    keywords: [g.primaryKeyword, ...g.secondaryKeywords],
    openGraph: {
      title: g.seoTitle,
      description: g.metaDescription,
      type: "article",
    },
  };
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const g = getGuide((await params).slug);
  if (!g) notFound();
  const related = g.related
    .map((slug) => guides.find((item) => item.slug === slug))
    .filter((item): item is (typeof guides)[number] => Boolean(item));
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TechArticle",
        headline: g.h1,
        description: g.metaDescription,
        author: { "@type": "Organization", name: "Pinterok" },
        publisher: { "@type": "Organization", name: "Pinterok" },
      },
      {
        "@type": "FAQPage",
        mainEntity: g.faqs.map((f) => ({
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
      <Intro label={g.cluster} title={g.h1} description={g.intro} />
      <section className="section container">
        <article className="article">
          <div className="quick-answer">
            <span className="eyebrow">Quick answer</span>
            <p>{g.quickAnswer}</p>
          </div>
          {g.sections.map((s) => (
            <section key={s.heading}>
              <h2>{s.heading}</h2>
              <p>
                <strong>{s.answer}</strong>
              </p>
              <p>{s.body}</p>
            </section>
          ))}
          <section>
            <h2>Frequently asked questions</h2>
            <div className="faq-list">
              {g.faqs.map((f) => (
                <details key={f.q}>
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </section>
          <section>
            <h2>Still stuck?</h2>
            <p>
              If these steps haven’t fixed it, our independent printer
              technicians can take it from here. Tell us your printer model
              and what you’ve already tried.
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
          {related.length > 0 && (
            <section>
              <h2>Related guides</h2>
              <ul className="guide-related-list">
                {related.map((item) => (
                  <li key={item.slug}>
                    <Link href={`/guides/${item.slug}`}>
                      {item.h1} <FiArrowUpRight aria-hidden="true" />
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href={`/services/${g.relatedService.slug}`}>
                    {g.relatedService.label} <FiArrowUpRight aria-hidden="true" />
                  </Link>
                </li>
              </ul>
            </section>
          )}
        </article>
      </section>
      <div className="container notice-wrap">
        <Notice />
      </div>
    </Shell>
  );
}
