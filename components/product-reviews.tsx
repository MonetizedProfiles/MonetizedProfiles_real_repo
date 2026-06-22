import { Star, CheckCircle } from 'lucide-react';
import Image from 'next/image';
import { getReviewsForProduct, REVIEW_COUNTS } from '@/data/reviews';

function StarBar({ stars, count, total }: { stars: number; count: number; total: number }) {
  const pct = total > 0 ? (count / total) * 100 : 0;
  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="w-12 text-right text-muted-foreground">{stars} star</span>
      <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
        <div className="h-full bg-yellow-400 rounded-full" style={{ width: `${pct}%` }} />
      </div>
      <span className="w-10 text-muted-foreground">{count}</span>
    </div>
  );
}

export function ProductReviews({ handle }: { handle: string }) {
  const reviews = getReviewsForProduct(handle).slice(0, 12);
  if (reviews.length === 0) return null;

  return (
    <section className="mt-16 border-t border-border pt-12">
      <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>

      {/* Rating Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        <div className="flex items-center gap-6">
          <div className="text-center">
            <div className="text-5xl font-bold">{REVIEW_COUNTS.average}</div>
            <div className="flex mt-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={`h-4 w-4 ${i < Math.round(REVIEW_COUNTS.average) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'}`} />
              ))}
            </div>
            <p className="text-sm text-muted-foreground mt-1">{REVIEW_COUNTS.total} reviews</p>
          </div>
          <div className="flex-1 space-y-1.5">
            <StarBar stars={5} count={REVIEW_COUNTS.star5} total={REVIEW_COUNTS.total} />
            <StarBar stars={4} count={REVIEW_COUNTS.star4} total={REVIEW_COUNTS.total} />
            <StarBar stars={3} count={REVIEW_COUNTS.star3} total={REVIEW_COUNTS.total} />
            <StarBar stars={2} count={REVIEW_COUNTS.star2} total={REVIEW_COUNTS.total} />
            <StarBar stars={1} count={REVIEW_COUNTS.star1} total={REVIEW_COUNTS.total} />
          </div>
        </div>
        <div className="flex items-center justify-center md:justify-end">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-green-700">94%</p>
            <p className="text-sm text-green-600">of buyers rate us 4+ stars</p>
            <p className="text-xs text-muted-foreground mt-1">Based on {REVIEW_COUNTS.total} verified purchases</p>
          </div>
        </div>
      </div>

      {/* Review Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reviews.map((review) => (
          <div key={review.id} className="border border-border rounded-lg p-5">
            <div className="flex items-center gap-1 mb-2">
              {Array.from({ length: review.rating }).map((_, j) => (
                <Star key={j} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
              ))}
              {Array.from({ length: 5 - review.rating }).map((_, j) => (
                <Star key={`e${j}`} className="h-4 w-4 text-gray-200" />
              ))}
            </div>
            <p className="text-sm mb-3">&ldquo;{review.review}&rdquo;</p>
            {review.imageUrl && (
              <div className="relative w-full h-48 rounded-lg overflow-hidden mb-3">
                <Image src={review.imageUrl} alt={`Review by ${review.nickname}`} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
              </div>
            )}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="font-medium text-foreground">{review.nickname}</span>
              {review.verified && (
                <>
                  <CheckCircle className="h-3.5 w-3.5 text-green-500" />
                  <span>Verified Buyer</span>
                </>
              )}
              <span className="ml-auto">{new Date(review.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
