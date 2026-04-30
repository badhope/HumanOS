import { motion, AnimatePresence } from 'framer-motion'
import { RefreshCw, Users, BarChart3, BookOpen, ChevronRight, Brain, Heart, Leaf, Briefcase, Smile, ChevronDown, Lock, Target, CheckCircle2 } from 'lucide-react'
import { useState } from 'react'
import { useAppStore } from '../../store'

const assessmentCategories = [
  {
    id: 'personality',
    name: '🧠 人格领域',
    icon: Brain,
    color: 'text-violet-400',
    bgGradient: 'from-violet-500/20 to-violet-500/5',
    borderColor: 'border-violet-500/20',
    assessments: [
      { id: 'mbti-standard', title: 'MBTI 性格测试', questions: 93, path: '/legacy/mode-select/mbti-standard' },
      { id: 'ocean-bigfive', title: '大五人格测试', questions: 120, path: '/legacy/mode-select/ocean-bigfive' },
      { id: 'enneagram', title: '九型人格测试', questions: 144, path: '/legacy/mode-select/enneagram' },
      { id: 'dark-triad', title: '黑暗人格测试', questions: 27, path: '/legacy/mode-select/dark-triad' },
      { id: 'hardiness-standard', title: '心理韧性测试', questions: 30, path: '/legacy/mode-select/hardiness-standard' },
      { id: 'mental-age', title: '心理年龄测试', questions: 20, path: '/legacy/mode-select/mental-age' },
      { id: 'mindset-standard', title: '成长型思维测试', questions: 16, path: '/legacy/mode-select/mindset-standard' },
      { id: 'metacognition-standard', title: '元认知能力测试', questions: 30, path: '/legacy/mode-select/metacognition-standard' },
    ],
  },
  {
    id: 'relationship',
    name: '❤️ 亲密关系',
    icon: Heart,
    color: 'text-pink-400',
    bgGradient: 'from-pink-500/20 to-pink-500/5',
    borderColor: 'border-pink-500/20',
    assessments: [
      { id: 'ecr-attachment', title: '成人依恋类型测试', questions: 36, path: '/legacy/mode-select/ecr-attachment' },
      { id: 'eq-goleman', title: '戈尔曼情商测试', questions: 40, path: '/legacy/mode-select/eq-goleman' },
      { id: 'abm-love-animal', title: '恋爱动物原型', questions: 12, path: '/legacy/mode-select/abm-love-animal' },
      { id: 'gma-maturity', title: '情感成熟度量表', questions: 30, path: '/legacy/mode-select/gma-maturity' },
      { id: 'cast-parenting', title: '养育风格测试', questions: 32, path: '/legacy/mode-select/cast-parenting' },
    ],
  },
  {
    id: 'mental',
    name: '🧘 心理健康',
    icon: Leaf,
    color: 'text-emerald-400',
    bgGradient: 'from-emerald-500/20 to-emerald-500/5',
    borderColor: 'border-emerald-500/20',
    assessments: [
      { id: 'els-standard', title: '情绪劳动量表', questions: 25, path: '/legacy/mode-select/els-standard' },
      { id: 'asi-standard', title: '焦虑敏感指数量表', questions: 16, path: '/legacy/mode-select/asi-standard' },
      { id: 'burnout-mbi', title: '职业倦怠测试 MBI', questions: 22, path: '/legacy/mode-select/burnout-mbi' },
      { id: 'internet-addiction', title: '网络成瘾测试', questions: 20, path: '/legacy/mode-select/internet-addiction' },
      { id: 'life-meaning', title: '生命意义感量表', questions: 20, path: '/legacy/mode-select/life-meaning' },
      { id: 'lacan-diagnosis', title: '拉康精神分析测评', questions: 40, path: '/legacy/mode-select/lacan-diagnosis' },
    ],
  },
  {
    id: 'career',
    name: '💼 职场能力',
    icon: Briefcase,
    color: 'text-blue-400',
    bgGradient: 'from-blue-500/20 to-blue-500/5',
    borderColor: 'border-blue-500/20',
    assessments: [
      { id: 'holland-sds', title: '霍兰德职业兴趣测试', questions: 60, path: '/legacy/mode-select/holland-sds' },
      { id: 'kolb-standard', title: '科尔布学习风格测试', questions: 12, path: '/legacy/mode-select/kolb-standard' },
      { id: 'mft-standard', title: '道德基础量表', questions: 30, path: '/legacy/mode-select/mft-standard' },
      { id: 'mlq-standard', title: '人生意义问卷', questions: 10, path: '/legacy/mode-select/mlq-standard' },
      { id: 'ocb-standard', title: '组织公民行为量表', questions: 20, path: '/legacy/mode-select/ocb-standard' },
      { id: 'iq-ravens', title: '瑞文标准智力测验', questions: 60, path: '/legacy/mode-select/iq-ravens' },
      { id: 'officialdom-dream', title: '官瘾程度测试', questions: 20, path: '/legacy/mode-select/officialdom-dream' },
    ],
  },
  {
    id: 'values',
    name: '⚖️ 价值观',
    icon: Target,
    color: 'text-indigo-400',
    bgGradient: 'from-indigo-500/20 to-indigo-500/5',
    borderColor: 'border-indigo-500/20',
    assessments: [
      { id: 'ideology-9square', title: '政治坐标九维测试', questions: 80, path: '/legacy/mode-select/ideology-9square' },
      { id: 'diversity-enhancement-engine', title: '多元文化包容度量表', questions: 20, path: '/legacy/mode-select/diversity-enhancement-engine' },
    ],
  },
  {
    id: 'fun',
    name: '🎭 趣味测试',
    icon: Smile,
    color: 'text-amber-400',
    bgGradient: 'from-amber-500/20 to-amber-500/5',
    borderColor: 'border-amber-500/20',
    assessments: [
      { id: 'fubao-index', title: '福报指数测试', questions: 20, path: '/legacy/mode-select/fubao-index' },
      { id: 'color-subconscious', title: '颜色潜意识测试', questions: 8, path: '/legacy/mode-select/color-subconscious' },
      { id: 'foodie-level', title: '吃货等级鉴定', questions: 15, path: '/legacy/mode-select/foodie-level' },
    ],
  },
]

const library = [
  { id: 1, title: '为什么你总是害怕拒绝别人？', category: '人际边界', readTime: '5分钟' },
  { id: 2, title: '高敏感人群的自我保护指南', category: '情绪管理', readTime: '8分钟' },
  { id: 3, title: '拖延症的本质不是懒', category: '认知行为', readTime: '6分钟' },
  { id: 4, title: '如何建立健康的个人边界', category: '人际边界', readTime: '10分钟' },
]

function CategorySection({ category }: { category: typeof assessmentCategories[0] }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const { completedAssessments: assessmentHistory } = useAppStore()
  
  const isCompleted = (asmId: string) => {
    return assessmentHistory.some(r => r.id === asmId)
  }

  return (
    <motion.div
      layout
      className={`rounded-xl border ${category.borderColor} overflow-hidden`}
    >
      <motion.div
        layout
        onClick={() => setIsExpanded(!isExpanded)}
        className={`p-4 bg-gradient-to-r ${category.bgGradient} cursor-pointer flex items-center justify-between`}
      >
        <div className="flex items-center gap-3">
          <category.icon size={20} className={category.color} />
          <span className="font-medium">{category.name}</span>
          <span className="text-xs text-white/40">{category.assessments.length} 项</span>
        </div>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown size={18} className="text-white/40" />
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            layout
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="p-2">
              {category.assessments.map((asm, i) => (
                <motion.div
                  key={asm.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => asm.path && (window.location.href = asm.path)}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 cursor-pointer transition-all"
                >
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-gradient-to-br from-violet-500/30 to-pink-500/30">
                    <ChevronRight size={14} className="text-violet-400" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium flex items-center gap-2">
                      {asm.title}
                      {isCompleted(asm.id) && (
                        <CheckCircle2 size={14} className="text-emerald-400" />
                      )}
                    </div>
                    <div className="text-[11px] text-white/40">{asm.questions} 题 · 约 {Math.ceil(asm.questions / 10)} 分钟</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function Discover() {
  const [activeTab, setActiveTab] = useState<'assessments' | 'library'>('assessments')

  return (
    <div className="pb-20">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-2xl font-bold mb-2">🔮 探索</h1>
        <p className="text-white/60">发现适合你的心理测评与工具</p>
      </motion.div>

      <div className="flex gap-2 mb-6">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setActiveTab('assessments')}
          className={`flex-1 px-4 py-2.5 rounded-xl font-medium transition-all ${
            activeTab === 'assessments'
              ? 'bg-violet-500 text-white shadow-lg shadow-violet-500/30'
              : 'bg-white/5 text-white/60 hover:bg-white/10'
          }`}
        >
          📋 测评中心
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setActiveTab('library')}
          className={`flex-1 px-4 py-2.5 rounded-xl font-medium transition-all ${
            activeTab === 'library'
              ? 'bg-violet-500 text-white shadow-lg shadow-violet-500/30'
              : 'bg-white/5 text-white/60 hover:bg-white/10'
          }`}
        >
          📚 心理图书馆
        </motion.button>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'assessments' && (
          <motion.div
            key="assessments"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-3"
          >
            {assessmentCategories.map(category => (
              <CategorySection key={category.id} category={category} />
            ))}

            <div className="mt-8 p-4 rounded-xl bg-gradient-to-r from-violet-500/10 to-pink-500/10 border border-violet-500/20">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-violet-500/20 flex items-center justify-center">
                  <BarChart3 size={20} className="text-violet-400" />
                </div>
                <div>
                  <div className="font-medium">测评进度</div>
                  <div className="text-xs text-white/40">已解锁 32 项专业测评</div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-white/40">
                <Users size={12} />
                <span>累计已有 100,000+ 用户完成测评</span>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'library' && (
          <motion.div
            key="library"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-3"
          >
            {library.map((article, i) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="p-4 rounded-xl bg-white/5 hover:bg-white/10 cursor-pointer transition-all group"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-violet-500/20 flex items-center justify-center shrink-0">
                    <BookOpen size={18} className="text-violet-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium mb-1 group-hover:text-violet-400 transition-colors">
                      {article.title}
                    </h3>
                    <div className="flex items-center gap-3 text-xs text-white/40">
                      <span>{article.category}</span>
                      <span>·</span>
                      <span>{article.readTime}</span>
                    </div>
                  </div>
                  <ChevronRight size={16} className="text-white/30 group-hover:text-violet-400 transition-colors" />
                </div>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-6 p-4 rounded-xl bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 text-center"
            >
              <RefreshCw size={20} className="w-6 h-6 mx-auto mb-2 text-emerald-400" />
              <p className="text-sm text-white/60">更多精彩内容即将上线</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
