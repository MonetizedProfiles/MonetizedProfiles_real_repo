import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Package } from "lucide-react";
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
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 md:pt-32 md:pb-24 overflow-hidden">
        {/* Subtle background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />
        
        <div className="container mx-auto px-4 relative">
          <div className="max-w-2xl mx-auto text-center mb-12">
            {/* Icon */}
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6 border-2 border-primary/20">
              <Package className="w-10 h-10 text-primary" />
            </div>
            
            {/* Title */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Track Your Order
            </h1>
            
            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-muted-foreground max-w-lg mx-auto">
              Enter your order details below to check the status of your purchase
            </p>
          </div>

          {/* Order Lookup Card */}
          <div className="max-w-md mx-auto">
            <Card className="border-2 shadow-xl">
              <CardContent className="pt-8 pb-8 px-6 sm:px-8">
                <h2 className="text-xl font-bold text-center mb-6 uppercase tracking-wide">
                  Order Lookup
                </h2>
                
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
                    className="w-full h-12 text-base font-semibold bg-[#FF0000] hover:bg-[#E60000] text-white mt-6 shadow-lg hover:shadow-xl transition-all"
                    disabled={isLoading}
                  >
                    {isLoading ? "Finding Order..." : "Find Order"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Help Text */}
            <div className="mt-8 text-center space-y-3">
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">Can't find your order number?</span><br />
                Check your email for "Order Confirmation" from MonetizedProfiles
              </p>
              <p className="text-sm text-muted-foreground">
                Need help? Contact us at{" "}
                <a href="mailto:support@monetizedprofiles.com" className="text-primary hover:underline font-medium">
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
