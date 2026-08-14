import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/common/Button';
import { Plus, MessageSquare } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const user = useAuthStore(state => state.user);

  return (
    <div className="p-8 max-w-5xl mx-auto w-full">
      <header className="mb-10">
        <h1 className="text-3xl font-semibold text-text-primary">Welcome back, {user?.name || 'User'}</h1>
        <p className="text-text-secondary mt-1">What would you like to work on today?</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="bg-surface p-6 rounded-xl border border-border flex flex-col items-start">
          <div className="p-3 bg-accent/10 text-accent rounded-lg mb-4">
            <MessageSquare size={24} />
          </div>
          <h2 className="text-lg font-medium text-text-primary mb-2">New Conversation</h2>
          <p className="text-text-secondary text-sm mb-6 flex-1">Start a fresh session with your connected AI models to brainstorm, write, or analyze data.</p>
          <Button onClick={() => navigate('/chat')}>Start Chatting</Button>
        </div>

        <div className="bg-surface p-6 rounded-xl border border-border flex flex-col items-start">
          <div className="p-3 bg-surface-elevated text-text-primary rounded-lg mb-4">
            <Plus size={24} />
          </div>
          <h2 className="text-lg font-medium text-text-primary mb-2">Create Project</h2>
          <p className="text-text-secondary text-sm mb-6 flex-1">Group your conversations and context into a dedicated workspace.</p>
          <Button variant="secondary" onClick={() => navigate('/projects')}>New Project</Button>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-text-primary mb-4">Recent Activity</h3>
        <div className="border border-border border-dashed rounded-xl p-10 text-center flex flex-col items-center justify-center">
          <p className="text-text-muted mb-4">No recent activity found.</p>
        </div>
      </div>
    </div>
  );
};