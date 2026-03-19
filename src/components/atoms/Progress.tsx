import { cn } from '@/shared/utils';

export interface ProgressProps {
  value: number;
  max?: number;
  className?: string;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
  colorScheme?: 'primary' | 'success' | 'warning' | 'error';
}

export function Progress({
  value,
  max = 100,
  className,
  showLabel = false,
  size = 'md',
  colorScheme = 'primary',
}: ProgressProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  const sizeStyles = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3',
  };

  const colorStyles = {
    primary: 'bg-primary-500',
    success: 'bg-green-500',
    warning: 'bg-yellow-500',
    error: 'bg-red-500',
  };

  return (
    <div className={cn('w-full', className)}>
      {showLabel && (
        <div className="flex justify-between mb-1 text-sm text-gray-600 dark:text-gray-400">
          <span>{Math.round(percentage)}%</span>
        </div>
      )}
      <div
        className={cn(
          'w-full rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden',
          sizeStyles[size]
        )}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
      >
        <div
          className={cn(
            'h-full rounded-full transition-all duration-300 ease-out',
            colorStyles[colorScheme]
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
