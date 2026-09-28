import Link from "next/link";
import type { Metadata } from "next";
import { constructMetadata } from "@/lib/seo";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = constructMetadata({
  title: "Webdesign Landshut – Websites, Webentwicklung & SEO",
  description:
    "Professionelles Webdesign in Landshut: moderne Websites, Webentwicklung, SEO, E-Commerce und KI-Automatisierung für Unternehmen und Selbstständige.",
  keywords: [
    "Webdesign Landshut",
    "Webdesigner Landshut",
    "Website erstellen Landshut",
    "Webentwicklung Landshut",
    "SEO Landshut",
    "Online Shop Landshut",
    "KI Automatisierung Landshut",
  ],
  canonical: "/webdesign-landshut",
});

const services = [
  {
    title: "Webdesign & Website-Erstellung",
    text: "Moderne, responsive Websites mit klarer Nutzerführung, schneller Ladezeit und einer technischen Basis, die langfristig gepflegt und erweitert werden kann.",
  },
  {
    title: "Webentwicklung & Web-Apps",
    text: "Individuelle Webanwendungen, Kundenportale, interne Tools und API-Integrationen für Prozesse, die mit Standard-Baukästen nicht sinnvoll abbildbar sind.",
  },
  {
    title: "Lokale & technische SEO",
    text: "Saubere Informationsarchitektur, technische Optimierung, lokale Relevanzsignale und messbare Suchperformance – ohne Keyword-Stuffing oder Ranking-Versprechen.",
  },
  {
    title: "E-Commerce & Online-Shops",
    text: "Performante Shops mit durchdachter Produktstruktur, Zahlungsintegration, Tracking und einer guten Grundlage für organisches Wachstum.",
  },
  {
    title: "UI/UX Design & Prototyping",
    text: "Benutzerfreundliche Interfaces, Wireframes und Prototypen, die Geschäftsziele, Inhalte und Nutzerwege früh sichtbar und testbar machen.",
  },
  {
    title: "KI & Prozessautomatisierung",
    text: "Praktische KI-Integrationen, intelligente Workflows und Automatisierungen, die wiederkehrende digitale Arbeit reduzieren und bestehende Systeme verbinden.",
  },
];

const process = [
  ["1", "Analyse", "Ziele, Zielgruppen, vorhandene Systeme und technische Anforderungen werden gemeinsam geklärt."],
  ["2", "Konzept & UX", "Struktur, Inhalte, Nutzerwege und visuelle Richtung werden vor der Umsetzung konkretisiert."],
  ["3", "Entwicklung", "Die Lösung wird performant, responsiv und mit sauberer technischer Grundlage umgesetzt."],
  ["4", "Launch & Optimierung", "Nach dem Launch folgen Messung, technische Pflege und gezielte Weiterentwicklung."],
];

const faq = [
  {
    question: "Was kostet eine professionelle Website in Landshut?",
    answer:
      "Der Preis hängt von Umfang, Funktionen, Design, Inhalten und Integrationen ab. Nach einem kurzen Erstgespräch erhalten Sie eine konkrete Einschätzung statt eines pauschalen Pakets, das möglicherweise nicht zu Ihrem Projekt passt.",
  },
  {
    question: "Arbeiten Sie nur mit Unternehmen aus Landshut?",
    answer:
      "Nein. Der lokale Schwerpunkt liegt auf Landshut und der Region, Projekte können aber auch vollständig digital mit Unternehmen außerhalb der Region umgesetzt werden.",
  },
  {
    question: "Ist Suchmaschinenoptimierung Teil der Website-Erstellung?",
    answer:
      "Eine solide technische SEO-Basis gehört zur Entwicklung. Für weiterführende lokale, technische oder inhaltliche SEO kann die Optimierung nach dem Launch gezielt fortgeführt werden.",
  },
  {
    question: "Übernehmen Sie auch bestehende Websites?",
    answer:
      "Ja. Bestehende Websites können technisch analysiert, modernisiert, beschleunigt, neu strukturiert oder schrittweise auf eine modernere Architektur migriert werden.",
  },
  {
    question: "Bieten Sie Wartung nach dem Launch an?",
    answer:
      "Ja. Je nach Projekt können technische Wartung, Sicherheitsupdates, Performance-Optimierung, Weiterentwicklung und laufende SEO-Unterstützung übernommen werden.",
  },
];

export default function WebdesignLandshutPage() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${siteConfig.domain}/webdesign-landshut#service`,
    name: "Webdesign Landshut",
    serviceType: "Webdesign und Webentwicklung",
    description:
      "Professionelles Webdesign, Webentwicklung, SEO, E-Commerce und KI-Automatisierung für Unternehmen und Selbstständige in Landshut.",
    url: `${siteConfig.domain}/webdesign-landshut`,
    provider: {
      "@id": `${siteConfig.domain}/#business`,
    },
    areaServed: {
      "@type": "City",
      name: "Landshut",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Digitale Leistungen",
      itemListElement: services.map((service) => ({
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
              Landshut · Bayern
            </p>
            <h1 className="max-w-5xl text-5xl font-black tracking-tight text-foreground md:text-7xl">
              Webdesign in Landshut für Unternehmen, die online wachsen wollen
            </h1>
            <p className="mt-8 max-w-3xl text-xl leading-relaxed text-foreground/70">
              LOrdEnRYQuE entwickelt moderne Websites, Webanwendungen und digitale Lösungen für
              Unternehmen, Selbstständige und lokale Dienstleister in Landshut. Von Konzeption und
              UI/UX über Webentwicklung und SEO bis zu E-Commerce und KI-Automatisierung entsteht
              eine technisch saubere Lösung aus einer Hand.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/contact" className="rounded-xl bg-white px-7 py-4 font-bold text-black transition hover:bg-white/90">
                Projekt besprechen
              </Link>
              <Link href="/projects" className="rounded-xl border border-white/15 px-7 py-4 font-bold text-foreground transition hover:bg-white/5">
                Projekte ansehen
              </Link>
            </div>
          </div>
        </section>

        <section className="border-y border-white/5 bg-white/[0.02] px-6 py-20">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-3xl">
              <p className="text-xs font-black uppercase tracking-[0.28em] text-accent-blue">Leistungen</p>
              <h2 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
                Digitale Lösungen mit Fokus auf Performance und Wachstum
              </h2>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => (
                <div key={service.title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-7">
                  <h3 className="text-xl font-bold">{service.title}</h3>
                  <p className="mt-4 leading-relaxed text-foreground/65">{service.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-20">
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.28em] text-accent-blue">Webdesign Landshut</p>
              <h2 className="mt-4 text-4xl font-bold tracking-tight">
                Persönliche Zusammenarbeit, moderne technische Umsetzung
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-foreground/70">
                Ein lokaler Ansprechpartner kann Abstimmungen vereinfachen, gleichzeitig bleibt die technische Umsetzung vollständig digital und flexibel. Entscheidend ist nicht ein fertiges Template, sondern eine Lösung, die zu Angebot, Zielgruppe und Geschäftsprozess passt.
              </p>
              <p className="mt-5 text-lg leading-relaxed text-foreground/70">
                Bestehende Websites können genauso optimiert werden wie komplett neue Projekte. Dabei stehen klare Nutzerführung, Performance, Wartbarkeit und messbare Suchsichtbarkeit im Mittelpunkt.
              </p>
            </div>
            <div className="grid gap-5">
              {process.map(([number, title, text]) => (
                <div key={number} className="grid grid-cols-[auto_1fr] gap-5 rounded-2xl border border-white/10 p-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-blue/15 font-black text-accent-blue">
                    {number}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">{title}</h3>
                    <p className="mt-2 leading-relaxed text-foreground/65">{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-white/5 bg-white/[0.02] px-6 py-20">
          <div className="mx-auto max-w-4xl">
            <p className="text-xs font-black uppercase tracking-[0.28em] text-accent-blue">FAQ</p>
            <h2 className="mt-4 text-4xl font-bold tracking-tight">Häufige Fragen zu Webdesign in Landshut</h2>
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

        <section className="px-6 py-24">
          <div className="mx-auto max-w-4xl rounded-3xl border border-white/10 bg-white/[0.03] p-10 text-center md:p-14">
            <h2 className="text-4xl font-bold tracking-tight">Projekt in Landshut geplant?</h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-foreground/70">
              Beschreiben Sie kurz, was Sie entwickeln oder verbessern möchten. Danach können Umfang, technische Anforderungen und der sinnvollste nächste Schritt konkret geklärt werden.
            </p>
            <Link href="/contact" className="mt-8 inline-flex rounded-xl bg-white px-7 py-4 font-bold text-black transition hover:bg-white/90">
              Unverbindlich Kontakt aufnehmen
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
