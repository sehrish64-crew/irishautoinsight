export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Irishautoinsights.com',
    url: 'https://irishautoinsights.com',
    logo: 'https://irishautoinsights.com/favicon.ico',
    description: "Trust data, not words. Check any car's history in seconds",
    sameAs: [],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      availableLanguage: ['en'],
    },
  };
}

export function getLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Irishautoinsights.com',
    description: "Trust data, not words. Check any car's history in seconds",
    image: 'https://irishautoinsights.com/favicon.ico',
    url: 'https://irishautoinsights.com',
    priceRange: '$$',
    areaServed: {
      '@type': 'Country',
      name: 'Global',
    },
    serviceType: 'Digital pdf reports',
  };
}

export function getProductSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'Car History Report',
    description: "Complete vehicle history check from 900+ global databases",
    brand: {
      '@type': 'Brand',
      name: 'Irishautoinsights.com',
    },
    offers: {
      '@type': 'AggregateOffer',
      availability: 'https://schema.org/InStock',
      priceCurrency: 'EUR',
      offerCount: '3',
    },
  };
}

export function getFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function getArticleSchema(article: {
  title: string;
  description: string;
  image?: string;
  datePublished?: string;
  author?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    image: article.image || 'https://irishautoinsights.com/favicon.ico',
    datePublished: article.datePublished || new Date().toISOString(),
    author: {
      '@type': 'Organization',
      name: article.author || 'Irishautoinsights.com',
    },
  };
}
