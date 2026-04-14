import React, { useState, useMemo } from 'react'
import {
  complexQuestionGenerator,
  ComplexQuestion,
  QuestionGenerationConfig,
  QuestionType,
  DifficultyLevel
} from '../utils/complexQuestionGenerator'

const QuestionTypeLabels: Record<QuestionType, string> = {
  scenario: '情景题',
  judgment: '判断题',
  multiple: '多选题',
  ranking: '排序题',
  scale: '量表题',
  scenario_multiple: '情景多选',
  case_analysis: '案例分析'
}

const DifficultyLabels: Record<DifficultyLevel, string> = {
  basic: '基础',
  intermediate: '中级',
  advanced: '高级',
  expert: '专家'
}

const VersionLabels = {
  normal: '普通版',
  advanced: '进阶版',
  professional: '专业版'
}

const QuestionComplexityIndicator: React.FC<{ complexity: number }> = ({ complexity }) => {
  const getColor = (value: number): string => {
    if (value >= 0.8) return '#22c55e'
    if (value >= 0.6) return '#3b82f6'
    if (value >= 0.4) return '#eab308'
    return '#ef4444'
  }

  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className="h-full transition-all duration-300"
          style={{ 
            width: `${complexity * 100}%`,
            backgroundColor: getColor(complexity)
          }}
        />
      </div>
      <span className="text-sm font-medium" style={{ color: getColor(complexity) }}>
        {(complexity * 100).toFixed(0)}%
      </span>
    </div>
  )
}

const QuestionCard: React.FC<{ question: ComplexQuestion }> = ({ question }) => {
  const [expanded, setExpanded] = useState(false)
  const complexity = complexQuestionGenerator.evaluateQuestionComplexity(question)
  const quality = complexQuestionGenerator.validateQuestionQuality(question)

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div 
        className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="px-2 py-1 text-xs font-medium rounded bg-blue-100 text-blue-700">
              {QuestionTypeLabels[question.type]}
            </span>
            <span className="px-2 py-1 text-xs font-medium rounded bg-purple-100 text-purple-700">
              {DifficultyLabels[question.difficulty]}
            </span>
            <span className="px-2 py-1 text-xs font-medium rounded bg-green-100 text-green-700">
              {question.version.map(v => VersionLabels[v]).join(', ')}
            </span>
          </div>
          <span className="text-sm text-gray-500">
            预计时间: {question.timeEstimate}秒
          </span>
        </div>

        {question.scenario && (
          <div className="mb-3 p-3 bg-amber-50 rounded border-l-4 border-amber-400">
            <p className="text-sm text-gray-700 whitespace-pre-line">{question.scenario}</p>
          </div>
        )}

        <p className="text-gray-900 font-medium mb-3">{question.text}</p>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-600">认知负荷:</span>
            <QuestionComplexityIndicator complexity={complexity.cognitiveDemand} />
          </div>
          <div>
            <span className="text-gray-600">整体复杂度:</span>
            <QuestionComplexityIndicator complexity={complexity.overallComplexity} />
          </div>
        </div>

        {!quality.isValid && (
          <div className="mt-3 p-2 bg-red-50 rounded border border-red-200">
            <p className="text-sm text-red-700 font-medium mb-1">质量问题:</p>
            <ul className="text-sm text-red-600 list-disc list-inside">
              {quality.issues.map((issue, idx) => (
                <li key={idx}>{issue}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {expanded && (
        <div className="border-t p-4 bg-gray-50">
          <h4 className="font-medium text-gray-900 mb-3">选项详情</h4>
          <div className="space-y-2">
            {question.options.map((option, idx) => (
              <div 
                key={option.id}
                className="p-3 bg-white rounded border"
              >
                <div className="flex items-start justify-between mb-2">
                  <span className="font-medium text-gray-900">
                    {String.fromCharCode(65 + idx)}. {option.text}
                  </span>
                  <span className={`px-2 py-1 text-xs rounded ${
                    option.value >= 4 ? 'bg-green-100 text-green-700' :
                    option.value >= 2 ? 'bg-blue-100 text-blue-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    价值: {option.value}
                  </span>
                </div>
                
                {option.reasoning && (
                  <p className="text-sm text-gray-600 mb-2">{option.reasoning}</p>
                )}

                {option.implications && (
                  <div className="flex flex-wrap gap-1 mb-2">
                    {option.implications.map((impl, i) => (
                      <span key={i} className="px-2 py-1 text-xs bg-gray-100 rounded">
                        {impl}
                      </span>
                    ))}
                  </div>
                )}

                {option.dimensionScores && (
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {Object.entries(option.dimensionScores).map(([dim, score]) => (
                      <div key={dim} className="flex justify-between">
                        <span className="text-gray-600">{dim}:</span>
                        <span className="font-medium">{(score * 100).toFixed(0)}%</span>
                      </div>
                    ))}
                  </div>
                )}

                {option.riskLevel && (
                  <div className="mt-2 flex items-center gap-2 text-xs">
                    <span className="text-gray-600">风险等级:</span>
                    <span className={`px-2 py-1 rounded ${
                      option.riskLevel === 'high' ? 'bg-red-100 text-red-700' :
                      option.riskLevel === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {option.riskLevel === 'high' ? '高' : option.riskLevel === 'medium' ? '中' : '低'}
                    </span>
                  </div>
                )}

                {option.shortTerm && option.longTerm && (
                  <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-gray-600">短期影响:</span>
                      <p className="text-gray-700">{option.shortTerm}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">长期影响:</span>
                      <p className="text-gray-700">{option.longTerm}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-4 p-3 bg-blue-50 rounded">
            <h5 className="font-medium text-gray-900 mb-2">分析维度</h5>
            <div className="flex flex-wrap gap-2">
              {question.dimensions.map((dim, idx) => (
                <span 
                  key={idx}
                  className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                >
                  {dim.dimensionId} (权重: {(dim.weight * 100).toFixed(0)}%)
                </span>
              ))}
            </div>
          </div>

          <div className="mt-4 p-3 bg-green-50 rounded">
            <h5 className="font-medium text-gray-900 mb-2">复杂度分析</h5>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-gray-600">认知需求:</span>
                <QuestionComplexityIndicator complexity={complexity.cognitiveDemand} />
              </div>
              <div>
                <span className="text-gray-600">情绪需求:</span>
                <QuestionComplexityIndicator complexity={complexity.emotionalDemand} />
              </div>
              <div>
                <span className="text-gray-600">社交需求:</span>
                <QuestionComplexityIndicator complexity={complexity.socialDemand} />
              </div>
              <div>
                <span className="text-gray-600">分析深度:</span>
                <QuestionComplexityIndicator complexity={complexity.analysisDepth} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

const QuestionOptimizer: React.FC = () => {
  const [version, setVersion] = useState<'normal' | 'advanced' | 'professional'>('professional')
  const [questionType, setQuestionType] = useState<QuestionType | 'all'>('all')
  const [minComplexity, setMinComplexity] = useState(0.5)

  const config: QuestionGenerationConfig = useMemo(() => ({
    version,
    targetDimensions: [
      'cognitive-ability',
      'decision-making',
      'emotional-intelligence',
      'leadership-potential',
      'creativity',
      'stress-resilience',
      'social-ability',
      'learning-ability',
      'professional-ability',
      'behavior-pattern'
    ],
    difficultyRange: ['intermediate', 'expert'],
    questionTypes: questionType === 'all' 
      ? ['scenario', 'judgment', 'multiple']
      : [questionType],
    minCognitiveLoad: minComplexity,
    minDiscrimination: 0.7,
    ensureBalance: true
  }), [version, questionType, minComplexity])

  const questions = useMemo(() => {
    return complexQuestionGenerator.generateQuestionSet(config)
  }, [config])

  const filteredQuestions = useMemo(() => {
    return questions.filter(q => {
      const complexity = complexQuestionGenerator.evaluateQuestionComplexity(q)
      return complexity.overallComplexity >= minComplexity
    })
  }, [questions, minComplexity])

  const stats = useMemo(() => {
    const typeCount: Record<string, number> = {}
    const difficultyCount: Record<string, number> = {}
    let avgComplexity = 0

    filteredQuestions.forEach(q => {
      typeCount[q.type] = (typeCount[q.type] || 0) + 1
      difficultyCount[q.difficulty] = (difficultyCount[q.difficulty] || 0) + 1
      avgComplexity += complexQuestionGenerator.evaluateQuestionComplexity(q).overallComplexity
    })

    return {
      total: filteredQuestions.length,
      typeCount,
      difficultyCount,
      avgComplexity: filteredQuestions.length > 0 ? avgComplexity / filteredQuestions.length : 0
    }
  }, [filteredQuestions])

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">题目优化工具</h1>
          <p className="text-gray-600">生成和管理高复杂度、高区分度的测评题目</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">生成配置</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                版本类型
              </label>
              <select
                value={version}
                onChange={(e) => setVersion(e.target.value as any)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="normal">普通版 (25题)</option>
                <option value="advanced">进阶版 (60题)</option>
                <option value="professional">专业版 (120题)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                题目类型
              </label>
              <select
                value={questionType}
                onChange={(e) => setQuestionType(e.target.value as any)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">全部类型</option>
                <option value="scenario">情景题</option>
                <option value="judgment">判断题</option>
                <option value="multiple">多选题</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                最低复杂度: {(minComplexity * 100).toFixed(0)}%
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={minComplexity}
                onChange={(e) => setMinComplexity(parseFloat(e.target.value))}
                className="w-full"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">题目统计</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">总题目数</p>
              <p className="text-2xl font-bold text-blue-700">{stats.total}</p>
            </div>

            <div className="p-4 bg-green-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">平均复杂度</p>
              <p className="text-2xl font-bold text-green-700">
                {(stats.avgComplexity * 100).toFixed(1)}%
              </p>
            </div>

            <div className="p-4 bg-purple-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">题目类型分布</p>
              <div className="text-sm space-y-1">
                {Object.entries(stats.typeCount).map(([type, count]) => (
                  <div key={type} className="flex justify-between">
                    <span>{QuestionTypeLabels[type as QuestionType]}:</span>
                    <span className="font-medium">{count}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 bg-amber-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">难度分布</p>
              <div className="text-sm space-y-1">
                {Object.entries(stats.difficultyCount).map(([diff, count]) => (
                  <div key={diff} className="flex justify-between">
                    <span>{DifficultyLabels[diff as DifficultyLevel]}:</span>
                    <span className="font-medium">{count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">
            题目列表 ({filteredQuestions.length})
          </h2>
          
          {filteredQuestions.map((question, idx) => (
            <QuestionCard key={question.id || idx} question={question} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default QuestionOptimizer
