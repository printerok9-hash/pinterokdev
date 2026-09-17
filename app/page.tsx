import Home from "@/components/home";
import { publicContent, posts } from "@/lib/content";
export default async function Page() {
  const blogPosts = await publicContent("posts");
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Pinterok",
    description:
      "Independent printer repair for businesses and organisations across the UK.",
    telephone: "+447441448082",
    email: "printerok9@gmail.com",
    areaServed: { "@type": "Country", name: "United Kingdom" },
    url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Printer repair services",
      itemListElement: [
        "Printer repair",
        "Cartridge refilling",
        "Toner refilling",
        "Scanner repair",
      ].map((name) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name },
      })),
    },
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema).replaceAll(
            "<",
            String.fromCharCode(92) + "u003c",
          ),
        }}
      />
      <Home blogPosts={(blogPosts ?? posts).slice(0, 3)} />
    </>
  );
}
