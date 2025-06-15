
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useReviews, useCreateReview } from '@/hooks/useReviews';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Star, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ReviewsSectionProps {
  productId: string;
}

const ReviewsSection = ({ productId }: ReviewsSectionProps) => {
  const { user } = useAuth();
  const { data: reviews, isLoading } = useReviews(productId);
  const createReview = useCreateReview();
  const { toast } = useToast();
  
  const [showForm, setShowForm] = useState(false);
  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to leave a review.",
        variant: "destructive",
      });
      return;
    }

    try {
      await createReview.mutateAsync({
        product_id: productId,
        rating,
        title,
        comment,
      });
      
      toast({
        title: "Review Added",
        description: "Thank you for your review!",
      });
      
      setShowForm(false);
      setTitle('');
      setComment('');
      setRating(5);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add review. Please try again.",
        variant: "destructive",
      });
    }
  };

  const renderStars = (rating: number, interactive = false, onRate?: (rating: number) => void) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
            } ${interactive ? 'cursor-pointer hover:text-yellow-400' : ''}`}
            onClick={() => interactive && onRate && onRate(star)}
          />
        ))}
      </div>
    );
  };

  if (isLoading) return <div>Loading reviews...</div>;

  const averageRating = reviews?.length 
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
    : 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold">Customer Reviews</h3>
          {reviews?.length > 0 && (
            <div className="flex items-center space-x-2 mt-2">
              {renderStars(Math.round(averageRating))}
              <span className="text-sm text-gray-600">
                {averageRating.toFixed(1)} out of 5 ({reviews.length} reviews)
              </span>
            </div>
          )}
        </div>
        
        {user && !showForm && (
          <Button onClick={() => setShowForm(true)}>
            Write a Review
          </Button>
        )}
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>Write a Review</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Rating</label>
                {renderStars(rating, true, setRating)}
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Title</label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Summary of your review"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Review</label>
                <Textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Tell others about your experience with this product"
                  rows={4}
                  required
                />
              </div>
              
              <div className="flex space-x-2">
                <Button type="submit" disabled={createReview.isPending}>
                  {createReview.isPending ? 'Submitting...' : 'Submit Review'}
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        {reviews?.map((review) => (
          <Card key={review.id}>
            <CardContent className="pt-6">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="bg-gray-200 rounded-full p-2">
                    <User className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="font-medium">
                      {review.profiles?.full_name || 'Anonymous User'}
                    </div>
                    <div className="text-sm text-gray-500">
                      {new Date(review.created_at).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {renderStars(review.rating)}
                  {review.is_verified_purchase && (
                    <Badge variant="secondary" className="text-xs">
                      Verified Purchase
                    </Badge>
                  )}
                </div>
              </div>
              
              <h4 className="font-semibold mb-2">{review.title}</h4>
              <p className="text-gray-700">{review.comment}</p>
            </CardContent>
          </Card>
        ))}
        
        {reviews?.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No reviews yet. Be the first to review this product!
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewsSection;
