
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  unit_price: number;
  products: {
    name: string;
    image_url: string;
  };
}

export interface Order {
  id: string;
  user_id: string;
  total_amount: number;
  shipping_address: string;
  status: string;
  created_at: string;
  updated_at: string;
  order_items: OrderItem[];
  profiles?: {
    full_name: string;
    email: string;
  } | null;
}

export const useOrders = (userId?: string) => {
  return useQuery({
    queryKey: ['orders', userId],
    queryFn: async () => {
      if (!userId) return [];
      
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          order_items!fk_order_items_order(
            *,
            products!fk_order_items_product(name, image_url)
          )
        `)
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Order[];
    },
    enabled: !!userId,
  });
};

export const useAllOrders = () => {
  return useQuery({
    queryKey: ['all-orders'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          order_items!fk_order_items_order(
            *,
            products!fk_order_items_product(name, image_url)
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Get user profiles separately to avoid relation issues
      const ordersWithProfiles = await Promise.all(
        (data || []).map(async (order) => {
          const { data: profile } = await supabase
            .from('profiles')
            .select('full_name, email')
            .eq('id', order.user_id)
            .single();
          
          return {
            ...order,
            profiles: profile
          };
        })
      );
      
      return ordersWithProfiles;
    },
  });
};
