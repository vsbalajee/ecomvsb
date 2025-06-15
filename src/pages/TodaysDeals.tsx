
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductGrid from '../components/ProductGrid';
import { Badge } from '@/components/ui/badge';

const TodaysDeals = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Today's Lightning Deals</h1>
            <p className="text-xl mb-6">Limited-time offers that won't last long!</p>
            <Badge className="bg-yellow-400 text-black px-4 py-2 text-lg">
              Up to 70% OFF
            </Badge>
          </div>
        </div>
      </div>

      {/* Deals Timer */}
      <div className="bg-yellow-100 border-l-4 border-yellow-500 py-4">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-center">
            <span className="text-lg font-semibold text-yellow-800">
              ⏰ Deals end in: 23h 45m 12s
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <ProductGrid />
      </div>
      <Footer />
    </div>
  );
};

export default TodaysDeals;
