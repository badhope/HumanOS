import React, { useMemo, useState, useCallback } from 'react'
import {
  EnhancedAnalysisResult,
  EnhancedAnalysisDimension,
  VersionConfig,
  AnalysisLayer,
  AssessmentVersion,
  enhancedAnalysisFramework,
  MetricResult,
  CorrelationResult
} from '../utils/enhancedAnalysisFramework'
import { AssessmentResult, Dimension } from '../types'

interface IntegratedAnalysisReportProps {
  result: AssessmentResult
  assessmentType: string
  mode?: AssessmentVersion
  answers?: Record<string, any>
  onExport?: () => void
}

interface DimensionCardProps {
  dimension: EnhancedAnalysisDimension
  analysisResult: EnhancedAnalysisResult
  layer: AnalysisLayer
  isExpanded: boolean
  onToggle: () => void
}

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

const MetricDisplay: React.FC<{ metric: MetricResult }> = ({ metric }) => (
  <div className="bg-gray-50 rounded-lg p-4">
    <div className="flex justify-between items-center mb-2">
      <span className="text-sm font-medium text-gray-700">{metric.name}</span>
      <span className="text-xs text-gray-500">{metric.unit}</span>
    </div>
    <div className="flex items-baseline gap-2">
      <span className="text-2xl font-bold text-gray-900">{metric.value.toFixed(1)}</span>
      {metric.percentile !== undefined && (
        <span className="text-sm text-gray-500">前{metric.percentile.toFixed(0)}%</span>
      )}
    </div>
    {metric.trend && (
      <div className={`text-xs mt-1 ${metric.trend === 'up' ? 'text-green-600' : metric.trend === 'down' ? 'text-red-600' : 'text-gray-500'}`}>
        {metric.trend === 'up' ? '↑ 上升' : metric.trend === 'down' ? '↓ 下降' : '→ 稳定'}
      </div>
    )}
  </div>
)

const CorrelationDisplay: React.FC<{ correlation: CorrelationResult }> = ({ correlation }) => (
  <div className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
    <div className="flex items-center gap-2">
      <div className={`w-2 h-2 rounded-full ${correlation.correlationType === 'positive' ? 'bg-green-500' : correlation.correlationType === 'negative' ? 'bg-red-500' : 'bg-gray-500'}`} />
      <span className="text-sm text-gray-700">{correlation.dimensionName}</span>
    </div>
    <div className="flex items-center gap-2">
      <span className="text-xs text-gray-500">{(correlation.strength * 100).toFixed(0)}%</span>
      <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full ${correlation.correlationType === 'positive' ? 'bg-green-500' : 'bg-red-500'}`}
          style={{ width: `${correlation.strength * 100}%` }}
        />
      </div>
    </div>
  </div>
)

const DimensionCard: React.FC<DimensionCardProps> = ({
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

const LayerSelector: React.FC<{
  layers: AnalysisLayer[]
  currentLayer: AnalysisLayer
  onChange: (layer: AnalysisLayer) => void
}> = ({ layers, currentLayer, onChange }) => {
  const layerLabels: Record<AnalysisLayer, string> = {
    basic: '基础分析',
    advanced: '进阶分析',
    expert: '专家解读'
  }

  if (layers.length <= 1) return null

  return (
    <div className="flex gap-2 bg-gray-100 rounded-lg p-1">
      {layers.map(layer => (
        <button
          key={layer}
          onClick={() => onChange(layer)}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
            currentLayer === layer
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          {layerLabels[layer]}
        </button>
      ))}
    </div>
  )
}

const VersionBadge: React.FC<{ config: VersionConfig }> = ({ config }) => (
  <div className="flex items-center gap-2">
    <span
      className={`px-3 py-1 rounded-full text-sm font-medium ${
        config.version === 'professional'
          ? 'bg-purple-100 text-purple-700'
          : config.version === 'advanced'
          ? 'bg-blue-100 text-blue-700'
          : 'bg-gray-100 text-gray-700'
      }`}
    >
      {config.displayName}
    </span>
    <span className="text-sm text-gray-500">{config.description}</span>
  </div>
)

const OverallSummary: React.FC<{
  results: EnhancedAnalysisResult[]
  version: AssessmentVersion
}> = ({ results, version }) => {
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

const IntegratedAnalysisReport: React.FC<IntegratedAnalysisReportProps> = ({
  result,
  assessmentType,
  mode = 'normal',
  answers = {},
  onExport
}) => {
  const [expandedDimensions, setExpandedDimensions] = useState<Set<string>>(new Set())
  const [currentLayer, setCurrentLayer] = useState<AnalysisLayer>('basic')

  const versionConfig = useMemo(() => {
    return enhancedAnalysisFramework.getVersionConfig(mode)
  }, [mode])

  const analysisResults = useMemo(() => {
    const data = {
      ...result,
      ...answers,
      dimensions: result.dimensions?.reduce((acc, dim) => {
        acc[dim.name] = dim.score
        return acc
      }, {} as Record<string, number>)
    }
    return enhancedAnalysisFramework.generateComprehensiveAnalysis(mode, data)
  }, [result, answers, mode])

  const dimensions = useMemo(() => {
    return enhancedAnalysisFramework.getDimensionsForVersion(mode)
  }, [mode])

  const toggleDimension = useCallback((dimensionId: string) => {
    setExpandedDimensions(prev => {
      const next = new Set(prev)
      if (next.has(dimensionId)) {
        next.delete(dimensionId)
      } else {
        next.add(dimensionId)
      }
      return next
    })
  }, [])

  const expandAll = useCallback(() => {
    setExpandedDimensions(new Set(dimensions.map(d => d.id)))
  }, [dimensions])

  const collapseAll = useCallback(() => {
    setExpandedDimensions(new Set())
  }, [])

  if (!versionConfig) {
    return <div className="p-4 text-red-500">无效的版本配置</div>
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <VersionBadge config={versionConfig} />
        <div className="flex items-center gap-2">
          <button
            onClick={expandAll}
            className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            展开全部
          </button>
          <button
            onClick={collapseAll}
            className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            收起全部
          </button>
          {onExport && (
            <button
              onClick={onExport}
              className="px-4 py-1.5 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              导出报告
            </button>
          )}
        </div>
      </div>

      <OverallSummary results={analysisResults} version={mode} />

      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">维度分析</h3>
        <LayerSelector
          layers={versionConfig.analysisDepth}
          currentLayer={currentLayer}
          onChange={setCurrentLayer}
        />
      </div>

      <div className="space-y-4">
        {analysisResults.map((analysisResult, index) => {
          const dimension = dimensions.find(d => d.id === analysisResult.dimensionId)
          if (!dimension) return null

          return (
            <DimensionCard
              key={analysisResult.dimensionId}
              dimension={dimension}
              analysisResult={analysisResult}
              layer={currentLayer}
              isExpanded={expandedDimensions.has(analysisResult.dimensionId)}
              onToggle={() => toggleDimension(analysisResult.dimensionId)}
            />
          )
        })}
      </div>

      {versionConfig.features.some(f => f.id === 'benchmark') && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">行业基准对比</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {analysisResults.map(result => {
              const dimension = dimensions.find(d => d.id === result.dimensionId)
              if (!dimension?.benchmarks.industryBenchmarks?.length) return null

              return (
                <div key={result.dimensionId} className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-3">{dimension.name}</h4>
                  <div className="space-y-2">
                    {dimension.benchmarks.industryBenchmarks.map(benchmark => (
                      <div key={benchmark.industry} className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">{benchmark.industry}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">{result.overallScore.toFixed(0)}</span>
                          <span className="text-gray-400">vs</span>
                          <span className="text-sm text-gray-500">{benchmark.mean}</span>
                          <span
                            className={`text-xs ${
                              result.overallScore >= benchmark.mean ? 'text-green-600' : 'text-red-600'
                            }`}
                          >
                            {result.overallScore >= benchmark.mean ? '↑' : '↓'}
                            {Math.abs(result.overallScore - benchmark.mean).toFixed(0)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">维度关联图谱</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {analysisResults.map(result => (
            <div
              key={result.dimensionId}
              className="bg-gray-50 rounded-lg p-3 text-center"
            >
              <div className="text-2xl font-bold mb-1" style={{ color: getLevelColor(result.level) }}>
                {result.overallScore.toFixed(0)}
              </div>
              <div className="text-sm text-gray-600">
                {result.dimensionName}
              </div>
              {result.correlations.length > 0 && (
                <div className="mt-2 flex justify-center gap-1">
                  {result.correlations.slice(0, 3).map((corr, idx) => (
                    <div
                      key={idx}
                      className="w-2 h-2 rounded-full"
                      style={{
                        backgroundColor: corr.correlationType === 'positive' ? '#22c55e' : '#ef4444',
                        opacity: corr.strength
                      }}
                      title={`${corr.dimensionName}: ${(corr.strength * 100).toFixed(0)}%`}
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="text-center text-sm text-gray-500 py-4">
        报告生成时间：{new Date().toLocaleString('zh-CN')}
        <br />
        分析置信度：{(analysisResults.reduce((sum, r) => sum + r.confidence, 0) / analysisResults.length * 100).toFixed(1)}%
      </div>
    </div>
  )
}

export default IntegratedAnalysisReport
