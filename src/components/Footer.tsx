import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { STOREFRONT_QUERY, storefrontApiRequest, ShopifyProduct } from "@/lib/shopify";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import logo from "@/assets/logo.png";

export const Footer = () => {
  const { data } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await storefrontApiRequest(STOREFRONT_QUERY, { first: 20 });
      return response.data.products.edges as ShopifyProduct[];
    },
  });

  return (
    <footer className="bg-secondary/50 border-t mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <Link to="/" className="inline-block mb-4">
              <img src={logo} alt="MonetizedProfiles" className="h-8" />
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
              <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
              <li><Link to="/affiliate" className="hover:text-primary transition-colors">Affiliate Program</Link></li>
              <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
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
        <div className="pt-8 border-t max-w-md mx-auto text-center">
          <p className="text-sm text-muted-foreground mb-3">Get notified about restocking and exclusive offers</p>
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const email = formData.get('email');
              toast.success("Thanks for subscribing!");
              e.currentTarget.reset();
            }}
            className="flex gap-2"
          >
            <Input 
              type="email" 
              name="email"
              placeholder="Enter your email" 
              required 
              className="flex-1"
            />
            <Button type="submit" size="sm">Subscribe</Button>
          </form>
        </div>
        
        <div className="pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2024 MonetizedProfiles. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
