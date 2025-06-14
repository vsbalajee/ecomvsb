
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HeroBanner = () => {
  return (
    <div className="relative">
      {/* Main hero image */}
      <div className="relative h-96 bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
        <img 
          src="/api/placeholder/1200/400" 
          alt="Hero Banner" 
          className="w-full h-full object-cover"
        />
        
        {/* Navigation arrows */}
        <Button 
          variant="ghost" 
          size="icon"
          className="absolute left-4 bg-white/20 hover:bg-white/30 text-white"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon"
          className="absolute right-4 bg-white/20 hover:bg-white/30 text-white"
        >
          <ChevronRight className="h-6 w-6" />
        </Button>

        {/* Promotional text overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold mb-4">Holiday Deals are Here</h1>
            <p className="text-xl mb-6">Save up to 70% on top brands</p>
            <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 text-lg">
              Shop Now
            </Button>
          </div>
        </div>
      </div>

      {/* Prime banner */}
      <div className="bg-blue-600 text-white py-2 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="font-bold">Prime</span>
            <span>FREE delivery, exclusive deals, and more</span>
          </div>
          <Button variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
            Try Prime Free
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
