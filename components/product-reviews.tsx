import { Star, CheckCircle } from 'lucide-react';
import Image from 'next/image';
import { getReviewsForProduct, REVIEW_COUNTS } from '@/data/reviews';

export function ProductReviews({ handle }: { handle: string }) {
  const reviews = getReviewsForProduct(handle).slice(0, 12);
  if (reviews.length === 0) return null;

  return (
    <section className="mt-16 border-t border-border pt-12">
      <h2 className="text-2xl font-bold mb-2">Customer Reviews</h2>
      <div className="flex items-center gap-2 mb-8">
        <div className="flex">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className={`h-5 w-5 ${i < 4 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
          ))}
        </div>
        <span className="text-sm text-muted-foreground">
          Based on {REVIEW_COUNTS.total} reviews
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reviews.map((review) => (
          <div key={review.id} className="border border-border rounded-lg p-5">
            <div className="flex items-center gap-1 mb-2">
              {Array.from({ length: review.rating }).map((_, j) => (
                <Star key={j} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            <p className="text-sm mb-3">{review.review}</p>
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
                  <span>Verified</span>
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
