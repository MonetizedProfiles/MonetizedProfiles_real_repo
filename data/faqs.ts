interface Faq {
  question: string;
  answer: string;
}

export const homepageFaqs: Faq[] = [
  { question: 'What is a monetized account?', answer: 'A social media account that already meets the platform\'s earning requirements. YouTube: 1,000 subscribers + 4,000 watch hours (Partner Program). TikTok: 10,000+ followers with Creativity Program enabled. You start earning revenue immediately after purchase.' },
  { question: 'How does delivery work?', answer: 'Instant. After payment you receive account credentials via email within minutes, plus step-by-step transfer instructions, free course materials, and a curated niche list.' },
  { question: 'Are the accounts organic?', answer: 'Yes, 100%. Every account is organically grown — real followers, real watch time, no bots. This keeps your account in good standing and generating real revenue.' },
  { question: 'Can I use the account from outside the US?', answer: 'Absolutely. All accounts work worldwide. TikTok accounts include a US e-SIM so you can target US audiences (highest RPM) regardless of your location.' },
  { question: 'What payment methods do you accept?', answer: 'All major cards (Visa, Mastercard, Amex), Apple Pay, Google Pay, and Shop Pay through secure Shopify checkout. All transactions are SSL encrypted.' },
  { question: 'What if something goes wrong?', answer: 'You\'re covered by our 30-day money-back guarantee. If there\'s an issue we can\'t resolve, you get a full refund — no questions asked.' },
  { question: 'What\'s included with each purchase?', answer: 'Every purchase includes: fully monetized account credentials, comprehensive course materials, a curated niche list with 50+ profitable niches, and lifetime support from our team.' },
  { question: 'How much can I earn?', answer: 'Earnings vary by platform and niche. YouTube: $3-50+ per 1,000 views depending on niche. TikTok: $0.50-3+ per 1,000 views. TikTok Shop affiliates: $500-5,000+/month in commissions. Our included course helps you maximize these numbers.' },
];

const productFaqMap: Record<string, Faq[]> = {
  youtube: [
    { question: 'Is the YouTube channel already in the Partner Program?', answer: 'Yes. Every channel has 1,000+ subscribers and 4,000+ watch hours, fully approved for YouTube Partner Program. AdSense revenue starts immediately.' },
    { question: 'Can I change the channel name and branding?', answer: 'Yes, you get full ownership. Change the name, profile picture, banner, description — everything. We recommend rebranding before uploading new content.' },
    { question: 'What niche are the channels in?', answer: 'Various niches available. You can pick from our included niche list (50+ profitable niches) or pivot to any niche you prefer. Monetization stays regardless of niche change.' },
    { question: 'How is the channel transferred?', answer: 'We transfer the full Google account. You receive login credentials and we guide you through securing the account with your own recovery email and phone.' },
    { question: 'How much can I earn on YouTube?', answer: 'YouTube RPM varies by niche: entertainment $2-5, tech/reviews $5-12, finance/insurance $20-50+. Your audience location matters too — US/UK/CA/AU pay the most.' },
  ],
  'monetized-tiktok-account': [
    { question: 'How many followers does the account have?', answer: 'Every account has 10,000+ organic followers — the minimum for TikTok\'s Creativity Program. Many have significantly more.' },
    { question: 'What is the e-SIM card for?', answer: 'The US e-SIM makes you appear as a US-based creator to TikTok\'s algorithm, unlocking the highest monetization rates globally. Works on any modern smartphone.' },
    { question: 'Can I use TikTok Shop with this account?', answer: 'This account is set up for the Creativity Program (direct view monetization). For TikTok Shop affiliate access, see our dedicated TikTok Shop Affiliate product.' },
    { question: 'What RPM can I expect?', answer: 'Typical range: $0.50-3.00+ per 1,000 views for US audiences. Finance and tech niches can earn significantly more.' },
  ],
  'tiktok-shop-affiliate-account': [
    { question: 'What is TikTok Shop Affiliate?', answer: 'You promote TikTok Shop products in your videos and earn commission on every sale. Create content featuring products, viewers buy through your link, you earn a percentage.' },
    { question: 'How many followers does this account have?', answer: '5,000+ US followers, already approved for the TikTok Shop Affiliate Program.' },
    { question: 'How much can I earn?', answer: 'Our top customers earn $500-5,000+ per month in commissions. Key is choosing high-commission products and creating engaging content.' },
  ],
  'uk-tiktok-shop-affiliate-account': [
    { question: 'What\'s different about the UK account?', answer: 'Optimized for UK TikTok Shop with 5,000+ UK followers. Ideal for targeting the UK market or if you\'re UK-based.' },
    { question: 'Does it work from outside the UK?', answer: 'Yes. The account targets UK audiences but you can manage it from anywhere.' },
  ],
};

export function getProductFaqs(handle: string): Faq[] {
  return productFaqMap[handle] || [];
}
