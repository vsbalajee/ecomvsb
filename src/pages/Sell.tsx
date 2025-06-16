
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Store, TrendingUp, Users, Shield, Package, CreditCard } from 'lucide-react';

const Sell = () => {
  const benefits = [
    {
      icon: Users,
      title: 'Millions of Customers',
      description: 'Reach millions of active buyers across the country'
    },
    {
      icon: TrendingUp,
      title: 'Boost Your Sales',
      description: 'Increase your revenue with our marketing tools'
    },
    {
      icon: Shield,
      title: 'Secure Payments',
      description: 'Get paid securely and on time, every time'
    },
    {
      icon: Package,
      title: 'Easy Fulfillment',
      description: 'We handle storage, packing, and shipping for you'
    }
  ];

  const steps = [
    {
      step: 1,
      title: 'Create Your Account',
      description: 'Sign up as a seller and verify your business details'
    },
    {
      step: 2,
      title: 'List Your Products',
      description: 'Add product photos, descriptions, and pricing'
    },
    {
      step: 3,
      title: 'Manage Orders',
      description: 'Process orders and track your sales performance'
    },
    {
      step: 4,
      title: 'Get Paid',
      description: 'Receive payments directly to your bank account'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">Start Selling Today</h1>
          <p className="text-xl lg:text-2xl mb-8">Join thousands of sellers growing their business with us</p>
          <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100 text-lg px-8 py-4">
            <Store className="h-6 w-6 mr-2" />
            Become a Seller
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-2 sm:px-4 py-8">
        {/* Benefits Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">Why Sell With Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <Card key={index} className="text-center">
                  <CardHeader>
                    <IconComponent className="h-12 w-12 mx-auto text-orange-500 mb-4" />
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

        {/* How It Works */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step) => (
              <div key={step.step} className="text-center">
                <div className="bg-orange-500 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold">{step.step}</span>
                </div>
                <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Seller Registration Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Start Your Seller Journey</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input placeholder="First Name" />
                <Input placeholder="Last Name" />
              </div>
              <Input placeholder="Business Name" />
              <Input placeholder="Email Address" type="email" />
              <Input placeholder="Phone Number" type="tel" />
              <Input placeholder="Business Address" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input placeholder="City" />
                <Input placeholder="PIN Code" />
              </div>
              <Input placeholder="GST Number (if applicable)" />
              <Button className="w-full" size="lg">
                Register as Seller
              </Button>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="h-6 w-6 mr-2 text-green-500" />
                  Seller Fees
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Registration Fee</span>
                    <span className="font-semibold text-green-600">FREE</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Commission per sale</span>
                    <span className="font-semibold">5-15%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Payment processing</span>
                    <span className="font-semibold">2.9%</span>
                  </div>
                  <div className="border-t pt-2">
                    <div className="flex justify-between">
                      <span className="font-semibold">Monthly fee</span>
                      <span className="font-semibold text-green-600">₹0</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Seller Support</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• 24/7 customer support</li>
                  <li>• Dedicated seller dashboard</li>
                  <li>• Marketing and promotional tools</li>
                  <li>• Analytics and reporting</li>
                  <li>• Training resources and webinars</li>
                  <li>• Inventory management tools</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Ready to Get Started?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Join our seller community and start growing your business today. 
                  Our team will guide you through the entire process.
                </p>
                <Button variant="outline" className="w-full">
                  Download Seller App
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Sell;
