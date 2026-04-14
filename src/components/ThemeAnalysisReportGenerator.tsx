import React, { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import {
  themeAnalysisFramework,
  type ThemeAnalysisModule,
  type ThemeAnalysisResult,
  type ComprehensiveThemeReport,
  type MetricResult
} from '../utils/themeAnalysisFramework'

interface ThemeAnalysisReportGeneratorProps {
  themeName: string
  analysisData: any
  onReportGenerated?: (report: ComprehensiveThemeReport) => void
}

export const ThemeAnalysisReportGenerator: React.FC<ThemeAnalysisReportGeneratorProps> = ({
  themeName,
  analysisData,
  onReportGenerated
}) => {
  const [selectedModule, setSelectedModule] = useState<string | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [report, setReport] = useState<ComprehensiveThemeReport | null>(null)

  const modules = useMemo(() => {
    return themeAnalysisFramework.getAllModules()
  }, [])

  const handleGenerateReport = async () => {
    setIsGenerating(true)
    try {
      const generatedReport = themeAnalysisFramework.generateComprehensiveReport(themeName, analysisData)
      setReport(generatedReport)
      onReportGenerated?.(generatedReport)
    } catch (error) {
      console.error('Report generation failed:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  const getModuleIcon = (category: string): string => {
    const icons: Record<string, string> = {
      theoretical: '📚',
      empirical: '📊',
      comparative: '⚖️',
      historical: '📜',
      behavioral: '🎭',
      contextual: '🌍',
      predictive: '🔮',
      evaluative: '✅'
    }
    return icons[category] || '📋'
  }

  const getMetricColor = (level: string): string => {
    const colors: Record<string, string> = {
      low: 'text-red-500',
      medium: 'text-yellow-500',
      high: 'text-green-500',
      exceptional: 'text-purple-500'
    }
    return colors[level] || 'text-gray-500'
  }

  const getMetricBgColor = (level: string): string => {
    const colors: Record<string, string> = {
      low: 'bg-red-100',
      medium: 'bg-yellow-100',
      high: 'bg-green-100',
      exceptional: 'bg-purple-100'
    }
    return colors[level] || 'bg-gray-100'
  }

  return (
    <div className="theme-analysis-report-generator p-6 bg-white rounded-xl shadow-lg">
      <div className="header mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          多维度主题分析报告生成器
        </h2>
        <p className="text-gray-600">
          主题: <span className="font-semibold text-indigo-600">{themeName}</span>
        </p>
      </div>

      {!report && (
        <div className="modules-overview mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            核心分析模块 ({modules.length}个)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {modules.map((module, index) => (
              <motion.div
                key={module.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`module-card p-4 rounded-lg border-2 cursor-pointer transition-all
                  ${selectedModule === module.id 
                    ? 'border-indigo-500 bg-indigo-50' 
                    : 'border-gray-200 hover:border-indigo-300'}`}
                onClick={() => setSelectedModule(selectedModule === module.id ? null : module.id)}
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">{getModuleIcon(module.category)}</span>
                  <div>
                    <h4 className="font-semibold text-gray-800">{module.name}</h4>
                    <span className="text-xs text-gray-500 uppercase">{module.category}</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {module.researchGoal.primary}
                </p>
                
                {selectedModule === module.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-4 pt-4 border-t border-gray-200"
                  >
                    <div className="space-y-3">
                      <div>
                        <h5 className="text-sm font-semibold text-gray-700">研究目标</h5>
                        <ul className="text-xs text-gray-600 mt-1 space-y-1">
                          {module.researchGoal.secondary.map((goal, i) => (
                            <li key={i}>• {goal}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h5 className="text-sm font-semibold text-gray-700">数据收集方法</h5>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`px-2 py-0.5 rounded text-xs font-medium
                            ${module.dataCollection.type === 'quantitative' ? 'bg-blue-100 text-blue-700' :
                              module.dataCollection.type === 'qualitative' ? 'bg-green-100 text-green-700' :
                              'bg-purple-100 text-purple-700'}`}>
                            {module.dataCollection.type === 'quantitative' ? '定量' :
                             module.dataCollection.type === 'qualitative' ? '定性' : '混合'}
                          </span>
                          <span className="text-xs text-gray-500">
                            {module.dataCollection.sources.length} 个数据源
                          </span>
                        </div>
                      </div>

                      <div>
                        <h5 className="text-sm font-semibold text-gray-700">评估指标</h5>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {module.evaluationMetrics.slice(0, 3).map((metric, i) => (
                            <span key={i} className="px-2 py-0.5 bg-gray-100 rounded text-xs text-gray-600">
                              {metric.name}
                            </span>
                          ))}
                          {module.evaluationMetrics.length > 3 && (
                            <span className="px-2 py-0.5 bg-gray-100 rounded text-xs text-gray-500">
                              +{module.evaluationMetrics.length - 3}
                            </span>
                          )}
                        </div>
                      </div>

                      <div>
                        <h5 className="text-sm font-semibold text-gray-700">依赖关系</h5>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {module.dependencies.length === 0 ? (
                            <span className="text-xs text-gray-400">无依赖</span>
                          ) : (
                            module.dependencies.map((dep, i) => (
                              <span key={i} className="px-2 py-0.5 bg-indigo-100 rounded text-xs text-indigo-600">
                                {modules.find(m => m.id === dep)?.name || dep}
                              </span>
                            ))
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {!report && (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleGenerateReport}
          disabled={isGenerating}
          className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition-all
            ${isGenerating 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700'}`}
        >
          {isGenerating ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              正在生成报告...
            </span>
          ) : (
            '生成综合分析报告'
          )}
        </motion.button>
      )}

      {report && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="report-content"
        >
          <div className="executive-summary mb-6 p-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl">
            <h3 className="text-xl font-bold text-gray-800 mb-4">执行摘要</h3>
            <p className="text-gray-700 mb-4">{report.executiveSummary.overview}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <h4 className="font-semibold text-gray-700 mb-2">关键发现</h4>
                <ul className="space-y-1">
                  {report.executiveSummary.keyFindings.slice(0, 5).map((finding, i) => (
                    <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                      <span className="text-indigo-500 mt-0.5">•</span>
                      {finding}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-700 mb-2">核心指标</h4>
                <div className="space-y-2">
                  {report.executiveSummary.criticalMetrics.slice(0, 4).map((metric, i) => (
                    <div key={i} className="flex items-center justify-between p-2 bg-white rounded">
                      <span className="text-sm text-gray-700">{metric.metricName}</span>
                      <span className={`text-sm font-semibold ${getMetricColor(metric.level)}`}>
                        {metric.value.toFixed(1)}{metric.unit}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="overall-rating flex items-center justify-between p-4 bg-white rounded-lg">
              <div>
                <span className="text-gray-600">总体评分</span>
                <div className="text-3xl font-bold text-indigo-600">
                  {(report.executiveSummary.overallRating * 100).toFixed(0)}%
                </div>
              </div>
              <div className={`px-4 py-2 rounded-lg font-semibold
                ${report.overallAssessment.rating === 'excellent' ? 'bg-green-100 text-green-700' :
                  report.overallAssessment.rating === 'good' ? 'bg-blue-100 text-blue-700' :
                  report.overallAssessment.rating === 'satisfactory' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'}`}>
                {report.overallAssessment.rating === 'excellent' ? '优秀' :
                 report.overallAssessment.rating === 'good' ? '良好' :
                 report.overallAssessment.rating === 'satisfactory' ? '合格' : '需改进'}
              </div>
            </div>
          </div>

          <div className="module-results mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">模块分析结果</h3>
            <div className="space-y-4">
              {report.moduleResults.map((result, index) => (
                <motion.div
                  key={result.moduleId}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="module-result p-4 bg-gray-50 rounded-lg border border-gray-200"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">
                        {getModuleIcon(modules.find(m => m.id === result.moduleId)?.category || '')}
                      </span>
                      <h4 className="font-semibold text-gray-800">{result.moduleName}</h4>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500">置信度</span>
                      <span className={`px-2 py-1 rounded text-sm font-medium
                        ${result.confidence > 0.8 ? 'bg-green-100 text-green-700' :
                          result.confidence > 0.6 ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'}`}>
                        {(result.confidence * 100).toFixed(0)}%
                      </span>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 mb-3">{result.summary}</p>

                  <div className="metrics-grid grid grid-cols-2 md:grid-cols-4 gap-2 mb-3">
                    {result.metrics.map((metric) => (
                      <div key={metric.metricId} className={`p-2 rounded ${getMetricBgColor(metric.level)}`}>
                        <div className="text-xs text-gray-500">{metric.metricName}</div>
                        <div className={`font-semibold ${getMetricColor(metric.level)}`}>
                          {metric.value.toFixed(1)}{metric.unit}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="findings">
                    <h5 className="text-sm font-semibold text-gray-700 mb-2">主要发现</h5>
                    <ul className="space-y-1">
                      {result.findings.slice(0, 3).map((finding) => (
                        <li key={finding.id} className="text-sm text-gray-600 flex items-start gap-2">
                          <span className={`mt-0.5
                            ${finding.significance === 'high' ? 'text-red-500' :
                              finding.significance === 'medium' ? 'text-yellow-500' :
                              'text-gray-400'}`}>●</span>
                          {finding.description}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="overall-assessment mb-6 p-6 bg-white rounded-xl border border-gray-200">
            <h3 className="text-xl font-bold text-gray-800 mb-4">综合评估</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-green-700 mb-2">✓ 优势</h4>
                <ul className="space-y-1">
                  {report.overallAssessment.strengths.map((strength, i) => (
                    <li key={i} className="text-sm text-gray-600">• {strength}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-red-700 mb-2">✗ 待改进</h4>
                <ul className="space-y-1">
                  {report.overallAssessment.weaknesses.map((weakness, i) => (
                    <li key={i} className="text-sm text-gray-600">• {weakness}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-blue-700 mb-2">→ 机会</h4>
                <ul className="space-y-1">
                  {report.overallAssessment.opportunities.map((opp, i) => (
                    <li key={i} className="text-sm text-gray-600">• {opp}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-orange-700 mb-2">⚠ 风险</h4>
                <ul className="space-y-1">
                  {report.overallAssessment.threats.map((threat, i) => (
                    <li key={i} className="text-sm text-gray-600">• {threat}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="action-plan mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">行动计划</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { phase: 'immediate', title: '立即行动', data: report.actionPlan.immediate },
                { phase: 'shortTerm', title: '短期计划', data: report.actionPlan.shortTerm },
                { phase: 'mediumTerm', title: '中期计划', data: report.actionPlan.mediumTerm },
                { phase: 'longTerm', title: '长期规划', data: report.actionPlan.longTerm }
              ].map((plan) => (
                <div key={plan.phase} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <h4 className="font-semibold text-gray-800 mb-1">{plan.title}</h4>
                  <p className="text-xs text-gray-500 mb-2">{plan.data.timeframe}</p>
                  <ul className="space-y-1">
                    {plan.data.objectives.map((obj, i) => (
                      <li key={i} className="text-sm text-gray-600">• {obj}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => setReport(null)}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              重新分析
            </button>
            <button
              onClick={() => {
                const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' })
                const url = URL.createObjectURL(blob)
                const a = document.createElement('a')
                a.href = url
                a.download = `theme-analysis-report-${Date.now()}.json`
                a.click()
              }}
              className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
            >
              导出报告
            </button>
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default ThemeAnalysisReportGenerator
