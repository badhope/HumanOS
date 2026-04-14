import { motion } from 'framer-motion'
import { Award, TrendingUp, Lightbulb, Briefcase, Target, Brain, BarChart3 } from 'lucide-react'
import { ComprehensiveChartSystem, CircularProgressChart, AdvancedBarChart } from './charts'
import type { AssessmentResult, ProfessionalAssessmentResult } from '../types'

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
