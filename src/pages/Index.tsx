import { useQuery } from "@tanstack/react-query";
import { STOREFRONT_QUERY, storefrontApiRequest, ShopifyProduct } from "@/lib/shopify";
import { ProductCard } from "@/components/ProductCard";
import { CartDrawer } from "@/components/CartDrawer";
import { ShoppingBag, TrendingUp, Shield, Zap, Clock, RefreshCw, HeadphonesIcon, Star, CheckCircle, Users, Lock, Mail, DollarSign, Percent, Video, Play, ChevronLeft, ChevronRight, ChevronDown, Sparkles, Wallet } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

const Index = () => {
  const [email, setEmail] = useState("");
  const [footerEmail, setFooterEmail] = useState("");
  const [accountsSold, setAccountsSold] = useState(27708 + Math.floor(Math.random() * 100));
  const [accountsSoldThisMonth, setAccountsSoldThisMonth] = useState(639 + Math.floor(Math.random() * 10));
  const [totalStock, setTotalStock] = useState<number | null>(null);
  const [ugcOpen, setUgcOpen] = useState(false);
  
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

  // Filter to show featured products (2 YouTube + 1 TikTok)
  const featuredProducts = data?.filter(p => 
    p.node.title.includes("Monetized YouTube") || p.node.title.includes("Monetized TikTok")
  ).slice(0, 3);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success("Thanks! We'll notify you when products are restocked.");
      setEmail("");
    }
  };

  const handleFooterEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (footerEmail) {
      toast.success("Success! You're now subscribed to our updates.");
      setFooterEmail("");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/">
            <img src={logo} alt="MonetizedProfiles" className="h-8" />
          </Link>
          
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Products</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                    {data?.map((product) => (
                      <li key={product.node.id}>
                        <NavigationMenuLink asChild>
                          <Link
                            to={`/product/${product.node.handle}`}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">{product.node.title}</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              {product.node.description}
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger>Affiliate Program</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-4 w-[400px]">
                    <li>
                      <NavigationMenuLink asChild>
                        <a href="#affiliate" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground">
                          <div className="text-sm font-medium leading-none">Become an Affiliate</div>
                          <p className="text-sm leading-snug text-muted-foreground">Earn 20% commission on every sale</p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger>Support</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-4 w-[300px]">
                    <li>
                      <NavigationMenuLink asChild>
                        <a href="#contact" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground">
                          <div className="text-sm font-medium leading-none">Contact Us</div>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <a href="#faq" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground">
                          <div className="text-sm font-medium leading-none">FAQ</div>
                        </a>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link to="/blog" className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                    Blog
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger>Policies</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-4 w-[300px]">
                    <li>
                      <NavigationMenuLink asChild>
                        <a href="#privacy" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground">
                          <div className="text-sm font-medium leading-none">Privacy Policy</div>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <a href="#terms" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground">
                          <div className="text-sm font-medium leading-none">Terms of Service</div>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <a href="#refund" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground">
                          <div className="text-sm font-medium leading-none">Refund Policy</div>
                        </a>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <CartDrawer />
        </div>
      </header>

      {/* Hero Section - Modern SaaS Minimal */}
      <section className="relative pt-24 pb-32 md:pt-32 md:pb-40 overflow-hidden bg-background">
        {/* Subtle background */}
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/5 via-background to-background" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center relative">
            {/* Floating Icons with Glow */}
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
            <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-secondary rounded-full text-sm font-medium">
                <div className="w-1.5 h-1.5 rounded-full bg-[#FF2929] animate-pulse" />
                <span>{accountsSold.toLocaleString()}+ accounts sold</span>
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-secondary rounded-full text-sm font-medium">
                <Star className="w-4 h-4 fill-[#FFD700] text-[#FFD700]" />
                <span>4.8 rating</span>
              </div>
            </div>

            {/* Big Animated Gradient Headline */}
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8 leading-tight">
              <span className="block mb-2">Monetized Accounts,</span>
              <span className="block bg-gradient-to-r from-[#FF2929] via-[#FF5C8D] to-[#C74DFF] bg-clip-text text-transparent animate-gradient-flow" style={{ backgroundSize: "200% auto" }}>
                Instant Revenue
              </span>
            </h1>

            {/* Simple subtitle */}
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto">
              Buy verified social media accounts and start earning immediately. 
              No waiting, no building from scratch.
            </p>

            {/* Clean CTA */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="px-10 py-6 text-lg font-semibold bg-[#FF2929] hover:bg-[#FF2929]/90 text-white"
              >
                Browse Accounts
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="px-10 py-6 text-lg font-semibold border-2"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section - 3 Products Display with Scroll */}
      <section className="py-16 container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold mb-2" style={{ color: '#FF2929' }}>Featured Accounts</h2>
          <p className="text-muted-foreground">Start earning today with our most popular monetized accounts</p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <Skeleton className="aspect-square w-full" />
            <Skeleton className="aspect-square w-full" />
            <Skeleton className="aspect-square w-full" />
          </div>
        ) : !featuredProducts || featuredProducts.length === 0 ? (
          <div className="text-center py-20">
            <ShoppingBag className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h4 className="text-2xl font-semibold mb-2">No Products Found</h4>
            <p className="text-muted-foreground">
              Products coming soon!
            </p>
          </div>
        ) : (
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.node.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Features Section - Standardized Symmetrical */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-4" style={{ color: '#FF2929' }}>Why Choose MonetizedProfiles?</h2>
            <p className="text-lg text-muted-foreground">We've perfected the process of transferring monetized accounts safely and securely</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
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
              <div className="bg-gradient-to-br from-secondary via-background to-secondary/50 rounded-3xl p-8 md:p-12 border-2 border-border shadow-2xl">
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

                {/* Bottom CTA */}
                <div className="mt-12 text-center">
                  <div className="inline-flex items-center gap-2 bg-primary/10 px-6 py-3 rounded-full border border-primary/30">
                    <Shield className="w-5 h-5 text-primary" />
                    <span className="font-semibold">Your purchase is 100% protected</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Urgency Section - Limited Stock */}
      <section className="py-12 bg-secondary/50 border-y border-border">
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
              <h2 className="text-4xl font-bold mb-4" style={{ color: '#FF2929' }}>Real Results From Real Creators</h2>
              <p className="text-xl text-muted-foreground">See how our accounts have transformed content careers</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {/* Stat 1 */}
              <div className="bg-card rounded-2xl p-8 border-2 border-primary/20 text-center hover:border-primary/50 transition-all hover:shadow-lg">
                <div className="text-5xl font-bold" style={{ color: '#FF2929' }}>$847K+</div>
                <p className="text-lg text-muted-foreground">Total Revenue Generated</p>
                <p className="text-sm text-muted-foreground/70 mt-2">By our customers in the last 12 months</p>
              </div>

              {/* Stat 2 */}
              <div className="bg-card rounded-2xl p-8 border-2 border-primary/20 text-center hover:border-primary/50 transition-all hover:shadow-lg">
                <div className="text-5xl font-bold" style={{ color: '#FF2929' }}>24 hrs</div>
                <p className="text-lg text-muted-foreground">Average Time to First Dollar</p>
                <p className="text-sm text-muted-foreground/70 mt-2">Most customers earn within the first day</p>
              </div>

              {/* Stat 3 */}
              <div className="bg-card rounded-2xl p-8 border-2 border-primary/20 text-center hover:border-primary/50 transition-all hover:shadow-lg">
                <div className="text-5xl font-bold" style={{ color: '#FF2929' }}>98.7%</div>
                <p className="text-lg text-muted-foreground">Customer Satisfaction</p>
                <p className="text-sm text-muted-foreground/70 mt-2">Would recommend to other creators</p>
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

      {/* Affiliate Program Section - Compact with Collapsible UGC */}
      <section id="affiliate" className="py-12 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-3" style={{ color: '#FF2929' }}>Join Our Affiliate Program</h2>
              <p className="text-lg text-muted-foreground">
                Earn 20% commission on every sale. Perfect for content creators and influencers.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <Card className="hover:shadow-lg transition-all border-2">
                <CardHeader className="pb-3">
                  <DollarSign className="w-8 h-8 text-primary mb-2" />
                  <CardTitle className="text-xl">20% Commission</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-1.5 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      <span>Earn up to $200+ per sale</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      <span>30-day cookie duration</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      <span>Monthly payouts</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-all border-2">
                <CardHeader className="pb-3">
                  <Zap className="w-8 h-8 text-primary mb-2" />
                  <CardTitle className="text-xl">Marketing Tools</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-1.5 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      <span>Affiliate dashboard</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      <span>Banners and creatives</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      <span>Real-time analytics</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <Collapsible open={ugcOpen} onOpenChange={setUgcOpen} className="mb-6">
              <CollapsibleTrigger asChild>
                <Button variant="outline" className="w-full border-2 hover:border-primary/50 transition-all">
                  <span className="flex-1 text-left font-semibold">View UGC Examples from Our Affiliates</span>
                  <ChevronDown className={`w-5 h-5 transition-transform ${ugcOpen ? 'rotate-180' : ''}`} />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-4">
                <div className="bg-card rounded-xl p-6 border-2 border-border">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="overflow-hidden rounded-lg hover:shadow-lg transition-all group cursor-pointer">
                        <div className="aspect-[9/16] bg-secondary/50 flex items-center justify-center relative">
                          <Video className="w-8 h-8 text-muted-foreground" />
                          <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <Play className="w-6 h-6 text-primary" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="text-center text-xs text-muted-foreground">
                    See how our affiliates promote MonetizedProfiles
                  </p>
                </div>
              </CollapsibleContent>
            </Collapsible>

            <div className="text-center">
              <Button size="lg" className="text-base px-8" style={{ backgroundColor: '#FF2929' }}>
                Apply Now - Start Earning Today
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Restock Email Capture - Moved to bottom */}
      <section className="py-16 container mx-auto px-4">
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

      {/* Footer */}
      <footer className="border-t py-12 mt-20 bg-background">
        <div className="container mx-auto px-4">
          {/* Email Capture Section */}
          <div className="mb-12 max-w-xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-2">Stay in the Loop</h3>
            <p className="text-muted-foreground mb-6">
              Get notified when new accounts are in stock and receive exclusive offers
            </p>
            <form onSubmit={handleFooterEmailSubmit} className="flex gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                value={footerEmail}
                onChange={(e) => setFooterEmail(e.target.value)}
                className="flex-1"
                required
              />
              <Button type="submit" style={{ backgroundColor: '#FF2929' }}>
                Subscribe
              </Button>
            </form>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <img src={logo} alt="MonetizedProfiles" className="h-8 mb-4" />
              <p className="text-sm text-muted-foreground">
                Premium monetized social media accounts for content creators.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Products</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {data?.map((product) => (
                  <li key={product.node.id}>
                    <Link to={`/product/${product.node.handle}`} className="hover:text-primary transition-colors">
                      {product.node.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">FAQ</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Refund Policy</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 MonetizedProfiles. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
