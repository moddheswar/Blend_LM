import React from 'react';
import { LifeBuoy, Book, MessageCircle, GitPullRequest } from 'lucide-react';

export const Support: React.FC = () => {
  return (
    <div className="p-8 max-w-4xl mx-auto w-full">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-text-primary">Support & Help</h1>
        <p className="text-text-secondary mt-1">Get assistance, read documentation, or report an issue.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SupportCard 
          icon={<Book size={20} />}
          title="Documentation"
          description="Read guides on how to connect providers, manage projects, and use Blend-LM effectively."
          action="Read Docs"
        />
        <SupportCard 
          icon={<GitPullRequest size={20} />}
          title="Connection Troubleshooting"
          description="Having trouble connecting to ChatGPT, Gemini, or Claude? Check our connection status guides."
          action="View Status"
        />
        <SupportCard 
          icon={<MessageCircle size={20} />}
          title="Contact Support"
          description="Encountered an unexpected bug or need account assistance? Reach out to our team."
          action="Contact Us"
        />
        <SupportCard 
          icon={<LifeBuoy size={20} />}
          title="Frequently Asked Questions"
          description="Quick answers to the most common questions about billing, data privacy, and features."
          action="View FAQ"
        />
      </div>

      <div className="mt-12 pt-6 border-t border-border flex justify-between items-center text-sm text-text-muted">
        <span>Blend-LM Application</span>
        <span>Version 1.0.0</span>
      </div>
    </div>
  );
};

const SupportCard: React.FC<{ icon: React.ReactNode; title: string; description: string; action: string }> = ({ icon, title, description, action }) => (
  <div className="bg-surface border border-border p-5 rounded-xl flex flex-col items-start hover:border-text-muted transition-colors">
    <div className="w-10 h-10 rounded-lg bg-surface-elevated text-text-primary flex items-center justify-center mb-4">
      {icon}
    </div>
    <h3 className="font-medium text-text-primary mb-2">{title}</h3>
    <p className="text-sm text-text-secondary mb-4 flex-1">{description}</p>
    <button className="text-sm font-medium text-accent hover:text-accent-hover transition-colors">
      {action} &rarr;
    </button>
  </div>
);