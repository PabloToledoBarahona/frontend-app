import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: React.ReactNode;
  error?: string;
}

export function Input({ label, icon, error, className = '', ...props }: InputProps) {
  return (
    <div className="w-full space-y-1">
      <div className="relative flex items-center">
        {icon && (
          <span className="absolute left-3 text-blue-400 pointer-events-none">
            {icon}
          </span>
        )}
        <input
          {...props}
          className={`w-full bg-gray-700 text-white placeholder-gray-400 px-10 py-2 rounded-md border ${
            error ? 'border-red-500' : 'border-gray-600'
          } focus:outline-none focus:ring-2 ${
            error ? 'focus:ring-red-400' : 'focus:ring-blue-500'
          } transition duration-150 shadow-sm ${className}`}
        />
      </div>
      {error && <p className="text-sm text-red-400 mt-1">{error}</p>}
    </div>
  );
}