/**
 * ==============================================
 * 📊 测评报告渲染核心组件 - ReportTemplate.tsx
 * ==============================================
 * 
 * 【功能定位】
 * 这是整个测评系统的报告输出引擎，负责将计算器返回的原始数据
 * 转换成可视化的、人类可读的测评报告页面。
 * 
 * 【技术栈】
 * - framer-motion: 入场动画、转场效果、延迟渲染
 * - lucide-react: 统一图标系统 (Award/TrendingUp/Heart等)
 * - recharts: 数据可视化 (雷达图/柱状图/散点图等)
 * 
 * 【架构设计】
 * 1. 入口路由层: 根据assessmentType分发到对应报告组件
 * 2. 组件层: 每个测评一个独立的报告渲染函数
 * 3. 标准报告结构: 头部概览 → 雷达图 → 维度分析 → 金句/建议
 * 
 * 【文件规模】约2600行，15+个测评的报告渲染
 */

import { motion } from 'framer-motion'
import { Award, TrendingUp, Lightbulb, Briefcase, Target, Heart, Brain, User, Users, Shield, Compass, Zap, Activity, AlertTriangle, CheckCircle, Clock, BarChart3 } from 'lucide-react'
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell, CartesianGrid, ScatterChart, Scatter, Legend, AreaChart, Area } from 'recharts'
import type { SASResult, ECRResult, HollandResult } from '../utils/calculators'

// ==============================================
// 🎨 配色系统 - 每个测评有专属的色彩体系
// ==============================================

// SAS焦虑自评量表配色 - 琥珀红紫青警示色
const SAS_COLORS = {
  social_anxiety: '#f59e0b',
  somatic_anxiety: '#ef4444',
  cognitive_anxiety: '#8b5cf6',
  sleep_anxiety: '#06b6d4'
}

const SAS_DIMENSION_NAMES: Record<string, string> = {
  social_anxiety: '社交焦虑',
  somatic_anxiety: '躯体症状',
  cognitive_anxiety: '认知焦虑',
  sleep_anxiety: '睡眠困扰'
}

// ECR依恋类型配色 - 红蓝对立色
const ECR_COLORS = {
  anxiety: '#ef4444',
  avoidance: '#3b82f6'
}

const ECR_DIMENSION_NAMES: Record<string, string> = {
  anxiety_abandon: '被弃焦虑',
  anxiety_need: '情感需求',
  avoidance_close: '亲密回避',
  avoidance_independent: '独立需求'
}

// 霍兰德职业兴趣配色 - 彩虹6色区分6种人格
const HOLLAND_COLORS: Record<string, string> = {
  R: '#ef4444',
  I: '#3b82f6',
  A: '#8b5cf6',
  S: '#10b981',
  E: '#f59e0b',
  C: '#06b6d4'
}

const HOLLAND_NAMES: Record<string, string> = {
  R: '现实型',
  I: '研究型',
  A: '艺术型',
  S: '社会型',
  E: '企业型',
  C: '常规型'
}

// ==============================================
// 🔀 报告路由分发层 - 核心入口
// ==============================================
// 根据测评ID路由到对应的报告渲染组件
// 这是整个报告系统的调度中心

interface ReportTemplateProps {
  result: any          // 计算器返回的完整结果对象
  assessmentType: string  // 测评唯一ID，用于分支判断
  mode?: string
}

/**
 * 主入口组件 - 调度所有测评报告
 * 设计模式：策略模式 + 责任链
 * 按照匹配优先级从上到下依次判断
 */
export default function ReportTemplate({ result, assessmentType }: ReportTemplateProps) {
  // ---------- 专业心理测评系列 ----------
  if (assessmentType === 'sas-standard') {
    return <SASReport result={result as SASResult} />
  }

  if (assessmentType === 'ecr-attachment') {
    return <ECRReport result={result as ECRResult} />
  }

  if (assessmentType === 'holland-sds') {
    return <HollandReport result={result as HollandResult} />
  }

  // ---------- 趣味/职场测评系列 ----------
  if (assessmentType === 'officialdom-dream') {
    return <OfficialdomReport result={result} />
  }

  if (assessmentType === 'gma-maturity') {
    return <GMAReport result={result} />
  }

  if (assessmentType === 'cast-parenting') {
    return <CASTReport result={result} />
  }

  if (assessmentType === 'ideology-9square') {
    return <IdeologyReport result={result} />
  }

  // ---------- 智力/人格测评系列 ----------
  if (assessmentType === 'iq-ravens') {
    return <IQReport result={result} />
  }

  if (assessmentType === 'eq-goleman') {
    return <EQReport result={result} />
  }

  if (assessmentType === 'dark-triad') {
    return <DarkTriadReport result={result} />
  }

  if (assessmentType === 'ocean-bigfive') {
    return <OceanReport result={result} />
  }

  // ---------- 六大奇葩测评 ----------
  if (assessmentType === 'life-meaning')      return <LifeMeaningReport result={result} />    // 人生意义感
  if (assessmentType === 'patriotism-purity') return <PatriotismReport result={result} />    // 爱国主义纯度
  if (assessmentType === 'slacking-purity')   return <SlackingReport result={result} />      // 摸鱼纯度
  if (assessmentType === 'foodie-level')      return <FoodieReport result={result} />         // 干饭人等级
  if (assessmentType === 'internet-addiction')return <InternetAddictionReport result={result} /> // 网瘾程度
  if (assessmentType === 'sexual-experience') return <SexualExperienceReport result={result} /> // 性经验指数

  // ---------- 新增趣味测评 - 修复报告空白bug ----------
  if (assessmentType === 'color-subconscious') return <ColorSubconsciousReport result={result} />   // 颜色潜意识
  if (assessmentType === 'abm-love-animal')   return <AbmLoveAnimalReport result={result} />       // ABM恋爱动物
  if (assessmentType === 'mental-age')        return <MentalAgeReport result={result} />            // 精神年龄
  if (assessmentType === 'sbti-personality')  return <SBTIPersonalityReport result={result} />      // SBTI傻屌人格

  // ---------- 兜底 fallback ----------
  // 所有未注册的测评都会走到这里
  // 注意：新测评没加分支的话就只显示标题+描述！
  return <DefaultReport result={result} />
}

function SASReport({ result }: { result: SASResult }) {
  const radarData = result.radarData.map(d => ({
    ...d,
    dimension: SAS_DIMENSION_NAMES[d.dimension] || d.dimension
  }))

  const levelConfig = {
    normal: { color: 'from-green-500 to-emerald-500', text: '正常范围', icon: CheckCircle },
    mild: { color: 'from-yellow-500 to-amber-500', text: '轻度焦虑', icon: Activity },
    moderate: { color: 'from-orange-500 to-red-500', text: '中度焦虑', icon: AlertTriangle },
    severe: { color: 'from-red-500 to-rose-600', text: '重度焦虑', icon: Shield }
  }

  const config = levelConfig[result.level]
  const Icon = config.icon

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 border border-white/10"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-amber-500/20 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        
        <div className="relative flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${config.color} flex items-center justify-center shadow-2xl`}>
            <Icon className="w-10 h-10 text-white" />
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className={`px-3 py-1 rounded-full bg-gradient-to-r ${config.color} text-white text-sm font-semibold`}>
                {config.text}
              </span>
              <span className="text-white/40 text-sm">标准分 {result.standardScore}</span>
              <span className="text-white/40 text-sm">超过 {result.percentile}% 常模人群</span>
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">SAS焦虑测评专业报告</h2>
            <p className="text-white/60 leading-relaxed max-w-2xl">{result.interpretation}</p>
          </div>

          <div className="text-center">
            <div className="text-5xl font-black bg-gradient-to-r from-amber-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
              {result.standardScore}
            </div>
            <div className="text-white/40 text-sm mt-1">焦虑指数</div>
          </div>
        </div>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 border border-white/10"
        >
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Target className="w-6 h-6 text-amber-400" />
            焦虑维度雷达图
          </h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="rgba(255,255,255,0.08)" />
                <PolarAngleAxis dataKey="dimension" tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 12 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: 'rgba(255,255,255,0.4)' }} />
                <defs>
                  <linearGradient id="sasGradient" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.9} />
                    <stop offset="50%" stopColor="#ef4444" stopOpacity={0.7} />
                    <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0.5} />
                  </linearGradient>
                </defs>
                <Radar 
                  name="焦虑程度" 
                  dataKey="score" 
                  stroke="#f59e0b" 
                  fill="url(#sasGradient)" 
                  fillOpacity={0.6} 
                  strokeWidth={3}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(15, 23, 42, 0.95)', 
                    border: '1px solid rgba(245, 158, 11, 0.3)',
                    borderRadius: '12px',
                    color: '#fff',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
                  }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15 }}
          className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 border border-white/10"
        >
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-cyan-400" />
            各维度详细分析
          </h3>
          <div className="space-y-4">
            {Object.entries(result.dimensions as Record<string, { percentage: number; level: string }>).map(([key, dim], index) => {
              const color = SAS_COLORS[key as keyof typeof SAS_COLORS]
              return (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="bg-white/5 rounded-xl p-4 border border-white/5"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white font-semibold">{SAS_DIMENSION_NAMES[key]}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold" style={{ color }}>{dim.percentage}%</span>
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                        dim.level === '低' ? 'bg-green-500/20 text-green-400' :
                        dim.level === '中' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-red-500/20 text-red-400'
                      }`}>
                        {dim.level}
                      </span>
                    </div>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-1000"
                      style={{ 
                        width: `${dim.percentage}%`,
                        background: `linear-gradient(90deg, ${color}, ${color}88)`
                      }}
                    />
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="rounded-3xl bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-red-500/10 p-8 border border-amber-500/20"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
            <AlertTriangle className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-bold text-white">重要提示</h3>
        </div>
        <div className="bg-white/5 rounded-xl p-6 border border-amber-500/10">
          <p className="text-amber-200/90 leading-relaxed text-lg">{result.warning}</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="rounded-3xl bg-gradient-to-br from-green-500/10 via-emerald-500/5 to-teal-500/10 p-8 border border-green-500/20"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
            <Lightbulb className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-bold text-white">专业调节建议</h3>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {result.recommendations.map((rec, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 + index * 0.1 }}
              className="flex items-start gap-4 bg-white/5 rounded-xl p-5 border border-white/5"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                {index + 1}
              </div>
              <p className="text-white/80 leading-relaxed">{rec}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

function ECRReport({ result }: { result: ECRResult }) {
  const radarData = result.radarData.map(d => ({
    ...d,
    dimension: ECR_DIMENSION_NAMES[d.dimension] || d.dimension
  }))

  const quadrantData = [{ x: result.quadrantPosition.x, y: result.quadrantPosition.y }]
  
  const quadrantLabels = [
    { x: 30, y: 30, type: '安全型', color: '#10b981' },
    { x: 70, y: 30, type: '恐惧型', color: '#ef4444' },
    { x: 30, y: 70, type: '专注型', color: '#f59e0b' },
    { x: 70, y: 70, type: '冷漠型', color: '#3b82f6' }
  ]

  const typeColors: Record<string, string> = {
    secure: 'from-green-500 to-emerald-500',
    preoccupied: 'from-amber-500 to-orange-500',
    dismissive: 'from-blue-500 to-cyan-500',
    fearful: 'from-red-500 to-rose-500'
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-rose-900/20 to-slate-900 p-8 border border-white/10"
      >
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-pink-500/20 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        
        <div className="relative flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${typeColors[result.attachmentType]} flex items-center justify-center shadow-2xl`}>
            <Heart className="w-10 h-10 text-white" />
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className={`px-3 py-1 rounded-full bg-gradient-to-r ${typeColors[result.attachmentType]} text-white text-sm font-semibold flex items-center gap-2`}>
                {result.attachmentTypeEmoji} {result.attachmentTypeName}
              </span>
              <span className="text-white/40 text-sm">焦虑 {result.anxietyPercentage}%</span>
              <span className="text-white/40 text-sm">回避 {result.avoidancePercentage}%</span>
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">成人依恋风格专业报告</h2>
            <p className="text-white/60 leading-relaxed max-w-2xl">{result.typeDescription}</p>
          </div>

          <div className="text-center">
            <div className="text-5xl">{result.attachmentTypeEmoji}</div>
            <div className="text-white/40 text-sm mt-1">依恋类型</div>
          </div>
        </div>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 border border-white/10"
        >
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Target className="w-6 h-6 text-pink-400" />
            依恋四象限定位图
          </h3>
          <div className="relative h-72">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 30, right: 30, bottom: 30, left: 30 }}>
                <defs>
                  <radialGradient id="ecrGlow">
                    <stop offset="0%" stopColor="#ec4899" stopOpacity={0.8} />
                    <stop offset="100%" stopColor="#ec4899" stopOpacity={0} />
                  </radialGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
                <XAxis 
                  type="number" 
                  dataKey="x" 
                  name="焦虑维度" 
                  domain={[0, 100]} 
                  tick={{ fill: 'rgba(255,255,255,0.5)' }}
                  label={{ value: '焦虑 →', position: 'insideBottomRight', fill: 'rgba(255,255,255,0.6)' }}
                />
                <YAxis 
                  type="number" 
                  dataKey="y" 
                  name="回避维度" 
                  domain={[0, 100]} 
                  tick={{ fill: 'rgba(255,255,255,0.5)' }}
                  label={{ value: '← 回避', angle: -90, position: 'insideLeft', fill: 'rgba(255,255,255,0.6)' }}
                />
                <Tooltip 
                  cursor={{ strokeDasharray: '3 3' }}
                  contentStyle={{ 
                    backgroundColor: 'rgba(15, 23, 42, 0.95)', 
                    border: '1px solid rgba(236, 72, 153, 0.3)',
                    borderRadius: '12px',
                    color: '#fff'
                  }}
                  formatter={(value: number) => [`${value.toFixed(1)}%`, '']}
                />
                <Scatter name="你的位置" data={quadrantData} fill="#ec4899" />
              </ScatterChart>
            </ResponsiveContainer>
            {quadrantLabels.map((q, i) => (
              <div
                key={i}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 text-sm font-bold opacity-30"
                style={{
                  left: `${10 + q.x * 0.8}%`,
                  top: `${90 - q.y * 0.8}%`,
                  color: q.color
                }}
              >
                {q.type}
              </div>
            ))}
          </div>
          <div className="flex justify-around mt-4 pt-4 border-t border-white/10">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-400">{result.anxietyPercentage}%</div>
              <div className="text-white/50 text-sm">焦虑维度</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">{result.avoidancePercentage}%</div>
              <div className="text-white/50 text-sm">回避维度</div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15 }}
          className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 border border-white/10"
        >
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-violet-400" />
            子维度雷达图
          </h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="rgba(255,255,255,0.08)" />
                <PolarAngleAxis dataKey="dimension" tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 12 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: 'rgba(255,255,255,0.4)' }} />
                <defs>
                  <linearGradient id="ecrGradient" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#ec4899" stopOpacity={0.9} />
                    <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0.6} />
                  </linearGradient>
                </defs>
                <Radar 
                  name="得分" 
                  dataKey="score" 
                  stroke="#ec4899" 
                  fill="url(#ecrGradient)" 
                  fillOpacity={0.6} 
                  strokeWidth={3}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(15, 23, 42, 0.95)', 
                    border: '1px solid rgba(139, 92, 246, 0.3)',
                    borderRadius: '12px',
                    color: '#fff'
                  }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-3xl bg-gradient-to-br from-green-500/10 via-emerald-500/5 to-teal-500/10 p-8 border border-green-500/20"
        >
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Award className="w-6 h-6 text-green-400" />
            关系优势
          </h3>
          <div className="space-y-3">
            {result.strengthAnalysis.map((strength, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25 + index * 0.1 }}
                className="flex items-start gap-3"
              >
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-green-400 to-emerald-400 mt-2" />
                <span className="text-white/80 leading-relaxed">{strength}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-3xl bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-yellow-500/10 p-8 border border-amber-500/20"
        >
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-amber-400" />
            成长空间
          </h3>
          <div className="space-y-3">
            {result.growthAreas.map((area, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25 + index * 0.1 }}
                className="flex items-start gap-3"
              >
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-amber-400 to-orange-400 mt-2" />
                <span className="text-white/80 leading-relaxed">{area}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="rounded-3xl bg-gradient-to-br from-pink-500/10 via-rose-500/5 to-violet-500/10 p-8 border border-pink-500/20"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center">
            <Users className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-bold text-white">亲密关系经营建议</h3>
        </div>
        <div className="bg-white/5 rounded-xl p-6 border border-pink-500/10">
          <p className="text-pink-100/90 leading-relaxed text-lg">{result.relationshipAdvice}</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 border border-white/10"
      >
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <User className="w-6 h-6 text-violet-400" />
          名人案例
        </h3>
        <div className="flex flex-wrap gap-3">
          {result.famousExamples.map((name, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.45 + index * 0.05 }}
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-violet-500/20 to-pink-500/20 border border-violet-500/30 text-white/80 font-medium"
            >
              {name}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

function HollandReport({ result }: { result: HollandResult }) {
  const hexagonData = result.hexagonData.map(d => ({
    ...d,
    type: HOLLAND_NAMES[d.type] || d.type
  }))

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-cyan-900/20 to-slate-900 p-8 border border-white/10"
      >
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-cyan-500/20 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        
        <div className="relative flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-500 via-blue-500 to-violet-500 flex items-center justify-center shadow-2xl">
            <Briefcase className="w-10 h-10 text-white" />
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2 flex-wrap">
              <span className="px-3 py-1 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-sm font-semibold">
                霍兰德代码: {result.code}
              </span>
              {result.topThree.map((code, i) => (
                <span 
                  key={code}
                  className="px-3 py-1 rounded-full text-white text-sm font-bold"
                  style={{ backgroundColor: HOLLAND_CODES[code] + '40', color: HOLLAND_CODES[code] }}
                >
                  {i + 1}. {HOLLAND_NAMES[code]}
                </span>
              ))}
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">职业兴趣专业报告</h2>
            <p className="text-white/60 leading-relaxed max-w-2xl">{result.personalityProfile}</p>
          </div>

          <div className="text-center">
            <div className="text-4xl font-black bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400 bg-clip-text text-transparent">
              {result.code}
            </div>
            <div className="text-white/40 text-sm mt-1">RIASEC代码</div>
          </div>
        </div>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 border border-white/10"
        >
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Compass className="w-6 h-6 text-cyan-400" />
            霍兰德六边形模型
          </h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={hexagonData}>
                <PolarGrid stroke="rgba(255,255,255,0.08)" />
                <PolarAngleAxis 
                  dataKey="type" 
                  tick={{ fill: 'rgba(255,255,255,0.8)', fontSize: 12, fontWeight: 'bold' }} 
                />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: 'rgba(255,255,255,0.4)' }} />
                <defs>
                  <linearGradient id="hollandGradient" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#06b6d4" stopOpacity={0.9} />
                    <stop offset="33%" stopColor="#3b82f6" stopOpacity={0.7} />
                    <stop offset="66%" stopColor="#8b5cf6" stopOpacity={0.6} />
                    <stop offset="100%" stopColor="#10b981" stopOpacity={0.5} />
                  </linearGradient>
                </defs>
                <Radar 
                  name="兴趣强度" 
                  dataKey="score" 
                  stroke="#06b6d4" 
                  fill="url(#hollandGradient)" 
                  fillOpacity={0.6} 
                  strokeWidth={3}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(15, 23, 42, 0.95)', 
                    border: '1px solid rgba(6, 182, 212, 0.3)',
                    borderRadius: '12px',
                    color: '#fff',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
                  }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15 }}
          className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 border border-white/10"
        >
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-emerald-400" />
            维度强度分布
          </h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={result.hexagonData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" horizontal={false} />
                <XAxis type="number" domain={[0, 100]} tick={{ fill: 'rgba(255,255,255,0.5)' }} />
                <YAxis 
                  dataKey="type" 
                  type="category" 
                  tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 12 }}
                  width={60}
                  tickFormatter={(value) => HOLLAND_NAMES[value]}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(15, 23, 42, 0.95)', 
                    border: '1px solid rgba(16, 185, 129, 0.3)',
                    borderRadius: '12px',
                    color: '#fff'
                  }}
                  formatter={(value: number) => [`${value}%`, '兴趣强度']}
                  labelFormatter={(value) => HOLLAND_NAMES[value] || value}
                />
                <Bar dataKey="score" radius={[0, 8, 8, 0]} barSize={24}>
                  {result.hexagonData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={HOLLAND_COLORS[entry.type]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 border border-white/10"
      >
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Brain className="w-6 h-6 text-violet-400" />
          类型深度解读
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          {result.typeDescriptions.map((type, index) => (
            <motion.div
              key={type.type}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 + index * 0.1 }}
              className="rounded-xl p-6 border"
              style={{ 
                backgroundColor: `${HOLLAND_COLORS[type.type]}15`,
                borderColor: `${HOLLAND_COLORS[type.type]}40`
              }}
            >
              <div 
                className="inline-flex px-3 py-1 rounded-lg text-white text-sm font-bold mb-3"
                style={{ backgroundColor: HOLLAND_COLORS[type.type] }}
              >
                {type.type} - {type.name}
              </div>
              <p className="text-white/70 leading-relaxed">{type.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 border border-white/10"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-bold text-white">核心特质</h3>
        </div>
        <div className="flex flex-wrap gap-3">
          {result.coreTraits.map((trait, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.35 + index * 0.03 }}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 text-amber-200 font-medium"
            >
              {trait}
            </motion.div>
          ))}
        </div>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="rounded-3xl bg-gradient-to-br from-emerald-500/10 via-green-500/5 to-teal-500/10 p-8 border border-emerald-500/20"
        >
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Award className="w-6 h-6 text-emerald-400" />
            核心推荐职业
          </h3>
          <div className="space-y-2">
            {result.careerRecommendations.primary.map((career, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.45 + index * 0.1 }}
                className="flex items-center gap-3 px-4 py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20"
              >
                <div className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="text-white/80">{career}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="rounded-3xl bg-gradient-to-br from-blue-500/10 via-cyan-500/5 to-sky-500/10 p-8 border border-blue-500/20"
        >
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Briefcase className="w-6 h-6 text-blue-400" />
            次级匹配职业
          </h3>
          <div className="space-y-2">
            {result.careerRecommendations.secondary.map((career, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 + index * 0.1 }}
                className="flex items-center gap-3 px-4 py-3 rounded-xl bg-blue-500/10 border border-blue-500/20"
              >
                <div className="w-2 h-2 rounded-full bg-blue-400" />
                <span className="text-white/80">{career}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="rounded-3xl bg-gradient-to-br from-violet-500/10 via-purple-500/5 to-pink-500/10 p-8 border border-violet-500/20"
        >
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Compass className="w-6 h-6 text-violet-400" />
            可探索方向
          </h3>
          <div className="space-y-2">
            {result.careerRecommendations.exploring.map((career, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.45 + index * 0.1 }}
                className="flex items-center gap-3 px-4 py-3 rounded-xl bg-violet-500/10 border border-violet-500/20"
              >
                <div className="w-2 h-2 rounded-full bg-violet-400" />
                <span className="text-white/80">{career}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="rounded-3xl bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-violet-500/10 p-8 border border-cyan-500/20"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
            <Target className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-bold text-white">理想工作环境</h3>
        </div>
        <div className="bg-white/5 rounded-xl p-6 border border-cyan-500/10">
          <p className="text-cyan-100/90 leading-relaxed text-lg">{result.workEnvironmentTips}</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55 }}
        className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 border border-white/10"
      >
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Lightbulb className="w-6 h-6 text-amber-400" />
          职业发展建议
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {result.developmentAdvice.map((advice, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              className="flex items-start gap-4 bg-white/5 rounded-xl p-5 border border-white/5"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                {index + 1}
              </div>
              <p className="text-white/80 leading-relaxed">{advice}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

const OFFICIALDOM_DIMENSION_NAMES: Record<string, string> = {
  dominance: '支配欲',
  riskAversion: '风险规避',
  emotionalSuppression: '情绪压制',
  ambiguityTolerance: '模糊耐受',
  machiavellianism: '权谋智慧',
}

const OFFICIALDOM_COLORS: Record<string, string> = {
  dominance: '#ef4444',
  riskAversion: '#f59e0b',
  emotionalSuppression: '#3b82f6',
  ambiguityTolerance: '#8b5cf6',
  machiavellianism: '#06b6d4',
}

function OfficialdomReport({ result }: { result: any }) {
  const radarData = Object.entries(result.dimensions || {}).map(([key, value]) => ({
    dimension: OFFICIALDOM_DIMENSION_NAMES[key] || key,
    score: Math.round((value as number) * 100 / 5)
  }))

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-amber-900/20 to-slate-900 p-8 border border-amber-500/20"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-amber-500/20 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        
        <div className="relative flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-500 via-yellow-500 to-orange-500 flex items-center justify-center shadow-2xl shadow-amber-500/30">
            <Award className="w-10 h-10 text-white" />
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className="px-3 py-1 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 text-white text-sm font-semibold">
                {result.archetype || '官场达人'}
              </span>
              <span className="text-white/40 text-sm">{result.archetypeTitle || ''}</span>
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">{result.typeName || 'D.R.E.A.M 官场人格测评报告'}</h2>
            <p className="text-white/60 leading-relaxed max-w-2xl">{result.description || ''}</p>
          </div>

          <div className="text-center">
            <div className="text-5xl font-black bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-400 bg-clip-text text-transparent">
              {result.totalScore || '-'}
            </div>
            <div className="text-white/40 text-sm mt-1">官场生存指数</div>
          </div>
        </div>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 border border-white/10"
        >
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Target className="w-6 h-6 text-amber-400" />
            五维人格雷达图
          </h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="rgba(255,255,255,0.08)" />
                <PolarAngleAxis dataKey="dimension" tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 12 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: 'rgba(255,255,255,0.4)' }} />
                <defs>
                  <linearGradient id="officialdomGradient" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#ef4444" stopOpacity={0.9} />
                    <stop offset="50%" stopColor="#f59e0b" stopOpacity={0.7} />
                    <stop offset="100%" stopColor="#06b6d4" stopOpacity={0.5} />
                  </linearGradient>
                </defs>
                <Radar 
                  name="得分" 
                  dataKey="score" 
                  stroke="#f59e0b" 
                  fill="url(#officialdomGradient)" 
                  fillOpacity={0.6} 
                  strokeWidth={3}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(15, 23, 42, 0.95)', 
                    border: '1px solid rgba(245, 158, 11, 0.3)',
                    borderRadius: '12px',
                    color: '#fff'
                  }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15 }}
          className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 border border-white/10"
        >
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Users className="w-6 h-6 text-violet-400" />
            官场原型分析
          </h3>
          <div className="bg-white/5 rounded-xl p-6 border border-amber-500/20 mb-4">
            <h4 className="text-xl font-bold text-amber-400 mb-3">{result.archetype || '未知类型'}</h4>
            <p className="text-white/80 leading-relaxed">{result.archetypeDescription || ''}</p>
          </div>
          <div>
            <h5 className="text-white/60 text-sm mb-3">历史著名同僚：</h5>
            <div className="flex flex-wrap gap-2">
              {(result.famousPeers || []).map((name: string, i: number) => (
                <span key={i} className="px-3 py-1.5 rounded-lg bg-amber-500/20 text-amber-300 text-sm">
                  {name}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 border border-white/10"
      >
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <BarChart3 className="w-6 h-6 text-cyan-400" />
          各维度深度解析
        </h3>
        <div className="grid md:grid-cols-5 gap-4">
          {Object.entries(result.dimensionDescriptions || {}).map(([key, desc], i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 + i * 0.1 }}
              className="bg-white/5 rounded-xl p-4 border border-white/5"
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-3" style={{ backgroundColor: OFFICIALDOM_COLORS[key] + '30' }}>
                <span className="text-xl font-bold" style={{ color: OFFICIALDOM_COLORS[key] }}>{Math.round((result.dimensions[key] as number) * 20)}</span>
              </div>
              <h5 className="text-white font-semibold mb-2">{OFFICIALDOM_DIMENSION_NAMES[key]}</h5>
              <p className="text-white/60 text-sm leading-relaxed">{desc as string}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="rounded-3xl bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-cyan-500/10 p-8 border border-emerald-500/20"
      >
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Lightbulb className="w-6 h-6 text-emerald-400" />
          官场生存指南
        </h3>
        <p className="text-emerald-100/90 leading-relaxed text-lg">{result.survivalGuide || ''}</p>
      </motion.div>
    </div>
  )
}

const GMA_DIMENSION_NAMES: Record<string, string> = {
  tableManner: '饭桌礼仪',
  speakingArt: '说话艺术',
  giftGiving: '送礼学问',
  eyeContact: '察言观色',
  drinkingCulture: '酒桌文化',
}

const GMA_COLORS: Record<string, string> = {
  tableManner: '#ef4444',
  speakingArt: '#f59e0b',
  giftGiving: '#10b981',
  eyeContact: '#3b82f6',
  drinkingCulture: '#8b5cf6',
}

function GMAReport({ result }: { result: any }) {
  const radarData = Object.entries(result.dimensions || {}).map(([key, value]) => ({
    dimension: GMA_DIMENSION_NAMES[key] || key,
    score: Math.round((value as number) * 100 / 5)
  }))

  const levelConfig = {
    legend: { color: 'from-yellow-500 to-amber-500', text: '传说级' },
    master: { color: 'from-violet-500 to-purple-500', text: '大师级' },
    adept: { color: 'from-blue-500 to-cyan-500', text: '能手级' },
    normal: { color: 'from-green-500 to-emerald-500', text: '普通级' },
    novice: { color: 'from-orange-500 to-red-500', text: '新手级' },
    danger: { color: 'from-red-500 to-rose-600', text: '危险人类' },
  }

  const config = levelConfig[result.classification as keyof typeof levelConfig] || levelConfig.normal

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-violet-900/20 to-slate-900 p-8 border border-violet-500/20"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-violet-500/20 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        
        <div className="relative flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${config.color} flex items-center justify-center shadow-2xl`}>
            <Brain className="w-10 h-10 text-white" />
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className={`px-3 py-1 rounded-full bg-gradient-to-r ${config.color} text-white text-sm font-semibold`}>
                {config.text}
              </span>
              <span className="text-white/40 text-sm">GMA 指数 {result.gmaScore || '-'}</span>
              <span className="text-white/40 text-sm">超过 {result.percentile || 0}% 人群</span>
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">人情世故成熟能力测评报告</h2>
            <p className="text-white/60 leading-relaxed max-w-2xl">{result.interpretation || ''}</p>
          </div>

          <div className="text-center">
            <div className="text-5xl font-black bg-gradient-to-r from-violet-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              {result.gmaScore || '-'}
            </div>
            <div className="text-white/40 text-sm mt-1">GMA 指数</div>
          </div>
        </div>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 border border-white/10"
        >
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Target className="w-6 h-6 text-violet-400" />
            五维能力雷达图
          </h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="rgba(255,255,255,0.08)" />
                <PolarAngleAxis dataKey="dimension" tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 12 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: 'rgba(255,255,255,0.4)' }} />
                <defs>
                  <linearGradient id="gmaGradient" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.9} />
                    <stop offset="50%" stopColor="#ec4899" stopOpacity={0.7} />
                    <stop offset="100%" stopColor="#f59e0b" stopOpacity={0.5} />
                  </linearGradient>
                </defs>
                <Radar 
                  name="得分" 
                  dataKey="score" 
                  stroke="#8b5cf6" 
                  fill="url(#gmaGradient)" 
                  fillOpacity={0.6} 
                  strokeWidth={3}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(15, 23, 42, 0.95)', 
                    border: '1px solid rgba(139, 92, 246, 0.3)',
                    borderRadius: '12px',
                    color: '#fff'
                  }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15 }}
          className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 border border-white/10"
        >
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Activity className="w-6 h-6 text-cyan-400" />
            GMA 段位对照表
          </h3>
          <div className="space-y-3">
            {[
              { score: 145, title: '传说级', desc: '地表最强人情世故天花板' },
              { score: 130, title: '大师级', desc: '行走的社会生存百科全书' },
              { score: 115, title: '能手级', desc: '成熟稳重的社会人' },
              { score: 85, title: '普通级', desc: '基本合格的成年人' },
              { score: 70, title: '新手级', desc: '还需要历练的年轻人' },
              { score: 0, title: '危险人类', desc: '建议远离大型人类聚集区' },
            ].map((level, i) => (
              <div key={i} className={`flex items-center gap-4 p-3 rounded-xl ${result.gmaScore >= level.score ? 'bg-violet-500/20 border border-violet-500/30' : 'bg-white/5'}`}>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: result.gmaScore >= level.score ? '#8b5cf6' : '#334155' }}>
                  {result.gmaScore >= level.score ? '✓' : i + 1}
                </div>
                <div className="flex-1">
                  <div className="text-white font-semibold">{level.title}</div>
                  <div className="text-white/50 text-sm">{level.desc}</div>
                </div>
                <div className="text-white/40 text-sm">≥{level.score}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 border border-white/10"
      >
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Lightbulb className="w-6 h-6 text-amber-400" />
          人生建议
        </h3>
        <div className="space-y-3">
          {(result.advice || []).map((item: string, i: number) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="flex items-start gap-3"
            >
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-amber-400 to-orange-400 mt-2 flex-shrink-0" />
              <p className="text-white/80 leading-relaxed">{item}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

const CAST_DIMENSION_NAMES: Record<string, string> = {
  reportAnxiety: '报班焦虑',
  comparisonMania: '攀比狂热',
  classObsession: '阶层执念',
  moralityKidnapping: '道德绑架',
}

const CAST_COLORS: Record<string, string> = {
  reportAnxiety: '#ef4444',
  comparisonMania: '#f59e0b',
  classObsession: '#3b82f6',
  moralityKidnapping: '#ec4899',
}

function CASTReport({ result }: { result: any }) {
  const radarData = result.radarData || Object.entries(result.dimensions || {}).map(([key, value]) => ({
    dimension: CAST_DIMENSION_NAMES[key] || key,
    score: value as number,
    fullMark: 100,
  }))

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-rose-900/20 to-slate-900 p-8 border border-rose-500/20"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-rose-500/20 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        
        <div className="relative flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-rose-500 via-pink-500 to-fuchsia-500 flex items-center justify-center shadow-2xl shadow-rose-500/30">
            <Heart className="w-10 h-10 text-white" />
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2 flex-wrap">
              <span className="px-3 py-1 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 text-white text-sm font-semibold">
                {result.classificationEmoji} {result.classificationText || result.classification || '典型家长'}
              </span>
              <span className="text-white/40 text-sm">CAST 指数 {result.castIndex || '-'}</span>
              <span className="text-white/40 text-sm">超过 {result.percentile || 0}% 家长</span>
              {result.parentingStyleArchetype && (
                <span className="px-3 py-1 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white text-sm font-semibold">
                  {result.parentingStyleArchetype.emoji} {result.parentingStyleArchetype.name}
                </span>
              )}
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">中国式家长教养方式测评报告</h2>
            <p className="text-white/60 leading-relaxed max-w-2xl">{result.typeDescription || ''}</p>
          </div>

          <div className="text-center">
            <div className="text-5xl font-black bg-gradient-to-r from-rose-400 via-pink-400 to-fuchsia-400 bg-clip-text text-transparent">
              {result.castIndex || '-'}
            </div>
            <div className="text-white/40 text-sm mt-1">CAST 指数</div>
          </div>
        </div>
      </motion.div>

      {result.interpretiveNotes && result.interpretiveNotes.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          className="rounded-3xl bg-gradient-to-br from-amber-500/10 via-yellow-500/5 to-orange-500/10 p-6 border border-amber-500/20"
        >
          <div className="flex flex-wrap gap-3">
            {result.interpretiveNotes.map((note: string, i: number) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 + i * 0.05 }}
                className="px-4 py-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-100 text-sm font-medium"
              >
                {note}
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {result.parentingMatrix && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 border border-white/10"
        >
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Activity className="w-6 h-6 text-cyan-400" />
            教养矩阵三维分析
          </h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-rose-500/10 to-pink-500/10 border border-rose-500/20">
              <div className="text-rose-400 text-sm font-semibold mb-2">控制水平</div>
              <div className="text-white text-2xl font-bold">{result.parentingMatrix.controlLevel}</div>
            </div>
            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/20">
              <div className="text-amber-400 text-sm font-semibold mb-2">焦虑水平</div>
              <div className="text-white text-2xl font-bold">{result.parentingMatrix.anxietyLevel}</div>
            </div>
            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20">
              <div className="text-green-400 text-sm font-semibold mb-2">温暖水平</div>
              <div className="text-white text-2xl font-bold">{result.parentingMatrix.warmthLevel}</div>
            </div>
          </div>
          {result.parentingStyleArchetype && (
            <div className="mt-6 p-6 rounded-xl bg-gradient-to-br from-violet-500/10 to-fuchsia-500/10 border border-violet-500/20">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">{result.parentingStyleArchetype.emoji}</span>
                <span className="text-white text-xl font-bold">{result.parentingStyleArchetype.name}教养风格</span>
              </div>
              <p className="text-violet-100 leading-relaxed">{result.parentingStyleArchetype.description}</p>
            </div>
          )}
        </motion.div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15 }}
          className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 border border-white/10"
        >
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Target className="w-6 h-6 text-rose-400" />
            四维教养雷达图
          </h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="rgba(255,255,255,0.08)" />
                <PolarAngleAxis dataKey="dimension" tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 12 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: 'rgba(255,255,255,0.4)' }} />
                <defs>
                  <linearGradient id="castGradient" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#ef4444" stopOpacity={0.9} />
                    <stop offset="50%" stopColor="#ec4899" stopOpacity={0.7} />
                    <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0.5} />
                  </linearGradient>
                </defs>
                <Radar 
                  name="得分" 
                  dataKey="score" 
                  stroke="#ec4899" 
                  fill="url(#castGradient)" 
                  fillOpacity={0.6} 
                  strokeWidth={3}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(15, 23, 42, 0.95)', 
                    border: '1px solid rgba(236, 72, 153, 0.3)',
                    borderRadius: '12px',
                    color: '#fff'
                  }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 border border-white/10"
        >
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-cyan-400" />
            孩子未来预测
          </h3>
          <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-xl p-6 border border-cyan-500/20">
            <p className="text-cyan-100 leading-relaxed text-lg">{result.childFutureProjection || ''}</p>
          </div>
          <div className="mt-4 p-4 rounded-xl bg-white/5">
            <p className="text-white/60 text-sm italic">* 以上预测基于本测评纯学术计算，不构成任何实质性教育建议</p>
          </div>
        </motion.div>
      </div>

      {result.subDimensions && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 border border-white/10"
        >
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-blue-400" />
            十六项子维度深度解析
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {Object.entries(result.subDimensions || {}).map(([dimKey, subDims], dimIndex) => (
              <motion.div
                key={dimKey}
                initial={{ opacity: 0, x: dimIndex % 2 === 0 ? -10 : 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + dimIndex * 0.05 }}
                className="p-5 rounded-xl bg-white/5 border border-white/10"
              >
                <div className="text-white font-semibold mb-3">{CAST_DIMENSION_NAMES[dimKey] || dimKey}</div>
                <div className="space-y-2">
                  {(subDims as any[]).map((sub: any, i: number) => (
                    <div key={i} className="flex items-center justify-between">
                      <span className="text-white/60 text-sm">{sub.name}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-2 rounded-full bg-white/10 overflow-hidden">
                          <div 
                            className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-500"
                            style={{ width: `${sub.score}%` }}
                          />
                        </div>
                        <span className="text-white/40 text-xs w-8 text-right">{sub.score}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        {result.classicQuotes && result.classicQuotes.length > 0 && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="rounded-3xl bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-yellow-500/10 p-8 border border-amber-500/20"
          >
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Lightbulb className="w-6 h-6 text-amber-400" />
              中国式家长金句
            </h3>
            <div className="space-y-3">
              {result.classicQuotes.map((quote: string, i: number) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.35 + i * 0.08 }}
                  className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20"
                >
                  <p className="text-amber-100 italic">"{quote}"</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {result.redemptionGuide && result.redemptionGuide.length > 0 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="rounded-3xl bg-gradient-to-br from-green-500/10 via-emerald-500/5 to-teal-500/10 p-8 border border-green-500/20"
          >
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Zap className="w-6 h-6 text-green-400" />
              自救指南
            </h3>
            <div className="space-y-3">
              {result.redemptionGuide.map((guide: string, i: number) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.35 + i * 0.08 }}
                  className="flex items-start gap-3"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400 mt-2" />
                  <span className="text-green-100 leading-relaxed">{guide}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {result.famousParents && result.famousParents.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 border border-white/10"
        >
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Users className="w-6 h-6 text-fuchsia-400" />
            同款知名家长
          </h3>
          <div className="flex flex-wrap gap-3">
            {result.famousParents.map((name: string, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.45 + index * 0.05 }}
                className="px-5 py-3 rounded-xl bg-gradient-to-r from-fuchsia-500/20 to-pink-500/20 border border-fuchsia-500/30 text-white/80 font-medium"
              >
                {name}
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  )
}

function IdeologyReport({ result }: { result: any }) {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 border border-white/10"
      >
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-500 flex items-center justify-center shadow-lg">
            <Compass className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">意识形态九宫格测评报告</h2>
            <p className="text-white/60">您的立场：{result.typeName || '未知类型'}</p>
          </div>
        </div>
        <p className="text-white/80 leading-relaxed">{result.description || ''}</p>
      </motion.div>
    </div>
  )
}

function IQReport({ result }: { result: any }) {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 border border-white/10"
      >
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 flex items-center justify-center shadow-lg">
            <Brain className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">瑞文标准推理测评报告</h2>
            <p className="text-white/60">IQ: {result.iqScore || '-'} | 超过 {result.percentile || 0}% 常模人群</p>
          </div>
        </div>
        <p className="text-white/80 leading-relaxed">{result.interpretation || ''}</p>
      </motion.div>
    </div>
  )
}

function EQReport({ result }: { result: any }) {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-pink-900/20 to-slate-900 p-8 border border-pink-500/20"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-pink-500/20 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        
        <div className="relative flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-pink-500 via-rose-500 to-red-500 flex items-center justify-center shadow-2xl shadow-pink-500/30">
            <Heart className="w-10 h-10 text-white" />
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2 flex-wrap">
              <span className="px-3 py-1 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white text-sm font-semibold">
                {result.classificationEmoji} EQ {result.classification || '待评估'}
              </span>
              <span className="text-white/40 text-sm">总情商 {result.totalEQ || '-'}</span>
              <span className="text-white/40 text-sm">超过 {result.percentile || 0}% 人群</span>
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">戈尔曼情绪智力专业测评报告</h2>
            <p className="text-white/60 leading-relaxed max-w-2xl">{result.typeDescription || ''}</p>
          </div>

          <div className="text-center">
            <div className="text-5xl font-black bg-gradient-to-r from-pink-400 via-rose-400 to-red-400 bg-clip-text text-transparent">
              {result.totalEQ || '-'}
            </div>
            <div className="text-white/40 text-sm mt-1">总情商指数</div>
          </div>
        </div>
      </motion.div>

      {result.emotionalPortrait && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          className="rounded-3xl bg-gradient-to-br from-violet-500/10 via-fuchsia-500/5 to-pink-500/10 p-8 border border-violet-500/20"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-3xl">
              {result.emotionalPortrait.emoji}
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">{result.emotionalPortrait.type}</h3>
              <p className="text-violet-200">{result.emotionalPortrait.description}</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <div className="p-5 rounded-xl bg-green-500/10 border border-green-500/20">
              <div className="text-green-400 text-sm font-semibold mb-2">✨ 情绪超能力</div>
              <p className="text-green-100">{result.emotionalPortrait.superpower}</p>
            </div>
            <div className="p-5 rounded-xl bg-red-500/10 border border-red-500/20">
              <div className="text-red-400 text-sm font-semibold mb-2">💥 情绪氪石</div>
              <p className="text-red-100">{result.emotionalPortrait.kryptonite}</p>
            </div>
          </div>
        </motion.div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15 }}
          className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 border border-white/10"
        >
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Target className="w-6 h-6 text-pink-400" />
            五维情商雷达图
          </h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={result.radarData || []}>
                <PolarGrid stroke="rgba(255,255,255,0.08)" />
                <PolarAngleAxis dataKey="dimension" tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 12 }} />
                <PolarRadiusAxis angle={30} domain={[0, 6]} tick={{ fill: 'rgba(255,255,255,0.4)' }} />
                <defs>
                  <linearGradient id="eqGradient" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#ec4899" stopOpacity={0.9} />
                    <stop offset="50%" stopColor="#f43f5e" stopOpacity={0.7} />
                    <stop offset="100%" stopColor="#ef4444" stopOpacity={0.5} />
                  </linearGradient>
                </defs>
                <Radar 
                  name="得分" 
                  dataKey="score" 
                  stroke="#ec4899" 
                  fill="url(#eqGradient)" 
                  fillOpacity={0.6} 
                  strokeWidth={3}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 border border-white/10"
        >
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Zap className="w-6 h-6 text-cyan-400" />
            情商优劣势
          </h3>
          {result.strongest && (
            <div className="p-5 rounded-xl bg-green-500/10 border border-green-500/20 mb-4">
              <div className="text-green-400 text-sm font-semibold mb-2">🌟 最强维度：{result.strongest.name}</div>
              <p className="text-green-100 text-lg font-bold">{result.strongest.value} 分</p>
            </div>
          )}
          {result.weakest && (
            <div className="p-5 rounded-xl bg-amber-500/10 border border-amber-500/20">
              <div className="text-amber-400 text-sm font-semibold mb-2">🌱 成长维度：{result.weakest.name}</div>
              <p className="text-amber-100 text-lg font-bold">{result.weakest.value} 分</p>
            </div>
          )}
        </motion.div>
      </div>

      {result.stressResponseGuide && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="rounded-3xl bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-red-500/10 p-8 border border-amber-500/20"
        >
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Activity className="w-6 h-6 text-amber-400" />
            压力应对工具箱
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <div className="text-red-400 text-sm font-semibold mb-3">⚠️ 触发点</div>
              <div className="space-y-2">
                {(result.stressResponseGuide.triggerPoints || []).map((item: string, i: number) => (
                  <div key={i} className="flex items-start gap-2 text-white/70 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="text-green-400 text-sm font-semibold mb-3">🚑 急救包</div>
              <div className="space-y-2">
                {(result.stressResponseGuide.emergencyKit || []).map((item: string, i: number) => (
                  <div key={i} className="flex items-start gap-2 text-white/70 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 mt-1.5" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="text-blue-400 text-sm font-semibold mb-3">🧘 恢复仪式</div>
              <div className="space-y-2">
                {(result.stressResponseGuide.recoveryRitual || []).map((item: string, i: number) => (
                  <div key={i} className="flex items-start gap-2 text-white/70 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {result.workplaceScenarios && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-3xl bg-gradient-to-br from-blue-500/10 via-cyan-500/5 to-teal-500/10 p-8 border border-blue-500/20"
        >
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Briefcase className="w-6 h-6 text-blue-400" />
            职场情商应用指南
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl bg-white/5 border border-white/10">
              <div className="text-blue-400 text-sm font-semibold mb-2">冲突解决</div>
              <p className="text-white/80">{result.workplaceScenarios.conflictResolution}</p>
            </div>
            <div className="p-5 rounded-xl bg-white/5 border border-white/10">
              <div className="text-cyan-400 text-sm font-semibold mb-2">接受反馈</div>
              <p className="text-white/80">{result.workplaceScenarios.receivingFeedback}</p>
            </div>
            <div className="p-5 rounded-xl bg-white/5 border border-white/10">
              <div className="text-teal-400 text-sm font-semibold mb-2">给予反馈</div>
              <p className="text-white/80">{result.workplaceScenarios.givingFeedback}</p>
            </div>
            <div className="p-5 rounded-xl bg-white/5 border border-white/10">
              <div className="text-violet-400 text-sm font-semibold mb-2">团队协作</div>
              <p className="text-white/80">{result.workplaceScenarios.teamDynamics}</p>
            </div>
          </div>
        </motion.div>
      )}

      {result.relationshipMatches && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="rounded-3xl bg-gradient-to-br from-rose-500/10 via-pink-500/5 to-fuchsia-500/10 p-8 border border-rose-500/20"
        >
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Users className="w-6 h-6 text-rose-400" />
            亲密关系匹配
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-5 rounded-xl bg-green-500/10 border border-green-500/20">
              <div className="text-green-400 text-sm font-semibold mb-3">💚 最佳拍档</div>
              <div className="space-y-1">
                {(result.relationshipMatches.best || []).map((item: string, i: number) => (
                  <div key={i} className="text-green-100 text-sm">• {item}</div>
                ))}
              </div>
            </div>
            <div className="p-5 rounded-xl bg-amber-500/10 border border-amber-500/20">
              <div className="text-amber-400 text-sm font-semibold mb-3">⚠️ 需要注意</div>
              <div className="space-y-1">
                {(result.relationshipMatches.watchOut || []).map((item: string, i: number) => (
                  <div key={i} className="text-amber-100 text-sm">• {item}</div>
                ))}
              </div>
            </div>
            <div className="p-5 rounded-xl bg-violet-500/10 border border-violet-500/20">
              <div className="text-violet-400 text-sm font-semibold mb-3">💘 吸引模式</div>
              <p className="text-violet-100 text-sm">{result.relationshipMatches.attractionPattern}</p>
            </div>
          </div>
        </motion.div>
      )}

      {result.emotionalGrowthRoadmap && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="rounded-3xl bg-gradient-to-br from-green-500/10 via-emerald-500/5 to-teal-500/10 p-8 border border-green-500/20"
        >
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-green-400" />
            情商成长路线图
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-5 rounded-xl bg-white/5 border border-white/10">
              <div className="text-cyan-400 text-sm font-semibold mb-3">📅 第1个月</div>
              <div className="space-y-2">
                {(result.emotionalGrowthRoadmap.month1 || []).map((item: string, i: number) => (
                  <div key={i} className="flex items-start gap-2 text-white/70 text-sm">
                    <span className="text-cyan-400 font-bold">✓</span>
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="p-5 rounded-xl bg-white/5 border border-white/10">
              <div className="text-blue-400 text-sm font-semibold mb-3">📅 第3个月</div>
              <div className="space-y-2">
                {(result.emotionalGrowthRoadmap.month3 || []).map((item: string, i: number) => (
                  <div key={i} className="flex items-start gap-2 text-white/70 text-sm">
                    <span className="text-blue-400 font-bold">✓</span>
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="p-5 rounded-xl bg-white/5 border border-white/10">
              <div className="text-violet-400 text-sm font-semibold mb-3">📅 第6个月</div>
              <div className="space-y-2">
                {(result.emotionalGrowthRoadmap.month6 || []).map((item: string, i: number) => (
                  <div key={i} className="flex items-start gap-2 text-white/70 text-sm">
                    <span className="text-violet-400 font-bold">✓</span>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {result.famousEQMaster && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 border border-white/10"
        >
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Award className="w-6 h-6 text-amber-400" />
            向情商大师学习
          </h3>
          <div className="p-6 rounded-xl bg-gradient-to-br from-amber-500/10 to-yellow-500/10 border border-amber-500/20">
            <div className="text-amber-400 text-xl font-bold mb-2">{result.famousEQMaster.name}</div>
            <div className="text-amber-100 italic text-lg mb-4">"{result.famousEQMaster.quote}"</div>
            <div className="text-white/70">💡 {result.famousEQMaster.lesson}</div>
          </div>
        </motion.div>
      )}
    </div>
  )
}

function DarkTriadReport({ result }: { result: any }) {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 border border-white/10"
      >
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-pink-500 flex items-center justify-center shadow-lg">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">暗黑人格 DARK 量表测评报告</h2>
            <p className="text-white/60">黑暗指数: {result.darkScore || '-'}</p>
          </div>
        </div>
        <p className="text-white/80 leading-relaxed">{result.description || ''}</p>
      </motion.div>
    </div>
  )
}

function OceanReport({ result }: { result: any }) {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 border border-white/10"
      >
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 via-violet-500 to-purple-500 flex items-center justify-center shadow-lg">
            <User className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">大五人格 OCEAN 测评报告</h2>
          </div>
        </div>
        <p className="text-white/80 leading-relaxed">{result.description || ''}</p>
      </motion.div>
    </div>
  )
}

/**
 * ==============================================
 * 🧠 人生意义感测评 - 报告渲染组件
 * ==============================================
 * 【测评定位】存在主义哲学向人格测评
 * 【色彩主题】靛青紫渐变 - 代表深邃的哲学思考
 * 【五大维度】自我实现 / 关系质量 / 社会贡献 / 个人成长 / 超越性
 * 【6个段位】虚无主义者 → 存在主义者 → 探索者 → 践行者 → 意义构建者 → 开悟大师
 */
function LifeMeaningReport({ result }: { result: any }) {
  // ---------- 雷达图数据转换 ----------
  // 将计算器返回的英文维度名映射成中文显示名
  const radarData = Object.entries(result.dimensions || {}).map(([key, value]) => ({
    dimension: {
      selfRealization: '自我实现',
      relationshipQuality: '关系质量',
      contribution: '社会贡献',
      personalGrowth: '个人成长',
      transcendence: '超越性',
    }[key] || key,
    score: value as number,
    fullMark: 100,
  }))

  return (
    <div className="space-y-6">
      {/* 🎯 模块1: 头部总览卡片 - 段位emoji + 等级名称 + 排名 + 标题描述 + 核心指数 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-900/30 to-slate-900 p-8 border border-white/10"
      >
        {/* 背景光晕装饰效果 - 营造沉浸感 */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-indigo-500/20 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        
        <div className="relative flex flex-col md:flex-row items-start md:items-center gap-6">
          {/* 左侧：大图标 */}
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-violet-500 flex items-center justify-center shadow-2xl shadow-indigo-500/30">
            <Brain className="w-10 h-10 text-white" />
          </div>
          
          {/* 中间：标题信息区 */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className="px-3 py-1 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-sm font-semibold">
                {result.classificationEmoji} {result.levelName}
              </span>
              <span className="text-white/40 text-sm">{result.meaningRank}</span>
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">{result.title}</h2>
            <p className="text-white/60 leading-relaxed max-w-2xl">{result.description}</p>
          </div>

          {/* 右侧：核心指数大字 */}
          <div className="text-center">
            <div className="text-5xl font-black bg-gradient-to-r from-indigo-400 via-purple-400 to-violet-400 bg-clip-text text-transparent">
              {result.meaningIndex}
            </div>
            <div className="text-white/40 text-sm mt-1">人生意义指数</div>
          </div>
        </div>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 border border-white/10"
        >
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Target className="w-6 h-6 text-indigo-400" />
            五维意义雷达图
          </h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="rgba(255,255,255,0.08)" />
                <PolarAngleAxis dataKey="dimension" tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 12 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: 'rgba(255,255,255,0.4)' }} />
                <defs>
                  <linearGradient id="meaningGradient" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#6366f1" stopOpacity={0.9} />
                    <stop offset="50%" stopColor="#8b5cf6" stopOpacity={0.7} />
                    <stop offset="100%" stopColor="#a855f7" stopOpacity={0.5} />
                  </linearGradient>
                </defs>
                <Radar 
                  name="意义指数" 
                  dataKey="score" 
                  stroke="#6366f1" 
                  fill="url(#meaningGradient)" 
                  fillOpacity={0.6} 
                  strokeWidth={3}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15 }}
          className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 border border-white/10"
        >
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-violet-400" />
            维度解读
          </h3>
          <div className="space-y-4">
            {Object.entries(result.dimensionDescriptions || {}).map(([key, desc], index) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="p-4 rounded-xl bg-white/5 border border-white/10"
              >
                <div className="font-semibold text-white mb-1">{{
                  selfRealization: '🌟 自我实现',
                  relationshipQuality: '💝 关系质量',
                  contribution: '🎁 社会贡献',
                  personalGrowth: '🌱 个人成长',
                  transcendence: '✨ 超越性',
                }[key] || key}</div>
                <p className="text-white/60 text-sm">{desc as string}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="rounded-3xl bg-gradient-to-br from-slate-900 via-amber-900/20 to-slate-900 p-8 border border-white/10"
      >
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Lightbulb className="w-6 h-6 text-amber-400" />
          哲学金句
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {(result.philosophyQuotes || []).map((quote: string, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.08 }}
              className="p-5 rounded-xl bg-amber-500/10 border border-amber-500/20 italic text-amber-100"
            >
              "{quote}"
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="rounded-3xl bg-gradient-to-br from-slate-900 via-emerald-900/20 to-slate-900 p-8 border border-white/10"
      >
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Heart className="w-6 h-6 text-emerald-400" />
          人生建议
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
          {(result.lifeSuggestions || []).map((suggestion: string, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.45 + index * 0.08 }}
              className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-100"
            >
              {suggestion}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

/**
 * ==============================================
 * 🇨🇳 爱国主义纯度测评 - 报告渲染组件
 * ==============================================
 * 【测评定位】意识形态趣味测评
 * 【色彩主题】中国红渐变 - 代表红色血脉
 * 【五大维度】国家认同 / 文化自信 / 社会责任感 / 历史认知 / 全球视野
 * 【6个段位】建议重修思想道德课 → 理性中立路人 → 普通群众 → 热血青年 → 红色传承者 → 共产主义接班人
 */
function PatriotismReport({ result }: { result: any }) {
  const radarData = Object.entries(result.dimensions || {}).map(([key, value]) => ({
    dimension: {
      nationalPride: '国家自豪感',
      culturalConfidence: '文化自信',
      historicalIdentity: '历史认同',
      socialResponsibility: '社会责任',
      internationalOutlook: '国际视野',
    }[key] || key,
    score: value as number,
    fullMark: 100,
  }))

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-red-900/30 to-slate-900 p-8 border border-white/10"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-red-500/20 via-yellow-500/10 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        
        <div className="relative flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-red-600 via-orange-500 to-yellow-500 flex items-center justify-center shadow-2xl shadow-red-500/30 text-4xl">
            🇨🇳
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className="px-3 py-1 rounded-full bg-gradient-to-r from-red-600 to-orange-500 text-white text-sm font-semibold">
                {result.classificationEmoji} {result.levelName}
              </span>
              <span className="text-white/40 text-sm">{result.patriotRank}</span>
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">{result.title}</h2>
            <p className="text-white/60 leading-relaxed max-w-2xl">{result.description}</p>
          </div>

          <div className="text-center">
            <div className="text-5xl font-black bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
              {result.patriotismIndex}%
            </div>
            <div className="text-white/40 text-sm mt-1">爱国指数</div>
            {result.rednessLevel && (
              <div className="mt-2 text-xs text-red-300/80 max-w-32">{result.rednessLevel}</div>
            )}
          </div>
        </div>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 border border-white/10"
        >
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Target className="w-6 h-6 text-red-400" />
            红色五维雷达图
          </h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="rgba(255,255,255,0.08)" />
                <PolarAngleAxis dataKey="dimension" tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 12 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: 'rgba(255,255,255,0.4)' }} />
                <defs>
                  <linearGradient id="patriotGradient" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#dc2626" stopOpacity={0.9} />
                    <stop offset="50%" stopColor="#f97316" stopOpacity={0.7} />
                    <stop offset="100%" stopColor="#eab308" stopOpacity={0.5} />
                  </linearGradient>
                </defs>
                <Radar 
                  name="纯度指数" 
                  dataKey="score" 
                  stroke="#dc2626" 
                  fill="url(#patriotGradient)" 
                  fillOpacity={0.6} 
                  strokeWidth={3}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15 }}
          className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 border border-white/10"
        >
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-orange-400" />
            维度深度解读
          </h3>
          <div className="space-y-3">
            {Object.entries(result.dimensionDescriptions || {}).map(([key, desc], index) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="p-4 rounded-xl bg-white/5 border border-white/10"
              >
                <div className="font-semibold text-white mb-1">{{
                  nationalPride: '🏛️ 国家自豪感',
                  culturalConfidence: '🎭 文化自信',
                  historicalIdentity: '📜 历史认同',
                  socialResponsibility: '🤝 社会责任',
                  internationalOutlook: '🌍 国际视野',
                }[key] || key}</div>
                <p className="text-white/60 text-sm">{desc as string}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="rounded-3xl bg-gradient-to-br from-slate-900 via-red-900/20 to-slate-900 p-8 border border-white/10"
      >
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Award className="w-6 h-6 text-red-400" />
          红色金句
        </h3>
        <div className="flex flex-wrap gap-3">
          {(result.patrioticQuotes || []).map((badge: string, index: number) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + index * 0.08 }}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/30 text-red-200 font-medium"
            >
              {badge}
            </motion.span>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="rounded-3xl bg-gradient-to-br from-slate-900 via-yellow-900/20 to-slate-900 p-8 border border-white/10"
      >
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-yellow-400" />
          爱国进阶建议
        </h3>
        <div className="grid md:grid-cols-2 gap-3">
          {(result.lifeSuggestions || []).map((suggestion: string, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20 text-yellow-100"
            >
              {suggestion}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

/**
 * ==============================================
 * 🐟 打工人摸鱼纯度测评 - 报告渲染组件
 * ==============================================
 * 【测评定位】职场社畜趣味测评
 * 【色彩主题】湖水蓝青渐变 - 代表摸鱼的宁静与悠哉
 * 【五大维度】演技水平 / 时间管理 / 理由储备 / 反侦察能力 / 摸鱼心态
 * 【6个段位】卷王 → 老实人 → 入门摸鱼仔 → 合格摸鱼人 → 摸鱼大师 → 摸鱼之神
 */
function SlackingReport({ result }: { result: any }) {
  const radarData = Object.entries(result.dimensions || {}).map(([key, value]) => ({
    dimension: {
      meetingEvading: '逃会技巧',
      pretendWorking: '假装工作',
      toiletEscape: '厕所逃逸',
      overtimeResistance: '反加班',
      gossipExpert: '八卦专家',
    }[key] || key,
    score: value as number,
    fullMark: 100,
  }))

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-teal-900/30 to-slate-900 p-8 border border-white/10"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-teal-500/20 via-cyan-500/10 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        
        <div className="relative flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-teal-500 via-cyan-500 to-blue-500 flex items-center justify-center shadow-2xl shadow-teal-500/30 text-4xl">
            🦥
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className="px-3 py-1 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 text-white text-sm font-semibold">
                {result.classificationEmoji} {result.levelName}
              </span>
              <span className="text-white/40 text-sm">👑 {result.slackingRank}</span>
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">{result.title}</h2>
            <p className="text-white/60 leading-relaxed max-w-2xl">{result.description}</p>
          </div>

          <div className="text-center">
            <div className="text-5xl font-black bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
              {result.slackingIndex}%
            </div>
            <div className="text-white/40 text-sm mt-1">摸鱼纯度</div>
          </div>
        </div>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 border border-white/10"
        >
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Target className="w-6 h-6 text-teal-400" />
            摸鱼五维雷达图
          </h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="rgba(255,255,255,0.08)" />
                <PolarAngleAxis dataKey="dimension" tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 12 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: 'rgba(255,255,255,0.4)' }} />
                <defs>
                  <linearGradient id="slackGradient" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#14b8a6" stopOpacity={0.9} />
                    <stop offset="50%" stopColor="#06b6d4" stopOpacity={0.7} />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.5} />
                  </linearGradient>
                </defs>
                <Radar 
                  name="摸鱼指数" 
                  dataKey="score" 
                  stroke="#14b8a6" 
                  fill="url(#slackGradient)" 
                  fillOpacity={0.6} 
                  strokeWidth={3}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15 }}
          className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 border border-white/10"
        >
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <User className="w-6 h-6 text-cyan-400" />
            摸鱼段位解读
          </h3>
          <div className="space-y-3">
            {Object.entries(result.dimensionDescriptions || {}).map(([key, desc], index) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="p-4 rounded-xl bg-white/5 border border-white/10"
              >
                <div className="font-semibold text-white mb-1">{{
                  meetingEvading: '🚪 逃会技巧',
                  pretendWorking: '💻 假装工作',
                  toiletEscape: '🚽 厕所逃逸',
                  overtimeResistance: '⏰ 反加班',
                  gossipExpert: '☕ 八卦专家',
                }[key] || key}</div>
                <p className="text-white/60 text-sm">{desc as string}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="rounded-3xl bg-gradient-to-br from-slate-900 via-emerald-900/20 to-slate-900 p-8 border border-white/10"
      >
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Award className="w-6 h-6 text-emerald-400" />
          摸鱼金句
        </h3>
        <div className="flex flex-wrap gap-3">
          {(result.slackingQuotes || []).map((badge: string, index: number) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + index * 0.08 }}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 text-emerald-200 font-medium"
            >
              🏆 {badge}
            </motion.span>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="rounded-3xl bg-gradient-to-br from-slate-900 via-blue-900/20 to-slate-900 p-8 border border-white/10"
      >
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Zap className="w-6 h-6 text-blue-400" />
          摸鱼大师进阶秘籍
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
          {(result.slackingTips || []).map((tip: string, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-100"
            >
              💡 {tip}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

/**
 * ==============================================
 * 🍚 干饭人等级测评 - 报告渲染组件
 * ==============================================
 * 【测评定位】吃货属性鉴定
 * 【色彩主题】橙黄渐变 - 代表美食的温暖与食欲
 * 【五大维度】饭量指数 / 美食鉴赏力 / 探店积极性 / 厨艺水平 / 吃货执念
 * 【6个段位】修仙者 → 生存型吃饭 → 普通干饭人 → 干饭爱好者 → 干饭大师 → 干饭之神
 */
function FoodieReport({ result }: { result: any }) {
  const radarData = Object.entries(result.dimensions || {}).map(([key, value]) => ({
    dimension: {
      appetite: '饭量指数',
      tasting: '品鉴能力',
      cooking: '烹饪技能',
      exploring: '探店探索',
      spending: '美食投入',
    }[key] || key,
    score: value as number,
    fullMark: 100,
  }))

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-orange-900/30 to-slate-900 p-8 border border-white/10"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-orange-500/20 via-amber-500/10 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        
        <div className="relative flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-500 flex items-center justify-center shadow-2xl shadow-orange-500/30 text-4xl">
            🍜
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className="px-3 py-1 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white text-sm font-semibold">
                {result.classificationEmoji} {result.levelName}
              </span>
              <span className="text-white/40 text-sm">🍚 {result.foodieRank}</span>
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">{result.title}</h2>
            <p className="text-white/60 leading-relaxed max-w-2xl">{result.description}</p>
          </div>

          <div className="text-center">
            <div className="text-5xl font-black bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400 bg-clip-text text-transparent">
              {result.foodieIndex}%
            </div>
            <div className="text-white/40 text-sm mt-1">干饭纯度</div>
          </div>
        </div>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 border border-white/10"
        >
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Target className="w-6 h-6 text-orange-400" />
            干饭五维雷达图
          </h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="rgba(255,255,255,0.08)" />
                <PolarAngleAxis dataKey="dimension" tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 12 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: 'rgba(255,255,255,0.4)' }} />
                <defs>
                  <linearGradient id="foodieGradient" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#f97316" stopOpacity={0.9} />
                    <stop offset="50%" stopColor="#f59e0b" stopOpacity={0.7} />
                    <stop offset="100%" stopColor="#eab308" stopOpacity={0.5} />
                  </linearGradient>
                </defs>
                <Radar 
                  name="干饭指数" 
                  dataKey="score" 
                  stroke="#f97316" 
                  fill="url(#foodieGradient)" 
                  fillOpacity={0.6} 
                  strokeWidth={3}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15 }}
          className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 border border-white/10"
        >
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Activity className="w-6 h-6 text-amber-400" />
            干饭段位解读
          </h3>
          <div className="space-y-3">
            {Object.entries(result.dimensionDescriptions || {}).map(([key, desc], index) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="p-4 rounded-xl bg-white/5 border border-white/10"
              >
                <div className="font-semibold text-white mb-1">{{
                  appetite: '🍚 饭量指数',
                  tasting: '👅 品鉴能力',
                  cooking: '👨‍🍳 烹饪技能',
                  exploring: '🗺️ 探店探索',
                  spending: '💰 美食投入',
                }[key] || key}</div>
                <p className="text-white/60 text-sm">{desc as string}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="rounded-3xl bg-gradient-to-br from-slate-900 via-red-900/20 to-slate-900 p-8 border border-white/10"
      >
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Award className="w-6 h-6 text-red-400" />
          干饭金句
        </h3>
        <div className="flex flex-wrap gap-3">
          {(result.foodieQuotes || []).map((badge: string, index: number) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + index * 0.08 }}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/30 text-red-200 font-medium"
            >
              🏅 {badge}
            </motion.span>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="rounded-3xl bg-gradient-to-br from-slate-900 via-yellow-900/20 to-slate-900 p-8 border border-white/10"
      >
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Lightbulb className="w-6 h-6 text-yellow-400" />
          干饭人的人生建议
        </h3>
        <div className="grid md:grid-cols-2 gap-3">
          {(result.foodRecommendations || []).map((advice: string, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20 text-yellow-100"
            >
              💫 {advice}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

/**
 * ==============================================
 * 📱 网瘾程度测评 - 报告渲染组件
 * ==============================================
 * 【测评定位】当代人数字生存状态鉴定
 * 【色彩主题】赛博蓝紫渐变 - 代表互联网的虚拟科技感
 * 【五大维度】日均使用时长 / 社交媒体依赖 / 游戏沉迷度 / FOMO程度 / 线下能力
 * 【6个段位】赛博隐士 → 数字移民 → 普通网民 → 网瘾患者 → 资深网民 → 人形自走终端
 */
function InternetAddictionReport({ result }: { result: any }) {
  const radarData = Object.entries(result.dimensions || {}).map(([key, value]) => ({
    dimension: {
      dailyUsage: '日均使用',
      socialMedia: '社交媒体',
      gaming: '游戏沉迷',
      fomo: '错失恐惧',
      offlineAbility: '线下能力',
    }[key] || key,
    score: value as number,
    fullMark: 100,
  }))

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-cyan-900/30 to-slate-900 p-8 border border-white/10"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-cyan-500/20 via-blue-500/10 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        
        <div className="relative flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-500 via-blue-500 to-violet-500 flex items-center justify-center shadow-2xl shadow-cyan-500/30 text-4xl">
            📱
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className="px-3 py-1 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-sm font-semibold">
                {result.classificationEmoji} {result.levelName}
              </span>
              <span className="text-white/40 text-sm">{result.addictionRank}</span>
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">{result.title}</h2>
            <p className="text-white/60 leading-relaxed max-w-2xl">{result.description}</p>
          </div>

          <div className="text-center">
            <div className="text-5xl font-black bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400 bg-clip-text text-transparent">
              {result.addictionIndex}%
            </div>
            <div className="text-white/40 text-sm mt-1">网瘾指数</div>
          </div>
        </div>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 border border-white/10"
        >
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Target className="w-6 h-6 text-cyan-400" />
            网瘾五维雷达图
          </h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="rgba(255,255,255,0.08)" />
                <PolarAngleAxis dataKey="dimension" tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 12 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: 'rgba(255,255,255,0.4)' }} />
                <defs>
                  <linearGradient id="netGradient" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#06b6d4" stopOpacity={0.9} />
                    <stop offset="50%" stopColor="#3b82f6" stopOpacity={0.7} />
                    <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0.5} />
                  </linearGradient>
                </defs>
                <Radar 
                  name="网瘾指数" 
                  dataKey="score" 
                  stroke="#06b6d4" 
                  fill="url(#netGradient)" 
                  fillOpacity={0.6} 
                  strokeWidth={3}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15 }}
          className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 border border-white/10"
        >
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <AlertTriangle className="w-6 h-6 text-blue-400" />
            网瘾段位解读
          </h3>
          <div className="space-y-3">
            {Object.entries(result.dimensionDescriptions || {}).map(([key, desc], index) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="p-4 rounded-xl bg-white/5 border border-white/10"
              >
                <div className="font-semibold text-white mb-1">{{
                  dailyUsage: '⏰ 日均使用',
                  socialMedia: '📱 社交媒体',
                  gaming: '🎮 游戏沉迷',
                  fomo: '😱 错失恐惧',
                  offlineAbility: '🏃 线下能力',
                }[key] || key}</div>
                <p className="text-white/60 text-sm">{desc as string}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="rounded-3xl bg-gradient-to-br from-slate-900 via-violet-900/20 to-slate-900 p-8 border border-white/10"
      >
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Award className="w-6 h-6 text-violet-400" />
          赛博金句
        </h3>
        <div className="flex flex-wrap gap-3">
          {(result.internetQuotes || []).map((badge: string, index: number) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + index * 0.08 }}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-violet-500/20 to-cyan-500/20 border border-violet-500/30 text-violet-200 font-medium"
            >
              🎖️ {badge}
            </motion.span>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="rounded-3xl bg-gradient-to-br from-slate-900 via-rose-900/20 to-slate-900 p-8 border border-white/10"
      >
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Brain className="w-6 h-6 text-rose-400" />
          戒网瘾指南
        </h3>
        <div className="grid md:grid-cols-2 gap-3">
          {(result.detoxSuggestions || []).map((tip: string, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-100"
            >
              🌱 {tip}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

/**
 * ==============================================
 * 🔥 性经验指数测评 - 报告渲染组件
 * ==============================================
 * 【测评定位】成年人经验等级鉴定（非严肃向）
 * 【色彩主题】玫瑰粉渐变 - 代表爱与亲密关系
 * 【五大维度】实战经验 / 理论深度 / 技术水平 / 玩法多样性 / 观念开放度
 * 【6个段位】国宝级纯爱战士 → 理论派选手 → 正常人类 → 老司机 → 车神 → 人间泰迪
 */
function SexualExperienceReport({ result }: { result: any }) {
  const radarData = Object.entries(result.dimensions || {}).map(([key, value]) => ({
    dimension: {
      practical: '实战经验',
      theoretical: '理论深度',
      technique: '技术水平',
      diversity: '玩法多样性',
      openness: '观念开放度',
    }[key] || key,
    score: value as number,
    fullMark: 100,
  }))

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-pink-900/30 to-slate-900 p-8 border border-white/10"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-pink-500/20 via-rose-500/10 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        
        <div className="relative flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-pink-500 via-rose-500 to-red-500 flex items-center justify-center shadow-2xl shadow-pink-500/30 text-4xl">
            🔥
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className="px-3 py-1 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white text-sm font-semibold">
                {result.classificationEmoji} {result.levelName}
              </span>
              <span className="text-white/40 text-sm">{result.experienceRank}</span>
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">{result.title}</h2>
            <p className="text-white/60 leading-relaxed max-w-2xl">{result.description}</p>
          </div>

          <div className="text-center">
            <div className="text-5xl font-black bg-gradient-to-r from-pink-400 via-rose-400 to-red-400 bg-clip-text text-transparent">
              {result.experienceIndex}
            </div>
            <div className="text-white/40 text-sm mt-1">老司机指数</div>
          </div>
        </div>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 border border-white/10"
        >
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Target className="w-6 h-6 text-pink-400" />
            老司机五维雷达图
          </h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="rgba(255,255,255,0.08)" />
                <PolarAngleAxis dataKey="dimension" tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 12 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: 'rgba(255,255,255,0.4)' }} />
                <defs>
                  <linearGradient id="sexGradient" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#ec4899" stopOpacity={0.9} />
                    <stop offset="50%" stopColor="#f43f5e" stopOpacity={0.7} />
                    <stop offset="100%" stopColor="#ef4444" stopOpacity={0.5} />
                  </linearGradient>
                </defs>
                <Radar 
                  name="经验指数" 
                  dataKey="score" 
                  stroke="#ec4899" 
                  fill="url(#sexGradient)" 
                  fillOpacity={0.6} 
                  strokeWidth={3}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15 }}
          className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 border border-white/10"
        >
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Users className="w-6 h-6 text-rose-400" />
            段位深度解读
          </h3>
          <div className="space-y-3">
            {Object.entries(result.dimensionDescriptions || {}).map(([key, desc], index) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="p-4 rounded-xl bg-white/5 border border-white/10"
              >
                <div className="font-semibold text-white mb-1">{{
                  practical: '💪 实战经验',
                  theoretical: '📚 理论深度',
                  technique: '⚡ 技术水平',
                  diversity: '🎭 玩法多样性',
                  openness: '🌈 观念开放度',
                }[key] || key}</div>
                <p className="text-white/60 text-sm">{desc as string}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="rounded-3xl bg-gradient-to-br from-slate-900 via-pink-900/20 to-slate-900 p-8 border border-white/10"
      >
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Award className="w-6 h-6 text-pink-400" />
          冷知识
        </h3>
        <div className="flex flex-wrap gap-3">
          {(result.funFacts || []).map((badge: string, index: number) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + index * 0.08 }}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-pink-500/20 to-rose-500/20 border border-pink-500/30 text-pink-200 font-medium"
            >
              🏅 {badge}
            </motion.span>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="rounded-3xl bg-gradient-to-br from-slate-900 via-red-900/20 to-slate-900 p-8 border border-white/10"
      >
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Heart className="w-6 h-6 text-red-400" />
          老司机人生箴言
        </h3>
        <div className="grid md:grid-cols-2 gap-3">
          {(result.lifeAdvice || []).map((quote: string, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-100 italic"
            >
              💖 "{quote}"
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

/**
 * ==============================================
 * 🎨 颜色潜意识测试 - 完整报告渲染组件
 * ==============================================
 */
function ColorSubconsciousReport({ result }: { result: any }) {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl p-8 border border-white/10"
        style={{ background: `linear-gradient(135deg, ${result.hex || '#8B5CF6'}30, #1e1b4b, ${result.hex || '#8B5CF6'}15)` }}
      >
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" style={{ backgroundColor: result.hex, opacity: 0.3 }} />
        
        <div className="relative flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="w-24 h-24 rounded-3xl flex items-center justify-center shadow-2xl" style={{ backgroundColor: result.hex }}>
            <span className="text-5xl">{result.emoji || '🌈'}</span>
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className="px-3 py-1 rounded-full text-white text-sm font-semibold" style={{ backgroundColor: result.hex }}>
                灵魂色彩诊断
              </span>
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">{result.name || '你的灵魂色彩'}</h2>
            <p className="text-white/60 leading-relaxed max-w-2xl text-lg">{result.desc}</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <BarChart3 className="w-6 h-6 text-violet-400" />
          五维色彩人格分析
        </h3>
        <div className="grid md:grid-cols-5 gap-3">
          {(result.dimensions || []).map((dim: any, index: number) => (
            <motion.div
              key={dim.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + index * 0.08 }}
              className="rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 p-5 border border-white/10 text-center"
            >
              <div className="text-3xl font-bold mb-2" style={{ color: dim.color }}>{dim.score}</div>
              <div className="text-white/60 text-sm">{dim.name}</div>
              <div className="mt-3 h-2 rounded-full bg-white/10 overflow-hidden">
                <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${dim.score}%`, backgroundColor: dim.color }} />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 border border-white/10"
      >
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Award className="w-6 h-6 text-rose-400" />
          九色灵魂图鉴
        </h3>
        <div className="grid md:grid-cols-3 gap-3">
          {(result.allColors || []).slice(0, 9).map((color: any, index: number) => (
            <motion.div
              key={color.type}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + index * 0.05 }}
              className={`p-4 rounded-xl border ${result.type === color.type ? 'ring-2 ring-white/50 border-white/30' : 'border-white/10'} bg-white/5`}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{color.emoji}</span>
                <div>
                  <div className="font-semibold text-white">{color.name}</div>
                  <div className="text-white/40 text-xs">{color.type}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

/**
 * ==============================================
 * 🐕 ABM恋爱动物人格 - 完整报告渲染组件
 * ==============================================
 */
function AbmLoveAnimalReport({ result }: { result: any }) {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-rose-900/40 via-purple-900/30 to-amber-900/30 p-8 border border-white/10"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-rose-500/20 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        
        <div className="relative flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-rose-500 via-pink-500 to-purple-500 flex items-center justify-center shadow-2xl shadow-rose-500/30">
            <span className="text-5xl">{result.emoji || '🐱'}</span>
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className="px-3 py-1 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 text-white text-sm font-semibold">
                恋爱动物人格
              </span>
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">{result.name || '你的恋爱动物'}</h2>
            <p className="text-white/60 leading-relaxed max-w-2xl text-lg">{result.desc}</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Heart className="w-6 h-6 text-rose-400" />
          恋爱五维分析
        </h3>
        <div className="grid md:grid-cols-5 gap-3">
          {(result.dimensions || []).map((dim: any, index: number) => (
            <motion.div
              key={dim.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + index * 0.08 }}
              className="rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 p-5 border border-white/10 text-center"
            >
              <div className="text-3xl font-bold mb-2" style={{ color: dim.color }}>{dim.score}</div>
              <div className="text-white/60 text-sm">{dim.name}</div>
              <div className="mt-3 h-2 rounded-full bg-white/10 overflow-hidden">
                <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${dim.score}%`, backgroundColor: dim.color }} />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="rounded-3xl bg-gradient-to-br from-slate-900 via-rose-900/20 to-slate-900 p-8 border border-white/10"
      >
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Users className="w-6 h-6 text-rose-400" />
          十二种恋爱动物全图鉴
        </h3>
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-3">
          {(result.allAnimals || []).map((animal: any, index: number) => (
            <motion.div
              key={animal.type}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + index * 0.03 }}
              className={`p-4 rounded-xl border ${result.type === animal.type ? 'ring-2 ring-rose-500/50 border-rose-400/50 bg-rose-500/10' : 'border-white/10 bg-white/5'}`}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{animal.emoji}</span>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-white truncate">{animal.name}</div>
                  <div className="text-white/40 text-xs truncate">{animal.desc?.slice(0, 15)}...</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

/**
 * ==============================================
 * 🧠 精神年龄诊断 - 完整报告渲染组件
 * ==============================================
 */
function MentalAgeReport({ result }: { result: any }) {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-900/40 via-orange-900/20 to-yellow-900/30 p-8 border border-white/10"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-amber-500/20 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        
        <div className="relative flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-amber-500 via-orange-500 to-yellow-500 flex items-center justify-center shadow-2xl shadow-amber-500/30">
            <span className="text-5xl">{result.emoji || '🏛️'}</span>
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className="px-3 py-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-semibold">
                精神年龄诊断
              </span>
              <span className="text-white/40 text-lg font-bold">{result.mentalAge || 99} 岁</span>
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">{result.overall || '精神年龄'}</h2>
            <p className="text-white/60 leading-relaxed max-w-2xl text-lg">
              你的身体在上班，灵魂已经退休了吗？
            </p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Brain className="w-6 h-6 text-amber-400" />
          心智五维分析
        </h3>
        <div className="grid md:grid-cols-5 gap-3">
          {(result.dimensions || []).map((dim: any, index: number) => (
            <motion.div
              key={dim.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + index * 0.08 }}
              className="rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 p-5 border border-white/10 text-center"
            >
              <div className="text-3xl font-bold mb-2" style={{ color: dim.color }}>{dim.score}</div>
              <div className="text-white/60 text-sm">{dim.name}</div>
              <div className="mt-3 h-2 rounded-full bg-white/10 overflow-hidden">
                <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${dim.score}%`, backgroundColor: dim.color }} />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

/**
 * ==============================================
 * 🦥 SBTI傻屌人格测试 - 完整报告渲染组件
 * ==============================================
 */
function SBTIPersonalityReport({ result }: { result: any }) {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-900/40 via-blue-900/20 to-cyan-900/30 p-8 border border-white/10"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-violet-500/20 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        
        <div className="relative flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-violet-500 via-blue-500 to-cyan-500 flex items-center justify-center shadow-2xl shadow-violet-500/30">
            <span className="text-5xl">{result.emoji || '🦥'}</span>
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className="px-3 py-1 rounded-full bg-gradient-to-r from-violet-500 to-blue-500 text-white text-sm font-semibold">
                SBTI 人格类型
              </span>
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">{result.overall || result.type || 'SBTI人格类型'}</h2>
            <p className="text-white/60 leading-relaxed max-w-2xl text-lg">
              2026全网爆火！比MBTI更懂你的摆烂人生 ✨
            </p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Target className="w-6 h-6 text-violet-400" />
          SBTI 四维度分析
        </h3>
        <div className="grid md:grid-cols-4 gap-3">
          {(result.dimensions || []).map((dim: any, index: number) => (
            <motion.div
              key={dim.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + index * 0.1 }}
              className="rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 p-5 border border-white/10 text-center"
            >
              <div className="text-3xl font-bold mb-2" style={{ color: dim.color }}>{dim.score}</div>
              <div className="text-white/60 text-sm">{dim.name}</div>
              <div className="mt-3 h-2 rounded-full bg-white/10 overflow-hidden">
                <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${dim.score}%`, backgroundColor: dim.color }} />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="rounded-3xl bg-gradient-to-br from-slate-900 via-violet-900/20 to-slate-900 p-8 border border-white/10"
      >
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Award className="w-6 h-6 text-violet-400" />
          SBTI 四大天王
        </h3>
        <div className="grid md:grid-cols-4 gap-4">
          {[
            { type: '职业吗喽', emoji: '🙈', desc: '只要给够加班费，当牛做马无所谓' },
            { type: '摆烂之王', emoji: '🦥', desc: '工作的意义就是为了下班' },
            { type: '顶级杠精', emoji: '🦝', desc: '你说的都对，但我就是要杠' },
            { type: '无限社恐', emoji: '🦔', desc: '只要我足够透明，就没人能发现我' },
          ].map((item, index) => (
            <motion.div
              key={item.type}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.25 + index * 0.08 }}
              className={`p-5 rounded-xl border ${result.type === item.type ? 'ring-2 ring-violet-500/50 border-violet-400/50 bg-violet-500/10' : 'border-white/10 bg-white/5'}`}
            >
              <div className="text-center">
                <span className="text-4xl block mb-3">{item.emoji}</span>
                <div className="font-bold text-white mb-1">{item.type}</div>
                <div className="text-white/50 text-xs">{item.desc}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

/**
 * ==============================================
 * ⚠️  兜底报告组件 - 默认 fallback
 * ==============================================
 * 【重要提醒】新测评如果没在上面加分支，就会走到这里！
 * 【后果】只会显示标题+描述两行，雷达图/维度分析全部空白！
 * 【解决方案】新增测评必须：
 *   1. 在上面的路由层加 if 判断分支
 *   2. 写对应的专属报告渲染组件
 */
function DefaultReport({ result }: { result: any }) {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 border border-white/10"
      >
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-violet-500/30">
            <Award className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">{result.title || '测评完成'}</h2>
            <p className="text-white/60">综合得分: {result.score || '-'}</p>
          </div>
        </div>
        <p className="text-white/80 leading-relaxed">{result.description || '感谢您完成测评'}</p>
      </motion.div>
    </div>
  )
}

const HOLLAND_CODES: Record<string, string> = {
  R: '#ef4444',
  I: '#3b82f6',
  A: '#8b5cf6',
  S: '#10b981',
  E: '#f59e0b',
  C: '#06b6d4'
}
