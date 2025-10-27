import { Link, useNavigate } from "react-router-dom";
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";
import { CartDrawer } from "@/components/CartDrawer";
import { useQuery } from "@tanstack/react-query";
import { STOREFRONT_QUERY, storefrontApiRequest, ShopifyProduct } from "@/lib/shopify";
import { ChevronDown, Search, User, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import logo from "@/assets/logo.png";
import { useState } from "react";


const availablePages = [
  { title: 'Home', path: '/', keywords: ['home', 'index', 'main'] },
  { title: 'Blog', path: '/blog', keywords: ['blog', 'articles', 'posts'] },
  { title: 'Affiliate Program', path: '/affiliate', keywords: ['affiliate', 'partner', 'referral'] },
  { title: 'Contact Us', path: '/contact', keywords: ['contact', 'support', 'help'] },
  { title: 'Privacy Policy', path: '/privacy-policy', keywords: ['privacy', 'policy', 'data'] },
  { title: 'Terms of Service', path: '/terms-of-service', keywords: ['terms', 'service', 'conditions'] },
  { title: 'Refund Policy', path: '/refund-policy', keywords: ['refund', 'return', 'policy'] },
];

export const Header = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  const { data } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await storefrontApiRequest(STOREFRONT_QUERY, { first: 20 });
      return response.data.products.edges as ShopifyProduct[];
    },
  });

  const filteredProducts = data?.filter(product => 
    searchQuery.trim() && (
      product.node.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.node.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
  ) || [];

  const filteredPages = availablePages.filter(page =>
    searchQuery.trim() && (
      page.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      page.keywords.some(keyword => keyword.toLowerCase().includes(searchQuery.toLowerCase()))
    )
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  const handleResultClick = (path: string) => {
    navigate(path);
    setIsSearchOpen(false);
    setSearchQuery("");
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

          <Link to="/affiliate" className="inline-flex h-9 w-max items-center justify-center gap-1.5 rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent focus:bg-accent focus:outline-none disabled:pointer-events-none disabled:opacity-50">
            <span className="bg-gradient-to-r from-[#FF2929] via-[#FF5C8D] to-[#C74DFF] bg-clip-text text-transparent animate-gradient-flow" style={{ backgroundSize: "200% auto" }}>
              Affiliate Program
            </span>
            <Sparkles className="w-3 h-3 text-[#FF5C8D] animate-pulse" />
          </Link>
        </nav>
        
        <div className="flex items-center gap-2">
          <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                title="Search"
              >
                <Search className="h-5 w-5" />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[80vh] flex flex-col">
              <DialogHeader>
                <DialogTitle>Search</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSearch} className="mt-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search products and pages..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                    autoFocus
                  />
                </div>
              </form>
              
              {searchQuery.trim() && (
                <div className="mt-4 overflow-y-auto flex-1">
                  {filteredPages.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-sm font-semibold text-muted-foreground mb-2">Pages</h3>
                      <div className="space-y-1">
                        {filteredPages.map((page) => (
                          <button
                            key={page.path}
                            onClick={() => handleResultClick(page.path)}
                            className="w-full text-left px-3 py-2 rounded-md hover:bg-accent transition-colors"
                          >
                            <div className="font-medium">{page.title}</div>
                            <div className="text-sm text-muted-foreground">{page.path}</div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {filteredProducts.length > 0 && (
                    <div>
                      <h3 className="text-sm font-semibold text-muted-foreground mb-2">Products</h3>
                      <div className="space-y-1">
                        {filteredProducts.map((product) => (
                          <button
                            key={product.node.id}
                            onClick={() => handleResultClick(`/product/${product.node.handle}`)}
                            className="w-full text-left px-3 py-2 rounded-md hover:bg-accent transition-colors flex gap-3"
                          >
                            {product.node.images.edges[0] && (
                              <img
                                src={product.node.images.edges[0].node.url}
                                alt={product.node.title}
                                className="w-12 h-12 object-cover rounded"
                              />
                            )}
                            <div className="flex-1">
                              <div className="font-medium">{product.node.title}</div>
                              <div className="text-sm text-muted-foreground">
                                {product.node.priceRange.minVariantPrice.currencyCode} {parseFloat(product.node.priceRange.minVariantPrice.amount).toFixed(2)}
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {filteredPages.length === 0 && filteredProducts.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      No results found for "{searchQuery}"
                    </div>
                  )}
                </div>
              )}
            </DialogContent>
          </Dialog>
          
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
