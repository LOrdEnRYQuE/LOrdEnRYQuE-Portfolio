"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Lock, Database, ShieldCheck, Scale } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useI18n } from "@/lib/i18n";

export default function PrivacyPolicyPage() {
  const { t, locale } = useI18n();
  const [dbContent, setDbContent] = useState<string | null>(null);

  useEffect(() => {
    async function fetchLegal() {
      try {
        const res = await fetch("/api/legal");
        if (res.ok) {
          const data = await res.json();
          const content = data[`legal_privacy_${locale}`];
          if (content) setDbContent(content);
        }
      } catch (e) {
        console.error("Failed to fetch privacy content", e);
      }
    }
    fetchLegal();
  }, [locale]);

  const sections = [
    {
      icon: Lock,
      title: locale === "de" ? "1. Datenschutz auf einen Blick" : "1. Data Protection at a Glance",
      content: locale === "de" 
        ? "Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können."
        : "The following information provides a simple overview of what happens to your personal data when you visit this website. Personal data is any data with which you can be personally identified."
    },
    {
      icon: Database,
      title: locale === "de" ? "2. Datenerfassung auf dieser Website" : "2. Data Collection on this Website",
      content: locale === "de"
        ? "Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Impressum dieser Website entnehmen. Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen (z. B. durch das Kontaktformular). Andere Daten werden automatisch beim Besuch der Website durch unsere IT-Systeme erfasst (z. B. IP-Adresse, Browser, Uhrzeit des Seitenaufrufs)."
        : "Data processing on this website is carried out by the website operator. You can find their contact details in the legal notice (Impressum) of this website. Your data is collected on the one hand by you telling us it (e.g. through the contact form). Other data is automatically collected by our IT systems when you visit the website (e.g. IP address, browser, time of page view)."
    },
    {
      icon: ShieldCheck,
      title: locale === "de" ? "3. Analyse-Tools und Tools von Drittanbietern" : "3. Analysis Tools and Third-Party Tools",
      content: locale === "de"
        ? "Beim Besuch dieser Website kann Ihr Surf-Verhalten statistisch ausgewertet werden. Das geschieht vor allem mit Cookies und mit sogenannten Analyse-Programmen. Die Analyse Ihres Surf-Verhaltens erfolgt in der Regel anonym; das Surf-Verhalten kann nicht zu Ihnen zurückverfolgt werden."
        : "When you visit this website, your surfing behavior can be statistically evaluated. This happens primarily with cookies and with so-called analysis programs. The analysis of your surfing behavior is usually anonymous; the surfing behavior cannot be traced back to you."
    },
    {
      icon: Scale,
      title: locale === "de" ? "4. Ihre Rechte" : "4. Your Rights",
      content: locale === "de"
        ? "Sie haben jederzeit das Recht unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung, Sperrung oder Löschung dieser Daten zu verlangen."
        : "You have the right at any time to receive information free of charge about the origin, recipient and purpose of your stored personal data. You also have a right to request the correction, blocking or deletion of this data."
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
            <Lock size={12} /> Neural Security Protocol
          </div>
          <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tighter italic">
            {locale === "de" ? "Datenschutz" : "Privacy Policy"}
          </h1>
          <p className="text-white/40 text-sm font-bold uppercase tracking-[0.3em] max-w-xl border-l border-white/10 pl-6">
            Data processing, encryption standards, and user rights according to GDPR / DSGVO.
          </p>
        </div>
      </motion.div>

      <div className="grid gap-8">
        {dbContent ? (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-10 rounded-[2.5rem] border-white/5 space-y-6"
          >
            <div className="text-white/80 whitespace-pre-wrap leading-relaxed">
              {dbContent}
            </div>
          </motion.section>
        ) : (
          sections.map((section, idx) => (
            <motion.section
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * idx }}
              className="glass-card p-10 rounded-[2.5rem] border-white/5 space-y-6 group hover:bg-white/3 transition-all duration-700"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-accent/60 group-hover:text-accent group-hover:border-accent/40 shadow-inner transition-all">
                  <section.icon size={24} />
                </div>
                <h2 className="text-xl font-bold tracking-tight text-white/90">{section.title}</h2>
              </div>
              <p className="text-sm text-white/50 leading-relaxed font-medium pl-16 border-l border-white/5 ml-6 py-2">
                {section.content}
              </p>
            </motion.section>
          ))
        )}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-20 p-8 rounded-4xl border border-accent/20 bg-accent/5 text-center space-y-4"
      >
        <div className="inline-flex p-3 rounded-full bg-accent/10 text-accent mb-2">
          <ShieldCheck size={24} />
        </div>
        <h3 className="text-lg font-bold uppercase tracking-widest">{locale === "de" ? "Sicherheitshinweis" : "Security Note"}</h3>
        <p className="text-xs text-white/40 uppercase tracking-[0.2em] italic max-w-md mx-auto">
          {locale === "de" 
            ? "Alle Verbindungen zu diesem System sind mittels TLS 1.3 verschlüsselt. Wir erfassen nur absolut notwendige Daten."
            : "All connections to this system are encrypted via TLS 1.3. We only collect absolutely necessary data."}
        </p>
      </motion.div>
      
      <div className="py-16 text-center">
          <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white/10">
              Neural Archive ID: LGL-002 // GDPR V3.1
          </p>
      </div>
    </div>
  );
}
