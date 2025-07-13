import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './AuthContext';
import { useToast } from '@/hooks/use-toast';

export interface WishlistItem {
  id?: string;
  product_id: string;
  product_name: string;
  product_price: number;
  product_image: string;
}

interface WishlistContextType {
  wishlistItems: WishlistItem[];
  addToWishlist: (product: Omit<WishlistItem, 'id'>) => Promise<void>;
  removeFromWishlist: (productId: string) => Promise<void>;
  isInWishlist: (productId: string) => boolean;
  wishlistCount: number;
  loading: boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  // Load wishlist items from database or localStorage
  useEffect(() => {
    loadWishlistItems();
  }, [user]);

  const loadWishlistItems = async () => {
    setLoading(true);
    try {
      if (user) {
        // Load from database for authenticated users
        const { data, error } = await supabase
          .from('wishlist_items')
          .select('*')
          .eq('user_id', user.id);
        
        if (error) throw error;
        setWishlistItems(data || []);
      } else {
        // Load from localStorage for guest users
        const savedWishlist = localStorage.getItem('wishlist_items');
        if (savedWishlist) {
          setWishlistItems(JSON.parse(savedWishlist));
        }
      }
    } catch (error) {
      console.error('Error loading wishlist items:', error);
      toast({
        title: "Error",
        description: "Failed to load wishlist items",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const addToWishlist = async (product: Omit<WishlistItem, 'id'>) => {
    try {
      if (user) {
        // Save to database for authenticated users
        const { error } = await supabase
          .from('wishlist_items')
          .insert({
            user_id: user.id,
            product_id: product.product_id,
            product_name: product.product_name,
            product_price: product.product_price,
            product_image: product.product_image,
          });
        
        if (error) {
          if (error.code === '23505') { // Unique constraint violation
            toast({
              title: "Already in Wishlist",
              description: "This item is already in your wishlist",
              variant: "destructive",
            });
            return;
          }
          throw error;
        }
        await loadWishlistItems(); // Refresh wishlist
      } else {
        // Save to localStorage for guest users
        const existingItem = wishlistItems.find(item => item.product_id === product.product_id);
        if (existingItem) {
          toast({
            title: "Already in Wishlist",
            description: "This item is already in your wishlist",
            variant: "destructive",
          });
          return;
        }
        
        const newWishlistItems = [...wishlistItems, product];
        setWishlistItems(newWishlistItems);
        localStorage.setItem('wishlist_items', JSON.stringify(newWishlistItems));
      }
      
      toast({
        title: "Added to Wishlist",
        description: `${product.product_name} has been added to your wishlist`,
      });
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      toast({
        title: "Error",
        description: "Failed to add item to wishlist",
        variant: "destructive",
      });
    }
  };

  const removeFromWishlist = async (productId: string) => {
    try {
      if (user) {
        const { error } = await supabase
          .from('wishlist_items')
          .delete()
          .eq('user_id', user.id)
          .eq('product_id', productId);
        
        if (error) throw error;
        await loadWishlistItems(); // Refresh wishlist
      } else {
        const newWishlistItems = wishlistItems.filter(item => item.product_id !== productId);
        setWishlistItems(newWishlistItems);
        localStorage.setItem('wishlist_items', JSON.stringify(newWishlistItems));
      }
      
      toast({
        title: "Removed from Wishlist",
        description: "Item has been removed from your wishlist",
      });
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      toast({
        title: "Error",
        description: "Failed to remove item from wishlist",
        variant: "destructive",
      });
    }
  };

  const isInWishlist = (productId: string) => {
    return wishlistItems.some(item => item.product_id === productId);
  };

  const wishlistCount = wishlistItems.length;

  return (
    <WishlistContext.Provider value={{
      wishlistItems,
      addToWishlist,
      removeFromWishlist,
      isInWishlist,
      wishlistCount,
      loading
    }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};