import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { STOREFRONT_QUERY, storefrontApiRequest, ShopifyProduct } from "@/lib/shopify";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import logo from "@/assets/monetizedprofiles-logo.webp";
import { subscribeToKlaviyo } from "@/lib/klaviyo";
import { useState } from "react";

export const Footer = () => {
  const [isSubscribing, setIsSubscribing] = useState(false);
  
  const { data } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await storefrontApiRequest(STOREFRONT_QUERY, { first: 20 });
      return response.data.products.edges as ShopifyProduct[];
    },
  });

  return (
    <footer className="bg-secondary/50 border-t mt-12 sm:mt-16 md:mt-20">
      <div className="container mx-auto px-4 py-8 sm:py-10 md:py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-6 sm:mb-8">
          <div>
            <Link to="/" className="inline-block mb-4">
              <img src={logo} alt="MonetizedProfiles" className="h-10" />
            </Link>
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
              <li><Link to="/blog" className="hover:text-primary transition-colors">Blog</Link></li>
              <li><Link to="/affiliate" className="hover:text-primary transition-colors">Affiliate Program</Link></li>
              <li>
                <a 
                  href="https://1e3fcb-4e.myshopify.com/account/login" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-primary transition-colors"
                >
                  Customer Login
                </a>
              </li>
              <li><Link to="/order-tracking" className="hover:text-primary transition-colors">Track Order</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms-of-service" className="hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link to="/refund-policy" className="hover:text-primary transition-colors">Refund Policy</Link></li>
            </ul>
          </div>
        </div>

        {/* Email Capture */}
        <div className="pt-6 sm:pt-8 border-t max-w-md mx-auto text-center">
          <p className="text-xs sm:text-sm text-muted-foreground mb-3 px-4">Get notified about restocking and exclusive offers</p>
          <form 
            onSubmit={async (e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const email = formData.get('email') as string;
              
              setIsSubscribing(true);
              try {
                await subscribeToKlaviyo(email, {
                  source: "footer_newsletter"
                });
                localStorage.setItem('klaviyo_email', email);
                toast.success("Thanks for subscribing! Check your email.");
                e.currentTarget.reset();
              } catch (error) {
                toast.error("Failed to subscribe. Please try again.");
              } finally {
                setIsSubscribing(false);
              }
            }}
            className="flex flex-col sm:flex-row gap-2 px-4"
          >
            <Input 
              type="email" 
              name="email"
              placeholder="Enter your email" 
              required 
              disabled={isSubscribing}
              className="flex-1 h-10 sm:h-9 text-sm"
            />
            <Button type="submit" size="sm" className="h-10 sm:h-9 touch-manipulation" disabled={isSubscribing}>
              {isSubscribing ? "Subscribing..." : "Subscribe"}
            </Button>
          </form>
        </div>
        
        <div className="pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} MonetizedProfiles. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
