
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Package } from 'lucide-react';
import { Product } from '@/hooks/useProducts';
import { useCart } from '@/hooks/useCart';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart, isAddingToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({ productId: product.id });
  };

  return (
    <Card className="h-full flex flex-col hover:shadow-lg transition-shadow">
      <div className="relative">
        <img 
          src={product.image_url} 
          alt={product.name}
          className="w-full h-48 object-cover rounded-t-lg"
        />
        {product.stock_quantity <= 10 && product.stock_quantity > 0 && (
          <Badge variant="destructive" className="absolute top-2 right-2">
            Low Stock
          </Badge>
        )}
        {product.stock_quantity === 0 && (
          <Badge variant="secondary" className="absolute top-2 right-2">
            Out of Stock
          </Badge>
        )}
      </div>
      
      <CardHeader className="flex-1">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg line-clamp-2">{product.name}</CardTitle>
          <div className="text-right">
            <div className="text-2xl font-bold text-orange-600">₹{product.price}</div>
            {product.categories && (
              <Badge variant="outline" className="text-xs">
                {product.categories.name}
              </Badge>
            )}
          </div>
        </div>
        <CardDescription className="line-clamp-3">
          {product.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <Package className="h-4 w-4 mr-1" />
            {product.stock_quantity} in stock
          </div>
          <div className="text-xs text-gray-500">
            SKU: {product.sku}
          </div>
        </div>
        
        <Button 
          onClick={handleAddToCart}
          disabled={product.stock_quantity === 0 || isAddingToCart}
          className="w-full bg-orange-500 hover:bg-orange-600"
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          {product.stock_quantity === 0 ? 'Out of Stock' : 'Add to Cart'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
