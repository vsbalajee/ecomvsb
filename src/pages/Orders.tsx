import { useAuth } from '@/contexts/AuthContext';
import { useOrders } from '@/hooks/useOrders';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Package, MapPin, Clock, CreditCard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Orders = () => {
  const { user } = useAuth();
  const { data: orders, isLoading, error } = useOrders(user?.id);
  const navigate = useNavigate();

  console.log('Orders data:', orders);
  console.log('User ID:', user?.id);
  console.log('Loading state:', isLoading);
  console.log('Error:', error);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
            <div className="text-lg">Loading your orders...</div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    console.error('Orders error:', error);
    return (
      <div className="min-h-screen bg-gray-100">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center">
            <div className="text-red-600 mb-4">Error loading orders</div>
            <Button onClick={() => window.location.reload()} className="bg-orange-500 hover:bg-orange-600">
              Try Again
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500';
      case 'processing': return 'bg-blue-500';
      case 'shipped': return 'bg-purple-500';
      case 'delivered': return 'bg-green-500';
      case 'cancelled': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'processing': return <Package className="h-4 w-4" />;
      case 'shipped': return <Package className="h-4 w-4" />;
      case 'delivered': return <Package className="h-4 w-4" />;
      default: return <Package className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="max-w-6xl mx-auto px-4 py-4 sm:py-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/')}
          className="mb-4 sm:mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Shopping
        </Button>

        <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">Your Orders</h1>

        {!orders || orders.length === 0 ? (
          <Card>
            <CardContent className="text-center py-8 sm:py-12">
              <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-xl sm:text-2xl font-bold mb-4">No orders yet</h2>
              <p className="text-gray-600 mb-6">Start shopping to see your orders here.</p>
              <Button onClick={() => navigate('/')} className="bg-orange-500 hover:bg-orange-600">
                Start Shopping
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4 sm:space-y-6">
            {orders.map((order) => (
              <Card key={order.id} className="overflow-hidden">
                <CardHeader className="bg-gray-50 border-b">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start space-y-2 sm:space-y-0">
                    <div>
                      <CardTitle className="text-lg sm:text-xl">
                        Order #{order.id.slice(0, 8)}
                      </CardTitle>
                      <CardDescription className="flex items-center text-sm">
                        <Clock className="h-4 w-4 mr-1" />
                        Placed on {new Date(order.created_at).toLocaleDateString('en-IN', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </CardDescription>
                    </div>
                    <Badge className={`${getStatusColor(order.status)} text-white flex items-center`}>
                      {getStatusIcon(order.status)}
                      <span className="ml-1">
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                  <div className="space-y-4 sm:space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                      <div>
                        <h4 className="font-medium mb-3 flex items-center">
                          <Package className="h-4 w-4 mr-2" />
                          Items Ordered ({order.order_items?.length || 0})
                        </h4>
                        <div className="space-y-3">
                          {order.order_items && order.order_items.length > 0 ? (
                            order.order_items.map((item) => (
                              <div key={item.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                                <img 
                                  src={item.products?.image_url || '/api/placeholder/48/48'} 
                                  alt={item.products?.name || 'Product'}
                                  className="w-12 h-12 object-cover rounded"
                                  onError={(e) => {
                                    (e.target as HTMLImageElement).src = '/api/placeholder/48/48';
                                  }}
                                />
                                <div className="flex-1">
                                  <p className="font-medium text-sm sm:text-base">
                                    {item.products?.name || 'Product name unavailable'}
                                  </p>
                                  <p className="text-xs sm:text-sm text-gray-600">
                                    Qty: {item.quantity} × ₹{Number(item.unit_price).toFixed(2)}
                                  </p>
                                  <p className="text-sm font-medium text-orange-600">
                                    ₹{(Number(item.unit_price) * item.quantity).toFixed(2)}
                                  </p>
                                </div>
                              </div>
                            ))
                          ) : (
                            <div className="text-sm text-gray-500 italic">No items found for this order</div>
                          )}
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium mb-2 flex items-center">
                            <MapPin className="h-4 w-4 mr-2" />
                            Shipping Address
                          </h4>
                          <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                            {order.shipping_address ? (
                              <pre className="whitespace-pre-wrap font-sans">
                                {order.shipping_address}
                              </pre>
                            ) : (
                              <span className="italic">No shipping address provided</span>
                            )}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium mb-2 flex items-center">
                            <CreditCard className="h-4 w-4 mr-2" />
                            Order Summary
                          </h4>
                          <div className="text-sm space-y-1 bg-gray-50 p-3 rounded-lg">
                            <div className="flex justify-between">
                              <span>Items Total:</span>
                              <span>₹{Number(order.total_amount).toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Shipping:</span>
                              <span className="text-green-600">FREE</span>
                            </div>
                            <div className="border-t pt-1 mt-2">
                              <div className="flex justify-between font-bold">
                                <span>Order Total:</span>
                                <span className="text-orange-600">₹{Number(order.total_amount).toFixed(2)}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Orders;
