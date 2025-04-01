import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

export function Button({ label, className = '', ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={`w-full py-3 px-4 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 
        text-white font-semibold shadow-md hover:shadow-lg hover:brightness-110 
        transition-all duration-200 ${className}`}
    >
      {label}
    </button>
  );
}