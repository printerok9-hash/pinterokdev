import type { MetadataRoute } from "next";
import { posts, services, publicContent } from "@/lib/content";
import { serviceDetails } from "@/lib/service-details";
import { guides } from "@/lib/guides";
import { locations } from "@/lib/locations";
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const [customPosts, customServices] = await Promise.all([
    publicContent("posts"),
    publicContent("services"),
  ]);
  const paths = new Set([
    "",
    "/services",
    "/guides",
    "/locations",
    "/about",
    "/blog",
    "/contact",
    "/book",
    "/privacy",
    "/terms",
    ...serviceDetails.map((s) => `/services/${s.slug}`),
    ...guides.map((g) => `/guides/${g.slug}`),
    ...locations.map((l) => `/locations/${l.slug}`),
    ...(customPosts ?? posts).map((p: { slug: string }) => `/blog/${p.slug}`),
    ...(customServices ?? services).map(
      (s: { slug: string }) => `/services/${s.slug}`,
    ),
  ]);
  return [...paths].map((path) => ({
    url: base + path,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
