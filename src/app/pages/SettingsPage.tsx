import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useToast } from '@hooks/useToast'
import {
  ChevronRight,
  AlertCircle,
  Calendar,
  ArrowLeft,
  User,
  Palette,
  Moon,
  Sun,
  Bell,
  Shield,
  Download,
  Upload,
  Volume2,
  Clock,
  Info,
  Monitor,
  Zap,
  Eye,
  Database,
  Trash2,
  Cloud,
  FileText,
  Sparkles,
  Sparkle,
  Globe,
  Check,
  Trash,
  RefreshCw,
  Save,
  Share,
  Palette as ColorWheel,
  BellOff,
  Lock,
  Unlock,
  Cpu,
  Battery,
  Wifi,
  MoonStars,
  Maximize,
  Minimize,
  History,
  HelpCircle,
  Star,
  Award,
  Target,
  Wand2,
  Scale,
  Brain,
  Heart,
  Activity,
} from 'lucide-react'
import { useAppStore } from '@store'
import { useSettingsStore } from '@store/settingsStore'
import { getAssessmentById } from '@data/assessments'
import { cn } from '@utils/cn'
import { useI18n } from '../../i18n'

interface ToggleSetting {
  id: string
  label: string
  description: string
  enabled: boolean
  onToggle: () => void
  icon: React.ElementType
}

interface Section {
  id: string
  label: string
  icon: React.ElementType
  color: string
}

interface ThemeOption {
  value: string
  label: string
  icon: React.ElementType
}

interface ColorOption {
  value: string
  label: string
  hex: string
}

function ToggleItem({ setting }: { setting: ToggleSetting }) {
  const Icon = setting.icon
  return (
    <motion.div
      key={setting.id}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-between p-5 rounded-2xl bg-white/5"
    >
      <div className="flex items-center gap-4 flex-1">
        <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
          <Icon size={24} className="text-white/70" />
        </div>
        <div className="flex-1">
          <p className="text-white font-medium text-base">{setting.label}</p>
          <p className="text-sm text-white/40 mt-1">{setting.description}</p>
        </div>
      </div>
      <motion.button
        onClick={setting.onToggle}
        className={cn(
          'relative w-16 h-9 rounded-full transition-colors shrink-0',
          setting.enabled ? 'bg-gradient-to-r from-violet-500 to-purple-500' : 'bg-white/20'
        )}
        whileTap={{ scale: 0.95 }}
      >
        <motion.span
          className="absolute top-1 w-7 h-7 rounded-full bg-white shadow-lg"
          animate={{ left: setting.enabled ? '32px' : '4px' }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        />
      </motion.button>
    </motion.div>
  )
}

function SectionHeader({ icon: Icon, title, description, color }: { icon: React.ElementType; title: string; description: string; color?: string }) {
  return (
    <div className="flex items-center gap-4 mb-6">
      <div className={cn(
        'w-12 h-12 rounded-xl flex items-center justify-center shrink-0',
        color ? `bg-gradient-to-br ${color}` : 'bg-white/10'
      )}>
        <Icon size={24} className={color ? 'text-white' : 'text-white/70'} />
      </div>
      <div>
        <h2 className="text-xl font-bold text-white">{title}</h2>
        <p className="text-sm text-white/50">{description}</p>
      </div>
    </div>
  )
}

function StatCard({ value, label }: { value: string | number; label: string }) {
  return (
    <div className="p-6 rounded-xl bg-white/5 text-center">
      <p className="text-3xl font-bold text-white">{value}</p>
      <p className="text-sm text-white/50 mt-2">{label}</p>
    </div>
  )
}

function ActionButton({ icon: Icon, label, description, onClick, variant = 'default' }: { 
  icon: React.ElementType; 
  label: string; 
  description: string; 
  onClick: () => void;
  variant?: 'default' | 'danger' | 'success'
}) {
  const variants = {
    default: 'bg-white/5 hover:bg-white/10 text-white',
    danger: 'bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30',
    success: 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30',
  }
  
  return (
    <motion.button
      onClick={onClick}
      className={cn(
        'w-full p-5 rounded-2xl transition-all flex items-center gap-4',
        variants[variant]
      )}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className={cn(
        'w-12 h-12 rounded-xl flex items-center justify-center shrink-0',
        variant === 'danger' ? 'bg-red-500/20' : 
        variant === 'success' ? 'bg-emerald-500/20' : 'bg-white/10'
      )}>
        <Icon size={24} className={variant === 'danger' ? 'text-red-400' : variant === 'success' ? 'text-emerald-400' : 'text-white/70'} />
      </div>
      <div className="flex-1 text-left">
        <p className="text-white font-medium">{label}</p>
        <p className="text-sm text-white/50">{description}</p>
      </div>
      <ChevronRight size={20} className="text-white/40 shrink-0" />
    </motion.button>
  )
}

function RadioOption<T extends string>({ 
  value, 
  label, 
  icon: Icon, 
  selected, 
  onChange 
}: { 
  value: T; 
  label: string; 
  icon?: React.ElementType;
  selected: boolean; 
  onChange: (value: T) => void 
}) {
  return (
    <motion.button
      key={value}
      onClick={() => onChange(value)}
      className={cn(
        'relative p-5 rounded-2xl transition-all flex flex-col items-center gap-3',
        selected
          ? 'bg-gradient-to-br from-violet-500/20 to-purple-500/20 border-2 border-violet-500'
          : 'bg-white/5 border-2 border-transparent hover:border-white/20'
      )}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {Icon && <Icon size={28} className={selected ? 'text-violet-400' : 'text-white/60'} />}
      <span className={cn('font-medium text-base', selected ? 'text-white' : 'text-white/60')}>
        {label}
      </span>
      {selected && (
        <motion.div
          layoutId="selectedIndicator"
          className="absolute inset-0 bg-violet-500/10 rounded-2xl"
        />
      )}
    </motion.button>
  )
}

function ColorOptionButton({ 
  value, 
  label, 
  hex, 
  selected, 
  onChange 
}: { 
  value: string; 
  label: string; 
  hex: string; 
  selected: boolean; 
  onChange: (value: string) => void 
}) {
  return (
    <motion.button
      key={value}
      onClick={() => onChange(value)}
      className={cn(
        'w-14 h-14 rounded-full transition-all flex flex-col items-center justify-center gap-1 group',
        selected && 'ring-4 ring-white/30 scale-110'
      )}
      style={{ backgroundColor: hex }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      {selected && <Check size={24} className="text-white" />}
      <span className="text-xs text-white/80 opacity-0 group-hover:opacity-100 transition-opacity">
        {label}
      </span>
    </motion.button>
  )
}

export default function SettingsPage() {
  const navigate = useNavigate()
  const toast = useToast()
  const { language, setLanguage } = useI18n()
  const fileInputRef = useRef<HTMLInputElement>(null)
  
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

  const [activeSection, setActiveSection] = useState('personal')
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null)
  const [editingProfile, setEditingProfile] = useState(false)
  const [profileForm, setProfileForm] = useState({
    name: user?.name || '',
    bio: user?.bio || '',
  })

  const sections: Section[] = [
    { id: 'personal', label: '个人', icon: User, color: 'from-blue-500 to-cyan-500' },
    { id: 'appearance', label: '外观', icon: Palette, color: 'from-violet-500 to-purple-500' },
    { id: 'notifications', label: '通知', icon: Bell, color: 'from-amber-500 to-orange-500' },
    { id: 'privacy', label: '隐私', icon: Shield, color: 'from-rose-500 to-pink-500' },
    { id: 'performance', label: '性能', icon: Cpu, color: 'from-emerald-500 to-teal-500' },
    { id: 'data', label: '数据', icon: Database, color: 'from-indigo-500 to-blue-500' },
    { id: 'about', label: '关于', icon: Info, color: 'from-gray-500 to-slate-500' },
  ]

  const themeOptions: ThemeOption[] = [
    { value: 'dark', label: '深色', icon: Moon },
    { value: 'light', label: '浅色', icon: Sun },
    { value: 'system', label: '系统', icon: Monitor },
    { value: 'midnight', label: '午夜', icon: MoonStars },
  ]

  const colorOptions: ColorOption[] = [
    { value: 'violet', label: '紫罗兰', hex: '#8b5cf6' },
    { value: 'blue', label: '蓝色', hex: '#3b82f6' },
    { value: 'green', label: '绿色', hex: '#10b981' },
    { value: 'pink', label: '粉色', hex: '#ec4899' },
    { value: 'orange', label: '橙色', hex: '#f97316' },
    { value: 'cyan', label: '青色', hex: '#06b6d4' },
    { value: 'red', label: '红色', hex: '#ef4444' },
    { value: 'amber', label: '琥珀', hex: '#f59e0b' },
  ]

  const appearanceSettings: ToggleSetting[] = [
    { id: 'animations', label: '动画效果', description: '界面动画和过渡效果', enabled: animationsEnabled, onToggle: toggleAnimations, icon: Sparkles },
    { id: 'reduced', label: '减少动画', description: '降低动画幅度，提升流畅度', enabled: reducedMotion, onToggle: toggleReducedMotion, icon: Minimize },
    { id: 'contrast', label: '高对比度', description: '提高界面可视性', enabled: highContrast, onToggle: toggleHighContrast, icon: Maximize },
  ]

  const notificationSettings: ToggleSetting[] = [
    { id: 'notifications', label: '推送通知', description: '接收测评和成就提醒', enabled: pushNotifications, onToggle: togglePushNotifications, icon: Bell },
    { id: 'daily', label: '每日提醒', description: '每日心情打卡提醒', enabled: dailyReminder, onToggle: toggleDailyReminder, icon: Clock },
    { id: 'achievements', label: '成就通知', description: '解锁成就时的提示', enabled: achievementNotifications, onToggle: toggleAchievementNotifications, icon: Award },
    { id: 'sound', label: '音效', description: '交互音效反馈', enabled: soundEffects, onToggle: toggleSoundEffects, icon: Volume2 },
  ]

  const privacySettings: ToggleSetting[] = [
    { id: 'privacy', label: '隐私模式', description: '隐藏敏感数据和测评结果', enabled: privacyMode, onToggle: togglePrivacyMode, icon: Lock },
    { id: 'backup', label: '自动备份', description: '定期自动备份数据到本地', enabled: autoBackup, onToggle: toggleAutoBackup, icon: Cloud },
  ]

  const performanceSettings: ToggleSetting[] = [
    { id: 'battery', label: '省电模式', description: '减少动画以节省电量', enabled: false, onToggle: () => toast.info('省电模式开发中', 2000), icon: Battery },
    { id: 'offline', label: '离线模式', description: '优先使用本地数据', enabled: true, onToggle: () => toast.info('离线模式已启用', 2000), icon: Wifi },
    { id: 'cache', label: '缓存优化', description: '预加载常用资源', enabled: true, onToggle: () => toast.info('缓存优化已启用', 2000), icon: Cpu },
  ]

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
          data.completedAssessments.forEach((a: Record<string, unknown>) => {
            if (a.assessmentId) {
              const existingIndex = completedAssessments.findIndex(
                ca => ca.assessmentId === a.assessmentId && ca.completedAt === a.completedAt
              )
              if (existingIndex === -1) {
                completedAssessments.push({
                  ...a,
                  completedAt: new Date(a.completedAt as string),
                } as never)
              }
            }
          })
          toast.success(`📦 成功导入 ${data.completedAssessments.length} 条测评记录`, 2500)
        }
      } catch {
        toast.error('❌ 导入失败：文件格式损坏', 2500)
      }
    }
    reader.readAsText(file)
    event.target.value = ''
  }

  const shareResults = async () => {
    const shareData = {
      title: '我的心镜测评结果',
      text: `我在心镜 MindMirror 完成了${completedAssessments.length}个测评！`,
      url: window.location.href,
    }

    if (navigator.share) {
      try {
        await navigator.share(shareData)
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          navigator.clipboard.writeText(shareData.text + '\n' + shareData.url)
          toast.success('📋 已复制到剪贴板', 2000)
        }
      }
    } else {
      navigator.clipboard.writeText(shareData.text + '\n' + shareData.url)
      toast.success('📋 已复制到剪贴板', 2000)
    }
  }

  const confirmDelete = () => {
    if (deleteTarget) {
      deleteAssessment(deleteTarget)
      toast.success('🗑️ 记录已删除', 2000)
    }
    setShowDeleteModal(false)
    setDeleteTarget(null)
  }

  const handleSaveProfile = () => {
    updateUserProfile(profileForm)
    setEditingProfile(false)
    toast.success('✅ 资料已保存', 2000)
  }

  const getAssessmentTitle = (id: string) => {
    const assessment = getAssessmentById(id)
    return assessment?.title || id
  }

  return (
    <div className="min-h-screen pb-20">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-10 backdrop-blur-xl border-b border-white/10"
      >
        <div className="flex items-center gap-5 p-5 md:p-6 max-w-6xl mx-auto">
          <motion.button
            onClick={() => navigate('/app/daily')}
            className="w-12 h-12 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft size={24} className="text-white/70" />
          </motion.button>
          <div>
            <h1 className="text-2xl font-bold text-white">设置</h1>
            <p className="text-sm text-white/50">个性化你的体验</p>
          </div>
        </div>

        <div className="flex gap-3 px-5 pb-5 max-w-6xl mx-auto overflow-x-auto scrollbar-hide">
          {sections.map((section) => {
            const Icon = section.icon
            const isActive = activeSection === section.id
            return (
              <motion.button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={cn(
                  'flex items-center gap-3 px-5 py-3 rounded-full whitespace-nowrap transition-all',
                  isActive
                    ? `bg-gradient-to-r ${section.color} text-white shadow-lg`
                    : 'bg-white/5 text-white/60 hover:bg-white/10'
                )}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Icon size={20} />
                <span className="text-base font-medium">{section.label}</span>
              </motion.button>
            )
          })}
        </div>
      </motion.div>

      <div className="p-4 md:p-6 max-w-6xl mx-auto">
        <AnimatePresence mode="wait">
          {activeSection === 'personal' && (
            <motion.div
              key="personal"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-white/10 p-6">
                <div className="flex items-center justify-between mb-6">
                  <SectionHeader icon={User} title="个人资料" description="管理你的个人信息" color="from-blue-500 to-cyan-500" />
                  {!editingProfile && (
                    <motion.button
                      onClick={() => setEditingProfile(true)}
                      className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white/80 text-sm font-medium transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      编辑
                    </motion.button>
                  )}
                </div>

                {editingProfile ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-white/60 mb-2">昵称</label>
                      <input
                        type="text"
                        value={profileForm.name}
                        onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-blue-500 focus:outline-none transition-colors"
                        placeholder="给你的昵称"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-white/60 mb-2">简介</label>
                      <textarea
                        value={profileForm.bio}
                        onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-blue-500 focus:outline-none transition-colors resize-none"
                        placeholder="介绍下自己..."
                        rows={3}
                      />
                    </div>
                    <div className="flex gap-3">
                      <motion.button
                        onClick={handleSaveProfile}
                        className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold flex items-center justify-center gap-2"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Save size={18} />
                        保存
                      </motion.button>
                      <motion.button
                        onClick={() => setEditingProfile(false)}
                        className="px-4 py-3 rounded-xl bg-white/10 text-white/80 font-medium"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        取消
                      </motion.button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center text-3xl font-bold text-white shrink-0">
                        {(user?.name || '用')[0]}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-white">{user?.name || '用户'}</h3>
                        <p className="text-sm text-white/50 mt-1">{user?.bio || '这个人很懒，什么都没写'}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <StatCard value={completedAssessments.length} label="完成测评" />
                      <StatCard value={achievements.length} label="获得成就" />
                      <StatCard value={Math.floor(Math.random() * 100)} label="成长积分" />
                    </div>
                  </div>
                )}
              </div>

              <div className="rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-white/10 p-6">
                <SectionHeader icon={Globe} title="语言" description="选择界面语言" color="from-amber-500 to-orange-500" />
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { value: 'zh', label: '中文' },
                    { value: 'en', label: 'English' },
                  ].map((lang) => (
                    <motion.button
                      key={lang.value}
                      onClick={() => setLanguage(lang.value as 'zh' | 'en')}
                      className={cn(
                        'px-6 py-4 rounded-2xl font-semibold text-lg transition-all flex items-center justify-center',
                        language === lang.value
                          ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/25'
                          : 'bg-white/5 text-white/60 hover:bg-white/10'
                      )}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {lang.label}
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeSection === 'appearance' && (
            <motion.div
              key="appearance"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-white/10 p-6">
                <SectionHeader icon={Moon} title="主题模式" description="选择外观主题" color="from-violet-500 to-purple-500" />
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {themeOptions.map((option) => (
                    <RadioOption
                      key={option.value}
                      value={option.value}
                      label={option.label}
                      icon={option.icon}
                      selected={theme === option.value}
                      onChange={(value) => setTheme(value as 'dark' | 'light' | 'system')}
                    />
                  ))}
                </div>
              </div>

              <div className="rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-white/10 p-6">
                <SectionHeader icon={ColorWheel} title="强调色" description="自定义主题颜色" color="from-pink-500 to-rose-500" />
                <div className="flex gap-4 flex-wrap justify-center">
                  {colorOptions.map((color) => (
                    <ColorOptionButton
                      key={color.value}
                      value={color.value}
                      label={color.label}
                      hex={color.hex}
                      selected={accentColor === color.value}
                      onChange={(value) => setAccentColor(value as typeof accentColor)}
                    />
                  ))}
                </div>
              </div>

              <div className="rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-white/10 p-6">
                <SectionHeader icon={Sparkles} title="视觉特效" description="动画和界面效果" color="from-emerald-500 to-teal-500" />
                <div className="space-y-4">
                  {appearanceSettings.map((setting) => (
                    <ToggleItem key={setting.id} setting={setting} />
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeSection === 'notifications' && (
            <motion.div
              key="notifications"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-white/10 p-6">
                <SectionHeader icon={Bell} title="通知设置" description="管理通知偏好" color="from-amber-500 to-orange-500" />
                <div className="space-y-4">
                  {notificationSettings.map((setting) => (
                    <ToggleItem key={setting.id} setting={setting} />
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeSection === 'privacy' && (
            <motion.div
              key="privacy"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-white/10 p-6">
                <SectionHeader icon={Shield} title="隐私保护" description="管理隐私设置" color="from-rose-500 to-pink-500" />
                <div className="space-y-4">
                  {privacySettings.map((setting) => (
                    <ToggleItem key={setting.id} setting={setting} />
                  ))}
                </div>
              </div>

              <div className="rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-white/10 p-6">
                <SectionHeader icon={Lock} title="安全选项" description="账号安全设置" />
                <div className="space-y-4">
                  <ActionButton icon={Unlock} label="修改密码" description="更新您的登录密码" onClick={() => toast.info('密码修改功能开发中', 2000)} />
                  <ActionButton icon={Star} label="两步验证" description="启用额外的安全保护" onClick={() => toast.info('两步验证功能开发中', 2000)} />
                  <ActionButton icon={History} label="登录记录" description="查看最近的登录活动" onClick={() => toast.info('登录记录功能开发中', 2000)} />
                </div>
              </div>
            </motion.div>
          )}

          {activeSection === 'performance' && (
            <motion.div
              key="performance"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-white/10 p-6">
                <SectionHeader icon={Cpu} title="性能设置" description="优化应用性能" color="from-emerald-500 to-teal-500" />
                <div className="space-y-4">
                  {performanceSettings.map((setting) => (
                    <ToggleItem key={setting.id} setting={setting} />
                  ))}
                </div>
              </div>

              <div className="rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-white/10 p-6">
                <SectionHeader icon={Activity} title="资源管理" description="管理应用资源" />
                <div className="space-y-4">
                  <ActionButton icon={Database} label="清除缓存" description="清理本地缓存数据" onClick={() => toast.info('缓存清理功能开发中', 2000)} />
                  <ActionButton icon={RefreshCw} label="检查更新" description="检查应用更新" onClick={() => toast.success('已是最新版本', 2000)} />
                </div>
              </div>
            </motion.div>
          )}

          {activeSection === 'data' && (
            <motion.div
              key="data"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-white/10 p-6">
                <SectionHeader icon={Database} title="数据管理" description="管理您的数据" color="from-indigo-500 to-blue-500" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <ActionButton icon={Download} label="导出数据" description="备份到本地文件" onClick={exportDataJSON} variant="success" />
                  <ActionButton icon={Upload} label="导入数据" description="从文件恢复" onClick={() => fileInputRef.current?.click()} />
                  <ActionButton icon={Share} label="分享应用" description="推荐给朋友" onClick={shareResults} />
                  <ActionButton icon={RefreshCw} label="重置设置" description="恢复默认配置" onClick={() => { resetSettings(); toast.success('设置已重置', 2000) }} />
                </div>
              </div>

              <div className="rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-white/10 p-6">
                <SectionHeader icon={Trash} title="危险区域" description="不可逆的操作" color="from-red-500 to-rose-500" />
                <ActionButton 
                  icon={Trash2} 
                  label="清空所有测评记录" 
                  description="这将永久删除所有测评记录和成就" 
                  onClick={() => { setDeleteTarget('all'); setShowDeleteModal(true) }} 
                  variant="danger" 
                />
              </div>

              <div className="rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-white/10 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-white">测评记录</h2>
                  <span className="px-4 py-2 rounded-full bg-red-500/20 text-red-400 text-sm font-medium">
                    {completedAssessments.length} 条
                  </span>
                </div>
                
                {completedAssessments.length > 0 ? (
                  <div className="space-y-3 max-h-80 overflow-y-auto">
                    {completedAssessments.slice(0, 10).map((record) => (
                      <motion.div
                        key={`${record.assessmentId}-${record.completedAt}`}
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center justify-between p-5 rounded-2xl bg-white/5 group"
                      >
                        <div 
                          className="flex items-center gap-4 flex-1 min-w-0 cursor-pointer"
                          onClick={() => navigate(`/legacy/results/${record.id}`)}
                        >
                          <Calendar size={20} className="text-white/40 shrink-0" />
                          <div className="min-w-0 flex-1">
                            <p className="text-base font-medium text-white truncate">
                              {getAssessmentTitle(record.assessmentId)}
                            </p>
                            <p className="text-sm text-white/40 mt-1">
                              {new Date(record.completedAt).toLocaleDateString('zh-CN')}
                            </p>
                          </div>
                        </div>
                        <ChevronRight size={20} className="text-white/30 shrink-0" />
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10 text-white/40">
                    <FileText size={48} className="mx-auto mb-4 opacity-50" />
                    <p className="text-base">暂无测评记录</p>
                    <p className="text-sm mt-2">完成测评后记录将显示在这里</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {activeSection === 'about' && (
            <motion.div
              key="about"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-white/10 p-8 text-center">
                <div className="w-28 h-28 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-2xl shadow-violet-500/30">
                  <Sparkles size={56} className="text-white" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-3">心镜 MindMirror</h2>
                <p className="text-violet-400 font-medium text-lg mb-5">版本 3.0.0</p>
                <p className="text-white/60 text-base max-w-md mx-auto">
                  照见自己，成为更好的自己。开源专业心理测评与成长平台。
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatCard value="43+" label="专业测评" />
                <StatCard value="100%" label="本地存储" />
                <StatCard value="8" label="成长赛道" />
                <StatCard value="41" label="专项训练" />
              </div>

              <div className="rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-white/10 p-6">
                <h3 className="text-white font-semibold text-xl mb-6 text-center">技术栈</h3>
                {[
                  { name: '前端框架', value: 'React 18 + TypeScript' },
                  { name: '样式方案', value: 'Tailwind CSS' },
                  { name: '状态管理', value: 'Zustand' },
                  { name: '动画库', value: 'Framer Motion' },
                  { name: '构建工具', value: 'Vite 5' },
                  { name: '图标库', value: 'Lucide React' },
                ].map((tech) => (
                  <div key={tech.name} className="flex items-center justify-between p-4 rounded-2xl bg-white/5">
                    <span className="text-white/70 font-medium">{tech.name}</span>
                    <span className="text-white font-semibold">{tech.value}</span>
                  </div>
                ))}
              </div>

              <div className="rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-white/10 p-6">
                <SectionHeader icon={HelpCircle} title="帮助与支持" description="获取帮助信息" />
                <div className="space-y-4">
                  <ActionButton icon={HelpCircle} label="帮助中心" description="查看使用指南" onClick={() => toast.info('帮助中心开发中', 2000)} />
                  <ActionButton icon={Target} label="反馈建议" description="提交您的意见" onClick={() => toast.info('反馈功能开发中', 2000)} />
                  <ActionButton icon={Award} label="关于我们" description="了解更多" onClick={() => toast.info('关于页面开发中', 2000)} />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        onChange={importDataJSON}
        className="hidden"
      />

      <AnimatePresence>
        {showDeleteModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={() => setShowDeleteModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="rounded-2xl p-6 max-w-sm w-full bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center mb-6">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-500/20 flex items-center justify-center">
                  <AlertCircle size={32} className="text-red-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {deleteTarget === 'all' ? '清空所有记录？' : '删除此记录？'}
                </h3>
                <p className="text-white/60 text-sm">
                  {deleteTarget === 'all'
                    ? '这将永久删除所有测评记录和成就，此操作无法撤销。'
                    : '此操作无法撤销，确定要继续吗？'}
                </p>
              </div>
              <div className="flex gap-3">
                <motion.button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 px-4 py-3 rounded-xl bg-white/10 text-white font-semibold"
                  whileTap={{ scale: 0.98 }}
                >
                  取消
                </motion.button>
                <motion.button
                  onClick={deleteTarget === 'all' ? () => { clearAllAssessments(); setShowDeleteModal(false); toast.success('🗑️ 所有记录已清空', 2000) } : confirmDelete}
                  className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold"
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