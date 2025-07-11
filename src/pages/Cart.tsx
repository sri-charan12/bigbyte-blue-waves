import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
  Minus, 
  Plus, 
  X, 
  ShoppingBag,
  CreditCard,
  Truck,
  Shield,
  ArrowLeft
} from "lucide-react";
import { Link } from "react-router-dom";

// Import product images
import headphonesWirelessImage from "@/assets/headphones-wireless.jpg";
import webcam4kImage from "@/assets/webcam-4k.jpg";
import keyboardGamingImage from "@/assets/keyboard-gaming.jpg";

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Wireless Bluetooth Headphones",
      price: 16499,
      image: headphonesWirelessImage,
      quantity: 2,
      inStock: true
    },
    {
      id: 2,
      name: "4K Ultra HD Webcam",
      price: 10799,
      image: webcam4kImage,
      quantity: 1,
      inStock: true
    },
    {
      id: 3,
      name: "Gaming Mechanical Keyboard",
      price: 7499,
      image: keyboardGamingImage,
      quantity: 1,
      inStock: false
    }
  ]);

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(id);
      return;
    }
    setCartItems(items => 
      items.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 199;
  const tax = subtotal * 0.18; // GST in India
  const total = subtotal + shipping + tax;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen">
        {/* Empty Cart Hero */}
        <section className="gradient-hero py-16">
          <div className="container mx-auto px-4 text-center">
            <div className="space-y-4 animate-fade-in-up">
              <h1 className="text-4xl lg:text-5xl font-bold text-white floating">
                Your Cart
              </h1>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-16">
          <div className="text-center space-y-6 animate-fade-in-up">
            <div className="bg-primary/10 rounded-full w-24 h-24 flex items-center justify-center mx-auto animate-bounce-in-scale">
              <ShoppingBag size={48} className="text-primary" />
            </div>
            <div className="animate-fade-in-up stagger-1">
              <h2 className="text-3xl font-bold text-foreground mb-2">Your cart is empty</h2>
              <p className="text-muted-foreground">
                Looks like you haven't added any items to your cart yet.
              </p>
            </div>
            <Button size="lg" className="shadow-soft hover:shadow-elegant transition-all duration-300 transform hover:scale-105 animate-bounce-in stagger-2" asChild>
              <Link to="/products">
                Continue Shopping
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Cart Hero */}
      <section className="gradient-hero py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="space-y-4 animate-fade-in-up">
            <h1 className="text-4xl lg:text-5xl font-bold text-white floating">
              Shopping Cart
            </h1>
            <p className="text-xl text-white/90 animate-fade-in-up stagger-1">
              {cartItems.length} items in your cart
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Header */}
          <div className="flex items-center gap-4 animate-slide-in-left">
            <Button variant="ghost" size="icon" className="hover-glow transition-all duration-300" asChild>
              <Link to="/products">
                <ArrowLeft size={20} />
              </Link>
            </Button>
            <div>
              <h2 className="text-2xl font-bold text-foreground">Review Your Items</h2>
              <p className="text-muted-foreground">Manage quantities and proceed to checkout</p>
            </div>
          </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4 animate-slide-in-left">
            {cartItems.map((item, index) => (
              <Card key={item.id} className={`hover-glow transition-all duration-500 transform hover:scale-105 animate-fade-in-up stagger-${index + 1}`}>
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <div className="relative">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                      {!item.inStock && (
                        <Badge variant="destructive" className="absolute -top-2 -right-2 text-xs">
                          Out of Stock
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex-1 space-y-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-foreground">{item.name}</h3>
                           <p className="text-sm text-muted-foreground">
                             ₹{item.price.toLocaleString('en-IN')} each
                           </p>
                          {!item.inStock && (
                            <p className="text-sm text-destructive">This item is out of stock</p>
                          )}
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => removeItem(item.id)}
                          className="text-muted-foreground hover:text-destructive"
                        >
                          <X size={16} />
                        </Button>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                          <Button 
                            variant="outline" 
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={!item.inStock}
                          >
                            <Minus size={14} />
                          </Button>
                          <Input 
                            type="number" 
                            value={item.quantity}
                            onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 0)}
                            className="w-16 h-8 text-center"
                            min="0"
                            disabled={!item.inStock}
                          />
                          <Button 
                            variant="outline" 
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            disabled={!item.inStock}
                          >
                            <Plus size={14} />
                          </Button>
                        </div>
                        
                         <div className="text-right">
                           <p className="font-semibold text-foreground">
                             ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                           </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="space-y-6 animate-slide-in-right">
            <Card className="hover-glow transition-all duration-300">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                 <div className="flex justify-between text-sm">
                   <span className="text-muted-foreground">Subtotal</span>
                   <span className="text-foreground">₹{subtotal.toLocaleString('en-IN')}</span>
                 </div>
                 <div className="flex justify-between text-sm">
                   <span className="text-muted-foreground">Shipping</span>
                   <span className="text-foreground">₹{shipping.toLocaleString('en-IN')}</span>
                 </div>
                 <div className="flex justify-between text-sm">
                   <span className="text-muted-foreground">GST (18%)</span>
                   <span className="text-foreground">₹{Math.round(tax).toLocaleString('en-IN')}</span>
                 </div>
                 <Separator />
                 <div className="flex justify-between font-semibold">
                   <span>Total</span>
                   <span className="text-primary">₹{Math.round(total).toLocaleString('en-IN')}</span>
                 </div>
                
                <div className="space-y-3 pt-4">
                  <Button className="w-full" size="lg">
                    <CreditCard className="mr-2" size={20} />
                    Proceed to Checkout
                  </Button>
                  <Button variant="outline" className="w-full" asChild>
                    <Link to="/products">
                      Continue Shopping
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Promo Code */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Promo Code</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex space-x-2">
                  <Input placeholder="Enter promo code" />
                  <Button variant="outline">Apply</Button>
                </div>
              </CardContent>
            </Card>

            {/* Benefits */}
            <Card>
              <CardContent className="p-4 space-y-3">
                 <div className="flex items-center space-x-3 text-sm">
                   <Truck size={16} className="text-primary" />
                   <span className="text-muted-foreground">Free shipping on orders over ₹4,000</span>
                 </div>
                <div className="flex items-center space-x-3 text-sm">
                  <Shield size={16} className="text-primary" />
                  <span className="text-muted-foreground">Secure checkout guaranteed</span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <CreditCard size={16} className="text-primary" />
                  <span className="text-muted-foreground">30-day return policy</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;