import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { 
  Star, 
  ArrowRight, 
  Smartphone, 
  Laptop, 
  Headphones, 
  Camera,
  ShoppingCart,
  Heart
} from "lucide-react";

const Home = () => {
  const featuredProducts = [
    {
      id: 1,
      name: "Wireless Bluetooth Headphones",
      price: 199.99,
      originalPrice: 249.99,
      image: "/placeholder.svg",
      rating: 4.8,
      reviews: 324,
      badge: "Best Seller"
    },
    {
      id: 2,
      name: "4K Ultra HD Webcam",
      price: 129.99,
      originalPrice: 169.99,
      image: "/placeholder.svg",
      rating: 4.6,
      reviews: 189,
      badge: "New"
    },
    {
      id: 3,
      name: "Gaming Mechanical Keyboard",
      price: 89.99,
      originalPrice: 119.99,
      image: "/placeholder.svg",
      rating: 4.9,
      reviews: 512,
      badge: "Hot Deal"
    },
    {
      id: 4,
      name: "Wireless Charging Pad",
      price: 39.99,
      originalPrice: 59.99,
      image: "/placeholder.svg",
      rating: 4.5,
      reviews: 267,
      badge: "Sale"
    },
    {
      id: 5,
      name: "Smart Watch Pro",
      price: 299.99,
      originalPrice: 399.99,
      image: "/placeholder.svg",
      rating: 4.7,
      reviews: 891,
      badge: "Premium"
    },
    {
      id: 6,
      name: "Noise Cancelling Earbuds",
      price: 159.99,
      originalPrice: 199.99,
      image: "/placeholder.svg",
      rating: 4.9,
      reviews: 445,
      badge: "Top Rated"
    },
    {
      id: 7,
      name: "Portable SSD 1TB",
      price: 89.99,
      originalPrice: 129.99,
      image: "/placeholder.svg",
      rating: 4.8,
      reviews: 623,
      badge: "Fast Storage"
    },
    {
      id: 8,
      name: "Wireless Gaming Mouse",
      price: 69.99,
      originalPrice: 89.99,
      image: "/placeholder.svg",
      rating: 4.6,
      reviews: 789,
      badge: "Gaming"
    }
  ];

  const categories = [
    { name: "Smartphones", icon: Smartphone, count: 156 },
    { name: "Laptops", icon: Laptop, count: 89 },
    { name: "Audio", icon: Headphones, count: 234 },
    { name: "Cameras", icon: Camera, count: 78 }
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 to-accent/20 py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight">
                Welcome to <span className="text-primary">BigByte</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Discover the latest in technology and electronics. From cutting-edge gadgets 
                to essential accessories, we have everything you need to stay connected.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild>
                  <Link to="/products">
                    Shop Now <ArrowRight className="ml-2" size={20} />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/categories">
                    Browse Categories
                  </Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="bg-primary/20 rounded-2xl p-8 backdrop-blur-sm">
                <img 
                  src="/placeholder.svg" 
                  alt="Featured Products" 
                  className="w-full h-80 object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold text-foreground">Shop by Category</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our wide range of categories to find exactly what you're looking for
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <Card key={index} className="group hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <category.icon className="text-primary" size={32} />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{category.name}</h3>
                <p className="text-sm text-muted-foreground">{category.count} products</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold text-foreground">Featured Products</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Check out our most popular and highest-rated products
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.slice(0, 8).map((product) => (
            <Card key={product.id} className="group hover:shadow-elegant transition-all duration-300">
              <CardHeader className="p-0 relative">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className="absolute top-3 left-3">{product.badge}</Badge>
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button size="icon" variant="secondary" className="w-8 h-8">
                      <Heart size={16} />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-2">
                  <CardTitle className="text-lg leading-tight">{product.name}</CardTitle>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          size={14} 
                          className={i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"} 
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">({product.reviews})</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xl font-bold text-primary">${product.price}</span>
                    <span className="text-sm text-muted-foreground line-through">${product.originalPrice}</span>
                  </div>
                  <Button className="w-full" size="sm">
                    <ShoppingCart size={16} className="mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trending Section */}
        <div className="mt-16">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold text-foreground">Trending Now</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Don't miss out on these hot deals and trending products
            </p>
          </div>
          <div className="bg-gradient-to-r from-accent/50 to-secondary/50 rounded-2xl p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  Limited Time Offer
                </h3>
                <p className="text-muted-foreground mb-4">
                  Get up to 50% off on selected electronics
                </p>
                <Button variant="premium" size="lg">
                  Shop Sale
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {featuredProducts.slice(4, 6).map((product) => (
                  <Card key={product.id} className="hover:shadow-soft transition-shadow">
                    <CardContent className="p-3">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-24 object-cover rounded mb-2"
                      />
                      <h4 className="font-medium text-sm">{product.name}</h4>
                      <p className="text-primary font-bold">${product.price}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="text-center">
                <div className="bg-primary/10 rounded-full w-32 h-32 flex items-center justify-center mx-auto mb-4">
                  <span className="text-4xl font-bold text-primary">50%</span>
                </div>
                <p className="text-muted-foreground">
                  Maximum discount available
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center mt-12">
          <Button variant="outline" size="lg" asChild>
            <Link to="/products">
              View All Products <ArrowRight className="ml-2" size={20} />
            </Link>
          </Button>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-primary py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl font-bold text-primary-foreground">Stay Updated</h2>
            <p className="text-primary-foreground/80 text-lg">
              Subscribe to our newsletter and be the first to know about new products, 
              exclusive deals, and special offers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 rounded-lg border-0 text-foreground"
              />
              <Button variant="secondary" size="lg" className="px-8">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;