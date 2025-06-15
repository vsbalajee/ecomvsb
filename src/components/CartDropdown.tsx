
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Plus, Minus, Trash2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useCart } from '@/hooks/useCart';
import { useNavigate } from 'react-router-dom';

const CartDropdown = () => {
  const { cart, cartTotal, cartItemCount, updateQuantity, removeFromCart } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative flex items-center text-white hover:bg-gray-700">
          <ShoppingCart className="h-6 w-6" />
          {cartItemCount > 0 && (
            <Badge className="absolute -top-2 -right-2 bg-orange-500 text-white min-w-[20px] h-5 flex items-center justify-center text-xs">
              {cartItemCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80 p-0" align="end">
        <div className="p-4 border-b">
          <h3 className="font-semibold">Shopping Cart</h3>
          <p className="text-sm text-gray-600">{cartItemCount} items</p>
        </div>
        
        <div className="max-h-80 overflow-y-auto">
          {cart.length === 0 ? (
            <div className="p-4 text-center text-gray-500">
              Your cart is empty
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="p-4 border-b">
                <div className="flex items-center space-x-3">
                  <img 
                    src={item.products.image_url} 
                    alt={item.products.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium truncate">{item.products.name}</h4>
                    <p className="text-sm text-gray-600">₹{item.products.price}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => updateQuantity({ itemId: item.id, quantity: item.quantity - 1 })}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="text-sm w-8 text-center">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => updateQuantity({ itemId: item.id, quantity: item.quantity + 1 })}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 text-red-500 hover:text-red-700"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        
        {cart.length > 0 && (
          <div className="p-4 space-y-3">
            <div className="flex justify-between font-semibold">
              <span>Total: ₹{cartTotal.toFixed(2)}</span>
            </div>
            <Button 
              onClick={handleCheckout}
              className="w-full bg-orange-500 hover:bg-orange-600"
            >
              Checkout
            </Button>
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CartDropdown;
