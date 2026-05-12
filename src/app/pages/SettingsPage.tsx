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
} from 'lucide-react'
import { useAppStore } from '@store'
import { useSettingsStore } from '@store/settingsStore'
import { getAssessmentById } from '@data/assessments'
import { cn } from '@utils/cn'
import { useI18n } from '../../i18n'

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

  const sections = [
    { id: 'personal', label: '个人', icon: User, color: 'from-blue-500 to-cyan-500' },
    { id: 'appearance', label: '外观', icon: Palette, color: 'from-violet-500 to-purple-500' },
    { id: 'notifications', label: '通知', icon: Bell, color: 'from-amber-500 to-orange-500' },
    { id: 'data', label: '数据', icon: Database, color: 'from-emerald-500 to-teal-500' },
    { id: 'about', label: '关于', icon: Info, color: 'from-gray-500 to-slate-500' },
  ]

  const toggleSettings = [
    { id: 'animations', label: '动画效果', description: '界面动画和过渡效果', enabled: animationsEnabled, onToggle: toggleAnimations, icon: Sparkles },
    { id: 'notifications', label: '推送通知', description: '接收测评和成就提醒', enabled: pushNotifications, onToggle: togglePushNotifications, icon: Bell },
    { id: 'daily', label: '每日提醒', description: '每日心情打卡提醒', enabled: dailyReminder, onToggle: toggleDailyReminder, icon: Clock },
    { id: 'achievements', label: '成就通知', description: '解锁成就时的提示', enabled: achievementNotifications, onToggle: toggleAchievementNotifications, icon: Zap },
    { id: 'sound', label: '音效', description: '交互音效反馈', enabled: soundEffects, onToggle: toggleSoundEffects, icon: Volume2 },
    { id: 'backup', label: '自动备份', description: '定期备份数据', enabled: autoBackup, onToggle: toggleAutoBackup, icon: Cloud },
    { id: 'privacy', label: '隐私模式', description: '隐藏敏感数据', enabled: privacyMode, onToggle: togglePrivacyMode, icon: Shield },
    { id: 'contrast', label: '高对比度', description: '提高可视性', enabled: highContrast, onToggle: toggleHighContrast, icon: Eye },
    { id: 'reduced', label: '减少动画', description: '降低动画幅度', enabled: reducedMotion, onToggle: toggleReducedMotion, icon: Sparkle },
  ]

  const themeOptions = [
    { value: 'dark', label: '深色', icon: Moon },
    { value: 'light', label: '浅色', icon: Sun },
    { value: 'system', label: '系统', icon: Monitor },
  ]

  const colorOptions = [
    { value: 'violet', label: '紫罗兰', hex: '#8b5cf6' },
    { value: 'blue', label: '蓝色', hex: '#3b82f6' },
    { value: 'green', label: '绿色', hex: '#10b981' },
    { value: 'pink', label: '粉色', hex: '#ec4899' },
    { value: 'orange', label: '橙色', hex: '#f97316' },
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
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                      <User size={24} className="text-white" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-white">个人资料</h2>
                      <p className="text-sm text-white/50">管理你的个人信息</p>
                    </div>
                  </div>
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
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-6 rounded-xl bg-white/5 text-center">
                        <p className="text-3xl font-bold text-white">{completedAssessments.length}</p>
                        <p className="text-sm text-white/50 mt-2">完成测评</p>
                      </div>
                      <div className="p-6 rounded-xl bg-white/5 text-center">
                        <p className="text-3xl font-bold text-white">{achievements.length}</p>
                        <p className="text-sm text-white/50 mt-2">获得成就</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-white/10 p-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shrink-0">
                    <Globe size={24} className="text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">语言</h2>
                    <p className="text-sm text-white/50">选择界面语言</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  {[
                    { value: 'zh', label: '中文' },
                    { value: 'en', label: 'English' },
                  ].map((lang) => (
                    <motion.button
                      key={lang.value}
                      onClick={() => setLanguage(lang.value as 'zh' | 'en')}
                      className={cn(
                        'flex-1 px-6 py-4 rounded-2xl font-semibold text-lg transition-all flex items-center justify-center',
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
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center shrink-0">
                    <Moon size={24} className="text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">主题</h2>
                    <p className="text-sm text-white/50">选择外观模式</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {themeOptions.map((option) => {
                    const Icon = option.icon
                    return (
                      <motion.button
                        key={option.value}
                        onClick={() => setTheme(option.value as 'dark' | 'light' | 'system')}
                        className={cn(
                          'relative p-6 rounded-2xl transition-all overflow-hidden flex flex-col items-center gap-3',
                          theme === option.value
                            ? 'bg-gradient-to-br from-violet-500/20 to-purple-500/20 border-2 border-violet-500'
                            : 'bg-white/5 border-2 border-transparent hover:border-white/20'
                        )}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Icon size={32} className={theme === option.value ? 'text-violet-400' : 'text-white/60'} />
                        <span className={cn('font-medium text-base', theme === option.value ? 'text-white' : 'text-white/60')}>
                          {option.label}
                        </span>
                        {theme === option.value && (
                          <motion.div
                            layoutId="themeIndicator"
                            className="absolute inset-0 bg-violet-500/10"
                          />
                        )}
                      </motion.button>
                    )
                  })}
                </div>
              </div>

              <div className="rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-white/10 p-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center shrink-0">
                    <ColorWheel size={24} className="text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">强调色</h2>
                    <p className="text-sm text-white/50">自定义主题颜色</p>
                  </div>
                </div>
                <div className="flex gap-4 flex-wrap justify-center">
                  {colorOptions.map((color) => (
                    <motion.button
                      key={color.value}
                      onClick={() => setAccentColor(color.value as typeof accentColor)}
                      className={cn(
                        'w-16 h-16 rounded-full transition-all flex items-center justify-center',
                        accentColor === color.value && 'ring-4 ring-white/30 scale-110'
                      )}
                      style={{ backgroundColor: color.hex }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {accentColor === color.value && (
                        <Check size={28} className="text-white" />
                      )}
                    </motion.button>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-white/10 p-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shrink-0">
                    <Sparkles size={24} className="text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">视觉特效</h2>
                    <p className="text-sm text-white/50">动画和界面效果</p>
                  </div>
                </div>
                <div className="space-y-4">
                  {toggleSettings.slice(0, 3).map((setting) => {
                    const Icon = setting.icon
                    return (
                      <div key={setting.id} className="flex items-center justify-between p-5 rounded-2xl bg-white/5">
                        <div className="flex items-center gap-4 flex-1">
                          <Icon size={24} className="text-white/60 shrink-0" />
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
                      </div>
                    )
                  })}
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
              className="space-y-4"
            >
              {toggleSettings.slice(1, 5).map((setting, index) => {
                const Icon = setting.icon
                const colors = [
                  'from-amber-500 to-orange-500',
                  'from-blue-500 to-cyan-500',
                  'from-violet-500 to-purple-500',
                  'from-emerald-500 to-teal-500',
                ]
                return (
                  <motion.div
                    key={setting.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-white/10 p-6"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-5 flex-1">
                        <div className={cn('w-14 h-14 rounded-2xl bg-gradient-to-br flex items-center justify-center shrink-0', colors[index])}>
                          <Icon size={28} className="text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-white font-semibold text-lg">{setting.label}</h3>
                          <p className="text-sm text-white/50 mt-1">{setting.description}</p>
                        </div>
                      </div>
                      <motion.button
                        onClick={setting.onToggle}
                        className={cn(
                          'relative w-16 h-9 rounded-full transition-colors shrink-0',
                          setting.enabled ? 'bg-gradient-to-r from-emerald-500 to-teal-500' : 'bg-white/20'
                        )}
                        whileTap={{ scale: 0.95 }}
                      >
                        <motion.span
                          className="absolute top-1 w-7 h-7 rounded-full bg-white shadow-lg"
                          animate={{ left: setting.enabled ? '32px' : '4px' }}
                          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                        />
                      </motion.button>
                    </div>
                  </motion.div>
                )
              })}
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
              <div className="grid grid-cols-2 gap-4">
                <motion.button
                  onClick={exportDataJSON}
                  className="rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 p-6 text-center transition-all hover:scale-[1.02] flex flex-col items-center"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 flex items-center justify-center mb-4">
                    <Download size={28} className="text-emerald-400" />
                  </div>
                  <h3 className="text-white font-semibold mb-1 text-lg">导出数据</h3>
                  <p className="text-sm text-white/50">备份到本地文件</p>
                </motion.button>

                <motion.button
                  onClick={() => fileInputRef.current?.click()}
                  className="rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 p-6 text-center transition-all hover:scale-[1.02] flex flex-col items-center"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="w-14 h-14 rounded-2xl bg-blue-500/20 flex items-center justify-center mb-4">
                    <Upload size={28} className="text-blue-400" />
                  </div>
                  <h3 className="text-white font-semibold mb-1 text-lg">导入数据</h3>
                  <p className="text-sm text-white/50">从文件恢复</p>
                </motion.button>

                <motion.button
                  onClick={shareResults}
                  className="rounded-2xl bg-gradient-to-br from-violet-500/20 to-purple-500/20 border border-violet-500/30 p-6 text-center transition-all hover:scale-[1.02] flex flex-col items-center"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="w-14 h-14 rounded-2xl bg-violet-500/20 flex items-center justify-center mb-4">
                    <Share size={28} className="text-violet-400" />
                  </div>
                  <h3 className="text-white font-semibold mb-1 text-lg">分享应用</h3>
                  <p className="text-sm text-white/50">推荐给朋友</p>
                </motion.button>

                <motion.button
                  onClick={() => resetSettings()}
                  className="rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/30 p-6 text-center transition-all hover:scale-[1.02] flex flex-col items-center"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="w-14 h-14 rounded-2xl bg-amber-500/20 flex items-center justify-center mb-4">
                    <RefreshCw size={28} className="text-amber-400" />
                  </div>
                  <h3 className="text-white font-semibold mb-1 text-lg">重置设置</h3>
                  <p className="text-sm text-white/50">恢复默认配置</p>
                </motion.button>
              </div>

              <div className="rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-white/10 p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-rose-500 flex items-center justify-center shrink-0">
                      <Trash size={24} className="text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-white">危险区域</h2>
                      <p className="text-sm text-white/50">不可逆的操作</p>
                    </div>
                  </div>
                </div>
                <motion.button
                  onClick={() => { setDeleteTarget('all'); setShowDeleteModal(true) }}
                  className="w-full px-6 py-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400 font-medium flex items-center justify-center gap-2 hover:bg-red-500/20 transition-colors text-lg"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <Trash2 size={20} />
                  清空所有测评记录
                </motion.button>
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

              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-white/10 p-8 text-center">
                  <p className="text-4xl font-bold text-white mb-2">43+</p>
                  <p className="text-base text-white/50">专业测评</p>
                </div>
                <div className="rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-white/10 p-8 text-center">
                  <p className="text-4xl font-bold text-white mb-2">100%</p>
                  <p className="text-base text-white/50">本地存储</p>
                </div>
              </div>

              <div className="rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-white/10 p-6 space-y-4">
                <h3 className="text-white font-semibold text-xl mb-6 text-center">技术栈</h3>
                {[
                  { name: '前端框架', value: 'React 18 + TypeScript' },
                  { name: '样式方案', value: 'Tailwind CSS' },
                  { name: '状态管理', value: 'Zustand' },
                  { name: '动画库', value: 'Framer Motion' },
                  { name: '构建工具', value: 'Vite 5' },
                ].map((tech) => (
                  <div key={tech.name} className="flex items-center justify-between p-4 rounded-2xl bg-white/5">
                    <span className="text-white/70 font-medium">{tech.name}</span>
                    <span className="text-white font-semibold">{tech.value}</span>
                  </div>
                ))}
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
