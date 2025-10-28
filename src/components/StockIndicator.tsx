import { Progress } from "@/components/ui/progress";
import { PackageCheck } from "lucide-react";

interface StockIndicatorProps {
  quantityAvailable: number | null;
  availableForSale: boolean;
  variant?: "default" | "compact";
}

export const StockIndicator = ({ 
  quantityAvailable, 
  availableForSale,
  variant = "default" 
}: StockIndicatorProps) => {
  // Use real Shopify inventory data
  const current = quantityAvailable ?? 0;
  
  // Calculate percentage based on a realistic max stock assumption
  // For display purposes, assume max stock is 150 or 3x current stock (whichever is higher)
  const estimatedMax = Math.max(150, current * 3);
  const percentage = availableForSale && current > 0 ? (current / estimatedMax) * 100 : 0;

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
    if (current >= 7) return "text-yellow-500";
    if (current >= 4) return "text-orange-500";
    return "text-destructive";
  };

  const getProgressBarColor = () => {
    if (current >= 7) return "[&>div]:bg-yellow-500";
    if (current >= 4) return "[&>div]:bg-orange-500";
    return "[&>div]:bg-destructive";
  };

  const getStockMessage = () => {
    if (current >= 7) return "Stock Amount: Medium";
    if (current >= 4) return "Stock Amount: Low";
    return "Stock Amount: Extremely Low";
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
          {current} left
        </span>
      </div>
      <Progress 
        value={percentage} 
        className={`h-2 ${variant === "compact" ? "h-1.5" : "h-2"} ${getProgressBarColor()}`}
      />
    </div>
  );
};
