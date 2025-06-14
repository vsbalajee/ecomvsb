
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

const DealsSection = () => {
  const deals = [
    {
      title: "Deal of the Day",
      discount: "Up to 30% off",
      originalPrice: "$199.99",
      currentPrice: "$139.99",
      image: "/api/placeholder/200/200",
      rating: 4.5,
      reviews: 1234
    },
    {
      title: "Lightning Deal",
      discount: "Limited time",
      originalPrice: "$89.99",
      currentPrice: "$59.99",
      image: "/api/placeholder/200/200",
      rating: 4.3,
      reviews: 856
    },
    {
      title: "Best Seller",
      discount: "25% off",
      originalPrice: "$49.99",
      currentPrice: "$37.49",
      image: "/api/placeholder/200/200",
      rating: 4.7,
      reviews: 2341
    },
    {
      title: "Prime Exclusive",
      discount: "Member price",
      originalPrice: "$79.99",
      currentPrice: "$64.99",
      image: "/api/placeholder/200/200",
      rating: 4.4,
      reviews: 567
    }
  ];

  return (
    <div className="space-y-6">
      {/* Today's Deals */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Today's Deals</h2>
          <a href="#" className="text-blue-600 hover:underline hover:text-orange-600">See all deals</a>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {deals.map((deal, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
              <div className="relative mb-3">
                <img src={deal.image} alt={deal.title} className="w-full h-48 object-cover rounded" />
                <span className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 text-xs rounded">
                  {deal.discount}
                </span>
              </div>
              
              <h3 className="font-semibold text-sm mb-2 line-clamp-2">{deal.title}</h3>
              
              <div className="flex items-center mb-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-4 w-4 ${i < Math.floor(deal.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-600">({deal.reviews})</span>
              </div>
              
              <div className="flex items-center space-x-2 mb-3">
                <span className="text-lg font-bold text-red-600">{deal.currentPrice}</span>
                <span className="text-sm text-gray-500 line-through">{deal.originalPrice}</span>
              </div>
              
              <Button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black">
                Add to Cart
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* International top sellers */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-bold mb-4">International top sellers</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="text-center cursor-pointer hover:opacity-75">
              <img 
                src={`/api/placeholder/120/120`} 
                alt={`Product ${index + 1}`} 
                className="w-full h-24 object-cover rounded mb-2"
              />
              <p className="text-sm font-medium">$19.99</p>
              <p className="text-xs text-gray-600">Free shipping</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DealsSection;
