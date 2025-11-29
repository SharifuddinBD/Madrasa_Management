'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const withAuth = (WrappedComponent: React.ComponentType<any>, allowedRoles: string[]) => {
  const AuthComponent = (props: any) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const userAuth = localStorage.getItem('userAuth');
      if (userAuth) {
        const userData = JSON.parse(userAuth);
        if (allowedRoles.includes(userData.role)) {
          setIsLoading(false);
        } else {
          // Role not allowed, redirect to login
          router.replace('/login');
        }
      } else {
        // Not authenticated, redirect to login
        router.replace('/login');
      }
    }, [router]);

    if (isLoading) {
      // You can return a loader here
      return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-600 mx-auto"></div>
            <p className="mt-4 text-lg text-gray-700">Loading...</p>
          </div>
        </div>
      );
    }

    return <WrappedComponent {...props} />;
  };

  AuthComponent.displayName = `WithAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return AuthComponent;
};

export default withAuth;
