import { LucideIcon } from 'lucide-react'
import { Brain, Heart, Leaf, Briefcase, Target, Smile, BookOpen, Sparkles, Users, Wrench, FileText, Headphones, Calendar, Lightbulb, Shield, Zap, Coffee, Moon, Music, Sun, CloudRain, CloudSun, Flame, Droplets, Wind } from 'lucide-react'

export interface DiscoverItem {
  id: string
  title: string
  description?: string
  icon: LucideIcon
  path?: string
  badge?: string
  featured?: boolean
  questionCount?: number
  duration?: number
}

export interface DiscoverSubcategory {
  id: string
  name: string
  icon: LucideIcon
  items: DiscoverItem[]
  path?: string
}

export interface DiscoverCategory {
  id: string
  name: string
  icon: LucideIcon
  color: string
  bgGradient: string
  borderColor: string
  subcategories: DiscoverSubcategory[]
}

const personalityItems: DiscoverItem[] = [
  { id: 'sbti', title: 'MBTI 16型人格测试', description: '了解你的人格类型', icon: Brain, path: '/mode-select/sbti-personality', badge: '热门', questionCount: 24, duration: 5 },
  { id: 'bigfive', title: '大五人格测试', description: '全面了解你的人格特质', icon: Sparkles, path: '/mode-select/ocean-bigfive', questionCount: 28, duration: 6 },
  { id: 'darktriad', title: '黑暗三人格测试', description: '探索你的阴暗面', icon: Flame, path: '/mode-select/dark-triad', questionCount: 28, duration: 6 },
  { id: 'hardiness', title: '心理韧性测试', description: '评估你的抗压能力', icon: Shield, path: '/mode-select/hardiness-standard', questionCount: 28, duration: 6 },
  { id: 'mentalage', title: '心理年龄测试', description: '测测你的心理年龄', icon: Calendar, path: '/mode-select/mental-age', questionCount: 20, duration: 4 },
  { id: 'mindset', title: '成长型思维测试', description: '了解你的思维模式', icon: Lightbulb, path: '/mode-select/mindset-standard', questionCount: 28, duration: 6 },
]

const relationshipItems: DiscoverItem[] = [
  { id: 'attachment', title: '成人依恋类型测试', description: '了解你的依恋模式', icon: Heart, path: '/mode-select/ecr-attachment', badge: '推荐', questionCount: 28, duration: 6 },
  { id: 'eq', title: '戈尔曼情商测试', description: '全面评估你的情商', icon: Zap, path: '/mode-select/eq-goleman', questionCount: 28, duration: 6 },
  { id: 'loveanimal', title: '爱情动物测试', description: '探索你的爱情风格', icon: Heart, path: '/mode-select/abm-love-animal', questionCount: 20, duration: 4 },
  { id: 'maturity', title: '情感成熟度测试', description: '评估你的情感成熟度', icon: Sparkles, path: '/mode-select/gma-maturity', questionCount: 28, duration: 6 },
  { id: 'parenting', title: '养育风格测试', description: '了解你的育儿方式', icon: Users, path: '/mode-select/cast-parenting', questionCount: 28, duration: 6 },
]

const mentalItems: DiscoverItem[] = [
  { id: 'sas', title: '焦虑自评量表', description: '评估你的焦虑水平', icon: CloudRain, path: '/mode-select/sas-standard', badge: '专业', questionCount: 28, duration: 5 },
  { id: 'sds', title: '抑郁自评量表', description: '评估你的抑郁程度', icon: CloudSun, path: '/mode-select/sds-standard', questionCount: 20, duration: 4 },
  { id: 'pss', title: '压力知觉量表', description: '了解你的压力水平', icon: Droplets, path: '/mode-select/pss-standard', questionCount: 20, duration: 4 },
  { id: 'burnout', title: '职业倦怠测试', description: '评估职业倦怠程度', icon: Coffee, path: '/mode-select/burnout-mbi', questionCount: 28, duration: 6 },
  { id: 'internet', title: '网络成瘾测试', description: '评估网络使用情况', icon: Zap, path: '/mode-select/internet-addiction', questionCount: 20, duration: 4 },
]

const careerItems: DiscoverItem[] = [
  { id: 'holland', title: '霍兰德职业兴趣测试', description: '探索适合的职业方向', icon: Briefcase, path: '/mode-select/holland-sds', badge: '热门', questionCount: 28, duration: 6 },
  { id: 'kolb', title: '学习风格测试', description: '了解你的学习方式', icon: BookOpen, path: '/mode-select/kolb-standard', questionCount: 28, duration: 6 },
  { id: 'leadership', title: '领导力风格测试', description: '评估你的领导能力', icon: Users, path: '/mode-select/mlq-standard', questionCount: 28, duration: 6 },
  { id: 'iq', title: '瑞文智力测验', description: '测试你的逻辑推理能力', icon: Lightbulb, path: '/mode-select/iq-ravens', questionCount: 28, duration: 8 },
]

const valuesItems: DiscoverItem[] = [
  { id: 'ideology', title: '政治坐标九维测试', description: '了解你的政治倾向', icon: Target, path: '/mode-select/ideology-9square', questionCount: 28, duration: 6 },
  { id: 'schwartz', title: '施瓦茨价值观测试', description: '探索你的价值取向', icon: Sparkles, path: '/mode-select/schwartz-standard', questionCount: 28, duration: 6 },
  { id: 'mft', title: '道德基础量表', description: '了解你的道德观念', icon: Shield, path: '/mode-select/mft-standard', questionCount: 28, duration: 6 },
  { id: 'pcq', title: '心理资本问卷', description: '评估你的心理资本', icon: Sun, path: '/mode-select/pcq-standard', questionCount: 28, duration: 6 },
]

const funItems: DiscoverItem[] = [
  { id: 'fubao', title: '福报指数测试', description: '测测你的福报值', icon: Sparkles, path: '/mode-select/fubao-index', badge: '趣味', questionCount: 28, duration: 5 },
  { id: 'color', title: '颜色潜意识测试', description: '色彩揭示你的内心', icon: Wrench, path: '/mode-select/color-subconscious', questionCount: 20, duration: 4 },
  { id: 'foodie', title: '吃货等级鉴定', description: '看看你的吃货级别', icon: Coffee, path: '/mode-select/foodie-level', questionCount: 20, duration: 4 },
  { id: 'onepiece', title: '海贼王悬赏金测试', description: '你值多少赏金？', icon: Flame, path: '/mode-select/onepiece-bounty', questionCount: 20, duration: 4 },
  { id: 'pua', title: 'PUA抵抗力测试', description: '测试你的防坑能力', icon: Shield, path: '/mode-select/pua-resistance', questionCount: 28, duration: 6 },
]

const articlesItems: DiscoverItem[] = [
  { id: 'article1', title: '为什么你总是害怕拒绝别人？', description: '深入理解人际边界的重要性', icon: FileText, badge: '热门', path: '/library/articles' },
  { id: 'article2', title: '高敏感人群的自我保护指南', description: '学会保护自己的敏感心灵', icon: Heart, badge: '推荐', path: '/library/articles' },
  { id: 'article3', title: '拖延症的本质不是懒', description: '从心理学角度解读拖延', icon: Lightbulb, path: '/library/articles' },
  { id: 'article4', title: '如何建立健康的个人边界', description: '守护你的心理空间', icon: Shield, path: '/library/articles' },
  { id: 'article5', title: '情绪管理的科学方法', description: '掌握情绪调节技巧', icon: CloudSun, path: '/library/articles' },
  { id: 'article6', title: '正念冥想入门指南', description: '开启内心平静之旅', icon: Moon, path: '/library/articles' },
]

const toolsItems: DiscoverItem[] = [
  { id: 'tool1', title: '呼吸练习', description: '快速放松身心', icon: Wind, badge: '推荐', path: '/library/tools' },
  { id: 'tool2', title: '情绪日记', description: '记录与追踪情绪', icon: Calendar, path: '/library/tools' },
  { id: 'tool3', title: '压力管理', description: '有效的减压技巧', icon: Droplets, path: '/library/tools' },
  { id: 'tool4', title: '目标设定', description: '科学制定目标', icon: Target, path: '/library/tools' },
]

const resourcesItems: DiscoverItem[] = [
  { id: 'music1', title: '冥想音乐', description: '深度放松音频', icon: Music, badge: '热门', path: '/library/resources' },
  { id: 'music2', title: '白噪音', description: '专注工作背景音', icon: CloudSun, path: '/library/resources' },
  { id: 'music3', title: '自然声音', description: '森林、海浪等自然音效', icon: Leaf, path: '/library/resources' },
]

const shareItems: DiscoverItem[] = [
  { id: 'share1', title: '分享我的测评结果', description: '与他人分享你的洞察', icon: Users, badge: '热门', path: '/community/share' },
  { id: 'share2', title: '发现相似灵魂', description: '找到志同道合的朋友', icon: Heart, path: '/community/share' },
  { id: 'share3', title: '测评排行榜', description: '看看谁完成的测评最多', icon: Target, path: '/community/share' },
]

const discussionItems: DiscoverItem[] = [
  { id: 'disc1', title: '心理健康话题', description: '参与心理健康讨论', icon: Brain, badge: '推荐', path: '/community/discussion' },
  { id: 'disc2', title: '成长心得分享', description: '分享你的成长故事', icon: Sparkles, path: '/community/discussion' },
  { id: 'disc3', title: '书籍读后感', description: '交流心理学书籍心得', icon: BookOpen, path: '/community/discussion' },
]

const expertItems: DiscoverItem[] = [
  { id: 'expert1', title: '在线问答', description: '向专家提问', icon: Lightbulb, badge: '专业', path: '/community/expert' },
  { id: 'expert2', title: '心理科普', description: '专家科普文章', icon: FileText, path: '/community/expert' },
]

const trainingItems: DiscoverItem[] = [
  { id: 'train1', title: '情绪管理训练', description: '系统提升情绪调节能力', icon: Brain, badge: '推荐', path: '/growth/training' },
  { id: 'train2', title: '专注力训练', description: '提升你的注意力', icon: Target, path: '/growth/training' },
  { id: 'train3', title: '自信心提升', description: '建立强大的自信心', icon: Zap, path: '/growth/training' },
]

const habitsItems: DiscoverItem[] = [
  { id: 'habit1', title: '每日打卡', description: '养成好习惯', icon: Calendar, badge: '热门', path: '/growth/habits' },
  { id: 'habit2', title: '目标追踪', description: '追踪你的目标进度', icon: Target, path: '/growth/habits' },
  { id: 'habit3', title: '成就系统', description: '解锁成就徽章', icon: Sparkles, path: '/growth/habits' },
]

export const discoverCategories: DiscoverCategory[] = [
  {
    id: 'library',
    name: '📚 心理图书馆',
    icon: BookOpen,
    color: 'text-blue-400',
    bgGradient: 'from-blue-500/20 to-blue-500/5',
    borderColor: 'border-blue-500/20',
    subcategories: [
      { id: 'articles', name: '📖 精选文章', icon: FileText, items: articlesItems, path: '/library/articles' },
      { id: 'tools', name: '🛠️ 心理工具', icon: Wrench, items: toolsItems, path: '/library/tools' },
      { id: 'resources', name: '🎵 放松资源', icon: Headphones, items: resourcesItems, path: '/library/resources' },
    ]
  },
  {
    id: 'community',
    name: '👥 社区互动',
    icon: Users,
    color: 'text-pink-400',
    bgGradient: 'from-pink-500/20 to-pink-500/5',
    borderColor: 'border-pink-500/20',
    subcategories: [
      { id: 'share', name: '📤 测评分享', icon: Sparkles, items: shareItems, path: '/community/share' },
      { id: 'discussion', name: '💬 话题讨论', icon: Users, items: discussionItems, path: '/community/discussion' },
      { id: 'expert', name: '👨‍⚕️ 专家咨询', icon: Lightbulb, items: expertItems, path: '/community/expert' },
    ]
  },
  {
    id: 'growth',
    name: '🌱 个人成长',
    icon: Sparkles,
    color: 'text-emerald-400',
    bgGradient: 'from-emerald-500/20 to-emerald-500/5',
    borderColor: 'border-emerald-500/20',
    subcategories: [
      { id: 'training', name: '🏋️ 训练计划', icon: Brain, items: trainingItems, path: '/growth/training' },
      { id: 'habits', name: '📅 习惯养成', icon: Calendar, items: habitsItems, path: '/growth/habits' },
    ]
  }
]
