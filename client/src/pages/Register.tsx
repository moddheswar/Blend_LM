import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/common/Button';
import { authApi } from '../services/api/authApi';
import { useAuthStore } from '../stores/authStore';

export const Register: React.FC = () => {
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
    const name = formData.get('name') as string;

    const res = await authApi.register({ email, password, name });
    
    if (res.success && res.data) {
      setAuth(res.data.user, res.data.token);
      navigate('/connect-llm');
    } else {
      setError(res.error?.message || 'Registration failed');
    }
    setLoading(false);
  };

  return (
    <div className="w-full max-w-md p-8 bg-surface rounded-xl border border-border shadow-sm">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-semibold text-text-primary mb-2">Create your account</h1>
        <p className="text-text-secondary text-sm">Join Blend-LM to get started</p>
      </div>

      <div className="space-y-3 mb-6">
        <Button variant="outline" className="w-full justify-center">Sign up with Google</Button>
        <Button variant="outline" className="w-full justify-center">Sign up with GitHub</Button>
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
        {error && <div className="p-3 text-sm text-danger bg-danger/10 rounded-md">{error}</div>}
        
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-1">Name</label>
          <input name="name" type="text" required className="w-full p-2 bg-background border border-border rounded-md text-text-primary focus:ring-2 focus:ring-accent outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-1">Email</label>
          <input name="email" type="email" required className="w-full p-2 bg-background border border-border rounded-md text-text-primary focus:ring-2 focus:ring-accent outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-1">Password</label>
          <input name="password" type="password" required className="w-full p-2 bg-background border border-border rounded-md text-text-primary focus:ring-2 focus:ring-accent outline-none" />
        </div>
        
        <Button type="submit" className="w-full mt-6" isLoading={loading}>Create Account</Button>
      </form>

      <p className="mt-6 text-center text-sm text-text-secondary">
        Already have an account? <Link to="/login" className="text-accent hover:underline">Sign in</Link>
      </p>
    </div>
  );
};