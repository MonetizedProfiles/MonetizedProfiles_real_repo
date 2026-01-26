
# Unlisted Bonus Niche Guide Page

## Overview
Create a hidden, unlisted page at `/bonus/top-niches` that displays profitable TikTok and YouTube niches in an organized, branded layout with dropdown/accordion sections. The page will be excluded from search engines and not linked anywhere on the site.

## Page URL
`/bonus/top-niches` - An obscure path that won't be guessed

## Key Features

### 1. SEO Protection (No Indexing)
- Add `noindex, nofollow` meta tag via the SEO component
- The page will NOT be added to the sitemap (the edge function dynamically generates the sitemap from Shopify products/articles only)
- No links to this page from Header, Footer, or any other page

### 2. Page Structure
```
+------------------------------------------+
|            [MonetizedProfiles Logo]       |
|                                          |
|     [Gift icon] Exclusive Bonus Content  |
|                                          |
|  Thanks for subscribing! Here are the    |
|  top profitable niches for 2025.         |
|                                          |
+------------------------------------------+
|                                          |
|  [TikTok icon] TOP TIKTOK NICHES         |
|  ========================================|
|                                          |
|  > [Category 1 - e.g., "Entertainment"]  |
|     - Niche 1                            |
|     - Niche 2                            |
|     ...                                  |
|                                          |
|  > [Category 2 - e.g., "Education"]      |
|     - Niche 1                            |
|     - Niche 2                            |
|     ...                                  |
|                                          |
+------------------------------------------+
|                                          |
|  [YouTube icon] TOP YOUTUBE NICHES       |
|  ========================================|
|                                          |
|  > [Category 1]                          |
|     - Niche 1                            |
|     - Niche 2                            |
|     ...                                  |
|                                          |
|  > [Category 2]                          |
|     - Niche 1                            |
|     - Niche 2                            |
|     ...                                  |
|                                          |
+------------------------------------------+
|                                          |
|  [CTA] Ready to start? Browse our        |
|  monetized accounts                      |
|                                          |
+------------------------------------------+
```

### 3. UI Components Used
- **Accordion** (existing `@/components/ui/accordion`) - For expandable niche categories
- **Card** (existing `@/components/ui/card`) - For section containers
- **Button** (existing `@/components/ui/button`) - For CTA
- **Lucide Icons** - Gift, Video (YouTube), Music (TikTok), ChevronDown, Sparkles

### 4. Design/Branding
- Matches existing site aesthetic (light background, red primary color)
- Clean, minimal layout consistent with other pages
- Responsive design for mobile/desktop
- Uses existing Tailwind CSS classes and design tokens

## Technical Implementation

### Files to Create

**1. `src/pages/BonusNiches.tsx`**
- New page component
- SEO component with `noIndex={true}` prop (will need to extend SEO component)
- Hero section with thank-you message
- Two main sections: TikTok Niches and YouTube Niches
- Each section uses Accordion for niche categories
- Bottom CTA linking to homepage/products
- Placeholder data structure for niches (you'll provide the actual content)

**2. Update `src/components/SEO.tsx`**
- Add optional `noIndex?: boolean` prop
- When true, add `<meta name="robots" content="noindex, nofollow" />`

**3. Update `src/App.tsx`**
- Add route: `/bonus/top-niches` -> `<BonusNiches />`
- Place it with other routes (before the catch-all `*` route)

### Data Structure for Niches
The page will have a simple data structure you can easily update:

```typescript
const tiktokNiches = [
  {
    category: "Entertainment",
    niches: [
      { name: "Movie Recaps", description: "Short film summaries with commentary" },
      { name: "Celebrity News", description: "Trending celebrity updates" },
      // ... more niches
    ]
  },
  // ... more categories
];

const youtubeNiches = [
  {
    category: "Finance",
    niches: [
      { name: "Crypto Analysis", description: "Market updates and predictions" },
      // ... more niches
    ]
  },
  // ... more categories
];
```

### What Won't Happen (Hidden by Design)
- No link in Header navigation
- No link in Footer
- Not in sitemap.xml (edge function only pulls from Shopify)
- `noindex` prevents Google from indexing even if discovered
- Not in `robots.txt` (no need to explicitly disallow, noindex is sufficient)

## Waiting for Your Input
Once you share the list of TikTok and YouTube niches organized by category, I'll populate the page with your actual content.

## Summary of Changes
| File | Action |
|------|--------|
| `src/pages/BonusNiches.tsx` | Create new page |
| `src/components/SEO.tsx` | Add noIndex prop |
| `src/App.tsx` | Add route for bonus page |
