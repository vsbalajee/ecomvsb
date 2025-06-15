
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Gift, CreditCard, Mail, Smartphone } from 'lucide-react';

const GiftCards = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [selectedAmount, setSelectedAmount] = useState('25');

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

  const amounts = ['10', '25', '50', '100', '250', '500'];
  const designs = [
    { name: 'Birthday', image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=300&h=200&fit=crop' },
    { name: 'Thank You', image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=300&h=200&fit=crop' },
    { name: 'Congratulations', image: 'https://images.unsplash.com/photo-1464207687429-7505649dae38?w=300&h=200&fit=crop' },
    { name: 'Holiday', image: 'https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=300&h=200&fit=crop' }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Amazon Gift Cards</h1>
          <p className="text-xl text-gray-600">The perfect gift for any occasion</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Gift Card Builder */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Gift className="h-5 w-5 mr-2" />
                Design Your Gift Card
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Amount Selection */}
              <div>
                <label className="block text-sm font-medium mb-2">Amount</label>
                <div className="grid grid-cols-3 gap-2 mb-2">
                  {amounts.map((amount) => (
                    <button
                      key={amount}
                      onClick={() => setSelectedAmount(amount)}
                      className={`p-2 text-center border rounded ${
                        selectedAmount === amount 
                          ? 'border-orange-500 bg-orange-50' 
                          : 'border-gray-300'
                      }`}
                    >
                      ₹{amount}
                    </button>
                  ))}
                </div>
                <Input 
                  placeholder="Custom amount" 
                  value={selectedAmount}
                  onChange={(e) => setSelectedAmount(e.target.value)}
                />
              </div>

              {/* Design Selection */}
              <div>
                <label className="block text-sm font-medium mb-2">Choose Design</label>
                <div className="grid grid-cols-2 gap-3">
                  {designs.map((design, index) => (
                    <div key={index} className="relative cursor-pointer border-2 border-gray-200 rounded-lg overflow-hidden hover:border-orange-500">
                      <img src={design.image} alt={design.name} className="w-full h-24 object-cover" />
                      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 text-center">
                        {design.name}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Delivery Options */}
              <div>
                <label className="block text-sm font-medium mb-2">Delivery Method</label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="radio" name="delivery" className="mr-2" defaultChecked />
                    <Mail className="h-4 w-4 mr-2" />
                    Email (Instant delivery)
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="delivery" className="mr-2" />
                    <Smartphone className="h-4 w-4 mr-2" />
                    Text Message
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="delivery" className="mr-2" />
                    <CreditCard className="h-4 w-4 mr-2" />
                    Physical Card (₹20 additional)
                  </label>
                </div>
              </div>

              <div className="space-y-3">
                <Input placeholder="Recipient's email" />
                <Input placeholder="From (your name)" />
                <textarea 
                  placeholder="Personal message (optional)"
                  className="w-full p-3 border rounded-md"
                  rows={3}
                />
              </div>

              <Button className="w-full bg-orange-500 hover:bg-orange-600 text-lg py-3">
                Buy Gift Card - ₹{selectedAmount}
              </Button>
            </CardContent>
          </Card>

          {/* Gift Card Info */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Why Choose Amazon Gift Cards?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Badge className="bg-green-500">✓</Badge>
                  <div>
                    <h4 className="font-semibold">No expiry date</h4>
                    <p className="text-gray-600">Gift cards never expire</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Badge className="bg-green-500">✓</Badge>
                  <div>
                    <h4 className="font-semibold">Instant delivery</h4>
                    <p className="text-gray-600">Email gift cards arrive within minutes</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Badge className="bg-green-500">✓</Badge>
                  <div>
                    <h4 className="font-semibold">Millions of items</h4>
                    <p className="text-gray-600">Redeemable on anything sold by Amazon</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Badge className="bg-green-500">✓</Badge>
                  <div>
                    <h4 className="font-semibold">Easy to redeem</h4>
                    <p className="text-gray-600">Apply to your account with one click</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Gift Card Balance</CardTitle>
                <CardDescription>Check or redeem your gift card</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input placeholder="Enter gift card code" />
                <div className="flex space-x-2">
                  <Button variant="outline" className="flex-1">
                    Check Balance
                  </Button>
                  <Button className="flex-1 bg-orange-500 hover:bg-orange-600">
                    Redeem
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Corporate Gift Cards</CardTitle>
                <CardDescription>Perfect for employee rewards and client gifts</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">
                  Learn More About Bulk Orders
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

export default GiftCards;
