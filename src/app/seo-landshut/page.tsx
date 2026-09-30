import Link from "next/link";
import type { Metadata } from "next";
import { constructMetadata } from "@/lib/seo";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = constructMetadata({
  title: "SEO Landshut – Lokale & technische Suchmaschinenoptimierung",
  description:
    "SEO in Landshut für Unternehmen: lokale und technische Suchmaschinenoptimierung, Google Business Profile, Landingpages, strukturierte Daten und messbares Tracking.",
  keywords: [
    "SEO Landshut",
    "Suchmaschinenoptimierung Landshut",
    "Local SEO Landshut",
    "Google Optimierung Landshut",
    "Google Business Profile Landshut",
    "Technische SEO Landshut",
    "Webdesign Landshut",
  ],
  canonical: "/seo-landshut",
});

const seoServices = [
  {
    title: "Lokale SEO & Google Business Profile",
    text: "Lokale Relevanzsignale, passende Kategorien, Leistungen, Inhalte und konsistente Unternehmensinformationen helfen Google dabei, Ihr Angebot geografisch und thematisch besser einzuordnen.",
  },
  {
    title: "Technische SEO",
    text: "Crawlability, Indexierung, Canonicals, Sitemap, strukturierte Daten, Core Web Vitals und saubere Seitenarchitektur bilden die technische Grundlage für organische Sichtbarkeit.",
  },
  {
    title: "On-Page SEO",
    text: "Seitentitel, Beschreibungen, Überschriften, interne Verlinkung und Inhalte werden auf reale Suchintentionen ausgerichtet – natürlich und ohne Keyword-Stuffing.",
  },
  {
    title: "Lokale Landingpages",
    text: "Leistungs- und Standortseiten werden so aufgebaut, dass sie konkrete Suchanfragen beantworten und Besucher direkt zu einer passenden nächsten Aktion führen.",
  },
  {
    title: "Search Console & Analytics",
    text: "Impressionen, Klicks, Suchanfragen, Landingpages und echte Lead-Aktionen werden getrennt gemessen, damit Optimierung auf belastbaren Daten statt auf Vermutungen basiert.",
  },
  {
    title: "Laufende Optimierung",
    text: "SEO ist kein einmaliger Schalter. Bestehende Seiten werden anhand realer Suchdaten, technischer Befunde und Conversion-Signale gezielt weiterentwickelt.",
  },
];

const process = [
  {
    step: "01",
    title: "SEO-Audit",
    text: "Technik, Indexierung, Seitenstruktur, lokale Signale und vorhandene Suchdaten werden geprüft, bevor Änderungen umgesetzt werden.",
  },
  {
    step: "02",
    title: "Prioritäten",
    text: "Maßnahmen werden nach Suchintention, technischem Risiko und möglichem Business-Impact geordnet – nicht nach der Länge einer SEO-Checkliste.",
  },
  {
    step: "03",
    title: "Umsetzung",
    text: "Technische Korrekturen, Inhalte, Landingpages, strukturierte Daten und interne Verlinkung werden sauber in die bestehende Website integriert.",
  },
  {
    step: "04",
    title: "Messen & verbessern",
    text: "Search Console, Analytics und Lead-Signale zeigen, welche Seiten tatsächlich Sichtbarkeit, Klicks und qualifizierte Anfragen gewinnen.",
  },
];

const metrics = [
  "Qualifizierte Suchanfragen statt reiner Ranking-Screenshots",
  "Impressionen, Klicks, CTR und durchschnittliche Position",
  "Landingpages, die organische Sichtbarkeit gewinnen oder verlieren",
  "Anrufe, Kontaktanfragen und andere relevante Conversion-Aktionen",
];

const faq = [
  {
    question: "Wie schnell wirkt SEO in Landshut?",
    answer:
      "Das hängt von Ausgangslage, Wettbewerb, technischer Qualität, bestehender Autorität und Suchnachfrage ab. Manche technische Verbesserungen werden schnell sichtbar, nachhaltige organische Entwicklung braucht häufig mehrere Wochen oder Monate. Seriöse SEO verspricht deshalb keine feste Position zu einem bestimmten Datum.",
  },
  {
    question: "Garantieren Sie Platz 1 bei Google?",
    answer:
      "Nein. Google-Rankings hängen von vielen Faktoren ab, die kein Dienstleister vollständig kontrolliert. Ziel ist eine technisch saubere, relevante und messbare SEO-Strategie, die die Chancen auf qualifizierte organische Sichtbarkeit verbessert.",
  },
  {
    question: "Ist Google Business Profile Teil von Local SEO?",
    answer:
      "Ja. Für lokale Unternehmen gehören Profilkategorien, Leistungen, Inhalte, Bilder, Bewertungen und konsistente Unternehmensdaten zu den wichtigen lokalen Signalen. Sie werden mit der Website und den lokalen Landingpages abgestimmt.",
  },
  {
    question: "Kann eine bestehende Website für SEO optimiert werden?",
    answer:
      "Ja. Bestehende Websites können technisch analysiert und schrittweise verbessert werden. Ein kompletter Relaunch ist nur sinnvoll, wenn Architektur, Performance oder Wartbarkeit die weitere Optimierung deutlich behindern.",
  },
  {
    question: "Welche Daten werden für SEO ausgewertet?",
    answer:
      "Typischerweise werden Google Search Console, Analytics und – falls relevant – Daten aus dem Google Business Profile verwendet. Entscheidend ist, echte Business-Aktionen von reinen Seitenaufrufen oder technischen Events zu trennen.",
  },
];

export default function SeoLandshutPage() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${siteConfig.domain}/seo-landshut#service`,
    name: "SEO Landshut",
    serviceType: "Lokale und technische Suchmaschinenoptimierung",
    description:
      "Lokale und technische SEO, Google Business Profile, Landingpages, strukturierte Daten und Conversion-Tracking für Unternehmen in Landshut.",
    url: `${siteConfig.domain}/seo-landshut`,
    provider: {
      "@id": `${siteConfig.domain}/#business`,
    },
    areaServed: {
      "@type": "City",
      name: "Landshut",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "SEO Leistungen",
      itemListElement: seoServices.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.title,
          description: service.text,
        },
      })),
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <article className="min-h-screen">
        <section className="relative overflow-hidden px-6 pb-20 pt-28">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.12),transparent_55%)]" />
          <div className="mx-auto max-w-6xl">
            <p className="mb-5 text-xs font-black uppercase tracking-[0.3em] text-accent-blue">
              SEO Landshut · Local Growth
            </p>
            <h1 className="max-w-5xl text-5xl font-black tracking-tight text-foreground md:text-7xl">
              SEO in Landshut für mehr qualifizierte Sichtbarkeit bei Google
            </h1>
            <p className="mt-8 max-w-3xl text-xl leading-relaxed text-foreground/70">
              LOrdEnRYQuE verbindet technische Suchmaschinenoptimierung, Local SEO, relevante
              Landingpages und sauberes Conversion-Tracking. Ziel ist nicht möglichst viel
              beliebiger Traffic, sondern eine bessere Sichtbarkeit für Suchanfragen, die zu Ihrem
              tatsächlichen Angebot passen.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="rounded-xl bg-white px-7 py-4 font-bold text-black transition hover:bg-white/90"
              >
                SEO-Projekt besprechen
              </Link>
              <Link
                href="/webdesign-landshut"
                className="rounded-xl border border-white/15 px-7 py-4 font-bold text-foreground transition hover:bg-white/5"
              >
                Webdesign Landshut
              </Link>
            </div>
          </div>
        </section>

        <section className="border-y border-white/5 bg-white/[0.02] px-6 py-20">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-3xl">
              <p className="text-xs font-black uppercase tracking-[0.28em] text-accent-blue">
                SEO Leistungen
              </p>
              <h2 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
                Website, lokale Signale und Messung als ein System
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-foreground/70">
                Gute SEO entsteht nicht durch einen einzelnen Trick. Technik, Inhalte, interne
                Verlinkung, lokale Relevanz und die Qualität der Conversion-Pfade müssen
                zusammenarbeiten.
              </p>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {seoServices.map((service) => (
                <div
                  key={service.title}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-7"
                >
                  <h3 className="text-xl font-bold">{service.title}</h3>
                  <p className="mt-4 leading-relaxed text-foreground/65">{service.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-20">
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.28em] text-accent-blue">
                Vorgehen
              </p>
              <h2 className="mt-4 text-4xl font-bold tracking-tight">
                Erst verstehen, dann optimieren
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-foreground/70">
                SEO-Maßnahmen werden nach tatsächlichem Problem und Geschäftsziel priorisiert. Eine
                technisch perfekte Seite nützt wenig, wenn sie die falschen Suchanfragen anspricht.
                Umgekehrt kann guter Content sein Potenzial nicht ausschöpfen, wenn Indexierung,
                Performance oder Seitenstruktur fehlerhaft sind.
              </p>
              <Link
                href="/services"
                className="mt-7 inline-flex font-bold text-accent-blue hover:underline"
              >
                Local Growth Angebot ansehen →
              </Link>
            </div>

            <div className="grid gap-5">
              {process.map((item) => (
                <div
                  key={item.step}
                  className="grid grid-cols-[auto_1fr] gap-5 rounded-2xl border border-white/10 p-6"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-accent-blue/15 text-sm font-black text-accent-blue">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">{item.title}</h3>
                    <p className="mt-2 leading-relaxed text-foreground/65">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-white/5 bg-white/[0.02] px-6 py-20">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.28em] text-accent-blue">
                  Messbarkeit
                </p>
                <h2 className="mt-4 text-4xl font-bold tracking-tight">
                  SEO wird an Business-Signalen gemessen
                </h2>
                <p className="mt-5 text-lg leading-relaxed text-foreground/70">
                  Rankings sind nur ein Teil des Bildes. Entscheidend ist, ob relevante
                  Suchanfragen echte Besucher und daraus qualifizierte Kontakte erzeugen.
                </p>
              </div>
              <ul className="space-y-4">
                {metrics.map((metric) => (
                  <li
                    key={metric}
                    className="rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-5 text-foreground/75"
                  >
                    {metric}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="px-6 py-20">
          <div className="mx-auto max-w-4xl">
            <p className="text-xs font-black uppercase tracking-[0.28em] text-accent-blue">FAQ</p>
            <h2 className="mt-4 text-4xl font-bold tracking-tight">
              Häufige Fragen zu SEO in Landshut
            </h2>
            <div className="mt-10 space-y-5">
              {faq.map((item) => (
                <div key={item.question} className="rounded-2xl border border-white/10 p-6">
                  <h3 className="text-lg font-bold">{item.question}</h3>
                  <p className="mt-3 leading-relaxed text-foreground/65">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 pb-24 pt-8">
          <div className="mx-auto max-w-4xl rounded-3xl border border-white/10 bg-white/[0.03] p-10 text-center md:p-14">
            <h2 className="text-4xl font-bold tracking-tight">
              Möchten Sie wissen, wo Ihre SEO aktuell Potenzial verliert?
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-foreground/70">
              Beschreiben Sie kurz Ihre Website und Ihr wichtigstes Geschäftsziel. Danach kann
              geprüft werden, ob zuerst Technik, lokale Sichtbarkeit, Inhalte oder der
              Conversion-Pfad verbessert werden sollte.
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-flex rounded-xl bg-white px-7 py-4 font-bold text-black transition hover:bg-white/90"
            >
              Unverbindlich anfragen
            </Link>
          </div>
        </section>
      </article>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([serviceSchema, faqSchema]) }}
      />
    </>
  );
}
