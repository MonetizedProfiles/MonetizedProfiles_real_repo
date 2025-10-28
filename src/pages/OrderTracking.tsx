import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
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
    <div className="min-h-screen bg-background flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <Card className="border-border shadow-lg">
          <CardContent className="pt-8 pb-8 px-8">
            <h1 className="text-2xl font-bold text-center mb-8">ORDER LOOKUP</h1>
            
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
                  className="h-11 bg-background"
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
                  className="h-11 bg-background"
                />
              </div>

              {/* Find Order Button */}
              <Button 
                type="submit" 
                className="w-full h-12 text-base font-semibold bg-[#FF0000] hover:bg-[#E60000] text-white mt-6"
                disabled={isLoading}
              >
                {isLoading ? "Finding Order..." : "Find Order"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OrderTracking;
