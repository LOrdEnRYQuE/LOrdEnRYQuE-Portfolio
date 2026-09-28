import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import FeaturedProjects, { type PortfolioProject } from "@/components/sections/FeaturedProjects";
import ContactCta from "@/components/sections/ContactCta";
import Link from "next/link";

import { constructMetadata } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = constructMetadata({
  title: "Webdesign, Webentwicklung & AI in Landshut",
  description: "Professionelles Webdesign in Landshut: moderne Websites, Webentwicklung, SEO, E-Commerce und KI-Automatisierung für Unternehmen und Selbstständige.",
  keywords: [
    "Webdesign Landshut",
    "Webdesigner Landshut",
    "Webentwicklung Landshut",
    "Website erstellen Landshut",
    "SEO Landshut",
    "KI Automatisierung Landshut",
    "LOrdEnRYQuE"
  ],
  canonical: "/"
});

import { fetchQuery } from "convex/nextjs";
import { api } from "@convex/_generated/api";

export default async function HomePage() {
  const featuredProjects = await fetchQuery(api.portfolio.getFeatured);

  return (
    <>
      <Hero />
      <section className="border-y border-white/5 bg-white/[0.02] px-6 py-16">
        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-[1fr_auto] md:items-center">
          <div className="space-y-4">
            <p className="text-xs font-black uppercase tracking-[0.28em] text-accent-blue">
              Landshut & Region
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-5xl">
              Webdesign & digitale Lösungen in Landshut
            </h2>
            <p className="max-w-3xl text-lg leading-relaxed text-foreground/70">
              LOrdEnRYQuE entwickelt moderne Websites, Webanwendungen und digitale Business-Lösungen für Unternehmen, Selbstständige und Dienstleister in Landshut und der Region.
            </p>
          </div>
          <Link
            href="/webdesign-landshut"
            className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-4 font-bold text-black transition hover:bg-white/90"
          >
            Webdesign Landshut
          </Link>
        </div>
      </section>
      <About />
      <Services />
      <FeaturedProjects initialData={featuredProjects as PortfolioProject[]} />
      <ContactCta />
    </>
  );
}
