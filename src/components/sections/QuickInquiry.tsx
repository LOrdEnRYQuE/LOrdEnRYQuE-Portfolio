"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Mail, Phone, Send } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { trackAnalyticsEvent } from "@/lib/client-analytics";

type QuickInquiryData = {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  privacyAccepted: boolean;
};

const INITIAL_DATA: QuickInquiryData = {
  name: "",
  email: "",
  phone: "",
  service: "webdesign",
  message: "",
  privacyAccepted: false,
};

export default function QuickInquiry() {
  const { locale } = useI18n();
  const isDe = locale === "de";
  const [data, setData] = useState<QuickInquiryData>(INITIAL_DATA);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
  const [hasStarted, setHasStarted] = useState(false);

  const copy = isDe
    ? {
        eyebrow: "Schnellanfrage",
        title: "In etwa 60 Sekunden anfragen",
        description:
          "Für Website, SEO, E-Commerce oder Automatisierung reicht eine kurze Nachricht. Für komplexere Vorhaben steht darunter weiterhin der ausführliche Projektplaner bereit.",
        name: "Name",
        email: "E-Mail",
        phone: "Telefon (optional)",
        service: "Worum geht es?",
        message: "Kurz beschreiben, was Sie benötigen",
        privacy: "Ich habe die Datenschutzerklärung gelesen und stimme der Verarbeitung meiner Angaben zur Bearbeitung dieser Anfrage zu.",
        submit: "Anfrage senden",
        sending: "Wird gesendet...",
        successTitle: "Anfrage ist angekommen.",
        successText: "Vielen Dank. Ich melde mich so schnell wie möglich mit dem sinnvollsten nächsten Schritt.",
        another: "Neue Anfrage",
        error: "Die Anfrage konnte nicht gesendet werden. Bitte versuchen Sie es erneut oder nutzen Sie WhatsApp/E-Mail.",
        services: {
          webdesign: "Webdesign / neue Website",
          relaunch: "Website-Relaunch",
          seo: "SEO / Google Sichtbarkeit",
          ecommerce: "Online-Shop / E-Commerce",
          automation: "KI / Automatisierung",
          software: "Individuelle Software",
          other: "Etwas anderes",
        },
      }
    : {
        eyebrow: "Quick inquiry",
        title: "Send your request in about 60 seconds",
        description:
          "For a website, SEO, e-commerce or automation request, a short message is enough. The detailed project planner remains available below for more complex projects.",
        name: "Name",
        email: "Email",
        phone: "Phone (optional)",
        service: "What do you need?",
        message: "Briefly describe what you need",
        privacy: "I have read the Privacy Policy and agree to the processing of my details to handle this inquiry.",
        submit: "Send inquiry",
        sending: "Sending...",
        successTitle: "Your inquiry is in.",
        successText: "Thank you. I will get back to you as quickly as possible with the most useful next step.",
        another: "Send another inquiry",
        error: "The inquiry could not be sent. Please try again or use WhatsApp/email.",
        services: {
          webdesign: "Web design / new website",
          relaunch: "Website relaunch",
          seo: "SEO / Google visibility",
          ecommerce: "Online shop / e-commerce",
          automation: "AI / automation",
          software: "Custom software",
          other: "Something else",
        },
      };

  const startTracking = () => {
    if (hasStarted) return;
    setHasStarted(true);
    trackAnalyticsEvent("quick_inquiry_start", { form_name: "quick_inquiry" });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (!data.name.trim() || !data.email.trim() || !data.message.trim() || !data.privacyAccepted) {
      return;
    }

    setIsSubmitting(true);

    const serviceLabel = copy.services[data.service as keyof typeof copy.services] || data.service;
    const description = [
      "Source: Quick Inquiry",
      `Service: ${serviceLabel}`,
      data.phone ? `Phone: ${data.phone}` : "Phone: Not provided",
      "",
      data.message.trim(),
    ].join("\n");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name.trim(),
          email: data.email.trim(),
          concept: serviceLabel,
          industry: "local-business",
          description,
          features: "[]",
          timeline: "tbd",
          budget: "custom",
          stack: "Quick Inquiry",
        }),
      });

      if (!response.ok) throw new Error("Submission failed");

      trackAnalyticsEvent("generate_lead", {
        form_name: "quick_inquiry",
        lead_service: data.service,
      });

      setIsSuccess(true);
      setData(INITIAL_DATA);
    } catch {
      setError(copy.error);
      trackAnalyticsEvent("quick_inquiry_error", {
        form_name: "quick_inquiry",
        lead_service: data.service,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="rounded-[32px] border border-emerald-500/20 bg-emerald-500/[0.06] p-8 md:p-10">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-400">
          <CheckCircle2 size={28} />
        </div>
        <h2 className="mt-6 text-2xl font-black text-foreground">{copy.successTitle}</h2>
        <p className="mt-3 max-w-xl leading-relaxed text-text-secondary">{copy.successText}</p>
        <button
          type="button"
          onClick={() => setIsSuccess(false)}
          className="mt-6 inline-flex items-center gap-2 rounded-xl border border-white/10 px-5 py-3 text-sm font-bold text-foreground transition hover:border-accent/40 hover:bg-white/5"
        >
          {copy.another}
          <ArrowRight size={16} />
        </button>
      </div>
    );
  }

  return (
    <section className="rounded-[32px] border border-accent/20 bg-accent/[0.04] p-7 md:p-9">
      <div className="mb-7">
        <p className="text-[10px] font-black uppercase tracking-[0.28em] text-accent">{copy.eyebrow}</p>
        <h2 className="mt-3 text-2xl font-black tracking-tight text-foreground md:text-3xl">{copy.title}</h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-text-secondary">{copy.description}</p>
      </div>

      <form onSubmit={handleSubmit} onFocus={startTracking} className="space-y-5">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="space-y-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-text-muted">{copy.name}</span>
            <input
              required
              value={data.name}
              onChange={(e) => setData((prev) => ({ ...prev, name: e.target.value }))}
              autoComplete="name"
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 text-sm text-foreground outline-none transition focus:border-accent/60"
            />
          </label>

          <label className="space-y-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-text-muted">{copy.email}</span>
            <input
              required
              type="email"
              value={data.email}
              onChange={(e) => setData((prev) => ({ ...prev, email: e.target.value }))}
              autoComplete="email"
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 text-sm text-foreground outline-none transition focus:border-accent/60"
            />
          </label>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="space-y-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-text-muted">{copy.phone}</span>
            <div className="relative">
              <Phone size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
              <input
                type="tel"
                value={data.phone}
                onChange={(e) => setData((prev) => ({ ...prev, phone: e.target.value }))}
                autoComplete="tel"
                className="w-full rounded-2xl border border-white/10 bg-white/5 py-3.5 pl-11 pr-4 text-sm text-foreground outline-none transition focus:border-accent/60"
              />
            </div>
          </label>

          <label className="space-y-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-text-muted">{copy.service}</span>
            <select
              value={data.service}
              onChange={(e) => setData((prev) => ({ ...prev, service: e.target.value }))}
              className="w-full rounded-2xl border border-white/10 bg-[#0A0A0B] px-4 py-3.5 text-sm text-foreground outline-none transition focus:border-accent/60"
            >
              {Object.entries(copy.services).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <label className="space-y-2">
          <span className="text-[10px] font-black uppercase tracking-widest text-text-muted">{copy.message}</span>
          <textarea
            required
            rows={4}
            value={data.message}
            onChange={(e) => setData((prev) => ({ ...prev, message: e.target.value }))}
            className="w-full resize-none rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 text-sm text-foreground outline-none transition focus:border-accent/60"
          />
        </label>

        <label className="flex cursor-pointer items-start gap-3 text-xs leading-relaxed text-text-secondary">
          <input
            required
            type="checkbox"
            checked={data.privacyAccepted}
            onChange={(e) => setData((prev) => ({ ...prev, privacyAccepted: e.target.checked }))}
            className="mt-1 h-4 w-4 accent-current"
          />
          <span>
            {copy.privacy}{" "}
            <Link href="/legal/privacy" className="font-bold text-accent hover:underline">
              {isDe ? "Datenschutz" : "Privacy"}
            </Link>
          </span>
        </label>

        {error && (
          <div className="rounded-2xl border border-red-500/20 bg-red-500/[0.06] px-4 py-3 text-sm text-red-300">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting || !data.privacyAccepted}
          className="inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-accent px-6 py-4 text-sm font-black uppercase tracking-widest text-background transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? (
            <>
              <Mail size={17} />
              {copy.sending}
            </>
          ) : (
            <>
              <Send size={17} />
              {copy.submit}
            </>
          )}
        </button>
      </form>
    </section>
  );
}
