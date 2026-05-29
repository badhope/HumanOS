import { motion } from 'framer-motion'
import { Award, TrendingUp, Lightbulb, Briefcase, Brain, BarChart3, GitBranch, Users, Target, Sparkles } from 'lucide-react'
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, Legend } from 'recharts'
import { AdvancedRadarChart } from './charts'
import type { AssessmentResult, ProfessionalAssessmentResult, Dimension } from '../types'

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
            formatter={(value: number, name: string, props: { payload: { isUser: boolean; name: string } }) => [
              props.payload.isUser ? '您的位置' : props.payload.name,
              `${value.toFixed(1)}`,
            ]}
          />
          <Legend />
          <Scatter name="您的位置" data={[scatterData[0]]} fill="#f59e0b">
            {scatterData.slice(1).map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Scatter>
          <Scatter
            name="人群中心"
            data={scatterData.slice(1)}
            fill="#6b7280"
          >
            {scatterData.slice(1).map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Scatter>
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  )
}

interface EnhancedReportTemplateProps {
  result: AssessmentResult | ProfessionalAssessmentResult
  mode: 'normal' | 'advanced' | 'professional'
  assessmentType: string
  ideologyScores?: Record<string, number>
  primaryIdeology?: string
  matchScore?: number
}

export default function EnhancedReportTemplate({
  result,
  mode,
  assessmentType,
  ideologyScores,
  primaryIdeology,
  matchScore,
}: EnhancedReportTemplateProps) {
  const dimensions = (result as ProfessionalAssessmentResult).dimensions || []
  const overallScore = result.score ?? 0
  const percentile = result.percentile ?? 0

  const radarData = dimensions.map((dim: Dimension) => ({
    dimension: dim.name,
    score: dim.score,
    average: 50,
  }))

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-3xl p-8"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center">
            <Award className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">综合评估报告</h2>
            <p className="text-white/60">基于 {dimensions.length} 个维度深度分析</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="glass rounded-xl p-6 text-center">
            <TrendingUp className="w-8 h-8 text-violet-400 mx-auto mb-2" />
            <p className="text-3xl font-bold text-white mb-1">{overallScore.toFixed(0)}</p>
            <p className="text-white/60 text-sm">综合得分</p>
          </div>
          <div className="glass rounded-xl p-6 text-center">
            <Users className="w-8 h-8 text-pink-400 mx-auto mb-2" />
            <p className="text-3xl font-bold text-white mb-1">Top {100 - percentile}%</p>
            <p className="text-white/60 text-sm">超越比例</p>
          </div>
          <div className="glass rounded-xl p-6 text-center">
            <Sparkles className="w-8 h-8 text-amber-400 mx-auto mb-2" />
            <p className="text-3xl font-bold text-white mb-1">{mode}</p>
            <p className="text-white/60 text-sm">测评模式</p>
          </div>
        </div>

        {dimensions.length > 0 && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Brain className="w-5 h-5 text-violet-400" />
              维度分析
            </h3>
            <div className="h-80">
              <AdvancedRadarChart dimensions={dimensions} />
            </div>
          </div>
        )}

        {ideologyScores && Object.keys(ideologyScores).length > 0 && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <GitBranch className="w-5 h-5 text-pink-400" />
              意识形态分析
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(ideologyScores).map(([key, value]) => (
                <div key={key} className="glass rounded-xl p-4 text-center">
                  <p className="text-2xl font-bold text-white mb-1">{(value as number).toFixed(0)}</p>
                  <p className="text-white/60 text-sm">{key}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {matchScore !== undefined && (
          <div className="glass rounded-xl p-6 text-center">
            <Target className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
            <p className="text-3xl font-bold text-white mb-1">{matchScore}%</p>
            <p className="text-white/60">匹配度</p>
          </div>
        )}
      </motion.div>

      {dimensions.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass rounded-3xl p-8"
        >
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-amber-400" />
            维度解读
          </h3>
          <div className="space-y-4">
            {dimensions.map((dim: Dimension) => (
              <div key={dim.name} className="glass rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-medium">{dim.name}</span>
                  <span className="text-violet-400 font-semibold">{dim.score.toFixed(0)}</span>
                </div>
                <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-violet-500 to-pink-500 rounded-full transition-all duration-500"
                    style={{ width: `${dim.score}%` }}
                  />
                </div>
                {dim.description && (
                  <p className="text-white/60 text-sm mt-2">{dim.description}</p>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass rounded-3xl p-8"
      >
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-blue-400" />
          建议与指导
        </h3>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-violet-500/20 flex items-center justify-center flex-shrink-0">
              <BarChart3 className="w-4 h-4 text-violet-400" />
            </div>
            <div>
              <h4 className="text-white font-medium mb-1">发挥优势</h4>
              <p className="text-white/60 text-sm">
                您的核心优势在于维度得分较高的领域，建议继续深化发展
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-pink-500/20 flex items-center justify-center flex-shrink-0">
              <Target className="w-4 h-4 text-pink-400" />
            </div>
            <div>
              <h4 className="text-white font-medium mb-1">提升空间</h4>
              <p className="text-white/60 text-sm">
                建议关注得分相对较低的维度，制定针对性的提升计划
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
