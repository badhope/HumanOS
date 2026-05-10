import React, { useMemo, useState, useCallback } from 'react'
import {
  EnhancedAnalysisResult,
  EnhancedAnalysisDimension,
  AnalysisLayer,
  AssessmentVersion,
  enhancedAnalysisFramework,
} from '../../utils/enhancedAnalysisFramework'
import { AssessmentResult } from '../../types'

import {
  MetricDisplay,
  CorrelationDisplay,
  DimensionCard,
  LayerSelector,
  VersionBadge,
  OverallSummary,
} from './index'

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

interface IntegratedAnalysisReportProps {
  result: AssessmentResult
  assessmentType: string
  mode?: AssessmentVersion
  answers?: Record<string, unknown>
  onExport?: () => void
}

export default function IntegratedAnalysisReport({
  result,
  assessmentType: _assessmentType,
  mode = 'normal',
  answers = {},
  onExport
}: IntegratedAnalysisReportProps) {
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

      <OverallSummary results={analysisResults} />

      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">维度分析</h3>
        <LayerSelector
          layers={versionConfig.analysisDepth}
          currentLayer={currentLayer}
          onChange={setCurrentLayer}
        />
      </div>

      <div className="space-y-4">
        {analysisResults.map((analysisResult) => {
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
