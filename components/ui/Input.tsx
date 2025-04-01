import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function Input({ label, className = '', ...props }: InputProps) {
  return (
    <div className="w-full space-y-1">
      {label && <label className="text-sm font-medium text-gray-800">{label}</label>}
      <input
        {...props}
        className={`w-full px-4 py-2 rounded-lg border border-gray-300 
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent 
        bg-white text-gray-900 placeholder-gray-400 shadow-sm ${className}`}
      />
    </div>
  );
}