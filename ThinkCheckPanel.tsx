import { motion } from 'framer-motion'
import { Shield, AlertTriangle, CheckCircle, Info, Sparkles } from 'lucide-react'
import { evaluateReport, type ThinkCheckResult } from '../utils/thinkcheck'
import { useMemo } from 'react'

interface ThinkCheckPanelProps {
  reportText: string
  className?: string
}

export function ThinkCheckPanel({ reportText, className = '' }: ThinkCheckPanelProps) {
  const evaluation = useMemo(() => {
    if (!reportText || reportText.trim().length < 10) {
      return null
    }
    return evaluateReport(reportText)
  }, [reportText])

  if (!evaluation || !evaluation.success) {
    return null
  }

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A': return 'text-emerald-400'
      case 'B': return 'text-blue-400'
      case 'C': return 'text-amber-400'
      case 'D': return 'text-red-400'
      default: return 'text-gray-400'
    }
  }

  const getGradeBg = (grade: string) => {
    switch (grade) {
      case 'A': return 'from-emerald-500/20 to-teal-500/20 border-emerald-500/30'
      case 'B': return 'from-blue-500/20 to-cyan-500/20 border-blue-500/30'
      case 'C': return 'from-amber-500/20 to-orange-500/20 border-amber-500/30'
      case 'D': return 'from-red-500/20 to-rose-500/20 border-red-500/30'
      default: return 'from-gray-500/20 to-slate-500/20 border-gray-500/30'
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 0.75) return 'text-emerald-400'
    if (score >= 0.65) return 'text-blue-400'
    if (score >= 0.50) return 'text-amber-400'
    return 'text-red-400'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className={`glass rounded-3xl p-8 ${className}`}
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
          <Shield className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            报告逻辑健康度评估
            <span className="text-xs px-2 py-0.5 bg-cyan-500/20 text-cyan-300 rounded-full">
              ThinkCheck
            </span>
          </h3>
          <p className="text-white/50 text-sm">基于 ThinkCheck Harmony 引擎的智能分析</p>
        </div>
      </div>

      <div className={`rounded-2xl p-6 mb-6 bg-gradient-to-br ${getGradeBg(evaluation.interpretation.grade)} border`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`text-4xl font-black ${getGradeColor(evaluation.interpretation.grade)}`}>
              {evaluation.interpretation.grade}
            </div>
            <div>
              <div className="text-white font-semibold text-lg">
                {evaluation.interpretation.level}
              </div>
              <div className="text-white/60 text-sm">
                综合评分: <span className={`font-bold ${getScoreColor(evaluation.H)}`}>
                  {(evaluation.H * 100).toFixed(0)}%
                </span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-white/40 text-xs mb-1">健康度指数</div>
            <div className={`text-2xl font-bold ${getScoreColor(evaluation.H)}`}>
              {evaluation.H.toFixed(2)}
            </div>
          </div>
        </div>
        <p className="text-white/70 text-sm leading-relaxed">
          {evaluation.interpretation.description}
        </p>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-slate-800/50 rounded-xl p-4 text-center">
          <div className="text-white/50 text-xs mb-1">一致性 (U)</div>
          <div className={`text-xl font-bold ${getScoreColor(evaluation.U)}`}>
            {(evaluation.U * 100).toFixed(0)}%
          </div>
          <div className="text-white/40 text-xs mt-1">概念使用一致性</div>
        </div>
        <div className="bg-slate-800/50 rounded-xl p-4 text-center">
          <div className="text-white/50 text-xs mb-1">分布性 (D)</div>
          <div className={`text-xl font-bold ${getScoreColor(evaluation.D)}`}>
            {(evaluation.D * 100).toFixed(0)}%
          </div>
          <div className="text-white/40 text-xs mt-1">内容结构分布</div>
        </div>
        <div className="bg-slate-800/50 rounded-xl p-4 text-center">
          <div className="text-white/50 text-xs mb-1">矛盾性 (A)</div>
          <div className={`text-xl font-bold ${evaluation.A < 0.3 ? 'text-emerald-400' : 'text-amber-400'}`}>
            {(evaluation.A * 100).toFixed(0)}%
          </div>
          <div className="text-white/40 text-xs mt-1">逻辑矛盾程度</div>
        </div>
      </div>

      {evaluation.suggestions.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="text-white/80 font-medium text-sm">优化建议</span>
          </div>
          <ul className="space-y-2">
            {evaluation.suggestions.map((suggestion, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="flex items-start gap-2 text-white/70 text-sm"
              >
                <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                <span>{suggestion}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      )}

      {evaluation.warnings.length > 0 && (
        <div className="bg-amber-500/10 rounded-xl p-4 border border-amber-500/20">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <span className="text-amber-300 font-medium text-sm">注意事项</span>
          </div>
          <ul className="space-y-2">
            {evaluation.warnings.map((warning, index) => (
              <li
                key={index}
                className="flex items-start gap-2 text-amber-200/80 text-sm"
              >
                <Info className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                <span>{warning.message}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-6 pt-4 border-t border-white/10">
        <div className="flex items-center justify-between text-white/40 text-xs">
          <span>ThinkCheck Harmony v3.0</span>
          <span>评估引擎由 ThinkCheck 提供支持</span>
        </div>
      </div>
    </motion.div>
  )
}

export default ThinkCheckPanel
