import React, { useState } from 'react';
import { Button } from '../components/common/Button';
import { Plus, Folder } from 'lucide-react';

// Example type for projects
interface Project {
  id: string;
  name: string;
  description: string;
  updatedAt: string;
}

export const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false); // In a real app, this would trigger fetch on mount

  return (
    <div className="p-8 max-w-5xl mx-auto w-full h-full flex flex-col">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-text-primary">Projects</h1>
          <p className="text-text-secondary text-sm mt-1">Manage your workspaces and context</p>
        </div>
        <Button className="gap-2">
          <Plus size={16} /> New Project
        </Button>
      </div>

      {loading ? (
        <div className="text-text-muted">Loading projects...</div>
      ) : projects.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center border border-border border-dashed rounded-xl p-10">
          <div className="w-12 h-12 bg-surface-elevated rounded-full flex items-center justify-center text-text-muted mb-4">
            <Folder size={24} />
          </div>
          <h3 className="text-lg font-medium text-text-primary mb-2">No projects yet</h3>
          <p className="text-text-secondary text-sm text-center max-w-sm mb-6">
            Create a project to organize your conversations, documents, and context for specific tasks.
          </p>
          <Button variant="secondary">Create First Project</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Projects would map here */}
        </div>
      )}
    </div>
  );
};