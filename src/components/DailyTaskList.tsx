import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, Clock, TrendingUp, Dumbbell, BookOpen, Target, Sparkles, RotateCcw, BookMarked } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

interface DailyTask {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  path: string
  priority: 'high' | 'medium' | 'normal'
}

const defaultTasks: DailyTask[] = [
  {
    id: 'mood-check',
    title: '心情打卡',
    description: '记录今日心情，追踪情绪变化',
    icon: <Sparkles size={18} />,
    path: '/app/daily',
    priority: 'high'
  },
  {
    id: 'training',
    title: '完成1个训练',
    description: '今日训练计划，提升心理能力',
    icon: <Dumbbell size={18} />,
    path: '/app/training',
    priority: 'high'
  },
  {
    id: 'getting-started',
    title: '入门教程',
    description: '了解系统功能，快速上手',
    icon: <BookMarked size={18} />,
    path: '/app/getting-started',
    priority: 'medium'
  },
  {
    id: 'assessment',
    title: '探索测评',
    description: '发现更多测评，了解自己',
    icon: <BookOpen size={18} />,
    path: '/app/discover',
    priority: 'medium'
  },
  {
    id: 'progress',
    title: '查看进度',
    description: '回顾成长轨迹，见证变化',
    icon: <TrendingUp size={18} />,
    path: '/app/progress',
    priority: 'medium'
  },
  {
    id: 'goal-setting',
    title: '设定小目标',
    description: '今日小目标，明天大成就',
    icon: <Target size={18} />,
    path: '/app/growth',
    priority: 'normal'
  }
]

export function DailyTaskList() {
  const navigate = useNavigate()
  const [completedTasks, setCompletedTasks] = useState<string[]>([])

  const today = new Date().toISOString().split('T')[0]

  useEffect(() => {
    const savedData = localStorage.getItem('daily-tasks')
    if (savedData) {
      try {
        const data = JSON.parse(savedData)
        if (data.date === today) {
          setCompletedTasks(data.completed || [])
        } else {
          setCompletedTasks([])
          localStorage.setItem('daily-tasks', JSON.stringify({ date: today, completed: [] }))
        }
      } catch {
        setCompletedTasks([])
      }
    } else {
      localStorage.setItem('daily-tasks', JSON.stringify({ date: today, completed: [] }))
    }
  }, [today])

  const toggleTask = (taskId: string) => {
    const isCompleted = completedTasks.includes(taskId)
    const newCompleted = isCompleted
      ? completedTasks.filter(id => id !== taskId)
      : [...completedTasks, taskId]
    
    setCompletedTasks(newCompleted)
    localStorage.setItem('daily-tasks', JSON.stringify({ date: today, completed: newCompleted }))
  }

  const resetTasks = () => {
    setCompletedTasks([])
    localStorage.setItem('daily-tasks', JSON.stringify({ date: today, completed: [] }))
  }

  const completedCount = completedTasks.length
  const totalCount = defaultTasks.length
  const progressPercentage = Math.round((completedCount / totalCount) * 100)

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'from-red-500/20 to-orange-500/20 border-red-500/30'
      case 'medium':
        return 'from-violet-500/20 to-blue-500/20 border-violet-500/30'
      default:
        return 'from-green-500/20 to-cyan-500/20 border-green-500/30'
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <span className="px-2 py-0.5 rounded-full bg-red-500/20 text-red-300 text-[10px]">必做</span>
      case 'medium':
        return <span className="px-2 py-0.5 rounded-full bg-violet-500/20 text-violet-300 text-[10px]">推荐</span>
      default:
        return <span className="px-2 py-0.5 rounded-full bg-green-500/20 text-green-300 text-[10px]">可选</span>
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="bg-white/5 rounded-2xl p-6 border border-violet-500/10"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">📋 今日任务</h3>
        <div className="flex items-center gap-2">
          <span className="text-sm text-white/50">{completedCount}/{totalCount}</span>
          <div className="w-24 h-2 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-violet-500 to-blue-500"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.8, delay: 0.7 }}
            />
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {defaultTasks.map((task, index) => {
          const isCompleted = completedTasks.includes(task.id)
          
          return (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.65 + index * 0.08 }}
              onClick={() => {
                toggleTask(task.id)
                setTimeout(() => navigate(task.path), 150)
              }}
              className={`p-4 rounded-xl bg-gradient-to-r ${getPriorityColor(task.priority)} border ${
                isCompleted ? 'opacity-60' : 'hover:border-violet-500/50'
              } flex items-center gap-3 cursor-pointer transition-all group`}
              whileHover={{ scale: isCompleted ? 1 : 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div 
                className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                  isCompleted ? 'bg-green-500/30' : 'bg-white/10'
                }`}
                animate={isCompleted ? { scale: [1, 1.2, 1] } : {}}
                transition={{ duration: 0.3 }}
              >
                {isCompleted ? (
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 500 }}
                  >
                    <CheckCircle2 size={20} className="text-green-400" />
                  </motion.div>
                ) : (
                  <div className="text-white/70">{task.icon}</div>
                )}
              </motion.div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <motion.p 
                    className={`font-medium text-sm ${
                      isCompleted ? 'text-white/50' : 'text-white'
                    } group-hover:text-violet-300 transition-colors`}
                    animate={isCompleted ? { opacity: [1, 0.7] } : {}}
                  >
                    {isCompleted && <span className="line-through">{task.title}</span>}
                    {!isCompleted && task.title}
                  </motion.p>
                  {getPriorityBadge(task.priority)}
                </div>
                <p className="text-xs text-white/40">{task.description}</p>
              </div>
              <AnimatePresence mode="wait">
                {!isCompleted ? (
                  <motion.div
                    key="clock"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                  >
                    <Clock size={16} className="text-white/30 group-hover:text-violet-400 transition-colors" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="check"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-green-400 text-xs font-medium"
                  >
                    已完成
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1 }}
        className="mt-4 pt-4 border-t border-white/10"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-white/40">
            <span>💡 完成任务获得心灵能量</span>
            <span className="text-violet-400">+{progressPercentage * 10} 能量</span>
          </div>
          <motion.button
            onClick={resetTasks}
            className="flex items-center gap-1 text-xs text-white/40 hover:text-white/60 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <RotateCcw size={12} />
            重置
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  )
}
