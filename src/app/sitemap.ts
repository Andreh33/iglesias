import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { products } from "@/data/products";
import { posts } from "@/data/posts";
import { events } from "@/data/events";

const BASE = "https://nuevavida.example";

const staticPaths = [
  "",
  "/quienes-somos",
  "/galeria",
  "/instalaciones",
  "/blog",
  "/campamentos",
  "/eventos",
  "/cursos",
  "/cursos/biblicos",
  "/cursos/jovenes",
  "/cursos/matrimonios",
  "/cursos/bautizos",
  "/tienda",
  "/radio",
  "/tv",
  "/contacto",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    for (const path of staticPaths) {
      entries.push({ url: `${BASE}/${locale}${path}`, changeFrequency: "weekly", priority: path === "" ? 1 : 0.7 });
    }
    for (const p of products) entries.push({ url: `${BASE}/${locale}/tienda/${p.slug}`, priority: 0.6 });
    for (const p of posts) entries.push({ url: `${BASE}/${locale}/blog/${p.slug}`, priority: 0.6 });
    for (const e of events) entries.push({ url: `${BASE}/${locale}/eventos/${e.slug}`, priority: 0.5 });
  }

  return entries;
}
