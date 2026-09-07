import Link from "next/link";
import Image from "next/image";
import { FiPrinter, FiArrowUpRight } from "react-icons/fi";
import { Shell } from "@/components/site";
import Intro from "@/components/intro";
import { posts, publicContent } from "@/lib/content";
export const metadata = {
  title: "Printer Advice & Troubleshooting Blog",
  description:
    "Practical printer advice from Pinterok. Troubleshoot offline printers, printing problems and error messages.",
};
export default async function Blog() {
  const custom = await publicContent("posts");
  const all: ((typeof posts)[number] & { image?: string })[] = custom ?? posts;
  return (
    <Shell>
      <Intro
        label="The print room"
        title="A little know-how goes a long way."
        description="Practical advice, troubleshooting tips and a clearer understanding of the printer you use every day."
      />
      <section className="section container blog-grid">
        {all.map((p, i) => (
          <Link href={`/blog/${p.slug}`} className="blog-card" key={p.slug}>
            <div className={`blog-visual blog-visual-${i % 3}`}>
              {p.image ? (
                <Image
                  src={p.image}
                  fill
                  alt={p.title}
                  sizes="(max-width:760px) 100vw, 33vw"
                  style={{ objectFit: "cover" }}
                />
              ) : (
                <>
                  <FiPrinter />
                  <span>THE PRINT ROOM.</span>
                </>
              )}
            </div>
            <div className="blog-copy">
              <span className="eyebrow">{p.category || "PRINTER ADVICE"}</span>
              <h3>{p.title}</h3>
              <p>{p.description}</p>
              <span className="text-link">
                Read article <FiArrowUpRight />
              </span>
            </div>
          </Link>
        ))}
      </section>
    </Shell>
  );
}
