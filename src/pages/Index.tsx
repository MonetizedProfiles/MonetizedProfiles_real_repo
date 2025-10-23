import { useQuery } from "@tanstack/react-query";
import { STOREFRONT_QUERY, storefrontApiRequest, ShopifyProduct } from "@/lib/shopify";
import { ProductCard } from "@/components/ProductCard";
import { CartDrawer } from "@/components/CartDrawer";
import { ShoppingBag, TrendingUp, Shield, Zap, Clock, RefreshCw, HeadphonesIcon, Star, CheckCircle, Users, Lock, Mail } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";
import iphoneMockup from "@/assets/iphone-youtube-mockup.png";

const Index = () => {
  const [email, setEmail] = useState("");
  const { data, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await storefrontApiRequest(STOREFRONT_QUERY, { first: 20 });
      return response.data.products.edges as ShopifyProduct[];
    },
  });

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
          <img src={logo} alt="MonetizedProfiles" className="h-8" />
          <CartDrawer />
        </div>
      </header>

      {/* Hero Section with iPhone Mockup */}
      <section className="relative overflow-hidden py-20 md:py-32 bg-gradient-to-br from-secondary to-background">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight text-foreground">
                Premium Monetized Social Media Accounts
              </h1>
              <p className="text-xl text-muted-foreground">
                Buy verified, monetized YouTube and TikTok accounts with real audiences. 
                Fast, secure, and ready to generate revenue from day one.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <div className="flex items-center gap-2 bg-card px-4 py-2 rounded-lg border shadow-sm">
                  <Shield className="w-5 h-5 text-primary" />
                  <span className="text-sm font-medium">Verified Accounts</span>
                </div>
                <div className="flex items-center gap-2 bg-card px-4 py-2 rounded-lg border shadow-sm">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  <span className="text-sm font-medium">Real Engagement</span>
                </div>
                <div className="flex items-center gap-2 bg-card px-4 py-2 rounded-lg border shadow-sm">
                  <Zap className="w-5 h-5 text-primary" />
                  <span className="text-sm font-medium">Instant Transfer</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src={iphoneMockup} 
                alt="YouTube Dashboard on iPhone" 
                className="w-full max-w-md mx-auto drop-shadow-2xl"
              />
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

      {/* Features Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold mb-2">Why Choose MonetizedProfiles?</h2>
            <p className="text-muted-foreground">Everything you need to start earning immediately</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <Card className="text-center hover:shadow-glow transition-all">
              <CardHeader>
                <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
                <CardTitle>100% Verified</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>All accounts are fully verified and meet platform requirements for monetization</CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-glow transition-all">
              <CardHeader>
                <Users className="w-12 h-12 text-primary mx-auto mb-4" />
                <CardTitle>Real Audiences</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Genuine followers and subscribers with proven engagement metrics</CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-glow transition-all">
              <CardHeader>
                <Zap className="w-12 h-12 text-primary mx-auto mb-4" />
                <CardTitle>Instant Transfer</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Complete account ownership transferred within 24 hours of purchase</CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-glow transition-all">
              <CardHeader>
                <Lock className="w-12 h-12 text-primary mx-auto mb-4" />
                <CardTitle>Secure Process</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Protected transactions with escrow service and full documentation</CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold mb-2">What Our Customers Say</h2>
          <p className="text-muted-foreground">Join hundreds of satisfied content creators</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              <CardTitle className="text-lg">Amazing Service!</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                "Bought a YouTube channel and started earning within days. The transfer was smooth and the account had exactly what was promised."
              </CardDescription>
              <p className="text-sm font-medium mt-4">- Sarah M.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              <CardTitle className="text-lg">Highly Recommend</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                "The TikTok Shop account I purchased already had great engagement. Support team answered all my questions quickly."
              </CardDescription>
              <p className="text-sm font-medium mt-4">- James K.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              <CardTitle className="text-lg">Worth Every Penny</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                "Skip months of growing an audience. This was the perfect shortcut to start my content creator journey professionally."
              </CardDescription>
              <p className="text-sm font-medium mt-4">- Emma L.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Warranty & Guarantee Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-2">Our Guarantee to You</h2>
              <p className="text-muted-foreground">Shop with confidence</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="text-center">
                <CardHeader>
                  <RefreshCw className="w-10 h-10 text-primary mx-auto mb-4" />
                  <CardTitle>Replacement Warranty</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    If any issues occur with your account within 30 days, we'll replace it at no extra cost.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <CheckCircle className="w-10 h-10 text-primary mx-auto mb-4" />
                  <CardTitle>Money-Back Guarantee</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Not satisfied? Get a full refund within 7 days, no questions asked.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <HeadphonesIcon className="w-10 h-10 text-primary mx-auto mb-4" />
                  <CardTitle>1-Hour Support</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Our support team responds within 1 hour on weekdays. We're here to help!
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Restock Email Capture */}
      <section className="py-16 container mx-auto px-4">
        <Card className="max-w-2xl mx-auto text-center bg-gradient-to-br from-primary/5 to-background border-primary/20">
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
