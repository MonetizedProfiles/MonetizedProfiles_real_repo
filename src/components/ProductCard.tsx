import { ShopifyProduct } from "@/lib/shopify";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Check, Star } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ReviewsPopup } from "@/components/ReviewsPopup";
import { getAverageRating, getReviewCount } from "@/data/reviews";

interface ProductCardProps {
  product: ShopifyProduct;
}

// Helper function to get store-wide rating
const getProductRating = (): number => {
  return getAverageRating();
};
// Helper function to get product description based on product type
const getProductDescription = (productTitle: string): string => {
  const title = productTitle.toLowerCase();
  
  if (title.includes('monetized youtube') || (title.includes('youtube') && title.includes('monetized'))) {
    return "Partner Program approved channel with 1,000 subscribers and 4,000 watch hours";
  }
  if (title.includes('aged youtube') || (title.includes('youtube') && title.includes('aged'))) {
    return "Algorithm boosted channel created in 2010 or older";
  }
  if (title.includes('us shop') || (title.includes('shop') && title.includes('us'))) {
    return "TikTok Shop Affiliate Program approved account with 5,000 US followers";
  }
  if (title.includes('uk shop') || (title.includes('shop') && title.includes('uk'))) {
    return "TikTok Shop Affiliate Program approved account with 5,000 UK followers";
  }
  if (title.includes('niche list') || title.includes('viral') && title.includes('list')) {
    return "50+ TikTok and YouTube niches chosen by professionals";
  }
  if (title.includes('tiktok') || title.includes('monetized')) {
    return "Monetization enabled account with 10,000 organic followers";
  }
  
  return "Fully monetized account with organic followers - start earning immediately";
};

export const ProductCard = ({ product }: ProductCardProps) => {
  const navigate = useNavigate();
  const addItem = useCartStore(state => state.addItem);
  const [added, setAdded] = useState(false);
  const [reviewsOpen, setReviewsOpen] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    const variant = product.node.variants.edges[0].node;
    
    const cartItem = {
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || []
    };
    
    addItem(cartItem);
    setAdded(true);
    toast.success("Added to cart", {
      position: "top-center",
    });
    
    setTimeout(() => setAdded(false), 2000);
  };

  const handleOpenReviews = (e: React.MouseEvent) => {
    e.stopPropagation();
    setReviewsOpen(true);
  };

  const price = parseFloat(product.node.priceRange.minVariantPrice.amount);
  const currency = product.node.priceRange.minVariantPrice.currencyCode;
  const image = product.node.images.edges[0]?.node.url;
  const rating = getProductRating();
  const reviewCount = getReviewCount();

  return (
    <>
      <Card 
        className="group cursor-pointer overflow-hidden hover:border-primary transition-all duration-300 hover:shadow-glow bg-card"
        onClick={() => navigate(`/products/${product.node.handle}`)}
      >
        <div className="aspect-square overflow-hidden bg-secondary relative">
          {image ? (
            <img 
              src={image} 
              alt={product.node.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <ShoppingCart className="w-12 h-12 text-muted-foreground" />
            </div>
          )}
          
          {/* Clickable Review Badge */}
          <button
            onClick={handleOpenReviews}
            className="absolute top-3 right-3 bg-background/95 text-foreground border shadow-sm rounded-full px-2 py-1 flex items-center gap-1 hover:bg-background transition-colors"
          >
            <Star className="w-3 h-3 fill-primary text-primary" />
            <span className="font-semibold text-sm">{rating.toFixed(1)}</span>
            <span className="text-xs text-muted-foreground">({reviewCount})</span>
          </button>
        </div>
      
      <CardHeader>
        <CardTitle className="line-clamp-1 text-[1.35rem] sm:text-2xl">{product.node.title}</CardTitle>
        <CardDescription className="line-clamp-2">
          {getProductDescription(product.node.title)}
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <p className="text-2xl font-bold text-primary">
          ${price.toFixed(2)} {currency}
        </p>
      </CardContent>
      
      <CardFooter>
        <Button 
          className="w-full group/btn"
          onClick={handleAddToCart}
          disabled={added}
        >
          {added ? (
            <>
              <Check className="w-4 h-4 mr-2" />
              Added to Cart
            </>
          ) : (
            <>
              <ShoppingCart className="w-4 h-4 mr-2 group-hover/btn:scale-110 transition-transform" />
              Add to Cart
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
    
    <ReviewsPopup 
      isOpen={reviewsOpen} 
      onClose={() => setReviewsOpen(false)} 
      productHandle={product.node.handle}
    />
  </>
  );
};
