
import { Search, User, Menu, LogOut, ShoppingBag, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import CartDropdown from './CartDropdown';
import { useIsAdmin } from '@/hooks/useUserRole';

const Header = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const isAdmin = useIsAdmin();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <header className="bg-gray-900 text-white">
      {/* Top bar */}
      <div className="bg-gray-800 text-sm py-2">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <span>Deliver to Your Location</span>
          </div>
          <div className="flex items-center space-x-4">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="text-white hover:bg-gray-700">
                    <User className="h-4 w-4 mr-2" />
                    Hello, {user.user_metadata?.full_name || user.email}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48">
                  <DropdownMenuItem onClick={() => navigate('/orders')}>
                    <ShoppingBag className="h-4 w-4 mr-2" />
                    My Orders
                  </DropdownMenuItem>
                  {isAdmin && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => navigate('/admin')}>
                        <Settings className="h-4 w-4 mr-2" />
                        Admin Dashboard
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/auth">
                <Button variant="ghost" className="text-white hover:bg-gray-700">
                  <User className="h-4 w-4 mr-2" />
                  Sign In
                </Button>
              </Link>
            )}
            <span>Orders & Returns</span>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="py-4">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <h1 className="text-2xl font-bold text-orange-400">amazon</h1>
          </Link>

          {/* Search bar */}
          <div className="flex-1 max-w-2xl mx-8">
            <div className="flex">
              <select className="bg-gray-300 text-black px-3 py-2 rounded-l-md border-r">
                <option>All</option>
                <option>Electronics</option>
                <option>Books</option>
                <option>Clothing</option>
              </select>
              <Input 
                className="flex-1 rounded-none border-0" 
                placeholder="Search Amazon"
              />
              <Button className="bg-orange-400 hover:bg-orange-500 rounded-l-none px-4">
                <Search className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Right section */}
          <div className="flex items-center space-x-6">
            <Button variant="ghost" className="text-white hover:bg-gray-700">
              <span className="text-xs">Returns</span>
              <br />
              <span className="text-sm font-bold">& Orders</span>
            </Button>
            
            <CartDropdown />
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-gray-700 py-2">
        <div className="max-w-7xl mx-auto px-4 flex items-center space-x-6">
          <Button variant="ghost" className="text-white hover:bg-gray-600">
            <Menu className="h-4 w-4 mr-2" />
            All
          </Button>
          <nav className="hidden md:flex space-x-6">
            <a href="#" className="hover:text-orange-400">Today's Deals</a>
            <a href="#" className="hover:text-orange-400">Customer Service</a>
            <a href="#" className="hover:text-orange-400">Registry</a>
            <a href="#" className="hover:text-orange-400">Gift Cards</a>
            <a href="#" className="hover:text-orange-400">Sell</a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
