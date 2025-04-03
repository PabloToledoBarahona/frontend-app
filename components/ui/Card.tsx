import { ReactNode } from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

export const Card = ({ children, className = "", ...props }: CardProps) => {
  return (
    <div
      className={`rounded-2xl bg-zinc-900 text-white p-6 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};