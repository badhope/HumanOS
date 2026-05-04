import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useToast } from '@hooks/useToast'
import {
  X,
  ChevronRight,
  ChevronDown,
  AlertCircle,
  Mail,
  Calendar,
  ArrowLeft,
  User,
  Palette,
  Moon,
  Bell,
  Shield,
  Download,
  Upload,
  Share2,
  Volume2,
  Clock,
  Lock,
  HelpCircle,
  Info,
  Keyboard,
  Monitor,
  Zap,
  Eye,
  Database,
  Trash2,
  Cloud,
  FileText,
  Sparkles,
  Globe,
  Settings,
} from 'lucide-react'
import { useAppStore } from '@store'
import { useSettingsStore } from '@store/settingsStore'
import { getAssessmentById } from '@data/assessments'
import { cn } from '@utils/cn'
import { useI18n } from '../../i18n'

export default function SettingsPage() {
  const navigate = useNavigate()
  const toast = useToast()
  const { t, language, setLanguage } = useI18n()
  
  const {
    completedAssessments,
    deleteAssessment,
    clearAllAssessments,
    achievements,
    user,
    updateUserProfile,
    setUser,
  } = useAppStore()

  const {
    theme,
    setTheme,
    animationsEnabled,
    toggleAnimations,
    accentColor,
    setAccentColor,
    fontSize,
    setFontSize,
    pushNotifications,
    togglePushNotifications,
    dailyReminder,
    toggleDailyReminder,
    achievementNotifications,
    toggleAchievementNotifications,
    soundEffects,
    toggleSoundEffects,
    autoBackup,
    toggleAutoBackup,
    highContrast,
    toggleHighContrast,
    reducedMotion,
    toggleReducedMotion,
    privacyMode,
    togglePrivacyMode,
    resetSettings,
  } = useSettingsStore()

  const [expandedCategory, setExpandedCategory] = useState<string>('account')
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<{ id: string } | null>(null)
  const [activeAction, setActiveAction] = useState<{ categoryId: string; itemId: string } | null>(null)
  const [showProfileModal, setShowProfileModal] = useState(false)
  const [showAppInfoModal, setShowAppInfoModal] = useState(false)
  const [showHelpModal, setShowHelpModal] = useState(false)
  const [showGettingStartedModal, setShowGettingStartedModal] = useState(false)

  const handleToggleCategory = (categoryId: string) => {
    setExpandedCategory(expandedCategory === categoryId ? '' : categoryId)
  }

  const handleAction = (categoryId: string, itemId: string, actionType: string) => {
    setActiveAction({ categoryId, itemId })
    
    switch (actionType) {
      case 'toggle':
        handleToggleAction(itemId)
        break
      case 'select':
        handleSelectAction(itemId)
        break
      case 'slider':
        break
      case 'button':
        handleButtonAction(itemId)
        break
      case 'link':
        handleLinkAction(itemId)
        break
    }
  }

  const handleToggleAction = (itemId: string) => {
    switch (itemId) {
      case 'privacy':
        togglePrivacyMode()
        toast.info(privacyMode ? '隐私模式已关闭' : '隐私模式已开启', 2000)
        break
      case 'animations':
        toggleAnimations()
        toast.info(animationsEnabled ? '动画效果已关闭' : '动画效果已开启', 2000)
        break
      case 'push-notifications':
        togglePushNotifications()
        toast.info(pushNotifications ? '推送通知已关闭' : '推送通知已开启', 2000)
        break
      case 'daily-reminder':
        toggleDailyReminder()
        toast.info(dailyReminder ? '每日提醒已关闭' : '每日提醒已开启', 2000)
        break
      case 'achievement-notifications':
        toggleAchievementNotifications()
        toast.info(achievementNotifications ? '成就通知已关闭' : '成就通知已开启', 2000)
        break
      case 'sound-effects':
        toggleSoundEffects()
        toast.info(soundEffects ? '音效已关闭' : '音效已开启', 2000)
        break
      case 'auto-backup':
        toggleAutoBackup()
        toast.info(autoBackup ? '自动备份已关闭' : '自动备份已开启', 2000)
        break
      case 'high-contrast':
        toggleHighContrast()
        toast.info(highContrast ? '高对比度已关闭' : '高对比度已开启', 2000)
        break
      case 'reduced-motion':
        toggleReducedMotion()
        toast.info(reducedMotion ? '减少动画已关闭' : '减少动画已开启', 2000)
        break
    }
  }

  const handleSelectAction = (itemId: string) => {
    const event = { target: { value: '' } } as React.ChangeEvent<HTMLSelectElement>
    handleSelectChange(event, itemId)
  }

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>, itemId: string) => {
    const value = event.target.value
    
    switch (itemId) {
      case 'theme':
        setTheme(value as 'dark' | 'light' | 'system')
        toast.success(`主题已切换为 ${getThemeLabel(value)}`, 2000)
        break
      case 'accent-color':
        setAccentColor(value as 'violet' | 'blue' | 'green' | 'pink' | 'orange')
        toast.success(`强调色已切换为 ${getAccentColorLabel(value)}`, 2000)
        break
    }
  }

  const getThemeLabel = (value: string) => {
    const labels: Record<string, string> = {
      dark: '深色模式',
      light: '浅色模式',
      system: '跟随系统',
    }
    return labels[value] || value
  }

  const getAccentColorLabel = (value: string) => {
    const labels: Record<string, string> = {
      violet: '紫罗兰',
      blue: '蓝色',
      green: '绿色',
      pink: '粉色',
      orange: '橙色',
    }
    return labels[value] || value
  }

  const handleSliderChange = (value: number) => {
    setFontSize(value)
  }

  const handleButtonAction = (itemId: string) => {
    switch (itemId) {
      case 'export-data':
        exportDataJSON()
        break
      case 'import-data':
        document.getElementById('import-file')?.click()
        break
      case 'clear-data':
        setShowDeleteConfirm(true)
        break
      case 'share-app':
        shareResults()
        break
      case 'profile':
        setShowProfileModal(true)
        break
      case 'email':
        setShowEmailModal(true)
        break
      case 'password':
        setShowPasswordModal(true)
        break
      case 'app-info':
        setShowAppInfoModal(true)
        break
      case 'help-center':
        setShowHelpModal(true)
        break
      case 'getting-started':
        setShowGettingStartedModal(true)
        break
      case 'keyboard-shortcuts':
        setShowShortcutsModal(true)
        break
      case 'reset-settings':
        setShowResetConfirm(true)
        break
    }
  }

  const handleLinkAction = (itemId: string) => {
    switch (itemId) {
      case 'privacy-policy':
        window.open('https://mindmirror.dpdns.org/privacy', '_blank')
        break
      case 'terms-service':
        window.open('https://mindmirror.dpdns.org/terms', '_blank')
        break
    }
  }

  const exportDataJSON = () => {
    const data = {
      exportDate: new Date().toISOString(),
      version: '1.0.0',
      user: user,
      assessments: completedAssessments.map(a => ({
        ...a,
        completedAt: new Date(a.completedAt).toISOString(),
      })),
      achievements,
      settings: useSettingsStore.getState(),
      exportedFrom: 'MindMirror',
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `mindmirror-backup-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    toast.success('📦 数据导出成功', 2500)
  }

  const importDataJSON = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string)
        if (data.user) setUser(data.user)
        if (Array.isArray(data.completedAssessments)) {
          data.completedAssessments.forEach((a: any) => {
            if (a.assessmentId) {
              const existingIndex = completedAssessments.findIndex(
                ca => ca.assessmentId === a.assessmentId && ca.completedAt === a.completedAt
              )
              if (existingIndex === -1) {
                const ca = {
                  ...a,
                  completedAt: new Date(a.completedAt),
                }
                completedAssessments.push(ca as any)
              }
            }
          })
          toast.success(`📦 成功导入 ${data.completedAssessments.length} 条测评记录`, 2500)
        } else if (Array.isArray(data.assessments)) {
          data.assessments.forEach((a: any) => {
            if (a.assessmentId) {
              const existingIndex = completedAssessments.findIndex(
                ca => ca.assessmentId === a.assessmentId && ca.completedAt === a.completedAt
              )
              if (existingIndex === -1) {
                const ca = {
                  ...a,
                  completedAt: new Date(a.completedAt),
                }
                completedAssessments.push(ca as any)
              }
            }
          })
          toast.success(`📦 成功导入 ${data.assessments.length} 条测评记录`, 2500)
        }
        if (data.settings) {
          const settingsStore = useSettingsStore.getState()
          if (data.settings.theme) settingsStore.setTheme(data.settings.theme)
          if (data.settings.accentColor) settingsStore.setAccentColor(data.settings.accentColor)
          if (data.settings.fontSize) settingsStore.setFontSize(data.settings.fontSize)
          toast.success('⚙️ 配置设置已恢复', 2500)
        }
      } catch (err) {
        toast.error('❌ 导入失败：文件格式损坏', 2500)
      }
    }
    reader.readAsText(file)
    event.target.value = ''
  }

  const shareResults = async () => {
    const shareData = {
      title: '我的心镜测评结果',
      text: `我在心镜 MindMirror 完成了${completedAssessments.length}个测评！快来试试吧！`,
      url: window.location.href,
    }

    if (navigator.share) {
      try {
        await navigator.share(shareData)
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          copyToClipboard(shareData.text + '\n' + shareData.url)
        }
      }
    } else {
      copyToClipboard(shareData.text + '\n' + shareData.url)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success('📋 已复制到剪贴板', 2000)
    }).catch(() => {
      alert(text)
    })
  }

  const handleDeleteRecord = (recordId: string) => {
    setDeleteTarget({ id: recordId })
    setShowDeleteConfirm(true)
  }

  const confirmDelete = () => {
    if (deleteTarget) {
      deleteAssessment(deleteTarget.id)
      setDeleteTarget(null)
      setShowDeleteConfirm(false)
      toast.success('🗑️ 记录已删除', 2000)
    }
  }

  const confirmClearAll = () => {
    clearAllAssessments()
    setShowDeleteConfirm(false)
    toast.success('🗑️ 所有记录已清空', 2000)
  }

  const confirmResetSettings = () => {
    resetSettings()
    setShowResetConfirm(false)
    toast.success('🔄 设置已重置', 2000)
  }

  const getAssessmentTitle = (id: string) => {
    const assessment = getAssessmentById(id)
    return assessment?.title || id
  }

  // Modal states
  const [showEmailModal, setShowEmailModal] = useState(false)
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [showShortcutsModal, setShowShortcutsModal] = useState(false)
  const [showResetConfirm, setShowResetConfirm] = useState(false)
  const [profileForm, setProfileForm] = useState({
    name: user?.name || '',
    bio: user?.bio || '',
  })
  const [emailForm, setEmailForm] = useState({ email: '', password: '' })
  const [passwordForm, setPasswordForm] = useState({ current: '', new: '', confirm: '' })

  const handleProfileSubmit = () => {
    updateUserProfile(profileForm)
    setShowProfileModal(false)
    toast.success('✅ 资料更新成功', 2000)
  }

  const handleEmailSubmit = () => {
    setShowEmailModal(false)
    toast.success('✅ 邮箱绑定成功', 2000)
  }

  const handlePasswordSubmit = () => {
    if (passwordForm.new !== passwordForm.confirm) {
      toast.error('❌ 两次输入的密码不一致', 2000)
      return
    }
    setShowPasswordModal(false)
    toast.success('✅ 密码修改成功', 2000)
  }

  const categories = [
    {
      id: 'account',
      name: '👤 账户设置',
      icon: User,
      color: 'text-blue-400',
      bgGradient: 'from-blue-500/20 to-blue-500/5',
      items: [
        { id: 'profile', title: '个人资料', description: '管理你的个人信息', icon: User, action: { type: 'button' } },
        { id: 'email', title: '邮箱设置', description: '绑定或修改邮箱', icon: Mail, action: { type: 'button' } },
        { id: 'password', title: '修改密码', description: '安全更新密码', icon: Lock, action: { type: 'button' } },
        { id: 'privacy', title: '隐私模式', description: '控制数据和隐私', icon: Shield, action: { type: 'toggle', value: privacyMode } },
      ],
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
            value: theme,
            options: [
              { label: '深色模式', value: 'dark' },
              { label: '浅色模式', value: 'light' },
              { label: '跟随系统', value: 'system' },
            ],
          },
        },
        { id: 'animations', title: '动画效果', description: '启用界面动画', icon: Sparkles, action: { type: 'toggle', value: animationsEnabled } },
        { 
          id: 'accent-color', 
          title: '强调色', 
          description: '选择主题颜色', 
          icon: Palette, 
          action: { 
            type: 'select',
            value: accentColor,
            options: [
              { label: '紫罗兰', value: 'violet' },
              { label: '蓝色', value: 'blue' },
              { label: '绿色', value: 'green' },
              { label: '粉色', value: 'pink' },
              { label: '橙色', value: 'orange' },
            ],
          },
        },
        { id: 'font-size', title: '字体大小', description: '调整文字大小', icon: Monitor, action: { type: 'slider', value: fontSize, min: 80, max: 140, step: 10 } },
      ],
    },
    {
      id: 'notifications',
      name: '🔔 通知设置',
      icon: Bell,
      color: 'text-amber-400',
      bgGradient: 'from-amber-500/20 to-amber-500/5',
      items: [
        { id: 'push-notifications', title: '推送通知', description: '接收应用推送', icon: Bell, action: { type: 'toggle', value: pushNotifications } },
        { id: 'daily-reminder', title: '每日提醒', description: '心情打卡提醒', icon: Clock, action: { type: 'toggle', value: dailyReminder } },
        { id: 'achievement-notifications', title: '成就通知', description: '获得成就时通知', icon: Zap, action: { type: 'toggle', value: achievementNotifications } },
        { id: 'sound-effects', title: '音效', description: '界面交互音效', icon: Volume2, action: { type: 'toggle', value: soundEffects } },
      ],
    },
    {
      id: 'data',
      name: '💾 数据管理',
      icon: Database,
      color: 'text-emerald-400',
      bgGradient: 'from-emerald-500/20 to-emerald-500/5',
      items: [
        { id: 'export-data', title: '导出数据', description: '导出为JSON文件', icon: Download, action: { type: 'button' } },
        { id: 'import-data', title: '导入数据', description: '从文件恢复数据', icon: Upload, action: { type: 'button' } },
        { id: 'clear-data', title: '清除数据', description: '重置所有数据', icon: Trash2, action: { type: 'button' } },
        { id: 'auto-backup', title: '自动备份', description: '定期自动备份', icon: Cloud, action: { type: 'toggle', value: autoBackup } },
        { id: 'reset-settings', title: '重置设置', description: '恢复默认设置', icon: Settings, action: { type: 'button' } },
      ],
    },
    {
      id: 'accessibility',
      name: '♿ 无障碍设置',
      icon: Eye,
      color: 'text-cyan-400',
      bgGradient: 'from-cyan-500/20 to-cyan-500/5',
      items: [
        { id: 'high-contrast', title: '高对比度', description: '提高界面对比度', icon: Eye, action: { type: 'toggle', value: highContrast } },
        { id: 'reduced-motion', title: '减少动画', description: '减少动画效果', icon: Sparkles, action: { type: 'toggle', value: reducedMotion } },
        { id: 'keyboard-shortcuts', title: '键盘快捷键', description: '查看快捷键', icon: Keyboard, action: { type: 'button' } },
      ],
    },
    {
      id: 'about',
      name: 'ℹ️ 关于',
      icon: Info,
      color: 'text-gray-400',
      bgGradient: 'from-gray-500/20 to-gray-500/5',
      items: [
        { id: 'app-info', title: '应用信息', description: '版本和更新日志', icon: Info, action: { type: 'button' } },
        { id: 'help-center', title: '帮助中心', description: '使用帮助', icon: HelpCircle, action: { type: 'button' } },
        { id: 'getting-started', title: '入门教程', description: '快速了解如何使用', icon: FileText, action: { type: 'button' } },
        { id: 'privacy-policy', title: '隐私政策', description: '保护你的隐私', icon: Shield, action: { type: 'link' } },
        { id: 'terms-service', title: '服务条款', description: '阅读服务条款', icon: Globe, action: { type: 'link' } },
        { id: 'share-app', title: '分享应用', description: '推荐给朋友', icon: Share2, action: { type: 'button' } },
      ],
    },
  ]

  const SettingsIcon = ({ icon: Icon, className }: { icon: typeof User; className?: string }) => (
    <Icon className={className} />
  )

  return (
    <div className="min-h-screen pb-24">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 p-4 md:p-6"
      >
        <motion.button
          onClick={() => navigate('/app/daily')}
          className="flex items-center gap-2 text-white/60 hover:text-white mb-4 transition-colors md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <ArrowLeft size={20} />
          <span className="text-sm">返回</span>
        </motion.button>
        <h1 className="text-2xl font-bold mb-2">⚙️ 系统设置</h1>
        <p className="text-white/60">管理你的账户、偏好和数据</p>
      </motion.div>

      <div className="px-4 md:px-6 space-y-4 max-w-4xl mx-auto">
        {categories.map((category) => {
          const isExpanded = expandedCategory === category.id
          const CategoryIcon = category.icon

          return (
            <motion.div
              key={category.id}
              layout
              className="rounded-2xl border border-white/10 overflow-hidden bg-white/5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            >
              <motion.button
                layout
                onClick={() => handleToggleCategory(category.id)}
                className="w-full flex items-center justify-between p-5 hover:bg-white/5 transition-colors"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.bgGradient} flex items-center justify-center`}>
                    <CategoryIcon className={`w-6 h-6 ${category.color}`} />
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-white">{category.name}</h3>
                    <p className="text-xs text-white/40">{category.items.length} 个设置项</p>
                  </div>
                </div>
                <motion.div
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="w-5 h-5 text-white/50" />
                </motion.div>
              </motion.button>

              <motion.div
                initial={false}
                animate={{ height: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }}
                transition={{ duration: 0.2, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <div className="px-5 pb-5 space-y-2">
                  {category.items.map((item, index) => {
                    const ItemIcon = item.icon
                    const isActive = activeAction?.categoryId === category.id && activeAction?.itemId === item.id

                    return (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className={`flex items-center justify-between p-4 rounded-xl ${
                          isActive ? 'bg-violet-500/10 border border-violet-500/30' : 'bg-white/5 border border-transparent hover:border-white/10'
                        } transition-all group cursor-pointer`}
                        onClick={() => handleAction(category.id, item.id, item.action?.type || '')}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center group-hover:bg-white/15 transition-colors">
                            <ItemIcon className="w-5 h-5 text-white/70" />
                          </div>
                          <div>
                            <h4 className="font-medium text-white text-sm">{item.title}</h4>
                            <p className="text-xs text-white/40">{item.description}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          {item.action?.type === 'toggle' && (
                            <motion.button
                              role="switch"
                              aria-checked={item.action.value ? true : false}
                              className={cn(
                                'relative w-12 h-7 rounded-full transition-all duration-300',
                                item.action.value ? 'bg-gradient-to-r from-violet-500 to-purple-600 shadow-lg shadow-violet-500/30' : 'bg-white/20'
                              )}
                              onClick={(e) => e.stopPropagation()}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <motion.span
                                className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-md"
                                animate={{ 
                                  left: item.action.value ? '24px' : '2px',
                                  scale: item.action.value ? 1.1 : 1
                                }}
                                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                              />
                            </motion.button>
                          )}

                          {item.action?.type === 'select' && item.action.options && (
                            <motion.div
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              className="relative"
                            >
                              <select
                                value={String(item.action.value)}
                                onChange={(e) => {
                                  e.stopPropagation()
                                  handleSelectChange(e, item.id)
                                }}
                                className="px-3 py-1.5 rounded-lg bg-white/10 text-white text-xs border border-white/10 focus:border-violet-500 focus:outline-none cursor-pointer appearance-none"
                              >
                                {item.action.options.map((opt) => (
                                  <option key={opt.value} value={opt.value} className="bg-slate-900">
                                    {opt.label}
                                  </option>
                                ))}
                              </select>
                              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none" />
                            </motion.div>
                          )}

                          {item.action?.type === 'slider' && (
                            <div className="flex items-center gap-2">
                              <input
                                type="range"
                                min={item.action.min}
                                max={item.action.max}
                                step={item.action.step}
                                value={Number(item.action.value)}
                                onChange={(e) => {
                                  e.stopPropagation()
                                  handleSliderChange(Number(e.target.value))
                                }}
                                className="w-20 h-1.5 rounded-full bg-white/20 appearance-none cursor-pointer"
                                style={{
                                  background: `linear-gradient(to right, #8b5cf6 0%, #8b5cf6 ${((Number(item.action.value) - (item.action.min || 0)) / ((item.action.max || 100) - (item.action.min || 0))) * 100}%, rgba(255,255,255,0.1) ${((Number(item.action.value) - (item.action.min || 0)) / ((item.action.max || 100) - (item.action.min || 0))) * 100}%, rgba(255,255,255,0.1) 100%)`
                                }}
                              />
                              <span className="text-xs text-violet-400 font-medium w-10 text-right">
                                {item.action.value}%
                              </span>
                            </div>
                          )}

                          {item.action?.type === 'button' && (
                            <button
                              onClick={() => handleButtonAction(item.id)}
                              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 text-white text-sm font-medium shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50 hover:opacity-90 transition-all"
                            >
                              <span>操作</span>
                              <ChevronRight className="w-4 h-4" />
                            </button>
                          )}
                          {item.action?.type === 'link' && (
                            <motion.div
                              animate={{ x: [0, 5, 0] }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                              className="text-white/40"
                            >
                              <ChevronRight className="w-4 h-4" />
                            </motion.div>
                          )}
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </motion.div>
            </motion.div>
          )
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="px-4 md:px-6 mt-8 pb-8 max-w-4xl mx-auto"
      >
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-red-400" />
              <h3 className="text-lg font-semibold text-white">测评记录</h3>
              <span className="px-3 py-1 rounded-full bg-red-500/20 text-red-400 text-xs font-medium">
                {completedAssessments.length} 条
              </span>
            </div>
            {completedAssessments.length > 0 && (
              <button
                onClick={() => { setDeleteTarget(null); setShowDeleteConfirm(true) }}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/10 text-red-400 text-sm hover:bg-red-500/20 transition-colors"
              >
                <X className="w-4 h-4" />
                清空全部
              </button>
            )}
          </div>

          {completedAssessments.length > 0 ? (
            <div className="space-y-2 max-h-80 overflow-y-auto pr-2">
              {completedAssessments.slice(0, 20).map((record) => {
                const completedDate = new Date(record.completedAt)
                return (
                <motion.div
                  key={`${record.assessmentId}-${completedDate.getTime()}`}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors group"
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0 cursor-pointer" onClick={() => navigate(`/legacy/results/${record.id}`)}>
                    <Calendar className="w-4 h-4 text-white/40 shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-white truncate">
                        {getAssessmentTitle(record.assessmentId)}
                      </p>
                      <p className="text-xs text-white/40">
                        {completedDate.toLocaleDateString('zh-CN', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleDeleteRecord(record.id!)
                    }}
                    className="opacity-0 group-hover:opacity-100 p-2 rounded-lg hover:bg-red-500/20 transition-all"
                  >
                    <X className="w-4 h-4 text-red-400" />
                  </button>
                </motion.div>
              )})}
            </div>
          ) : (
            <div className="text-center py-8 text-white/40">
              <AlertCircle className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>暂无测评记录</p>
              <p className="text-sm mt-1">完成测评后记录将显示在这里</p>
            </div>
          )}
        </div>
      </motion.div>

      <input
        id="import-file"
        type="file"
        accept=".json"
        onChange={importDataJSON}
        className="hidden"
      />

      {/* Modals */}
      <AnimatePresence>
        {showProfileModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md overflow-y-auto"
            onClick={() => setShowProfileModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="rounded-2xl p-6 max-w-md w-full bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 shadow-2xl shadow-violet-500/10"
              onClick={(e) => e.stopPropagation()}
              style={{ maxHeight: '85vh', overflowY: 'auto' }}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white">编辑个人资料</h3>
                </div>
                <motion.button
                  onClick={() => setShowProfileModal(false)}
                  className="p-2 rounded-xl hover:bg-white/10 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <X className="w-5 h-5 text-white/60" />
                </motion.button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">昵称</label>
                  <input
                    type="text"
                    value={profileForm.name}
                    onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder-white/30 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-all"
                    placeholder="输入昵称"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">简介</label>
                  <textarea
                    value={profileForm.bio}
                    onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder-white/30 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-all resize-none"
                    placeholder="简单介绍一下自己"
                    rows={3}
                  />
                </div>
                <motion.button
                  onClick={handleProfileSubmit}
                  className="w-full px-4 py-3 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 text-white font-semibold"
                  whileHover={{ scale: 1.02, opacity: 0.95 }}
                  whileTap={{ scale: 0.98 }}
                >
                  保存修改
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {showEmailModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md overflow-y-auto"
            onClick={() => setShowEmailModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="rounded-2xl p-6 max-w-md w-full bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 shadow-2xl shadow-violet-500/10"
              onClick={(e) => e.stopPropagation()}
              style={{ maxHeight: '85vh', overflowY: 'auto' }}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white">绑定邮箱</h3>
                </div>
                <motion.button
                  onClick={() => setShowEmailModal(false)}
                  className="p-2 rounded-xl hover:bg-white/10 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <X className="w-5 h-5 text-white/60" />
                </motion.button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">邮箱地址</label>
                  <input
                    type="email"
                    value={emailForm.email}
                    onChange={(e) => setEmailForm({ ...emailForm, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder-white/30 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-all"
                    placeholder="your@email.com"
                  />
                </div>
                <motion.button
                  onClick={handleEmailSubmit}
                  className="w-full px-4 py-3 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 text-white font-semibold"
                  whileHover={{ scale: 1.02, opacity: 0.95 }}
                  whileTap={{ scale: 0.98 }}
                >
                  发送验证邮件
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {showPasswordModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md overflow-y-auto"
            onClick={() => setShowPasswordModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="rounded-2xl p-6 max-w-md w-full bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 shadow-2xl shadow-violet-500/10"
              onClick={(e) => e.stopPropagation()}
              style={{ maxHeight: '85vh', overflowY: 'auto' }}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
                    <Lock className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white">修改密码</h3>
                </div>
                <motion.button
                  onClick={() => setShowPasswordModal(false)}
                  className="p-2 rounded-xl hover:bg-white/10 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <X className="w-5 h-5 text-white/60" />
                </motion.button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">当前密码</label>
                  <input
                    type="password"
                    value={passwordForm.current}
                    onChange={(e) => setPasswordForm({ ...passwordForm, current: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder-white/30 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-all"
                    placeholder="请输入当前密码"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">新密码</label>
                  <input
                    type="password"
                    value={passwordForm.new}
                    onChange={(e) => setPasswordForm({ ...passwordForm, new: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder-white/30 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-all"
                    placeholder="请输入新密码"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">确认密码</label>
                  <input
                    type="password"
                    value={passwordForm.confirm}
                    onChange={(e) => setPasswordForm({ ...passwordForm, confirm: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder-white/30 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-all"
                    placeholder="再次输入新密码"
                  />
                </div>
                <motion.button
                  onClick={handlePasswordSubmit}
                  className="w-full px-4 py-3 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 text-white font-semibold"
                  whileHover={{ scale: 1.02, opacity: 0.95 }}
                  whileTap={{ scale: 0.98 }}
                >
                  修改密码
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {showAppInfoModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md overflow-y-auto"
            onClick={() => setShowAppInfoModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="rounded-2xl p-6 max-w-md w-full bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 shadow-2xl shadow-violet-500/10"
              onClick={(e) => e.stopPropagation()}
              style={{ maxHeight: '85vh', overflowY: 'auto' }}
            >
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg shadow-violet-500/30">
                  <Sparkles className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-1">心镜 MindMirror</h3>
                <p className="text-violet-400 text-sm mb-4">v3.0.0</p>
                <div className="bg-white/5 rounded-xl p-4 text-left text-sm text-white/70 space-y-2 border border-white/5">
                  <p>📅 构建日期: {new Date().toLocaleDateString()}</p>
                  <p>🔧 技术栈: React 18 + TypeScript</p>
                  <p>🎨 样式: Tailwind CSS 3</p>
                  <p>⚡ 状态管理: Zustand</p>
                </div>
                <motion.button
                  onClick={() => setShowAppInfoModal(false)}
                  className="mt-6 w-full px-4 py-3 rounded-xl bg-white/10 text-white font-semibold"
                  whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.15)' }}
                  whileTap={{ scale: 0.98 }}
                >
                  关闭
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {showHelpModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md overflow-y-auto"
            onClick={() => setShowHelpModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="rounded-2xl p-6 max-w-md w-full bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 shadow-2xl shadow-violet-500/10 max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                    <HelpCircle className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white">帮助中心</h3>
                </div>
                <motion.button
                  onClick={() => setShowHelpModal(false)}
                  className="p-2 rounded-xl hover:bg-white/10 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <X className="w-5 h-5 text-white/60" />
                </motion.button>
              </div>
              <div className="space-y-4 text-sm text-white/70">
                <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                  <h4 className="font-semibold text-white mb-2">📋 如何开始测评？</h4>
                  <p>点击底部导航"探索"，选择感兴趣的测评，点击开始即可。</p>
                </div>
                <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                  <h4 className="font-semibold text-white mb-2">💾 数据安全吗？</h4>
                  <p>所有数据存储在您的设备本地，不会上传到服务器。</p>
                </div>
                <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                  <h4 className="font-semibold text-white mb-2">📱 支持哪些平台？</h4>
                  <p>支持Web浏览器、Windows桌面版和移动端浏览器。</p>
                </div>
                <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                  <h4 className="font-semibold text-white mb-2">🔄 如何备份数据？</h4>
                  <p>在设置中选择"导出数据"，将JSON文件保存到安全位置。</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {showShortcutsModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md overflow-y-auto"
            onClick={() => setShowShortcutsModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="rounded-2xl p-6 max-w-md w-full bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 shadow-2xl shadow-violet-500/10"
              onClick={(e) => e.stopPropagation()}
              style={{ maxHeight: '85vh', overflowY: 'auto' }}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                    <Keyboard className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white">键盘快捷键</h3>
                </div>
                <motion.button
                  onClick={() => setShowShortcutsModal(false)}
                  className="p-2 rounded-xl hover:bg-white/10 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <X className="w-5 h-5 text-white/60" />
                </motion.button>
              </div>
              <div className="space-y-3">
                {[
                  { keys: ['Ctrl', 'K'], desc: '快速搜索' },
                  { keys: ['Ctrl', '/'], desc: '显示快捷键' },
                  { keys: ['Esc'], desc: '关闭弹窗' },
                  { keys: ['Alt', '1-5'], desc: '切换标签页' },
                ].map((shortcut, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-xl bg-white/5">
                    <span className="text-white/70 text-sm">{shortcut.desc}</span>
                    <div className="flex gap-1">
                      {shortcut.keys.map((key, i) => (
                        <span key={i}>
                          <kbd className="px-2 py-1 rounded-lg bg-white/10 text-white text-xs font-mono border border-white/10">
                            {key}
                          </kbd>
                          {i < shortcut.keys.length - 1 && <span className="text-white/40 mx-1">+</span>}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}

        {showGettingStartedModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md overflow-y-auto"
            onClick={() => setShowGettingStartedModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="rounded-2xl p-6 max-w-md w-full bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 shadow-2xl shadow-violet-500/10 max-h-[85vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white">入门教程</h3>
                </div>
                <motion.button
                  onClick={() => setShowGettingStartedModal(false)}
                  className="p-2 rounded-xl hover:bg-white/10 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <X className="w-5 h-5 text-white/60" />
                </motion.button>
              </div>
              <div className="space-y-6 text-sm">
                <div className="bg-gradient-to-r from-violet-500/10 to-purple-500/10 rounded-xl p-4 border border-violet-500/20">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-full bg-violet-500/20 flex items-center justify-center">
                      <span className="text-violet-400 font-bold text-sm">1</span>
                    </div>
                    <h4 className="font-semibold text-white">开始你的测评之旅</h4>
                  </div>
                  <p className="text-white/70 ml-11">
                    点击底部导航的「探索」，浏览丰富的心理测评，选择你感兴趣的测评开始测试。
                  </p>
                </div>

                <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-xl p-4 border border-blue-500/20">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                      <span className="text-blue-400 font-bold text-sm">2</span>
                    </div>
                    <h4 className="font-semibold text-white">了解你的心理特质</h4>
                  </div>
                  <p className="text-white/70 ml-11">
                    完成测评后，系统会生成详细的分析报告，帮助你深入了解自己的性格、能力和潜力。
                  </p>
                </div>

                <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-xl p-4 border border-green-500/20">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                      <span className="text-green-400 font-bold text-sm">3</span>
                    </div>
                    <h4 className="font-semibold text-white">记录每日心情</h4>
                  </div>
                  <p className="text-white/70 ml-11">
                    在「今日」页面记录你的每日心情，跟踪情绪变化，发现规律并提升自我认知。
                  </p>
                </div>

                <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-xl p-4 border border-amber-500/20">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center">
                      <span className="text-amber-400 font-bold text-sm">4</span>
                    </div>
                    <h4 className="font-semibold text-white">解锁成就徽章</h4>
                  </div>
                  <p className="text-white/70 ml-11">
                    完成测评和日常任务，解锁各种成就徽章，见证你的成长历程。
                  </p>
                </div>

                <div className="bg-gradient-to-r from-pink-500/10 to-rose-500/10 rounded-xl p-4 border border-pink-500/20">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-full bg-pink-500/20 flex items-center justify-center">
                      <span className="text-pink-400 font-bold text-sm">5</span>
                    </div>
                    <h4 className="font-semibold text-white">保护你的数据</h4>
                  </div>
                  <p className="text-white/70 ml-11">
                    所有数据存储在本地，支持一键导出备份。定期导出数据，确保你的测评记录安全。
                  </p>
                </div>
              </div>
              <motion.button
                onClick={() => setShowGettingStartedModal(false)}
                className="mt-6 w-full px-4 py-3 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 text-white font-semibold"
                whileHover={{ scale: 1.02, opacity: 0.95 }}
                whileTap={{ scale: 0.98 }}
              >
                开始探索
              </motion.button>
            </motion.div>
          </motion.div>
        )}

        {showResetConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md"
            onClick={() => setShowResetConfirm(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="rounded-2xl p-6 max-w-sm w-full bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 shadow-2xl shadow-violet-500/10"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center mb-6">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-amber-500/20 flex items-center justify-center shadow-lg">
                  <AlertCircle className="w-8 h-8 text-amber-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">重置所有设置？</h3>
                <p className="text-white/60 text-sm">
                  这将恢复所有设置为默认值，但不会删除您的测评数据。
                </p>
              </div>
              <div className="flex gap-3">
                <motion.button
                  onClick={() => setShowResetConfirm(false)}
                  className="flex-1 px-4 py-3 rounded-xl bg-white/10 text-white font-semibold"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  取消
                </motion.button>
                <motion.button
                  onClick={confirmResetSettings}
                  className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold"
                  whileHover={{ scale: 1.02, opacity: 0.95 }}
                  whileTap={{ scale: 0.98 }}
                >
                  确认重置
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {showDeleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md"
            onClick={() => setShowDeleteConfirm(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="rounded-2xl p-6 max-w-sm w-full bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 shadow-2xl shadow-red-500/10"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center mb-6">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-500/20 flex items-center justify-center shadow-lg">
                  <AlertCircle className="w-8 h-8 text-red-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {deleteTarget ? '删除此记录？' : '清空所有记录？'}
                </h3>
                <p className="text-white/60 text-sm">
                  {deleteTarget
                    ? '此操作无法撤销，确定要继续吗？'
                    : '这将永久删除所有测评记录和成就进度，此操作无法撤销。'}
                </p>
              </div>
              <div className="flex gap-3">
                <motion.button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1 px-4 py-3 rounded-xl bg-white/10 text-white font-semibold"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  取消
                </motion.button>
                <motion.button
                  onClick={deleteTarget ? confirmDelete : confirmClearAll}
                  className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold"
                  whileHover={{ scale: 1.02, opacity: 0.95 }}
                  whileTap={{ scale: 0.98 }}
                >
                  确认删除
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
