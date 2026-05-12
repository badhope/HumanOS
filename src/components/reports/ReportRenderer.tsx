import React, { Suspense, useState, useCallback } from 'react'
import { AlertTriangle, RefreshCw } from 'lucide-react'
import LazyReportRouter from './lazy'
import ResultLayerDisplay from './ResultLayerDisplay'
import type { AssessmentResult } from '../../types'

interface ReportRendererProps {
  result: AssessmentResult
  assessmentType: string
  mode: 'normal' | 'advanced' | 'professional'
  ideologyScores?: any
  primaryIdeology?: string
  matchScore?: number
  calculationMetadata?: {
    calculatorUsed: string
    calculationTime: number
    fallbackUsed: boolean
    entropy?: number
    reliability?: number
  }
}

function ReportErrorFallback({ error, onRetry }: { error: Error; onRetry: () => void }) {
  return (
    <div className="glass rounded-3xl p-8 border border-red-500/30">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center">
          <AlertTriangle className="w-6 h-6 text-red-400" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">报告渲染异常</h3>
          <p className="text-white/60 text-sm">已自动切换到通用报告模板</p>
        </div>
      </div>
      <p className="text-white/50 text-sm mb-4">{error.message}</p>
      <button
        onClick={onRetry}
        className="px-4 py-2 rounded-lg bg-violet-500/20 text-violet-300 hover:bg-violet-500/30 transition-colors flex items-center gap-2"
      >
        <RefreshCw size={14} />
        重试渲染
      </button>
    </div>
  )
}

function ReportLoadingFallback() {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="w-12 h-12 border-4 border-violet-500 border-t-transparent rounded-full animate-spin mb-4" />
      <p className="text-white/60 text-sm">正在生成报告...</p>
    </div>
  )
}

interface ErrorBoundaryProps {
  children: React.ReactNode
  onError: (error: Error) => void
}

interface ErrorBoundaryState {
  hasError: boolean
}

class ReportErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.props.onError(error)
  }

  render() {
    if (this.state.hasError) {
      return null
    }
    return this.props.children
  }
}

export default function ReportRenderer(props: ReportRendererProps) {
  const [renderError, setRenderError] = useState<Error | null>(null)
  const [retryKey, setRetryKey] = useState(0)

  const handleRetry = useCallback(() => {
    setRenderError(null)
    setRetryKey(prev => prev + 1)
  }, [])

  const handleError = useCallback((error: Error) => {
    console.error('[ReportRenderer] 渲染错误:', error)
    setRenderError(error)
  }, [])

  return (
    <div>
      <ReportErrorBoundary onError={handleError}>
        <Suspense fallback={<ReportLoadingFallback />}>
          <LazyReportRouter
            key={retryKey}
            result={props.result}
            assessmentType={props.assessmentType}
            mode={props.mode}
            ideologyScores={props.ideologyScores}
            primaryIdeology={props.primaryIdeology}
            matchScore={props.matchScore}
          />
        </Suspense>
      </ReportErrorBoundary>

      {renderError && (
        <ReportErrorFallback error={renderError} onRetry={handleRetry} />
      )}

      <ResultLayerDisplay
        result={props.result}
        mode={props.mode}
        calculationMetadata={props.calculationMetadata}
      />
    </div>
  )
}
