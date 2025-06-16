
import { useState } from 'react';
import { MapPin, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const LocationSelector = () => {
  const [selectedLocation, setSelectedLocation] = useState('Mumbai 400001');

  const locations = [
    'Mumbai 400001',
    'Delhi 110001',
    'Bangalore 560001',
    'Chennai 600001',
    'Kolkata 700001',
    'Hyderabad 500001',
    'Pune 411001',
    'Ahmedabad 380001',
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="text-white hover:bg-gray-700 text-xs p-1 sm:p-2 flex items-center space-x-1">
          <MapPin className="h-3 w-3 sm:h-4 sm:w-4" />
          <div className="flex flex-col items-start">
            <span className="text-xs text-gray-300">Deliver to</span>
            <span className="text-xs sm:text-sm font-semibold truncate max-w-20 sm:max-w-24">
              {selectedLocation}
            </span>
          </div>
          <ChevronDown className="h-3 w-3 ml-1" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48 bg-white" align="start">
        {locations.map((location) => (
          <DropdownMenuItem
            key={location}
            onClick={() => setSelectedLocation(location)}
            className={selectedLocation === location ? 'bg-orange-50' : ''}
          >
            <MapPin className="h-4 w-4 mr-2" />
            {location}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LocationSelector;
