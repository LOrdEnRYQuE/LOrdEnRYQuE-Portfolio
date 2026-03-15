import { siteConfig } from "@/content/site";
import type { Metadata } from "next";

export function constructMetadata({
  title,
  description,
  image = "/images/og/default.png",
  icons = "/favicon.ico",
  noIndex = false,
  keywords = [],
}: {
  title?: string;
  description?: string;
  image?: string;
  icons?: string;
  noIndex?: boolean;
  keywords?: string[];
} = {}): Metadata {
  const pageTitle = title ? `${title} | ${siteConfig.brand}` : `${siteConfig.brand} — ${siteConfig.role}`;
  const pageDescription = description || siteConfig.bio;

  const metadata: Metadata = {
    title: pageTitle,
    description: pageDescription,
    keywords: keywords.length > 0 ? keywords : undefined,
    openGraph: {
      type: "website",
      locale: "en_US",
      url: siteConfig.domain,
      title: pageTitle,
      description: pageDescription,
      siteName: siteConfig.brand,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: pageTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
      images: [image],
      creator: siteConfig.socials.twitter ? `@${siteConfig.socials.twitter.split('/').pop()}` : undefined,
    },
    icons,
    metadataBase: new URL(siteConfig.domain),
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };

  return metadata;
}
