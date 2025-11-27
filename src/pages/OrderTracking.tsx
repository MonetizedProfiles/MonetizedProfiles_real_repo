import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Package, Search, Mail, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { SEO } from "@/components/SEO";

const OrderTracking = () => {
  const [orderNumber, setOrderNumber] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleTrackOrder = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!orderNumber || !email) {
      toast.error("Please enter both order number and email");
      return;
    }

    setIsLoading(true);

    // Redirect to Shopify's order status page
    // Format: https://store.myshopify.com/tools/order-lookup?email={email}&number={order_number}
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
    <>
      <SEO 
        title="Track Your Order - Order Status"
        description="Track your monetized account order status. Enter your order number and email to view delivery updates and account transfer information."
        keywords="order tracking, order status, track package, delivery status"
        canonical="https://monetizedprofiles.com/order-tracking"
      />
      <div className="min-h-screen bg-background py-12 px-4">
      <div className="container mx-auto max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <Package className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">Track Your Order</h1>
          <p className="text-muted-foreground text-lg">
            Enter your order details to view the status of your purchase
          </p>
        </div>

        {/* Tracking Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="w-5 h-5" />
              Order Information
            </CardTitle>
            <CardDescription>
              Enter your order number and email address used at checkout
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleTrackOrder} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="orderNumber" className="flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4" />
                  Order Number
                </Label>
                <Input
                  id="orderNumber"
                  type="text"
                  placeholder="#1234"
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value)}
                  required
                  className="h-11"
                />
                <p className="text-xs text-muted-foreground">
                  Found in your order confirmation email
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-11"
                />
                <p className="text-xs text-muted-foreground">
                  The email used when placing your order
                </p>
              </div>

              <Button 
                type="submit" 
                className="w-full h-12 text-base"
                disabled={isLoading}
              >
                {isLoading ? (
                  "Opening Order Tracker..."
                ) : (
                  <>
                    <Search className="w-4 h-4 mr-2" />
                    Track Order
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Help Section */}
        <Card className="mt-6 border-muted">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <h3 className="font-semibold flex items-center gap-2">
                <Package className="w-4 h-4" />
                Need Help?
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>
                  <span className="font-medium text-foreground">Can't find your order number?</span><br />
                  Check your email inbox for "Order Confirmation" from MonetizedProfiles
                </p>
                <p>
                  <span className="font-medium text-foreground">Haven't received your order confirmation?</span><br />
                  <a href="/contact" className="text-primary hover:underline">
                    Contact our support team
                  </a>
                </p>
                <p>
                  <span className="font-medium text-foreground">Delivery time:</span><br />
                  Most accounts are delivered within 48-72 hours of purchase
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
    </>
  );
};

export default OrderTracking;
