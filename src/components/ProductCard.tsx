
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Package, Star } from 'lucide-react';
import { Product } from '@/hooks/useProducts';
import { useCart } from '@/hooks/useCart';
import { useReviews } from '@/hooks/useReviews';
import { useNavigate } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart, isAddingToCart } = useCart();
  const { data: reviews } = useReviews(product.id);
  const navigate = useNavigate();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log('Adding to cart:', product.id, product.name);
    addToCart({ productId: product.id });
  };

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  const averageRating = reviews?.length 
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
    : 0;

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-3 w-3 ${
              star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
            }`}
          />
        ))}
        <span className="text-xs text-gray-600 ml-1">
          ({reviews?.length || 0})
        </span>
      </div>
    );
  };

  return (
    <Card 
      className="h-full flex flex-col hover:shadow-lg transition-shadow cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="relative">
        <img 
          src={product.image_url} 
          alt={product.name}
          className="w-full h-40 sm:h-48 object-cover rounded-t-lg"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/api/placeholder/300/200';
          }}
        />
        {product.stock_quantity <= 10 && product.stock_quantity > 0 && (
          <Badge variant="destructive" className="absolute top-2 right-2 text-xs">
            Low Stock
          </Badge>
        )}
        {product.stock_quantity === 0 && (
          <Badge variant="secondary" className="absolute top-2 right-2 text-xs">
            Out of Stock
          </Badge>
        )}
      </div>
      
      <CardHeader className="flex-1 p-3 sm:p-6">
        <div className="flex flex-col space-y-2">
          <CardTitle className="text-sm sm:text-lg line-clamp-2 leading-tight">
            {product.name}
          </CardTitle>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start space-y-2 sm:space-y-0">
            <div className="order-2 sm:order-1">
              {product.categories && (
                <Badge variant="outline" className="text-xs">
                  {product.categories.name}
                </Badge>
              )}
            </div>
            <div className="text-right order-1 sm:order-2">
              <div className="text-lg sm:text-2xl font-bold text-orange-600">
                ₹{Number(product.price).toFixed(2)}
              </div>
            </div>
          </div>
          {/* Reviews */}
          {reviews && reviews.length > 0 && (
            <div className="mt-1">
              {renderStars(Math.round(averageRating))}
            </div>
          )}
        </div>
        <CardDescription className="line-clamp-2 sm:line-clamp-3 text-xs sm:text-sm">
          {product.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-0 p-3 sm:p-6">
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <div className="flex items-center text-xs sm:text-sm text-gray-600">
            <Package className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
            <span className="hidden sm:inline">{product.stock_quantity} in stock</span>
            <span className="sm:hidden">{product.stock_quantity}</span>
          </div>
          <div className="text-xs text-gray-500">
            SKU: {product.sku}
          </div>
        </div>
        
        <Button 
          onClick={handleAddToCart}
          disabled={product.stock_quantity === 0 || isAddingToCart}
          className="w-full bg-orange-500 hover:bg-orange-600 text-xs sm:text-sm py-2 sm:py-3"
        >
          <ShoppingCart className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
          {product.stock_quantity === 0 ? 'Out of Stock' : 'Add to Cart'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
