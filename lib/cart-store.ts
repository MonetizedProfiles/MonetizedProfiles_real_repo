'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface CartItem {
  productId: string;
  productHandle: string;
  productTitle: string;
  productImage: string;
  variantId: string;
  variantTitle: string;
  price: { amount: string; currencyCode: string };
  quantity: number;
  selectedOptions: Array<{ name: string; value: string }>;
}

interface CartState {
  items: CartItem[];
  isCartOpen: boolean;
  isCheckingOut: boolean;
  addItem: (item: CartItem) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  removeItem: (variantId: string) => void;
  clearCart: () => void;
  setCartOpen: (open: boolean) => void;
  checkout: () => Promise<void>;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isCartOpen: false,
      isCheckingOut: false,

      addItem: (item) => {
        const { items } = get();
        const existing = items.find((i) => i.variantId === item.variantId);
        if (existing) {
          set({
            items: items.map((i) =>
              i.variantId === item.variantId ? { ...i, quantity: i.quantity + item.quantity } : i
            ),
            isCartOpen: true,
          });
        } else {
          set({ items: [...items, item], isCartOpen: true });
        }
      },

      updateQuantity: (variantId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(variantId);
          return;
        }
        set({ items: get().items.map((i) => (i.variantId === variantId ? { ...i, quantity } : i)) });
      },

      removeItem: (variantId) => {
        set({ items: get().items.filter((i) => i.variantId !== variantId) });
      },

      clearCart: () => set({ items: [] }),
      setCartOpen: (isCartOpen) => set({ isCartOpen }),

      checkout: async () => {
        const { items } = get();
        if (items.length === 0) return;

        set({ isCheckingOut: true });
        try {
          const res = await fetch('/api/checkout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              lines: items.map((item) => ({
                merchandiseId: item.variantId,
                quantity: item.quantity,
              })),
            }),
          });

          const data = await res.json();
          if (data.checkoutUrl) {
            window.location.href = data.checkoutUrl;
          }
        } finally {
          set({ isCheckingOut: false });
        }
      },
    }),
    {
      name: 'mp-cart',
      storage: createJSONStorage(() => (typeof window !== 'undefined' ? localStorage : { getItem: () => null, setItem: () => {}, removeItem: () => {} })),
      partialize: (state) => ({ items: state.items }),
    }
  )
);
