
import { useMemo } from 'react';
import { useAllOrders } from '@/hooks/useOrders';
import { useProducts } from '@/hooks/useProducts';
import { useReviews } from '@/hooks/useReviews';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const AdminReports = () => {
  const { data: orders } = useAllOrders();
  const { data: products } = useProducts();
  const { data: reviews } = useReviews();

  const salesData = useMemo(() => {
    if (!orders) return [];
    
    const monthlyData: Record<string, number> = {};
    orders.forEach(order => {
      const month = new Date(order.created_at).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short' 
      });
      monthlyData[month] = (monthlyData[month] || 0) + order.total_amount;
    });

    return Object.entries(monthlyData).map(([month, revenue]) => ({
      month,
      revenue: Number(revenue.toFixed(2))
    }));
  }, [orders]);

  const topProducts = useMemo(() => {
    if (!orders) return [];
    
    const productSales: Record<string, { name: string; quantity: number; revenue: number }> = {};
    
    orders.forEach(order => {
      order.order_items?.forEach(item => {
        const key = item.product_id;
        if (!productSales[key]) {
          productSales[key] = {
            name: item.products?.name || 'Unknown Product',
            quantity: 0,
            revenue: 0
          };
        }
        productSales[key].quantity += item.quantity;
        productSales[key].revenue += item.quantity * item.unit_price;
      });
    });

    return Object.values(productSales)
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5);
  }, [orders]);

  const orderStatusData = useMemo(() => {
    if (!orders) return [];
    
    const statusCounts: Record<string, number> = {};
    orders.forEach(order => {
      statusCounts[order.status] = (statusCounts[order.status] || 0) + 1;
    });

    const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#e74c3c'];
    
    return Object.entries(statusCounts).map(([status, count], index) => ({
      status: status.charAt(0).toUpperCase() + status.slice(1),
      count,
      fill: colors[index % colors.length]
    }));
  }, [orders]);

  const averageRating = useMemo(() => {
    if (!reviews || reviews.length === 0) return 0;
    return reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
  }, [reviews]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold">Reports & Analytics</h2>
        <p className="text-gray-600">Insights into your business performance</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">
                ₹{orders?.reduce((sum, order) => sum + order.total_amount, 0).toFixed(2) || '0.00'}
              </p>
              <p className="text-sm text-gray-600">Total Revenue</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{orders?.length || 0}</p>
              <p className="text-sm text-gray-600">Total Orders</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">{products?.length || 0}</p>
              <p className="text-sm text-gray-600">Total Products</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-600">{averageRating.toFixed(1)}</p>
              <p className="text-sm text-gray-600">Average Rating</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`₹${value}`, 'Revenue']} />
                <Line type="monotone" dataKey="revenue" stroke="#8884d8" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Order Status Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Order Status Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={orderStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ status, count }) => `${status}: ${count}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {orderStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Top Products */}
      <Card>
        <CardHeader>
          <CardTitle>Top Selling Products</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topProducts}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value, name) => [
                name === 'revenue' ? `₹${value}` : value,
                name === 'revenue' ? 'Revenue' : 'Quantity Sold'
              ]} />
              <Bar dataKey="quantity" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminReports;
