"use client";

import Link from "next/link";
import { ArrowRight, Bot, Check, Globe2, LineChart, ShieldCheck, Sparkles, Wrench } from "lucide-react";
import { useI18n } from "@/lib/i18n";

type Offer = {
  name: string;
  eyebrow: string;
  price: string;
  description: string;
  outcome: string;
  features: string[];
  bestFor: string;
  highlighted?: boolean;
  icon: typeof Globe2;
};

export default function CommercialServices() {
  const { locale } = useI18n();
  const de = locale === "de";

  const copy = de
    ? {
        badge: "Klare Angebote statt Technik-Baukasten",
        title: "Digitale Lösungen, die ein konkretes Geschäftsziel verfolgen.",
        intro:
          "Wählen Sie den Einstieg, der zu Ihrem aktuellen Ziel passt. Umfang und Festpreis werden nach einem kurzen Erstgespräch konkretisiert – ohne unnötige Module und ohne versteckte Standardpakete.",
        investment: "Richtwert",
        outcome: "Ziel",
        bestFor: "Geeignet für",
        cta: "Projekt besprechen",
        details: "Webdesign Landshut ansehen",
        retainersEyebrow: "Nach dem Launch",
        retainersTitle: "Weiterentwicklung statt einmaligem Projekt",
        retainersIntro:
          "Auf Wunsch bleibt LOrdEnRYQuE nach dem Launch als technischer Partner an Bord. Die laufenden Pakete werden erst dann aktiviert, wenn sie für Ihr Projekt wirtschaftlich sinnvoll sind.",
        month: "/ Monat",
        care: {
          name: "Care",
          price: "ab 149 €",
          text: "Technische Pflege, Updates, Monitoring und kleine laufende Anpassungen.",
        },
        growth: {
          name: "Growth",
          price: "ab 349 €",
          text: "Care plus lokale/technische SEO, GBP-Unterstützung, Analyse und Conversion-Optimierung.",
        },
        automation: {
          name: "Growth + Automation",
          price: "ab 699 €",
          text: "Growth plus laufende Automatisierungen, Integrationen und reservierte Entwicklungszeit.",
        },
        note:
          "Alle Preisangaben sind Orientierungswerte netto. Der konkrete Umfang wird vor Projektstart transparent definiert.",
        closingTitle: "Unsicher, welches Modell passt?",
        closingText:
          "Schicken Sie eine kurze Anfrage. Sie erhalten keine automatische Paketempfehlung, sondern eine Einschätzung auf Basis Ihres tatsächlichen Ziels.",
        closingCta: "60-Sekunden-Anfrage starten",
      }
    : {
        badge: "Clear commercial offers",
        title: "Digital solutions built around a concrete business outcome.",
        intro:
          "Choose the entry point that matches your current goal. Scope and fixed pricing are clarified after a short discovery call — without unnecessary modules or generic packages.",
        investment: "Guide price",
        outcome: "Outcome",
        bestFor: "Best for",
        cta: "Discuss your project",
        details: "View Web Design Landshut",
        retainersEyebrow: "After launch",
        retainersTitle: "Ongoing growth instead of a one-off project",
        retainersIntro:
          "When useful, LOrdEnRYQuE can stay involved after launch as your technical partner. Recurring plans are only activated when they make commercial sense for the project.",
        month: "/ month",
        care: {
          name: "Care",
          price: "from €149",
          text: "Technical maintenance, updates, monitoring and small ongoing changes.",
        },
        growth: {
          name: "Growth",
          price: "from €349",
          text: "Care plus local/technical SEO, GBP support, analytics and conversion optimization.",
        },
        automation: {
          name: "Growth + Automation",
          price: "from €699",
          text: "Growth plus ongoing automations, integrations and reserved development capacity.",
        },
        note:
          "All prices are indicative net guide prices. The exact scope is defined transparently before work begins.",
        closingTitle: "Not sure which option fits?",
        closingText:
          "Send a short inquiry. You will get a recommendation based on your actual business goal, not an automated package upsell.",
        closingCta: "Start a 60-second inquiry",
      };

  const offers: Offer[] = de
    ? [
        {
          name: "Business Website",
          eyebrow: "Präsenz & Conversion",
          price: "ab 3.000 €",
          description:
            "Eine individuelle, schnelle Website für Unternehmen, die professionell auftreten und aus Besuchern echte Anfragen machen wollen.",
          outcome: "Eine glaubwürdige digitale Basis, die Leistungen klar erklärt und Kontaktanfragen erleichtert.",
          features: [
            "Individuelles responsives Webdesign",
            "Conversion-orientierte Seitenstruktur",
            "Technische SEO-Basis & Core Web Vitals",
            "Kontakt, WhatsApp und Analytics",
            "Search Console & sauberer Launch",
          ],
          bestFor: "Unternehmen, Selbstständige und lokale Dienstleister mit veraltetem oder fehlendem Webauftritt.",
          icon: Globe2,
        },
        {
          name: "Local Growth Website",
          eyebrow: "Website + lokale Sichtbarkeit",
          price: "ca. 4.500–6.500 €",
          description:
            "Website und lokales Wachstum als ein System: technische Umsetzung, relevante Landingpages, Google Business Profile und messbare Conversion-Pfade.",
          outcome: "Mehr qualifizierte Sichtbarkeit bei Google und ein klarer Weg von der Suche bis zur Anfrage.",
          features: [
            "Alles aus Business Website",
            "Lokale Landingpages & strukturierte Daten",
            "Technische und On-Page-SEO",
            "Google Business Profile Alignment",
            "Review- & Conversion-Funnel",
            "60–90 Tage Launch-Optimierung",
          ],
          bestFor: "Lokale Unternehmen, die nicht nur eine Website, sondern mehr qualifizierte Google-Anfragen wollen.",
          highlighted: true,
          icon: LineChart,
        },
        {
          name: "Web Product & Automation",
          eyebrow: "Systeme statt Standardsoftware",
          price: "ab 5.000 €",
          description:
            "Individuelle Webanwendungen und Automatisierungen für Prozesse, die mit einer normalen Website oder Standardtools nicht sinnvoll gelöst werden.",
          outcome: "Weniger manuelle Arbeit, bessere Abläufe und ein digitales System, das mit dem Unternehmen wachsen kann.",
          features: [
            "Kundenportale & interne Business-Tools",
            "Dashboards, Booking- und CRM-Workflows",
            "API- und Systemintegrationen",
            "KI-Assistenten & intelligente Automatisierung",
            "Individuelle Rollen, Daten und Geschäftslogik",
          ],
          bestFor: "Unternehmen mit wiederkehrenden manuellen Prozessen oder einer konkreten digitalen Produktidee.",
          icon: Bot,
        },
      ]
    : [
        {
          name: "Business Website",
          eyebrow: "Presence & conversion",
          price: "from €3,000",
          description:
            "A custom, fast website for businesses that want a credible online presence and a clearer path from visitor to inquiry.",
          outcome: "A professional digital foundation that explains your offer clearly and makes contacting you easy.",
          features: [
            "Custom responsive web design",
            "Conversion-focused page structure",
            "Technical SEO foundation & Core Web Vitals",
            "Contact, WhatsApp and analytics",
            "Search Console & clean launch",
          ],
          bestFor: "Businesses, freelancers and local service companies with an outdated or missing website.",
          icon: Globe2,
        },
        {
          name: "Local Growth Website",
          eyebrow: "Website + local visibility",
          price: "typically €4,500–€6,500",
          description:
            "Website and local growth as one system: technical implementation, relevant landing pages, Google Business Profile alignment and measurable conversion paths.",
          outcome: "More qualified Google visibility and a clear journey from search to inquiry.",
          features: [
            "Everything in Business Website",
            "Local landing pages & structured data",
            "Technical and on-page SEO",
            "Google Business Profile alignment",
            "Review & conversion funnel",
            "60–90 days of launch optimization",
          ],
          bestFor: "Local businesses that need more than a website and want qualified Google inquiries.",
          highlighted: true,
          icon: LineChart,
        },
        {
          name: "Web Product & Automation",
          eyebrow: "Systems beyond standard software",
          price: "from €5,000",
          description:
            "Custom web applications and automations for workflows that a normal website or generic SaaS tools cannot solve well.",
          outcome: "Less manual work, better processes and a digital system that can grow with the business.",
          features: [
            "Customer portals & internal business tools",
            "Dashboards, booking and CRM workflows",
            "API and system integrations",
            "AI assistants & intelligent automation",
            "Custom roles, data and business logic",
          ],
          bestFor: "Companies with repetitive manual workflows or a concrete digital product idea.",
          icon: Bot,
        },
      ];

  const retainers = [
    { ...copy.care, icon: Wrench },
    { ...copy.growth, icon: LineChart },
    { ...copy.automation, icon: Sparkles },
  ];

  return (
    <main className="min-h-screen px-6 pb-24 pt-32 md:px-10">
      <section className="mx-auto max-w-7xl">
        <div className="max-w-4xl">
          <p className="text-xs font-black uppercase tracking-[0.28em] text-accent">{copy.badge}</p>
          <h1 className="mt-5 text-5xl font-black tracking-tight text-foreground md:text-7xl">
            {copy.title}
          </h1>
          <p className="mt-7 max-w-3xl text-lg leading-relaxed text-text-secondary md:text-xl">
            {copy.intro}
          </p>
        </div>

        <div className="mt-14 grid gap-6 xl:grid-cols-3">
          {offers.map((offer) => {
            const Icon = offer.icon;
            return (
              <article
                key={offer.name}
                className={[
                  "relative flex h-full flex-col rounded-[32px] border p-7 md:p-8",
                  offer.highlighted
                    ? "border-accent/45 bg-accent/[0.07] shadow-[0_20px_80px_rgba(0,0,0,0.22)]"
                    : "border-white/10 bg-white/[0.025]",
                ].join(" ")}
              >
                {offer.highlighted && (
                  <span className="absolute right-6 top-6 rounded-full border border-accent/25 bg-accent/10 px-3 py-1 text-[9px] font-black uppercase tracking-[0.18em] text-accent">
                    {de ? "Local Growth Fokus" : "Local Growth Focus"}
                  </span>
                )}

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 text-accent">
                  <Icon size={23} />
                </div>
                <p className="mt-7 text-[10px] font-black uppercase tracking-[0.25em] text-text-muted">
                  {offer.eyebrow}
                </p>
                <h2 className="mt-2 text-2xl font-black text-foreground">{offer.name}</h2>
                <p className="mt-4 min-h-[92px] leading-relaxed text-text-secondary">{offer.description}</p>

                <div className="mt-6 rounded-2xl border border-white/10 bg-black/15 p-4">
                  <p className="text-[9px] font-black uppercase tracking-[0.22em] text-text-muted">
                    {copy.investment}
                  </p>
                  <p className="mt-1 text-2xl font-black text-foreground">{offer.price}</p>
                </div>

                <div className="mt-6">
                  <p className="text-[10px] font-black uppercase tracking-[0.22em] text-accent">{copy.outcome}</p>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/85">{offer.outcome}</p>
                </div>

                <ul className="mt-6 space-y-3">
                  {offer.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm text-text-secondary">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
                        <Check size={12} />
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-7 border-t border-white/10 pt-6">
                  <p className="text-[9px] font-black uppercase tracking-[0.22em] text-text-muted">{copy.bestFor}</p>
                  <p className="mt-2 text-sm leading-relaxed text-text-secondary">{offer.bestFor}</p>
                </div>

                <Link
                  href="/contact"
                  className={[
                    "mt-8 inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-black transition",
                    offer.highlighted
                      ? "bg-accent text-background hover:brightness-110"
                      : "border border-white/10 text-foreground hover:border-accent/35 hover:bg-white/5",
                  ].join(" ")}
                >
                  {copy.cta}
                  <ArrowRight size={16} />
                </Link>
              </article>
            );
          })}
        </div>

        <div className="mt-8 flex justify-center">
          <Link
            href="/webdesign-landshut"
            className="inline-flex items-center gap-2 text-sm font-bold text-accent hover:underline"
          >
            {copy.details}
            <ArrowRight size={15} />
          </Link>
        </div>
      </section>

      <section className="mx-auto mt-28 max-w-7xl border-t border-white/10 pt-20">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.28em] text-accent">{copy.retainersEyebrow}</p>
            <h2 className="mt-4 text-4xl font-black tracking-tight text-foreground md:text-5xl">
              {copy.retainersTitle}
            </h2>
            <p className="mt-5 max-w-xl leading-relaxed text-text-secondary">{copy.retainersIntro}</p>
          </div>

          <div className="grid gap-4">
            {retainers.map((plan) => {
              const Icon = plan.icon;
              return (
                <div key={plan.name} className="grid gap-5 rounded-3xl border border-white/10 bg-white/[0.025] p-6 sm:grid-cols-[auto_1fr_auto] sm:items-center">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/5 text-accent">
                    <Icon size={20} />
                  </div>
                  <div>
                    <h3 className="font-black text-foreground">{plan.name}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-text-secondary">{plan.text}</p>
                  </div>
                  <div className="text-left sm:text-right">
                    <p className="font-black text-foreground">{plan.price}</p>
                    <p className="text-[9px] font-bold uppercase tracking-widest text-text-muted">{copy.month}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-8 flex items-start gap-3 rounded-2xl border border-white/5 bg-white/[0.02] p-5 text-xs leading-relaxed text-text-muted">
          <ShieldCheck size={17} className="mt-0.5 shrink-0 text-accent" />
          <p>{copy.note}</p>
        </div>
      </section>

      <section className="mx-auto mt-24 max-w-4xl rounded-[36px] border border-accent/20 bg-accent/[0.05] p-8 text-center md:p-12">
        <h2 className="text-3xl font-black tracking-tight text-foreground md:text-4xl">{copy.closingTitle}</h2>
        <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-text-secondary">{copy.closingText}</p>
        <Link
          href="/contact"
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-4 text-sm font-black text-background transition hover:brightness-110"
        >
          {copy.closingCta}
          <ArrowRight size={16} />
        </Link>
      </section>
    </main>
  );
}
