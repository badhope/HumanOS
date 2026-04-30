import React, { useMemo, useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  AlertTriangle,
  CheckCircle,
  XCircle,
  Zap,
  Info,
  ArrowRight,
  Gauge,
  Timer,
  Database,
  ChevronDown,
  ChevronUp,
  Layers,
  Copy,
  Download,
  BookOpen,
  Activity,
} from 'lucide-react'
import { IDEOLOGY_DIMENSIONS, POLITICAL_IDEOLOGIES } from '../../data/political-ideology/ideology-theoretical-framework'
import type { ModeSpectrumResult, IdeologyConflictAnalysis, IdeologyMatch, PerspectiveResult } from '../../data/political-ideology/ideology-weighted-calculator'
import type { AssessmentMode } from '../../data/political-ideology/mode-configuration'
import { MODE_CONFIGURATIONS } from '../../data/political-ideology/mode-configuration'
import { withErrorBoundary } from '@utils/withErrorBoundary.tsx'
import { useToast } from '@hooks/useToast'

interface PoliticalIdeologySpectrumProps {
  result: ModeSpectrumResult
  compact?: boolean
  showConflicts?: boolean
  showPerspectives?: boolean
  showProfessionalAnalysis?: boolean
  showPerformanceMetrics?: boolean
  theme?: 'light' | 'dark'
}

const CONFLICT_COLORS = {
  complementary: { bg: 'bg-emerald-500/20', border: 'border-emerald-500', text: 'text-emerald-400', icon: CheckCircle },
  neutral: { bg: 'bg-slate-500/20', border: 'border-slate-400', text: 'text-slate-300', icon: Info },
  tension: { bg: 'bg-amber-500/20', border: 'border-amber-500', text: 'text-amber-400', icon: Zap },
  contradictory: { bg: 'bg-red-500/20', border: 'border-red-500', text: 'text-red-400', icon: XCircle },
}

const COMBINATION_STYLES = {
  coherent: { gradient: 'from-emerald-500 to-teal-600', icon: CheckCircle, label: '高度一致' },
  moderate: { gradient: 'from-blue-500 to-cyan-600', icon: Info, label: '温和平衡' },
  contradictory: { gradient: 'from-red-500 to-rose-600', icon: AlertTriangle, label: '内在矛盾' },
  eclectic: { gradient: 'from-violet-500 to-fuchsia-600', icon: Zap, label: '折衷混合' },
}

const MODE_BADGE_STYLES: Partial<Record<AssessmentMode, { gradient: string; icon: React.ReactNode }>> = {
  normal: { gradient: 'from-blue-500 to-cyan-500', icon: <Layers size={14} /> },
  advanced: { gradient: 'from-purple-500 to-pink-500', icon: <Zap size={14} /> },
  professional: { gradient: 'from-amber-500 to-orange-500', icon: <Gauge size={14} /> },
}

function PoliticalIdeologySpectrum({
  result,
  compact = false,
  showConflicts = true,
  showPerspectives = true,
  showProfessionalAnalysis = true,
  showPerformanceMetrics = true,
  enableExport = true,
  theme = 'dark',
}: PoliticalIdeologySpectrumProps & { enableExport?: boolean }) {
  const [activeDimension, setActiveDimension] = useState<string | null>(null)
  const [selectedIdeology, setSelectedIdeology] = useState<string | null>(null)
  const [showMetrics, setShowMetrics] = useState(false)
  const { success, error } = useToast()

  const modeConfig = MODE_CONFIGURATIONS[result.mode]

  useEffect(() => {
    success(`${modeConfig.displayName} 分析完成！`, 2500)
  }, [modeConfig.displayName, success])

  const handleCopyResult = useCallback(() => {
    try {
      const summary = {
        mode: result.mode,
        dominantIdeologies: result.dominantIdeologies.map(id => getIdeologyName(id)),
        combinationType: result.combinationType,
        calculationTimeMs: result.performanceMetrics?.calculationTime,
        generatedAt: new Date().toISOString(),
      }
      navigator.clipboard.writeText(JSON.stringify(summary, null, 2))
      success('分析结果已复制到剪贴板！')
    } catch {
      error('复制失败，请手动复制')
    }
  }, [result, success, error])

  const handleExportJSON = useCallback(() => {
    try {
      const dataStr = JSON.stringify(result, null, 2)
      const blob = new Blob([dataStr], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `ideology-analysis-${result.mode}-${Date.now()}.json`
      a.click()
      URL.revokeObjectURL(url)
      success('JSON 数据导出成功！')
    } catch {
      error('导出失败，请重试')
    }
  }, [result, success, error])

  const toggleMetrics = useCallback(() => {
    setShowMetrics(prev => !prev)
  }, [])

  const radarData = useMemo(() => {
    const centerX = 200
    const centerY = 200
    const radius = 140

    return IDEOLOGY_DIMENSIONS.map((dim, index) => {
      const score = result.spectralCoordinates[dim.id as keyof typeof result.spectralCoordinates]
      const angle = (index * 72 - 90) * (Math.PI / 180)
      const pointRadius = (score / 100) * radius

      return {
        ...dim,
        score,
        x: centerX + pointRadius * Math.cos(angle),
        y: centerY + pointRadius * Math.sin(angle),
        axisX: centerX + radius * Math.cos(angle),
        axisY: centerY + radius * Math.sin(angle),
        labelX: centerX + (radius + 25) * Math.cos(angle),
        labelY: centerY + (radius + 25) * Math.sin(angle),
        angle,
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result.spectralCoordinates])

  const radarPath = useMemo(() => {
    const points = radarData.map(d => `${d.x},${d.y}`)
    return `M ${points.join(' L ')} Z`
  }, [radarData])

  const gridCircles = useMemo(() => {
    return [20, 40, 60, 80, 100].map(percent => ({
      percent,
      radius: (percent / 100) * 140,
    }))
  }, [])

  const getIdeologyName = (id: string) => {
    return POLITICAL_IDEOLOGIES.find(i => i.id === id)?.name || id
  }

  const getConflictLabel = (type: IdeologyConflictAnalysis['conflictType']) => {
    const labels = {
      complementary: '互补协同',
      neutral: '中性共存',
      tension: '存在张力',
      contradictory: '根本矛盾',
    }
    return labels[type]
  }

  if (compact) {
    return (
      <div className="w-full p-4 rounded-xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700">
        <h4 className="text-lg font-bold text-white mb-3">意识形态光谱</h4>
        <div className="flex flex-wrap gap-2">
          {result.dominantIdeologies.map(id => (
            <span key={id} className="px-3 py-1 rounded-full bg-violet-500/20 text-violet-300 text-sm">
              {getIdeologyName(id)}
            </span>
          ))}
        </div>
        <div className="mt-3">
          <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm text-white bg-gradient-to-r ${COMBINATION_STYLES[result.combinationType].gradient}`}>
            {React.createElement(COMBINATION_STYLES[result.combinationType].icon, { size: 14 })}
            {COMBINATION_STYLES[result.combinationType].label}
          </span>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full space-y-8">
      {!compact && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="p-4 rounded-2xl bg-gradient-to-r from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-slate-700"
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r ${MODE_BADGE_STYLES[(result.mode || 'professional') as keyof typeof MODE_BADGE_STYLES]?.gradient || 'from-violet-500 to-pink-500'} text-white text-sm font-bold shadow-lg`}>
                {MODE_BADGE_STYLES[(result.mode || 'professional') as keyof typeof MODE_BADGE_STYLES]?.icon || '🔍'}
                {modeConfig.displayName}
              </span>
              <div>
                <div className="text-sm font-medium text-white">
                  {modeConfig.icon} {result.ideologyMatches.length} 种意识形态匹配
                </div>
                <div className="text-xs text-slate-400">
                  {result.dominantIdeologies.length} 个主导意识形态 · {Object.keys(result.spectralCoordinates).length} 维分析
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {enableExport && (
                <>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleCopyResult}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-700/50 hover:bg-slate-600/50 transition-colors"
                    title="复制结果摘要"
                  >
                    <Copy className="w-4 h-4 text-slate-300" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleExportJSON}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-violet-600/50 hover:bg-violet-500/50 transition-colors"
                    title="导出 JSON 数据"
                  >
                    <Download className="w-4 h-4 text-violet-300" />
                  </motion.button>
                </>
              )}

              {showPerformanceMetrics && result.performanceMetrics && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={toggleMetrics}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-700/50 hover:bg-slate-600/50 transition-colors"
                >
                  <Timer className="w-4 h-4 text-slate-300" />
                  <span className="text-sm text-slate-300">
                    {result.performanceMetrics.calculationTime} ms
                  </span>
                  {showMetrics ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                </motion.button>
              )}
            </div>
          </div>

          <AnimatePresence>
            {showMetrics && result.performanceMetrics && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="mt-4 pt-4 border-t border-slate-700 grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
                    <div className="flex items-center gap-2 mb-1">
                      <Timer className="w-4 h-4 text-emerald-400" />
                      <span className="text-xs text-emerald-300 font-medium">计算耗时</span>
                    </div>
                    <div className="text-xl font-bold text-white">
                      {result.performanceMetrics.calculationTime} ms
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-cyan-500/10 border border-cyan-500/30">
                    <div className="flex items-center gap-2 mb-1">
                      <Database className="w-4 h-4 text-cyan-400" />
                      <span className="text-xs text-cyan-300 font-medium">缓存命中率</span>
                    </div>
                    <div className="text-xl font-bold text-white">
                      {Math.round(result.performanceMetrics.cacheHitRate * 100)}%
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-violet-500/10 border border-violet-500/30">
                    <div className="flex items-center gap-2 mb-1">
                      <Layers className="w-4 h-4 text-violet-400" />
                      <span className="text-xs text-violet-300 font-medium">题目数量</span>
                    </div>
                    <div className="text-xl font-bold text-white">
                      {result.dimensionScores.reduce((sum, d) => sum + (d.questionCount || 0), 0)} 题
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/30">
                    <div className="flex items-center gap-2 mb-1">
                      <Gauge className="w-4 h-4 text-amber-400" />
                      <span className="text-xs text-amber-300 font-medium">算法类型</span>
                    </div>
                    <div className="text-xl font-bold text-white">
                      {modeConfig.algorithmConfig.similarityMethod}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="p-6 rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700"
        >
          <h3 className="text-xl font-bold text-white mb-4">五维意识形态光谱</h3>
          <svg viewBox="0 0 400 440" className="w-full h-auto">
            {gridCircles.map(circle => (
              <polygon
                key={circle.percent}
                points={IDEOLOGY_DIMENSIONS.map((_, index) => {
                  const angle = (index * 72 - 90) * (Math.PI / 180)
                  return `${200 + circle.radius * Math.cos(angle)},${200 + circle.radius * Math.sin(angle)}`
                }).join(' ')}
                fill="none"
                stroke={theme === 'dark' ? '#475569' : '#CBD5E1'}
                strokeWidth="1"
                opacity="0.5"
              />
            ))}

            {radarData.map((d, i) => (
              <line
                key={`axis-${i}`}
                x1="200"
                y1="200"
                x2={d.axisX}
                y2={d.axisY}
                stroke={theme === 'dark' ? '#475569' : '#CBD5E1'}
                strokeWidth="1"
                opacity="0.5"
              />
            ))}

            <motion.path
              d={radarPath}
              fill="url(#radarGradient)"
              stroke="url(#strokeGradient)"
              strokeWidth="3"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.7 }}
              transition={{ duration: 1.5, delay: 0.3, ease: "easeInOut" }}
            />

            <defs>
              <linearGradient id="radarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.5" />
                <stop offset="50%" stopColor="#EC4899" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.5" />
              </linearGradient>
              <linearGradient id="strokeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8B5CF6" />
                <stop offset="50%" stopColor="#EC4899" />
                <stop offset="100%" stopColor="#06B6D4" />
              </linearGradient>
              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {radarData.map((d, i) => (
              <g key={`point-group-${i}`}>
                <motion.circle
                  cx={d.x}
                  cy={d.y}
                  r="8"
                  fill="none"
                  stroke="#8B5CF6"
                  strokeWidth="2"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: [1, 1.5, 1], opacity: [0.8, 0, 0.8] }}
                  transition={{
                    duration: 2,
                    delay: 1.8 + i * 0.1,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <motion.circle
                  key={`point-${i}`}
                  cx={d.x}
                  cy={d.y}
                  r="7"
                  fill="url(#strokeGradient)"
                  stroke="white"
                  strokeWidth="2"
                  filter="url(#glow)"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.4, delay: 1.5 + i * 0.1, type: "spring" }}
                  className="cursor-pointer"
                  whileHover={{ scale: 1.3 }}
                  onMouseEnter={() => setActiveDimension(d.id)}
                  onMouseLeave={() => setActiveDimension(null)}
                />
              </g>
            ))}

            {radarData.map((d, i) => (
              <text
                key={`label-${i}`}
                x={d.labelX}
                y={d.labelY}
                textAnchor="middle"
                dominantBaseline="middle"
                fill={theme === 'dark' ? '#E2E8F0' : '#334155'}
                fontSize="11"
                fontWeight="500"
              >
                {d.name.replace('维度', '')}
              </text>
            ))}

            {activeDimension && (
              <g>
                <rect
                  x="120"
                  y="380"
                  width="160"
                  height="40"
                  rx="8"
                  fill="#1E293B"
                  stroke="#475569"
                />
                <text x="200" y="398" textAnchor="middle" fill="#E2E8F0" fontSize="12" fontWeight="bold">
                  {radarData.find(d => d.id === activeDimension)?.name}
                </text>
                <text x="200" y="414" textAnchor="middle" fill="#94A3B8" fontSize="11">
                  得分: {radarData.find(d => d.id === activeDimension)?.score}
                </text>
              </g>
            )}
          </svg>

          <div className="grid grid-cols-5 gap-2 mt-4">
            {radarData.map(d => (
              <div key={d.id} className="text-center">
                <div className="text-xs text-slate-400 mb-1">{d.name.replace('维度', '')}</div>
                <div className="text-lg font-bold text-violet-400">{d.score}</div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="p-6 rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-white">意识形态匹配度</h3>
            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm text-white bg-gradient-to-r ${COMBINATION_STYLES[result.combinationType].gradient}`}>
              {React.createElement(COMBINATION_STYLES[result.combinationType].icon, { size: 14 })}
              {COMBINATION_STYLES[result.combinationType].label}
            </span>
          </div>

          <p className="text-sm text-slate-300 mb-4">{result.combinationExplanation}</p>

          <div className="space-y-3">
            {result.ideologyMatches.slice(0, 8).map((match, index) => (
              <motion.div
                key={match.ideologyId}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                className={`p-3 rounded-lg border transition-all cursor-pointer ${
                  selectedIdeology === match.ideologyId
                    ? 'bg-violet-500/20 border-violet-500'
                    : 'bg-slate-700/30 border-slate-600 hover:bg-slate-700/50'
                }`}
                onClick={() => setSelectedIdeology(
                  selectedIdeology === match.ideologyId ? null : match.ideologyId
                )}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-slate-600 flex items-center justify-center text-xs font-bold text-white">
                      {index + 1}
                    </span>
                    <span className="font-medium text-white">{match.ideologyName}</span>
                    {result.dominantIdeologies.includes(match.ideologyId) && (
                      <span className="px-2 py-0.5 rounded-full bg-violet-500/30 text-violet-300 text-xs">
                        主导
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 group/progress">
                    <div className="w-28 h-3 rounded-full bg-slate-700 overflow-hidden relative">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-violet-500 via-pink-500 to-cyan-500 relative"
                        initial={{ width: 0 }}
                        animate={{ width: `${match.similarityScore * 100}%` }}
                        transition={{ duration: 1, delay: 0.8 + index * 0.1, ease: "easeOut" }}
                      >
                        <div className="absolute inset-0 bg-white/20 animate-pulse" />
                      </motion.div>
                      <motion.div
                        className="absolute top-0 left-0 h-full bg-white/30 rounded-full"
                        initial={{ width: 0, x: -20 }}
                        animate={{ width: '30%', x: 100 }}
                        transition={{
                          duration: 1.5,
                          delay: 1.5 + index * 0.1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      />
                    </div>
                    <motion.span
                      className="text-sm font-mono font-bold w-12 text-right"
                      style={{
                        color: `hsl(${match.similarityScore * 120}, 70%, 65%)`,
                      }}
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, delay: 1 + index * 0.1, repeat: Infinity }}
                    >
                      {Math.round(match.similarityScore * 100)}%
                    </motion.span>
                  </div>
                </div>

                {selectedIdeology === match.ideologyId && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-3 pt-3 border-t border-slate-600"
                  >
                    <div className="grid grid-cols-5 gap-1 text-center text-xs">
                      {Object.entries(match.dimensionOverlap).map(([dim, overlap]) => (
                        <div key={dim}>
                          <div className="text-slate-400">{dim.slice(0, 2)}</div>
                          <div className="font-bold" style={{ color: `hsl(${overlap * 120}, 70%, 60%)` }}>
                            {Math.round(overlap * 100)}%
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {showConflicts && result.conflictAnalysis.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="p-6 rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700"
        >
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <AlertTriangle className="text-amber-400" size={24} />
            意识形态关系分析
          </h3>

          <p className="text-sm text-slate-300 mb-6">
            系统检测到您同时具备的意识形态倾向之间存在以下关系模式。
            理解这些张力与协同有助于您更好地认识自己政治信念的内在结构。
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {result.conflictAnalysis.map((conflict, index) => {
              const style = CONFLICT_COLORS[conflict.conflictType]
              const Icon = style.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1 + index * 0.12, type: "spring" }}
                  whileHover={{ scale: 1.03, y: -4 }}
                  className={`p-5 rounded-xl border ${style.bg} ${style.border} cursor-pointer backdrop-blur-sm relative overflow-hidden group/card`}
                >
                  <motion.div
                    className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-10"
                    style={{
                      background: conflict.conflictType === 'contradictory'
                        ? 'radial-gradient(circle, #EF4444 0%, transparent 70%)'
                        : conflict.conflictType === 'tension'
                        ? 'radial-gradient(circle, #F59E0B 0%, transparent 70%)'
                        : conflict.conflictType === 'complementary'
                        ? 'radial-gradient(circle, #10B981 0%, transparent 70%)'
                        : 'radial-gradient(circle, #64748B 0%, transparent 70%)',
                    }}
                    animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.15, 0.1] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  />

                  <div className="relative">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <motion.div
                          whileHover={{ rotate: 15, scale: 1.1 }}
                          className={`p-2 rounded-lg ${style.bg}`}
                        >
                          <Icon className={style.text} size={22} />
                        </motion.div>
                        <span className={`font-bold text-lg ${style.text}`}>
                          {getConflictLabel(conflict.conflictType)}
                        </span>
                      </div>
                      <div className="text-right">
                        <div className="w-24 h-3 rounded-full bg-slate-700/50 overflow-hidden">
                          <motion.div
                            className="h-full rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${conflict.tensionLevel}%` }}
                            transition={{ duration: 1.2, delay: 1.5 + index * 0.1, ease: "easeOut" }}
                            style={{
                              background: conflict.tensionLevel > 70
                                ? 'linear-gradient(90deg, #EF4444, #F87171)'
                                : conflict.tensionLevel > 40
                                ? 'linear-gradient(90deg, #F59E0B, #FBBF24)'
                                : 'linear-gradient(90deg, #10B981, #34D399)',
                            }}
                          />
                        </div>
                        <span className="text-xs text-slate-400 mt-1 block">
                          张力指数: {conflict.tensionLevel}%
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 mb-4">
                      <motion.span
                        whileHover={{ scale: 1.05 }}
                        className="px-3 py-1.5 rounded-lg bg-slate-700/80 text-white text-sm font-medium shadow-lg"
                      >
                        {getIdeologyName(conflict.ideologyA)}
                      </motion.span>
                      <motion.div
                        animate={{ x: [0, 4, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <ArrowRight className="text-slate-400" size={20} />
                      </motion.div>
                      <motion.span
                        whileHover={{ scale: 1.05 }}
                        className="px-3 py-1.5 rounded-lg bg-slate-700/80 text-white text-sm font-medium shadow-lg"
                      >
                        {getIdeologyName(conflict.ideologyB)}
                      </motion.span>
                    </div>

                    <p className="text-sm text-slate-300 leading-relaxed">{conflict.explanation}</p>

                    {conflict.resolutionPath && (
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 2 + index * 0.1 }}
                        className="mt-3 p-3 rounded-lg bg-slate-700/30 border border-slate-600/50"
                      >
                        <p className="text-xs text-slate-300">
                          <span className="text-emerald-400 mr-1">💡</span>
                          {conflict.resolutionPath}
                        </p>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        className="p-6 rounded-2xl bg-gradient-to-br from-violet-900/30 to-slate-900/50 border border-violet-700/50"
      >
        <h3 className="text-xl font-bold text-white mb-4">核心意识形态特征</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {result.dominantIdeologies.map((ideologyId) => {
            const ideology = POLITICAL_IDEOLOGIES.find(i => i.id === ideologyId)
            if (!ideology) return null
            return (
              <div key={ideologyId} className="p-4 rounded-xl bg-slate-800/50 border border-slate-600">
                <h4 className="font-bold text-white mb-2">{ideology.name}</h4>
                <p className="text-xs text-slate-400 mb-3">{ideology.historicalContext}</p>
                <div className="flex flex-wrap gap-1">
                  {ideology.corePrinciples.map((principle, i) => (
                    <span key={i} className="px-2 py-0.5 rounded-full bg-violet-500/20 text-violet-300 text-xs">
                      {principle}
                    </span>
                  ))}
                </div>
                <div className="mt-3 text-xs text-slate-500">
                  代表思想家: {ideology.keyThinkers.join('、')}
                </div>
              </div>
            )
          })}
        </div>
      </motion.div>

      {showPerspectives && result.perspectiveAnalyses && result.perspectiveAnalyses.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="p-6 rounded-2xl bg-gradient-to-br from-cyan-900/30 to-slate-900/50 border border-cyan-700/50"
        >
          <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
            <Zap className="text-cyan-400" size={24} />
            多视角意识形态分析
          </h3>
          <p className="text-sm text-slate-400 mb-6">
            通过5种不同的理论视角对您的立场进行多维度交叉解读
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {result.perspectiveAnalyses.map((perspective, index) => (
              <motion.div
                key={perspective.perspectiveId}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 1.5 + index * 0.1 }}
                className="p-4 rounded-xl bg-slate-800/50 border border-slate-600"
              >
                <h4 className="font-bold text-cyan-400 mb-2">{perspective.name}</h4>
                <div className="text-xs text-slate-400 mb-3">
                  聚焦维度: {perspective.focusDimensions.map(d =>
                    IDEOLOGY_DIMENSIONS.find(dd => dd.id === d)?.name || d
                  ).join(' + ')}
                </div>

                <div className="space-y-1 mb-3">
                  {perspective.keyFindings.map((finding, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                      <span className="text-cyan-400 mt-0.5">•</span>
                      {finding}
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-slate-600">
                  <div className="text-xs text-slate-400">视角排名前3:</div>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {perspective.ideologyRanking.slice(0, 3).map((ideo, i) => (
                      <span key={i} className="px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-xs">
                        {ideo.ideologyName}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {showProfessionalAnalysis && result.professionalAnalysis && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.6 }}
          className="p-6 rounded-2xl bg-gradient-to-br from-amber-900/30 to-slate-900/50 border border-amber-700/50"
        >
          <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
            <Info className="text-amber-400" size={24} />
            专业级深度分析
          </h3>
          <p className="text-sm text-slate-400 mb-6">
            亚维度精密分解、小众意识形态检测、跨维度相关性分析
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div>
              <h4 className="font-bold text-white mb-3">亚维度精密分解</h4>
              <div className="space-y-3">
                {Object.entries(result.professionalAnalysis.subDimensionBreakdown).map(([dimId, subDims]) => (
                  <div key={dimId} className="p-3 rounded-lg bg-slate-800/50">
                    <div className="text-sm font-medium text-amber-400 mb-2">
                      {IDEOLOGY_DIMENSIONS.find(d => d.id === dimId)?.name || dimId}
                    </div>
                    <div className="space-y-1.5">
                      {subDims.map((sd: any) => (
                        <div key={sd.subDimensionId} className="flex items-center justify-between">
                          <span className="text-xs text-slate-300">{sd.name}</span>
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-1.5 rounded-full bg-slate-700">
                              <div
                                className="h-full rounded-full bg-amber-500"
                                style={{ width: `${sd.score}%` }}
                              />
                            </div>
                            <span className="text-xs font-mono text-slate-400 w-8">{sd.score}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-bold text-white mb-3">小众意识形态检测</h4>
              {result.professionalAnalysis.nicheIdeologyDetection.length > 0 ? (
                <div className="space-y-3">
                  {result.professionalAnalysis.nicheIdeologyDetection.map((niche, i) => (
                    <div key={i} className="p-3 rounded-lg bg-slate-800/50 border border-amber-500/30">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-amber-300">{niche.name}</span>
                        <span className="text-xs font-mono text-amber-400">
                          {Math.round(niche.confidence * 100)}%
                        </span>
                      </div>
                      <p className="text-xs text-slate-400">{niche.evidence}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-slate-400">未检测到显著的小众意识形态倾向</p>
              )}

              <h4 className="font-bold text-white mt-6 mb-3">算法一致性指标</h4>
              <div className="p-3 rounded-lg bg-slate-800/50 space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">标准余弦相似度</span>
                  <span className="font-mono text-slate-300">{result.professionalAnalysis.algorithmMetrics.cosineSimilarity}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">加权余弦相似度</span>
                  <span className="font-mono text-slate-300">{result.professionalAnalysis.algorithmMetrics.weightedSimilarity}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">集成算法得分</span>
                  <span className="font-mono text-amber-400">{result.professionalAnalysis.algorithmMetrics.ensembleSimilarity}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">算法共识度</span>
                  <span className="font-mono text-emerald-400">{result.professionalAnalysis.algorithmMetrics.consensusScore}</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-white mb-3">跨维度相关性分析</h4>
              <div className="space-y-3">
                {result.professionalAnalysis.crossDimensionCorrelations.map((corr, i) => (
                  <div key={i} className="p-3 rounded-lg bg-slate-800/50">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-white">
                        {IDEOLOGY_DIMENSIONS.find(d => d.id === corr.dimensionA)?.name?.replace('维度', '') || corr.dimensionA}
                        <ArrowRight size={14} className="inline mx-1 text-slate-500" />
                        {IDEOLOGY_DIMENSIONS.find(d => d.id === corr.dimensionB)?.name?.replace('维度', '') || corr.dimensionB}
                      </span>
                      <span className={`text-xs font-mono ${
                        corr.correlation > 0.3 ? 'text-emerald-400' :
                        corr.correlation < -0.3 ? 'text-rose-400' : 'text-slate-400'
                      }`}>
                        r = {corr.correlation > 0 ? '+' : ''}{corr.correlation}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400">{corr.interpretation}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-3 rounded-lg bg-amber-500/10 border border-amber-500/30">
                <p className="text-xs text-amber-300">
                  💡 <strong>专业模式提示:</strong> 您可以导出 JSON/CSV 格式的原始数据进行进一步的统计分析。支持 SPSS、R、Python 等专业工具导入。
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}

const ErrorBoundariedPoliticalIdeologySpectrum = withErrorBoundary(PoliticalIdeologySpectrum, '政治意识形态光谱分析')

export default ErrorBoundariedPoliticalIdeologySpectrum
