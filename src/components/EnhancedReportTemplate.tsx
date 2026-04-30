import { motion } from 'framer-motion'
import { Award, TrendingUp, Lightbulb, Briefcase, Brain, BarChart3, GitBranch, Users, Target, Sparkles } from 'lucide-react'
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, Legend } from 'recharts'
import type { AssessmentResult, ProfessionalAssessmentResult } from '../types'

function ScatterDistributionChart({
  userPosition,
  clusterCenters,
  xAxisLabel,
  yAxisLabel,
}: {
  userPosition: { x: number; y: number }
  clusterCenters: { name: string; x: number; y: number }[]
  xAxisLabel: string
  yAxisLabel: string
}) {
  const colors = ['#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#10b981']

  const scatterData = [
    { x: userPosition.x, y: userPosition.y, name: '您的位置', isUser: true },
    ...clusterCenters.map((c, i) => ({ ...c, isUser: false, color: colors[i] })),
  ]

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis
            type="number"
            dataKey="x"
            name={xAxisLabel}
            stroke="#94a3b8"
            domain={[0, 100]}
            label={{ value: xAxisLabel, position: 'bottom', fill: '#94a3b8' }}
          />
          <YAxis
            type="number"
            dataKey="y"
            name={yAxisLabel}
            stroke="#94a3b8"
            domain={[0, 100]}
            label={{ value: yAxisLabel, angle: -90, position: 'left', fill: '#94a3b8' }}
          />
          <Tooltip
            contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }}
            labelStyle={{ color: '#fff' }}
            formatter={(value: any, name: string, props: any) => [
              props.payload.isUser ? '您的位置' : props.payload.name,
              '',
            ]}
          />
          <Scatter name="人群分布" data={scatterData}>
            {scatterData.map((d, i) => (
              <Cell
                key={i}
                fill={d.isUser ? '#10b981' : (d as any).color || colors[i]}
              />
            ))}
          </Scatter>
          <Legend />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  )
}

function CircularProgressChart({
  score,
  size = 'medium',
  colorScheme = 'violet',
  showPercentage = true,
  animated = true,
}: {
  score: number
  size?: 'small' | 'medium' | 'large'
  colorScheme?: 'violet' | 'amber' | 'emerald' | 'cyan' | 'rose'
  showPercentage?: boolean
  animated?: boolean
}) {
  const sizeMap = { small: 80, medium: 120, large: 160 }
  const colorMap: Record<string, string> = {
    violet: 'from-violet-500 to-purple-500',
    amber: 'from-amber-500 to-orange-500',
    emerald: 'from-emerald-500 to-teal-500',
    cyan: 'from-cyan-500 to-blue-500',
    rose: 'from-rose-500 to-pink-500',
  }

  return (
    <div
      className={`relative rounded-full bg-gradient-to-br ${colorMap[colorScheme]} p-1`}
      style={{ width: sizeMap[size], height: sizeMap[size] }}
    >
      <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center">
        {showPercentage && (
          <span className="text-white font-bold text-lg">{score.toFixed(0)}</span>
        )}
      </div>
    </div>
  )
}

function ComprehensiveChartSystem({
  dimensions,
  overallScore,
  assessmentType,
  ideologyScores,
  primaryIdeology,
  matchScore,
  title = '多维度分析',
}: {
  dimensions: any[]
  overallScore: number
  assessmentType: string
  ideologyScores?: Map<string, number>
  primaryIdeology?: string
  matchScore?: number
  title?: string
}) {
  return <div className="glass rounded-3xl p-8">
    <h3 className="text-xl font-bold text-white mb-6">{title}</h3>
  </div>
}

interface EnhancedReportTemplateProps {
  result: AssessmentResult | ProfessionalAssessmentResult
  assessmentType: string
  mode?: 'normal' | 'advanced' | 'professional'
  ideologyScores?: Map<string, number>
  primaryIdeology?: string
  matchScore?: number
}

export default function EnhancedReportTemplate({
  result,
  assessmentType,
  mode = 'normal',
  ideologyScores,
  primaryIdeology,
  matchScore,
}: EnhancedReportTemplateProps) {
  const isIQTest = assessmentType === 'iq-test' || assessmentType.includes('iq')
  const isIdeologyTest = assessmentType === 'ideology' || assessmentType.includes('ideology')

  const safeResult = {
    score: result.score ?? 0,
    title: result.title ?? '',
    description: result.description ?? '',
    percentile: result.percentile ?? '0%',
    dimensions: result.dimensions ?? [],
    strengths: result.strengths ?? [],
    weaknesses: result.weaknesses ?? [],
    careers: result.careers ?? [],
    cognitiveProfile: result.cognitiveProfile,
    suggestions: result.suggestions ?? [],
  }

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-3xl p-8"
      >
        <div className="flex items-center gap-4 mb-6">
          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg ${
            isIQTest 
              ? 'bg-gradient-to-br from-amber-500 via-orange-500 to-red-500 shadow-amber-500/30'
              : 'bg-gradient-to-br from-violet-500 via-purple-500 to-pink-500 shadow-violet-500/30'
          }`}>
            {isIQTest ? (
              <Brain className="w-8 h-8 text-white" />
            ) : (
              <Award className="w-8 h-8 text-white" />
            )}
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-white">{safeResult.title}</h2>
            <p className="text-white/60">
              {isIQTest ? `智力水平分析 · 排名前 ${safeResult.percentile}` : `综合得分: ${safeResult.score}`}
            </p>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <CircularProgressChart
              score={safeResult.score}
              size="small"
              colorScheme={isIQTest ? 'amber' : 'violet'}
              showPercentage
              animated
            />
          </motion.div>
        </div>
        <p className="text-white/80 leading-relaxed">{safeResult.description}</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <ComprehensiveChartSystem
          dimensions={safeResult.dimensions}
          overallScore={safeResult.score}
          assessmentType={assessmentType}
          ideologyScores={isIdeologyTest ? ideologyScores : undefined}
          primaryIdeology={isIdeologyTest ? primaryIdeology : undefined}
          matchScore={isIdeologyTest ? matchScore : undefined}
          title="数据可视化分析"
        />
      </motion.div>

      {result.cognitiveProfile && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass rounded-3xl p-8"
        >
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Lightbulb className="w-6 h-6 text-yellow-400" />
            认知能力详细分析
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {Object.entries(result.cognitiveProfile).map(([key, value]: [string, any], index) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 rounded-xl p-4 border border-amber-500/20"
              >
                <div className="text-white font-semibold mb-2">
                  {key === 'logical' ? '逻辑推理' : key === 'spatial' ? '空间思维' : key === 'verbal' ? '语言理解' : '记忆力'}
                </div>
                <p className="text-white/70 text-sm">{value}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {result.isomerAnalysis && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="glass rounded-3xl p-8"
        >
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <GitBranch className="w-6 h-6 text-cyan-400" />
            同分异构深度解析
            <span className="text-xs px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full ml-auto">
              相同分数 · 不同路径
            </span>
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-xl p-5 border border-cyan-500/20">
              <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                您的回答特征
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-white/70 text-sm">极端选项偏好</span>
                  <span className="text-cyan-300 font-bold">{(result.isomerAnalysis.extremity * 100).toFixed(0)}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/70 text-sm">中间项回避倾向</span>
                  <span className="text-cyan-300 font-bold">{(result.isomerAnalysis.midpointAvoidance * 100).toFixed(0)}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/70 text-sm">回答模式独特性</span>
                  <span className="text-cyan-300 font-bold">第 {result.isomerAnalysis.uniquenessPercentile} 百分位</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-violet-500/10 to-purple-500/10 rounded-xl p-5 border border-violet-500/20">
              <h4 className="text-white font-semibold mb-3">您的认知亚型</h4>
              <div className="text-2xl font-black text-violet-300 mb-2">{result.isomerAnalysis.archetype || '深度思考型'}</div>
              <p className="text-white/70 text-sm leading-relaxed">
                {result.isomerAnalysis.archetypeDescription || '虽然在人群中您处于平均水平，但您的回答路径揭示了更深层次的认知特征。这意味着您有着独特的思维角度，只是被统计平均所掩盖。'}
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {result.demographicSegment && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.28 }}
          className="glass rounded-3xl p-8"
        >
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Users className="w-6 h-6 text-emerald-400" />
            人群细分与常模对照
          </h3>
          
          <div className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-xl p-5 mb-5 border border-emerald-500/20">
            <div className="flex items-center gap-4">
              <Target className="w-8 h-8 text-emerald-400" />
              <div>
                <div className="text-white font-bold text-lg">您属于「{result.demographicSegment.group || '深度探索者'}」群体</div>
                <div className="text-white/60 text-sm">占总测试人群的 {result.demographicSegment.percentage || '12.5%'}</div>
              </div>
            </div>
          </div>
          
          <ScatterDistributionChart
            userPosition={result.demographicSegment.coordinates || { x: 65, y: 72 }}
            clusterCenters={result.demographicSegment.clusters || [
              { name: '传统型', x: 30, y: 25 },
              { name: '平衡型', x: 50, y: 50 },
              { name: '探索型', x: 75, y: 80 },
              { name: '先锋型', x: 85, y: 35 },
            ]}
            xAxisLabel="结构化倾向"
            yAxisLabel="开放性程度"
          />
        </motion.div>
      )}

      {result.themeRelevance && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass rounded-3xl p-8"
        >
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Target className="w-6 h-6 text-amber-400" />
            主题相关性权重分析
          </h3>
          <div className="space-y-4">
            {Object.entries(result.themeRelevance).map(([theme, data]: [string, any], index) => (
              <motion.div
                key={theme}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.35 + index * 0.1 }}
                className="bg-slate-800/50 rounded-xl p-4"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white font-medium">{theme}</span>
                  <span className="text-amber-300 font-bold">{(data.weight * 100).toFixed(0)}%</span>
                </div>
                <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${data.weight * 100}%` }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
                    className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"
                  />
                </div>
                <p className="text-white/50 text-xs mt-2">{data.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      <div className="grid md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="glass rounded-3xl p-8"
        >
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Award className="w-6 h-6 text-green-400" />
            {isIQTest ? '认知优势' : '核心优势'}
          </h3>
          <ul className="space-y-3">
            {safeResult.strengths.map((strength, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="flex items-start gap-3"
              >
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-green-400 to-emerald-400 mt-2" />
                <span className="text-white/80">{strength}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass rounded-3xl p-8"
        >
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-red-400" />
            待提升领域
          </h3>
          <ul className="space-y-3">
            {safeResult.weaknesses.map((weakness, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="flex items-start gap-3"
              >
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-red-400 to-rose-400 mt-2" />
                <span className="text-white/80">{weakness}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="glass rounded-3xl p-8"
        >
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Lightbulb className="w-6 h-6 text-amber-400" />
            {isIQTest ? '提升建议' : '成长建议'}
          </h3>
          <ul className="space-y-3">
            {safeResult.suggestions.map((suggestion, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="flex items-start gap-3"
              >
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-amber-400 to-orange-400 mt-2" />
                <span className="text-white/80">{suggestion}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="glass rounded-3xl p-8"
      >
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Briefcase className={`w-6 h-6 ${isIQTest ? 'text-amber-400' : 'text-violet-400'}`} />
          适合的职业方向
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {safeResult.careers.map((career, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 + index * 0.05 }}
              className={`rounded-xl px-4 py-3 text-center text-white/80 transition-all cursor-default border ${
                isIQTest
                  ? 'bg-gradient-to-br from-amber-500/10 to-orange-500/10 hover:from-amber-500/20 hover:to-orange-500/20 border-amber-500/20'
                  : 'bg-gradient-to-br from-violet-500/10 to-pink-500/10 hover:from-violet-500/20 hover:to-pink-500/20 border-violet-500/20'
              }`}
            >
              {career}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {mode === 'professional' && result.accuracy && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="glass rounded-3xl p-8"
        >
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-blue-400" />
            专业分析指标
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-white/60 text-sm mb-2">准确度</div>
              <div className="text-white text-2xl font-bold">{result.accuracy}%</div>
            </div>
            {'reliability' in result && result.reliability && (
              <div className="text-center">
                <div className="text-white/60 text-sm mb-2">信度</div>
                <div className="text-white text-2xl font-bold">{(result.reliability.cronbachAlpha * 100).toFixed(1)}%</div>
              </div>
            )}
            {'validity' in result && result.validity && (
              <div className="text-center">
                <div className="text-white/60 text-sm mb-2">效度</div>
                <div className="text-white text-2xl font-bold">{(result.validity.constructValidity * 100).toFixed(1)}%</div>
              </div>
            )}
            {'confidenceInterval' in result && result.confidenceInterval && (
              <div className="text-center">
                <div className="text-white/60 text-sm mb-2">置信区间</div>
                <div className="text-white text-2xl font-bold">{result.confidenceInterval.lower}-{result.confidenceInterval.upper}</div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  )
}
