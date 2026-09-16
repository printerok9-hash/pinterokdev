import Link from "next/link";
import { FiPrinter, FiArrowUpRight } from "react-icons/fi";
import { Shell } from "@/components/site";
import Intro from "@/components/intro";
import { Notice } from "@/components/home";
import { guides } from "@/lib/guides";

export const metadata = {
  title: "Printer Troubleshooting Guide: Fix Common Printer Problems",
  description:
    "An independent, UK-focused printer troubleshooting guide covering offline errors, Wi-Fi problems, paper jams, print quality and more, topic by topic.",
};

const generalFaqs = [
  {
    q: "Is this an official manufacturer support site?",
    a: "No. Pinterok is an independent third-party printer support and repair provider. We are not authorised, affiliated, endorsed or sponsored by HP, Canon, Epson, Brother or any other printer manufacturer.",
  },
  {
    q: "How do I know which guide matches my problem?",
    a: "Match the symptom you're seeing to a topic below: offline or connection messages, a printer that won't print at all, faded or streaky output, paper jams, or a rejected ink or toner cartridge.",
  },
  {
    q: "What if my problem doesn't match any guide?",
    a: "Contact our team with your printer model and a description of the issue. We can point you to the right fix or arrange independent diagnostics if it needs a closer look.",
  },
];
const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "FAQPage",
      mainEntity: generalFaqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

export default function GuidesIndex() {
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
      <Intro
        label="Printer help"
        title="Printer troubleshooting guide: fix the most common problems"
        description="Independent, plain-English help for the printer problems people search for most. Find your symptom below for a clear, step-by-step fix."
      />
      <section className="section container">
        <article className="article">
          <div className="quick-answer">
            <span className="eyebrow">Quick answer</span>
            <p>
              Most printer problems fall into a handful of categories:
              connectivity (offline or Wi-Fi), print quality, paper handling,
              driver or software issues, and ink or toner recognition. Find
              the topic below that matches what you’re seeing for a direct,
              step-by-step fix.
            </p>
          </div>
        </article>
      </section>
      <section className="section container blog-grid">
        {guides.map((g, i) => (
          <Link href={`/guides/${g.slug}`} className="blog-card" key={g.slug}>
            <div className={`blog-visual blog-visual-${i % 3}`}>
              <FiPrinter />
              <span>{g.cluster.toUpperCase()}</span>
            </div>
            <div className="blog-copy">
              <span className="eyebrow">{g.cluster.toUpperCase()}</span>
              <h3>{g.h1}</h3>
              <p>{g.intro}</p>
              <span className="text-link">
                Read the guide <FiArrowUpRight />
              </span>
            </div>
          </Link>
        ))}
      </section>
      <section className="section container">
        <article className="article">
          <section>
            <h2>Frequently asked questions</h2>
            <div className="faq-list">
              {generalFaqs.map((f) => (
                <details key={f.q}>
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </section>
          <section>
            <h2>Still not sure what’s wrong?</h2>
            <p>
              Tell us your printer model and what’s happening, and our
              independent technicians can help you work out the next step.
            </p>
            <Link className="button" href="/contact">
              Contact our team <FiArrowUpRight />
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
