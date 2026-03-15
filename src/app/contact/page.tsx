"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { siteConfig } from "@/content/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Mail, ArrowRight, Clock, CheckCircle2 } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export default function ContactPage() {
  const { t } = useI18n();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error("Failed to send message");
      }

      setIsSuccess(true);
    } catch (err) {
      console.error(err);
      setError(t("contact.error_msg"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-24 px-6 md:px-10 max-w-5xl mx-auto min-h-screen">
      <SectionHeading title={t("contact.title")} subtitle={t("contact.subtitle")} />

      <div className="grid lg:grid-cols-2 gap-12 mt-16">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <p className="text-xl text-text-secondary leading-relaxed">
            {t("contact.intro")}
          </p>
          
          <div className="space-y-6 py-6 border-y border-border">
            <div className="flex items-center gap-4 text-text-secondary">
              <div className="w-12 h-12 rounded-full glass flex items-center justify-center text-accent">
                <Mail size={20} />
              </div>
              <div>
                <p className="text-sm tracking-wide uppercase text-text-muted mb-1">{t("contact.email_label")}</p>
                <p className="font-medium text-foreground">{siteConfig.email}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 text-text-secondary">
              <div className="w-12 h-12 rounded-full glass flex items-center justify-center text-accent">
                <Clock size={20} />
              </div>
              <div>
                <p className="text-sm tracking-wide uppercase text-text-muted mb-1">{t("contact.response_label")}</p>
                <p className="font-medium text-foreground">{t("contact.response_value")}</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="glass-card">
            <CardContent className="p-8">
              {isSuccess ? (
                <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center text-accent mb-4">
                    <CheckCircle2 size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">{t("contact.success_title")}</h3>
                  <p className="text-text-secondary">
                    {t("contact.success_msg")}
                  </p>
                  <Button 
                    className="mt-8" 
                    variant="outline" 
                    onClick={() => setIsSuccess(false)}
                  >
                    {t("contact.send_another")}
                  </Button>
                </div>
              ) : (
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-text-secondary">{t("contact.form_name")}</label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name"
                      className="w-full bg-background/50 border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                      placeholder="John Doe"
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-text-secondary">{t("contact.form_email")}</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email"
                      className="w-full bg-background/50 border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                      placeholder="john@example.com"
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium text-text-secondary">{t("contact.form_message")}</label>
                    <textarea 
                      id="message" 
                      name="message"
                      rows={5}
                      className="w-full bg-background/50 border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all resize-none"
                      placeholder={t("contact.form_message_placeholder")}
                      required
                      disabled={isSubmitting}
                    ></textarea>
                  </div>

                  {error && (
                    <p className="text-red-500 text-sm mt-2">{error}</p>
                  )}
                  
                  <Button 
                    type="submit" 
                    className="w-full group" 
                    size="lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? t("contact.form_sending") : t("contact.form_send")}
                    {!isSubmitting && <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
