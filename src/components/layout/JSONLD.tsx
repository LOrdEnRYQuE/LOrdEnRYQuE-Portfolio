import { siteConfig } from "@/content/site";
import { demoBranches } from "@/content/demoBranches";

export default function JSONLD() {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": siteConfig.name,
    "url": siteConfig.domain,
    "description": siteConfig.bio,
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
    "image": `${siteConfig.domain}/images/profiles/attila.jpg`,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Munich",
      "addressCountry": "DE"
    },
    "knowsAbout": ["Software Engineering", "AI Agent Development", "Full Stack Development", "Product Strategy", "React Development", "Next.js", "TypeScript", "Machine Learning", "SaaS Development"],
    "sameAs": [
      siteConfig.socials.github,
      siteConfig.socials.linkedin,
      siteConfig.socials.twitter
    ].filter(Boolean),
    "offers": {
      "@type": "Offer",
      "serviceType": "AI Development Services",
      "description": "Custom AI-powered applications, MVP development, and web solutions",
      "availableChannel": {
        "@type": "ServiceChannel",
        "serviceUrl": siteConfig.domain,
        "servicePhone": siteConfig.email
      }
    }
  };

  const businessSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: siteConfig.brand,
    description: 'AI-driven web experiences and conversion-focused development for modern businesses',
    url: siteConfig.domain,
    email: siteConfig.email,
    knowsAbout: [
      'Web Development',
      'Mobile App Development', 
      'AI Integration',
      'Full-Stack Development',
      'React Development',
      'Next.js Development',
      'TypeScript Development',
      'E-commerce Development',
      'Real Estate Websites',
      'Restaurant Applications',
      'Healthcare Software',
      'Business Automation',
      'Progressive Web Apps',
      'API Development',
      'Database Design',
      'Cloud Architecture',
      'Performance Optimization',
      'SEO Optimization',
      'UI/UX Design',
      'Product Development',
      'MVP Development'
    ],
    offersService: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Custom Website Development',
          description: 'Professional websites for businesses with modern design, SEO optimization, and conversion-focused features'
        },
        areaServed: 'Germany'
      },
      {
        '@type': 'Offer', 
        itemOffered: {
          '@type': 'Service',
          name: 'Mobile App Development',
          description: 'Native and cross-platform mobile applications for iOS and Android with AI integration capabilities'
        },
        areaServed: 'Germany'
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service', 
          name: 'AI Integration Services',
          description: 'AI-powered features including chatbots, recommendation systems, and automated workflows for business optimization'
        },
        areaServed: 'Germany'
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'E-commerce Solutions',
          description: 'Complete online stores with payment processing, inventory management, and customer experience optimization'
        },
        areaServed: 'Germany'
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Real Estate Websites',
          description: 'Property listing platforms with virtual tours, lead capture, and MLS integration for real estate professionals'
        },
        areaServed: 'Germany'
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Restaurant Applications',
          description: 'Online ordering systems, reservation platforms, and customer loyalty apps for food service businesses'
        },
        areaServed: 'Germany'
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Healthcare Software',
          description: 'HIPAA-compliant applications for patient management, telemedicine, and healthcare automation'
        },
        areaServed: 'Germany'
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Business Process Automation',
          description: 'Custom software solutions to automate workflows, reduce costs, and improve operational efficiency'
        },
        areaServed: 'Germany'
      }
    ],
    areaServed: {
      '@type': 'Country',
      name: 'Germany'
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
      dangerouslySetInnerHTML={{ __html: JSON.stringify([websiteSchema, personSchema, softwareSchema, businessSchema]) }}
    />
  );
}
