import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Shell } from "@/components/site";
import Intro from "@/components/intro";
import { posts, publicContent } from "@/lib/content";
async function getPost(slug: string) {
  const custom = await publicContent("posts");
  return (custom ?? posts).find((p: { slug: string }) => p.slug === slug);
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const p = await getPost((await params).slug);
  return {
    title: p?.title || "Article not found",
    description: p?.description,
    openGraph: {
      title: p?.title,
      description: p?.description,
      type: "article",
    },
  };
}
export default async function Post({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const p = await getPost((await params).slug);
  if (!p) notFound();
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: p.title,
    description: p.description,
    author: { "@type": "Organization", name: "Pinterok" },
    ...(p.createdAt
      ? { datePublished: p.createdAt, dateModified: p.updatedAt }
      : {}),
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
      <Intro
        label={p.category || "Printer advice"}
        title={p.title}
        description={p.description}
      />
      <section className="section container">
        <article className="article">
          {p.image && (
            <div className="article-image">
              <Image src={p.image} alt={p.title} fill sizes="800px" />
            </div>
          )}
          {p.content.split("\n\n").map((block: string, i: number) => {
            const [heading, ...body] = block.split("\n");
            return (
              <section key={i}>
                {body.length ? (
                  <>
                    <h2>{heading}</h2>
                    <p>{body.join("\n")}</p>
                  </>
                ) : (
                  <p>{heading}</p>
                )}
              </section>
            );
          })}
          <section>
            <h2>Need a hand?</h2>
            <p>
              If simple checks do not resolve the problem, our team can help you
              decide what to do next.
            </p>
            <Link className="button" href="/book">
              Ask a printer specialist ↗
            </Link>
          </section>
        </article>
      </section>
    </Shell>
  );
}
