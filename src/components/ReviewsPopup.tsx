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
import { Star, CheckCircle, ImageIcon, X, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  reviews, 
  getAllReviews,
  getAverageRating, 
  getReviewCount, 
  getFeaturedReviews, 
  getRatingBreakdown,
  getImageReviewCount,
  getReviewsWithImages,
  getProductDisplayName,
  TOTAL_REVIEW_COUNT,
  Review 
} from "@/data/reviews";

interface ReviewsPopupProps {
  isOpen: boolean;
  onClose: () => void;
  productHandle?: string;
}

type FilterType = "all" | "5" | "4" | "3" | "with-images";
type ProductFilterType = "all" | string;

// Get unique product handles from reviews
const getUniqueProducts = (): { handle: string; name: string; count: number }[] => {
  const allReviews = getAllReviews();
  const productCounts: Record<string, number> = {};
  
  allReviews.forEach(review => {
    productCounts[review.productHandle] = (productCounts[review.productHandle] || 0) + 1;
  });
  
  return Object.entries(productCounts)
    .map(([handle, count]) => ({
      handle,
      name: getProductDisplayName(handle),
      count
    }))
    .sort((a, b) => b.count - a.count);
};

export const ReviewsPopup = ({ isOpen, onClose }: ReviewsPopupProps) => {
  const [filter, setFilter] = useState<FilterType>("all");
  const [productFilter, setProductFilter] = useState<ProductFilterType>("all");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Always use ALL store reviews, not product-specific
  const allReviews = getAllReviews();
  const avgRating = getAverageRating();
  const totalCount = getReviewCount();
  const ratingBreakdown = getRatingBreakdown();
  const imageReviewCount = getImageReviewCount();
  const uniqueProducts = useMemo(() => getUniqueProducts(), []);

  // Get all reviews with images for the filter
  const reviewsWithImages = useMemo(() => getReviewsWithImages(), []);

  const filteredReviews = useMemo(() => {
    let filtered: Review[];
    
    // First apply rating/image filter
    switch (filter) {
      case "5":
        filtered = allReviews.filter(r => r.rating === 5);
        break;
      case "4":
        filtered = allReviews.filter(r => r.rating === 4);
        break;
      case "3":
        filtered = allReviews.filter(r => r.rating <= 3);
        break;
      case "with-images":
        // Use the dedicated reviewsWithImages array for accurate filtering
        filtered = [...reviewsWithImages];
        break;
      default:
        filtered = [...allReviews];
    }
    
    // Then apply product filter
    if (productFilter !== "all") {
      filtered = filtered.filter(r => r.productHandle === productFilter);
    }
    
    // Sort: 5-star with images first, then by rating, then by date
    return filtered.sort((a, b) => {
      // First prioritize 5-star reviews with images
      const aHasImage = !!a.imageUrl;
      const bHasImage = !!b.imageUrl;
      const aIs5Star = a.rating === 5;
      const bIs5Star = b.rating === 5;
      
      if (aIs5Star && aHasImage && !(bIs5Star && bHasImage)) return -1;
      if (bIs5Star && bHasImage && !(aIs5Star && aHasImage)) return 1;
      
      // Then by rating
      if (b.rating !== a.rating) return b.rating - a.rating;
      
      // Then by date
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  }, [allReviews, filter, productFilter, reviewsWithImages]);

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

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="w-[95vw] max-w-4xl max-h-[90vh] p-0 gap-0 overflow-hidden">
          <DialogHeader className="p-4 sm:p-6 pb-4 border-b">
            <DialogTitle className="text-lg sm:text-xl font-bold">Customer Reviews</DialogTitle>
            
            {/* Rating Summary - Responsive layout */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-4">
              <div className="flex flex-row sm:flex-col items-center gap-3 sm:gap-0">
                <span className="text-3xl sm:text-4xl font-bold">{avgRating.toFixed(1)}</span>
                <div className="flex flex-col items-start sm:items-center">
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-4 sm:w-5 h-4 sm:h-5 ${
                          star <= Math.round(avgRating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "fill-muted text-muted"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs sm:text-sm text-muted-foreground mt-1">
                    {totalCount.toLocaleString()} reviews
                  </span>
                </div>
              </div>
              
              {/* Rating Bars - Full width on mobile */}
              <div className="flex-1 w-full min-w-0 space-y-1 overflow-hidden">
                {[5, 4, 3, 2, 1].map((rating) => {
                  const count = ratingBreakdown[rating as keyof typeof ratingBreakdown];
                  const percentage = totalCount > 0 ? (count / totalCount) * 100 : 0;
                  return (
                    <button
                      key={rating}
                      onClick={() => setFilter(rating >= 4 ? rating.toString() as FilterType : "3")}
                      className="flex items-center gap-1.5 sm:gap-2 w-full hover:opacity-80 transition-opacity"
                    >
                      <span className="text-xs sm:text-sm w-3 flex-shrink-0">{rating}</span>
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400 flex-shrink-0" />
                      <div className="flex-1 min-w-0 h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-amber-400 rounded-full transition-all"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground w-6 sm:w-8 text-right flex-shrink-0">{count}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Featured Images - Responsive grid */}
            {featuredReviews.length > 0 && (
              <div className="mt-4">
                <h4 className="text-sm font-medium mb-2">Customer Photos ({featuredReviews.length})</h4>
                <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
                  {featuredReviews.map((review) => (
                    <button
                      key={review.id}
                      onClick={() => setSelectedImage(review.imageUrl!)}
                      className="flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-lg overflow-hidden border hover:border-primary transition-colors"
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

            {/* Filter Buttons - Responsive wrap */}
            <div className="flex flex-wrap gap-2 mt-4">
              <Button
                variant={filter === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter("all")}
                className="text-xs sm:text-sm"
              >
                All
              </Button>
              <Button
                variant={filter === "5" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter("5")}
                className="text-xs sm:text-sm"
              >
                5★ ({ratingBreakdown[5]})
              </Button>
              <Button
                variant={filter === "4" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter("4")}
                className="text-xs sm:text-sm"
              >
                4★ ({ratingBreakdown[4]})
              </Button>
              <Button
                variant={filter === "with-images" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter("with-images")}
                className="text-xs sm:text-sm"
              >
                <ImageIcon className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                Photos ({imageReviewCount})
              </Button>
              
              {/* Product Filter Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant={productFilter !== "all" ? "default" : "outline"}
                    size="sm"
                    className="text-xs sm:text-sm"
                  >
                    {productFilter === "all" ? "All Products" : getProductDisplayName(productFilter)}
                    <ChevronDown className="w-3 h-3 ml-1" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="bg-popover z-50">
                  <DropdownMenuItem onClick={() => setProductFilter("all")}>
                    All Products
                  </DropdownMenuItem>
                  {uniqueProducts.map(product => (
                    <DropdownMenuItem 
                      key={product.handle}
                      onClick={() => setProductFilter(product.handle)}
                    >
                      {product.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </DialogHeader>

          {/* Reviews List */}
          <ScrollArea className="flex-1 max-h-[50vh]">
            <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
              {filteredReviews.map((review) => (
                <div key={review.id} className="pb-4 sm:pb-6 border-b last:border-0">
                  <div className="flex items-start justify-between gap-3 sm:gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="font-semibold text-sm sm:text-base">{review.nickname}</span>
                        {review.verified && (
                          <Badge variant="secondary" className="text-[10px] sm:text-xs gap-1">
                            <CheckCircle className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                            Verified
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        {renderStars(review.rating)}
                        <span className="text-[10px] sm:text-xs text-muted-foreground">
                          {formatDate(review.date)}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-foreground/90 break-words">{review.review}</p>
                      <span className="text-[10px] sm:text-xs text-muted-foreground mt-1 inline-block">
                        {getProductDisplayName(review.productHandle)}
                      </span>
                    </div>
                    
                    {review.imageUrl && (
                      <button
                        onClick={() => setSelectedImage(review.imageUrl!)}
                        className="flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border hover:border-primary transition-colors"
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
                <div className="text-center py-8 text-muted-foreground text-sm">
                  No reviews found for this filter.
                </div>
              )}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      {/* Image Lightbox */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="w-[95vw] max-w-3xl p-2">
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
  onOpenReviews: () => void;
  showCount?: boolean;
  size?: "sm" | "md" | "lg";
}

export const ClickableRating = ({ 
  rating, 
  onOpenReviews, 
  showCount = true,
  size = "md" 
}: ClickableRatingProps) => {
  const count = getReviewCount();
  
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
