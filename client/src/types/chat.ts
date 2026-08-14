import { LLMProviderId } from './llm';

export type MessageRole = 'user' | 'assistant' | 'system';

export interface Message {
  id: string;
  conversationId: string;
  role: MessageRole;
  content: string;
  createdAt: string;
}

export interface Conversation {
  id: string;
  projectId?: string;
  provider: LLMProviderId;
  title: string;
  createdAt: string;
  updatedAt: string;
}