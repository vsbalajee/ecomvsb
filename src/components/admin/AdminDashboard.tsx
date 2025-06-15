
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAllOrders } from '@/hooks/useOrders';
import { useProducts } from '@/hooks/useProducts';
import { useReviews } from '@/hooks/useReviews';
import { 
  ShoppingCart, 
  Package, 
  Users, 
  Star,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock
} from 'lucide-react';

const AdminDashboard = () => {
  const { data: orders } = useAllOrders();
  const { data: products } = useProducts();
  const { data: reviews } = useReviews();

  const totalRevenue = orders?.reduce((sum, order) => sum + order.total_amount, 0) || 0;
  const lowStockProducts = products?.filter(p => p.stock_quantity <= 10) || [];
  const pendingOrders = orders?.filter(o => o.status === 'pending') || [];
  const recentReviews = reviews?.slice(0, 5) || [];

  const stats = [
    {
      title: 'Total Revenue',
      value: `₹${totalRevenue.toFixed(2)}`,
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: 'Total Orders',
      value: orders?.length || 0,
      icon: ShoppingCart,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Total Products',
      value: products?.length || 0,
      icon: Package,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      title: 'Total Reviews',
      value: reviews?.length || 0,
      icon: Star,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold">Admin Dashboard</h2>
        <p className="text-gray-600">Overview of your e-commerce platform</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                  <div className={`${stat.bgColor} p-3 rounded-full`}>
                    <IconComponent className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertCircle className="h-5 w-5 text-orange-500" />
              <span>Low Stock Alert</span>
            </CardTitle>
            <CardDescription>Products running low on inventory</CardDescription>
          </CardHeader>
          <CardContent>
            {lowStockProducts.length === 0 ? (
              <p className="text-gray-500">All products are well stocked!</p>
            ) : (
              <div className="space-y-2">
                {lowStockProducts.slice(0, 5).map((product) => (
                  <div key={product.id} className="flex items-center justify-between">
                    <span className="text-sm">{product.name}</span>
                    <Badge variant={product.stock_quantity === 0 ? "destructive" : "secondary"}>
                      {product.stock_quantity} left
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-blue-500" />
              <span>Pending Orders</span>
            </CardTitle>
            <CardDescription>Orders awaiting processing</CardDescription>
          </CardHeader>
          <CardContent>
            {pendingOrders.length === 0 ? (
              <p className="text-gray-500">No pending orders!</p>
            ) : (
              <div className="space-y-2">
                {pendingOrders.slice(0, 5).map((order) => (
                  <div key={order.id} className="flex items-center justify-between">
                    <span className="text-sm">Order #{order.id.slice(0, 8)}</span>
                    <span className="text-sm font-medium">₹{order.total_amount}</span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent Reviews */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Reviews</CardTitle>
          <CardDescription>Latest customer feedback</CardDescription>
        </CardHeader>
        <CardContent>
          {recentReviews.length === 0 ? (
            <p className="text-gray-500">No reviews yet.</p>
          ) : (
            <div className="space-y-4">
              {recentReviews.map((review) => (
                <div key={review.id} className="border-l-4 border-blue-500 pl-4">
                  <div className="flex items-center space-x-2 mb-1">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-4 w-4 ${
                            star <= review.rating 
                              ? 'fill-yellow-400 text-yellow-400' 
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm font-medium">{review.title}</span>
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-2">{review.comment}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(review.created_at).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
