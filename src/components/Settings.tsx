import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import {
  X,
  Globe,
  Sparkles,
  History,
  Moon,
  Sun,
  Trash2,
  User,
  Bell,
  Shield,
  Download,
  Upload,
  Share2,
  Check,
  AlertCircle,
  Camera,
  Mail,
  Calendar,
} from 'lucide-react'
import { useAppStore } from '@store'
import { getAssessmentById } from '@data/assessments'
import { cn } from '@utils/cn'
import { useI18n } from '../i18n'

interface SettingsProps {
  isOpen: boolean
  onClose: () => void
}

export default function Settings({ isOpen, onClose }: SettingsProps) {
  const navigate = useNavigate()
  const { t, language, setLanguage } = useI18n()
  const {
    theme,
    toggleTheme,
    completedAssessments,
    deleteAssessment,
    clearAllAssessments,
    achievements,
    user,
    updateUserProfile,
    setUser,
  } = useAppStore()

  const [animationsEnabled, setAnimationsEnabled] = useState(
    () => localStorage.getItem('humanos-animations') !== 'false'
  )
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; date: Date } | null>(null)
  const [notificationsEnabled, setNotificationsEnabled] = useState(() =>
    localStorage.getItem('humanos-notifications') !== 'false'
  )
  const [privacyMode, setPrivacyMode] = useState<'public' | 'private'>(() =>
    (localStorage.getItem('humanos-privacy') as 'public' | 'private') || 'private'
  )

  const [editingProfile, setEditingProfile] = useState(false)
  const [profileName, setProfileName] = useState(user?.name || '')
  const [profileBio, setProfileBio] = useState(user?.bio || '')

  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleAnimationToggle = () => {
    const newValue = !animationsEnabled
    setAnimationsEnabled(newValue)
    localStorage.setItem('humanos-animations', String(newValue))
  }

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang as 'zh' | 'en')
  }

  const handleNotificationToggle = () => {
    const newValue = !notificationsEnabled
    setNotificationsEnabled(newValue)
    localStorage.setItem('humanos-notifications', String(newValue))
    if (newValue && Notification.permission === 'default') {
      Notification.requestPermission()
    }
  }

  const handlePrivacyToggle = () => {
    const newValue = privacyMode === 'public' ? 'private' : 'public'
    setPrivacyMode(newValue)
    localStorage.setItem('humanos-privacy', newValue)
  }

  const handleSaveProfile = () => {
    if (user) {
      updateUserProfile({
        name: profileName || '用户',
        bio: profileBio,
      })
    }
    setEditingProfile(false)
  }

  const handleDeleteRecord = (id: string, date: Date) => {
    setDeleteTarget({ id, date })
    setShowDeleteConfirm(true)
  }

  const confirmDelete = () => {
    if (deleteTarget) {
      deleteAssessment(deleteTarget.id, deleteTarget.date)
      setDeleteTarget(null)
      setShowDeleteConfirm(false)
    }
  }

  const handleClearAll = () => {
    setDeleteTarget(null)
    setShowDeleteConfirm(true)
  }

  const confirmClearAll = () => {
    clearAllAssessments()
    setShowDeleteConfirm(false)
  }

  const getAssessmentTitle = (id: string) => {
    const assessment = getAssessmentById(id)
    return assessment?.title || id
  }

  const toDate = (date: Date | string | number): Date => {
    if (date instanceof Date) return date
    if (typeof date === 'string') return new Date(date)
    return new Date(date)
  }

  const exportDataJSON = () => {
    const data = {
      exportDate: new Date().toISOString(),
      version: '1.0.0',
      user: user,
      assessments: completedAssessments.map(a => ({
        ...a,
        completedAt: toDate(a.completedAt).toISOString(),
      })),
      achievements,
      exportedFrom: 'HumanOS',
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `humanos-backup-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const importDataJSON = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string)
        if (data.user && Array.isArray(data.assessments)) {
          alert(`成功导入 ${data.assessments.length} 条测评记录！\n请刷新页面查看导入的数据。`)
        } else {
          alert('导入失败：文件格式不正确')
        }
      } catch {
        alert('导入失败：无法解析文件')
      }
    }
    reader.readAsText(file)
    event.target.value = ''
  }

  const shareResults = async () => {
    const shareData = {
      title: '我的HumanOS测评结果',
      text: `我在HumanOS完成了${completedAssessments.length}个测评！快来试试吧！`,
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
      alert('已复制到剪贴板！')
    }).catch(() => {
      alert(text)
    })
  }

  const settingsItems = [
    {
      icon: User,
      title: t.settings.profile.title,
      description: editingProfile ? t.settings.profile.editing : user?.name || (language === 'zh' ? '点击编辑个人信息' : 'Click to edit profile'),
      action: 'profile',
      onClick: () => setEditingProfile(!editingProfile),
    },
    {
      icon: Sparkles,
      title: t.settings.animation.title,
      description: animationsEnabled ? t.settings.animation.enabled : t.settings.animation.disabled,
      action: 'toggle',
      value: animationsEnabled,
      onChange: handleAnimationToggle,
    },
    {
      icon: Globe,
      title: t.settings.language.title,
      description: language === 'zh' ? `${t.settings.language.current}：${t.settings.language.chinese}` : `${t.settings.language.current}: ${t.settings.language.english}`,
      action: 'language',
      options: [t.settings.language.chinese, t.settings.language.english],
    },
    {
      icon: theme === 'dark' ? Moon : Sun,
      title: t.settings.theme.title,
      description: theme === 'dark' ? t.settings.theme.currentDark : t.settings.theme.currentLight,
      action: 'toggle',
      value: theme === 'dark',
      onChange: toggleTheme,
    },
    {
      icon: Bell,
      title: t.settings.notification.title,
      description: notificationsEnabled ? t.settings.notification.enabled : t.settings.notification.disabled,
      action: 'toggle',
      value: notificationsEnabled,
      onChange: handleNotificationToggle,
    },
    {
      icon: Shield,
      title: t.settings.privacy.title,
      description: privacyMode === 'private' ? t.settings.privacy.private : t.settings.privacy.public,
      action: 'toggle',
      value: privacyMode === 'private',
      onChange: handlePrivacyToggle,
    },
    {
      icon: Download,
      title: t.settings.dataManagement.exportTitle,
      description: t.settings.dataManagement.exportDescription(completedAssessments.length),
      action: 'button',
      onClick: exportDataJSON,
    },
    {
      icon: Upload,
      title: t.settings.dataManagement.importTitle,
      description: t.settings.dataManagement.importDescription,
      action: 'button',
      onClick: () => fileInputRef.current?.click(),
    },
    {
      icon: Share2,
      title: t.settings.sharing.title,
      description: t.settings.sharing.description,
      action: 'button',
      onClick: shareResults,
    },
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto glass rounded-3xl p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-xl hover:bg-white/10 transition-colors"
            >
              <X className="w-6 h-6 text-white/70" />
            </button>

            <div className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">⚙️ 系统设置</h2>
              <p className="text-white/50">管理你的账户、偏好和数据</p>
            </div>

            {editingProfile && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-6 p-6 rounded-2xl bg-gradient-to-br from-violet-500/10 to-purple-500/10 border border-violet-500/20"
              >
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <User className="w-5 h-5" />
                  编辑个人资料
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-white/70 mb-2">昵称</label>
                    <input
                      type="text"
                      value={profileName}
                      onChange={(e) => setProfileName(e.target.value)}
                      placeholder="输入你的昵称"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-white/70 mb-2">个性签名</label>
                    <textarea
                      value={profileBio}
                      onChange={(e) => setProfileBio(e.target.value)}
                      placeholder="写点什么介绍自己..."
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-all resize-none"
                    />
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={handleSaveProfile}
                      className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 text-white font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                    >
                      <Check className="w-5 h-5" />
                      保存
                    </button>
                    <button
                      onClick={() => setEditingProfile(false)}
                      className="px-6 py-3 rounded-xl bg-white/10 text-white font-semibold hover:bg-white/20 transition-colors"
                    >
                      取消
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              onChange={importDataJSON}
              className="hidden"
            />

            <div className="space-y-3">
              {settingsItems.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center justify-between p-4 rounded-2xl hover:bg-white/5 transition-all group cursor-pointer border border-transparent hover:border-white/10"
                  onClick={
                    item.action === 'toggle'
                      ? () => item.onChange?.()
                      : item.action === 'button' || item.action === 'profile'
                        ? () => item.onClick?.()
                        : undefined
                  }
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500/20 to-purple-500/20 flex items-center justify-center group-hover:from-violet-500/30 group-hover:to-purple-500/30 transition-all">
                      <item.icon className="w-6 h-6 text-violet-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">{item.title}</h3>
                      <p className="text-sm text-white/50">{item.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {item.action === 'toggle' && (
                      <button
                        role="switch"
                        aria-checked={item.value}
                        className={cn(
                          'relative w-14 h-8 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-violet-500/50',
                          item.value ? 'bg-gradient-to-r from-violet-500 to-purple-600' : 'bg-white/20'
                        )}
                        onClick={(e) => {
                          e.stopPropagation()
                          item.onChange?.()
                        }}
                      >
                        <span
                          className={cn(
                            'absolute top-1 w-6 h-6 rounded-full bg-white shadow-lg transition-transform duration-300',
                            item.value ? 'left-7' : 'left-1'
                          )}
                        />
                      </button>
                    )}

                    {item.action === 'language' && (
                      <select
                        value={language}
                        onChange={(e) => handleLanguageChange(e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                        className="px-4 py-2 rounded-xl bg-white/10 text-white text-sm border border-white/10 focus:border-violet-500 focus:outline-none cursor-pointer"
                      >
                        <option value="zh">中文</option>
                        <option value="en">English</option>
                      </select>
                    )}

                    {(item.action === 'button' || item.action === 'profile') && (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-4 py-2 rounded-xl bg-violet-500/20 text-violet-400 text-sm font-medium hover:bg-violet-500/30 transition-colors"
                      >
                        {item.action === 'profile' ? (editingProfile ? '收起' : '编辑') : '操作'}
                      </motion.button>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-8 pt-6 border-t border-white/10"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <History className="w-5 h-5 text-red-400" />
                  <h3 className="text-lg font-semibold text-white">测评记录</h3>
                  <span className="px-3 py-1 rounded-full bg-red-500/20 text-red-400 text-xs font-medium">
                    {completedAssessments.length} 条
                  </span>
                </div>
                {completedAssessments.length > 0 && (
                  <button
                    onClick={handleClearAll}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/10 text-red-400 text-sm hover:bg-red-500/20 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                    清空全部
                  </button>
                )}
              </div>

              {completedAssessments.length > 0 ? (
                <div className="space-y-2 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                  {completedAssessments.slice(0, 20).map((record) => {
                    const completedDate = toDate(record.completedAt)
                    return (
                    <motion.div
                      key={`${record.assessmentId}-${completedDate.getTime()}`}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors group"
                    >
                      <div className="flex items-center gap-3 flex-1 min-w-0 cursor-pointer" onClick={() => navigate(`/results/${record.assessmentId}`)}>
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
                          handleDeleteRecord(record.assessmentId, completedDate)
                        }}
                        className="opacity-0 group-hover:opacity-100 p-2 rounded-lg hover:bg-red-500/20 transition-all"
                      >
                        <Trash2 className="w-4 h-4 text-red-400" />
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
            </motion.div>

            <AnimatePresence>
              {showDeleteConfirm && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                  onClick={() => setShowDeleteConfirm(false)}
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="glass rounded-2xl p-6 max-w-sm w-full"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="text-center mb-6">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-500/20 flex items-center justify-center">
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
                      <button
                        onClick={() => setShowDeleteConfirm(false)}
                        className="flex-1 px-4 py-3 rounded-xl bg-white/10 text-white font-semibold hover:bg-white/20 transition-colors"
                      >
                        取消
                      </button>
                      <button
                        onClick={deleteTarget ? confirmDelete : confirmClearAll}
                        className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold hover:opacity-90 transition-opacity"
                      >
                        确认删除
                      </button>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
