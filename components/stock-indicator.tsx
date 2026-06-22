'use client';

import { useEffect, useState } from 'react';
import { AlertCircle } from 'lucide-react';

const STOCK_RANGES: Record<string, { min: number; max: number }> = {
  youtube: { min: 3, max: 7 },
  'aged-youtube': { min: 2, max: 5 },
  'monetized-tiktok-account': { min: 4, max: 9 },
  'tiktok-shop-affiliate-account': { min: 3, max: 6 },
  'uk-tiktok-shop-affiliate-account': { min: 2, max: 4 },
  'aged-instagram-account': { min: 3, max: 8 },
};

function getStockForHandle(handle: string): number | null {
  const range = STOCK_RANGES[handle];
  if (!range) return null;
  const seed = new Date().toISOString().slice(0, 13);
  let hash = 0;
  for (const ch of seed + handle) hash = ((hash << 5) - hash + ch.charCodeAt(0)) | 0;
  return range.min + (Math.abs(hash) % (range.max - range.min + 1));
}

export function StockIndicator({ handle }: { handle: string }) {
  const [stock, setStock] = useState<number | null>(null);

  useEffect(() => {
    setStock(getStockForHandle(handle));
  }, [handle]);

  if (stock === null) return null;

  const isLow = stock <= 4;

  return (
    <div className={`flex items-center gap-2 text-sm font-medium ${isLow ? 'text-orange-600' : 'text-green-600'}`}>
      <span className="relative flex h-2.5 w-2.5">
        {isLow && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" />}
        <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${isLow ? 'bg-orange-500' : 'bg-green-500'}`} />
      </span>
      {isLow ? (
        <span className="flex items-center gap-1">
          <AlertCircle className="h-3.5 w-3.5" />
          Only {stock} left in stock
        </span>
      ) : (
        <span>{stock} in stock — ready to ship</span>
      )}
    </div>
  );
}
