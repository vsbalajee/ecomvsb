
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface SiteSetting {
  id: string;
  key: string;
  value: string;
  description: string;
  updated_at: string;
}

export const useSiteSettings = () => {
  return useQuery({
    queryKey: ['site-settings'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .order('key');
      
      if (error) throw error;
      return data as SiteSetting[];
    },
  });
};

export const useUpdateSiteSetting = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ key, value }: { key: string; value: string }) => {
      const { data, error } = await supabase
        .from('site_settings')
        .update({ value })
        .eq('key', key)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['site-settings'] });
    },
  });
};
