import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { 
  Search, 
  ShoppingCart, 
  User, 
  Menu, 
  Heart,
  Phone,
  Mail
} from "lucide-react";

const Header = () => {
  const [cartCount] = useState(3);

  return (
    <header className="w-full border-b border-border bg-background">
      {/* Top bar */}
      <div className="bg-primary text-primary-foreground py-2">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Phone size={14} />
              <span>+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail size={14} />
              <span>support@bigbyte.com</span>
            </div>
          </div>
          <div className="hidden md:block">
            <span>Free shipping on orders over $50!</span>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-primary text-primary-foreground px-3 py-2 rounded-lg font-bold text-xl">
              BigByte
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-foreground hover:text-primary transition-colors">
              Home
            </Link>
            <Link to="/products" className="text-foreground hover:text-primary transition-colors">
              Products
            </Link>
            <Link to="/categories" className="text-foreground hover:text-primary transition-colors">
              Categories
            </Link>
            <Link to="/about" className="text-foreground hover:text-primary transition-colors">
              About
            </Link>
            <Link to="/contact" className="text-foreground hover:text-primary transition-colors">
              Contact
            </Link>
          </nav>

          {/* Search bar */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
              <Input 
                placeholder="Search products..." 
                className="pl-10 bg-secondary border-none"
              />
            </div>
          </div>

          {/* User actions */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Heart size={20} />
            </Button>
            
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart size={20} />
                {cartCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 text-xs">
                    {cartCount}
                  </Badge>
                )}
              </Button>
            </Link>

            <Button variant="ghost" size="icon" className="hidden md:flex">
              <User size={20} />
            </Button>

            {/* Mobile menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu size={20} />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col space-y-4 mt-8">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                    <Input 
                      placeholder="Search products..." 
                      className="pl-10"
                    />
                  </div>
                  
                  <nav className="flex flex-col space-y-4">
                    <Link to="/" className="text-foreground hover:text-primary transition-colors py-2">
                      Home
                    </Link>
                    <Link to="/products" className="text-foreground hover:text-primary transition-colors py-2">
                      Products
                    </Link>
                    <Link to="/categories" className="text-foreground hover:text-primary transition-colors py-2">
                      Categories
                    </Link>
                    <Link to="/about" className="text-foreground hover:text-primary transition-colors py-2">
                      About
                    </Link>
                    <Link to="/contact" className="text-foreground hover:text-primary transition-colors py-2">
                      Contact
                    </Link>
                  </nav>

                  <div className="flex space-x-4 pt-4 border-t">
                    <Button variant="ghost" size="icon">
                      <Heart size={20} />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <User size={20} />
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;