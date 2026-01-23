import { useParams, useNavigate, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { PRODUCT_BY_HANDLE_QUERY, storefrontApiRequest, STOREFRONT_QUERY, ShopifyProduct } from "@/lib/shopify";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";
import { ShoppingCart, Check, ShieldCheck, Truck, RefreshCw, ChevronLeft, Star, ChevronRight, Users, Zap, Mail, HelpCircle, ChevronDown } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState, useRef, useEffect, useCallback } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ProductCard } from "@/components/ProductCard";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { StockIndicator } from "@/components/StockIndicator";
import { SEO } from "@/components/SEO";
import { useDynamicStock } from "@/hooks/useDynamicStock";
import { ReviewsPopup } from "@/components/ReviewsPopup";
import { getAverageRating, getReviewCount } from "@/data/reviews";
import sarahImg from "@/assets/testimonials/sarah.webp";
import justjamestvImg from "@/assets/testimonials/justjamestv.webp";
import mikeImg from "@/assets/testimonials/mike.webp";
import emmaImg from "@/assets/testimonials/emma.webp";
import lisaImg from "@/assets/testimonials/lisa.webp";
import davidImg from "@/assets/testimonials/david.webp";
import michaelImg from "@/assets/testimonials/michael.webp";
import blockbusterzImg from "@/assets/testimonials/blockbusterz.webp";
import tomImg from "@/assets/testimonials/tom.webp";
import howtoaiImg from "@/assets/testimonials/howtoai.webp";

const emailSchema = z.object({
  email: z.string().trim().email({ message: "Please enter a valid email address" }).max(255, { message: "Email must be less than 255 characters" })
});

const gmailSchema = z.object({
  email: z.string()
    .trim()
    .min(1, { message: "Gmail address is required" })
    .max(255, { message: "Email must be less than 255 characters" })
    .email({ message: "Please enter a valid email address" })
    .refine(
      (email) => email.toLowerCase().endsWith('@gmail.com'),
      { message: "Please enter a valid Gmail address (@gmail.com only)" }
    )
});

// Helper function to get store-wide rating
const getProductRating = (): number => {
  return getAverageRating();
};
const ProductDetail = () => {
  const { handle } = useParams();
  const navigate = useNavigate();
  const addItem = useCartStore(state => state.addItem);
  const dynamicStock = useDynamicStock();
  const [added, setAdded] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [mainImage, setMainImage] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [accountsSoldThisMonth, setAccountsSoldThisMonth] = useState(639 + Math.floor(Math.random() * 10));
  const [restockEmail, setRestockEmail] = useState("");
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftStart, setScrollLeftStart] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [ownershipGmail, setOwnershipGmail] = useState("");
  const [gmailError, setGmailError] = useState("");
  const [reviewsOpen, setReviewsOpen] = useState(false);

  const { data: product, isLoading } = useQuery({
    queryKey: ['product', handle],
    queryFn: async () => {
      const response = await storefrontApiRequest(PRODUCT_BY_HANDLE_QUERY, { handle });
      const productData = response.data.productByHandle;
      
      // Track product view (anonymous - no email needed for browsing)
      // Only track if we have a stored email from previous interaction
      const storedEmail = localStorage.getItem('klaviyo_email');
      if (storedEmail && productData) {
        try {
          const { trackKlaviyoEvent } = await import("@/lib/klaviyo");
          await trackKlaviyoEvent(storedEmail, "Viewed Product", {
            product_name: productData.title,
            product_handle: productData.handle,
            product_price: productData.variants?.edges?.[0]?.node?.price?.amount || "0",
            currency: productData.variants?.edges?.[0]?.node?.price?.currencyCode || "USD",
          });
        } catch (error) {
          console.error("Failed to track product view:", error);
        }
      }
      
      return productData;
    },
    enabled: !!handle,
  });

  const { data: allProducts } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await storefrontApiRequest(STOREFRONT_QUERY, { first: 20 });
      return response.data.products.edges as ShopifyProduct[];
    },
  });

  // Determine if YouTube product (monetized or aged) for handleAddToCart
  const getIsYouTubeProduct = () => {
    if (!product) return false;
    const handleLower = (handle || product.handle || '').toLowerCase();
    const titleLower = product.title.toLowerCase();
    const isMonetized = (handleLower.includes('youtube') && (handleLower.includes('monetiz') || titleLower.includes('monetiz'))) || titleLower.includes('monetized youtube');
    const isAged = (handleLower.includes('aged') && handleLower.includes('youtube')) || titleLower.includes('aged youtube');
    return isMonetized || isAged;
  };

  const handleAddToCart = () => {
    if (!product) return;
    
    const isYouTube = getIsYouTubeProduct();
    
    // Validate Gmail for YouTube products
    if (isYouTube) {
      try {
        gmailSchema.parse({ email: ownershipGmail });
        setGmailError("");
      } catch (error) {
        if (error instanceof z.ZodError) {
          setGmailError(error.errors[0].message);
          toast.error(error.errors[0].message, {
            position: "top-center",
          });
        }
        return;
      }
    }
    
    const variant = product.variants.edges[selectedVariant].node;
    
    const cartItem = {
      product: { node: product },
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || [],
      attributes: isYouTube ? [
        { key: "Ownership Gmail", value: ownershipGmail.trim() }
      ] : undefined
    };
    
    addItem(cartItem);
    setAdded(true);
    toast.success("Added to cart", {
      position: "top-center",
    });
    
    setTimeout(() => setAdded(false), 2000);
  };

  // Check scroll position
  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);

      const maxScroll = Math.max(scrollWidth - clientWidth, 1);
      const progress = Math.min(Math.max(scrollLeft / maxScroll, 0), 1) * 100;
      setScrollProgress(progress);
    }
  };

  useEffect(() => {
    checkScrollButtons();
    window.addEventListener('resize', checkScrollButtons);
    return () => window.removeEventListener('resize', checkScrollButtons);
  }, [allProducts]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.clientWidth;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
      setTimeout(checkScrollButtons, 300);
    }
  };

  // Increment monthly accounts sold counter randomly every 10-25 seconds
  useEffect(() => {
    const incrementMonthlyCounter = () => {
      setAccountsSoldThisMonth(prev => prev + 1);
      const nextInterval = (Math.random() * 15000) + 10000; // 10-25 seconds
      setTimeout(incrementMonthlyCounter, nextInterval);
    };
    
    const initialDelay = (Math.random() * 15000) + 10000;
    const timeoutId = setTimeout(incrementMonthlyCounter, initialDelay);
    
    return () => clearTimeout(timeoutId);
  }, []);

  // Drag to scroll handlers (mobile only)
  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!scrollContainerRef.current || window.innerWidth >= 640) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeftStart(scrollContainerRef.current.scrollLeft);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.style.scrollBehavior = 'auto';
    }
  }, []);

  const handleTouchStart = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    if (!scrollContainerRef.current || window.innerWidth >= 640) return;
    setIsDragging(true);
    setStartX(e.touches[0].pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeftStart(scrollContainerRef.current.scrollLeft);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.style.scrollBehavior = 'auto';
    }
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !scrollContainerRef.current || window.innerWidth >= 640) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 1.2;
    scrollContainerRef.current.scrollLeft = scrollLeftStart - walk;
  }, [isDragging, startX, scrollLeftStart]);

  const handleTouchMove = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging || !scrollContainerRef.current || window.innerWidth >= 640) return;
    const x = e.touches[0].pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 1.2;
    scrollContainerRef.current.scrollLeft = scrollLeftStart - walk;
  }, [isDragging, startX, scrollLeftStart]);

  const handleMouseUpOrLeave = useCallback(() => {
    setIsDragging(false);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.style.scrollBehavior = 'smooth';
    }
  }, []);

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.style.scrollBehavior = 'smooth';
    }
  }, []);

  const handleRestockEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const validated = emailSchema.parse({ email: restockEmail });
      
      // Subscribe to Klaviyo with restock interest
      const { subscribeToKlaviyo } = await import("@/lib/klaviyo");
      await subscribeToKlaviyo(validated.email, {
        source: "product_restock_notification",
        restock_interest: true,
        product_handle: product?.handle || handle,
        product_name: product?.title || "",
      });
      
      localStorage.setItem('klaviyo_email', validated.email);
      
      setEmailSubmitted(true);
      toast.success("You're on the list!", {
        description: "We'll notify you when this product is back in stock.",
        position: "top-center",
      });
      
      setRestockEmail("");
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error(error.errors[0].message, {
          position: "top-center",
        });
      } else {
        toast.error("Failed to subscribe. Please try again.", {
          position: "top-center",
        });
      }
    }
  };

  if (isLoading) {
    return (
      <div className="bg-background">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-2 gap-12">
            <Skeleton className="aspect-square w-full" />
            <div className="space-y-6">
              <Skeleton className="h-12 w-3/4" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-10 w-1/3" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="bg-background flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Product not found</h2>
          <Button onClick={() => navigate('/')}>Return to Home</Button>
        </div>
      </div>
    );
  }

  const currentVariant = product.variants.edges[selectedVariant].node;
  const price = parseFloat(currentVariant.price.amount);
  const currency = currentVariant.price.currencyCode;
  const images = product.images.edges;
  const rating = getProductRating();
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  const handleLower = (handle || product.handle || '').toLowerCase();
  const titleLower = product.title.toLowerCase();
  const isTikTokMonetized = handleLower.includes('tiktok') || titleLower.includes('tiktok');
  const isYouTubeMonetized = (handleLower.includes('youtube') && (handleLower.includes('monetiz') || titleLower.includes('monetiz'))) || titleLower.includes('monetized youtube');
  const isYouTubeAged = (handleLower.includes('aged') && handleLower.includes('youtube')) || titleLower.includes('aged youtube');
  const isInstagramAged = (handleLower.includes('aged') && handleLower.includes('instagram')) || titleLower.includes('aged instagram');
  
  // Check if this is the Monetized TikTok Account product (for dynamic stock)
  const isMonetizedTikTokAccount = handleLower === 'monetized-tiktok-account';

  // Get related products (exclude current product, limit to 3)
  const relatedProducts = allProducts?.filter(p => p.node.id !== product.id).slice(0, 3) || [];

  return (
    <>
      <SEO 
        title={`${product.title} - Buy Monetized Account`}
        description={product.description.substring(0, 155) + "..." || `Buy ${product.title} - Fully monetized account with organic followers. Secure transfer, instant earnings.`}
        keywords={`${product.title}, buy monetized account, ${isTikTokMonetized ? 'tiktok monetized account' : 'youtube monetized channel'}, social media account for sale`}
        canonical={`https://monetizedprofiles.com/products/${product.handle}`}
        ogImage={images[0]?.node.url}
        ogType="product"
        structuredData={[
          {
            "@context": "https://schema.org",
            "@type": "Product",
            "name": product.title,
            "image": images.map(img => img.node.url),
            "description": product.description,
            "brand": {
              "@type": "Brand",
              "name": "MonetizedProfiles"
            },
            "offers": {
              "@type": "Offer",
              "price": price,
              "priceCurrency": currency,
              "availability": currentVariant.availableForSale ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
              "url": `https://monetizedprofiles.com/products/${product.handle}`
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": rating,
              "reviewCount": 127,
              "bestRating": 5,
              "worstRating": 1
            }
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://monetizedprofiles.com/"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": product.title,
                "item": `https://monetizedprofiles.com/products/${product.handle}`
              }
            ]
          }
        ]}
      />
      <div className="bg-background">
      {/* Breadcrumb */}
      <div className="border-b">
        <div className="container mx-auto px-4 py-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Products
          </Button>
        </div>
      </div>

      {/* Product Hero Section */}
      <section className="container mx-auto px-4 py-6 sm:py-8 md:py-12">
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 max-w-7xl mx-auto">
          {/* Image Gallery */}
          <div className="space-y-3 sm:space-y-4">
            <div className="aspect-square rounded-lg overflow-hidden bg-secondary/20 border border-border/50 relative">
              {images.length > 0 ? (
                <img 
                  src={images[mainImage]?.node.url} 
                  alt={images[mainImage]?.node.altText || product.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <ShoppingCart className="w-16 h-16 text-muted-foreground" />
                </div>
              )}
            </div>

            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {images.map((image, idx) => (
                  <button
                    key={idx}
                    onClick={() => setMainImage(idx)}
                    className={`aspect-square rounded-md overflow-hidden border-2 transition-all ${
                      mainImage === idx ? 'border-primary' : 'border-border/50 hover:border-border'
                    }`}
                  >
                    <img 
                      src={image.node.url} 
                      alt={image.node.altText || `${product.title} ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-4 sm:space-y-6">
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">{product.title}</h1>
              
              <button 
                className="flex items-center gap-2 mb-4 sm:mb-6 cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => setReviewsOpen(true)}
              >
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-4 sm:w-5 h-4 sm:h-5 ${
                        i < fullStars 
                          ? 'fill-primary text-primary' 
                          : i === fullStars && hasHalfStar 
                          ? 'fill-primary/50 text-primary' 
                          : 'fill-none text-muted-foreground'
                      }`} 
                    />
                  ))}
                </div>
                <span className="text-sm sm:text-base text-muted-foreground">{rating.toFixed(1)} ({getReviewCount().toLocaleString()} reviews)</span>
              </button>

              <div className="flex items-baseline gap-2 sm:gap-3 mb-4 sm:mb-6">
                <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary">
                  ${price.toFixed(2)}
                </p>
                {currentVariant.compareAtPrice && parseFloat(currentVariant.compareAtPrice.amount) > price && (
                  <p className="text-xl sm:text-2xl text-muted-foreground line-through">
                    ${parseFloat(currentVariant.compareAtPrice.amount).toFixed(2)}
                  </p>
                )}
              </div>

              <div className="space-y-3 mb-6">
                {isYouTubeMonetized ? (
                  <>
                    <div className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0" />
                      <p className="text-lg font-medium">Approved in YouTube Partner Program</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0" />
                      <p className="text-lg font-medium">Lowest shadowban risk - healthy account</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0" />
                      <p className="text-lg font-medium">100% organic followers - real engagement</p>
                    </div>
                  </>
                ) : isTikTokMonetized ? (
                  <>
                    <div className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0" />
                      <p className="text-lg font-medium">Approved in TikTok Creator Rewards Program</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0" />
                      <p className="text-lg font-medium">Lowest shadowban risk - healthy account</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0" />
                      <p className="text-lg font-medium">100% organic followers - real engagement</p>
                    </div>
                  </>
                ) : isYouTubeAged ? (
                  <>
                    <div className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0" />
                      <p className="text-lg font-medium">Lowest shadowban risk - vintage account</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0" />
                      <p className="text-lg font-medium">Algorithm boost from account age & trust score</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0" />
                      <p className="text-lg font-medium">Created 2005-2013 - maximum authority</p>
                    </div>
                  </>
                ) : isInstagramAged ? (
                  <>
                    <div className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0" />
                      <p className="text-lg font-medium">Algorithm trust from established account history</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0" />
                      <p className="text-lg font-medium">Reduced ad rejections & shadowban risk</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0" />
                      <p className="text-lg font-medium">Ready for dropshipping & brand launches</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0" />
                      <p className="text-lg font-medium">Monetization enabled - earn immediately</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0" />
                      <p className="text-lg font-medium">100% organic followers - real engagement</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0" />
                      <p className="text-lg font-medium">Secure transfer within 24-72 hours</p>
                    </div>
                  </>
                )}
              </div>

              {/* Stock Indicator */}
              <StockIndicator 
                quantityAvailable={isMonetizedTikTokAccount && currentVariant.availableForSale ? dynamicStock : currentVariant.quantityAvailable} 
                availableForSale={currentVariant.availableForSale}
              />
            </div>

            {product.options.length > 0 && product.options[0].values.length > 1 && (
              <div className="space-y-3">
                <label className="text-sm font-semibold">Select Option</label>
                <div className="flex flex-wrap gap-2">
                  {product.variants.edges.map((variant, idx) => (
                    <Button
                      key={variant.node.id}
                      variant={selectedVariant === idx ? "default" : "outline"}
                      onClick={() => setSelectedVariant(idx)}
                      className="min-w-[100px]"
                    >
                      {variant.node.title}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Gmail Capture for YouTube Products */}
            {(isYouTubeMonetized || isYouTubeAged) && (
              <div className="space-y-2">
              <label className="text-sm font-semibold flex items-center gap-1">
                  Enter Ownership Gmail<span className="text-primary">*</span>
                </label>
                <Input
                  type="email"
                  placeholder="example@gmail.com"
                  value={ownershipGmail}
                  onChange={(e) => {
                    setOwnershipGmail(e.target.value);
                    setGmailError("");
                  }}
                  className={`h-12 text-base ${gmailError ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                />
                {gmailError && (
                  <p className="text-sm text-destructive">{gmailError}</p>
                )}
                <p className="text-xs text-muted-foreground">
                  To ensure a successful ownership transfer, enter your Google account.
                </p>
              </div>
            )}

            <Button 
              size="lg" 
              className="w-full text-base sm:text-lg h-14 sm:h-16 touch-manipulation"
              onClick={handleAddToCart}
              disabled={added || !currentVariant.availableForSale}
            >
              {added ? (
                <>
                  <Check className="w-4 sm:w-5 h-4 sm:h-5 mr-2" />
                  Added to Cart
                </>
              ) : !currentVariant.availableForSale ? (
                "Out of Stock"
              ) : (
                <>
                  <ShoppingCart className="w-4 sm:w-5 h-4 sm:h-5 mr-2" />
                  Add to Cart
                </>
              )}
            </Button>

            {/* Subtle Restock Notification - Only show when out of stock */}
            {!currentVariant.availableForSale && (
              <div className="pt-3 border-t border-border/30">
                <form onSubmit={handleRestockEmailSubmit} className="flex flex-col gap-2">
                  <label className="text-xs text-muted-foreground flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5" />
                    Get notified when back in stock
                  </label>
                  <div className="flex gap-2">
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      value={restockEmail}
                      onChange={(e) => setRestockEmail(e.target.value)}
                      className="h-9 text-sm"
                      disabled={emailSubmitted}
                    />
                    <Button 
                      type="submit" 
                      size="sm"
                      variant="outline"
                      className="h-9 px-3"
                      disabled={emailSubmitted}
                    >
                      {emailSubmitted ? <Check className="w-3.5 h-3.5" /> : "Notify"}
                    </Button>
                  </div>
                </form>
              </div>
            )}

            <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-4">
              <div className="text-center p-2 sm:p-3 rounded-lg bg-secondary/30">
                <ShieldCheck className="w-5 sm:w-6 h-5 sm:h-6 text-primary mx-auto mb-1 sm:mb-2" />
                <span className="text-[10px] sm:text-xs font-medium">Secure Checkout</span>
              </div>
              <div className="text-center p-2 sm:p-3 rounded-lg bg-secondary/30">
                <Truck className="w-5 sm:w-6 h-5 sm:h-6 text-primary mx-auto mb-1 sm:mb-2" />
                <span className="text-[10px] sm:text-xs font-medium">24-72hr Delivery</span>
              </div>
              <div className="text-center p-2 sm:p-3 rounded-lg bg-secondary/30">
                <RefreshCw className="w-5 sm:w-6 h-5 sm:h-6 text-primary mx-auto mb-1 sm:mb-2" />
                <span className="text-[10px] sm:text-xs font-medium">24/7 Support</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stock Level & Urgency */}
      <section className="py-6 bg-secondary/20 border-y border-border/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap gap-4 justify-center items-center text-sm">
              <div className="flex items-center gap-2 bg-card px-4 py-2 rounded-lg border shadow-sm">
                <Users className="w-4 h-4 text-primary" />
                <span><strong>{accountsSoldThisMonth.toLocaleString()}</strong> accounts sold this month</span>
              </div>
              <div 
                className="flex items-center gap-2 bg-card px-4 py-2 rounded-lg border shadow-sm cursor-pointer hover:bg-secondary/50 transition-colors"
                onClick={() => setReviewsOpen(true)}
              >
                <Star className="w-4 h-4 text-primary fill-primary" />
                <span><strong>4.8/5</strong> rating</span>
              </div>
              <div className="flex items-center gap-2 bg-card px-4 py-2 rounded-lg border shadow-sm">
                <Zap className="w-4 h-4 text-primary" />
                <span><strong>Time until restock:</strong> Unknown</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Account Benefits Section */}
      <section className="py-12 pb-16 sm:py-20 bg-gradient-to-b from-secondary/20 via-background to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-3">Account Benefits</h2>
            <p className="text-center text-muted-foreground text-lg mb-12">Everything you need to start earning immediately</p>
            
            <div className="relative">
              {/* Connecting Lines Decoration */}
              <div className="hidden lg:block absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
                {isYouTubeMonetized ? (
                  <>
                    {/* YouTube Monetized - Benefit 1 */}
                    <div className="group relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all opacity-50"></div>
                      <div className="relative bg-card/80 backdrop-blur-sm rounded-2xl p-6 border border-border/50 hover:border-primary/50 transition-all duration-300 h-full">
                        <div className="flex flex-col items-center text-center space-y-4">
                          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-lg">
                            <Check className="w-8 h-8 text-primary-foreground" />
                          </div>
                          <div>
                            <h3 className="font-bold text-xl mb-2">Partner Approved</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              1,000+ subscribers & 4,000 watch hours already achieved
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* YouTube Monetized - Benefit 2 */}
                    <div className="group relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/10 to-primary/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all opacity-50"></div>
                      <div className="relative bg-card/80 backdrop-blur-sm rounded-2xl p-6 border border-border/50 hover:border-primary/50 transition-all duration-300 h-full">
                        <div className="flex flex-col items-center text-center space-y-4">
                          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent-blue to-accent-blue/70 flex items-center justify-center shadow-lg">
                            <Zap className="w-8 h-8 text-accent-blue-foreground" />
                          </div>
                          <div>
                            <h3 className="font-bold text-xl mb-2">Instant Revenue</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              Earn ad revenue from your very first post or video
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* YouTube Monetized - Benefit 3 */}
                    <div className="group relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all opacity-50"></div>
                      <div className="relative bg-card/80 backdrop-blur-sm rounded-2xl p-6 border border-border/50 hover:border-primary/50 transition-all duration-300 h-full">
                        <div className="flex flex-col items-center text-center space-y-4">
                          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-lg">
                            <Users className="w-8 h-8 text-primary-foreground" />
                          </div>
                          <div>
                            <h3 className="font-bold text-xl mb-2">Organic Audience</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              Real followers with authentic organic engagement
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* YouTube Monetized - Benefit 4 */}
                    <div className="group relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/10 to-primary/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all opacity-50"></div>
                      <div className="relative bg-card/80 backdrop-blur-sm rounded-2xl p-6 border border-border/50 hover:border-primary/50 transition-all duration-300 h-full">
                        <div className="flex flex-col items-center text-center space-y-4">
                          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent-blue to-accent-blue/70 flex items-center justify-center shadow-lg">
                            <ShieldCheck className="w-8 h-8 text-accent-blue-foreground" />
                          </div>
                          <div>
                            <h3 className="font-bold text-xl mb-2">Shorts Compatible</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              Works perfectly for YouTube Shorts & regular videos
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ) : isTikTokMonetized ? (
                  <>
                    {/* TikTok Monetized - Benefit 1 */}
                    <div className="group relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all opacity-50"></div>
                      <div className="relative bg-card/80 backdrop-blur-sm rounded-2xl p-6 border border-border/50 hover:border-primary/50 transition-all duration-300 h-full">
                        <div className="flex flex-col items-center text-center space-y-4">
                          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-lg">
                            <Check className="w-8 h-8 text-primary-foreground" />
                          </div>
                          <div>
                            <h3 className="font-bold text-xl mb-2">Creator Approved</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              10,000+ followers approved in Creator Rewards Program
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* TikTok Monetized - Benefit 2 */}
                    <div className="group relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/10 to-primary/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all opacity-50"></div>
                      <div className="relative bg-card/80 backdrop-blur-sm rounded-2xl p-6 border border-border/50 hover:border-primary/50 transition-all duration-300 h-full">
                        <div className="flex flex-col items-center text-center space-y-4">
                          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent-blue to-accent-blue/70 flex items-center justify-center shadow-lg">
                            <Zap className="w-8 h-8 text-accent-blue-foreground" />
                          </div>
                          <div>
                            <h3 className="font-bold text-xl mb-2">Global Access</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              Works from any country worldwide, even ineligible ones
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* TikTok Monetized - Benefit 3 */}
                    <div className="group relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all opacity-50"></div>
                      <div className="relative bg-card/80 backdrop-blur-sm rounded-2xl p-6 border border-border/50 hover:border-primary/50 transition-all duration-300 h-full">
                        <div className="flex flex-col items-center text-center space-y-4">
                          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-lg">
                            <ShieldCheck className="w-8 h-8 text-primary-foreground" />
                          </div>
                          <div>
                            <h3 className="font-bold text-xl mb-2">ID & Tax Verified</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              Identity & tax forms verified - no setup required
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* TikTok Monetized - Benefit 4 */}
                    <div className="group relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/10 to-primary/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all opacity-50"></div>
                      <div className="relative bg-card/80 backdrop-blur-sm rounded-2xl p-6 border border-border/50 hover:border-primary/50 transition-all duration-300 h-full">
                        <div className="flex flex-col items-center text-center space-y-4">
                          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent-blue to-accent-blue/70 flex items-center justify-center shadow-lg">
                            <Users className="w-8 h-8 text-accent-blue-foreground" />
                          </div>
                          <div>
                            <h3 className="font-bold text-xl mb-2">Healthy Account</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              No previous violations or strikes on account history
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ) : isYouTubeAged ? (
                  <>
                    {/* Aged YouTube - Benefit 1 */}
                    <div className="group relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all opacity-50"></div>
                      <div className="relative bg-card/80 backdrop-blur-sm rounded-2xl p-6 border border-border/50 hover:border-primary/50 transition-all duration-300 h-full">
                        <div className="flex flex-col items-center text-center space-y-4">
                          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-lg">
                            <Check className="w-8 h-8 text-primary-foreground" />
                          </div>
                          <div>
                            <h3 className="font-bold text-xl mb-2">Vintage Account</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              Created 2005-2013 for maximum trust & authority
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Aged YouTube - Benefit 2 */}
                    <div className="group relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/10 to-primary/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all opacity-50"></div>
                      <div className="relative bg-card/80 backdrop-blur-sm rounded-2xl p-6 border border-border/50 hover:border-primary/50 transition-all duration-300 h-full">
                        <div className="flex flex-col items-center text-center space-y-4">
                          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent-blue to-accent-blue/70 flex items-center justify-center shadow-lg">
                            <Zap className="w-8 h-8 text-accent-blue-foreground" />
                          </div>
                          <div>
                            <h3 className="font-bold text-xl mb-2">Algorithm Boost</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              Enhanced ranking from account age & trust score
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Aged YouTube - Benefit 3 */}
                    <div className="group relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all opacity-50"></div>
                      <div className="relative bg-card/80 backdrop-blur-sm rounded-2xl p-6 border border-border/50 hover:border-primary/50 transition-all duration-300 h-full">
                        <div className="flex flex-col items-center text-center space-y-4">
                          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-lg">
                            <ShieldCheck className="w-8 h-8 text-primary-foreground" />
                          </div>
                          <div>
                            <h3 className="font-bold text-xl mb-2">Shorts Compatible</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              Works perfectly for YouTube Shorts & regular videos
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Aged YouTube - Benefit 4 */}
                    <div className="group relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/10 to-primary/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all opacity-50"></div>
                      <div className="relative bg-card/80 backdrop-blur-sm rounded-2xl p-6 border border-border/50 hover:border-primary/50 transition-all duration-300 h-full">
                        <div className="flex flex-col items-center text-center space-y-4">
                          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent-blue to-accent-blue/70 flex items-center justify-center shadow-lg">
                            <Users className="w-8 h-8 text-accent-blue-foreground" />
                          </div>
                          <div>
                            <h3 className="font-bold text-xl mb-2">Clean History</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              No violations or account strikes on record
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ) : isInstagramAged ? (
                  <>
                    {/* Instagram Aged - Benefit 1: Algorithm Trust */}
                    <div className="group relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all opacity-50"></div>
                      <div className="relative bg-card/80 backdrop-blur-sm rounded-2xl p-6 border border-border/50 hover:border-primary/50 transition-all duration-300 h-full">
                        <div className="flex flex-col items-center text-center space-y-4">
                          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-lg">
                            <ShieldCheck className="w-8 h-8 text-primary-foreground" />
                          </div>
                          <div>
                            <h3 className="font-bold text-xl mb-2">Algorithm Trust</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              Established account history signals authority to Instagram from day one
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Instagram Aged - Benefit 2: Instant Authority */}
                    <div className="group relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/10 to-primary/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all opacity-50"></div>
                      <div className="relative bg-card/80 backdrop-blur-sm rounded-2xl p-6 border border-border/50 hover:border-primary/50 transition-all duration-300 h-full">
                        <div className="flex flex-col items-center text-center space-y-4">
                          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent-blue to-accent-blue/70 flex items-center justify-center shadow-lg">
                            <Check className="w-8 h-8 text-accent-blue-foreground" />
                          </div>
                          <div>
                            <h3 className="font-bold text-xl mb-2">Instant Authority</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              Reduced risk of ad rejections, shadowbans, and restrictions
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Instagram Aged - Benefit 3: Launch Fast */}
                    <div className="group relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all opacity-50"></div>
                      <div className="relative bg-card/80 backdrop-blur-sm rounded-2xl p-6 border border-border/50 hover:border-primary/50 transition-all duration-300 h-full">
                        <div className="flex flex-col items-center text-center space-y-4">
                          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-lg">
                            <Zap className="w-8 h-8 text-primary-foreground" />
                          </div>
                          <div>
                            <h3 className="font-bold text-xl mb-2">Launch Fast</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              Ready for dropshipping, brand pages, and product launches
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Instagram Aged - Benefit 4: Save Time */}
                    <div className="group relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/10 to-primary/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all opacity-50"></div>
                      <div className="relative bg-card/80 backdrop-blur-sm rounded-2xl p-6 border border-border/50 hover:border-primary/50 transition-all duration-300 h-full">
                        <div className="flex flex-col items-center text-center space-y-4">
                          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent-blue to-accent-blue/70 flex items-center justify-center shadow-lg">
                            <Users className="w-8 h-8 text-accent-blue-foreground" />
                          </div>
                          <div>
                            <h3 className="font-bold text-xl mb-2">Save Time</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              Skip months of trial-and-error building trust from scratch
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Default Benefit 1 */}
                    <div className="group relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all opacity-50"></div>
                      <div className="relative bg-card/80 backdrop-blur-sm rounded-2xl p-6 border border-border/50 hover:border-primary/50 transition-all duration-300 h-full">
                        <div className="flex flex-col items-center text-center space-y-4">
                          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-lg">
                            <ShieldCheck className="w-8 h-8 text-primary-foreground" />
                          </div>
                          <div>
                            <h3 className="font-bold text-xl mb-2">Secure Transfer</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              Protected handoff with verified secure credentials
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Default Benefit 2 */}
                    <div className="group relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/10 to-primary/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all opacity-50"></div>
                      <div className="relative bg-card/80 backdrop-blur-sm rounded-2xl p-6 border border-border/50 hover:border-primary/50 transition-all duration-300 h-full">
                        <div className="flex flex-col items-center text-center space-y-4">
                          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent-blue to-accent-blue/70 flex items-center justify-center shadow-lg">
                            <Zap className="w-8 h-8 text-accent-blue-foreground" />
                          </div>
                          <div>
                            <h3 className="font-bold text-xl mb-2">Instant Access</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              Full account access with monetization enabled
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Default Benefit 3 */}
                    <div className="group relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all opacity-50"></div>
                      <div className="relative bg-card/80 backdrop-blur-sm rounded-2xl p-6 border border-border/50 hover:border-primary/50 transition-all duration-300 h-full">
                        <div className="flex flex-col items-center text-center space-y-4">
                          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-lg">
                            <Users className="w-8 h-8 text-primary-foreground" />
                          </div>
                          <div>
                            <h3 className="font-bold text-xl mb-2">Real Followers</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              100% organic audience with authentic engagement
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Default Benefit 4 */}
                    <div className="group relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/10 to-primary/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all opacity-50"></div>
                      <div className="relative bg-card/80 backdrop-blur-sm rounded-2xl p-6 border border-border/50 hover:border-primary/50 transition-all duration-300 h-full">
                        <div className="flex flex-col items-center text-center space-y-4">
                          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent-blue to-accent-blue/70 flex items-center justify-center shadow-lg">
                            <Check className="w-8 h-8 text-accent-blue-foreground" />
                          </div>
                          <div>
                            <h3 className="font-bold text-xl mb-2">Fully Monetized</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              Start earning money from your very first day
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Guarantee Section - Risk-Free Purchase */}
      <section className="py-12 sm:py-20 bg-gradient-to-br from-primary/5 via-background to-accent/5 border-t border-border/50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-3">Risk-Free Purchase Guarantee</h2>
              <p className="text-lg text-muted-foreground">Your investment is 100% protected. Buy with complete confidence.</p>
            </div>

            <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 border-2 border-primary/20 shadow-lg">
              <div className="grid md:grid-cols-3 gap-6 md:gap-8">
                {/* 7-Day Money Back */}
                <div className="text-center space-y-3">
                  <div className="relative inline-block">
                    <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl"></div>
                    <div className="relative w-20 h-20 mx-auto bg-card rounded-full flex items-center justify-center border-4 border-primary/30 shadow-lg">
                      <RefreshCw className="w-10 h-10 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">7-Day Money Back</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Not satisfied? Get a full refund within 7 days, no questions asked.
                      <span className="block mt-1.5 font-semibold text-foreground text-xs">100% risk-free.</span>
                    </p>
                  </div>
                </div>

                {/* 30-Day Replacement */}
                <div className="text-center space-y-3">
                  <div className="relative inline-block">
                    <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl"></div>
                    <div className="relative w-20 h-20 mx-auto bg-card rounded-full flex items-center justify-center border-4 border-primary/30 shadow-lg">
                      <ShieldCheck className="w-10 h-10 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">30-Day Replacement</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Any issues with your account? We'll replace it free of charge within 30 days.
                      <span className="block mt-1.5 font-semibold text-foreground text-xs">We stand behind quality.</span>
                    </p>
                  </div>
                </div>

                {/* 24/7 Support */}
                <div className="text-center space-y-3">
                  <div className="relative inline-block">
                    <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl"></div>
                    <div className="relative w-20 h-20 mx-auto bg-card rounded-full flex items-center justify-center border-4 border-primary/30 shadow-lg">
                      <Star className="w-10 h-10 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">24/7 Support Chat</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Get instant help anytime, day or night. Our team is always here for you.
                      <span className="block mt-1.5 font-semibold text-foreground text-xs">Never alone.</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom Badge */}
              <div className="mt-8 text-center">
                <div className="inline-flex items-center gap-2 bg-primary/10 px-5 py-2.5 rounded-full border border-primary/30">
                  <ShieldCheck className="w-4 h-4 text-primary" />
                  <span className="font-semibold text-sm">Your purchase is 100% protected</span>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="text-center mt-8">
              <Button 
                size="lg" 
                className="text-lg h-14 px-8"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Get Started Risk-Free
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Reviews - Infinite Scrolling Carousel */}
      <section className="py-12 sm:py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">What Our Customers Say</h2>
            <p className="text-lg text-muted-foreground">Join hundreds of satisfied content creators</p>
          </div>

          <div className="relative overflow-x-hidden overflow-y-visible w-screen max-w-none mx-[calc(50%-50vw)] pb-6">
            <div className="flex gap-4 sm:gap-6 py-3 animate-scroll-left-mobile animate-scroll-left-desktop pause-animation">
              {[...Array(2)].map((_, groupIdx) => (
                <div key={groupIdx} className="flex gap-6">
                  {[
                    { img: sarahImg, name: "Sarah M.", title: "Game Changer!", review: "\"literally started making money day one. account was exactly what they said it'd be 🔥\"" },
                    { img: justjamestvImg, name: "JustJamesTV", title: "Excellent Service", review: "\"transfer was so smooth and support really came through for me. got actual engaged followers on my tiktok\"" },
                    { img: emmaImg, name: "Emma Thompson", title: "Worth Every Penny", review: "\"saved me literally months of grinding. perfect way to jumpstart my creator journey tbh\"" },
                    { img: mikeImg, name: "MikeReacts", title: "Best Investment", review: "\"monetization was already active. started seeing money come in within hours no cap\"" },
                    { img: lisaImg, name: "Lisa Wong", title: "Seamless Process", review: "\"everything went super smooth, they handled it all. got the account transferred in less than 12 hours\"" },
                    { img: davidImg, name: "David Anderson", title: "Highly Recommend", review: "\"perfect if you don't wanna grind from zero. the engagement is real, not fake stuff\"" },
                    { img: michaelImg, name: "Michael Chen", title: "Amazing Quality", review: "\"these are actual real people, not bots. engagement rate is exactly what they said\"" },
                    { img: blockbusterzImg, name: "BlockBusterZ", title: "Fast & Reliable", review: "\"support answered everything before I bought. whole thing was super transparent which I appreciate\"" },
                    { img: "/placeholder.svg", name: "Rachel W.", title: "Perfect Start", review: "\"got my content career going with a head start. the analytics show people are actually interested\"" },
                    { img: tomImg, name: "Tom Rodriguez", title: "Trustworthy Service", review: "\"ngl I was skeptical at first but they came through with exactly what they promised\"" },
                    { img: "/placeholder.svg", name: "Nina S.", title: "Life Changing", review: "\"this literally gave me the chance to quit my 9-5. changed my whole life fr\"" },
                    { img: "/placeholder.svg", name: "Kevin D.", title: "Great Value", review: "\"when you think about how long this would take to build yourself, the price makes sense\"" },
                    { img: "/placeholder.svg", name: "Olivia M.", title: "Superb Quality", review: "\"account history is clean and the audience actually matches my niche. couldn't ask for more\"" },
                    { img: howtoaiImg, name: "HowToAI", title: "Outstanding Support", review: "\"had some questions after buying and support got back to me in like 30 mins. super helpful\"" },
                    { img: "/placeholder.svg", name: "Jessica A.", title: "Incredible Service", review: "\"whole experience from browsing to getting the account was smooth. would def buy again\"" },
                    { img: "/placeholder.svg", name: "Marcus J.", title: "Top Notch", review: "\"monetization started working right away. already getting ad money coming in\"" },
                    { img: "/placeholder.svg", name: "Sophie L.", title: "Exactly As Described", review: "\"no surprises or anything. account stats matched exactly what was on the listing\"" },
                    { img: "/placeholder.svg", name: "Daniel C.", title: "Smart Investment", review: "\"made my money back in literally the first month. ROI been crazy good\"" },
                    { img: "/placeholder.svg", name: "Megan P.", title: "Very Professional", review: "\"team is super professional and always responds quick. best experience buying an account for real\"" },
                    { img: "/placeholder.svg", name: "Ryan T.", title: "Exceeded Expectations", review: "\"way better quality than what I expected. couldn't be happier with what I got\"" },
                    { img: "/placeholder.svg", name: "Zoe K.", title: "5 Stars!", review: "\"everything was perfect from start to finish. def gonna buy more accounts soon\"" },
                    { img: "/placeholder.svg", name: "Eric M.", title: "Legit Business", review: "\"100% legit service with real accounts. no sketchy stuff, just quality\"" },
                    { img: "/placeholder.svg", name: "Hannah R.", title: "Finally!", review: "\"after struggling to grow for months, this was literally the solution I needed\"" },
                    { img: "/placeholder.svg", name: "Carlos V.", title: "Perfect Choice", review: "\"made the perfect choice going with them. everything worked flawlessly, zero issues\"" },
                    { img: "/placeholder.svg", name: "Victoria N.", title: "Amazing Experience", review: "\"the whole experience was amazing from browsing to after I got it. would definitely recommend\"" },
                  ].map((testimonial, idx) => (
                    <div 
                      key={idx}
                      className="min-w-[280px] sm:min-w-[350px] bg-card border-2 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all hover:border-primary/50 cursor-pointer"
                      onClick={() => setReviewsOpen(true)}
                    >
                      <div className="flex items-start gap-4 mb-4">
                        <img src={testimonial.img} alt={testimonial.name} className="w-16 h-16 rounded-full object-cover border-2 border-primary/20" />
                        <div className="flex-1">
                          <div className="flex gap-1 mb-2">{[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-primary text-primary" />)}</div>
                          <h4 className="font-bold text-lg">{testimonial.title}</h4>
                          <p className="text-sm text-muted-foreground">{testimonial.name}</p>
                        </div>
                      </div>
                      <p className="text-muted-foreground">{testimonial.review}</p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* You May Also Like - 3 Products with Scroll */}
      {relatedProducts.length > 0 && (
        <section className="py-12 sm:py-20 bg-secondary/20">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">You May Also Like</h2>
              
              <div className="max-w-7xl mx-auto relative">
                {/* Left scroll button - Hidden on mobile */}
                {canScrollLeft && (
                  <Button
                    variant="outline"
                    size="icon"
                    className="hidden sm:flex absolute left-0 lg:-left-1 top-1/2 -translate-y-1/2 z-10 bg-primary hover:bg-primary/90 text-white border-primary shadow-lg touch-manipulation"
                    onClick={() => scroll('left')}
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </Button>
                )}
                
                {/* Right scroll button - Hidden on mobile */}
                {canScrollRight && (
                  <Button
                    variant="outline"
                    size="icon"
                    className="hidden sm:flex absolute right-0 lg:-right-1 top-1/2 -translate-y-1/2 z-10 bg-primary hover:bg-primary/90 text-white border-primary shadow-lg touch-manipulation"
                    onClick={() => scroll('right')}
                  >
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                )}

                {/* Scrollable container */}
                <div 
                  ref={scrollContainerRef}
                  className="overflow-x-auto sm:overflow-hidden scroll-smooth px-0 w-full sm:w-[calc(3*360px+3rem)] mx-auto select-none scrollbar-mobile"
                  style={{ cursor: window.innerWidth < 640 && isDragging ? 'grabbing' : window.innerWidth < 640 ? 'grab' : 'default' }}
                  onScroll={checkScrollButtons}
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUpOrLeave}
                  onMouseLeave={handleMouseUpOrLeave}
                >
                   <div 
                     className="grid gap-4 sm:gap-6"
                     style={{ 
                       gridAutoFlow: 'column',
                       gridAutoColumns: 'min(360px, 85vw)',
                       gridTemplateColumns: 'none'
                     }}
                   >
                     {relatedProducts.map((product) => (
                       <ProductCard key={product.node.id} product={product} />
                     ))}
                   </div>
                 </div>

                 {/* Always-visible scroll indicator bar */}
                 <div className="mt-6 h-2 w-full max-w-md mx-auto rounded-full bg-muted overflow-hidden sm:hidden">
                   <div
                     className="h-full bg-primary transition-[width] duration-300 ease-out rounded-full"
                     style={{ width: `${Math.max(scrollProgress || 0, 25)}%` }}
                   />
                 </div>
               </div>
             </div>
           </div>
         </section>
       )}

      {/* FAQ Section */}
      <section className="py-20 bg-secondary/10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <HelpCircle className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-3">Frequently Asked Questions</h2>
              <p className="text-lg text-muted-foreground">Everything you need to know about purchasing monetized accounts</p>
            </div>

            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1" className="bg-card border rounded-lg px-6">
                <AccordionTrigger className="text-left hover:no-underline">
                  <span className="font-semibold">How quickly will I receive my account after purchase?</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Delivery is usually between 12-24 hours. However, during periods of high demand, it can take up to 72 hours. You'll receive an email with login credentials and step-by-step transfer instructions. You can also track your order anytime through our order tracking page.
                </AccordionContent>
              </AccordionItem>

              {(handle === 'youtube' || handle === 'aged-youtube' || handle === 'monetized-youtube-channel' || handle === 'aged-youtube-channel') && (
                <AccordionItem value="item-youtube-diff" className="bg-card border rounded-lg px-6">
                  <AccordionTrigger className="text-left hover:no-underline">
                    <span className="font-semibold">What's the difference between aged and monetized YouTube accounts?</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    <strong>Aged YouTube channels</strong> are older channels (typically created between 2007–2015) and have a much lower chance of being shadowbanned than newer accounts. They're ideal if you're on a budget and willing to grow to monetization yourself.<br/><br/>
                    <strong>Monetized YouTube accounts</strong> already meet 1,000 subscribers and 4,000 watch hours and are approved for the YouTube Partner Program, so they can earn revenue from the very first post. This is why they cost more – you skip months of growing to monetization and start earning immediately.<br/><br/>
                    We recommend monetized accounts for most creators as they offer better ROI – you can start generating income right away while aged accounts require significant time and effort to reach monetization.
                  </AccordionContent>
                </AccordionItem>
              )}

              {handle === 'monetized-tiktok-account' && (
                <AccordionItem value="item-tiktok-id" className="bg-card border rounded-lg px-6">
                  <AccordionTrigger className="text-left hover:no-underline">
                    <span className="font-semibold">Do I need to provide ID or tax information?</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Normally, TikTok requires a real ID from the country where the account was created, plus tax information (W-9 for US residents or W-8BEN for international users) before you can withdraw earnings. This creates major limitations.<br/><br/>
                    <strong>Good news:</strong> Our monetized TikTok accounts are pre-verified, meaning all ID and tax verification is already complete. You don't need to provide any documents or verify anything. This gives you the flexibility to use these accounts from anywhere in the world without restrictions.<br/><br/>
                    You can start earning and withdrawing payments immediately – no verification hassles, no location restrictions. We've handled the hard part for you.
                  </AccordionContent>
                </AccordionItem>
              )}

              {handle === 'aged-instagram-account' && (
                <AccordionItem value="item-instagram-why" className="bg-card border rounded-lg px-6">
                  <AccordionTrigger className="text-left hover:no-underline">
                    <span className="font-semibold">Why should I buy an aged Instagram account instead of creating a new one?</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Instagram's algorithm heavily favors accounts with established history. New accounts face numerous limitations including:<br/><br/>
                    • <strong>Higher shadowban risk</strong> – New accounts are flagged more easily for spam-like behavior<br/>
                    • <strong>Ad rejections</strong> – Fresh accounts often get ads rejected or face spending limits<br/>
                    • <strong>Trust issues</strong> – Customers are skeptical of brand new business pages<br/>
                    • <strong>Algorithm penalties</strong> – New accounts get less organic reach initially<br/><br/>
                    Our aged Instagram accounts skip all these hurdles. They come with established history that Instagram's algorithm already trusts, making them perfect for dropshipping stores, brand pages, and businesses that need to hit the ground running.
                  </AccordionContent>
                </AccordionItem>
              )}

              <AccordionItem value="item-2" className="bg-card border rounded-lg px-6">
                <AccordionTrigger className="text-left hover:no-underline">
                  <span className="font-semibold">Are the followers/subscribers real people or bots?</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  100% organic, real engagement. We never use bots or fake accounts. All of our accounts are grown naturally with real people who actively engage with content. Using bots would hurt your long-term success, which is why we only provide authentic, quality accounts.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="bg-card border rounded-lg px-6">
                <AccordionTrigger className="text-left hover:no-underline">
                  <span className="font-semibold">What happens if the account gets disabled or shadowbanned?</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  We offer a free replacement, no questions asked. All accounts are healthy and in good standing with no violations, but if anything happens, you're fully covered by our replacement warranty.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="bg-card border rounded-lg px-6">
                <AccordionTrigger className="text-left hover:no-underline">
                  <span className="font-semibold">How much can I realistically earn in my first month?</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Results vary based on your content quality and consistency, but our customers have seen incredible results: $2,000 from their first post and $5,000/month within 60 days. The accounts give you the platform – your effort determines the results. Plus, you'll receive our free YouTube/TikTok growth course to help you maximize your earnings.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5" className="bg-card border rounded-lg px-6">
                <AccordionTrigger className="text-left hover:no-underline">
                  <span className="font-semibold">What payment methods do you accept?</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  We accept all major credit cards, debit cards, and secure payment methods (not crypto). All transactions are processed through our encrypted, safe payment system – the same level of security used by major e-commerce sites. Your payment information is never stored on our servers.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6" className="bg-card border rounded-lg px-6">
                <AccordionTrigger className="text-left hover:no-underline">
                  <span className="font-semibold">How are you different from other account sellers?</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  We stand out with 100% organic growth (no bots), safe and secure payment methods (not crypto), comprehensive warranty protection, and dedicated customer support. Unlike competitors, we respond within 1 hour during business hours and offer human support – not automated responses.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* Affiliate Program Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {/* Main Pitch */}
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-2">
                Promote Our Accounts,<br />
                <span style={{ color: '#FF2929' }}>Get Paid Generously</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                15% commission on every sale. No strings attached.
              </p>
            </div>

            {/* Simple Benefits List */}
            <div className="bg-card border-2 rounded-3xl p-12 mb-12 space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                  <Check className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Earn $100-$400 per sale</h3>
                  <p className="text-muted-foreground">Simple 15% commission structure. The more you sell, the more you earn.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                  <Check className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Your audience will love these</h3>
                  <p className="text-muted-foreground">Premium monetized accounts that actually deliver results. High satisfaction = high conversions.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                  <Check className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">We handle everything else</h3>
                  <p className="text-muted-foreground">You promote, we deliver. Support, fulfillment, and customer service all taken care of.</p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="text-center">
              <Button asChild size="lg" className="text-base md:text-xl px-6 md:px-12 py-6 md:py-8 shadow-lg hover:shadow-xl transition-all w-full sm:w-auto" style={{ backgroundColor: '#FF2929' }}>
                <Link to="/affiliate">Learn More About Our Program</Link>
              </Button>
              <p className="text-muted-foreground mt-6">
                Join 500+ creators earning with us
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Restock Email Capture */}
      <section className="py-8 container mx-auto px-4">
        <Card className="max-w-2xl mx-auto text-center bg-gradient-to-br from-secondary to-background border-border">
          <CardHeader>
            <Mail className="w-12 h-12 mx-auto mb-4" style={{ color: '#FF2929' }} />
            <CardTitle className="text-2xl" style={{ color: '#FF2929' }}>Get Notified on Restock</CardTitle>
            <CardDescription className="text-base">
              Premium accounts sell fast! Enter your email to be notified when we restock your favorite products.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleRestockEmailSubmit} className="flex gap-2 max-w-md mx-auto">
              <Input 
                type="email" 
                placeholder="Enter your email" 
                value={restockEmail}
                onChange={(e) => setRestockEmail(e.target.value)}
                required
                className="flex-1"
              />
              <Button type="submit" className="shrink-0" style={{ backgroundColor: '#FF2929' }}>
                Notify Me
              </Button>
            </form>
          </CardContent>
        </Card>
      </section>
    </div>
    
    <ReviewsPopup 
      isOpen={reviewsOpen} 
      onClose={() => setReviewsOpen(false)} 
      productHandle={handle}
    />
    </>
  );
};

export default ProductDetail;
