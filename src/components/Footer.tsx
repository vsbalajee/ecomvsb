
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-12">
      {/* Back to top */}
      <div className="bg-gray-700 py-4 text-center cursor-pointer hover:bg-gray-600">
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
                <li><a href="#" className="text-gray-300 hover:underline">Careers</a></li>
                <li><a href="#" className="text-gray-300 hover:underline">Blog</a></li>
                <li><a href="#" className="text-gray-300 hover:underline">About Amazon</a></li>
                <li><a href="#" className="text-gray-300 hover:underline">Investor Relations</a></li>
                <li><a href="#" className="text-gray-300 hover:underline">Amazon Devices</a></li>
                <li><a href="#" className="text-gray-300 hover:underline">Amazon Science</a></li>
              </ul>
            </div>

            {/* Make Money with Us */}
            <div>
              <h3 className="font-bold text-white mb-4">Make Money with Us</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-300 hover:underline">Sell products on Amazon</a></li>
                <li><a href="#" className="text-gray-300 hover:underline">Sell on Amazon Business</a></li>
                <li><a href="#" className="text-gray-300 hover:underline">Sell apps on Amazon</a></li>
                <li><a href="#" className="text-gray-300 hover:underline">Become an Affiliate</a></li>
                <li><a href="#" className="text-gray-300 hover:underline">Advertise Your Products</a></li>
                <li><a href="#" className="text-gray-300 hover:underline">Self-Publish with Us</a></li>
                <li><a href="#" className="text-gray-300 hover:underline">Host an Amazon Hub</a></li>
              </ul>
            </div>

            {/* Amazon Payment Products */}
            <div>
              <h3 className="font-bold text-white mb-4">Amazon Payment Products</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-300 hover:underline">Amazon Business Card</a></li>
                <li><a href="#" className="text-gray-300 hover:underline">Shop with Points</a></li>
                <li><a href="#" className="text-gray-300 hover:underline">Reload Your Balance</a></li>
                <li><a href="#" className="text-gray-300 hover:underline">Amazon Currency Converter</a></li>
              </ul>
            </div>

            {/* Let Us Help You */}
            <div>
              <h3 className="font-bold text-white mb-4">Let Us Help You</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-300 hover:underline">Amazon and COVID-19</a></li>
                <li><a href="#" className="text-gray-300 hover:underline">Your Account</a></li>
                <li><a href="#" className="text-gray-300 hover:underline">Your Orders</a></li>
                <li><a href="#" className="text-gray-300 hover:underline">Shipping Rates & Policies</a></li>
                <li><a href="#" className="text-gray-300 hover:underline">Returns & Replacements</a></li>
                <li><a href="#" className="text-gray-300 hover:underline">Manage Your Content and Devices</a></li>
                <li><a href="#" className="text-gray-300 hover:underline">Amazon Assistant</a></li>
                <li><a href="#" className="text-gray-300 hover:underline">Help</a></li>
              </ul>
            </div>
          </div>

          {/* Divider */}
          <hr className="border-gray-700 my-8" />

          {/* Bottom section */}
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <img src="/api/placeholder/120/40" alt="Amazon" className="h-8 w-auto" />
              <div className="flex items-center space-x-4 text-sm">
                <button className="border border-gray-600 px-3 py-1 rounded hover:bg-gray-800">
                  🌐 English
                </button>
                <button className="border border-gray-600 px-3 py-1 rounded hover:bg-gray-800">
                  $ USD - U.S. Dollar
                </button>
                <button className="border border-gray-600 px-3 py-1 rounded hover:bg-gray-800">
                  🇺🇸 United States
                </button>
              </div>
            </div>
          </div>

          {/* Country-specific links */}
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 text-xs">
            <div>
              <p className="font-bold mb-2">Amazon Music</p>
              <p className="text-gray-400">Stream millions of songs</p>
            </div>
            <div>
              <p className="font-bold mb-2">Amazon Advertising</p>
              <p className="text-gray-400">Find, attract, and engage customers</p>
            </div>
            <div>
              <p className="font-bold mb-2">6PM</p>
              <p className="text-gray-400">Score deals on fashion brands</p>
            </div>
            <div>
              <p className="font-bold mb-2">AbeBooks</p>
              <p className="text-gray-400">Books, art & collectibles</p>
            </div>
            <div>
              <p className="font-bold mb-2">ACX</p>
              <p className="text-gray-400">Audiobook Publishing Made Easy</p>
            </div>
            <div>
              <p className="font-bold mb-2">Sell on Amazon</p>
              <p className="text-gray-400">Start a Selling Account</p>
            </div>
            <div>
              <p className="font-bold mb-2">Amazon Business</p>
              <p className="text-gray-400">Everything For Your Business</p>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-xs text-gray-400">
            <div className="flex flex-wrap justify-center space-x-4 mb-4">
              <a href="#" className="hover:underline">Conditions of Use</a>
              <a href="#" className="hover:underline">Privacy Notice</a>
              <a href="#" className="hover:underline">Your Ads Privacy Choices</a>
            </div>
            <p>© 1996-2024, Amazon.com, Inc. or its affiliates</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
