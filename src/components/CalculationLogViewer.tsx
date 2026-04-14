import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  FileText,
  Calculator,
  CheckCircle,
  XCircle,
  Clock,
  Database,
  TrendingUp,
  Eye,
  EyeOff,
  ChevronDown,
  ChevronRight,
  Download,
  RefreshCw,
} from 'lucide-react'
import { getAllCalculationLogs, clearCalculationLogs, type CalculationLog, type CalculationLogEntry } from '@data/professional/iq/iq-calculator'

export default function CalculationLogViewer() {
  const [logs, setLogs] = useState<CalculationLog[]>(getAllCalculationLogs())
  const [expandedLog, setExpandedLog] = useState<string | null>(null)
  const [showDetails, setShowDetails] = useState(false)

  const refreshLogs = () => {
    setLogs(getAllCalculationLogs())
  }

  const exportLogs = () => {
    const data = {
      exportDate: new Date().toISOString(),
      logs: getAllCalculationLogs(),
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `calculation-logs-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const clearLogs = () => {
    if (confirm('确定要清空所有计算日志吗？')) {
      clearCalculationLogs()
      refreshLogs()
    }
  }

  const getLogIcon = (mode: string) => {
    switch (mode) {
      case 'normal': return '🟢'
      case 'advanced': return '🔵'
      case 'professional': return '🔴'
      default: return '⚪'
    }
  }

  const getModeName = (mode: string) => {
    switch (mode) {
      case 'normal': return '普通版'
      case 'advanced': return '进阶版'
      case 'professional': return '专业版'
      default: return mode
    }
  }

  const getStepColor = (step: string) => {
    if (step.includes('初始化')) return 'text-gray-400'
    if (step.includes('统计')) return 'text-blue-400'
    if (step.includes('正确率')) return 'text-cyan-400'
    if (step.includes('分数')) return 'text-violet-400'
    if (step.includes('标准化')) return 'text-purple-400'
    if (step.includes('信度')) return 'text-amber-400'
    if (step.includes('维度')) return 'text-green-400'
    if (step.includes('输出')) return 'text-pink-400'
    if (step.includes('校验')) return 'text-orange-400'
    return 'text-white/60'
  }

  const formatValue = (entry: CalculationLogEntry) => {
    if (typeof entry.value === 'boolean') {
      return entry.value ? '✅ 通过' : '❌ 未通过'
    }
    if (typeof entry.value === 'number') {
      return entry.value.toFixed(4)
    }
    if (typeof entry.value === 'object') {
      return '📦 对象数据'
    }
    return String(entry.value)
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center">
            <Calculator className="w-6 h-6 text-cyan-400" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              计算日志查看器
              <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-400 text-sm">
                {logs.length} 条会话
              </span>
            </h3>
            <p className="text-white/50 text-sm">完整追踪每次测评的计算过程与中间结果</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 text-white/70 text-sm hover:bg-white/20 transition-colors"
          >
            {showDetails ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            {showDetails ? '隐藏公式' : '显示公式'}
          </button>
          <button
            onClick={refreshLogs}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 text-white/70 text-sm hover:bg-white/20 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            刷新
          </button>
          <button
            onClick={exportLogs}
            disabled={logs.length === 0}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-cyan-500/20 text-cyan-400 text-sm hover:bg-cyan-500/30 transition-colors disabled:opacity-50"
          >
            <Download className="w-4 h-4" />
            导出
          </button>
        </div>
      </div>

      {logs.length === 0 ? (
        <div className="text-center py-12 rounded-2xl bg-white/5 border border-white/10">
          <Database className="w-16 h-16 mx-auto mb-4 text-white/30" />
          <p className="text-white/50 mb-2">暂无计算日志</p>
          <p className="text-white/30 text-sm">完成智商测评后，计算日志将自动显示在这里</p>
        </div>
      ) : (
        <div className="space-y-3">
          {logs.slice().reverse().map((log) => (
            <motion.div
              key={log.sessionId}
              layout
              className="rounded-2xl overflow-hidden border border-white/10 bg-white/5"
            >
              <div
                className="flex items-center justify-between p-4 cursor-pointer hover:bg-white/5 transition-colors"
                onClick={() => setExpandedLog(expandedLog === log.sessionId ? null : log.sessionId)}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{getLogIcon(log.testMode)}</span>
                  <div>
                    <p className="font-semibold text-white flex items-center gap-2">
                      {getModeName(log.testMode)}
                      <span className="text-xs text-white/40 font-mono">{log.sessionId}</span>
                    </p>
                    <div className="flex items-center gap-4 text-xs text-white/50">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {new Date(log.startTime).toLocaleString('zh-CN')}
                      </span>
                      <span className="flex items-center gap-1">
                        <FileText className="w-3 h-3" />
                        {log.entries.length} 条记录
                      </span>
                      <span className="flex items-center gap-1">
                        {log.validationChecks.every(c => c.passed) ? (
                          <CheckCircle className="w-3 h-3 text-green-400" />
                        ) : (
                          <XCircle className="w-3 h-3 text-red-400" />
                        )}
                        {log.validationChecks.filter(c => c.passed).length}/{log.validationChecks.length} 校验
                      </span>
                    </div>
                  </div>
                </div>
                {expandedLog === log.sessionId ? (
                  <ChevronDown className="w-5 h-5 text-white/40" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-white/40" />
                )}
              </div>

              {expandedLog === log.sessionId && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="border-t border-white/10"
                >
                  <div className="p-4 bg-black/20">
                    <p className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3">
                      📋 计算过程追踪
                    </p>
                    <div className="space-y-1 font-mono text-sm">
                      {log.entries.map((entry, idx) => (
                        <div key={idx} className="flex items-start gap-3 py-1.5 px-2 rounded-lg hover:bg-white/5">
                          <span className="text-white/30 w-6 text-right shrink-0">
                            {String(idx + 1).padStart(2, '0')}
                          </span>
                          <span className={`${getStepColor(entry.step)} shrink-0 w-20`}>
                            [{entry.step}]
                          </span>
                          <span className="text-white/70 shrink-0 w-36 truncate">
                            {entry.variable}
                          </span>
                          <span className="text-white font-mono">
                            = {formatValue(entry)}
                          </span>
                          {showDetails && entry.formula && (
                            <span className="text-amber-400/70 text-xs ml-3 shrink-0">
                              📐 {entry.formula}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 border-t border-white/10">
                    <p className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3">
                      ✅ 系统校验结果
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      {log.validationChecks.map((check) => (
                        <div
                          key={check.checkId}
                          className={`flex items-center gap-2 p-3 rounded-xl ${
                            check.passed
                              ? 'bg-green-500/10 border border-green-500/20'
                              : 'bg-red-500/10 border border-red-500/20'
                          }`}
                        >
                          {check.passed ? (
                            <CheckCircle className="w-4 h-4 text-green-400 shrink-0" />
                          ) : (
                            <XCircle className="w-4 h-4 text-red-400 shrink-0" />
                          )}
                          <span className="text-white/70 text-sm">{check.message}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      )}

      {logs.length > 0 && (
        <div className="mt-4 flex justify-end">
          <button
            onClick={clearLogs}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-red-400 text-sm hover:bg-red-500/10 transition-colors"
          >
            <TrendingUp className="w-4 h-4" />
            清空所有日志
          </button>
        </div>
      )}
    </div>
  )
}
