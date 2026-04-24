
import { ButtonHTMLAttributes, forwardRef } from 'react'
import { cn } from '@utils/cn'
import { Loader2 } from 'lucide-react'

/**
 * 按钮组件 Props 接口定义
 * 
 * 🔧 可配置项:
 * - variant: 视觉风格变体，决定按钮的颜色主题
 * - size: 尺寸大小 (小/中/大)
 * - loading: 是否显示加载状态
 * - icon: 按钮图标 (支持任意 React 节点)
 * - iconPosition: 图标位置 (左侧/右侧)
 * - 以及所有原生 button 属性
 */
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
}

/**
 * 标准按钮组件
 * 
 * 🔧 核心功能:
 * 1. 5种视觉风格 - 适配不同场景的按钮样式
 * 2. 3种尺寸规格 - sm/md/lg 满足各种布局需求
 * 3. 加载状态 - 显示旋转加载动画，自动禁用交互
 * 4. 图标支持 - 左右两侧图标位置可选
 * 5. 无障碍支持 - 完整的键盘操作和焦点管理
 * 6. 微交互动画 - hover/active/pressed 状态平滑过渡
 * 
 * 🎨 变体说明:
 * - primary:    🔵 主按钮 - 主要行动，最醒目的号召性按钮
 * - secondary:  ⚪ 次要按钮 - 次要选项，中性视觉权重
 * - outline:    🟦 边框按钮 - 轻量化，强调边框而非填充
 * - ghost:      ⬜ 幽灵按钮 - 最弱视觉层次，hover才显示背景
 * - danger:     🔴 危险按钮 - 删除、重置等不可逆操作警示
 * 
 * 💡 设计原则:
 * - 一个界面最多只放一个 primary 按钮
 * - 删除、重置操作必须使用 danger 变体
 * - 图标与文字之间保持适当间距，确保呼吸感
 * 
 * 👥 面向人群说明:
 * 非技术人员: 这就是界面上你点击的各种按钮。
 * 蓝色的是"最重要的操作"，红色的是"危险/删除"，
 * 加载中会显示转圈动画，防止你重复点击。
 * 
 * @example
 * // 主按钮带加载状态
 * <Button variant="primary" loading={isSubmitting}>
 *   提交答案
 * </Button>
 * 
 * // 危险按钮带图标
 * <Button variant="danger" icon={<Trash2 />}>
 *   删除记录
 * </Button>
 */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      loading = false,
      icon,
      iconPosition = 'left',
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-fast ease-out rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'

    /**
     * 🎨 视觉变体样式映射表
     * 每个变体包含: 背景色 + 文字色 + hover状态 + 焦点环
     */
    const variants = {
      primary: 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500 shadow-sm hover:shadow-md',
      secondary: 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200 focus:ring-neutral-500',
      outline: 'border-2 border-primary-600 text-primary-600 hover:bg-primary-50 focus:ring-primary-500',
      ghost: 'text-neutral-600 hover:bg-neutral-100 focus:ring-neutral-500',
      danger: 'bg-error-600 text-white hover:bg-error-700 focus:ring-error-500 shadow-sm hover:shadow-md',
    }

    /**
     * 📏 尺寸规格映射表
     * 包含: 水平内边距 + 垂直内边距 + 文字大小 + 元素间距
     */
    const sizes = {
      sm: 'px-3 py-1.5 text-sm gap-1.5',
      md: 'px-4 py-2 text-base gap-2',
      lg: 'px-6 py-3 text-lg gap-2.5',
    }

    return (
      <button
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          className
        )}
        disabled={disabled || loading}
        {...props}
      >
        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
        {!loading && icon && iconPosition === 'left' && icon}
        {children}
        {!loading && icon && iconPosition === 'right' && icon}
      </button>
    )
  }
)

Button.displayName = 'Button'

export { Button }
