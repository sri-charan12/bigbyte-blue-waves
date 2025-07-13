import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ShoppingCart, Heart, Zap } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface Product {
  id: number | string;
  name: string;
  price: number;
  image: string;
}

interface ProductActionsProps {
  product: Product;
  className?: string;
  variant?: 'default' | 'compact' | 'overlay';
  inStock?: boolean;
}

export const ProductActions: React.FC<ProductActionsProps> = ({ 
  product, 
  className = '',
  variant = 'default',
  inStock = true 
}) => {
  const [buyNowDialogOpen, setBuyNowDialogOpen] = useState(false);
  const [buyNowLoading, setBuyNowLoading] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    email: '',
    name: '',
    address: '',
    city: '',
    zipCode: '',
    quantity: 1
  });

  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { user } = useAuth();
  const { toast } = useToast();

  const productData = {
    product_id: String(product.id),
    product_name: product.name,
    product_price: product.price,
    product_image: product.image,
  };

  const handleAddToCart = async () => {
    if (!inStock) return;
    await addToCart(productData);
  };

  const handleToggleWishlist = async () => {
    if (isInWishlist(String(product.id))) {
      await removeFromWishlist(String(product.id));
    } else {
      await addToWishlist(productData);
    }
  };

  const handleBuyNow = async () => {
    if (!inStock) return;
    
    setBuyNowLoading(true);
    try {
      const orderData = {
        product_id: String(product.id),
        product_name: product.name,
        product_price: product.price,
        quantity: customerInfo.quantity,
        customer_email: customerInfo.email,
        customer_name: customerInfo.name,
        shipping_address: {
          address: customerInfo.address,
          city: customerInfo.city,
          zipCode: customerInfo.zipCode,
        }
      };

      const { data, error } = await supabase.functions.invoke('create-order', {
        body: orderData,
      });

      if (error) throw error;

      toast({
        title: "Order Placed Successfully!",
        description: `Your order for ${product.name} has been placed. Order ID: ${data.order_id}`,
      });

      setBuyNowDialogOpen(false);
      setCustomerInfo({
        email: '',
        name: '',
        address: '',
        city: '',
        zipCode: '',
        quantity: 1
      });
    } catch (error) {
      console.error('Error placing order:', error);
      toast({
        title: "Error",
        description: "Failed to place order. Please try again.",
        variant: "destructive",
      });
    } finally {
      setBuyNowLoading(false);
    }
  };

  const isWishlisted = isInWishlist(String(product.id));

  if (variant === 'overlay') {
    return (
      <div className={`absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity space-y-2 ${className}`}>
        <Button 
          size="icon" 
          variant="secondary" 
          className="w-8 h-8 shadow-lg"
          onClick={handleToggleWishlist}
        >
          <Heart 
            size={16} 
            className={isWishlisted ? "fill-red-500 text-red-500" : ""} 
          />
        </Button>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <Button 
          size="sm" 
          onClick={handleAddToCart}
          disabled={!inStock}
          className="flex-1"
        >
          <ShoppingCart size={16} className="mr-1" />
          {inStock ? 'Cart' : 'Out of Stock'}
        </Button>
        <Button 
          size="sm" 
          variant="outline"
          onClick={handleToggleWishlist}
        >
          <Heart 
            size={16} 
            className={isWishlisted ? "fill-red-500 text-red-500" : ""} 
          />
        </Button>
      </div>
    );
  }

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex gap-2">
        <Button 
          className="flex-1" 
          onClick={handleAddToCart}
          disabled={!inStock}
        >
          <ShoppingCart size={16} className="mr-2" />
          {inStock ? 'Add to Cart' : 'Out of Stock'}
        </Button>
        <Button 
          variant="outline" 
          onClick={handleToggleWishlist}
        >
          <Heart 
            size={16} 
            className={isWishlisted ? "fill-red-500 text-red-500" : ""} 
          />
        </Button>
      </div>
      
      {inStock && (
        <Dialog open={buyNowDialogOpen} onOpenChange={setBuyNowDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              variant="secondary" 
              className="w-full bg-orange-500 hover:bg-orange-600 text-white"
            >
              <Zap size={16} className="mr-2" />
              Buy Now
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Complete Your Purchase</DialogTitle>
              <DialogDescription>
                Fill in your details to complete the purchase of {product.name}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-accent rounded-lg">
                <span className="font-medium">{product.name}</span>
                <span className="font-bold">₹{product.price.toLocaleString('en-IN')}</span>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity</Label>
                <Input
                  id="quantity"
                  type="number"
                  min="1"
                  value={customerInfo.quantity}
                  onChange={(e) => setCustomerInfo({...customerInfo, quantity: parseInt(e.target.value) || 1})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={customerInfo.email}
                  onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  value={customerInfo.name}
                  onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="address">Shipping Address</Label>
                <Textarea
                  id="address"
                  placeholder="123 Main Street"
                  value={customerInfo.address}
                  onChange={(e) => setCustomerInfo({...customerInfo, address: e.target.value})}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    placeholder="Mumbai"
                    value={customerInfo.city}
                    onChange={(e) => setCustomerInfo({...customerInfo, city: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zipCode">ZIP Code</Label>
                  <Input
                    id="zipCode"
                    placeholder="400001"
                    value={customerInfo.zipCode}
                    onChange={(e) => setCustomerInfo({...customerInfo, zipCode: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-primary/10 rounded-lg">
                <span className="font-medium">Total Amount:</span>
                <span className="font-bold text-lg">
                  ₹{(product.price * customerInfo.quantity).toLocaleString('en-IN')}
                </span>
              </div>
              
              <Button 
                onClick={handleBuyNow}
                disabled={!customerInfo.email || buyNowLoading}
                className="w-full"
              >
                {buyNowLoading ? "Processing..." : "Place Order"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};