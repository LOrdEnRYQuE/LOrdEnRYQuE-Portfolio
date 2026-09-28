import { siteConfig } from "@/content/site";
import { demoBranches } from "@/content/demoBranches";

const mapsUrl = "https://maps.google.com/maps?cid=17178963251656659628";

export default function JSONLD() {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": siteConfig.brand,
    "url": siteConfig.domain,
    "description": siteConfig.bio,
    "inLanguage": ["de-DE", "en"],
    "author": {
      "@type": "Person",
      "name": siteConfig.name,
      "jobTitle": siteConfig.role
    }
  };

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": siteConfig.name,
    "url": siteConfig.domain,
    "jobTitle": siteConfig.role,
    "description": siteConfig.bio,
    "image": `${siteConfig.domain}/images/profile/Profile.jpg`,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Landshut",
      "postalCode": "84028",
      "addressRegion": "Bayern",
      "addressCountry": "DE"
    },
    "knowsAbout": [
      "Web Design",
      "Web Development",
      "Local SEO",
      "Full Stack Development",
      "AI Integration",
      "E-Commerce",
      "UI/UX Design",
      "Business Automation",
      "Next.js",
      "TypeScript"
    ],
    "sameAs": [
      siteConfig.socials.github,
      siteConfig.socials.linkedin,
      siteConfig.socials.twitter
    ].filter(Boolean)
  };

  const businessSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${siteConfig.domain}/#business`,
    "name": "LOrdEnRYQuE | Advanced Digital Solution",
    "description": siteConfig.bio,
    "url": siteConfig.domain,
    "email": siteConfig.email,
    "telephone": "+49 172 2620671",
    "hasMap": mapsUrl,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Landshut",
      "postalCode": "84028",
      "addressRegion": "Bayern",
      "addressCountry": "DE"
    },
    "areaServed": [
      {
        "@type": "City",
        "name": "Landshut"
      },
      {
        "@type": "AdministrativeArea",
        "name": "Bayern"
      }
    ],
    "knowsAbout": [
      "Webdesign",
      "Webentwicklung",
      "Lokale Suchmaschinenoptimierung",
      "Technische SEO",
      "E-Commerce",
      "UI/UX Design",
      "Individuelle Softwareentwicklung",
      "KI-Automatisierung",
      "Website-Wartung"
    ],
    "offers": {
      "@type": "OfferCatalog",
      "name": "Digitale Dienstleistungen",
      "itemListElement": [
        "Webdesign & Website-Erstellung",
        "Webentwicklung & Web-Apps",
        "Lokale & technische SEO",
        "E-Commerce & Online-Shops",
        "KI-Lösungen & Prozessautomatisierung",
        "Website-Wartung & Optimierung",
        "UI/UX Design & Prototyping",
        "Individuelle Softwareentwicklung"
      ].map((name) => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": name,
          "provider": { "@id": `${siteConfig.domain}/#business` },
          "areaServed": "Landshut, Bayern"
        }
      }))
    }
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Interactive Software Prototypes",
    "description": "High-fidelity interactive MVP demos built by LOrdEnRYQuE.",
    "numberOfItems": demoBranches.length,
    "itemListElement": demoBranches.map((demo, index) => ({
      "@type": "SoftwareApplication",
      "position": index + 1,
      "name": demo.title,
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Web",
      "description": demo.summary
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify([websiteSchema, personSchema, businessSchema, softwareSchema]) }}
    />
  );
}
