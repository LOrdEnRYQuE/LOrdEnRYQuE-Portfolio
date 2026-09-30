import type { Metadata } from "next";
import { constructMetadata } from "@/lib/seo";
import CommercialServices from "@/components/sections/CommercialServices";

export const metadata: Metadata = constructMetadata({
  title: "Web Design, Local SEO & Automation Services",
  description:
    "Clear digital offers for businesses: custom business websites, local growth with SEO and Google Business Profile, plus web apps and automation.",
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
