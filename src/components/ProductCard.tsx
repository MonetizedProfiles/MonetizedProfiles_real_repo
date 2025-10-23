import { ShopifyProduct } from "@/lib/shopify";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Check, Star } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface ProductCardProps {
  product: ShopifyProduct;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const navigate = useNavigate();
  const addItem = useCartStore(state => state.addItem);
  const [added, setAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    const variant = product.node.variants.edges[0].node;
    
    const cartItem = {
      product,
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

  const price = parseFloat(product.node.priceRange.minVariantPrice.amount);
  const currency = product.node.priceRange.minVariantPrice.currencyCode;
  const image = product.node.images.edges[0]?.node.url;

  return (
    <Card 
      className="group cursor-pointer overflow-hidden hover:border-primary transition-all duration-300 hover:shadow-glow bg-card"
      onClick={() => navigate(`/product/${product.node.handle}`)}
    >
      <div className="aspect-square overflow-hidden bg-secondary relative">
        {image ? (
          <img 
            src={image} 
            alt={product.node.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <ShoppingCart className="w-12 h-12 text-muted-foreground" />
          </div>
        )}
        
        {/* Review Badge */}
        <Badge className="absolute top-3 right-3 bg-background/95 text-foreground border shadow-sm">
          <Star className="w-3 h-3 fill-primary text-primary mr-1" />
          <span className="font-semibold">4.9</span>
        </Badge>
      </div>
      
      <CardHeader>
        <CardTitle className="line-clamp-1">{product.node.title}</CardTitle>
        <CardDescription className="line-clamp-2">{product.node.description}</CardDescription>
      </CardHeader>
      
      <CardContent>
        <p className="text-2xl font-bold text-primary">
          ${price.toFixed(2)} {currency}
        </p>
      </CardContent>
      
      <CardFooter>
        <Button 
          className="w-full group/btn"
          onClick={handleAddToCart}
          disabled={added}
        >
          {added ? (
            <>
              <Check className="w-4 h-4 mr-2" />
              Added to Cart
            </>
          ) : (
            <>
              <ShoppingCart className="w-4 h-4 mr-2 group-hover/btn:scale-110 transition-transform" />
              Add to Cart
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};
