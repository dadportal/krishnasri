import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface CartItem {
  id: string;
  name: string;
  description: string;
  price: number;
  billingCycle: 'monthly' | 'yearly';
  quantity: number;
  features: string[];
}

export interface Transaction {
  id: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'success' | 'failed';
  paymentMethod: string;
  createdAt: string;
  completedAt?: string;
}

interface CartState {
  items: CartItem[];
  checkoutState: 'idle' | 'processing' | 'success' | 'error';
  currentTransaction: Transaction | null;
  transactionHistory: Transaction[];
  
  // Actions
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
  
  // Checkout
  startCheckout: (paymentMethod: string) => Promise<Transaction>;
  processWebhook: (transactionId: string, status: 'success' | 'failed') => void;
  resetCheckout: () => void;
}

const generateTransactionId = () => 'txn_' + Math.random().toString(36).substring(2) + Date.now().toString(36);

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      checkoutState: 'idle',
      currentTransaction: null,
      transactionHistory: [],

      addItem: (item) => {
        set((state) => {
          const existing = state.items.find((i) => i.id === item.id);
          
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
              ),
            };
          }
          
          return {
            items: [...state.items, { ...item, quantity: 1 }],
          };
        });
      },

      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter((i) => i.id !== id),
        }));
      },

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }
        
        set((state) => ({
          items: state.items.map((i) =>
            i.id === id ? { ...i, quantity } : i
          ),
        }));
      },

      clearCart: () => set({ items: [] }),

      getTotal: () => {
        const { items } = get();
        return items.reduce((total, item) => total + item.price * item.quantity, 0);
      },

      getItemCount: () => {
        const { items } = get();
        return items.reduce((count, item) => count + item.quantity, 0);
      },

      startCheckout: async (paymentMethod) => {
        const { items, getTotal } = get();
        
        if (items.length === 0) {
          throw new Error('Cart is empty');
        }
        
        set({ checkoutState: 'processing' });
        
        const transaction: Transaction = {
          id: generateTransactionId(),
          items: [...items],
          total: getTotal(),
          status: 'pending',
          paymentMethod,
          createdAt: new Date().toISOString(),
        };
        
        set({ currentTransaction: transaction });
        
        // Simulate payment processing
        await new Promise((resolve) => setTimeout(resolve, 2000));
        
        // Update transaction to processing
        set((state) => ({
          currentTransaction: state.currentTransaction
            ? { ...state.currentTransaction, status: 'processing' }
            : null,
        }));
        
        return transaction;
      },

      processWebhook: (transactionId, status) => {
        set((state) => {
          if (state.currentTransaction?.id !== transactionId) {
            return state;
          }
          
          const completedTransaction: Transaction = {
            ...state.currentTransaction,
            status,
            completedAt: new Date().toISOString(),
          };
          
          return {
            currentTransaction: completedTransaction,
            checkoutState: status === 'success' ? 'success' : 'error',
            transactionHistory: [completedTransaction, ...state.transactionHistory],
            items: status === 'success' ? [] : state.items,
          };
        });
      },

      resetCheckout: () => {
        set({
          checkoutState: 'idle',
          currentTransaction: null,
        });
      },
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        items: state.items,
        transactionHistory: state.transactionHistory,
      }),
    }
  )
);
