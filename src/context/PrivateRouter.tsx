'use client';
import { useContext } from 'react';
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/context/AuthProvider';

const PrivateRoute = ({ children, requiredRole }: { children: React.ReactNode, requiredRole: string }) => {
  const { authenticated, role } = useContext(AuthContext);
  const router = useRouter();

  if (!authenticated) {
    router.push('/');
    return null;
  }

  if (requiredRole && role !== requiredRole) {
    router.push('/');
    return null;
  }

  return <>{children}</>;
};

export default PrivateRoute;
