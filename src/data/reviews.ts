// Customer reviews data parsed from CSV export - ALL 1277 reviews

export interface Review {
  id: string;
  rating: number;
  nickname: string;
  review: string;
  date: string;
  productHandle: string;
  verified: boolean;
  imageUrl?: string;
}

// Total review counts from CSV (for display purposes - we store a representative sample)
export const TOTAL_REVIEW_COUNT = 1277;
export const TOTAL_5_STAR_COUNT = 520;
export const TOTAL_4_STAR_COUNT = 680;
export const TOTAL_3_STAR_COUNT = 65;
export const TOTAL_2_STAR_COUNT = 8;
export const TOTAL_1_STAR_COUNT = 4;

// All reviews with images from CSV (8 total)
const reviewsWithImages: Review[] = [
  { id: "2v4Q1khkHLn", rating: 5, nickname: "Ibrahim V.", review: "I have oficially made back the money I invested into this account, will buy another one with the money and then repeat the loop", date: "2024-11-01", productHandle: "monetized-tiktok-account", verified: true, imageUrl: "https://images.loox.io/uploads/2024/12/1/dWd2eorD8.jpg" },
  { id: "dBLdkI55Xba", rating: 5, nickname: "Ava A.", review: "The accounts are so good, RPM of 2,41 USD is just nuts", date: "2024-11-01", productHandle: "monetized-tiktok-account", verified: true, imageUrl: "https://images.loox.io/uploads/2024/12/1/pHaHeSI4V.jpg" },
  { id: "dbZGM0E3tdE", rating: 5, nickname: "Mei W.", review: "The channel was solid, 1k subs and organically grown as promised now look at what I have acheived since buying it, it's actually crazy", date: "2024-10-25", productHandle: "youtube", verified: true, imageUrl: "https://images.loox.io/uploads/2024/12/1/M6rDd--kp6d.jpg" },
  { id: "HIuIa5Ys82z", rating: 5, nickname: "Ethan A.", review: "Fast delivery, no bots works fantastic. No problems with payments also and I am not even based in the US", date: "2024-10-25", productHandle: "monetized-tiktok-account", verified: true, imageUrl: "https://images.loox.io/uploads/2024/12/1/EFNkFX6vQl.jpg" },
  { id: "W4Q0ScqrLD6", rating: 5, nickname: "Sofia V.", review: "Bought the account, binged the course included and got my hands dirty and started. Less than 5 vids in and I have already got 800k views im so stocked!", date: "2024-10-18", productHandle: "youtube", verified: true, imageUrl: "https://images.loox.io/uploads/2024/12/1/chcZYxxvLuE.jpg" },
  { id: "4T7y0TyXBye", rating: 5, nickname: "Ethan C.", review: "Changed my life fr", date: "2024-10-17", productHandle: "monetized-tiktok-account", verified: true, imageUrl: "https://images.loox.io/uploads/2024/12/1/jFfRerbgN.jpg" },
  { id: "FXR_8ADTrdm", rating: 5, nickname: "Charlotte W.", review: "It is a lot of hard work even with the already monetized channel but it is so worth it in the end", date: "2024-10-11", productHandle: "youtube", verified: true, imageUrl: "https://images.loox.io/uploads/2024/12/1/u_s8lcWefB.jpg" },
  { id: "SF1dNrGEWXt", rating: 5, nickname: "Charlotte G.", review: "Guys this is absolutley crazy. 1 SHORT got 6.4M VIEWS and netted me 90k subscribers haha", date: "2024-10-09", productHandle: "youtube", verified: true, imageUrl: "https://images.loox.io/uploads/2024/12/1/CiT23r5fdRm.jpg" },
];

// Representative sample of text-only reviews (covering all products)
const textOnlyReviews: Review[] = [
  // TikTok Account Reviews (5 star)
  { id: "Uv_Rgu5q7F", rating: 5, nickname: "Noah H.", review: "as expected", date: "2024-11-27", productHandle: "monetized-tiktok-account", verified: true },
  { id: "vh1gnBqp3cT", rating: 5, nickname: "Mia W.", review: "came with 10k followers", date: "2024-11-20", productHandle: "monetized-tiktok-account", verified: true },
  { id: "TEGwOtk28Yz", rating: 5, nickname: "Mia Q.", review: "good rpm actually", date: "2024-11-13", productHandle: "monetized-tiktok-account", verified: true },
  { id: "xY1aAg0XNyY", rating: 5, nickname: "Mateo V.", review: "making money from tokky but also selling my own product via the trafic, im ballin right now", date: "2024-11-02", productHandle: "monetized-tiktok-account", verified: true },
  { id: "l-Es0_2GW4f", rating: 5, nickname: "Yuki L.", review: "best purchase", date: "2024-11-04", productHandle: "monetized-tiktok-account", verified: true },
  { id: "C5_GZlOEMN", rating: 5, nickname: "Dylan I.", review: "got the account, more then 10k followers, just need to read the niche list included and start from there", date: "2024-11-03", productHandle: "monetized-tiktok-account", verified: true },
  { id: "hs5odUcSFdQ", rating: 5, nickname: "Yuki M.", review: "printing money like jerome powell", date: "2024-10-25", productHandle: "monetized-tiktok-account", verified: true },
  { id: "ntXArI6h3n", rating: 5, nickname: "Mia X.", review: "came with everything promised", date: "2024-10-23", productHandle: "monetized-tiktok-account", verified: true },
  { id: "y_gKy11bZp", rating: 5, nickname: "Liam G.", review: "will singelhandedly print so much money the us goes into hyperinflation", date: "2024-10-16", productHandle: "monetized-tiktok-account", verified: true },
  { id: "FoZOTx6-T0-", rating: 5, nickname: "Sophia X.", review: "works even tough im not from us", date: "2024-10-14", productHandle: "monetized-tiktok-account", verified: true },
  { id: "WMOeckcKvzy", rating: 5, nickname: "Sophia R.", review: "fully approde for the crp program🤝", date: "2024-10-10", productHandle: "monetized-tiktok-account", verified: true },
  { id: "40f6mnrDaeB", rating: 5, nickname: "Mateo Y.", review: "fantastic", date: "2024-10-08", productHandle: "monetized-tiktok-account", verified: true },
  
  // TikTok Account Reviews (4 star)
  { id: "kL5NDAgYTwM", rating: 4, nickname: "Ling Z.", review: "works as expected", date: "2024-11-29", productHandle: "monetized-tiktok-account", verified: true },
  { id: "5Fefnab8quu", rating: 4, nickname: "Tariq V.", review: "good!", date: "2024-11-28", productHandle: "monetized-tiktok-account", verified: true },
  { id: "jxrKt_bEgA9", rating: 4, nickname: "Jun K.", review: "my account hade even more than 10k followers", date: "2024-11-27", productHandle: "monetized-tiktok-account", verified: true },
  { id: "BobluJSv7_q", rating: 4, nickname: "Priya Z.", review: "so happy I was able to pickup this account on the sale", date: "2024-11-21", productHandle: "monetized-tiktok-account", verified: true },
  { id: "hzRYmc-PWV", rating: 4, nickname: "Ibrahim B.", review: "My account had even more than 10k followers, really wanted to grow it as much myself as possible but haha I should not complain", date: "2024-11-20", productHandle: "monetized-tiktok-account", verified: true },
  { id: "Q--KAyU9ODX", rating: 4, nickname: "Sofia V.", review: "once my first account made 1000$ I bought another one, compound baby", date: "2024-11-13", productHandle: "monetized-tiktok-account", verified: true },
  { id: "nFGFPVGS3ds", rating: 4, nickname: "Dara V.", review: "have tried reaching 10k followers before but it is impossible, finally I can earn money on tiktok", date: "2024-11-07", productHandle: "monetized-tiktok-account", verified: true },
  { id: "K0gihUBOVZn", rating: 4, nickname: "Isabella Y.", review: "monetized right away with good rpm", date: "2024-10-28", productHandle: "monetized-tiktok-account", verified: true },
  { id: "nvun_IVAVSG", rating: 4, nickname: "Hana M.", review: "quick and easy setup", date: "2024-10-26", productHandle: "monetized-tiktok-account", verified: true },
  { id: "ISk2G-Fah4t", rating: 4, nickname: "Ayaka H.", review: "can not believe it worked good rpm also", date: "2024-10-24", productHandle: "monetized-tiktok-account", verified: true },
  { id: "iyUum-931hj", rating: 4, nickname: "Ibrahim B.", review: "the e-sim works very well", date: "2024-10-22", productHandle: "monetized-tiktok-account", verified: true },
  { id: "ZgNJ3ZGK0Z", rating: 4, nickname: "Aarav Z.", review: "Everything is perfect, just a bit more work than I anticipated making all the vids", date: "2024-10-22", productHandle: "monetized-tiktok-account", verified: true },
  { id: "4yxooQhhKPu", rating: 4, nickname: "Aarav Z.", review: "actually get us audience with the e-sim provided even tough I am not from US", date: "2024-10-20", productHandle: "monetized-tiktok-account", verified: true },
  { id: "XUb3dy6D-5c", rating: 4, nickname: "Nikita X.", review: "best account store on the internet", date: "2024-10-19", productHandle: "monetized-tiktok-account", verified: true },
  { id: "AlQ8PZtns7I", rating: 4, nickname: "Aarav Z.", review: "Really good", date: "2024-10-16", productHandle: "monetized-tiktok-account", verified: true },
  { id: "_xTO94g2Rdp", rating: 4, nickname: "Benjamin N.", review: "as promised, rpm is good", date: "2024-10-08", productHandle: "monetized-tiktok-account", verified: true },
  { id: "1HO_gQIJhuB", rating: 4, nickname: "Jun Q.", review: "great that you recieve US e-sim included", date: "2024-10-29", productHandle: "monetized-tiktok-account", verified: true },
  
  // YouTube Channel Reviews (5 star)
  { id: "LpVBpnfHBYi", rating: 5, nickname: "Ava Q.", review: "got my youtube account today & it's already making 💰. the course was solid too 🤝", date: "2024-11-26", productHandle: "youtube", verified: true },
  { id: "oW_5Y6M0A8k", rating: 5, nickname: "Ethan K.", review: "already making money with shorts, money glitch", date: "2024-11-24", productHandle: "youtube", verified: true },
  { id: "Kwzh1Ud183U", rating: 5, nickname: "Olivia O.", review: "growing like crazy rn", date: "2024-11-22", productHandle: "youtube", verified: true },
  { id: "pcUSYmy3PJ", rating: 5, nickname: "Zara Q.", review: "worth every penny 💯", date: "2024-11-15", productHandle: "youtube", verified: true },
  { id: "ih7Mg8e_--z", rating: 5, nickname: "Ethan K.", review: "tysm", date: "2024-11-13", productHandle: "youtube", verified: true },
  { id: "l_BOxzTZBGD", rating: 5, nickname: "Yuki O.", review: "crazy value", date: "2024-11-10", productHandle: "youtube", verified: true },
  { id: "vm1BV1pels3", rating: 5, nickname: "Isabella H.", review: "my childhood dream of becoming a youtuber finally is true", date: "2024-10-23", productHandle: "youtube", verified: true },
  { id: "l2JTmeBWnlC", rating: 5, nickname: "Noah D.", review: "yapping for a living nowdays hbu?", date: "2024-10-20", productHandle: "youtube", verified: true },
  { id: "j1bB9HK3Ok2", rating: 5, nickname: "Levi P.", review: "they ain't lying", date: "2024-10-20", productHandle: "youtube", verified: true },
  { id: "rM6bD5OsR7J", rating: 5, nickname: "Levi W.", review: "getting paid to spread brainrot shorts, dream job fr", date: "2024-10-19", productHandle: "youtube", verified: true },
  { id: "ZsWhev86xI", rating: 5, nickname: "Levi T.", review: "just connected my paypal, the payout is in transit!", date: "2024-10-19", productHandle: "youtube", verified: true },
  { id: "R7Gegc5Jbel", rating: 5, nickname: "Elijah I.", review: "no bots + organic subs? steal tbh", date: "2024-10-15", productHandle: "youtube", verified: true },
  { id: "6yJnwsGw2G", rating: 5, nickname: "Aarav M.", review: "monetized as promised", date: "2024-10-09", productHandle: "youtube", verified: true },
  
  // YouTube Channel Reviews (4 star)
  { id: "4kRJ6VomMx1", rating: 4, nickname: "Sophia J.", review: "the course included was fire, thank you so much, almost too much value for the price", date: "2024-11-20", productHandle: "youtube", verified: true },
  { id: "VaGXb0AtXG8", rating: 4, nickname: "Mei W.", review: "the real key to making money on youtube is rain videos, im telling you", date: "2024-11-14", productHandle: "youtube", verified: true },
  { id: "57FsCCM5XV", rating: 4, nickname: "Jun Q.", review: "as described", date: "2024-11-13", productHandle: "youtube", verified: true },
  { id: "j4KaPl3dfgN", rating: 4, nickname: "Haruto N.", review: "starting my yt shorts empire today!", date: "2024-11-06", productHandle: "youtube", verified: true },
  { id: "cj7RDc_6uPZ", rating: 4, nickname: "Naomi Q.", review: "love from sweden", date: "2024-11-04", productHandle: "youtube", verified: true },
  { id: "jOf9Nmu9vF7", rating: 4, nickname: "Ravi F.", review: "have bought from other sites but they all were botted. this one actually is legit", date: "2024-10-31", productHandle: "youtube", verified: true },
  { id: "FQhS0bABvuC", rating: 4, nickname: "Dara K.", review: "only good provider of theese accounts", date: "2024-10-30", productHandle: "youtube", verified: true },
  { id: "L1aRCgmPnLP", rating: 4, nickname: "Hana O.", review: "works like a charm", date: "2024-10-23", productHandle: "youtube", verified: true },
  { id: "u2UiQTFI0Ff", rating: 4, nickname: "Ryo X.", review: "satisfied", date: "2024-10-14", productHandle: "youtube", verified: true },
  { id: "43FkHsK-4Vq", rating: 4, nickname: "Emma L.", review: "my channel really is organically grown, did not beleive it was true", date: "2024-10-13", productHandle: "youtube", verified: true },
  { id: "ebFMi_kuAEl", rating: 4, nickname: "Kai V.", review: "crazy good quality of the channel", date: "2024-10-11", productHandle: "youtube", verified: true },
  
  // YouTube Channel Reviews (3 star)
  { id: "GE0Hr4Za597", rating: 3, nickname: "Dara V.", review: "Got the channel today and everything is good now I just need to learn how to make the videos ughh", date: "2024-10-12", productHandle: "youtube", verified: true },
  
  // TikTok Shop Affiliate Reviews (5 star)
  { id: "zCvIS2WHvRM", rating: 5, nickname: "James C.", review: "the course that is included is so key!", date: "2024-11-26", productHandle: "tiktok-shop-affiliate-account", verified: true },
  { id: "ebFYr4_c1Da", rating: 5, nickname: "Zara U.", review: "can not believe people are working normal jobs", date: "2024-11-22", productHandle: "tiktok-shop-affiliate-account", verified: true },
  { id: "Yx_2UMf2VxC", rating: 5, nickname: "Ethan E.", review: "selling to kids is too easy", date: "2024-11-20", productHandle: "tiktok-shop-affiliate-account", verified: true },
  { id: "UPqnZss6KXh", rating: 5, nickname: "Elijah F.", review: "my account's already earning", date: "2024-11-08", productHandle: "tiktok-shop-affiliate-account", verified: true },
  { id: "oWVPPEwG0Mj", rating: 5, nickname: "Ava U.", review: "finally I can do this from norway", date: "2024-11-06", productHandle: "tiktok-shop-affiliate-account", verified: true },
  { id: "VhCueDVH03S", rating: 5, nickname: "William Q.", review: "the course makes it so easy", date: "2024-10-25", productHandle: "tiktok-shop-affiliate-account", verified: true },
  { id: "gKYwM_yh82k", rating: 5, nickname: "Zara Z.", review: "made my first vid today, wish me luck", date: "2024-10-22", productHandle: "tiktok-shop-affiliate-account", verified: true },
  { id: "VET7jdCWQYr", rating: 5, nickname: "Dylan B.", review: "should be illegal to earn money this easy", date: "2024-10-20", productHandle: "tiktok-shop-affiliate-account", verified: true },
  { id: "l_3e5N2CFu", rating: 5, nickname: "Aarav Q.", review: "fully monetized & organic, insane", date: "2024-10-15", productHandle: "tiktok-shop-affiliate-account", verified: true },
  
  // TikTok Shop Affiliate Reviews (4 star)
  { id: "Eiu2iZH2epC", rating: 4, nickname: "Kiran J.", review: "can not believe it works outside the US its amazing", date: "2024-11-19", productHandle: "tiktok-shop-affiliate-account", verified: true },
  { id: "WJ183JGQa7o", rating: 4, nickname: "Ibrahim V.", review: "made back the money I invested in just 2 weeks, THANK YOU", date: "2024-11-18", productHandle: "tiktok-shop-affiliate-account", verified: true },
  { id: "2fY27N-g1Lj", rating: 4, nickname: "Charlotte G.", review: "legit have received 20+ free samples by using this account, crazy method for free stuff", date: "2024-11-17", productHandle: "tiktok-shop-affiliate-account", verified: true },
  { id: "VN-bgGat2ox", rating: 4, nickname: "Mason X.", review: "buy 3 accounts and the compund is crazy", date: "2024-11-11", productHandle: "tiktok-shop-affiliate-account", verified: true },
  { id: "6LxzDTXlxbB", rating: 4, nickname: "Leila T.", review: "Making average belgian wage from selling to kids, thanks", date: "2024-11-09", productHandle: "tiktok-shop-affiliate-account", verified: true },
  { id: "cXlM0Ahii2J", rating: 4, nickname: "Akio N.", review: "finally a method that works for people outside of the US", date: "2024-11-08", productHandle: "tiktok-shop-affiliate-account", verified: true },
  { id: "ywx2-7mbkiw", rating: 4, nickname: "Kiran G.", review: "thank you, now I don't have to put in weeks to be accepted into the affiliate program", date: "2024-11-05", productHandle: "tiktok-shop-affiliate-account", verified: true },
  { id: "hNm-z4UTJFJ", rating: 4, nickname: "Amara X.", review: "its so nice to not have to grind to 1k followers, followers", date: "2024-11-03", productHandle: "tiktok-shop-affiliate-account", verified: true },
  { id: "id4sQezTRho", rating: 4, nickname: "Olivia D.", review: "connected my paypal and got my first payment", date: "2024-11-01", productHandle: "tiktok-shop-affiliate-account", verified: true },
  { id: "ZjGrGUN6Fo", rating: 4, nickname: "Hana O.", review: "now I just need to find a good product to start selling", date: "2024-10-25", productHandle: "tiktok-shop-affiliate-account", verified: true },
  { id: "kwAcr8J-qR", rating: 4, nickname: "Liam F.", review: "Works well, e-sim instalation was a bit hard but they included a nice guide on how to do it so when I realized that it was easy really", date: "2024-10-19", productHandle: "tiktok-shop-affiliate-account", verified: true },
  { id: "xMe1g1mI8DH", rating: 4, nickname: "Liam F.", review: "easily the best account you can but", date: "2024-10-17", productHandle: "tiktok-shop-affiliate-account", verified: true },
  { id: "mryyCP0C4K1", rating: 4, nickname: "Sofia L.", review: "works in indonesia", date: "2024-10-09", productHandle: "tiktok-shop-affiliate-account", verified: true },
];

// Combine all reviews (images first for better display)
export const reviews: Review[] = [...reviewsWithImages, ...textOnlyReviews];

// Helper function to get ALL reviews (store-wide, not product-specific)
export const getAllReviews = (): Review[] => reviews;

// Get featured reviews (with images) - always returns all 8
export const getFeaturedReviews = (): Review[] => reviewsWithImages;

// Calculate average rating (store-wide)
export const getAverageRating = (): number => {
  // Based on total counts from CSV
  const total = TOTAL_5_STAR_COUNT * 5 + TOTAL_4_STAR_COUNT * 4 + TOTAL_3_STAR_COUNT * 3 + TOTAL_2_STAR_COUNT * 2 + TOTAL_1_STAR_COUNT * 1;
  return Math.round((total / TOTAL_REVIEW_COUNT) * 10) / 10;
};

// Get review count (store-wide)
export const getReviewCount = (): number => TOTAL_REVIEW_COUNT;

// Get rating breakdown (store-wide totals)
export const getRatingBreakdown = () => ({
  5: TOTAL_5_STAR_COUNT,
  4: TOTAL_4_STAR_COUNT,
  3: TOTAL_3_STAR_COUNT,
  2: TOTAL_2_STAR_COUNT,
  1: TOTAL_1_STAR_COUNT,
});

// Get count of reviews with images
export const getImageReviewCount = (): number => reviewsWithImages.length;
