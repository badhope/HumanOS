import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Sparkles, Brain, Heart, Users, Briefcase, Target, Leaf, Smile, BookOpen, FileText, Shield, Zap, Coffee, CloudRain, CloudSun, Lightbulb, Flame, Calendar, Droplets, ChevronRight, Clock, List, MessageCircle, SmilePlus, Frown, BrainCircuit, TrendingUp, Gauge, Layers, Puzzle, Cpu, BookMarked, MessageSquare, HeartHandshake, Eye, Scale, Compass, LeafIcon, SunMedium, Moon, Star, Sparkle, Wind, Waves, Mountain, MountainSnow, CircleDot } from 'lucide-react'

interface Assessment {
  id: string
  title: string
  description: string
  icon: any
  path: string
  badge?: string
  questionCount?: number
  duration?: number
  category: string
}

const ALL_ASSESSMENTS: Assessment[] = [
  // 人格类
  { id: 'sbti', title: 'MBTI 16型人格测试', description: '了解你的人格类型', icon: Brain, path: '/mode-select/sbti-personality', badge: '热门', questionCount: 24, duration: 5, category: '人格' },
  { id: 'bigfive', title: '大五人格测试', description: '全面了解你的人格特质', icon: TrendingUp, path: '/mode-select/ocean-bigfive', badge: '热门', questionCount: 28, duration: 6, category: '人格' },
  { id: 'darktriad', title: '黑暗三人格测试', description: '探索你的阴暗面', icon: Flame, path: '/mode-select/dark-triad', questionCount: 28, duration: 6, category: '人格' },
  { id: 'hardiness', title: '心理韧性测试', description: '评估你的抗压能力', icon: Shield, path: '/mode-select/hardiness-standard', questionCount: 28, duration: 6, category: '人格' },
  { id: 'mentalage', title: '心理年龄测试', description: '测测你的心理年龄', icon: Calendar, path: '/mode-select/mental-age', questionCount: 20, duration: 4, category: '人格' },
  { id: 'mindset', title: '成长型思维测试', description: '了解你的思维模式', icon: Lightbulb, path: '/mode-select/mindset-standard', questionCount: 28, duration: 6, category: '人格' },
  { id: 'metacognition', title: '元认知能力测试', description: '评估你的自我反思能力', icon: Eye, path: '/mode-select/metacognition-standard', questionCount: 28, duration: 6, category: '人格' },

  // 关系类
  { id: 'attachment', title: '成人依恋类型测试', description: '了解你的依恋模式', icon: Heart, path: '/mode-select/ecr-attachment', badge: '推荐', questionCount: 28, duration: 6, category: '关系' },
  { id: 'eq', title: '戈尔曼情商测试', description: '全面评估你的情商', icon: CircleDot, path: '/mode-select/eq-goleman', questionCount: 28, duration: 6, category: '关系' },
  { id: 'loveanimal', title: '爱情动物测试', description: '探索你的爱情风格', icon: Heart, path: '/mode-select/abm-love-animal', questionCount: 20, duration: 4, category: '关系' },
  { id: 'maturity', title: '情感成熟度测试', description: '评估你的情感成熟度', icon: Sparkles, path: '/mode-select/gma-maturity', questionCount: 28, duration: 6, category: '关系' },
  { id: 'parenting', title: '养育风格测试', description: '了解你的育儿方式', icon: Users, path: '/mode-select/cast-parenting', questionCount: 28, duration: 6, category: '关系' },
  { id: 'tki', title: 'TKI冲突管理模式测试', description: '了解你处理冲突的方式', icon: MessageSquare, path: '/mode-select/tki-standard', questionCount: 30, duration: 6, category: '关系' },
  { id: 'els', title: '情绪劳动量表', description: '评估情绪管理能力', icon: Smile, path: '/mode-select/els-standard', questionCount: 28, duration: 5, category: '关系' },

  // 心理类
  { id: 'sas', title: '焦虑自评量表', description: '评估你的焦虑水平', icon: CloudRain, path: '/mode-select/sas-standard', badge: '专业', questionCount: 28, duration: 5, category: '心理' },
  { id: 'sds', title: '抑郁自评量表', description: '评估你的抑郁程度', icon: CloudSun, path: '/mode-select/sds-standard', questionCount: 20, duration: 4, category: '心理' },
  { id: 'pss', title: '压力知觉量表', description: '了解你的压力水平', icon: Droplets, path: '/mode-select/pss-standard', questionCount: 20, duration: 4, category: '心理' },
  { id: 'burnout', title: '职业倦怠测试', description: '评估职业倦怠程度', icon: Coffee, path: '/mode-select/burnout-mbi', questionCount: 28, duration: 6, category: '心理' },
  { id: 'internet', title: '网络成瘾测试', description: '评估网络使用情况', icon: Zap, path: '/mode-select/internet-addiction', questionCount: 20, duration: 4, category: '心理' },
  { id: 'scl90', title: '症状自评量表SCL-90', description: '全面心理健康评估', icon: Brain, path: '/mode-select/scl90', badge: '专业', questionCount: 90, duration: 15, category: '心理' },
  { id: 'psqi', title: '匹兹堡睡眠质量指数', description: '评估你的睡眠质量', icon: Moon, path: '/mode-select/sleep-quality', questionCount: 24, duration: 5, category: '心理' },
  { id: 'ocb', title: '组织公民行为量表', description: '评估工作表现行为', icon: Star, path: '/mode-select/ocb-standard', questionCount: 24, duration: 5, category: '心理' },

  // 职业类
  { id: 'holland', title: '霍兰德职业兴趣测试', description: '探索适合的职业方向', icon: Briefcase, path: '/mode-select/holland-sds', badge: '热门', questionCount: 28, duration: 6, category: '职业' },
  { id: 'kolb', title: '学习风格测试', description: '了解你的学习方式', icon: BookOpen, path: '/mode-select/kolb-standard', questionCount: 28, duration: 6, category: '职业' },
  { id: 'leadership', title: '领导力风格测试', description: '评估你的领导能力', icon: Users, path: '/mode-select/mlq-standard', questionCount: 28, duration: 6, category: '职业' },
  { id: 'iq', title: '瑞文智力测验', description: '测试你的逻辑推理能力', icon: Lightbulb, path: '/mode-select/iq-ravens', questionCount: 28, duration: 8, category: '职业' },

  // 价值观类
  { id: 'ideology-enhanced', title: '意识形态罗盘 5×5', description: '了解你在不同社会议题上的立场', icon: Target, path: '/assessment/ideology-enhanced/mode-select', questionCount: 35, duration: 6, category: '意识形态', badge: '新版' },
  { id: 'schwartz', title: '施瓦茨价值观测试', description: '探索你的价值取向', icon: Sparkles, path: '/mode-select/schwartz-standard', questionCount: 28, duration: 6, category: '价值观' },
  { id: 'mft', title: '道德基础量表', description: '了解你的道德观念', icon: Shield, path: '/mode-select/mft-standard', questionCount: 28, duration: 6, category: '价值观' },
  { id: 'pcq', title: '心理资本问卷', description: '评估你的心理资本', icon: SunMedium, path: '/mode-select/pcq-standard', questionCount: 28, duration: 6, category: '价值观' },
  { id: 'meaning', title: '生命意义感量表', description: '探索生命的意义', icon: Star, path: '/mode-select/life-meaning', questionCount: 28, duration: 6, category: '价值观' },
  { id: 'patriotism', title: '爱国情怀量表', description: '评估国家认同感', icon: Mountain, path: '/mode-select/patriotism-purity', questionCount: 24, duration: 5, category: '价值观' },

  // 趣味类
  { id: 'fubao', title: '福报指数测试', description: '测测你的福报值', icon: Sparkles, path: '/mode-select/fubao-index', badge: '趣味', questionCount: 28, duration: 5, category: '趣味' },
  { id: 'color', title: '颜色潜意识测试', description: '色彩揭示你的内心', icon: LeafIcon, path: '/mode-select/color-subconscious', questionCount: 20, duration: 4, category: '趣味' },
  { id: 'foodie', title: '吃货等级鉴定', description: '看看你的吃货级别', icon: Coffee, path: '/mode-select/foodie-level', questionCount: 20, duration: 4, category: '趣味' },
  { id: 'onepiece', title: '海贼王悬赏金测试', description: '你值多少赏金？', icon: Flame, path: '/mode-select/onepiece-bounty', questionCount: 20, duration: 4, category: '趣味' },
  { id: 'pua', title: 'PUA抵抗力测试', description: '测试你的防坑能力', icon: Shield, path: '/mode-select/pua-resistance', questionCount: 28, duration: 6, category: '趣味' },
]

export default function AssessmentsPage() {
  const navigate = useNavigate()

  const handleStartAssessment = (assessment: any) => {
    if (assessment.id === 'ideology-enhanced') {
      navigate('/assessment/ideology-enhanced/mode-select')
    } else if (assessment.path && assessment.path.startsWith('/mode-select/')) {
      // 从 path 中提取真实的 assessmentId (移除 '/mode-select/' 前缀)
      const realId = assessment.path.replace('/mode-select/', '')
      navigate(`/assessment/${realId}`)
    } else {
      navigate(`/assessment/${assessment.id}`)
    }
  }

  const categories = ['全部', '人格', '关系', '心理', '职业', '价值观', '趣味']
  const [activeCategory, setActiveCategory] = useState('全部')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredAssessments = ALL_ASSESSMENTS.filter(a => {
    const matchesCategory = activeCategory === '全部' || a.category === activeCategory
    const matchesSearch = searchQuery === '' || 
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="max-w-4xl mx-auto px-4 space-y-6">
      <div className="text-center py-4">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 mb-3">
          <Sparkles size={14} className="text-violet-400" />
          <span className="text-sm text-violet-300">专业测评</span>
        </div>
        <h1 className="text-2xl font-bold text-white mb-2">
          心理测评中心
        </h1>
        <p className="text-white/50 text-sm">
          通过科学测评，深入了解真实的自己
        </p>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-sm text-white/50">
          共 {ALL_ASSESSMENTS.length} 个测评
        </span>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1.5 text-xs rounded-full whitespace-nowrap transition-all ${
              activeCategory === cat
                ? 'bg-violet-500 text-white'
                : 'bg-white/5 text-white/50 hover:bg-white/10'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAssessments.map((assessment) => {
          const Icon = assessment.icon
          return (
            <button
              key={assessment.id}
              onClick={() => handleStartAssessment(assessment)}
              className="group relative overflow-hidden rounded-xl p-4 bg-white/5 border border-white/10 hover:border-violet-500/30 transition-all text-left"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="relative">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-500/20 to-purple-500/20 flex items-center justify-center shrink-0">
                    <Icon size={18} className="text-violet-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-white text-sm group-hover:text-violet-300 transition-colors mb-0.5">
                      {assessment.title}
                    </h4>
                    <p className="text-xs text-white/40 line-clamp-1">
                      {assessment.description}
                    </p>
                  </div>
                  {assessment.badge && (
                    <span className="px-1.5 py-0.5 text-[10px] rounded bg-amber-500/20 text-amber-400 shrink-0">
                      {assessment.badge}
                    </span>
                  )}
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-xs text-white/50">
                    {assessment.questionCount && (
                      <span className="flex items-center gap-1">
                        <List size={12} />
                        {assessment.questionCount}题
                      </span>
                    )}
                    {assessment.duration && (
                      <span className="flex items-center gap-1">
                        <Clock size={12} />
                        {assessment.duration}分钟
                      </span>
                    )}
                  </div>
                  <ChevronRight size={14} className="text-white/30 group-hover:text-violet-400 group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            </button>
          )
        })}
      </div>

      {filteredAssessments.length === 0 && (
        <div className="text-center py-12">
          <p className="text-white/50">没有找到匹配的测评</p>
        </div>
      )}

      <div className="pt-4">
        <div className="rounded-xl p-4 bg-gradient-to-r from-slate-800/50 to-slate-900/50 border border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-violet-500/20 flex items-center justify-center">
              <Sparkles size={18} className="text-violet-400" />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-medium text-white mb-0.5">更多测评即将上线</h4>
              <p className="text-xs text-white/40">我们正在开发更多专业的心理测评，敬请期待</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}