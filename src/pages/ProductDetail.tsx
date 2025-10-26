import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { PRODUCT_BY_HANDLE_QUERY, storefrontApiRequest, STOREFRONT_QUERY, ShopifyProduct } from "@/lib/shopify";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";
import { ShoppingCart, Check, ShieldCheck, Truck, RefreshCw, ChevronLeft, Star, ChevronRight } from "lucide-react";
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
              <h1 className="text-3xl md:text-5xl font-bold mb-4">{product.title}</h1>
              
              <div className="flex items-center gap-2 mb-6">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                  ))}
                </div>
                <span className="text-muted-foreground">4.8 (500+ reviews)</span>
              </div>

              <p className="text-5xl font-bold text-primary mb-6">
                ${price.toFixed(2)}
              </p>

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

      {/* Guarantee Section */}
      <section className="py-12 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">Our Guarantee To You</h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="bg-card border-2 hover:border-primary/50 transition-all">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <ShieldCheck className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">100% Verified</h3>
                    <p className="text-sm text-muted-foreground">Every account is fully verified and monetization-ready before delivery</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border-2 hover:border-primary/50 transition-all">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Truck className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">Instant Transfer</h3>
                    <p className="text-sm text-muted-foreground">Complete ownership transferred within 24 hours, often much faster</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border-2 hover:border-primary/50 transition-all">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <RefreshCw className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">Money-Back Guarantee</h3>
                    <p className="text-sm text-muted-foreground">If the account doesn't match description, we'll make it right</p>
                  </div>
                </CardContent>
              </Card>
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
                {[...Array(3)].map((_, groupIdx) => (
                  <div key={groupIdx} className="flex gap-6 flex-shrink-0">
                    <div className="min-w-[350px] bg-card border-2 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all hover:border-primary/50">
                      <div className="flex gap-1 mb-3">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                        ))}
                      </div>
                      <p className="text-muted-foreground mb-3">"Exactly as described! Got instant access and everything works perfectly."</p>
                      <p className="font-semibold text-sm">Sarah M.</p>
                    </div>

                    <div className="min-w-[350px] bg-card border-2 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all hover:border-primary/50">
                      <div className="flex gap-1 mb-3">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                        ))}
                      </div>
                      <p className="text-muted-foreground mb-3">"The transfer was smooth and support was incredibly helpful. Highly recommend!"</p>
                      <p className="font-semibold text-sm">James K.</p>
                    </div>

                    <div className="min-w-[350px] bg-card border-2 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all hover:border-primary/50">
                      <div className="flex gap-1 mb-3">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                        ))}
                      </div>
                      <p className="text-muted-foreground mb-3">"Best investment I've made. Skip months of work and get started immediately!"</p>
                      <p className="font-semibold text-sm">Emma L.</p>
                    </div>

                    <div className="min-w-[350px] bg-card border-2 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all hover:border-primary/50">
                      <div className="flex gap-1 mb-3">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                        ))}
                      </div>
                      <p className="text-muted-foreground mb-3">"Worth every penny! The account quality exceeded my expectations."</p>
                      <p className="font-semibold text-sm">Michael R.</p>
                    </div>

                    <div className="min-w-[350px] bg-card border-2 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all hover:border-primary/50">
                      <div className="flex gap-1 mb-3">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                        ))}
                      </div>
                      <p className="text-muted-foreground mb-3">"Seamless process from purchase to delivery. Couldn't be happier!"</p>
                      <p className="font-semibold text-sm">Lisa T.</p>
                    </div>

                    <div className="min-w-[350px] bg-card border-2 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all hover:border-primary/50">
                      <div className="flex gap-1 mb-3">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                        ))}
                      </div>
                      <p className="text-muted-foreground mb-3">"Great for anyone wanting to skip the grind. Authentic quality!"</p>
                      <p className="font-semibold text-sm">David P.</p>
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
