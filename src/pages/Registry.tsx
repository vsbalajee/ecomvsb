
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Gift, Heart, Baby, Home, GraduationCap } from 'lucide-react';

const Registry = () => {
  const registryTypes = [
    {
      icon: Heart,
      title: 'Wedding Registry',
      description: 'Create your perfect wedding wish list',
      color: 'text-red-500'
    },
    {
      icon: Baby,
      title: 'Baby Registry',
      description: 'Everything you need for your little one',
      color: 'text-blue-500'
    },
    {
      icon: Home,
      title: 'Housewarming Registry',
      description: 'Make your new house feel like home',
      color: 'text-green-500'
    },
    {
      icon: GraduationCap,
      title: 'Graduation Registry',
      description: 'Celebrate your achievement with style',
      color: 'text-purple-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      
      <div className="max-w-7xl mx-auto px-2 sm:px-4 py-4 sm:py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Gift Registry</h1>
          <p className="text-gray-600 text-lg">Create and manage your wish lists for special occasions</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {registryTypes.map((type, index) => {
            const IconComponent = type.icon;
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader className="text-center">
                  <IconComponent className={`h-12 w-12 mx-auto mb-4 ${type.color}`} />
                  <CardTitle className="text-lg">{type.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-center mb-4">{type.description}</p>
                  <Button className="w-full">Create Registry</Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Gift className="h-6 w-6 mr-2 text-orange-500" />
              How It Works
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-orange-600">1</span>
                </div>
                <h3 className="font-semibold mb-2">Create Your Registry</h3>
                <p className="text-gray-600">Choose your registry type and add your favorite products</p>
              </div>
              <div className="text-center">
                <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-orange-600">2</span>
                </div>
                <h3 className="font-semibold mb-2">Share with Friends</h3>
                <p className="text-gray-600">Send your registry link to family and friends</p>
              </div>
              <div className="text-center">
                <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-orange-600">3</span>
                </div>
                <h3 className="font-semibold mb-2">Receive Gifts</h3>
                <p className="text-gray-600">Get the gifts you really want delivered to your door</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default Registry;
