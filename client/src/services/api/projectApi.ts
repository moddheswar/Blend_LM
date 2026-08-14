import { apiClient } from './client';
import { Project } from '../../types/project';

export const projectApi = {
  getProjects: () => 
    apiClient.get<{ projects: Project[] }>('/projects'),
    
  getProject: (id: string) => 
    apiClient.get<{ project: Project }>(`/projects/${id}`),
    
  createProject: (data: { name: string; description: string }) => 
    apiClient.post<{ project: Project }>('/projects', data),
    
  updateProject: (id: string, data: Partial<Project>) => 
    apiClient.put<{ project: Project }>(`/projects/${id}`, data),
    
  deleteProject: (id: string) => 
    apiClient.delete(`/projects/${id}`)
};