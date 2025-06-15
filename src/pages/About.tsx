
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Target, Award, Globe } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">About Amazon</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're guided by four principles: customer obsession rather than competitor focus, 
            passion for invention, commitment to operational excellence, and long-term thinking.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <Card>
            <CardHeader className="text-center">
              <Users className="h-8 w-8 mx-auto text-orange-500 mb-2" />
              <CardTitle>300M+</CardTitle>
              <CardDescription>Active Customers</CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="text-center">
              <Globe className="h-8 w-8 mx-auto text-orange-500 mb-2" />
              <CardTitle>200+</CardTitle>
              <CardDescription>Countries Served</CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="text-center">
              <Target className="h-8 w-8 mx-auto text-orange-500 mb-2" />
              <CardTitle>12M+</CardTitle>
              <CardDescription>Products Available</CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="text-center">
              <Award className="h-8 w-8 mx-auto text-orange-500 mb-2" />
              <CardTitle>1.5M+</CardTitle>
              <CardDescription>Employees Worldwide</CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Our Story */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">Our Story</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Amazon was founded in 1994 by Jeff Bezos as an online bookstore. What started as a 
              simple idea has grown into one of the world's largest e-commerce and cloud computing companies.
            </p>
            <p>
              Today, Amazon serves hundreds of millions of customers worldwide with a vast selection 
              of products, from books and electronics to groceries and beyond. We've revolutionized 
              how people shop, read, and compute in the cloud.
            </p>
            <p>
              Our mission is to be Earth's Most Customer-Centric Company, where customers can find 
              and discover anything they might want to buy online.
            </p>
          </CardContent>
        </Card>

        {/* Our Values */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Leadership Principles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">Customer Obsession</h3>
                <p className="text-gray-600">We start with the customer and work backwards.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Ownership</h3>
                <p className="text-gray-600">We act on behalf of the entire company.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Invent and Simplify</h3>
                <p className="text-gray-600">We seek new ways to simplify and improve.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Learn and Be Curious</h3>
                <p className="text-gray-600">We never stop learning and improving.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Footer />
    </div>
  );
};

export default About;
