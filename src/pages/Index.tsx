import { useQuery } from "@tanstack/react-query";
import { STOREFRONT_QUERY, storefrontApiRequest, ShopifyProduct } from "@/lib/shopify";
import { ProductCard } from "@/components/ProductCard";
import { ShoppingBag, TrendingUp, Shield, Zap, Clock, RefreshCw, HeadphonesIcon, Star, CheckCircle, Users, Lock, Mail, DollarSign, Percent, Video, Play, ChevronLeft, ChevronRight, ChevronDown, Sparkles, Wallet, ShoppingCart } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import { Link } from "react-router-dom";

const Index = () => {
  const [email, setEmail] = useState("");
  const [accountsSold, setAccountsSold] = useState(27708 + Math.floor(Math.random() * 100));
  const [accountsSoldThisMonth, setAccountsSoldThisMonth] = useState(639 + Math.floor(Math.random() * 10));
  const [totalStock, setTotalStock] = useState<number | null>(null);
  const [ugcOpen, setUgcOpen] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeftBest, setCanScrollLeftBest] = useState(false);
  const [canScrollRightBest, setCanScrollRightBest] = useState(false);
  const scrollContainerRefBest = useRef<HTMLDivElement>(null);
  
  const { data, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await storefrontApiRequest(STOREFRONT_QUERY, { first: 20 });
      return response.data.products.edges as ShopifyProduct[];
    },
  });

  // Calculate total stock from all product variants
  useEffect(() => {
    if (data) {
      let total = 0;
      data.forEach((product) => {
        product.node.variants.edges.forEach((variant) => {
          // Shopify doesn't expose inventory in Storefront API, so we'll use a placeholder
          // In production, you'd need to use Admin API or set a manual count
          if (variant.node.availableForSale) {
            total += Math.floor(Math.random() * 5) + 1; // Simulated stock per variant
          }
        });
      });
      setTotalStock(total || 12); // Default to 12 if no products
    }
  }, [data]);

  // Increment accounts sold counter randomly every 10-25 seconds
  useEffect(() => {
    const incrementCounter = () => {
      setAccountsSold(prev => prev + 1);
      const nextInterval = (Math.random() * 15000) + 10000; // 10-25 seconds
      setTimeout(incrementCounter, nextInterval);
    };
    
    const initialDelay = (Math.random() * 15000) + 10000;
    const timeoutId = setTimeout(incrementCounter, initialDelay);
    
    return () => clearTimeout(timeoutId);
  }, []);

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

  // Check scroll position for featured accounts
  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  // Check scroll position for best sellers
  const checkScrollButtonsBest = () => {
    if (scrollContainerRefBest.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRefBest.current;
      setCanScrollLeftBest(scrollLeft > 0);
      setCanScrollRightBest(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScrollButtons();
    checkScrollButtonsBest();
    window.addEventListener('resize', checkScrollButtons);
    window.addEventListener('resize', checkScrollButtonsBest);
    return () => {
      window.removeEventListener('resize', checkScrollButtons);
      window.removeEventListener('resize', checkScrollButtonsBest);
    };
  }, [data]);

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

  const scrollBest = (direction: 'left' | 'right') => {
    if (scrollContainerRefBest.current) {
      const scrollAmount = scrollContainerRefBest.current.clientWidth;
      scrollContainerRefBest.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
      setTimeout(checkScrollButtonsBest, 300);
    }
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success("Thanks! We'll notify you when products are restocked.");
      setEmail("");
    }
  };

  return (
    <div className="bg-background">`

      {/* Hero Section - Modern SaaS Minimal */}
      <section className="relative pt-12 pb-20 md:pt-24 md:pb-32 lg:pt-32 lg:pb-40 overflow-hidden bg-background">
        {/* Subtle background */}
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/5 via-background to-background" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center relative">
            {/* Floating Icons with Glow - Hidden on mobile */}
            <div className="absolute -left-20 top-16 hidden lg:block animate-float" style={{ animationDelay: '0s' }}>
              <TrendingUp className="w-12 h-12 text-[#FF2929]" style={{ filter: 'drop-shadow(0 0 20px rgba(255, 41, 41, 0.6))' }} />
            </div>
            <div className="absolute -right-32 top-24 hidden lg:block animate-float" style={{ animationDelay: '1s' }}>
              <DollarSign className="w-14 h-14 text-[#C74DFF]" style={{ filter: 'drop-shadow(0 0 20px rgba(199, 77, 255, 0.6))' }} />
            </div>
            <div className="absolute -left-24 bottom-28 hidden lg:block animate-float" style={{ animationDelay: '0.5s' }}>
              <Zap className="w-10 h-10 text-[#FF5C8D]" style={{ filter: 'drop-shadow(0 0 20px rgba(255, 92, 141, 0.6))' }} />
            </div>
            <div className="absolute -right-28 bottom-32 hidden lg:block animate-float" style={{ animationDelay: '1.5s' }}>
              <Star className="w-11 h-11 text-[#FF2929]" style={{ filter: 'drop-shadow(0 0 20px rgba(255, 41, 41, 0.6))' }} />
            </div>
            <div className="absolute left-[12%] bottom-0 hidden lg:block animate-float" style={{ animationDelay: '0.75s' }}>
              <Sparkles className="w-12 h-12 text-[#C74DFF]" style={{ filter: 'drop-shadow(0 0 20px rgba(199, 77, 255, 0.6))' }} />
            </div>
            <div className="absolute right-[10%] -bottom-4 hidden lg:block animate-float" style={{ animationDelay: '1.25s' }}>
              <Wallet className="w-12 h-12 text-[#FF2929]" style={{ filter: 'drop-shadow(0 0 20px rgba(255, 41, 41, 0.6))' }} />
            </div>
            
            {/* Badges */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-6 sm:mb-8">
              <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 bg-secondary rounded-full text-xs sm:text-sm font-medium">
                <div className="w-1.5 h-1.5 rounded-full bg-[#FF2929] animate-pulse" />
                <span>{accountsSold.toLocaleString()}+ sold</span>
              </div>
              <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 bg-secondary rounded-full text-xs sm:text-sm font-medium">
                <Star className="w-3.5 sm:w-4 h-3.5 sm:h-4 fill-[#FFD700] text-[#FFD700]" />
                <span>4.8 rating</span>
              </div>
            </div>

            {/* Big Animated Gradient Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight mb-6 sm:mb-8 leading-tight px-2">
              <span className="block mb-0 sm:mb-1">Monetized Accounts,</span>
              <span className="block bg-gradient-to-r from-[#FF2929] via-[#FF5C8D] to-[#C74DFF] bg-clip-text text-transparent animate-gradient-flow" style={{ backgroundSize: "200% auto" }}>
                Instant Revenue
              </span>
            </h1>

            {/* Simple subtitle */}
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground mb-8 sm:mb-12 max-w-3xl mx-auto px-4">
              Buy verified social media accounts and start earning immediately. 
              No waiting, no building from scratch.
            </p>

            {/* Clean CTA */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
              <Button 
                size="lg"
                className="w-full sm:w-auto px-8 sm:px-10 py-5 sm:py-6 text-base sm:text-lg font-semibold bg-[#FF2929] hover:bg-[#FF2929]/90 text-white touch-manipulation"
              >
                Browse Accounts
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="w-full sm:w-auto px-8 sm:px-10 py-5 sm:py-6 text-base sm:text-lg font-semibold border-2 touch-manipulation"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section - 3 Products Display with Scroll */}
      <section className="py-12 sm:py-16 md:py-20 container mx-auto px-4">
        <div className="mb-8 sm:mb-12 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4 text-foreground px-4">Featured Accounts</h2>
          <p className="text-base sm:text-lg text-muted-foreground px-4">Start earning today with our most popular monetized accounts</p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <Skeleton className="aspect-square w-full" />
            <Skeleton className="aspect-square w-full" />
            <Skeleton className="aspect-square w-full" />
          </div>
        ) : !data || data.length === 0 ? (
          <div className="text-center py-20">
            <ShoppingBag className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h4 className="text-2xl font-semibold mb-2">No Products Found</h4>
            <p className="text-muted-foreground">
              Products coming soon!
            </p>
          </div>
        ) : (
          <div className="max-w-6xl mx-auto relative">
            {/* Left scroll button - Hidden on mobile */}
            {canScrollLeft && (
              <Button
                variant="outline"
                size="icon"
                className="hidden sm:flex absolute -left-4 lg:-left-6 top-1/2 -translate-y-1/2 z-10 bg-[#FF2929] hover:bg-[#FF2929]/90 text-white border-[#FF2929] shadow-lg touch-manipulation"
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
                className="hidden sm:flex absolute -right-4 lg:-right-6 top-1/2 -translate-y-1/2 z-10 bg-[#FF2929] hover:bg-[#FF2929]/90 text-white border-[#FF2929] shadow-lg touch-manipulation"
                onClick={() => scroll('right')}
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            )}

            {/* Scrollable container */}
            <div 
              ref={scrollContainerRef}
              className="overflow-hidden scroll-smooth px-4 sm:px-12"
              onScroll={checkScrollButtons}
            >
              <div 
                className="grid gap-4 sm:gap-6"
                style={{ 
                  gridAutoFlow: 'column',
                  gridAutoColumns: 'min(360px, 85vw)',
                  gridTemplateColumns: 'none'
                }}
              >
                {data.map((product) => (
                  <ProductCard key={product.node.id} product={product} />
                ))}
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Features Section - Standardized Symmetrical */}
      <section className="py-12 sm:py-16 md:py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="mb-10 sm:mb-12 md:mb-16 text-center max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4 text-foreground px-4">Why Choose MonetizedProfiles?</h2>
            <p className="text-base sm:text-lg text-muted-foreground px-4">We've perfected the process of transferring monetized accounts safely and securely</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-7xl mx-auto">
            {/* Card 1 */}
            <Card className="bg-card border-2 hover:border-primary/50 transition-all hover:shadow-lg">
              <CardHeader className="text-center space-y-4 pb-3">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto">
                  <Shield className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-lg">Verified & Secure</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-sm text-muted-foreground">
                <p>Every account is fully verified with platform monetization enabled and ready to earn</p>
              </CardContent>
            </Card>

            {/* Card 2 */}
            <Card className="bg-card border-2 hover:border-primary/50 transition-all hover:shadow-lg">
              <CardHeader className="text-center space-y-4 pb-3">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto">
                  <Users className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-lg">Real Audiences</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-sm text-muted-foreground">
                <p>Genuine, engaged followers with proven interaction history</p>
              </CardContent>
            </Card>

            {/* Card 3 */}
            <Card className="bg-card border-2 hover:border-primary/50 transition-all hover:shadow-lg">
              <CardHeader className="text-center space-y-4 pb-3">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto">
                  <Zap className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-lg">Instant Transfer</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-sm text-muted-foreground">
                <p>Complete ownership transferred within 24 hours, often much faster</p>
              </CardContent>
            </Card>

            {/* Card 4 */}
            <Card className="bg-card border-2 hover:border-primary/50 transition-all hover:shadow-lg">
              <CardHeader className="text-center space-y-4 pb-3">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto">
                  <HeadphonesIcon className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-lg">Expert Support</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-sm text-muted-foreground">
                <p>Dedicated support with 1-hour response time</p>
              </CardContent>
            </Card>
          </div>

          {/* CTA Button */}
          <div className="text-center mt-8 sm:mt-12 px-4">
            <Button 
              size="lg" 
              className="w-full sm:w-auto text-base sm:text-lg h-12 sm:h-14 px-6 sm:px-8 touch-manipulation"
              onClick={() => {
                const productsSection = document.getElementById('products');
                if (productsSection) {
                  productsSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              <ShoppingCart className="w-4 sm:w-5 h-4 sm:h-5 mr-2" />
              Browse Available Accounts
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section - Scrolling Carousel with 25 Reviews */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="text-4xl font-bold mb-4">What Our Customers Say</h2>
            <p className="text-lg text-muted-foreground">Join hundreds of satisfied content creators</p>
          </div>

          <div className="relative overflow-x-hidden overflow-y-visible w-screen max-w-none mx-[calc(50%-50vw)] pb-6">
            <div className="flex gap-6 py-3 animate-scroll-left pause-animation">
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
                    <p className="text-muted-foreground">"Bought a monetized YouTube channel and started earning from day one. The account was exactly as described!"</p>
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
                    <p className="text-muted-foreground">"Transfer was smooth and support was incredibly helpful. My TikTok account has active followers!"</p>
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
                      <img src="/placeholder.svg" alt="Amanda G." className="w-16 h-16 rounded-full object-cover border-2 border-primary/20" />
                      <div className="flex-1">
                        <div className="flex gap-1 mb-2">{[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-primary text-primary" />)}</div>
                        <h4 className="font-bold text-lg">Amazing Quality</h4>
                        <p className="text-sm text-muted-foreground">Amanda G.</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground">"The followers are real people, not bots. Engagement rate is exactly as promised!"</p>
                  </div>
                  {/* Review 8 */}
                  <div className="min-w-[350px] bg-card border-2 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all hover:border-primary/50">
                    <div className="flex items-start gap-4 mb-4">
                      <img src="/placeholder.svg" alt="Chris B." className="w-16 h-16 rounded-full object-cover border-2 border-primary/20" />
                      <div className="flex-1">
                        <div className="flex gap-1 mb-2">{[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-primary text-primary" />)}</div>
                        <h4 className="font-bold text-lg">Fast & Reliable</h4>
                        <p className="text-sm text-muted-foreground">Chris B.</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground">"Support team answered all my questions before purchase. Very transparent process!"</p>
                  </div>
                  {/* Review 9 */}
                  <div className="min-w-[350px] bg-card border-2 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all hover:border-primary/50">
                    <div className="flex items-start gap-4 mb-4">
                      <img src="/placeholder.svg" alt="Rachel W." className="w-16 h-16 rounded-full object-cover border-2 border-primary/20" />
                      <div className="flex-1">
                        <div className="flex gap-1 mb-2">{[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-primary text-primary" />)}</div>
                        <h4 className="font-bold text-lg">Perfect Start</h4>
                        <p className="text-sm text-muted-foreground">Rachel W.</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground">"Launched my content career with a running start. Analytics show genuine audience interest!"</p>
                  </div>
                  {/* Review 10 */}
                  <div className="min-w-[350px] bg-card border-2 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all hover:border-primary/50">
                    <div className="flex items-start gap-4 mb-4">
                      <img src="/placeholder.svg" alt="Tom H." className="w-16 h-16 rounded-full object-cover border-2 border-primary/20" />
                      <div className="flex-1">
                        <div className="flex gap-1 mb-2">{[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-primary text-primary" />)}</div>
                        <h4 className="font-bold text-lg">Trustworthy Service</h4>
                        <p className="text-sm text-muted-foreground">Tom H.</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground">"Was skeptical at first but they delivered exactly what they promised. Very happy!"</p>
                  </div>
                  {/* Review 11 */}
                  <div className="min-w-[350px] bg-card border-2 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all hover:border-primary/50">
                    <div className="flex items-start gap-4 mb-4">
                      <img src="/placeholder.svg" alt="Nina S." className="w-16 h-16 rounded-full object-cover border-2 border-primary/20" />
                      <div className="flex-1">
                        <div className="flex gap-1 mb-2">{[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-primary text-primary" />)}</div>
                        <h4 className="font-bold text-lg">Life Changing</h4>
                        <p className="text-sm text-muted-foreground">Nina S.</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground">"This gave me the platform I needed to quit my 9-5 job. Forever grateful!"</p>
                  </div>
                  {/* Review 12 */}
                  <div className="min-w-[350px] bg-card border-2 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all hover:border-primary/50">
                    <div className="flex items-start gap-4 mb-4">
                      <img src="/placeholder.svg" alt="Kevin D." className="w-16 h-16 rounded-full object-cover border-2 border-primary/20" />
                      <div className="flex-1">
                        <div className="flex gap-1 mb-2">{[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-primary text-primary" />)}</div>
                        <h4 className="font-bold text-lg">Great Value</h4>
                        <p className="text-sm text-muted-foreground">Kevin D.</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground">"Considering how long it would take to build this myself, the price is absolutely fair!"</p>
                  </div>
                  {/* Review 13 */}
                  <div className="min-w-[350px] bg-card border-2 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all hover:border-primary/50">
                    <div className="flex items-start gap-4 mb-4">
                      <img src="/placeholder.svg" alt="Olivia M." className="w-16 h-16 rounded-full object-cover border-2 border-primary/20" />
                      <div className="flex-1">
                        <div className="flex gap-1 mb-2">{[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-primary text-primary" />)}</div>
                        <h4 className="font-bold text-lg">Superb Quality</h4>
                        <p className="text-sm text-muted-foreground">Olivia M.</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground">"The account history is clean and the audience demographics match my niche perfectly!"</p>
                  </div>
                  {/* Review 14 */}
                  <div className="min-w-[350px] bg-card border-2 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all hover:border-primary/50">
                    <div className="flex items-start gap-4 mb-4">
                      <img src="/placeholder.svg" alt="Brandon F." className="w-16 h-16 rounded-full object-cover border-2 border-primary/20" />
                      <div className="flex-1">
                        <div className="flex gap-1 mb-2">{[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-primary text-primary" />)}</div>
                        <h4 className="font-bold text-lg">Outstanding Support</h4>
                        <p className="text-sm text-muted-foreground">Brandon F.</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground">"Had a few questions post-purchase and support responded within 30 minutes. Impressive!"</p>
                  </div>
                  {/* Review 15 */}
                  <div className="min-w-[350px] bg-card border-2 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all hover:border-primary/50">
                    <div className="flex items-start gap-4 mb-4">
                      <img src="/placeholder.svg" alt="Jessica A." className="w-16 h-16 rounded-full object-cover border-2 border-primary/20" />
                      <div className="flex-1">
                        <div className="flex gap-1 mb-2">{[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-primary text-primary" />)}</div>
                        <h4 className="font-bold text-lg">Incredible Service</h4>
                        <p className="text-sm text-muted-foreground">Jessica A.</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground">"Everything from browsing to transfer was smooth. Would definitely buy again!"</p>
                  </div>
                  {/* Review 16 */}
                  <div className="min-w-[350px] bg-card border-2 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all hover:border-primary/50">
                    <div className="flex items-start gap-4 mb-4">
                      <img src="/placeholder.svg" alt="Marcus J." className="w-16 h-16 rounded-full object-cover border-2 border-primary/20" />
                      <div className="flex-1">
                        <div className="flex gap-1 mb-2">{[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-primary text-primary" />)}</div>
                        <h4 className="font-bold text-lg">Top Notch</h4>
                        <p className="text-sm text-muted-foreground">Marcus J.</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground">"Monetization kicked in immediately. Already seeing ad revenue come through!"</p>
                  </div>
                  {/* Review 17 */}
                  <div className="min-w-[350px] bg-card border-2 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all hover:border-primary/50">
                    <div className="flex items-start gap-4 mb-4">
                      <img src="/placeholder.svg" alt="Sophie L." className="w-16 h-16 rounded-full object-cover border-2 border-primary/20" />
                      <div className="flex-1">
                        <div className="flex gap-1 mb-2">{[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-primary text-primary" />)}</div>
                        <h4 className="font-bold text-lg">Exactly As Described</h4>
                        <p className="text-sm text-muted-foreground">Sophie L.</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground">"No hidden surprises. The account stats matched the listing perfectly. Very honest!"</p>
                  </div>
                  {/* Review 18 */}
                  <div className="min-w-[350px] bg-card border-2 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all hover:border-primary/50">
                    <div className="flex items-start gap-4 mb-4">
                      <img src="/placeholder.svg" alt="Daniel C." className="w-16 h-16 rounded-full object-cover border-2 border-primary/20" />
                      <div className="flex-1">
                        <div className="flex gap-1 mb-2">{[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-primary text-primary" />)}</div>
                        <h4 className="font-bold text-lg">Smart Investment</h4>
                        <p className="text-sm text-muted-foreground">Daniel C.</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground">"Best way to jumpstart a content business. Saves months or even years of effort!"</p>
                  </div>
                  {/* Review 19 */}
                  <div className="min-w-[350px] bg-card border-2 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all hover:border-primary/50">
                    <div className="flex items-start gap-4 mb-4">
                      <img src="/placeholder.svg" alt="Megan K." className="w-16 h-16 rounded-full object-cover border-2 border-primary/20" />
                      <div className="flex-1">
                        <div className="flex gap-1 mb-2">{[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-primary text-primary" />)}</div>
                        <h4 className="font-bold text-lg">Five Stars</h4>
                        <p className="text-sm text-muted-foreground">Megan K.</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground">"Professional service from start to finish. Will recommend to all my creator friends!"</p>
                  </div>
                  {/* Review 20 */}
                  <div className="min-w-[350px] bg-card border-2 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all hover:border-primary/50">
                    <div className="flex items-start gap-4 mb-4">
                      <img src="/placeholder.svg" alt="Alex V." className="w-16 h-16 rounded-full object-cover border-2 border-primary/20" />
                      <div className="flex-1">
                        <div className="flex gap-1 mb-2">{[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-primary text-primary" />)}</div>
                        <h4 className="font-bold text-lg">Brilliant Service</h4>
                        <p className="text-sm text-muted-foreground">Alex V.</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground">"The guarantee gave me confidence to purchase. Glad I did - account is perfect!"</p>
                  </div>
                  {/* Review 21 */}
                  <div className="min-w-[350px] bg-card border-2 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all hover:border-primary/50">
                    <div className="flex items-start gap-4 mb-4">
                      <img src="/placeholder.svg" alt="Lauren P." className="w-16 h-16 rounded-full object-cover border-2 border-primary/20" />
                      <div className="flex-1">
                        <div className="flex gap-1 mb-2">{[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-primary text-primary" />)}</div>
                        <h4 className="font-bold text-lg">Highly Satisfied</h4>
                        <p className="text-sm text-muted-foreground">Lauren P.</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground">"Account came with great engagement metrics. My first video got thousands of views!"</p>
                  </div>
                  {/* Review 22 */}
                  <div className="min-w-[350px] bg-card border-2 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all hover:border-primary/50">
                    <div className="flex items-start gap-4 mb-4">
                      <img src="/placeholder.svg" alt="Ryan N." className="w-16 h-16 rounded-full object-cover border-2 border-primary/20" />
                      <div className="flex-1">
                        <div className="flex gap-1 mb-2">{[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-primary text-primary" />)}</div>
                        <h4 className="font-bold text-lg">Exceeded Expectations</h4>
                        <p className="text-sm text-muted-foreground">Ryan N.</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground">"Better than I hoped for. The audience quality is exceptional!"</p>
                  </div>
                  {/* Review 23 */}
                  <div className="min-w-[350px] bg-card border-2 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all hover:border-primary/50">
                    <div className="flex items-start gap-4 mb-4">
                      <img src="/placeholder.svg" alt="Victoria S." className="w-16 h-16 rounded-full object-cover border-2 border-primary/20" />
                      <div className="flex-1">
                        <div className="flex gap-1 mb-2">{[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-primary text-primary" />)}</div>
                        <h4 className="font-bold text-lg">Wonderful Experience</h4>
                        <p className="text-sm text-muted-foreground">Victoria S.</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground">"From purchase to full control in under 8 hours. Extremely efficient!"</p>
                  </div>
                  {/* Review 24 */}
                  <div className="min-w-[350px] bg-card border-2 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all hover:border-primary/50">
                    <div className="flex items-start gap-4 mb-4">
                      <img src="/placeholder.svg" alt="Jason W." className="w-16 h-16 rounded-full object-cover border-2 border-primary/20" />
                      <div className="flex-1">
                        <div className="flex gap-1 mb-2">{[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-primary text-primary" />)}</div>
                        <h4 className="font-bold text-lg">Premium Quality</h4>
                        <p className="text-sm text-muted-foreground">Jason W.</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground">"You get what you pay for - and this is premium quality all the way!"</p>
                  </div>
                  {/* Review 25 */}
                  <div className="min-w-[350px] bg-card border-2 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all hover:border-primary/50">
                    <div className="flex items-start gap-4 mb-4">
                      <img src="/placeholder.svg" alt="Natalie H." className="w-16 h-16 rounded-full object-cover border-2 border-primary/20" />
                      <div className="flex-1">
                        <div className="flex gap-1 mb-2">{[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-primary text-primary" />)}</div>
                        <h4 className="font-bold text-lg">Best Decision</h4>
                        <p className="text-sm text-muted-foreground">Natalie H.</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground">"This was the best business decision I made this year. Already profitable!"</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Creative Guarantee Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Risk-Free Purchase Guarantee</h2>
              <p className="text-xl text-muted-foreground">Your success is our priority. We stand behind every account we sell.</p>
            </div>

            <div className="relative">
              {/* Main guarantee card */}
              <div className="bg-gradient-to-br from-secondary via-background to-secondary/50 rounded-3xl p-8 md:p-12 border-2 border-border shadow-md">
                <div className="grid md:grid-cols-3 gap-8">
                  {/* Replacement Warranty */}
                  <div className="text-center space-y-4">
                    <div className="relative inline-block">
                      <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl"></div>
                      <div className="relative w-24 h-24 mx-auto bg-card rounded-full flex items-center justify-center border-4 border-primary/30 shadow-lg">
                        <RefreshCw className="w-12 h-12 text-primary" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-2">30-Day Replacement</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Account issues within 30 days? We'll replace it immediately at no cost. 
                        <span className="block mt-2 font-semibold text-foreground">Zero questions asked.</span>
                      </p>
                    </div>
                  </div>

                  {/* Money-Back Guarantee */}
                  <div className="text-center space-y-4 md:border-x md:border-primary/20 md:px-4">
                    <div className="relative inline-block">
                      <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl"></div>
                      <div className="relative w-24 h-24 mx-auto bg-card rounded-full flex items-center justify-center border-4 border-primary/30 shadow-lg">
                        <CheckCircle className="w-12 h-12 text-primary" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-2">7-Day Money Back</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Not satisfied for any reason? Full refund within 7 days of purchase.
                        <span className="block mt-2 font-semibold text-foreground">100% guaranteed.</span>
                      </p>
                    </div>
                  </div>

                  {/* Fast Support */}
                  <div className="text-center space-y-4">
                    <div className="relative inline-block">
                      <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl"></div>
                      <div className="relative w-24 h-24 mx-auto bg-card rounded-full flex items-center justify-center border-4 border-primary/30 shadow-lg">
                        <HeadphonesIcon className="w-12 h-12 text-primary" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-2">1-Hour Response</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Expert support team available on weekdays. Get help when you need it.
                        <span className="block mt-2 font-semibold text-foreground">Fast & friendly.</span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Bottom Badge */}
                <div className="mt-12 text-center">
                  <div className="inline-flex items-center gap-2 bg-primary/10 px-6 py-3 rounded-full border border-primary/30">
                    <Shield className="w-5 h-5 text-primary" />
                    <span className="font-semibold">Your purchase is 100% protected</span>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="text-center mt-12">
              <Button 
                size="lg" 
                className="text-lg h-14 px-8"
                onClick={() => {
                  const productsSection = document.getElementById('products');
                  if (productsSection) {
                    productsSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Start Earning Risk-Free
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Urgency Section - Limited Stock */}
      <section className="py-20 bg-secondary/50 border-y border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Clock className="w-8 h-8 text-primary animate-pulse" />
              <h3 className="text-2xl md:text-3xl font-bold">Limited Stock Available</h3>
            </div>
            <p className="text-lg text-muted-foreground mb-6">
              Premium monetized accounts sell out fast. Don't miss your chance to start earning today.
            </p>
            <div className="flex flex-wrap gap-4 justify-center items-center text-sm">
              <div className="flex items-center gap-2 bg-card px-4 py-2 rounded-lg border shadow-sm">
                <Users className="w-4 h-4 text-primary" />
                <span><strong>{accountsSoldThisMonth}</strong> accounts sold this month</span>
              </div>
              <div className="flex items-center gap-2 bg-card px-4 py-2 rounded-lg border shadow-sm">
                <Star className="w-4 h-4 text-primary" />
                <span><strong>4.9/5</strong> average rating</span>
              </div>
              <div className="flex items-center gap-2 bg-card px-4 py-2 rounded-lg border shadow-sm">
                <Zap className="w-4 h-4 text-primary" />
                <span><strong>{totalStock ?? "..."}</strong> accounts left in stock</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories - New Conversion Section */}
      <section className="py-20 bg-gradient-to-br from-secondary/50 via-background to-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 text-foreground">Real Results From Real Creators</h2>
              <p className="text-xl text-muted-foreground">See how our accounts have transformed content careers</p>
            </div>

            <div className="relative">
              {/* Connection Line - Desktop Only */}
              <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent -translate-y-1/2 z-0"></div>
              
              <div className="grid md:grid-cols-3 gap-8 mb-12 relative z-10">
                {/* Stat 1 */}
                <div className="bg-card rounded-2xl p-8 border-2 border-primary/20 text-center hover:border-primary/50 transition-all hover:shadow-lg hover:scale-105">
                  <div className="text-5xl font-bold" style={{ color: '#FF2929' }}>$847K+</div>
                  <p className="text-lg text-muted-foreground">Total Revenue Generated</p>
                  <p className="text-sm text-muted-foreground/70 mt-2">By our customers in the last 12 months</p>
                </div>

                {/* Stat 2 */}
                <div className="bg-card rounded-2xl p-8 border-2 border-primary/20 text-center hover:border-primary/50 transition-all hover:shadow-lg hover:scale-105">
                  <div className="text-5xl font-bold" style={{ color: '#FF2929' }}>24 hrs</div>
                  <p className="text-lg text-muted-foreground">Average Time to First Dollar</p>
                  <p className="text-sm text-muted-foreground/70 mt-2">Most customers earn within the first day</p>
                </div>

                {/* Stat 3 */}
                <div className="bg-card rounded-2xl p-8 border-2 border-primary/20 text-center hover:border-primary/50 transition-all hover:shadow-lg hover:scale-105">
                  <div className="text-5xl font-bold" style={{ color: '#FF2929' }}>98.7%</div>
                  <p className="text-lg text-muted-foreground">Customer Satisfaction</p>
                  <p className="text-sm text-muted-foreground/70 mt-2">Would recommend to other creators</p>
                </div>
              </div>
            </div>

            <div className="text-center">
              <Button size="lg" className="text-lg px-10 py-6" style={{ backgroundColor: '#FF2929' }}>
                Start Your Success Story Today
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Best Selling Products Section */}
      <section className="py-20 container mx-auto px-4 bg-background">
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold mb-4 text-foreground">Best Selling Accounts</h2>
          <p className="text-lg text-muted-foreground">Our customers' favorite monetized accounts this month</p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <Skeleton className="aspect-square w-full" />
            <Skeleton className="aspect-square w-full" />
            <Skeleton className="aspect-square w-full" />
          </div>
        ) : !data || data.length === 0 ? (
          <div className="text-center py-20">
            <ShoppingBag className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h4 className="text-2xl font-semibold mb-2">No Products Found</h4>
            <p className="text-muted-foreground">
              Products coming soon!
            </p>
          </div>
        ) : (
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
              {data.slice(0, 3).map((product) => (
                <ProductCard key={product.node.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Affiliate Program Section - Simple & Unique */}
      <section id="affiliate" className="py-20 relative overflow-hidden border-t border-border">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto">
            {/* Main Pitch */}
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-3 leading-tight">
                Promote Our Accounts.<br />
                <span style={{ color: '#FF2929' }}>Get Paid Generously.</span>
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                20% commission on every sale. No strings attached.
              </p>
            </div>

            {/* Simple Benefits List */}
            <div className="bg-card/50 backdrop-blur-sm border-2 rounded-3xl p-12 mb-12 space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                  <CheckCircle className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Earn $100-$400 per sale</h3>
                  <p className="text-muted-foreground">Simple 20% commission structure. The more you sell, the more you earn.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                  <CheckCircle className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Your audience will love these</h3>
                  <p className="text-muted-foreground">Premium monetized accounts that actually deliver results. High satisfaction = high conversions.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                  <CheckCircle className="w-6 h-6 text-primary" />
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

      {/* Restock Email Capture - Moved to bottom */}
      <section className="py-20 container mx-auto px-4">
        <Card className="max-w-2xl mx-auto text-center bg-gradient-to-br from-secondary to-background border-border">
          <CardHeader>
            <Mail className="w-12 h-12 mx-auto mb-4" style={{ color: '#FF2929' }} />
            <CardTitle className="text-2xl" style={{ color: '#FF2929' }}>Get Notified on Restock</CardTitle>
            <CardDescription className="text-base">
              Premium accounts sell fast! Enter your email to be notified when we restock your favorite products.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleEmailSubmit} className="flex gap-2 max-w-md mx-auto">
              <Input 
                type="email" 
                placeholder="Enter your email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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

export default Index;
