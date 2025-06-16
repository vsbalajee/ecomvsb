
import Header from '../components/Header';
import HeroBanner from '../components/HeroBanner';
import ProductGrid from '../components/ProductGrid';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <HeroBanner />
      <div className="max-w-7xl mx-auto px-2 sm:px-4 py-4 sm:py-6">
        <ProductGrid />
      </div>
      <Footer />
    </div>
  );
};

export default Index;
