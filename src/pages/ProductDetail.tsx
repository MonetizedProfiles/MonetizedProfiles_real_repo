import { useParams, useNavigate, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { PRODUCT_BY_HANDLE_QUERY, storefrontApiRequest } from "@/lib/shopify";
import { Button } from "@/components/ui/button";
import { CartDrawer } from "@/components/CartDrawer";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";
import { ArrowLeft, ShoppingCart, Check } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import logo from "@/assets/logo.png";

const ProductDetail = () => {
  const { handle } = useParams();
  const navigate = useNavigate();
  const addItem = useCartStore(state => state.addItem);
  const [added, setAdded] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState(0);

  const { data: product, isLoading } = useQuery({
    queryKey: ['product', handle],
    queryFn: async () => {
      const response = await storefrontApiRequest(PRODUCT_BY_HANDLE_QUERY, { handle });
      return response.data.productByHandle;
    },
    enabled: !!handle,
  });

  const handleAddToCart = () => {
    if (!product) return;
    
    const variant = product.variants.edges[selectedVariant].node;
    
    const cartItem = {
      product: { node: product },
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || []
    };
    
    addItem(cartItem);
    setAdded(true);
    toast.success("Added to cart", {
      position: "top-center",
    });
    
    setTimeout(() => setAdded(false), 2000);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b bg-background/95 backdrop-blur-sm sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <Button variant="ghost" onClick={() => navigate(-1)}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <CartDrawer />
          </div>
        </header>
        
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-2 gap-12">
            <Skeleton className="aspect-square w-full" />
            <div className="space-y-6">
              <Skeleton className="h-12 w-3/4" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-10 w-1/3" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Product not found</h2>
          <Button onClick={() => navigate('/')}>Return to Home</Button>
        </div>
      </div>
    );
  }

  const currentVariant = product.variants.edges[selectedVariant].node;
  const price = parseFloat(currentVariant.price.amount);
  const currency = currentVariant.price.currencyCode;
  const image = product.images.edges[0]?.node.url;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Button variant="ghost" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div className="flex items-center gap-4">
            <img src={logo} alt="MonetizedProfiles" className="h-6" />
            <CartDrawer />
          </div>
        </div>
      </header>

      {/* Product Details */}
      <main className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-12 max-w-7xl mx-auto">
          {/* Image */}
          <div className="aspect-square rounded-lg overflow-hidden bg-secondary border">
            {image ? (
              <img 
                src={image} 
                alt={product.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <ShoppingCart className="w-16 h-16 text-muted-foreground" />
              </div>
            )}
          </div>

          {/* Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold mb-4">{product.title}</h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            </div>

            <div className="space-y-4">
              <p className="text-4xl font-bold text-primary">
                ${price.toFixed(2)} {currency}
              </p>

              {product.options.length > 0 && product.options[0].values.length > 1 && (
                <div className="space-y-2">
                  <label className="text-sm font-medium">Select Option</label>
                  <div className="flex flex-wrap gap-2">
                    {product.variants.edges.map((variant, idx) => (
                      <Button
                        key={variant.node.id}
                        variant={selectedVariant === idx ? "default" : "outline"}
                        onClick={() => setSelectedVariant(idx)}
                      >
                        {variant.node.title}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              <Button 
                size="lg" 
                className="w-full md:w-auto px-12"
                onClick={handleAddToCart}
                disabled={added}
              >
                {added ? (
                  <>
                    <Check className="w-5 h-5 mr-2" />
                    Added to Cart
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Add to Cart
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-secondary/50 border-t mt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div className="md:col-span-2">
              <img src={logo} alt="MonetizedProfiles" className="h-8 mb-4" />
              <p className="text-muted-foreground text-sm max-w-md">
                Premium digital products for social media professionals. Turn your followers into customers.
              </p>
            </div>

            {/* Links */}
            <div className="space-y-2">
              <h3 className="font-semibold mb-3">Quick Links</h3>
              <div className="flex flex-col space-y-2 text-sm">
                <Link to="/" className="hover:text-primary transition-colors">Shop</Link>
                <a href="#" className="hover:text-primary transition-colors">About</a>
                <a href="#" className="hover:text-primary transition-colors">Contact</a>
              </div>
            </div>

            {/* Legal */}
            <div className="space-y-2">
              <h3 className="font-semibold mb-3">Legal</h3>
              <div className="flex flex-col space-y-2 text-sm">
                <a href="#" className="hover:text-primary transition-colors">Terms</a>
                <a href="#" className="hover:text-primary transition-colors">Privacy</a>
              </div>
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

          {/* Copyright */}
          <div className="text-center text-sm text-muted-foreground pt-8">
            <p>&copy; 2024 MonetizedProfiles. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ProductDetail;
