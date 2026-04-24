
import { useContext } from 'react'
import { ToastContext } from '@components/ui/Toast'

/**
 * Toast 消息通知 Hook
 * 
 * 🔧 核心功能:
 * 1. 成功提示 - 操作成功后的绿色提示消息
 * 2. 错误警告 - 操作失败或异常时的红色警告消息
 * 3. 信息通知 - 普通提示信息的蓝色消息
 * 4. 自动消失 - 3秒后自动隐藏，不阻塞用户操作
 * 
 * 🎯 消息类型:
 * - success: ✅ 成功提示 - 操作完成、保存成功等
 * - error: ❌ 错误警告 - 网络失败、验证错误等
 * - info: ℹ️ 信息通知 - 普通提示、进度更新等
 * 
 * 💡 技术特点:
 * - 消息队列: 支持多条消息堆叠显示
 * - 自动清理: 超时后自动移除
 * - 可手动关闭: 用户可点击 × 提前关闭
 * - 位置固定: 屏幕右下角显示
 * 
 * 👥 面向人群说明:
 * 非技术人员: 这就像是手机的"通知中心"。
 * 你做完一个操作后，屏幕右下角弹出的小提示就是它，
 * 比如"保存成功"、"网络错误"之类的，告诉你刚才发生了什么。
 * 
 * @throws 如果不在 ToastProvider 包裹范围内使用会抛出错误
 *         请确保在 App 根组件已经正确配置 Toast 上下文
 * 
 * @example
 * // 显示成功消息
 * const { toast } = useToast()
 * toast.success('测评结果已保存到本地')
 * 
 * // 显示错误消息
 * toast.error('网络连接失败，请稍后重试')
 * 
 * // 显示信息消息
 * toast.info('正在计算，请稍候...')
 */
export function useToast() {
  const context = useContext(ToastContext)
  
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  
  return context
}
