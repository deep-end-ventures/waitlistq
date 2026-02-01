export function WebsiteJsonLd() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://waitlistq.deependventures.com";

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${baseUrl}/#website`,
        url: baseUrl,
        name: "WaitlistQ",
        description: "Create embeddable waitlists with built-in referral tracking. Users share to move up the list.",
        publisher: {
          "@type": "Organization",
          "@id": `${baseUrl}/#organization`,
        },
      },
      {
        "@type": "Organization",
        "@id": `${baseUrl}/#organization`,
        name: "WaitlistQ",
        url: baseUrl,
        logo: {
          "@type": "ImageObject",
          url: `${baseUrl}/og-image.png`,
          width: 1200,
          height: 630,
        },
        parentOrganization: {
          "@type": "Organization",
          name: "Deep End Ventures",
          url: "https://deependventures.com",
        },
      },
      {
        "@type": "SoftwareApplication",
        name: "WaitlistQ",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
          description: "Free to start — viral waitlists with referral tracking",
        },
        description: "Viral waitlist widget with built-in referral tracking. Users share to move up the list.",
        url: baseUrl,
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function BlogPostJsonLd({
  title,
  description,
  date,
  slug,
}: {
  title: string;
  description: string;
  date: string;
  slug: string;
}) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://waitlistq.deependventures.com";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    datePublished: date,
    dateModified: date,
    url: `${baseUrl}/blog/${slug}`,
    publisher: {
      "@type": "Organization",
      name: "WaitlistQ",
      url: baseUrl,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${baseUrl}/blog/${slug}`,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
