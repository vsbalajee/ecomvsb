
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-12">
      {/* Back to top */}
      <div 
        className="bg-gray-700 py-4 text-center cursor-pointer hover:bg-gray-600"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <span className="text-sm">Back to top</span>
      </div>

      {/* Main footer content */}
      <div className="px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Get to Know Us */}
            <div>
              <h3 className="font-bold text-white mb-4">Get to Know Us</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/careers" className="text-gray-300 hover:underline">Careers</Link></li>
                <li><Link to="/blog" className="text-gray-300 hover:underline">Blog</Link></li>
                <li><Link to="/about" className="text-gray-300 hover:underline">About ECOM</Link></li>
                <li><Link to="/sell" className="text-gray-300 hover:underline">Investor Relations</Link></li>
                <li><Link to="/" className="text-gray-300 hover:underline">ECOM Devices</Link></li>
                <li><Link to="/blog" className="text-gray-300 hover:underline">ECOM Science</Link></li>
              </ul>
            </div>

            {/* Make Money with Us */}
            <div>
              <h3 className="font-bold text-white mb-4">Make Money with Us</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/sell" className="text-gray-300 hover:underline">Sell products on ECOM</Link></li>
                <li><Link to="/sell" className="text-gray-300 hover:underline">Sell on ECOM Business</Link></li>
                <li><Link to="/sell" className="text-gray-300 hover:underline">Sell apps on ECOM</Link></li>
                <li><Link to="/sell" className="text-gray-300 hover:underline">Become an Affiliate</Link></li>
                <li><Link to="/sell" className="text-gray-300 hover:underline">Advertise Your Products</Link></li>
                <li><Link to="/sell" className="text-gray-300 hover:underline">Self-Publish with Us</Link></li>
                <li><Link to="/sell" className="text-gray-300 hover:underline">Host an ECOM Hub</Link></li>
              </ul>
            </div>

            {/* ECOM Payment Products */}
            <div>
              <h3 className="font-bold text-white mb-4">ECOM Payment Products</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/gift-cards" className="text-gray-300 hover:underline">ECOM Business Card</Link></li>
                <li><Link to="/gift-cards" className="text-gray-300 hover:underline">Shop with Points</Link></li>
                <li><Link to="/gift-cards" className="text-gray-300 hover:underline">Reload Your Balance</Link></li>
                <li><Link to="/gift-cards" className="text-gray-300 hover:underline">ECOM Currency Converter</Link></li>
              </ul>
            </div>

            {/* Let Us Help You */}
            <div>
              <h3 className="font-bold text-white mb-4">Let Us Help You</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/customer-service" className="text-gray-300 hover:underline">ECOM and COVID-19</Link></li>
                <li><Link to="/orders" className="text-gray-300 hover:underline">Your Account</Link></li>
                <li><Link to="/orders" className="text-gray-300 hover:underline">Your Orders</Link></li>
                <li><Link to="/customer-service" className="text-gray-300 hover:underline">Shipping Rates & Policies</Link></li>
                <li><Link to="/customer-service" className="text-gray-300 hover:underline">Returns & Replacements</Link></li>
                <li><Link to="/orders" className="text-gray-300 hover:underline">Manage Your Content and Devices</Link></li>
                <li><Link to="/customer-service" className="text-gray-300 hover:underline">ECOM Assistant</Link></li>
                <li><Link to="/customer-service" className="text-gray-300 hover:underline">Help</Link></li>
              </ul>
            </div>
          </div>

          {/* Divider */}
          <hr className="border-gray-700 my-8" />

          {/* Bottom section */}
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <Link to="/">
                <img src="/api/placeholder/120/40" alt="ECOM" className="h-8 w-auto" />
              </Link>
              <div className="flex items-center space-x-4 text-sm">
                <button className="border border-gray-600 px-3 py-1 rounded hover:bg-gray-800">
                  🌐 English
                </button>
                <button className="border border-gray-600 px-3 py-1 rounded hover:bg-gray-800">
                  ₹ INR - Indian Rupee
                </button>
                <button className="border border-gray-600 px-3 py-1 rounded hover:bg-gray-800">
                  🇮🇳 India
                </button>
              </div>
            </div>
          </div>

          {/* Country-specific links */}
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 text-xs">
            <div>
              <Link to="/todays-deals" className="block">
                <p className="font-bold mb-2">ECOM Music</p>
                <p className="text-gray-400">Stream millions of songs</p>
              </Link>
            </div>
            <div>
              <Link to="/sell" className="block">
                <p className="font-bold mb-2">ECOM Advertising</p>
                <p className="text-gray-400">Find, attract, and engage customers</p>
              </Link>
            </div>
            <div>
              <Link to="/todays-deals" className="block">
                <p className="font-bold mb-2">6PM</p>
                <p className="text-gray-400">Score deals on fashion brands</p>
              </Link>
            </div>
            <div>
              <Link to="/blog" className="block">
                <p className="font-bold mb-2">AbeBooks</p>
                <p className="text-gray-400">Books, art & collectibles</p>
              </Link>
            </div>
            <div>
              <Link to="/sell" className="block">
                <p className="font-bold mb-2">ACX</p>
                <p className="text-gray-400">Audiobook Publishing Made Easy</p>
              </Link>
            </div>
            <div>
              <Link to="/sell" className="block">
                <p className="font-bold mb-2">Sell on ECOM</p>
                <p className="text-gray-400">Start a Selling Account</p>
              </Link>
            </div>
            <div>
              <Link to="/sell" className="block">
                <p className="font-bold mb-2">ECOM Business</p>
                <p className="text-gray-400">Everything For Your Business</p>
              </Link>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-xs text-gray-400">
            <div className="flex flex-wrap justify-center space-x-4 mb-4">
              <Link to="/customer-service" className="hover:underline">Conditions of Use</Link>
              <Link to="/customer-service" className="hover:underline">Privacy Notice</Link>
              <Link to="/customer-service" className="hover:underline">Your Ads Privacy Choices</Link>
            </div>
            <p>© 1996-2024, ECOM.com, Inc. or its affiliates</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
