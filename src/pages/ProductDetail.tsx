
import { useParams } from 'react-router-dom';
import { useProducts } from '@/hooks/useProducts';
import { useCart } from '@/hooks/useCart';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ReviewsSection from '../components/ReviewsSection';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Package, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: products } = useProducts();
  const { addToCart, isAddingToCart } = useCart();

  const product = products?.find(p => p.id === id);

  const handleAddToCart = () => {
    if (product) {
      addToCart({ productId: product.id });
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
            <Button onClick={() => navigate('/')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Products
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Button 
          variant="outline" 
          onClick={() => navigate('/')}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Products
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Product Image */}
          <div className="relative">
            <img 
              src={product.image_url} 
              alt={product.name}
              className="w-full h-96 lg:h-[500px] object-cover rounded-lg"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/api/placeholder/600/500';
              }}
            />
            {product.stock_quantity <= 10 && product.stock_quantity > 0 && (
              <Badge variant="destructive" className="absolute top-4 right-4">
                Low Stock
              </Badge>
            )}
            {product.stock_quantity === 0 && (
              <Badge variant="secondary" className="absolute top-4 right-4">
                Out of Stock
              </Badge>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              {product.categories && (
                <Badge variant="outline" className="mb-4">
                  {product.categories.name}
                </Badge>
              )}
              <p className="text-4xl font-bold text-orange-600 mb-4">
                ₹{Number(product.price).toFixed(2)}
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Description</h3>
                <p className="text-gray-700">{product.description}</p>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center text-sm text-gray-600">
                  <Package className="h-4 w-4 mr-1" />
                  <span>{product.stock_quantity} in stock</span>
                </div>
                <div className="text-sm text-gray-500">
                  SKU: {product.sku}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <Button 
                onClick={handleAddToCart}
                disabled={product.stock_quantity === 0 || isAddingToCart}
                className="w-full bg-orange-500 hover:bg-orange-600 text-lg py-3"
                size="lg"
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                {product.stock_quantity === 0 ? 'Out of Stock' : 'Add to Cart'}
              </Button>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <ReviewsSection productId={product.id} />
      </div>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;
