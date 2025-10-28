import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { ShopifyProduct, storefrontApiRequest } from '@/lib/shopify';

export interface CartItem {
  product: ShopifyProduct;
  variantId: string;
  variantTitle: string;
  price: {
    amount: string;
    currencyCode: string;
  };
  quantity: number;
  selectedOptions: Array<{
    name: string;
    value: string;
  }>;
}

interface CartStore {
  items: CartItem[];
  cartId: string | null;
  checkoutUrl: string | null;
  isLoading: boolean;
  
  addItem: (item: CartItem) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  removeItem: (variantId: string) => void;
  clearCart: () => void;
  setCartId: (cartId: string) => void;
  setCheckoutUrl: (url: string) => void;
  setLoading: (loading: boolean) => void;
  createCheckout: () => Promise<string | null>;
}

// CheckoutChamp Configuration
const CHECKOUTCHAMP_CHECKOUT_URL = 'https://checkout.monetizedprofiles.com';
const CHECKOUTCHAMP_CAMPAIGN_SLUG = 'checkout6';

// Helper function to extract numeric variant ID from GraphQL ID
function extractNumericVariantId(graphqlId: string): string {
  // Input: "gid://shopify/ProductVariant/49694013129044"
  // Output: "49694013129044"
  const parts = graphqlId.split('/');
  return parts[parts.length - 1];
}

// Create CheckoutChamp checkout URL
function createCheckoutChampUrl(items: CartItem[]): string {
  const productsParam = items
    .map(item => {
      const variantId = extractNumericVariantId(item.variantId);
      return `${variantId}:${item.quantity}`;
    })
    .join(',');
  
  return `${CHECKOUTCHAMP_CHECKOUT_URL}/${CHECKOUTCHAMP_CAMPAIGN_SLUG}?products=${productsParam}`;
}


export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      cartId: null,
      checkoutUrl: null,
      isLoading: false,

      addItem: (item) => {
        const { items } = get();
        const existingItem = items.find(i => i.variantId === item.variantId);
        
        if (existingItem) {
          set({
            items: items.map(i =>
              i.variantId === item.variantId
                ? { ...i, quantity: i.quantity + item.quantity }
                : i
            )
          });
        } else {
          set({ items: [...items, item] });
        }

        // Track add to cart event (if email available)
        const storedEmail = localStorage.getItem('klaviyo_email');
        if (storedEmail) {
          import("@/lib/klaviyo").then(({ trackKlaviyoEvent }) => {
            trackKlaviyoEvent(storedEmail, "Added to Cart", {
              product_name: item.product.node.title,
              product_handle: item.product.node.handle,
              variant_title: item.variantTitle,
              price: item.price.amount,
              currency: item.price.currencyCode,
              quantity: item.quantity,
            }).catch(error => {
              console.error("Failed to track add to cart:", error);
            });
          });
        }
      },

      updateQuantity: (variantId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(variantId);
          return;
        }
        
        set({
          items: get().items.map(item =>
            item.variantId === variantId ? { ...item, quantity } : item
          )
        });
      },

      removeItem: (variantId) => {
        set({
          items: get().items.filter(item => item.variantId !== variantId)
        });
      },

      clearCart: () => {
        set({ items: [], cartId: null, checkoutUrl: null });
      },

      setCartId: (cartId) => set({ cartId }),
      setCheckoutUrl: (checkoutUrl) => set({ checkoutUrl }),
      setLoading: (isLoading) => set({ isLoading }),

      createCheckout: async () => {
        const { items, setLoading, setCheckoutUrl } = get();
        if (items.length === 0) return null;

        setLoading(true);
        try {
          const checkoutUrl = createCheckoutChampUrl(items);
          setCheckoutUrl(checkoutUrl);
          console.log('CheckoutChamp URL:', checkoutUrl);
          return checkoutUrl;
        } catch (error) {
          console.error('Failed to create checkout:', error);
          return null;
        } finally {
          setLoading(false);
        }
      }
    }),
    {
      name: 'shopify-cart',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
