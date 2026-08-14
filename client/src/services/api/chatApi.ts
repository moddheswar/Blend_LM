import { apiClient } from './client';
import { Conversation, Message } from '../../types/chat';

export const chatApi = {
  getConversations: () => 
    apiClient.get<{ conversations: Conversation[] }>('/conversations'),
    
  getConversation: (id: string) => 
    apiClient.get<{ conversation: Conversation, messages: Message[] }>(`/conversations/${id}`),
    
  createConversation: (data: Partial<Conversation>) => 
    apiClient.post<{ conversation: Conversation }>('/conversations', data),
    
  sendMessage: (conversationId: string, message: Partial<Message>) => 
    apiClient.post<{ message: Message }>(`/conversations/${conversationId}/messages`, { message }),
    
  deleteConversation: (id: string) => 
    apiClient.delete(`/conversations/${id}`)
};