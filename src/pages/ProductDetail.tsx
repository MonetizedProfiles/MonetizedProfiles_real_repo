import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { PRODUCT_BY_HANDLE_QUERY, storefrontApiRequest } from "@/lib/shopify";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";
import { ShoppingCart, Check, ShieldCheck, Truck, RefreshCw, ChevronLeft, Star, Users, Zap, HeadphonesIcon, Shield } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

const ProductDetail = () => {
  const { handle } = useParams();
  const navigate = useNavigate();
  const addItem = useCartStore(state => state.addItem);
  const [added, setAdded] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [mainImage, setMainImage] = useState(0);

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
      <div className="bg-background">
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
      <div className="bg-background flex items-center justify-center min-h-[400px]">
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
  const images = product.images.edges;

  return (
    <div className="bg-background">
      {/* Breadcrumb */}
      <div className="border-b">
        <div className="container mx-auto px-4 py-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Products
          </Button>
        </div>
      </div>

      {/* Product Hero Section */}
      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 max-w-7xl mx-auto">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-square rounded-lg overflow-hidden bg-secondary/20 border border-border/50 relative">
              {images.length > 0 ? (
                <img 
                  src={images[mainImage]?.node.url} 
                  alt={images[mainImage]?.node.altText || product.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <ShoppingCart className="w-16 h-16 text-muted-foreground" />
                </div>
              )}
              {currentVariant.availableForSale && (
                <Badge className="absolute top-4 left-4 bg-accent">In Stock</Badge>
              )}
            </div>

            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {images.map((image, idx) => (
                  <button
                    key={idx}
                    onClick={() => setMainImage(idx)}
                    className={`aspect-square rounded-md overflow-hidden border-2 transition-all ${
                      mainImage === idx ? 'border-primary' : 'border-border/50 hover:border-border'
                    }`}
                  >
                    <img 
                      src={image.node.url} 
                      alt={image.node.altText || `${product.title} ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl md:text-5xl font-bold mb-4">{product.title}</h1>
              
              <div className="flex items-center gap-2 mb-6">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                  ))}
                </div>
                <span className="text-muted-foreground">4.8 (500+ reviews)</span>
              </div>

              <p className="text-5xl font-bold text-primary mb-6">
                ${price.toFixed(2)}
              </p>

              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                {product.description}
              </p>
            </div>

            {product.options.length > 0 && product.options[0].values.length > 1 && (
              <div className="space-y-3">
                <label className="text-sm font-semibold">Select Option</label>
                <div className="flex flex-wrap gap-2">
                  {product.variants.edges.map((variant, idx) => (
                    <Button
                      key={variant.node.id}
                      variant={selectedVariant === idx ? "default" : "outline"}
                      onClick={() => setSelectedVariant(idx)}
                      className="min-w-[100px]"
                    >
                      {variant.node.title}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            <Button 
              size="lg" 
              className="w-full text-lg h-16"
              onClick={handleAddToCart}
              disabled={added || !currentVariant.availableForSale}
            >
              {added ? (
                <>
                  <Check className="w-5 h-5 mr-2" />
                  Added to Cart
                </>
              ) : !currentVariant.availableForSale ? (
                "Out of Stock"
              ) : (
                <>
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart - ${price.toFixed(2)}
                </>
              )}
            </Button>

            <div className="grid grid-cols-3 gap-3 pt-4">
              <div className="text-center p-3 rounded-lg bg-secondary/30">
                <ShieldCheck className="w-6 h-6 text-primary mx-auto mb-2" />
                <span className="text-xs font-medium">Secure</span>
              </div>
              <div className="text-center p-3 rounded-lg bg-secondary/30">
                <Truck className="w-6 h-6 text-primary mx-auto mb-2" />
                <span className="text-xs font-medium">Fast Delivery</span>
              </div>
              <div className="text-center p-3 rounded-lg bg-secondary/30">
                <RefreshCw className="w-6 h-6 text-primary mx-auto mb-2" />
                <span className="text-xs font-medium">Guaranteed</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose This Product */}
      <section className="py-16 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Why Choose This Product?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-card border-2 hover:border-primary/50 transition-all">
                <CardHeader className="text-center space-y-4 pb-3">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto">
                    <Shield className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-lg">Verified & Secure</CardTitle>
                </CardHeader>
                <CardContent className="text-center text-sm text-muted-foreground">
                  <p>Every product is fully verified and ready to use immediately</p>
                </CardContent>
              </Card>

              <Card className="bg-card border-2 hover:border-primary/50 transition-all">
                <CardHeader className="text-center space-y-4 pb-3">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto">
                    <Users className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-lg">Premium Quality</CardTitle>
                </CardHeader>
                <CardContent className="text-center text-sm text-muted-foreground">
                  <p>Authentic and genuine with proven quality standards</p>
                </CardContent>
              </Card>

              <Card className="bg-card border-2 hover:border-primary/50 transition-all">
                <CardHeader className="text-center space-y-4 pb-3">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto">
                    <Zap className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-lg">Instant Access</CardTitle>
                </CardHeader>
                <CardContent className="text-center text-sm text-muted-foreground">
                  <p>Get started immediately, no waiting required</p>
                </CardContent>
              </Card>

              <Card className="bg-card border-2 hover:border-primary/50 transition-all">
                <CardHeader className="text-center space-y-4 pb-3">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto">
                    <HeadphonesIcon className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-lg">Expert Support</CardTitle>
                </CardHeader>
                <CardContent className="text-center text-sm text-muted-foreground">
                  <p>24/7 dedicated support with fast response times</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Customers Say</h2>
              <p className="text-lg text-muted-foreground">Join hundreds of satisfied customers</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="bg-card border-2">
                <CardContent className="pt-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4">"Exactly as described! Got instant access and everything works perfectly. Great quality!"</p>
                  <p className="font-semibold">Sarah M.</p>
                </CardContent>
              </Card>

              <Card className="bg-card border-2">
                <CardContent className="pt-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4">"The transfer was smooth and support was incredibly helpful. Highly recommend!"</p>
                  <p className="font-semibold">James K.</p>
                </CardContent>
              </Card>

              <Card className="bg-card border-2">
                <CardContent className="pt-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4">"Worth every penny! Skip months of work and get started immediately."</p>
                  <p className="font-semibold">Emma L.</p>
                </CardContent>
              </Card>

              <Card className="bg-card border-2">
                <CardContent className="pt-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4">"Best investment I've made. Everything was exactly as promised!"</p>
                  <p className="font-semibold">Michael R.</p>
                </CardContent>
              </Card>

              <Card className="bg-card border-2">
                <CardContent className="pt-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4">"Seamless process from purchase to delivery. Couldn't be happier!"</p>
                  <p className="font-semibold">Lisa T.</p>
                </CardContent>
              </Card>

              <Card className="bg-card border-2">
                <CardContent className="pt-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4">"Great for anyone wanting to skip the grind. Authentic quality!"</p>
                  <p className="font-semibold">David P.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of satisfied customers. Add to cart now and get instant access.
            </p>
            <Button 
              size="lg" 
              className="text-lg h-16 px-12"
              onClick={handleAddToCart}
              disabled={added || !currentVariant.availableForSale}
            >
              {added ? (
                <>
                  <Check className="w-5 h-5 mr-2" />
                  Added to Cart
                </>
              ) : (
                <>
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart - ${price.toFixed(2)}
                </>
              )}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetail;
