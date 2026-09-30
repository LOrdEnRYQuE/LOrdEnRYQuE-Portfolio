import type { Metadata } from "next";
import { constructMetadata } from "@/lib/seo";
import CommercialServices from "@/components/sections/CommercialServices";

export const metadata: Metadata = constructMetadata({
  title: "Webdesign, Local SEO & Automatisierung – Leistungen",
  description:
    "Klare digitale Angebote für Unternehmen: individuelle Business Websites, Local Growth mit SEO und Google Business Profile sowie Web-Apps und Automatisierungen.",
  keywords: [
    "Webdesign Landshut",
    "Webentwicklung Landshut",
    "SEO Landshut",
    "Website erstellen lassen",
    "KI Automatisierung",
    "Business Website",
  ],
  canonical: "/services",
});

export default function ServicesPage() {
  return <CommercialServices />;
}
