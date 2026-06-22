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

export const REVIEW_COUNTS = {
  total: 1277,
  star5: 520,
  star4: 680,
  star3: 65,
  star2: 8,
  star1: 4,
  average: 4.06,
};

export const featuredReviews: Review[] = [
  { id: '2v4Q1', rating: 5, nickname: 'Ibrahim V.', review: 'I have officially made back the money I invested into this account, will buy another one with the money and then repeat the loop', date: '2024-11-01', productHandle: 'monetized-tiktok-account', verified: true, imageUrl: 'https://images.loox.io/uploads/2024/12/1/dWd2eorD8.jpg' },
  { id: 'dBLdk', rating: 5, nickname: 'Ava A.', review: 'The accounts are so good, RPM of 2.41 USD is just nuts', date: '2024-11-01', productHandle: 'monetized-tiktok-account', verified: true, imageUrl: 'https://images.loox.io/uploads/2024/12/1/pHaHeSI4V.jpg' },
  { id: 'dbZGM', rating: 5, nickname: 'Mei W.', review: "The channel was solid, 1k subs and organically grown as promised now look at what I have achieved since buying it, it's actually crazy", date: '2024-10-25', productHandle: 'youtube', verified: true, imageUrl: 'https://images.loox.io/uploads/2024/12/1/M6rDd--kp6d.jpg' },
  { id: 'HIuIa', rating: 5, nickname: 'Ethan A.', review: 'Fast delivery, no bots works fantastic. No problems with payments also and I am not even based in the US', date: '2024-10-25', productHandle: 'monetized-tiktok-account', verified: true, imageUrl: 'https://images.loox.io/uploads/2024/12/1/EFNkFX6vQl.jpg' },
  { id: 'W4Q0S', rating: 5, nickname: 'Sofia V.', review: "Bought the account, binged the course included and got my hands dirty and started. Less than 5 vids in and I have already got 800k views I'm so stoked!", date: '2024-10-18', productHandle: 'youtube', verified: true, imageUrl: 'https://images.loox.io/uploads/2024/12/1/chcZYxxvLuE.jpg' },
  { id: 'SF1dN', rating: 5, nickname: 'Charlotte G.', review: 'Guys this is absolutely crazy. 1 SHORT got 6.4M VIEWS and netted me 90k subscribers', date: '2024-10-09', productHandle: 'youtube', verified: true, imageUrl: 'https://images.loox.io/uploads/2024/12/1/CiT23r5fdRm.jpg' },
  { id: 'kj7RD', rating: 5, nickname: 'Kiran J.', review: "Can not believe it works outside the US it's amazing", date: '2024-11-19', productHandle: 'tiktok-shop-affiliate-account', verified: true, imageUrl: 'https://images.loox.io/uploads/2024/12/1/6D6L05-zU.jpg' },
  { id: 'hdDIL', rating: 5, nickname: 'Ryan R.', review: "Started earning right away, a couple of videos in now and I'm on my way to $1000", date: '2024-09-05', productHandle: 'youtube', verified: true, imageUrl: 'https://images.loox.io/uploads/2024/9/5/6MRaUwEry.jpg' },
  { id: 'sMxLi', rating: 5, nickname: 'Cole C.', review: 'AFFILIATES IS A MONEY MACHINE', date: '2024-09-05', productHandle: 'uk-tiktok-shop-affiliate-account', verified: true, imageUrl: 'https://images.loox.io/uploads/2024/9/5/JkkBC9ZF1.jpg' },
  { id: 'jsDpZ', rating: 5, nickname: 'Mason M.', review: 'Works as promised!! Already made my first dollars', date: '2024-09-05', productHandle: 'tiktok-shop-affiliate-account', verified: true, imageUrl: 'https://images.loox.io/uploads/2024/9/5/ormGB97TT.jpg' },
  { id: 'ysZq0', rating: 5, nickname: 'Drew D.', review: 'Came monetized and delivered quickly, already making money', date: '2024-09-05', productHandle: 'monetized-tiktok-account', verified: true, imageUrl: 'https://images.loox.io/uploads/2024/9/5/7mhuPMZzN.jpg' },
  { id: 'vlwZD', rating: 5, nickname: 'Liam L.', review: 'Account works as promised, came with over 10k followers and was monetized', date: '2024-09-05', productHandle: 'monetized-tiktok-account', verified: true, imageUrl: 'https://images.loox.io/uploads/2024/9/5/eLeof42Fe.jpg' },
  { id: 'n1', rating: 5, nickname: 'Noah H.', review: 'As expected', date: '2024-11-27', productHandle: 'monetized-tiktok-account', verified: true },
  { id: 'n2', rating: 5, nickname: 'Mia W.', review: 'Came with 10k followers', date: '2024-11-20', productHandle: 'monetized-tiktok-account', verified: true },
  { id: 'n3', rating: 5, nickname: 'Dylan I.', review: 'Got the account, more than 10k followers, just need to read the niche list included and start from there', date: '2024-11-03', productHandle: 'monetized-tiktok-account', verified: true },
  { id: 'n4', rating: 4, nickname: 'Ling Z.', review: 'Works as expected', date: '2024-11-29', productHandle: 'monetized-tiktok-account', verified: true },
  { id: 'n5', rating: 5, nickname: 'Mateo V.', review: "Making money from TikTok but also selling my own product via the traffic, I'm ballin right now", date: '2024-11-02', productHandle: 'monetized-tiktok-account', verified: true },
  { id: 'n6', rating: 5, nickname: 'James O.', review: "My account's already earning with the TikTok Shop affiliate program, insane value", date: '2024-06-14', productHandle: 'tiktok-shop-affiliate-account', verified: true, imageUrl: 'https://images.loox.io/uploads/2024/12/1/ZVI1PFF_xm.jpg' },
  { id: 'n7', rating: 5, nickname: 'Aarav M.', review: 'Monetized as promised', date: '2024-10-09', productHandle: 'youtube', verified: true, imageUrl: 'https://images.loox.io/uploads/2024/12/1/Y58JBZ4Wv.jpg' },
  { id: 'n8', rating: 5, nickname: 'Ava G.', review: 'Crazy good quality of the channel', date: '2024-06-06', productHandle: 'youtube', verified: true, imageUrl: 'https://images.loox.io/uploads/2024/12/1/nhZPuNgQST.jpg' },
];

export function getReviewsForProduct(handle: string): Review[] {
  const productReviews = featuredReviews.filter((r) => r.productHandle === handle);
  if (productReviews.length >= 4) return productReviews;
  const others = featuredReviews.filter((r) => r.productHandle !== handle).slice(0, 8 - productReviews.length);
  return [...productReviews, ...others];
}
