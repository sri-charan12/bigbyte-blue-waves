import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Star, 
  Search, 
  X, 
  Check, 
  ShoppingCart, 
  Heart,
  Zap,
  Shield,
  Award,
  Truck
} from "lucide-react";

const Compare = () => {
  const [compareList, setCompareList] = useState([
    {
      id: 1,
      name: "Wireless Bluetooth Headphones Pro",
      price: 16499,
      originalPrice: 20799,
      image: "/placeholder.svg",
      rating: 4.8,
      reviews: 324,
      brand: "TechBrand",
      specs: {
        "Battery Life": "30 hours",
        "Noise Cancellation": "Active",
        "Wireless Range": "30 feet",
        "Weight": "250g",
        "Warranty": "2 years",
        "Water Resistance": "IPX4"
      },
      features: ["Active Noise Cancellation", "Quick Charge", "Voice Assistant", "Foldable Design"],
      inStock: true
    },
    {
      id: 2,
      name: "Premium Audio Headphones Elite",
      price: 23199,
      originalPrice: 29099,
      image: "/placeholder.svg",
      rating: 4.9,
      reviews: 567,
      brand: "AudioMax",
      specs: {
        "Battery Life": "40 hours",
        "Noise Cancellation": "Adaptive",
        "Wireless Range": "50 feet",
        "Weight": "280g",
        "Warranty": "3 years",
        "Water Resistance": "IPX5"
      },
      features: ["Adaptive Noise Cancellation", "Ultra Fast Charge", "Multi-device Pairing", "Premium Materials"],
      inStock: true
    },
    {
      id: 3,
      name: "Studio Quality Headphones",
      price: 12499,
      originalPrice: 16699,
      image: "/placeholder.svg",
      rating: 4.7,
      reviews: 234,
      brand: "StudioSound",
      specs: {
        "Battery Life": "25 hours",
        "Noise Cancellation": "Passive",
        "Wireless Range": "25 feet",
        "Weight": "220g",
        "Warranty": "1 year",
        "Water Resistance": "IPX2"
      },
      features: ["Studio Quality Sound", "Comfortable Padding", "Detachable Cable", "Lightweight"],
      inStock: false
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  const availableProducts = [
    {
      id: 4,
      name: "Gaming Wireless Headset",
      price: 10799,
      image: "/placeholder.svg",
      rating: 4.6,
      brand: "GameTech"
    },
    {
      id: 5,
      name: "Professional Monitor Headphones",
      price: 15799,
      image: "/placeholder.svg",
      rating: 4.8,
      brand: "ProAudio"
    },
    {
      id: 6,
      name: "Compact Travel Headphones",
      price: 7499,
      image: "/placeholder.svg",
      rating: 4.4,
      brand: "TravelTech"
    }
  ];

  const removeFromCompare = (id: number) => {
    setCompareList(compareList.filter(item => item.id !== id));
  };

  const addToCompare = (product: any) => {
    if (compareList.length < 4) {
      // Add full product details for comparison
      const fullProduct = {
        ...product,
        originalPrice: product.price + 4000,
        reviews: Math.floor(Math.random() * 500) + 100,
        specs: {
          "Battery Life": "20-35 hours",
          "Noise Cancellation": "Basic",
          "Wireless Range": "20-40 feet",
          "Weight": "200-300g",
          "Warranty": "1-2 years",
          "Water Resistance": "IPX2-IPX4"
        },
        features: ["Good Sound Quality", "Comfortable Fit", "Reliable Connection"],
        inStock: true
      };
      setCompareList([...compareList, fullProduct]);
    }
  };

  const getComparisonValue = (spec: string, products: any[]) => {
    // Determine best value for highlighting
    const values = products.map(p => p.specs[spec]);
    return values;
  };

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="gradient-hero py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="space-y-4 animate-fade-in-up">
            <h1 className="text-4xl lg:text-5xl font-bold text-white floating pulse-glow animate-bounce-in-scale">Product Comparison</h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto animate-fade-in-up stagger-1">
              Compare features, specifications, and prices to make the best choice for your needs.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 space-y-8">

      {/* Search and Add Products */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search size={20} />
            Add Products to Compare
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
              <Input 
                placeholder="Search products to compare..." 
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {availableProducts
                .filter(product => 
                  product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
                  !compareList.find(item => item.id === product.id)
                )
                .map((product) => (
                <div key={product.id} className="border rounded-lg p-4 hover:bg-accent/50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{product.name}</h4>
                      <p className="text-xs text-muted-foreground">{product.brand}</p>
                      <div className="flex items-center space-x-1">
                        <Star size={12} className="fill-yellow-400 text-yellow-400" />
                        <span className="text-xs">{product.rating}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-sm">₹{product.price.toLocaleString('en-IN')}</p>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="text-xs h-6 px-2 mt-1"
                        onClick={() => addToCompare(product)}
                        disabled={compareList.length >= 4}
                      >
                        {compareList.length >= 4 ? "Max 4" : "Compare"}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {compareList.length >= 4 && (
              <p className="text-sm text-muted-foreground text-center">
                Maximum 4 products can be compared at once. Remove a product to add more.
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Comparison Table */}
      {compareList.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-foreground">
              Comparing {compareList.length} Products
            </h2>
            <Button 
              variant="outline" 
              onClick={() => setCompareList([])}
              className="text-sm"
            >
              Clear All
            </Button>
          </div>

          <div className="overflow-x-auto">
            <div className="min-w-full">
              {/* Product Headers */}
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
                {compareList.map((product) => (
                  <Card key={product.id} className="relative">
                    <Button 
                      size="icon" 
                      variant="ghost" 
                      className="absolute top-2 right-2 w-6 h-6"
                      onClick={() => removeFromCompare(product.id)}
                    >
                      <X size={14} />
                    </Button>
                    
                    <CardContent className="p-4 text-center">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-32 object-cover rounded-lg mb-3"
                      />
                      <h3 className="font-semibold text-sm mb-2">{product.name}</h3>
                      <p className="text-xs text-muted-foreground mb-2">{product.brand}</p>
                      
                      <div className="flex items-center justify-center space-x-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            size={12} 
                            className={i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"} 
                          />
                        ))}
                        <span className="text-xs text-muted-foreground ml-1">({product.reviews})</span>
                      </div>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center justify-center space-x-2">
                          <span className="text-lg font-bold text-primary">₹{product.price.toLocaleString('en-IN')}</span>
                          <span className="text-xs text-muted-foreground line-through">₹{product.originalPrice.toLocaleString('en-IN')}</span>
                        </div>
                        {!product.inStock && (
                          <Badge variant="destructive" className="text-xs">Out of Stock</Badge>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <Button className="w-full text-xs h-8" disabled={!product.inStock}>
                          <ShoppingCart size={12} className="mr-1" />
                          {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                        </Button>
                        <Button variant="outline" className="w-full text-xs h-8">
                          <Heart size={12} className="mr-1" />
                          Wishlist
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Specifications Comparison */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap size={20} />
                    Specifications
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.keys(compareList[0]?.specs || {}).map((spec) => (
                      <div key={spec} className="grid grid-cols-1 lg:grid-cols-4 gap-4 py-3 border-b border-border last:border-b-0">
                        <div className="font-medium text-sm text-muted-foreground lg:col-span-1">
                          {spec}
                        </div>
                        {compareList.map((product) => (
                          <div key={product.id} className="text-sm lg:col-span-1 text-center lg:text-left">
                            {product.specs[spec]}
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Features Comparison */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award size={20} />
                    Features
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                    {compareList.map((product) => (
                      <div key={product.id} className="space-y-2">
                        {product.features.map((feature, index) => (
                          <div key={index} className="flex items-center space-x-2 text-sm">
                            <Check size={14} className="text-green-500" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Additional Info */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4 text-center">
                    <Shield className="text-blue-500 mx-auto mb-2" size={24} />
                    <h3 className="font-semibold text-sm mb-1">Protected Purchase</h3>
                    <p className="text-xs text-muted-foreground">All products come with warranty coverage</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4 text-center">
                    <Truck className="text-green-500 mx-auto mb-2" size={24} />
                    <h3 className="font-semibold text-sm mb-1">Free Shipping</h3>
                    <p className="text-xs text-muted-foreground">On orders over ₹4000</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4 text-center">
                    <Star className="text-yellow-500 mx-auto mb-2" size={24} />
                    <h3 className="font-semibold text-sm mb-1">Expert Reviews</h3>
                    <p className="text-xs text-muted-foreground">Verified customer ratings</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      )}

      {compareList.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="space-y-4">
              <div className="bg-muted rounded-full w-16 h-16 flex items-center justify-center mx-auto">
                <Search size={32} className="text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">No Products to Compare</h3>
              <p className="text-muted-foreground">
                Search and add products above to start comparing their features and specifications.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
      </div>
    </div>
  );
};

export default Compare;