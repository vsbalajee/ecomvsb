
import { User, Menu, LogOut, ShoppingBag, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import CartDropdown from './CartDropdown';
import SearchDropdown from './SearchDropdown';
import { useIsAdmin } from '@/hooks/useUserRole';
import { useIsMobile } from '@/hooks/use-mobile';

const Header = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const isAdmin = useIsAdmin();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const MobileNav = () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" className="text-white hover:bg-gray-700 md:hidden">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-80 bg-gray-900 text-white border-gray-700">
        <div className="flex flex-col space-y-4 mt-6">
          <Link to="/todays-deals" className="text-lg hover:text-orange-400 py-2">Today's Deals</Link>
          <Link to="/customer-service" className="text-lg hover:text-orange-400 py-2">Customer Service</Link>
          <Link to="/registry" className="text-lg hover:text-orange-400 py-2">Registry</Link>
          <Link to="/gift-cards" className="text-lg hover:text-orange-400 py-2">Gift Cards</Link>
          <Link to="/sell" className="text-lg hover:text-orange-400 py-2">Sell</Link>
          <Link to="/orders" className="text-lg hover:text-orange-400 py-2">Orders & Returns</Link>
        </div>
      </SheetContent>
    </Sheet>
  );

  return (
    <header className="bg-gray-900 text-white">
      {/* Top bar */}
      <div className="bg-gray-800 text-sm py-2">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <span className="hidden sm:block">Deliver to Your Location</span>
            <span className="sm:hidden">Deliver</span>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-4">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="text-white hover:bg-gray-700 text-xs sm:text-sm">
                    <User className="h-4 w-4 mr-1 sm:mr-2" />
                    <span className="hidden sm:inline">Hello, </span>
                    <span className="truncate max-w-20 sm:max-w-none">
                      {user.user_metadata?.full_name || user.email}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48 bg-white">
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
                <Button variant="ghost" className="text-white hover:bg-gray-700 text-xs sm:text-sm">
                  <User className="h-4 w-4 mr-1 sm:mr-2" />
                  Sign In
                </Button>
              </Link>
            )}
            <Link to="/orders" className="hover:text-orange-400 text-xs sm:text-sm hidden sm:block">
              Orders & Returns
            </Link>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="py-2 sm:py-4">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          {/* Mobile menu and Logo */}
          <div className="flex items-center space-x-2">
            <MobileNav />
            <Link to="/" className="flex items-center">
              <h1 className="text-xl sm:text-2xl font-bold text-orange-400">amazon</h1>
            </Link>
          </div>

          {/* Search bar with dropdown */}
          <SearchDropdown className="flex-1 max-w-xl mx-2 sm:mx-8" />

          {/* Right section */}
          <div className="flex items-center space-x-2 sm:space-x-6">
            <Link to="/orders" className="hidden md:block">
              <Button variant="ghost" className="text-white hover:bg-gray-700 text-xs">
                <span className="block text-xs">Returns</span>
                <span className="block text-sm font-bold">& Orders</span>
              </Button>
            </Link>
            
            <CartDropdown />
          </div>
        </div>
      </div>

      {/* Navigation - Desktop only */}
      <div className="bg-gray-700 py-2 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 flex items-center space-x-6">
          <Button variant="ghost" className="text-white hover:bg-gray-600">
            <Menu className="h-4 w-4 mr-2" />
            All
          </Button>
          <nav className="flex space-x-6">
            <Link to="/todays-deals" className="hover:text-orange-400">Today's Deals</Link>
            <Link to="/customer-service" className="hover:text-orange-400">Customer Service</Link>
            <Link to="/registry" className="hover:text-orange-400">Registry</Link>
            <Link to="/gift-cards" className="hover:text-orange-400">Gift Cards</Link>
            <Link to="/sell" className="hover:text-orange-400">Sell</Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
