
import { useState } from 'react';
import { useAllOrders } from '@/hooks/useOrders';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Eye, Package, Truck, CheckCircle, XCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useQueryClient } from '@tanstack/react-query';

const OrderManagement = () => {
  const { data: orders, isLoading } = useAllOrders();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const updateOrderStatus = async (orderId: string, status: string) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status })
        .eq('id', orderId);

      if (error) throw error;

      toast({
        title: "Order Updated",
        description: `Order status changed to ${status}`,
      });

      queryClient.invalidateQueries({ queryKey: ['all-orders'] });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update order status",
        variant: "destructive",
      });
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { variant: "secondary" as const, icon: Package },
      processing: { variant: "default" as const, icon: Package },
      shipped: { variant: "default" as const, icon: Truck },
      delivered: { variant: "default" as const, icon: CheckCircle },
      cancelled: { variant: "destructive" as const, icon: XCircle },
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    const IconComponent = config.icon;

    return (
      <Badge variant={config.variant} className="flex items-center space-x-1">
        <IconComponent className="h-3 w-3" />
        <span className="capitalize">{status}</span>
      </Badge>
    );
  };

  const filteredOrders = orders?.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.profiles?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.user_id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (isLoading) return <div>Loading orders...</div>;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold">Order Management</h2>
        <p className="text-gray-600">Manage and track customer orders</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
        <Input
          placeholder="Search orders..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="sm:max-w-xs"
        />
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="sm:max-w-xs">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="processing">Processing</SelectItem>
            <SelectItem value="shipped">Shipped</SelectItem>
            <SelectItem value="delivered">Delivered</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Orders Table */}
      <div className="grid gap-4">
        {filteredOrders?.map((order) => (
          <Card key={order.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">
                  Order #{order.id.slice(0, 8)}
                </CardTitle>
                {getStatusBadge(order.status)}
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-600">Customer</p>
                  <p>{order.profiles?.full_name || 'Unknown Customer'}</p>
                  <p className="text-sm text-gray-500">{order.profiles?.email || order.user_id.slice(0, 8)}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Amount</p>
                  <p className="text-lg font-semibold">₹{order.total_amount}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Order Date</p>
                  <p>{new Date(order.created_at).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Items</p>
                  <p>{order.order_items?.length || 0} items</p>
                </div>
              </div>

              <div className="mt-4">
                <p className="text-sm font-medium text-gray-600 mb-2">Shipping Address</p>
                <p className="text-sm">{order.shipping_address || 'Not provided'}</p>
              </div>

              <div className="mt-4">
                <p className="text-sm font-medium text-gray-600 mb-2">Order Items</p>
                <div className="space-y-2">
                  {order.order_items?.map((item) => (
                    <div key={item.id} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                      <div className="flex items-center space-x-3">
                        <img 
                          src={item.products?.image_url || '/api/placeholder/40/40'} 
                          alt={item.products?.name}
                          className="w-10 h-10 object-cover rounded"
                        />
                        <span className="text-sm">{item.products?.name}</span>
                      </div>
                      <div className="text-sm">
                        Qty: {item.quantity} × ₹{item.unit_price} = ₹{(item.quantity * item.unit_price).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 flex space-x-2">
                <Select
                  value={order.status}
                  onValueChange={(status) => updateOrderStatus(order.id, status)}
                >
                  <SelectTrigger className="max-w-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="shipped">Shipped</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredOrders?.length === 0 && (
          <Card>
            <CardContent className="text-center py-8">
              <p className="text-gray-500">No orders found matching your criteria.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default OrderManagement;
