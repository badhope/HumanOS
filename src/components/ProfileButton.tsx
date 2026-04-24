import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { User, X, BarChart3, TrendingUp, Target, Award, Brain, Heart, Sparkles, ChevronRight, Zap, Shield, Compass } from 'lucide-react'
import { useAppStore } from '../store'
import { useI18n } from '../i18n'
import { useNavigate } from 'react-router-dom'
import { getAssessmentById } from '../data/assessments'
import {
  analyzeAchievements,
  DIMENSION_CATEGORIES,
  type AssessmentRecord,
} from '../utils/achievementAnalysis'

interface ProfilePanelProps {
  isOpen: boolean
  onClose: () => void
}

function ProfilePanel({ isOpen, onClose }: ProfilePanelProps) {
  const { t, language } = useI18n()
  const { completedAssessments, user, achievements } = useAppStore()
  const navigate = useNavigate()

  const analysisResult = useMemo(() => {
    const records: AssessmentRecord[] = completedAssessments.map(a => {
      const completedAt = a.completedAt instanceof Date ? a.completedAt.getTime() : 
                          typeof a.completedAt === 'number' ? a.completedAt : 
                          new Date(a.completedAt).getTime()
      return {
        assessmentId: a.assessmentId,
        completedAt,
        score: a.result?.score || 0,
        dimensions: a.result?.dimensions?.map(d => ({
          name: d.name,
          score: d.score,
          maxScore: typeof d.maxScore === 'number' ? d.maxScore : 100,
        })) || [],
        category: 'personality',
      }
    })
    return analyzeAchievements(records)
  }, [completedAssessments])

  const getAssessmentTitle = (id: string) => {
    const assessment = getAssessmentById(id)
    return assessment?.title || id
  }

  const toDate = (date: Date | string | number): Date => {
    if (date instanceof Date) return date
    if (typeof date === 'string') return new Date(date)
    return new Date(date)
  }

  const unlockedCount = achievements.filter(a => a.unlockedAt).length

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
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto glass rounded-3xl p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-xl hover:bg-white/10 transition-colors"
              type="button"
            >
              <X className="w-6 h-6 text-white/70" />
            </button>

            <div className="flex items-center gap-4 mb-8">
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${analysisResult.level.gradient} flex items-center justify-center`}>
                <User className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">{user?.name || '用户'}</h2>
                <p className="text-white/50">{analysisResult.level.label}水平 · {analysisResult.level.percentile}</p>
              </div>
            </div>

            {completedAssessments.length === 0 ? (
              <div className="text-center py-12">
                <Brain className="w-16 h-16 text-white/20 mx-auto mb-4" />
                <p className="text-white/60 mb-4">还没有完成任何测评</p>
                <button
                  onClick={() => {
                    onClose()
                    navigate('/assessments')
                  }}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-violet-500 to-pink-500 text-white font-medium"
                  type="button"
                >
                  开始测评
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  <div className="glass rounded-xl p-4 text-center">
                    <Target className="w-6 h-6 text-violet-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">{completedAssessments.length}</div>
                    <div className="text-white/50 text-sm">完成测评</div>
                  </div>
                  <div className="glass rounded-xl p-4 text-center">
                    <BarChart3 className="w-6 h-6 text-pink-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">{analysisResult.weightedScore}</div>
                    <div className="text-white/50 text-sm">综合得分</div>
                  </div>
                  <div className="glass rounded-xl p-4 text-center">
                    <Shield className="w-6 h-6 text-green-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">{analysisResult.confidenceLevel}%</div>
                    <div className="text-white/50 text-sm">分析置信度</div>
                  </div>
                  <div className="glass rounded-xl p-4 text-center">
                    <Award className="w-6 h-6 text-amber-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">{unlockedCount}</div>
                    <div className="text-white/50 text-sm">成就解锁</div>
                  </div>
                </div>

                <div className="glass rounded-xl p-6 mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                      <Compass className="w-5 h-5 text-violet-400" />
                      综合能力分布
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-sm bg-gradient-to-r ${analysisResult.level.gradient} text-white`}>
                      {analysisResult.level.label}
                    </span>
                  </div>
                  <div className="space-y-3">
                    {Object.entries(analysisResult.dimensionScores).map(([dimension, score]) => {
                      const category = DIMENSION_CATEGORIES.find(c => c.id === dimension)
                      const level = analysisResult.dimensionLevels[dimension]
                      if (!category || !level) return null
                      return (
                        <div key={dimension} className="space-y-1">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-white/70">{category.name}</span>
                            <span className="text-white/50">{score}分 · {level.label}</span>
                          </div>
                          <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${score}%` }}
                              transition={{ duration: 0.8, delay: 0.1 }}
                              className={`h-full rounded-full bg-gradient-to-r ${level.gradient}`}
                            />
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="glass rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-violet-400" />
                      核心优势
                    </h3>
                    <div className="space-y-3">
                      {analysisResult.strengths.length > 0 ? (
                        analysisResult.strengths.map((strength, index) => (
                          <div key={index} className="flex items-start gap-3">
                            <div className="w-2 h-2 rounded-full bg-green-400 mt-2 flex-shrink-0" />
                            <span className="text-white/80">{strength}</span>
                          </div>
                        ))
                      ) : (
                        <p className="text-white/50">持续发展中，潜力可期</p>
                      )}
                    </div>
                  </div>

                  <div className="glass rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                      <Heart className="w-5 h-5 text-pink-400" />
                      发展空间
                    </h3>
                    <div className="space-y-3">
                      {analysisResult.weaknesses.length > 0 ? (
                        analysisResult.weaknesses.map((weakness, index) => (
                          <div key={index} className="flex items-start gap-3">
                            <div className="w-2 h-2 rounded-full bg-amber-400 mt-2 flex-shrink-0" />
                            <span className="text-white/80">{weakness}</span>
                          </div>
                        ))
                      ) : (
                        <p className="text-white/50">暂无明显短板，继续保持</p>
                      )}
                    </div>
                  </div>
                </div>

                {analysisResult.trends.length > 0 && (
                  <div className="glass rounded-xl p-6 mb-8">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-green-400" />
                      发展趋势
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {analysisResult.trends.map((trend, index) => {
                        const category = DIMENSION_CATEGORIES.find(c => c.id === trend.dimension)
                        if (!category) return null
                        const trendIcon = trend.direction === 'improving' ? '📈' : trend.direction === 'declining' ? '📉' : '➡️'
                        const trendColor = trend.direction === 'improving' ? 'text-green-400' : trend.direction === 'declining' ? 'text-red-400' : 'text-yellow-400'
                        return (
                          <div key={index} className="p-3 rounded-lg bg-white/5">
                            <div className="text-2xl mb-1">{trendIcon}</div>
                            <div className="text-white/70 text-sm">{category.name}</div>
                            <div className={`text-sm font-medium ${trendColor}`}>
                              {trend.direction === 'improving' ? '+' : trend.direction === 'declining' ? '-' : ''}{trend.rate}%
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}

                <div className="glass rounded-xl p-6 mb-8">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <Brain className="w-5 h-5 text-cyan-400" />
                    心理特征画像
                  </h3>
                  <p className="text-white/70 leading-relaxed whitespace-pre-line">{analysisResult.profileSummary}</p>
                </div>

                {analysisResult.insights.length > 0 && (
                  <div className="glass rounded-xl p-6 mb-8">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                      <Zap className="w-5 h-5 text-yellow-400" />
                      深度洞察
                    </h3>
                    <div className="space-y-3">
                      {analysisResult.insights.map((insight, index) => (
                        <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-white/5">
                          <span className="text-yellow-400">💡</span>
                          <span className="text-white/80">{insight}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="glass rounded-xl p-6 mb-8">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-green-400" />
                    最近测评记录
                  </h3>
                  <div className="space-y-3 max-h-48 overflow-y-auto">
                    {completedAssessments.slice(0, 5).map((record, index) => {
                      const completedDate = toDate(record.completedAt)
                      return (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
                          onClick={() => {
                            onClose()
                            navigate(`/results/${record.id}`)
                          }}
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-violet-500/20 to-pink-500/20 flex items-center justify-center">
                              <Brain className="w-5 h-5 text-violet-400" />
                            </div>
                            <div>
                              <div className="text-white font-medium">{getAssessmentTitle(record.assessmentId)}</div>
                              <div className="text-white/50 text-sm">
                                {completedDate.toLocaleDateString('zh-CN', {
                                  month: 'short',
                                  day: 'numeric',
                                })}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-violet-400 font-semibold">{record.result?.score || 0}分</span>
                            <ChevronRight className="w-4 h-4 text-white/40" />
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => {
                      onClose()
                      navigate('/profile')
                    }}
                    className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-violet-500 to-pink-500 text-white font-medium flex items-center justify-center gap-2"
                    type="button"
                  >
                    <User className="w-5 h-5" />
                    进入个人中心
                  </button>
                  <button
                    onClick={() => {
                      onClose()
                      navigate('/assessments')
                    }}
                    className="px-6 py-3 rounded-xl bg-white/10 text-white font-medium hover:bg-white/20 transition-colors"
                    type="button"
                  >
                    继续测评
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default function ProfileButton() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed top-4 left-4 z-40 w-12 h-12 rounded-xl glass flex items-center justify-center hover:bg-white/20 transition-colors group"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        aria-label="打开个人中心"
        type="button"
      >
        <motion.div
          animate={{ scale: isOpen ? 0.9 : 1 }}
          transition={{ duration: 0.3 }}
        >
          <User className="w-6 h-6 text-white/70 group-hover:text-white transition-colors" />
        </motion.div>
      </motion.button>

      <ProfilePanel isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  )
}
