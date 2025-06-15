
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Gift, Heart, Baby, GraduationCap, Home } from 'lucide-react';

const Registry = () => {
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

  const registryTypes = [
    {
      icon: Heart,
      title: "Wedding Registry",
      description: "Create your perfect wedding wishlist",
      color: "bg-pink-500"
    },
    {
      icon: Baby,
      title: "Baby Registry",
      description: "Everything you need for your little one",
      color: "bg-blue-500"
    },
    {
      icon: GraduationCap,
      title: "Graduation Registry",
      description: "Celebrate achievements with practical gifts",
      color: "bg-purple-500"
    },
    {
      icon: Home,
      title: "Housewarming Registry",
      description: "New home essentials",
      color: "bg-green-500"
    },
    {
      icon: Gift,
      title: "Birthday Registry",
      description: "Make birthdays memorable",
      color: "bg-yellow-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Gift Registry</h1>
          <p className="text-xl text-gray-600">Create a registry for any occasion and share it with friends and family</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {registryTypes.map((registry, index) => {
            const IconComponent = registry.icon;
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader className="text-center">
                  <div className={`w-16 h-16 ${registry.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle>{registry.title}</CardTitle>
                  <CardDescription>{registry.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full bg-orange-500 hover:bg-orange-600">
                    Create Registry
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* How it works */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">How ECOM Registry Works</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-orange-500 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">1</div>
                <h3 className="font-semibold mb-2">Create Your Registry</h3>
                <p className="text-gray-600">Add items from millions of products on ECOM</p>
              </div>
              <div className="text-center">
                <div className="bg-orange-500 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">2</div>
                <h3 className="font-semibold mb-2">Share with Others</h3>
                <p className="text-gray-600">Send your registry link to friends and family</p>
              </div>
              <div className="text-center">
                <div className="bg-orange-500 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">3</div>
                <h3 className="font-semibold mb-2">Receive Gifts</h3>
                <p className="text-gray-600">Get exactly what you want, when you want it</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Find a Registry */}
        <Card>
          <CardHeader>
            <CardTitle>Find a Friend's Registry</CardTitle>
            <CardDescription>Search for registries by name or email</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <input 
                type="text" 
                placeholder="Enter name or email"
                className="flex-1 px-4 py-2 border rounded-md"
              />
              <Button className="bg-orange-500 hover:bg-orange-600">
                Search Registries
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Footer />
    </div>
  );
};

export default Registry;
