'use client';

import { X, Minus, Plus, Trash2, Shield, CreditCard } from 'lucide-react';
import Image from 'next/image';
import { useCartStore } from '@/lib/cart-store';
import { formatPrice } from '@/lib/shopify';

export function CartDrawer() {
  const { items, isCartOpen, isCheckingOut, setCartOpen, updateQuantity, removeItem, checkout } = useCartStore();

  const total = items.reduce((sum, item) => sum + parseFloat(item.price.amount) * item.quantity, 0);

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-[60]">
      <div className="absolute inset-0 bg-black/50" onClick={() => setCartOpen(false)} />
      <div className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-background shadow-xl flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-lg font-semibold">Cart ({items.length})</h2>
          <button onClick={() => setCartOpen(false)} className="p-2 hover:bg-secondary rounded-lg" aria-label="Close cart">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {items.length === 0 ? (
            <p className="text-center text-muted-foreground py-12">Your cart is empty</p>
          ) : (
            items.map((item) => (
              <div key={item.variantId} className="flex gap-3 bg-secondary/50 rounded-lg p-3">
                {item.productImage && (
                  <div className="relative w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                    <Image src={item.productImage} alt={item.productTitle} fill className="object-cover" sizes="64px" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium truncate">{item.productTitle}</h3>
                  {item.variantTitle !== 'Default Title' && (
                    <p className="text-xs text-muted-foreground">{item.variantTitle}</p>
                  )}
                  <p className="text-sm font-semibold text-primary mt-1">
                    {formatPrice(item.price.amount, item.price.currencyCode)}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <button onClick={() => updateQuantity(item.variantId, item.quantity - 1)} className="p-1 hover:bg-secondary rounded" aria-label="Decrease">
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="text-sm w-6 text-center">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.variantId, item.quantity + 1)} className="p-1 hover:bg-secondary rounded" aria-label="Increase">
                      <Plus className="h-3 w-3" />
                    </button>
                    <button onClick={() => removeItem(item.variantId)} className="p-1 hover:bg-destructive/10 text-destructive rounded ml-auto" aria-label="Remove">
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="p-4 border-t border-border space-y-3">
            <div className="flex justify-between text-lg font-semibold">
              <span>Total</span>
              <span>{formatPrice(total.toString())}</span>
            </div>

            <button
              onClick={checkout}
              disabled={isCheckingOut}
              className="w-full bg-primary text-primary-foreground py-3.5 rounded-lg font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              {isCheckingOut ? 'Redirecting to checkout...' : 'Secure Checkout'}
            </button>

            {/* Reassurance */}
            <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground pt-1">
              <span className="flex items-center gap-1"><Shield className="h-3 w-3 text-green-600" /> SSL Secure</span>
              <span className="flex items-center gap-1"><CreditCard className="h-3 w-3" /> All cards accepted</span>
            </div>
            <p className="text-center text-xs text-muted-foreground">
              Instant delivery &bull; 30-day money-back guarantee
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
