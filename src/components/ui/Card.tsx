
import { HTMLAttributes, forwardRef } from 'react'
import { cn } from '@utils/cn'

/**
 * 卡片组件 Props 接口
 * 
 * 🔧 可配置项:
 * - variant: 视觉变体 (阴影/边框/高投影/可交互)
 * - padding: 内边距大小 (无/小/中/大)
 * - 支持所有原生 div 属性
 */
export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'bordered' | 'elevated' | 'interactive'
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

/**
 * 卡片容器组件
 * 
 * 🔧 核心功能:
 * 1. 4种视觉风格 - 适配不同信息层级需求
 * 2. 4种内边距规格 - 灵活控制内容留白
 * 3. 原子化子组件 - Header/Title/Description/Content/Footer 结构化内容
 * 4. 可交互动画 - hover 时轻微上浮和阴影强化
 * 
 * 🎨 变体说明:
 * - default:     标准阴影卡片 - 最常用的基础样式
 * - bordered:    边框卡片 - 轻量化，适合密集布局
 * - elevated:    高投影卡片 - 突出强调的重要内容
 * - interactive: 可交互卡片 - hover 动效，点击场景专用
 * 
 * 📦 内边距规格:
 * - none: 无内边距 - 内容撑满，用于图片等容器
 * - sm:   16px - 紧凑信息展示
 * - md:   24px - 标准内容间距
 * - lg:   32px - 宽松呼吸感
 * 
 * 💡 组件化设计理念:
 * 通过子组件组合而非 Props 配置，实现最大的布局灵活性。
 * 类似乐高积木，自由组合满足各种卡片需求。
 * 
 * 👥 面向人群说明:
 * 非技术人员: 这就是界面上那些带圆角和阴影的"内容盒子"。
 * 就像装东西的不同盒子，有的朴素、有的华丽、有的可以点击。
 * 它们把相关的信息整理在一起，让界面看起来井井有条。
 * 
 * @example
 * <Card variant="interactive">
 *   <CardHeader>
 *     <CardTitle>大五人格测试</CardTitle>
 *     <CardDescription>通过 50 题了解你的性格特质</CardDescription>
 *   </CardHeader>
 *   <CardContent>内容区域</CardContent>
 *   <CardFooter>底部操作区</CardFooter>
 * </Card>
 */
const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', padding = 'md', children, ...props }, ref) => {
    const baseStyles = 'bg-white rounded-lg transition-all duration-normal ease-out'

    /**
     * 🎨 视觉变体映射表
     */
    const variants = {
      default: 'shadow-card',
      bordered: 'border border-neutral-200',
      elevated: 'shadow-lg',
      interactive: 'shadow-card hover:shadow-card-hover hover:-translate-y-0.5 cursor-pointer',
    }

    /**
     * 📏 内边距映射表
     */
    const paddings = {
      none: '',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
    }

    return (
      <div
        ref={ref}
        className={cn(baseStyles, variants[variant], paddings[padding], className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Card.displayName = 'Card'

/**
 * 卡片头部容器
 * 
 * 用于放置标题和描述，默认底部留出 16px 间距
 */
const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('mb-4', className)} {...props} />
  )
)

CardHeader.displayName = 'CardHeader'

/**
 * 卡片标题
 * 
 * 预设文字样式: 18px + semibold 字重
 */
const CardTitle = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3 ref={ref} className={cn('text-xl font-semibold text-neutral-800', className)} {...props} />
  )
)

CardTitle.displayName = 'CardTitle'

/**
 * 卡片描述文字
 * 
 * 预设文字样式: 14px + 次级灰色
 */
const CardDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn('text-sm text-neutral-500 mt-1', className)} {...props} />
  )
)

CardDescription.displayName = 'CardDescription'

/**
 * 卡片内容区域
 * 
 * 无预设样式，纯容器
 */
const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('', className)} {...props} />
  )
)

CardContent.displayName = 'CardContent'

/**
 * 卡片底部区域
 * 
 * 默认顶部边框分隔线 + 上内边距
 */
const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('mt-4 pt-4 border-t border-neutral-200', className)} {...props} />
  )
)

CardFooter.displayName = 'CardFooter'

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter }
