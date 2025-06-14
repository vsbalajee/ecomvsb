
import Header from '../components/Header';
import HeroBanner from '../components/HeroBanner';
import ProductCategories from '../components/ProductCategories';
import DealsSection from '../components/DealsSection';
import RecommendationsSection from '../components/RecommendationsSection';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <HeroBanner />
      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        <ProductCategories />
        <DealsSection />
        <RecommendationsSection />
      </div>
      <Footer />
    </div>
  );
};

export default Index;
