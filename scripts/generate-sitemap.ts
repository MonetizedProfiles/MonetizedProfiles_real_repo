/**
 * Build-time sitemap generator
 * 
 * This script fetches all products and blog articles from Shopify
 * and generates a static sitemap.xml file in the public folder.
 * 
 * Run with: npx tsx scripts/generate-sitemap.ts
 */

import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Shopify API Configuration
const SHOPIFY_API_VERSION = '2025-07';
const SHOPIFY_STORE_PERMANENT_DOMAIN = 'checkout.monetizedprofiles.com';
const SHOPIFY_STOREFRONT_URL = `https://${SHOPIFY_STORE_PERMANENT_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`;
const SHOPIFY_STOREFRONT_TOKEN = 'beb3421674f494516a8b32b21007d94a';

// Site Configuration
const SITE_URL = 'https://monetizedprofiles.com';

interface ShopifyProduct {
  node: {
    handle: string;
    updatedAt: string;
  };
}

interface ShopifyArticle {
  node: {
    handle: string;
    publishedAt: string;
    blog: {
      handle: string;
    };
  };
}

async function fetchFromShopify(query: string): Promise<any> {
  const response = await fetch(SHOPIFY_STOREFRONT_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_TOKEN,
    },
    body: JSON.stringify({ query }),
  });

  if (!response.ok) {
    throw new Error(`Shopify API error: ${response.status}`);
  }

  return response.json();
}

async function fetchProducts(): Promise<ShopifyProduct[]> {
  const query = `
    query GetAllProducts {
      products(first: 250) {
        edges {
          node {
            handle
            updatedAt
          }
        }
      }
    }
  `;

  const data = await fetchFromShopify(query);
  
  if (data.errors) {
    console.error('Products query errors:', data.errors);
    return [];
  }

  return data?.data?.products?.edges || [];
}

async function fetchArticles(): Promise<ShopifyArticle[]> {
  const query = `
    query GetAllArticles {
      articles(first: 250, sortKey: PUBLISHED_AT, reverse: true) {
        edges {
          node {
            handle
            publishedAt
            blog {
              handle
            }
          }
        }
      }
    }
  `;

  const data = await fetchFromShopify(query);
  
  if (data.errors) {
    console.error('Articles query errors:', data.errors);
    return [];
  }

  return data?.data?.articles?.edges || [];
}

function generateSitemapXML(
  products: ShopifyProduct[],
  articles: ShopifyArticle[]
): string {
  const currentDate = new Date().toISOString().split('T')[0];

  // Static pages
  const staticPages = [
    { loc: `${SITE_URL}/`, priority: '1.0', changefreq: 'daily' },
    { loc: `${SITE_URL}/blog`, priority: '0.8', changefreq: 'weekly' },
    { loc: `${SITE_URL}/affiliate`, priority: '0.7', changefreq: 'monthly' },
    { loc: `${SITE_URL}/contact`, priority: '0.6', changefreq: 'monthly' },
    { loc: `${SITE_URL}/order-tracking`, priority: '0.5', changefreq: 'monthly' },
    { loc: `${SITE_URL}/privacy-policy`, priority: '0.3', changefreq: 'yearly' },
    { loc: `${SITE_URL}/terms-of-service`, priority: '0.3', changefreq: 'yearly' },
    { loc: `${SITE_URL}/refund-policy`, priority: '0.3', changefreq: 'yearly' },
  ];

  let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
  sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  // Add static pages
  for (const page of staticPages) {
    sitemap += '  <url>\n';
    sitemap += `    <loc>${page.loc}</loc>\n`;
    sitemap += `    <lastmod>${currentDate}</lastmod>\n`;
    sitemap += `    <changefreq>${page.changefreq}</changefreq>\n`;
    sitemap += `    <priority>${page.priority}</priority>\n`;
    sitemap += '  </url>\n';
  }

  // Add product pages
  for (const product of products) {
    const handle = product.node.handle;
    const updatedAt = product.node.updatedAt
      ? new Date(product.node.updatedAt).toISOString().split('T')[0]
      : currentDate;

    sitemap += '  <url>\n';
    sitemap += `    <loc>${SITE_URL}/products/${handle}</loc>\n`;
    sitemap += `    <lastmod>${updatedAt}</lastmod>\n`;
    sitemap += '    <changefreq>weekly</changefreq>\n';
    sitemap += '    <priority>0.9</priority>\n';
    sitemap += '  </url>\n';
  }

  // Add blog post pages
  for (const article of articles) {
    const handle = article.node.handle;
    const publishedAt = article.node.publishedAt
      ? new Date(article.node.publishedAt).toISOString().split('T')[0]
      : currentDate;

    sitemap += '  <url>\n';
    sitemap += `    <loc>${SITE_URL}/blog/${handle}</loc>\n`;
    sitemap += `    <lastmod>${publishedAt}</lastmod>\n`;
    sitemap += '    <changefreq>monthly</changefreq>\n';
    sitemap += '    <priority>0.8</priority>\n';
    sitemap += '  </url>\n';
  }

  sitemap += '</urlset>';

  return sitemap;
}

async function main() {
  console.log('🗺️  Generating sitemap...');

  try {
    // Fetch data from Shopify in parallel
    const [products, articles] = await Promise.all([
      fetchProducts(),
      fetchArticles(),
    ]);

    console.log(`📦 Found ${products.length} products`);
    console.log(`📝 Found ${articles.length} blog articles`);

    // Generate sitemap XML
    const sitemap = generateSitemapXML(products, articles);

    // Write to public folder
    const outputPath = join(__dirname, '..', 'public', 'sitemap.xml');
    writeFileSync(outputPath, sitemap, 'utf-8');

    const totalUrls = 8 + products.length + articles.length; // 8 static pages
    console.log(`✅ Sitemap generated with ${totalUrls} URLs`);
    console.log(`📁 Saved to: ${outputPath}`);
  } catch (error) {
    console.error('❌ Error generating sitemap:', error);
    process.exit(1);
  }
}

main();
