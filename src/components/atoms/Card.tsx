import React from 'react';
import { cn } from '@/shared/utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'outlined';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ children, className, variant = 'default', padding = 'md', ...props }, ref) => {
    const baseStyles = 'rounded-xl transition-all duration-200';

    const variantStyles = {
      default: 'bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700',
      elevated: 'bg-white dark:bg-gray-800 shadow-lg',
      outlined: 'bg-transparent border-2 border-gray-200 dark:border-gray-700',
    };

    const paddingStyles = {
      none: '',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
    };

    return (
      <div
        ref={ref}
        className={cn(baseStyles, variantStyles[variant], paddingStyles[padding], className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';
