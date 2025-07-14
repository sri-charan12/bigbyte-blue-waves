import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useToast } from "@/hooks/use-toast";
import { 
  Search, 
  ShoppingCart, 
  User, 
  Menu, 
  Heart,
  Phone,
  Mail,
  LogOut
} from "lucide-react";

const Header = () => {
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, signOut } = useAuth();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      toast({
        title: "Searching...",
        description: `Looking for "${searchQuery}"`,
      });
    }
  };

  const handleAddToWishlist = () => {
    toast({
      title: "Added to Wishlist",
      description: "Item saved for later",
    });
  };

  const handleProfileClick = () => {
    if (user) {
      navigate("/profile");
    } else {
      navigate("/auth");
    }
  };

  const handleLogout = async () => {
    await signOut();
    toast({
      title: "Signed out",
      description: "You have been successfully signed out.",
    });
    navigate("/");
  };

  return (
    <header className="w-full border-b border-border bg-background shadow-soft">
      {/* Top bar */}
      <div className="bg-gradient-to-r from-primary to-primary-glow text-primary-foreground py-2">
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
            <span>Free shipping on orders over ₹4000!</span>
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
            <Link to="/deals" className="text-foreground hover:text-primary transition-colors">
              Deals
            </Link>
            <Link to="/compare" className="text-foreground hover:text-primary transition-colors">
              Compare
            </Link>
            {user && (
              <Link to="/orders" className="text-foreground hover:text-primary transition-colors">
                My Orders
              </Link>
            )}
            <Link to="/status" className="text-foreground hover:text-primary transition-colors">
              Status
            </Link>
            <Link to="/about" className="text-foreground hover:text-primary transition-colors">
              About
            </Link>
            <Link to="/contact" className="text-foreground hover:text-primary transition-colors">
              Contact
            </Link>
          </nav>

          {/* Search bar */}
          <form onSubmit={handleSearch} className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
              <Input 
                placeholder="Search products..." 
                className="pl-10 bg-secondary border-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </form>

          {/* User actions */}
          <div className="flex items-center space-x-4">
            <Link to="/wishlist">
              <Button 
                variant="ghost" 
                size="icon" 
                className="hidden md:flex relative"
              >
                <Heart size={20} />
                {wishlistCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-4 w-4 rounded-full p-0 text-xs">
                    {wishlistCount}
                  </Badge>
                )}
              </Button>
            </Link>
            
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

            {user ? (
              <div className="hidden md:flex items-center space-x-2">
                {user.email?.includes('admin') && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => navigate("/admin")}
                    title="Admin Panel"
                  >
                    Admin
                  </Button>
                )}
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={handleProfileClick}
                  title="Profile"
                >
                  <User size={20} />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={handleLogout}
                  title="Sign out"
                >
                  <LogOut size={20} />
                </Button>
              </div>
            ) : (
              <Button 
                variant="outline"
                size="sm"
                className="hidden md:flex"
                onClick={() => navigate("/auth")}
              >
                Sign In
              </Button>
            )}

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
                    <Link to="/deals" className="text-foreground hover:text-primary transition-colors py-2">
                      Deals
                    </Link>
                    <Link to="/compare" className="text-foreground hover:text-primary transition-colors py-2">
                      Compare
                    </Link>
                    {user && (
                      <Link to="/orders" className="text-foreground hover:text-primary transition-colors py-2">
                        My Orders
                      </Link>
                    )}
                    <Link to="/status" className="text-foreground hover:text-primary transition-colors py-2">
                      Status
                    </Link>
                    <Link to="/about" className="text-foreground hover:text-primary transition-colors py-2">
                      About
                    </Link>
                    <Link to="/contact" className="text-foreground hover:text-primary transition-colors py-2">
                      Contact
                    </Link>
                    {user?.email?.includes('admin') && (
                      <Link to="/admin" className="text-foreground hover:text-primary transition-colors py-2">
                        Admin Panel
                      </Link>
                    )}
                  </nav>

                  <div className="flex space-x-4 pt-4 border-t">
                    <Button variant="ghost" size="icon">
                      <Heart size={20} />
                    </Button>
                    {user ? (
                      <>
                        <Button variant="ghost" size="icon" onClick={handleProfileClick}>
                          <User size={20} />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={handleLogout}>
                          <LogOut size={20} />
                        </Button>
                      </>
                    ) : (
                      <Button variant="outline" size="sm" onClick={() => navigate("/auth")}>
                        Sign In
                      </Button>
                    )}
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