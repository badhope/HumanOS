
import React, { Component, ErrorInfo, ReactNode } from 'react'
import { motion } from 'framer-motion'
import { AlertTriangle, RefreshCw, Home, RotateCcw } from 'lucide-react'

/**
 * 错误边界组件 Props 接口
 * 
 * 🔧 配置选项:
 * - children: 需要错误保护的子组件树
 * - fallback: 自定义错误降级 UI (可选)
 * - onReset: 重置回调函数 (用于清理状态重试)
 * - componentName: 组件名称 (用于日志和用户提示)
 */
interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
  onReset?: () => void
  componentName?: string
}

/**
 * 错误边界内部状态
 * 
 * 记录完整的错误上下文信息，用于调试和用户反馈
 */
interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
  errorInfo: ErrorInfo | null
}

/**
 * React 错误边界组件
 * 
 * 🔧 核心功能:
 * 1. 错误捕获 - 捕获子组件树中任何位置的 JavaScript 异常
 * 2. 优雅降级 - 显示友好的错误界面，而非整个应用白屏
 * 3. 错误日志 - 完整记录错误堆栈便于调试
 * 4. 恢复机制 - 提供重置组件、刷新页面、返回首页三种恢复方式
 * 
 * 📊 技术原理:
 * 这是 React 16+ 提供的官方错误处理机制。
 * 类似 JavaScript 的 try/catch，但作用于 React 组件渲染树。
 * 没有它，一个组件崩溃会导致整个应用卸载。
 * 
 * 💡 使用场景:
 * - 包裹数据可视化图表 (数据异常容易崩溃)
 * - 包裹第三方集成组件
 * - 包裹用户动态内容渲染区域
 * - 应用根节点全局兜底保护
 * 
 * 👥 面向人群说明:
 * 非技术人员: 这就像是每个功能模块装了一个"保险丝"。
 * 如果某个功能出bug了，不会让整个网站崩溃，只会显示一个提示，
 * 你还可以"重置"、"刷新"或者"回到首页"继续使用其他功能。
 * 就像家里跳闸了只会断一个房间，不会全家停电。
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    }
  }

  /**
   * 静态生命周期方法: 错误发生时更新状态
   * 
   * 在渲染阶段捕获到错误时触发，
   * 返回的对象会合并到组件 state 中触发重渲染。
   */
  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return {
      hasError: true,
      error,
    }
  }

  /**
   * 错误捕获完成后回调
   * 
   * 在 commit 阶段触发，适合做:
   * - 错误日志上报
   * - Sentry / 监控系统埋点
   * - 用户行为回溯记录
   */
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      error,
      errorInfo,
    })
    
    console.error(`ErrorBoundary caught an error in ${this.props.componentName || 'component'}:`, error, errorInfo)
  }

  /**
   * 重置组件状态处理函数
   * 
   * 清除错误标记，让组件重新渲染子树
   * 同时调用用户传入的 onReset 回调清理外部状态
   */
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

/**
 * 错误降级 UI 组件 Props
 */
interface ErrorFallbackProps {
  error: Error | null
  componentName?: string
  onReset?: () => void
}

/**
 * 友好的错误提示界面
 * 
 * 🎯 设计理念:
 * 1. 共情 - 用轻松的语气道歉，不让用户感到挫败
 * 2. 透明 - 显示错误发生的位置和简单的技术信息
 * 3. 行动 - 提供明确的恢复选项，而非让用户不知所措
 * 4. 美观 - 即使出错也要保持品牌的设计调性
 */
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
