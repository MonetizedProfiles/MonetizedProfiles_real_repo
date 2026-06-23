export interface GlossaryTerm {
  slug: string;
  term: string;
  definition: string;
  content: string;
  relatedTerms: string[];
  relatedProductHandles: string[];
  faqs: Array<{ question: string; answer: string }>;
}

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  {
    slug: 'youtube-partner-program',
    term: 'YouTube Partner Program (YPP)',
    definition: 'YouTube\'s official monetization program that allows creators to earn revenue from ads, memberships, and other features on their channel.',
    content: 'The YouTube Partner Program (YPP) is the gateway to earning money on YouTube. To qualify, creators need at least 1,000 subscribers and 4,000 watch hours in the past 12 months (or 1,000 subscribers and 10 million Shorts views in 90 days). Once accepted, creators can earn through multiple revenue streams including display ads, overlay ads, video ads, channel memberships, Super Chat, and the merch shelf.\n\nYPP approval typically takes 1-4 weeks after meeting the requirements. YouTube reviews the channel for compliance with its monetization policies, community guidelines, and Terms of Service. Channels must also have an active AdSense account linked.\n\nBuying a pre-monetized YouTube channel lets you skip the qualification process entirely. Our channels come with YPP already approved, meaning you can start earning ad revenue from your very first upload.',
    relatedTerms: ['channel-monetization', 'adsense', 'watch-hours', 'subscriber-threshold'],
    relatedProductHandles: ['youtube'],
    faqs: [
      { question: 'How long does it take to get into the YouTube Partner Program?', answer: 'After meeting the requirements (1,000 subscribers and 4,000 watch hours), YouTube typically reviews applications within 1-4 weeks. Growing to meet these thresholds usually takes 12-24 months from scratch.' },
      { question: 'Can YPP approval be revoked?', answer: 'Yes. YouTube can remove channels from YPP if they violate community guidelines, receive copyright strikes, or fall below the minimum requirements for an extended period.' },
    ],
  },
  {
    slug: 'channel-monetization',
    term: 'Channel Monetization',
    definition: 'The process of enabling a social media channel to generate revenue through ads, sponsorships, affiliate sales, or platform-specific creator programs.',
    content: 'Channel monetization refers to the ability to earn money from your social media content. Each platform has its own monetization requirements and methods. On YouTube, monetization is primarily through the YouTube Partner Program and AdSense ads. On TikTok, creators can earn through the Creativity Program (views-based) or TikTok Shop (commission-based).\n\nThe biggest barrier to monetization is meeting platform-specific thresholds. YouTube requires 1,000 subscribers and 4,000 watch hours, while TikTok\'s Creativity Program requires 10,000 followers. These thresholds exist to ensure creators have established audiences before earning.\n\nPre-monetized accounts bypass these barriers entirely. When you purchase a monetized account, all requirements have already been met and the monetization features are active, allowing you to start earning from your first piece of content.',
    relatedTerms: ['youtube-partner-program', 'tiktok-creativity-program', 'rpm', 'cpm'],
    relatedProductHandles: ['youtube', 'monetized-tiktok-account'],
    faqs: [
      { question: 'What does "monetized" mean for a social media account?', answer: 'A monetized account has been approved by the platform to earn revenue. This means it has met all the required thresholds (subscribers, watch hours, followers) and has active revenue-generating features enabled.' },
      { question: 'How do monetized accounts make money?', answer: 'YouTube channels earn through ads placed on videos (via AdSense), memberships, and Super Chat. TikTok accounts earn through the Creativity Program (per-view payments) or TikTok Shop (affiliate commissions).' },
    ],
  },
  {
    slug: 'rpm',
    term: 'RPM (Revenue Per Mille)',
    definition: 'The estimated revenue a creator earns per 1,000 video views after YouTube takes its share. A key metric for measuring channel profitability.',
    content: 'RPM (Revenue Per Mille) represents how much money you earn per 1,000 views on your content. Unlike CPM, which is the amount advertisers pay, RPM reflects what the creator actually receives after the platform takes its cut. On YouTube, the platform keeps 45% of ad revenue, so RPM is always lower than CPM.\n\nRPM varies dramatically by niche. Finance and business channels can earn $15-$30+ RPM, while entertainment channels might earn $2-$5. Geography also matters: US, UK, and Australian audiences command much higher RPMs than audiences in developing countries.\n\nWhen evaluating which type of monetized account to buy, RPM is a critical factor. YouTube generally offers significantly higher RPM than TikTok. A YouTube channel in a high-RPM niche can earn $15-$30 per 1,000 views, while TikTok\'s Creativity Program typically pays $0.50-$3.00 per 1,000 views.',
    relatedTerms: ['cpm', 'channel-monetization', 'adsense'],
    relatedProductHandles: ['youtube'],
    faqs: [
      { question: 'What is a good RPM on YouTube?', answer: 'RPM varies by niche. Finance and business niches see $15-$30+, tech and education see $8-$15, and entertainment sees $2-$5. An RPM above $5 is generally considered solid.' },
      { question: 'How is RPM different from CPM?', answer: 'CPM is what advertisers pay per 1,000 ad impressions. RPM is what creators actually earn per 1,000 views after YouTube\'s 45% cut and accounting for views where no ad was shown.' },
      { question: 'Can I increase my RPM?', answer: 'Yes. Focus on high-value niches (finance, business, tech), target US/UK audiences, create longer videos (8+ minutes for mid-roll ads), and maintain high audience retention.' },
    ],
  },
  {
    slug: 'cpm',
    term: 'CPM (Cost Per Mille)',
    definition: 'The amount advertisers pay per 1,000 ad impressions on a video. Higher CPM niches generate more revenue for creators.',
    content: 'CPM (Cost Per Mille) is the price advertisers pay for 1,000 ad impressions on your content. It represents the advertiser\'s cost, not the creator\'s earnings (that\'s RPM). YouTube keeps approximately 45% of CPM revenue, with the remaining 55% going to the creator.\n\nCPM is primarily determined by the niche and audience demographics. Advertisers in finance, insurance, legal, and B2B sectors pay the highest CPMs because their customers have high lifetime value. Entertainment and gaming niches tend to have lower CPMs due to broader, less commercially valuable audiences.\n\nUnderstanding CPM helps you choose the right niche for your monetized channel. When we include a curated niche list with every purchase, CPM is one of the key factors we use to identify the most profitable content categories.',
    relatedTerms: ['rpm', 'channel-monetization', 'adsense'],
    relatedProductHandles: ['youtube'],
    faqs: [
      { question: 'What niches have the highest CPM?', answer: 'Finance, insurance, legal, real estate, and B2B software niches typically have the highest CPMs, often $20-$50+ per 1,000 ad impressions.' },
      { question: 'Does CPM change throughout the year?', answer: 'Yes. CPM is typically highest in Q4 (October-December) due to holiday advertising spend and lowest in Q1 (January-March) when advertising budgets reset.' },
    ],
  },
  {
    slug: 'tiktok-creativity-program',
    term: 'TikTok Creativity Program',
    definition: 'TikTok\'s creator monetization program (formerly the Creator Fund) that pays creators based on video views and engagement.',
    content: 'The TikTok Creativity Program (formerly known as the Creator Fund) is TikTok\'s primary way of paying creators directly for their content. Unlike the old Creator Fund which had a fixed pool of money, the Creativity Program offers significantly higher payouts and scales with performance.\n\nTo qualify, creators need at least 10,000 followers, must be 18 or older, have at least 100,000 views in the last 30 days, and post original content over 1 minute in length. The program pays based on views, with US-targeted content earning the highest rates (typically $0.50-$3.00 per 1,000 views).\n\nOur monetized TikTok accounts come with 10,000+ organic followers, meeting the primary requirement for the Creativity Program. Combined with the included US e-SIM for accessing US monetization rates, you can start earning from your first qualifying video.',
    relatedTerms: ['channel-monetization', 'tiktok-shop', 'rpm'],
    relatedProductHandles: ['monetized-tiktok-account'],
    faqs: [
      { question: 'How much does the TikTok Creativity Program pay?', answer: 'Payments vary but typically range from $0.50-$3.00 per 1,000 views for US audiences. Actual earnings depend on video engagement, watch time, and audience demographics.' },
      { question: 'What replaced the TikTok Creator Fund?', answer: 'The TikTok Creativity Program replaced the Creator Fund in 2023, offering significantly higher payouts and better earning potential for creators who post videos over 1 minute.' },
    ],
  },
  {
    slug: 'tiktok-shop',
    term: 'TikTok Shop',
    definition: 'TikTok\'s integrated e-commerce platform that lets creators promote products directly in their videos and earn affiliate commissions on sales.',
    content: 'TikTok Shop is an e-commerce feature integrated directly into the TikTok app. It allows creators to showcase and sell products within their videos, live streams, and profile pages. As an affiliate, you can browse thousands of products, create content featuring them, and earn a commission on every sale made through your content.\n\nThe affiliate model is particularly attractive because it requires no inventory, shipping, or customer service. You simply create engaging content around products, and when viewers make a purchase through your link, you earn a percentage of the sale. Commissions typically range from 5-30% depending on the product and seller.\n\nTo access TikTok Shop\'s affiliate features, your account needs at least 5,000 followers. Our TikTok Shop affiliate accounts come pre-approved with 5,000+ followers in the US or UK market, so you can start promoting products and earning commissions immediately.',
    relatedTerms: ['tiktok-creativity-program', 'channel-monetization'],
    relatedProductHandles: ['tiktok-shop-affiliate-account', 'uk-tiktok-shop-affiliate-account'],
    faqs: [
      { question: 'How much do TikTok Shop affiliates earn?', answer: 'Earnings vary widely based on product selection and content quality. Top affiliates earn $500-$5,000+ per month. A single viral video promoting a trending product can generate hundreds of dollars in commissions.' },
      { question: 'Do I need to buy or ship products?', answer: 'No. As a TikTok Shop affiliate, you promote products from other sellers. They handle inventory, shipping, and customer service. You only create content and earn commissions on sales.' },
    ],
  },
  {
    slug: 'adsense',
    term: 'Google AdSense',
    definition: 'Google\'s advertising program that enables YouTube creators to earn revenue by displaying ads on their videos.',
    content: 'Google AdSense is the advertising platform that powers YouTube\'s creator monetization. When viewers watch ads on your YouTube videos, you earn a share of the advertising revenue. AdSense handles everything from ad placement to payment processing, making it a passive income stream once set up.\n\nTo earn through AdSense on YouTube, your channel must be accepted into the YouTube Partner Program. Once approved, ads are automatically placed on your videos based on your monetization settings. You can choose which ad formats to enable: display ads, overlay ads, skippable video ads, non-skippable video ads, and bumper ads.\n\nPayments are made monthly once your balance reaches the $100 threshold. AdSense supports various payment methods including direct bank transfer, wire transfer, and checks depending on your country.',
    relatedTerms: ['youtube-partner-program', 'rpm', 'cpm', 'channel-monetization'],
    relatedProductHandles: ['youtube'],
    faqs: [
      { question: 'How does AdSense pay YouTube creators?', answer: 'YouTube creators earn 55% of ad revenue generated on their videos. Payments are made monthly via AdSense once the $100 minimum threshold is reached.' },
      { question: 'Do I need my own AdSense account?', answer: 'Yes. After purchasing a monetized channel, you will connect your own AdSense account to receive payments. Our included guide walks you through this process step by step.' },
    ],
  },
  {
    slug: 'mcn',
    term: 'MCN (Multi-Channel Network)',
    definition: 'A third-party organization that partners with YouTube channels to offer services like audience development, content programming, and monetization in exchange for a revenue share.',
    content: 'Multi-Channel Networks (MCNs) are companies that partner with YouTube creators to provide services like audience growth, rights management, cross-promotion, and monetization optimization. In exchange, they typically take 10-40% of the creator\'s ad revenue.\n\nMCNs were more relevant in YouTube\'s earlier days when individual creator tools were limited. Today, most creators can access the same features directly through YouTube without giving up a revenue share. However, some MCNs still offer value through brand deal connections, production resources, and network effects.\n\nWhen purchasing a YouTube channel, it is important to ensure it is not locked into an MCN contract. All channels we sell are free from MCN agreements, giving you full control over your revenue and content decisions.',
    relatedTerms: ['youtube-partner-program', 'channel-monetization', 'adsense'],
    relatedProductHandles: ['youtube'],
    faqs: [
      { question: 'Should I join an MCN?', answer: 'For most creators, joining an MCN is not recommended. They take a significant revenue cut (10-40%) for services you can often access independently. Only consider an MCN if they offer specific value like brand deals or resources you cannot access on your own.' },
      { question: 'Are your channels part of an MCN?', answer: 'No. All our YouTube channels are independent and not locked into any MCN contracts. You have full control over monetization and revenue.' },
    ],
  },
  {
    slug: 'faceless-channel',
    term: 'Faceless Channel',
    definition: 'A YouTube channel that creates content without the creator appearing on camera, using stock footage, screen recordings, AI voiceover, or animations.',
    content: 'Faceless YouTube channels produce content without the creator ever showing their face on camera. This approach has become increasingly popular because it allows anyone to build a profitable channel regardless of their appearance, confidence, or desire for public recognition.\n\nCommon faceless channel formats include: compilation channels (top 10 lists, best-of collections), tutorial screencasts, AI voiceover explainer videos, ambient/relaxation content (rain sounds, nature scenes), documentary-style narration over stock footage, and automated news/finance summaries.\n\nFaceless channels can be just as profitable as personality-driven channels. The key advantages are scalability (you can outsource content creation more easily) and privacy. Many of the highest-earning YouTube automation businesses are faceless channels that produce content at scale across multiple niches.',
    relatedTerms: ['channel-monetization', 'youtube-partner-program', 'rpm'],
    relatedProductHandles: ['youtube'],
    faqs: [
      { question: 'Can faceless channels be monetized?', answer: 'Yes. YouTube monetizes based on views and watch time, not whether you show your face. Faceless channels are fully eligible for the YouTube Partner Program and all monetization features.' },
      { question: 'What tools do I need for a faceless channel?', answer: 'Basic video editing software (DaVinci Resolve is free), stock footage sources (Pexels, Pixabay), and optionally an AI voiceover tool. Our included course covers the complete workflow.' },
    ],
  },
  {
    slug: 'aged-youtube-channel',
    term: 'Aged YouTube Channel',
    definition: 'A YouTube channel created several years ago (typically 2010 or earlier) that benefits from established algorithmic trust and authority.',
    content: 'An aged YouTube channel is one that was created years ago, typically in 2010 or earlier. These channels carry inherent advantages in YouTube\'s recommendation algorithm due to their established history on the platform.\n\nYouTube\'s algorithm considers channel age as one of many trust signals. Older channels have demonstrated longevity on the platform, which YouTube interprets as a positive indicator. This can lead to better search rankings, more favorable recommendations, and faster growth when uploading new content.\n\nAged channels are particularly valuable for creators entering competitive niches where new channels struggle to gain traction. The combination of channel age, domain authority (similar to how older domains rank better in Google), and YouTube\'s trust signals creates a meaningful advantage over starting from scratch.',
    relatedTerms: ['youtube-partner-program', 'channel-monetization', 'faceless-channel'],
    relatedProductHandles: ['aged-youtube'],
    faqs: [
      { question: 'How old should a YouTube channel be to get algorithmic benefits?', answer: 'Channels created in 2015 or earlier generally show noticeable benefits. Our aged channels are from 2010 or earlier, providing maximum algorithmic advantage.' },
      { question: 'Can I rebrand an aged channel?', answer: 'Yes. You can change the channel name, profile picture, banner, description, and delete all old videos. The channel retains its age-based authority regardless of rebranding.' },
    ],
  },
  {
    slug: 'watch-hours',
    term: 'Watch Hours',
    definition: 'The total number of hours viewers have spent watching a channel\'s content. YouTube requires 4,000 public watch hours in the past 12 months for monetization.',
    content: 'Watch hours represent the cumulative time viewers spend watching your YouTube content. To qualify for the YouTube Partner Program, a channel needs 4,000 public watch hours in the past 12 months (in addition to 1,000 subscribers).\n\nThis requirement ensures that channels have genuine audience engagement before accessing monetization. Watch hours from private or unlisted videos do not count, and neither do hours from deleted videos or ad campaigns.\n\nReaching 4,000 watch hours organically is one of the most challenging aspects of growing a new YouTube channel. It requires consistent uploading, good content retention, and typically takes 6-18 months even with a solid content strategy. Our pre-monetized channels have already exceeded this threshold, saving you months of effort.',
    relatedTerms: ['youtube-partner-program', 'subscriber-threshold', 'channel-monetization'],
    relatedProductHandles: ['youtube'],
    faqs: [
      { question: 'How many videos do I need for 4,000 watch hours?', answer: 'It depends on video length and retention. As a rough guide, if your average video is 10 minutes with 50% retention, you would need approximately 48,000 views to reach 4,000 watch hours.' },
      { question: 'Do watch hours reset?', answer: 'YouTube uses a rolling 12-month window. Hours earned more than 12 months ago no longer count toward the requirement. However, once you are in YPP, you will not be immediately removed for dipping below temporarily.' },
    ],
  },
  {
    slug: 'subscriber-threshold',
    term: 'Subscriber Threshold',
    definition: 'The minimum number of subscribers required to access monetization features on social media platforms, such as 1,000 for YouTube YPP or 10,000 for TikTok Creativity Program.',
    content: 'Subscriber thresholds are the minimum follower counts that platforms require before creators can access monetization features. YouTube requires 1,000 subscribers for the YouTube Partner Program, while TikTok requires 10,000 followers for the Creativity Program and 5,000 for TikTok Shop affiliate access.\n\nThese thresholds exist to ensure that only channels with established audiences can monetize. For new creators, reaching these numbers organically can take months or even years. Statistics show that 97% of YouTube channels never reach 1,000 subscribers.\n\nPurchasing a pre-monetized account is the most reliable way to bypass these thresholds. Our YouTube channels come with 1,000+ subscribers, our TikTok accounts have 10,000+ followers, and our TikTok Shop accounts have 5,000+ followers in the relevant market.',
    relatedTerms: ['youtube-partner-program', 'watch-hours', 'tiktok-creativity-program'],
    relatedProductHandles: ['youtube', 'monetized-tiktok-account', 'tiktok-shop-affiliate-account'],
    faqs: [
      { question: 'What happens if I drop below the subscriber threshold?', answer: 'On YouTube, dropping below 1,000 subscribers does not immediately remove YPP access. YouTube reviews channels periodically and may remove monetization if you are significantly below thresholds for an extended period.' },
      { question: 'Are subscriber counts the only requirement?', answer: 'No. YouTube also requires 4,000 watch hours. TikTok requires additional criteria like age verification and content compliance. Our accounts meet all requirements, not just subscriber counts.' },
    ],
  },
  {
    slug: 'channel-transfer',
    term: 'Channel Transfer',
    definition: 'The process of transferring ownership of a social media account from one person to another, including changing login credentials and recovery information.',
    content: 'Channel transfer is the process of changing ownership of a social media account. For YouTube, this involves transferring the entire Google account associated with the channel. For TikTok, it involves updating the login credentials, phone number, and recovery email.\n\nA proper channel transfer ensures the new owner has complete control over the account. This includes changing the password, removing old recovery methods, updating the email address, and enabling two-factor authentication with the new owner\'s device.\n\nOur transfer process is designed to be secure and straightforward. After purchase, you receive detailed instructions for each step of the transfer. We provide support throughout the process and our 30-day guarantee covers any issues that arise during or after the transfer.',
    relatedTerms: ['channel-monetization', 'youtube-partner-program'],
    relatedProductHandles: ['youtube', 'monetized-tiktok-account', 'tiktok-shop-affiliate-account'],
    faqs: [
      { question: 'Is transferring a YouTube channel allowed?', answer: 'YouTube does not explicitly prohibit account transfers. Channel ownership changes happen regularly through business acquisitions, team changes, and creator marketplace transactions.' },
      { question: 'How long does the transfer process take?', answer: 'The actual transfer takes about 15-30 minutes following our step-by-step guide. You will have full access immediately after completing the credential changes.' },
    ],
  },
  {
    slug: 'content-id',
    term: 'Content ID',
    definition: 'YouTube\'s automated copyright detection system that scans uploaded videos against a database of copyrighted content to identify and manage potential infringements.',
    content: 'Content ID is YouTube\'s digital fingerprinting system that automatically scans every uploaded video against a massive database of copyrighted audio and video content. Rights holders register their content with Content ID, and the system detects matches in creator uploads.\n\nWhen a Content ID match is found, the rights holder can choose to: block the video entirely, monetize the video (placing ads and collecting the revenue), or track the video\'s viewership data. A Content ID claim is different from a copyright strike; claims do not penalize your channel.\n\nFor creators buying monetized channels, understanding Content ID is important. Using copyrighted music or footage without permission will trigger claims that redirect your ad revenue to the rights holder. To avoid this, use royalty-free music, stock footage, and original content. Our included course covers how to find and use copyright-safe resources.',
    relatedTerms: ['youtube-partner-program', 'channel-monetization', 'adsense'],
    relatedProductHandles: ['youtube'],
    faqs: [
      { question: 'Will a Content ID claim affect my monetization?', answer: 'A Content ID claim redirects ad revenue from the claimed video to the rights holder but does not affect your overall channel monetization or YPP status. Copyright strikes (different from claims) can impact your channel.' },
      { question: 'How do I avoid Content ID claims?', answer: 'Use royalty-free music libraries, Creative Commons footage, and original content. Avoid using copyrighted songs, movie clips, or TV show footage without permission.' },
    ],
  },
  {
    slug: 'shorts-fund',
    term: 'YouTube Shorts Fund',
    definition: 'YouTube\'s program for monetizing short-form vertical videos (60 seconds or less), now integrated into the YouTube Partner Program with ad revenue sharing.',
    content: 'YouTube Shorts monetization has evolved significantly since its introduction. Originally, YouTube offered a $100 million Shorts Fund that distributed bonuses to top Shorts creators. This has since been replaced by direct ad revenue sharing through the YouTube Partner Program.\n\nAs of 2023, Shorts creators in YPP earn revenue from ads displayed between Shorts in the feed. The revenue is pooled from these ads and distributed based on each creator\'s share of total Shorts views. While Shorts RPM is lower than long-form content (typically $0.03-$0.10 per 1,000 views), the ease of creation and viral potential make them a valuable part of a channel growth strategy.\n\nShorts are particularly effective for channel discovery. Many creators use Shorts to drive subscribers who then watch their longer, higher-RPM content. Our monetized channels are fully eligible for Shorts monetization, so you can leverage both short-form and long-form content strategies.',
    relatedTerms: ['youtube-partner-program', 'rpm', 'channel-monetization'],
    relatedProductHandles: ['youtube'],
    faqs: [
      { question: 'How much do YouTube Shorts pay?', answer: 'Shorts RPM is typically $0.03-$0.10 per 1,000 views, significantly lower than long-form content. However, Shorts can generate millions of views quickly, making them valuable for discovery and supplemental revenue.' },
      { question: 'Can Shorts help me grow my channel?', answer: 'Yes. Shorts are one of the fastest ways to gain subscribers on YouTube. Many creators use Shorts for growth while earning the majority of their revenue from longer videos.' },
    ],
  },
];
