import { Loader2, RefreshCw, ArrowLeft } from 'lucide-react'

interface LoadingStateProps {
  text?: string
  size?: 'sm' | 'md' | 'lg'
  fullScreen?: boolean
}

export function LoadingState({ 
  text = '加载中...', 
  size = 'md',
  fullScreen = true 
}: LoadingStateProps) {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  }

  const containerClasses = fullScreen 
    ? 'min-h-screen flex flex-col items-center justify-center bg-slate-950'
    : 'flex flex-col items-center justify-center py-12'

  return (
    <div className={containerClasses}>
      <Loader2 className={`${sizeClasses[size]} text-violet-500`} />
      <p className="mt-4 text-white/60 text-sm">{text}</p>
    </div>
  )
}

interface ErrorStateProps {
  title?: string
  message?: string
  onRetry?: () => void
  onBack?: () => void
  fullScreen?: boolean
}

export function ErrorState({
  title = '加载失败',
  message = '请检查网络连接后重试',
  onRetry,
  onBack,
  fullScreen = true
}: ErrorStateProps) {
  const containerClasses = fullScreen 
    ? 'min-h-screen flex flex-col items-center justify-center bg-slate-950 px-6'
    : 'flex flex-col items-center justify-center py-12 px-6'

  return (
    <div className={containerClasses}>
      <div className="text-center max-w-md">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-500/20 flex items-center justify-center">
          <span className="text-4xl">😕</span>
        </div>
        
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-white/60 mb-8">{message}</p>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {onBack && (
            <button
              onClick={onBack}
              className="px-4 py-2 rounded-lg bg-slate-800 text-white hover:bg-slate-700 flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              返回上页
            </button>
          )}
          
          {onRetry && (
            <button
              onClick={onRetry}
              className="px-4 py-2 rounded-lg bg-violet-600 text-white hover:bg-violet-700 flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              重新加载
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export function EmptyState({
  icon = '📭',
  title = '暂无数据',
  message = '这里还没有内容',
  action,
}: {
  icon?: string
  title?: string
  message?: string
  action?: { label: string; onClick: () => void }
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      <span className="text-5xl mb-4">{icon}</span>
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-white/50 text-sm mb-6 max-w-xs">{message}</p>
      
      {action && (
        <button 
          onClick={action.onClick}
          className="px-4 py-2 rounded-lg bg-violet-600 text-white hover:bg-violet-700"
        >
          {action.label}
        </button>
      )}
    </div>
  )
}
