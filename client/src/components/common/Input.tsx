import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ label, error, className = '', ...props }) => {
  return (
    <div className="w-full">
      {label && <label className="block text-sm font-medium text-text-secondary mb-1">{label}</label>}
      <input
        className={`w-full p-2 bg-background border rounded-md text-text-primary outline-none transition-colors
          ${error ? 'border-danger focus:ring-1 focus:ring-danger' : 'border-border focus:ring-2 focus:ring-accent'} 
          ${className}`}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-danger">{error}</p>}
    </div>
  );
};