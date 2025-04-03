import { ReactNode } from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

export const Card = ({ children, className = "", ...props }: CardProps) => {
  return (
    <div
      className={`rounded-2xl bg-white text-gray-900 p-8 shadow-xl ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};