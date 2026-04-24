import { useState, useMemo, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  User, Calendar, BarChart3, Award, Trash2, ChevronRight,
  Edit3, Save, X, Brain, Target, Clock, TrendingUp, Download, Upload, AlertTriangle
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAppStore } from '../store'
import { getAssessmentById } from '@data/assessments'
import { useToast } from '@hooks/useToast'

export default function Profile() {
  const navigate = useNavigate()
  const toast = useToast()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [isEditing, setIsEditing] = useState(false)
  const [tempName, setTempName] = useState('')
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<{recordId: string, title: string} | null>(null)

  const user = useAppStore((state) => state.user)
  const updateUserProfile = useAppStore((state) => state.updateUserProfile)
  const setUser = useAppStore((state) => state.setUser)
  const completedAssessments = useAppStore((state) => state.completedAssessments)
  const addCompletedAssessment = useAppStore((state) => state.addCompletedAssessment)
  const deleteAssessment = useAppStore((state) => state.deleteAssessment)
  const achievements = useAppStore((state) => state.achievements)
  const updateAchievementProgress = useAppStore((state) => state.updateAchievementProgress)
  const favorites = useAppStore((state) => state.favorites)

  useEffect(() => {
    if (!user) {
      setUser({
        id: crypto.randomUUID(),
        name: '探索者',
        createdAt: new Date(),
        assessments: [],
      })
      toast.success('👋 欢迎来到 HumanOS！', 2500)
    }
  }, [user, setUser, toast])

  useEffect(() => {
    updateAchievementProgress('first-assessment', Math.min(1, completedAssessments.length))
    updateAchievementProgress('explorer', completedAssessments.length)
    updateAchievementProgress('psychologist', completedAssessments.length)
  }, [completedAssessments.length, updateAchievementProgress])

  const stats = useMemo(() => {
    const uniqueTypes = new Set(completedAssessments.map((a) => a.assessmentId))
    const totalTime = completedAssessments.length * 5
    const categories = completedAssessments.map((a) => {
      const ass = getAssessmentById(a.assessmentId)
      return ass?.category || 'other'
    })
    const topCategory = categories.sort(
      (a, b) => categories.filter((c) => c === a).length - categories.filter((c) => c === b).length
    ).pop() || '认知'

    return {
      total: completedAssessments.length,
      uniqueTypes: uniqueTypes.size,
      avgTime: totalTime,
      topCategory,
      favoritesCount: favorites.length,
      unlockedAchievements: achievements.filter((a) => a.unlockedAt).length,
    }
  }, [completedAssessments, achievements, favorites])

  const handleStartEdit = () => {
    setTempName(user?.name || '探索者')
    setIsEditing(true)
  }

  const handleSaveName = () => {
    updateUserProfile({ name: tempName || '探索者' })
    setIsEditing(false)
  }

  const handleExportAllData = () => {
    const data = {
      user,
      completedAssessments,
      achievements,
      favorites,
      exportedAt: new Date().toISOString(),
      version: '1.0',
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `humanos-profile-${Date.now()}.json`
    a.click()
    URL.revokeObjectURL(url)
    toast.success('📦 所有数据已导出', 2500)
  }

  const handleImportData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target?.result as string)
        if (data.user) setUser(data.user)
        if (data.completedAssessments?.length) {
          data.completedAssessments.forEach((a: any) => {
            addCompletedAssessment(a)
          })
        }
        toast.success(`📦 成功导入 ${data.completedAssessments?.length || 0} 条历史记录`, 2500)
      } catch {
        toast.error('❌ 数据格式错误，请检查文件', 2500)
      }
    }
    reader.readAsText(file)
    e.target.value = ''
  }

  const handleConfirmDelete = () => {
    if (!showDeleteConfirm) return
    deleteAssessment(showDeleteConfirm.recordId)
    toast.success(`🗑️ 已删除「${showDeleteConfirm.title}」记录`, 2500)
    setShowDeleteConfirm(null)
  }

  const sortedHistory = [...completedAssessments].sort(
    (a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime()
  )

  return (
    <div className="min-h-screen bg-slate-950 pt-20 pb-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ===== 头部个人信息卡片 ===== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative mb-8"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 to-pink-600/20 rounded-3xl blur-3xl" />
          <div className="relative glass rounded-3xl p-8 border border-white/10">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              {/* 头像 */}
              <div className="relative">
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center text-4xl font-bold text-white shadow-lg shadow-violet-500/30">
                  {(user?.name || '探索者')[0].toUpperCase()}
                </div>
                <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg">
                  {Math.min(99, stats.total + 1)}
                </div>
              </div>

              {/* 名字与编辑 */}
              <div className="flex-1 text-center sm:text-left">
                {isEditing ? (
                  <div className="flex items-center gap-2 justify-center sm:justify-start">
                    <input
                      type="text"
                      value={tempName}
                      onChange={(e) => setTempName(e.target.value)}
                      className="px-4 py-2 bg-white/5 rounded-xl border border-white/20 text-white text-2xl font-bold focus:outline-none focus:border-violet-500"
                      autoFocus
                    />
                    <button onClick={handleSaveName} className="p-2 text-emerald-400 hover:bg-white/5 rounded-xl transition-colors">
                      <Save className="w-5 h-5" />
                    </button>
                    <button onClick={() => setIsEditing(false)} className="p-2 text-slate-400 hover:bg-white/5 rounded-xl transition-colors">
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 justify-center sm:justify-start">
                    <h1 className="text-3xl font-bold text-white">{user?.name || '匿名探索者'}</h1>
                    <button onClick={handleStartEdit} className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors">
                      <Edit3 className="w-4 h-4" />
                    </button>
                  </div>
                )}
                <p className="text-slate-400 mt-1">HumanOS 人格探索者 · Lv.{Math.floor(stats.total / 5) + 1}</p>
              </div>

              {/* 操作按钮 */}
              <div className="flex gap-2">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl glass text-sm text-white hover:bg-white/10 transition-colors"
                >
                  <Upload className="w-4 h-4" />
                  导入数据
                </button>
                <button
                  onClick={handleExportAllData}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl glass text-sm text-white hover:bg-white/10 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  导出数据
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".json"
                  onChange={handleImportData}
                  className="hidden"
                />
              </div>
            </div>

            {/* 数据统计行 */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-white/10">
              {[
                { icon: Brain, label: '完成测评', value: stats.total, color: 'from-violet-500 to-blue-500' },
                { icon: Target, label: '测评种类', value: stats.uniqueTypes, color: 'from-pink-500 to-rose-500' },
                { icon: Award, label: '解锁成就', value: stats.unlockedAchievements, color: 'from-amber-500 to-orange-500' },
                { icon: Clock, label: '投入分钟', value: stats.avgTime, color: 'from-emerald-500 to-teal-500' },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className={`w-10 h-10 mx-auto rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-2`}>
                    <stat.icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-xs text-slate-400 mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ===== 测评历史时间线 ===== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Calendar className="w-5 h-5 text-violet-400" />
              测评历史
            </h2>
            <span className="text-sm text-slate-400">{sortedHistory.length} 条记录</span>
          </div>

          {sortedHistory.length === 0 ? (
            <div className="glass rounded-2xl p-12 text-center border border-white/10">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-white/5 flex items-center justify-center">
                <BarChart3 className="w-8 h-8 text-slate-500" />
              </div>
              <p className="text-slate-400 mb-4">还没有完成任何测评</p>
              <button
                onClick={() => navigate('/assessments')}
                className="px-6 py-2 rounded-xl bg-gradient-to-r from-violet-500 to-pink-500 text-white font-medium hover:shadow-lg hover:shadow-violet-500/25 transition-all"
              >
                开始探索
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {sortedHistory.map((record, idx) => {
                const assessment = getAssessmentById(record.assessmentId)
                const date = new Date(record.completedAt)
                const accuracy = record.result && typeof record.result === 'object' && 'accuracy' in record.result
                          ? Number(record.result.accuracy) || 85
                          : 85

                return (
                  <motion.div
                    key={`${record.assessmentId}-${date.getTime()}-${idx}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.03 }}
                    className="group glass rounded-2xl p-4 border border-white/10 hover:border-violet-500/30 transition-all cursor-pointer"
                    onClick={() => navigate(`/results/${record.id}`)}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500/20 to-pink-500/20 flex items-center justify-center text-2xl">
                        {assessment?.icon || '🧪'}
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-white truncate">{assessment?.title || record.assessmentId}</h3>
                        <p className="text-sm text-slate-400">
                          {date.toLocaleDateString('zh-CN', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </p>
                      </div>

                      <div className="text-right hidden sm:block">
                        <div className="text-lg font-bold text-emerald-400">{accuracy}%</div>
                        <div className="text-xs text-slate-500">信度</div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            setShowDeleteConfirm({
                              recordId: record.id!,
                              title: assessment?.title || record.assessmentId,
                            })
                          }}
                          className="p-2 rounded-xl text-slate-500 hover:text-red-400 hover:bg-red-500/10 opacity-0 group-hover:opacity-100 transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-violet-400 transition-colors" />
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          )}
        </motion.div>

        {/* ===== 成就展示区 ===== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-400" />
              成就徽章
            </h2>
            <span className="text-sm text-slate-400">
              {stats.unlockedAchievements} / {achievements.length}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {achievements.map((achievement) => {
              const isUnlocked = !!achievement.unlockedAt
              const progress = achievement.progress || 0
              const target = achievement.target || 1

              return (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`relative glass rounded-2xl p-4 border text-center transition-all ${
                    isUnlocked
                      ? 'border-amber-500/30 bg-amber-500/5'
                      : 'border-white/10 opacity-60'
                  }`}
                >
                  <div className={`text-4xl mb-2 ${!isUnlocked && 'grayscale'}`}>
                    {achievement.icon}
                  </div>
                  <h3 className={`text-sm font-semibold mb-1 ${isUnlocked ? 'text-amber-400' : 'text-slate-400'}`}>
                    {achievement.title}
                  </h3>
                  <p className="text-xs text-slate-500 mb-2">{achievement.description}</p>

                  {!isUnlocked && target > 1 && (
                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-500"
                        style={{ width: `${Math.min(100, (progress / target) * 100)}%` }}
                      />
                    </div>
                  )}

                  {isUnlocked && (
                    <div className="absolute top-2 right-2">
                      <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                  )}
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>

      {/* ===== 删除确认模态框 ===== */}
      <AnimatePresence>
        {showDeleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowDeleteConfirm(null)}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[300] flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="glass rounded-2xl p-6 max-w-md w-full border border-white/10"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-red-500/20 flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="w-6 h-6 text-red-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">确认删除记录</h3>
                  <p className="text-slate-400 text-sm">此操作无法撤销</p>
                </div>
              </div>

              <p className="text-white/70 mb-6">
                确定要删除「<span className="text-white font-medium">{showDeleteConfirm.title}</span>」这条测评记录吗？
                <br />删除后相关成就进度会自动更新。
              </p>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteConfirm(null)}
                  className="flex-1 px-6 py-3 rounded-xl bg-white/10 text-white font-medium hover:bg-white/20 transition-colors"
                  type="button"
                >
                  取消
                </button>
                <button
                  onClick={handleConfirmDelete}
                  className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-red-500 to-rose-600 text-white font-medium hover:shadow-lg hover:shadow-red-500/25 transition-all"
                  type="button"
                >
                  确认删除
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
