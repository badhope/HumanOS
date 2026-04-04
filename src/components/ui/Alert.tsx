import { HTMLAttributes, forwardRef } from 'react'
import { cn } from '@utils/cn'
import { CheckCircle, AlertCircle, AlertTriangle, Info, X, LucideIcon } from 'lucide-react'

export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'info' | 'success' | 'warning' | 'error'
  title?: string
  icon?: LucideIcon
  closable?: boolean
  onClose?: () => void
}

const alertIcons: Record<string, LucideIcon> = {
  info: Info,
  success: CheckCircle,
  warning: AlertTriangle,
  error: AlertCircle,
}

const Alert = forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      className,
      variant = 'info',
      title,
      icon,
      closable = false,
      onClose,
      children,
      ...props
    },
    ref
  ) => {
    const Icon = icon || alertIcons[variant]

    const variants = {
      info: 'bg-info-50 border-info-200 text-info-800',
      success: 'bg-success-50 border-success-200 text-success-800',
      warning: 'bg-warning-50 border-warning-200 text-warning-800',
      error: 'bg-error-50 border-error-200 text-error-800',
    }

    const iconColors = {
      info: 'text-info-600',
      success: 'text-success-600',
      warning: 'text-warning-600',
      error: 'text-error-600',
    }

    return (
      <div
        ref={ref}
        className={cn(
          'border rounded-lg p-4 flex gap-3',
          variants[variant],
          className
        )}
        role="alert"
        {...props}
      >
        {Icon && (
          <div className={cn('flex-shrink-0 mt-0.5', iconColors[variant])}>
            <Icon className="w-5 h-5" />
          </div>
        )}
        <div className="flex-1 min-w-0">
          {title && (
            <h4 className="text-sm font-semibold mb-1">{title}</h4>
          )}
          <div className="text-sm">{children}</div>
        </div>
        {closable && (
          <button
            onClick={onClose}
            className="flex-shrink-0 text-neutral-500 hover:text-neutral-700 transition-colors"
            aria-label="关闭"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    )
  }
)

Alert.displayName = 'Alert'

export { Alert }
