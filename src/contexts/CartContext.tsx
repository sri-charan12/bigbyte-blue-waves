import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './AuthContext';
import { useToast } from '@/hooks/use-toast';

export interface CartItem {
  id?: string;
  product_id: string;
  product_name: string;
  product_price: number;
  product_image: string;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Omit<CartItem, 'id' | 'quantity'>, quantity?: number) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  cartTotal: number;
  cartCount: number;
  loading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  // Load cart items from database or localStorage
  useEffect(() => {
    loadCartItems();
  }, [user]);

  const loadCartItems = async () => {
    setLoading(true);
    try {
      if (user) {
        // Load from database for authenticated users
        const { data, error } = await supabase
          .from('cart_items')
          .select('*')
          .eq('user_id', user.id);
        
        if (error) throw error;
        setCartItems(data || []);
      } else {
        // Load from localStorage for guest users
        const savedCart = localStorage.getItem('cart_items');
        if (savedCart) {
          setCartItems(JSON.parse(savedCart));
        }
      }
    } catch (error) {
      console.error('Error loading cart items:', error);
      toast({
        title: "Error",
        description: "Failed to load cart items",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (product: Omit<CartItem, 'id' | 'quantity'>, quantity = 1) => {
    try {
      if (user) {
        // Save to database for authenticated users
        const { data, error } = await supabase
          .from('cart_items')
          .upsert({
            user_id: user.id,
            product_id: product.product_id,
            product_name: product.product_name,
            product_price: product.product_price,
            product_image: product.product_image,
            quantity: quantity,
          }, {
            onConflict: 'user_id,product_id',
            ignoreDuplicates: false
          })
          .select();
        
        if (error) throw error;
        await loadCartItems(); // Refresh cart
      } else {
        // Save to localStorage for guest users
        const existingItemIndex = cartItems.findIndex(item => item.product_id === product.product_id);
        let newCartItems;
        
        if (existingItemIndex >= 0) {
          newCartItems = cartItems.map((item, index) =>
            index === existingItemIndex
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        } else {
          newCartItems = [...cartItems, { ...product, quantity }];
        }
        
        setCartItems(newCartItems);
        localStorage.setItem('cart_items', JSON.stringify(newCartItems));
      }
      
      toast({
        title: "Added to Cart",
        description: `${product.product_name} has been added to your cart`,
      });
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast({
        title: "Error",
        description: "Failed to add item to cart",
        variant: "destructive",
      });
    }
  };

  const removeFromCart = async (productId: string) => {
    try {
      if (user) {
        const { error } = await supabase
          .from('cart_items')
          .delete()
          .eq('user_id', user.id)
          .eq('product_id', productId);
        
        if (error) throw error;
        await loadCartItems(); // Refresh cart
      } else {
        const newCartItems = cartItems.filter(item => item.product_id !== productId);
        setCartItems(newCartItems);
        localStorage.setItem('cart_items', JSON.stringify(newCartItems));
      }
      
      toast({
        title: "Removed from Cart",
        description: "Item has been removed from your cart",
      });
    } catch (error) {
      console.error('Error removing from cart:', error);
      toast({
        title: "Error",
        description: "Failed to remove item from cart",
        variant: "destructive",
      });
    }
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    if (quantity <= 0) {
      await removeFromCart(productId);
      return;
    }

    try {
      if (user) {
        const { error } = await supabase
          .from('cart_items')
          .update({ quantity })
          .eq('user_id', user.id)
          .eq('product_id', productId);
        
        if (error) throw error;
        await loadCartItems(); // Refresh cart
      } else {
        const newCartItems = cartItems.map(item =>
          item.product_id === productId ? { ...item, quantity } : item
        );
        setCartItems(newCartItems);
        localStorage.setItem('cart_items', JSON.stringify(newCartItems));
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
      toast({
        title: "Error",
        description: "Failed to update item quantity",
        variant: "destructive",
      });
    }
  };

  const clearCart = async () => {
    try {
      if (user) {
        const { error } = await supabase
          .from('cart_items')
          .delete()
          .eq('user_id', user.id);
        
        if (error) throw error;
      }
      
      setCartItems([]);
      localStorage.removeItem('cart_items');
      
      toast({
        title: "Cart Cleared",
        description: "All items have been removed from your cart",
      });
    } catch (error) {
      console.error('Error clearing cart:', error);
      toast({
        title: "Error",
        description: "Failed to clear cart",
        variant: "destructive",
      });
    }
  };

  const cartTotal = cartItems.reduce((total, item) => total + (item.product_price * item.quantity), 0);
  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      cartTotal,
      cartCount,
      loading
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};