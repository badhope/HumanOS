import React, { useMemo } from 'react'
import { EnhancedAnalysisResult } from '../../utils/enhancedAnalysisFramework'

interface OverallSummaryProps {
  results: EnhancedAnalysisResult[]
}

export const OverallSummary: React.FC<OverallSummaryProps> = ({ results }) => {
  const avgScore = useMemo(() => {
    if (results.length === 0) return 0
    return results.reduce((sum, r) => sum + r.overallScore, 0) / results.length
  }, [results])

  const strengths = useMemo(() => {
    return results
      .filter(r => r.overallScore >= 70)
      .sort((a, b) => b.overallScore - a.overallScore)
      .slice(0, 3)
  }, [results])

  const improvements = useMemo(() => {
    return results
      .filter(r => r.overallScore < 60)
      .sort((a, b) => a.overallScore - b.overallScore)
      .slice(0, 3)
  }, [results])

  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-6 text-white mb-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold mb-1">综合分析报告</h2>
          <p className="text-blue-100">基于{results.length}个维度的深度分析</p>
        </div>
        <div className="text-right">
          <div className="text-4xl font-bold">{avgScore.toFixed(0)}</div>
          <div className="text-blue-100">综合得分</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {strengths.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-blue-100 mb-2">优势领域</h3>
            <div className="space-y-2">
              {strengths.map(s => (
                <div key={s.dimensionId} className="flex items-center gap-2 bg-white/10 rounded-lg px-3 py-2">
                  <span className="font-medium">{s.dimensionName}</span>
                  <span className="ml-auto">{s.overallScore.toFixed(0)}分</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {improvements.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-blue-100 mb-2">提升空间</h3>
            <div className="space-y-2">
              {improvements.map(s => (
                <div key={s.dimensionId} className="flex items-center gap-2 bg-white/10 rounded-lg px-3 py-2">
                  <span className="font-medium">{s.dimensionName}</span>
                  <span className="ml-auto">{s.overallScore.toFixed(0)}分</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
