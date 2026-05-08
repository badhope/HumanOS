import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, Sparkles, CheckCircle, ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import UsageGuide from '../components/UsageGuide'
import AssessmentCard from '../components/AssessmentCard'
import { DailyTaskList } from '../components/DailyTaskList'
import { useAppStore } from '../../store'
import { getDailyPsychology } from '../data/psychology-knowledge'

const MOOD_EMOJIS = ['😢', '😔', '😐', '😊', '🎉']
const MOOD_LABELS = ['很糟糕', '不太好', '一般般', '还不错', '超棒！']

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: 'easeOut'
    }
  })
}

export default function Daily() {
  const {
    hasCompletedAssessment,
    hasDismissedAssessmentCard,
    dismissAssessmentCard,
    recordMood,
    getMoodForDate,
    moodHistory,
  } = useAppStore()
  const navigate = useNavigate()
  const [selectedMood, setSelectedMood] = useState<number | null>(null)
  const [isMoodConfirmed, setIsMoodConfirmed] = useState(false)

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0]
    const todayMood = getMoodForDate(today)
    if (todayMood) {
      setSelectedMood(todayMood.mood)
      setIsMoodConfirmed(true)
    }
  }, [getMoodForDate])

  const handleMoodSelect = (mood: number) => {
    if (isMoodConfirmed) return
    setSelectedMood(mood)
  }

  const confirmMood = () => {
    if (selectedMood !== null) {
      recordMood(selectedMood, MOOD_LABELS[selectedMood])
      setIsMoodConfirmed(true)
    }
  }

  const showAssessmentCard = !hasCompletedAssessment && !hasDismissedAssessmentCard

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="p-4 md:p-6 space-y-8 pb-24"
    >
      <motion.div 
        className="py-2 md:py-0 md:mb-6 md:text-left"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <motion.h2 
          className="text-2xl md:text-3xl font-bold mb-2 bg-gradient-to-r from-violet-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          晚上好，小明 👋
        </motion.h2>
        <p className="text-white/60">今天感觉怎么样？</p>
      </motion.div>

      <motion.div
        custom={0}
        variants={cardVariants}
        initial="hidden"
        animate="visible"
      >
        <UsageGuide />
      </motion.div>

      <motion.div
        custom={1}
        variants={cardVariants}
        initial="hidden"
        animate="visible"
      >
        <DailyTaskList />
      </motion.div>

      <AnimatePresence>
        {showAssessmentCard && (
          <motion.div
            custom={2}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
          >
            <AssessmentCard onDismiss={dismissAssessmentCard} />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        custom={3}
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-violet-500/20 backdrop-blur-sm shadow-lg shadow-violet-500/5"
      >
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-violet-500/5 rounded-full blur-3xl" />
        
        <div className="relative p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                🌅
              </span>
              心情打卡
            </h3>
            <div className="text-xs text-white/40 flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              已连续打卡 {moodHistory.length} 天
            </div>
          </div>

          {isMoodConfirmed && selectedMood !== null && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center mb-5 p-5 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/20"
            >
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="text-4xl">{MOOD_EMOJIS[selectedMood]}</span>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', delay: 0.2 }}
                >
                  <CheckCircle size={24} className="text-emerald-400" />
                </motion.div>
              </div>
              <span className="text-white/80 text-sm font-medium">
                今日心情：{MOOD_LABELS[selectedMood]}
              </span>
              <p className="text-white/40 text-xs mt-2">已完成打卡，明天见！</p>
            </motion.div>
          )}

          {!isMoodConfirmed && (
            <>
              {selectedMood !== null && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center mb-4 p-3 rounded-xl bg-violet-500/10 border border-violet-500/20"
                >
                  <span className="text-white/70 text-sm">
                    已选择：{MOOD_EMOJIS[selectedMood]} {MOOD_LABELS[selectedMood]}
                  </span>
                </motion.div>
              )}

              <div className="flex justify-between gap-3 mb-5">
                {MOOD_EMOJIS.map((emoji, i) => (
                  <motion.button
                    key={i}
                    onClick={() => handleMoodSelect(i)}
                    className={`flex-1 h-20 rounded-2xl flex flex-col items-center justify-center transition-all relative overflow-hidden ${selectedMood === i
                      ? 'bg-gradient-to-br from-violet-500/30 to-purple-500/30 border-2 border-violet-500/50 shadow-lg shadow-violet-500/20'
                      : 'bg-white/5 hover:bg-white/10 border border-transparent hover:border-white/10'}
                    `}
                    whileTap={{ scale: 0.95 }}
                    whileHover={{ scale: 1.02 }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + i * 0.05 }}
                  >
                    {selectedMood === i && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-transparent"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      />
                    )}
                    <span className="relative text-2xl md:text-3xl">{emoji}</span>
                    <span className="relative text-xs text-white/60 mt-1">{MOOD_LABELS[i]}</span>
                  </motion.button>
                ))}
              </div>

              <motion.button
                onClick={confirmMood}
                disabled={selectedMood === null}
                className={`w-full py-4 rounded-xl font-semibold text-white transition-all relative overflow-hidden ${
                  selectedMood !== null
                    ? 'bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500 shadow-lg shadow-violet-500/30'
                    : 'bg-white/10 text-white/40 cursor-not-allowed'
                }`}
                whileHover={selectedMood !== null ? { scale: 1.02, boxShadow: '0 0 30px rgba(139, 92, 246, 0.4)' } : {}}
                whileTap={selectedMood !== null ? { scale: 0.98 } : {}}
              >
                {selectedMood !== null && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-violet-400 via-purple-400 to-pink-400 opacity-0 hover:opacity-20 transition-opacity"
                  />
                )}
                <span className="relative">确认打卡</span>
              </motion.button>
            </>
          )}
        </div>
      </motion.div>

      <motion.div
        custom={4}
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-violet-500/20 backdrop-blur-sm shadow-lg shadow-purple-500/5"
      >
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-500/5 rounded-full blur-3xl" />
        
        <div className="relative p-6">
          <h3 className="text-lg font-semibold text-white mb-5 flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center">
              🎯
            </span>
            今日心灵训练
          </h3>
          
          {selectedMood === null && moodHistory.length === 0 ? (
            <div className="text-center py-8 text-white/40 text-sm">
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                👆
              </motion.div>
              <p className="mt-3">先选择今日心情，为你推荐最合适的训练</p>
            </div>
          ) : (
            <div className="space-y-4">
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
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.15 }}
                    onClick={() => navigate(`/app/training/${plan.id}`)}
                    className="group p-4 rounded-xl bg-gradient-to-r from-white/5 to-white/2 border border-white/10 hover:border-violet-500/40 transition-all cursor-pointer relative overflow-hidden"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-violet-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                    
                    <div className="relative flex items-center gap-4">
                      <motion.div 
                        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${plan.gradient} flex items-center justify-center`}
                        whileHover={{ rotate: 5, scale: 1.1 }}
                        transition={{ type: 'spring', stiffness: 400 }}
                      >
                        <span className="text-xl">{plan.icon}</span>
                      </motion.div>
                      <div className="flex-1">
                        <p className="font-semibold text-white text-sm group-hover:text-violet-300 transition-colors">{plan.title}</p>
                        <p className="text-xs text-white/40 mt-0.5">{plan.duration} · {selectedMood !== null ? '心情匹配 ✨' : '推荐'}</p>
                      </div>
                      <motion.div 
                        className="w-8 h-8 rounded-full border-2 border-violet-500/30 flex items-center justify-center group-hover:bg-violet-500/30 group-hover:border-violet-500/60 transition-all"
                        whileHover={{ x: 3 }}
                      >
                        <ArrowRight size={16} className="text-violet-400" />
                      </motion.div>
                    </div>
                  </motion.div>
                ))
              })()}
            </div>
          )}
        </div>
      </motion.div>

      <motion.div
        custom={5}
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-violet-500/20 backdrop-blur-sm shadow-lg shadow-amber-500/5"
      >
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
        
        <div className="relative p-6">
          <h3 className="text-lg font-semibold text-white mb-5 flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-violet-500 flex items-center justify-center">
              <Sparkles size={18} className="text-white" />
            </span>
            每日心理学
          </h3>
          
          <div className="grid gap-4">
            {(() => {
              const cards = getDailyPsychology(3)
              return cards.map((card, i) => (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.75 + i * 0.1 }}
                  className="group p-4 rounded-xl bg-white/5 border border-white/10 hover:border-amber-500/30 transition-all"
                  whileHover={{ y: -2 }}
                >
                  <div className="flex items-start gap-3">
                    <motion.span 
                      className="text-2xl"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
                    >
                      {card.icon}
                    </motion.span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-semibold text-sm text-white group-hover:text-amber-300 transition-colors">{card.title}</h4>
                        <span className="px-2 py-0.5 rounded-full text-[10px] bg-amber-500/20 text-amber-300">
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
          
          <motion.p 
            className="text-center text-xs text-white/30 mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            ✨ 每天自动更新3条心理学知识，陪伴你成长
          </motion.p>
        </div>
      </motion.div>
    </motion.div>
  )
}
