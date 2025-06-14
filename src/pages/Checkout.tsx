
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/hooks/useCart';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import { ArrowLeft } from 'lucide-react';

const Checkout = () => {
  const [shippingAddress, setShippingAddress] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const { cart, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handlePlaceOrder = async () => {
    if (!user?.id) {
      toast({
        title: "Authentication Required",
        description: "Please log in to place an order.",
        variant: "destructive",
      });
      return;
    }

    if (!shippingAddress.trim()) {
      toast({
        title: "Shipping Address Required",
        description: "Please enter your shipping address.",
        variant: "destructive",
      });
      return;
    }

    if (cart.length === 0) {
      toast({
        title: "Cart Empty",
        description: "Your cart is empty. Add some items before checkout.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    try {
      // Create the order
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: user.id,
          total_amount: cartTotal,
          shipping_address: shippingAddress,
          status: 'pending'
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // Create order items
      const orderItems = cart.map(item => ({
        order_id: order.id,
        product_id: item.product_id,
        quantity: item.quantity,
        unit_price: item.products.price
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      // Update product stock quantities
      for (const item of cart) {
        const { error: stockError } = await supabase
          .from('products')
          .update({ 
            stock_quantity: item.products.stock_quantity - item.quantity 
          })
          .eq('id', item.product_id);

        if (stockError) throw stockError;
      }

      // Clear the cart
      clearCart();

      toast({
        title: "Order Placed Successfully!",
        description: `Your order #${order.id.slice(0, 8)} has been placed. Thank you for your purchase!`,
      });

      navigate('/');
    } catch (error) {
      console.error('Checkout error:', error);
      toast({
        title: "Order Failed",
        description: "There was an error processing your order. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Header />
        <div className="max-w-2xl mx-auto px-4 py-8">
          <Card>
            <CardContent className="text-center py-8">
              <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
              <p className="text-gray-600 mb-6">Add some items to your cart before checkout.</p>
              <Button onClick={() => navigate('/')} className="bg-orange-500 hover:bg-orange-600">
                Continue Shopping
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/')}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Shopping
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
              <CardDescription>{cart.length} items in your cart</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center space-x-4">
                  <img 
                    src={item.products.image_url} 
                    alt={item.products.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium">{item.products.name}</h4>
                    <p className="text-sm text-gray-600">
                      ${item.products.price} × {item.quantity}
                    </p>
                  </div>
                  <div className="font-medium">
                    ${(item.products.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
              
              <Separator />
              
              <div className="flex justify-between text-lg font-bold">
                <span>Total: ${cartTotal.toFixed(2)}</span>
              </div>
            </CardContent>
          </Card>

          {/* Shipping Information */}
          <Card>
            <CardHeader>
              <CardTitle>Shipping Information</CardTitle>
              <CardDescription>Enter your delivery address</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label htmlFor="address" className="block text-sm font-medium mb-2">
                  Shipping Address *
                </label>
                <textarea
                  id="address"
                  value={shippingAddress}
                  onChange={(e) => setShippingAddress(e.target.value)}
                  placeholder="Enter your complete shipping address..."
                  rows={4}
                  className="w-full p-3 border rounded-md resize-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  required
                />
              </div>

              <Button 
                onClick={handlePlaceOrder}
                disabled={isProcessing || !shippingAddress.trim()}
                className="w-full bg-orange-500 hover:bg-orange-600 py-3 text-lg"
              >
                {isProcessing ? 'Processing...' : `Place Order - $${cartTotal.toFixed(2)}`}
              </Button>

              <p className="text-xs text-gray-500 text-center">
                By placing this order, you agree to our terms and conditions.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
