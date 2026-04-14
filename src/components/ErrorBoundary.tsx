import { Component, ReactNode, ErrorInfo } from 'react'
import { motion } from 'framer-motion'
import { RefreshCw, Home, Bug } from 'lucide-react'
import RippleButton from './animations/RippleButton'

interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
  onReset?: () => void
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
  errorInfo: ErrorInfo | null
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    }
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.setState({ errorInfo })
    console.error('ErrorBoundary caught an error:', error, errorInfo)
  }

  handleReset = (): void => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    })
    this.props.onReset?.()
  }

  handleReload = (): void => {
    window.location.reload()
  }

  handleGoHome = (): void => {
    window.location.href = '/'
  }

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="max-w-md w-full text-center"
          >
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-red-500/20 to-orange-500/20 flex items-center justify-center">
              <Bug className="w-10 h-10 text-red-400" />
            </div>
            
            <h2 className="text-2xl font-bold text-white mb-3">
              哎呀，出错了！
            </h2>
            
            <p className="text-white/60 mb-6">
              应用遇到了一些小问题，别担心，这不会影响您的数据。
            </p>

            {this.state.error && (
              <div className="mb-6 p-4 rounded-xl bg-white/5 border border-white/10 text-left">
                <p className="text-red-400 text-sm font-mono">
                  {this.state.error.message}
                </p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <RippleButton
                variant="secondary"
                onClick={this.handleGoHome}
                icon={<Home className="w-4 h-4" />}
              >
                返回首页
              </RippleButton>
              
              <RippleButton
                variant="primary"
                onClick={this.handleReload}
                icon={<RefreshCw className="w-4 h-4" />}
              >
                重新加载
              </RippleButton>
            </div>

            <p className="mt-8 text-white/40 text-xs">
              错误代码: ERR-{Date.now().toString().slice(-6)}
            </p>
          </motion.div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
