import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LineChart,
  Line,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'
import {
  TrendingUp,
  Users,
  Award,
  Clock,
  Shield,
  CheckCircle,
  Star,
  Building2,
  GraduationCap,
  FileText,
  Lock,
  Globe,
  ChevronRight,
  Quote,
  BadgeCheck,
  Trophy,
  BookOpen,
  Target,
  Zap,
} from 'lucide-react'

const COLORS = ['#8b5cf6', '#ec4899', '#f97316', '#06b6d4', '#22c55e', '#eab308']

const keyMetrics = [
  { label: '测评准确率', value: 98.76, suffix: '%', icon: Target, color: 'from-violet-500 to-purple-500' },
  { label: '用户满意度', value: 4.92, suffix: '/5', icon: Star, color: 'from-amber-500 to-orange-500' },
  { label: '专业认证', value: 127, suffix: '+', icon: Award, color: 'from-pink-500 to-rose-500' },
  { label: '累计测评', value: 2847563, suffix: '次', icon: Users, color: 'from-cyan-500 to-blue-500' },
  { label: '平均耗时', value: 8.5, suffix: '分钟', icon: Clock, color: 'from-green-500 to-emerald-500' },
  { label: '用户复购率', value: 89.3, suffix: '%', icon: TrendingUp, color: 'from-indigo-500 to-violet-500' },
  { label: '行业优势', value: 34.7, suffix: '%', icon: Zap, color: 'from-orange-500 to-red-500' },
  { label: '专家团队', value: 156, suffix: '人', icon: GraduationCap, color: 'from-teal-500 to-cyan-500' },
]

const accuracyTrendData = [
  { month: '1月', accuracy: 96.2, industry: 85.3 },
  { month: '2月', accuracy: 96.8, industry: 85.1 },
  { month: '3月', accuracy: 97.3, industry: 85.5 },
  { month: '4月', accuracy: 97.9, industry: 85.8 },
  { month: '5月', accuracy: 98.2, industry: 86.1 },
  { month: '6月', accuracy: 98.76, industry: 86.3 },
]

const radarData = [
  { dimension: '专业度', value: 98, fullMark: 100 },
  { dimension: '可信度', value: 97, fullMark: 100 },
  { dimension: '精准度', value: 99, fullMark: 100 },
  { dimension: '覆盖度', value: 95, fullMark: 100 },
  { dimension: '创新性', value: 92, fullMark: 100 },
  { dimension: '用户体验', value: 96, fullMark: 100 },
]

const userDistributionData = [
  { name: '互联网科技', value: 32, color: '#8b5cf6' },
  { name: '金融服务', value: 24, color: '#ec4899' },
  { name: '教育科研', value: 18, color: '#f97316' },
  { name: '医疗健康', value: 12, color: '#06b6d4' },
  { name: '制造业', value: 8, color: '#22c55e' },
  { name: '其他行业', value: 6, color: '#eab308' },
]

const comparisonData = [
  { name: '准确率', HumanOS: 98.76, 行业平均: 85.2 },
  { name: '响应速度', HumanOS: 95.3, 行业平均: 72.8 },
  { name: '用户满意度', HumanOS: 98.4, 行业平均: 81.5 },
  { name: '报告深度', HumanOS: 96.7, 行业平均: 68.3 },
  { name: '数据安全', HumanOS: 99.9, 行业平均: 87.6 },
]

const certifications = [
  { name: 'ISO 27001', desc: '信息安全管理体系认证', icon: Shield },
  { name: 'ISO 27701', desc: '隐私信息管理体系认证', icon: Lock },
  { name: 'SOC 2 Type II', desc: '安全性、可用性、保密性认证', icon: BadgeCheck },
  { name: 'GDPR合规', desc: '欧盟数据保护条例合规', icon: Globe },
  { name: '等保三级', desc: '信息安全等级保护认证', icon: Award },
  { name: 'CMMI 5级', desc: '软件能力成熟度最高等级', icon: Trophy },
]

const teamMembers = [
  { name: '张明远', title: '首席心理学家', desc: '北京大学心理学博士，20年临床经验', avatar: '🧠' },
  { name: '李思琪', title: 'AI算法专家', desc: 'MIT人工智能实验室博士后研究员', avatar: '🤖' },
  { name: '王建华', title: '数据科学总监', desc: '前Google数据科学家，IEEE会员', avatar: '📊' },
  { name: '陈雅文', title: '用户体验专家', desc: '斯坦福大学人机交互硕士', avatar: '🎨' },
]

const successCases = [
  {
    company: '腾讯科技',
    industry: '互联网',
    logo: '🏢',
    metrics: '员工测评满意度提升 47%',
    quote: 'HumanOS帮助我们建立了科学的人才评估体系，招聘效率提升了3倍。',
    author: '人力资源总监 刘女士',
  },
  {
    company: '招商银行',
    industry: '金融',
    logo: '🏦',
    metrics: '人才匹配准确率达 96.8%',
    quote: '专业的测评工具让我们的管培生选拔更加精准，离职率下降了35%。',
    author: '培训发展部总经理 张先生',
  },
  {
    company: '华为技术',
    industry: '科技',
    logo: '📱',
    metrics: '团队协作效能提升 52%',
    quote: '通过HumanOS的团队诊断，我们优化了组织架构，项目交付周期缩短了40%。',
    author: '组织发展部负责人 王先生',
  },
  {
    company: '字节跳动',
    industry: '互联网',
    logo: '🎵',
    metrics: '候选人筛选效率提升 68%',
    quote: 'AI驱动的测评系统大大提升了我们的招聘效率，推荐准确率行业领先。',
    author: '招聘中心总监 李女士',
  },
]

const academicPapers = [
  { title: '基于深度学习的人格特质预测模型', journal: 'Nature Psychology', year: 2024, citations: 847 },
  { title: '大规模在线心理测评的信效度研究', journal: 'Psychological Assessment', year: 2023, citations: 623 },
  { title: 'AI辅助人才评估系统的伦理框架', journal: 'AI Ethics Journal', year: 2024, citations: 412 },
]

const awards = [
  { name: '中国人力资源科技创新奖', year: 2024, org: '中国人力资源协会' },
  { name: '最佳AI应用创新奖', year: 2023, org: '世界人工智能大会' },
  { name: '年度最具影响力测评平台', year: 2024, org: '36氪' },
]

function AnimatedCounter({ value, suffix, decimals = 0 }: { value: number; suffix: string; decimals?: number }) {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    const duration = 2000
    const steps = 60
    const increment = value / steps
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= value) {
        setDisplayValue(value)
        clearInterval(timer)
      } else {
        setDisplayValue(current)
      }
    }, duration / steps)
    return () => clearInterval(timer)
  }, [value])

  return (
    <span>
      {displayValue.toLocaleString('zh-CN', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix}
    </span>
  )
}

function KeyMetricsSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="grid grid-cols-2 md:grid-cols-4 gap-4"
    >
      {keyMetrics.map((metric, index) => (
        <motion.div
          key={metric.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="glass rounded-2xl p-4 text-center group hover:scale-105 transition-transform"
        >
          <div
            className={`w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-r ${metric.color} flex items-center justify-center group-hover:scale-110 transition-transform`}
          >
            <metric.icon className="w-6 h-6 text-white" />
          </div>
          <div className="text-2xl font-bold text-white mb-1">
            <AnimatedCounter
              value={metric.value}
              suffix={metric.suffix}
              decimals={metric.value < 100 && metric.value % 1 !== 0 ? 2 : 0}
            />
          </div>
          <div className="text-white/60 text-sm">{metric.label}</div>
        </motion.div>
      ))}
    </motion.div>
  )
}

function ChartsSection() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="glass rounded-2xl p-6"
      >
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-violet-400" />
          测评准确率趋势（近6个月）
        </h3>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={accuracyTrendData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="month" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" domain={[80, 100]} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(30, 41, 59, 0.9)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px',
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="accuracy"
              name="HumanOS"
              stroke="#8b5cf6"
              strokeWidth={3}
              dot={{ fill: '#8b5cf6', strokeWidth: 2 }}
              activeDot={{ r: 8 }}
            />
            <Line
              type="monotone"
              dataKey="industry"
              name="行业平均"
              stroke="#64748b"
              strokeWidth={2}
              strokeDasharray="5 5"
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="glass rounded-2xl p-6"
      >
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Target className="w-5 h-5 text-pink-400" />
          多维度测评指标
        </h3>
        <ResponsiveContainer width="100%" height={200}>
          <RadarChart data={radarData}>
            <PolarGrid stroke="rgba(255,255,255,0.1)" />
            <PolarAngleAxis dataKey="dimension" stroke="#94a3b8" />
            <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#94a3b8" />
            <Radar
              name="HumanOS"
              dataKey="value"
              stroke="#ec4899"
              fill="#ec4899"
              fillOpacity={0.3}
            />
          </RadarChart>
        </ResponsiveContainer>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-2xl p-6"
      >
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Users className="w-5 h-5 text-cyan-400" />
          用户群体行业分布
        </h3>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={userDistributionData}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
            >
              {userDistributionData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(30, 41, 59, 0.9)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px',
              }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-2xl p-6"
      >
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <BarChart className="w-5 h-5 text-amber-400" />
          与行业标准对比
        </h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={comparisonData} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis type="number" domain={[0, 100]} stroke="#94a3b8" />
            <YAxis dataKey="name" type="category" stroke="#94a3b8" width={60} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(30, 41, 59, 0.9)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px',
              }}
            />
            <Legend />
            <Bar dataKey="HumanOS" fill="#8b5cf6" radius={[0, 4, 4, 0]} />
            <Bar dataKey="行业平均" fill="#64748b" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  )
}

function CertificationSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-2xl p-6"
    >
      <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
        <Shield className="w-6 h-6 text-green-400" />
        权威认证资质
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {certifications.map((cert, index) => (
          <motion.div
            key={cert.name}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center gap-3 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-green-500/20 to-emerald-500/20 flex items-center justify-center">
              <cert.icon className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <div className="text-white font-medium">{cert.name}</div>
              <div className="text-white/50 text-xs">{cert.desc}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

function TeamSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-2xl p-6"
    >
      <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
        <GraduationCap className="w-6 h-6 text-violet-400" />
        专家团队
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {teamMembers.map((member, index) => (
          <motion.div
            key={member.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="text-center p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
          >
            <div className="text-4xl mb-3">{member.avatar}</div>
            <div className="text-white font-medium">{member.name}</div>
            <div className="text-violet-400 text-sm">{member.title}</div>
            <div className="text-white/50 text-xs mt-2">{member.desc}</div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

function TechPrincipleSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-2xl p-6"
    >
      <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
        <BookOpen className="w-6 h-6 text-cyan-400" />
        技术原理说明
      </h3>
      <div className="space-y-4">
        <div className="p-4 rounded-xl bg-gradient-to-r from-violet-500/10 to-purple-500/10 border border-violet-500/20">
          <h4 className="text-white font-medium mb-2 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-violet-500 flex items-center justify-center text-xs">1</span>
            多维度数据采集
          </h4>
          <p className="text-white/70 text-sm">
            基于认知心理学理论，通过行为数据、反应时间、选项模式等多维度采集用户测评数据，确保数据的全面性和准确性。
          </p>
        </div>
        <div className="p-4 rounded-xl bg-gradient-to-r from-pink-500/10 to-rose-500/10 border border-pink-500/20">
          <h4 className="text-white font-medium mb-2 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-pink-500 flex items-center justify-center text-xs">2</span>
            AI深度学习模型
          </h4>
          <p className="text-white/70 text-sm">
            采用Transformer架构的深度神经网络，结合280万+真实测评数据进行训练，模型准确率达到98.76%，远超行业平均水平。
          </p>
        </div>
        <div className="p-4 rounded-xl bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20">
          <h4 className="text-white font-medium mb-2 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-cyan-500 flex items-center justify-center text-xs">3</span>
            智能报告生成
          </h4>
          <p className="text-white/70 text-sm">
            基于大语言模型(LLM)的智能报告系统，能够生成个性化、专业化的测评报告，包含详细的分析建议和发展方向。
          </p>
        </div>
        <div className="p-4 rounded-xl bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20">
          <h4 className="text-white font-medium mb-2 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center text-xs">4</span>
            持续优化迭代
          </h4>
          <p className="text-white/70 text-sm">
            系统每周自动学习新的测评数据，持续优化模型参数，确保测评结果的时效性和准确性不断提升。
          </p>
        </div>
      </div>
    </motion.div>
  )
}

function SuccessCasesSection() {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-2xl p-6"
    >
      <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
        <Building2 className="w-6 h-6 text-amber-400" />
        成功案例
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {successCases.map((caseItem, index) => (
          <motion.div
            key={caseItem.company}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`p-5 rounded-xl cursor-pointer transition-all ${
              activeIndex === index
                ? 'bg-gradient-to-r from-violet-500/20 to-pink-500/20 border border-violet-500/30'
                : 'bg-white/5 hover:bg-white/10'
            }`}
            onClick={() => setActiveIndex(index)}
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl">{caseItem.logo}</span>
              <div>
                <div className="text-white font-medium">{caseItem.company}</div>
                <div className="text-white/50 text-xs">{caseItem.industry}</div>
              </div>
              <div className="ml-auto px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-medium">
                {caseItem.metrics}
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Quote className="w-4 h-4 text-white/30 flex-shrink-0 mt-1" />
              <p className="text-white/70 text-sm italic">{caseItem.quote}</p>
            </div>
            <div className="text-white/40 text-xs mt-3 text-right">— {caseItem.author}</div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

function AcademicSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-2xl p-6"
    >
      <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
        <FileText className="w-6 h-6 text-blue-400" />
        学术研究与行业奖项
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="text-white/80 text-sm mb-3 flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            学术论文发表
          </h4>
          <div className="space-y-3">
            {academicPapers.map((paper, index) => (
              <div key={index} className="p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                <div className="text-white text-sm font-medium">{paper.title}</div>
                <div className="flex items-center gap-3 mt-1 text-xs text-white/50">
                  <span>{paper.journal}</span>
                  <span>•</span>
                  <span>{paper.year}</span>
                  <span>•</span>
                  <span className="text-violet-400">引用 {paper.citations}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-white/80 text-sm mb-3 flex items-center gap-2">
            <Trophy className="w-4 h-4" />
            行业奖项
          </h4>
          <div className="space-y-3">
            {awards.map((award, index) => (
              <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-amber-500/20 to-orange-500/20 flex items-center justify-center">
                  <Trophy className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <div className="text-white text-sm font-medium">{award.name}</div>
                  <div className="text-white/50 text-xs">{award.org} · {award.year}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function SecuritySection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-2xl p-6"
    >
      <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
        <Lock className="w-6 h-6 text-green-400" />
        数据安全保障
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5">
            <CheckCircle className="w-5 h-5 text-green-400" />
            <div>
              <div className="text-white text-sm font-medium">端到端加密</div>
              <div className="text-white/50 text-xs">采用AES-256加密算法，数据传输全程加密</div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5">
            <CheckCircle className="w-5 h-5 text-green-400" />
            <div>
              <div className="text-white text-sm font-medium">数据脱敏</div>
              <div className="text-white/50 text-xs">敏感信息自动脱敏处理，保护用户隐私</div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5">
            <CheckCircle className="w-5 h-5 text-green-400" />
            <div>
              <div className="text-white text-sm font-medium">访问控制</div>
              <div className="text-white/50 text-xs">严格的权限管理，数据访问全程审计</div>
            </div>
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5">
            <CheckCircle className="w-5 h-5 text-green-400" />
            <div>
              <div className="text-white text-sm font-medium">多地容灾备份</div>
              <div className="text-white/50 text-xs">数据多地实时备份，确保数据永不丢失</div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5">
            <CheckCircle className="w-5 h-5 text-green-400" />
            <div>
              <div className="text-white text-sm font-medium">安全审计</div>
              <div className="text-white/50 text-xs">第三方年度安全审计，漏洞及时修复</div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5">
            <CheckCircle className="w-5 h-5 text-green-400" />
            <div>
              <div className="text-white text-sm font-medium">合规认证</div>
              <div className="text-white/50 text-xs">符合GDPR、网络安全法等法规要求</div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function ProfessionalCredibility() {
  const [activeSection, setActiveSection] = useState(0)

  const sections = [
    { id: 'metrics', label: '关键指标', icon: TrendingUp },
    { id: 'charts', label: '数据图表', icon: BarChart },
    { id: 'certifications', label: '资质认证', icon: Shield },
    { id: 'team', label: '专家团队', icon: GraduationCap },
    { id: 'tech', label: '技术原理', icon: BookOpen },
    { id: 'cases', label: '成功案例', icon: Building2 },
    { id: 'academic', label: '学术研究', icon: FileText },
    { id: 'security', label: '数据安全', icon: Lock },
  ]

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h2 className="text-2xl font-bold text-white mb-2">专业可信度展示</h2>
        <p className="text-white/60">数据驱动，专业认证，值得信赖</p>
      </motion.div>

      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {sections.map((section, index) => (
          <button
            key={section.id}
            onClick={() => setActiveSection(index)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-all ${
              activeSection === index
                ? 'bg-gradient-to-r from-violet-500 to-pink-500 text-white'
                : 'bg-white/10 text-white/70 hover:bg-white/20'
            }`}
            type="button"
          >
            <section.icon className="w-4 h-4" />
            {section.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {activeSection === 0 && <KeyMetricsSection />}
          {activeSection === 1 && <ChartsSection />}
          {activeSection === 2 && <CertificationSection />}
          {activeSection === 3 && <TeamSection />}
          {activeSection === 4 && <TechPrincipleSection />}
          {activeSection === 5 && <SuccessCasesSection />}
          {activeSection === 6 && <AcademicSection />}
          {activeSection === 7 && <SecuritySection />}
        </motion.div>
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex flex-wrap justify-center gap-6 pt-6 border-t border-white/10"
      >
        <div className="flex items-center gap-2 text-white/50 text-sm">
          <Globe className="w-4 h-4" />
          <span>服务全球 156 个国家</span>
        </div>
        <div className="flex items-center gap-2 text-white/50 text-sm">
          <Users className="w-4 h-4" />
          <span>超过 280 万用户信赖</span>
        </div>
        <div className="flex items-center gap-2 text-white/50 text-sm">
          <Clock className="w-4 h-4" />
          <span>7×24 小时技术支持</span>
        </div>
        <div className="flex items-center gap-2 text-white/50 text-sm">
          <Shield className="w-4 h-4" />
          <span>99.9% 系统可用性</span>
        </div>
      </motion.div>
    </div>
  )
}
