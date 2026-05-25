import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  Sparkles,
  Compass,
  Brain,
  Trophy,
  Calendar,
  Settings,
  ChevronRight,
  TrendingUp,
} from 'lucide-react'

interface GuideModule {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  color: string
  bgGradient: string
  steps: GuideStep[]
  cta: {
    text: string
    path: string
  }
}

interface GuideStep {
  title: string
  content: string
  icon: string
}

const guideModules: GuideModule[] = [
  {
    id: 'overview',
    title: '系统概览',
    description: '了解 MindMirror 心镜 的核心功能',
    icon: <Sparkles className="w-6 h-6" />,
    color: 'text-violet-400',
    bgGradient: 'from-violet-500/20 to-purple-500/20',
    steps: [
      {
        title: '什么是心镜？',
        content: '心镜是一个专业的心理健康评估与训练平台，提供丰富的心理测评、个性化训练和成长追踪功能。',
        icon: '✨'
      },
      {
        title: '主要功能模块',
        content: '平台包含五大核心模块：探索（测评）、今日（打卡）、训练、进度和设置，覆盖心理健康管理的完整流程。',
        icon: '🎯'
      },
      {
        title: '数据安全',
        content: '所有数据存储在本地设备，不会上传到服务器。你的隐私得到充分保护。',
        icon: '🔒'
      }
    ],
    cta: {
      text: '开始探索',
      path: '/discover'
    }
  },
  {
    id: 'assessment',
    title: '测评中心',
    description: '发现并完成心理测评',
    icon: <Compass className="w-6 h-6" />,
    color: 'text-blue-400',
    bgGradient: 'from-blue-500/20 to-cyan-500/20',
    steps: [
      {
        title: '探索测评',
        content: '在「探索」页面浏览各类心理测评，包括人格、情绪、智力、价值观等多个维度。',
        icon: '🔍'
      },
      {
        title: '开始测评',
        content: '选择感兴趣的测评，点击「开始测评」按钮，认真回答每个问题以获得准确结果。',
        icon: '📝'
      },
      {
        title: '查看报告',
        content: '完成测评后，系统会生成详细的分析报告，包含分数解读、图表可视化和个性化建议。',
        icon: '📊'
      }
    ],
    cta: {
      text: '前往测评',
      path: '/discover'
    }
  },
  {
    id: 'daily',
    title: '今日打卡',
    description: '记录心情，追踪情绪变化',
    icon: <Calendar className="w-6 h-6" />,
    color: 'text-amber-400',
    bgGradient: 'from-amber-500/20 to-orange-500/20',
    steps: [
      {
        title: '心情打卡',
        content: '每天在「今日」页面选择你的心情状态，系统会记录并追踪你的情绪变化趋势。',
        icon: '📅'
      },
      {
        title: '查看历史',
        content: '通过日历视图，你可以回顾过去的心情记录，发现情绪变化的规律。',
        icon: '📆'
      },
      {
        title: '任务系统',
        content: '每日任务帮助你养成好习惯，包括心情打卡、完成训练等，完成任务可解锁成就。',
        icon: '✅'
      }
    ],
    cta: {
      text: '前往打卡',
      path: '/daily'
    }
  },
  {
    id: 'training',
    title: '心理训练',
    description: '个性化训练提升心理能力',
    icon: <Brain className="w-6 h-6" />,
    color: 'text-emerald-400',
    bgGradient: 'from-emerald-500/20 to-green-500/20',
    steps: [
      {
        title: '训练类型',
        content: '平台提供多种训练类型：情绪调节、认知重塑、冥想放松、习惯养成等，根据你的状态智能推荐。',
        icon: '🧘'
      },
      {
        title: '个性化推荐',
        content: '根据你今日的心情打卡结果，系统会推荐最适合你的训练项目。',
        icon: '🎯'
      },
      {
        title: '训练效果',
        content: '坚持训练可以提升情绪管理能力、专注力和心理韧性。',
        icon: '📈'
      }
    ],
    cta: {
      text: '开始训练',
      path: '/training'
    }
  },
  {
    id: 'progress',
    title: '成长进度',
    description: '追踪你的心理成长轨迹',
    icon: <TrendingUp className="w-6 h-6" />,
    color: 'text-cyan-400',
    bgGradient: 'from-cyan-500/20 to-teal-500/20',
    steps: [
      {
        title: '测评记录',
        content: '查看你完成的所有测评及历史报告，了解自己心理特征的演变过程。',
        icon: '📊'
      },
      {
        title: '成就徽章',
        content: '完成各种任务和挑战可解锁成就徽章，见证你的成长历程。',
        icon: '🏆'
      },
      {
        title: '数据导出',
        content: '支持将你的所有数据导出为JSON文件进行备份，确保数据安全。',
        icon: '💾'
      }
    ],
    cta: {
      text: '查看进度',
      path: '/progress'
    }
  },
  {
    id: 'settings',
    title: '系统设置',
    description: '个性化定制你的体验',
    icon: <Settings className="w-6 h-6" />,
    color: 'text-gray-400',
    bgGradient: 'from-gray-500/20 to-slate-500/20',
    steps: [
      {
        title: '外观设置',
        content: '自定义主题模式（深色/浅色）、强调色、字体大小等，打造专属界面。',
        icon: '🎨'
      },
      {
        title: '通知设置',
        content: '配置推送通知、每日提醒和成就通知，不错过重要信息。',
        icon: '🔔'
      },
      {
        title: '数据管理',
        content: '导出/导入数据、清除记录、重置设置等操作，方便管理你的数据。',
        icon: '⚙️'
      }
    ],
    cta: {
      text: '前往设置',
      path: '/settings'
    }
  }
]

export default function GettingStarted() {
  const navigate = useNavigate()
  const [activeModule, setActiveModule] = useState<string>('overview')

  const currentModule = guideModules.find(m => m.id === activeModule) || guideModules[0]

  return (
    <div className="min-h-screen pb-20">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 p-4 md:p-6"
      >
        <motion.button
          onClick={() => navigate('/daily')}
          className="flex items-center gap-2 text-white/60 hover:text-white mb-4 transition-colors md:hidden"
          whileHover={{ x: -4 }}
        >
          <ArrowLeft size={20} />
          <span className="text-sm">返回</span>
        </motion.button>
        <h1 className="text-2xl font-bold mb-2">📚 入门教程</h1>
        <p className="text-white/60">系统化学习，快速上手心镜</p>
      </motion.div>

      <div className="px-4 md:px-6">
        <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide">
          {guideModules.map((module) => (
            <motion.button
              key={module.id}
              onClick={() => setActiveModule(module.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl whitespace-nowrap transition-all ${
                activeModule === module.id
                  ? `${module.bgGradient} border border-white/20 ${module.color}`
                  : 'bg-white/5 text-white/60 hover:bg-white/10 border border-transparent'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {module.icon}
              <span className="text-sm font-medium">{module.title}</span>
            </motion.button>
          ))}
        </div>

        <motion.div
          key={activeModule}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden"
        >
          <div className={`p-6 bg-gradient-to-br ${currentModule.bgGradient} border-b border-white/10`}>
            <div className="flex items-center gap-4">
              <div className={`w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center ${currentModule.color}`}>
                {currentModule.icon}
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">{currentModule.title}</h2>
                <p className="text-white/60 text-sm">{currentModule.description}</p>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {currentModule.steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex gap-4"
              >
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-violet-500/20 border-2 border-violet-500/30 flex items-center justify-center text-lg">
                    {step.icon}
                  </div>
                  {index < currentModule.steps.length - 1 && (
                    <div className="w-0.5 flex-1 bg-violet-500/20 mt-2" />
                  )}
                </div>
                <div className="flex-1 pb-6">
                  <h3 className="font-semibold text-white mb-1">{step.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{step.content}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="p-6 pt-0">
            <motion.button
              onClick={() => navigate(currentModule.cta.path)}
              className={`w-full py-4 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 text-white font-semibold flex items-center justify-center gap-2`}
              whileHover={{ scale: 1.02, opacity: 0.95 }}
              whileTap={{ scale: 0.98 }}
            >
              {currentModule.cta.text}
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </div>
        </motion.div>

        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3">
          {guideModules.filter(m => m.id !== activeModule).map((module) => (
            <motion.button
              key={module.id}
              onClick={() => setActiveModule(module.id)}
              className={`p-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all text-left`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className={`w-10 h-10 rounded-lg ${module.bgGradient} flex items-center justify-center ${module.color} mb-3`}>
                {module.icon}
              </div>
              <h4 className="font-medium text-white text-sm">{module.title}</h4>
              <p className="text-white/40 text-xs mt-1 line-clamp-2">{module.description}</p>
            </motion.button>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 rounded-2xl border border-white/10 bg-gradient-to-br from-amber-500/10 to-orange-500/10 p-6"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center shrink-0">
              <Trophy className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <h3 className="font-semibold text-white mb-1">💡 提示</h3>
              <p className="text-white/60 text-sm">
                完成入门教程后，你将解锁「初学者」成就徽章。开始你的心镜之旅吧！
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}