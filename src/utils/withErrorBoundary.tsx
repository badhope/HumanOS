
import React, { ComponentType } from 'react'
import ErrorBoundary from '@components/ErrorBoundary'

/**
 * 组件错误边界高阶组件 (HOC)
 * 
 * 🔧 核心功能:
 * 1. 错误隔离 - 捕获组件渲染期间发生的任何 JavaScript 错误
 * 2. 优雅降级 - 显示友好的错误提示界面，而非整个应用崩溃
 * 3. 错误追踪 - 记录错误发生的组件名称和上下文便于调试
 * 4. 应用保护 - 防止单个组件错误导致整个用户界面瘫痪
 * 
 * 📊 技术原理:
 * 使用 React 高阶组件模式，将目标组件包裹在 ErrorBoundary 中，
 * 利用 React 16+ 的错误边界机制捕获子组件树中的异常。
 * 
 * 💡 使用场景:
 * - 第三方集成组件 (可能存在不稳定的情况)
 * - 复杂数据可视化图表 (数据异常可能导致崩溃)
 * - 用户可编辑的动态内容区域
 * - 第三方广告或嵌入内容
 * 
 * 👥 面向人群说明:
 * 非技术人员: 这就像是给每个应用组件装了一个"安全气囊"。
 * 如果某个功能出了问题，不会让整个应用崩溃，只会显示一个友好提示，
 * 用户可以继续使用应用的其他功能。
 * 
 * @param Component - 需要添加错误保护的 React 组件
 * @param componentName - 组件名称 (用于错误日志和用户友好提示)
 * @returns 包装了错误边界的新组件，具有与原组件完全相同的 Props 接口
 * 
 * @example
 * // 为图表组件添加错误边界保护
 * const SafeChart = withErrorBoundary(ComplexDataChart, '数据分析图表')
 * 
 * // 使用包装后的组件
 * <SafeChart data={chartData} options={chartOptions} />
 * // 如果图表渲染出错，用户会看到:
 * // "😅 数据分析图表 暂时无法加载"，而不是整个页面白屏
 */
export function withErrorBoundary<P extends object>(
  Component: ComponentType<P>,
  componentName: string
) {
  /**
   * 包装后的错误边界组件
   * 保留原组件的所有 Props 类型定义，确保 TypeScript 类型安全
   */
  const WrappedWithErrorBoundary = function WrappedWithErrorBoundary(props: P) {
    return (
      <ErrorBoundary componentName={componentName}>
        <Component {...props} />
      </ErrorBoundary>
    )
  }

  return WrappedWithErrorBoundary
}
