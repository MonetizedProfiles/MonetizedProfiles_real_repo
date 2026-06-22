export const SITE_NAME = 'MonetizedProfiles';
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://monetizedprofiles.com';
export const SITE_DESCRIPTION = 'Buy monetized YouTube channels, TikTok accounts & TikTok Shop affiliate accounts. Fully monetized, organic growth, instant delivery.';
export const SITE_TAGLINE = 'Pre-Monetized Social Media Accounts';

export const PRODUCT_HANDLES = [
  'youtube',
  'aged-youtube',
  'monetized-tiktok-account',
  'tiktok-shop-affiliate-account',
  'uk-tiktok-shop-affiliate-account',
  'aged-instagram-account',
  'niche-list',
] as const;

export const PRODUCT_CATEGORIES = {
  youtube: { name: 'YouTube', handles: ['youtube', 'aged-youtube'] },
  tiktok: { name: 'TikTok', handles: ['monetized-tiktok-account', 'tiktok-shop-affiliate-account', 'uk-tiktok-shop-affiliate-account'] },
  instagram: { name: 'Instagram', handles: ['aged-instagram-account'] },
  extras: { name: 'Extras', handles: ['niche-list'] },
} as const;

export const TRUST_STATS = {
  totalReviews: 1277,
  averageRating: 4.06,
  accountsSold: 12500,
  satisfactionRate: 99,
} as const;

export const NAV_LINKS = [
  { label: 'Products', href: '/collections/all' },
  { label: 'Blog', href: '/blog' },
  { label: 'Affiliate', href: '/affiliate' },
  { label: 'Contact', href: '/contact' },
] as const;

export const CHECKOUT_DOMAIN = 'checkout.monetizedprofiles.com';

export const GA_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-0RMFKZL37H';
export const TAPFILIATE_ID = process.env.NEXT_PUBLIC_TAPFILIATE_ID || '63704-dc0e66';
