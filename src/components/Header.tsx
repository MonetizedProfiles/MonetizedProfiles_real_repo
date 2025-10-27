import { Link } from "react-router-dom";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { CartDrawer } from "@/components/CartDrawer";
import { useQuery } from "@tanstack/react-query";
import { STOREFRONT_QUERY, storefrontApiRequest, ShopifyProduct } from "@/lib/shopify";
import { ChevronDown } from "lucide-react";
import logo from "@/assets/logo.png";
import { useState } from "react";

export const Header = () => {
  const [productsOpen, setProductsOpen] = useState(false);
  const [supportOpen, setSupportOpen] = useState(false);
  const [productsTimeout, setProductsTimeout] = useState<NodeJS.Timeout | null>(null);
  const [supportTimeout, setSupportTimeout] = useState<NodeJS.Timeout | null>(null);
  
  const { data } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await storefrontApiRequest(STOREFRONT_QUERY, { first: 20 });
      return response.data.products.edges as ShopifyProduct[];
    },
  });

  const handleProductsEnter = () => {
    if (productsTimeout) clearTimeout(productsTimeout);
    setProductsOpen(true);
  };

  const handleProductsLeave = () => {
    const timeout = setTimeout(() => setProductsOpen(false), 150);
    setProductsTimeout(timeout);
  };

  const handleSupportEnter = () => {
    if (supportTimeout) clearTimeout(supportTimeout);
    setSupportOpen(true);
  };

  const handleSupportLeave = () => {
    const timeout = setTimeout(() => setSupportOpen(false), 150);
    setSupportTimeout(timeout);
  };

  return (
    <header className="border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex-shrink-0">
          <img src={logo} alt="MonetizedProfiles" className="h-8" />
        </Link>
        
        <nav className="hidden md:flex items-center gap-2">
          <Link to="/product/monetized-youtube-channel" className="inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50">
            Monetized YouTube Channels
          </Link>

          <Link to="/product/monetized-tiktok-account" className="inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50">
            Monetized TikTok Accounts
          </Link>

          <DropdownMenu open={productsOpen} onOpenChange={setProductsOpen}>
            <DropdownMenuTrigger 
              className="inline-flex h-9 w-max items-center justify-center gap-1 rounded-md px-4 py-2 text-sm font-medium hover:bg-accent focus:bg-accent focus:outline-none"
              onMouseEnter={handleProductsEnter}
              onMouseLeave={handleProductsLeave}
            >
              Other Products
              <ChevronDown className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              align="start" 
              className="z-50 min-w-[220px]"
              onMouseEnter={handleProductsEnter}
              onMouseLeave={handleProductsLeave}
            >
              {data?.filter(
                (product) =>
                  product.node.handle !== "monetized-youtube-channel" &&
                  product.node.handle !== "monetized-youtube-account" &&
                  product.node.handle !== "monetized-tiktok-account",
              ).map((product) => (
                <DropdownMenuItem key={product.node.id} asChild className="cursor-pointer py-3 px-4 text-base">
                  <Link to={`/product/${product.node.handle}`} className="w-full">
                    {product.node.title}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Link to="/affiliate" className="inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50">
            Affiliate Program
          </Link>

          <DropdownMenu open={supportOpen} onOpenChange={setSupportOpen}>
            <DropdownMenuTrigger 
              className="inline-flex h-9 w-max items-center justify-center gap-1 rounded-md px-4 py-2 text-sm font-medium hover:bg-accent focus:bg-accent focus:outline-none"
              onMouseEnter={handleSupportEnter}
              onMouseLeave={handleSupportLeave}
            >
              Support
              <ChevronDown className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              align="start" 
              className="z-50 min-w-[200px]"
              onMouseEnter={handleSupportEnter}
              onMouseLeave={handleSupportLeave}
            >
              <DropdownMenuItem asChild className="py-3 px-4 text-base">
                <a href="#contact" className="w-full">Contact Us</a>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="py-3 px-4 text-base">
                <Link to="/privacy-policy" className="w-full">Privacy Policy</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="py-3 px-4 text-base">
                <Link to="/terms-of-service" className="w-full">Terms of Service</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="py-3 px-4 text-base">
                <Link to="/refund-policy" className="w-full">Refund Policy</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
        
        <CartDrawer />
      </div>
    </header>
  );
};
