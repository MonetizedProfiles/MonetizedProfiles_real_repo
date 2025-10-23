import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { PRODUCT_BY_HANDLE_QUERY, storefrontApiRequest } from "@/lib/shopify";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";
import { ShoppingCart, Check } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";

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
  const image = product.images.edges[0]?.node.url;

  return (
    <div className="bg-background">
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

    </div>
  );
};

export default ProductDetail;
