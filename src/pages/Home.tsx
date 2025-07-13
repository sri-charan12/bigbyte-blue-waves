import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Star, 
  ArrowRight, 
  Smartphone, 
  Laptop, 
  Headphones, 
  Camera,
  ShoppingCart,
  Heart,
  Shield,
  Truck,
  Clock,
  Award,
  Users,
  TrendingUp,
  MessageCircle,
  Quote,
  CheckCircle,
  Zap,
  Globe,
  Gift
} from "lucide-react";

// Import product images
import heroTechImage from "@/assets/hero-tech.jpg";
import headphonesWirelessImage from "@/assets/headphones-wireless.jpg";
import webcam4kImage from "@/assets/webcam-4k.jpg";
import keyboardGamingImage from "@/assets/keyboard-gaming.jpg";
import chargingPadImage from "@/assets/charging-pad.jpg";
import smartwatchProImage from "@/assets/smartwatch-pro.jpg";
import earbudsNoiseCancellingImage from "@/assets/earbuds-noise-cancelling.jpg";
import ssdPortableImage from "@/assets/ssd-portable.jpg";
import mouseGamingImage from "@/assets/mouse-gaming.jpg";

const Home = () => {
  const { user } = useAuth();
  const featuredProducts = [
    {
      id: 1,
      name: "Wireless Bluetooth Headphones",
      price: 16499,
      originalPrice: 20599,
      image: headphonesWirelessImage,
      rating: 4.8,
      reviews: 324,
      badge: "Best Seller"
    },
    {
      id: 2,
      name: "4K Ultra HD Webcam",
      price: 10799,
      originalPrice: 14099,
      image: webcam4kImage,
      rating: 4.6,
      reviews: 189,
      badge: "New"
    },
    {
      id: 3,
      name: "Gaming Mechanical Keyboard",
      price: 7499,
      originalPrice: 9999,
      image: keyboardGamingImage,
      rating: 4.9,
      reviews: 512,
      badge: "Hot Deal"
    },
    {
      id: 4,
      name: "Wireless Charging Pad",
      price: 3299,
      originalPrice: 4999,
      image: chargingPadImage,
      rating: 4.5,
      reviews: 267,
      badge: "Sale"
    },
    {
      id: 5,
      name: "Smart Watch Pro",
      price: 24999,
      originalPrice: 33299,
      image: smartwatchProImage,
      rating: 4.7,
      reviews: 891,
      badge: "Premium"
    },
    {
      id: 6,
      name: "Noise Cancelling Earbuds",
      price: 13299,
      originalPrice: 16699,
      image: earbudsNoiseCancellingImage,
      rating: 4.9,
      reviews: 445,
      badge: "Top Rated"
    },
    {
      id: 7,
      name: "Portable SSD 1TB",
      price: 7499,
      originalPrice: 10799,
      image: ssdPortableImage,
      rating: 4.8,
      reviews: 623,
      badge: "Fast Storage"
    },
    {
      id: 8,
      name: "Wireless Gaming Mouse",
      price: 5799,
      originalPrice: 7499,
      image: mouseGamingImage,
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
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-90"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent)] pointer-events-none"></div>
        <div className="relative container mx-auto px-4 py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 slide-in-up">
              <div className="space-y-6">
                <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight animate-bounce-in-scale">
                  Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-200 floating pulse-glow animate-shimmer">BigByte</span>
                </h1>
                <p className="text-xl text-white/90 leading-relaxed max-w-xl">
                  Discover the latest in technology and electronics. From cutting-edge gadgets 
                  to essential accessories, we have everything you need to stay connected.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="shadow-glow hover:shadow-elegant transition-all duration-300 transform hover:scale-105 pulse-glow animate-bounce-in" asChild>
                  <Link to="/products">
                    Shop Now <ArrowRight className="ml-2" size={20} />
                  </Link>
                </Button>
                {user ? (
                  <Button variant="outline" size="lg" className="bg-white/10 border-white/20 text-white hover:bg-white hover:text-primary transition-all duration-300" asChild>
                    <Link to="/profile">
                      My Profile
                    </Link>
                  </Button>
                ) : (
                  <Button variant="outline" size="lg" className="bg-white/10 border-white/20 text-white hover:bg-white hover:text-primary transition-all duration-300" asChild>
                    <Link to="/auth">
                      Sign In
                    </Link>
                  </Button>
                )}
              </div>
            </div>
            <div className="relative slide-in-up stagger-2">
              <div className="absolute inset-0 bg-white/10 rounded-2xl backdrop-blur-sm pulse-glow animate-rotate-in"></div>
              <div className="relative bg-white/5 rounded-2xl p-8 backdrop-blur-sm border border-white/20">
                <img 
                  src={heroTechImage} 
                  alt="Featured Products" 
                  className="w-full h-80 object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            { icon: Truck, title: "Free Shipping", desc: "On orders over ₹4,000" },
            { icon: Shield, title: "Secure Payment", desc: "100% protected transactions" },
            { icon: Clock, title: "Fast Delivery", desc: "Same day delivery available" },
            { icon: Award, title: "Quality Guarantee", desc: "Premium products only" }
          ].map((feature, index) => (
            <div key={index} className={`text-center space-y-4 animate-fade-in stagger-${index + 1}`}>
                 <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto transition-all duration-300 hover:bg-primary/20 hover:scale-110 pulse-glow floating">
                <feature.icon className="text-primary animate-bounce-in" size={32} />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center space-y-4 mb-12 animate-fade-in">
          <h2 className="text-4xl font-bold text-foreground">Shop by Category</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our wide range of categories to find exactly what you're looking for
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <Card key={index} className={`group hover:shadow-elegant transition-all duration-300 cursor-pointer transform hover:scale-105 animate-scale-in stagger-${index + 1}`}>
              <CardContent className="p-6 text-center">
                <div className="gradient-card w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:shadow-soft transition-all duration-300">
                  <category.icon className="text-primary transition-transform duration-300 group-hover:scale-110" size={32} />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{category.name}</h3>
                <p className="text-sm text-muted-foreground">{category.count} products</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center space-y-4 mb-12 animate-fade-in">
          <h2 className="text-4xl font-bold text-foreground">Featured Products</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Check out our most popular and highest-rated products
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.slice(0, 8).map((product, index) => (
            <Card key={product.id} className={`group hover:shadow-elegant transition-all duration-300 transform hover:scale-105 animate-slide-up stagger-${(index % 4) + 1}`}>
              <CardHeader className="p-0 relative overflow-hidden">
                <div className="relative overflow-hidden rounded-t-lg group-hover:shadow-soft transition-all duration-300">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <Badge className="absolute top-3 left-3 shadow-soft animate-bounce-in">{product.badge}</Badge>
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <Button 
                    size="icon" 
                    variant="secondary" 
                    className="w-8 h-8 shadow-soft hover:shadow-elegant transition-all duration-300"
                    onClick={() => {
                      // Add to wishlist functionality
                      console.log('Added to wishlist:', product.name);
                      // You can add toast notification here
                    }}
                  >
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
                     <span className="text-xl font-bold text-primary">₹{product.price.toLocaleString('en-IN')}</span>
                     <span className="text-sm text-muted-foreground line-through">₹{product.originalPrice.toLocaleString('en-IN')}</span>
                   </div>
                  <Button 
                    className="w-full shadow-soft hover:shadow-elegant transition-all duration-300 transform hover:scale-105" 
                    size="sm"
                    onClick={() => {
                      // Add to cart functionality
                      console.log('Added to cart:', product.name);
                      // You can add toast notification here
                    }}
                  >
                    <ShoppingCart size={16} className="mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Statistics Section */}
        <div className="mt-20 py-16 bg-gradient-to-r from-primary/5 to-accent/10 rounded-3xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { icon: Users, number: "50K+", label: "Happy Customers" },
              { icon: Award, number: "1000+", label: "Products" },
              { icon: Globe, number: "25+", label: "Cities" },
              { icon: TrendingUp, number: "99%", label: "Satisfaction Rate" }
            ].map((stat, index) => (
              <div key={index} className={`space-y-3 animate-bounce-in-scale stagger-${index + 1}`}>
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto floating pulse-glow">
                  <stat.icon className="text-primary animate-rotate-in" size={32} />
                </div>
                <h3 className="text-3xl font-bold text-primary">{stat.number}</h3>
                <p className="text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Trending Section */}
        <div className="mt-16">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold text-foreground">Trending Now</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Don't miss out on these hot deals and trending products
            </p>
          </div>
          <div className="gradient-primary rounded-3xl p-8 text-white shadow-elegant">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              <div className="text-center md:text-left space-y-4">
                <h3 className="text-3xl font-bold">
                  Limited Time Offer
                </h3>
                <p className="text-white/90 text-lg">
                  Get up to 50% off on selected electronics
                </p>
                <Button variant="secondary" size="lg" className="shadow-soft hover:shadow-elegant transition-all duration-300 transform hover:scale-105" asChild>
                  <Link to="/deals">
                    Shop Sale <Gift className="ml-2" size={20} />
                  </Link>
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {featuredProducts.slice(4, 6).map((product) => (
                  <Card key={product.id} className="hover:shadow-soft transition-all duration-300 transform hover:scale-105 bg-white/10 border-white/20">
                    <CardContent className="p-3">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-24 object-cover rounded mb-2"
                      />
                      <h4 className="font-medium text-sm text-white">{product.name}</h4>
                      <p className="text-white font-bold">₹{product.price.toLocaleString('en-IN')}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="text-center">
                <div className="bg-white/20 rounded-full w-32 h-32 flex items-center justify-center mx-auto mb-4 pulse-glow">
                  <span className="text-5xl font-bold text-white">50%</span>
                </div>
                <p className="text-white/90 text-lg">
                  Maximum discount available
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="shadow-soft hover:shadow-elegant transition-all duration-300" asChild>
            <Link to="/products">
              View All Products <ArrowRight className="ml-2" size={20} />
            </Link>
          </Button>
        </div>
      </section>


      {/* Why Choose Us Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="bg-gradient-to-br from-primary/5 to-accent/10 rounded-3xl p-12">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-4xl font-bold text-foreground">Why Choose BigByte?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We're committed to providing the best shopping experience with premium products and exceptional service
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: "Lightning Fast",
                description: "Quick delivery and instant customer support for all your needs"
              },
              {
                icon: Shield,
                title: "100% Secure",
                description: "Your data and payments are protected with enterprise-grade security"
              },
              {
                icon: Award,
                title: "Premium Quality",
                description: "Only the best products from trusted brands and manufacturers"
              },
              {
                icon: Users,
                title: "Expert Support",
                description: "Our knowledgeable team is here to help you make the right choice"
              },
              {
                icon: CheckCircle,
                title: "Verified Products",
                description: "All items are authentic and come with manufacturer warranty"
              },
              {
                icon: Globe,
                title: "Nationwide Delivery",
                description: "We deliver across India with tracking and insurance included"
              }
            ].map((feature, index) => (
              <div key={index} className={`text-center space-y-4 animate-fade-in stagger-${(index % 3) + 1}`}>
                 <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto transition-all duration-300 hover:bg-primary/20 hover:scale-110 hover:shadow-soft floating">
                  <feature.icon className="text-primary animate-bounce-in-scale" size={32} />
                </div>
                <h3 className="text-xl font-semibold text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="gradient-primary py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.1),transparent)] pointer-events-none"></div>
        <div className="relative container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl font-bold text-white">Stay Updated with BigByte</h2>
              <p className="text-white/90 text-lg">
                Subscribe to our newsletter and be the first to know about new products, 
                exclusive deals, and special offers.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email address"
                className="flex-1 px-6 py-4 rounded-xl border-0 text-foreground shadow-soft focus:shadow-elegant transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <Button variant="secondary" size="lg" className="px-8 shadow-soft hover:shadow-elegant transition-all duration-300 transform hover:scale-105">
                Subscribe <ArrowRight className="ml-2" size={20} />
              </Button>
            </div>
            <div className="flex justify-center space-x-6 pt-4">
              {[
                { icon: MessageCircle, count: "24/7" },
                { icon: Users, count: "50K+" },
                { icon: Award, count: "99%" }
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <item.icon className="text-white mx-auto mb-2" size={24} />
                  <p className="text-white font-semibold">{item.count}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;