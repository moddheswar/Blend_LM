import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { authApi } from '../services/api/authApi';
import { useAuthStore } from '../stores/authStore';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const res = await authApi.login({ email, password });
    
    if (res.success && res.data) {
      setAuth(res.data.user, res.data.token);
      navigate('/home');
    } else {
      setError(res.error?.message || 'Invalid email or password');
    }
    setLoading(false);
  };

  return (
    <div className="w-full max-w-md p-8 bg-surface rounded-xl border border-border shadow-sm">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-semibold text-text-primary mb-2">Welcome back</h1>
        <p className="text-text-secondary text-sm">Sign in to continue to Blend-LM</p>
      </div>

      <div className="space-y-3 mb-6">
        <Button variant="outline" className="w-full justify-center">Sign in with Google</Button>
        <Button variant="outline" className="w-full justify-center">Sign in with GitHub</Button>
      </div>

      <div className="relative mb-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-surface text-text-muted">OR</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <div className="p-3 text-sm text-danger bg-danger/10 rounded-md border border-danger/20">{error}</div>}
        
        <Input name="email" type="email" required label="Email" placeholder="you@example.com" />
        
        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="block text-sm font-medium text-text-secondary">Password</label>
            <Link to="/forgot-password" className="text-sm text-accent hover:underline">Forgot password?</Link>
          </div>
          <Input name="password" type="password" required placeholder="••••••••" />
        </div>
        
        <Button type="submit" className="w-full mt-2" isLoading={loading}>Sign In</Button>
      </form>

      <p className="mt-6 text-center text-sm text-text-secondary">
        Don't have an account? <Link to="/register" className="text-accent hover:underline">Create one</Link>
      </p>
    </div>
  );
};