
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import AdminProtectedComponent from '@/components/AdminProtectedComponent';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductForm from '../components/ProductForm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AdminDashboard from '@/components/admin/AdminDashboard';
import OrderManagement from '@/components/admin/OrderManagement';
import ContentManagement from '@/components/admin/ContentManagement';
import SiteSettings from '@/components/admin/SiteSettings';
import AdminReports from '@/components/admin/AdminReports';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  FileText, 
  Settings, 
  BarChart3 
} from 'lucide-react';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      
      <AdminProtectedComponent>
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Admin Panel</h1>
            <p className="text-gray-600">Manage your e-commerce platform</p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
              <TabsTrigger value="dashboard" className="flex items-center space-x-2">
                <LayoutDashboard className="h-4 w-4" />
                <span className="hidden sm:inline">Dashboard</span>
              </TabsTrigger>
              <TabsTrigger value="products" className="flex items-center space-x-2">
                <Package className="h-4 w-4" />
                <span className="hidden sm:inline">Products</span>
              </TabsTrigger>
              <TabsTrigger value="orders" className="flex items-center space-x-2">
                <ShoppingCart className="h-4 w-4" />
                <span className="hidden sm:inline">Orders</span>
              </TabsTrigger>
              <TabsTrigger value="content" className="flex items-center space-x-2">
                <FileText className="h-4 w-4" />
                <span className="hidden sm:inline">Content</span>
              </TabsTrigger>
              <TabsTrigger value="reports" className="flex items-center space-x-2">
                <BarChart3 className="h-4 w-4" />
                <span className="hidden sm:inline">Reports</span>
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center space-x-2">
                <Settings className="h-4 w-4" />
                <span className="hidden sm:inline">Settings</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard">
              <AdminDashboard />
            </TabsContent>

            <TabsContent value="products">
              <div className="space-y-6">
                <div>
                  <h2 className="text-3xl font-bold">Product Management</h2>
                  <p className="text-gray-600">Add and manage your products</p>
                </div>
                <ProductForm />
              </div>
            </TabsContent>

            <TabsContent value="orders">
              <OrderManagement />
            </TabsContent>

            <TabsContent value="content">
              <ContentManagement />
            </TabsContent>

            <TabsContent value="reports">
              <AdminReports />
            </TabsContent>

            <TabsContent value="settings">
              <SiteSettings />
            </TabsContent>
          </Tabs>
        </div>
      </AdminProtectedComponent>
      
      <Footer />
    </div>
  );
};

export default Admin;
