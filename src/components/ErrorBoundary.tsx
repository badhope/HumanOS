import { Component, ErrorInfo, ReactNode } from 'react'
import { motion } from 'framer-motion'
import { AlertTriangle, RefreshCw, Home, Bug } from 'lucide-react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
  errorInfo: ErrorInfo | null
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('🚨 Application Error:', error, errorInfo)
    this.setState({ error, errorInfo })
  }

  private handleReload = () => {
    window.location.reload()
  }

  private handleGoHome = () => {
    window.location.href = window.location.origin
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl w-full"
          >
            <div className="glass rounded-2xl p-8 border border-red-500/20">
              <div className="flex items-center gap-4 mb-6">
                <motion.div
                  animate={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5, repeat: 3 }}
                >
                  <AlertTriangle className="w-12 h-12 text-red-500" />
                </motion.div>
                <div>
                  <h1 className="text-2xl font-bold text-white">
                    应用出现错误
                  </h1>
                  <p className="text-white/60">
                    抱歉，应用遇到了意外错误
                  </p>
                </div>
              </div>

              {this.state.error && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-6">
                  <div className="flex items-start gap-3">
                    <Bug className="w-5 h-5 text-red-400 mt-0.5" />
                    <div className="flex-1">
                      <h3 className="text-sm font-semibold text-red-400 mb-2">
                        错误信息
                      </h3>
                      <p className="text-sm text-red-300 font-mono">
                        {this.state.error.name}: {this.state.error.message}
                      </p>
                      {this.state.error.stack && (
                        <details className="mt-2">
                          <summary className="text-xs text-red-400 cursor-pointer hover:text-red-300">
                            查看堆栈跟踪
                          </summary>
                          <pre className="mt-2 text-xs text-red-300/80 overflow-auto max-h-40">
                            {this.state.error.stack}
                          </pre>
                        </details>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {this.state.errorInfo && (
                <details className="mb-6">
                  <summary className="text-sm text-white/60 cursor-pointer hover:text-white mb-2">
                    组件堆栈信息
                  </summary>
                  <pre className="bg-slate-900/50 rounded-lg p-4 text-xs text-white/40 overflow-auto max-h-60 font-mono">
                    {this.state.errorInfo.componentStack}
                  </pre>
                </details>
              )}

              <div className="flex flex-col sm:flex-row gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={this.handleReload}
                  className="flex-1 bg-gradient-to-r from-violet-500 to-pink-500 text-white px-6 py-3 rounded-xl font-medium flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-violet-500/25 transition-all"
                >
                  <RefreshCw className="w-5 h-5" />
                  重新加载
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={this.handleGoHome}
                  className="flex-1 glass border border-white/10 text-white px-6 py-3 rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-white/5 transition-all"
                >
                  <Home className="w-5 h-5" />
                  返回首页
                </motion.button>
              </div>

              <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <p className="text-sm text-blue-300">
                  <strong>提示：</strong>如果问题持续存在，请尝试清除浏览器缓存或联系开发者。
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )
    }

    return this.props.children
  }
}
