import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronRight, Lock, Play, Brain, Gamepad2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAppStore } from '../../store'
import { useResponsive } from '../hooks/useResponsive'
import { GROWTH_TRAININGS, FUN_TRAININGS, ALL_TRAININGS, getRecommendedTrainings } from '../data/training-library'

type TabType = 'recommended' | 'growth' | 'fun'

export default function Training() {
  const { hasCompletedAssessment, completedAssessments: assessmentHistory, getMoodForDate } = useAppStore() as any
  const { isDesktop } = useResponsive()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<TabType>('recommended')

  const today = new Date().toISOString().split('T')[0]
  const todayMood = getMoodForDate(today)

  const trainingRecords = JSON.parse(localStorage.getItem('training-records') || '[]')
  const lastTraining = trainingRecords[trainingRecords.length - 1]

  const recommendedTrainings = getRecommendedTrainings(todayMood?.mood)

  const displayTrainings = 
    activeTab === 'recommended' ? recommendedTrainings :
    activeTab === 'growth' ? GROWTH_TRAININGS :
    FUN_TRAININGS

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
        className="flex gap-2 p-1 bg-white/5 rounded-xl"
      >
        {[
          { id: 'recommended' as TabType, label: '为你推荐', icon: '✨' },
          { id: 'growth' as TabType, label: '专业成长', icon: Brain },
          { id: 'fun' as TabType, label: '趣味娱乐', icon: Gamepad2 },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-1.5 ${activeTab === tab.id
              ? 'bg-violet-500 text-white shadow-lg shadow-violet-500/30'
              : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            {typeof tab.icon === 'string' ? tab.icon : <tab.icon size={14} />}
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className={`grid gap-3 ${isDesktop ? 'grid-cols-2' : 'grid-cols-1'}`}>
          {displayTrainings.map((plan, i) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 + i * 0.05 }}
              onClick={() => navigate(`/app/training/${plan.id}`)}
              className={`rounded-xl p-4 border cursor-pointer hover:scale-[1.01] transition-all group ${
                plan.category === 'fun'
                  ? 'bg-gradient-to-br from-amber-500/10 via-orange-500/10 to-rose-500/10 border-amber-500/10 hover:border-amber-500/30'
                  : 'bg-white/5 border-white/5 hover:border-violet-500/30'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">{plan.icon}</span>
                    <span className={`inline-block px-2 py-0.5 rounded text-xs ${
                      plan.category === 'fun'
                        ? 'bg-amber-500/20 text-amber-300'
                        : 'bg-violet-500/20 text-violet-300'
                    }`}>
                      {plan.level} · {plan.duration}
                    </span>
                  </div>
                  <h4 className="font-medium mb-1">{plan.title}</h4>
                  <p className="text-xs text-white/50 mb-2 line-clamp-2">
                    {plan.benefits[0]}
                  </p>
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
                </div>
                <ChevronRight size={20} className="text-white/30 group-hover:text-violet-400 group-hover:translate-x-1 transition-all shrink-0 mt-1" />
              </div>
            </motion.div>
          ))}
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
