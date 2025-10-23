import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Link } from "react-router-dom";

export const Footer = () => {
  const [email, setEmail] = useState("");

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success("Thanks! We'll notify you about restocks and exclusive offers.");
      setEmail("");
    }
  };

  return (
    <footer className="bg-secondary/50 border-t mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-semibold mb-4">Products</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/">YouTube Accounts</Link></li>
              <li><Link to="/">TikTok Accounts</Link></li>
              <li><Link to="/">All Products</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/blog">Blog</Link></li>
              <li><a href="#affiliate">Affiliate Program</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#faq">FAQ</a></li>
              <li><a href="#contact">Help Center</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#privacy">Privacy Policy</a></li>
              <li><a href="#terms">Terms of Service</a></li>
              <li><a href="#refund">Refund Policy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t pt-8">
          <form onSubmit={handleEmailSubmit} className="max-w-md mx-auto mb-6">
            <p className="text-sm text-muted-foreground mb-3 text-center">
              Get notified about restocks and exclusive offers
            </p>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1"
              />
              <Button type="submit" variant="secondary">
                Subscribe
              </Button>
            </div>
          </form>
          
          <p className="text-center text-sm text-muted-foreground">
            © 2025 MonetizedProfiles. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
