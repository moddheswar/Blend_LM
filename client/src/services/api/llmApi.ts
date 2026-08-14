import { apiClient } from './client';
import { LLMConnection, LLMProviderId } from '../../types/llm';

export const llmApi = {
  getConnections: () => 
    apiClient.get<{ connections: LLMConnection[] }>('/llm/connections'),
    
  startConnection: (provider: LLMProviderId) => 
    apiClient.post<{ connectionId: string; status: string }>(`/llm/connections/${provider}/start`, {}),
    
  disconnect: (id: string) => 
    apiClient.delete(`/llm/connections/${id}`)
};