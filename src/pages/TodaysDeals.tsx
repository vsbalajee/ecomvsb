
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useProducts } from '@/hooks/useProducts';
import ProductCard from '../components/ProductCard';
import { Badge } from '@/components/ui/badge';

const TodaysDeals = () => {
  const { data: products, isLoading } = useProducts();

  // Show first 8 products as "deals" with simulated discounts
  const dealsProducts = products?.slice(0, 8).map(product => ({
    ...product,
    originalPrice: product.price * 1.3, // Simulate original price
    discount: 30 // 30% off
  })) || [];

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      
      <div className="max-w-7xl mx-auto px-2 sm:px-4 py-4 sm:py-8">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">Today's Deals</h1>
          <p className="text-gray-600 text-sm sm:text-base">Limited time offers - Save big on top products!</p>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
            <div className="text-lg">Loading deals...</div>
          </div>
        ) : (
          <>
            <div className="bg-red-600 text-white px-4 py-3 rounded-lg mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-lg sm:text-xl font-bold">Flash Sale - Limited Time!</h2>
                  <p className="text-sm">Up to 70% off on selected items</p>
                </div>
                <div className="mt-2 sm:mt-0">
                  <Badge variant="secondary" className="bg-white text-red-600 font-bold">
                    Ends in 2h 45m
                  </Badge>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {dealsProducts.map((product) => (
                <div key={product.id} className="relative">
                  <Badge className="absolute top-2 left-2 z-10 bg-red-500 text-white">
                    {product.discount}% OFF
                  </Badge>
                  <ProductCard product={product} />
                  <div className="mt-2 text-center">
                    <span className="text-gray-500 line-through text-sm">
                      ₹{product.originalPrice.toFixed(2)}
                    </span>
                    <span className="text-green-600 font-bold ml-2">
                      Save ₹{(product.originalPrice - product.price).toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default TodaysDeals;
