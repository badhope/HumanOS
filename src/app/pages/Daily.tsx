import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, Sparkles } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import WelcomeModal from '../components/WelcomeModal'
import AssessmentCard from '../components/AssessmentCard'
import { useAppStore } from '../../store'
import { getDailyPsychology } from '../data/psychology-knowledge'

const MOOD_EMOJIS = ['😢', '😔', '😐', '😊', '🎉']
const MOOD_LABELS = ['很糟糕', '不太好', '一般般', '还不错', '超棒！']

export default function Daily() {
  const {
    hasCompletedAssessment,
    hasDismissedWelcome,
    hasDismissedAssessmentCard,
    dismissWelcome,
    dismissAssessmentCard,
    recordMood,
    getMoodForDate,
    moodHistory,
  } = useAppStore()
  const navigate = useNavigate()
  const [showWelcome, setShowWelcome] = useState(false)
  const [selectedMood, setSelectedMood] = useState<number | null>(null)

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0]
    const todayMood = getMoodForDate(today)
    if (todayMood) {
      setSelectedMood(todayMood.mood)
    }
  }, [getMoodForDate])

  const handleMoodSelect = (mood: number) => {
    setSelectedMood(mood)
    recordMood(mood, MOOD_LABELS[mood])
  }

  useEffect(() => {
    if (!hasDismissedWelcome && !hasCompletedAssessment) {
      const timer = setTimeout(() => setShowWelcome(true), 500)
      return () => clearTimeout(timer)
    }
  }, [hasDismissedWelcome, hasCompletedAssessment])

  const handleCloseWelcome = () => {
    setShowWelcome(false)
    dismissWelcome()
  }

  const showAssessmentCard = !hasCompletedAssessment && !hasDismissedAssessmentCard

  return (
    <>
      <AnimatePresence>
        {showWelcome && <WelcomeModal onClose={handleCloseWelcome} />}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="p-4 md:p-6 space-y-6"
      >
        <div className="py-2 md:py-0 md:mb-6 md:text-left">
        <motion.h2 
          className="text-2xl md:text-3xl font-bold mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          晚上好，小明 👋
        </motion.h2>
        <p className="text-white/50">今天感觉怎么样？</p>
      </div>

        <AnimatePresence>
          {showAssessmentCard && (
            <AssessmentCard onDismiss={dismissAssessmentCard} />
          )}
        </AnimatePresence>

        <div className="bg-white/5 rounded-2xl p-6 border border-violet-500/10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">🌅 心情打卡</h3>
            <div className="text-xs text-white/40 flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              已连续打卡 {moodHistory.length} 天
            </div>
          </div>

          {selectedMood !== null && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-4 p-3 rounded-xl bg-violet-500/10 border border-violet-500/20"
            >
              <span className="text-white/70 text-sm">
                今日心情：{MOOD_EMOJIS[selectedMood]} {MOOD_LABELS[selectedMood]}
              </span>
            </motion.div>
          )}

          <div className="flex justify-between gap-2">
            {MOOD_EMOJIS.map((emoji, i) => (
              <motion.button
                key={i}
                onClick={() => handleMoodSelect(i)}
                className={`flex-1 h-14 rounded-2xl flex flex-col items-center justify-center transition-all ${selectedMood === i
                  ? 'bg-violet-500/30 border-2 border-violet-500/50'
                  : 'bg-white/5 hover:bg-white/10 border border-transparent'}
                `}
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.02 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.05 }}
              >
                <span className="text-2xl">{emoji}</span>
                <span className="text-[10px] text-white/50 mt-1">{MOOD_LABELS[i]}</span>
              </motion.button>
            ))}
          </div>
        </div>

        <div className="bg-white/5 rounded-2xl p-6 border border-violet-500/10">
          <h3 className="text-lg font-semibold mb-4">🎯 今日心灵训练</h3>
          
          {selectedMood === null && moodHistory.length === 0 ? (
            <div className="text-center py-4 text-white/40 text-sm">
              👆 先选择今日心情，为你推荐最合适的训练
            </div>
          ) : (
            <div className="space-y-3">
              {(() => {
                const plans = [
                  { id: 'emotion-anchoring', icon: '🧘', title: '情绪锚定练习', duration: '5分钟', forMoods: [0, 1], gradient: 'from-violet-500 to-blue-500' },
                  { id: 'self-compassion', icon: '💗', title: '自我同情练习', duration: '8分钟', forMoods: [0, 1], gradient: 'from-pink-500 to-rose-500' },
                  { id: 'micro-habit', icon: '🌱', title: '微习惯启动', duration: '3分钟', forMoods: [2], gradient: 'from-orange-500 to-amber-500' },
                  { id: 'boundary-setting', icon: '🛡️', title: '边界建立练习', duration: '10分钟', forMoods: [3, 4], gradient: 'from-cyan-500 to-teal-500' },
                  { id: 'gratitude', icon: '🙏', title: '感恩三件事', duration: '3分钟', forMoods: [2, 3, 4], gradient: 'from-amber-500 to-yellow-500' },
                ]
                
                const filteredPlans = selectedMood !== null
                  ? plans.filter(p => p.forMoods.includes(selectedMood)).slice(0, 2)
                  : plans.slice(0, 2)
                
                return filteredPlans.map((plan, i) => (
                  <motion.div
                    key={plan.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    onClick={() => plan.id === 'emotion-anchoring' && navigate('/app/training/emotion-anchoring')}
                    className="p-4 rounded-xl bg-gradient-to-r bg-white/5 border border-white/10 flex items-center gap-3 hover:border-violet-500/30 transition-all cursor-pointer group"
                  >
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${plan.gradient} flex items-center justify-center`}>
                      {plan.icon}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm group-hover:text-violet-300 transition-colors">{plan.title}</p>
                      <p className="text-xs text-white/40">{plan.duration} · {selectedMood !== null ? '心情匹配 ✨' : '推荐'}</p>
                    </div>
                    <div className="w-6 h-6 rounded-full border-2 border-violet-500/30 group-hover:bg-violet-500/30 transition-all" />
                  </motion.div>
                ))
              })()}
            </div>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-gradient-to-br from-amber-400 to-violet-500 flex items-center justify-center">
              <Sparkles size={14} />
            </span>
            每日心理学
          </h3>
          
          <div className="grid gap-3">
            {(() => {
              const cards = getDailyPsychology(3)
              return cards.map((card, i) => (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.75 + i * 0.08 }}
                  className="bg-white/5 rounded-xl p-4 border border-white/10 hover:border-violet-500/20 transition-all"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{card.icon}</span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-sm">{card.title}</h4>
                        <span className="px-2 py-0.5 rounded text-[10px] bg-violet-500/20 text-violet-300">
                          {card.type === 'effect' ? '心理学效应' : card.type === 'fact' ? '冷知识' : card.type === 'tip' ? '实用技巧' : '名言'}
                        </span>
                      </div>
                      <p className="text-white/60 text-sm leading-relaxed">{card.content}</p>
                      {card.source && (
                        <p className="text-[10px] text-white/30 mt-2 text-right">—— {card.source}</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))
            })()}
          </div>
          
          <p className="text-center text-[10px] text-white/30 mt-3">
            ✨ 每天自动更新3条心理学知识，陪伴你成长
          </p>
        </motion.div>
      </motion.div>
    </>
  )
}
