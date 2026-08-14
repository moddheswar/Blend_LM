export type LLMProviderId = 'chatgpt' | 'gemini' | 'claude';

export type LLMConnectionStatus = 
  | 'disconnected' 
  | 'connecting' 
  | 'authentication_required' 
  | 'connected' 
  | 'expired' 
  | 'error';

export interface LLMProvider {
  id: LLMProviderId;
  name: string;
  description: string;
  icon: string;
}

export interface LLMConnection {
  id: string;
  providerId: LLMProviderId;
  status: LLMConnectionStatus;
  updatedAt: string;
}