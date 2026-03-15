"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle, AlertTriangle, Scale } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useI18n } from "@/lib/i18n";

export default function TermsPage() {
  const { t, locale } = useI18n();
  const [dbContent, setDbContent] = useState<string | null>(null);

  useEffect(() => {
    async function fetchLegal() {
      try {
        const res = await fetch("/api/legal");
        if (res.ok) {
          const data = await res.json();
          const content = data[`legal_terms_${locale}`];
          if (content) setDbContent(content);
        }
      } catch (e) {
        console.error("Failed to fetch terms content", e);
      }
    }
    fetchLegal();
  }, [locale]);

  const rules = [
    {
      title: locale === "de" ? "1. Geltungsbereich" : "1. Scope",
      desc: locale === "de"
        ? "Diese Bedingungen gelten für alle Dienstleistungen und Produkte, die über lordenryque.com angeboten werden."
        : "These terms apply to all services and products offered via lordenryque.com."
    },
    {
      title: locale === "de" ? "2. Leistungen" : "2. Services",
      desc: locale === "de"
        ? "Ich biete Webentwicklung, KI-Integrationen und Software-Engineering-Dienstleistungen an. Konkrete Details werden in individuellen Verträgen festgelegt."
        : "I provide web development, AI integration, and software engineering services. Specific details are defined in individual contracts."
    },
    {
      title: locale === "de" ? "3. Urheberrecht" : "3. Copyright",
      desc: locale === "de"
        ? "Sämtliche auf dieser Website veröffentlichten Inhalte sind urheberrechtlich geschützt. Eine Nutzung ohne meine ausdrückliche Zustimmung ist nicht gestattet."
        : "All content published on this website is protected by copyright. Use without my express consent is not permitted."
    },
    {
      title: locale === "de" ? "4. Haftung" : "4. Liability",
      desc: locale === "de"
        ? "Ich übernehme keine Haftung für die Richtigkeit der auf dieser Website bereitgestellten Informationen, sofern kein vorsätzliches oder grob fahrlässiges Verschulden vorliegt."
        : "I accept no liability for the accuracy of the information provided on this website, unless there is intentional or grossly negligent fault."
    }
  ];

  return (
    <div className="py-24 px-6 md:px-10 max-w-4xl mx-auto min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Button href="/" variant="ghost" className="mb-12 pl-0 group text-text-secondary hover:text-foreground">
          <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
          {t("projects.back_to_home")}
        </Button>
        
        <div className="space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-[10px] font-black uppercase tracking-widest">
            <Scale size={12} /> Legal Framework
          </div>
          <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tighter italic">
            {locale === "de" ? "AGB" : "Terms"}
          </h1>
          <p className="text-white/40 text-sm font-bold uppercase tracking-[0.3em] max-w-xl border-l border-white/10 pl-6">
            General terms and conditions for services, products, and neural infrastructure usage.
          </p>
        </div>
      </motion.div>

      <div className="space-y-16">
        {dbContent ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-10 rounded-[3rem] border-white/5"
          >
            <div className="text-white/80 whitespace-pre-wrap leading-relaxed">
              {dbContent}
            </div>
          </motion.div>
        ) : (
          <div className="grid sm:grid-cols-2 gap-8">
            {rules.map((rule, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * idx }}
                className="glass-card p-10 rounded-[3rem] border-white/5 space-y-6 group hover:translate-y-[-4px] transition-all duration-500"
              >
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-accent/40 group-hover:text-accent group-hover:shadow-accent-glow-sm transition-all duration-500">
                  <CheckCircle size={24} />
                </div>
                <div className="space-y-3">
                  <h3 className="text-lg font-black uppercase tracking-tighter italic group-hover:text-white transition-colors">
                    {rule.title}
                  </h3>
                  <p className="text-sm text-white/40 leading-relaxed font-medium group-hover:text-white/60 transition-colors">
                    {rule.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {!dbContent && (
          <section className="p-12 glass-card rounded-[4rem] border-white/5 relative overflow-hidden group">
            <div className="absolute inset-0 bg-linear-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
               <div className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 text-white/20">
                  <AlertTriangle size={64} />
               </div>
               <div className="space-y-4">
                  <h2 className="text-2xl font-black uppercase tracking-tighter italic">{locale === "de" ? "Wichtiger Hinweis" : "Important Notice"}</h2>
                  <p className="text-sm text-white/40 leading-relaxed max-w-xl font-medium">
                    {locale === "de"
                      ? "Individuelle Verträge haben stets Vorrang vor diesen allgemeinen Bedingungen. Bei Fragen kontaktieren Sie mich bitte direkt."
                      : "Individual contracts always take precedence over these general terms. For any questions, please contact me directly."}
                  </p>
               </div>
            </div>
          </section>
        )}
      </div>

      <div className="py-24 text-center">
          <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white/10">
              Neural Archive ID: LGL-003 // TERM V2.4
          </p>
      </div>
    </div>
  );
}
