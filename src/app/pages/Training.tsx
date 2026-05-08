import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, Lock, Play, Brain, Heart, Users, Briefcase, Gem, Sun, Sparkles, Gamepad2, Star, Zap, Compass, AlertCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAppStore, type TrainingRecord, type MoodRecord } from '../../store'
import { useResponsive } from '../../hooks/useResponsive'
import type { CompletedAssessment } from '../../types'
import {
  FOUNDATION_TRAININGS,
  COGNITION_TRAININGS_FULL,
  EMOTION_TRAININGS_FULL,
  ATTACHMENT_TRAININGS_FULL,
  SOCIAL_TRAININGS_FULL,
  FUN_TRAININGS_FULL,
  ALL_TRAININGS,
  getRecommendedTrainings
} from '../data/training-library'
import {
  ALL_TRAINING_TRACKS,
  checkLevelUnlocked,
  type UserProgress,
  LEVEL_LABELS
} from '../data/training-levels'
import TrainingGuide from '../components/training/TrainingGuide'

type TabType = 'guide' | 'recommended' | 'emotion' | 'cognition' | 'attachment' | 'social' | 'career' | 'fun'

const TRACK_CONFIG = {
  guide: { label: '智能推荐', icon: Compass, gradient: 'from-violet-500 to-purple-500' },
  recommended: { label: '精选训练', icon: Sparkles, gradient: 'from-pink-500 to-rose-500' },
  emotion: { label: '情绪管理', icon: Sun, gradient: 'from-amber-500 to-rose-500' },
  cognition: { label: '思维认知', icon: Brain, gradient: 'from-blue-500 to-cyan-500' },
  attachment: { label: '亲密关系', icon: Heart, gradient: 'from-pink-500 to-rose-500' },
  social: { label: '人际社交', icon: Users, gradient: 'from-emerald-500 to-teal-500' },
  career: { label: '职业发展', icon: Briefcase, gradient: 'from-blue-500 to-violet-500' },
  fun: { label: '趣味娱乐', icon: Gamepad2, gradient: 'from-orange-500 to-amber-500' },
}

export default function Training() {
  const { hasCompletedAssessment, completedAssessments: assessmentHistory, getMoodForDate, results, trainingRecords: storeTrainingRecords } = useAppStore()
  const { isDesktop } = useResponsive()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<TabType>('guide')
  const [selectedTrack, setSelectedTrack] = useState<string | null>(null)

  const today = useMemo(() => new Date().toISOString().split('T')[0], [])
  const todayMood = getMoodForDate(today)

  const trainingRecords = useMemo(() => {
    try {
      const localStorageRecords = JSON.parse(localStorage.getItem('training-records') || '[]') as TrainingRecord[]
      return storeTrainingRecords.length > 0 ? storeTrainingRecords : localStorageRecords
    } catch {
      return storeTrainingRecords
    }
  }, [storeTrainingRecords])

  const lastTraining = trainingRecords[trainingRecords.length - 1]

  const bigfiveResult = useMemo(() => {
    try {
      return results?.['bigfive']?.data?.dimensions
    } catch {
      return undefined
    }
  }, [results])

  const userProgress: UserProgress = useMemo(() => ({
    completedLevels: {},
    completedTrainings: trainingRecords.map(r => r.programId),
    completedAssessments: assessmentHistory.map(a => a.id)
  }), [trainingRecords, assessmentHistory])
  
  const recommendedTrainings = getRecommendedTrainings(todayMood?.mood, bigfiveResult)

  const displayTrainings = 
    activeTab === 'guide' ? [] :
    activeTab === 'recommended' ? recommendedTrainings :
    activeTab === 'emotion' ? EMOTION_TRAININGS_FULL :
    activeTab === 'cognition' ? COGNITION_TRAININGS_FULL :
    activeTab === 'attachment' ? ATTACHMENT_TRAININGS_FULL :
    activeTab === 'social' ? SOCIAL_TRAININGS_FULL :
    activeTab === 'career' ? FOUNDATION_TRAININGS.filter(t => t.category === 'career') :
    FUN_TRAININGS_FULL

  const currentTrack = ALL_TRAINING_TRACKS.find(t => t.id === activeTab)

  const isTrainingUnlocked = (trainingId: string): boolean => {
    for (const track of ALL_TRAINING_TRACKS) {
      for (const level of track.levels) {
        if (checkLevelUnlocked(track.id, level.level, userProgress)) {
          if (level.trainings.some(t => t.id === trainingId)) {
            return true
          }
        }
      }
    }
    return true
  }

  if (activeTab === 'guide') {
    return (
      <div className="p-4 md:p-6">
        <TrainingGuide />
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="p-4 md:p-6 space-y-6"
    >
      <div className="py-4 md:hidden md:text-left">
        <motion.h2 
          className="text-2xl md:text-3xl font-bold mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          💪 我的训练
        </motion.h2>
        <p className="text-white/50">心灵健身房</p>
      </div>

      {lastTraining ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-violet-500/20 via-pink-500/20 to-orange-500/20 rounded-2xl p-5 border border-violet-500/20"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center">
              🔥
            </div>
            <div>
              <h3 className="font-semibold">继续你的训练</h3>
              <p className="text-xs text-white/50">已完成 {trainingRecords.length} 个训练</p>
            </div>
          </div>
          
          <div className="w-full bg-white/10 rounded-full h-2 mb-4">
            <div 
              className="bg-gradient-to-r from-violet-500 to-pink-500 h-2 rounded-full transition-all"
              style={{ width: `${Math.min(trainingRecords.length * 10, 100)}%` }}
            />
          </div>

          <button 
            onClick={() => navigate('/app/training/emotion-anchoring')}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-violet-500 to-blue-500 text-white font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
          >
            <Play size={18} />
            开始今日训练
          </button>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-violet-500/20 via-pink-500/20 to-blue-500/20 rounded-2xl p-5 border border-violet-500/20 text-center"
        >
          <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-4 text-3xl">
            🎯
          </div>
          <h3 className="font-semibold mb-2">开始你的第一个训练</h3>
          <p className="text-sm text-white/50 mb-4">每天5分钟，看见更好的自己</p>
          <button 
            onClick={() => navigate('/app/training/emotion-anchoring')}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-violet-500 to-blue-500 text-white font-medium flex items-center justify-center gap-2"
          >
            <Play size={18} />
            开始体验
          </button>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="flex flex-wrap gap-2 p-1 bg-white/5 rounded-xl"
      >
        {(Object.keys(TRACK_CONFIG) as TabType[]).map((tabId) => {
          const config = TRACK_CONFIG[tabId]
          const Icon = config.icon
          return (
            <button
              key={tabId}
              onClick={() => setActiveTab(tabId)}
              className={`flex-1 min-w-[80px] py-2 px-3 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-1.5 ${activeTab === tabId
                ? `bg-gradient-to-r ${config.gradient} text-white shadow-lg`
                : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon size={14} />
              <span className="hidden sm:inline">{config.label}</span>
            </button>
          )
        })}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className={`grid gap-3 ${isDesktop ? 'grid-cols-2' : 'grid-cols-1'}`}>
          {displayTrainings.map((plan, i) => {
            const unlocked = isTrainingUnlocked(plan.id)
            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 + i * 0.05 }}
                onClick={() => unlocked && navigate(`/app/training/${plan.id}`)}
                className={`rounded-xl p-4 border transition-all ${
                  unlocked 
                    ? `cursor-pointer hover:scale-[1.01] group ${
                        plan.category === 'fun'
                          ? 'bg-gradient-to-br from-amber-500/10 via-orange-500/10 to-rose-500/10 border-amber-500/10 hover:border-amber-500/30'
                          : 'bg-white/5 border-white/5 hover:border-violet-500/30'
                      }`
                    : 'bg-white/5 border-white/5 opacity-60'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`text-xl ${!unlocked ? 'grayscale' : ''}`}>{plan.icon}</span>
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs ${
                        plan.category === 'fun'
                          ? 'bg-amber-500/20 text-amber-300'
                          : plan.level === 1 ? 'bg-emerald-500/20 text-emerald-300'
                          : plan.level === 2 ? 'bg-blue-500/20 text-blue-300'
                          : plan.level === 3 ? 'bg-amber-500/20 text-amber-300'
                          : plan.level === 4 ? 'bg-purple-500/20 text-purple-300'
                          : 'bg-rose-500/20 text-rose-300'
                      }`}>
                        <Zap size={10} className={unlocked ? '' : 'opacity-0'} />
                        L{plan.level} {plan.levelLabel || ''}
                      </span>
                      <span className="text-xs text-white/40">{plan.duration}</span>
                    </div>
                    <h4 className={`font-medium mb-1 ${!unlocked ? 'text-white/50' : ''}`}>{plan.title}</h4>
                    <p className="text-xs text-white/50 mb-2 line-clamp-2">
                      {unlocked ? plan.benefits[0] : '完成前置训练后解锁'}
                    </p>
                    {unlocked && (
                      <div className="flex gap-1 flex-wrap">
                        {plan.exercises.slice(0, 3).map((e, j) => (
                          <span key={j} className="inline-block px-2 py-0.5 rounded text-[10px] bg-white/5 text-white/40">
                            {e.title}
                          </span>
                        ))}
                        {plan.exercises.length > 3 && (
                          <span className="inline-block px-2 py-0.5 rounded text-[10px] bg-white/5 text-white/40">
                            +{plan.exercises.length - 3}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                  {unlocked ? (
                    <ChevronRight size={20} className="text-white/30 group-hover:text-violet-400 group-hover:translate-x-1 transition-all shrink-0 mt-1" />
                  ) : (
                    <Lock size={16} className="text-white/30 shrink-0 mt-1" />
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        onClick={() => navigate('/app/growth')}
        className="bg-gradient-to-r from-violet-500/20 to-blue-500/20 rounded-2xl p-5 border border-violet-500/20 cursor-pointer hover:scale-[1.01] transition-transform"
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold flex items-center gap-2">
              📊 查看我的完整成长报告
            </h3>
            <p className="text-sm text-white/50 mt-1">
              6大核心能力维度 · 全面数据追踪
            </p>
          </div>
          <ChevronRight size={20} className="text-violet-400" />
        </div>
      </motion.div>
    </motion.div>
  )
}
