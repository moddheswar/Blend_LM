import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Home, MessageSquare, FolderKanban, Settings as SettingsIcon, LifeBuoy, Plus } from 'lucide-react';
import { llmApi } from '../../services/api/llmApi';
import { LLMConnection } from '../../types/llm';

export const Sidebar: React.FC = () => {
  const [connections, setConnections] = useState<LLMConnection[]>([]);

  useEffect(() => {
    const fetchSidebarData = async () => {
      const res = await llmApi.getConnections();
      if (res.success && res.data) {
        setConnections(res.data.connections);
      }
    };
    fetchSidebarData();
  }, []);

  const navItemClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 px-3 py-2 rounded-md transition-colors text-sm font-medium ${
      isActive 
        ? 'bg-surface-elevated text-text-primary' 
        : 'text-text-secondary hover:bg-surface hover:text-text-primary'
    }`;

  return (
    <aside className="w-64 border-r border-border bg-background flex flex-col h-full">
      <div className="p-4 flex items-center gap-2">
        <h1 className="text-lg font-bold tracking-tight text-text-primary">
          Blend<span className="text-accent">-LM</span>
        </h1>
      </div>

      <div className="flex-1 overflow-y-auto py-4 flex flex-col gap-6">
        {/* Main Navigation */}
        <nav className="px-3 space-y-1">
          <NavLink to="/home" className={navItemClass}><Home size={18} /> Home</NavLink>
          <NavLink to="/chat" className={navItemClass}><MessageSquare size={18} /> Chat</NavLink>
        </nav>

        {/* Projects Section */}
        <div className="px-3">
          <div className="flex items-center justify-between px-3 mb-2">
            <h2 className="text-xs font-semibold text-text-muted uppercase tracking-wider">Projects</h2>
            <button className="text-text-muted hover:text-text-primary transition-colors">
              <Plus size={14} />
            </button>
          </div>
          <nav className="space-y-1">
            <NavLink to="/projects" className={navItemClass}><FolderKanban size={18} /> View all projects</NavLink>
            {/* Dynamic projects would map here */}
          </nav>
        </div>

        {/* AI Models Section */}
        <div className="px-3">
          <h2 className="text-xs font-semibold text-text-muted uppercase tracking-wider px-3 mb-2">AI Models</h2>
          <nav className="space-y-1">
            {['chatgpt', 'gemini', 'claude'].map((providerId) => {
              const conn = connections.find(c => c.providerId === providerId);
              const isConnected = conn?.status === 'connected';
              
              return (
                <div key={providerId} className="flex items-center justify-between px-3 py-2 text-sm">
                  <span className={`capitalize font-medium ${isConnected ? 'text-text-primary' : 'text-text-muted'}`}>
                    {providerId}
                  </span>
                  <span className={`w-2 h-2 rounded-full ${isConnected ? 'bg-success' : 'bg-surface-elevated'}`} />
                </div>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="p-3 border-t border-border space-y-1">
        <NavLink to="/settings" className={navItemClass}><SettingsIcon size={18} /> Settings</NavLink>
        <NavLink to="/support" className={navItemClass}><LifeBuoy size={18} /> Support</NavLink>
      </div>
    </aside>
  );
};