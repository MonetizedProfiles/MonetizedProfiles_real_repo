import { Star, CheckCircle } from 'lucide-react';
import Image from 'next/image';
import { featuredReviews } from '@/data/reviews';
import { TRUST_STATS } from '@/lib/constants';

export function ReviewCarousel() {
  return (
    <section className="py-16 md:py-24 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            {TRUST_STATS.totalReviews}+ Verified Reviews
          </h2>
          <p className="text-muted-foreground">Real results from real customers</p>
        </div>
      </div>

      <div className="flex gap-6 animate-scroll-left hover:[animation-play-state:paused]">
        {[...featuredReviews, ...featuredReviews].map((review, i) => (
          <div
            key={`${review.id}-${i}`}
            className="flex-shrink-0 w-[350px] bg-background border border-border rounded-xl p-6"
          >
            <div className="flex items-center gap-1 mb-3">
              {Array.from({ length: review.rating }).map((_, j) => (
                <Star key={j} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            <p className="text-sm mb-4 line-clamp-3">&ldquo;{review.review}&rdquo;</p>
            {review.imageUrl && (
              <div className="relative w-full h-40 rounded-lg overflow-hidden mb-3">
                <Image src={review.imageUrl} alt={`Review by ${review.nickname}`} fill className="object-cover" sizes="350px" />
              </div>
            )}
            <div className="flex items-center gap-2 text-sm">
              <span className="font-medium">{review.nickname}</span>
              {review.verified && <CheckCircle className="h-4 w-4 text-green-500" />}
              <span className="text-muted-foreground">Verified Buyer</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
