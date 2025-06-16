
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
        <Button variant="ghost" className="text-white hover:bg-gray-700 md:hidden p-1 sm:p-2">
          <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
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
      <div className="bg-gray-800 text-sm py-1 sm:py-2">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 flex justify-between items-center">
          <div className="flex items-center space-x-2 sm:space-x-4">
            <span className="hidden sm:block text-xs sm:text-sm">Deliver to Your Location</span>
            <span className="sm:hidden text-xs">Deliver</span>
          </div>
          <div className="flex items-center space-x-1 sm:space-x-4">
            {user ? (
              <>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="text-white hover:bg-gray-700 text-xs p-1 sm:p-2">
                      <User className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                      <span className="hidden sm:inline">Hello, </span>
                      <span className="truncate max-w-16 sm:max-w-20">
                        {user.user_metadata?.full_name || user.email?.split('@')[0]}
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-48 bg-white" align="end">
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
                <Link to="/orders" className="hover:text-orange-400 text-xs hidden lg:block">
                  Orders & Returns
                </Link>
              </>
            ) : (
              <Link to="/auth">
                <Button variant="ghost" className="text-white hover:bg-gray-700 text-xs p-1 sm:p-2">
                  <User className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                  <span className="text-xs">Sign In</span>
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="py-2 sm:py-4">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 flex items-center justify-between gap-2 sm:gap-4">
          {/* Mobile menu and Logo */}
          <div className="flex items-center space-x-1 sm:space-x-2">
            <MobileNav />
            <Link to="/" className="flex items-center">
              <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-orange-400">ecom</h1>
            </Link>
          </div>

          {/* Search bar - responsive */}
          <SearchDropdown className="flex-1 max-w-sm sm:max-w-xl mx-1 sm:mx-4" />

          {/* Right section */}
          <div className="flex items-center space-x-1 sm:space-x-4">
            <Link to="/orders" className="hidden lg:block">
              <Button variant="ghost" className="text-white hover:bg-gray-700 text-xs p-1 sm:p-2">
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
          <Button variant="ghost" className="text-white hover:bg-gray-600 text-sm">
            <Menu className="h-4 w-4 mr-2" />
            All
          </Button>
          <nav className="flex space-x-4 lg:space-x-6 text-sm">
            <Link to="/todays-deals" className="hover:text-orange-400 whitespace-nowrap">Today's Deals</Link>
            <Link to="/customer-service" className="hover:text-orange-400 whitespace-nowrap">Customer Service</Link>
            <Link to="/registry" className="hover:text-orange-400">Registry</Link>
            <Link to="/gift-cards" className="hover:text-orange-400 whitespace-nowrap">Gift Cards</Link>
            <Link to="/sell" className="hover:text-orange-400">Sell</Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
