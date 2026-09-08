import { notFound } from "next/navigation";
import Link from "next/link";
import { Shell } from "@/components/site";
import Intro from "@/components/intro";
import Calendly from "@/components/calendly";
import { Notice } from "@/components/home";
import { services, publicContent } from "@/lib/content";
import { serviceDetails } from "@/lib/service-details";
async function getService(slug: string) {
  const custom = await publicContent("services");
  const detail = serviceDetails.find((s) => s.slug === slug);
  return (
    (custom ?? services).find((s: { slug: string }) => s.slug === slug) ??
    (detail
      ? { ...detail, title: detail.label, content: detail.description }
      : undefined)
  );
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const s = await getService((await params).slug);
  return {
    title: s?.title || "Service not found",
    description: s?.description,
  };
}
export default async function Service({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const s = await getService((await params).slug);
  if (!s) notFound();
  const detail = serviceDetails.find((item) => item.slug === s.slug);
  return (
    <Shell>
      <Intro label="Our services" title={s.title} description={s.description} />
      <section className="section container service-enquiry-layout">
        <div className="article">
          <h2>
            {detail?.title || "Professional service, built around your day."}
          </h2>
          <p>
            {s.content ||
              "Tell us your printer model and what you need help with. Our team will check service and parts availability, discuss the next steps and arrange a convenient appointment. We explain the diagnosis and agree the price with you before work begins."}
          </p>
          {detail && (
            <ul className="service-page-points">
              {detail.points.map(([title, description]) => (
                <li key={title}>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </li>
              ))}
            </ul>
          )}
          <section>
            <h2>What happens next?</h2>
            <p>
              1. Choose an available consultation time in Calendly and share
              your printer model, postcode and the issue.
              <br />
              2. We discuss your request and arrange the next steps.
              <br />
              3. Your technician diagnoses the fault and discusses the repair
              options.
              <br />
              4. We carry out the agreed work and test the printer.
            </p>
          </section>
          <Link href="/book" className="button">
            Book {s.title.toLowerCase()} ↗
          </Link>
        </div>
        <Calendly />
      </section>
      <div className="container notice-wrap">
        <Notice />
      </div>
    </Shell>
  );
}
