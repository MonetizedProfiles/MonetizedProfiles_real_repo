import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Package, Search, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

const OrderTracking = () => {
  const [email, setEmail] = useState("");
  const [orderNumber, setOrderNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleFindOrder = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !orderNumber) {
      toast.error("Please enter both email and order number");
      return;
    }

    setIsLoading(true);

    // Redirect to Shopify's order status page
    const shopifyDomain = "1e3fcb-4e.myshopify.com";
    const trackingUrl = `https://${shopifyDomain}/tools/order-lookup?email=${encodeURIComponent(email)}&number=${encodeURIComponent(orderNumber)}`;
    
    // Open in new tab
    window.open(trackingUrl, '_blank');
    
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Order lookup opened in new tab");
    }, 500);
  };

  return (
    <div className="bg-background">
      {/* Hero Section - Matching Homepage Style */}
      <section className="relative pt-12 pb-20 md:pt-24 md:pb-32 lg:pt-32 lg:pb-40 overflow-hidden bg-background">
        {/* Subtle background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/5 via-background to-background" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl mx-auto text-center relative">
            {/* Floating Icons with Glow - Hidden on mobile */}
            <div className="absolute -left-20 top-16 hidden lg:block animate-float" style={{ animationDelay: '0s' }}>
              <Package className="w-12 h-12 text-[#FF2929]" style={{ filter: 'drop-shadow(0 0 20px rgba(255, 41, 41, 0.6))' }} />
            </div>
            <div className="absolute -right-20 top-24 hidden lg:block animate-float" style={{ animationDelay: '1s' }}>
              <Search className="w-12 h-12 text-[#C74DFF]" style={{ filter: 'drop-shadow(0 0 20px rgba(199, 77, 255, 0.6))' }} />
            </div>
            <div className="absolute -left-16 bottom-28 hidden lg:block animate-float" style={{ animationDelay: '0.5s' }}>
              <CheckCircle2 className="w-10 h-10 text-[#FF5C8D]" style={{ filter: 'drop-shadow(0 0 20px rgba(255, 92, 141, 0.6))' }} />
            </div>
            
            {/* Title */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 sm:mb-8 leading-tight px-2">
              <span className="block mb-0 sm:mb-1">Track Your</span>
              <span className="block bg-gradient-to-r from-[#FF2929] via-[#FF5C8D] to-[#C74DFF] bg-clip-text text-transparent animate-gradient-flow" style={{ backgroundSize: "200% auto" }}>
                Order
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-8 sm:mb-12 max-w-xl mx-auto px-4">
              Enter your order details below to check the status of your purchase
            </p>

            {/* Order Lookup Card */}
            <Card className="border-2 shadow-xl max-w-md mx-auto">
              <CardContent className="pt-8 pb-8 px-6 sm:px-8">
                <div className="flex items-center justify-center gap-2 mb-6">
                  <Package className="w-5 h-5 text-primary" />
                  <h2 className="text-lg font-bold uppercase tracking-wide">
                    Order Lookup
                  </h2>
                </div>
                
                <form onSubmit={handleFindOrder} className="space-y-5">
                  {/* Email Field */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="email@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="h-11"
                    />
                  </div>

                  {/* Order Number Field */}
                  <div className="space-y-2">
                    <Label htmlFor="orderNumber" className="text-sm font-medium">
                      Order number
                    </Label>
                    <Input
                      id="orderNumber"
                      type="text"
                      placeholder="1006"
                      value={orderNumber}
                      onChange={(e) => setOrderNumber(e.target.value)}
                      required
                      className="h-11"
                    />
                  </div>

                  {/* Find Order Button */}
                  <Button 
                    type="submit" 
                    className="w-full h-12 text-base font-semibold bg-[#FF2929] hover:bg-[#FF2929]/90 text-white shadow-lg hover:shadow-xl transition-all"
                    disabled={isLoading}
                  >
                    {isLoading ? "Finding Order..." : "Find Order"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Help Text */}
            <div className="mt-8 space-y-3 px-4">
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">Can't find your order number?</span><br />
                Check your email for "Order Confirmation" from MonetizedProfiles
              </p>
              <p className="text-sm text-muted-foreground">
                Need help? Contact us at{" "}
                <a href="mailto:support@monetizedprofiles.com" className="text-[#FF2929] hover:underline font-medium">
                  support@monetizedprofiles.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OrderTracking;
