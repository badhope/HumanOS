import React from 'react'
import { MetricDisplay } from './MetricDisplay'
import { CorrelationDisplay } from './CorrelationDisplay'
import {
  EnhancedAnalysisResult,
  EnhancedAnalysisDimension,
  AnalysisLayer,
  MetricResult,
  CorrelationResult,
} from '../../utils/enhancedAnalysisFramework'

const getLevelColor = (level: string): string => {
  const colors: Record<string, string> = {
    very_low: '#ef4444',
    low: '#f97316',
    average: '#eab308',
    high: '#22c55e',
    very_high: '#3b82f6'
  }
  return colors[level] || '#6b7280'
}

const getLevelLabel = (level: string): string => {
  const labels: Record<string, string> = {
    very_low: '需提升',
    low: '较低',
    average: '中等',
    high: '较高',
    very_high: '优秀'
  }
  return labels[level] || '未知'
}

interface DimensionCardProps {
  dimension: EnhancedAnalysisDimension
  analysisResult: EnhancedAnalysisResult
  layer: AnalysisLayer
  isExpanded: boolean
  onToggle: () => void
}

export const DimensionCard: React.FC<DimensionCardProps> = ({
  dimension,
  analysisResult,
  layer,
  isExpanded,
  onToggle
}) => {
  const layerResult = analysisResult.layerResults[layer]
  if (!layerResult) return null

  return (
    <div
      className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300"
      style={{ borderLeftColor: dimension.color, borderLeftWidth: '4px' }}
    >
      <div
        className="p-5 cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={onToggle}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{dimension.icon}</span>
            <div>
              <h3 className="font-semibold text-gray-900">{dimension.name}</h3>
              <p className="text-sm text-gray-500">{dimension.description}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-2xl font-bold" style={{ color: getLevelColor(analysisResult.level) }}>
                {analysisResult.overallScore.toFixed(0)}
              </div>
              <div className="text-xs text-gray-500">百分位 {analysisResult.percentile}%</div>
            </div>
            <span
              className="px-2 py-1 rounded-full text-xs font-medium"
              style={{
                backgroundColor: `${getLevelColor(analysisResult.level)}20`,
                color: getLevelColor(analysisResult.level)
              }}
            >
              {getLevelLabel(analysisResult.level)}
            </span>
            <svg
              className={`w-5 h-5 text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      {isExpanded && (
        <div className="border-t border-gray-100 p-5 space-y-5">
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3">核心指标</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {layerResult.metrics.map(metric => (
                <MetricDisplay key={metric.metricId} metric={metric} />
              ))}
            </div>
          </div>

          {layerResult.interpretation && (
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">分析解读</h4>
              <p className="text-gray-600 bg-gray-50 rounded-lg p-4">{layerResult.interpretation}</p>
            </div>
          )}

          {layerResult.insights.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">关键洞察</h4>
              <ul className="space-y-2">
                {layerResult.insights.map((insight, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-gray-600">
                    <span className="text-blue-500 mt-1">•</span>
                    {insight}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {layerResult.recommendations.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">改进建议</h4>
              <div className="space-y-2">
                {layerResult.recommendations.map((rec, idx) => (
                  <div key={idx} className="bg-blue-50 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className={`px-2 py-0.5 rounded text-xs font-medium ${
                          rec.priority === 'high'
                            ? 'bg-red-100 text-red-700'
                            : rec.priority === 'medium'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {rec.priority === 'high' ? '高优先' : rec.priority === 'medium' ? '中优先' : '低优先'}
                      </span>
                      <span className="font-medium text-gray-900">{rec.action}</span>
                    </div>
                    <p className="text-sm text-gray-600">{rec.rationale}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {analysisResult.correlations.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">维度关联</h4>
              <div className="bg-gray-50 rounded-lg p-3">
                {analysisResult.correlations.map((corr, idx) => (
                  <CorrelationDisplay key={idx} correlation={corr} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
