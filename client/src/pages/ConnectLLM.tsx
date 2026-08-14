import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/common/Button';
import { llmApi } from '../services/api/llmApi';
import { LLMConnection, LLMProviderId } from '../types/llm';

export const ConnectLLM: React.FC = () => {
  const navigate = useNavigate();
  const [connections, setConnections] = useState<LLMConnection[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchConnections();
  }, []);

  const fetchConnections = async () => {
    setLoading(true);
    const res = await llmApi.getConnections();
    if (res.success && res.data) {
      setConnections(res.data.connections);
    }
    setLoading(false);
  };

  const handleConnect = async (providerId: 'chatgpt' | 'gemini' | 'claude') => {
    // In a real app, this might trigger a backend flow or open an OAuth popup
    const res = await llmApi.startConnection(providerId);
    if (res.success) {
      // The backend returns that auth is required, open provider window, then poll/refresh
      fetchConnections();
    }
  };

  const hasConnected = connections.some(c => c.status === 'connected');

  if (loading) return <div className="text-text-secondary">Loading providers...</div>;

  return (
    <div className="w-full max-w-2xl p-8 bg-surface rounded-xl border border-border shadow-sm">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-text-primary mb-2">Connect your AI</h1>
        <p className="text-text-secondary">Connect at least one AI provider to start using Blend-LM.</p>
      </div>

      <div className="space-y-4 mb-8">
        {['chatgpt', 'gemini', 'claude'].map((provider) => {
          const conn = connections.find(c => c.providerId === provider);
          const isConnected = conn?.status === 'connected';

          return (
            <div key={provider} className="flex items-center justify-between p-4 border border-border rounded-lg bg-background">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-surface-elevated rounded-md flex items-center justify-center text-text-primary font-bold uppercase">
                  {provider.charAt(0)}
                </div>
                <div>
                  <h3 className="font-medium text-text-primary capitalize">{provider}</h3>
                  <p className="text-sm text-text-muted">
                    {isConnected ? 'Connected ✓' : conn?.status === 'authentication_required' ? 'Authentication required' : 'Not connected'}
                  </p>
                </div>
              </div>
              <Button 
                variant={isConnected ? 'secondary' : 'primary'}
                onClick={() => handleConnect(provider as any)}
                disabled={isConnected}
              >
                {isConnected ? 'Manage' : 'Connect'}
              </Button>
            </div>
          );
        })}
      </div>

      <div className="flex justify-end pt-4 border-t border-border">
        <Button 
          onClick={() => navigate('/home')} 
          disabled={!hasConnected}
        >
          Continue to App
        </Button>
      </div>
    </div>
  );
};