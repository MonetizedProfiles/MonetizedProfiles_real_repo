import { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";
import { PackageCheck } from "lucide-react";

interface StockIndicatorProps {
  productId: string;
  availableForSale: boolean;
  variant?: "default" | "compact";
}

export const StockIndicator = ({ 
  productId, 
  availableForSale,
  variant = "default" 
}: StockIndicatorProps) => {
  const [stockData, setStockData] = useState({ current: 0, max: 0, percentage: 0 });

  useEffect(() => {
    // Generate consistent stock levels based on product ID
    const hash = productId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const max = 50 + (hash % 100); // Stock between 50-150
    const current = availableForSale 
      ? Math.max(5, Math.floor(max * (0.15 + (hash % 40) / 100))) // 15-55% remaining
      : 0;
    const percentage = availableForSale ? (current / max) * 100 : 0;
    
    setStockData({ current, max, percentage });
  }, [productId, availableForSale]);

  if (!availableForSale) {
    return (
      <div className={`${variant === "compact" ? "py-2" : "p-4"} rounded-lg bg-destructive/10 border border-destructive/20`}>
        <div className="flex items-center gap-2">
          <PackageCheck className="w-4 h-4 text-destructive" />
          <span className={`font-medium text-destructive ${variant === "compact" ? "text-xs" : "text-sm"}`}>
            Out of Stock
          </span>
        </div>
      </div>
    );
  }

  const getStockColor = () => {
    if (stockData.percentage > 40) return "bg-primary";
    if (stockData.percentage > 20) return "text-orange-500";
    return "text-destructive";
  };

  const getStockMessage = () => {
    if (stockData.percentage > 40) return "In Stock";
    if (stockData.percentage > 20) return "Low Stock";
    return "Almost Gone";
  };

  return (
    <div className={`${variant === "compact" ? "py-2" : "p-4"} rounded-lg bg-secondary/30 border border-border/50`}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <PackageCheck className={`w-4 h-4 ${getStockColor()}`} />
          <span className={`font-medium ${getStockColor()} ${variant === "compact" ? "text-xs" : "text-sm"}`}>
            {getStockMessage()}
          </span>
        </div>
        <span className={`${variant === "compact" ? "text-xs" : "text-sm"} text-muted-foreground`}>
          {stockData.current} left
        </span>
      </div>
      <Progress 
        value={stockData.percentage} 
        className={`h-2 ${variant === "compact" ? "h-1.5" : "h-2"}`}
      />
    </div>
  );
};
