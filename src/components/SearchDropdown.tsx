
import { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useProducts } from '@/hooks/useProducts';
import { useNavigate } from 'react-router-dom';

interface SearchDropdownProps {
  onSearch?: (query: string) => void;
  className?: string;
}

const SearchDropdown = ({ onSearch, className }: SearchDropdownProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const { data: products } = useProducts();
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredProducts = searchQuery.length >= 1 ? 
    (products || [])
      .filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .slice(0, 8) // Limit to 8 suggestions
    : [];

  const handleSearch = (query?: string) => {
    const searchTerm = query || searchQuery;
    if (searchTerm.trim()) {
      navigate(`/?search=${encodeURIComponent(searchTerm.trim())}`);
      setIsOpen(false);
      if (onSearch) {
        onSearch(searchTerm.trim());
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleProductClick = (productName: string) => {
    setSearchQuery(productName);
    handleSearch(productName);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <div className="flex">
        <select className="bg-gray-300 text-black px-2 sm:px-3 py-2 rounded-l-md border-r text-xs sm:text-sm">
          <option>All</option>
          <option>Electronics</option>
          <option>Books</option>
          <option>Clothing</option>
        </select>
        <Input 
          className="flex-1 rounded-none border-0 text-xs sm:text-sm text-black" 
          placeholder="Search Amazon"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setIsOpen(e.target.value.length >= 1);
          }}
          onKeyPress={handleKeyPress}
          onFocus={() => {
            if (searchQuery.length >= 1) {
              setIsOpen(true);
            }
          }}
        />
        <Button 
          className="bg-orange-400 hover:bg-orange-500 rounded-l-none px-2 sm:px-4"
          onClick={() => handleSearch()}
        >
          <Search className="h-4 w-4 sm:h-5 sm:w-5" />
        </Button>
      </div>

      {/* Search Suggestions Dropdown */}
      {isOpen && filteredProducts.length > 0 && (
        <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-md shadow-lg z-50 max-h-80 overflow-y-auto">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="px-4 py-3 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0"
              onClick={() => handleProductClick(product.name)}
            >
              <div className="flex items-center space-x-3">
                <Search className="h-4 w-4 text-gray-400" />
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900">{product.name}</div>
                  <div className="text-xs text-gray-500 truncate">{product.description}</div>
                </div>
                <div className="text-sm font-semibold text-orange-600">
                  ${product.price.toFixed(2)}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchDropdown;
