import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from './Button';
import { AlertTriangle } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_error: Error): State {
    return { hasError: true };
  }
  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught application error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
          <div className="max-w-md w-full bg-surface border border-border rounded-xl p-8 text-center shadow-sm">
            <div className="w-12 h-12 bg-danger/10 text-danger rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle size={24} />
            </div>
            <h1 className="text-xl font-semibold text-text-primary mb-2">Something went wrong</h1>
            <p className="text-text-secondary text-sm mb-6">
              An unexpected error occurred in the application. Please try refreshing the page.
            </p>
            <Button onClick={() => window.location.reload()} className="w-full justify-center">
              Refresh Application
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}