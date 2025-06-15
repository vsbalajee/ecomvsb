
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface Review {
  id: string;
  user_id: string;
  product_id: string;
  rating: number;
  title: string;
  comment: string;
  is_verified_purchase: boolean;
  created_at: string;
  updated_at: string;
  profiles?: {
    full_name: string;
  };
}

export const useReviews = (productId?: string) => {
  return useQuery({
    queryKey: ['reviews', productId],
    queryFn: async () => {
      let query = supabase
        .from('reviews')
        .select(`
          *,
          profiles!inner(full_name)
        `)
        .order('created_at', { ascending: false });
      
      if (productId) {
        query = query.eq('product_id', productId);
      }
      
      const { data, error } = await query;
      if (error) throw error;
      return data as Review[];
    },
  });
};

export const useCreateReview = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (review: {
      product_id: string;
      rating: number;
      title: string;
      comment: string;
    }) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');
      
      const { data, error } = await supabase
        .from('reviews')
        .insert({
          ...review,
          user_id: user.id,
        })
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
      queryClient.invalidateQueries({ queryKey: ['reviews', variables.product_id] });
    },
  });
};

export const useUpdateReview = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, ...review }: {
      id: string;
      rating: number;
      title: string;
      comment: string;
    }) => {
      const { data, error } = await supabase
        .from('reviews')
        .update(review)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
    },
  });
};

export const useDeleteReview = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('reviews')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
    },
  });
};
