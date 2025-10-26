import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { PRODUCT_BY_HANDLE_QUERY, storefrontApiRequest, STOREFRONT_QUERY, ShopifyProduct } from "@/lib/shopify";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";
import { ShoppingCart, Check, ShieldCheck, Truck, RefreshCw, ChevronLeft, Star, ChevronRight, Users, Zap } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState, useRef, useEffect } from "react";
import { ProductCard } from "@/components/ProductCard";

const ProductDetail = () => {
  const { handle } = useParams();
  const navigate = useNavigate();
  const addItem = useCartStore(state => state.addItem);
  const [added, setAdded] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [mainImage, setMainImage] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [accountsSoldThisMonth, setAccountsSoldThisMonth] = useState(639 + Math.floor(Math.random() * 10));

  const { data: product, isLoading } = useQuery({
    queryKey: ['product', handle],
    queryFn: async () => {
      const response = await storefrontApiRequest(PRODUCT_BY_HANDLE_QUERY, { handle });
      return response.data.productByHandle;
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

  const handleAddToCart = () => {
    if (!product) return;
    
    const variant = product.variants.edges[selectedVariant].node;
    
    const cartItem = {
      product: { node: product },
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

  // Check scroll position
  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
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

  // Get related products (exclude current product, limit to 3)
  const relatedProducts = allProducts?.filter(p => p.node.id !== product.id).slice(0, 3) || [];

  return (
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
      <section className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 max-w-7xl mx-auto">
          {/* Image Gallery */}
          <div className="space-y-4">
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
              {currentVariant.availableForSale && (
                <Badge className="absolute top-4 left-4 bg-accent">In Stock</Badge>
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
          <div className="space-y-6">
            <div>
              {/* Stock Counter */}
              {currentVariant.quantityAvailable !== undefined && (
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                  <span className="text-sm font-semibold text-primary">
                    {currentVariant.quantityAvailable > 0 
                      ? `${currentVariant.quantityAvailable} in stock` 
                      : 'Out of stock'}
                  </span>
                </div>
              )}
              
              <h1 className="text-3xl md:text-5xl font-bold mb-4">{product.title}</h1>
              
              <div className="flex items-center gap-2 mb-6">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                  ))}
                </div>
                <span className="text-muted-foreground">4.8 (500+ reviews)</span>
              </div>

              <div className="flex items-baseline gap-3 mb-6">
                <p className="text-5xl font-bold text-primary">
                  ${price.toFixed(2)}
                </p>
                {currentVariant.compareAtPrice && parseFloat(currentVariant.compareAtPrice.amount) > price && (
                  <p className="text-2xl text-muted-foreground line-through">
                    ${parseFloat(currentVariant.compareAtPrice.amount).toFixed(2)}
                  </p>
                )}
              </div>

              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                {product.description}
              </p>
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

            <Button 
              size="lg" 
              className="w-full text-lg h-16"
              onClick={handleAddToCart}
              disabled={added || !currentVariant.availableForSale}
            >
              {added ? (
                <>
                  <Check className="w-5 h-5 mr-2" />
                  Added to Cart
                </>
              ) : !currentVariant.availableForSale ? (
                "Out of Stock"
              ) : (
                <>
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart - ${price.toFixed(2)}
                </>
              )}
            </Button>

            <div className="grid grid-cols-3 gap-3 pt-4">
              <div className="text-center p-3 rounded-lg bg-secondary/30">
                <ShieldCheck className="w-6 h-6 text-primary mx-auto mb-2" />
                <span className="text-xs font-medium">Secure Checkout</span>
              </div>
              <div className="text-center p-3 rounded-lg bg-secondary/30">
                <Truck className="w-6 h-6 text-primary mx-auto mb-2" />
                <span className="text-xs font-medium">Instant Delivery</span>
              </div>
              <div className="text-center p-3 rounded-lg bg-secondary/30">
                <RefreshCw className="w-6 h-6 text-primary mx-auto mb-2" />
                <span className="text-xs font-medium">24/7 Support</span>
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
              <div className="flex items-center gap-2 bg-card px-4 py-2 rounded-lg border shadow-sm">
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

      {/* What You Get Section */}
      <section className="py-12 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">What You'll Get</h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="bg-card">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Check className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">Instant Access</h3>
                    <p className="text-sm text-muted-foreground">Complete account credentials delivered immediately after purchase</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <ShieldCheck className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">Verified & Secure</h3>
                    <p className="text-sm text-muted-foreground">All accounts are fully verified and ready to use</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Star className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">Premium Support</h3>
                    <p className="text-sm text-muted-foreground">Dedicated support team to help with any questions</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Guarantee Section - Risk-Free Purchase */}
      <section className="py-12 bg-gradient-to-br from-primary/5 via-background to-accent/5 border-t border-border/50">
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

              {/* Bottom CTA */}
              <div className="mt-8 text-center">
                <div className="inline-flex items-center gap-2 bg-primary/10 px-5 py-2.5 rounded-full border border-primary/30">
                  <ShieldCheck className="w-4 h-4 text-primary" />
                  <span className="font-semibold text-sm">Your purchase is 100% protected</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Reviews - Infinite Scrolling Carousel */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">Customer Reviews</h2>

            <div className="relative overflow-x-hidden overflow-y-visible w-screen max-w-none mx-[calc(50%-50vw)] pb-6">
              <div className="flex gap-6 py-3 animate-scroll-left">
                {[...Array(2)].map((_, groupIdx) => (
                  <div key={groupIdx} className="flex gap-6">
                    {/* Review 1 */}
                    <div className="min-w-[350px] bg-card border-2 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all hover:border-primary/50">
                      <div className="flex items-start gap-4 mb-4">
                        <img src="/placeholder.svg" alt="Sarah M." className="w-16 h-16 rounded-full object-cover border-2 border-primary/20" />
                        <div className="flex-1">
                          <div className="flex gap-1 mb-2">{[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-primary text-primary" />)}</div>
                          <h4 className="font-bold text-lg">Game Changer!</h4>
                          <p className="text-sm text-muted-foreground">Sarah M.</p>
                        </div>
                      </div>
                      <p className="text-muted-foreground">"Bought a monetized account and started earning from day one. The account was exactly as described!"</p>
                    </div>
                    {/* Review 2 */}
                    <div className="min-w-[350px] bg-card border-2 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all hover:border-primary/50">
                      <div className="flex items-start gap-4 mb-4">
                        <img src="/placeholder.svg" alt="James K." className="w-16 h-16 rounded-full object-cover border-2 border-primary/20" />
                        <div className="flex-1">
                          <div className="flex gap-1 mb-2">{[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-primary text-primary" />)}</div>
                          <h4 className="font-bold text-lg">Excellent Service</h4>
                          <p className="text-sm text-muted-foreground">James K.</p>
                        </div>
                      </div>
                      <p className="text-muted-foreground">"Transfer was smooth and support was incredibly helpful. My account has active followers!"</p>
                    </div>
                    {/* Review 3 */}
                    <div className="min-w-[350px] bg-card border-2 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all hover:border-primary/50">
                      <div className="flex items-start gap-4 mb-4">
                        <img src="/placeholder.svg" alt="Emma L." className="w-16 h-16 rounded-full object-cover border-2 border-primary/20" />
                        <div className="flex-1">
                          <div className="flex gap-1 mb-2">{[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-primary text-primary" />)}</div>
                          <h4 className="font-bold text-lg">Worth Every Penny</h4>
                          <p className="text-sm text-muted-foreground">Emma L.</p>
                        </div>
                      </div>
                      <p className="text-muted-foreground">"Skip months of growing an audience. Perfect shortcut to start my content creator journey!"</p>
                    </div>
                    {/* Review 4 */}
                    <div className="min-w-[350px] bg-card border-2 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all hover:border-primary/50">
                      <div className="flex items-start gap-4 mb-4">
                        <img src="/placeholder.svg" alt="Michael R." className="w-16 h-16 rounded-full object-cover border-2 border-primary/20" />
                        <div className="flex-1">
                          <div className="flex gap-1 mb-2">{[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-primary text-primary" />)}</div>
                          <h4 className="font-bold text-lg">Best Investment</h4>
                          <p className="text-sm text-muted-foreground">Michael R.</p>
                        </div>
                      </div>
                      <p className="text-muted-foreground">"The monetization was active immediately. Making money within hours of purchase!"</p>
                    </div>
                    {/* Review 5 */}
                    <div className="min-w-[350px] bg-card border-2 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all hover:border-primary/50">
                      <div className="flex items-start gap-4 mb-4">
                        <img src="/placeholder.svg" alt="Lisa T." className="w-16 h-16 rounded-full object-cover border-2 border-primary/20" />
                        <div className="flex-1">
                          <div className="flex gap-1 mb-2">{[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-primary text-primary" />)}</div>
                          <h4 className="font-bold text-lg">Seamless Process</h4>
                          <p className="text-sm text-muted-foreground">Lisa T.</p>
                        </div>
                      </div>
                      <p className="text-muted-foreground">"Everything was handled professionally. Account transfer took less than 12 hours!"</p>
                    </div>
                    {/* Review 6 */}
                    <div className="min-w-[350px] bg-card border-2 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all hover:border-primary/50">
                      <div className="flex items-start gap-4 mb-4">
                        <img src="/placeholder.svg" alt="David P." className="w-16 h-16 rounded-full object-cover border-2 border-primary/20" />
                        <div className="flex-1">
                          <div className="flex gap-1 mb-2">{[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-primary text-primary" />)}</div>
                          <h4 className="font-bold text-lg">Highly Recommend</h4>
                          <p className="text-sm text-muted-foreground">David P.</p>
                        </div>
                      </div>
                      <p className="text-muted-foreground">"Great for anyone wanting to skip the grind of building from scratch. Real engagement!"</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* You May Also Like - 3 Products with Scroll */}
      {relatedProducts.length > 0 && (
        <section className="py-12 bg-secondary/20">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">You May Also Like</h2>
              
              <div className="max-w-6xl mx-auto relative px-12">
                {/* Left scroll button */}
                {canScrollLeft && (
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 bg-primary hover:bg-primary/90 text-white border-primary shadow-lg"
                    onClick={() => scroll('left')}
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </Button>
                )}
                
                {/* Right scroll button */}
                {canScrollRight && (
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 bg-primary hover:bg-primary/90 text-white border-primary shadow-lg"
                    onClick={() => scroll('right')}
                  >
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                )}

                {/* Scrollable container */}
                <div 
                  ref={scrollContainerRef}
                  className="overflow-x-auto scrollbar-hide scroll-smooth"
                  onScroll={checkScrollButtons}
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                  <div 
                    className="grid gap-6"
                    style={{ 
                      gridAutoFlow: 'column',
                      gridAutoColumns: 'calc((100% - 3rem) / 3)'
                    }}
                  >
                    {relatedProducts.map((product) => (
                      <ProductCard key={product.node.id} product={product} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetail;
