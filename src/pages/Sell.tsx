
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Store, TrendingUp, Users, Shield, DollarSign, Package } from 'lucide-react';

const Sell = () => {
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

  const benefits = [
    {
      icon: Users,
      title: "300+ Million Customers",
      description: "Access to Amazon's massive global customer base"
    },
    {
      icon: Shield,
      title: "Trusted Platform",
      description: "Sell with confidence on the world's most trusted marketplace"
    },
    {
      icon: Package,
      title: "Fulfillment by Amazon",
      description: "Let Amazon handle storage, packing, and shipping"
    },
    {
      icon: TrendingUp,
      title: "Business Growth Tools",
      description: "Analytics, advertising, and promotional tools to grow"
    },
    {
      icon: DollarSign,
      title: "Multiple Revenue Streams",
      description: "Sell products, services, and digital content"
    },
    {
      icon: Store,
      title: "Your Own Storefront",
      description: "Create a branded store experience for customers"
    }
  ];

  const plans = [
    {
      name: "Individual",
      price: "₹0",
      description: "Perfect for occasional sellers",
      features: [
        "₹99 per item sold",
        "Access to selling tools",
        "Customer service support",
        "Payment processing"
      ],
      buttonText: "Start Selling",
      popular: false
    },
    {
      name: "Professional",
      price: "₹999",
      description: "Best for established sellers",
      features: [
        "No per-item fee",
        "Bulk listing tools",
        "Advanced reporting",
        "API access",
        "Inventory management",
        "Premium support"
      ],
      buttonText: "Start Free Trial",
      popular: true
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Start Selling on Amazon</h1>
          <p className="text-xl mb-8">Join millions of sellers worldwide and grow your business</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-lg px-8 py-3">
              Start Selling Today
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 text-lg px-8 py-3">
              Request Info
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Benefits Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Why Sell on Amazon?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <Card key={index} className="text-center">
                  <CardHeader>
                    <div className="bg-orange-500 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="h-8 w-8" />
                    </div>
                    <CardTitle className="text-lg">{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{benefit.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Pricing Plans */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Choose Your Selling Plan</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {plans.map((plan, index) => (
              <Card key={index} className={`relative ${plan.popular ? 'border-orange-500 border-2' : ''}`}>
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-orange-500">
                    Most Popular
                  </Badge>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                  <div className="text-4xl font-bold text-orange-600">
                    {plan.price}
                    {plan.name === "Professional" && <span className="text-lg text-gray-600">/month</span>}
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <Badge className="bg-green-500 mr-3">✓</Badge>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className={`w-full ${plan.popular ? 'bg-orange-500 hover:bg-orange-600' : ''}`}
                    variant={plan.popular ? 'default' : 'outline'}
                  >
                    {plan.buttonText}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Success Stories */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Success Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <img 
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" 
                    alt="Seller" 
                    className="w-20 h-20 rounded-full mx-auto mb-4"
                  />
                  <h3 className="font-semibold mb-2">Raj Electronics</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    "Increased sales by 300% in first year on Amazon. The platform's reach is incredible."
                  </p>
                  <div className="text-orange-600 font-semibold">₹50L+ Annual Revenue</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <img 
                    src="https://images.unsplash.com/photo-1494790108755-2616c27120b3?w=100&h=100&fit=crop&crop=face" 
                    alt="Seller" 
                    className="w-20 h-20 rounded-full mx-auto mb-4"
                  />
                  <h3 className="font-semibold mb-2">Priya's Handicrafts</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    "Started as a hobby, now it's my full-time business thanks to Amazon's tools."
                  </p>
                  <div className="text-orange-600 font-semibold">₹25L+ Annual Revenue</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" 
                    alt="Seller" 
                    className="w-20 h-20 rounded-full mx-auto mb-4"
                  />
                  <h3 className="font-semibold mb-2">Tech Solutions Inc</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    "Amazon's FBA service allowed us to scale globally without infrastructure."
                  </p>
                  <div className="text-orange-600 font-semibold">₹1Cr+ Annual Revenue</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Getting Started */}
        <Card className="text-center">
          <CardHeader>
            <CardTitle className="text-2xl">Ready to Start?</CardTitle>
            <CardDescription>Join thousands of successful sellers on Amazon</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div>
                <div className="bg-orange-500 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2 text-xl font-bold">1</div>
                <h3 className="font-semibold">Create Account</h3>
                <p className="text-gray-600 text-sm">Sign up and verify your business</p>
              </div>
              <div>
                <div className="bg-orange-500 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2 text-xl font-bold">2</div>
                <h3 className="font-semibold">List Products</h3>
                <p className="text-gray-600 text-sm">Add your products with photos and descriptions</p>
              </div>
              <div>
                <div className="bg-orange-500 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2 text-xl font-bold">3</div>
                <h3 className="font-semibold">Start Selling</h3>
                <p className="text-gray-600 text-sm">Receive orders and grow your business</p>
              </div>
            </div>
            <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-lg px-12 py-3">
              Get Started Now
            </Button>
          </CardContent>
        </Card>
      </div>
      
      <Footer />
    </div>
  );
};

export default Sell;
