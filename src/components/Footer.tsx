import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  Shield,
  Truck
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-secondary to-accent mt-16 shadow-elegant">
      {/* Features section */}
      <div className="border-b border-border">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center space-x-4">
              <div className="bg-primary text-primary-foreground p-3 rounded-full">
                <Truck size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Free Shipping</h3>
                <p className="text-muted-foreground text-sm">On orders over ₹4000</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="bg-primary text-primary-foreground p-3 rounded-full">
                <Shield size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Secure Payment</h3>
                <p className="text-muted-foreground text-sm">100% secure transactions</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="bg-primary text-primary-foreground p-3 rounded-full">
                <CreditCard size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Easy Returns</h3>
                <p className="text-muted-foreground text-sm">30-day return policy</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-primary text-primary-foreground px-3 py-2 rounded-lg font-bold text-xl">
                BigByte
              </div>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Your trusted partner for high-quality electronics and gadgets. 
              We deliver excellence in every product we offer.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
                <Facebook size={20} />
              </Button>
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
                <Twitter size={20} />
              </Button>
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
                <Instagram size={20} />
              </Button>
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
                <Youtube size={20} />
              </Button>
            </div>
          </div>

          {/* Quick links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Quick Links</h3>
            <div className="space-y-2">
              <Link to="/products" className="block text-muted-foreground hover:text-primary transition-colors text-sm">
                All Products
              </Link>
              <Link to="/categories" className="block text-muted-foreground hover:text-primary transition-colors text-sm">
                Categories
              </Link>
              <Link to="/deals" className="block text-muted-foreground hover:text-primary transition-colors text-sm">
                Special Deals
              </Link>
              <Link to="/new-arrivals" className="block text-muted-foreground hover:text-primary transition-colors text-sm">
                New Arrivals
              </Link>
              <Link to="/bestsellers" className="block text-muted-foreground hover:text-primary transition-colors text-sm">
                Best Sellers
              </Link>
            </div>
          </div>

          {/* Customer service */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Customer Service</h3>
            <div className="space-y-2">
              <Link to="/contact" className="block text-muted-foreground hover:text-primary transition-colors text-sm">
                Contact Us
              </Link>
              <Link to="/shipping" className="block text-muted-foreground hover:text-primary transition-colors text-sm">
                Shipping Info
              </Link>
              <Link to="/returns" className="block text-muted-foreground hover:text-primary transition-colors text-sm">
                Returns & Exchanges
              </Link>
              <Link to="/faq" className="block text-muted-foreground hover:text-primary transition-colors text-sm">
                FAQ
              </Link>
              <Link to="/support" className="block text-muted-foreground hover:text-primary transition-colors text-sm">
                Support Center
              </Link>
            </div>
          </div>

          {/* Contact & Newsletter */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Get In Touch</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                <MapPin size={16} />
                <span>123 Tech Street, Digital City, DC 12345</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                <Phone size={16} />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                <Mail size={16} />
                <span>support@bigbyte.com</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium text-foreground text-sm">Newsletter</h4>
              <p className="text-muted-foreground text-xs">
                Subscribe for updates and exclusive offers
              </p>
              <div className="flex space-x-2">
                <Input 
                  placeholder="Enter your email" 
                  className="text-sm"
                />
                <Button size="sm" className="px-3">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Separator />

      {/* Bottom footer */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm text-muted-foreground">
            © 2024 BigByte. All rights reserved.
          </div>
          <div className="flex items-center space-x-6 text-sm text-muted-foreground">
            <Link to="/privacy" className="hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-primary transition-colors">
              Terms of Service
            </Link>
            <Link to="/cookies" className="hover:text-primary transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;