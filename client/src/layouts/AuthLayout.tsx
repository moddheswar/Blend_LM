import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';

export const AuthLayout: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuthStore();

  if (isLoading) {
    return <div className="min-h-screen bg-background flex items-center justify-center text-text-secondary">Loading...</div>;
  }

  // If already authenticated, do not allow access to login/register
  if (isAuthenticated) {
    return <Navigate to="/home" replace />;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="w-full flex justify-center mb-8">
        {/* Simple Text Logo for V1 - can be replaced with SVG */}
        <h1 className="text-3xl font-bold tracking-tight text-text-primary">
          Blend<span className="text-accent">-LM</span>
        </h1>
      </div>
      <Outlet />
    </div>
  );
};