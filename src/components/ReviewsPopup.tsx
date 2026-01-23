import { useState, useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Star, CheckCircle, ImageIcon, X } from "lucide-react";
import { reviews, getReviewsByProduct, getAverageRating, getReviewCount, getFeaturedReviews, Review } from "@/data/reviews";

interface ReviewsPopupProps {
  isOpen: boolean;
  onClose: () => void;
  productHandle?: string;
}

type FilterType = "all" | "5" | "4" | "3" | "with-images";

export const ReviewsPopup = ({ isOpen, onClose, productHandle }: ReviewsPopupProps) => {
  const [filter, setFilter] = useState<FilterType>("all");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const allReviews = productHandle ? getReviewsByProduct(productHandle) : reviews;
  const avgRating = getAverageRating(productHandle);
  const totalCount = getReviewCount(productHandle);

  const filteredReviews = useMemo(() => {
    let filtered = [...allReviews];
    
    switch (filter) {
      case "5":
        filtered = filtered.filter(r => r.rating === 5);
        break;
      case "4":
        filtered = filtered.filter(r => r.rating === 4);
        break;
      case "3":
        filtered = filtered.filter(r => r.rating <= 3);
        break;
      case "with-images":
        filtered = filtered.filter(r => r.imageUrl);
        break;
    }
    
    // Sort by date (newest first), then by rating
    return filtered.sort((a, b) => {
      const dateCompare = new Date(b.date).getTime() - new Date(a.date).getTime();
      if (dateCompare !== 0) return dateCompare;
      return b.rating - a.rating;
    });
  }, [allReviews, filter]);

  const featuredReviews = getFeaturedReviews();

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating
                ? "fill-yellow-400 text-yellow-400"
                : "fill-muted text-muted"
            }`}
          />
        ))}
      </div>
    );
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Rating breakdown
  const ratingCounts = useMemo(() => {
    const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    allReviews.forEach(r => {
      if (r.rating >= 1 && r.rating <= 5) {
        counts[r.rating as keyof typeof counts]++;
      }
    });
    return counts;
  }, [allReviews]);

  const imageReviewCount = allReviews.filter(r => r.imageUrl).length;

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl max-h-[90vh] p-0 gap-0 overflow-hidden">
          <DialogHeader className="p-6 pb-4 border-b">
            <DialogTitle className="text-xl font-bold">Customer Reviews</DialogTitle>
            
            {/* Rating Summary */}
            <div className="flex items-center gap-4 mt-4">
              <div className="flex flex-col items-center">
                <span className="text-4xl font-bold">{avgRating.toFixed(1)}</span>
                <div className="flex gap-0.5 mt-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-5 h-5 ${
                        star <= Math.round(avgRating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "fill-muted text-muted"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground mt-1">
                  {totalCount.toLocaleString()} reviews
                </span>
              </div>
              
              {/* Rating Bars */}
              <div className="flex-1 space-y-1">
                {[5, 4, 3, 2, 1].map((rating) => {
                  const count = ratingCounts[rating as keyof typeof ratingCounts];
                  const percentage = allReviews.length > 0 ? (count / allReviews.length) * 100 : 0;
                  return (
                    <button
                      key={rating}
                      onClick={() => setFilter(rating >= 4 ? rating.toString() as FilterType : "3")}
                      className="flex items-center gap-2 w-full hover:opacity-80 transition-opacity"
                    >
                      <span className="text-sm w-3">{rating}</span>
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-yellow-400 rounded-full transition-all"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground w-8">{count}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Featured Images */}
            {featuredReviews.length > 0 && (
              <div className="mt-4">
                <h4 className="text-sm font-medium mb-2">Customer Photos</h4>
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {featuredReviews.slice(0, 6).map((review) => (
                    <button
                      key={review.id}
                      onClick={() => setSelectedImage(review.imageUrl!)}
                      className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border hover:border-primary transition-colors"
                    >
                      <img
                        src={review.imageUrl}
                        alt={`Review by ${review.nickname}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-2 mt-4">
              <Button
                variant={filter === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter("all")}
              >
                All Reviews
              </Button>
              <Button
                variant={filter === "5" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter("5")}
              >
                5 Star ({ratingCounts[5]})
              </Button>
              <Button
                variant={filter === "4" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter("4")}
              >
                4 Star ({ratingCounts[4]})
              </Button>
              <Button
                variant={filter === "with-images" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter("with-images")}
              >
                <ImageIcon className="w-4 h-4 mr-1" />
                With Photos ({imageReviewCount})
              </Button>
            </div>
          </DialogHeader>

          {/* Reviews List */}
          <ScrollArea className="flex-1 max-h-[50vh]">
            <div className="p-6 space-y-6">
              {filteredReviews.map((review) => (
                <div key={review.id} className="pb-6 border-b last:border-0">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold">{review.nickname}</span>
                        {review.verified && (
                          <Badge variant="secondary" className="text-xs gap-1">
                            <CheckCircle className="w-3 h-3" />
                            Verified Purchase
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        {renderStars(review.rating)}
                        <span className="text-xs text-muted-foreground">
                          {formatDate(review.date)}
                        </span>
                      </div>
                      <p className="text-sm text-foreground/90">{review.review}</p>
                    </div>
                    
                    {review.imageUrl && (
                      <button
                        onClick={() => setSelectedImage(review.imageUrl!)}
                        className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border hover:border-primary transition-colors"
                      >
                        <img
                          src={review.imageUrl}
                          alt={`Review by ${review.nickname}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    )}
                  </div>
                </div>
              ))}
              
              {filteredReviews.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  No reviews found for this filter.
                </div>
              )}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      {/* Image Lightbox */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-3xl p-2">
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute right-4 top-4 z-10 p-2 bg-background/80 rounded-full hover:bg-background transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          {selectedImage && (
            <img
              src={selectedImage}
              alt="Review image"
              className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

// Clickable stars component for triggering the popup
interface ClickableRatingProps {
  rating: number;
  productHandle?: string;
  onOpenReviews: () => void;
  showCount?: boolean;
  size?: "sm" | "md" | "lg";
}

export const ClickableRating = ({ 
  rating, 
  productHandle, 
  onOpenReviews, 
  showCount = true,
  size = "md" 
}: ClickableRatingProps) => {
  const count = getReviewCount(productHandle);
  
  const sizeClasses = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5"
  };

  const textSizeClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base"
  };

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onOpenReviews();
      }}
      className="flex items-center gap-1 hover:opacity-80 transition-opacity cursor-pointer"
    >
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${sizeClasses[size]} ${
              star <= Math.round(rating)
                ? "fill-yellow-400 text-yellow-400"
                : "fill-muted text-muted"
            }`}
          />
        ))}
      </div>
      <span className={`font-semibold ${textSizeClasses[size]}`}>
        {rating.toFixed(1)}
      </span>
      {showCount && (
        <span className={`text-muted-foreground ${textSizeClasses[size]}`}>
          ({count.toLocaleString()})
        </span>
      )}
    </button>
  );
};
