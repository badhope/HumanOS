
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * 智能合并 CSS 类名工具函数
 * 
 * 🔧 核心功能:
 * 1. 条件类名处理 - 支持动态、条件式的类名组合
 * 2. Tailwind 类名冲突解决 - 自动合并冲突的 Tailwind 工具类
 * 3. 深度嵌套支持 - 处理任意层级的数组、对象、字符串混合结构
 * 
 * 📊 技术原理:
 * - 先用 clsx 处理所有条件类名逻辑和数组展开
 * - 再用 tailwind-merge 解决 Tailwind 优先级冲突
 * - 实现类似 "后者覆盖前者" 的类名合并策略
 * 
 * 💡 使用场景:
 * - 组件库基础样式 + 用户自定义样式合并
 * - 状态驱动的动态样式切换 (hover、active、disabled 等)
 * - 复杂条件渲染下的类名组合
 * 
 * 👥 面向人群说明:
 * 非技术人员: 这就像是一个"智能穿搭助手"，帮你把各种衣服(样式)合理搭配，
 * 自动解决冲突，确保最终效果整洁好看。
 * 
 * @param inputs - 任意数量的类名，支持:
 *                 - 字符串: 'bg-red-500 text-white'
 *                 - 数组: ['p-4', 'm-2', isActive && 'border-blue']
 *                 - 对象: { 'font-bold': isHighlighted, 'opacity-50': isDisabled }
 *                 - 任意嵌套组合
 * @returns 经过冲突解决和合并的最终类名字符串
 * 
 * @example
 * // 基础使用: 合并并自动解决冲突
 * cn('p-4', 'p-2') // => 'p-2' (后者覆盖前者)
 * 
 * // 条件类名: 支持布尔表达式
 * cn('base-class', isActive && 'active-class', isError && 'error-class')
 * 
 * // 对象语法: 多条件组合
 * cn({ 'text-red-500': hasError, 'font-bold': isImportant })
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export default cn
