import { useState } from 'react'
import { ChevronDown, ChevronUp, Calculator, BarChart3, Microscope } from 'lucide-react'
import type { AssessmentResult } from '../../types'

interface ResultLayerDisplayProps {
  result: AssessmentResult
  mode: 'normal' | 'advanced' | 'professional'
  calculationMetadata?: {
    calculatorUsed: string
    calculationTime: number
    fallbackUsed: boolean
    entropy?: number
    reliability?: number
  }
}

export default function ResultLayerDisplay({ result, mode, calculationMetadata }: ResultLayerDisplayProps) {
  const [showDetails, setShowDetails] = useState(mode !== 'normal')

  if (mode === 'normal' && !showDetails) {
    return (
      <button
        onClick={() => setShowDetails(true)}
        className="w-full mt-4 py-2 px-4 rounded-xl bg-white/5 border border-white/10 text-white/50 text-xs hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
      >
        <BarChart3 size={14} />
        查看算法详情
      </button>
    )
  }

  return (
    <div className="mt-4 rounded-xl bg-white/5 border border-white/10 overflow-hidden">
      <button
        onClick={() => setShowDetails(!showDetails)}
        className="w-full p-3 flex items-center justify-between text-white/70 hover:bg-white/5 transition-colors"
      >
        <div className="flex items-center gap-2 text-xs">
          <Calculator size={14} className="text-violet-400" />
          <span>算法详情</span>
          <span className={`px-1.5 py-0.5 rounded text-[10px] ${
            mode === 'professional' ? 'bg-amber-500/20 text-amber-400' :
            mode === 'advanced' ? 'bg-blue-500/20 text-blue-400' :
            'bg-violet-500/20 text-violet-400'
          }`}>
            {mode === 'professional' ? '专业模式' : mode === 'advanced' ? '进阶模式' : '标准模式'}
          </span>
        </div>
        {showDetails ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
      </button>

      {showDetails && (
        <div className="px-4 pb-4 space-y-3 text-xs text-white/60">
          {calculationMetadata && (
            <div className="grid grid-cols-2 gap-2">
              <div className="p-2 rounded-lg bg-white/5">
                <div className="text-white/40 text-[10px]">计算器</div>
                <div className="text-white/80">{calculationMetadata.calculatorUsed}</div>
              </div>
              <div className="p-2 rounded-lg bg-white/5">
                <div className="text-white/40 text-[10px]">计算耗时</div>
                <div className="text-white/80">{calculationMetadata.calculationTime.toFixed(1)}ms</div>
              </div>
              {calculationMetadata.entropy !== undefined && (
                <div className="p-2 rounded-lg bg-white/5">
                  <div className="text-white/40 text-[10px]">信息熵</div>
                  <div className="text-white/80">{calculationMetadata.entropy.toFixed(3)} bits</div>
                </div>
              )}
              {calculationMetadata.reliability !== undefined && (
                <div className="p-2 rounded-lg bg-white/5">
                  <div className="text-white/40 text-[10px]">信度估计</div>
                  <div className="text-white/80">{(calculationMetadata.reliability * 100).toFixed(1)}%</div>
                </div>
              )}
            </div>
          )}

          {mode !== 'normal' && result.dimensions && result.dimensions.length > 0 && (
            <div>
              <div className="text-white/40 text-[10px] mb-1">维度权重分布</div>
              <div className="space-y-1">
                {result.dimensions.map((dim, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="text-white/70 w-16 truncate">{dim.name}</span>
                    <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-violet-500 to-blue-500 rounded-full"
                        style={{ width: `${Math.min(100, dim.score)}%` }}
                      />
                    </div>
                    <span className="text-white/50 w-8 text-right">{dim.score}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {mode === 'professional' && (
            <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20">
              <div className="flex items-center gap-1 text-amber-400 text-[10px] mb-1">
                <Microscope size={10} />
                专业模式计算详情
              </div>
              <div className="text-white/50 text-[10px]">
                结果基于信息熵加权算法，区分度指数和信度估计已纳入计算。准确度: {result.accuracy}%
              </div>
            </div>
          )}

          {calculationMetadata?.fallbackUsed && (
            <div className="p-2 rounded-lg bg-red-500/10 border border-red-500/20">
              <div className="text-red-400 text-[10px]">
                ⚠️ 主计算器异常，已使用降级计算。建议重新测评获取更精确结果。
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
