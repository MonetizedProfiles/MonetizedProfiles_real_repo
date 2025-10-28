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
import { useState, useRef, useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ProductCard } from "@/components/ProductCard";
import { Input } from "@/components/ui/input";
import { z } from "zod";

const emailSchema = z.object({
  email: z.string().trim().email({ message: "Please enter a valid email address" }).max(255, { message: "Email must be less than 255 characters" })
});

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
  const [restockEmail, setRestockEmail] = useState("");
  const [emailSubmitted, setEmailSubmitted] = useState(false);

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

  const handleRestockEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const validated = emailSchema.parse({ email: restockEmail });
      
      // Here you would typically send this to your backend/database
      console.log('Restock notification requested for:', validated.email);
      
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
          <div className="space-y-4 sm:space-y-6">
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">{product.title}</h1>
              
              <div className="flex items-center gap-2 mb-4 sm:mb-6">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 sm:w-5 h-4 sm:h-5 fill-primary text-primary" />
                  ))}
                </div>
                <span className="text-sm sm:text-base text-muted-foreground">4.8 (500+ reviews)</span>
              </div>

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
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0" />
                  <p className="text-lg font-medium">Fully monetized and ready to earn immediately</p>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0" />
                  <p className="text-lg font-medium">100% authentic growth with engaged audience</p>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0" />
                  <p className="text-lg font-medium">Complete ownership transfer with full support</p>
                </div>
              </div>
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
                  Add to Cart - ${price.toFixed(2)}
                </>
              )}
            </Button>

            {/* Subtle Restock Notification */}
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

            <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-4">
              <div className="text-center p-2 sm:p-3 rounded-lg bg-secondary/30">
                <ShieldCheck className="w-5 sm:w-6 h-5 sm:h-6 text-primary mx-auto mb-1 sm:mb-2" />
                <span className="text-[10px] sm:text-xs font-medium">Secure Checkout</span>
              </div>
              <div className="text-center p-2 sm:p-3 rounded-lg bg-secondary/30">
                <Truck className="w-5 sm:w-6 h-5 sm:h-6 text-primary mx-auto mb-1 sm:mb-2" />
                <span className="text-[10px] sm:text-xs font-medium">Instant Delivery</span>
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
      <section className="pt-20 pb-20 bg-gradient-to-b from-secondary/20 via-background to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-3">What You'll Get</h2>
            <p className="text-center text-muted-foreground text-lg mb-12">Everything you need to start earning immediately</p>
            
            <div className="relative">
              {/* Connecting Lines Decoration */}
              <div className="hidden lg:block absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
                {/* Benefit 1 - Secure Transfer */}
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
                          Protected account handoff with verified credentials and secure delivery
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Benefit 2 - Earn Money First Post */}
                <div className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/10 to-primary/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all opacity-50"></div>
                  <div className="relative bg-card/80 backdrop-blur-sm rounded-2xl p-6 border border-border/50 hover:border-primary/50 transition-all duration-300 h-full">
                    <div className="flex flex-col items-center text-center space-y-4">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent-blue to-accent-blue/70 flex items-center justify-center shadow-lg">
                        <Zap className="w-8 h-8 text-accent-blue-foreground" />
                      </div>
                      <div>
                        <h3 className="font-bold text-xl mb-2">Earn Immediately</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          Start making money from your very first post with instant monetization
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Benefit 3 - Organic Audience */}
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
                          100% organic audience with zero bots - authentic engagement guaranteed
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Benefit 4 - Monetization Enabled */}
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
                          Monetization enabled and active - start earning from day one
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Guarantee Section - Risk-Free Purchase */}
      <section className="py-12 pt-16 bg-gradient-to-br from-primary/5 via-background to-accent/5 border-t border-border/50">
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
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">Customer Reviews</h2>

            <div className="relative overflow-x-hidden overflow-y-visible w-screen max-w-none mx-[calc(50%-50vw)] pb-6">
              <div className="flex gap-6 py-3 animate-scroll-left">
                {[...Array(3)].map((_, groupIdx) => (
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
                    {/* Review 7 */}
                    <div className="min-w-[350px] bg-card border-2 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all hover:border-primary/50">
                      <div className="flex items-start gap-4 mb-4">
                        <img src="/placeholder.svg" alt="Rachel B." className="w-16 h-16 rounded-full object-cover border-2 border-primary/20" />
                        <div className="flex-1">
                          <div className="flex gap-1 mb-2">{[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-primary text-primary" />)}</div>
                          <h4 className="font-bold text-lg">Amazing Quality</h4>
                          <p className="text-sm text-muted-foreground">Rachel B.</p>
                        </div>
                      </div>
                      <p className="text-muted-foreground">"The followers are genuine and actively engaged with my content. No fake accounts!"</p>
                    </div>
                    {/* Review 8 */}
                    <div className="min-w-[350px] bg-card border-2 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all hover:border-primary/50">
                      <div className="flex items-start gap-4 mb-4">
                        <img src="/placeholder.svg" alt="Tom W." className="w-16 h-16 rounded-full object-cover border-2 border-primary/20" />
                        <div className="flex-1">
                          <div className="flex gap-1 mb-2">{[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-primary text-primary" />)}</div>
                          <h4 className="font-bold text-lg">Fast Delivery</h4>
                          <p className="text-sm text-muted-foreground">Tom W.</p>
                        </div>
                      </div>
                      <p className="text-muted-foreground">"Got my account credentials within 6 hours. The whole process was incredibly smooth!"</p>
                    </div>
                    {/* Review 9 */}
                    <div className="min-w-[350px] bg-card border-2 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all hover:border-primary/50">
                      <div className="flex items-start gap-4 mb-4">
                        <img src="/placeholder.svg" alt="Nina C." className="w-16 h-16 rounded-full object-cover border-2 border-primary/20" />
                        <div className="flex-1">
                          <div className="flex gap-1 mb-2">{[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-primary text-primary" />)}</div>
                          <h4 className="font-bold text-lg">Perfect Start</h4>
                          <p className="text-sm text-muted-foreground">Nina C.</p>
                        </div>
                      </div>
                      <p className="text-muted-foreground">"Launching my brand was so much easier with an established account. Saved months of work!"</p>
                    </div>
                    {/* Review 10 */}
                    <div className="min-w-[350px] bg-card border-2 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all hover:border-primary/50">
                      <div className="flex items-start gap-4 mb-4">
                        <img src="/placeholder.svg" alt="Alex H." className="w-16 h-16 rounded-full object-cover border-2 border-primary/20" />
                        <div className="flex-1">
                          <div className="flex gap-1 mb-2">{[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-primary text-primary" />)}</div>
                          <h4 className="font-bold text-lg">Trustworthy Seller</h4>
                          <p className="text-sm text-muted-foreground">Alex H.</p>
                        </div>
                      </div>
                      <p className="text-muted-foreground">"Third account I've purchased. Always reliable and exactly what's promised!"</p>
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
                  <span className="font-semibold">How quickly will I receive my account?</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Most accounts are delivered within 6-12 hours of purchase. Our team works around the clock to ensure fast, secure delivery. You'll receive an email with login credentials and step-by-step transfer instructions.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="bg-card border rounded-lg px-6">
                <AccordionTrigger className="text-left hover:no-underline">
                  <span className="font-semibold">Are the followers real people?</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Yes, 100%. All accounts come with organic followers who actively engage with content. We never use bots or fake accounts. You'll see genuine likes, comments, and views on your posts from day one.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="bg-card border rounded-lg px-6">
                <AccordionTrigger className="text-left hover:no-underline">
                  <span className="font-semibold">What if I have issues with my account?</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  We offer a 30-day replacement guarantee. If you experience any issues with your account, our support team will work with you to resolve them or provide a replacement at no additional cost. We also have 24/7 chat support available.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="bg-card border rounded-lg px-6">
                <AccordionTrigger className="text-left hover:no-underline">
                  <span className="font-semibold">Is monetization already enabled?</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Absolutely. All accounts are fully monetized and ready to earn. You can start making money from your very first post without waiting for approval or meeting minimum requirements.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5" className="bg-card border rounded-lg px-6">
                <AccordionTrigger className="text-left hover:no-underline">
                  <span className="font-semibold">Can I change the account's username and profile?</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Yes, once the account is transferred to you, you have full control. You can customize the username (subject to platform availability), update the profile picture, bio, and all other account details to match your brand.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6" className="bg-card border rounded-lg px-6">
                <AccordionTrigger className="text-left hover:no-underline">
                  <span className="font-semibold">What payment methods do you accept?</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  We accept all major credit cards, debit cards, and secure payment methods through our encrypted checkout system. All transactions are processed securely and your payment information is never stored on our servers.
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
                20% commission on every sale. No strings attached.
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
                  <p className="text-muted-foreground">Simple 20% commission structure. The more you sell, the more you earn.</p>
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
              <Button asChild size="lg" className="text-xl px-12 py-8 shadow-lg hover:shadow-xl transition-all" style={{ backgroundColor: '#FF2929' }}>
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
  );
};

export default ProductDetail;
