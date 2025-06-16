
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HeroBanner = () => {
  return (
    <div className="relative">
      {/* Main hero image */}
      <div className="relative h-48 sm:h-64 lg:h-96 bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
        <img 
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=400&fit=crop" 
          alt="Hero Banner" 
          className="w-full h-full object-cover"
        />
        
        {/* Navigation arrows */}
        <Button 
          variant="ghost" 
          size="icon"
          className="absolute left-2 sm:left-4 bg-white/20 hover:bg-white/30 text-white h-8 w-8 sm:h-10 sm:w-10"
        >
          <ChevronLeft className="h-4 w-4 sm:h-6 sm:w-6" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon"
          className="absolute right-2 sm:right-4 bg-white/20 hover:bg-white/30 text-white h-8 w-8 sm:h-10 sm:w-10"
        >
          <ChevronRight className="h-4 w-4 sm:h-6 sm:w-6" />
        </Button>

        {/* Promotional text overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-xl sm:text-2xl lg:text-4xl font-bold mb-2 sm:mb-4">Holiday Deals are Here</h1>
            <p className="text-sm sm:text-lg lg:text-xl mb-3 sm:mb-6">Save up to 70% on top brands</p>
            <Button className="bg-orange-500 hover:bg-orange-600 text-white px-4 sm:px-6 lg:px-8 py-2 sm:py-3 text-sm sm:text-base lg:text-lg">
              Shop Now
            </Button>
          </div>
        </div>
      </div>

      {/* Prime banner */}
      <div className="bg-blue-600 text-white py-2 px-2 sm:px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
          <div className="flex items-center space-x-2 sm:space-x-4">
            <span className="font-bold text-sm sm:text-base">Prime</span>
            <span className="text-xs sm:text-base">FREE delivery, exclusive deals, and more</span>
          </div>
          <Button variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 text-xs sm:text-sm self-start sm:self-auto">
            Try Prime Free
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
