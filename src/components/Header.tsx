import { Link, useNavigate } from "react-router-dom";
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";
import { CartDrawer } from "@/components/CartDrawer";
import { useQuery } from "@tanstack/react-query";
import { STOREFRONT_QUERY, storefrontApiRequest, ShopifyProduct } from "@/lib/shopify";
import { ChevronDown, Search, User, Sparkles, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import logo from "@/assets/monetizedprofiles-logo.webp";
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
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
    window.open('https://1e3fcb-4e.myshopify.com/account/login', '_blank');
  };

  return (
    <header className="border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4 flex items-center justify-between gap-2">
        <Link to="/" className="flex-shrink-0 flex items-center">
          <img src={logo} alt="MonetizedProfiles" className="h-8 sm:h-10 object-contain" />
        </Link>
        
        <nav className="hidden lg:flex items-center gap-2">
          <Link to="/product/youtube" className="inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50">
            Monetized YouTube Accounts
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
                    product.node.handle !== "youtube" &&
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
              <MenubarContent align="start" className="min-w-[200px] bg-background z-50">
                <MenubarItem asChild className="py-3 px-4 text-base">
                  <Link to="/contact" className="w-full">Contact Us</Link>
                </MenubarItem>
                <MenubarItem asChild className="py-3 px-4 text-base">
                  <Link to="/order-tracking" className="w-full">Track Order</Link>
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>

          <Link to="/affiliate" className="relative inline-flex h-9 w-max items-center justify-center gap-1.5 rounded-md px-4 py-2 text-sm font-medium transition-all hover:bg-gradient-to-r hover:from-[#FF2929]/10 hover:via-[#FF5C8D]/10 hover:to-[#C74DFF]/10 bg-gradient-to-r from-[#FF2929]/5 via-[#FF5C8D]/5 to-[#C74DFF]/5 focus:outline-none disabled:pointer-events-none disabled:opacity-50">
            <Sparkles className="w-3 h-3 text-[#FF5C8D] absolute top-1 right-1 z-10 animate-pulse" />
            <span className="bg-gradient-to-r from-[#FF2929] via-[#FF5C8D] to-[#C74DFF] bg-clip-text text-transparent animate-gradient-flow" style={{ backgroundSize: "200% auto" }}>
              Affiliate Program
            </span>
          </Link>
        </nav>
        
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Search - Available on all devices */}
          <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                title="Search"
                className="h-9 w-9 sm:h-10 sm:w-10"
              >
                <Search className="h-4 sm:h-5 w-4 sm:w-5" />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-[95vw] sm:max-w-2xl max-h-[85vh] sm:max-h-[80vh] flex flex-col p-4 sm:p-6">
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
          
          {/* Desktop Login */}
          <Button
            variant="ghost"
            size="icon"
            onClick={handleLogin}
            title="Login"
            className="hidden lg:flex h-9 w-9 sm:h-10 sm:w-10"
          >
            <User className="h-4 sm:h-5 w-4 sm:w-5" />
          </Button>
          
          {/* Mobile Menu */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden h-9 w-9"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] overflow-y-auto flex flex-col" onOpenAutoFocus={(e) => e.preventDefault()}>
              <SheetHeader className="flex-shrink-0">
                <SheetTitle>
                  <img src={logo} alt="MonetizedProfiles" className="h-10" />
                </SheetTitle>
              </SheetHeader>
              
              <nav className="flex flex-col gap-4 pb-6 flex-1 overflow-y-auto">
                {/* Login Button */}
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2"
                  onClick={() => {
                    handleLogin();
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <User className="h-4 w-4" />
                  Login / Account
                </Button>
                
                <div className="border-t pt-4">
                  <Link 
                    to="/product/youtube" 
                    className="block text-base font-medium hover:text-primary transition-colors py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Monetized YouTube Accounts
                  </Link>

                  <Link 
                    to="/product/monetized-tiktok-account" 
                    className="block text-base font-medium hover:text-primary transition-colors py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Monetized TikTok Accounts
                  </Link>
                </div>

                <div className="border-t pt-4">
                  <p className="text-sm font-semibold text-muted-foreground mb-2">Other Products</p>
                  <div className="flex flex-col gap-2">
                    {data?.filter(
                      (product) =>
                        product.node.handle !== "youtube" &&
                        product.node.handle !== "monetized-tiktok-account",
                    ).map((product) => (
                      <Link
                        key={product.node.id}
                        to={`/product/${product.node.handle}`}
                        className="text-sm hover:text-primary transition-colors py-1.5"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {product.node.title}
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="border-t pt-4">
                  <p className="text-sm font-semibold text-muted-foreground mb-2">Support</p>
                  <div className="flex flex-col gap-2">
                    <Link 
                      to="/contact" 
                      className="text-sm hover:text-primary transition-colors py-1.5"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Contact Us
                    </Link>
                    <Link 
                      to="/order-tracking" 
                      className="text-sm hover:text-primary transition-colors py-1.5"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Track Order
                    </Link>
                  </div>
                </div>

                <Link 
                  to="/affiliate" 
                  className="relative inline-flex items-center justify-center gap-2 rounded-md px-4 py-3 text-base font-medium bg-gradient-to-r from-[#FF2929]/10 via-[#FF5C8D]/10 to-[#C74DFF]/10 border border-[#FF5C8D]/20 mt-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Sparkles className="w-4 h-4 text-[#FF5C8D]" />
                  <span className="bg-gradient-to-r from-[#FF2929] via-[#FF5C8D] to-[#C74DFF] bg-clip-text text-transparent">
                    Affiliate Program
                  </span>
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
          
          <CartDrawer />
        </div>
      </div>
    </header>
  );
};
