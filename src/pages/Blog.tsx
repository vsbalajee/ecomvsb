
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, User } from 'lucide-react';

const Blog = () => {
  const posts = [
    {
      title: "The Future of E-commerce: AI and Personalization",
      excerpt: "Discover how artificial intelligence is revolutionizing online shopping experiences and creating more personalized customer journeys.",
      author: "Sarah Johnson",
      date: "December 10, 2024",
      category: "Technology",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=200&fit=crop"
    },
    {
      title: "Sustainable Packaging: Our Environmental Commitment",
      excerpt: "Learn about our latest initiatives to reduce environmental impact through innovative packaging solutions and carbon-neutral shipping.",
      author: "Michael Chen",
      date: "December 8, 2024",
      category: "Sustainability",
      image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=400&h=200&fit=crop"
    },
    {
      title: "Small Business Success Stories",
      excerpt: "Meet the entrepreneurs who have built thriving businesses on our platform and learn from their journey to success.",
      author: "Emily Rodriguez",
      date: "December 5, 2024",
      category: "Business",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=200&fit=crop"
    },
    {
      title: "Innovation in Last-Mile Delivery",
      excerpt: "Explore our cutting-edge delivery technologies, from drones to autonomous vehicles, that are transforming how packages reach customers.",
      author: "David Park",
      date: "December 3, 2024",
      category: "Logistics",
      image: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=400&h=200&fit=crop"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Amazon Blog</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay updated with the latest news, insights, and stories from Amazon
          </p>
        </div>

        {/* Featured Post */}
        <Card className="mb-8 overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2">
              <img 
                src={posts[0].image} 
                alt={posts[0].title}
                className="w-full h-64 md:h-full object-cover"
              />
            </div>
            <div className="md:w-1/2 p-6">
              <Badge className="mb-3">{posts[0].category}</Badge>
              <h2 className="text-2xl font-bold mb-3">{posts[0].title}</h2>
              <p className="text-gray-600 mb-4">{posts[0].excerpt}</p>
              <div className="flex items-center text-sm text-gray-500 space-x-4">
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-1" />
                  {posts[0].author}
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  {posts[0].date}
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.slice(1).map((post, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
              <div className="aspect-video">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader>
                <Badge variant="outline" className="w-fit">{post.category}</Badge>
                <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                <CardDescription className="line-clamp-3">{post.excerpt}</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center text-sm text-gray-500 space-x-4">
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-1" />
                    {post.author}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {post.date}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Newsletter Signup */}
        <Card className="mt-12">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Stay Updated</CardTitle>
            <CardDescription>
              Subscribe to our newsletter for the latest updates and insights
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex max-w-md mx-auto gap-2">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 border rounded-md"
              />
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-md">
                Subscribe
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Footer />
    </div>
  );
};

export default Blog;
