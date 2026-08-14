import React, { useState, useEffect } from 'react';
import { Button } from '../components/common/Button';
import { useAuthStore } from '../stores/authStore';
import { useThemeStore } from '../stores/themeStore';
import { llmApi } from '../services/api/llmApi';
import { authApi } from '../services/api/authApi';
import { LLMConnection } from '../types/llm';

type SettingsTab = 'account' | 'appearance' | 'models';

export const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<SettingsTab>('account');
  
  return (
    <div className="flex h-full w-full bg-background">
      <div className="w-64 border-r border-border p-4 bg-surface">
        <h2 className="text-lg font-semibold text-text-primary mb-6">Settings</h2>
        <nav className="flex flex-col gap-1">
          <TabButton active={activeTab === 'account'} onClick={() => setActiveTab('account')}>Account</TabButton>
          <TabButton active={activeTab === 'appearance'} onClick={() => setActiveTab('appearance')}>Appearance</TabButton>
          <TabButton active={activeTab === 'models'} onClick={() => setActiveTab('models')}>AI Models</TabButton>
        </nav>
      </div>
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-2xl">
          {activeTab === 'account' && <AccountSettings />}
          {activeTab === 'appearance' && <AppearanceSettings />}
          {activeTab === 'models' && <ModelSettings />}
        </div>
      </div>
    </div>
  );
};

const TabButton: React.FC<{ active: boolean; onClick: () => void; children: React.ReactNode }> = ({ active, onClick, children }) => (
  <button
    onClick={onClick}
    className={`text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      active ? 'bg-surface-elevated text-text-primary' : 'text-text-secondary hover:bg-surface-elevated hover:text-text-primary'
    }`}
  >
    {children}
  </button>
);

const AccountSettings: React.FC = () => {
  const { user, clearAuth } = useAuthStore();

  const handleLogout = async () => {
    await authApi.logout();
    clearAuth(); // Global state clears, redirecting to /login automatically via layout
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-medium text-text-primary mb-1">Account details</h3>
        <p className="text-sm text-text-secondary mb-4">View and manage your personal data.</p>
        
        <div className="bg-surface border border-border rounded-lg p-4 space-y-4">
          <div>
            <span className="block text-xs font-medium text-text-muted uppercase">Name</span>
            <span className="text-text-primary">{user?.name || 'Loading...'}</span>
          </div>
          <div>
            <span className="block text-xs font-medium text-text-muted uppercase">Email</span>
            <span className="text-text-primary">{user?.email || 'Loading...'}</span>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-medium text-text-primary mb-1">Danger Zone</h3>
        <p className="text-sm text-text-secondary mb-4">Irreversible account actions.</p>
        
        <div className="bg-surface border border-danger/20 rounded-lg p-4 space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium text-text-primary">Sign Out</p>
              <p className="text-sm text-text-secondary">Sign out of this device.</p>
            </div>
            <Button variant="secondary" onClick={handleLogout}>Sign Out</Button>
          </div>
          <div className="h-px bg-border w-full" />
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium text-danger">Delete Account</p>
              <p className="text-sm text-text-secondary">Permanently delete your account and data.</p>
            </div>
            <Button variant="danger">Delete Account</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const AppearanceSettings: React.FC = () => {
  const { theme, setTheme } = useThemeStore();

  return (
    <div>
      <h3 className="text-xl font-medium text-text-primary mb-1">Appearance</h3>
      <p className="text-sm text-text-secondary mb-6">Customize how Blend-LM looks on your device.</p>
      
      <div className="grid grid-cols-2 gap-4 max-w-md">
        <button 
          onClick={() => setTheme('light')}
          className={`p-4 border rounded-xl text-left flex flex-col items-center gap-3 transition-colors ${theme === 'light' ? 'border-accent bg-accent/5' : 'border-border bg-surface hover:border-text-muted'}`}
        >
          <div className="w-full h-24 bg-[#f8fafc] rounded-md border border-gray-200 flex flex-col gap-2 p-2">
            <div className="h-3 w-1/3 bg-gray-300 rounded" />
            <div className="h-2 w-full bg-gray-200 rounded" />
            <div className="h-2 w-4/5 bg-gray-200 rounded" />
          </div>
          <span className="font-medium text-text-primary">Light Theme</span>
        </button>

        <button 
          onClick={() => setTheme('dark')}
          className={`p-4 border rounded-xl text-left flex flex-col items-center gap-3 transition-colors ${theme === 'dark' ? 'border-accent bg-accent/5' : 'border-border bg-surface hover:border-text-muted'}`}
        >
          <div className="w-full h-24 bg-[#09090b] rounded-md border border-gray-800 flex flex-col gap-2 p-2">
            <div className="h-3 w-1/3 bg-gray-700 rounded" />
            <div className="h-2 w-full bg-gray-800 rounded" />
            <div className="h-2 w-4/5 bg-gray-800 rounded" />
          </div>
          <span className="font-medium text-text-primary">Dark Theme</span>
        </button>
      </div>
    </div>
  );
};

const ModelSettings: React.FC = () => {
  const [connections, setConnections] = useState<LLMConnection[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchConnections = async () => {
    setLoading(true);
    const res = await llmApi.getConnections();
    if (res.success && res.data) {
      setConnections(res.data.connections);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (loading) return <div className="text-text-secondary">Loading connections...</div>;

  return (
    <div>
      <h3 className="text-xl font-medium text-text-primary mb-1">AI Models</h3>
      <p className="text-sm text-text-secondary mb-6">Manage your connections to external AI providers.</p>
      
      <div className="space-y-4">
        {['chatgpt', 'gemini', 'claude'].map((provider) => {
          const conn = connections.find(c => c.providerId === provider);
          const isConnected = conn?.status === 'connected';

          return (
            <div key={provider} className="flex items-center justify-between p-4 border border-border rounded-lg bg-surface">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-surface-elevated rounded-md flex items-center justify-center font-bold uppercase text-text-primary">
                  {provider.charAt(0)}
                </div>
                <div>
                  <h4 className="font-medium capitalize text-text-primary">{provider}</h4>
                  <p className="text-sm text-text-secondary">
                    {isConnected ? 'Status: Connected' : 'Status: Disconnected'}
                  </p>
                </div>
              </div>
              <Button variant={isConnected ? 'secondary' : 'primary'}>
                {isConnected ? 'Configure' : 'Connect'}
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
};