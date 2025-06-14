
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const RecommendationsSection = () => {
  const recommendations = [
    {
      title: "Recommended for you",
      products: [
        { name: "Wireless Headphones", price: "$79.99", image: "/api/placeholder/150/150" },
        { name: "Smart Watch", price: "$199.99", image: "/api/placeholder/150/150" },
        { name: "Bluetooth Speaker", price: "$49.99", image: "/api/placeholder/150/150" },
        { name: "Phone Case", price: "$19.99", image: "/api/placeholder/150/150" },
        { name: "Tablet Stand", price: "$29.99", image: "/api/placeholder/150/150" },
        { name: "USB Cable", price: "$12.99", image: "/api/placeholder/150/150" },
      ]
    },
    {
      title: "Frequently bought together",
      products: [
        { name: "Laptop", price: "$899.99", image: "/api/placeholder/150/150" },
        { name: "Mouse", price: "$25.99", image: "/api/placeholder/150/150" },
        { name: "Keyboard", price: "$79.99", image: "/api/placeholder/150/150" },
        { name: "Monitor", price: "$199.99", image: "/api/placeholder/150/150" },
        { name: "Webcam", price: "$59.99", image: "/api/placeholder/150/150" },
        { name: "Desk Lamp", price: "$39.99", image: "/api/placeholder/150/150" },
      ]
    }
  ];

  return (
    <div className="space-y-8">
      {recommendations.map((section, sectionIndex) => (
        <div key={sectionIndex} className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">{section.title}</h2>
            <div className="flex space-x-2">
              <Button variant="outline" size="icon">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {section.products.map((product, index) => (
              <div key={index} className="text-center cursor-pointer hover:opacity-75 border border-gray-200 rounded-lg p-3">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-32 object-cover rounded mb-3"
                />
                <h3 className="text-sm font-medium mb-2 line-clamp-2">{product.name}</h3>
                <p className="text-lg font-bold text-red-600">{product.price}</p>
                <Button size="sm" className="mt-2 w-full bg-yellow-400 hover:bg-yellow-500 text-black">
                  Add to Cart
                </Button>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Recently viewed */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-bold mb-6">Your recently viewed items</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="text-center cursor-pointer hover:opacity-75">
              <img 
                src={`/api/placeholder/120/120`} 
                alt={`Recently viewed ${index + 1}`} 
                className="w-full h-24 object-cover rounded mb-2"
              />
              <p className="text-sm font-medium">Product Name</p>
              <p className="text-sm text-red-600 font-bold">$29.99</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecommendationsSection;
