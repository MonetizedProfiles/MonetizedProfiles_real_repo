import { useQuery } from "@tanstack/react-query";
import { STOREFRONT_QUERY, storefrontApiRequest, ShopifyProduct } from "@/lib/shopify";
import { ProductCard } from "@/components/ProductCard";
import { InfiniteScroll } from "@/components/InfiniteScroll";
import { ShoppingBag, TrendingUp, Shield, Zap, Clock, RefreshCw, HeadphonesIcon, Star, CheckCircle, Users, Lock, Mail, DollarSign, Percent, Video, Play, ChevronLeft, ChevronRight, ChevronDown, Sparkles, Wallet, ShoppingCart } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useState, useEffect, useRef, useCallback } from "react";
import { toast } from "sonner";
import { Link } from "react-router-dom";
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
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftStart, setScrollLeftStart] = useState(0);
  const [isDraggingBest, setIsDraggingBest] = useState(false);
  const [startXBest, setStartXBest] = useState(0);
  const [scrollLeftStartBest, setScrollLeftStartBest] = useState(0);
  
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
    const walk = (x - startX) * 2.0;
    scrollContainerRef.current.scrollLeft = scrollLeftStart - walk;
  }, [isDragging, startX, scrollLeftStart]);

  const handleTouchMove = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging || !scrollContainerRef.current || window.innerWidth >= 640) return;
    const x = e.touches[0].pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2.0;
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

  // Drag to scroll handlers for Best Selling (mobile only)
  const handleMouseDownBest = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!scrollContainerRefBest.current || window.innerWidth >= 640) return;
    setIsDraggingBest(true);
    setStartXBest(e.pageX - scrollContainerRefBest.current.offsetLeft);
    setScrollLeftStartBest(scrollContainerRefBest.current.scrollLeft);
    if (scrollContainerRefBest.current) {
      scrollContainerRefBest.current.style.scrollBehavior = 'auto';
    }
  }, []);

  const handleTouchStartBest = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    if (!scrollContainerRefBest.current || window.innerWidth >= 640) return;
    setIsDraggingBest(true);
    setStartXBest(e.touches[0].pageX - scrollContainerRefBest.current.offsetLeft);
    setScrollLeftStartBest(scrollContainerRefBest.current.scrollLeft);
    if (scrollContainerRefBest.current) {
      scrollContainerRefBest.current.style.scrollBehavior = 'auto';
    }
  }, []);

  const handleMouseMoveBest = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDraggingBest || !scrollContainerRefBest.current || window.innerWidth >= 640) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRefBest.current.offsetLeft;
    const walk = (x - startXBest) * 2.0;
    scrollContainerRefBest.current.scrollLeft = scrollLeftStartBest - walk;
  }, [isDraggingBest, startXBest, scrollLeftStartBest]);

  const handleTouchMoveBest = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDraggingBest || !scrollContainerRefBest.current || window.innerWidth >= 640) return;
    const x = e.touches[0].pageX - scrollContainerRefBest.current.offsetLeft;
    const walk = (x - startXBest) * 2.0;
    scrollContainerRefBest.current.scrollLeft = scrollLeftStartBest - walk;
  }, [isDraggingBest, startXBest, scrollLeftStartBest]);

  const handleMouseUpOrLeaveBest = useCallback(() => {
    setIsDraggingBest(false);
    if (scrollContainerRefBest.current) {
      scrollContainerRefBest.current.style.scrollBehavior = 'smooth';
    }
  }, []);

  const handleTouchEndBest = useCallback(() => {
    setIsDraggingBest(false);
    if (scrollContainerRefBest.current) {
      scrollContainerRefBest.current.style.scrollBehavior = 'smooth';
    }
  }, []);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      try {
        const { subscribeToKlaviyo } = await import("@/lib/klaviyo");
        await subscribeToKlaviyo(email, {
          source: "restock_notification",
          restock_interest: true
        });
        localStorage.setItem('klaviyo_email', email);
        toast.success("Thanks! We'll notify you when products are restocked.");
        setEmail("");
      } catch (error) {
        toast.error("Failed to subscribe. Please try again.");
      }
    }
  };

  return (
    <div className="bg-background">`

      {/* Hero Section - Modern SaaS Minimal */}
      <section className="relative pt-6 pb-12 md:pt-12 md:pb-20 lg:pt-16 lg:pb-24 overflow-hidden bg-background">
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
                Earn Instantly
              </span>
            </h1>

            {/* Simple subtitle */}
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground mb-8 sm:mb-12 max-w-3xl mx-auto px-4">
              Pre-approved accounts with real followers. Start earning ad revenue on your first post.
            </p>

            {/* Clean CTA */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
              <Button 
                size="lg"
                className="w-full sm:w-auto px-8 sm:px-10 py-5 sm:py-6 text-base sm:text-lg font-semibold bg-[#FF2929] hover:bg-[#FF2929]/90 text-white touch-manipulation"
                onClick={() => {
                  const featuredSection = document.getElementById('featured-accounts');
                  if (featuredSection) {
                    const isMobile = window.innerWidth < 768;
                    if (isMobile) {
                      const yOffset = -80; // Offset for header
                      const y = featuredSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
                      window.scrollTo({ top: y, behavior: 'smooth' });
                    } else {
                      featuredSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                  }
                }}
              >
                Browse Accounts
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="w-full sm:w-auto px-8 sm:px-10 py-5 sm:py-6 text-base sm:text-lg font-semibold border-2 touch-manipulation"
                onClick={() => {
                  const whyChooseSection = document.getElementById('why-choose');
                  if (whyChooseSection) {
                    const isMobile = window.innerWidth < 768;
                    if (isMobile) {
                      const yOffset = -80; // Offset for header
                      const y = whyChooseSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
                      window.scrollTo({ top: y, behavior: 'smooth' });
                    } else {
                      whyChooseSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                  }
                }}
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section - 3 Products Display with Scroll */}
      <section id="featured-accounts" className="py-12 sm:py-20 container mx-auto px-4">
        <div className="mb-8 sm:mb-12 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4 text-foreground px-4">Featured Monetized Accounts</h2>
          <p className="text-base sm:text-lg text-muted-foreground px-4">Our most popular accounts - 100% organic followers, fully monetized & ready to earn</p>
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
          <div className="max-w-7xl mx-auto relative">
            {/* Left scroll button - Hidden on mobile */}
            {canScrollLeft && (
              <Button
                variant="outline"
                size="icon"
                className="hidden sm:flex absolute left-0 lg:-left-1 top-1/2 -translate-y-1/2 z-10 bg-[#FF2929] hover:bg-[#FF2929]/90 text-white border-[#FF2929] shadow-lg touch-manipulation"
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
                className="hidden sm:flex absolute right-0 lg:-right-1 top-1/2 -translate-y-1/2 z-10 bg-[#FF2929] hover:bg-[#FF2929]/90 text-white border-[#FF2929] shadow-lg touch-manipulation"
                onClick={() => scroll('right')}
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            )}

            {/* Scrollable container */}
            <div 
              ref={scrollContainerRef}
              className="overflow-hidden scroll-smooth px-0 w-full sm:w-[calc(3*360px+3rem)] mx-auto select-none"
              style={{ cursor: window.innerWidth < 640 && isDragging ? 'grabbing' : window.innerWidth < 640 ? 'grab' : 'default' }}
              onScroll={checkScrollButtons}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUpOrLeave}
              onMouseLeave={handleMouseUpOrLeave}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div 
                className="grid gap-4 sm:gap-6"
                style={{ 
                  gridAutoFlow: 'column',
                  gridAutoColumns: 'min(360px, 85vw)',
                  gridTemplateColumns: 'none'
                }}
              >
                {[...data]
                  .sort((a, b) => {
                    const priorityOrder = ['youtube', 'monetized-tiktok-account', 'aged-youtube'];
                    const ia = priorityOrder.indexOf(a.node.handle);
                    const ib = priorityOrder.indexOf(b.node.handle);
                    if (ia === -1 && ib === -1) return 0;
                    if (ia === -1) return 1;
                    if (ib === -1) return -1;
                    return ia - ib;
                  })
                  .map((product) => (
                    <ProductCard key={product.node.id} product={product} />
                  ))}

              </div>
            </div>
          </div>
        )}
      </section>

      {/* Features Section - Standardized Symmetrical */}
      <section id="why-choose" className="py-12 sm:py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="mb-10 sm:mb-12 md:mb-16 text-center max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4 text-foreground px-4">Why Our Accounts Are Better</h2>
            <p className="text-base sm:text-lg text-muted-foreground px-4">100% organic growth, full account ownership, and zero tax verification hassles</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-7xl mx-auto">
            {/* Card 1 */}
            <Card className="bg-card border-2 hover:border-primary/50 transition-all hover:shadow-lg">
              <CardHeader className="text-center space-y-4 pb-3">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto">
                  <Shield className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-lg">100% Organic Growth</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-sm text-muted-foreground">
                <p>All accounts grown organically with real followers. Zero bots, zero fake engagement - guaranteed</p>
              </CardContent>
            </Card>

            {/* Card 2 */}
            <Card className="bg-card border-2 hover:border-primary/50 transition-all hover:shadow-lg">
              <CardHeader className="text-center space-y-4 pb-3">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto">
                  <Users className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-lg">No Tax Verification Needed</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-sm text-muted-foreground">
                <p>All accounts come tax-approved. Simply connect your PayPal and start cashing out immediately</p>
              </CardContent>
            </Card>

            {/* Card 3 */}
            <Card className="bg-card border-2 hover:border-primary/50 transition-all hover:shadow-lg">
              <CardHeader className="text-center space-y-4 pb-3">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto">
                  <Zap className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-lg">Full Account Ownership</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-sm text-muted-foreground">
                <p>Complete control from day one. Change login details, email, and all account information as you wish</p>
              </CardContent>
            </Card>

            {/* Card 4 */}
            <Card className="bg-card border-2 hover:border-primary/50 transition-all hover:shadow-lg">
              <CardHeader className="text-center space-y-4 pb-3">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto">
                  <Shield className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-lg">Replacement Guarantee</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-sm text-muted-foreground">
                <p>30-day replacement warranty on every account. If anything goes wrong, we'll replace it immediately—no questions asked.</p>
              </CardContent>
            </Card>
          </div>

          {/* CTA Button */}
          <div className="text-center mt-8 sm:mt-12 px-4">
            <Button 
              size="lg" 
              className="w-full sm:w-auto text-base sm:text-lg h-12 sm:h-14 px-6 sm:px-8 touch-manipulation"
              onClick={() => {
                const featuredSection = document.getElementById('featured-accounts');
                if (featuredSection) {
                  const isMobile = window.innerWidth < 768;
                  if (isMobile) {
                    const yOffset = -80;
                    const y = featuredSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
                    window.scrollTo({ top: y, behavior: 'smooth' });
                  } else {
                    featuredSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }
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
      <section className="py-12 sm:py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">What Our Customers Say</h2>
            <p className="text-lg text-muted-foreground">Join hundreds of satisfied content creators</p>
          </div>

          <div className="relative overflow-x-hidden overflow-y-visible max-w-6xl mx-auto pb-6">
            <InfiniteScroll speed={100} className="gap-4 sm:gap-6 py-3">
              {[...Array(2)].map((_, groupIdx) => (
                <div key={groupIdx} className="flex gap-4 sm:gap-6">
                  {/* Review 1 */}
                  <div 
                    className="min-w-[280px] sm:min-w-[350px] bg-card border-2 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all hover:border-primary/50 cursor-pointer"
                    onClick={() => {
                      const loox = (window as any).loox;
                      if (loox && loox.open_reviews) {
                        loox.open_reviews();
                      }
                    }}
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <img src={sarahImg} alt="Sarah M." className="w-16 h-16 rounded-full object-cover border-2 border-primary/20" />
                      <div className="flex-1">
                        <div className="flex gap-1 mb-2">{[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-primary text-primary" />)}</div>
                        <h4 className="font-bold text-lg">Game Changer!</h4>
                        <p className="text-sm text-muted-foreground">Sarah M.</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground">"literally started making money day one. account was exactly what they said it'd be 🔥"</p>
                  </div>
                  {/* Review 2 */}
                  <div 
                    className="min-w-[280px] sm:min-w-[350px] bg-card border-2 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all hover:border-primary/50 cursor-pointer"
                    onClick={() => {
                      const loox = (window as any).loox;
                      if (loox && loox.open_reviews) {
                        loox.open_reviews();
                      }
                    }}
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <img src={justjamestvImg} alt="JustJamesTV" className="w-16 h-16 rounded-full object-cover border-2 border-primary/20" />
                      <div className="flex-1">
                        <div className="flex gap-1 mb-2">{[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-primary text-primary" />)}</div>
                        <h4 className="font-bold text-lg">Excellent Service</h4>
                        <p className="text-sm text-muted-foreground">JustJamesTV</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground">"transfer was so smooth and support really came through for me. got actual engaged followers on my tiktok"</p>
                  </div>
                  {/* Review 3 */}
                  <div 
                    className="min-w-[280px] sm:min-w-[350px] bg-card border-2 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all hover:border-primary/50 cursor-pointer"
                    onClick={() => {
                      const loox = (window as any).loox;
                      if (loox && loox.open_reviews) {
                        loox.open_reviews();
                      }
                    }}
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <img src={emmaImg} alt="Emma Thompson" className="w-16 h-16 rounded-full object-cover border-2 border-primary/20" />
                      <div className="flex-1">
                        <div className="flex gap-1 mb-2">{[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-primary text-primary" />)}</div>
                        <h4 className="font-bold text-lg">Worth Every Penny</h4>
                        <p className="text-sm text-muted-foreground">Emma Thompson</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground">"saved me literally months of grinding. perfect way to jumpstart my creator journey tbh"</p>
                  </div>
                  {/* Review 4 */}
                  <div 
                    className="min-w-[280px] sm:min-w-[350px] bg-card border-2 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all hover:border-primary/50 cursor-pointer"
                    onClick={() => {
                      const loox = (window as any).loox;
                      if (loox && loox.open_reviews) {
                        loox.open_reviews();
                      }
                    }}
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <img src={mikeImg} alt="MikeReacts" className="w-16 h-16 rounded-full object-cover border-2 border-primary/20" />
                      <div className="flex-1">
                        <div className="flex gap-1 mb-2">{[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-primary text-primary" />)}</div>
                        <h4 className="font-bold text-lg">Best Investment</h4>
                        <p className="text-sm text-muted-foreground">MikeReacts</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground">"monetization was already active. started seeing money come in within hours no cap"</p>
                  </div>
                  {/* Review 5 */}
                  <div 
                    className="min-w-[280px] sm:min-w-[350px] bg-card border-2 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all hover:border-primary/50 cursor-pointer"
                    onClick={() => {
                      const loox = (window as any).loox;
                      if (loox && loox.open_reviews) {
                        loox.open_reviews();
                      }
                    }}
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <img src={lisaImg} alt="Lisa Wong" className="w-16 h-16 rounded-full object-cover border-2 border-primary/20" />
                      <div className="flex-1">
                        <div className="flex gap-1 mb-2">{[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-primary text-primary" />)}</div>
                        <h4 className="font-bold text-lg">Seamless Process</h4>
                        <p className="text-sm text-muted-foreground">Lisa Wong</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground">"everything went super smooth, they handled it all. got the account transferred in less than 12 hours"</p>
                  </div>
                  {/* Review 6 */}
                  <div 
                    className="min-w-[280px] sm:min-w-[350px] bg-card border-2 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all hover:border-primary/50 cursor-pointer"
                    onClick={() => {
                      const loox = (window as any).loox;
                      if (loox && loox.open_reviews) {
                        loox.open_reviews();
                      }
                    }}
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <img src={davidImg} alt="David Anderson" className="w-16 h-16 rounded-full object-cover border-2 border-primary/20" />
                      <div className="flex-1">
                        <div className="flex gap-1 mb-2">{[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-primary text-primary" />)}</div>
                        <h4 className="font-bold text-lg">Highly Recommend</h4>
                        <p className="text-sm text-muted-foreground">David Anderson</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground">"perfect if you don't wanna grind from zero. the engagement is real, not fake stuff"</p>
                  </div>
                  {/* Review 7 */}
                  <div 
                    className="min-w-[280px] sm:min-w-[350px] bg-card border-2 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all hover:border-primary/50 cursor-pointer"
                    onClick={() => {
                      const loox = (window as any).loox;
                      if (loox && loox.open_reviews) {
                        loox.open_reviews();
                      }
                    }}
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <img src={michaelImg} alt="Michael Chen" className="w-16 h-16 rounded-full object-cover border-2 border-primary/20" />
                      <div className="flex-1">
                        <div className="flex gap-1 mb-2">{[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-primary text-primary" />)}</div>
                        <h4 className="font-bold text-lg">Amazing Quality</h4>
                        <p className="text-sm text-muted-foreground">Michael Chen</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground">"these are actual real people, not bots. engagement rate is exactly what they said"</p>
                  </div>
                  {/* Review 8 */}
                  <div 
                    className="min-w-[280px] sm:min-w-[350px] bg-card border-2 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all hover:border-primary/50 cursor-pointer"
                    onClick={() => {
                      const loox = (window as any).loox;
                      if (loox && loox.open_reviews) {
                        loox.open_reviews();
                      }
                    }}
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <img src={blockbusterzImg} alt="BlockBusterZ" className="w-16 h-16 rounded-full object-cover border-2 border-primary/20" />
                      <div className="flex-1">
                        <div className="flex gap-1 mb-2">{[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-primary text-primary" />)}</div>
                        <h4 className="font-bold text-lg">Fast & Reliable</h4>
                        <p className="text-sm text-muted-foreground">BlockBusterZ</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground">"support answered everything before I bought. whole thing was super transparent which I appreciate"</p>
                  </div>
                  {/* Review 9 */}
                  <div 
                    className="min-w-[280px] sm:min-w-[350px] bg-card border-2 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all hover:border-primary/50 cursor-pointer"
                    onClick={() => {
                      const loox = (window as any).loox;
                      if (loox && loox.open_reviews) {
                        loox.open_reviews();
                      }
                    }}
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <img src="https://ui-avatars.com/api/?name=Rachel+W&background=ec4899&color=fff&size=128" alt="Rachel W." className="w-16 h-16 rounded-full object-cover border-2 border-primary/20" />
                      <div className="flex-1">
                        <div className="flex gap-1 mb-2">{[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-primary text-primary" />)}</div>
                        <h4 className="font-bold text-lg">Perfect Start</h4>
                        <p className="text-sm text-muted-foreground">Rachel W.</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground">"got my content career going with a head start. the analytics show people are actually interested"</p>
                  </div>
                  {/* Review 10 */}
                  <div 
                    className="min-w-[280px] sm:min-w-[350px] bg-card border-2 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all hover:border-primary/50 cursor-pointer"
                    onClick={() => {
                      const loox = (window as any).loox;
                      if (loox && loox.open_reviews) {
                        loox.open_reviews();
                      }
                    }}
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <img src={tomImg} alt="Tom Rodriguez" className="w-16 h-16 rounded-full object-cover border-2 border-primary/20" />
                      <div className="flex-1">
                        <div className="flex gap-1 mb-2">{[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-primary text-primary" />)}</div>
                        <h4 className="font-bold text-lg">Trustworthy Service</h4>
                        <p className="text-sm text-muted-foreground">Tom Rodriguez</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground">"ngl I was skeptical at first but they came through with exactly what they promised"</p>
                  </div>
                  {/* Review 11 */}
                  <div 
                    className="min-w-[280px] sm:min-w-[350px] bg-card border-2 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all hover:border-primary/50 cursor-pointer"
                    onClick={() => {
                      const loox = (window as any).loox;
                      if (loox && loox.open_reviews) {
                        loox.open_reviews();
                      }
                    }}
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <img src="https://ui-avatars.com/api/?name=Nina+S&background=06b6d4&color=fff&size=128" alt="Nina S." className="w-16 h-16 rounded-full object-cover border-2 border-primary/20" />
                      <div className="flex-1">
                        <div className="flex gap-1 mb-2">{[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-primary text-primary" />)}</div>
                        <h4 className="font-bold text-lg">Life Changing</h4>
                        <p className="text-sm text-muted-foreground">Nina S.</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground">"this literally gave me the chance to quit my 9-5. changed my whole life fr"</p>
                  </div>
                  {/* Review 12 */}
                  <div 
                    className="min-w-[280px] sm:min-w-[350px] bg-card border-2 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all hover:border-primary/50 cursor-pointer"
                    onClick={() => {
                      const loox = (window as any).loox;
                      if (loox && loox.open_reviews) {
                        loox.open_reviews();
                      }
                    }}
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=KevinDaily" alt="KevinDaily" className="w-16 h-16 rounded-full object-cover border-2 border-primary/20" />
                      <div className="flex-1">
                        <div className="flex gap-1 mb-2">{[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-primary text-primary" />)}</div>
                        <h4 className="font-bold text-lg">Great Value</h4>
                        <p className="text-sm text-muted-foreground">KevinDaily</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground">"when you think about how long this would take to build yourself, the price makes sense"</p>
                  </div>
                  {/* Review 13 */}
                  <div 
                    className="min-w-[280px] sm:min-w-[350px] bg-card border-2 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all hover:border-primary/50 cursor-pointer"
                    onClick={() => {
                      const loox = (window as any).loox;
                      if (loox && loox.open_reviews) {
                        loox.open_reviews();
                      }
                    }}
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <img src="https://ui-avatars.com/api/?name=Olivia+M&background=a855f7&color=fff&size=128" alt="Olivia M." className="w-16 h-16 rounded-full object-cover border-2 border-primary/20" />
                      <div className="flex-1">
                        <div className="flex gap-1 mb-2">{[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-primary text-primary" />)}</div>
                        <h4 className="font-bold text-lg">Superb Quality</h4>
                        <p className="text-sm text-muted-foreground">Olivia M.</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground">"account history is clean and the audience actually matches my niche. couldn't ask for more"</p>
                  </div>
                  {/* Review 14 */}
                  <div 
                    className="min-w-[280px] sm:min-w-[350px] bg-card border-2 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all hover:border-primary/50 cursor-pointer"
                    onClick={() => {
                      const loox = (window as any).loox;
                      if (loox && loox.open_reviews) {
                        loox.open_reviews();
                      }
                    }}
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <img src={howtoaiImg} alt="HowToAI" className="w-16 h-16 rounded-full object-cover border-2 border-primary/20" />
                      <div className="flex-1">
                        <div className="flex gap-1 mb-2">{[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-primary text-primary" />)}</div>
                        <h4 className="font-bold text-lg">Outstanding Support</h4>
                        <p className="text-sm text-muted-foreground">HowToAI</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground">"had some questions after buying and support got back to me in like 30 mins. super helpful"</p>
                  </div>
                  {/* Review 15 */}
                  <div 
                    className="min-w-[280px] sm:min-w-[350px] bg-card border-2 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all hover:border-primary/50 cursor-pointer"
                    onClick={() => {
                      const loox = (window as any).loox;
                      if (loox && loox.open_reviews) {
                        loox.open_reviews();
                      }
                    }}
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <img src="https://ui-avatars.com/api/?name=Jessica+A&background=14b8a6&color=fff&size=128" alt="Jessica A." className="w-16 h-16 rounded-full object-cover border-2 border-primary/20" />
                      <div className="flex-1">
                        <div className="flex gap-1 mb-2">{[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-primary text-primary" />)}</div>
                        <h4 className="font-bold text-lg">Incredible Service</h4>
                        <p className="text-sm text-muted-foreground">Jessica A.</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground">"whole experience from browsing to getting the account was smooth. would def buy again"</p>
                  </div>
                  {/* Review 16 */}
                  <div 
                    className="min-w-[280px] sm:min-w-[350px] bg-card border-2 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all hover:border-primary/50 cursor-pointer"
                    onClick={() => {
                      const loox = (window as any).loox;
                      if (loox && loox.open_reviews) {
                        loox.open_reviews();
                      }
                    }}
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=MarcusMoneyTV" alt="MarcusMoneyTV" className="w-16 h-16 rounded-full object-cover border-2 border-primary/20" />
                      <div className="flex-1">
                        <div className="flex gap-1 mb-2">{[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-primary text-primary" />)}</div>
                        <h4 className="font-bold text-lg">Top Notch</h4>
                        <p className="text-sm text-muted-foreground">MarcusMoneyTV</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground">"monetization started working right away. already getting ad money coming in"</p>
                  </div>
                  {/* Review 17 */}
                  <div 
                    className="min-w-[280px] sm:min-w-[350px] bg-card border-2 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all hover:border-primary/50 cursor-pointer"
                    onClick={() => {
                      const loox = (window as any).loox;
                      if (loox && loox.open_reviews) {
                        loox.open_reviews();
                      }
                    }}
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <img src="https://ui-avatars.com/api/?name=Sophie+L&background=f43f5e&color=fff&size=128" alt="Sophie L." className="w-16 h-16 rounded-full object-cover border-2 border-primary/20" />
                      <div className="flex-1">
                        <div className="flex gap-1 mb-2">{[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-primary text-primary" />)}</div>
                        <h4 className="font-bold text-lg">Exactly As Described</h4>
                        <p className="text-sm text-muted-foreground">Sophie L.</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground">"no surprises or anything. account stats matched exactly what was on the listing"</p>
                  </div>
                  {/* Review 18 */}
                  <div 
                    className="min-w-[280px] sm:min-w-[350px] bg-card border-2 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all hover:border-primary/50 cursor-pointer"
                    onClick={() => {
                      const loox = (window as any).loox;
                      if (loox && loox.open_reviews) {
                        loox.open_reviews();
                      }
                    }}
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=DanTheContentMan" alt="DanTheContentMan" className="w-16 h-16 rounded-full object-cover border-2 border-primary/20" />
                      <div className="flex-1">
                        <div className="flex gap-1 mb-2">{[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-primary text-primary" />)}</div>
                        <h4 className="font-bold text-lg">Smart Investment</h4>
                        <p className="text-sm text-muted-foreground">DanTheContentMan</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground">"honestly the best way to get your content business going. saves you months or years"</p>
                  </div>
                  {/* Review 19 */}
                  <div 
                    className="min-w-[280px] sm:min-w-[350px] bg-card border-2 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all hover:border-primary/50 cursor-pointer"
                    onClick={() => {
                      const loox = (window as any).loox;
                      if (loox && loox.open_reviews) {
                        loox.open_reviews();
                      }
                    }}
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <img src="https://ui-avatars.com/api/?name=Megan+K&background=3b82f6&color=fff&size=128" alt="Megan K." className="w-16 h-16 rounded-full object-cover border-2 border-primary/20" />
                      <div className="flex-1">
                        <div className="flex gap-1 mb-2">{[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-primary text-primary" />)}</div>
                        <h4 className="font-bold text-lg">Five Stars</h4>
                        <p className="text-sm text-muted-foreground">Megan K.</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground">"super legit service. gonna tell all my creator friends about this"</p>
                  </div>
                  {/* Review 20 */}
                  <div 
                    className="min-w-[280px] sm:min-w-[350px] bg-card border-2 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all hover:border-primary/50 cursor-pointer"
                    onClick={() => {
                      const loox = (window as any).loox;
                      if (loox && loox.open_reviews) {
                        loox.open_reviews();
                      }
                    }}
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=AlexViralContent" alt="AlexViralContent" className="w-16 h-16 rounded-full object-cover border-2 border-primary/20" />
                      <div className="flex-1">
                        <div className="flex gap-1 mb-2">{[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-primary text-primary" />)}</div>
                        <h4 className="font-bold text-lg">Brilliant Service</h4>
                        <p className="text-sm text-muted-foreground">AlexViralContent</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground">"the guarantee thing made me feel way better about buying. glad I went for it, account is perfect"</p>
                  </div>
                  {/* Review 21 */}
                  <div 
                    className="min-w-[280px] sm:min-w-[350px] bg-card border-2 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all hover:border-primary/50 cursor-pointer"
                    onClick={() => {
                      const loox = (window as any).loox;
                      if (loox && loox.open_reviews) {
                        loox.open_reviews();
                      }
                    }}
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <img src="https://ui-avatars.com/api/?name=Lauren+P&background=eab308&color=fff&size=128" alt="Lauren P." className="w-16 h-16 rounded-full object-cover border-2 border-primary/20" />
                      <div className="flex-1">
                        <div className="flex gap-1 mb-2">{[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-primary text-primary" />)}</div>
                        <h4 className="font-bold text-lg">Highly Satisfied</h4>
                        <p className="text-sm text-muted-foreground">Lauren P.</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground">"the engagement was solid from the start. my first video literally got thousands of views"</p>
                  </div>
                  {/* Review 22 */}
                  <div 
                    className="min-w-[280px] sm:min-w-[350px] bg-card border-2 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all hover:border-primary/50 cursor-pointer"
                    onClick={() => {
                      const loox = (window as any).loox;
                      if (loox && loox.open_reviews) {
                        loox.open_reviews();
                      }
                    }}
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=RyanNova" alt="RyanNova" className="w-16 h-16 rounded-full object-cover border-2 border-primary/20" />
                      <div className="flex-1">
                        <div className="flex gap-1 mb-2">{[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-primary text-primary" />)}</div>
                        <h4 className="font-bold text-lg">Exceeded Expectations</h4>
                        <p className="text-sm text-muted-foreground">RyanNova</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground">"way better than what I expected. the audience quality is actually really good"</p>
                  </div>
                  {/* Review 23 */}
                  <div 
                    className="min-w-[280px] sm:min-w-[350px] bg-card border-2 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all hover:border-primary/50 cursor-pointer"
                    onClick={() => {
                      const loox = (window as any).loox;
                      if (loox && loox.open_reviews) {
                        loox.open_reviews();
                      }
                    }}
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <img src="https://ui-avatars.com/api/?name=Victoria+S&background=d946ef&color=fff&size=128" alt="Victoria S." className="w-16 h-16 rounded-full object-cover border-2 border-primary/20" />
                      <div className="flex-1">
                        <div className="flex gap-1 mb-2">{[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-primary text-primary" />)}</div>
                        <h4 className="font-bold text-lg">Wonderful Experience</h4>
                        <p className="text-sm text-muted-foreground">Victoria S.</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground">"bought it and had full control in like 8 hours. super fast process"</p>
                  </div>
                  {/* Review 24 */}
                  <div 
                    className="min-w-[280px] sm:min-w-[350px] bg-card border-2 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all hover:border-primary/50 cursor-pointer"
                    onClick={() => {
                      const loox = (window as any).loox;
                      if (loox && loox.open_reviews) {
                        loox.open_reviews();
                      }
                    }}
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=JasonWins" alt="JasonWins" className="w-16 h-16 rounded-full object-cover border-2 border-primary/20" />
                      <div className="flex-1">
                        <div className="flex gap-1 mb-2">{[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-primary text-primary" />)}</div>
                        <h4 className="font-bold text-lg">Premium Quality</h4>
                        <p className="text-sm text-muted-foreground">JasonWins</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground">"you really do get what you pay for. this is quality stuff all around"</p>
                  </div>
                  {/* Review 25 */}
                  <div 
                    className="min-w-[280px] sm:min-w-[350px] bg-card border-2 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all hover:border-primary/50 cursor-pointer"
                    onClick={() => {
                      const loox = (window as any).loox;
                      if (loox && loox.open_reviews) {
                        loox.open_reviews();
                      }
                    }}
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <img src="https://ui-avatars.com/api/?name=Natalie+H&background=059669&color=fff&size=128" alt="Natalie H." className="w-16 h-16 rounded-full object-cover border-2 border-primary/20" />
                      <div className="flex-1">
                        <div className="flex gap-1 mb-2">{[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-primary text-primary" />)}</div>
                        <h4 className="font-bold text-lg">Best Decision</h4>
                        <p className="text-sm text-muted-foreground">Natalie H.</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground">"best decision I made this year honestly. already making profit from it"</p>
                  </div>
                </div>
              ))}
            </InfiniteScroll>
          </div>
        </div>
      </section>

      {/* Creative Guarantee Section */}
      <section className="py-12 sm:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Risk-Free Purchase Guarantee</h2>
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
                      <h3 className="text-2xl font-bold mb-2">30-Day Money Back</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Not satisfied? Full refund or replacement within 30 days. Account must be returned.
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
                  const featuredSection = document.getElementById('featured-accounts');
                  if (featuredSection) {
                    const isMobile = window.innerWidth < 768;
                    if (isMobile) {
                      const yOffset = -80;
                      const y = featuredSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
                      window.scrollTo({ top: y, behavior: 'smooth' });
                    } else {
                      featuredSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
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
      <section className="py-12 sm:py-20 bg-secondary/50 border-y border-border">
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
      <section className="py-12 sm:py-20 bg-gradient-to-br from-secondary/50 via-background to-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-foreground">Real Results From Real Creators</h2>
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
                  <div className="text-5xl font-bold" style={{ color: '#FF2929' }}>48 hrs</div>
                  <p className="text-lg text-muted-foreground">Average Time to First Dollar</p>
                  <p className="text-sm text-muted-foreground/70 mt-2">Most customers earn within 48 hours</p>
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
              <Button 
                size="lg" 
                className="text-lg px-10 py-6" 
                style={{ backgroundColor: '#FF2929' }}
                onClick={() => {
                  const featuredSection = document.getElementById('featured-accounts');
                  if (featuredSection) {
                    const isMobile = window.innerWidth < 768;
                    if (isMobile) {
                      const yOffset = -80;
                      const y = featuredSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
                      window.scrollTo({ top: y, behavior: 'smooth' });
                    } else {
                      featuredSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                  }
                }}
              >
                Start Your Success Story Today
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Best Selling Products Section */}
      <section className="py-12 sm:py-20 container mx-auto px-4 bg-background">
        <div className="mb-8 sm:mb-12 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4 text-foreground px-4">Best Selling Accounts</h2>
          <p className="text-base sm:text-lg text-muted-foreground px-4">Our customers' favorite monetized accounts this month</p>
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
          <div className="max-w-7xl mx-auto relative">
            {/* Left scroll button - Hidden on mobile */}
            {canScrollLeftBest && (
              <Button
                variant="outline"
                size="icon"
                className="hidden sm:flex absolute left-0 lg:-left-1 top-1/2 -translate-y-1/2 z-10 bg-[#FF2929] hover:bg-[#FF2929]/90 text-white border-[#FF2929] shadow-lg touch-manipulation"
                onClick={() => scrollBest('left')}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
            )}
            
            {/* Right scroll button - Hidden on mobile */}
            {canScrollRightBest && (
              <Button
                variant="outline"
                size="icon"
                className="hidden sm:flex absolute right-0 lg:-right-1 top-1/2 -translate-y-1/2 z-10 bg-[#FF2929] hover:bg-[#FF2929]/90 text-white border-[#FF2929] shadow-lg touch-manipulation"
                onClick={() => scrollBest('right')}
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            )}

            {/* Scrollable container */}
            <div 
              ref={scrollContainerRefBest}
              className="overflow-hidden scroll-smooth px-0 w-full sm:w-[calc(3*360px+3rem)] mx-auto select-none"
              style={{ cursor: window.innerWidth < 640 && isDraggingBest ? 'grabbing' : window.innerWidth < 640 ? 'grab' : 'default' }}
              onScroll={checkScrollButtonsBest}
              onMouseDown={handleMouseDownBest}
              onMouseMove={handleMouseMoveBest}
              onMouseUp={handleMouseUpOrLeaveBest}
              onMouseLeave={handleMouseUpOrLeaveBest}
              onTouchStart={handleTouchStartBest}
              onTouchMove={handleTouchMoveBest}
              onTouchEnd={handleTouchEndBest}
            >
              <div 
                className="grid gap-4 sm:gap-6"
                style={{ 
                  gridAutoFlow: 'column',
                  gridAutoColumns: 'min(360px, 85vw)',
                  gridTemplateColumns: 'none'
                }}
              >
                {['youtube', 'monetized-tiktok-account', 'aged-youtube']
                  .map((handle) => data.find((product) => product.node.handle === handle))
                  .filter((product): product is ShopifyProduct => Boolean(product))
                  .map((product) => (
                    <ProductCard key={product.node.id} product={product} />
                  ))}

              </div>
            </div>
          </div>
        )}
      </section>

      {/* Affiliate Program Section - Simple & Unique */}
      <section id="affiliate" className="py-12 sm:py-20 relative overflow-hidden border-t border-border">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto">
            {/* Main Pitch */}
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-3 leading-tight">
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
                  <h3 className="text-xl font-bold mb-2">Earn $25-$125 per sale</h3>
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
                  <p className="text-muted-foreground">You promote, we deliver. Support and fulfillment all taken care of.</p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="text-center">
              <Button 
                asChild 
                size="lg" 
                className="text-xl px-12 py-8 shadow-lg hover:shadow-xl transition-all" 
                style={{ backgroundColor: '#FF2929' }}
              >
                <Link to="/affiliate">
                  Learn More About Our Program
                </Link>
              </Button>
              <p className="text-muted-foreground mt-6">
                Join 500+ creators earning with us
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Restock Email Capture - Moved to bottom */}
      <section className="py-12 sm:py-20 container mx-auto px-4">
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
