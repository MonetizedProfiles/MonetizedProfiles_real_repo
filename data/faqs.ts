interface Faq {
  question: string;
  answer: string;
}

export const homepageFaqs: Faq[] = [
  { question: 'What is a monetized account?', answer: 'A monetized account is a social media account that has already met the platform\'s requirements for earning money. For YouTube, this means 1,000 subscribers and 4,000 watch hours (YouTube Partner Program). For TikTok, this means 10,000+ followers with monetization enabled. You can start earning revenue immediately after purchase.' },
  { question: 'How does delivery work?', answer: 'After your purchase, you\'ll receive the account credentials via email within minutes. We include step-by-step instructions for securely transferring ownership, plus our free course materials and niche list to help you start creating content right away.' },
  { question: 'Are the accounts organic?', answer: 'Yes, 100%. Every account is organically grown with real followers and real watch time. We never use bots, fake followers, or artificial engagement. This ensures your account stays in good standing with the platform and can generate real revenue.' },
  { question: 'Can I use the account from outside the US?', answer: 'Absolutely! All our accounts work worldwide. TikTok accounts include a US e-SIM card so you can target US audiences regardless of your location, which is where the highest RPM (revenue per thousand views) is.' },
  { question: 'What payment methods do you accept?', answer: 'We accept all major credit/debit cards (Visa, Mastercard, Amex), Apple Pay, Google Pay, Shop Pay, and more through our secure Shopify checkout. All transactions are SSL encrypted.' },
  { question: 'Do you offer refunds?', answer: 'Yes, we offer a money-back guarantee. If there\'s an issue with your account that we can\'t resolve, we\'ll provide a full refund. Please see our refund policy for complete details.' },
  { question: 'What\'s included with each purchase?', answer: 'Every purchase includes: the fully monetized account credentials, our comprehensive course materials on how to grow and monetize your channel, a curated niche list with 50+ profitable niches, and lifetime support from our team.' },
];

const productFaqMap: Record<string, Faq[]> = {
  youtube: [
    { question: 'Is the YouTube channel already in the Partner Program?', answer: 'Yes, every YouTube channel we sell has already been approved for the YouTube Partner Program (YPP). This means it has at least 1,000 subscribers and 4,000 watch hours, so you can start earning AdSense revenue immediately.' },
    { question: 'Can I change the channel name and branding?', answer: 'Yes, you have full ownership. You can change the channel name, profile picture, banner, description, and all other branding elements. We recommend doing this before you start uploading new content.' },
    { question: 'What niche are the channels in?', answer: 'Our channels come in various niches. You can pick from the included niche list of 50+ profitable YouTube niches curated by professionals, or pivot the channel to any niche you prefer. The monetization status stays regardless of the niche change.' },
    { question: 'How is the channel transferred?', answer: 'We transfer the full Google account associated with the channel to you. You\'ll receive login credentials and we\'ll guide you through securing the account with your own recovery email and phone number.' },
  ],
  'monetized-tiktok-account': [
    { question: 'How many followers does the TikTok account have?', answer: 'Every monetized TikTok account comes with 10,000+ organic followers, which is the minimum requirement for TikTok\'s Creativity Program. Many accounts have significantly more.' },
    { question: 'What is the e-SIM card for?', answer: 'The included US e-SIM card allows you to appear as a US-based creator to TikTok\'s algorithm, which is important for accessing US monetization rates (highest RPM in the world). It works on any modern smartphone regardless of where you live.' },
    { question: 'Can I use TikTok Shop with this account?', answer: 'The monetized TikTok account is set up for the Creativity Rewards Program (direct monetization from views). If you also want TikTok Shop affiliate access, check out our dedicated TikTok Shop Affiliate Account product.' },
    { question: 'What RPM can I expect?', answer: 'RPM varies by niche and content quality, but our customers typically see $0.50-$3.00+ per 1,000 views on TikTok. Some niches like finance and tech can earn significantly more.' },
  ],
  'tiktok-shop-affiliate-account': [
    { question: 'What is TikTok Shop Affiliate?', answer: 'TikTok Shop Affiliate lets you promote products from TikTok Shop and earn commission on every sale made through your content. You create videos featuring products, and when viewers buy through your link, you earn a percentage.' },
    { question: 'How many followers does this account have?', answer: 'Each TikTok Shop Affiliate account comes with 5,000+ US followers and is already approved for the TikTok Shop Affiliate Program.' },
    { question: 'How much can I earn with TikTok Shop?', answer: 'Earnings vary widely, but our top customers report earning $500-$5,000+ per month through affiliate commissions. The key is choosing products with high commission rates and creating engaging content.' },
  ],
  'uk-tiktok-shop-affiliate-account': [
    { question: 'What\'s different about the UK account?', answer: 'This account is optimized for the UK TikTok Shop marketplace with 5,000+ UK followers. It\'s ideal if you want to target the UK market specifically or if you\'re based in the UK.' },
    { question: 'Does it work from outside the UK?', answer: 'Yes! The account targets UK audiences but you can manage it from anywhere in the world.' },
  ],
};

export function getProductFaqs(handle: string): Faq[] {
  return productFaqMap[handle] || [];
}
