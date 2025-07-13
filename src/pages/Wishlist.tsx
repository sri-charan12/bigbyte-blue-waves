import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useWishlist } from "@/contexts/WishlistContext";
import { useCart } from "@/contexts/CartContext";
import { Link } from "react-router-dom";
import { Star, ShoppingCart, Trash2, Heart } from "lucide-react";

const Wishlist = () => {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleAddToCart = async (item: any) => {
    await addToCart({
      product_id: item.product_id,
      product_name: item.product_name,
      product_price: item.product_price,
      product_image: item.product_image,
    });
  };

  const handleRemoveFromWishlist = async (productId: string) => {
    await removeFromWishlist(productId);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="gradient-hero py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent)] pointer-events-none"></div>
        <div className="relative container mx-auto px-4 text-center">
          <div className="space-y-4 animate-fade-in-up">
            <h1 className="text-4xl lg:text-5xl font-bold text-white floating pulse-glow animate-bounce-in-scale">
              <Heart className="inline mr-3" size={48} />
              My Wishlist
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto animate-fade-in-up stagger-1">
              Save your favorite products and never lose track of what you love
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        {wishlistItems.length === 0 ? (
          <Card className="max-w-md mx-auto text-center animate-fade-in-up">
            <CardContent className="p-12">
              <div className="space-y-4">
                <div className="bg-muted rounded-full w-16 h-16 flex items-center justify-center mx-auto">
                  <Heart size={32} className="text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">Your wishlist is empty</h3>
                <p className="text-muted-foreground">
                  Browse our products and add items you'd like to save for later.
                </p>
                <Button asChild className="mt-4">
                  <Link to="/products">
                    Explore Products
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-foreground">
                {wishlistItems.length} {wishlistItems.length === 1 ? 'Item' : 'Items'} in Wishlist
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {wishlistItems.map((item, index) => (
                <Card key={item.product_id} className={`group hover:shadow-elegant transition-all duration-500 transform hover:scale-105 hover-glow animate-fade-in-up stagger-${(index % 4) + 1}`}>
                  <CardHeader className="p-0 relative">
                    <div className="relative overflow-hidden rounded-t-lg">
                      <img 
                        src={item.product_image} 
                        alt={item.product_name}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-3 left-3">
                        <Badge className="bg-red-500 text-white">
                          <Heart size={12} className="mr-1" />
                          Wishlist
                        </Badge>
                      </div>
                      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button 
                          size="icon" 
                          variant="destructive" 
                          className="w-8 h-8"
                          onClick={() => handleRemoveFromWishlist(item.product_id)}
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <CardTitle className="text-lg leading-tight">{item.product_name}</CardTitle>
                      
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              size={14} 
                              className={i < 4 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"} 
                            />
                          ))}
                        </div>
                        <span className="text-sm text-muted-foreground">(4.5)</span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <span className="text-xl font-bold text-primary">₹{item.product_price.toLocaleString('en-IN')}</span>
                      </div>
                      
                      <div className="space-y-2">
                        <Button 
                          className="w-full" 
                          onClick={() => handleAddToCart(item)}
                        >
                          <ShoppingCart size={16} className="mr-2" />
                          Add to Cart
                        </Button>
                        <Button 
                          variant="outline" 
                          className="w-full"
                          onClick={() => handleRemoveFromWishlist(item.product_id)}
                        >
                          <Trash2 size={16} className="mr-2" />
                          Remove
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Continue Shopping */}
            <div className="text-center pt-8">
              <Button size="lg" asChild>
                <Link to="/products">
                  Continue Shopping
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;