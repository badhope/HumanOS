import { LucideIcon } from 'lucide-react'
import {
  User,
  Sparkles,
  Globe,
  Moon,
  Bell,
  Shield,
  Download,
  Upload,
  Share2,
  Palette,
  Volume2,
  Clock,
  Lock,
  HelpCircle,
  Info,
  CreditCard,
  Keyboard,
  Monitor,
  Zap,
  Eye,
  Database,
  Mail,
  Trash2,
  Cloud,
  FileText,
} from 'lucide-react'

export interface SettingsAction {
  type: 'toggle' | 'select' | 'button' | 'link' | 'input' | 'slider'
  value?: boolean | string | number
  options?: { label: string; value: string | number }[]
  onChange?: (value: boolean | string | number) => void
  onClick?: () => void
  placeholder?: string
  min?: number
  max?: number
  step?: number
}

export interface SettingsItem {
  id: string
  title: string
  description?: string
  icon: LucideIcon
  action?: SettingsAction
  children?: SettingsItem[]
}

export interface SettingsCategory {
  id: string
  name: string
  icon: LucideIcon
  color: string
  bgGradient: string
  items: SettingsItem[]
}

export const settingsCategories: SettingsCategory[] = [
  {
    id: 'account',
    name: '👤 账户设置',
    icon: User,
    color: 'text-blue-400',
    bgGradient: 'from-blue-500/20 to-blue-500/5',
    items: [
      {
        id: 'profile',
        title: '个人资料',
        description: '管理你的个人信息和头像',
        icon: User,
        action: { type: 'button' }
      },
      {
        id: 'email',
        title: '邮箱设置',
        description: '绑定或修改邮箱地址',
        icon: Mail,
        action: { type: 'button' }
      },
      {
        id: 'password',
        title: '修改密码',
        description: '安全地更新你的密码',
        icon: Lock,
        action: { type: 'button' }
      },
      {
        id: 'privacy',
        title: '隐私设置',
        description: '控制你的数据和隐私',
        icon: Shield,
        action: { type: 'toggle', value: true }
      },
    ]
  },
  {
    id: 'appearance',
    name: '🎨 外观设置',
    icon: Palette,
    color: 'text-violet-400',
    bgGradient: 'from-violet-500/20 to-violet-500/5',
    items: [
      {
        id: 'theme',
        title: '主题模式',
        description: '选择深色或浅色主题',
        icon: Moon,
        action: { 
          type: 'select', 
          value: 'dark',
          options: [
            { label: '深色模式', value: 'dark' },
            { label: '浅色模式', value: 'light' },
            { label: '跟随系统', value: 'system' }
          ]
        }
      },
      {
        id: 'animations',
        title: '动画效果',
        description: '启用或禁用界面动画',
        icon: Sparkles,
        action: { type: 'toggle', value: true }
      },
      {
        id: 'accent-color',
        title: '强调色',
        description: '选择你的主题颜色',
        icon: Palette,
        action: { 
          type: 'select',
          value: 'violet',
          options: [
            { label: '紫罗兰', value: 'violet' },
            { label: '蓝色', value: 'blue' },
            { label: '绿色', value: 'green' },
            { label: '粉色', value: 'pink' },
            { label: '橙色', value: 'orange' }
          ]
        }
      },
      {
        id: 'font-size',
        title: '字体大小',
        description: '调整界面文字大小',
        icon: Monitor,
        action: { type: 'slider', value: 100, min: 80, max: 140, step: 10 }
      }
    ]
  },
  {
    id: 'notifications',
    name: '🔔 通知设置',
    icon: Bell,
    color: 'text-amber-400',
    bgGradient: 'from-amber-500/20 to-amber-500/5',
    items: [
      {
        id: 'push-notifications',
        title: '推送通知',
        description: '接收应用推送消息',
        icon: Bell,
        action: { type: 'toggle', value: true }
      },
      {
        id: 'daily-reminder',
        title: '每日提醒',
        description: '接收每日心情打卡提醒',
        icon: Clock,
        action: { type: 'toggle', value: true }
      },
      {
        id: 'achievement-notifications',
        title: '成就通知',
        description: '获得成就时通知',
        icon: Zap,
        action: { type: 'toggle', value: true }
      },
      {
        id: 'sound-effects',
        title: '音效',
        description: '启用界面交互音效',
        icon: Volume2,
        action: { type: 'toggle', value: false }
      }
    ]
  },
  {
    id: 'data',
    name: '💾 数据管理',
    icon: Database,
    color: 'text-emerald-400',
    bgGradient: 'from-emerald-500/20 to-emerald-500/5',
    items: [
      {
        id: 'export-data',
        title: '导出数据',
        description: '将所有数据导出为JSON文件',
        icon: Download,
        action: { type: 'button' }
      },
      {
        id: 'import-data',
        title: '导入数据',
        description: '从JSON文件恢复数据',
        icon: Upload,
        action: { type: 'button' }
      },
      {
        id: 'clear-data',
        title: '清除数据',
        description: '重置所有数据和设置',
        icon: Trash2,
        action: { type: 'button' }
      },
      {
        id: 'auto-backup',
        title: '自动备份',
        description: '定期自动备份数据',
        icon: Cloud,
        action: { type: 'toggle', value: true }
      }
    ]
  },
  {
    id: 'accessibility',
    name: '♿ 无障碍设置',
    icon: Eye,
    color: 'text-cyan-400',
    bgGradient: 'from-cyan-500/20 to-cyan-500/5',
    items: [
      {
        id: 'high-contrast',
        title: '高对比度',
        description: '提高界面对比度',
        icon: Eye,
        action: { type: 'toggle', value: false }
      },
      {
        id: 'reduced-motion',
        title: '减少动画',
        description: '减少不必要的动画效果',
        icon: Sparkles,
        action: { type: 'toggle', value: false }
      },
      {
        id: 'keyboard-shortcuts',
        title: '键盘快捷键',
        description: '查看和自定义快捷键',
        icon: Keyboard,
        action: { type: 'button' }
      }
    ]
  },
  {
    id: 'about',
    name: 'ℹ️ 关于',
    icon: Info,
    color: 'text-gray-400',
    bgGradient: 'from-gray-500/20 to-gray-500/5',
    items: [
      {
        id: 'app-info',
        title: '应用信息',
        description: '查看应用版本和更新日志',
        icon: Info,
        action: { type: 'button' }
      },
      {
        id: 'help-center',
        title: '帮助中心',
        description: '获取使用帮助和常见问题解答',
        icon: HelpCircle,
        action: { type: 'button' }
      },
      {
        id: 'privacy-policy',
        title: '隐私政策',
        description: '了解我们如何保护你的隐私',
        icon: Shield,
        action: { type: 'link' }
      },
      {
        id: 'terms-service',
        title: '服务条款',
        description: '阅读我们的服务条款',
        icon: FileText,
        action: { type: 'link' }
      },
      {
        id: 'share-app',
        title: '分享应用',
        description: '推荐给你的朋友',
        icon: Share2,
        action: { type: 'button' }
      }
    ]
  }
]
