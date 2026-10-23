import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../app/providers/AuthContext';
import { LoadingSpinner } from '../ui/LoadingState';

export function ProtectedRoute({ children, allowedRoles }) {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <LoadingSpinner message="Memeriksa sesi login..." />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // If applicant tries to access admin or vice versa
    return (
      <Navigate
        to={user.role === 'admin' ? '/admin/dashboard' : '/applicant/dashboard'}
        replace
      />
    );
  }

  return children;
}
