import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Calendar, Flame, Target, TrendingUp, ChevronRight, Brain, Clock, Award, Activity } from 'lucide-react'
import { useAppStore } from '../../store'
import AdvancedRadarChart from '../../components/charts/AdvancedRadarChart'

export default function Progress() {
  const { moodHistory, completedAssessments } = useAppStore() as any
  const navigate = useNavigate()
  const trainingRecords = JSON.parse(localStorage.getItem('training-records') || '[]')

  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() - (6 - i))
    return date.toISOString().split('T')[0]
  })

  const moodByDay = last7Days.map(date => {
    const record = moodHistory.find((m: any) => m.date === date)
    return {
      date,
      shortDate: date.slice(5),
      mood: record ? record.mood : null,
      emoji: record ? ['😢', '😔', '😐', '😊', '🎉'][record.mood] : '❔'
    }
  })

  const hasMoodData = moodHistory.length > 0
  const hasTrainingData = trainingRecords.length > 0
  const hasAssessmentData = completedAssessments.length > 0

  const streakDays = (() => {
    let streak = 0
    const today = new Date().toISOString().split('T')[0]
    for (let i = 0; i < 365; i++) {
      const date = new Date(today)
      date.setDate(date.getDate() - i)
      const dateStr = date.toISOString().split('T')[0]
      const hasActivity = moodHistory.some((m: any) => m.date === dateStr) || 
        trainingRecords.some((r: any) => new Date(r.completedAt).toISOString().split('T')[0] === dateStr)
      if (hasActivity) streak++
      else if (i > 0) break
    }
    return streak
  })()

  const moodTrend30 = Array.from({ length: 30 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() - (29 - i))
    const dateStr = date.toISOString().split('T')[0]
    const record = moodHistory.find((m: any) => m.date === dateStr)
    return {
      date: dateStr,
      day: date.getDate(),
      mood: record?.mood ?? null,
    }
  })

  const trainingByCategory: Record<string, number> = {}
  trainingRecords.forEach((r: any) => {
    trainingByCategory[r.category] = (trainingByCategory[r.category] || 0) + 1
  })

  const radarData = [
    { name: '情绪', score: hasMoodData ? Math.min(100, 30 + moodHistory.length * 8) : 0, maxScore: 100 },
    { name: '认知', score: hasAssessmentData ? Math.min(100, 20 + completedAssessments.length * 10) : 0, maxScore: 100 },
    { name: '社交', score: Math.min(100, (trainingByCategory['social'] || 0) * 15), maxScore: 100 },
    { name: '行动', score: Math.min(100, (trainingByCategory['behavior'] || 0) * 15), maxScore: 100 },
    { name: '趣味', score: Math.min(100, (trainingByCategory['fun'] || 0) * 20), maxScore: 100 },
  ]

  const totalMinutes = Math.floor(trainingRecords.reduce((s: number, r: any) => s + r.duration, 0) / 60)

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="p-4 md:p-6 space-y-6"
    >
      <div className="py-4 md:hidden">
        <motion.h2 
          className="text-2xl md:text-3xl font-bold mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          📈 我的进度
        </motion.h2>
        <p className="text-white/50">数据概览</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="grid grid-cols-4 gap-3"
      >
        {[
          { label: '连续打卡', value: streakDays, unit: '天', icon: Flame, color: 'orange' },
          { label: '心情记录', value: moodHistory.length, unit: '次', icon: Activity, color: 'pink' },
          { label: '完成测评', value: completedAssessments.length, unit: '个', icon: Target, color: 'violet' },
          { label: '训练时长', value: totalMinutes, unit: '分', icon: Clock, color: 'emerald' },
        ].map((stat, i) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.05 }}
              className={`bg-${stat.color}-500/10 rounded-2xl p-3 border border-${stat.color}-500/20 text-center`}
            >
              <Icon size={16} className={`mx-auto mb-1 text-${stat.color}-400`} />
              <div className="text-xl font-bold">{stat.value}<span className="text-xs font-normal text-white/40">{stat.unit}</span></div>
              <div className="text-[10px] text-white/40">{stat.label}</div>
            </motion.div>
          )
        })}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="bg-white/5 rounded-2xl p-5 border border-white/10"
      >
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <span className="w-6 h-6 rounded-lg bg-gradient-to-br from-amber-400 to-rose-500 flex items-center justify-center">
            😊
          </span>
          本周心情变化
        </h3>
        
        {!hasMoodData ? (
          <div className="text-center py-8 text-white/40">
            还没有心情记录，去今日页面打卡吧！
          </div>
        ) : (
          <>
            <div className="flex justify-between items-end h-20 mb-4">
              {moodByDay.map((day, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.05 }}
                  className="flex-1 flex flex-col items-center"
                >
                  <div className="text-lg mb-1">{day.emoji}</div>
                  <div 
                    className="w-8 rounded-t-lg transition-all"
                    style={{ 
                      height: day.mood !== null ? `${(day.mood + 1) * 12}px` : '4px',
                      background: day.mood !== null 
                        ? 'linear-gradient(to top, #8b5cf6, #ec4899)' 
                        : 'rgba(255,255,255,0.1)'
                    }}
                  />
                </motion.div>
              ))}
            </div>
            <div className="flex justify-between">
              {moodByDay.map((day, i) => (
                <div key={i} className="flex-1 text-center text-[10px] text-white/30">
                  {day.shortDate}
                </div>
              ))}
            </div>
          </>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="bg-white/5 rounded-2xl p-5 border border-white/10"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center">
              <Brain size={14} />
            </span>
            能力均衡度
          </h3>
          <button
            onClick={() => navigate('/app/growth')}
            className="text-xs text-violet-400 flex items-center gap-0.5 hover:text-violet-300"
          >
            详细分析 <ChevronRight size={12} />
          </button>
        </div>

        {!hasTrainingData && !hasAssessmentData && !hasMoodData ? (
          <div className="text-center py-8 text-white/40">
            开始测评和训练后，这里会显示你的能力雷达图
          </div>
        ) : (
          <AdvancedRadarChart
            dimensions={radarData}
            colorScheme="violet"
            height={220}
            showDataLabels={false}
            animated
          />
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white/5 rounded-2xl p-5 border border-white/10"
      >
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Calendar size={18} className="text-violet-400" />
          30天训练热力图
        </h3>

        {!hasTrainingData ? (
          <div className="text-center py-6 text-white/40 text-sm">
            完成训练后这里会点亮你的训练日历
          </div>
        ) : (
          <div className="grid grid-cols-7 gap-1.5">
            {moodTrend30.map((day, i) => {
              const trainingsThisDay = trainingRecords.filter((r: any) => 
                new Date(r.completedAt).toISOString().split('T')[0] === day.date
              ).length
              
              const intensity = trainingsThisDay === 0 ? 0 : Math.min(trainingsThisDay, 3)
              const colors = [
                'bg-white/5',
                'bg-violet-500/30',
                'bg-violet-500/50',
                'bg-violet-500',
              ]
              
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.45 + i * 0.01 }}
                  className={`aspect-square rounded ${colors[intensity]} ${intensity > 0 ? 'ring-1 ring-violet-500/30' : ''}`}
                  title={`${day.date}: ${trainingsThisDay} 个训练`}
                />
              )
            })}
          </div>
        )}
        <div className="flex items-center justify-end gap-2 mt-3 text-[10px] text-white/40">
          <span>无</span>
          <div className="w-3 h-3 rounded bg-white/5" />
          <div className="w-3 h-3 rounded bg-violet-500/30" />
          <div className="w-3 h-3 rounded bg-violet-500/50" />
          <div className="w-3 h-3 rounded bg-violet-500" />
          <span>多</span>
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
              📊 查看完整成长分析报告
            </h3>
            <p className="text-sm text-white/50 mt-1">
              6大核心能力维度 · AI 智能洞察
            </p>
          </div>
          <ChevronRight size={20} className="text-violet-400" />
        </div>
      </motion.div>
    </motion.div>
  )
}
