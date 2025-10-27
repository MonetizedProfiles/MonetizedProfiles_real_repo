import { Link, useNavigate } from "react-router-dom";
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";
import { CartDrawer } from "@/components/CartDrawer";
import { useQuery } from "@tanstack/react-query";
import { STOREFRONT_QUERY, storefrontApiRequest, ShopifyProduct } from "@/lib/shopify";
import { ChevronDown, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import logo from "@/assets/logo.png";
import { useState } from "react";

export const Header = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  
  const { data } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await storefrontApiRequest(STOREFRONT_QUERY, { first: 20 });
      return response.data.products.edges as ShopifyProduct[];
    },
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleLogin = () => {
    window.open('https://tiktoktube-emporium-5hkqs.myshopify.com/account/login', '_blank');
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

          <Menubar className="bg-transparent border-0 p-0">
            <MenubarMenu>
              <MenubarTrigger className="inline-flex h-9 w-max items-center justify-center gap-1 rounded-md px-4 py-2 text-sm font-medium hover:bg-accent focus:bg-accent cursor-pointer">
                Other Products
                <ChevronDown className="h-4 w-4" />
              </MenubarTrigger>
              <MenubarContent align="start" className="min-w-[220px]">
                {data?.filter(
                  (product) =>
                    product.node.handle !== "monetized-youtube-channel" &&
                    product.node.handle !== "monetized-youtube-account" &&
                    product.node.handle !== "monetized-tiktok-account",
                ).map((product) => (
                  <MenubarItem key={product.node.id} asChild className="py-3 px-4 text-base cursor-pointer">
                    <Link to={`/product/${product.node.handle}`} className="w-full">
                      {product.node.title}
                    </Link>
                  </MenubarItem>
                ))}
              </MenubarContent>
            </MenubarMenu>

            <MenubarMenu>
              <MenubarTrigger className="inline-flex h-9 w-max items-center justify-center gap-1 rounded-md px-4 py-2 text-sm font-medium hover:bg-accent focus:bg-accent cursor-pointer">
                Support
                <ChevronDown className="h-4 w-4" />
              </MenubarTrigger>
              <MenubarContent align="start" className="min-w-[200px]">
                <MenubarItem asChild className="py-3 px-4 text-base">
                  <Link to="/contact" className="w-full">Contact Us</Link>
                </MenubarItem>
                <MenubarItem asChild className="py-3 px-4 text-base">
                  <Link to="/privacy-policy" className="w-full">Privacy Policy</Link>
                </MenubarItem>
                <MenubarItem asChild className="py-3 px-4 text-base">
                  <Link to="/terms-of-service" className="w-full">Terms of Service</Link>
                </MenubarItem>
                <MenubarItem asChild className="py-3 px-4 text-base">
                  <Link to="/refund-policy" className="w-full">Refund Policy</Link>
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>

          <Link to="/affiliate" className="inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50">
            Affiliate Program
          </Link>
        </nav>
        
        <div className="flex items-center gap-2">
          <form onSubmit={handleSearch} className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 w-[200px] lg:w-[250px]"
            />
          </form>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={handleLogin}
            title="Login"
          >
            <User className="h-5 w-5" />
          </Button>
          
          <CartDrawer />
        </div>
      </div>
    </header>
  );
};
