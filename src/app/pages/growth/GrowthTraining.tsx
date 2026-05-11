import { motion } from 'framer-motion'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Brain, Target, Zap, Play, Pause, CheckCircle, Clock, TrendingUp, ChevronRight } from 'lucide-react'

const trainingItems = [
  {
    id: 'emotion',
    title: '情绪管理训练',
    description: '系统提升情绪调节能力',
    icon: Brain,
    badge: '推荐',
    color: 'violet',
    colorGradient: 'from-violet-500/30 to-purple-500/30',
    colorBorder: 'border-violet-500/20',
    colorText: 'text-violet-400'
  },
  {
    id: 'focus',
    title: '专注力训练',
    description: '提升你的注意力',
    icon: Target,
    color: 'blue',
    colorGradient: 'from-blue-500/30 to-cyan-500/30',
    colorBorder: 'border-blue-500/20',
    colorText: 'text-blue-400'
  },
  {
    id: 'confidence',
    title: '自信心提升',
    description: '建立强大的自信心',
    icon: Zap,
    color: 'amber',
    colorGradient: 'from-amber-500/30 to-orange-500/30',
    colorBorder: 'border-amber-500/20',
    colorText: 'text-amber-400'
  }
]

const emotionModules = [
  { id: 1, title: '认识你的情绪', progress: 100, duration: 15, lessons: 5, completed: true },
  { id: 2, title: '情绪识别练习', progress: 60, duration: 20, lessons: 6, completed: false },
  { id: 3, title: '情绪调节技巧', progress: 0, duration: 25, lessons: 8, completed: false },
  { id: 4, title: '压力应对策略', progress: 0, duration: 20, lessons: 5, completed: false },
  { id: 5, title: '正念情绪疗法', progress: 0, duration: 30, lessons: 10, completed: false }
]

const focusModules = [
  { id: 1, title: '注意力基础训练', progress: 100, duration: 15, lessons: 5, completed: true },
  { id: 2, title: '专注力游戏', progress: 40, duration: 20, lessons: 6, completed: false },
  { id: 3, title: '工作记忆训练', progress: 0, duration: 25, lessons: 8, completed: false },
  { id: 4, title: '深度工作法', progress: 0, duration: 20, lessons: 5, completed: false }
]

const confidenceModules = [
  { id: 1, title: '自我认知探索', progress: 100, duration: 15, lessons: 5, completed: true },
  { id: 2, title: '积极自我对话', progress: 80, duration: 20, lessons: 6, completed: false },
  { id: 3, title: '克服自卑心理', progress: 0, duration: 25, lessons: 8, completed: false },
  { id: 4, title: '建立自信习惯', progress: 0, duration: 20, lessons: 5, completed: false }
]

function TrainingDetail({ trainingId }: { trainingId: string }) {
  const [activeModule, setActiveModule] = useState<number | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  
  const modules = trainingId === 'emotion' ? emotionModules
    : trainingId === 'focus' ? focusModules
    : confidenceModules
  
  const currentModule = modules.find(m => m.id === activeModule)
  const training = trainingItems.find(t => t.id === trainingId)
  const Icon = training?.icon || Brain

  return (
    <div className="space-y-4">
      <div className={`p-4 rounded-2xl bg-gradient-to-br ${training?.colorGradient} border ${training?.colorBorder}`}>
        <div className="flex items-center gap-3 mb-3">
          <div className={`w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center ${training?.colorText}`}>
            <Icon size={24} />
          </div>
          <div>
            <h3 className="text-base font-semibold text-white">{training?.title}</h3>
            <p className="text-xs text-white/60">{training?.description}</p>
          </div>
        </div>
        <div className="flex items-center gap-4 text-xs text-white/50">
          <span className="flex items-center gap-1">
            <Clock size={12} />
            {modules.reduce((sum, m) => sum + m.duration, 0)} 分钟
          </span>
          <span className="flex items-center gap-1">
            <TrendingUp size={12} />
            {modules.filter(m => m.completed).length}/{modules.length} 已完成
          </span>
        </div>
      </div>

      <div className="space-y-2">
        {modules.map((module, index) => (
          <motion.div
            key={module.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => setActiveModule(activeModule === module.id ? null : module.id)}
            className={`p-4 rounded-xl border transition-all cursor-pointer ${
              activeModule === module.id
                ? `${training?.colorBorder} bg-white/10`
                : 'bg-white/5 border-white/10 hover:border-white/20'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                module.completed
                  ? 'bg-emerald-500/30 text-emerald-400'
                  : module.progress > 0
                  ? `${training?.colorGradient} ${training?.colorText}`
                  : 'bg-white/10 text-white/50'
              }`}>
                {module.completed ? (
                  <CheckCircle size={20} />
                ) : (
                  <span className="text-sm font-bold">{index + 1}</span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium text-white">{module.title}</span>
                  {module.completed && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400">
                      已完成
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3 text-[10px] text-white/50">
                  <span>{module.lessons} 节课程</span>
                  <span>·</span>
                  <span>{module.duration} 分钟</span>
                </div>
                {module.progress > 0 && !module.completed && (
                  <div className="mt-2 h-1 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-violet-500 to-purple-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${module.progress}%` }}
                    />
                  </div>
                )}
              </div>
              <ChevronRight size={18} className={`text-white/30 transition-transform ${activeModule === module.id ? 'rotate-90' : ''}`} />
            </div>

            {activeModule === module.id && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-3 pt-3 border-t border-white/10"
              >
                <div className="space-y-2">
                  {Array.from({ length: module.lessons }).map((_, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
                    >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        module.completed || i < Math.floor(module.progress / 20)
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : 'bg-white/10 text-white/50'
                      }`}>
                        {module.completed || i < Math.floor(module.progress / 20) ? (
                          <CheckCircle size={16} />
                        ) : (
                          <Play size={14} />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="text-xs font-medium text-white">
                          课时 {i + 1}
                        </div>
                        <div className="text-[10px] text-white/40">
                          {module.completed ? '已完成' : i < Math.floor(module.progress / 20) ? '已完成' : '未开始'}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default function GrowthTraining() {
  const navigate = useNavigate()
  const [activeTraining, setActiveTraining] = useState<string | null>(null)

  const currentTraining = trainingItems.find(item => item.id === activeTraining)

  return (
    <div className="px-3 sm:px-4 pb-4">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-4 sm:mb-6"
      >
        <button 
          onClick={() => activeTraining ? setActiveTraining(null) : navigate('/app/discover')}
          className="flex items-center gap-1 text-sm text-white/60 hover:text-white mb-2 transition-colors"
        >
          <ArrowLeft size={16} />
          {activeTraining ? '返回训练列表' : '返回探索'}
        </button>
        <h1 className="text-xl sm:text-2xl font-bold mb-1">🏋️ 训练计划</h1>
        <p className="text-xs sm:text-sm text-white/60">系统训练，遇见更好的自己</p>
      </motion.div>

      {activeTraining ? (
        <motion.div
          key={activeTraining}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <TrainingDetail trainingId={activeTraining} />
        </motion.div>
      ) : (
        <div className="space-y-3">
          {trainingItems.map((item, index) => {
            const Icon = item.icon
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setActiveTraining(item.id)}
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
                </div>
              </motion.div>
            )
          })}
        </div>
      )}
    </div>
  )
}
