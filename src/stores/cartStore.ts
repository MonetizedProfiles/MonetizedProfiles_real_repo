import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { ShopifyProduct, storefrontApiRequest, SHOPIFY_STORE_PERMANENT_DOMAIN } from '@/lib/shopify';
import { appendTrackingParams } from '@/lib/tracking';

// Checkout Provider Configuration
type CheckoutProvider = 'shopify' | 'checkoutchamp';
const CHECKOUT_PROVIDER: CheckoutProvider = 'shopify'; // Toggle between providers

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

// Shopify Variant ID to CheckoutChamp Product ID mapping
const VARIANT_TO_CHECKOUTCHAMP_ID: Record<string, string> = {
  '51221480472916': '1.1',
  '51221480505684': '1.2',
  '49694013129044': '2.3',
  '49694013096276': '2.4',
  '50916615586132': '3.5',
  '50916615618900': '3.6',
  '49847711105364': '4',
  '49694337073492': '5.8',
  '49694337106260': '5.9',
  '49804063310164': '6',
};

// Helper function to extract numeric variant ID from GraphQL ID
function extractNumericVariantId(graphqlId: string): string {
  // Input: "gid://shopify/ProductVariant/49694013129044"
  // Output: "49694013129044"
  const parts = graphqlId.split('/');
  return parts[parts.length - 1];
}

// GraphQL mutation for creating Shopify cart
const CART_CREATE_MUTATION = `
  mutation cartCreate($input: CartInput!) {
    cartCreate(input: $input) {
      cart {
        id
        checkoutUrl
      }
      userErrors {
        field
        message
      }
    }
  }
`;

// Create Shopify native checkout URL
async function createShopifyCheckout(items: CartItem[]): Promise<string> {
  try {
    console.log('Creating Shopify checkout for items:', items.map(i => ({
      variantId: i.variantId,
      quantity: i.quantity,
      title: i.product.node.title
    })));

    const lines = items.map(item => ({
      quantity: item.quantity,
      merchandiseId: item.variantId,
    }));

    console.log('Calling Shopify Storefront API with lines:', lines);
    
    const cartData = await storefrontApiRequest(CART_CREATE_MUTATION, {
      input: { lines },
    });

    console.log('Shopify API response:', cartData);

    if (!cartData || !cartData.data) {
      throw new Error('Invalid response from Shopify API');
    }

    if (cartData.data.cartCreate.userErrors.length > 0) {
      const errors = cartData.data.cartCreate.userErrors.map((e: any) => e.message).join(', ');
      console.error('Shopify cart creation errors:', errors);
      throw new Error(`Cart creation failed: ${errors}`);
    }

    const cart = cartData.data.cartCreate.cart;
    
    if (!cart || !cart.checkoutUrl) {
      console.error('No checkout URL in response:', cart);
      throw new Error('No checkout URL returned from Shopify');
    }

    const url = new URL(cart.checkoutUrl);
    url.searchParams.set('channel', 'online_store');

    // Always send checkout through the Shopify permanent domain so it never hits the React app domain
    url.hostname = SHOPIFY_STORE_PERMANENT_DOMAIN;
    url.protocol = 'https:';

    // Append Everflow tracking parameters so the Shopify app can attribute the conversion
    const checkoutUrlWithTracking = appendTrackingParams(url.toString());
    
    console.log('✅ Final Shopify checkout URL:', checkoutUrlWithTracking);
    return checkoutUrlWithTracking;
  } catch (error) {
    console.error('❌ Error creating Shopify checkout:', error);
    throw error;
  }
}

// Create CheckoutChamp checkout URL
function createCheckoutChampUrl(items: CartItem[]): string {
  const productsParamRaw = items
    .map(item => {
      const shopifyVariantId = extractNumericVariantId(item.variantId);
      const checkoutChampId = VARIANT_TO_CHECKOUTCHAMP_ID[shopifyVariantId];
      
      console.log('Cart item mapping:', {
        productTitle: item.product.node.title,
        shopifyVariantId,
        checkoutChampId,
        quantity: item.quantity
      });
      
      if (!checkoutChampId) {
        console.warn(`No CheckoutChamp ID mapping found for Shopify variant ${shopifyVariantId}`);
        return null;
      }
      
      return `${checkoutChampId}:${item.quantity}`;
    })
    .filter(Boolean)
    .join(';');

  if (!productsParamRaw) {
    throw new Error('No valid items to send to CheckoutChamp (missing mappings)');
  }
  
  const productsParam = encodeURIComponent(productsParamRaw);
  const baseUrl = `${CHECKOUTCHAMP_CHECKOUT_URL}/${CHECKOUTCHAMP_CAMPAIGN_SLUG}?products=${productsParam}`;
  
  const url = appendTrackingParams(baseUrl);
  console.log('Generated CheckoutChamp URL with tracking:', url);
  return url;
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
          let checkoutUrl: string;
          
          if (CHECKOUT_PROVIDER === 'shopify') {
            checkoutUrl = await createShopifyCheckout(items);
          } else {
            checkoutUrl = createCheckoutChampUrl(items);
          }
          
          setCheckoutUrl(checkoutUrl);
          console.log(`${CHECKOUT_PROVIDER} checkout URL:`, checkoutUrl);
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
