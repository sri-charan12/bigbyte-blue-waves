import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Star, 
  Search, 
  Filter,
  ShoppingCart,
  Heart,
  Grid3X3,
  List
} from "lucide-react";

const Products = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  
  const products = [
    {
      id: 1,
      name: "Wireless Bluetooth Headphones",
      price: 199.99,
      originalPrice: 249.99,
      image: "/placeholder.svg",
      rating: 4.8,
      reviews: 324,
      badge: "Best Seller",
      category: "Audio",
      inStock: true
    },
    {
      id: 2,
      name: "4K Ultra HD Webcam",
      price: 129.99,
      originalPrice: 169.99,
      image: "/placeholder.svg",
      rating: 4.6,
      reviews: 189,
      badge: "New",
      category: "Cameras",
      inStock: true
    },
    {
      id: 3,
      name: "Gaming Mechanical Keyboard",
      price: 89.99,
      originalPrice: 119.99,
      image: "/placeholder.svg",
      rating: 4.9,
      reviews: 512,
      badge: "Hot Deal",
      category: "Accessories",
      inStock: true
    },
    {
      id: 4,
      name: "Wireless Charging Pad",
      price: 39.99,
      originalPrice: 59.99,
      image: "/placeholder.svg",
      rating: 4.5,
      reviews: 267,
      badge: "Sale",
      category: "Accessories",
      inStock: false
    },
    {
      id: 5,
      name: "Premium Laptop Stand",
      price: 79.99,
      originalPrice: 99.99,
      image: "/placeholder.svg",
      rating: 4.7,
      reviews: 145,
      badge: "",
      category: "Accessories",
      inStock: true
    },
    {
      id: 6,
      name: "Smartphone 128GB",
      price: 699.99,
      originalPrice: 799.99,
      image: "/placeholder.svg",
      rating: 4.4,
      reviews: 892,
      badge: "Popular",
      category: "Smartphones",
      inStock: true
    }
  ];

  const categories = ["All", "Audio", "Cameras", "Accessories", "Smartphones", "Laptops"];
  const priceRanges = [
    "Under $50",
    "$50 - $100",
    "$100 - $200",
    "$200 - $500",
    "$500+"
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <section className="gradient-hero py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent)] pointer-events-none"></div>
        <div className="relative container mx-auto px-4 text-center">
          <div className="space-y-4 animate-fade-in-up">
            <h1 className="text-4xl lg:text-5xl font-bold text-white floating">
              Explore Our Products
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto animate-fade-in-up stagger-1">
              Discover cutting-edge technology and premium electronics
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 animate-slide-in-left">
            <div>
              <h2 className="text-2xl font-bold text-foreground">All Products</h2>
              <p className="text-muted-foreground">Discover our complete collection of tech products</p>
            </div>
            <div className="flex items-center gap-2 animate-slide-in-right">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("grid")}
                className="transition-all duration-300 hover:scale-110"
              >
                <Grid3X3 size={18} />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("list")}
                className="transition-all duration-300 hover:scale-110"
              >
                <List size={18} />
              </Button>
            </div>
          </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1 space-y-6 animate-slide-in-left">
            <Card className="hover-glow transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter size={20} />
                  Filters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Search */}
                <div className="space-y-2">
                  <Label htmlFor="search">Search Products</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
                    <Input id="search" placeholder="Search..." className="pl-9" />
                  </div>
                </div>

                {/* Categories */}
                <div className="space-y-3">
                  <Label>Categories</Label>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <div key={category} className="flex items-center space-x-2">
                        <Checkbox id={category} />
                        <Label htmlFor={category} className="text-sm font-normal cursor-pointer">
                          {category}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div className="space-y-3">
                  <Label>Price Range</Label>
                  <div className="space-y-2">
                    {priceRanges.map((range) => (
                      <div key={range} className="flex items-center space-x-2">
                        <Checkbox id={range} />
                        <Label htmlFor={range} className="text-sm font-normal cursor-pointer">
                          {range}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Rating */}
                <div className="space-y-3">
                  <Label>Rating</Label>
                  <div className="space-y-2">
                    {[4, 3, 2, 1].map((rating) => (
                      <div key={rating} className="flex items-center space-x-2">
                        <Checkbox id={`rating-${rating}`} />
                        <Label htmlFor={`rating-${rating}`} className="flex items-center space-x-1 text-sm font-normal cursor-pointer">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                size={14} 
                                className={i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"} 
                              />
                            ))}
                          </div>
                          <span>& up</span>
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Availability */}
                <div className="space-y-3">
                  <Label>Availability</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="in-stock" />
                      <Label htmlFor="in-stock" className="text-sm font-normal cursor-pointer">
                        In Stock
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="out-of-stock" />
                      <Label htmlFor="out-of-stock" className="text-sm font-normal cursor-pointer">
                        Out of Stock
                      </Label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            <div className="flex justify-between items-center mb-6">
              <p className="text-muted-foreground">
                Showing {products.length} of {products.length} products
              </p>
              <Select defaultValue="popular">
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="newest">Newest First</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className={viewMode === "grid" 
              ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" 
              : "space-y-4"
            }>
              {products.map((product, index) => (
                <Card key={product.id} className={`group hover:shadow-elegant transition-all duration-500 transform hover:scale-105 hover-glow animate-fade-in-up stagger-${(index % 3) + 1} ${!product.inStock ? 'opacity-75' : ''}`}>
                  {viewMode === "grid" ? (
                    <>
                      <CardHeader className="p-0 relative">
                        <div className="relative overflow-hidden rounded-t-lg">
                          <img 
                            src={product.image} 
                            alt={product.name}
                            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          {product.badge && <Badge className="absolute top-3 left-3">{product.badge}</Badge>}
                          {!product.inStock && (
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                              <Badge variant="destructive">Out of Stock</Badge>
                            </div>
                          )}
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
                          <p className="text-sm text-muted-foreground">{product.category}</p>
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
                            {product.originalPrice > product.price && (
                              <span className="text-sm text-muted-foreground line-through">${product.originalPrice}</span>
                            )}
                          </div>
                          <Button className="w-full" size="sm" disabled={!product.inStock}>
                            <ShoppingCart size={16} className="mr-2" />
                            {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                          </Button>
                        </div>
                      </CardContent>
                    </>
                  ) : (
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        <div className="relative">
                          <img 
                            src={product.image} 
                            alt={product.name}
                            className="w-24 h-24 object-cover rounded-lg"
                          />
                          {!product.inStock && (
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg">
                              <Badge variant="destructive" className="text-xs">Out</Badge>
                            </div>
                          )}
                        </div>
                        <div className="flex-1 space-y-2">
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle className="text-lg">{product.name}</CardTitle>
                              <p className="text-sm text-muted-foreground">{product.category}</p>
                            </div>
                            <Button size="icon" variant="ghost">
                              <Heart size={16} />
                            </Button>
                          </div>
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
                            {product.badge && <Badge>{product.badge}</Badge>}
                          </div>
                          <div className="flex justify-between items-center">
                            <div className="flex items-center space-x-2">
                              <span className="text-xl font-bold text-primary">${product.price}</span>
                              {product.originalPrice > product.price && (
                                <span className="text-sm text-muted-foreground line-through">${product.originalPrice}</span>
                              )}
                            </div>
                            <Button size="sm" disabled={!product.inStock}>
                              <ShoppingCart size={16} className="mr-2" />
                              {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-12">
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">Previous</Button>
                <Button size="sm">1</Button>
                <Button variant="outline" size="sm">2</Button>
                <Button variant="outline" size="sm">3</Button>
                <Button variant="outline" size="sm">Next</Button>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;