import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Star, 
  ShoppingCart, 
  Heart, 
  Clock, 
  Zap,
  Percent,
  Tag,
  TrendingUp
} from "lucide-react";

const Deals = () => {
  const flashDeals = [
    {
      id: 1,
      name: "Premium Wireless Earbuds",
      price: 89.99,
      originalPrice: 179.99,
      image: "/placeholder.svg",
      rating: 4.8,
      reviews: 456,
      discount: 50,
      timeLeft: "02:45:32",
      sold: 78,
      total: 100,
      category: "Audio"
    },
    {
      id: 2,
      name: "4K Gaming Monitor 32\"",
      price: 299.99,
      originalPrice: 499.99,
      image: "/placeholder.svg",
      rating: 4.9,
      reviews: 234,
      discount: 40,
      timeLeft: "01:23:15",
      sold: 45,
      total: 75,
      category: "Monitors"
    },
    {
      id: 3,
      name: "Mechanical RGB Keyboard",
      price: 129.99,
      originalPrice: 199.99,
      image: "/placeholder.svg",
      rating: 4.7,
      reviews: 678,
      discount: 35,
      timeLeft: "03:15:48",
      sold: 92,
      total: 120,
      category: "Accessories"
    },
    {
      id: 4,
      name: "Wireless Gaming Mouse",
      price: 59.99,
      originalPrice: 99.99,
      image: "/placeholder.svg",
      rating: 4.6,
      reviews: 345,
      discount: 40,
      timeLeft: "00:58:22",
      sold: 156,
      total: 200,
      category: "Gaming"
    }
  ];

  const weeklyDeals = [
    {
      id: 5,
      name: "Smart Watch Pro Max",
      price: 249.99,
      originalPrice: 399.99,
      image: "/placeholder.svg",
      rating: 4.8,
      reviews: 892,
      discount: 37,
      category: "Wearables"
    },
    {
      id: 6,
      name: "Portable SSD 2TB",
      price: 189.99,
      originalPrice: 299.99,
      image: "/placeholder.svg",
      rating: 4.9,
      reviews: 567,
      discount: 37,
      category: "Storage"
    },
    {
      id: 7,
      name: "Wireless Charging Stand",
      price: 39.99,
      originalPrice: 69.99,
      image: "/placeholder.svg",
      rating: 4.5,
      reviews: 234,
      discount: 43,
      category: "Accessories"
    },
    {
      id: 8,
      name: "Bluetooth Speaker Pro",
      price: 79.99,
      originalPrice: 129.99,
      image: "/placeholder.svg",
      rating: 4.7,
      reviews: 445,
      discount: 38,
      category: "Audio"
    }
  ];

  const dealCategories = [
    { name: "Electronics", discount: "Up to 60%", count: 245, color: "bg-blue-500" },
    { name: "Gaming", discount: "Up to 45%", count: 123, color: "bg-purple-500" },
    { name: "Audio", discount: "Up to 55%", count: 189, color: "bg-green-500" },
    { name: "Accessories", discount: "Up to 40%", count: 334, color: "bg-orange-500" }
  ];

  return (
    <div className="container mx-auto px-4 py-8 space-y-12">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-2xl p-8 text-center">
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Zap className="text-yellow-500" size={32} />
            <h1 className="text-4xl font-bold text-foreground">Flash Deals</h1>
            <Zap className="text-yellow-500" size={32} />
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Don't miss out on these limited-time offers! Save up to 60% on your favorite tech products.
          </p>
          <div className="flex items-center justify-center gap-4 text-lg font-semibold">
            <Clock className="text-red-500" size={24} />
            <span className="text-red-500">Limited Time Only!</span>
          </div>
        </div>
      </section>

      {/* Deal Categories */}
      <section>
        <h2 className="text-3xl font-bold text-foreground mb-6">Shop by Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {dealCategories.map((category, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className={`${category.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 opacity-80 group-hover:opacity-100 transition-opacity`}>
                  <Percent className="text-white" size={28} />
                </div>
                <h3 className="font-bold text-lg text-foreground mb-2">{category.name}</h3>
                <p className="text-primary font-semibold mb-1">{category.discount}</p>
                <p className="text-sm text-muted-foreground">{category.count} deals available</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Flash Deals */}
      <section>
        <div className="flex items-center gap-3 mb-8">
          <div className="flex items-center gap-2">
            <Zap className="text-yellow-500" size={28} />
            <h2 className="text-3xl font-bold text-foreground">Flash Deals</h2>
          </div>
          <Badge variant="destructive" className="animate-pulse">
            Limited Time!
          </Badge>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {flashDeals.map((deal) => (
            <Card key={deal.id} className="group hover:shadow-elegant transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-red-500 text-white px-3 py-1 rounded-bl-lg font-bold text-sm">
                -{deal.discount}%
              </div>
              
              <CardHeader className="p-0 relative">
                <div className="relative overflow-hidden">
                  <img 
                    src={deal.image} 
                    alt={deal.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-red-500 text-white">Flash Deal</Badge>
                  </div>
                  <div className="absolute top-3 right-12 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button size="icon" variant="secondary" className="w-8 h-8">
                      <Heart size={16} />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="p-4 space-y-3">
                <div>
                  <CardTitle className="text-lg leading-tight mb-1">{deal.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{deal.category}</p>
                </div>
                
                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={14} 
                        className={i < Math.floor(deal.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"} 
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">({deal.reviews})</span>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl font-bold text-primary">${deal.price}</span>
                    <span className="text-sm text-muted-foreground line-through">${deal.originalPrice}</span>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Sold: {deal.sold}/{deal.total}</span>
                      <span className="text-red-500 font-medium">{deal.timeLeft}</span>
                    </div>
                    <Progress value={(deal.sold / deal.total) * 100} className="h-2" />
                  </div>
                </div>
                
                <Button className="w-full bg-red-500 hover:bg-red-600" size="sm">
                  <ShoppingCart size={16} className="mr-2" />
                  Grab Deal Now!
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Weekly Deals */}
      <section>
        <div className="flex items-center gap-3 mb-8">
          <TrendingUp className="text-blue-500" size={28} />
          <h2 className="text-3xl font-bold text-foreground">Weekly Deals</h2>
          <Badge variant="secondary">7 Days Left</Badge>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {weeklyDeals.map((deal) => (
            <Card key={deal.id} className="group hover:shadow-lg transition-all duration-300">
              <CardHeader className="p-0 relative">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img 
                    src={deal.image} 
                    alt={deal.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-blue-500 text-white">Weekly Deal</Badge>
                  </div>
                  <div className="absolute top-3 right-3">
                    <div className="bg-orange-500 text-white px-2 py-1 rounded-full text-sm font-bold">
                      -{deal.discount}%
                    </div>
                  </div>
                  <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button size="icon" variant="secondary" className="w-8 h-8">
                      <Heart size={16} />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="p-4 space-y-3">
                <div>
                  <CardTitle className="text-lg leading-tight mb-1">{deal.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{deal.category}</p>
                </div>
                
                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={14} 
                        className={i < Math.floor(deal.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"} 
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">({deal.reviews})</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className="text-xl font-bold text-primary">${deal.price}</span>
                  <span className="text-sm text-muted-foreground line-through">${deal.originalPrice}</span>
                </div>
                
                <Button className="w-full" size="sm">
                  <ShoppingCart size={16} className="mr-2" />
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="bg-gradient-to-r from-primary/10 to-accent/20 rounded-2xl p-8 text-center">
        <div className="max-w-2xl mx-auto space-y-4">
          <Tag className="text-primary mx-auto" size={40} />
          <h2 className="text-3xl font-bold text-foreground">Never Miss a Deal!</h2>
          <p className="text-muted-foreground text-lg">
            Subscribe to get notified about flash sales, exclusive discounts, and early access to deals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto mt-6">
            <input 
              type="email" 
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border border-border text-foreground bg-background"
            />
            <Button size="lg" className="px-8">
              Get Deals
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            Join 50,000+ subscribers already saving big on tech!
          </p>
        </div>
      </section>
    </div>
  );
};

export default Deals;