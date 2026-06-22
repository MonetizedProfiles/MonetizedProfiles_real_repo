'use client';

import { useState, useEffect } from 'react';
import { CheckCircle, X } from 'lucide-react';

const RECENT_PURCHASES = [
  { name: 'Ibrahim V.', product: 'Monetized TikTok Account', time: '2 minutes ago' },
  { name: 'Sofia V.', product: 'Monetized YouTube Channel', time: '5 minutes ago' },
  { name: 'Cole C.', product: 'TikTok Shop Affiliate (UK)', time: '8 minutes ago' },
  { name: 'Mei W.', product: 'Monetized YouTube Channel', time: '12 minutes ago' },
  { name: 'Mason M.', product: 'TikTok Shop Affiliate (US)', time: '15 minutes ago' },
  { name: 'Ava A.', product: 'Monetized TikTok Account', time: '18 minutes ago' },
  { name: 'Ryan R.', product: 'Monetized YouTube Channel', time: '22 minutes ago' },
  { name: 'Kiran J.', product: 'TikTok Shop Affiliate (US)', time: '25 minutes ago' },
  { name: 'Drew D.', product: 'Monetized TikTok Account', time: '30 minutes ago' },
  { name: 'Liam L.', product: 'Monetized TikTok Account', time: '35 minutes ago' },
];

export function SocialProofPopup() {
  const [current, setCurrent] = useState<number | null>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return;

    const initialDelay = setTimeout(() => {
      setCurrent(0);
    }, 15000);

    return () => clearTimeout(initialDelay);
  }, [dismissed]);

  useEffect(() => {
    if (current === null || dismissed) return;

    const hideTimer = setTimeout(() => {
      setCurrent(null);

      const nextTimer = setTimeout(() => {
        setCurrent((prev) => {
          const next = ((prev ?? 0) + 1) % RECENT_PURCHASES.length;
          return next;
        });
      }, 20000 + Math.random() * 15000);

      return () => clearTimeout(nextTimer);
    }, 5000);

    return () => clearTimeout(hideTimer);
  }, [current, dismissed]);

  if (current === null || dismissed) return null;

  const purchase = RECENT_PURCHASES[current];

  return (
    <div className="fixed bottom-4 left-4 z-50 max-w-xs animate-slide-up">
      <div className="bg-background border border-border rounded-lg shadow-lg p-3 flex items-start gap-3">
        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
          <CheckCircle className="h-4 w-4 text-green-600" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium">{purchase.name} purchased</p>
          <p className="text-xs text-primary font-medium truncate">{purchase.product}</p>
          <p className="text-xs text-muted-foreground">{purchase.time}</p>
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="p-1 hover:bg-secondary rounded flex-shrink-0"
          aria-label="Dismiss"
        >
          <X className="h-3 w-3 text-muted-foreground" />
        </button>
      </div>
    </div>
  );
}
