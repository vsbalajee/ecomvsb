
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Header from '../components/Header';
import HeroBanner from '../components/HeroBanner';
import ProductGrid from '../components/ProductGrid';
import Footer from '../components/Footer';

const Index = () => {
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
    return null; // Will redirect to auth
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <HeroBanner />
      <div className="max-w-7xl mx-auto px-4 py-6">
        <ProductGrid />
      </div>
      <Footer />
    </div>
  );
};

export default Index;
