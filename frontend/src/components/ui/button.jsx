import { cn } from '@/lib/utils';
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'rounded-md px-4 py-2 font-medium transition-colors',
          variant === 'primary' && 'bg-[#A86E58] text-white hover:bg-[#95614E]',
          variant === 'secondary' && 'bg-[#537B2F] text-white hover:bg-[#476A28]',
          className
        )}
        {...props}
      />
    );
  }
);