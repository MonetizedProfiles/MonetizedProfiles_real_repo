import { corsHeaders } from '../_shared/cors.ts';

const SHOPIFY_API_VERSION = '2025-07';
const SHOPIFY_STORE_PERMANENT_DOMAIN = '1e3fcb-4e.myshopify.com';
const SHOPIFY_STOREFRONT_URL = `https://${SHOPIFY_STORE_PERMANENT_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`;

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const storefrontToken = Deno.env.get('SHOPIFY_STOREFRONT_ACCESS_TOKEN');
    
    if (!storefrontToken) {
      throw new Error('SHOPIFY_STOREFRONT_ACCESS_TOKEN not configured');
    }

    // Fetch all products from Shopify
    const productsQuery = `
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

    // Fetch all blog articles from Shopify
    const articlesQuery = `
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

    // Fetch products and articles in parallel
    const [productsResponse, articlesResponse] = await Promise.all([
      fetch(SHOPIFY_STOREFRONT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Storefront-Access-Token': storefrontToken,
        },
        body: JSON.stringify({ query: productsQuery }),
      }),
      fetch(SHOPIFY_STOREFRONT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Storefront-Access-Token': storefrontToken,
        },
        body: JSON.stringify({ query: articlesQuery }),
      }),
    ]);

    const [productsData, articlesData] = await Promise.all([
      productsResponse.json(),
      articlesResponse.json(),
    ]);

    const products = productsData?.data?.products?.edges || [];
    const articles = articlesData?.data?.articles?.edges || [];

    // Static pages configuration
    const staticPages = [
      { loc: 'https://monetizedprofiles.com/', priority: '1.0', changefreq: 'daily' },
      { loc: 'https://monetizedprofiles.com/blog', priority: '0.8', changefreq: 'weekly' },
      { loc: 'https://monetizedprofiles.com/affiliate', priority: '0.7', changefreq: 'monthly' },
      { loc: 'https://monetizedprofiles.com/contact', priority: '0.6', changefreq: 'monthly' },
      { loc: 'https://monetizedprofiles.com/privacy-policy', priority: '0.3', changefreq: 'yearly' },
      { loc: 'https://monetizedprofiles.com/terms-of-service', priority: '0.3', changefreq: 'yearly' },
      { loc: 'https://monetizedprofiles.com/refund-policy', priority: '0.3', changefreq: 'yearly' },
    ];

    // Generate sitemap XML
    const currentDate = new Date().toISOString().split('T')[0];
    
    let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
    sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    // Add static pages
    staticPages.forEach(page => {
      sitemap += '  <url>\n';
      sitemap += `    <loc>${page.loc}</loc>\n`;
      sitemap += `    <lastmod>${currentDate}</lastmod>\n`;
      sitemap += `    <changefreq>${page.changefreq}</changefreq>\n`;
      sitemap += `    <priority>${page.priority}</priority>\n`;
      sitemap += '  </url>\n';
    });

    // Add product pages
    products.forEach((product: any) => {
      const handle = product.node.handle;
      const updatedAt = product.node.updatedAt ? new Date(product.node.updatedAt).toISOString().split('T')[0] : currentDate;
      
      sitemap += '  <url>\n';
      sitemap += `    <loc>https://monetizedprofiles.com/products/${handle}</loc>\n`;
      sitemap += `    <lastmod>${updatedAt}</lastmod>\n`;
      sitemap += '    <changefreq>weekly</changefreq>\n';
      sitemap += '    <priority>0.9</priority>\n';
      sitemap += '  </url>\n';
    });

    // Add blog post pages
    articles.forEach((article: any) => {
      const handle = article.node.handle;
      const publishedAt = article.node.publishedAt 
        ? new Date(article.node.publishedAt).toISOString().split('T')[0] 
        : currentDate;
      
      sitemap += '  <url>\n';
      sitemap += `    <loc>https://monetizedprofiles.com/blog/${handle}</loc>\n`;
      sitemap += `    <lastmod>${publishedAt}</lastmod>\n`;
      sitemap += '    <changefreq>monthly</changefreq>\n';
      sitemap += '    <priority>0.8</priority>\n';
      sitemap += '  </url>\n';
    });

    sitemap += '</urlset>';

    console.log(`Generated sitemap with ${products.length} products and ${articles.length} blog posts`);

    return new Response(sitemap, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
      },
    });
  } catch (error) {
    console.error('Error generating sitemap:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    
    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
