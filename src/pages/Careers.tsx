
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock, DollarSign } from 'lucide-react';

const Careers = () => {
  const jobs = [
    {
      title: "Software Development Engineer",
      location: "Seattle, WA",
      type: "Full-time",
      salary: "$120,000 - $180,000",
      department: "Engineering"
    },
    {
      title: "Product Manager",
      location: "New York, NY",
      type: "Full-time",
      salary: "$140,000 - $200,000",
      department: "Product"
    },
    {
      title: "Data Scientist",
      location: "Austin, TX",
      type: "Full-time",
      salary: "$130,000 - $190,000",
      department: "Analytics"
    },
    {
      title: "UX Designer",
      location: "San Francisco, CA",
      type: "Full-time",
      salary: "$110,000 - $160,000",
      department: "Design"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Join Our Team</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Help us build the future of e-commerce. We're looking for passionate individuals 
            who want to make a difference.
          </p>
        </div>

        {/* Why Work at Amazon */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">Why Work at Amazon?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-orange-500 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  💡
                </div>
                <h3 className="font-semibold mb-2">Innovation</h3>
                <p className="text-gray-600">Work on cutting-edge technology that impacts millions</p>
              </div>
              <div className="text-center">
                <div className="bg-orange-500 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  🚀
                </div>
                <h3 className="font-semibold mb-2">Growth</h3>
                <p className="text-gray-600">Accelerate your career with learning opportunities</p>
              </div>
              <div className="text-center">
                <div className="bg-orange-500 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  🌍
                </div>
                <h3 className="font-semibold mb-2">Impact</h3>
                <p className="text-gray-600">Make a global impact on how people shop and live</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Open Positions */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Open Positions</h2>
          <div className="space-y-4">
            {jobs.map((job, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">{job.title}</h3>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-2">
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {job.location}
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {job.type}
                        </div>
                        <div className="flex items-center">
                          <DollarSign className="h-4 w-4 mr-1" />
                          {job.salary}
                        </div>
                      </div>
                      <Badge variant="outline">{job.department}</Badge>
                    </div>
                    <Button className="mt-4 md:mt-0 bg-orange-500 hover:bg-orange-600">
                      Apply Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Benefits */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Benefits & Perks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <h3 className="font-semibold mb-2">Health & Wellness</h3>
                <ul className="text-gray-600 text-sm space-y-1">
                  <li>• Medical, dental, vision</li>
                  <li>• Mental health support</li>
                  <li>• Fitness reimbursement</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Financial</h3>
                <ul className="text-gray-600 text-sm space-y-1">
                  <li>• Competitive salary</li>
                  <li>• Stock options</li>
                  <li>• 401(k) matching</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Time Off</h3>
                <ul className="text-gray-600 text-sm space-y-1">
                  <li>• Paid vacation</li>
                  <li>• Personal days</li>
                  <li>• Parental leave</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Development</h3>
                <ul className="text-gray-600 text-sm space-y-1">
                  <li>• Learning budget</li>
                  <li>• Conference attendance</li>
                  <li>• Internal training</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Footer />
    </div>
  );
};

export default Careers;
