import { Link } from "react-router-dom";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { CartDrawer } from "@/components/CartDrawer";
import { useQuery } from "@tanstack/react-query";
import { STOREFRONT_QUERY, storefrontApiRequest, ShopifyProduct } from "@/lib/shopify";
import logo from "@/assets/logo.png";

export const Header = () => {
  const { data } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await storefrontApiRequest(STOREFRONT_QUERY, { first: 20 });
      return response.data.products.edges as ShopifyProduct[];
    },
  });

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

          <DropdownMenu>
            <DropdownMenuTrigger className="inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium hover:bg-accent focus:bg-accent focus:outline-none">
              Other Products
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="z-50">
              {data?.filter(
                (product) =>
                  product.node.handle !== "monetized-youtube-channel" &&
                  product.node.handle !== "monetized-youtube-account" &&
                  product.node.handle !== "monetized-tiktok-account",
              ).map((product) => (
                <DropdownMenuItem key={product.node.id} asChild className="cursor-pointer">
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

          <DropdownMenu>
            <DropdownMenuTrigger className="inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium hover:bg-accent focus:bg-accent focus:outline-none">
              Support
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="z-50">
              <DropdownMenuItem asChild>
                <a href="#contact" className="w-full">Contact Us</a>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/privacy-policy" className="w-full">Privacy Policy</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/terms-of-service" className="w-full">Terms of Service</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
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
