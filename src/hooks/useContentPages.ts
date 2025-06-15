
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface ContentPage {
  id: string;
  slug: string;
  title: string;
  content: string;
  meta_description: string;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export const useContentPages = () => {
  return useQuery({
    queryKey: ['content-pages'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('content_pages')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as ContentPage[];
    },
  });
};

export const useContentPage = (slug: string) => {
  return useQuery({
    queryKey: ['content-page', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('content_pages')
        .select('*')
        .eq('slug', slug)
        .single();
      
      if (error) throw error;
      return data as ContentPage;
    },
  });
};

export const useCreateContentPage = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (page: Omit<ContentPage, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('content_pages')
        .insert(page)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['content-pages'] });
    },
  });
};

export const useUpdateContentPage = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, ...page }: Partial<ContentPage> & { id: string }) => {
      const { data, error } = await supabase
        .from('content_pages')
        .update(page)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['content-pages'] });
    },
  });
};

export const useDeleteContentPage = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('content_pages')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['content-pages'] });
    },
  });
};
