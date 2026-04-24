
import { useContext } from 'react'
import { ShortcutContext } from '../components/ShortcutProvider'

/**
 * 快捷键上下文 Hook
 * 
 * 🔧 核心功能:
 * 1. 全局状态访问 - 获取快捷键系统的共享状态
 * 2. 面板控制 - 打开/关闭搜索、帮助等模态框
 * 3. 跨组件通信 - 在任意组件中触发全局操作
 * 
 * 📊 返回值说明:
 * - searchOpen: 快速搜索面板的开关状态
 * - setSearchOpen: 控制快速搜索面板的显示/隐藏
 * - helpOpen: 快捷键帮助面板的开关状态  
 * - setHelpOpen: 控制快捷键帮助面板的显示/隐藏
 * 
 * 💡 使用场景:
 * - 任何需要打开/关闭全局搜索的组件
 * - 任何需要打开/关闭帮助弹窗的地方
 * - 自定义快捷键的回调函数中
 * 
 * 👥 面向人群说明:
 * 非技术人员: 这就像是应用的"遥控器"，不管你在哪个页面，
 * 都可以用它来打开搜索框或者查看快捷键说明。
 * 
 * @example
 * // 在任意组件中打开搜索面板
 * const { setSearchOpen } = useShortcutContext()
 * setSearchOpen(true)
 */
export function useShortcutContext() {
  return useContext(ShortcutContext)
}
