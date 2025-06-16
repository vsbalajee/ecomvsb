
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Gift, CreditCard, Smartphone, Mail } from 'lucide-react';

const GiftCards = () => {
  const giftCardDesigns = [
    { id: 1, name: 'Birthday Celebration', image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=300&h=200&fit=crop', color: 'bg-pink-100' },
    { id: 2, name: 'Thank You', image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=300&h=200&fit=crop', color: 'bg-blue-100' },
    { id: 3, name: 'Congratulations', image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=300&h=200&fit=crop', color: 'bg-green-100' },
    { id: 4, name: 'Just Because', image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=300&h=200&fit=crop', color: 'bg-purple-100' },
  ];

  const amounts = [500, 1000, 2000, 5000, 10000];

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      
      <div className="max-w-7xl mx-auto px-2 sm:px-4 py-4 sm:py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Gift Cards</h1>
          <p className="text-gray-600 text-lg">The perfect gift for any occasion</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Gift Card Purchase */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Gift className="h-6 w-6 mr-2 text-orange-500" />
                Purchase Gift Card
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Design Selection */}
              <div>
                <h3 className="font-semibold mb-3">Choose Design</h3>
                <div className="grid grid-cols-2 gap-3">
                  {giftCardDesigns.map((design) => (
                    <div key={design.id} className="cursor-pointer border-2 border-transparent hover:border-orange-500 rounded-lg">
                      <img 
                        src={design.image} 
                        alt={design.name}
                        className="w-full h-24 object-cover rounded-lg"
                      />
                      <p className="text-sm text-center mt-1">{design.name}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Amount Selection */}
              <div>
                <h3 className="font-semibold mb-3">Select Amount</h3>
                <div className="grid grid-cols-3 gap-3 mb-3">
                  {amounts.map((amount) => (
                    <Button key={amount} variant="outline" className="h-12">
                      ₹{amount}
                    </Button>
                  ))}
                </div>
                <Input placeholder="Custom amount" type="number" />
              </div>

              {/* Recipient Details */}
              <div>
                <h3 className="font-semibold mb-3">Recipient Details</h3>
                <div className="space-y-3">
                  <Input placeholder="Recipient's name" />
                  <Input placeholder="Recipient's email" type="email" />
                  <textarea 
                    className="w-full p-3 border rounded-md resize-none"
                    rows={3}
                    placeholder="Personal message (optional)"
                  />
                </div>
              </div>

              <Button className="w-full" size="lg">
                Add to Cart - ₹1000
              </Button>
            </CardContent>
          </Card>

          {/* Gift Card Info */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Delivery Options</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-blue-500" />
                  <div>
                    <h4 className="font-semibold">Email Delivery</h4>
                    <p className="text-sm text-gray-600">Instant delivery to recipient's email</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Smartphone className="h-5 w-5 text-green-500" />
                  <div>
                    <h4 className="font-semibold">Mobile Delivery</h4>
                    <p className="text-sm text-gray-600">Send via SMS to mobile number</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <CreditCard className="h-5 w-5 text-purple-500" />
                  <div>
                    <h4 className="font-semibold">Physical Card</h4>
                    <p className="text-sm text-gray-600">Beautiful printed card delivered to address</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Gift Card Features</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Valid for 12 months from purchase date</li>
                  <li>• Can be used for any product on our platform</li>
                  <li>• Remaining balance carries forward</li>
                  <li>• Easy to redeem at checkout</li>
                  <li>• No additional processing fees</li>
                  <li>• Can be combined with other offers</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Redeem Gift Card</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Input placeholder="Enter gift card code" />
                <Button variant="outline" className="w-full">
                  Check Balance
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
