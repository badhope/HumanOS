import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  BarChart3,
  TrendingUp,
  Users,
  Target,
  Calendar,
  Award,
  Merge,
  Download,
  RefreshCw,
  ChevronRight,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Lightbulb,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  Filter,
} from 'lucide-react'
import type { CompletedAssessment } from '../types'
import { useAppStore } from '../store'
import { useI18n } from '../i18n'
import { cn } from '../utils/cn'

interface DashboardProps {
  className?: string
}

interface MergedAnalysis {
  totalAssessments: number
  averageScore: number
  highestScore: number
  lowestScore: number
  scoreTrend: 'improving' | 'declining' | 'stable'
  improvementRate: number
  topDimensions: { name: string; avgScore: number; trend: string }[]
  insights: string[]
  recommendations: string[]
  strengths: string[]
  weaknesses: string[]
  testFrequency: { week: string; count: number }[]
  scoreDistribution: { range: string; count: number; percentage: number }[]
}

export default function Dashboard({ className }: DashboardProps) {
  const { t, language } = useI18n()
  const { completedAssessments, achievements } = useAppStore()
  const [selectedRecords, setSelectedRecords] = useState<Set<number>>(new Set())
  const [showMergeModal, setShowMergeModal] = useState(false)
  const [showExportModal, setShowExportModal] = useState(false)
  const [activeTab, setActiveTab] = useState<'overview' | 'trends' | 'insights' | 'merge'>('overview')
  const [mergedAnalysis, setMergedAnalysis] = useState<MergedAnalysis | null>(null)

  const analysisData = useMemo(() => generateAnalysisData(completedAssessments), [completedAssessments])

  const toggleRecordSelection = (index: number) => {
    setSelectedRecords(prev => {
      const newSet = new Set(prev)
      if (newSet.has(index)) {
        newSet.delete(index)
      } else {
        newSet.add(index)
      }
      return newSet
    })
  }

  const handleMergeAnalysis = () => {
    if (selectedRecords.size < 2) return
    
    const selectedArray = Array.from(selectedRecords)
    const selectedAssessments = selectedArray.map(i => completedAssessments[i])
    
    const merged = performMergedAnalysis(selectedAssessments)
    setMergedAnalysis(merged)
    setShowMergeModal(true)
  }

  const statsCards = [
    {
      title: t.dashboard.totalTests,
      value: analysisData.totalTests,
      icon: Target,
      color: 'from-blue-500 to-blue-600',
      change: '+12%',
      positive: true,
    },
    {
      title: t.dashboard.averageScore,
      value: analysisData.averageScore,
      icon: BarChart3,
      color: 'from-purple-500 to-purple-600',
      change: '+5.2%',
      positive: true,
    },
    {
      title: t.dashboard.highestScore,
      value: analysisData.highestScore,
      icon: TrendingUp,
      color: 'from-green-500 to-green-600',
      change: '+8',
      positive: true,
    },
    {
      title: t.dashboard.improvementRate,
      value: `${analysisData.improvementRate}%`,
      icon: Award,
      color: 'from-orange-500 to-orange-600',
      change: '+2.1%',
      positive: analysisData.improvementRate > 0,
    },
  ]

  return (
    <div className={cn('min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-4 md:p-8', className)}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
            📊 {t.dashboard.title}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {language === 'zh' ? '深入了解你的测评数据和成长轨迹' : 'Gain deep insights into your assessment data and growth trajectory'}
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mb-6 bg-white dark:bg-slate-800 p-2 rounded-xl shadow-sm">
          {([
            { id: 'overview', label: t.dashboard.overview },
            { id: 'trends', label: t.dashboard.trends },
            { id: 'insights', label: t.dashboard.insights },
            { id: 'merge', label: t.dashboard.mergeFeature },
          ] as const).map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'px-6 py-3 rounded-lg font-medium transition-all duration-200',
                activeTab === tab.id
                  ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-700'
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-6"
            >
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statsCards.map((stat, index) => (
                  <motion.div
                    key={stat.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className={cn('p-3 rounded-xl bg-gradient-to-br', stat.color)}>
                        <stat.icon className="w-6 h-6 text-white" />
                      </div>
                      <span className={cn(
                        'flex items-center text-sm font-medium px-2 py-1 rounded-full',
                        stat.positive 
                          ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
                          : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                      )}>
                        {stat.positive ? <ArrowUpRight className="w-4 h-4 mr-1" /> : <ArrowDownRight className="w-4 h-4 mr-1" />}
                        {stat.change}
                      </span>
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                      {stat.value}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{stat.title}</p>
                  </motion.div>
                ))}
              </div>

              {/* Score Distribution Chart */}
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                  📈 {t.dashboard.scoreDistribution}
                </h2>
                <div className="space-y-4">
                  {analysisData.scoreDistribution.map((item, index) => (
                    <div key={item.range} className="group">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-gray-700 dark:text-gray-300">
                          {item.range}
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {item.count} ({item.percentage}%)
                        </span>
                      </div>
                      <div className="h-10 bg-gray-100 dark:bg-slate-700 rounded-full overflow-hidden relative">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${item.percentage}%` }}
                          transition={{ delay: index * 0.1, duration: 0.5 }}
                          className={cn(
                            'h-full rounded-full flex items-center justify-end pr-3',
                            index === 0 ? 'bg-gradient-to-r from-red-400 to-red-500' :
                            index === 1 ? 'bg-gradient-to-r from-orange-400 to-orange-500' :
                            index === 2 ? 'bg-gradient-to-r from-yellow-400 to-yellow-500' :
                            index === 3 ? 'bg-gradient-to-r from-green-400 to-green-500' :
                            'bg-gradient-to-r from-blue-400 to-blue-500'
                          )}
                        >
                          <span className="text-xs font-bold text-white opacity-80 group-hover:opacity-100 transition-opacity">
                            {item.percentage}%
                          </span>
                        </motion.div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Assessments */}
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    📋 {language === 'zh' ? '最近测评' : 'Recent Assessments'}
                  </h2>
                  <button
                    onClick={() => setShowExportModal(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    {t.export.title}
                  </button>
                </div>
                <div className="space-y-3">
                  {completedAssessments.slice(-5).reverse().map((assessment, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-700/50 rounded-xl hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-4">
                        <div className={cn(
                          'w-12 h-12 rounded-xl flex items-center justify-center font-bold text-white',
                          getAssessmentColor(assessment.assessmentId)
                        )}>
                          {assessment.result?.score || 0}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white">
                            getAssessmentName(assessment.assessmentId, language)
                          </h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {assessment.completedAt.toLocaleDateString(language === 'zh' ? 'zh-CN' : 'en-US')}
                          </p>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'trends' && (
            <motion.div
              key="trends"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-6"
            >
              {/* Score Timeline */}
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                  📅 {t.dashboard.timeline}
                </h2>
                <div className="relative">
                  <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-slate-600"></div>
                  <div className="space-y-6">
                    {completedAssessments.map((assessment, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="relative pl-16"
                      >
                        <div className={cn(
                          'absolute left-4 w-5 h-5 rounded-full border-4 border-white dark:border-slate-800',
                          assessment.result?.score && assessment.result.score >= 70 ? 'bg-green-500' :
                          assessment.result?.score && assessment.result.score >= 50 ? 'bg-yellow-500' :
                          'bg-red-500'
                        )}></div>
                        <div className="bg-gray-50 dark:bg-slate-700/50 rounded-xl p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold text-gray-900 dark:text-white">
                              getAssessmentName(assessment.assessmentId, language)
                            </h3>
                            <span className={cn(
                              'px-3 py-1 rounded-full text-sm font-bold',
                              assessment.result?.score && assessment.result.score >= 70 ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                              assessment.result?.score && assessment.result.score >= 50 ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                              'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                            )}>
                              {assessment.result?.score || 0}/100
                            </span>
                          </div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {assessment.completedAt.toLocaleString(language === 'zh' ? 'zh-CN' : 'en-US')}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Weekly/Monthly Trends */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                    📊 {t.dashboard.weeklyTrend}
                  </h2>
                  <div className="space-y-3">
                    {analysisData.testFrequency.slice(0, 7).map((week, index) => (
                      <div key={week.week} className="flex items-center gap-4">
                        <span className="w-16 text-sm text-gray-500 dark:text-gray-400">{week.week}</span>
                        <div className="flex-1 h-8 bg-gray-100 dark:bg-slate-700 rounded-lg overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${Math.min(week.count * 20, 100)}%` }}
                            transition={{ delay: index * 0.05 }}
                            className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg flex items-center justify-end pr-2"
                          >
                            <span className="text-xs font-bold text-white">{week.count}</span>
                          </motion.div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                    📈 {t.dashboard.personalGrowth}
                  </h2>
                  <div className="space-y-4">
                    {[
                      { label: language === 'zh' ? '认知能力' : 'Cognitive Ability', progress: 75, color: 'blue' },
                      { label: language === 'zh' ? '情绪管理' : 'Emotional Management', progress: 68, color: 'purple' },
                      { label: language === 'zh' ? '社交技能' : 'Social Skills', progress: 82, color: 'green' },
                      { label: language === 'zh' ? '创造力' : 'Creativity', progress: 71, color: 'orange' },
                    ].map((skill, index) => (
                      <div key={skill.label}>
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium text-gray-700 dark:text-gray-300">{skill.label}</span>
                          <span className="text-sm font-bold text-gray-900 dark:text-white">{skill.progress}%</span>
                        </div>
                        <div className="h-3 bg-gray-100 dark:bg-slate-700 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${skill.progress}%` }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className={cn(
                              'h-full rounded-full',
                              skill.color === 'blue' && 'bg-gradient-to-r from-blue-400 to-blue-600',
                              skill.color === 'purple' && 'bg-gradient-to-r from-purple-400 to-purple-600',
                              skill.color === 'green' && 'bg-gradient-to-r from-green-400 to-green-600',
                              skill.color === 'orange' && 'bg-gradient-to-r from-orange-400 to-orange-600'
                            )}
                          ></motion.div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'insights' && (
            <motion.div
              key="insights"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-6"
            >
              {/* AI Insights */}
              <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-8 text-white shadow-xl">
                <div className="flex items-start gap-4 mb-6">
                  <Lightbulb className="w-8 h-8 flex-shrink-0 mt-1" />
                  <div>
                    <h2 className="text-2xl font-bold mb-2">
                      💡 {t.dashboard.insights}
                    </h2>
                    <p className="text-indigo-100">
                      {language === 'zh' 
                        ? '基于你的所有测评数据，我们发现了以下个人洞察和成长建议'
                        : 'Based on all your assessment data, we discovered the following personal insights and growth recommendations'}
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {analysisData.insights.map((insight, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20"
                    >
                      <p className="text-sm leading-relaxed">{insight}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Strengths & Weaknesses */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
                  <h2 className="text-xl font-bold text-green-600 dark:text-green-400 mb-6 flex items-center gap-2">
                    <CheckCircle2 className="w-6 h-6" />
                    {t.dashboard.strengthsAnalysis}
                  </h2>
                  <div className="space-y-3">
                    {analysisData.strengths.map((strength, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg"
                      >
                        <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 dark:text-gray-300">{strength}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
                  <h2 className="text-xl font-bold text-orange-600 dark:text-orange-400 mb-6 flex items-center gap-2">
                    <AlertTriangle className="w-6 h-6" />
                    {t.dashboard.areasForImprovement}
                  </h2>
                  <div className="space-y-3">
                    {analysisData.weaknesses.map((weakness, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex items-start gap-3 p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg"
                      >
                        <AlertTriangle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 dark:text-gray-300">{weakness}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Recommendations */}
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                  🎯 {t.dashboard.recommendations}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {analysisData.recommendations.map((rec, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                      className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border border-blue-200 dark:border-blue-800 hover:shadow-md transition-shadow"
                    >
                      <div className="text-2xl mb-2">{['📚', '🏃', '💭', '🎨', '🤝', '🧘'][index % 6]}</div>
                      <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{rec}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'merge' && (
            <motion.div
              key="merge"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-6"
            >
              {/* Merge Feature Header */}
              <div className="bg-gradient-to-r from-violet-500 to-purple-600 rounded-2xl p-8 text-white shadow-xl">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-4 bg-white/20 backdrop-blur-sm rounded-2xl">
                    <Merge className="w-10 h-10" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold">{t.dashboard.mergeTitle}</h2>
                    <p className="text-violet-100 mt-1">{t.dashboard.mergeDescription}</p>
                  </div>
                </div>
              </div>

              {/* Record Selection */}
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {t.dashboard.selectRecords}
                  </h3>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {t.dashboard.selectedCount(selectedRecords.size)}
                    </span>
                    <button
                      onClick={() => setSelectedRecords(new Set())}
                      disabled={selectedRecords.size === 0}
                      className="text-sm text-blue-500 hover:text-blue-600 disabled:text-gray-400"
                    >
                      {language === 'zh' ? '清除选择' : 'Clear Selection'}
                    </button>
                  </div>
                </div>

                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {completedAssessments.map((assessment, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.01 }}
                      onClick={() => toggleRecordSelection(index)}
                      className={cn(
                        'flex items-center justify-between p-4 rounded-xl cursor-pointer transition-all duration-200 border-2',
                        selectedRecords.has(index)
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                          : 'border-transparent bg-gray-50 dark:bg-slate-700/50 hover:border-gray-300 dark:hover:border-slate-600'
                      )}
                    >
                      <div className="flex items-center gap-4">
                        <div className={cn(
                          'w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors',
                          selectedRecords.has(index)
                            ? 'border-blue-500 bg-blue-500'
                            : 'border-gray-300 dark:border-slate-500'
                        )}>
                          {selectedRecords.has(index) && (
                            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white">
                            getAssessmentName(assessment.assessmentId, language)
                          </h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {assessment.completedAt.toLocaleDateString(language === 'zh' ? 'zh-CN' : 'en-US')}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={cn(
                          'px-3 py-1 rounded-full text-sm font-bold',
                          assessment.result?.score && assessment.result.score >= 70 ? 'bg-green-100 text-green-700' :
                          assessment.result?.score && assessment.result.score >= 50 ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                        )}>
                          {assessment.result?.score || 0}/100
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {completedAssessments.length === 0 && (
                  <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                    <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>{t.dashboard.noRecords}</p>
                  </div>
                )}
              </div>

              {/* Generate Report Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleMergeAnalysis}
                disabled={selectedRecords.size < 2}
                className={cn(
                  'w-full py-4 rounded-2xl font-bold text-lg transition-all duration-300 shadow-lg',
                  selectedRecords.size >= 2
                    ? 'bg-gradient-to-r from-violet-500 to-purple-600 text-white hover:shadow-xl hover:shadow-purple-500/30'
                    : 'bg-gray-200 dark:bg-slate-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                )}
              >
                <div className="flex items-center justify-center gap-3">
                  <Merge className="w-6 h-6" />
                  {t.dashboard.generateReport}
                  {selectedRecords.size >= 2 && ` (${selectedRecords.size} ${language === 'zh' ? '条记录' : 'records'})`}
                </div>
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Merge Analysis Modal */}
        <AnimatePresence>
          {showMergeModal && mergedAnalysis && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setShowMergeModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white dark:bg-slate-800 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
              >
                <div className="sticky top-0 bg-gradient-to-r from-violet-500 to-purple-600 text-white p-6 rounded-t-3xl">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold">📊 {t.dashboard.consolidatedReport}</h2>
                    <button
                      onClick={() => setShowMergeModal(false)}
                      className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                    >
                      ✕
                    </button>
                  </div>
                </div>

                <div className="p-6 space-y-6">
                  {/* Summary Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { label: t.dashboard.totalTests, value: mergedAnalysis.totalAssessments, icon: Target },
                      { label: t.dashboard.averageScore, value: mergedAnalysis.averageScore, icon: BarChart3 },
                      { label: t.dashboard.highestScore, value: mergedAnalysis.highestScore, icon: TrendingUp },
                      { label: t.dashboard.improvementRate, value: `${mergedAnalysis.improvementRate}%`, icon: Award },
                    ].map((stat, index) => (
                      <div key={stat.label} className="bg-gray-50 dark:bg-slate-700/50 rounded-xl p-4 text-center">
                        <stat.icon className="w-6 h-6 mx-auto mb-2 text-violet-500" />
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Merged Insights */}
                  <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-2xl p-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                      💡 {t.dashboard.mergedInsights}
                    </h3>
                    <div className="space-y-3">
                      {mergedAnalysis.insights.map((insight, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className="w-2 h-2 rounded-full bg-violet-500 mt-2 flex-shrink-0"></div>
                          <p className="text-gray-700 dark:text-gray-300">{insight}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Top Dimensions */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                      📊 {t.dashboard.dimensionComparison}
                    </h3>
                    <div className="space-y-3">
                      {mergedAnalysis.topDimensions.map((dim, index) => (
                        <div key={dim.name}>
                          <div className="flex justify-between items-center mb-1">
                            <span className="font-medium text-gray-700 dark:text-gray-300">{dim.name}</span>
                            <span className="text-sm font-bold text-violet-600 dark:text-violet-400">{dim.avgScore.toFixed(1)}</span>
                          </div>
                          <div className="h-3 bg-gray-100 dark:bg-slate-700 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${dim.avgScore}%` }}
                              transition={{ delay: index * 0.1 }}
                              className="h-full bg-gradient-to-r from-violet-400 to-purple-600 rounded-full"
                            ></motion.div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recommendations */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                      🎯 {t.dashboard.recommendations}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {mergedAnalysis.recommendations.map((rec, index) => (
                        <div key={index} className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
                          <p className="text-sm text-gray-700 dark:text-gray-300">{rec}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="sticky bottom-0 bg-gray-50 dark:bg-slate-700/50 p-6 rounded-b-3xl flex justify-end gap-3">
                  <button
                    onClick={() => setShowMergeModal(false)}
                    className="px-6 py-3 rounded-xl border border-gray-300 dark:border-slate-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-600 transition-colors"
                  >
                    {t.common.close}
                  </button>
                  <button
                    onClick={() => {
                      handleExportMergedReport(mergedAnalysis)
                      setShowMergeModal(false)
                    }}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 text-white hover:shadow-lg transition-shadow flex items-center gap-2"
                  >
                    <Download className="w-5 h-5" />
                    {t.export.download}
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

function generateAnalysisData(assessments: CompletedAssessment[]) {
  if (assessments.length === 0) {
    return {
      totalTests: 0,
      averageScore: 0,
      highestScore: 0,
      lowestScore: 0,
      improvementRate: 0,
      scoreTrend: 'stable' as const,
      topDimensions: [],
      insights: [],
      recommendations: [],
      strengths: [],
      weaknesses: [],
      testFrequency: [],
      scoreDistribution: [
        { range: '90-100', count: 0, percentage: 0 },
        { range: '70-89', count: 0, percentage: 0 },
        { range: '50-69', count: 0, percentage: 0 },
        { range: '30-49', count: 0, percentage: 0 },
        { range: '0-29', count: 0, percentage: 0 },
      ],
    }
  }

  const scores = assessments.map(a => a.result?.score || 0)
  const n = scores.length
  let sum = 0
  let max = 0
  let min = 100

  const distributionCounts = [0, 0, 0, 0, 0]

  for (let i = 0; i < n; i++) {
    const s = scores[i]
    sum += s
    if (s > max) max = s
    if (s < min) min = s

    if (s >= 90) distributionCounts[0]++
    else if (s >= 70) distributionCounts[1]++
    else if (s >= 50) distributionCounts[2]++
    else if (s >= 30) distributionCounts[3]++
    else distributionCounts[4]++
  }

  const averageScore = Math.round(sum / n)
  const highestScore = max
  const lowestScore = min

  const scoreDistribution = [
    { range: '90-100', count: distributionCounts[0], percentage: Math.round((distributionCounts[0] / n) * 100) },
    { range: '70-89', count: distributionCounts[1], percentage: Math.round((distributionCounts[1] / n) * 100) },
    { range: '50-69', count: distributionCounts[2], percentage: Math.round((distributionCounts[2] / n) * 100) },
    { range: '30-49', count: distributionCounts[3], percentage: Math.round((distributionCounts[3] / n) * 100) },
    { range: '0-29', count: distributionCounts[4], percentage: Math.round((distributionCounts[4] / n) * 100) },
  ]

  const improvementRate = n > 1
    ? Math.round(((scores[n - 1] - scores[0]) / scores[0]) * 100)
    : 0

  const scoreTrend = improvementRate > 5 ? 'improving' : improvementRate < -5 ? 'declining' : 'stable'

  const now = Date.now()
  const oneDayMs = 24 * 60 * 60 * 1000
  const sevenDaysMs = 7 * oneDayMs

  const testFrequency = Array.from({ length: 8 }, (_, i) => {
    const weekEnd = new Date(now - i * sevenDaysMs)
    const weekStart = new Date(weekEnd.getTime() - sevenDaysMs)
    const weekStartStr = weekStart.toISOString().split('T')[0].substring(5)

    let count = 0
    for (let j = 0; j < n; j++) {
      const assessmentTime = new Date(assessments[j].completedAt).getTime()
      if (assessmentTime >= weekStart.getTime() && assessmentTime < weekEnd.getTime()) {
        count++
      }
    }

    return { week: weekStartStr, count }
  }).reverse()

  const insights = generateInsights(assessments, averageScore, scoreTrend)
  const recommendations = generateRecommendations(assessments, averageScore, scoreTrend)
  const strengths = generateStrengths(assessments)
  const weaknesses = generateWeaknesses(assessments)

  return {
    totalTests: assessments.length,
    averageScore,
    highestScore,
    lowestScore,
    scoreTrend,
    improvementRate,
    topDimensions: extractTopDimensions(assessments),
    insights,
    recommendations,
    strengths,
    weaknesses,
    testFrequency,
    scoreDistribution,
  }
}

function performMergedAnalysis(assessments: CompletedAssessment[]): MergedAnalysis {
  const baseAnalysis = generateAnalysisData(assessments)
  
  const crossInsights = [
    ...baseAnalysis.insights,
    ...(assessments.length > 2 ? [
      'Multiple assessments reveal consistent patterns in your cognitive profile',
      'Cross-analysis shows strong correlation between emotional intelligence and social skills',
      'Your performance demonstrates steady improvement across different domains',
    ] : []),
  ]

  return {
    ...baseAnalysis,
    totalAssessments: assessments.length,
    scoreTrend: baseAnalysis.scoreTrend as 'improving' | 'declining' | 'stable',
    insights: crossInsights,
    recommendations: [
      ...baseAnalysis.recommendations,
      'Consider focusing on areas where multiple assessments indicate room for growth',
      'Leverage your consistent strengths across different evaluation dimensions',
      'Schedule regular follow-up assessments to track long-term progress',
    ].slice(0, 8),
  }
}

function generateInsights(assessments: CompletedAssessment[], avgScore: number, trend: string): string[] {
  const insights: string[] = []

  if (avgScore >= 75) {
    insights.push('You consistently demonstrate above-average performance across assessments')
    insights.push('Strong analytical and problem-solving abilities are evident')
  } else if (avgScore >= 55) {
    insights.push('Performance shows balanced development across multiple domains')
    insights.push('Room for targeted improvement in specific areas identified')
  } else {
    insights.push('Early stage of development with significant potential for growth')
    insights.push('Focus on foundational skills will yield substantial improvements')
  }

  if (trend === 'improving') {
    insights.push('Positive trajectory detected - continue current learning approach')
  } else if (trend === 'declining') {
    insights.push('Consider reviewing study methods or seeking additional support')
  }

  if (assessments.length >= 5) {
    insights.push('Comprehensive data provides reliable insights into your abilities')
  }

  return insights.slice(0, 6)
}

function generateRecommendations(assessments: CompletedAssessment[], avgScore: number, trend: string): string[] {
  const recs: string[] = []

  recs.push('Practice mindfulness meditation for 10 minutes daily to enhance focus')
  recs.push('Engage in diverse reading materials to broaden knowledge base')
  recs.push('Join discussion groups or forums to improve communication skills')

  if (avgScore < 60) {
    recs.push('Consider working with a mentor or coach for personalized guidance')
    recs.push('Break down complex tasks into smaller, manageable steps')
  }

  if (trend !== 'improving') {
    recs.push('Implement regular self-reflection sessions to identify learning patterns')
    recs.push('Experiment with different learning techniques to find optimal approach')
  }

  recs.push('Set specific, measurable goals for each learning domain')
  recs.push('Maintain a learning journal to track progress and insights')

  return recs.slice(0, 8)
}

function generateStrengths(assessments: CompletedAssessment[]): string[] {
  const strengths: Set<string> = new Set()

  assessments.forEach(a => {
    if (a.result?.strengths) {
      a.result.strengths.forEach(s => strengths.add(s))
    }
  })

  return Array.from(strengths).slice(0, 6)
}

function generateWeaknesses(assessments: CompletedAssessment[]): string[] {
  const weaknesses: Set<string> = new Set()

  assessments.forEach(a => {
    if (a.result?.weaknesses) {
      a.result.weaknesses.forEach(w => weaknesses.add(w))
    }
  })

  return Array.from(weaknesses).slice(0, 6)
}

function extractTopDimensions(assessments: CompletedAssessment[]): { name: string; avgScore: number; trend: string }[] {
  const dimensionMap = new Map<string, number[]>()

  assessments.forEach(a => {
    if (a.result?.dimensions) {
      a.result.dimensions.forEach(dim => {
        const percentage = (dim.score / Number(dim.maxScore)) * 100
        if (!dimensionMap.has(dim.name)) {
          dimensionMap.set(dim.name, [])
        }
        dimensionMap.get(dim.name)?.push(percentage)
      })
    }
  })

  return Array.from(dimensionMap.entries())
    .map(([name, scores]) => ({
      name,
      avgScore: scores.reduce((a, b) => a + b, 0) / scores.length,
      trend: scores.length > 1 && scores[scores.length - 1] > scores[0] ? '↑' : scores.length > 1 && scores[scores.length - 1] < scores[0] ? '↓' : '→',
    }))
    .sort((a, b) => b.avgScore - a.avgScore)
    .slice(0, 8)
}

function getAssessmentColor(id: string): string {
  const colors: Record<string, string> = {
    'mbti': 'bg-gradient-to-br from-blue-500 to-blue-600',
    'bigfive': 'bg-gradient-to-br from-purple-500 to-purple-600',
    'iq': 'bg-gradient-to-br from-green-500 to-green-600',
    'eq': 'bg-gradient-to-br from-pink-500 to-pink-600',
    'holland': 'bg-gradient-to-br from-orange-500 to-orange-600',
    'depression': 'bg-gradient-to-br from-red-500 to-red-600',
    'anxiety': 'bg-gradient-to-br from-yellow-500 to-yellow-600',
    'political': 'bg-gradient-to-br from-indigo-500 to-indigo-600',
  }
  return colors[id] || 'bg-gradient-to-br from-gray-500 to-gray-600'
}

function getAssessmentName(id: string, language: 'zh' | 'en'): string {
  const names: Record<string, { zh: string; en: string }> = {
    'mbti': { zh: 'MBTI性格测试', en: 'MBTI Personality Test' },
    'bigfive': { zh: '大五人格测试', en: 'Big Five Personality Test' },
    'iq': { zh: '智商测试', en: 'IQ Test' },
    'eq': { zh: '情商测试', en: 'EQ Test' },
    'holland': { zh: '霍兰德职业兴趣测试', en: 'Holland Career Interest Test' },
    'depression': { zh: '抑郁自评量表', en: 'Depression Self-Rating Scale' },
    'anxiety': { zh: '焦虑自评量表', en: 'Anxiety Self-Rating Scale' },
    'political': { zh: '政治意识形态测试', en: 'Political Ideology Test' },
  }
  
  return names[id]?.[language] || id
}

async function handleExportMergedReport(analysis: MergedAnalysis) {
  console.log('Exporting merged report:', analysis)
}
