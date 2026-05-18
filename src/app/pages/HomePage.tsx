import { useNavigate } from 'react-router-dom'
import { Sparkles, Brain, TrendingUp, Heart, Compass, Zap, Shield, Award, Clock, Target, Users, Lightbulb, ChevronRight, HelpCircle } from 'lucide-react'
import { useAppStore } from '../../store'

const FEATURED_ASSESSMENTS = [
  {
    id: 'sbti-personality',
    icon: Brain,
    title: 'SBTI人格测试',
    description: '有趣又准的人格测评',
    questions: 24,
    duration: 5,
    color: 'from-violet-500 to-purple-500',
    bgColor: 'bg-violet-500/10',
    borderColor: 'border-violet-500/30'
  },
  {
    id: 'iq-ravens',
    icon: Target,
    title: '瑞文智商测试',
    description: '测测你的智商水平',
    questions: 28,
    duration: 8,
    color: 'from-cyan-500 to-blue-500',
    bgColor: 'bg-cyan-500/10',
    borderColor: 'border-cyan-500/30'
  },
  {
    id: 'eq-goleman',
    icon: Heart,
    title: '情商测评',
    description: '了解你的情商高低',
    questions: 28,
    duration: 6,
    color: 'from-rose-500 to-pink-500',
    bgColor: 'bg-rose-500/10',
    borderColor: 'border-rose-500/30'
  },
  {
    id: 'ocean-bigfive',
    icon: Users,
    title: '大五人格',
    description: '科学的人格模型',
    questions: 28,
    duration: 6,
    color: 'from-emerald-500 to-teal-500',
    bgColor: 'bg-emerald-500/10',
    borderColor: 'border-emerald-500/30'
  },
  {
    id: 'holland-sds',
    icon: Lightbulb,
    title: '职业兴趣测评',
    description: '找到你的职业方向',
    questions: 28,
    duration: 6,
    color: 'from-amber-500 to-orange-500',
    bgColor: 'bg-amber-500/10',
    borderColor: 'border-amber-500/30'
  },
  {
    id: 'ecr-attachment',
    icon: Sparkles,
    title: '依恋类型',
    description: '探索你的依恋风格',
    questions: 28,
    duration: 6,
    color: 'from-pink-500 to-rose-500',
    bgColor: 'bg-pink-500/10',
    borderColor: 'border-pink-500/30'
  },
]

const TOPICS = [
  { 
    id: 'career', 
    label: '职场发展', 
    emoji: '💼', 
    color: 'from-blue-500/20 to-cyan-500/20',
    icon: TrendingUp,
    title: '职场发展',
    description: '职业规划、求职技巧、职场人际关系',
    gradient: 'from-blue-500 to-cyan-500'
  },
  { 
    id: 'emotion', 
    label: '情绪管理', 
    emoji: '🌊', 
    color: 'from-violet-500/20 to-purple-500/20',
    icon: Heart,
    title: '情绪管理',
    description: '焦虑缓解、情绪调节、心理韧性',
    gradient: 'from-violet-500 to-purple-500'
  },
  { 
    id: 'relation', 
    label: '人际关系', 
    emoji: '🤝', 
    color: 'from-pink-500/20 to-rose-500/20',
    icon: Users,
    title: '人际关系',
    description: '沟通技巧、亲密关系、社交能力',
    gradient: 'from-pink-500 to-rose-500'
  },
]

const GUIDANCE_QUESTIONS = [
  {
    question: '你是否经常感到焦虑不安？',
    description: '面对工作、生活压力时难以放松'
  },
  {
    question: '你是否对未来的方向感到迷茫？',
    description: '不清楚自己的职业兴趣和人生目标'
  },
  {
    question: '你想更深入地了解自己吗？',
    description: '探索人格特质、情绪模式和行为习惯'
  },
  {
    question: '你想突破自我限制吗？',
    description: '建立自信，培养成长型思维'
  },
]

export default function HomePage() {
  const navigate = useNavigate()
  const { completedAssessments } = useAppStore()

  const hasRecords = completedAssessments.length > 0

  const handleStartAssessment = () => {
    navigate('/app/discover')
  }

  const handleSelectAssessment = (id: string) => {
    navigate(`/legacy/mode-select/${id}`)
  }

  return (
    <div className="min-h-screen">
      <div className="px-3 sm:px-4 md:px-6 py-4 md:py-8 space-y-6 md:space-y-8 max-w-4xl mx-auto">
        <div className="text-center pt-2 pb-4 sm:pt-4 sm:pb-6">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 mb-3 sm:mb-4">
            <Sparkles size={10} className="text-violet-400 sm:size-3" />
            <span className="text-[10px] sm:text-xs text-violet-300">轻松探索，遇见真实的自己</span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1.5 sm:mb-2 px-2">
            <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              3分钟
            </span>
            <span className="text-white">，了解真实的自己</span>
          </h1>

          <p className="text-white/50 text-[10px] sm:text-xs md:text-sm px-4">
            {hasRecords
              ? `你已经完成了 ${completedAssessments.length} 项测评，继续探索吧！`
              : '专业的心理测评，帮你更好地了解自己'}
          </p>
        </div>

        <div className="relative mx-3 sm:mx-0">
          <div className="absolute inset-0 bg-gradient-to-r from-violet-500/20 via-purple-500/20 to-pink-500/20 blur-3xl rounded-2xl sm:rounded-3xl" />
          <div className="relative bg-gradient-to-br from-slate-800/90 to-slate-900/90 rounded-2xl p-4 sm:p-6 border border-violet-500/20 backdrop-blur-xl">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 mb-3 sm:mb-4 shadow-lg shadow-violet-500/30">
                <Zap size={22} className="sm:text-[28px] text-white" />
              </div>

              <h2 className="text-base sm:text-xl font-bold text-white mb-1 sm:mb-2">
                {hasRecords ? '继续你的探索之旅' : '开启你的第一次测评'}
              </h2>
              <p className="text-white/50 text-xs sm:text-sm mb-4 sm:mb-5">
                {hasRecords ? '发现更多关于自己的秘密' : '只需几分钟，收获对自己更深的了解'}
              </p>

              <button
                onClick={handleStartAssessment}
                className="inline-flex items-center gap-1.5 sm:gap-2 px-5 sm:px-8 py-2.5 sm:py-3 rounded-lg sm:rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 text-white font-semibold shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50 transition-all text-sm sm:text-base"
              >
                <Compass size={16} className="sm:text-[18px]" />
                立即开始测评
              </button>
            </div>
          </div>
        </div>

        <div className="px-3 sm:px-0">
          <h3 className="text-sm sm:text-lg font-semibold text-white mb-3 sm:mb-4 flex items-center gap-2">
            <HelpCircle size={14} className="sm:text-[18px] text-violet-400" />
            你是否也有这些困惑？
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {GUIDANCE_QUESTIONS.map((item, index) => (
              <button
                key={index}
                onClick={handleStartAssessment}
                className="group relative overflow-hidden rounded-xl p-4 bg-white/5 border border-white/10 hover:border-violet-500/30 transition-all text-left"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="relative">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-violet-500/20 flex items-center justify-center shrink-0">
                      <HelpCircle size={16} className="text-violet-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-white mb-1 group-hover:text-violet-300 transition-colors">
                        {item.question}
                      </h4>
                      <p className="text-xs text-white/40 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-3 flex items-center justify-end">
                    <span className="text-xs text-violet-400 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                      探索答案 <ChevronRight size={12} />
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
          
          <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-violet-500/10 via-purple-500/10 to-pink-500/10 border border-violet-500/20">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shrink-0">
                <Sparkles size={18} className="text-white" />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-white mb-1">MindMirror 能帮你什么？</h4>
                <p className="text-xs text-white/60 leading-relaxed">
                  通过专业的心理测评了解真实的自己，用科学的训练方法提升心理韧性，在成长社区中找到共鸣与支持。这里是你专属的心理成长伙伴。
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="px-3 sm:px-0">
          <h3 className="text-sm sm:text-lg font-semibold text-white mb-3 sm:mb-4 flex items-center gap-2">
            <Sparkles size={14} className="sm:text-[18px] text-amber-400" />
            你可能感兴趣的
          </h3>

          <div className="grid grid-cols-2 gap-2 sm:gap-3">
            {FEATURED_ASSESSMENTS.map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelectAssessment(item.id)}
                  className={`relative overflow-hidden rounded-xl p-3 sm:p-4 ${item.bgColor} border ${item.borderColor} text-left group`}
                >
                  <div className={`absolute top-0 right-0 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br ${item.color} opacity-10 blur-2xl rounded-full -translate-y-1/2 translate-x-1/3`} />

                  <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br ${item.color} flex items-center justify-center mb-2 sm:mb-3 shadow-lg`}>
                    <Icon size={14} className="sm:text-[18px] text-white" />
                  </div>

                  <h4 className="font-semibold text-white text-xs sm:text-sm mb-0.5 sm:mb-1 group-hover:text-violet-300 transition-colors truncate">
                    {item.title}
                  </h4>
                  <p className="text-[10px] sm:text-xs text-white/40 truncate">
                    {item.description}
                  </p>
                  <div className="flex items-center gap-2 text-[10px] sm:text-xs text-white/40 mt-1 sm:mt-2">
                    <span className="flex items-center gap-1">
                      <span>{item.questions}题</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={10} />
                      <span>{item.duration}分钟</span>
                    </span>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        <div className="px-3 sm:px-0">
          <h3 className="text-sm sm:text-lg font-semibold text-white mb-3 sm:mb-4 flex items-center gap-2">
            <Brain size={14} className="sm:text-[18px] text-violet-400" />
            精选专题
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {TOPICS.map((topic) => {
              const Icon = topic.icon
              return (
                <button
                  key={topic.id}
                  onClick={() => navigate('/app/discover')}
                  className="group relative overflow-hidden rounded-xl p-4 bg-white/5 border border-white/10 hover:border-white/20 transition-all text-left"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${topic.gradient} opacity-0 group-hover:opacity-10 transition-opacity`} />
                  
                  <div className="relative">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${topic.gradient} flex items-center justify-center shadow-lg`}>
                        <Icon size={18} className="text-white" />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-white group-hover:text-violet-300 transition-colors">
                          {topic.title}
                        </h4>
                        <p className="text-xs text-white/50">{topic.label}</p>
                      </div>
                    </div>
                    
                    <p className="text-xs text-white/40 leading-relaxed">
                      {topic.description}
                    </p>
                    
                    <div className="mt-3 flex items-center justify-end">
                      <span className="text-xs text-violet-400 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                        探索 <ChevronRight size={12} />
                      </span>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        <div className="px-3 sm:px-0 pt-2">
          <div className="bg-gradient-to-r from-slate-800/50 to-slate-900/50 rounded-xl p-3 sm:p-4 border border-white/5">
            <div className="grid grid-cols-3 gap-2 sm:gap-4 text-center">
              <div className="flex flex-col items-center gap-1">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-violet-500/10 flex items-center justify-center">
                  <Award size={14} className="sm:text-[18px] text-violet-400" />
                </div>
                <span className="text-white font-semibold text-sm sm:text-base">40+</span>
                <span className="text-white/40 text-[10px] sm:text-xs">专业测评</span>
              </div>

              <div className="flex flex-col items-center gap-1">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                  <Shield size={14} className="sm:text-[18px] text-emerald-400" />
                </div>
                <span className="text-white font-semibold text-sm sm:text-base">100%</span>
                <span className="text-white/40 text-[10px] sm:text-xs">隐私保护</span>
              </div>

              <div className="flex flex-col items-center gap-1">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
                  <Sparkles size={14} className="sm:text-[18px] text-amber-400" />
                </div>
                <span className="text-white font-semibold text-sm sm:text-base">免费</span>
                <span className="text-white/40 text-[10px] sm:text-xs">永久使用</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}