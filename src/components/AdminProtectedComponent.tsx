
import { ReactNode } from 'react';
import { useIsAdmin } from '@/hooks/useUserRole';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Shield } from 'lucide-react';

interface AdminProtectedComponentProps {
  children: ReactNode;
  fallback?: ReactNode;
}

const AdminProtectedComponent = ({ children, fallback }: AdminProtectedComponentProps) => {
  const { user } = useAuth();
  const isAdmin = useIsAdmin();

  if (!user) {
    return (
      <Card className="max-w-md mx-auto mt-8">
        <CardContent className="text-center py-8">
          <Shield className="h-12 w-12 mx-auto mb-4 text-gray-400" />
          <h3 className="text-lg font-semibold mb-2">Authentication Required</h3>
          <p className="text-gray-600 mb-4">Please log in to access this feature.</p>
          <Button onClick={() => window.location.href = '/auth'}>
            Sign In
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (!isAdmin) {
    return fallback || (
      <Card className="max-w-md mx-auto mt-8">
        <CardContent className="text-center py-8">
          <Shield className="h-12 w-12 mx-auto mb-4 text-red-400" />
          <h3 className="text-lg font-semibold mb-2">Admin Access Required</h3>
          <p className="text-gray-600">You don't have permission to access this feature.</p>
        </CardContent>
      </Card>
    );
  }

  return <>{children}</>;
};

export default AdminProtectedComponent;
