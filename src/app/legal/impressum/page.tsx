"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ShieldCheck, Globe, User, MapPin, Mail } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useI18n } from "@/lib/i18n";
import { siteConfig } from "@/content/site";

export default function ImpressumPage() {
  const { t, locale } = useI18n();
  const [dbContent, setDbContent] = useState<string | null>(null);

  useEffect(() => {
    async function fetchLegal() {
      try {
        const res = await fetch("/api/legal");
        if (res.ok) {
          const data = await res.json();
          const content = data[`legal_impressum_${locale}`];
          if (content) setDbContent(content);
        }
      } catch (e) {
        console.error("Failed to fetch legal content", e);
      }
    }
    fetchLegal();
  }, [locale]);

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
            <ShieldCheck size={12} /> Legal Disclosure
          </div>
          <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tighter italic">
            {locale === "de" ? "Impressum" : "Legal Notice"}
          </h1>
          <p className="text-white/40 text-sm font-bold uppercase tracking-[0.3em] max-w-xl border-l border-white/10 pl-6">
            Official business identification and responsible entities in accordance with § 5 TMG.
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="space-y-12"
      >
        {dbContent ? (
          <section className="glass-card p-10 rounded-[2.5rem] border-white/5 space-y-8 relative overflow-hidden group">
            <div className="text-white/80 whitespace-pre-wrap leading-relaxed">
              {dbContent}
            </div>
          </section>
        ) : (
          <>
            <section className="glass-card p-10 rounded-[2.5rem] border-white/5 space-y-8 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:rotate-12 transition-transform duration-1000">
                <Globe size={180} />
              </div>
              
              <div className="grid md:grid-cols-2 gap-12 relative z-10">
                <div className="space-y-6">
                  <div className="flex items-center gap-3 text-accent uppercase text-[10px] font-black tracking-widest">
                    <User size={14} /> Identification
                  </div>
                  <div className="space-y-2">
                    <p className="text-2xl font-bold">{siteConfig.name}</p>
                    <p className="text-white/40 text-sm leading-relaxed">{siteConfig.role}</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center gap-3 text-accent uppercase text-[10px] font-black tracking-widest">
                    <MapPin size={14} /> Registered Address
                  </div>
                  <div className="space-y-1 text-white/60 text-sm leading-relaxed font-medium">
                    <p>Attila Lazar</p>
                    <p>[Your Street Address]</p>
                    <p>[Postal Code], [City]</p>
                    <p>GERMANY</p>
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t border-white/5 grid md:grid-cols-2 gap-12 relative z-10">
                <div className="space-y-6">
                  <div className="flex items-center gap-3 text-accent uppercase text-[10px] font-black tracking-widest">
                    <Mail size={14} /> Contact
                  </div>
                  <div className="space-y-1 text-white/60 text-sm font-medium">
                    <p>Email: <a href={`mailto:${siteConfig.email}`} className="text-accent/80 hover:text-accent transition-colors">{siteConfig.email}</a></p>
                    <p>Phone: [Your Phone Number]</p>
                    <p>Web: <a href={siteConfig.domain} className="text-accent/80 hover:text-accent transition-colors">{siteConfig.domain.replace('https://', '')}</a></p>
                  </div>
                </div>

                <div className="space-y-6 text-white/40 text-[10px] leading-relaxed uppercase tracking-[0.2em] italic font-black">
                   <p>Responsible for content according to § 18 MStV:</p>
                   <p className="text-white/80 not-italic lowercase tracking-normal">{siteConfig.name}</p>
                </div>
              </div>
            </section>

            {/* Disclaimer Section */}
            <section className="space-y-8 px-4">
              <div className="space-y-4">
                <h2 className="text-xl font-black uppercase tracking-widest text-white/90">
                  {locale === "de" ? "Haftungsausschluss" : "Disclaimer"}
                </h2>
                <div className="h-1 w-12 bg-accent/30 rounded-full" />
              </div>
              
              <div className="grid gap-8 text-sm text-white/50 leading-relaxed font-medium">
                <div className="space-y-2">
                  <h3 className="text-white/80 font-bold">{locale === "de" ? "Haftung für Inhalte" : "Liability for Content"}</h3>
                  <p>
                    {locale === "de" 
                      ? "Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen."
                      : "As a service provider, we are responsible for our own content on these pages in accordance with general laws according to § 7 Para. 1 TMG. However, according to §§ 8 to 10 TMG, as a service provider, we are not obliged to monitor transmitted or stored third-party information or to investigate circumstances that indicate illegal activity."}
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="text-white/80 font-bold">{locale === "de" ? "Urheberrecht" : "Copyright"}</h3>
                  <p>
                    {locale === "de"
                      ? "Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers."
                      : "The content and works created by the page operators on these pages are subject to German copyright law. Duplication, processing, distribution and any kind of exploitation outside the limits of copyright law require the written consent of the respective author or creator."}
                  </p>
                </div>
              </div>
            </section>
          </>
        )}

        <div className="pt-16 text-center">
            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white/10">
                End of Document // Neural Archive ID: LGL-001
            </p>
        </div>
      </motion.div>
    </div>
  );
}
