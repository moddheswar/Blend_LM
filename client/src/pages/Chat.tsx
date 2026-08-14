import React, { useState } from 'react';
import { Button } from '../components/common/Button';
import { Send, Bot, User as UserIcon } from 'lucide-react';
import { Message } from '../types/chat';

export const Chat: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    
    const userMsg: Message = { id: Date.now().toString(), conversationId: 'temp', role: 'user', content: input, createdAt: new Date().toISOString() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    // Call API Layer (mocked here for structure)
    // const res = await chatApi.sendMessage({ conversationId, provider: 'chatgpt', message: userMsg });
    setTimeout(() => {
      const aiMsg: Message = { id: (Date.now() + 1).toString(), conversationId: 'temp', role: 'assistant', content: "This is a normalized response from the backend abstraction layer.", createdAt: new Date().toISOString() };
      setMessages(prev => [...prev, aiMsg]);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-text-muted">
            <Bot size={48} className="mb-4 opacity-50" />
            <p>Start a new conversation</p>
          </div>
        ) : (
          messages.map(msg => (
            <div key={msg.id} className={`flex gap-4 max-w-3xl mx-auto ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.role === 'assistant' && <div className="w-8 h-8 rounded-full bg-surface-elevated flex items-center justify-center flex-shrink-0"><Bot size={16} /></div>}
              <div className={`p-4 rounded-xl max-w-[80%] ${msg.role === 'user' ? 'bg-surface-elevated text-text-primary' : 'bg-transparent text-text-primary'}`}>
                {msg.content}
              </div>
              {msg.role === 'user' && <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center flex-shrink-0 text-white"><UserIcon size={16} /></div>}
            </div>
          ))
        )}
        {loading && (
          <div className="flex gap-4 max-w-3xl mx-auto justify-start">
             <div className="w-8 h-8 rounded-full bg-surface-elevated flex items-center justify-center flex-shrink-0"><Bot size={16} /></div>
             <div className="p-4 rounded-xl bg-transparent text-text-muted animate-pulse">Thinking...</div>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-border bg-surface">
        <div className="max-w-3xl mx-auto relative flex items-end gap-2 bg-surface-elevated rounded-xl p-2 focus-within:ring-2 focus-within:ring-accent border border-border">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
            placeholder="Send a message..."
            className="flex-1 bg-transparent border-none outline-none resize-none p-2 max-h-32 min-h-[44px] text-text-primary placeholder-text-muted"
            rows={1}
          />
          <Button variant="primary" className="mb-1 h-10 w-10 p-0 rounded-lg shrink-0" onClick={handleSend} disabled={!input.trim() || loading}>
            <Send size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
};