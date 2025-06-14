
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export type AppRole = 'admin' | 'user';

export const useUserRole = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['user-role', user?.id],
    queryFn: async () => {
      if (!user?.id) return null;
      
      // Call the security definer function to get current user role
      const { data, error } = await supabase.rpc('get_current_user_role');

      if (error) {
        console.error('Error fetching user role:', error);
        return 'user' as AppRole; // Default to user role
      }
      
      return (data || 'user') as AppRole;
    },
    enabled: !!user?.id,
  });
};

export const useIsAdmin = () => {
  const { data: role } = useUserRole();
  return role === 'admin';
};
