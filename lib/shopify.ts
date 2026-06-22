const SHOPIFY_API_VERSION = '2025-07';
const SHOPIFY_STORE_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN || process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || 'checkout.monetizedprofiles.com';
const SHOPIFY_STOREFRONT_TOKEN = process.env.SHOPIFY_STOREFRONT_TOKEN || process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN || '';

const STOREFRONT_URL = `https://${SHOPIFY_STORE_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`;

export interface ShopifyImage {
  url: string;
  altText: string | null;
  width?: number;
  height?: number;
}

export interface ShopifyVariant {
  id: string;
  title: string;
  price: { amount: string; currencyCode: string };
  compareAtPrice: { amount: string; currencyCode: string } | null;
  availableForSale: boolean;
  quantityAvailable: number | null;
  selectedOptions: Array<{ name: string; value: string }>;
}

export interface ShopifyProduct {
  id: string;
  title: string;
  description: string;
  descriptionHtml: string;
  handle: string;
  priceRange: {
    minVariantPrice: { amount: string; currencyCode: string };
    maxVariantPrice: { amount: string; currencyCode: string };
  };
  images: ShopifyImage[];
  variants: ShopifyVariant[];
  options: Array<{ name: string; values: string[] }>;
  seo: { title: string | null; description: string | null };
  tags: string[];
  vendor: string;
  productType: string;
  createdAt: string;
  updatedAt: string;
}

export interface ShopifyCollection {
  id: string;
  title: string;
  description: string;
  handle: string;
  image: ShopifyImage | null;
  products: ShopifyProduct[];
  seo: { title: string | null; description: string | null };
}

async function storefrontFetch<T>(query: string, variables: Record<string, unknown> = {}): Promise<T> {
  const res = await fetch(STOREFRONT_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(`Shopify API error: ${res.status} ${res.statusText}`);
  }

  const json = await res.json();
  if (json.errors) {
    throw new Error(json.errors.map((e: { message: string }) => e.message).join(', '));
  }

  return json.data;
}

const PRODUCT_FRAGMENT = `
  fragment ProductFields on Product {
    id
    title
    description
    descriptionHtml
    handle
    vendor
    productType
    tags
    createdAt
    updatedAt
    seo { title description }
    priceRange {
      minVariantPrice { amount currencyCode }
      maxVariantPrice { amount currencyCode }
    }
    images(first: 10) {
      edges {
        node { url altText width height }
      }
    }
    variants(first: 20) {
      edges {
        node {
          id
          title
          price { amount currencyCode }
          compareAtPrice { amount currencyCode }
          availableForSale
          quantityAvailable
          selectedOptions { name value }
        }
      }
    }
    options { name values }
  }
`;

function normalizeProduct(raw: any): ShopifyProduct {
  return {
    ...raw,
    images: raw.images.edges.map((e: any) => e.node),
    variants: raw.variants.edges.map((e: any) => e.node),
  };
}

export async function getProducts(first = 20): Promise<ShopifyProduct[]> {
  const data = await storefrontFetch<any>(`
    ${PRODUCT_FRAGMENT}
    query GetProducts($first: Int!) {
      products(first: $first) {
        edges { node { ...ProductFields } }
      }
    }
  `, { first });

  return data.products.edges.map((e: any) => normalizeProduct(e.node));
}

export async function getProductByHandle(handle: string): Promise<ShopifyProduct | null> {
  const data = await storefrontFetch<any>(`
    ${PRODUCT_FRAGMENT}
    query GetProductByHandle($handle: String!) {
      productByHandle(handle: $handle) { ...ProductFields }
    }
  `, { handle });

  if (!data.productByHandle) return null;
  return normalizeProduct(data.productByHandle);
}

export async function getProductHandles(): Promise<string[]> {
  const data = await storefrontFetch<any>(`
    query { products(first: 100) { edges { node { handle } } } }
  `);
  return data.products.edges.map((e: any) => e.node.handle);
}

export async function createCart(lines: Array<{ merchandiseId: string; quantity: number; attributes?: Array<{ key: string; value: string }> }>) {
  const data = await storefrontFetch<any>(`
    mutation cartCreate($input: CartInput!) {
      cartCreate(input: $input) {
        cart { id checkoutUrl }
        userErrors { field message }
      }
    }
  `, { input: { lines } });

  if (data.cartCreate.userErrors.length > 0) {
    throw new Error(data.cartCreate.userErrors.map((e: any) => e.message).join(', '));
  }

  const cart = data.cartCreate.cart;
  const url = new URL(cart.checkoutUrl);
  url.hostname = SHOPIFY_STORE_DOMAIN;
  url.protocol = 'https:';
  url.searchParams.set('channel', 'online_store');

  return { id: cart.id, checkoutUrl: url.toString() };
}

export function formatPrice(amount: string, currencyCode = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
  }).format(parseFloat(amount));
}

// ─── Blog / Articles ───────────────────────────────────────────────

export interface ShopifyArticle {
  id: string;
  title: string;
  handle: string;
  excerpt: string | null;
  contentHtml: string;
  publishedAt: string;
  image: ShopifyImage | null;
  author: { name: string };
  blog: { title: string; handle: string };
  tags: string[];
  seo: { title: string | null; description: string | null };
}

export async function getArticles(first = 100): Promise<ShopifyArticle[]> {
  try {
    const data = await storefrontFetch<any>(`
      query GetArticles($first: Int!) {
        articles(first: $first, sortKey: PUBLISHED_AT, reverse: true) {
          edges {
            node {
              id
              title
              handle
              excerpt
              contentHtml
              publishedAt
              tags
              seo { title description }
              image { url altText width height }
              author { name }
              blog { title handle }
            }
          }
        }
      }
    `, { first });

    return data.articles.edges.map((e: any) => e.node);
  } catch {
    return [];
  }
}

export async function getArticleByHandle(blogHandle: string, articleHandle: string): Promise<ShopifyArticle | null> {
  try {
    const data = await storefrontFetch<any>(`
      query GetArticle($blogHandle: String!, $articleHandle: String!) {
        blog(handle: $blogHandle) {
          articleByHandle(handle: $articleHandle) {
            id
            title
            handle
            excerpt
            contentHtml
            publishedAt
            tags
            seo { title description }
            image { url altText width height }
            author { name }
            blog { title handle }
          }
        }
      }
    `, { blogHandle, articleHandle });

    return data.blog?.articleByHandle || null;
  } catch {
    return null;
  }
}

export async function getArticleHandles(): Promise<Array<{ blogHandle: string; articleHandle: string }>> {
  try {
    const data = await storefrontFetch<any>(`
      query { articles(first: 250, sortKey: PUBLISHED_AT, reverse: true) {
        edges { node { handle blog { handle } } }
      }}
    `);

    return data.articles.edges.map((e: any) => ({
      blogHandle: e.node.blog.handle,
      articleHandle: e.node.handle,
    }));
  } catch {
    return [];
  }
}

// ─── Collections ───────────────────────────────────────────────────

export async function getCollections(first = 20): Promise<ShopifyCollection[]> {
  try {
    const data = await storefrontFetch<any>(`
      query GetCollections($first: Int!) {
        collections(first: $first) {
          edges {
            node {
              id
              title
              description
              handle
              image { url altText width height }
              seo { title description }
              products(first: 20) {
                edges { node { handle } }
              }
            }
          }
        }
      }
    `);

    return data.collections.edges.map((e: any) => ({
      ...e.node,
      image: e.node.image || null,
      products: e.node.products.edges.map((pe: any) => pe.node),
    }));
  } catch {
    return [];
  }
}

export async function getCollectionHandles(): Promise<string[]> {
  try {
    const data = await storefrontFetch<any>(`
      query { collections(first: 50) { edges { node { handle } } } }
    `);
    return data.collections.edges.map((e: any) => e.node.handle);
  } catch {
    return [];
  }
}
