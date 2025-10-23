import { useQuery } from "@tanstack/react-query";
import { STOREFRONT_QUERY, storefrontApiRequest, ShopifyProduct } from "@/lib/shopify";
import { ProductCard } from "@/components/ProductCard";
import { CartDrawer } from "@/components/CartDrawer";
import { ShoppingBag, TrendingUp, Shield, Zap, Clock, RefreshCw, HeadphonesIcon, Star, CheckCircle, Users, Lock, Mail, DollarSign, Percent, Video } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

const Index = () => {
  const [email, setEmail] = useState("");
  const [accountsSold, setAccountsSold] = useState(623 + Math.floor(Math.random() * 100));
  const [totalStock, setTotalStock] = useState<number | null>(null);
  
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

  // Increment accounts sold counter randomly every 3-10 seconds
  useEffect(() => {
    const incrementCounter = () => {
      setAccountsSold(prev => prev + 1);
      const nextInterval = (Math.random() * 7000) + 3000; // 3-10 seconds
      setTimeout(incrementCounter, nextInterval);
    };
    
    const initialDelay = (Math.random() * 7000) + 3000;
    const timeoutId = setTimeout(incrementCounter, initialDelay);
    
    return () => clearTimeout(timeoutId);
  }, []);

  // Filter to show only featured products
  const featuredProducts = data?.filter(p => 
    p.node.title.includes("Monetized YouTube") || p.node.title.includes("Monetized TikTok")
  ).slice(0, 2);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success("Thanks! We'll notify you when products are restocked.");
      setEmail("");
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

      {/* Hero Section - Simplified */}
      <section className="relative overflow-hidden py-24 md:py-32 bg-gradient-to-br from-background via-secondary/50 to-background">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium border border-primary/20 animate-fade-in">
              <Zap className="w-4 h-4" />
              Start Earning in 24 Hours
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold leading-tight text-foreground animate-fade-in" style={{ animationDelay: '0.1s' }}>
              Monetized Accounts
              <span className="block text-primary mt-2">Ready to Earn</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Buy verified YouTube and TikTok accounts with real audiences. Start generating revenue from day one.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <Button size="lg" className="text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all">
                <ShoppingBag className="w-5 h-5 mr-2" />
                Browse Accounts
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                Learn More
              </Button>
            </div>

            {/* Animated floating icons - New diagonal float animation */}
            <div className="relative h-40 mt-12">
              <div 
                className="absolute left-[15%] top-0" 
                style={{ 
                  animation: 'float-diagonal 6s ease-in-out infinite',
                  animationDelay: '0s'
                }}
              >
                <div className="w-20 h-20 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl flex items-center justify-center border border-primary/20 shadow-lg" style={{ animation: 'pulse-glow 3s ease-in-out infinite' }}>
                  <DollarSign className="w-10 h-10 text-primary" />
                </div>
              </div>
              <div 
                className="absolute right-[15%] top-0" 
                style={{ 
                  animation: 'float-diagonal 6s ease-in-out infinite',
                  animationDelay: '2s'
                }}
              >
                <div className="w-20 h-20 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl flex items-center justify-center border border-primary/20 shadow-lg" style={{ animation: 'pulse-glow 3s ease-in-out infinite', animationDelay: '1s' }}>
                  <TrendingUp className="w-10 h-10 text-primary" />
                </div>
              </div>
              <div 
                className="absolute left-[35%] top-12" 
                style={{ 
                  animation: 'float-diagonal 6s ease-in-out infinite',
                  animationDelay: '1s'
                }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl flex items-center justify-center border border-primary/20 shadow-lg" style={{ animation: 'pulse-glow 3s ease-in-out infinite', animationDelay: '0.5s' }}>
                  <Shield className="w-8 h-8 text-primary" />
                </div>
              </div>
              <div 
                className="absolute right-[35%] top-8" 
                style={{ 
                  animation: 'float-diagonal 6s ease-in-out infinite',
                  animationDelay: '1.5s'
                }}
              >
                <div className="w-14 h-14 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl flex items-center justify-center border border-primary/20 shadow-lg" style={{ animation: 'pulse-glow 3s ease-in-out infinite', animationDelay: '2s' }}>
                  <Zap className="w-7 h-7 text-primary" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold mb-2">Featured Accounts</h2>
          <p className="text-muted-foreground">Start earning today with our most popular monetized accounts</p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="aspect-square w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {featuredProducts.map((product) => (
              <ProductCard key={product.node.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Features Section - More Interactive */}
      <section className="py-20 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-4">Why Choose MonetizedProfiles?</h2>
            <p className="text-lg text-muted-foreground">We've perfected the process of transferring monetized accounts safely and securely</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl blur-xl group-hover:blur-2xl transition-all"></div>
              <Card className="relative bg-card/80 backdrop-blur-sm border-2 hover:border-primary/50 transition-all h-full">
                <CardHeader className="text-center pb-4">
                  <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all">
                    <Shield className="w-10 h-10 text-primary" />
                  </div>
                  <CardTitle className="text-xl">Verified & Secure</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground mb-4">Every account is fully verified with platform monetization enabled and ready to earn</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-left">
                      <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                      <span>YouTube Partner approved</span>
                    </div>
                    <div className="flex items-center gap-2 text-left">
                      <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                      <span>TikTok monetization active</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl blur-xl group-hover:blur-2xl transition-all"></div>
              <Card className="relative bg-card/80 backdrop-blur-sm border-2 hover:border-primary/50 transition-all h-full">
                <CardHeader className="text-center pb-4">
                  <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all">
                    <Users className="w-10 h-10 text-primary" />
                  </div>
                  <CardTitle className="text-xl">Real Audiences</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground mb-4">Genuine, engaged followers with proven interaction history and organic growth</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-left">
                      <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                      <span>5-15% engagement rate</span>
                    </div>
                    <div className="flex items-center gap-2 text-left">
                      <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                      <span>No bots or fake followers</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl blur-xl group-hover:blur-2xl transition-all"></div>
              <Card className="relative bg-card/80 backdrop-blur-sm border-2 hover:border-primary/50 transition-all h-full">
                <CardHeader className="text-center pb-4">
                  <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all">
                    <Zap className="w-10 h-10 text-primary" />
                  </div>
                  <CardTitle className="text-xl">Instant Transfer</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground mb-4">Complete ownership transferred within 24 hours, often much faster</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-left">
                      <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                      <span>Same-day access possible</span>
                    </div>
                    <div className="flex items-center gap-2 text-left">
                      <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                      <span>Full account credentials</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl blur-xl group-hover:blur-2xl transition-all"></div>
              <Card className="relative bg-card/80 backdrop-blur-sm border-2 hover:border-primary/50 transition-all h-full">
                <CardHeader className="text-center pb-4">
                  <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all">
                    <HeadphonesIcon className="w-10 h-10 text-primary" />
                  </div>
                  <CardTitle className="text-xl">Expert Support</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground mb-4">Dedicated support team ready to help with any questions or issues</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-left">
                      <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                      <span>1-hour response time</span>
                    </div>
                    <div className="flex items-center gap-2 text-left">
                      <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                      <span>Transfer guidance included</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section - Scrolling Carousel */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="text-4xl font-bold mb-4">What Our Customers Say</h2>
            <p className="text-lg text-muted-foreground">Join hundreds of satisfied content creators</p>
          </div>

          <div className="relative overflow-hidden">
            <div className="flex gap-6 animate-scroll-left pause-animation">
              {[...Array(2)].map((_, groupIdx) => (
                <div key={groupIdx} className="flex gap-6">
                  <div className="min-w-[350px] bg-card border-2 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all hover:border-primary/50">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-2xl font-bold text-primary border-2 border-primary/20">SM</div>
                      <div className="flex-1">
                        <div className="flex gap-1 mb-2">{[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-primary text-primary" />)}</div>
                        <h4 className="font-bold text-lg">Game Changer!</h4>
                        <p className="text-sm text-muted-foreground">Sarah M.</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground">"Bought a monetized YouTube channel and started earning from day one. The account was exactly as described!"</p>
                  </div>
                  <div className="min-w-[350px] bg-card border-2 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all hover:border-primary/50">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-2xl font-bold text-primary border-2 border-primary/20">JK</div>
                      <div className="flex-1">
                        <div className="flex gap-1 mb-2">{[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-primary text-primary" />)}</div>
                        <h4 className="font-bold text-lg">Excellent Service</h4>
                        <p className="text-sm text-muted-foreground">James K.</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground">"Transfer was smooth and support was incredibly helpful. My TikTok account has active followers!"</p>
                  </div>
                  <div className="min-w-[350px] bg-card border-2 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all hover:border-primary/50">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-2xl font-bold text-primary border-2 border-primary/20">EL</div>
                      <div className="flex-1">
                        <div className="flex gap-1 mb-2">{[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-primary text-primary" />)}</div>
                        <h4 className="font-bold text-lg">Worth Every Penny</h4>
                        <p className="text-sm text-muted-foreground">Emma L.</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground">"Skip months of growing an audience. Perfect shortcut to start my content creator journey!"</p>
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
                <span><strong>{accountsSold}</strong> accounts sold this month</span>
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

      {/* Restock Email Capture */}
      <section className="py-16 container mx-auto px-4">
        <Card className="max-w-2xl mx-auto text-center bg-gradient-to-br from-secondary to-background border-border">
          <CardHeader>
            <Mail className="w-12 h-12 text-primary mx-auto mb-4" />
            <CardTitle className="text-2xl">Get Notified on Restock</CardTitle>
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
              <Button type="submit" className="shrink-0">
                Notify Me
              </Button>
            </form>
          </CardContent>
        </Card>
      </section>

      {/* Affiliate Program Section */}
      <section id="affiliate" className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-block mb-4">
                <Percent className="w-16 h-16 text-primary mx-auto" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Join Our Affiliate Program</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Earn 20% commission on every sale you refer. Perfect for content creators, influencers, and marketers.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <Card className="hover:shadow-glow transition-all">
                <CardHeader>
                  <DollarSign className="w-10 h-10 text-primary mb-4" />
                  <CardTitle className="text-2xl">20% Recurring Commission</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base mb-4">
                    Earn generous commissions on every sale. Our premium products mean higher earnings for you.
                  </CardDescription>
                  <ul className="space-y-2 text-sm text-muted-foreground">
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
                      <span>Monthly payouts via PayPal or bank transfer</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="hover:shadow-glow transition-all">
                <CardHeader>
                  <Zap className="w-10 h-10 text-primary mb-4" />
                  <CardTitle className="text-2xl">Marketing Resources</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base mb-4">
                    Get access to professionally designed marketing materials to boost your conversions.
                  </CardDescription>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      <span>Custom affiliate dashboard</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      <span>Ready-to-use banners and creatives</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      <span>Real-time tracking and analytics</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div className="text-center mb-12">
              <h3 className="text-2xl font-bold mb-8">See Our Affiliates in Action</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Video Slot 1 */}
                <Card className="overflow-hidden hover:shadow-glow transition-all">
                  <CardContent className="p-0">
                    <div className="aspect-[9/16] bg-secondary/30 flex items-center justify-center relative group">
                      <Video className="w-16 h-16 text-muted-foreground" />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <p className="text-white text-sm px-4 text-center">Video slot for UGC ad #1</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Video Slot 2 */}
                <Card className="overflow-hidden hover:shadow-glow transition-all">
                  <CardContent className="p-0">
                    <div className="aspect-[9/16] bg-secondary/30 flex items-center justify-center relative group">
                      <Video className="w-16 h-16 text-muted-foreground" />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <p className="text-white text-sm px-4 text-center">Video slot for UGC ad #2</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Video Slot 3 */}
                <Card className="overflow-hidden hover:shadow-glow transition-all">
                  <CardContent className="p-0">
                    <div className="aspect-[9/16] bg-secondary/30 flex items-center justify-center relative group">
                      <Video className="w-16 h-16 text-muted-foreground" />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <p className="text-white text-sm px-4 text-center">Video slot for UGC ad #3</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="text-center">
              <Button size="lg" className="text-lg px-8">
                Apply Now - Start Earning Today
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 mt-20 bg-secondary/50">
        <div className="container mx-auto px-4">
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
