
import { Search, MapPin, ShoppingCart, Menu, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Header = () => {
  return (
    <header className="bg-gray-900 text-white">
      {/* Top nav bar */}
      <div className="bg-gray-800 px-4 py-2">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-sm">
          <div className="flex items-center space-x-4">
            <span className="hover:underline cursor-pointer">Amazon.com</span>
            <span className="hover:underline cursor-pointer">Today's Deals</span>
            <span className="hover:underline cursor-pointer">Customer Service</span>
            <span className="hover:underline cursor-pointer">Registry</span>
            <span className="hover:underline cursor-pointer">Gift Cards</span>
            <span className="hover:underline cursor-pointer">Sell</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="hover:underline cursor-pointer">English</span>
            <span className="hover:underline cursor-pointer">USD</span>
            <span className="hover:underline cursor-pointer">Sign In</span>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="px-4 py-2">
        <div className="max-w-7xl mx-auto flex items-center space-x-4">
          {/* Logo */}
          <div className="flex-shrink-0">
            <img src="/api/placeholder/120/40" alt="Amazon" className="h-8 w-auto" />
          </div>

          {/* Location */}
          <div className="flex items-center space-x-1 hover:outline hover:outline-1 hover:outline-white p-2 cursor-pointer">
            <MapPin className="h-4 w-4" />
            <div className="text-xs">
              <div className="text-gray-300">Deliver to</div>
              <div className="font-bold">New York 10001</div>
            </div>
          </div>

          {/* Search bar */}
          <div className="flex-1 flex">
            <select className="bg-gray-200 text-gray-800 px-3 py-2 rounded-l-md border-0 focus:outline-none">
              <option>All</option>
              <option>Electronics</option>
              <option>Books</option>
              <option>Clothing</option>
              <option>Home</option>
            </select>
            <Input 
              className="flex-1 rounded-none border-0 focus:outline-none focus:ring-2 focus:ring-orange-400" 
              placeholder="Search Amazon"
            />
            <Button className="bg-orange-400 hover:bg-orange-500 rounded-r-md rounded-l-none px-4">
              <Search className="h-4 w-4" />
            </Button>
          </div>

          {/* Right side items */}
          <div className="flex items-center space-x-6">
            {/* Language */}
            <div className="flex items-center hover:outline hover:outline-1 hover:outline-white p-2 cursor-pointer">
              <img src="/api/placeholder/24/16" alt="US Flag" className="w-6 h-4 mr-1" />
              <span className="text-sm font-bold">EN</span>
            </div>

            {/* Account */}
            <div className="hover:outline hover:outline-1 hover:outline-white p-2 cursor-pointer">
              <div className="text-xs">Hello, sign in</div>
              <div className="font-bold text-sm">Account & Lists</div>
            </div>

            {/* Returns */}
            <div className="hover:outline hover:outline-1 hover:outline-white p-2 cursor-pointer">
              <div className="text-xs">Returns</div>
              <div className="font-bold text-sm">& Orders</div>
            </div>

            {/* Cart */}
            <div className="flex items-center hover:outline hover:outline-1 hover:outline-white p-2 cursor-pointer">
              <div className="relative">
                <ShoppingCart className="h-8 w-8" />
                <span className="absolute -top-1 -right-1 bg-orange-400 text-black text-xs font-bold px-1 rounded-full">0</span>
              </div>
              <span className="ml-1 font-bold">Cart</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom nav */}
      <div className="bg-gray-700 px-4 py-2">
        <div className="max-w-7xl mx-auto flex items-center space-x-6 text-sm">
          <div className="flex items-center space-x-1 hover:outline hover:outline-1 hover:outline-white p-1 cursor-pointer">
            <Menu className="h-4 w-4" />
            <span className="font-bold">All</span>
          </div>
          <span className="hover:outline hover:outline-1 hover:outline-white p-1 cursor-pointer">Today's Deals</span>
          <span className="hover:outline hover:outline-1 hover:outline-white p-1 cursor-pointer">Customer Service</span>
          <span className="hover:outline hover:outline-1 hover:outline-white p-1 cursor-pointer">Registry</span>
          <span className="hover:outline hover:outline-1 hover:outline-white p-1 cursor-pointer">Gift Cards</span>
          <span className="hover:outline hover:outline-1 hover:outline-white p-1 cursor-pointer">Sell</span>
          <span className="hover:outline hover:outline-1 hover:outline-white p-1 cursor-pointer">Best Sellers</span>
          <span className="hover:outline hover:outline-1 hover:outline-white p-1 cursor-pointer">Amazon Basics</span>
          <span className="hover:outline hover:outline-1 hover:outline-white p-1 cursor-pointer">Prime Video</span>
          <span className="hover:outline hover:outline-1 hover:outline-white p-1 cursor-pointer">New Releases</span>
          <span className="hover:outline hover:outline-1 hover:outline-white p-1 cursor-pointer">Music</span>
          <span className="hover:outline hover:outline-1 hover:outline-white p-1 cursor-pointer">Books</span>
          <span className="hover:outline hover:outline-1 hover:outline-white p-1 cursor-pointer">Amazon Home</span>
          <span className="hover:outline hover:outline-1 hover:outline-white p-1 cursor-pointer">Computers</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
