import React, { Component, ErrorInfo, ReactNode } from 'react'
import { motion } from 'framer-motion'
import { AlertTriangle, RefreshCw, Home, RotateCcw } from 'lucide-react'

interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
  onReset?: () => void
  componentName?: string
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
  errorInfo: ErrorInfo | null
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    }
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return {
      hasError: true,
      error,
    }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      error,
      errorInfo,
    })
    console.error(`ErrorBoundary caught an error in ${this.props.componentName || 'component'}:`, error, errorInfo)
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    })
    this.props.onReset?.()
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <ErrorFallback
          error={this.state.error}
          componentName={this.props.componentName}
          onReset={this.handleReset}
        />
      )
    }

    return this.props.children
  }
}

interface ErrorFallbackProps {
  error: Error | null
  componentName?: string
  onReset?: () => void
}

export function ErrorFallback({ error, componentName, onReset }: ErrorFallbackProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full p-8 rounded-2xl bg-gradient-to-br from-red-900/20 to-slate-900/80 border border-red-500/30 backdrop-blur-sm"
    >
      <div className="text-center">
        <motion.div
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-500/20 mb-6"
        >
          <AlertTriangle className="text-red-400" size={32} />
        </motion.div>

        <h3 className="text-xl font-bold text-white mb-2">
          渲染出错
        </h3>
        
        {componentName && (
          <span className="inline-block px-3 py-1 rounded-full bg-red-500/20 text-red-300 text-sm mb-4">
            {componentName}
          </span>
        )}

        <p className="text-slate-400 text-sm mb-6 max-w-md mx-auto">
          抱歉，渲染组件时遇到了问题。请尝试刷新页面或重置组件状态。
        </p>

        {error && (
          <div className="mb-6 p-4 rounded-lg bg-slate-800/80 border border-slate-700 text-left max-w-lg mx-auto">
            <p className="text-xs text-slate-500 mb-1 font-medium">错误详情:</p>
            <p className="text-sm text-red-300 font-mono">
              {error.message}
            </p>
          </div>
        )}

        <div className="flex flex-wrap items-center justify-center gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onReset}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-500 to-rose-600 text-white font-medium shadow-lg shadow-red-500/25 hover:shadow-red-500/40 transition-shadow"
          >
            <RotateCcw size={18} />
            重置组件
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.reload()}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-700 hover:bg-slate-600 text-white font-medium transition-colors"
          >
            <RefreshCw size={18} />
            刷新页面
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.href = '/'}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-600 hover:border-slate-500 text-slate-300 hover:text-white font-medium transition-colors"
          >
            <Home size={18} />
            返回首页
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  componentName: string
) {
  return function WrappedWithErrorBoundary(props: P) {
    return (
      <ErrorBoundary componentName={componentName}>
        <Component {...props} />
      </ErrorBoundary>
    )
  }
}
