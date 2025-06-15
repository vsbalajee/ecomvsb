
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category_id: string;
  supplier_id: string;
  image_url: string;
  sku: string;
  stock_quantity: number;
  is_active: boolean;
  created_at: string;
  updated_at?: string;
  categories?: {
    name: string;
  };
}

export const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          categories (
            name
          )
        `)
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching products:', error);
        throw new Error('Failed to load products. Please try again.');
      }
      return data as Product[];
    },
  });
};

export const useProductsByCategory = (categoryId?: string) => {
  return useQuery({
    queryKey: ['products', 'category', categoryId],
    queryFn: async () => {
      if (!categoryId) return [];
      
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          categories (
            name
          )
        `)
        .eq('is_active', true)
        .eq('category_id', categoryId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching products by category:', error);
        throw new Error('Failed to load products. Please try again.');
      }
      return data as Product[];
    },
    enabled: !!categoryId,
  });
};
