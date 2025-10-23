import { useQuery } from "@tanstack/react-query";
import { STOREFRONT_QUERY, storefrontApiRequest, ShopifyProduct } from "@/lib/shopify";
import { ProductCard } from "@/components/ProductCard";
import { CartDrawer } from "@/components/CartDrawer";
import { ShoppingBag, TrendingUp, Shield, Zap } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const Index = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await storefrontApiRequest(STOREFRONT_QUERY, { first: 20 });
      return response.data.products.edges as ShopifyProduct[];
    },
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-hero rounded-lg flex items-center justify-center">
              <ShoppingBag className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold">TikTok & YouTube Marketplace</h1>
          </div>
          <CartDrawer />
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-hero opacity-20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h2 className="text-4xl md:text-6xl font-bold leading-tight">
              Premium Monetized Social Media Accounts
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Buy verified, monetized YouTube and TikTok accounts with real audiences. 
              Fast, secure, and ready to generate revenue from day one.
            </p>
            <div className="flex flex-wrap gap-6 justify-center pt-8">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                <span className="text-sm">Verified Accounts</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-accent" />
                <span className="text-sm">Real Engagement</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-primary-glow" />
                <span className="text-sm">Instant Transfer</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16 container mx-auto px-4">
        <div className="mb-12">
          <h3 className="text-3xl font-bold mb-2">Available Accounts</h3>
          <p className="text-muted-foreground">Browse our collection of premium monetized accounts</p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="aspect-square w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        ) : !data || data.length === 0 ? (
          <div className="text-center py-20">
            <ShoppingBag className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h4 className="text-2xl font-semibold mb-2">No Products Found</h4>
            <p className="text-muted-foreground mb-4">
              There are no products available yet. Create your first product by describing it in the chat!
            </p>
            <p className="text-sm text-muted-foreground">
              Example: "Create a YouTube account product with 50K subscribers for $2,500"
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {data.map((product) => (
              <ProductCard key={product.node.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8 mt-20">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2024 TikTok & YouTube Marketplace. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
