import type { Metadata } from 'next';
import { SITE_NAME, SITE_URL, SITE_DESCRIPTION } from './constants';
import type { ShopifyProduct } from './shopify';

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    publisher: { '@type': 'Organization', name: SITE_NAME },
    potentialAction: {
      '@type': 'SearchAction',
      target: { '@type': 'EntryPoint', urlTemplate: `${SITE_URL}/collections/all?q={search_term_string}` },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function buildMetadata(overrides: Partial<Metadata> & { path?: string } = {}): Metadata {
  const { path = '', ...rest } = overrides;
  const url = `${SITE_URL}${path}`;

  return {
    metadataBase: new URL(SITE_URL),
    title: rest.title ? `${rest.title} | ${SITE_NAME}` : `${SITE_NAME} — ${rest.description || SITE_DESCRIPTION}`,
    description: (rest.description as string) || SITE_DESCRIPTION,
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      url,
      siteName: SITE_NAME,
      title: (rest.title as string) || SITE_NAME,
      description: (rest.description as string) || SITE_DESCRIPTION,
      images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630 }],
      ...(rest.openGraph || {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: (rest.title as string) || SITE_NAME,
      description: (rest.description as string) || SITE_DESCRIPTION,
      images: [`${SITE_URL}/og-image.jpg`],
      ...(rest.twitter || {}),
    },
    robots: { index: true, follow: true },
    ...rest,
  };
}

export function productJsonLd(product: ShopifyProduct, reviews?: { count: number; average: number }) {
  const offers = product.variants.map((v) => ({
    '@type': 'Offer',
    url: `${SITE_URL}/products/${product.handle}`,
    priceCurrency: v.price.currencyCode,
    price: v.price.amount,
    availability: v.availableForSale
      ? 'https://schema.org/InStock'
      : 'https://schema.org/OutOfStock',
    itemCondition: 'https://schema.org/NewCondition',
    seller: { '@type': 'Organization', name: SITE_NAME },
    ...(v.title !== 'Default Title' ? { name: v.title } : {}),
  }));

  const jsonLd: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.description,
    url: `${SITE_URL}/products/${product.handle}`,
    sku: product.handle,
    brand: { '@type': 'Brand', name: SITE_NAME },
    offers: offers.length === 1 ? offers[0] : { '@type': 'AggregateOffer', lowPrice: product.priceRange.minVariantPrice.amount, highPrice: product.priceRange.maxVariantPrice.amount, priceCurrency: product.priceRange.minVariantPrice.currencyCode, offerCount: offers.length, offers },
  };

  if (product.images.length > 0) {
    jsonLd.image = product.images.map((img) => img.url);
  }

  if (reviews && reviews.count > 0) {
    jsonLd.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: reviews.average.toFixed(2),
      reviewCount: reviews.count,
      bestRating: 5,
      worstRating: 1,
    };
  }

  return jsonLd;
}

export function breadcrumbJsonLd(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function faqJsonLd(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };
}

export function articleJsonLd(article: {
  title: string;
  excerpt: string | null;
  contentHtml: string;
  publishedAt: string;
  image: { url: string } | null;
  author: { name: string };
  blog: { handle: string };
  handle: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    description: article.excerpt || article.title,
    datePublished: article.publishedAt,
    dateModified: article.publishedAt,
    author: { '@type': 'Person', name: article.author.name },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.webp` },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/blog/${article.blog.handle}/${article.handle}`,
    },
    ...(article.image ? { image: article.image.url } : {}),
  };
}

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.webp`,
    sameAs: [
      'https://www.youtube.com/@MonetizedProfiles',
      'https://www.tiktok.com/@monetizedprofiles',
      'https://www.instagram.com/monetizedprofiles/',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      url: `${SITE_URL}/contact`,
    },
  };
}

export function collectionPageJsonLd(collection: {
  name: string;
  description: string;
  url: string;
  items: Array<{ name: string; url: string; image?: string; position: number }>;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: collection.name,
    description: collection.description,
    url: collection.url,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: collection.items.length,
      itemListElement: collection.items.map((item) => ({
        '@type': 'ListItem',
        position: item.position,
        url: item.url,
        name: item.name,
        ...(item.image ? { image: item.image } : {}),
      })),
    },
  };
}

export function guideArticleJsonLd(guide: {
  title: string;
  description: string;
  slug: string;
  datePublished: string;
  dateModified: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: guide.title,
    description: guide.description,
    datePublished: guide.datePublished,
    dateModified: guide.dateModified,
    author: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.webp` },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/guides/${guide.slug}`,
    },
  };
}
