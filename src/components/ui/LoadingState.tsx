import { motion } from 'framer-motion'
import { Brain, Loader2, RefreshCw, ArrowLeft } from 'lucide-react'
import RippleButton from '../animations/RippleButton'

interface LoadingStateProps {
  type?: 'spinner' | 'dots' | 'pulse' | 'neural'
  text?: string
  size?: 'sm' | 'md' | 'lg'
  fullScreen?: boolean
}

export function LoadingState({ 
  type = 'neural', 
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

  const renderSpinner = () => {
    switch (type) {
      case 'neural':
        return (
          <div className="relative">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              className={`${sizeClasses[size]} text-violet-500`}
            >
              <Brain className="w-full h-full" />
            </motion.div>
            <motion.div
              animate={{ rotate: -360, scale: [1, 1.1, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              className={`absolute inset-0 ${sizeClasses[size]} text-pink-500/30`}
            >
              <Brain className="w-full h-full" />
            </motion.div>
          </div>
        )
      
      case 'dots':
        return (
          <div className="flex gap-2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{ y: [0, -8, 0] }}
                transition={{ 
                  duration: 0.6, 
                  delay: i * 0.2, 
                  repeat: Infinity 
                }}
                className="w-3 h-3 rounded-full bg-violet-500"
              />
            ))}
          </div>
        )
      
      case 'pulse':
        return (
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className={`${sizeClasses[size]} rounded-full bg-gradient-to-r from-violet-500 to-pink-500`}
          />
        )
      
      default:
        return (
          <Loader2 className={`${sizeClasses[size]} animate-spin text-violet-500`} />
        )
    }
  }

  return (
    <div className={containerClasses}>
      {renderSpinner()}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mt-4 text-white/60 text-sm"
      >
        {text}
      </motion.p>
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
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-center max-w-md"
      >
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-500/20 flex items-center justify-center">
          <span className="text-4xl">😕</span>
        </div>
        
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-white/60 mb-8">{message}</p>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {onBack && (
            <RippleButton
              variant="secondary"
              onClick={onBack}
              icon={<ArrowLeft className="w-4 h-4" />}
            >
              返回上页
            </RippleButton>
          )}
          
          {onRetry && (
            <RippleButton
              variant="primary"
              onClick={onRetry}
              icon={<RefreshCw className="w-4 h-4" />}
            >
              重新加载
            </RippleButton>
          )}
        </div>
      </motion.div>
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
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-16 px-6 text-center"
    >
      <span className="text-5xl mb-4">{icon}</span>
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-white/50 text-sm mb-6 max-w-xs">{message}</p>
      
      {action && (
        <RippleButton variant="primary" onClick={action.onClick}>
          {action.label}
        </RippleButton>
      )}
    </motion.div>
  )
}
