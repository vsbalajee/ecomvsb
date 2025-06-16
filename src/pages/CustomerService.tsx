
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Phone, Mail, MessageCircle, Clock, Truck, CreditCard, RotateCcw } from 'lucide-react';

const CustomerService = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      
      <div className="max-w-7xl mx-auto px-2 sm:px-4 py-4 sm:py-8">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">Customer Service</h1>
          <p className="text-gray-600 text-sm sm:text-base">We're here to help you with any questions or concerns</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-8">
          {/* Contact Options */}
          <div className="space-y-4 sm:space-y-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Get in Touch</h2>
            
            <div className="grid gap-4">
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-orange-500" />
                    <CardTitle className="text-lg">Phone Support</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-2">+91 1800-123-4567</p>
                  <p className="text-sm text-gray-500">Available 24/7</p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-orange-500" />
                    <CardTitle className="text-lg">Email Support</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-2">support@ecom.com</p>
                  <p className="text-sm text-gray-500">Response within 24 hours</p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center space-x-3">
                    <MessageCircle className="h-5 w-5 text-orange-500" />
                    <CardTitle className="text-lg">Live Chat</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-2">Chat with our support team</p>
                  <Button className="bg-orange-500 hover:bg-orange-600">Start Chat</Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl sm:text-2xl">Send us a Message</CardTitle>
              <CardDescription>Fill out the form below and we'll get back to you soon</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">First Name</label>
                  <Input placeholder="Enter your first name" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Last Name</label>
                  <Input placeholder="Enter your last name" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <Input type="email" placeholder="Enter your email" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Subject</label>
                <Input placeholder="What can we help you with?" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <Textarea placeholder="Describe your issue or question" rows={4} />
              </div>
              <Button className="w-full bg-orange-500 hover:bg-orange-600">Send Message</Button>
            </CardContent>
          </Card>
        </div>

        {/* FAQ Section */}
        <div className="mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-3">
                  <Truck className="h-5 w-5 text-orange-500" />
                  <CardTitle className="text-lg">Shipping & Delivery</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="font-medium">How long does shipping take?</p>
                    <p className="text-gray-600">Standard delivery: 3-5 business days</p>
                  </div>
                  <div>
                    <p className="font-medium">Do you offer free shipping?</p>
                    <p className="text-gray-600">Yes, free shipping on orders over ₹500</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-3">
                  <RotateCcw className="h-5 w-5 text-orange-500" />
                  <CardTitle className="text-lg">Returns & Refunds</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="font-medium">What's your return policy?</p>
                    <p className="text-gray-600">30-day return policy for most items</p>
                  </div>
                  <div>
                    <p className="font-medium">How do I return an item?</p>
                    <p className="text-gray-600">Go to Orders & Returns to start a return</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-3">
                  <CreditCard className="h-5 w-5 text-orange-500" />
                  <CardTitle className="text-lg">Payment & Billing</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="font-medium">What payment methods do you accept?</p>
                    <p className="text-gray-600">Credit cards, debit cards, UPI, and wallets</p>
                  </div>
                  <div>
                    <p className="font-medium">Is my payment information secure?</p>
                    <p className="text-gray-600">Yes, we use industry-standard encryption</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-orange-500" />
                  <CardTitle className="text-lg">Account & Orders</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="font-medium">How do I track my order?</p>
                    <p className="text-gray-600">Visit Orders & Returns for tracking info</p>
                  </div>
                  <div>
                    <p className="font-medium">Can I change or cancel my order?</p>
                    <p className="text-gray-600">Changes possible within 1 hour of ordering</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CustomerService;
