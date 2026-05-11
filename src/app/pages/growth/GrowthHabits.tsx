import { motion } from 'framer-motion'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Calendar, Target, Sparkles, Check, Flame, Trophy, ChevronRight, Plus, TrendingUp, Star } from 'lucide-react'

const habitItems = [
  {
    id: 'checkin',
    title: '每日打卡',
    description: '养成好习惯',
    icon: Calendar,
    badge: '热门',
    color: 'emerald',
    colorGradient: 'from-emerald-500/30 to-teal-500/30',
    colorBorder: 'border-emerald-500/20',
    colorText: 'text-emerald-400'
  },
  {
    id: 'tracking',
    title: '目标追踪',
    description: '追踪你的目标进度',
    icon: TrendingUp,
    color: 'blue',
    colorGradient: 'from-blue-500/30 to-cyan-500/30',
    colorBorder: 'border-blue-500/20',
    colorText: 'text-blue-400'
  },
  {
    id: 'achievements',
    title: '成就系统',
    description: '解锁成就徽章',
    icon: Trophy,
    color: 'amber',
    colorGradient: 'from-amber-500/30 to-orange-500/30',
    colorBorder: 'border-amber-500/20',
    colorText: 'text-amber-400'
  }
]

const dailyCheckins = [
  { id: 1, name: '早起', icon: '🌅', streak: 15, completed: true, target: '每天7点前起床' },
  { id: 2, name: '冥想', icon: '🧘', streak: 8, completed: false, target: '每天冥想10分钟' },
  { id: 3, name: '运动', icon: '🏃', streak: 12, completed: false, target: '每天运动30分钟' },
  { id: 4, name: '阅读', icon: '📚', streak: 20, completed: true, target: '每天阅读30分钟' },
  { id: 5, name: '喝水', icon: '💧', streak: 7, completed: true, target: '每天喝8杯水' },
  { id: 6, name: '早睡', icon: '🌙', streak: 5, completed: false, target: '每天11点前睡觉' }
]

const goals = [
  {
    id: 1,
    title: '完成心理学课程',
    progress: 65,
    daysLeft: 15,
    category: '学习',
    color: 'violet'
  },
  {
    id: 2,
    title: '坚持30天冥想',
    progress: 80,
    daysLeft: 6,
    category: '健康',
    color: 'emerald'
  },
  {
    id: 3,
    title: '读完5本心理学书籍',
    progress: 40,
    daysLeft: 30,
    category: '学习',
    color: 'blue'
  }
]

const achievements = [
  { id: 1, name: '初学者', icon: '🌱', description: '完成第一次测评', unlocked: true },
  { id: 2, name: '探索者', icon: '🔍', description: '完成10个测评', unlocked: true },
  { id: 3, name: '坚持者', icon: '🔥', description: '连续打卡7天', unlocked: true },
  { id: 4, name: '求知者', icon: '📚', description: '读完一本心理学书籍', unlocked: false },
  { id: 5, name: '冥想大师', icon: '🧘', description: '累计冥想1000分钟', unlocked: false },
  { id: 6, name: '洞察者', icon: '💎', description: '完成所有人格测评', unlocked: false },
  { id: 7, name: '心灵导师', icon: '🌟', description: '分享10次测评结果', unlocked: false },
  { id: 8, name: '完美主义者', icon: '👑', description: '连续打卡30天', unlocked: false }
]

function DailyCheckinPage() {
  const [checkins, setCheckins] = useState(dailyCheckins)
  const [showAddModal, setShowAddModal] = useState(false)

  const toggleCheckin = (id: number) => {
    setCheckins(prev => prev.map(c => 
      c.id === id ? { ...c, completed: !c.completed } : c
    ))
  }

  const todayCompleted = checkins.filter(c => c.completed).length
  const totalStreak = Math.max(...checkins.map(c => c.streak))

  return (
    <div className="space-y-4">
      <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-500/20 to-teal-500/10 border border-emerald-500/30">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-sm font-medium text-white">今日进度</h3>
            <p className="text-xs text-white/60">保持好习惯，每天进步一点点</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-emerald-400">{todayCompleted}/{checkins.length}</div>
            <div className="text-[10px] text-white/50">今日完成</div>
          </div>
        </div>
        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-emerald-500 to-teal-400"
            initial={{ width: 0 }}
            animate={{ width: `${(todayCompleted / checkins.length) * 100}%` }}
          />
        </div>
        <div className="flex items-center gap-4 mt-3 text-xs text-white/50">
          <span className="flex items-center gap-1">
            <Flame size={12} className="text-orange-400" />
            最长连续 {totalStreak} 天
          </span>
          <span className="flex items-center gap-1">
            <Target size={12} className="text-emerald-400" />
            本周完成 4/7 天
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-white/70">我的习惯</span>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 text-xs font-medium transition-colors"
        >
          <Plus size={14} />
          添加
        </button>
      </div>

      <div className="space-y-2">
        {checkins.map((checkin, index) => (
          <motion.div
            key={checkin.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => toggleCheckin(checkin.id)}
            className={`p-3 rounded-xl border flex items-center gap-3 transition-all cursor-pointer ${
              checkin.completed
                ? 'bg-emerald-500/10 border-emerald-500/30'
                : 'bg-white/5 border-white/10 hover:border-white/20'
            }`}
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${
              checkin.completed
                ? 'bg-emerald-500/30'
                : 'bg-white/10'
            }`}>
              {checkin.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-white">{checkin.name}</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-orange-500/20 text-orange-400">
                  🔥 {checkin.streak}天
                </span>
              </div>
              <div className="text-[10px] text-white/50 truncate">{checkin.target}</div>
            </div>
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
              checkin.completed
                ? 'bg-emerald-500/30 text-emerald-400'
                : 'bg-white/10 text-white/30'
            }`}>
              {checkin.completed ? <Check size={18} /> : <Calendar size={18} />}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function GoalTrackingPage() {
  const [goalsData, setGoalsData] = useState(goals)

  const updateGoal = (id: number, change: number) => {
    setGoalsData(prev => prev.map(g => 
      g.id === id ? { ...g, progress: Math.min(100, Math.max(0, g.progress + change)) } : g
    ))
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-white/70">进行中的目标</span>
        <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 text-xs font-medium transition-colors">
          <Plus size={14} />
          添加目标
        </button>
      </div>

      <div className="space-y-3">
        {goalsData.map((goal, index) => (
          <motion.div
            key={goal.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-4 rounded-xl bg-white/5 border border-white/10"
          >
            <div className="flex items-center justify-between mb-2">
              <div>
                <span className={`text-[10px] px-2 py-0.5 rounded-full bg-${goal.color}-500/20 text-${goal.color}-400`}>
                  {goal.category}
                </span>
                <h4 className="text-sm font-medium text-white mt-1">{goal.title}</h4>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-white">{goal.progress}%</div>
                <div className="text-[10px] text-white/40">{goal.daysLeft} 天剩余</div>
              </div>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden mb-3">
              <motion.div
                className={`h-full bg-gradient-to-r ${
                  goal.color === 'violet' ? 'from-violet-500 to-purple-500' :
                  goal.color === 'emerald' ? 'from-emerald-500 to-teal-400' :
                  'from-blue-500 to-cyan-400'
                }`}
                initial={{ width: 0 }}
                animate={{ width: `${goal.progress}%` }}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex gap-1">
                <button
                  onClick={() => updateGoal(goal.id, -10)}
                  className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-white/60 text-sm transition-colors"
                >
                  -
                </button>
                <button
                  onClick={() => updateGoal(goal.id, 10)}
                  className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-white/60 text-sm transition-colors"
                >
                  +
                </button>
              </div>
              <span className="text-[10px] text-white/40">
                {goal.progress >= 100 ? '🎉 已达成！' : '继续加油！'}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function AchievementsPage() {
  const unlockedCount = achievements.filter(a => a.unlocked).length

  return (
    <div className="space-y-4">
      <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/20 to-orange-500/10 border border-amber-500/30">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium text-white">成就进度</h3>
            <p className="text-xs text-white/60">解锁更多成就，彰显你的成长</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-amber-400">{unlockedCount}/{achievements.length}</div>
            <div className="text-[10px] text-white/50">已解锁</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {achievements.map((achievement, index) => (
          <motion.div
            key={achievement.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            className={`p-4 rounded-xl border flex flex-col items-center text-center ${
              achievement.unlocked
                ? 'bg-amber-500/10 border-amber-500/30'
                : 'bg-white/5 border-white/10 opacity-60'
            }`}
          >
            <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl mb-2 ${
              achievement.unlocked
                ? 'bg-amber-500/30'
                : 'bg-white/10 grayscale'
            }`}>
              {achievement.icon}
            </div>
            <div className={`text-sm font-medium mb-1 ${
              achievement.unlocked ? 'text-white' : 'text-white/50'
            }`}>
              {achievement.name}
            </div>
            <div className="text-[10px] text-white/50">{achievement.description}</div>
            {achievement.unlocked && (
              <div className="mt-2">
                <Star size={14} className="text-amber-400" fill="currentColor" />
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default function GrowthHabits() {
  const navigate = useNavigate()
  const [activePage, setActivePage] = useState<string | null>(null)

  const currentPage = habitItems.find(item => item.id === activePage)

  return (
    <div className="px-3 sm:px-4 pb-4">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-4 sm:mb-6"
      >
        <button 
          onClick={() => activePage ? setActivePage(null) : navigate('/app/discover')}
          className="flex items-center gap-1 text-sm text-white/60 hover:text-white mb-2 transition-colors"
        >
          <ArrowLeft size={16} />
          {activePage ? '返回' : '返回探索'}
        </button>
        <h1 className="text-xl sm:text-2xl font-bold mb-1">📅 习惯养成</h1>
        <p className="text-xs sm:text-sm text-white/60">坚持打卡，见证成长</p>
      </motion.div>

      {activePage ? (
        <motion.div
          key={activePage}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          {activePage === 'checkin' && <DailyCheckinPage />}
          {activePage === 'tracking' && <GoalTrackingPage />}
          {activePage === 'achievements' && <AchievementsPage />}
        </motion.div>
      ) : (
        <div className="space-y-3">
          {habitItems.map((item, index) => {
            const Icon = item.icon
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setActivePage(item.id)}
                className={`p-4 rounded-2xl bg-gradient-to-br ${item.colorGradient} border ${item.colorBorder} cursor-pointer hover:scale-[1.02] transition-transform`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center ${item.colorText}`}>
                    <Icon size={24} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-sm font-semibold text-white">{item.title}</h3>
                      {item.badge && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] bg-white/20 text-white/80">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-white/50">{item.description}</p>
                  </div>
                  <ChevronRight size={20} className="text-white/30" />
                </div>
              </motion.div>
            )
          })}
        </div>
      )}
    </div>
  )
}
